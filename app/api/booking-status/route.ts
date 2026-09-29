// Herkese açık durum ucu: referans (rastgele kimlik) ile rezervasyonun durumunu döner; kişisel veri yok.
// "confirmed" durumunda imzalı ölçüm makbuzu (measurement receipt) eklenir → tarayıcı booking_complete aynasını basar.
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../lib/db";
import { issueReceipt } from "../../lib/receipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const ref = (req.nextUrl.searchParams.get("ref") ?? "").trim();
  if (!/^#?[A-Z0-9]{6,12}$/i.test(ref)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  await ensureSchema();
  const [b] = (await sql`
    SELECT ref, status, payment_status, price, vehicle, dropoff, source, updated_at, lang
    FROM bookings WHERE ref = ${ref.startsWith("#") ? ref : "#" + ref} LIMIT 1`) as unknown as
    { ref: string; status: string; payment_status: string | null; price: string | null; vehicle: string | null; dropoff: string | null; source: string | null; updated_at: string | null; lang: string | null }[];
  if (!b) return NextResponse.json({ ok: false, status: "not_found" }, { status: 404 });

  const state = b.status === "confirmed" || b.status === "done" ? "confirmed"
    : b.status === "rejected" ? "declined"
    : b.status === "cancelled" ? "cancelled"
    : "pending";
  const res: Record<string, unknown> = { ok: true, ref: b.ref, status: state, payment_status: b.payment_status ?? "none", lang: b.lang };
  // Makbuz yalnızca web kaynaklı ve onaylanmış kayıtlar için (panelden/telefondan açılanlar tarayıcı aynası almaz)
  if (state === "confirmed" && (b.source ?? "site") === "site") res.receipt = issueReceipt({ ...b, confirmed_at: b.updated_at });
  return NextResponse.json(res, { headers: { "Cache-Control": "no-store" } });
}
