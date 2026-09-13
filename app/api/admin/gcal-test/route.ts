// Google Takvim bağlantısını adım adım sınar (yalnızca panelden)
import { NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { gcalDiagnose } from "../../../lib/gcal";

export const runtime = "nodejs";

export async function POST() {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json(await gcalDiagnose());
}
