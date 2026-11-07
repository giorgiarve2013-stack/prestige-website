"use client";

import { useLang } from "./LanguageProvider";
import { ArrowUp, WhatsApp } from "./ui/Icons";
import { site } from "@/lib/site";

const links = ["products", "about", "process", "contact"] as const;

export function Footer() {
  const { t } = useLang();
  const socials = [
    { label: "Facebook", href: site.facebook },
    { label: "Instagram", href: site.instagram },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-white/10 bg-graphite-900">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="text-xl font-light uppercase tracking-[0.35em] text-silver-100">Prestige</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-silver-500">{t.brand.tag}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-silver-400">{t.meta.description}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wideplus text-silver-500">{t.footer.nav}</p>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l}>
                <a href={`#${l}`} className="text-sm text-silver-300 transition hover:text-accent">
                  {t.nav[l]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wideplus text-silver-500">{t.footer.follow}</p>
          <ul className="mt-5 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-silver-300 transition hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
            {site.whatsapp && (
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-silver-300 transition hover:text-accent">
                  <WhatsApp className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            )}
            {!socials.length && !site.whatsapp && (
              <li className="text-sm italic text-silver-500">{t.contact.fill}</li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-silver-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PRESTIGE. {t.footer.rights}</p>
          <a href="#top" className="inline-flex items-center gap-2 transition hover:text-accent">
            {t.footer.up} <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
