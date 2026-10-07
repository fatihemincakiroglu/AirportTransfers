// ─────────────────────────────────────────────────────────────
//  BLOG TAKSONOMİSİ — kategoriler, rota bağlantıları, ilgili yazılar
//
//  Her yazı için:
//    cats   = blog listesindeki filtre kategorileri (ilk kategori kartta etiket olarak görünür)
//    routes = yazının ASIL konusu olan sabit rotalar (config.ts anahtarları). Rota sayfasındaki
//             "Mehr zur Strecke" kutusu bu listeden beslenir — ilk sıradaki rota en güçlü bağdır.
//    dest   = yazı içi fiyat hesaplayıcısında önceden doldurulan varış (yoksa routes[0])
//
//  Yeni yazı eklerken buraya da bir satır ekle; eksikse yazı "tips" kategorisine düşer
//  ve hesaplayıcı varışı boş açılır.
// ─────────────────────────────────────────────────────────────
import type { BlogPost } from "./blogContent";
import { blogPosts } from "./blogContent";

export type BlogCat = "airport" | "routes" | "winter" | "events" | "tips";

type L10n = { de: string; en: string };

export const blogCats: { key: BlogCat; label: L10n }[] = [
  { key: "airport", label: { de: "Flughafen", en: "Airport" } },
  { key: "routes", label: { de: "Strecken & Ziele", en: "Routes & destinations" } },
  { key: "winter", label: { de: "Winter & Ski", en: "Winter & ski" } },
  { key: "events", label: { de: "Events", en: "Events" } },
  { key: "tips", label: { de: "Reisetipps", en: "Travel tips" } },
];

export type BlogMeta = { cats: BlogCat[]; routes?: string[]; dest?: string };

const R = (city: string) => `zurich-airport-to-${city}`;

