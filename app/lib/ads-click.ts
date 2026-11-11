// Reklam tıklama kimlikleri (gclid / gbraid / wbraid) — sunucu tarafı yardımcıları.
// Tarayıcı, ilk girişte yakaladığı kaynağı (lib/analytics.ts → getAttribution) isteğin
// `attribution` alanında gönderir; burada doğrulanıp rezervasyon kaydına yazılır.
// gclid OLDUĞU GİBİ saklanır (kırpma / harf değişikliği yok) — Google Ads tıklama yüklemesi için şart.
import { sql } from "./db";

const idStr = (v: unknown, max = 500) =>
  typeof v === "string" && v.length > 0 && v.length <= max && /^[A-Za-z0-9_\-.~]+$/.test(v) ? v : null;
const txt = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export type ClickIds = {
  gclid: string | null; gbraid: string | null; wbraid: string | null;
  click_landing_at: Date | null; utm_campaign: string | null; landing_page: string | null;
};

export function parseClickIds(b: Record<string, unknown> | null | undefined): ClickIds {
  const a = (b?.attribution ?? null) as Record<string, unknown> | null;
  const at = typeof a?.captured_at === "number" && a.captured_at > 1.6e9 && a.captured_at < Date.now() / 1000 + 600
    ? new Date(a.captured_at * 1000) : null;
  return {
    gclid: idStr(a?.gclid), gbraid: idStr(a?.gbraid), wbraid: idStr(a?.wbraid),
    click_landing_at: at, utm_campaign: txt(a?.utm_campaign, 150), landing_page: txt(a?.landing_page, 300),
  };
}

/** Rezervasyona tıklama kimliklerini yazar — yalnızca boş alanları doldurur (ilk tıklama korunur) */
export async function saveClickIds(ref: string, b: Record<string, unknown> | null | undefined) {
  const c = parseClickIds(b);
  if (!c.gclid && !c.gbraid && !c.wbraid && !c.utm_campaign && !c.landing_page) return;
  await sql`
    UPDATE bookings SET
      gclid = COALESCE(gclid, ${c.gclid}), gbraid = COALESCE(gbraid, ${c.gbraid}), wbraid = COALESCE(wbraid, ${c.wbraid}),
      click_landing_at = COALESCE(click_landing_at, ${c.click_landing_at}),
      utm_campaign = COALESCE(utm_campaign, ${c.utm_campaign}), landing_page = COALESCE(landing_page, ${c.landing_page})
    WHERE ref = ${ref}`;
}

/** Test kaydı mı? (TEST ile başlayan ad/soyad, test@ e-posta veya TEST ile başlayan tıklama kimliği) */
export const isTestRecord = (r: { first_name?: string | null; last_name?: string | null; email?: string | null; gclid?: string | null; gbraid?: string | null; wbraid?: string | null }) =>
  /^test/i.test(r.first_name ?? "") || /^test/i.test(r.last_name ?? "") || /^test[^@]*@/i.test(r.email ?? "") ||
  [r.gclid, r.gbraid, r.wbraid].some((x) => /^TEST/i.test(x ?? ""));
