// Günlük süpürme: yanıt sonrası gönderilemeyen / tekrar bekleyen ölçüm olaylarını iletir.
// Vercel Cron `Authorization: Bearer <CRON_SECRET>` başlığıyla çağırır (vercel.json).
import { NextRequest, NextResponse } from "next/server";
import { deliverDue } from "../../../lib/measurement";
import { sendPendingReviewRequests } from "../../../lib/mail";
import { sql, dbReady } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const processed = await deliverDue(100);
  const reviews = await sendPendingReviewRequests(50); // dünkü yolculuklara Google değerlendirme isteği
  // 14 günden eski taslaklar (3. adıma gelip ödemeye/gönderime geçmeyenler) temizlenir
  let drafts = 0;
  if (dbReady) {
    const rows = (await sql`
      DELETE FROM bookings
      WHERE channel = 'taslak' AND status = 'new' AND COALESCE(payment_status, 'none') IN ('none', 'pending')
        AND invoice_no IS NULL AND created_at < now() - interval '14 days'
      RETURNING id`) as unknown as { id: number }[];
    drafts = rows.length;
  }
  return NextResponse.json({ ok: true, processed, reviews, drafts });
}
