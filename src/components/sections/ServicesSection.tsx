"use client";

import {
  Camera,
  ChartLineUp,
  Handshake,
  House,
  Key,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/content";

const iconMap = {
  key: Key,
  house: House,
  chart: ChartLineUp,
  scale: Scales,
  camera: Camera,
  handshake: Handshake,
};

export function ServicesSection() {
  return (
    <section id="servicii" className="section-premium bg-white">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <AnimatedItem className="mb-16 md:mb-20">
            <SectionHeader
              eyebrow="Servicii"
              title="Tot ce ai nevoie, într-un singur partener"
              description="De la evaluare la închidere — un flux premium, fără fragmentare."
            />
          </AnimatedItem>

          <AnimatedSection className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const featured = i === 0;
              return (
                <AnimatedItem
                  key={service.title}
                  className={featured ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <div
                    className={`service-card group h-full rounded-2xl border border-stone-200/80 p-8 transition-all duration-500 hover:border-stone-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)] ${
                      featured
                        ? "bg-stone-950 text-white hover:border-stone-700"
                        : "bg-[var(--background)]"
                    }`}
                  >
                    <div
                      className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${
                        featured
                          ? "bg-white/10 text-[var(--accent-light)]"
                          : "bg-stone-950/5 text-[var(--accent-dark)]"
                      }`}
                    >
                      <Icon size={22} weight="duotone" />
                    </div>
                    <h3
                      className={`text-lg font-semibold tracking-tight ${
                        featured ? "text-white" : "text-stone-950"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        featured ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
}
