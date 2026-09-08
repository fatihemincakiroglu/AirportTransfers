// ─────────────────────────────────────────────────────────────
//  E-POSTADAN KARAR
//  Bildirim e-postasındaki "Kabul et / Reddet" bağlantıları buraya gelir.
//  Jeton imzalıdır; panele giriş gerekmez ama başkası tetikleyemez.
// ─────────────────────────────────────────────────────────────
import { NextRequest } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../lib/db";
import { verifyActionToken, type MailAction } from "../../lib/actionToken";
import { syncBooking, removeBooking, type CalBooking } from "../../lib/gcal";

export const runtime = "nodejs";

const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

function page(title: string, message: string, color: string, ref?: string) {
  const site = process.env.SITE_URL ?? "";
  return new Response(
    `<!doctype html><html lang="tr"><head><meta charset="utf-8">
     <meta name="viewport" content="width=device-width,initial-scale=1">
     <meta name="robots" content="noindex"><title>${title}</title></head>
     <body style="margin:0;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:${C.ivory};
                  display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px">
       <div style="background:#fff;border-radius:24px;padding:40px;max-width:420px;text-align:center;
                   box-shadow:0 10px 40px rgba(0,0,0,.06)">
         <div style="font-size:44px;line-height:1">${color === "#059669" ? "✅" : color === "#DC2626" ? "🚫" : "ℹ️"}</div>
         <h1 style="color:${color};font-size:22px;margin:14px 0 8px">${title}</h1>
         <p style="color:#57534e;font-size:14px;line-height:1.6;margin:0">${message}</p>
         <a href="${site}/admin/rezervasyonlar${ref ? `?ref=${encodeURIComponent(ref)}` : ""}"
            style="display:inline-block;margin-top:22px;background:${C.gold};color:${C.pine};
                   padding:13px 28px;border-radius:99px;text-decoration:none;font-weight:800;font-size:13px">
           PANELDE AÇ
         </a>
       </div>
     </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const id = Number(sp.get("id"));
  const action = sp.get("action") as MailAction;
  const token = sp.get("token") ?? "";

  if (!id || (action !== "confirm" && action !== "reject") || !verifyActionToken(id, action, token)) {
    return page("Bağlantı geçersiz", "Bu bağlantı doğrulanamadı. Lütfen paneli kullanın.", "#DC2626");
  }
  if (!dbReady) return page("Veritabanı bağlı değil", "İşlem yapılamadı.", "#DC2626");

  await ensureSchema();
  const [b] = (await sql`
    SELECT id, ref, status, first_name, last_name, dropoff FROM bookings WHERE id = ${id}`) as unknown as
    { id: number; ref: string; status: string; first_name: string | null; last_name: string | null; dropoff: string | null }[];

  if (!b) return page("Kayıt bulunamadı", "Bu rezervasyon silinmiş olabilir.", "#DC2626");

  const who = [b.first_name, b.last_name].filter(Boolean).join(" ") || "müşteri";

  // Daha önce karar verilmişse tekrar değiştirme
  if (b.status !== "new") {
    const TR: Record<string, string> = {
      confirmed: "kabul edilmiş", rejected: "reddedilmiş", done: "tamamlanmış", cancelled: "iptal edilmiş",
    };
    return page(
      "Bu talep zaten işlenmiş",
      `${b.ref} numaralı rezervasyon daha önce <b>${TR[b.status] ?? b.status}</b>. Durumu panelden değiştirebilirsiniz.`,
      C.pine, b.ref,
    );
  }

  const status = action === "confirm" ? "confirmed" : "rejected";
  await sql`
    UPDATE bookings
    SET status = ${status}, decided_at = now(),
        reject_reason = ${action === "reject" ? "other" : null}, updated_at = now()
    WHERE id = ${id}`;

  await logEvent(
    action === "confirm" ? "booking_accept" : "booking_reject",
    `${b.ref} rezervasyonu e-postadan ${action === "confirm" ? "KABUL edildi" : "REDDEDİLDİ"} (${who} · ${b.dropoff ?? "—"})`,
    { actor: "panel", ref: b.ref },
  );

  // Takvim senkronu
  const [full] = (await sql`
    SELECT id, ref, status, pickup, dropoff, stops, ride_date, ride_time, pax, luggage,
           vehicle, price, payment, first_name, last_name, phone, email, flight,
           notes, admin_note, google_event_id
    FROM bookings WHERE id = ${id}`) as unknown as CalBooking[];

  if (full) {
    if (status === "confirmed") {
      const eventId = await syncBooking(full);
      if (eventId && eventId !== full.google_event_id) {
        await sql`UPDATE bookings SET google_event_id = ${eventId} WHERE id = ${id}`;
      }
    } else {
      await removeBooking(full.google_event_id);
    }
  }

  return action === "confirm"
    ? page("Talep kabul edildi", `${b.ref} onaylandı ve takvime eklendi. Müşteri mesajını panelden gönderebilirsiniz.`, "#059669", b.ref)
    : page("Talep reddedildi", `${b.ref} reddedildi. Müşteriye bilgi mesajını panelden gönderebilirsiniz.`, "#DC2626", b.ref);
}
