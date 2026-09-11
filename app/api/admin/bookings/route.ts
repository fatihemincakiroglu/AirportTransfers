// Panelden durum / not güncelleme.
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, BOOKING_STATUSES } from "../../../lib/db";
import { syncBooking, removeBooking, type CalBooking } from "../../../lib/gcal";
import { refundPayment } from "../../../lib/stripe";

export const runtime = "nodejs";

/** Ret/iptal durumunda ödenmiş tutarı otomatik iade eder */
async function refundIfPaid(id: number) {
  const [b] = (await sql`
    SELECT ref, price, payment_status, stripe_intent FROM bookings WHERE id = ${id}`) as unknown as
    { ref: string; price: string | null; payment_status: string | null; stripe_intent: string | null }[];

  if (!b || b.payment_status !== "paid" || !b.stripe_intent) return;

  const refund = await refundPayment(b.stripe_intent);
  if (refund) {
    await sql`UPDATE bookings SET payment_status = 'refunded', refunded_at = now() WHERE id = ${id}`;
    await logEvent("payment_refund", `${b.ref} için CHF ${Number(b.price ?? 0).toFixed(2)} iade edildi`, { actor: "panel", ref: b.ref });
  } else {
    await logEvent("payment_refund_failed", `${b.ref} iadesi BAŞARISIZ — Stripe panelinden manuel kontrol edin`, { actor: "panel", ref: b.ref });
  }
}

/** Kaydı Google Takvim'e yazar (kabul/tamamlandı) ya da siler (ret/iptal) */
async function syncToCalendar(id: number) {
  const [b] = (await sql`
    SELECT id, ref, status, pickup, dropoff, stops, ride_date, ride_time, pax, luggage,
           vehicle, price, payment, first_name, last_name, phone, email, flight,
           notes, admin_note, google_event_id
    FROM bookings WHERE id = ${id}`) as unknown as CalBooking[];
  if (!b) return;

  if (b.status === "rejected" || b.status === "cancelled") {
    await removeBooking(b.google_event_id);
    if (b.google_event_id) await sql`UPDATE bookings SET google_event_id = NULL WHERE id = ${id}`;
    return;
  }
  if (b.status !== "confirmed" && b.status !== "done") return;

  const eventId = await syncBooking(b);
  if (eventId && eventId !== b.google_event_id) {
    await sql`UPDATE bookings SET google_event_id = ${eventId} WHERE id = ${id}`;
  }
}


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

  const [created] = (await sql`SELECT id FROM bookings WHERE ref = ${ref}`) as unknown as { id: number }[];
  if (created) await syncToCalendar(created.id);

  return NextResponse.json({ ok: true, ref });
}

/** Kaydı kalıcı olarak siler (takvim etkinliği de kaldırılır) */
export async function DELETE(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const [b] = (await sql`
    SELECT ref, first_name, last_name, dropoff, google_event_id FROM bookings WHERE id = ${id}`) as unknown as
    { ref: string; first_name: string | null; last_name: string | null; dropoff: string | null; google_event_id: string | null }[];
  if (!b) return NextResponse.json({ ok: false }, { status: 404 });

  await removeBooking(b.google_event_id);
  await sql`DELETE FROM bookings WHERE id = ${id}`;
  await logEvent(
    "booking_delete",
    `${b.ref} kaydı kalıcı olarak silindi (${[b.first_name, b.last_name].filter(Boolean).join(" ") || "—"} · ${b.dropoff ?? "—"})`,
    { actor: "panel", ref: b.ref },
  );
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { id, status, adminNote, fields } = body as {
    id?: number; status?: string; adminNote?: string; fields?: Record<string, unknown>;
    rejectReason?: string;
  };
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const [cur] = (await sql`SELECT ref, status, first_name, last_name, dropoff FROM bookings WHERE id = ${id}`) as unknown as
    { ref: string; status: string; first_name: string | null; last_name: string | null; dropoff: string | null }[];
  const who = [cur?.first_name, cur?.last_name].filter(Boolean).join(" ") || "müşteri";

  // Kabul / ret kararı
  if (status === "confirmed" || status === "rejected" || status === "cancelled") {
    const reason = typeof body.rejectReason === "string" ? body.rejectReason.slice(0, 60) : null;
    await sql`
      UPDATE bookings
      SET status = ${status}, decided_at = now(),
          reject_reason = ${status === "confirmed" ? null : reason}, updated_at = now()
      WHERE id = ${id}`;
    const kind = status === "confirmed" ? "booking_accept" : status === "cancelled" ? "booking_cancel" : "booking_reject";
    const verb = status === "confirmed" ? "KABUL edildi" : status === "cancelled" ? "İPTAL edildi" : "REDDEDİLDİ";
    await logEvent(
      kind,
      `${cur?.ref ?? "#" + id} rezervasyonu ${verb} (${who} · ${cur?.dropoff ?? "—"})` +
        (status === "confirmed" ? "" : ` — sebep: ${reason ?? "belirtilmedi"}`),
      { actor: "panel", ref: cur?.ref },
    );
    if (status === "rejected" || status === "cancelled") await refundIfPaid(id);
    await syncToCalendar(id);
    return NextResponse.json({ ok: true });
  }

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

  // Her değişiklikten sonra takvimi güncelle
  await syncToCalendar(id);
  return NextResponse.json({ ok: true });
}
