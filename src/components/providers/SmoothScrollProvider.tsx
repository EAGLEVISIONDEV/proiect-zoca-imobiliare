"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import { isMobileViewport } from "@/lib/device";

const options = {
  lerp: 0.08,
  duration: 1.0,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.0,
  autoRaf: true,
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"pending" | "lenis" | "native">("pending");

  useEffect(() => {
    // Lenis root transforms break `position: sticky` on iOS/Android.
    // Use native scroll on touch devices so the frame sequence works.
    setMode(isMobileViewport() ? "native" : "lenis");
  }, []);

  if (mode !== "lenis") {
    return children;
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
