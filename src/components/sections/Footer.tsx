import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/lib/content";

const footerLinks = {
  navigare: [
    { label: "Despre", href: "#despre" },
    { label: "Portofoliu", href: "#portofoliu" },
    { label: "Servicii", href: "#servicii" },
    { label: "Testimoniale", href: "#testimoniale" },
    { label: "Contact", href: "#contact" },
  ],
  servicii: [
    { label: "Vânzare Exclusivă", href: "#servicii" },
    { label: "Achiziție Premium", href: "#servicii" },
    { label: "Consultanță", href: "#servicii" },
    { label: "Evaluare", href: "#servicii" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo size="md" />
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-stone-400">
              Agenție imobiliară premium din București. Exclusivitate,
              discreție și performanță în fiecare tranzacție.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-4">
            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-500 uppercase">
                Navigare
              </h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.navigare.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-500 uppercase">
                Servicii
              </h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.servicii.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-500 uppercase">
              Contact
            </h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="group inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-[var(--accent-light)]"
                >
                  {siteConfig.phone}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="group inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-[var(--accent-light)]"
                >
                  {siteConfig.email}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-stone-500">
            © 2026 Zoca Real Estate. Toate drepturile rezervate.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-xs text-stone-500 transition-colors hover:text-stone-300"
            >
              Confidențialitate
            </Link>
            <Link
              href="#"
              className="text-xs text-stone-500 transition-colors hover:text-stone-300"
            >
              Termeni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
