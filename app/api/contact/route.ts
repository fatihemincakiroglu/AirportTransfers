// İletişim formu talebini kaydeder.
import { NextRequest, NextResponse, after } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../lib/db";
import { captureMeasurement, emitLeadEvent } from "../../lib/measurement";

export const runtime = "nodejs";
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : null);

export async function POST(req: NextRequest) {
  if (!dbReady) return NextResponse.json({ ok: false, reason: "db-off" }, { status: 200 });
  try {
    const b = await req.json();
    await ensureSchema();
    const mm = captureMeasurement(req, b);
    const rows = await sql`
      INSERT INTO contacts (lang, name, email, phone, message,
        ga_client_id, ga_session_id, fbp, fbc, client_ip, client_ua, consent, source_url)
      VALUES (${str(b.lang, 5)}, ${str(b.name, 120)}, ${str(b.email, 160)}, ${str(b.phone, 40)}, ${str(b.message)},
        ${mm.ga_client_id}, ${mm.ga_session_id}, ${mm.fbp}, ${mm.fbc}, ${mm.client_ip}, ${mm.client_ua},
        ${sql.json(mm.consent)}, ${mm.source_url})
      RETURNING id`;
    const leadId = Number(rows[0]?.id);
    // Kanonik Lead olayı: yanıt gönderildikten sonra kutuya yazılır ve iletilir
    if (leadId) after(() => emitLeadEvent("lead_created", leadId));
    await logEvent("contact_new", `Yeni iletişim mesajı: ${str(b.name, 120) ?? "isimsiz"} (${str(b.email, 160) ?? "e-posta yok"})`, {
      actor: "site",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined,
    });
    // id: ölçüm için kalıcı lead kimliği (contact_form_success → lead_id)
    return NextResponse.json({ ok: true, id: rows[0]?.id ?? null });
  } catch (e) {
    console.error("[api/contact]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
