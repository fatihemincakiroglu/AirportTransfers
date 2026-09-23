// Yer arama (dünya geneli, anahtar gerektirmez): Photon / OpenStreetMap.
// Tarayıcıdan doğrudan çağrılmaz; burada önbellek + hız sınırı ile vekil edilir.
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Suggestion = { label: string; sub: string; country: string };

const cache = new Map<string, { at: number; data: Suggestion[] }>();
const TTL = 1000 * 60 * 60 * 6; // 6 saat
const ZRH = { lat: 47.4582, lon: 8.5555 }; // Flughafen Zürich — sonuçlar buraya yakın önce

function toSuggestion(f: { properties: Record<string, string | undefined> }): Suggestion | null {
  const p = f.properties;
  const name = p.name ?? p.street ?? "";
  if (!name) return null;
  const city = p.city && p.city !== name ? p.city : "";
  const state = p.state && p.state !== city && p.state !== name ? p.state : "";
  const country = p.country ?? "";
  const parts = [name, city, state].filter(Boolean);
  const street = p.street && p.street !== name ? `${p.street}${p.housenumber ? " " + p.housenumber : ""}` : "";
  const label = street ? `${street}, ${parts.join(", ")}` : parts.join(", ");
  return { label, sub: country, country };
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const lang = req.nextUrl.searchParams.get("lang") === "de" ? "de" : "en";
  if (q.length < 2) return NextResponse.json({ items: [] });
  const key = `${lang}:${q.toLowerCase()}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return NextResponse.json({ items: hit.data });

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lang=${lang}&limit=8&lat=${ZRH.lat}&lon=${ZRH.lon}`;
    const res = await fetch(url, { headers: { "User-Agent": "zrhairporttaxi.ch booking (info@zrhairporttaxi.ch)" }, next: { revalidate: 0 } });
    if (!res.ok) return NextResponse.json({ items: [] });
    const data = (await res.json()) as { features: { properties: Record<string, string | undefined> }[] };
    const seen = new Set<string>();
    const items: Suggestion[] = [];
    for (const f of data.features ?? []) {
      const s = toSuggestion(f);
      if (!s) continue;
      const k = `${s.label}|${s.country}`.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      items.push(s);
    }
    if (cache.size > 2000) cache.clear();
    cache.set(key, { at: Date.now(), data: items });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
