import type { Metadata } from "next";
import { t } from "../i18n";
import FaqClient from "./faq-client";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) | AirportTransfers Zürich",
  description:
    "Antworten auf die wichtigsten Fragen zu Flughafentransfers ab Zürich: Buchung, Festpreise, Flugverspätung, Zahlung, Stornierung, Kindersitze und Gepäck.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.de.faqPage.list.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqClient />
    </>
  );
}
