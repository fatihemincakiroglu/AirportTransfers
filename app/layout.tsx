import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { LangProvider } from "./providers";
import { SITE_URL } from "./config";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AirportTransfers Zürich | Flughafentransfer ZRH · VIP Mercedes",
  description:
    "Privater Flughafentransfer Zürich zum Festpreis. Geschulte Chauffeure, Flugverfolgung, 24/7. Private Zurich Airport transfers at fixed prices.",
  // Robots meta etiketi: indeksle ve linkleri takip et
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Yazar ve yayıncı bilgileri
  authors: [{ name: "AirportTransfers Zürich", url: SITE_URL }],
  creator: "AirportTransfers Zürich",
  publisher: "AirportTransfers Zürich",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AirportTransfers Zürich",
      legalName: "Kula-ZATK",
      url: "/",
      logo: "/icon.png",
      telephone: "+41763020326",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Industristrasse 14",
        postalCode: "8302",
        addressLocality: "Kloten",
        addressCountry: "CH",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AirportTransfers Zürich",
      url: "/",
      inLanguage: ["de", "en"],
    },
  ];

  return (
    <html lang="de">
      <body className={`${sans.variable} ${serif.variable}`}>
        {jsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
        ))}
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
