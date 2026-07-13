"use client";

import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FrameSequenceSection } from "@/components/ui/FrameSequenceSection";
import { SceneAnnotationCard } from "@/components/ui/SceneAnnotationCard";
import { siteConfig, properties } from "@/lib/content";
import {
  FRAME_COUNT,
  INTRO_PROGRESS_END,
  framePath,
} from "@/lib/frames";

const heroAnnotations = [
  {
    id: "exclusive",
    show: 0.03,
    hide: 0.15,
    side: "left" as const,
    title: "Contracte Exclusive",
    description: "Exclusivitate totală",
    position: "left-[5%] top-[26%] md:left-[7%] md:top-[30%]",
  },
  {
    id: "certified",
    show: 0.12,
    hide: 0.28,
    side: "right" as const,
    title: "Agenție Certificată",
    description: "Excelență premium",
    position: "right-[5%] top-[36%] md:right-[8%] md:top-[38%]",
  },
  {
    id: "location",
    show: 0.22,
    hide: INTRO_PROGRESS_END - 0.02,
    side: "left" as const,
    title: "București Premium",
    description: "Zone prestigioase",
    position: "left-[5%] bottom-[20%] md:left-[10%] md:bottom-[22%]",
  },
];

const propertyStart = INTRO_PROGRESS_END + 0.02;
const propertyStep = (0.9 - propertyStart) / properties.length;

const propertyZones = properties.map((_, i) => ({
  id: `property-${i}`,
  show: propertyStart + i * propertyStep,
  hide: propertyStart + i * propertyStep + 0.1,
}));

const allAnnotations = [
  ...heroAnnotations.map(({ id, show, hide }) => ({ id, show, hide })),
  ...propertyZones,
];

export function UnifiedScrollExperience() {
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const handleProgress = useCallback((progress: number) => {
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity =
        progress < INTRO_PROGRESS_END ? "0.55" : "0";
    }
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = progress > 0.95 ? "0" : "0.7";
    }
  }, []);

  return (
    <div id="proprietati">
      <FrameSequenceSection
        frameCount={FRAME_COUNT}
        framePath={framePath}
        sectionClassName="scroll-animation-long"
        annotations={allAnnotations}
        textFadeThreshold={0.03}
        darkAfterProgress={INTRO_PROGRESS_END}
        ctaThreshold={0.92}
        onProgress={handleProgress}
        render={({
          heroTextRef,
          phaseTextRef,
          ctaRef,
          visibleCards,
          loaded,
        }) =>
          loaded ? (
            <>
              <div
                ref={introOverlayRef}
                className="pointer-events-none absolute inset-0 bg-stone-950 transition-opacity duration-300"
              />

              <div
                ref={heroTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-300"
              >
                <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-white/70 uppercase">
                  {siteConfig.tagline}
                </p>
                <h1 className="max-w-[16ch] text-4xl font-semibold tracking-tighter text-white md:text-6xl lg:text-7xl lg:leading-[1.05]">
                  Excelență în{" "}
                  <span className="gradient-text">Imobiliare</span>
                </h1>
                <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/75 md:text-lg">
                  Descoperiți proprietăți exclusive, selectate cu grijă pentru
                  clienții care nu fac compromisuri.
                </p>
                <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button href="#despre" showArrow>
                    Descoperă Proprietăți
                  </Button>
                  <Button href="#despre" variant="ghost">
                    Află Mai Multe
                  </Button>
                </div>
              </div>

              <div
                ref={phaseTextRef}
                className="absolute inset-x-0 top-24 flex flex-col items-center px-6 text-center opacity-0 md:top-32"
              >
                <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-[var(--accent-light)] uppercase">
                  Tur Virtual Premium
                </p>
                <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tighter text-white md:text-5xl">
                  Proprietăți Exclusive
                </h2>
              </div>

              {heroAnnotations.map((ann) => (
                <SceneAnnotationCard
                  key={ann.id}
                  visible={visibleCards.has(ann.id)}
                  side={ann.side}
                  position={ann.position}
                  title={ann.title}
                  description={ann.description}
                />
              ))}

              {properties.map((property, i) => {
                const positions = [
                  "left-[4%] top-[28%] md:left-[7%] md:top-[30%]",
                  "right-[4%] top-[26%] md:right-[7%] md:top-[28%]",
                  "left-[4%] top-[40%] md:left-[11%] md:top-[42%]",
                  "right-[4%] top-[42%] md:right-[9%] md:top-[44%]",
                  "left-1/2 top-[48%] -translate-x-1/2 md:top-[50%]",
                ];
                const sides = ["left", "right", "left", "right", "center"] as const;
                return (
                  <SceneAnnotationCard
                    key={property.title}
                    visible={visibleCards.has(`property-${i}`)}
                    side={sides[i]}
                    position={positions[i]}
                    badge={property.type}
                    title={property.title}
                    price={property.price}
                  />
                );
              })}

              <div
                ref={ctaRef}
                className="absolute inset-x-0 bottom-16 flex flex-col items-center px-6 text-center opacity-0 transition-opacity duration-700"
              >
                <h3 className="max-w-[22ch] text-2xl font-semibold tracking-tighter text-white md:text-4xl">
                  Gata să descoperiți următoarea proprietate?
                </h3>
                <div className="mt-6">
                  <Button href="#contact" variant="primary" showArrow>
                    Contactează-ne
                  </Button>
                </div>
              </div>

              <div
                ref={scrollHintRef}
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
              >
                <span className="text-[10px] tracking-widest uppercase">
                  Scroll
                </span>
                <div className="h-8 w-px animate-pulse bg-white/40" />
              </div>
            </>
          ) : null
        }
      />
    </div>
  );
}
