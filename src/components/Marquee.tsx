"use client";

import { useLang } from "./LanguageProvider";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-graphite-900 py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-light uppercase tracking-[0.25em] text-silver-400">
            {m}
            <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
