// ─────────────────────────────────────────────────────────────
//  E-POSTA BİLDİRİMİ — Google Workspace (Gmail SMTP)
//  Ortam değişkenleri (yoksa bildirim sessizce atlanır):
//    GMAIL_USER          → gönderen adres, ör. info@zrhairporttaxi.ch
//    GMAIL_APP_PASSWORD  → Google hesabından üretilen uygulama şifresi
//    MAIL_TO             → bildirimin gideceği adres (boşsa GMAIL_USER)
// ─────────────────────────────────────────────────────────────
import nodemailer, { type Transporter } from "nodemailer";
import { actionToken } from "./actionToken";
import { fleet, COMPANY_ADDRESS, PHONE_DISPLAY, CONTACT_EMAIL, WHATSAPP_NUMBER } from "../config";
import { sql, dbReady, logEvent } from "./db";

export const mailReady = () =>
  Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

/** Bağlantı havuzu — sunucusuz ortamda örnek başına bir kez kurulur */
let transporter: Transporter | null = null;
function getTransporter() {
  if (!mailReady()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s/g, ""), // boşluklu yapıştırmaya tolerans
      },
    });
  }
  return transporter;
}

const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7", ink: "#1C1917", muted: "#78716C" };
const SITE = () => process.env.SITE_URL ?? "https://zrhairporttaxi.ch";
const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** "Business Class · Mercedes-Benz E-Class" → filo kaydı (görsel için) */
const vehicleOf = (vehicle: unknown) =>
  typeof vehicle === "string" ? fleet.find((f) => vehicle.includes(f.car)) ?? null : null;

