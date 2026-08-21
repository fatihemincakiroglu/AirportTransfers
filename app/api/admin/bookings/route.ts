// Panelden durum / not güncelleme.
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchema, logEvent, BOOKING_STATUSES } from "../../../lib/db";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id, status, adminNote } = await req.json().catch(() => ({}));
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
  if (typeof adminNote === "string") {
    await sql`UPDATE bookings SET admin_note = ${adminNote.slice(0, 1000)}, updated_at = now() WHERE id = ${id}`;
    await logEvent("booking_note", `${cur?.ref ?? "#" + id} kaydına panel notu eklendi`, { actor: "panel", ref: cur?.ref });
  }
  return NextResponse.json({ ok: true });
}
