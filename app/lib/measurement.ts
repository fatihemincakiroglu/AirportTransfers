// ─────────────────────────────────────────────────────────────
//  ÖLÇÜM — Backend hattı (Data Layer spec v1.3.5, Faz 2)
//
//  Yaşam döngüsü olayları (kabul = Purchase, iptal, iade, gelmedi, tamamlandı, lead…)
//  önce `analytics_outbox`a yazılır, sonra hedef başına (`analytics_delivery`)
//  GA4 Measurement Protocol ve Meta Conversions API'ye gönderilir.
//
//  Kurallar:
//   - Kimlik/onay anlık görüntüsü kayıt anında alınır ve bir daha değişmez.
//   - Hedef yapılandırılmamışsa `suppressed_unconfigured`, onay yoksa `suppressed_consent`,
//     eşleştirme verisi yoksa `skipped_missing_identifier` / `suppressed_no_match_data`.
//   - Purchase (booking_complete) yalnızca PURCHASE_REVENUE_MODEL_APPROVED=true ise gönderilir.
//   - GA4: kör tekrar YOK (2xx → transport_accepted, red → permanent_failed, belirsiz → delivery_unknown).
//   - Meta: 429/5xx/ağ hatasında sınırlı tekrar, 48 saatlik dedup penceresi.
//   - Panelden/telefondan açılan (web olmayan) rezervasyonlar web hedeflerine GÖNDERİLMEZ.
//
//  Ortam değişkenleri:
//    GA4_MEASUREMENT_ID, GA4_MP_API_SECRET
//    META_DATASET_ID, META_CAPI_ACCESS_TOKEN, META_API_VERSION (vars. v21.0), META_TEST_EVENT_CODE (yalnızca test)
//    PURCHASE_REVENUE_MODEL_APPROVED=true|false
// ─────────────────────────────────────────────────────────────
import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { sql, dbReady, ensureSchemaSafe as ensureSchema, logEvent } from "./db";
import { fleet, VAT_RATE, SITE_URL } from "../config";
import { CONSENT_COOKIE } from "../consent-script";

export const SCHEMA_VERSION = "1.3.5";
const ENV = process.env.NODE_ENV === "production" ? "production" : "development";

// ── Yapılandırma ──────────────────────────────────────────────
const GA4_ID = process.env.GA4_MEASUREMENT_ID ?? "";
const GA4_SECRET = process.env.GA4_MP_API_SECRET ?? "";
const META_DATASET = process.env.META_DATASET_ID ?? "";
const META_TOKEN = process.env.META_CAPI_ACCESS_TOKEN ?? "";
const META_VERSION = process.env.META_API_VERSION ?? "v21.0";
const META_TEST_CODE = process.env.NODE_ENV === "production" ? "" : (process.env.META_TEST_EVENT_CODE ?? "");
const PURCHASE_APPROVED = process.env.PURCHASE_REVENUE_MODEL_APPROVED === "true";

const ga4Ready = () => Boolean(GA4_ID && GA4_SECRET);
const metaReady = () => Boolean(META_DATASET && META_TOKEN);

const GA4_TTL_H = 72;
const META_TTL_D = 7;
const META_MAX_ATTEMPTS = 5;
const META_DEDUP_H = 48;

// ── Onay + kimlik anlık görüntüsü (kayıt anında) ─────────────
export type Consent = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  meta_marketing: "granted" | "denied";
  captured_at: string;
};

export type Measurement = {
  ga_client_id: string | null;
  ga_session_id: string | null;
  fbp: string | null;
  fbc: string | null;
  client_ip: string | null;
  client_ua: string | null;
  consent: Consent;
  source_url: string | null;
};

