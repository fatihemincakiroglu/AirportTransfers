// ─────────────────────────────────────────────────────────────
//  TEK AYAR DOSYASI — iletişim bilgilerini sadece burada değiştir
// ─────────────────────────────────────────────────────────────
// Sitenin tam adresi — kendi domainini bağlayınca burayı güncelle:
export const SITE_URL = "https://zrhairporttaxi.ch";

/** Marka adı — meta, yapısal veri ve footer'da kullanılır */
export const SITE_NAME = "ZRH Airport Taxi";

/**
 * Google Tag Manager kimliği (boş bırakılırsa yüklenmez).
 * GA4, Ads dönüşümleri ve diğer tüm etiketler GTM panelinden yönetilir —
 * siteye ayrıca etiket kodu eklenmez.
 * GA4 ölçüm kimliği: G-VYKV4VNKT7 (GTM içinde tanımlı)
 */
export const GTM_ID = "GTM-KD6XZ6G9";

/** İsviçre KDV oranı (fiyatlar KDV dahil). Fatura ve ölçüm net/KDV ayrımı bunu kullanır. */
export const VAT_RATE = 0.081;

export const WHATSAPP_NUMBER = "41764961324"; // + ve boşluk olmadan
// Rota rezervasyonlarının (son adım) gönderildiği WhatsApp numarası:
export const BOOKING_WHATSAPP_NUMBER = "41764961324"; // +41 76 496 13 24
export const PHONE_DISPLAY = "+41 76 496 13 24";
export const CONTACT_EMAIL = "info@zrhairporttaxi.ch"; // e-posta kutusu açılınca aktif olur
export const COMPANY_NAME = "Kula-ZATK";
export const COMPANY_REG = "Handelsregister-Nr.: CH-020.1.089.436-5";
export const COMPANY_ADDRESS = "Ifangstrasse 12, Stock 2, 8302 Kloten, Switzerland";
export const COMPANY_MAPS_URL = "https://maps.app.goo.gl/NbtdxkVoerMpN7hF6";
/** Google Business Profile (İşletme Profili) — iletişim sayfası, footer ve yapısal veri sameAs */
export const GOOGLE_BUSINESS_URL = "https://share.google/lgVZZl2iY9Y65RCpb";
/** Google Maps gömme (API anahtarı gerektirmez) */
export const COMPANY_MAPS_EMBED = "https://www.google.com/maps?q=Ifangstrasse+12,+8302+Kloten,+Switzerland&output=embed&z=16";

// ── Fatura bilgileri (panelde kullanılır) ──
/** Faturadaki resmi (Handelsregister) adres — sitedeki adresten farklıdır, yalnızca fatura şablonunda kullanılır */
export const COMPANY_ADDRESS_LINES = ["c/o Erkan Kula", "Dorfstrasse 56", "8302 Kloten", "Switzerland"];
/** Banka bilgileri — faturada gösterilir. Doğruluğunu kontrol edin. */
export const BANK = {
  name: "PostFinance AG",
  city: "3030 Bern",
  iban: "CH98 0900 0000 1584 9473 3",
  account: "120 087 111 031",
};
/** Fatura numarası öneki */
export const INVOICE_PREFIX = "INV";

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
// ─────────────────────────────────────────────────────────────
//  FİYATLANDIRMA (09/2026) — mesafeye göre kademeli tarife + saatlik tarife
//  Tüm fiyatlar buradan türer: rota/hedef sayfaları, fiyat listesi, rezervasyon,
//  SSS, yapısal veri. Rakam değişikliği yalnızca burada yapılır.
// ─────────────────────────────────────────────────────────────
export type VehicleId = "business_class_e" | "business_family_v" | "premium_s";

/** Mesafe dilimleri: üst sınır (km, son dilim sınırsız) ve taban fiyat (CHF). Dahil km = 0. */
export const KM_TIERS: { upTo: number | null; base: number }[] = [
  { upTo: 10, base: 52 }, { upTo: 20, base: 37 }, { upTo: 30, base: 27 },
  { upTo: 40, base: 17 }, { upTo: 50, base: 15 }, { upTo: null, base: 20 },
];
/** Araç başına km ücreti (CHF/km) */
export const KM_RATE: Record<VehicleId, number> = { business_class_e: 2.8, business_family_v: 3.4, premium_s: 5.5 };
export const TRANSFER_MIN_PRICE = 80;
/** Gece tarifesi 00:00–06:00: transfer %20, saatlik %30 */
export const NIGHT_FROM = "00:00", NIGHT_TO = "06:00";
export const NIGHT_SURCHARGE_TRANSFER = 0.20;
export const NIGHT_SURCHARGE_HOURLY = 0.30;
/** Saatlik tarife (üç araçta aynı zaman fiyatı; km alternatifi araç ücretine göre) */
export const HOURLY = { firstHour: 80, extraHour: 72, kmPerHour: 25, roundUpTo: 5 };

