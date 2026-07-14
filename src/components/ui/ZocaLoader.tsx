"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { useEffect, useState } from "react";

type ZocaLoaderProps = {
  progress: number;
  visible: boolean;
};

export function ZocaLoader({ progress, visible }: ZocaLoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));

  useEffect(() => {
    if (!visible && mounted) {
      setExiting(true);
      const timer = setTimeout(() => setMounted(false), 900);
      return () => clearTimeout(timer);
    }
  }, [visible, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`zoca-loader ${exiting ? "zoca-loader--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Se încarcă experiența, ${pct} procent`}
    >
      <div className="zoca-loader__ambient" aria-hidden="true">
        <div className="zoca-loader__orb zoca-loader__orb--a" />
        <div className="zoca-loader__orb zoca-loader__orb--b" />
        <div className="zoca-loader__grid" />
        <div className="zoca-loader__grain" />
      </div>

      <div className="zoca-loader__content">
        <div className="zoca-loader__logo-wrap">
          <div className="zoca-loader__logo-glow" aria-hidden="true" />
          <BrandLogo size="loader" priority className="zoca-loader__logo" />
        </div>

        <p className="zoca-loader__mantra">
          Exclusivitate · Excelență · Încredere
        </p>
      </div>

      <div className="zoca-loader__footer">
        <div className="zoca-loader__track">
          <div
            className="zoca-loader__track-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
          <div
            className="zoca-loader__track-glow"
            style={{ left: `${pct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="zoca-loader__meta">
          <span className="zoca-loader__label">Se încarcă</span>
          <span className="zoca-loader__pct">{String(pct).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
