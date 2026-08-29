// ─────────────────────────────────────────────────────────────
//  MÜSAİTLİK KONTROLÜ
//  1) İki yolculuk arasında en az BUFFER_HOURS saat olmalı.
//  2) Gece saatlerinde (NIGHT_START–NIGHT_END arası) talepler anında
//     görülemediği için, o sırada gelen istek en az NIGHT_LEAD saat
//     ileriye verilebilir. Karar İsviçre saatine göre alınır.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe, dbReady } from "../../lib/db";

export const runtime = "nodejs";

/** İki rezervasyon arasında bırakılması gereken asgari saat */
export const BUFFER_HOURS = 3;
/** Gece kuralının geçerli olduğu saat aralığı (İsviçre saati) */
export const NIGHT_START = 23; // 23:00'ten itibaren
export const NIGHT_END = 6;    // 06:00'ya kadar
/** Gece saatlerinde istenen asgari ön süre */
export const NIGHT_LEAD_HOURS = 2;

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

/** Sunucu nerede çalışırsa çalışsın İsviçre yerel saatini verir */
function zurichNow() {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Zurich",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    hour: Number(get("hour")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const hhmm = (mins: number) =>
  `${String(Math.floor(mins / 60) % 24).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  const time = req.nextUrl.searchParams.get("time") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}/.test(time)) {
    return NextResponse.json({ ok: true, busy: false });
  }

  const now = zurichNow();
  const want = toMinutes(time);

  // ── 1) Gece kuralı: yalnızca bugüne verilen talepler için ──
  const isNight = now.hour >= NIGHT_START || now.hour < NIGHT_END;
  if (isNight && date === now.date) {
    const earliest = now.minutes + NIGHT_LEAD_HOURS * 60;
    if (want < earliest) {
      return NextResponse.json({
        ok: true,
        busy: true,
        reason: "night",
        // Gün taşarsa saat 24:00'ü geçemez; ertesi güne yönlendirilir
        nextFree: earliest < 24 * 60 ? hhmm(earliest) : null,
        leadHours: NIGHT_LEAD_HOURS,
      });
    }
  }

  // ── 2) İki yolculuk arası boşluk kuralı ──
  if (!dbReady) return NextResponse.json({ ok: true, busy: false });
  try {
    await ensureSchemaSafe();
    const rows = (await sql`
      SELECT ride_time FROM bookings
      WHERE ride_date = ${date}
        AND status IN ('confirmed','done')
        AND ride_time IS NOT NULL AND ride_time <> ''`) as unknown as { ride_time: string }[];

    const limit = BUFFER_HOURS * 60;
    let busy = false;
    let nextFree: string | null = null;
    for (const r of rows) {
      const have = toMinutes(r.ride_time);
      if (Math.abs(want - have) < limit) {
        busy = true;
        const free = have + limit;
        if (free < 24 * 60) nextFree = hhmm(free);
      }
    }
    return NextResponse.json({ ok: true, busy, reason: busy ? "gap" : null, nextFree, bufferHours: BUFFER_HOURS });
  } catch (e) {
    console.error("[api/availability]", e);
    return NextResponse.json({ ok: true, busy: false });
  }
}
