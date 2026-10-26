// WhatsApp ref kodu ↔ reklam kaynağı kaydı (iş listesi T6).
// Tarayıcı, WhatsApp tıklamasında kodu ve oturumdaki gclid/gbraid/wbraid/UTM değerlerini gönderir.
// Satış WhatsApp'tan kapanınca panelde (Admin → WhatsApp Ref) koddan gclid bulunup Google Ads'e yüklenir.
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../lib/db";

export const runtime = "nodejs";

const str = (v: unknown, max = 300) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export async function POST(req: NextRequest) {
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  let b: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4000) return NextResponse.json({ ok: false }, { status: 413 });
    b = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const ref = typeof b.ref === "string" && /^[A-Z2-9]{6}$/.test(b.ref) ? b.ref : null;
  if (!ref) return NextResponse.json({ ok: false }, { status: 400 });
  const capturedAt = typeof b.captured_at === "number" && b.captured_at > 1.6e9 ? new Date(b.captured_at * 1000) : null;
  try {
    await ensureSchema();
    await sql`
      INSERT INTO wa_refs (ref, gclid, gbraid, wbraid, utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content,
                           landing_page, last_page, lang, captured_at)
      VALUES (${ref}, ${str(b.gclid)}, ${str(b.gbraid)}, ${str(b.wbraid)}, ${str(b.utm_source, 100)}, ${str(b.utm_medium, 100)},
              ${str(b.utm_campaign, 150)}, ${str(b.utm_id, 50)}, ${str(b.utm_term, 200)}, ${str(b.utm_content, 100)},
              ${str(b.landing_page, 300)}, ${str(b.page, 300)}, ${str(b.lang, 5)}, ${capturedAt})
      ON CONFLICT (ref) DO UPDATE SET
        clicks = wa_refs.clicks + 1,
        last_click_at = now(),
        last_page = EXCLUDED.last_page,
        gclid = COALESCE(EXCLUDED.gclid, wa_refs.gclid),
        gbraid = COALESCE(EXCLUDED.gbraid, wa_refs.gbraid),
        wbraid = COALESCE(EXCLUDED.wbraid, wa_refs.wbraid),
        utm_source = COALESCE(EXCLUDED.utm_source, wa_refs.utm_source),
        utm_medium = COALESCE(EXCLUDED.utm_medium, wa_refs.utm_medium),
        utm_campaign = COALESCE(EXCLUDED.utm_campaign, wa_refs.utm_campaign),
        utm_id = COALESCE(EXCLUDED.utm_id, wa_refs.utm_id),
        utm_term = COALESCE(EXCLUDED.utm_term, wa_refs.utm_term),
        utm_content = COALESCE(EXCLUDED.utm_content, wa_refs.utm_content),
        landing_page = COALESCE(wa_refs.landing_page, EXCLUDED.landing_page),
        captured_at = COALESCE(EXCLUDED.captured_at, wa_refs.captured_at)`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/wa-ref]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
