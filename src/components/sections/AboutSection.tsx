import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { neighborhoods, values } from "@/lib/content";

export function AboutSection() {
  return (
    <section id="despre" className="section-premium">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <AnimatedItem>
              <SectionHeader
                align="left"
                eyebrow="Filosofie"
                title={
                  <>
                    Redefinim standardele
                    <span className="block text-stone-400">
                      în imobiliare premium
                    </span>
                  </>
                }
                description="Zoca Real Estate este o agenție de elită fondată pe exclusivitate, transparență și rezultate măsurabile — pentru clienți care nu fac compromisuri."
              />
            </AnimatedItem>

            <AnimatedItem>
              <div className="space-y-6 border-l border-stone-200 pl-8">
                <p className="text-lg leading-relaxed text-stone-600">
                  Fiecare proprietate primește o strategie dedicată: marketing
                  editorial, negociere atentă și prezentare la standarde
                  internaționale.
                </p>
                <p className="text-base leading-relaxed text-stone-500">
                  Fondată de Stefan Meluta, agenția operează exclusiv în segmentul
                  premium al Bucureștiului, cu focus pe zonele cu cel mai mare
                  potențial de valoare.
                </p>
              </div>
            </AnimatedItem>
          </div>

          <AnimatedSection className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 md:grid-cols-3">
            {values.map((value) => (
              <AnimatedItem key={value.title}>
                <div className="h-full bg-[var(--background)] p-8 md:p-10">
                  <span className="font-mono text-xs text-[var(--accent-dark)]">
                    {value.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-500">
                    {value.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          <AnimatedItem className="mt-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase">
                Zone premium
              </span>
              {neighborhoods.map((n) => (
                <span
                  key={n.name}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600"
                >
                  {n.name}
                  <span className="ml-2 font-mono text-xs text-[var(--accent-dark)]">
                    {n.count}
                  </span>
                </span>
              ))}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
