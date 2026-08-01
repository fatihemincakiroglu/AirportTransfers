"use client";

import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "./i18n";
import { localizePath, internalizePath } from "./paths";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** İç yoldan dil önekli GÖRÜNEN link üretir: P("/strecken") → "/en/routes" */
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
    // /en/contact → (iç) /kontakt → /de/kontakt
    const rest = pathname.replace(/^\/(de|en)(?=\/|$)/, "") || "/";
    const internal = internalizePath(rest, lang);
    const target = localizePath(internal, l);
    router.push(`/${l}${target === "/" ? "" : target}`);
  };

  const P = (path: string) => {
    const pub = localizePath(path, lang);
    return pub === "/" ? `/${lang}` : `/${lang}${pub}`;
  };

  return <LangContext.Provider value={{ lang, setLang, P }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
