// Adresten adrese yol mesafesi — anahtarsız: Photon (geocode) + OSRM (yol ağı), ikisi de OpenStreetMap.
// Özel güzergâh fiyatı bu km ile tarifeden hesaplanır; servis ulaşılamazsa null döner (tahmine düşülür).

const ZRH = { lat: 47.4582, lon: 8.5555 };
const UA = "zrhairporttaxi.ch booking (info@zrhairporttaxi.ch)";
const cache = new Map<string, { at: number; km: number | null }>();
const TTL = 1000 * 60 * 60 * 24;

const isAirport = (s: string) => /zrh|flughafen z|zurich airport|zürich airport|flughafen zürich/i.test(s);

async function geocode(text: string): Promise<{ lat: number; lon: number } | null> {
  if (isAirport(text)) return ZRH;
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=1&lat=${ZRH.lat}&lon=${ZRH.lon}`, {
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

/** Kuş uçuşu mesafe (km) — yol ağı servisi cevap vermezse yedek (×1.25 yol katsayısı) */
function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Yol mesafesi (km, 1 ondalık) — duraklar dahil.
 * 1) OSRM yol ağı · 2) yedek: kuş uçuşu × 1.25 · 3) adres bulunamazsa null (fiyat kabulde hesaplanır)
 */
export async function routeDistanceKm(from: string, to: string, stops: string[] = []): Promise<number | null> {
  const key = [from, ...stops, to].map((s) => s.trim().toLowerCase()).join("|");
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.km;
  const points = await Promise.all([from, ...stops, to].map(geocode));
  if (points.some((p) => !p)) { cache.set(key, { at: Date.now(), km: null }); return null; }
  const pts = points as { lat: number; lon: number }[];
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
