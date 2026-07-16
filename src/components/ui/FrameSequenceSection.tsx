"use client";

import { useLenis } from "lenis/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FrameBuffer, getCanvasDpr, type FrameBitmap } from "@/lib/frameBuffer";
import { getFrameBufferProfile } from "@/lib/device";
import { ZocaLoader } from "@/components/ui/ZocaLoader";

type Annotation = {
  id: string;
  show: number;
  hide: number;
};

export type FrameSequenceRenderProps = {
  heroTextRef: React.RefObject<HTMLDivElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  phaseTextRef: React.RefObject<HTMLDivElement | null>;
  visibleCards: Set<string>;
  showCta: boolean;
  loaded: boolean;
};

type FrameSequenceOptions = {
  frameCount: number;
  framePath: (index: number) => string;
  sectionClassName?: string;
  annotations?: Annotation[];
  textFadeThreshold?: number;
  ctaThreshold?: number;
  darkAfterProgress?: number;
  showLoader?: boolean;
  onProgress?: (progress: number) => void;
  render: (props: FrameSequenceRenderProps) => ReactNode;
};

type DrawMetrics = {
  dpr: number;
  cw: number;
  ch: number;
  drawX: number;
  drawY: number;
  drawW: number;
  drawH: number;
  upscaling: boolean;
};

const PROGRESS_THROTTLE = 0.004;