const idStr = (v: unknown, max = 200) =>
  typeof v === "string" && v.length > 0 && v.length <= max && !/[\s<>"']/.test(v) ? v : null;

/** İstek çerezinden onay durumu; istemcinin gönderdiği kimlikler yalnızca izin varsa saklanır. */
export function captureMeasurement(req: NextRequest, body: Record<string, unknown> | null): Measurement {
  const raw = req.cookies.get(CONSENT_COOKIE)?.value;
  let analytics = false, marketing = false;
  if (raw) {
    try {
      const c = JSON.parse(decodeURIComponent(raw));
      analytics = !!c.analytics;
      marketing = !!c.marketing;
    } catch { /* geçersiz çerez = onay yok */ }
  }
  const g = (b: boolean): "granted" | "denied" => (b ? "granted" : "denied");
  const m = (body?.measurement ?? null) as Record<string, unknown> | null;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const ua = req.headers.get("user-agent")?.slice(0, 400) || null;
  const referer = req.headers.get("referer");
  let sourceUrl: string | null = null;
  if (referer) {
    try { const u = new URL(referer); if (u.origin === new URL(SITE_URL).origin) sourceUrl = u.origin + u.pathname; } catch { /* yok say */ }
  }
  return {
    ga_client_id: analytics ? idStr(m?.ga_client_id, 100) : null,
    ga_session_id: analytics ? idStr(m?.ga_session_id, 40) : null,
    fbp: marketing ? idStr(m?.fbp, 100) : null,
    fbc: marketing ? idStr(m?.fbc, 600) : null,
    client_ip: marketing ? ip : null,
    client_ua: marketing ? ua : null,
    consent: {
      analytics_storage: g(analytics), ad_storage: g(marketing), ad_user_data: g(marketing),
      ad_personalization: g(marketing), meta_marketing: g(marketing), captured_at: new Date().toISOString(),
    },
    source_url: sourceUrl,
  };
}

// ── Para / katalog yardımcıları ───────────────────────────────
function splitVat(gross: number) {
  const g = Math.round(gross * 100);
  const net = Math.round(g / (1 + VAT_RATE));
  return { gross: g / 100, net: net / 100, tax: (g - net) / 100 };
}
/** bookings.vehicle = "Business Class · Mercedes-Benz E-Class" → filo kimliği */
function vehicleIdFrom(vehicle: string | null): string | null {
  if (!vehicle) return null;
  const v = fleet.find((f) => vehicle.includes(f.car));
  return v?.id ?? null;
}
const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const normEmail = (e: string) => e.trim().toLowerCase();
const normPhone = (p: string) => p.replace(/[^\d]/g, "").replace(/^0+/, "");

// ── Outbox yazımı ─────────────────────────────────────────────
type BookingRow = {
  id: number; ref: string; status: string; channel: string | null; source: string | null;
  lang: string | null; ride_date: string | null; ride_time: string | null; dropoff: string | null;
  pax: number | null; vehicle: string | null; price: string | null;
  payment_status: string | null; stripe_intent: string | null; reject_reason: string | null;
  email: string | null; phone: string | null;
  ga_client_id: string | null; ga_session_id: string | null; fbp: string | null; fbc: string | null;
  client_ip: string | null; client_ua: string | null; consent: Consent | null; source_url: string | null;
  created_at: string;
};

type MatchData = {
  ga_client_id: string | null; ga_session_id: string | null;
  em: string | null; ph: string | null; fbp: string | null; fbc: string | null;
  ip: string | null; ua: string | null; consent: Consent | null; web: boolean; source_url: string | null;
};

async function insertOutbox(eventName: string, eventId: string, occurredAt: Date, ref: string | null, payload: Record<string, unknown>, match: MatchData) {
  const rows = (await sql`
    INSERT INTO analytics_outbox (environment, event_name, event_id, occurred_at, ref, payload, match)
    VALUES (${ENV}, ${eventName}, ${eventId}, ${occurredAt}, ${ref}, ${sql.json(payload as never)}, ${sql.json(match as never)})
    ON CONFLICT (environment, event_id) DO NOTHING
    RETURNING id`) as unknown as { id: number }[];
  const id = rows[0]?.id;
  if (!id) return null; // aynı olay zaten var (tekrar) → yeni teslimat açılmaz
  const ga4Exp = new Date(occurredAt.getTime() + GA4_TTL_H * 3600_000);
  const metaExp = new Date(occurredAt.getTime() + META_TTL_D * 86400_000);
  await sql`
    INSERT INTO analytics_delivery (outbox_id, destination, expires_at)
    VALUES (${id}, 'ga4', ${ga4Exp}), (${id}, 'meta_capi', ${metaExp})
    ON CONFLICT DO NOTHING`;
  return id;
}

const bookingMatch = (b: BookingRow): MatchData => ({
  ga_client_id: b.ga_client_id, ga_session_id: b.ga_session_id,
  em: b.email ? sha256(normEmail(b.email)) : null,
  ph: b.phone ? sha256(normPhone(b.phone)) : null,
  fbp: b.fbp, fbc: b.fbc, ip: b.client_ip, ua: b.client_ua, consent: b.consent,
  web: (b.source ?? "site") === "site", source_url: b.source_url,
});

export type BookingEvent =
  | "booking_complete" | "booking_cancelled" | "booking_declined" | "booking_refunded"
  | "booking_no_show" | "booking_completed" | "payment_success";

/**
 * Rezervasyon yaşam döngüsü olayını kutuya yazar ve teslimatı dener.
 * Çağıran, veritabanı durumunu ZATEN güncellemiş olmalı.
 */
export async function emitBookingEvent(kind: BookingEvent, bookingId: number, extra: { version?: number } = {}) {
  if (!dbReady) return;
  try {
    await ensureSchema();
    const [b] = (await sql`
      SELECT id, ref, status, channel, source, lang, ride_date, ride_time, dropoff, pax, vehicle, price,
             payment_status, stripe_intent, reject_reason, email, phone,
             ga_client_id, ga_session_id, fbp, fbc, client_ip, client_ua, consent, source_url, created_at
      FROM bookings WHERE id = ${bookingId}`) as unknown as BookingRow[];
    if (!b) return;

    const gross = Number(b.price ?? 0);
    const m = splitVat(gross);
    const vid = vehicleIdFrom(b.vehicle);
    const isHourly = /Stundenmiete|Hourly hire/i.test(b.dropoff ?? ""); // saatlik kiralamada varış alanı etiket taşır
    const bookingType = isHourly ? "hourly" : "transfer";
    const channel = (b.source ?? "site") === "site" ? "web" : /whatsapp/i.test(b.channel ?? "") ? "whatsapp" : /tel|phone/i.test(b.channel ?? "") ? "phone" : "operator";
    const now = new Date();
    const v = extra.version ?? 1;

    const money = gross > 0
      ? { price_status: "final", currency: "CHF", gross_value: m.gross, net_value: m.net, tax_value: m.tax, shipping_value: 0 }
      : {};
    const item = vid ? [{
      item_id: `${bookingType}_${vid}`, item_name: bookingType === "hourly" ? "Hourly Chauffeur" : "Private Transfer",
      item_category: bookingType, item_category2: vid.replace(/_[a-z]$/, ""), item_variant: vid,
      price: m.net, quantity: 1, gross_unit_value: m.gross, tax_unit_value: m.tax, line_id: `LINE_${b.ref}_1`,
    }] : [];
    const base = {
      booking_id: b.ref, transaction_id: b.ref, booking_type: bookingType,
      pickup_date: b.ride_date, pickup_time: b.ride_time, passengers: b.pax ?? undefined,
      payment_status: b.payment_status === "paid" ? "paid" : b.payment_status === "refunded" ? "refunded" : "pending",
      booking_channel: channel, ...money,
    };
    const source = { interaction_channel: kind === "payment_success" ? "web" : "operator", observed_at: Math.floor(now.getTime() / 1000), ...(b.source_url ? { event_source_url: b.source_url } : {}) };

    let eventId = "", payload: Record<string, unknown> = {};
    switch (kind) {
      case "booking_complete":
        eventId = `purchase_${b.ref}`;
        payload = { booking: { ...base, booking_status: "confirmed" },
          ...(vid ? { vehicle: { vehicle_id: vid, vehicle_class: vid.replace(/_[a-z]$/, "") } } : {}),
          ecommerce: { transaction_id: b.ref, value: m.net, tax: m.tax, currency: "CHF", items: item }, source };
        break;
      case "booking_cancelled":
        eventId = `cancel_${b.ref}_${v}`;
        payload = { booking: { ...base, booking_status: "cancelled" },
          adjustment: { cancellation_id: b.ref, cancellation_version: v, previous_recognized_value: m.gross, current_recognized_value: 0,
            reversal_type: "analytical_reversal", cancellation_reason_code: (b.reject_reason ?? "other").toUpperCase() },
          ecommerce: { transaction_id: b.ref, value: m.net, tax: m.tax, currency: "CHF", items: item }, source };
        break;
      case "booking_declined":
        eventId = `decline_${b.ref}_${v}`;
        payload = { booking: { ...base, booking_status: "declined", decline_reason_code: (b.reject_reason ?? "other").toUpperCase(), decision_version: v }, source };
        break;
      case "booking_refunded":
        eventId = `refund_${b.stripe_intent ?? b.ref}`;
        payload = { booking: { ...base, payment_status: "refunded" },
          refund: { refund_id: b.stripe_intent ?? b.ref, refund_type: "full", refund_value: m.gross, cumulative_refunded_value: m.gross,
            previous_recognized_value: m.gross, current_recognized_value: 0, remaining_transaction_value: 0,
            reversal_type: "monetary_refund", refund_reason_code: "BOOKING_REJECTED_OR_CANCELLED",
            refund_net_value: m.net, refund_tax_value: m.tax, items: item }, source };
        break;
      case "booking_no_show":
        eventId = `no_show_${b.ref}_${v}`;
        payload = { booking: { ...base, booking_status: "no_show", outcome_version: v },
          adjustment: { reversal_type: "analytical_reversal", previous_recognized_value: m.gross, current_recognized_value: 0 }, source };
        break;
      case "booking_completed":
        eventId = `completed_${b.ref}`;
        payload = { booking: { ...base, booking_status: "completed", completion_status: "completed" }, source };
        break;
      case "payment_success":
        eventId = `payment_${b.stripe_intent ?? b.ref}`;
        payload = { booking: { ...base, payment_status: "paid" },
          payment: { payment_id: b.stripe_intent ?? b.ref, payment_status: "paid", payment_type: "card", payment_channel: "online",
            payment_timing: "pre_service", value: m.gross, currency: "CHF", payment_collected_at: now.toISOString() }, source };
        break;
    }

    const id = await insertOutbox(kind, eventId, now, b.ref, payload, bookingMatch(b));
    if (id) await deliverOutbox(id);
  } catch (e) {
    console.error("[measurement] olay yazılamadı", kind, bookingId, e);
  }
}

type ContactRow = {
  id: number; status: string; email: string | null; phone: string | null;
  ga_client_id: string | null; ga_session_id: string | null; fbp: string | null; fbc: string | null;
  client_ip: string | null; client_ua: string | null; consent: Consent | null; source_url: string | null; created_at: string;
};

/** İletişim kaydı (lead) olayları: oluşturma ve durum değişimi */
export async function emitLeadEvent(kind: "lead_created" | "lead_status_changed", contactId: number, opts: { version?: number } = {}) {
  if (!dbReady) return;
  try {
    await ensureSchema();
    const [c] = (await sql`
      SELECT id, status, email, phone, ga_client_id, ga_session_id, fbp, fbc, client_ip, client_ua, consent, source_url, created_at
      FROM contacts WHERE id = ${contactId}`) as unknown as ContactRow[];
    if (!c) return;
    const leadId = `LEAD${c.id}`;
    const now = new Date();
    let v = opts.version ?? 1;
    if (kind === "lead_status_changed" && opts.version === undefined) {
      // lead_created = sürüm 1; her durum değişimi bir sonraki sürüm
      const [{ n }] = (await sql`
        SELECT count(*)::int AS n FROM analytics_outbox
        WHERE environment = ${ENV} AND event_name = 'lead_status_changed' AND ref = ${leadId}`) as unknown as { n: number }[];
      v = n + 2;
    }
    const QUAL: Record<string, string> = { qualified: "qualified", converted: "converted", invalid: "disqualified" };
    const qualification = QUAL[c.status] ?? "pending";
    const eventId = kind === "lead_created" ? `lead_${leadId}` : `lead_status_${leadId}_${v}`;
    const payload = {
      lead: {
        lead_id: leadId, lead_type: "general_enquiry",
        lead_status: kind === "lead_created" ? "created" : qualification,
        qualification_status: kind === "lead_created" ? "pending" : qualification,
        qualification_version: v, source_context: "contact_page",
        ...(kind === "lead_status_changed" && c.status === "invalid" ? { qualification_reason_code: "invalid_contact" } : {}),
        ...(kind === "lead_status_changed" && c.status === "qualified" ? { qualification_reason_code: "criteria_met" } : {}),
        ...(kind === "lead_status_changed" && c.status === "converted" ? { qualification_reason_code: "booked" } : {}),
      },
      source: kind === "lead_created"
        ? { interaction_channel: "web", observed_at: Math.floor(now.getTime() / 1000), ...(c.source_url ? { event_source_url: c.source_url } : {}) }
        : { interaction_channel: "operator", observed_at: Math.floor(now.getTime() / 1000) },
    };
    const match: MatchData = {
      ga_client_id: c.ga_client_id, ga_session_id: c.ga_session_id,
      em: c.email ? sha256(normEmail(c.email)) : null, ph: c.phone ? sha256(normPhone(c.phone)) : null,
      fbp: c.fbp, fbc: c.fbc, ip: c.client_ip, ua: c.client_ua, consent: c.consent, web: true, source_url: c.source_url,
    };
    const id = await insertOutbox(kind, eventId, now, leadId, payload, match);
    if (id) await deliverOutbox(id);
  } catch (e) {
    console.error("[measurement] lead olayı yazılamadı", kind, contactId, e);
  }
}

// ── Teslimat ─────────────────────────────────────────────────
type DeliveryRow = {
  id: number; outbox_id: number; destination: "ga4" | "meta_capi"; status: string;
  attempt_count: number; expires_at: string;
  event_name: string; event_id: string; occurred_at: string; payload: Record<string, unknown>; match: MatchData | null;
};

type Outcome = { status: string; reason?: string; http?: number; error?: string; retryIn?: number };

async function setDelivery(d: DeliveryRow, o: Outcome) {
  const next = o.retryIn ? new Date(Date.now() + o.retryIn * 1000) : null;
  await sql`
    UPDATE analytics_delivery
    SET status = ${o.status}, reason = ${o.reason ?? null}, attempt_count = attempt_count + ${o.http !== undefined || o.error ? 1 : 0},
        last_attempt_at = CASE WHEN ${o.http !== undefined || o.error ? 1 : 0} = 1 THEN now() ELSE last_attempt_at END,
        accepted_at = CASE WHEN ${o.status} IN ('transport_accepted','accepted') THEN now() ELSE accepted_at END,
        next_attempt_at = COALESCE(${next}, next_attempt_at),
        last_http_status = COALESCE(${o.http ?? null}, last_http_status),
        last_error = ${o.error ? o.error.slice(0, 300) : null}
    WHERE id = ${d.id}`;
}

/** Bir kutu kaydının tüm hedeflerini dener (yanıt sonrası / cron / panel) */
export async function deliverOutbox(outboxId: number) {
  const rows = (await sql`
    SELECT d.id, d.outbox_id, d.destination, d.status, d.attempt_count, d.expires_at,
           o.event_name, o.event_id, o.occurred_at, o.payload, o.match
    FROM analytics_delivery d JOIN analytics_outbox o ON o.id = d.outbox_id
    WHERE d.outbox_id = ${outboxId} AND d.status IN ('pending','retryable_failed')`) as unknown as DeliveryRow[];
  for (const d of rows) await deliverOne(d);
}

/** Vadesi gelmiş bekleyen teslimatları işler (cron) */
export async function deliverDue(limit = 50): Promise<number> {
  if (!dbReady) return 0;
  await ensureSchema();
  const rows = (await sql`
    SELECT d.id, d.outbox_id, d.destination, d.status, d.attempt_count, d.expires_at,
           o.event_name, o.event_id, o.occurred_at, o.payload, o.match
    FROM analytics_delivery d JOIN analytics_outbox o ON o.id = d.outbox_id
    WHERE d.status IN ('pending','retryable_failed') AND d.next_attempt_at <= now()
    ORDER BY d.next_attempt_at LIMIT ${limit}`) as unknown as DeliveryRow[];
  for (const d of rows) await deliverOne(d);
  return rows.length;
}

/** Bastırılmış (yapılandırma/onay) kaydı yeniden kuyruğa alır — panelden bilinçli istek */
export async function requeueDelivery(deliveryId: number) {
  await sql`UPDATE analytics_delivery SET status = 'pending', reason = NULL, next_attempt_at = now() WHERE id = ${deliveryId}`;
}

async function deliverOne(d: DeliveryRow) {
  try {
    if (new Date(d.expires_at) < new Date()) return setDelivery(d, { status: "expired" });
    const m = d.match;
    const consent = m?.consent;
    const isWeb = m?.web !== false;

    // Purchase için yazılı iş onayı şart (spec §5.2)
    if (d.event_name === "booking_complete" && !PURCHASE_APPROVED) {
      return setDelivery(d, { status: "suppressed_unapproved_revenue_model" });
    }
    if (!isWeb) return setDelivery(d, { status: "suppressed_channel", reason: "NONWEB_SOURCE" });

    if (d.destination === "ga4") {
      if (!ga4Ready()) return setDelivery(d, { status: "suppressed_unconfigured" });
      if (consent?.analytics_storage !== "granted") return setDelivery(d, { status: "suppressed_consent" });
      if (!m?.ga_client_id) return setDelivery(d, { status: "skipped_missing_identifier" });
      return setDelivery(d, await sendGa4(d, m));
    }
    if (d.destination === "meta_capi") {
      if (!metaReady()) return setDelivery(d, { status: "suppressed_unconfigured" });
      if (consent?.meta_marketing !== "granted") return setDelivery(d, { status: "suppressed_consent" });
      if (!m?.em && !m?.ph && !m?.fbp && !m?.fbc) return setDelivery(d, { status: "suppressed_no_match_data" });
      const dedupDeadline = new Date(d.occurred_at).getTime() + META_DEDUP_H * 3600_000 - 300_000;
      if (d.attempt_count > 0 && Date.now() >= dedupDeadline) {
        return setDelivery(d, { status: "manual_reconciliation", reason: "META_DEDUP_WINDOW_EXPIRED" });
      }
      return setDelivery(d, await sendMeta(d, m));
    }
  } catch (e) {
    console.error("[measurement] teslimat hatası", d.id, e);
    await setDelivery(d, { status: "delivery_unknown", reason: "REMOTE_WRITE_UNCERTAIN", error: String(e) });
  }
}

// ── GA4 Measurement Protocol ─────────────────────────────────
const GA4_NAME: Record<string, string> = {
  booking_complete: "purchase", booking_cancelled: "refund", booking_refunded: "refund",
  booking_no_show: "refund", lead_created: "generate_lead",
};

function ga4Params(d: DeliveryRow): Record<string, unknown> {
  const p = d.payload;
  const booking = (p.booking ?? {}) as Record<string, unknown>;
  const eco = (p.ecommerce ?? {}) as Record<string, unknown>;
  const items = ((eco.items ?? []) as Record<string, unknown>[]).map((i) => ({
    item_id: i.item_id, item_name: i.item_name, item_category: i.item_category, item_category2: i.item_category2,
    item_variant: i.item_variant, price: i.price, quantity: i.quantity,
  }));
  const base: Record<string, unknown> = { event_id: d.event_id };
  switch (d.event_name) {
    case "booking_complete":
      return { ...base, transaction_id: booking.transaction_id, currency: "CHF", value: eco.value, tax: eco.tax, items };
    case "booking_cancelled":
    case "booking_no_show":
    case "booking_refunded":
      // Tam iade / iptal: tanınan gelirin tamamı geri alınır (bizde kısmi iade yok)
      return { ...base, transaction_id: booking.transaction_id, currency: "CHF", value: booking.net_value, tax: booking.tax_value, items };
    case "lead_created":
      return { ...base, lead_id: (p.lead as Record<string, unknown>)?.lead_id, lead_type: "general_enquiry" };
    case "lead_status_changed": {
      const l = (p.lead ?? {}) as Record<string, unknown>;
      return { ...base, lead_id: l.lead_id, qualification_status: l.qualification_status, qualification_version: l.qualification_version };
    }
    case "booking_declined":
      return { ...base, request_id: booking.booking_id, decline_reason_code: booking.decline_reason_code };
    case "payment_success":
      return { ...base, transaction_id: booking.transaction_id, payment_id: (p.payment as Record<string, unknown>)?.payment_id };
    case "booking_completed":
      return { ...base, transaction_id: booking.transaction_id, completion_status: "completed" };
    default:
      return base;
  }
}

async function sendGa4(d: DeliveryRow, m: MatchData): Promise<Outcome> {
  // Purchase iadesi (refund) yalnızca orijinal Purchase kabul edildiyse anlamlıdır
  if (GA4_NAME[d.event_name] === "refund" && !(await purchaseAccepted(d, "ga4"))) {
    return { status: "manual_reconciliation", reason: "ORIGINAL_PURCHASE_NOT_DELIVERED" };
  }
  const occurred = new Date(d.occurred_at).getTime();
  const fresh = Date.now() - occurred < 30 * 60_000; // 30 dk içinde: aynı oturum sayılır
  const session = fresh && m.ga_session_id && /^\d+$/.test(m.ga_session_id) ? Number(m.ga_session_id) : undefined;
  const body = {
    client_id: m.ga_client_id,
    timestamp_micros: occurred * 1000,
    consent: { ad_user_data: m.consent?.ad_user_data === "granted" ? "GRANTED" : "DENIED", ad_personalization: m.consent?.ad_personalization === "granted" ? "GRANTED" : "DENIED" },
    events: [{ name: GA4_NAME[d.event_name] ?? d.event_name, params: { ...ga4Params(d), ...(session ? { session_id: session } : {}) } }],
  };
  let res: Response;
  try {
    res = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(GA4_ID)}&api_secret=${encodeURIComponent(GA4_SECRET)}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), redirect: "manual",
    });
  } catch (e) {
    // Gönderim başlamış olabilir → kör tekrar yok (spec §19.9)
    return { status: "delivery_unknown", reason: "REMOTE_WRITE_UNCERTAIN", error: String(e) };
  }
  if (res.status >= 200 && res.status < 300) return { status: "transport_accepted", reason: "HTTP_RECEIPT_ONLY", http: res.status };
  return { status: "permanent_failed", reason: "GA4_HTTP_REJECTED_REPAIR_REQUIRED", http: res.status, error: (await res.text().catch(() => "")).slice(0, 200) };
}

