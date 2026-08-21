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
  if (status) {
    if (!(BOOKING_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await sql`UPDATE bookings SET status = ${status}, updated_at = now() WHERE id = ${id}`;
    await logEvent("booking_status", `#${id} → ${status}`);
  }
  if (typeof adminNote === "string") {
    await sql`UPDATE bookings SET admin_note = ${adminNote.slice(0, 1000)}, updated_at = now() WHERE id = ${id}`;
  }
  return NextResponse.json({ ok: true });
}
