"use client";

import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "./i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Dil önekli iç link üretir: P("/strecken") → "/de/strecken" */
  P: (path: string) => string;
};

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  P: (p) => p,
});

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (l: Lang) => {
    if (l === lang) return;
    // Mevcut yolun dil önekini değiştir: /de/strecken → /en/strecken
    const rest = pathname.replace(/^\/(de|en)(?=\/|$)/, "");
    router.push(`/${l}${rest || ""}`);
  };

  const P = (path: string) => (path === "/" ? `/${lang}` : `/${lang}${path}`);

  return <LangContext.Provider value={{ lang, setLang, P }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
