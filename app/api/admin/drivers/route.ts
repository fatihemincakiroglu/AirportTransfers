// Şoför kayıtları: ekle / güncelle / pasife al
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchema, logEvent, dbReady } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const { name, phone, email, vehicle, note } = await req.json().catch(() => ({}));
  if (!name?.trim()) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  await sql`
    INSERT INTO drivers (name, phone, email, vehicle, note)
    VALUES (${name.trim()}, ${phone || null}, ${email || null}, ${vehicle || null}, ${note || null})`;
  await logEvent("driver_new", `Yeni şoför eklendi: ${name.trim()}`, { actor: "panel" });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id, active, name, phone, email, vehicle, note } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await ensureSchema();
  if (typeof active === "boolean") {
    await sql`UPDATE drivers SET active = ${active} WHERE id = ${id}`;
    const [d] = (await sql`SELECT name FROM drivers WHERE id = ${id}`) as unknown as { name: string }[];
    await logEvent("driver_edit", `${d?.name ?? "Şoför"} ${active ? "aktif" : "pasif"} yapıldı`, { actor: "panel" });
  }
  if (name?.trim()) {
    await sql`
      UPDATE drivers SET name = ${name.trim()}, phone = ${phone || null}, email = ${email || null},
        vehicle = ${vehicle || null}, note = ${note || null} WHERE id = ${id}`;
    await logEvent("driver_edit", `${name.trim()} bilgileri güncellendi`, { actor: "panel" });
  }
  return NextResponse.json({ ok: true });
}
