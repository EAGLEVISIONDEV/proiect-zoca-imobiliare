"use client";

import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { stats } from "@/lib/content";

export function StatsSection() {
  return (
    <section className="border-y border-stone-200 bg-[var(--background)] py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <AnimatedItem key={stat.label} className="text-center md:text-left">
                <p className="font-mono text-3xl font-medium tracking-tighter text-stone-950 md:text-5xl">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-[var(--accent)]">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-2 text-xs font-medium tracking-[0.14em] text-stone-500 uppercase">
                  {stat.label}
                </p>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
