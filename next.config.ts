import type { NextConfig } from "next";

// Güvenlik başlıkları — SEO denetim araçlarının kontrol ettiği standart set.
// Not: Katı bir CSP bilinçli olarak eklenmedi (JSON-LD inline script'leri ve
// Google Maps iframe'i ile çakışır); ihtiyaç olursa ayrıca ayarlanır.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    // Otomatik modern format dönüşümü (AVIF → WebP → orijinal)
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // ── Eski alan adları → zrhairporttaxi.ch (kalıcı 301) ──
      // Google'daki birikim ve mevcut bağlantılar yeni adrese aktarılır.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?zurichairport-taxi\\.ch" }],
        destination: "https://zrhairporttaxi.ch/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "airport-transfers-gamma\\.vercel\\.app" }],
        destination: "https://zrhairporttaxi.ch/:path*",
        permanent: true,
      },

      // Touren bölümü kaldırıldı — eski URL'ler ana sayfaya yönlenir
      { source: "/:lang/touren/:path*", destination: "/:lang", permanent: true },
      { source: "/:lang/tours/:path*", destination: "/:lang", permanent: true },
      { source: "/:lang/touren", destination: "/:lang", permanent: true },
      { source: "/:lang/tours", destination: "/:lang", permanent: true },
    ];
  },
};

export default nextConfig;
