// ─────────────────────────────────────────────────────────────
//  GERÇEK MÜŞTERİ YORUMLARI
//  Buraya yalnızca gerçek yorumlar girilir (Google İşletme Profili / Trustpilot / e-posta).
//  Liste boşken ana sayfadaki yorum bölümü gizlenir; puan ve sayı otomatik hesaplanır.
//  Dil serbesttir (DE/EN/IT/AR…): yorum yazıldığı dilde gösterilir, `lang` yalnızca etiket için.
//
//  Örnek kayıt:
//  { name: "Anna K.", flag: "🇩🇪", lang: "de", route: "ZRH → Basel", rating: 5,
//    text: "Pünktliche Abholung, Festpreis wie versprochen.", date: "2026-10-03", source: "google" },
// ─────────────────────────────────────────────────────────────
export type Review = {
  name: string;          // "Ad S." biçiminde, gizlilik için soyadı kısaltılmış
  flag: string;          // ülke bayrağı emojisi
  lang: "de" | "en" | "it" | "fr" | "ar" | "tr" | "other";
  route: string;         // "ZRH → Luzern"
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;          // YYYY-MM-DD
  source: "google" | "trustpilot" | "email" | "whatsapp";
};

export const reviews: Review[] = [];

/** Ortalama puan (1 ondalık) ve sayı; liste boşsa null */
export function reviewStats(): { avg: number; count: number } | null {
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { avg: Math.round(avg * 10) / 10, count: reviews.length };
}
