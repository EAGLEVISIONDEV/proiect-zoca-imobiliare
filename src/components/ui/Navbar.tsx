"use client";

import { List, Phone, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/lib/content";

const navLinks = [
  { label: "Despre", href: "#despre" },
  { label: "Portofoliu", href: "#portofoliu" },
  { label: "Servicii", href: "#servicii" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const darkSection = document.getElementById("proprietati");
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        const scrollable = darkSection.offsetHeight - window.innerHeight;
        const sectionProgress = Math.min(
          1,
          Math.max(0, -rect.top / scrollable),
        );
        setDark(sectionProgress >= 0.14 && rect.bottom > 80);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
        scrolled
          ? dark
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "border-b border-white/30 bg-white/40 backdrop-blur-2xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="group flex items-center">
          <BrandLogo size="sm" priority />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                dark ? "text-stone-300" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              dark
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-stone-950 text-white hover:bg-stone-800"
            }`}
          >
            <Phone size={16} weight="bold" />
            {siteConfig.phone}
          </a>
        </div>

        <button
          type="button"
          className={`md:hidden ${dark ? "text-white" : "text-stone-950"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-stone-200 bg-white/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <div className="mb-6">
            <BrandLogo size="sm" />
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-stone-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 text-base font-medium text-[var(--accent-dark)]"
            >
              <Phone size={18} weight="bold" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
