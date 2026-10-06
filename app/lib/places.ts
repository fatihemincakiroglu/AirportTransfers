// ─────────────────────────────────────────────────────────────
//  YER ARAMA — ortak yardımcılar (tarayıcı + sunucu)
//  Kaynak: Photon / OpenStreetMap (anahtarsız, ücretsiz).
//  - Kısaltmalar aranmadan önce açılır ("Kocasinan Merkez Mh." → "… Mahallesi")
//  - Öneriler mahalle / ilçe / sokak / posta kodu ile zengin gösterilir
//  - Her öneri koordinatını taşır: seçilen nokta fiyat hesabında AYNEN kullanılır
// ─────────────────────────────────────────────────────────────

export const ZRH = { lat: 47.4582, lon: 8.5555 }; // Flughafen Zürich — yakın sonuçlar önce

export type PlaceKind = "airport" | "hotel" | "address" | "street" | "area" | "city" | "poi";

export type PlaceSuggestion = {
  /** Kalın satır: otel / mekân / sokak / mahalle adı */
  title: string;
  /** Altındaki açıklama: sokak no · mahalle · ilçe · posta kodu şehir */
  detail: string;
  /** Ülke adı (sağda gri) */
  country: string;
  kind: PlaceKind;
  /** Seçilince alana yazılan tam metin (başlık + detay + ülke) */
  value: string;
  lat?: number;
  lon?: number;
};

/** Seçim ikonları */
export const KIND_ICON: Record<PlaceKind, string> = {
  airport: "✈️", hotel: "🏨", address: "🏠", street: "🛣️", area: "🏘️", city: "🏙️", poi: "📍",
};

// ── Kısaltma açma ────────────────────────────────────────────
// Türkçe ve Almanca adreslerde en sık kullanılan kısaltmalar. OSM verisi tam adı tutar,
// arama motoru kısaltmayı tanımadığı için "Mh." yazan müşteri yanlış sonuç alıyordu.
const ABBREV: [RegExp, string][] = [
  [/^(mh|mah|mahal)\.?$/i, "Mahallesi"],
  [/^(cd|cad|cadd)\.?$/i, "Caddesi"],
  [/^(sk|sok|sokak)\.?$/i, "Sokak"],
  [/^(blv|bulv|bul)\.?$/i, "Bulvarı"],
  [/^(str)\.?$/i, "Strasse"],
  [/^(pl)\.$/i, "Platz"],
];
// Kelime sonuna yapışık Almanca kısaltma: "Bahnhofstr." → "Bahnhofstrasse"
const GLUED_STR = /([a-zäöüß])str\.?$/i;

export function expandAbbrev(q: string): string {
  return q
    .split(/(\s+|,)/)
    .map((tok) => {
      if (!tok.trim() || tok === ",") return tok;
      for (const [re, full] of ABBREV) if (re.test(tok)) return full;
      if (GLUED_STR.test(tok)) return tok.replace(GLUED_STR, "$1strasse");
      return tok;
    })
    .join("")
    .replace(/\b(no|nr)\s*[:.]\s*/gi, "") // "No: 12" → "12" (kapı numarası)
    .replace(/\s+/g, " ")
    .trim();
}

// ── Photon çağrısı ───────────────────────────────────────────
export function photonUrl(q: string, lang: string, limit = 10): string {
  const l = lang === "de" ? "de" : "en";
  // location_bias_scale: 0.5 → yakınlık hâlâ etkili ama İstanbul gibi uzak yerler de öne çıkabilir
  return `https://photon.komoot.io/api/?q=${encodeURIComponent(expandAbbrev(q))}&lang=${l}&limit=${limit}` +
    `&lat=${ZRH.lat}&lon=${ZRH.lon}&location_bias_scale=0.5`;
}

export type PhotonFeature = {
  properties: Record<string, string | undefined>;
  geometry?: { coordinates?: [number, number] };
};

const ADMIN_COUNTY = /^(bezirk|landkreis|kreis|wahlkreis|district|verwaltungskreis|amt)\b/i;
const HOTEL_VALUES = new Set(["hotel", "hostel", "guest_house", "motel", "apartment", "chalet", "resort"]);
const AREA_VALUES = new Set(["neighbourhood", "suburb", "quarter", "borough", "hamlet", "isolated_dwelling"]);
const CITY_VALUES = new Set(["city", "town", "village", "municipality"]);

