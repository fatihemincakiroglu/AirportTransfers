// ─────────────────────────────────────────────────────────────
//  DİLLER + DİLE GÖRE URL SEGMENTLERİ
//  Varsayılan dil: Almanca. Yeni sayfa eklersen SEGMENTS'e satır ekle.
// ─────────────────────────────────────────────────────────────

export const LANGS = ["de", "en"] as const;
export type LangCode = (typeof LANGS)[number];
export const DEFAULT_LANG: LangCode = "de";

/** Dil değiştiricide gösterilen yerel adlar */
export const LANG_NAMES: Record<LangCode, string> = {
  de: "Deutsch", en: "English",
};

/** Sağdan sola yazılan diller (şu an yok) */
export const RTL_LANGS: LangCode[] = [];

type Seg = Record<LangCode, string>;
const seg = (de: string, en: string): Seg => ({ de, en });

export const SEGMENTS: Record<string, Seg> = {
  kontakt:         seg("kontakt", "contact"),
  "ueber-uns":     seg("ueber-uns", "about-us"),
  datenschutz:     seg("datenschutz", "privacy-policy"),
  cookies:         seg("cookie-richtlinie", "cookie-policy"),
  agb:             seg("agb", "terms-and-conditions"),
  rueckerstattung: seg("rueckerstattung", "refund-policy"),
  strecken:        seg("strecken", "routes"),
  fahrzeuge:       seg("fahrzeuge", "vehicles"),
  galerie:         seg("galerie", "gallery"),
  buchung:         seg("buchung", "booking"),
  faq:             seg("faq", "faq"),
  blog:            seg("blog", "blog"),
  staedte:         seg("staedte", "destinations"),
  preise:          seg("preise", "prices"),
  events:          seg("events", "events"),
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
