// Günlük süpürme: yanıt sonrası gönderilemeyen / tekrar bekleyen ölçüm olaylarını iletir.
// Vercel Cron `Authorization: Bearer <CRON_SECRET>` başlığıyla çağırır (vercel.json).
import { NextRequest, NextResponse } from "next/server";
import { deliverDue } from "../../../lib/measurement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const processed = await deliverDue(100);
  return NextResponse.json({ ok: true, processed });
}
