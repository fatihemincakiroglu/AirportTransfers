// Yer arama (dünya geneli, anahtar gerektirmez): Photon / OpenStreetMap.
// Tarayıcı Photon'a erişemezse bu vekil kullanılır; önbellek ile.
// Dönüş biçimi tarayıcıdaki ile aynıdır (lib/places.ts → PlaceSuggestion).
import { NextRequest, NextResponse } from "next/server";
import { photonUrl, toSuggestions, type PhotonFeature, type PlaceSuggestion } from "../../lib/places";

export const runtime = "nodejs";

const cache = new Map<string, { at: number; data: PlaceSuggestion[] }>();
const TTL = 1000 * 60 * 60 * 6; // 6 saat

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 200);
  const lang = req.nextUrl.searchParams.get("lang") === "de" ? "de" : "en";
  if (q.length < 2) return NextResponse.json({ items: [] });
  const key = `${lang}:${q.toLowerCase()}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return NextResponse.json({ items: hit.data });

  try {
    const res = await fetch(photonUrl(q, lang), {
      headers: { "User-Agent": "zrhairporttaxi.ch booking (info@zrhairporttaxi.ch)" },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ items: [] });
    const data = (await res.json()) as { features: PhotonFeature[] };
    const items = toSuggestions(data.features ?? []);
    if (cache.size > 2000) cache.clear();
    cache.set(key, { at: Date.now(), data: items });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