const fmtDate = (d: unknown, lang = "tr") => {
  if (typeof d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return esc(d);
  const dt = new Date(`${d}T12:00:00`);
  const loc = lang === "de" ? "de-CH" : lang === "en" ? "en-GB" : "tr-TR";
  return dt.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const fmtPrice = (p: unknown) => (p ? `CHF ${Number(p).toFixed(2)}` : "");

/** Ortak e-posta iskeleti: koyu yeşil başlık + logo, fildişi zemin, beyaz kart, altın ayraç, alt bilgi */
function shell(opts: { eyebrow: string; title: string; body: string; footerNote?: string; lang?: string }) {
  const site = SITE();
  const l = opts.lang ?? "tr";
  const footerLine = l === "de"
    ? "Zürich Flughafentransfer · Rund um die Uhr"
    : l === "en" ? "Zurich airport transfers · Available 24/7" : "Zürih havalimanı transferi · 7/24";
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:${C.ivory}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ivory};padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr><td style="background:${C.pine};border-radius:18px 18px 0 0;padding:26px 32px;text-align:center">
          <img src="${site}/logo-light.png" alt="ZRH Airport Taxi" width="180" style="display:inline-block;max-width:180px;height:auto">
          <div style="height:1px;margin:20px auto 0;width:160px;background:linear-gradient(90deg,transparent,${C.gold},transparent)"></div>
        </td></tr>
        <tr><td style="background:#ffffff;padding:34px 32px 30px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${C.ink}">
          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${C.gold};font-weight:700">${esc(opts.eyebrow)}</p>
          <h1 style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:600;font-size:28px;line-height:1.2;color:${C.pine}">${opts.title}</h1>
          ${opts.body}
        </td></tr>
        <tr><td style="background:${C.pine};border-radius:0 0 18px 18px;padding:22px 32px;text-align:center;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <p style="margin:0;font-size:13px;color:#ffffff;font-weight:600">ZRH Airport Taxi</p>
          <p style="margin:4px 0 0;font-size:11px;letter-spacing:1px;color:${C.gold}">${footerLine}</p>
          <p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,.65);line-height:1.7">
            ${esc(COMPANY_ADDRESS)}<br>
            <a href="tel:+${WHATSAPP_NUMBER}" style="color:#ffffff;text-decoration:none">${esc(PHONE_DISPLAY)}</a> ·
            <a href="mailto:${CONTACT_EMAIL}" style="color:#ffffff;text-decoration:none">${CONTACT_EMAIL}</a> ·
            <a href="${site}" style="color:#ffffff;text-decoration:none">zrhairporttaxi.ch</a>
          </p>
          ${opts.footerNote ? `<p style="margin:12px 0 0;font-size:11px;color:rgba(255,255,255,.45)">${opts.footerNote}</p>` : ""}
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

/** Güzergâh + tarih kartı (fildişi zemin) */
function routeCard(p: { pickup: unknown; dropoff: unknown; stops?: unknown; date: unknown; time: unknown; lang?: string; labels: { stops: string } }) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;background:${C.ivory};border-radius:14px">
    <tr><td style="padding:18px 20px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:22px;vertical-align:top;padding-top:3px"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${C.gold}"></span></td>
          <td style="font-size:15px;font-weight:700;color:${C.pine};padding-bottom:10px">${esc(p.pickup) || "—"}</td>
        </tr>
        ${p.stops ? `<tr><td style="width:22px;vertical-align:top;padding-top:3px"><span style="display:inline-block;width:8px;height:8px;margin-left:1px;border-radius:50%;border:2px solid ${C.gold}"></span></td>
          <td style="font-size:13px;color:${C.muted};padding-bottom:10px">${esc(p.labels.stops)}: ${esc(p.stops)}</td></tr>` : ""}
        <tr>
          <td style="width:22px;vertical-align:top;padding-top:3px"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${C.pine}"></span></td>
          <td style="font-size:15px;font-weight:700;color:${C.pine}">${esc(p.dropoff) || "—"}</td>
        </tr>
      </table>
      <div style="height:1px;margin:14px 0;background:linear-gradient(90deg,${C.gold}66,transparent)"></div>
      <p style="margin:0;font-size:14px;color:${C.ink}">🗓 <b>${fmtDate(p.date, p.lang)}</b>${p.time ? ` &nbsp;·&nbsp; 🕐 <b>${esc(String(p.time).slice(0, 5))}</b>` : ""}</p>
    </td></tr>
  </table>`;
}

/** Araç görseli + adı */
function vehicleBlock(vehicle: unknown, caption?: string) {
  const v = vehicleOf(vehicle);
  if (!v) return vehicle ? `<p style="margin:18px 0 0;font-size:14px">🚘 <b>${esc(vehicle)}</b></p>` : "";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border:1px solid #EEECE6;border-radius:14px;overflow:hidden">
    <tr><td style="padding:0;background:#F4F3EE;text-align:center">
      <img src="${SITE()}${v.img}" alt="${esc(v.car)}" width="536" style="display:block;width:100%;max-width:536px;height:auto">
    </td></tr>
    <tr><td style="padding:12px 16px">
      <p style="margin:0;font-size:14px;font-weight:700;color:${C.pine}">${esc(vehicle)}</p>
      ${caption ? `<p style="margin:3px 0 0;font-size:12px;color:${C.muted}">${esc(caption)}</p>` : ""}
    </td></tr>
  </table>`;
}

function detailRow(label: string, v: unknown) {
  if (v === null || v === undefined || v === "") return "";
  return `<tr>
    <td style="padding:8px 14px 8px 0;color:${C.muted};font-size:12px;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap;vertical-align:top;border-bottom:1px solid #F1EFE9">${esc(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:${C.ink};border-bottom:1px solid #F1EFE9">${esc(v)}</td>
  </tr>`;
}

function button(href: string, label: string, bg: string, fg = "#ffffff") {
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${fg};padding:14px 28px;border-radius:99px;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase">${label}</a>`;
}

