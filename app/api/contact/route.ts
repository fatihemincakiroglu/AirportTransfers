// İletişim formu talebini kaydeder.
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../lib/db";

export const runtime = "nodejs";
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : null);

export async function POST(req: NextRequest) {
  if (!dbReady) return NextResponse.json({ ok: false, reason: "db-off" }, { status: 200 });
  try {
    const b = await req.json();
    await ensureSchema();
    await sql`
      INSERT INTO contacts (lang, name, email, phone, message)
      VALUES (${str(b.lang, 5)}, ${str(b.name, 120)}, ${str(b.email, 160)}, ${str(b.phone, 40)}, ${str(b.message)})`;
    await logEvent("contact_new", `Yeni iletişim mesajı: ${str(b.name, 120) ?? "isimsiz"} (${str(b.email, 160) ?? "e-posta yok"})`, {
      actor: "site",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/contact]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
