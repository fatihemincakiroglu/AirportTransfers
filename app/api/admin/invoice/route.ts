// Fatura numarası atar: RE-YYYY-0001 (yıl içinde sıralı)
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchema, logEvent, dbReady } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const year = new Date().getFullYear();
  const [row] = (await sql`
    SELECT COUNT(*)::int AS n FROM bookings
    WHERE invoice_no LIKE ${"RE-" + year + "-%"}`) as unknown as { n: number }[];

  const no = `RE-${year}-${String(row.n + 1).padStart(4, "0")}`;
  const [b] = (await sql`SELECT ref, price FROM bookings WHERE id = ${id}`) as unknown as { ref: string; price: string | null }[];
  await sql`
    UPDATE bookings SET invoice_no = ${no}, invoiced_at = now(), updated_at = now()
    WHERE id = ${id} AND invoice_no IS NULL`;
  await logEvent("invoice", `${b?.ref ?? "#" + id} için ${no} numaralı fatura oluşturuldu (CHF ${Number(b?.price ?? 0).toFixed(2)})`, { actor: "panel", ref: b?.ref });
  return NextResponse.json({ ok: true, no });
}
