"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui/Reveal";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="mt-5 text-3xl font-light leading-tight text-silver-100 sm:text-4xl lg:text-[2.7rem]">
              {t.about.title}
            </h2>
            <p className="mt-6 leading-relaxed text-silver-400">{t.about.text}</p>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {t.about.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="glass group h-full rounded-2xl p-7 transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.07]">
                <span className="text-xs tracking-widest text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg text-silver-100">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-400">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