/** Saat (HH:MM) gece aralığında mı? */
export function isNightTime(time?: string | null): boolean {
  if (!time || !/^\d{2}:\d{2}/.test(time)) return false;
  return time >= NIGHT_FROM && time < NIGHT_TO;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Adresten adrese fiyat: taban(dilim) + km × araç ücreti, gece zammı, minimum, 0.01 yuvarlama */
export function transferPrice(km: number, vehicle: VehicleId, time?: string | null): number {
  const tier = KM_TIERS.find((t) => t.upTo === null || km <= t.upTo) ?? KM_TIERS[KM_TIERS.length - 1];
  let p = tier.base + km * KM_RATE[vehicle];
  if (isNightTime(time)) p *= 1 + NIGHT_SURCHARGE_TRANSFER;
  return round2(Math.max(TRANSFER_MIN_PRICE, p));
}

/** Saatlik fiyat: max(zaman, saat×25km×ücret), gece zammı, 5 CHF'e yukarı yuvarlama */
export function hourlyPrice(hours: number, vehicle: VehicleId, time?: string | null): number {
  const h = Math.max(1, Math.ceil(hours));
  const byTime = HOURLY.firstHour + (h - 1) * HOURLY.extraHour;
  const byKm = h * HOURLY.kmPerHour * KM_RATE[vehicle];
  let p = Math.max(byTime, byKm);
  if (isNightTime(time)) p *= 1 + NIGHT_SURCHARGE_HOURLY;
  return Math.ceil(p / HOURLY.roundUpTo) * HOURLY.roundUpTo;
}

/** Sabit rotanın gündüz Business Class fiyatı ("ab CHF …") */
export const routeBasePrice = (km: number) => transferPrice(km, "business_class_e");

const ROUTE_DATA: { slug: string; to: LocalName; km: number; min: number; img: string }[] = [
  { slug: "zurich-airport-to-zug", to: "Zug", km: 46.2, min: 55, img: "/gallery/2.jpg" },
  { slug: "zurich-airport-to-luzern", to: { de: "Luzern", en: "Lucerne" }, km: 63.3, min: 76, img: "/gallery/17.jpg" },
  { slug: "zurich-airport-to-basel", to: "Basel", km: 86.2, min: 103, img: "/gallery/20.jpg" },
  { slug: "zurich-airport-to-geneva", to: { de: "Genf", en: "Geneva" }, km: 266.2, min: 319, img: "/gallery/13.jpg" },
  { slug: "zurich-airport-to-bern", to: "Bern", km: 117.5, min: 141, img: "/gallery/18.jpg" },
  { slug: "zurich-airport-to-interlaken", to: "Interlaken", km: 125.2, min: 150, img: "/gallery/11.jpg" },
  { slug: "zurich-airport-to-st-moritz", to: "St. Moritz", km: 212.7, min: 255, img: "/gallery/3.jpg" },
  { slug: "zurich-airport-to-zermatt", to: "Zermatt", km: 237.0, min: 284, img: "/gallery/4.jpg" },
  { slug: "zurich-airport-to-davos", to: "Davos", km: 161.5, min: 194, img: "/gallery/10.jpg" },
  { slug: "zurich-airport-to-lausanne", to: "Lausanne", km: 215.5, min: 259, img: "/gallery/15.jpg" },
  { slug: "zurich-airport-to-montreux", to: "Montreux", km: 243.5, min: 292, img: "/gallery/7.jpg" },
  { slug: "zurich-airport-to-lugano", to: "Lugano", km: 210.2, min: 252, img: "/gallery/3.jpg" },
  { slug: "zurich-airport-to-grindelwald", to: "Grindelwald", km: 141.7, min: 170, img: "/gallery/8.jpg" },
  { slug: "zurich-airport-to-verbier", to: "Verbier", km: 269.8, min: 324, img: "/gallery/16.jpg" },
  { slug: "zurich-airport-to-wengen", to: "Wengen", km: 133.5, min: 160, img: "/gallery/6.jpg" },
  { slug: "zurich-airport-to-st-gallen", to: "St. Gallen", km: 81.2, min: 97, img: "/gallery/14.jpg" },
  { slug: "zurich-airport-to-chur", to: "Chur", km: 135.5, min: 163, img: "/gallery/9.jpg" },
  { slug: "zurich-airport-to-winterthur", to: "Winterthur", km: 29.6, min: 36, img: "/gallery/1.jpg" },
  { slug: "zurich-airport-to-locarno", to: "Locarno", km: 201.3, min: 242, img: "/gallery/13.jpg" },
  { slug: "zurich-airport-to-thun", to: "Thun", km: 141.7, min: 170, img: "/gallery/12.jpg" },
  { slug: "zurich-airport-to-sion", to: "Sion", km: 270.7, min: 325, img: "/gallery/16.jpg" },
  { slug: "zurich-airport-to-bellinzona", to: "Bellinzona", km: 182.7, min: 219, img: "/gallery/15.jpg" },
  { slug: "zurich-airport-to-fribourg", to: "Fribourg", km: 154.7, min: 186, img: "/gallery/18.jpg" },
  { slug: "zurich-airport-to-schaffhausen", to: "Schaffhausen", km: 49.5, min: 59, img: "/gallery/5.jpg" },
  { slug: "zurich-airport-to-engelberg", to: "Engelberg", km: 94.2, min: 113, img: "/gallery/19.jpg" },
];
/** Sabit rotalar — price = gündüz Business Class fiyatı, km'den türer (transferPrice) */
export const routes: { slug: string; to: LocalName; km: number; min: number; price: number; img: string }[] =
  ROUTE_DATA.map((r) => ({ ...r, price: routeBasePrice(r.km) }));


// Filo — gerçek araçlar. Görseller opsiyonel: public/fleet/
// Filo — gerçek araçlar. `mult` = fiyat çarpanı (rota Business fiyatı × mult).
// Çarpanlar rezervasyon ekranınızdaki oranlardan türetildi — gerekirse düzelt:
// Business 1.00 · Business&Family ≈1.19 · Premium ≈1.87 · VIP 2.20 (tahmin)
// `id` = ölçüm için sabit araç kimliği (dataLayer vehicle_id / item_id), görünen ada bağlı değil.
export const fleet: { id: VehicleId; name: LocalName; car: string; pax: number; bags: number; img: string; mult: number }[] = [
  { id: "business_class_e", name: "Business Class", car: "Mercedes-Benz E-Class", pax: 2, bags: 2, img: "/fleet/e-class.webp", mult: 1.0 },
  { id: "business_family_v", name: { de: "Business & Family Class", en: "Business & Family Class" }, car: "Mercedes-Benz V-Class", pax: 7, bags: 7, img: "/fleet/v-class.webp", mult: 1.19 },
  { id: "premium_s", name: "Premium Class", car: "Mercedes-Benz S-Class", pax: 3, bags: 3, img: "/fleet/s-class.webp", mult: 1.87 },
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

/** Hero slider görselleri için alt metinler */
const heroAlts: Record<string, string> = {
  "hero-1": "Flughafen Zürich (ZRH) – Terminal mit SWISS Flugzeugen am Gate",
  "hero-2": "Flughafen Zürich – Ankunftsbereich und Abholzone am Terminal",
  "hero-3": "Flughafen Zürich bei Nacht – beleuchteter Terminaleingang",
};

/** Görsel yoluna göre alt metni bul: "/gallery/4.jpg" → Zermatt … */
export function altFor(src: string, fallback = "ZRH Airport Taxi"): string {
  const m = src.match(/\/gallery\/(\d+)\.jpg/);
  if (m) return galleryAlts[Number(m[1]) - 1] ?? fallback;
  const h = src.match(/\/hero\/(hero-\d)\.jpg/);
  if (h) return heroAlts[h[1]] ?? fallback;
  return fallback;
}

// Rezervasyon formu otomatik tamamlama — İsviçre şehir/kanton/tatil yerleri
export const SWISS_PLACES: string[] = [
  "Flughafen Zürich (ZRH)",
  "Zürich", "Winterthur", "Uster", "Rapperswil-Jona", "Baden", "Aarau", "Olten",
  "Basel", "Liestal", "Bern", "Thun", "Biel/Bienne", "Solothurn",
  "Luzern / Lucerne", "Zug", "Schwyz", "Einsiedeln", "Sarnen", "Stans", "Altdorf", "Andermatt", "Engelberg",
  "St. Gallen", "Appenzell", "Herisau", "Glarus", "Frauenfeld", "Kreuzlingen", "Schaffhausen", "Stein am Rhein",
  "Chur", "Davos", "Klosters", "Arosa", "Lenzerheide", "Flims", "Laax", "St. Moritz", "Pontresina", "Scuol",
  "Interlaken", "Grindelwald", "Wengen", "Lauterbrunnen", "Mürren", "Gstaad", "Adelboden", "Kandersteg", "Spiez",
  "Fribourg / Freiburg", "Bulle", "Gruyères", "Neuchâtel / Neuenburg", "Yverdon-les-Bains", "Delémont",
  "Lausanne", "Montreux", "Vevey", "Nyon", "Morges", "Genf / Geneva",
  "Sion / Sitten", "Brig", "Visp", "Zermatt", "Täsch", "Saas-Fee", "Crans-Montana", "Verbier", "Leukerbad", "Martigny",
  "Lugano", "Locarno", "Ascona", "Bellinzona", "Morcote",
];

// Özel güzergâhlar (sabit rota dışı, mesafe bilinmiyor) için Business Class tahmini taban;
// kesin fiyat kabulde teyit edilir. Araç farkı km ücreti oranıyla uygulanır (vehicleFactor).
export const CUSTOM_BASE_PRICE = 250.0;
/** Araçlar arası oran (tahmini fiyatlarda E-Class'a göre) */
export const vehicleFactor = (vehicle: VehicleId) => KM_RATE[vehicle] / KM_RATE.business_class_e;