/** Yeni rezervasyon talebi bildirimi (işletmeye) — kabul/ret düğmeleriyle */
export async function sendBookingMail(b: Record<string, unknown>, id?: number) {
  const tx = getTransporter();
  if (!tx) return;
  const user = process.env.GMAIL_USER!;
  const to = process.env.MAIL_TO || user;
  const site = SITE();
  const who = [b.firstName, b.lastName].filter(Boolean).join(" ") || "—";
  const paid = typeof b.payment === "string" && /online/i.test(b.payment);
  const v = vehicleOf(b.vehicle);

  const actions = id
    ? `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0"><tr>
      <td style="padding-right:10px">${button(`${site}/api/decision?id=${id}&action=confirm&token=${actionToken(id, "confirm")}`, "✓ Kabul et", "#059669")}</td>
      <td>${button(`${site}/api/decision?id=${id}&action=reject&token=${actionToken(id, "reject")}`, "✕ Reddet", "#DC2626")}</td>
    </tr></table>
    <p style="margin:12px 0 0;text-align:center;font-size:12px;color:${C.muted}">
      Kararınız müşteriye kendi dilinde e-posta ile otomatik iletilir${paid ? "; ret hâlinde ödeme otomatik iade edilir" : ""}.
    </p>`
    : "";

  const body = `
    ${routeCard({ pickup: b.pickup, dropoff: b.dropoff, stops: b.stops, date: b.date, time: b.time, labels: { stops: "Ara duraklar" } })}
    ${vehicleBlock(b.vehicle, v ? `${v.pax} yolcu · ${v.bags} bagaj` : undefined)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px">
      <tr>
        <td style="padding:16px 18px;background:${C.pine};border-radius:14px;color:#fff">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.gold}">Tutar</p>
          <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:30px;font-weight:600">${fmtPrice(b.price) || "—"}</p>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,.75)">${paid ? "✅ Online ödendi (Stripe)" : esc(b.payment) || "Ödeme yöntemi belirtilmedi"}</p>
        </td>
      </tr>
    </table>

    <p style="margin:26px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};font-weight:700">Müşteri</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${detailRow("Ad Soyad", who)}
      ${detailRow("Telefon", b.phone)}
      ${detailRow("E-posta", b.email)}
      ${detailRow("Dil", b.lang === "de" ? "Almanca" : b.lang === "en" ? "İngilizce" : b.lang)}
    </table>

    <p style="margin:24px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};font-weight:700">Yolculuk detayları</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${detailRow("Uçuş", b.flight)}
      ${detailRow("Yolcu / bagaj", b.pax ? `${b.pax}${b.luggage ? ` / ${b.luggage}` : ""}` : "")}
      ${detailRow("İsim tabelası", b.nameboard)}
      ${detailRow("Ekstralar", b.extras)}
      ${detailRow("Müşteri notu", b.notes)}
      ${detailRow("Kanal", b.channel)}
      ${detailRow("Referans", b.ref)}
    </table>

    ${actions}

    <p style="margin:26px 0 0;text-align:center">
      <a href="${site}/admin/rezervasyonlar${b.ref ? `?ref=${encodeURIComponent(String(b.ref))}` : ""}" style="color:${C.pine};font-size:13px;font-weight:700;text-decoration:none;border-bottom:1px solid ${C.gold}">Panelde aç →</a>
    </p>`;

  const html = shell({
    eyebrow: paid ? "Yeni rezervasyon · Ödendi" : "Yeni rezervasyon talebi",
    title: `${esc(b.ref ?? "")}<span style="font-size:16px;color:${C.muted};font-weight:400"> &nbsp;·&nbsp; ${esc(who)}</span>`,
    body,
    footerNote: "Bu e-posta yalnızca işletmeye gönderilir.",
  });

  try {
    await tx.sendMail({
      from: `"ZRH Airport Taxi" <${user}>`,
      to,
      replyTo: typeof b.email === "string" && b.email ? b.email : undefined,
      subject: `${paid ? "💰 " : ""}Yeni rezervasyon ${b.ref ?? ""} — ${b.dropoff ?? ""} (${b.date ?? ""} ${b.time ?? ""})`,
      html,
    });
  } catch (e) {
    console.error("[mail] gönderilemedi", e);
  }
}

