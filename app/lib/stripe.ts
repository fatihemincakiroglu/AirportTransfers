// ─────────────────────────────────────────────────────────────
//  STRIPE — ödeme ve iade (REST ile, harici paket yok)
//  Ortam değişkenleri:
//    STRIPE_SECRET_KEY      → sk_live_... (veya test için sk_test_...)
//    STRIPE_WEBHOOK_SECRET  → whsec_... (ödeme bildirimini doğrular)
// ─────────────────────────────────────────────────────────────
import crypto from "node:crypto";

const API = "https://api.stripe.com/v1";

export const stripeReady = () => Boolean(process.env.STRIPE_SECRET_KEY);

/** Stripe form-encoded gövde bekler; iç içe alanlar a[b] biçiminde yazılır */
function encode(obj: Record<string, unknown>, prefix = ""): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object" && !Array.isArray(v)) {
      out.push(...encode(v as Record<string, unknown>, key));
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === "object") out.push(...encode(item as Record<string, unknown>, `${key}[${i}]`));
        else out.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(String(item))}`);
      });
    } else {
      out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  }
  return out;
}

async function call<T>(path: string, body?: Record<string, unknown>): Promise<T | null> {
  if (!stripeReady()) return null;
  try {
    const res = await fetch(`${API}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body ? encode(body).join("&") : undefined,
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("[stripe]", path, data?.error?.message ?? data);
      return null;
    }
    return data as T;
  } catch (e) {
    console.error("[stripe] istek hatası", e);
    return null;
  }
}

export type CheckoutInput = {
  ref: string;
  bookingId: number;
  amount: number;           // CHF, ör. 189.00
  description: string;      // "Flughafen Zürich (ZRH) → Luzern · 2026-09-20 14:30"
  email?: string | null;
  lang: string;
  successUrl: string;
  cancelUrl: string;
};

/** Ödeme sayfası oluşturur; müşteri bu adrese yönlendirilir */
export async function createCheckout(i: CheckoutInput): Promise<{ id: string; url: string } | null> {
  const res = await call<{ id: string; url: string }>("/checkout/sessions", {
    mode: "payment",
    // Kart + TWINT (Stripe panelinde etkinleştirilmiş yöntemler otomatik gelir)
    automatic_payment_methods: { enabled: true },
    currency: "chf",
    locale: i.lang === "de" ? "de" : "en",
    customer_email: i.email || undefined,
    client_reference_id: i.ref,
    success_url: i.successUrl,
    cancel_url: i.cancelUrl,
    metadata: { ref: i.ref, bookingId: String(i.bookingId) },
    payment_intent_data: {
      description: `${i.ref} · ${i.description}`,
      metadata: { ref: i.ref, bookingId: String(i.bookingId) },
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "chf",
          unit_amount: Math.round(i.amount * 100),
          product_data: { name: "Privattransfer", description: i.description },
        },
      },
    ],
  });
  return res && res.url ? { id: res.id, url: res.url } : null;
}

/** Ödemeyi tamamen iade eder */
export async function refundPayment(paymentIntentId: string): Promise<{ id: string; status: string } | null> {
  return call<{ id: string; status: string }>("/refunds", {
    payment_intent: paymentIntentId,
    reason: "requested_by_customer",
  });
}

/** Webhook imzasını doğrular (Stripe-Signature başlığı) */
export function verifyWebhook(payload: string, header: string | null): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !header) return false;

  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  // 5 dakikadan eski istekleri reddet (tekrar saldırısı koruması)
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
