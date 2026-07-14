"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

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
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  if (!enabled) {
    return children;
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
