// Tarayıcı tarafı Satın Alma (booking_complete) aynası — spec v1.3.5 §14 "browser mirror".
// Yalnızca sunucunun döndürdüğü imzalı makbuzla ve rezervasyon başına BİR KEZ basılır
// (localStorage kilidi + aynı oturumda bellek kilidi). GTM "Web Rezervasyon – Satın Alma" etiketi bunu bekler.
// Zaman alanları unix SANİYE; geçerlilik kontrolü x * 1000 ile yapılır (iş listesi T1).
import { pushEvent, hasMarketingConsent } from "./analytics";

export type Receipt = {
  kind: "backend_receipt"; event_id: string; booking_id: string; booking_type: "transfer" | "hourly"; currency: "CHF";
  gross_value: number; net_value: number; tax_value: number;
  items: { item_id: string; item_name: string; item_category: string; item_category2: string; item_variant: string; price: number; tax_unit_value: number; gross_unit_value: number; quantity: number }[];
  issued_at: number; expires_at: number; dedup_deadline_at: number;
  user_data?: { sha256_email_address?: string; sha256_phone_number?: string };
  sig: string;
};

const sent = new Set<string>();
const lock = (key: string): boolean => {
  if (sent.has(key)) return false;
  try { if (localStorage.getItem(key)) { sent.add(key); return false; } } catch { /* depolama kapalı: bellek kilidi yeter */ }
  sent.add(key);
  try { localStorage.setItem(key, new Date().toISOString()); } catch { /* yok say */ }
  return true;
};

/**
 * Online ödemede booking_submit, ödeme doğrulandıktan SONRA (onay sayfasında) bir kez basılır (iş listesi T12).
 * Araçta ödemede rezervasyon sayfası basar; aynı kilit ikinci kez basılmasını önler.
 */
export function submitOnce(r: Receipt): boolean {
  if (!r?.booking_id || !lock(`zrh_submit_${r.booking_id}`)) return false;
  pushEvent("booking_submit", {
    booking: {
      booking_id: r.booking_id, booking_type: r.booking_type, booking_channel: "web", price_status: "final", currency: r.currency,
      gross_value: r.gross_value, net_value: r.net_value, tax_value: r.tax_value, shipping_value: 0,
    },
  }, { idPrefix: "submit" });
  return true;
}
/** Rezervasyon sayfasında basılan booking_submit'i kilide yazar (onay sayfası tekrar basmasın) */
export const markSubmitted = (bookingId: string) => { lock(`zrh_submit_${bookingId}`); };

/** Makbuzdan booking_complete basar; daha önce basıldıysa veya süresi geçtiyse hiçbir şey yapmaz. true = basıldı */
export function mirrorPurchase(r: Receipt | null | undefined): boolean {
  if (!r || r.kind !== "backend_receipt" || !r.booking_id || !(r.gross_value > 0) || !r.items?.length) return false;
  const now = Date.now();
  if (r.dedup_deadline_at * 1000 < now || r.expires_at * 1000 < now) return false;
  if (!lock(`zrh_purchase_${r.booking_id}`)) return false;
  // Gelişmiş dönüşümler: hash'li veri yalnızca pazarlama onayı varsa (T19)
  const ud = r.user_data && hasMarketingConsent() ? { user_data: r.user_data } : {};
  pushEvent("booking_complete", {
    event_source: "backend",
    booking: {
      booking_id: r.booking_id, transaction_id: r.booking_id, booking_type: r.booking_type, booking_status: "confirmed",
      booking_channel: "web", price_status: "final", currency: r.currency,
      gross_value: r.gross_value, net_value: r.net_value, tax_value: r.tax_value, shipping_value: 0,
    },
    ecommerce: { transaction_id: r.booking_id, value: r.net_value, currency: r.currency, tax: r.tax_value, items: r.items },
    mirror: {
      kind: r.kind, purchase_dispatch_allowed: true, google_ads_browser_allowed: true, google_ads_value_basis: "gross",
      issued_at: r.issued_at, expires_at: r.expires_at, dedup_deadline_at: r.dedup_deadline_at,
    },
    source: { interaction_channel: "web" },
    ...ud,
  }, { id: r.event_id });
  return true;
}
