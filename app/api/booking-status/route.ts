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
    SELECT ref, status, payment_status, price, vehicle, dropoff, source, updated_at, paid_at, created_at, lang, email, phone
    FROM bookings WHERE ref = ${ref.startsWith("#") ? ref : "#" + ref} LIMIT 1`) as unknown as
    { ref: string; status: string; payment_status: string | null; price: string | null; vehicle: string | null; dropoff: string | null; source: string | null; updated_at: string | null; paid_at: string | null; created_at: string | null; lang: string | null; email: string | null; phone: string | null }[];
  if (!b) return NextResponse.json({ ok: false, status: "not_found" }, { status: 404 });

  const state = b.status === "confirmed" || b.status === "done" ? "confirmed"
    : b.status === "rejected" ? "declined"
    : b.status === "cancelled" ? "cancelled"
    : "pending";
  const res: Record<string, unknown> = { ok: true, ref: b.ref, status: state, payment_status: b.payment_status ?? "none", lang: b.lang };
  // Makbuz (Satın Alma aynası) yalnızca web kaynaklı kayıtlar için: Stripe ödemesi alındıysa veya onaylandıysa.
  // Reddedilen/iptal edilenler ve panelden/telefondan açılanlar makbuz almaz. Satın alma anı = ödeme anı (yoksa talep anı).
  const purchased = state === "confirmed" || (state === "pending" && b.payment_status === "paid");
  if (purchased && (b.source ?? "site") === "site" && Number(b.price) > 0)
    res.receipt = issueReceipt({ ref: b.ref, price: b.price, vehicle: b.vehicle, dropoff: b.dropoff, email: b.email, phone: b.phone, purchased_at: b.paid_at ?? b.created_at, confirmed_at: b.updated_at });
  return NextResponse.json(res, { headers: { "Cache-Control": "no-store" } });
}
