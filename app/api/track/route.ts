// ─────────────────────────────────────────────────────────────
//  ZİYARET SAYACI
//  Vercel'in coğrafi başlıklarından ülke/şehir okunur.
//  IP adresi HİÇBİR ŞEKİLDE saklanmaz; yalnızca günlük toplam tutulur.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe, dbReady } from "../../lib/db";

export const runtime = "nodejs";

/** Sayfa yolunu kaba bir türe indirger (her destinasyon ayrı satır olmasın) */
function pageType(path: string): string {
  const parts = path.split("/").filter(Boolean);
  const rest = parts.slice(1); // dil önekini at
  if (rest.length === 0) return "ana sayfa";
  const first = rest[0];
  if (first.startsWith("flughafentransfer-")) return "destinasyon";
  if (rest.length > 1 && first === "blog") return "blog yazısı";
  if (/^zurich-airport-to-/.test(first)) return "rota";
  return first;
}

export async function POST(req: NextRequest) {
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 200 });
  try {
    const { path, lang } = await req.json();
    if (typeof path !== "string") return NextResponse.json({ ok: false }, { status: 400 });

    const h = req.headers;
    // Vercel bu başlıkları otomatik ekler (yerelde boş gelir)
    const country = (h.get("x-vercel-ip-country") ?? "??").slice(0, 4);
    const city = decodeURIComponent(h.get("x-vercel-ip-city") ?? "").slice(0, 80);
    const region = (h.get("x-vercel-ip-country-region") ?? "").slice(0, 40);

    await ensureSchemaSafe();
    await sql`
      INSERT INTO visits (day, country, city, region, lang, page, hits)
      VALUES (CURRENT_DATE, ${country}, ${city}, ${region}, ${String(lang ?? "").slice(0, 5)}, ${pageType(path)}, 1)
      ON CONFLICT (day, country, city, region, lang, page)
      DO UPDATE SET hits = visits.hits + 1`;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/track]", e);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