async function purchaseAccepted(d: DeliveryRow, destination: string): Promise<boolean> {
  const ref = String(((d.payload.booking ?? {}) as Record<string, unknown>).booking_id ?? "");
  if (!ref) return false;
  const rows = (await sql`
    SELECT 1 FROM analytics_delivery dd JOIN analytics_outbox oo ON oo.id = dd.outbox_id
    WHERE oo.event_id = ${`purchase_${ref}`} AND oo.environment = ${ENV} AND dd.destination = ${destination}
      AND dd.status IN ('transport_accepted','accepted') LIMIT 1`) as unknown as unknown[];
  return rows.length > 0;
}

// ── Meta Conversions API ─────────────────────────────────────
const META_NAME: Record<string, string> = {
  booking_complete: "Purchase", lead_created: "Lead", booking_cancelled: "BookingCancelled",
  booking_refunded: "BookingRefunded", booking_no_show: "BookingNoShow", booking_completed: "BookingCompleted",
  payment_success: "PaymentSuccess", booking_declined: "BookingDeclined", lead_status_changed: "LeadStatusChanged",
};

async function sendMeta(d: DeliveryRow, m: MatchData): Promise<Outcome> {
  const p = d.payload;
  const booking = (p.booking ?? {}) as Record<string, unknown>;
  const eco = (p.ecommerce ?? {}) as Record<string, unknown>;
  const items = (eco.items ?? []) as Record<string, unknown>[];
  const userData: Record<string, unknown> = {};
  if (m.em) userData.em = [m.em];
  if (m.ph) userData.ph = [m.ph];
  if (m.fbp) userData.fbp = m.fbp;
  if (m.fbc) userData.fbc = m.fbc;
  if (m.ip) userData.client_ip_address = m.ip;
  if (m.ua) userData.client_user_agent = m.ua;

  const custom: Record<string, unknown> = {};
  if (d.event_name === "booking_complete") {
    Object.assign(custom, {
      value: booking.gross_value, currency: "CHF", order_id: booking.transaction_id, content_type: "product",
      content_ids: items.map((i) => i.item_id), contents: items.map((i) => ({ id: i.item_id, quantity: 1, item_price: i.gross_unit_value })), num_items: items.length,
    });
  } else if (booking.transaction_id) {
    custom.order_id = booking.transaction_id;
  } else if ((p.lead as Record<string, unknown>)?.lead_id) {
    custom.lead_id = (p.lead as Record<string, unknown>).lead_id;
  }

  const event: Record<string, unknown> = {
    event_name: META_NAME[d.event_name] ?? d.event_name,
    event_time: Math.floor(new Date(d.occurred_at).getTime() / 1000),
    event_id: d.event_id,
    action_source: "website",
    ...(m.source_url ? { event_source_url: m.source_url } : {}),
    user_data: userData,
    custom_data: custom,
  };
  const body: Record<string, unknown> = { data: [event] };
  if (META_TEST_CODE) body.test_event_code = META_TEST_CODE;

  let res: Response;
  try {
    res = await fetch(`https://graph.facebook.com/${META_VERSION}/${encodeURIComponent(META_DATASET)}/events?access_token=${encodeURIComponent(META_TOKEN)}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
  } catch (e) {
    return retryOrDead(d, { status: "retryable_failed", reason: "NETWORK", error: String(e) });
  }
  const text = await res.text().catch(() => "");
  if (res.ok) return { status: "accepted", http: res.status };
  if (res.status === 429 || res.status >= 500) return retryOrDead(d, { status: "retryable_failed", reason: `HTTP_${res.status}`, http: res.status, error: text.slice(0, 200) });
  return { status: "permanent_failed", reason: "META_REJECTED", http: res.status, error: text.slice(0, 200) };
}

function retryOrDead(d: DeliveryRow, o: Outcome): Outcome {
  const attempt = d.attempt_count + 1;
  if (attempt >= META_MAX_ATTEMPTS) return { ...o, status: "dead_lettered" };
  return { ...o, retryIn: Math.min(3600, 60 * 2 ** attempt) }; // 2, 4, 8… dk; en fazla 1 saat
}

/** Panel için özet */
export async function outboxSummary(limit = 40) {
  if (!dbReady) return [];
  await ensureSchema();
  return (await sql`
    SELECT o.id, o.event_name, o.event_id, o.ref, o.occurred_at,
           json_agg(json_build_object('id', d.id, 'destination', d.destination, 'status', d.status, 'reason', d.reason,
                                      'attempts', d.attempt_count, 'http', d.last_http_status, 'error', d.last_error)
                    ORDER BY d.destination) AS deliveries
    FROM analytics_outbox o JOIN analytics_delivery d ON d.outbox_id = o.id
    WHERE o.environment = ${ENV}
    GROUP BY o.id ORDER BY o.id DESC LIMIT ${limit}`) as unknown as {
      id: number; event_name: string; event_id: string; ref: string | null; occurred_at: string;
      deliveries: { id: number; destination: string; status: string; reason: string | null; attempts: number; http: number | null; error: string | null }[];
    }[];
}

export const measurementConfig = () => ({
  ga4: ga4Ready(), meta: metaReady(), purchaseApproved: PURCHASE_APPROVED,
});

/** Yapılandırma özeti panelde ve loglarda kullanılır */
export async function logMeasurementNote(detail: string, ref?: string) {
  await logEvent("measurement", detail, { actor: "sistem", ref });
}
