import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { LangProvider } from "../providers";
import { SITE_URL } from "../config";
import { LANGS, DEFAULT_LANG, RTL_LANGS, langAlternates } from "../paths";
import { t, type Lang } from "../i18n";
import "../globals.css";

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

type Params = { params: Promise<{ lang: string }> };

// Tüm dilleri derleme sırasında oluştur
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS as readonly string[]).includes(rawLang) ? rawLang : DEFAULT_LANG;
  const m = t[lang as Lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.desc,
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
    authors: [{ name: "AirportTransfers Zürich", url: SITE_URL }],
    creator: "AirportTransfers Zürich",
    publisher: "AirportTransfers Zürich",
    alternates: {
      canonical: `/${lang}`,
      languages: langAlternates("/"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: Lang = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : DEFAULT_LANG;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AirportTransfers Zürich",
      legalName: "Kula-ZATK",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
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
      url: SITE_URL,
      inLanguage: [...LANGS],
    },
  ];

  return (
    <html lang={safeLang} dir={RTL_LANGS.includes(safeLang) ? "rtl" : "ltr"}>
      <body className={`${sans.variable} ${serif.variable}`}>
        {jsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
        ))}
        <LangProvider lang={safeLang}>{children}</LangProvider>
      </body>
    </html>
  );
}
