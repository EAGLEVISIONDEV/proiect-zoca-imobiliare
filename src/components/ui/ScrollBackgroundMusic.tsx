"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_ID = "M-ri_i2zIRE";
const SCROLL_SECTION_SELECTOR = ".scroll-animation-long";
const SCROLL_END_THRESHOLD = 0.97;
const DEFAULT_VOLUME = 38;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export function ScrollBackgroundMusic() {
  const playerRef = useRef<YT.Player | null>(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const inScrollSectionRef = useRef(true);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const syncPlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player || !startedRef.current || mutedRef.current) return;

    if (inScrollSectionRef.current) {
      player.playVideo();
      setPlaying(true);
    } else {
      player.pauseVideo();
      setPlaying(false);
    }
  }, []);

  const startMusic = useCallback(() => {
    if (startedRef.current || !playerRef.current) return;
    startedRef.current = true;
    setShowPrompt(false);
    playerRef.current.unMute();
    playerRef.current.setVolume(DEFAULT_VOLUME);
    syncPlayback();
  }, [syncPlayback]);

  useEffect(() => {
    let destroyed = false;

    loadYouTubeApi().then(() => {
      if (destroyed || playerRef.current) return;

      playerRef.current = new window.YT!.Player("yt-scroll-music", {
        height: "0",
        width: "0",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            playerRef.current?.mute();
            setReady(true);
          },
        },
      });
    });

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const onInteract = () => {
      startMusic();
    };

    window.addEventListener("wheel", onInteract, { passive: true });
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);

    return () => {
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [ready, startMusic]);

  useEffect(() => {
    if (!ready) return;

    const updateScrollSection = () => {
      const section = document.querySelector(SCROLL_SECTION_SELECTOR);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollable))
          : 0;

      const inSection = progress < SCROLL_END_THRESHOLD && rect.bottom > 0;
      inScrollSectionRef.current = inSection;

      if (startedRef.current && !mutedRef.current) {
        syncPlayback();
      }

      if (ready && !startedRef.current && progress > 0.01) {
        setShowPrompt(true);
      }
    };

    updateScrollSection();
    window.addEventListener("scroll", updateScrollSection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollSection);
  }, [ready, syncPlayback]);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (!startedRef.current) {
      startMusic();
      return;
    }

    if (muted) {
      mutedRef.current = false;
      setMuted(false);
      player.unMute();
      player.setVolume(DEFAULT_VOLUME);
      syncPlayback();
    } else {
      mutedRef.current = true;
      setMuted(true);
      setPlaying(false);
      player.pauseVideo();
      player.mute();
    }
  };

  return (
    <>
      <div id="yt-scroll-music" className="sr-only" aria-hidden="true" />

      {showPrompt && !playing && !muted ? (
        <button
          type="button"
          onClick={startMusic}
          className="scroll-music-prompt"
          aria-label="Activează muzica de fundal"
        >
          <SpeakerHigh size={16} weight="bold" />
          <span>Activează sunetul</span>
        </button>
      ) : null}

      <button
        type="button"
        onClick={toggleMute}
        className="scroll-music-toggle"
        aria-label={muted || !playing ? "Pornește muzica" : "Oprește muzica"}
        aria-pressed={playing && !muted}
      >
        {muted || !playing ? (
          <SpeakerSlash size={18} weight="bold" />
        ) : (
          <SpeakerHigh size={18} weight="bold" />
        )}
      </button>
    </>
  );
}
