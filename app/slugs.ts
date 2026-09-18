// ─────────────────────────────────────────────────────────────
//  DİLE GÖRE SAYFA SLUG'LARI — rota ve hedef sayfaları
//
//  İç anahtar (key) değişmez: rota için config.ts'teki slug (zurich-airport-to-luzern),
//  hedef için destinations.ts'teki slug (flughafentransfer-luzern). Bu anahtarlar
//  routeContent, routeMeta, ölçüm (routeId) ve blog iç linklerinde kullanılmaya devam eder.
//
//  Görünen URL dile göre üretilir:
//    Rota   DE  /de/flughafen-taxi-zuerich-luzern     EN  /en/zurich-airport-taxi-lucerne
//    Hedef  DE  /de/flughafentransfer-luzern           EN  /en/zurich-airport-transfer-lucerne
//
//  Eski/yanlış dildeki her biçim (alias) tanınır ve sayfa 308 ile kanonik URL'ye yönlendirir.
//  Bu dosya paths.ts'e İMPORT EDİLMEZ (proxy/edge paketi büyümesin); P() ve sunucu
//  yardımcıları buradan `localizeSlugPath` kullanır.
// ─────────────────────────────────────────────────────────────
import { routes } from "./config";
import { allDestinationSlugs } from "./destinations";
import type { LangCode } from "./paths";

export type SlugKind = "route" | "dest";
export type Resolved = { kind: SlugKind; key: string; canonical: string };

// Şehir parçası çevirileri (yalnızca farklı olanlar)
const ROUTE_CITY_EN: Record<string, string> = { luzern: "lucerne", geneva: "geneva", fribourg: "fribourg" };
const ROUTE_CITY_DE: Record<string, string> = { geneva: "genf", fribourg: "freiburg", lucerne: "luzern" };
const DEST_EN: Record<string, string> = {
  zuerich: "zurich", geneve: "geneva", luzern: "lucerne",
  "flughafen-genf-gva": "geneva-airport-gva", "flughafen-bern-belp": "bern-airport-belp", "flughafen-lugano": "lugano-airport",
  "zuerich-hb": "zurich-main-station", "bern-hb": "bern-main-station", "geneve-cornavin": "geneva-cornavin", "lausanne-gare": "lausanne-station",
};

const ROUTE_PREFIX = "zurich-airport-to-";
const DEST_PREFIX = "flughafentransfer-";

/** Rota anahtarı → dile göre slug */
export function routeSlug(key: string, lang: LangCode): string {
  const city = key.replace(ROUTE_PREFIX, "");
  return lang === "de"
    ? `flughafen-taxi-zuerich-${ROUTE_CITY_DE[city] ?? city}`
    : `zurich-airport-taxi-${ROUTE_CITY_EN[city] ?? city}`;
}

/** Hedef anahtarı → dile göre slug */
export function destSlug(key: string, lang: LangCode): string {
  if (lang === "de") return key;
  const x = key.replace(DEST_PREFIX, "");
  return `zurich-airport-transfer-${DEST_EN[x] ?? x}`;
}

// ── Kayıt defteri: her biçim → anahtar ────────────────────────
type Entry = { kind: SlugKind; key: string };
const registry = new Map<string, Entry>();
const register = (form: string, e: Entry) => { if (!registry.has(form)) registry.set(form, e); };

for (const r of routes) {
  const e: Entry = { kind: "route", key: r.slug };
  register(r.slug, e);                 // eski EN biçimi (zurich-airport-to-…)
  register(routeSlug(r.slug, "de"), e);
  register(routeSlug(r.slug, "en"), e);
}
for (const key of allDestinationSlugs()) {
  const e: Entry = { kind: "dest", key };
  register(key, e);                    // DE biçimi = anahtar
  register(destSlug(key, "en"), e);
}

/** Herhangi bir biçimi çözer; kanonik = istenen dildeki slug. Bilinmiyorsa null. */
export function resolveSlug(slug: string, lang: LangCode): Resolved | null {
  const e = registry.get(slug);
  if (!e) return null;
  return { kind: e.kind, key: e.key, canonical: e.kind === "route" ? routeSlug(e.key, lang) : destSlug(e.key, lang) };
}

/** Anahtar/biçim için dile göre görünen slug (bilinmiyorsa olduğu gibi) */
export function localizeSlug(slugOrKey: string, lang: LangCode): string {
  return resolveSlug(slugOrKey, lang)?.canonical ?? slugOrKey;
}

/**
 * Kök seviyeli iç yolu (/zurich-airport-to-luzern, /flughafentransfer-zug) dile göre çevirir.
 * Diğer yollar dokunulmadan döner; P() ve sitemap bunu localizePath'ten SONRA uygular.
 */
export function localizeSlugPath(path: string, lang: LangCode): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 1) return path;
  const c = localizeSlug(parts[0], lang);
  return c === parts[0] ? path : `/${c}`;
}

/** hreflang: her dil için kanonik slug yolu */
export function slugAlternates(key: string): Record<string, string> {
  const out: Record<string, string> = {};
  const r = resolveSlug(key, "en");
  if (!r) return out;
  out["x-default"] = `/en/${r.canonical}`;
  out.de = `/de/${localizeSlug(key, "de")}`;
  return out;
}

/** generateStaticParams: her dil için yalnızca kanonik slug'lar */
export function canonicalSlugParams(): { lang: LangCode; slug: string }[] {
  const out: { lang: LangCode; slug: string }[] = [];
  for (const lang of ["de", "en"] as LangCode[]) {
    for (const r of routes) out.push({ lang, slug: routeSlug(r.slug, lang) });
    for (const key of allDestinationSlugs()) out.push({ lang, slug: destSlug(key, lang) });
  }
  return out;
}
