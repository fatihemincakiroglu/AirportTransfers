// İletişim mesajının durumunu değiştirir (yeni / okundu / yanıtlandı)
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../../lib/db";

export const runtime = "nodejs";
const ALLOWED = ["new", "read", "replied"];

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !ALLOWED.includes(status)) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const [c] = (await sql`SELECT name FROM contacts WHERE id = ${id}`) as unknown as { name: string | null }[];
  await sql`UPDATE contacts SET status = ${status} WHERE id = ${id}`;
  const TR: Record<string, string> = { new: "Yeni", read: "Okundu", replied: "Yanıtlandı" };
  await logEvent("contact_status", `${c?.name ?? "Mesaj"} adlı kişinin mesajı "${TR[status]}" olarak işaretlendi`, { actor: "panel" });
  return NextResponse.json({ ok: true });
}