function kindOf(p: Record<string, string | undefined>): PlaceKind {
  const key = p.osm_key ?? "", val = p.osm_value ?? "", type = p.type ?? "";
  if (key === "aeroway" && (val === "aerodrome" || val === "terminal")) return "airport";
  if (key === "tourism" && HOTEL_VALUES.has(val)) return "hotel";
  if (type === "house") return p.name ? "poi" : "address";
  if (type === "street" || key === "highway") return "street";
  if (type === "district" || type === "locality" || AREA_VALUES.has(val)) return "area";
  if (type === "city" || type === "county" || CITY_VALUES.has(val)) return "city";
  return "poi";
}

/** Photon sonucunu zengin öneriye çevirir; adı olmayan/boş sonuçlarda null */
export function toSuggestion(f: PhotonFeature): PlaceSuggestion | null {
  const p = f.properties ?? {};
  const kind = kindOf(p);
  const streetLine = p.street ? `${p.street}${p.housenumber ? " " + p.housenumber : ""}` : "";
  const title = (p.name ?? "").trim() || streetLine;
  if (!title) return null;

  const cityLine = [p.postcode, p.city].filter(Boolean).join(" ");
  const raw = [
    streetLine,
    p.locality,          // mahalle / semt (OSM'e göre değişir)
    p.district,          // mahalle / Stadtkreis
    // ilçe (ör. Bahçelievler). İsviçre/Almanya idari bölgeleri ("Bezirk Bülach", "Landkreis …") atlanır:
    // hem gereksiz uzatır hem de sabit rota eşleştirmesini yanıltabilir (Kloten adresi "Bülach" rotasına düşmesin)
    p.county && !ADMIN_COUNTY.test(p.county) && !(p.city && norm(p.county).includes(norm(p.city))) ? p.county : "",
    cityLine,
    // Şehir yoksa (köyler, büyük bölgeler) eyalet bilgisi yön bulmayı kolaylaştırır
    p.city ? "" : p.state,
  ];
  const seen = new Set([norm(title)]);
  const parts: string[] = [];
  for (const r of raw) {
    const s = (r ?? "").trim();
    if (!s) continue;
    const k = norm(s);
    // Aynı bilgiyi tekrar etme ("Zürich" hem ilçe hem şehir olarak gelebilir)
    if (seen.has(k)) continue;
    seen.add(k);
    parts.push(s);
  }

  const country = (p.country ?? "").trim();
  const detail = parts.join(" · ");
  const value = [title, ...parts, country].filter(Boolean).join(", ");
  const c = f.geometry?.coordinates;
  const coords = Array.isArray(c) && c.length === 2 && isFinite(c[0]) && isFinite(c[1]) ? { lon: c[0], lat: c[1] } : {};
  return { title, detail, country, kind, value, ...coords };
}

/** Listeyi temizler: tekrar edenleri atar */
export function toSuggestions(features: PhotonFeature[]): PlaceSuggestion[] {
  const out: PlaceSuggestion[] = [];
  const seen = new Set<string>();
  for (const f of features ?? []) {
    const s = toSuggestion(f);
    if (!s) continue;
    const k = norm(s.value);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out;
}

/** Aksan/harf duyarsız karşılaştırma anahtarı (Türkçe + Almanca harfler) */
export function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[äâàá]/g, "a").replace(/[öô]/g, "o").replace(/[üûù]/g, "u").replace(/[éèê]/g, "e")
    .replace(/[îïı]/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ç/g, "c").replace(/ß/g, "ss")
    .replace(/\s+/g, " ")
    .trim();
}

/** Kuş uçuşu mesafe (km) */
export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Geçerli bir [lat, lon] çifti mi? (dışarıdan gelen veriyi doğrulamak için) */
export function isLatLon(v: unknown): v is [number, number] {
  return Array.isArray(v) && v.length === 2 &&
    typeof v[0] === "number" && typeof v[1] === "number" &&
    Math.abs(v[0]) <= 90 && Math.abs(v[1]) <= 180;
}