// ── Müşteriye karar e-postası ─────────────────────────────────
export type CustomerBooking = {
  ref: string; lang: string | null; pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null; luggage: number | null;
  vehicle: string | null; price: string | number | null; payment: string | null; payment_status?: string | null;
  first_name: string | null; last_name: string | null; email: string | null; flight: string | null; notes: string | null;
};

const T = {
  de: {
    accept: { eyebrow: "Buchung bestätigt", title: "Ihr Transfer ist bestätigt", subject: (r: string) => `Bestätigung Ihres Transfers · ${r}`,
      lead: (n: string) => `Guten Tag ${n},<br><br>vielen Dank für Ihre Buchung. Wir freuen uns, Ihren Transfer zu bestätigen.`,
      note: "Ihr Chauffeur erwartet Sie mit Namensschild. Bei Flugverspätung passen wir die Abholzeit automatisch an. Bei Fragen erreichen Sie uns jederzeit per WhatsApp oder Telefon." },
    reject: { eyebrow: "Anfrage", title: "Leider nicht verfügbar", subject: (r: string) => `Ihre Transferanfrage · ${r}`,
      lead: (n: string) => `Guten Tag ${n},<br><br>vielen Dank für Ihre Anfrage.`,
      body: (reason: string) => `Leider können wir diesen Transfer nicht übernehmen: <b>${reason}</b>.`,
      note: "Gerne stehen wir Ihnen für einen anderen Termin zur Verfügung – antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp." },
    cancel: { eyebrow: "Stornierung", title: "Ihr Transfer wurde storniert", subject: (r: string) => `Stornierung Ihres Transfers · ${r}`,
      lead: (n: string) => `Guten Tag ${n},`,
      body: (reason: string) => `leider müssen wir Ihren bestätigten Transfer stornieren: <b>${reason}</b>.`,
      note: "Es sind Ihnen selbstverständlich keine Kosten entstanden. Gerne finden wir einen neuen Termin für Sie." },
    refund: "Eine bereits geleistete Online-Zahlung wird automatisch vollständig zurückerstattet (3–10 Werktage).",
    labels: { stops: "Zwischenstopps", vehicle: "Fahrzeug", flight: "Flug", pax: "Passagiere / Gepäck", price: "Preis", payment: "Zahlung", ref: "Referenz", notes: "Ihre Notiz", paid: "Online bezahlt", inCar: "Zahlung im Fahrzeug" },
    cta: { wa: "WhatsApp", call: "Anrufen" },
    sign: "Freundliche Grüsse<br><b>ZRH Airport Taxi</b>",
  },
  en: {
    accept: { eyebrow: "Booking confirmed", title: "Your transfer is confirmed", subject: (r: string) => `Your transfer is confirmed · ${r}`,
      lead: (n: string) => `Hello ${n},<br><br>thank you for your booking. We are pleased to confirm your transfer.`,
      note: "Your chauffeur will await you with a name sign. If your flight is delayed, we adjust the pickup time automatically. For any questions, reach us anytime via WhatsApp or phone." },
    reject: { eyebrow: "Request", title: "Unfortunately not available", subject: (r: string) => `Your transfer request · ${r}`,
      lead: (n: string) => `Hello ${n},<br><br>thank you for your request.`,
      body: (reason: string) => `Unfortunately we cannot take this transfer: <b>${reason}</b>.`,
      note: "We would be glad to help you with another date – simply reply to this email or message us on WhatsApp." },
    cancel: { eyebrow: "Cancellation", title: "Your transfer has been cancelled", subject: (r: string) => `Cancellation of your transfer · ${r}`,
      lead: (n: string) => `Hello ${n},`,
      body: (reason: string) => `unfortunately we have to cancel your confirmed transfer: <b>${reason}</b>.`,
      note: "No costs have been incurred for you. We would be happy to arrange a new date." },
    refund: "Any online payment already made will be refunded automatically in full (3–10 business days).",
    labels: { stops: "Stops", vehicle: "Vehicle", flight: "Flight", pax: "Passengers / luggage", price: "Price", payment: "Payment", ref: "Reference", notes: "Your note", paid: "Paid online", inCar: "Payment in the vehicle" },
    cta: { wa: "WhatsApp", call: "Call us" },
    sign: "Kind regards<br><b>ZRH Airport Taxi</b>",
  },
};
const REASON: Record<"de" | "en", Record<string, string>> = {
  de: { busy: "das Fahrzeug ist zu dieser Zeit bereits vergeben", distance: "die Strecke liegt ausserhalb unseres Einsatzgebiets", service: "unser Fahrzeug befindet sich im Service", capacity: "die benötigte Kapazität steht nicht zur Verfügung", short: "die Vorlaufzeit ist zu kurz", other: "aus betrieblichen Gründen", customer: "auf Ihren Wunsch", reschedule: "wegen Ihrer Terminänderung", driver: "unser Chauffeur ist nicht verfügbar" },
  en: { busy: "the vehicle is already booked at that time", distance: "the route is outside our service area", service: "our vehicle is currently in service", capacity: "the required capacity is not available", short: "the notice period is too short", other: "for operational reasons", customer: "at your request", reschedule: "due to your change of date", driver: "our chauffeur is unavailable" },
};