export const blogMeta: Record<string, BlogMeta> = {
  // ── Reiseplanung & praktische Tipps ──
  "autobahnvignette-schweiz-2027-preis-e-vignette": { cats: ["tips"] },
  "swiss-travel-pass-lohnt-sich-vergleich-transfer": { cats: ["tips"] },
  "beste-reisezeit-schweiz-monat-fuer-monat": { cats: ["tips"] },
  "bezahlen-schweiz-euro-franken-karte": { cats: ["tips"] },
  "schweiz-reiseplan-7-tage-ab-zuerich": { cats: ["tips", "routes"], routes: [R("luzern"), R("interlaken"), R("zermatt")] },
  "jungfraujoch-titlis-pilatus-vergleich": { cats: ["routes", "tips"], routes: [R("engelberg"), R("interlaken"), R("luzern"), R("grindelwald"), R("wengen")] },
  "mit-hund-oder-katze-ab-flughafen-zuerich-transfer": { cats: ["tips"] },
  "firmentransfers-zuerich-rechnung-mwst-spesen": { cats: ["tips"], routes: [R("zug")], dest: "Zug" },
  "trinkgeld-taxi-schweiz-was-ist-ueblich": { cats: ["tips"] },
  "gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug": { cats: ["tips"] },
  "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse": { cats: ["tips"] },
  "24-stunden-in-zuerich": { cats: ["tips"], dest: "Zürich" },
  "mit-kindern-reisen-kindersitze-schweiz": { cats: ["tips"] },
  "business-travel-zuerich-tipps": { cats: ["tips"], routes: [R("zug"), R("basel"), R("bern")] },
  "festpreis-transfers-erklaert": { cats: ["tips"] },
  "barrierefrei-reisen-flughafen-zuerich-transfer": { cats: ["airport", "tips"] },

  // ── Flughafen Zürich ──
  "parkieren-flughafen-zuerich-preise-alternative": { cats: ["airport"] },
  "wie-frueh-am-flughafen-zuerich-sein-check-in": { cats: ["airport"] },
  "flughafen-zuerich-terminals-docks-erklaert": { cats: ["airport"] },
  "hotels-flughafen-zuerich-uebernachten": { cats: ["airport"] },
  "gepaeck-verloren-flughafen-zuerich-was-tun": { cats: ["airport"] },
  "lounges-flughafen-zuerich-zugang": { cats: ["airport"] },
  "7-fehler-flughafen-zuerich-vermeiden": { cats: ["airport"] },
  "uber-taxi-oder-privater-transfer-flughafen-zuerich": { cats: ["airport"] },
  "nachtankunft-flughafen-zuerich-nach-23-uhr": { cats: ["airport"], dest: "Zürich" },
  "ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich": { cats: ["airport"] },
  "flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer": { cats: ["airport"] },
  "zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun": { cats: ["airport"], dest: "Zürich" },
  "wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen": { cats: ["airport"], routes: [R("basel"), R("luzern"), R("bern")] },
  "taxi-oder-zug-flughafen-zuerich": { cats: ["airport"] },
  "genf-oder-zuerich-flughafen-alpen": { cats: ["airport", "routes"], routes: [R("geneva"), R("lausanne"), R("montreux"), R("verbier")] },

  // ── Strecken & Ziele ──
  "flughafen-zuerich-interlaken-transfer-guide": { cats: ["routes"], routes: [R("interlaken"), R("grindelwald"), R("wengen")] },
  "zuerich-comer-see-transfer-tagesausflug": { cats: ["routes"], routes: [R("lugano")], dest: "Como, Italien" },
  "zuerich-muenchen-transfer-zug-auto-vergleich": { cats: ["routes"], dest: "München, Deutschland" },
  "zuerich-mailand-transfer-zug-auto-vergleich": { cats: ["routes"], dest: "Mailand, Italien" },
  "flughafen-zuerich-lugano-tessin-transfer": { cats: ["routes"], routes: [R("lugano"), R("locarno"), R("bellinzona")] },
  "5-orte-unter-90-minuten-ab-flughafen-zuerich": { cats: ["routes"], routes: [R("schaffhausen"), R("luzern"), R("zug"), R("winterthur")] },
  "flughafen-zuerich-basel-transfer-preis-dauer-vergleich": { cats: ["routes"], routes: [R("basel")] },
  "flughafen-zuerich-bern-transfer-preis-dauer": { cats: ["routes"], routes: [R("bern"), R("thun")] },
  "flughafen-zuerich-luzern-transfer-preis-dauer": { cats: ["routes"], routes: [R("luzern"), R("engelberg")] },
  "flughafen-zuerich-st-gallen-transfer-preis-dauer": { cats: ["routes"], routes: [R("st-gallen")] },
  "rheinfall-ab-flughafen-zuerich-halbtagesausflug": { cats: ["routes"], routes: [R("schaffhausen")] },
  "transfer-flughafen-zuerich-deutschland-oesterreich-grenze": { cats: ["routes"] },
  "jungfrau-region-guide-interlaken-grindelwald": { cats: ["routes"], routes: [R("interlaken"), R("grindelwald"), R("wengen")] },
  "luzern-tagesausflug-ab-zuerich": { cats: ["routes"], routes: [R("luzern"), R("engelberg")] },

  // ── Winter & Ski ──
  "skigebiete-ab-flughafen-zuerich-fahrzeit-transfer": { cats: ["winter", "routes"], routes: [R("davos"), R("st-moritz"), R("zermatt"), R("verbier"), R("engelberg"), R("grindelwald"), R("wengen")] },
  "wintersaison-ski-transfers-schweiz": { cats: ["winter"], routes: [R("davos"), R("st-moritz"), R("zermatt"), R("grindelwald"), R("wengen"), R("engelberg")] },
  "zermatt-transfer-flughafen-zuerich-taesch-autofrei": { cats: ["routes", "winter"], routes: [R("zermatt")] },
  "st-moritz-engadin-winter-transfer-flughafen-zuerich": { cats: ["winter", "routes"], routes: [R("st-moritz")] },

  // ── Events ──
  "silvester-zuerich-feuerwerk-transfer": { cats: ["events"], dest: "Zürich" },
  "lauberhornrennen-wengen-anreise-transfer": { cats: ["events", "winter"], routes: [R("wengen")] },
  "spengler-cup-davos-anreise-transfer": { cats: ["events", "winter"], routes: [R("davos")] },
  "swiss-indoors-basel-anreise-transfer": { cats: ["events"], routes: [R("basel")] },
  "weihnachtsmaerkte-zuerich-basel-transfer-dezember": { cats: ["events"], routes: [R("basel"), R("luzern"), R("bern")] },
  "sommer-zuerich-street-parade-zueri-faescht-transfer": { cats: ["events"], dest: "Zürich" },
  "wef-davos-transfer-guide": { cats: ["events", "winter"], routes: [R("davos")] },
};

