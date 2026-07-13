import type { ReactNode } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-[52ch] ${alignClass} ${className}`}>
      <EyebrowBadge dark={dark}>{eyebrow}</EyebrowBadge>
      <h2
        className={`mt-6 text-3xl font-semibold tracking-tighter md:text-5xl lg:text-[3.25rem] lg:leading-[1.05] ${
          dark ? "text-white" : "text-stone-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            dark ? "text-stone-400" : "text-stone-500"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
