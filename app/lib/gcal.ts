// ─────────────────────────────────────────────────────────────
//  GOOGLE TAKVİM SENKRONU
//  Kabul edilen yolculuklar takvime yazılır, iptal/ret edilenler silinir.
//  Harici paket yok; servis hesabı JWT'si Node crypto ile imzalanır.
//
//  Ortam değişkenleri (yoksa senkron sessizce atlanır):
//    GOOGLE_SA_EMAIL     → servis hesabı e-postası
//    GOOGLE_SA_KEY       → servis hesabının özel anahtarı (PEM)
//    GOOGLE_CALENDAR_ID  → takvim kimliği (ör. info@zrhairporttaxi.ch)
// ─────────────────────────────────────────────────────────────
import crypto from "node:crypto";

const TZ = "Europe/Zurich";

export const gcalReady = () =>
  Boolean(process.env.GOOGLE_SA_EMAIL && process.env.GOOGLE_SA_KEY && process.env.GOOGLE_CALENDAR_ID);

const b64url = (b: Buffer | string) =>
  Buffer.from(b).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

let cachedToken: { value: string; exp: number } | null = null;
let lastTokenError = "";

async function accessToken(): Promise<string | null> {
  if (!gcalReady()) return null;
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.value;

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: process.env.GOOGLE_SA_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));

  const key = (process.env.GOOGLE_SA_KEY ?? "").replace(/\\n/g, "\n");
  const signature = b64url(crypto.createSign("RSA-SHA256").update(`${header}.${claim}`).sign(key));

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  if (!res.ok) {
    lastTokenError = (await res.text()).slice(0, 300);
    console.error("[gcal] jeton alınamadı", lastTokenError);
    return null;
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, exp: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

export type CalBooking = {
  id: number; ref: string; status: string;
  pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null;
  pax: number | null; luggage: number | null;
  vehicle: string | null; price: string | number | null; payment: string | null;
  first_name: string | null; last_name: string | null;
  phone: string | null; email: string | null; flight: string | null;
  notes: string | null; admin_note: string | null;
  google_event_id?: string | null;
};

const STATUS_TR: Record<string, string> = {
  new: "YENİ", confirmed: "KABUL", done: "TAMAMLANDI", rejected: "REDDEDİLDİ", cancelled: "İPTAL",
};

/** Panel takvimindeki satırın aynısı: güzergâh · müşteri */
function buildEvent(b: CalBooking) {
  const who = [b.first_name, b.last_name].filter(Boolean).join(" ") || "Müşteri";
  const lines = [
    `Referans: ${b.ref}`,
    `Durum: ${STATUS_TR[b.status] ?? b.status}`,
    b.stops ? `Ara duraklar: ${b.stops}` : "",
    b.pax ? `Yolcu: ${b.pax}${b.luggage ? ` · Bagaj: ${b.luggage}` : ""}` : "",
    b.vehicle ? `Araç: ${b.vehicle}` : "",
    b.price ? `Tutar: CHF ${Number(b.price).toFixed(2)}${b.payment ? ` (${b.payment})` : ""}` : "",
    b.flight ? `Uçuş: ${b.flight}` : "",
    b.phone ? `Telefon: ${b.phone}` : "",
    b.email ? `E-posta: ${b.email}` : "",
    b.notes ? `Müşteri notu: ${b.notes}` : "",
    b.admin_note ? `Panel notu: ${b.admin_note}` : "",
  ].filter(Boolean);

  const date = b.ride_date!;
  const time = b.ride_time || null;
  const start = time ? { dateTime: `${date}T${time.slice(0, 5)}:00`, timeZone: TZ } : { date };

  let end: Record<string, string>;
  if (time) {
    const [hh, mm] = time.split(":").map(Number);
    const total = (hh || 0) * 60 + (mm || 0) + 90; // varsayılan 1.5 saat
    end = {
      dateTime: `${date}T${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}:00`,
      timeZone: TZ,
    };
  } else {
    end = { date };
  }

  return {
    summary: `${b.pickup ?? "—"} → ${b.dropoff ?? "—"} · ${who}`,
    description: lines.join("\n"),
    location: b.pickup ?? "",
    start,
    end,
    colorId: b.status === "done" ? "10" : "9", // tamamlandı yeşil, kabul mavi
    reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 120 }] },
  };
}

const API = "https://www.googleapis.com/calendar/v3/calendars";
const calId = () => encodeURIComponent(process.env.GOOGLE_CALENDAR_ID ?? "");