const FALLBACK: BlogMeta = { cats: ["tips"] };

export const metaOf = (slug: string): BlogMeta => blogMeta[slug] ?? FALLBACK;

/**
 * Konuya göre ilgili yazılar: ortak rota (ağırlık 3; asıl rota eşleşmesi +2),
 * ortak kategori (ilk kategori 2, diğerleri 1). Eşitlikte daha yeni yazı önce.
 * Yeterli eşleşme yoksa liste en yeni yazılarla tamamlanır.
 */
export function relatedPosts(slug: string, n = 3): BlogPost[] {
  const me = metaOf(slug);
  const myRoutes = me.routes ?? [];
  const score = (p: BlogPost) => {
    const m = metaOf(p.slug);
    let s = 0;
    for (const r of m.routes ?? []) if (myRoutes.includes(r)) s += 3;
    if (myRoutes[0] && m.routes?.[0] === myRoutes[0]) s += 2;
    for (const c of m.cats) if (me.cats.includes(c)) s += c === me.cats[0] ? 2 : 1;
    return s;
  };
  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || (a.p.date < b.p.date ? 1 : a.p.date > b.p.date ? -1 : 0));
  return scored.slice(0, n).map((x) => x.p);
}

/** Genel yolculuk rehberleri — kendi yazısı olmayan rota sayfalarında yedek */
const ROUTE_FALLBACK = [
  "ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich",
  "flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer",
  "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse",
];

/**
 * Rota sayfasındaki "Mehr zur Strecke" kutusu: rotayı asıl konu olarak ele alan yazılar önce,
 * sonra rotayı ikincil olarak işleyenler. Hiç yoksa genel yolculuk rehberleri (isFallback).
 */
export function postsForRoute(routeKey: string, n = 4): { posts: BlogPost[]; isFallback: boolean } {
  // Sıra: rotanın yazıdaki önceliği → "Strecken" kategorisindeki rehber → odaklı yazı (az rota) → yeni tarih
  const hits = blogPosts
    .map((p) => {
      const m = metaOf(p.slug);
      return { p, i: (m.routes ?? []).indexOf(routeKey), guide: m.cats.includes("routes") ? 0 : 1, n: m.routes?.length ?? 0 };
    })
    .filter((x) => x.i >= 0)
    .sort((a, b) => a.i - b.i || a.guide - b.guide || a.n - b.n || (a.p.date < b.p.date ? 1 : a.p.date > b.p.date ? -1 : 0))
    .map((x) => x.p);
  if (hits.length) return { posts: hits.slice(0, n), isFallback: false };
  const fb = ROUTE_FALLBACK.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean) as BlogPost[];
  return { posts: fb.slice(0, Math.min(n, 3)), isFallback: true };
}

/** İstemciye gönderilecek hafif yazı kartı (gövde metni olmadan — paket boyutu küçük kalır) */
export type PostTeaser = { slug: string; img: string; title: string; minutes: number };

export function teaserOf(p: BlogPost, lang: "de" | "en"): PostTeaser {
  const c = lang === "de" ? p.de : p.en;
  const words = [c.title, c.excerpt, ...c.body.flatMap((b) => [b.h ?? "", b.h3 ?? "", ...b.p, ...(b.ul ?? []), ...(b.table?.rows.flat() ?? [])])]
    .join(" ").split(/\s+/).length;
  return { slug: p.slug, img: p.img, title: c.seo ?? c.title, minutes: Math.max(2, Math.ceil(words / 180)) };
}
