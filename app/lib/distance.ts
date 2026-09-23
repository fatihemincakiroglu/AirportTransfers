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

/** Yol mesafesi (km, 1 ondalık) — duraklar dahil. Hesaplanamazsa null. */
export async function routeDistanceKm(from: string, to: string, stops: string[] = []): Promise<number | null> {
  const key = [from, ...stops, to].map((s) => s.trim().toLowerCase()).join("|");
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.km;
  const points = await Promise.all([from, ...stops, to].map(geocode));
  if (points.some((p) => !p)) { cache.set(key, { at: Date.now(), km: null }); return null; }
  const coords = points.map((p) => `${p!.lon},${p!.lat}`).join(";");
  try {
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`, {
      headers: { "User-Agent": UA }, signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) return null;
    const d = (await r.json()) as { code: string; routes?: { distance: number }[] };
    const m = d.routes?.[0]?.distance;
    const km = d.code === "Ok" && typeof m === "number" ? Math.round(m / 100) / 10 : null;
    if (cache.size > 2000) cache.clear();
    cache.set(key, { at: Date.now(), km });
    return km;
  } catch {
    return null;
  }
}
