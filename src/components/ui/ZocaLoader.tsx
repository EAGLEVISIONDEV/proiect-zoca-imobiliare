"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/content";

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
      <div className="zoca-loader__backdrop" aria-hidden="true">
        <div className="zoca-loader__glow zoca-loader__glow--gold" />
        <div className="zoca-loader__glow zoca-loader__glow--navy" />
      </div>

      <div className="zoca-loader__center">
        <div className="zoca-loader__halo" aria-hidden="true" />
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={1024}
          height={1024}
          priority
          unoptimized
          className="zoca-loader__logo"
        />
      </div>

      <div className="zoca-loader__footer">
        <p className="zoca-loader__mantra">
          Exclusivitate · Excelență · Încredere
        </p>
        <div className="zoca-loader__track">
          <div
            className="zoca-loader__track-fill"
            style={{ transform: `scaleX(${progress})` }}
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
