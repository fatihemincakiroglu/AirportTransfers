// ─────────────────────────────────────────────────────────────
//  TEK AYAR DOSYASI — iletişim bilgilerini sadece burada değiştir
// ─────────────────────────────────────────────────────────────
// Sitenin tam adresi — kendi domainini bağlayınca burayı güncelle:
export const SITE_URL = "https://airport-transfers-gamma.vercel.app";

export const WHATSAPP_NUMBER = "41763020326"; // + ve boşluk olmadan
// Rota rezervasyonlarının (son adım) gönderildiği WhatsApp numarası:
export const BOOKING_WHATSAPP_NUMBER = "905325766383"; // +90 532 576 63 83
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
  { slug: "zurich-airport-to-zug", to: "Zug", km: 46.2, min: 55, price: 138.69, img: "/gallery/2.jpg" },
  { slug: "zurich-airport-to-luzern", to: { de: "Luzern", en: "Lucerne" }, km: 63.3, min: 76, price: 189.75, img: "/gallery/17.jpg" },
  { slug: "zurich-airport-to-basel", to: "Basel", km: 86.2, min: 103, price: 258.5, img: "/gallery/20.jpg" },
  { slug: "zurich-airport-to-geneva", to: { de: "Genf", en: "Geneva" }, km: 266.2, min: 319, price: 798.5, img: "/gallery/13.jpg" },
  { slug: "zurich-airport-to-bern", to: "Bern", km: 117.5, min: 141, price: 352.5, img: "/gallery/18.jpg" },
  { slug: "zurich-airport-to-interlaken", to: "Interlaken", km: 125.2, min: 150, price: 375.63, img: "/gallery/11.jpg" },
  { slug: "zurich-airport-to-st-moritz", to: "St. Moritz", km: 212.7, min: 255, price: 638, img: "/gallery/3.jpg" },
  { slug: "zurich-airport-to-zermatt", to: "Zermatt", km: 237.0, min: 284, price: 711, img: "/gallery/4.jpg" },
  { slug: "zurich-airport-to-davos", to: "Davos", km: 161.5, min: 194, price: 484.5, img: "/gallery/10.jpg" },
  { slug: "zurich-airport-to-lausanne", to: "Lausanne", km: 215.5, min: 259, price: 646.5, img: "/gallery/15.jpg" },
  { slug: "zurich-airport-to-montreux", to: "Montreux", km: 243.5, min: 292, price: 730.5, img: "/gallery/7.jpg" },
  { slug: "zurich-airport-to-lugano", to: "Lugano", km: 210.2, min: 252, price: 630.5, img: "/gallery/3.jpg" },
  { slug: "zurich-airport-to-grindelwald", to: "Grindelwald", km: 141.7, min: 170, price: 425, img: "/gallery/8.jpg" },
  { slug: "zurich-airport-to-verbier", to: "Verbier", km: 269.8, min: 324, price: 809.5, img: "/gallery/16.jpg" },
  { slug: "zurich-airport-to-wengen", to: "Wengen", km: 133.5, min: 160, price: 400.5, img: "/gallery/6.jpg" },
  { slug: "zurich-airport-to-st-gallen", to: "St. Gallen", km: 81.2, min: 97, price: 243.5, img: "/gallery/14.jpg" },
  { slug: "zurich-airport-to-chur", to: "Chur", km: 135.5, min: 163, price: 406.5, img: "/gallery/9.jpg" },
  { slug: "zurich-airport-to-winterthur", to: "Winterthur", km: 29.6, min: 36, price: 88.9, img: "/gallery/1.jpg" },
  { slug: "zurich-airport-to-locarno", to: "Locarno", km: 201.3, min: 242, price: 604, img: "/gallery/13.jpg" },
  { slug: "zurich-airport-to-thun", to: "Thun", km: 141.7, min: 170, price: 425, img: "/gallery/12.jpg" },
  { slug: "zurich-airport-to-sion", to: "Sion", km: 270.7, min: 325, price: 812, img: "/gallery/16.jpg" },
  { slug: "zurich-airport-to-bellinzona", to: "Bellinzona", km: 182.7, min: 219, price: 548, img: "/gallery/15.jpg" },
  { slug: "zurich-airport-to-fribourg", to: "Fribourg", km: 154.7, min: 186, price: 464, img: "/gallery/18.jpg" },
  { slug: "zurich-airport-to-schaffhausen", to: "Schaffhausen", km: 49.5, min: 59, price: 148.5, img: "/gallery/5.jpg" },
  { slug: "zurich-airport-to-engelberg", to: "Engelberg", km: 94.2, min: 113, price: 282.5, img: "/gallery/19.jpg" },
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

// Galeri alt metinleri (SEO + erişilebilirlik) — sırayla 1.jpg ... 20.jpg
export const galleryAlts: string[] = [
  "Zürich Altstadt und Limmat – Luftaufnahme bei Sonnenaufgang",
  "Limmatquai Zürich mit Grossmünster bei Sonnenuntergang",
  "Bernina Express am türkisblauen Lago Bianco, Graubünden",
  "Zermatt mit Matterhorn im Hintergrund",
  "Staubbachfall im Lauterbrunnental – Luftaufnahme",
  "Bergdorf Wengen vor Jungfrau-Massiv",
  "Schloss Seeburg am Brienzersee bei Iseltwald",
  "Grindelwaldtal mit Eiger und Wetterhorn",
  "Schilthorn-Luftseilbahn über verschneiten Gipfeln",
  "Landwasserviadukt mit roter Rhätischer Bahn im Winter",
  "Iseltwald am Brienzersee – Luftaufnahme",
  "Lauterbrunnen Dorf mit Staubbachfall",
  "Oeschinensee bei Kandersteg mit Bergpanorama",
  "Seealpsee im Alpstein mit Kuh auf der Weide",
  "Arnisee mit Berghaus, Kanton Uri",
  "Chalets in Grimentz, Val d'Anniviers, Wallis",
  "Melchsee-Frutt mit Bergsee, Obwalden",
  "Kurvige Passstrasse im Jura, Region Basel",
  "Engelberg im Herbst mit verschneiten Gipfeln",
  "Kurpark Bad Ragaz mit Alpenblick",
];

/** Görsel yoluna göre alt metni bul: "/gallery/4.jpg" → Zermatt … */
export function altFor(src: string, fallback = "AirportTransfers Zürich"): string {
  const m = src.match(/\/gallery\/(\d+)\.jpg/);
  if (m) return galleryAlts[Number(m[1]) - 1] ?? fallback;
  return fallback;
}
