"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { Photo } from "./ui/Photo";
import { Chevron, Close, Expand } from "./ui/Icons";
import { CATEGORY_IDS, portfolio, type CategoryId } from "@/lib/data";

const ratioClass = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export function Portfolio() {
  const { t } = useLang();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => portfolio.filter((p) => filter === "all" || p.category === filter),
    [filter]
  );

  const label = (cat: CategoryId, id: number) => `${t.portfolio.categories[cat]} · 0${id}`;

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open !== null ? items[open] : null;

  return (
    <section id="portfolio" className="py-28 sm:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.portfolio.eyebrow}</p>
            <h2 className="mt-5 text-3xl font-light leading-tight text-silver-100 sm:text-5xl">{t.portfolio.title}</h2>
            <p className="mt-5 text-silver-400">{t.portfolio.sub}</p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist">
            {(["all", ...CATEGORY_IDS] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-xs tracking-wide transition duration-300 ${
                  filter === c
                    ? "border-silver-100 bg-silver-100 text-graphite-950"
                    : "border-white/15 text-silver-300 hover:border-accent hover:text-accent"
                }`}
              >
                {c === "all" ? t.portfolio.all : t.portfolio.categories[c]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${t.portfolio.open}: ${label(p.category, p.id)}`}
              className="group relative block w-full break-inside-avoid animate-fadeUp overflow-hidden rounded-2xl border border-white/10 text-left"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Photo
                src={p.image}
                alt={label(p.category, p.id)}
                label={t.portfolio.placeholder}
                className={`${ratioClass[p.ratio]} w-full`}
                imgClassName="transition duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-graphite-950/85 via-graphite-950/10 to-transparent p-5 opacity-0 transition duration-500 group-hover:opacity-100">
                <div>
                  <p className="text-[10px] uppercase tracking-wideplus text-accent">{t.portfolio.categories[p.category]}</p>
                  <p className="mt-1 text-sm text-silver-100">0{p.id}</p>
                </div>
                <span className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-silver-100 text-graphite-950 transition duration-500 group-hover:translate-y-0">
                  <Expand className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-graphite-950/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={label(current.category, current.id)}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-silver-100 transition hover:border-accent hover:text-accent"
            aria-label={t.portfolio.close}
          >
            <Close />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-silver-100 transition hover:border-accent hover:text-accent sm:left-8"
                aria-label={t.portfolio.prev}
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-silver-100 transition hover:border-accent hover:text-accent sm:right-8"
                aria-label={t.portfolio.next}
              >
                <Chevron dir="right" />
              </button>
            </>
          )}
          <div key={current.id} className="w-full max-w-6xl animate-fadeUp px-4 sm:px-24" onClick={(e) => e.stopPropagation()}>
            <Photo
              src={current.image}
              alt={label(current.category, current.id)}
              label={t.portfolio.placeholder}
              className="mx-auto aspect-[4/3] max-h-[78vh] w-full rounded-xl"
              imgClassName="!object-contain"
            />
            <p className="mt-4 text-center text-xs uppercase tracking-wideplus text-silver-400">
              {label(current.category, current.id)} &nbsp;·&nbsp; {(open ?? 0) + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
