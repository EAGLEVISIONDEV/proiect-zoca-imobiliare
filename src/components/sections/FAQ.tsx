"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/lib/content";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-premium bg-white">
      <div className="mx-auto max-w-[900px]">
        <AnimatedSection>
          <AnimatedItem className="mb-14 md:mb-16">
            <SectionHeader
              eyebrow="FAQ"
              title="Întrebări frecvente"
              description="Răspunsuri clare despre modul în care lucrăm."
            />
          </AnimatedItem>

          <AnimatedItem className="divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium tracking-tight text-stone-950 md:text-lg">
                      {faq.question}
                    </span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-stone-400 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-stone-500 md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
