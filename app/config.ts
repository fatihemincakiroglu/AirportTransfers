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

// Güzergâhlar — zurichairport-taxi.ch'deki verilerle birebir aynı
// (km, dakika, Business Class fiyatı CHF). Sıralama: sitedeki sıra.
export const routes: { slug: string; to: LocalName; km: number; min: number; price: number; img: string }[] = [
  { slug: "zug", to: "Zug", km: 46.2, min: 55, price: 138.69, img: "/routes/zug.jpg" },
  { slug: "luzern", to: { de: "Luzern", en: "Lucerne" }, km: 63.3, min: 76, price: 189.75, img: "/routes/luzern.jpg" },
  { slug: "basel", to: "Basel", km: 86.2, min: 103, price: 258.5, img: "/routes/basel.jpg" },
  { slug: "genf", to: { de: "Genf", en: "Geneva" }, km: 266.2, min: 319, price: 798.5, img: "/routes/genf.jpg" },
  { slug: "bern", to: "Bern", km: 117.5, min: 141, price: 352.5, img: "/routes/bern.jpg" },
  { slug: "interlaken", to: "Interlaken", km: 125.2, min: 150, price: 375.63, img: "/gallery/11.jpg" },
  { slug: "st-moritz", to: "St. Moritz", km: 212.7, min: 255, price: 638, img: "/gallery/3.jpg" },
  { slug: "zermatt", to: "Zermatt", km: 237.0, min: 284, price: 711, img: "/gallery/4.jpg" },
  { slug: "davos", to: "Davos", km: 161.5, min: 194, price: 484.5, img: "/gallery/10.jpg" },
  { slug: "lausanne", to: "Lausanne", km: 215.5, min: 259, price: 646.5, img: "/routes/lausanne.jpg" },
  { slug: "montreux", to: "Montreux", km: 243.5, min: 292, price: 730.5, img: "/routes/montreux.jpg" },
  { slug: "lugano", to: "Lugano", km: 210.2, min: 252, price: 630.5, img: "/routes/lugano.jpg" },
  { slug: "grindelwald", to: "Grindelwald", km: 141.7, min: 170, price: 425, img: "/gallery/8.jpg" },
  { slug: "verbier", to: "Verbier", km: 269.8, min: 324, price: 809.5, img: "/routes/verbier.jpg" },
  { slug: "wengen", to: "Wengen", km: 133.5, min: 160, price: 400.5, img: "/gallery/6.jpg" },
  { slug: "st-gallen", to: "St. Gallen", km: 81.2, min: 97, price: 243.5, img: "/routes/st-gallen.jpg" },
  { slug: "chur", to: "Chur", km: 135.5, min: 163, price: 406.5, img: "/routes/chur.jpg" },
  { slug: "winterthur", to: "Winterthur", km: 29.6, min: 36, price: 88.9, img: "/routes/winterthur.jpg" },
  { slug: "locarno", to: "Locarno", km: 201.3, min: 242, price: 604, img: "/routes/locarno.jpg" },
  { slug: "thun", to: "Thun", km: 141.7, min: 170, price: 425, img: "/routes/thun.jpg" },
  { slug: "sion", to: "Sion", km: 270.7, min: 325, price: 812, img: "/routes/sion.jpg" },
  { slug: "bellinzona", to: "Bellinzona", km: 182.7, min: 219, price: 548, img: "/routes/bellinzona.jpg" },
  { slug: "fribourg", to: "Fribourg", km: 154.7, min: 186, price: 464, img: "/routes/fribourg.jpg" },
  { slug: "schaffhausen", to: "Schaffhausen", km: 49.5, min: 59, price: 148.5, img: "/routes/schaffhausen.jpg" },
  { slug: "engelberg", to: "Engelberg", km: 94.2, min: 113, price: 282.5, img: "/gallery/19.jpg" },
];

// Filo — gerçek araçlar. Görseller opsiyonel: public/fleet/
// Filo — gerçek araçlar. `mult` = fiyat çarpanı (rota Business fiyatı × mult).
// Çarpanlar rezervasyon ekranınızdaki oranlardan türetildi — gerekirse düzelt:
// Business 1.00 · Business&Family ≈1.19 · Premium ≈1.87 · VIP 2.20 (tahmin)
export const fleet: { name: LocalName; car: string; pax: number; bags: number; img: string; mult: number }[] = [
  { name: "Business Class", car: "Mercedes-Benz E-Class", pax: 2, bags: 2, img: "/fleet/e-class.webp", mult: 1.0 },
  { name: { de: "Business & Family Class", en: "Business & Family Class" }, car: "Mercedes-Benz V-Class", pax: 7, bags: 7, img: "/fleet/v-class.webp", mult: 1.19 },
  { name: "Premium Class", car: "Mercedes-Benz S-Class", pax: 3, bags: 3, img: "/fleet/s-class.webp", mult: 1.87 },
  { name: "VIP Ultra Comfort", car: "Mercedes-Benz V300 Maybach", pax: 5, bags: 5, img: "/fleet/v300-maybach.webp", mult: 2.2 },
];

// Formlardaki maksimum yolcu sayısı (en büyük araca göre)
export const MAX_PAX = 7;

// Galeri — public/gallery/1.jpg ... 20.jpg (pakette hazır)
export const gallery = Array.from({ length: 20 }, (_, i) => `/gallery/${i + 1}.jpg`);
