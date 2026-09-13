// ─────────────────────────────────────────────────────────────
//  ÖLÇÜM — İş olayı Data Layer'ı (Data Layer Technical Specification v1.3.5, Faz 1: tarayıcı hattı)
//
//  Tek kural: uygulama yalnızca İŞ olayı basar (booking_search, vehicle_select…).
//  GA4 / Google Ads / Meta eşlemeleri GTM içinde reklamcı tarafından yapılır.
//  Kişisel veri (ad, e-posta, telefon, ham adres) ASLA dataLayer'a yazılmaz.
//
//  Bu dosya React'e bağımlı değildir; istemci bileşenlerinden çağrılır.
// ─────────────────────────────────────────────────────────────

import { routes, SWISS_PLACES, VAT_RATE, SITE_URL, type LocalName } from "../config";

export const SCHEMA_VERSION = "1.3.5";
export const ENVIRONMENT =
  process.env.NODE_ENV === "production" ? "production" : "development";

type DL = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DL[];
  }
}

const dl = (): DL[] | null => {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};

/** Unix epoch saniye (olayın gerçekleştiği an) */
export const nowSec = () => Math.floor(Date.now() / 1000);

/** Kısa rastgele kimlik: prefix_XXXXXXXXXXXX (base36) */
export function newId(prefix: string): string {
  let rnd = "";
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const a = new Uint32Array(3);
    crypto.getRandomValues(a);
    rnd = Array.from(a, (n) => n.toString(36)).join("").toUpperCase();
  } else {
    rnd = Math.random().toString(36).slice(2, 14).toUpperCase();
  }
  return `${prefix}_${rnd.slice(0, 12)}`;
}

// ── Reset (spec §5.6) ─────────────────────────────────────────
// Olaya bağlı nesneler temizlenir ki bir önceki olayın route/vehicle verisi
// bir sonraki olaya sızmasın. Reset push'unun `event` alanı YOKTUR → etiket tetiklemez.
export function resetBusinessDataLayerState() {
  dl()?.push({
    event_id: null, event_time: null, event_source: null,
    booking: null, route: null, destination: null, vehicle: null,
    service: null, results: null, ecommerce: null, contact: null,
    lead: null, error: null, cta: null, payment: null, refund: null,
    adjustment: null, call: null, mirror: null, source: null, language: null,
  });
}
export function resetPageDataLayerState() {
  resetBusinessDataLayerState();
  dl()?.push({ page: null });
}

// ── Sayfa bağlamı (spec §7) ───────────────────────────────────
export type PageType =
  | "home" | "routes" | "route_detail" | "destinations" | "destination_detail"
  | "prices" | "events" | "event_detail" | "vehicles" | "vehicle_detail"
  | "booking" | "booking_confirmation" | "contact" | "gallery" | "blog" | "blog_detail"
  | "about" | "faq" | "legal" | "other";

export type PageContext = {
  page_type: PageType;
  page_language: string;
  page_path: string;
  page_location: string;
  page_referrer?: string;
  page_name?: string;
  page_id?: string;
};

let currentPage: PageContext | null = null;
export const getPageContext = () => currentPage;

/** Sayfa bağlamı: event_id/event_time gerektirmeyen tek olay. Manuel GA4 page_view bunu takip eder (GTM). */
export function pushPageContext(page: PageContext) {
  currentPage = page;
  resetPageDataLayerState();
  dl()?.push({
    schema_version: SCHEMA_VERSION,
    environment: ENVIRONMENT,
    event_source: "browser",
    event: "page_context",
    page,
  });
}

// ── Genel olay zarfı (spec §5.5) ──────────────────────────────
/**
 * İş olayı basar. Zarfı (schema/env/source/id/time) ve mevcut sayfa bağlamını ekler.
 * @returns kullanılan event_id
 */
export function pushEvent(event: string, payload: DL, opts: { id?: string; idPrefix?: string } = {}): string {
  const event_id = opts.id ?? newId(opts.idPrefix ?? event);
  resetBusinessDataLayerState();
  const page = currentPage
    ? { page_type: currentPage.page_type, page_language: currentPage.page_language, page_path: currentPage.page_path, page_location: currentPage.page_location }
    : undefined;
  dl()?.push({
    schema_version: SCHEMA_VERSION,
    environment: ENVIRONMENT,
    event_source: "browser",
    event,
    event_id,
    event_time: nowSec(),
    ...(page ? { page } : {}),
    ...payload,
  });
  return event_id;
}

