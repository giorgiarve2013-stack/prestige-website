"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/dictionary";

interface Ctx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "prestige-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // სერვერზე და პირველ რენდერზე ყოველთვის ქართული (ჰიდრატაციის უსაფრთხოებისთვის)
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ka") setLangState(saved);
    } catch {
      /* localStorage მიუწვდომელია */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
