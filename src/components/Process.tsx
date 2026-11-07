"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { Photo } from "./ui/Photo";
import { useParallax } from "./ui/useParallax";

export function Process() {
  const { t } = useLang();
  const bg = useParallax<HTMLDivElement>(0.12);
  return (
    <section id="process" className="relative overflow-hidden bg-graphite-900 py-28 sm:py-36">
      <div ref={bg} className="absolute -inset-y-[10%] inset-x-0 opacity-25">
        <Photo src="/images/process.jpg" alt="" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-graphite-900 via-graphite-900/80 to-graphite-900" />
      <div className="container-x relative">
        <Reveal className="max-w-xl">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-light text-silver-100 sm:text-5xl">{t.process.title}</h2>
        </Reveal>
        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="glass group h-full rounded-2xl p-7 transition duration-500 hover:-translate-y-1.5 hover:border-accent/40">
                <span className="text-5xl font-extralight text-white/15 transition group-hover:text-accent/60">0{i + 1}</span>
                <h3 className="mt-6 text-lg text-silver-100">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-400">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
