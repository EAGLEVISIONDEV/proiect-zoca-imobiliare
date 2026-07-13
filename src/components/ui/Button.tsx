"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-white text-stone-950 hover:bg-stone-100 shadow-lg shadow-black/10",
  secondary:
    "bg-transparent text-stone-950 hover:bg-stone-50 border border-stone-200",
  ghost:
    "bg-white/8 text-white hover:bg-white/14 border border-white/15 backdrop-blur-md",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  showArrow = false,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight size={16} weight="bold" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
