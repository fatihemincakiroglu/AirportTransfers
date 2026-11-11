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
  // 14 günden eski yarım kalanlar (ad/soyad/e-posta/telefon eksik) temizlenir
  let drafts = 0;
  if (dbReady) {
    const rows = (await sql`
      DELETE FROM bookings
      WHERE NOT (COALESCE(first_name, '') <> '' AND COALESCE(last_name, '') <> '' AND COALESCE(email, '') <> '' AND COALESCE(phone, '') <> '') AND status = 'new' AND COALESCE(payment_status, 'none') IN ('none', 'pending')
        AND invoice_no IS NULL AND created_at < now() - interval '14 days'
      RETURNING id`) as unknown as { id: number }[];
    drafts = rows.length;
  }
  // Reklam ölçüm verisi 120 gün saklanır (gizlilik politikası; Google Ads tıklama yüklemesi 90 gün içinde):
  // WhatsApp Ref kayıtları silinir; rezervasyonlarda yalnızca tıklama kimlikleri boşaltılır (rezervasyon kalır)
  let waRefs = 0;
  if (dbReady) {
    try {
      const r = (await sql`DELETE FROM wa_refs WHERE coalesce(sale_at, last_click_at) < now() - interval '120 days' RETURNING ref`) as unknown as { ref: string }[];
      waRefs = r.length;
      await sql`
        UPDATE bookings SET gclid = NULL, gbraid = NULL, wbraid = NULL, click_landing_at = NULL
        WHERE created_at < now() - interval '120 days' AND (gclid IS NOT NULL OR gbraid IS NOT NULL OR wbraid IS NOT NULL)`;
    } catch { /* tablo/sütun henüz yoksa */ }
  }
  return NextResponse.json({ ok: true, processed, reviews, drafts, waRefs });
}
