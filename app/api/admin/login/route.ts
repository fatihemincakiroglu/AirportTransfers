import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, SESSION_COOKIE, cookieOptions } from "../../../lib/auth";
import { logEvent } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "";

  if (!process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 500 });
  }
  if (!checkPassword(String(password ?? ""))) {
    await logEvent("login_failed", "Panele hatalı parolayla giriş denemesi yapıldı", { ip, actor: "panel" });
    // Kaba kuvvet denemelerini yavaşlat
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  await logEvent("login_ok", "Panele başarıyla giriş yapıldı", { ip, actor: "panel" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createToken(), cookieOptions);
  return res;
}
