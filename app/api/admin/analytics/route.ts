// Panel: ölçüm kuyruğunu şimdi işle / bir teslimatı yeniden kuyruğa al
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { deliverDue, requeueDelivery, deliverOutbox } from "../../../lib/measurement";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body.action === "run") {
    const processed = await deliverDue(100);
    return NextResponse.json({ ok: true, processed });
  }
  if (body.action === "requeue" && body.deliveryId && body.outboxId) {
    await requeueDelivery(Number(body.deliveryId));
    await deliverOutbox(Number(body.outboxId));
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}
