"use client";

import { useLang } from "./LanguageProvider";
import { Photo } from "./ui/Photo";
import { useParallax } from "./ui/useParallax";
import { ArrowRight } from "./ui/Icons";
import { HERO_IMAGE } from "@/lib/data";

export function Hero() {
  const { t } = useLang();
  const bg = useParallax<HTMLDivElement>(0.25);
  const art = useParallax<HTMLDivElement>(-0.12);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Parallax background */}
      <div ref={bg} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <Photo src={HERO_IMAGE} alt="" priority className="h-full w-full" imgClassName="scale-105" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,169,107,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/80 to-graphite-950/30" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-graphite-950 to-transparent" />

      {/* Architectural line-art: window frame drawing itself */}
      <div ref={art} className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-center justify-center lg:flex">
        <svg viewBox="0 0 400 520" className="h-[78%] w-auto animate-float opacity-80" fill="none" stroke="rgba(227,207,159,0.55)" strokeWidth="1">
          <rect className="draw" pathLength={2400} x="20" y="20" width="360" height="480" />
          <rect className="draw" pathLength={2400} x="42" y="42" width="316" height="436" stroke="rgba(197,202,209,0.35)" />
          <line className="draw" pathLength={2400} x1="200" y1="42" x2="200" y2="478" stroke="rgba(197,202,209,0.35)" />
          <line className="draw" pathLength={2400} x1="42" y1="260" x2="358" y2="260" stroke="rgba(197,202,209,0.35)" />
          <path className="draw" pathLength={2400} d="M42 478 L200 260 L42 42" stroke="rgba(200,169,107,0.5)" strokeDasharray="0" />
          <circle className="draw" pathLength={2400} cx="184" cy="260" r="4" />
        </svg>
      </div>

      <div className="container-x relative z-10 pb-24 pt-36">
        <p className="eyebrow animate-fadeUp" style={{ animationDelay: "2.2s" }}>
          {t.hero.eyebrow}
        </p>
        <h1
          className="mt-6 max-w-3xl animate-fadeUp text-[2.4rem] font-light leading-[1.12] text-silver-100 sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "2.35s" }}
        >
          {t.hero.title}
        </h1>
        <p
          className="mt-7 max-w-xl animate-fadeUp text-base leading-relaxed text-silver-300 sm:text-lg"
          style={{ animationDelay: "2.5s" }}
        >
          {t.hero.sub}
        </p>
        <div className="mt-10 flex animate-fadeUp flex-col gap-4 sm:flex-row" style={{ animationDelay: "2.65s" }}>
          <a href="#products" className="btn btn-primary group">
            {t.hero.cta1}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="btn btn-ghost">
            {t.hero.cta2}
          </a>
        </div>

        <div className="mt-16 flex animate-fadeUp flex-wrap gap-3" style={{ animationDelay: "2.8s" }}>
          {t.hero.chips.map((c) => (
            <span key={c} className="glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-silver-300">
              {c}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-wideplus text-silver-400 transition hover:text-accent md:flex"
      >
        {t.hero.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-[fadeUp_1.6s_ease-in-out_infinite] bg-accent" />
        </span>
      </a>
    </section>
  );
}
