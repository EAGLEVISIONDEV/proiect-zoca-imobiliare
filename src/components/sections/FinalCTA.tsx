"use client";

import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="contact" className="section-premium">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <AnimatedItem>
            <div className="relative overflow-hidden rounded-3xl bg-stone-950 px-8 py-20 text-center md:px-16 md:py-28">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,184,150,0.14),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />

              <p className="relative text-[10px] font-semibold tracking-[0.25em] text-[var(--accent-light)] uppercase">
                Contact Premium
              </p>
              <h2 className="relative mx-auto mt-6 max-w-[16ch] text-3xl font-semibold tracking-tighter text-white md:text-5xl lg:text-6xl">
                Începe următoarea tranzacție
              </h2>
              <p className="relative mx-auto mt-5 max-w-[42ch] text-base leading-relaxed text-stone-400">
                Consultație personalizată cu echipa Zoca — fie că vindeți,
                cumpărați sau investiți.
              </p>

              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href={siteConfig.phoneHref} showArrow>
                  {siteConfig.phone}
                </Button>
                <Button href={siteConfig.emailHref} variant="ghost">
                  {siteConfig.email}
                </Button>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
