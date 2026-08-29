// ─────────────────────────────────────────────────────────────
//  MÜSAİTLİK KONTROLÜ
//  Gece saatlerinde (NIGHT_START–NIGHT_END arası) talepler anında
//  görülemediği için, o sırada gelen istek en az NIGHT_LEAD saat
//  ileriye verilebilir. Karar İsviçre saatine göre alınır.
//
//  Not: "iki yolculuk arasında 3 saat" kuralı araç sayısı arttığı için
//  kaldırılmıştır; aynı saate birden fazla rezervasyon alınabilir.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

  // ── Gece kuralı: yalnızca bugüne verilen talepler için ──
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

  return NextResponse.json({ ok: true, busy: false });
}
