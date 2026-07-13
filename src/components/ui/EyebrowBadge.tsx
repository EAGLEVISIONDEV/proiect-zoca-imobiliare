import type { ReactNode } from "react";

export function EyebrowBadge({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase ${
        dark
          ? "border-white/15 bg-white/5 text-[var(--accent-light)]"
          : "border-stone-200/80 bg-white/60 text-stone-500 backdrop-blur-md"
      }`}
    >
      {children}
    </span>
  );
}
