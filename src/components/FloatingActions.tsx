"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useLang } from "./LanguageProvider";
import { WhatsApp } from "./ui/Icons";

/** მცურავი WhatsApp ღილაკი. თუ ნომერი არ არის შევსებული, ღილაკი მიდის კონტაქტის ფორმაზე. */
export function FloatingActions() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const href = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`
    : "#contact-form";

  return (
    <a
      href={href}
      target={site.whatsapp ? "_blank" : undefined}
      rel={site.whatsapp ? "noopener noreferrer" : undefined}
      aria-label="WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-graphite-950 shadow-[0_10px_30px_-8px_rgba(37,211,102,.6)] transition duration-500 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  );
}
