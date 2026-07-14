import Image from "next/image";
import { siteConfig } from "@/lib/content";

const sizeHeights = {
  sm: 48,
  md: 56,
  lg: 72,
  xl: 220,
  loader: 320,
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizeHeights;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = "md",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const height = sizeHeights[size];

  return (
    <span className={`brand-logo-wrap${className ? ` ${className}` : ""}`}>
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={1024}
        height={1024}
        priority={priority}
        unoptimized
        className="brand-logo-img"
        style={{ height, width: "auto", maxWidth: "none" }}
      />
    </span>
  );
}
