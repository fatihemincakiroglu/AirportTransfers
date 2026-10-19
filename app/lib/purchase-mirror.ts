// Tarayıcı tarafı Satın Alma (booking_complete) aynası — spec v1.3.5 §14 "browser mirror".
// Yalnızca sunucunun döndürdüğü imzalı makbuzla ve rezervasyon başına BİR KEZ basılır
// (localStorage kilidi + aynı oturumda bellek kilidi). GTM "Web Rezervasyon – Satın Alma" etiketi bunu bekler.
import { pushEvent } from "./analytics";

export type Receipt = {
  kind: "backend_receipt"; event_id: string; booking_id: string; booking_type: "transfer" | "hourly"; currency: "CHF";
  gross_value: number; net_value: number; tax_value: number;
  items: { item_id: string; item_name: string; item_category: string; item_category2: string; item_variant: string; price: number; quantity: number }[];
  issued_at: string; expires_at: string; dedup_deadline_at: string; sig: string;
};

const sent = new Set<string>();

/** Makbuzdan booking_complete basar; daha önce basıldıysa veya süresi geçtiyse hiçbir şey yapmaz. true = basıldı */
export function mirrorPurchase(r: Receipt | null | undefined): boolean {
  if (!r || r.kind !== "backend_receipt" || !r.booking_id || !(r.gross_value > 0)) return false;
  if (sent.has(r.booking_id)) return false;
  const key = `zrh_purchase_${r.booking_id}`;
  try { if (localStorage.getItem(key)) { sent.add(r.booking_id); return false; } } catch { /* depolama kapalı: bellek kilidi yeter */ }
  const now = Date.now();
  if (new Date(r.dedup_deadline_at).getTime() < now || new Date(r.expires_at).getTime() < now) return false;
  sent.add(r.booking_id);
  try { localStorage.setItem(key, new Date().toISOString()); } catch { /* yok say */ }
  pushEvent("booking_complete", {
    event_source: "backend",
    booking: {
      booking_id: r.booking_id, transaction_id: r.booking_id, booking_type: r.booking_type, booking_status: "confirmed",
      booking_channel: "web", price_status: "final", currency: r.currency,
      gross_value: r.gross_value, net_value: r.net_value, tax_value: r.tax_value, shipping_value: 0,
    },
    ecommerce: {
      transaction_id: r.booking_id, value: r.net_value, currency: r.currency, tax: r.tax_value,
      // tax_unit_value / gross_unit_value: spec'in istediği birim KDV ve KDV dahil birim fiyat
      items: r.items.map((it) => {
        const unitTax = Math.round((r.tax_value / Math.max(1, it.quantity)) * 100) / 100;
        return { ...it, tax_unit_value: unitTax, gross_unit_value: Math.round((it.price + unitTax) * 100) / 100 };
      }),
    },
    mirror: {
      kind: r.kind, purchase_dispatch_allowed: true, google_ads_browser_allowed: true, google_ads_value_basis: "gross",
      issued_at: r.issued_at, expires_at: r.expires_at, dedup_deadline_at: r.dedup_deadline_at,
    },
    source: { interaction_channel: "web" },
  }, { id: r.event_id });
  return true;
}
