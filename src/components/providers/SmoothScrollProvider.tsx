"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

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
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
