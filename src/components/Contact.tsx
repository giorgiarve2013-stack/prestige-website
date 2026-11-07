"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { Clock, Mail, Phone, Pin, WhatsApp } from "./ui/Icons";
import { site, telHref } from "@/lib/site";
import { PRODUCT_IDS } from "@/lib/data";
import { emptyValues, validate, type Errors, type FormKind, type FormValues } from "@/lib/validation";

function InfoRow({
  icon,
  label,
  value,
  href,
  fill,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  fill: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 py-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-wideplus text-silver-500">{label}</p>
        {value ? (
          href ? (
            <a href={href} className="mt-1 block text-silver-100 transition hover:text-accent">{value}</a>
          ) : (
            <p className="mt-1 text-silver-100">{value}</p>
          )
        ) : (
          <p className="mt-1 inline-block rounded border border-dashed border-white/20 px-2 py-0.5 text-sm italic text-silver-500">{fill}</p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-silver-400">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  const [kind, setKind] = useState<FormKind>("contact");
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // „შეუკვეთე ეს პროდუქტი“ ღილაკი პროდუქციის მოდალიდან
  useEffect(() => {
    const onOrder = (e: Event) => {
      const product = (e as CustomEvent<{ product: string }>).detail?.product ?? "";
      setKind("order");
      setStatus("idle");
      setValues((v) => ({ ...v, product }));
    };
    window.addEventListener("prestige:order", onOrder);
    return () => window.removeEventListener("prestige:order", onOrder);
  }, []);

  const switchKind = (k: FormKind) => {
    setKind(k);
    setErrors({});
    setStatus("idle");
  };

  const set = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const err = (key: keyof FormValues) => (errors[key] ? t.form.errors[errors[key]!] : undefined);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(kind, values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const productLabel = values.product
        ? t.products.items[values.product as (typeof PRODUCT_IDS)[number]]?.title ?? values.product
        : "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, lang, values: { ...values, product: productLabel } }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("ok");
      setValues(emptyValues);
    } catch {
      setStatus("error");
    }
  };

  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`
    : "#contact-form";

  const tab = (k: FormKind, text: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={kind === k}
      onClick={() => switchKind(k)}
      className={`flex-1 rounded-full px-4 py-2.5 text-sm transition duration-300 ${
        kind === k ? "bg-silver-100 text-graphite-950" : "text-silver-300 hover:text-white"
      }`}
    >
      {text}
    </button>
  );

  return (
    <section id="contact" className="py-28 sm:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-light text-silver-100 sm:text-5xl">{t.contact.title}</h2>
          <p className="mt-5 text-silver-400">{t.contact.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Info + map */}
          <Reveal className="lg:col-span-5">
            <div>
              <InfoRow icon={<Phone />} label={t.contact.phone} value={site.phone} href={site.phone ? telHref(site.phone) : undefined} fill={t.contact.fill} />
              <InfoRow icon={<Mail />} label={t.contact.email} value={site.email} href={site.email ? `mailto:${site.email}` : undefined} fill={t.contact.fill} />
              <InfoRow icon={<Pin />} label={t.contact.address} value={site.address} fill={t.contact.fill} />
              <InfoRow icon={<Clock />} label={t.contact.hours} value={site.hours} fill={t.contact.fill} />
            </div>

            <a
              href={waHref}
              target={site.whatsapp ? "_blank" : undefined}
              rel={site.whatsapp ? "noopener noreferrer" : undefined}
              className="btn mt-8 w-full bg-[#25D366] text-graphite-950 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(37,211,102,.7)]"
            >
              <WhatsApp /> {t.contact.whatsapp}
            </a>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              {site.mapEmbedUrl ? (
                <iframe
                  src={site.mapEmbedUrl}
                  title={t.contact.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 grayscale invert-[.92] contrast-[.9] hue-rotate-180"
                  allowFullScreen
                />
              ) : (
                <div className="frame-pattern flex h-72 items-center justify-center p-6 text-center text-sm italic text-silver-500">
                  {t.contact.mapMissing}
                </div>
              )}
            </div>
            {site.mapUrl && (
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-4 w-full"
              >
                <Pin /> {t.contact.viewMap}
              </a>
            )}
          </Reveal>

          {/* Forms */}
          <Reveal delay={120} className="lg:col-span-7">
            <div id="contact-form" className="glass rounded-3xl p-6 sm:p-10">
              <div role="tablist" className="mb-8 flex gap-1 rounded-full border border-white/10 p-1">
                {tab("contact", t.contact.tabContact)}
                {tab("order", t.contact.tabOrder)}
              </div>

              {status === "ok" ? (
                <div role="status" className="animate-fadeUp rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center text-silver-100">
                  {t.form.success}
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.form.name} error={err("name")}>
                    <input name="name" value={values.name} onChange={set("name")} autoComplete="name" className="field" aria-invalid={!!errors.name} />
                  </Field>
                  <Field label={t.form.phone} error={err("phone")}>
                    <input name="phone" type="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" className="field" aria-invalid={!!errors.phone} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label={t.form.email} error={err("email")}>
                      <input name="email" type="email" value={values.email} onChange={set("email")} autoComplete="email" className="field" aria-invalid={!!errors.email} />
                    </Field>
                  </div>

                  {kind === "order" && (
                    <>
                      <div className="sm:col-span-2">
                        <Field label={t.form.product} error={err("product")}>
                          <select name="product" value={values.product} onChange={set("product")} className="field" aria-invalid={!!errors.product}>
                            <option value="">{t.form.productPh}</option>
                            {PRODUCT_IDS.map((id) => (
                              <option key={id} value={id} className="bg-graphite-900">
                                {t.products.items[id].title}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <Field label={t.form.size} error={err("size")}>
                        <input name="size" value={values.size} onChange={set("size")} placeholder={t.form.sizePh} className="field" />
                      </Field>
                      <Field label={t.form.city} error={err("city")}>
                        <input name="city" value={values.city} onChange={set("city")} className="field" />
                      </Field>
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <Field label={kind === "contact" ? t.form.message : t.form.messageOpt} error={err("message")}>
                      <textarea name="message" rows={5} value={values.message} onChange={set("message")} className="field resize-none" aria-invalid={!!errors.message} />
                    </Field>
                  </div>

                  {/* honeypot */}
                  <input
                    name="website"
                    value={values.website}
                    onChange={set("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                      {status === "sending" ? t.form.sending : kind === "order" ? t.form.sendOrder : t.form.send}
                    </button>
                    {status === "error" && (
                      <p role="alert" className="mt-4 text-sm text-red-300">{t.form.failure}</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
