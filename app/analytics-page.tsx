"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "./providers";
import { internalizePath, LANGS } from "./paths";
import { routes } from "./config";
import {
  pushPageContext, sanitizeBrowserUrl, safeReferrer, pageLocation,
  trackContactClick, trackLanguageChange, routeId, type PageType, type PageContext,
} from "./lib/analytics";

/** İç anahtar → page_type (spec §7.2) */
const PAGE_TYPES: Record<string, PageType> = {
  "": "home",
  strecken: "routes",
  staedte: "destinations",
  preise: "prices",
  events: "events",
  fahrzeuge: "vehicles",
  galerie: "gallery",
  blog: "blog",
  faq: "faq",
  kontakt: "contact",
  "ueber-uns": "about",
  buchung: "booking",
  datenschutz: "legal",
  cookies: "legal",
  agb: "legal",
  rueckerstattung: "legal",
};

function describePage(pathname: string, lang: string): PageContext {
  const rest = pathname.replace(new RegExp(`^/(${LANGS.join("|")})(?=/|$)`), "") || "/";
  const internal = internalizePath(rest, lang as "de" | "en");
  const parts = internal.split("/").filter(Boolean);
  const key = parts[0] ?? "";
  let page_type: PageType = PAGE_TYPES[key] ?? "other";
  let page_id: string | undefined;

  if (parts.length === 1 && !(key in PAGE_TYPES)) {
    // Kök seviyede sabit rota sayfası: /en/zurich-airport-to-basel
    const r = routes.find((x) => x.slug === key);
    if (r) { page_type = "route_detail"; page_id = routeId(r.slug); }
  } else if (parts.length >= 2) {
    if (key === "staedte") { page_type = "destination_detail"; page_id = `destination_${parts[1]}`; }
    else if (key === "events") { page_type = "event_detail"; page_id = `event_${parts[1]}`; }
    else if (key === "blog") { page_type = "blog_detail"; page_id = `blog_${parts[1]}`; }
  }

  return {
    page_type,
    page_language: lang,
    page_path: pathname,
    page_location: pageLocation(pathname),
    page_referrer: safeReferrer(),
    ...(page_id ? { page_id } : {}),
  };
}

/** Tıklanan iletişim bağlantısının konum etiketi: en yakın data-track-location, yoksa sayfa türü */
function contactLocation(el: HTMLElement, pageType: PageType): string {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation;
  if (el.closest("footer")) return "footer";
  if (el.closest("header")) return "header";
  return pageType;
}

/**
 * Her sayfa/rota geçişinde:
 *  1) rezervasyon sorgu parametrelerini adres çubuğundan siler (uygulama zaten okudu),
 *  2) page_context basar (GTM manuel page_view bunu takip eder),
 *  3) dil değişimini ölçer,
 *  4) WhatsApp / telefon / e-posta tıklamalarını tek dinleyiciyle yakalar.
 */
export default function AnalyticsPage() {
  const pathname = usePathname();
  const { lang } = useLang();
  const prevLang = useRef<string | null>(null);
  const pageTypeRef = useRef<PageType>("other");

  useEffect(() => {
    // Alt bileşenlerin efektleri (ör. rezervasyon sayfasının URL okuması) bundan önce çalışır.
    sanitizeBrowserUrl();
    const page = describePage(pathname, lang);
    pageTypeRef.current = page.page_type;
    pushPageContext(page);
    if (prevLang.current && prevLang.current !== lang) trackLanguageChange(prevLang.current, lang);
    prevLang.current = lang;
  }, [pathname, lang]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.closest("[data-track-skip]")) return;
      const href = a.getAttribute("href") ?? "";
      const loc = contactLocation(a, pageTypeRef.current);
      if (href.startsWith("tel:")) trackContactClick("phone", loc);
      else if (href.startsWith("mailto:")) trackContactClick("email", loc);
      else if (/wa\.me|api\.whatsapp\.com|whatsapp:/.test(href)) trackContactClick("whatsapp", loc);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
