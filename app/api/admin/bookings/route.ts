// Panelden durum / not güncelleme.
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchema, logEvent, BOOKING_STATUSES } from "../../../lib/db";

export const runtime = "nodejs";

/** Panelden manuel rezervasyon oluşturma */
export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const ref = "M" + Math.random().toString(16).slice(2, 9).toUpperCase(); // M = manuel
  const num = (v: unknown) => (v === "" || v === null || v === undefined ? null : Number(v));

  await sql`
    INSERT INTO bookings (ref, status, source, channel, lang, pickup, dropoff, stops,
      ride_date, ride_time, pax, luggage, vehicle, price, payment,
      first_name, last_name, email, phone, flight, nameboard, extras, notes, admin_note, driver_id)
    VALUES (${ref}, ${b.status ?? "confirmed"}, 'panel', ${b.channel ?? "telefon"}, ${b.lang ?? "de"},
      ${b.pickup ?? null}, ${b.dropoff ?? null}, ${b.stops ?? null},
      ${b.ride_date ?? null}, ${b.ride_time ?? null}, ${num(b.pax)}, ${num(b.luggage)},
      ${b.vehicle ?? null}, ${num(b.price)}, ${b.payment ?? null},
      ${b.first_name ?? null}, ${b.last_name ?? null}, ${b.email ?? null}, ${b.phone ?? null},
      ${b.flight ?? null}, ${b.nameboard ?? null}, ${b.extras ?? null}, ${b.notes ?? null},
      ${b.admin_note ?? null}, ${num(b.driver_id)})`;

  await logEvent("booking_manual", `Panelden manuel rezervasyon eklendi: ${ref} · ${b.pickup ?? "—"} → ${b.dropoff ?? "—"}`, { actor: "panel", ref });
  return NextResponse.json({ ok: true, ref });
}

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { id, status, adminNote, fields } = body as {
    id?: number; status?: string; adminNote?: string; fields?: Record<string, unknown>;
  };
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const [cur] = (await sql`SELECT ref, status, first_name, last_name, dropoff FROM bookings WHERE id = ${id}`) as unknown as
    { ref: string; status: string; first_name: string | null; last_name: string | null; dropoff: string | null }[];
  const who = [cur?.first_name, cur?.last_name].filter(Boolean).join(" ") || "müşteri";

  if (status) {
    if (!(BOOKING_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await sql`UPDATE bookings SET status = ${status}, updated_at = now() WHERE id = ${id}`;
    const TR: Record<string, string> = { new: "Yeni", confirmed: "Onaylandı", done: "Tamamlandı", cancelled: "İptal edildi" };
    await logEvent(
      "booking_status",
      `${cur?.ref ?? "#" + id} (${who} · ${cur?.dropoff ?? "—"}) durumu "${TR[cur?.status] ?? cur?.status}" → "${TR[status] ?? status}" olarak değiştirildi`,
      { actor: "panel", ref: cur?.ref },
    );
  }
  // Alan düzenlemeleri
  if (fields && typeof fields === "object") {
    const EDITABLE = ["pickup","dropoff","stops","ride_date","ride_time","pax","luggage",
      "vehicle","price","payment","first_name","last_name","email","phone","flight",
      "nameboard","extras","notes","driver_id"] as const;
    const num = (v: unknown) => (v === "" || v === null || v === undefined ? null : Number(v));
    const changed: string[] = [];

    for (const key of EDITABLE) {
      if (!(key in fields)) continue;
      const raw = fields[key];
      const val = ["pax","luggage","price","driver_id"].includes(key) ? num(raw) : (raw === "" ? null : String(raw));
      await sql`UPDATE bookings SET ${sql(key)} = ${val as never}, updated_at = now() WHERE id = ${id}`;
      changed.push(key);
    }
    if (changed.length) {
      await logEvent("booking_edit", `${cur?.ref ?? "#" + id} kaydında ${changed.length} alan güncellendi (${changed.join(", ")})`, { actor: "panel", ref: cur?.ref });
    }
  }

  if (typeof adminNote === "string") {
    await sql`UPDATE bookings SET admin_note = ${adminNote.slice(0, 1000)}, updated_at = now() WHERE id = ${id}`;
    await logEvent("booking_note", `${cur?.ref ?? "#" + id} kaydına panel notu eklendi`, { actor: "panel", ref: cur?.ref });
  }
  return NextResponse.json({ ok: true });
}
