// ─────────────────────────────────────────────────────────────
//  DİLLER + DİLE GÖRE URL SEGMENTLERİ
//  Varsayılan dil: Almanca. Yeni sayfa eklersen SEGMENTS'e satır ekle.
// ─────────────────────────────────────────────────────────────

export const LANGS = ["de", "en", "it", "pt", "fr", "es", "tr", "sr", "hr", "ar", "ru"] as const;
export type LangCode = (typeof LANGS)[number];
export const DEFAULT_LANG: LangCode = "de";

/** Dil değiştiricide gösterilen yerel adlar */
export const LANG_NAMES: Record<LangCode, string> = {
  de: "Deutsch", en: "English", it: "Italiano", pt: "Português", fr: "Français",
  es: "Español", tr: "Türkçe", sr: "Srpski", hr: "Hrvatski", ar: "العربية", ru: "Русский",
};

/** Sağdan sola yazılan diller */
export const RTL_LANGS: LangCode[] = ["ar"];

type Seg = Record<LangCode, string>;
const seg = (
  de: string, en: string, it: string, pt: string, fr: string, es: string,
  tr: string, sr: string, hr: string, ar: string, ru: string,
): Seg => ({ de, en, it, pt, fr, es, tr, sr, hr, ar, ru });

export const SEGMENTS: Record<string, Seg> = {
  kontakt:         seg("kontakt", "contact", "contatto", "contacto", "contact", "contacto", "iletisim", "kontakt", "kontakt", "contact", "contact"),
  "ueber-uns":     seg("ueber-uns", "about-us", "chi-siamo", "sobre-nos", "a-propos", "sobre-nosotros", "hakkimizda", "o-nama", "o-nama", "about-us", "about-us"),
  datenschutz:     seg("datenschutz", "privacy-policy", "privacy", "privacidade", "confidentialite", "privacidad", "gizlilik", "privatnost", "privatnost", "privacy-policy", "privacy-policy"),
  cookies:         seg("cookie-richtlinie", "cookie-policy", "cookie", "cookies", "cookies", "cookies", "cerez-politikasi", "kolacici", "kolacici", "cookie-policy", "cookie-policy"),
  agb:             seg("agb", "terms-and-conditions", "termini", "termos", "conditions", "terminos", "kosullar", "uslovi", "uvjeti", "terms", "terms"),
  rueckerstattung: seg("rueckerstattung", "refund-policy", "rimborsi", "reembolso", "remboursement", "reembolso", "iade", "povrat", "povrat", "refund-policy", "refund-policy"),
  strecken:        seg("strecken", "routes", "tratte", "rotas", "trajets", "rutas", "guzergahlar", "rute", "rute", "routes", "routes"),
  fahrzeuge:       seg("fahrzeuge", "vehicles", "veicoli", "veiculos", "vehicules", "vehiculos", "araclar", "vozila", "vozila", "vehicles", "vehicles"),
  galerie:         seg("galerie", "gallery", "galleria", "galeria", "galerie", "galeria", "galeri", "galerija", "galerija", "gallery", "gallery"),
  buchung:         seg("buchung", "booking", "prenotazione", "reserva", "reservation", "reserva", "rezervasyon", "rezervacija", "rezervacija", "booking", "booking"),
  faq:             seg("faq", "faq", "faq", "faq", "faq", "faq", "sss", "faq", "faq", "faq", "faq"),
  blog:            seg("blog", "blog", "blog", "blog", "blog", "blog", "blog", "blog", "blog", "blog", "blog"),
  staedte:         seg("staedte", "destinations", "destinazioni", "destinos", "destinations", "destinos", "destinasyonlar", "destinacije", "destinacije", "destinations", "destinations"),
  preise:          seg("preise", "prices", "prezzi", "precos", "tarifs", "precios", "fiyatlar", "cene", "cijene", "prices", "prices"),
  events:          seg("events", "events", "eventi", "eventos", "evenements", "eventos", "etkinlikler", "dogadjaji", "dogadanja", "events", "events"),
};

type L = LangCode;

/** İç yol → dile göre görünen yol.  localizePath("/strecken", "en") → "/routes" */
export function localizePath(internalPath: string, lang: L): string {
  const parts = internalPath.split("/").filter(Boolean);
  if (parts.length && SEGMENTS[parts[0]]) parts[0] = SEGMENTS[parts[0]][lang];
  return "/" + parts.join("/");
}

/** Görünen yol → iç yol.  internalizePath("/routes", "en") → "/strecken" */
export function internalizePath(publicPath: string, lang: L): string {
  const parts = publicPath.split("/").filter(Boolean);
  if (parts.length) {
    const key = Object.keys(SEGMENTS).find((k) => SEGMENTS[k][lang] === parts[0]);
    if (key) parts[0] = key;
  }
  return "/" + parts.join("/");
}

/** Herhangi bir dildeki görünen segment → iç anahtar (proxy için) */
export function findInternalKey(publicSeg: string): string | null {
  for (const key of Object.keys(SEGMENTS)) {
    if (key === publicSeg) return key;
    for (const l of LANGS) if (SEGMENTS[key][l] === publicSeg) return key;
  }
  return null;
}

/**
 * hreflang alternates — kullanıcı tercihi: Almanca x-default olarak verilir,
 * ayrı bir "de" kırılımı YAZILMAZ; diğer 10 dil tek tek listelenir.
 */
export function langAlternates(internalPath: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LANGS) {
    const p = localizePath(internalPath, l);
    const url = `/${l}${p === "/" ? "" : p}`;
    if (l === DEFAULT_LANG) out["x-default"] = url;
    else out[l] = url;
  }
  return out;
}
