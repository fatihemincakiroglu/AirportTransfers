// Tarayıcı tarafı mesafe hesabı (anahtarsız): Photon geocode + OSRM yol ağı; olmazsa kuş uçuşu × 1.25.
// Sunucu (lib/distance.ts) aynı zinciri doğrulama için kullanır; erişemezse tarayıcının km'sini kabul eder.
const ZRH = { lat: 47.4582, lon: 8.5555 };
const isAirport = (s: string) => /zrh|flughafen z|zurich airport|zürich airport|flughafen zürich/i.test(s);

async function geocode(text: string, signal?: AbortSignal): Promise<{ lat: number; lon: number } | null> {
  if (isAirport(text)) return ZRH;
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=1&lat=${ZRH.lat}&lon=${ZRH.lon}`, { signal });
    if (!r.ok) return null;
    const d = (await r.json()) as { features: { geometry: { coordinates: [number, number] } }[] };
    const c = d.features?.[0]?.geometry?.coordinates;
    return c ? { lat: c[1], lon: c[0] } : null;
  } catch {
    return null;
  }
}

function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Yol mesafesi km (1 ondalık); adresler bulunamazsa null */
export async function clientRouteKm(from: string, to: string, stops: string[] = [], signal?: AbortSignal): Promise<number | null> {
  const pts = await Promise.all([from, ...stops, to].map((t) => geocode(t, signal)));
  if (pts.some((p) => !p)) return null;
  const P = pts as { lat: number; lon: number }[];
  try {
    const coords = P.map((p) => `${p.lon},${p.lat}`).join(";");
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`, { signal });
    if (r.ok) {
      const d = (await r.json()) as { code: string; routes?: { distance: number }[] };
      const m = d.routes?.[0]?.distance;
      if (d.code === "Ok" && typeof m === "number") return Math.round(m / 100) / 10;
    }
  } catch { /* yedek */ }
  let sum = 0;
  for (let i = 1; i < P.length; i++) sum += haversineKm(P[i - 1], P[i]);
  return Math.round(sum * 1.25 * 10) / 10;
}
