import type { Metadata } from "next";
import Buchung from "./buchung-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Online buchen: Transfer ab Flughafen Zürich | AirportTransfers", description: "Buchen Sie Ihren Flughafentransfer in 3 Schritten: Strecke, Fahrzeug, bestätigen – Festpreis, Bestätigung innert 15 Minuten." },
  en: { title: "Book Online: Zurich Airport Transfer | AirportTransfers", description: "Book your airport transfer in 3 steps: route, vehicle, confirm – fixed price, confirmation within 15 minutes." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}/buchung`,
      languages: { en: "/en/buchung", de: "/de/buchung", "x-default": "/en/buchung" },
    },
  };
}

export default function Page() {
  const jsonLd: object[] = [];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Buchung />
    </>
  );
}
