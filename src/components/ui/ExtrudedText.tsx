"use client";

import { useMemo, type CSSProperties, type ElementType } from "react";

type ExtrudedTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  depth?: number;
  faceColor?: string;
  animate?: boolean;
  uppercase?: boolean;
};

function buildLetterShadows(depth: number): string {
  const layers = Math.min(Math.max(depth, 0), 3);
  const shadows = ["0 1px 2px rgba(0,0,0,0.42)"];

  for (let i = 1; i <= layers; i++) {
    shadows.push(`${i * 0.2}px ${i * 0.45}px 0 rgba(0,0,0,${0.12 + i * 0.04})`);
  }

  shadows.push("0 3px 12px rgba(0,0,0,0.22)");
  return shadows.join(", ");
}

export function ExtrudedText({
  children,
  as: Tag = "span",
  className = "",
  depth = 2,
  faceColor = "#ffffff",
  animate = false,
  uppercase = true,
}: ExtrudedTextProps) {
  const text = uppercase ? children.toUpperCase() : children;
  const ariaText = children;

  const letterShadow = useMemo(() => buildLetterShadows(depth), [depth]);

  const letters = useMemo(() => {
    return [...text].map((char, index) => ({
      char: char === " " ? "\u00A0" : char,
      index,
    }));
  }, [text]);

  return (
    <Tag className={`extruded-text ${className}`} aria-label={ariaText}>
      <span className="sr-only">{ariaText}</span>
      <span aria-hidden="true" className="extruded-text__face">
        {letters.map(({ char, index }) => (
          <span
            key={`${char}-${index}`}
            className={`extruded-text__letter ${animate ? "extruded-text__letter--animate" : ""}`}
            style={
              {
                "--i": index,
                color: faceColor,
                textShadow: letterShadow,
              } as CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </span>
    </Tag>
  );
}
