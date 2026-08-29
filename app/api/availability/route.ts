// ─────────────────────────────────────────────────────────────
//  MÜSAİTLİK KONTROLÜ
//  İki yolculuk arasında en az BUFFER_HOURS saat olmalıdır.
//  Yalnızca kabul edilmiş (confirmed) ve tamamlanmış (done) işler bloklar.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe, dbReady } from "../../lib/db";

export const runtime = "nodejs";

/** İki rezervasyon arasında bırakılması gereken asgari saat */
export const BUFFER_HOURS = 3;

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  const time = req.nextUrl.searchParams.get("time") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}/.test(time)) {
    return NextResponse.json({ ok: true, busy: false });
  }
  if (!dbReady) return NextResponse.json({ ok: true, busy: false });

  try {
    await ensureSchemaSafe();
    const rows = (await sql`
      SELECT ride_time FROM bookings
      WHERE ride_date = ${date}
        AND status IN ('confirmed','done')
        AND ride_time IS NOT NULL AND ride_time <> ''`) as unknown as { ride_time: string }[];

    const want = toMinutes(time);
    const limit = BUFFER_HOURS * 60;

    // Çakışan işi bul; müşteriye en yakın uygun saati de önerelim
    let busy = false;
    let nextFree: string | null = null;
    for (const r of rows) {
      const have = toMinutes(r.ride_time);
      if (Math.abs(want - have) < limit) {
        busy = true;
        const free = have + limit;
        const hh = String(Math.floor(free / 60) % 24).padStart(2, "0");
        const mm = String(free % 60).padStart(2, "0");
        if (free < 24 * 60) nextFree = `${hh}:${mm}`;
      }
    }
    return NextResponse.json({ ok: true, busy, nextFree, bufferHours: BUFFER_HOURS });
  } catch (e) {
    console.error("[api/availability]", e);
    // Hata durumunda akışı engelleme
    return NextResponse.json({ ok: true, busy: false });
  }
}
