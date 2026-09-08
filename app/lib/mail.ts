// ─────────────────────────────────────────────────────────────
//  E-POSTA BİLDİRİMİ — Resend (harici paket yok, REST ile)
//  Ortam değişkenleri (yoksa bildirim sessizce atlanır):
//    RESEND_API_KEY  → Resend API anahtarı
//    MAIL_TO         → bildirimin gideceği adres (info@zrhairporttaxi.ch)
//    MAIL_FROM       → gönderen, doğrulanmış alan adından olmalı
// ─────────────────────────────────────────────────────────────
import { actionToken } from "./actionToken";

const C = { pine: "#0C2E25", gold: "#C9A24B" };

function row(label: string, v: unknown) {
  if (!v) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#78716c;font-size:13px;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:#1c1917"><b>${String(v)}</b></td>
  </tr>`;
}

/** Yeni rezervasyon talebi bildirimi — kabul/ret düğmeleriyle */
export async function sendBookingMail(b: Record<string, unknown>, id?: number) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM ?? "ZRH Airport Taxi <onboarding@resend.dev>";
  if (!key || !to) return;

  const site = process.env.SITE_URL ?? "https://zrhairporttaxi.ch";
  const who = [b.firstName, b.lastName].filter(Boolean).join(" ") || "—";

  // Tek tıkla karar bağlantıları (jetonla imzalı, giriş gerektirmez)
  const actions = id
    ? `
    <table role="presentation" style="margin:22px 0 8px"><tr>
      <td style="padding-right:10px">
        <a href="${site}/api/decision?id=${id}&action=confirm&token=${actionToken(id, "confirm")}"
           style="display:inline-block;background:#059669;color:#fff;padding:13px 26px;border-radius:99px;
                  text-decoration:none;font-weight:700;font-size:14px">✓ Kabul et</a>
      </td>
      <td>
        <a href="${site}/api/decision?id=${id}&action=reject&token=${actionToken(id, "reject")}"
           style="display:inline-block;background:#DC2626;color:#fff;padding:13px 26px;border-radius:99px;
                  text-decoration:none;font-weight:700;font-size:14px">✕ Reddet</a>
      </td>
    </tr></table>
    <p style="margin:6px 0 0;font-size:12px;color:#a8a29e">
      Karar verdikten sonra müşteri mesajını panelden gönderebilirsiniz.
    </p>`
    : "";

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:8px">
    <p style="font-size:11px;letter-spacing:2px;color:${C.gold};font-weight:700;margin:0">
      YENİ REZERVASYON TALEBİ
    </p>
    <h2 style="color:${C.pine};margin:6px 0 18px;font-size:24px">${b.ref ?? ""}</h2>

    <table role="presentation" style="border-collapse:collapse;width:100%">
      ${row("Müşteri", who)}
      ${row("Telefon", b.phone)}
      ${row("E-posta", b.email)}
      ${row("Güzergâh", `${b.pickup ?? ""} → ${b.dropoff ?? ""}`)}
      ${row("Ara duraklar", b.stops)}
      ${row("Tarih / saat", `${b.date ?? ""} ${b.time ?? ""}`)}
      ${row("Araç", b.vehicle)}
      ${row("Tutar", b.price ? `CHF ${Number(b.price).toFixed(2)}` : "")}
      ${row("Ödeme", b.payment)}
      ${row("Uçuş", b.flight)}
      ${row("Yolcu / bagaj", b.pax ? `${b.pax}${b.luggage ? ` / ${b.luggage}` : ""}` : "")}
      ${row("Ekstralar", b.extras)}
      ${row("Not", b.notes)}
      ${row("Dil / kanal", [b.lang, b.channel].filter(Boolean).join(" · "))}
    </table>

    ${actions}

    <p style="margin:22px 0 0">
      <a href="${site}/admin/rezervasyonlar${b.ref ? `?ref=${encodeURIComponent(String(b.ref))}` : ""}"
         style="color:${C.pine};font-size:13px;font-weight:600">Panelde aç →</a>
    </p>
  </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        replyTo: typeof b.email === "string" && b.email ? b.email : undefined,
        subject: `Yeni rezervasyon ${b.ref ?? ""} — ${b.dropoff ?? ""} (${b.date ?? ""} ${b.time ?? ""})`,
        html,
      }),
    });
  } catch (e) {
    console.error("[mail] gönderilemedi", e);
  }
}
