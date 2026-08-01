// ─────────────────────────────────────────────────────────────
//  DİLE GÖRE URL SEGMENTLERİ
//  Fiziksel klasör adı (iç ad) → her dildeki görünen URL adı.
//  Yeni sayfa eklersen buraya da bir satır ekle.
// ─────────────────────────────────────────────────────────────

export const SEGMENTS: Record<string, { de: string; en: string }> = {
  kontakt: { de: "kontakt", en: "contact" },
  "ueber-uns": { de: "ueber-uns", en: "about-us" },
  strecken: { de: "strecken", en: "routes" },
  fahrzeuge: { de: "fahrzeuge", en: "vehicles" },
  touren: { de: "touren", en: "tours" },
  galerie: { de: "galerie", en: "gallery" },
  buchung: { de: "buchung", en: "booking" },
  faq: { de: "faq", en: "faq" },
  blog: { de: "blog", en: "blog" },
};

type L = "de" | "en";

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

/** Bir segmenti tanımaya çalış (iç ad ya da herhangi bir dildeki görünen ad). */
export function findInternalKey(segment: string): string | null {
  if (SEGMENTS[segment]) return segment;
  const key = Object.keys(SEGMENTS).find(
    (k) => SEGMENTS[k].de === segment || SEGMENTS[k].en === segment
  );
  return key ?? null;
}
