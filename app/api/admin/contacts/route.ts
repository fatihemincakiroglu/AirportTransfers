// İletişim mesajının durumunu değiştirir (yeni / okundu / yanıtlandı / nitelikli / dönüştü / geçersiz)
import { NextRequest, NextResponse, after } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../../lib/db";
import { emitLeadEvent } from "../../../lib/measurement";

export const runtime = "nodejs";
const ALLOWED = ["new", "read", "replied", "qualified", "converted", "invalid"];
// Ölçüm açısından lead niteliği değişen durumlar
const LEAD_STATUS = ["qualified", "converted", "invalid"];

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !ALLOWED.includes(status)) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  const [c] = (await sql`SELECT name FROM contacts WHERE id = ${id}`) as unknown as { name: string | null }[];
  await sql`UPDATE contacts SET status = ${status} WHERE id = ${id}`;
  const TR: Record<string, string> = { new: "Yeni", read: "Okundu", replied: "Yanıtlandı", qualified: "Nitelikli", converted: "Dönüştü", invalid: "Geçersiz" };
  await logEvent("contact_status", `${c?.name ?? "Mesaj"} adlı kişinin mesajı "${TR[status]}" olarak işaretlendi`, { actor: "panel" });
  if (LEAD_STATUS.includes(status)) after(() => emitLeadEvent("lead_status_changed", Number(id)));
  return NextResponse.json({ ok: true });
}
