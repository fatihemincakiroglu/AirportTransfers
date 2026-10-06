// Adresten adrese yol mesafesi — anahtarsız: Photon (geocode) + OSRM (yol ağı), ikisi de OpenStreetMap.
// Özel güzergâh fiyatı bu km ile tarifeden hesaplanır; servis ulaşılamazsa null döner (tahmine düşülür).
//
// Koordinat ipuçları (hints): müşteri listeden yer seçtiyse tarayıcı o noktanın koordinatını gönderir.
// Güvenlik: ipucu körü körüne kabul edilmez. Sunucu metni kendisi de arar;
//  - iki nokta 10 km içindeyse müşterinin seçtiği (daha kesin) nokta kullanılır,
//  - uzaksa sunucunun bulduğu nokta geçerli olur (sahte koordinatla fiyat düşürülemez),
//  - sunucu metni bulamazsa ipucu kullanılır (eskiden de bu durumda tarayıcının km'si kabul ediliyordu).
import { ZRH, expandAbbrev, haversineKm, isLatLon } from "./places";

const UA = "zrhairporttaxi.ch booking (info@zrhairporttaxi.ch)";
const cache = new Map<string, { at: number; km: number | null }>();
const TTL = 1000 * 60 * 60 * 24;
const HINT_TOLERANCE_KM = 10;

type Pt = { lat: number; lon: number };
export type CoordHints = Record<string, [number, number]>;

const isAirport = (s: string) => /zrh|flughafen z|zurich airport|zürich airport|flughafen zürich/i.test(s);

async function photonPoint(text: string): Promise<Pt | null> {
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(expandAbbrev(text))}&limit=1&lat=${ZRH.lat}&lon=${ZRH.lon}`, {
      headers: { "User-Agent": UA }, signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return null;
    const d = (await r.json()) as { features: { geometry: { coordinates: [number, number] } }[] };
    const c = d.features?.[0]?.geometry?.coordinates;
    return c ? { lat: c[1], lon: c[0] } : null;
  } catch {
    return null;
  }
}

async function geocode(text: string, hint?: [number, number]): Promise<Pt | null> {
  if (isAirport(text)) return ZRH;
  const server = await photonPoint(text);
  if (!hint || !isLatLon(hint)) return server;
  const h = { lat: hint[0], lon: hint[1] };
  if (!server) return h;
  return haversineKm(server, h) <= HINT_TOLERANCE_KM ? h : server;
}

/** Dışarıdan gelen ipucu nesnesini temizler (yalnızca geçerli metin → [lat, lon]) */
export function cleanHints(v: unknown): CoordHints {
  const out: CoordHints = {};
  if (!v || typeof v !== "object") return out;
  for (const [k, p] of Object.entries(v as Record<string, unknown>).slice(0, 10)) {
    if (typeof k === "string" && k.length <= 300 && isLatLon(p)) out[k.trim()] = p;
  }
  return out;
}

/**
 * Yol mesafesi (km, 1 ondalık) — duraklar dahil.
 * 1) OSRM yol ağı · 2) yedek: kuş uçuşu × 1.25 · 3) adres bulunamazsa null (fiyat kabulde hesaplanır)
 */
export async function routeDistanceKm(from: string, to: string, stops: string[] = [], hints: CoordHints = {}): Promise<number | null> {
  const texts = [from, ...stops, to];
  const key = texts.map((s) => {
    const h = hints[s.trim()];
    return `${s.trim().toLowerCase()}${h ? `@${h[0].toFixed(4)},${h[1].toFixed(4)}` : ""}`;
  }).join("|");
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.km;
  const points = await Promise.all(texts.map((t) => geocode(t, hints[t.trim()])));
  if (points.some((p) => !p)) { cache.set(key, { at: Date.now(), km: null }); return null; }
  const pts = points as Pt[];
  let km: number | null = null;
  try {
    const coords = pts.map((p) => `${p.lon},${p.lat}`).join(";");
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`, {
      headers: { "User-Agent": UA }, signal: AbortSignal.timeout(5000),
    });
    if (r.ok) {
      const d = (await r.json()) as { code: string; routes?: { distance: number }[] };
      const m = d.routes?.[0]?.distance;
      if (d.code === "Ok" && typeof m === "number") km = Math.round(m / 100) / 10;
    }
  } catch { /* yedek hesaba düş */ }
  if (km === null) {
    let sum = 0;
    for (let i = 1; i < pts.length; i++) sum += haversineKm(pts[i - 1], pts[i]);
    km = Math.round(sum * 1.25 * 10) / 10;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(key, { at: Date.now(), km });
  return km;
}
