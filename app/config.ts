// ─────────────────────────────────────────────────────────────
//  TEK AYAR DOSYASI — iletişim bilgilerini sadece burada değiştir
// ─────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = "41763020326"; // + ve boşluk olmadan
export const PHONE_DISPLAY = "+41 76 302 03 26";
export const CONTACT_EMAIL = "info@airporttransfers.ch"; // kendi e-postanı yaz
export const COMPANY_NAME = "Kula-ZATK";
export const COMPANY_REG = "Handelsregister-Nr.: CH-020.1.089.436-5";
export const COMPANY_ADDRESS = "Industristrasse 14, 8302 Kloten, Switzerland";

// Hero slider görselleri (public/hero/ içinde — pakette hazır geliyor)
export const HERO_IMAGES = ["/hero/hero-1.jpg", "/hero/hero-2.jpg", "/hero/hero-3.jpg"];
export const SLIDE_MS = 6000;

// Footer arka plan görseli (slider görsellerinden biri — istediğinle değiştir)
export const FOOTER_IMAGE = "/hero/hero-2.jpg";

// Renk paleti: koyu çam yeşili + şampanya altını
export const C = {
  pine: "#0C2E25",
  pineDeep: "#08211B",
  gold: "#C9A24B",
  ivory: "#FAFAF7",
  ink: "#1C2B27",
};

export type LocalName = string | { de: string; en: string };

// Güzergâhlar — fiyatları kendi fiyatlarınla güncelle.
// Görseller opsiyonel: public/routes/ klasörüne aynı isimle koyarsan görünür.
export const routes: { to: LocalName; km: number; price: number; img: string }[] = [
  { to: "Zürich City", km: 12, price: 69, img: "/routes/zuerich.jpg" },
  { to: "Winterthur", km: 22, price: 89, img: "/routes/winterthur.jpg" },
  { to: "Zug", km: 46, price: 139, img: "/routes/zug.jpg" },
  { to: { de: "Luzern", en: "Lucerne" }, km: 63, price: 189, img: "/routes/luzern.jpg" },
  { to: "Basel", km: 86, price: 249, img: "/routes/basel.jpg" },
  { to: "Interlaken", km: 125, price: 379, img: "/routes/interlaken.jpg" },
  { to: "Bern", km: 118, price: 299, img: "/routes/bern.jpg" },
  { to: "St. Gallen", km: 85, price: 239, img: "/routes/st-gallen.jpg" },
  { to: "Schaffhausen", km: 50, price: 149, img: "/routes/schaffhausen.jpg" },
  { to: "Davos", km: 150, price: 449, img: "/routes/davos.jpg" },
  { to: "St. Moritz", km: 200, price: 590, img: "/routes/st-moritz.jpg" },
  { to: { de: "Genf", en: "Geneva" }, km: 280, price: 790, img: "/routes/genf.jpg" },
];

// Filo — gerçek araçlar. Görseller opsiyonel: public/fleet/
export const fleet: { name: LocalName; car: string; pax: number; bags: number; img: string }[] = [
  { name: "Premium Class", car: "Mercedes-Benz S-Class", pax: 3, bags: 3, img: "/fleet/s-class.webp" },
  { name: "Business Class", car: "Mercedes-Benz E-Class", pax: 2, bags: 2, img: "/fleet/e-class.webp" },
  { name: { de: "Business & Family Class", en: "Business & Family Class" }, car: "Mercedes-Benz V-Class", pax: 7, bags: 7, img: "/fleet/v-class.webp" },
  { name: "VIP Ultra Comfort", car: "Mercedes-Benz V300 Maybach", pax: 5, bags: 5, img: "/fleet/v300-maybach.webp" },
];

// Formlardaki maksimum yolcu sayısı (en büyük araca göre)
export const MAX_PAX = 7;

// Galeri — public/gallery/1.jpg ... 20.jpg (pakette hazır)
export const gallery = Array.from({ length: 20 }, (_, i) => `/gallery/${i + 1}.jpg`);