// ── URL temizliği (spec §7.4) ─────────────────────────────────
// Rezervasyon parametreleri (from/to/date/…) özel veri içerebilir; uygulama onları
// okuduktan SONRA adres çubuğundan silinir. Yalnızca onaylı reklam parametreleri kalır.
const KEEP_QUERY_KEYS = new Set([
  "gclid", "gbraid", "wbraid", "fbclid",
  "utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content",
]);
const TOKEN = /^[A-Za-z0-9._~-]{1,1024}$/;

export function sanitizeBrowserUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.search && !url.hash) return;
  const kept = new URLSearchParams();
  for (const key of KEEP_QUERY_KEYS) {
    const values = url.searchParams.getAll(key);
    if (values.length === 1 && TOKEN.test(values[0])) kept.set(key, values[0]);
  }
  const next = url.pathname + (kept.toString() ? `?${kept}` : "");
  if (next === url.pathname + url.search + url.hash) return;
  // Next.js router durumunu koru; yalnızca görünen adresi değiştir.
  window.history.replaceState(window.history.state, "", next);
}

/** Aynı siteden gelen yönlendiricide sorgu kısmı atılır; dış yönlendirici olduğu gibi kalır. */
export function safeReferrer(): string | undefined {
  if (typeof document === "undefined" || !document.referrer) return undefined;
  try {
    const r = new URL(document.referrer);
    return r.origin === window.location.origin ? r.origin + r.pathname : document.referrer;
  } catch {
    return undefined;
  }
}

export const pageLocation = (path: string) => `${SITE_URL}${path}`;

// ── Konum normalizasyonu (spec §8.6 / §13.3) ──────────────────
export type SafeLocation = { location_id?: string; name?: string; type: "airport" | "city" | "address" };

export const AIRPORT_LOCATION: SafeLocation = { location_id: "zrh_airport", name: "Zurich Airport (ZRH)", type: "airport" };

const norm = (s: string) =>
  s.toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u")
   .replace(/é|è|ê/g, "e").replace(/â|à/g, "a").replace(/î/g, "i");
const slug = (s: string) => norm(s).replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const enName = (n: LocalName) => (typeof n === "string" ? n : n.en);

/**
 * Serbest metin konumu güvenli sınıfa indirger:
 *  havalimanı → airport · sabit rota hedefi / bilinen İsviçre yeri → city · diğer her şey → address (ad YOK)
 */
export function safeLocation(text: string): SafeLocation {
  const q = norm(text.trim());
  if (!q) return { type: "address" };
  if (/zrh|flughafen|airport/.test(q)) return AIRPORT_LOCATION;
  const route = routes.find((r) => {
    const names = typeof r.to === "string" ? [r.to] : [r.to.de, r.to.en];
    return names.some((nm) => q === norm(nm) || q.includes(norm(nm)));
  });
  if (route) return { location_id: slug(enName(route.to)), name: enName(route.to), type: "city" };
  const place = SWISS_PLACES.find((p) => norm(p) === q);
  if (place) return { location_id: slug(place), name: place, type: "city" };
  return { type: "address" };
}

/** "zurich-airport-to-basel" → "zrh_basel" */
export const routeId = (routeSlug: string) => `zrh_${slug(routeSlug.replace(/^zurich-airport-to-/, ""))}`;

// ── Para (spec §8.9): KDV dahil brüt → net + KDV ─────────────
export function splitVat(gross: number) {
  const g = Math.round(gross * 100);
  const net = Math.round(g / (1 + VAT_RATE));
  return { gross: g / 100, net: net / 100, tax: (g - net) / 100 };
}

// ── Sık kullanılan kısayollar ────────────────────────────────
export type ContactMethod = "whatsapp" | "phone" | "email";
export function trackContactClick(method: ContactMethod, location: string, extra: DL = {}) {
  pushEvent(`${method}_click`, { contact: { method, location }, ...extra }, { idPrefix: "contact" });
}

export function trackCta(id: string, name: string, location: string) {
  pushEvent("cta_click", { cta: { id, name, location } }, { idPrefix: "cta" });
}

export function trackLanguageChange(from: string, to: string) {
  if (from === to) return;
  pushEvent("language_change", { language: { from_language: from, to_language: to } }, { idPrefix: "language" });
}
