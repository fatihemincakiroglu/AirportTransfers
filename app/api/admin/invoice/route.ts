// Mevcut rezervasyona fatura numarası atar
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { assignInvoiceNo } from "../../../lib/invoice";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await ensureSchema();
  const no = await assignInvoiceNo(Number(id));
  return NextResponse.json({ ok: Boolean(no), no });
}
