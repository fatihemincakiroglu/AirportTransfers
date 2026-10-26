"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "./providers";
import { internalizePath, LANGS } from "./paths";
import { resolveSlug } from "./slugs";
import {
  pushPageContext, sanitizeBrowserUrl, safeReferrer, pageLocation,
  trackContactClick, trackLanguageChange, routeId, waRef, getAttribution, type PageType, type PageContext,
} from "./lib/analytics";

/**
 * WhatsApp bağlantısını tıklama anında süsler: ön dolu mesaj (yoksa) + "Ref: XXXXXX".
 * Bağlantı varsayılan davranışıyla açılmadan önce (yakalama aşaması) href değiştirilir.
 */
function decorateWhatsApp(a: HTMLAnchorElement, lang: string): string {
  const ref = waRef();
  try {
    const u = new URL(a.href);
    const fallback = lang === "de" ? "Hallo, ich möchte einen Transfer buchen." : "Hello, I'd like to book a transfer.";
    const text = u.searchParams.get("text") || fallback;
    if (!/Ref: [A-Z2-9]{6}/.test(text)) u.searchParams.set("text", `${text}\n\nRef: ${ref}`);
    a.href = u.toString();
  } catch { /* bozuk href: dokunma */ }
  // Kod ↔ reklam kaynağı eşlemesi (gclid/gbraid/wbraid/UTM) sunucuda saklanır
  try {
    const body = JSON.stringify({ ref, lang, page: window.location.pathname, ...getAttribution() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/wa-ref", new Blob([body], { type: "application/json" }));
    else fetch("/api/wa-ref", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch { /* ölçüm akışı bozmaz */ }
  return ref;
}

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
  impressum: "legal",
};

function describePage(pathname: string, lang: string): PageContext {
  const rest = pathname.replace(new RegExp(`^/(${LANGS.join("|")})(?=/|$)`), "") || "/";
  const internal = internalizePath(rest, lang as "de" | "en");
  const parts = internal.split("/").filter(Boolean);
  const key = parts[0] ?? "";
  let page_type: PageType = PAGE_TYPES[key] ?? "other";
  let page_id: string | undefined;

  if (parts.length === 1 && !(key in PAGE_TYPES)) {
    // Kök seviyede rota ya da hedef sayfası (dile göre slug, anahtar üzerinden çözülür)
    const r = resolveSlug(key, lang as "de" | "en");
    if (r?.kind === "route") { page_type = "route_detail"; page_id = routeId(r.key); }
    else if (r?.kind === "dest") { page_type = "destination_detail"; page_id = `destination_${r.key.replace(/^flughafentransfer-/, "")}`; }
  } else if (parts.length >= 2) {
    if (key === "buchung") page_type = "booking_confirmation";
    else if (key === "staedte") { page_type = "destination_detail"; page_id = `destination_${parts[1]}`; }
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
  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

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
      else if (/wa\.me|api\.whatsapp\.com|whatsapp:/.test(href)) {
        const ref = /wa\.me|api\.whatsapp\.com/.test(href) ? decorateWhatsApp(a, langRef.current) : undefined;
        trackContactClick("whatsapp", loc, {}, ref ? { ref } : {});
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
