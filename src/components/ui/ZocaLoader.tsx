"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/content";

type ZocaLoaderProps = {
  progress: number;
  visible: boolean;
};

const RING_RADIUS = 54;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export function ZocaLoader({ progress, visible }: ZocaLoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const ringOffset = RING_CIRC * (1 - progress);

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
      </div>

      <div className="zoca-loader__content">
        <div className="zoca-loader__mark">
          <svg
            className="zoca-loader__ring"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="zoca-loader-gold-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b7355" />
                <stop offset="50%" stopColor="#c9a96e" />
                <stop offset="100%" stopColor="#e8d4b0" />
              </linearGradient>
            </defs>
            <circle
              className="zoca-loader__ring-track"
              cx="60"
              cy="60"
              r={RING_RADIUS}
            />
            <circle
              className="zoca-loader__ring-fill"
              cx="60"
              cy="60"
              r={RING_RADIUS}
              strokeDasharray={RING_CIRC}
              strokeDashoffset={ringOffset}
            />
          </svg>

          <div className="zoca-loader__logo-shell">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={1024}
              height={1024}
              priority
              unoptimized
              className="zoca-loader__logo-img"
            />
          </div>
        </div>

        <div className="zoca-loader__status">
          <p className="zoca-loader__mantra">
            Exclusivitate · Excelență · Încredere
          </p>
          <p className="zoca-loader__pct">{String(pct).padStart(3, "0")}%</p>
        </div>
      </div>
    </div>
  );
}
