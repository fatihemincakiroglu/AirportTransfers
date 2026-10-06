// Tarayıcı tarafı mesafe hesabı (anahtarsız): Photon geocode + OSRM yol ağı; olmazsa kuş uçuşu × 1.25.
// Müşteri listeden bir yer seçtiyse o noktanın koordinatı doğrudan kullanılır (yeniden arama yok).
// Sunucu (lib/distance.ts) aynı zinciri doğrulama için kullanır; erişemezse tarayıcının km'sini kabul eder.
import { ZRH, expandAbbrev, haversineKm } from "./places";
import { recallPlace } from "./placeCoords";

const isAirport = (s: string) => /zrh|flughafen z|zurich airport|zürich airport|flughafen zürich/i.test(s);

async function geocode(text: string, signal?: AbortSignal): Promise<{ lat: number; lon: number } | null> {
  if (isAirport(text)) return ZRH;
  const picked = recallPlace(text);
  if (picked) return picked;
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(expandAbbrev(text))}&limit=1&lat=${ZRH.lat}&lon=${ZRH.lon}`, { signal });
    if (!r.ok) return null;
    const d = (await r.json()) as { features: { geometry: { coordinates: [number, number] } }[] };
    const c = d.features?.[0]?.geometry?.coordinates;
    return c ? { lat: c[1], lon: c[0] } : null;
  } catch {
    return null;
  }
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
