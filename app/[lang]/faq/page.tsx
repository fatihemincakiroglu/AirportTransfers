import type { Metadata } from "next";
import { t } from "../../i18n";
import FaqClient from "./faq-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Häufige Fragen (FAQ) | AirportTransfers Zürich", description: "Antworten zu Buchung, Festpreisen, Flugverspätung, Zahlung, Stornierung, Kindersitzen und Gepäck." },
  en: { title: "Frequently Asked Questions (FAQ) | AirportTransfers Zurich", description: "Answers on booking, fixed prices, flight delays, payment, cancellation, child seats and luggage." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}/faq`, languages: { en: "/en/faq", de: "/de/faq", "x-default": "/en/faq" } },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const list = (lang === "de" ? t.de : t.en).faqPage.list;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqClient />
    </>
  );
}
