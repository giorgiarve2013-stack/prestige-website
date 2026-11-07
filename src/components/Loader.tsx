"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("hide"), 1700);
    const t2 = setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = "";
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950 transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
        phase === "hide" ? "pointer-events-none -translate-y-full" : ""
      }`}
    >
      <div className="loader-title text-2xl font-light uppercase text-silver-100 opacity-0 sm:text-3xl">
        PRESTIGE
      </div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <div className="loader-line h-full w-full bg-accent" />
      </div>
    </div>
  );
}