/** Takvime yazar/günceller; yeni etkinlik oluştuysa kimliğini döndürür */
export async function syncBooking(b: CalBooking): Promise<string | null> {
  try {
    if (!gcalReady() || !b.ride_date) return null;
    const token = await accessToken();
    if (!token) return null;

    const body = JSON.stringify(buildEvent(b));
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    if (b.google_event_id) {
      const res = await fetch(`${API}/${calId()}/events/${b.google_event_id}`, { method: "PATCH", headers, body });
      if (res.ok) return b.google_event_id;
      if (res.status !== 404) console.error("[gcal] güncellenemedi", await res.text());
    }

    const res = await fetch(`${API}/${calId()}/events`, { method: "POST", headers, body });
    if (!res.ok) {
      console.error("[gcal] oluşturulamadı", await res.text());
      return null;
    }
    return ((await res.json()) as { id: string }).id;
  } catch (e) {
    console.error("[gcal] senkron hatası", e);
    return null;
  }
}

/** İptal/ret durumunda etkinliği siler */
export async function removeBooking(eventId: string | null | undefined): Promise<void> {
  try {
    if (!gcalReady() || !eventId) return;
    const token = await accessToken();
    if (!token) return;
    await fetch(`${API}/${calId()}/events/${eventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.error("[gcal] silme hatası", e);
  }
}

/**
 * Panel teşhisi: değişkenler → yetki jetonu → takvim erişimi → deneme etkinliği (oluştur + sil).
 * Her adım Türkçe raporlanır; hangi noktada takıldığı görülür.
 */
export async function gcalDiagnose(): Promise<{ ok: boolean; steps: { name: string; ok: boolean; info: string }[] }> {
  const steps: { name: string; ok: boolean; info: string }[] = [];
  const email = process.env.GOOGLE_SA_EMAIL ?? "";
  const key = process.env.GOOGLE_SA_KEY ?? "";
  const cal = process.env.GOOGLE_CALENDAR_ID ?? "";
  steps.push({ name: "GOOGLE_SA_EMAIL", ok: /@.+\.iam\.gserviceaccount\.com$/.test(email), info: email ? email : "EKSİK" });
  steps.push({
    name: "GOOGLE_SA_KEY", ok: key.includes("BEGIN PRIVATE KEY"),
    info: !key ? "EKSİK" : key.includes("BEGIN PRIVATE KEY") ? `PEM anahtar (${key.length} karakter)` : "PEM formatında değil — JSON dosyasındaki private_key alanının değeri olmalı",
  });
  steps.push({ name: "GOOGLE_CALENDAR_ID", ok: Boolean(cal), info: cal || "EKSİK" });
  if (steps.some((s) => !s.ok)) return { ok: false, steps };

  cachedToken = null;
  lastTokenError = "";
  let token: string | null = null;
  try { token = await accessToken(); } catch (e) { lastTokenError = String(e).slice(0, 300); }
  steps.push({ name: "Yetki jetonu", ok: Boolean(token), info: token ? "alındı" : `alınamadı: ${lastTokenError || "anahtar imzalanamadı (PEM bozuk olabilir)"}` });
  if (!token) return { ok: false, steps };

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const meta = await fetch(`${API}/${calId()}`, { headers });
  if (!meta.ok) {
    const t = await meta.text();
    steps.push({
      name: "Takvim erişimi", ok: false,
      info: meta.status === 404
        ? "takvim bulunamadı — GOOGLE_CALENDAR_ID yanlış ya da takvim servis hesabıyla PAYLAŞILMAMIŞ"
        : `HTTP ${meta.status}: ${t.slice(0, 200)}`,
    });
    return { ok: false, steps };
  }
  const m = (await meta.json()) as { summary?: string };
  steps.push({ name: "Takvim erişimi", ok: true, info: `"${m.summary ?? cal}" bulundu` });

  const today = new Date().toISOString().slice(0, 10);
  const create = await fetch(`${API}/${calId()}/events`, {
    method: "POST", headers,
    body: JSON.stringify({ summary: "ZRH panel takvim testi (silinecek)", start: { date: today }, end: { date: today } }),
  });
  if (!create.ok) {
    const t = (await create.text()).slice(0, 200);
    steps.push({
      name: "Deneme etkinliği", ok: false,
      info: create.status === 403
        ? "yazma izni yok — takvim paylaşımında servis hesabına 'Değişiklik yapma ve tüm etkinlik ayrıntılarını görme' verilmeli"
        : `oluşturulamadı: HTTP ${create.status} ${t}`,
    });
    return { ok: false, steps };
  }
  const ev = (await create.json()) as { id: string };
  await fetch(`${API}/${calId()}/events/${ev.id}`, { method: "DELETE", headers });
  steps.push({ name: "Deneme etkinliği", ok: true, info: "oluşturuldu ve silindi — takvim yazımı çalışıyor" });
  return { ok: true, steps };
}