/**
 * Müşteriye karar e-postası (kendi dilinde): kabul → onay, ret → üzgünüz, iptal → iptal + iade notu.
 * E-posta yoksa ya da SMTP kapalıysa sessizce atlanır. Sonuç: gönderildi mi?
 */
export async function sendCustomerDecisionMail(b: CustomerBooking, decision: "accept" | "reject" | "cancel", reasonKey = "other"): Promise<boolean> {
  const tx = getTransporter();
  if (!tx || !b.email) return false;
  const lang: "de" | "en" = b.lang === "de" ? "de" : "en";
  const t = T[lang];
  const L = t.labels;
  const name = [b.first_name, b.last_name].filter(Boolean).join(" ") || (lang === "de" ? "liebe Kundin, lieber Kunde" : "dear customer");
  const paid = b.payment_status === "paid" || b.payment_status === "refunded" || /online/i.test(b.payment ?? "");
  const reason = REASON[lang][reasonKey] ?? REASON[lang].other;
  const v = vehicleOf(b.vehicle);

  const intro = decision === "accept"
    ? `<p style="margin:18px 0 0;font-size:15px;line-height:1.7">${t.accept.lead(esc(name))}</p>`
    : decision === "reject"
      ? `<p style="margin:18px 0 0;font-size:15px;line-height:1.7">${t.reject.lead(esc(name))}<br><br>${t.reject.body(esc(reason))}</p>`
      : `<p style="margin:18px 0 0;font-size:15px;line-height:1.7">${t.cancel.lead(esc(name))}<br><br>${t.cancel.body(esc(reason))}</p>`;

  const details = decision === "accept" ? `
    ${vehicleBlock(b.vehicle, v ? `${v.pax} ${lang === "de" ? "Passagiere" : "passengers"} · ${v.bags} ${lang === "de" ? "Gepäckstücke" : "bags"}` : undefined)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border-collapse:collapse">
      ${detailRow(L.flight, b.flight)}
      ${detailRow(L.pax, b.pax ? `${b.pax}${b.luggage ? ` / ${b.luggage}` : ""}` : "")}
      ${detailRow(L.price, fmtPrice(b.price))}
      ${detailRow(L.payment, paid ? `✅ ${L.paid}` : L.inCar)}
      ${detailRow(L.notes, b.notes)}
      ${detailRow(L.ref, b.ref)}
    </table>` : `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border-collapse:collapse">
      ${detailRow(L.vehicle, b.vehicle)}
      ${detailRow(L.price, fmtPrice(b.price))}
      ${detailRow(L.ref, b.ref)}
    </table>`;

  const note = decision === "accept" ? t.accept.note : decision === "reject" ? t.reject.note : t.cancel.note;
  const refundNote = decision !== "accept" && paid ? `<p style="margin:10px 0 0;font-size:13px;line-height:1.7;color:${C.muted}">${t.refund}</p>` : "";

  const body = `
    ${intro}
    ${routeCard({ pickup: b.pickup, dropoff: b.dropoff, stops: b.stops, date: b.ride_date, time: b.ride_time, lang, labels: { stops: L.stops } })}
    ${details}
    <p style="margin:22px 0 0;font-size:14px;line-height:1.7">${note}</p>
    ${refundNote}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 0"><tr>
      <td style="padding-right:10px">${button(`https://wa.me/${WHATSAPP_NUMBER}`, t.cta.wa, "#25D366")}</td>
      <td>${button(`tel:+${WHATSAPP_NUMBER}`, t.cta.call, C.gold, C.pine)}</td>
    </tr></table>
    <p style="margin:26px 0 0;font-size:14px;line-height:1.7">${t.sign}</p>`;

  const d = t[decision];
  const html = shell({ eyebrow: d.eyebrow, title: d.title, body, lang });
  try {
    await tx.sendMail({
      from: `"ZRH Airport Taxi" <${process.env.GMAIL_USER}>`,
      to: b.email,
      replyTo: CONTACT_EMAIL,
      subject: d.subject(b.ref),
      html,
    });
    return true;
  } catch (e) {
    console.error("[mail] müşteri e-postası gönderilemedi", e);
    return false;
  }
}

/** Kayıt kimliğinden müşteri e-postasını hazırlar, gönderir ve loglar (kabul/ret/iptal noktalarından çağrılır) */
export async function notifyCustomerDecision(bookingId: number, decision: "accept" | "reject" | "cancel", reasonKey = "other") {
  if (!dbReady) return;
  try {
    const [b] = (await sql`
      SELECT ref, lang, pickup, dropoff, stops, ride_date, ride_time, pax, luggage, vehicle, price, payment,
             payment_status, first_name, last_name, email, flight, notes
      FROM bookings WHERE id = ${bookingId}`) as unknown as CustomerBooking[];
    if (!b) return;
    if (!b.email) {
      await logEvent("customer_mail_skipped", `${b.ref}: müşteri e-postası yok, karar mesajı gönderilmedi`, { actor: "sistem", ref: b.ref });
      return;
    }
    const ok = await sendCustomerDecisionMail(b, decision, reasonKey);
    const what = decision === "accept" ? "onay" : decision === "reject" ? "ret" : "iptal";
    await logEvent(
      ok ? "customer_mail" : "customer_mail_failed",
      ok ? `${b.ref}: müşteriye ${what} e-postası gönderildi (${b.email}, ${b.lang ?? "en"})` : `${b.ref}: müşteri ${what} e-postası GÖNDERİLEMEDİ (${b.email})`,
      { actor: "sistem", ref: b.ref },
    );
  } catch (e) {
    console.error("[mail] müşteri bildirimi", e);
  }
}

/** Panelden çalıştırılan SMTP testi — gerçek hatayı geri döndürür */
export async function sendTestMail(): Promise<{ ok: boolean; reason?: string; to?: string }> {
  const tx = getTransporter();
  if (!tx) return { ok: false, reason: "GMAIL_USER veya GMAIL_APP_PASSWORD tanımlı değil" };

  const user = process.env.GMAIL_USER!;
  const to = process.env.MAIL_TO || user;
  try {
    await tx.verify(); // kimlik doğrulamayı ayrıca sına
    await tx.sendMail({
      from: `"ZRH Airport Taxi" <${user}>`,
      to,
      subject: "Test — bildirim sistemi çalışıyor",
      html: `<p style="font-family:sans-serif">Bu bir test mesajıdır. E-posta bildirimleri düzgün yapılandırılmış.</p>
             <p style="font-family:sans-serif;color:#78716c;font-size:13px">Gönderen: ${user} · Alıcı: ${to}</p>`,
    });
    return { ok: true, to };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e), to };
  }
}
