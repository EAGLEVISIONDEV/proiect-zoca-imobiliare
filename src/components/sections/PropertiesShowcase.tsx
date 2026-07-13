"use client";

import { ArrowUpRight, Bed, Ruler, Shower } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { properties } from "@/lib/content";

function PropertyImage({
  src,
  alt,
  gradient,
  priority = false,
}: {
  src: string;
  alt: string;
  gradient: string;
  priority?: boolean;
}) {
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,184,150,0.12),transparent_55%)]" />
    </>
  );
}

export function PropertiesShowcase() {
  const featured = properties.filter((p) => p.featured);
  const rest = properties.filter((p) => !p.featured);

  return (
    <section id="portofoliu" className="section-premium bg-stone-950 text-white">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <AnimatedItem className="mb-16 md:mb-20">
            <SectionHeader
              dark
              align="left"
              eyebrow="Portofoliu Exclusiv"
              title={
                <>
                  Proprietăți selectate
                  <span className="block text-[var(--accent-light)]">
                    pentru clienți exigenți
                  </span>
                </>
              }
              description="Listări curate din cele mai prestigioase zone ale Bucureștiului — prezentate editorial, nu ca un catalog generic."
            />
          </AnimatedItem>

          <div className="space-y-6">
            {featured.map((property, i) => (
              <AnimatedItem key={property.id}>
                <article
                  className={`property-card group grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2 ${
                    i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
                    <PropertyImage
                      src={property.image}
                      alt={property.title}
                      gradient={property.gradient}
                      priority={i === 0}
                    />
                    <div className="absolute top-5 left-5 z-10">
                      <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute right-5 bottom-5 left-5 z-10">
                      <p className="text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
                        {property.zone}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
                    <div>
                      <p className="font-mono text-sm tracking-wide text-[var(--accent-light)]">
                        {property.price}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tighter md:text-3xl">
                        {property.title}
                      </h3>
                      <p className="mt-2 text-sm text-stone-400">
                        {property.location}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-8">
                        <div className="flex items-center gap-2 text-sm text-stone-300">
                          <Bed size={18} className="text-[var(--accent-light)]" />
                          {property.beds} camere
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-300">
                          <Shower size={18} className="text-[var(--accent-light)]" />
                          {property.baths} băi
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-300">
                          <Ruler size={18} className="text-[var(--accent-light)]" />
                          {property.sqm} m²
                        </div>
                      </div>
                    </div>

                    <Link
                      href="#contact"
                      className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-[var(--accent-light)]"
                    >
                      Solicită detalii
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </AnimatedItem>
            ))}
          </div>

          {rest.length > 0 ? (
            <AnimatedSection className="mt-6 grid gap-4 md:grid-cols-2">
              {rest.map((property) => (
                <AnimatedItem key={property.id}>
                  <article className="property-card-sm group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    <div className="relative h-56 overflow-hidden">
                      <PropertyImage
                        src={property.image}
                        alt={property.title}
                        gradient={property.gradient}
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                          {property.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight">
                            {property.title}
                          </h3>
                          <p className="mt-1 text-sm text-stone-400">
                            {property.location}
                          </p>
                        </div>
                        <p className="shrink-0 font-mono text-sm text-[var(--accent-light)]">
                          {property.price}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-4 text-xs text-stone-400">
                        <span>{property.beds} cam</span>
                        <span>{property.sqm} m²</span>
                      </div>
                    </div>
                  </article>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          ) : null}
        </AnimatedSection>
      </div>
    </section>
  );
}