function isSafariLike() {
  if (typeof navigator === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function FrameSequenceSection({
  frameCount,
  framePath,
  sectionClassName = "scroll-animation",
  annotations = [],
  textFadeThreshold = 0.08,
  ctaThreshold,
  darkAfterProgress,
  showLoader = true,
  onProgress,
  render,
}: FrameSequenceOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef<FrameBuffer | null>(null);
  const metricsRef = useRef<DrawMetrics | null>(null);
  const lastFrameRef = useRef(-1);
  const lastProgressRef = useRef(-1);
  const isActiveRef = useRef(true);
  const rafRef = useRef(0);
  const prevVisibleIdsRef = useRef("");
  const showCtaRef = useRef(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const phaseTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [showCta, setShowCta] = useState(false);

  const computeMetrics = useCallback(
    (bitmap: FrameBitmap): DrawMetrics | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const dpr = getCanvasDpr();
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const imgW = "naturalWidth" in bitmap ? bitmap.naturalWidth : bitmap.width;
      const imgH =
        "naturalHeight" in bitmap ? bitmap.naturalHeight : bitmap.height;

      const imgRatio = imgW / imgH;
      const canvasRatio = cw / ch;
      let drawW: number;
      let drawH: number;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }

      return {
        dpr,
        cw,
        ch,
        drawX: (cw - drawW) / 2,
        drawY: (ch - drawH) / 2,
        drawW,
        drawH,
        upscaling: drawW > imgW * 1.01 || drawH > imgH * 1.01,
      };
    },
    [],
  );

  const drawFrame = useCallback(
    (index: number) => {
      if (index === lastFrameRef.current) return;

      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const buffer = bufferRef.current;
      if (!canvas || !ctx || !buffer) return;

      const bitmap = buffer.get(index);
      if (!bitmap) {
        void buffer.load(index).then((loadedBitmap) => {
          if (loadedBitmap) {
            lastFrameRef.current = -1;
            drawFrame(index);
          }
        });
        return;
      }

      if (!metricsRef.current) {
        metricsRef.current = computeMetrics(bitmap);
      }

      const m = metricsRef.current;
      if (!m) return;

      ctx.imageSmoothingEnabled = m.upscaling;
      if (m.upscaling) {
        ctx.imageSmoothingQuality = "high";
      }

      ctx.setTransform(m.dpr, 0, 0, m.dpr, 0, 0);
      ctx.drawImage(bitmap, m.drawX, m.drawY, m.drawW, m.drawH);

      lastFrameRef.current = index;
    },
    [computeMetrics],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width || window.innerWidth));
    const height = Math.max(
      1,
      Math.round(
        rect.height ||
          window.visualViewport?.height ||
          window.innerHeight,
      ),
    );
    const dpr = getCanvasDpr();

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const options: CanvasRenderingContext2DSettings = { alpha: false };
    if (!isSafariLike()) {
      (options as CanvasRenderingContext2DSettings & { desynchronized?: boolean })
        .desynchronized = true;
    }

    ctxRef.current = canvas.getContext("2d", options);

    metricsRef.current = null;
    lastFrameRef.current = -1;
  }, []);

  const updateFromProgress = useCallback(
    (currentProgress: number) => {
      if (!isActiveRef.current) return;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.round(currentProgress * (frameCount - 1)),
      );

      bufferRef.current?.prefetchAround(frameIndex);
      drawFrame(frameIndex);

      if (
        Math.abs(currentProgress - lastProgressRef.current) > PROGRESS_THROTTLE
      ) {
        lastProgressRef.current = currentProgress;
        onProgress?.(currentProgress);
      }

      if (overlayRef.current && darkAfterProgress !== undefined) {
        const fade = Math.min(
          1,
          Math.max(0, (currentProgress - darkAfterProgress) / 0.06),
        );
        overlayRef.current.style.opacity = String(fade * 0.55);
      }

      if (heroTextRef.current) {
        const opacity = Math.max(0, 1 - currentProgress / textFadeThreshold);
        heroTextRef.current.style.opacity = String(opacity);
      }

      if (phaseTextRef.current && darkAfterProgress !== undefined) {
        const start = darkAfterProgress;
        const fadeIn = Math.min(
          1,
          Math.max(0, (currentProgress - start) / 0.04),
        );
        const fadeOut = Math.max(
          0,
          1 - (currentProgress - start - 0.06) / 0.04,
        );
        phaseTextRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
      }

      if (ctaThreshold !== undefined && ctaRef.current) {
        const shouldShow = currentProgress >= ctaThreshold;
        ctaRef.current.style.opacity = shouldShow ? "1" : "0";
        ctaRef.current.style.pointerEvents = shouldShow ? "auto" : "none";
        if (shouldShow !== showCtaRef.current) {
          showCtaRef.current = shouldShow;
          setShowCta(shouldShow);
        }
      }

      if (annotations.length > 0) {
        const newVisible = new Set<string>();
        for (const ann of annotations) {
          if (currentProgress >= ann.show && currentProgress <= ann.hide) {
            newVisible.add(ann.id);
          }
        }
        const newIds = [...newVisible].sort().join(",");
        if (newIds !== prevVisibleIdsRef.current) {
          prevVisibleIdsRef.current = newIds;
          setVisibleCards(newVisible);
        }
      }
    },
    [
      frameCount,
      drawFrame,
      annotations,
      textFadeThreshold,
      ctaThreshold,
      darkAfterProgress,
      onProgress,
    ],
  );

  const getProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    const viewportH =
      window.visualViewport?.height || window.innerHeight;
    const scrollableHeight = section.offsetHeight - viewportH;
    if (scrollableHeight <= 0) return 0;

    return Math.min(1, Math.max(0, -rect.top / scrollableHeight));
  }, []);

  const scheduleFrame = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (!loaded) return;
      updateFromProgress(getProgress());
    });
  }, [loaded, updateFromProgress, getProgress]);

  useEffect(() => {
    const profile = getFrameBufferProfile();
    const buffer = new FrameBuffer(frameCount, framePath, {
      bufferRadius: profile.bufferRadius,
      maxCache: profile.maxCache,
      maxConcurrent: profile.maxConcurrent,
    });
    bufferRef.current = buffer;

    let cancelled = false;
    let progressRaf = 0;
    let lastReported = 0;

    const reportProgress = (ratio: number) => {
      if (cancelled) return;
      if (ratio - lastReported < 0.02 && ratio < 1) return;
      lastReported = ratio;
      cancelAnimationFrame(progressRaf);
      progressRaf = requestAnimationFrame(() => {
        setLoadProgress(ratio);
      });
    };

    void (async () => {
      await buffer.preloadInitial(profile.minFramesToStart, reportProgress);
      if (!cancelled) {
        setLoadProgress(1);
        setLoaded(true);
        resizeCanvas();
        updateFromProgress(getProgress());
      }

      void buffer.preloadInitial(
        Math.min(profile.warmPreload, frameCount),
        undefined,
      );
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(progressRaf);
      buffer.destroy();
      bufferRef.current = null;
    };
  }, [frameCount, framePath, getProgress, updateFromProgress, resizeCanvas]);

  useEffect(() => {
    resizeCanvas();

    const onResize = () => {
      resizeCanvas();
      if (loaded) scheduleFrame();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, [resizeCanvas, loaded, scheduleFrame]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        if (entry.isIntersecting && loaded) {
          scheduleFrame();
        }
      },
      { threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [loaded, scheduleFrame]);

  useLenis(scheduleFrame, [scheduleFrame], 0);

  useEffect(() => {
    if (!loaded) return;

    const onScroll = () => scheduleFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, [loaded, scheduleFrame]);

  useEffect(() => {
    if (!loaded) return;

    const onVisibility = () => {
      if (!document.hidden) scheduleFrame();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [loaded, scheduleFrame]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className={sectionClassName}>
      {showLoader ? (
        <ZocaLoader progress={loadProgress} visible={!loaded} />
      ) : null}

      <div
        ref={stageRef}
        className="sticky top-0 h-dvh overflow-hidden"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          perspective: "1200px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-stone-950"
          style={{ opacity: 0 }}
        />
        {render({
          heroTextRef,
          phaseTextRef,
          ctaRef,
          visibleCards,
          showCta,
          loaded,
        })}
      </div>
    </section>
  );
}
