"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { Photo } from "./ui/Photo";
import { ArrowRight, Check, Close } from "./ui/Icons";
import { PRODUCT_IDS, productImages, type ProductId } from "@/lib/data";

export function Products() {
  const { t } = useLang();
  const [active, setActive] = useState<ProductId | null>(null);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [active]);

  const orderProduct = (id: ProductId) => {
    setActive(null);
    window.dispatchEvent(new CustomEvent("prestige:order", { detail: { product: id } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const current = active ? t.products.items[active] : null;

  return (
    <section id="products" className="relative bg-graphite-900 py-28 sm:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.products.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-light leading-tight text-silver-100 sm:text-5xl">{t.products.title}</h2>
          <p className="mt-5 text-silver-400">{t.products.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_IDS.map((id, i) => {
            const p = t.products.items[id];
            return (
              <Reveal key={id} delay={(i % 3) * 100}>
                <button
                  type="button"
                  onClick={() => setActive(id)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite-800 text-left transition duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]"
                >
                  <Photo
                    src={productImages[id]}
                    alt={p.title}
                    label={p.title}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 aspect-[4/3] bg-gradient-to-t from-graphite-800/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-graphite-950/70 px-3 py-1 text-[10px] tracking-widest text-accent backdrop-blur">
                    0{i + 1}
                  </span>
                  <div className="p-6">
                    <h3 className="text-lg leading-snug text-silver-100">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver-400">{p.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
                      {t.products.details}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="text-xl text-silver-100 sm:text-2xl">{t.products.custom.title}</h3>
              <p className="mt-2 text-silver-400">{t.products.custom.text}</p>
            </div>
            <a href="#contact" className="btn btn-primary shrink-0">
              {t.products.custom.cta}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Product detail modal */}
      {active && current && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
        >
          <div
            className="relative grid max-h-[92vh] w-full max-w-5xl animate-fadeUp overflow-y-auto rounded-t-3xl border border-white/10 bg-graphite-900 sm:rounded-3xl md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-graphite-950/70 text-silver-100 backdrop-blur transition hover:bg-accent hover:text-graphite-950"
              aria-label={t.portfolio.close}
            >
              <Close />
            </button>
            <Photo src={productImages[active]} alt={current.title} label={current.title} className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[420px]" />
            <div className="p-7 sm:p-10">
              <p className="eyebrow">{t.products.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-light text-silver-100 sm:text-3xl">{current.title}</h3>
              <p className="mt-5 leading-relaxed text-silver-400">{current.desc}</p>
              <h4 className="mt-8 text-xs uppercase tracking-wideplus text-silver-500">{t.products.features}</h4>
              <ul className="mt-4 space-y-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-silver-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => orderProduct(active)} className="btn btn-primary mt-10 w-full sm:w-auto">
                {t.products.order}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
