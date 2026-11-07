"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Close } from "./ui/Icons";

const links = ["products", "about", "process", "contact"] as const;

export function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center rounded-full border border-white/15 p-0.5 text-[11px] font-medium ${className}`} role="group" aria-label={t.lang.label}>
      {(["ka", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 uppercase tracking-widest transition ${
            lang === l ? "bg-silver-100 text-graphite-950" : "text-silver-300 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-white/10 bg-graphite-950/70 py-3 backdrop-blur-xl" : "py-6"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <a href="#top" className="group flex flex-col leading-none" aria-label="PRESTIGE">
            <span className="text-lg font-light uppercase tracking-[0.35em] text-silver-100 transition group-hover:text-accent">
              Prestige
            </span>
            <span className="mt-1.5 text-[9px] uppercase tracking-[0.3em] text-silver-500">{t.brand.tag}</span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                className="group relative py-1 text-sm text-silver-300 transition hover:text-white"
              >
                {t.nav[l]}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch />
            <a href="#contact" className="btn btn-primary hidden !px-5 !py-2.5 text-xs md:inline-flex">
              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 transition hover:border-accent lg:hidden"
              aria-label={t.nav.menu}
              aria-expanded={open}
            >
              <span className="h-px w-4 bg-silver-100" />
              <span className="h-px w-4 bg-silver-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-graphite-950/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col py-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-light uppercase tracking-[0.35em] text-silver-100">Prestige</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
              aria-label={t.nav.close}
            >
              <Close />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l, i) => (
              <a
                key={l}
                href={`#${l}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                className={`border-b border-white/10 py-5 text-3xl font-light text-silver-100 transition-all duration-500 hover:text-accent ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {t.nav[l]}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-auto">
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </>
  );
}
