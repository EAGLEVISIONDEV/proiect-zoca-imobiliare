"use client";

import { Quotes } from "@phosphor-icons/react";
import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section id="testimoniale" className="section-premium">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <AnimatedItem className="mb-16 md:mb-20">
            <SectionHeader
              eyebrow="Testimoniale"
              title="Încredere construită prin rezultate"
              description="Clienții noștri apreciază claritatea, discreția și performanța în fiecare tranzacție."
            />
          </AnimatedItem>

          <AnimatedSection className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <AnimatedItem key={testimonial.author}>
                <figure
                  className={`flex h-full flex-col rounded-2xl border border-stone-200/80 p-8 ${
                    i === 1 ? "bg-stone-950 text-white md:-translate-y-4" : "bg-white"
                  }`}
                >
                  <Quotes
                    size={28}
                    weight="fill"
                    className={
                      i === 1 ? "text-[var(--accent-light)]" : "text-stone-200"
                    }
                  />
                  <blockquote
                    className={`mt-6 flex-1 text-base leading-relaxed ${
                      i === 1 ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-current/10 pt-6">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        i === 1
                          ? "bg-white/10 text-[var(--accent-light)]"
                          : "bg-stone-950 text-[var(--accent-light)]"
                      }`}
                    >
                      {testimonial.initial}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          i === 1 ? "text-white" : "text-stone-950"
                        }`}
                      >
                        {testimonial.author}
                      </p>
                      <p
                        className={`text-xs ${
                          i === 1 ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
}
