import type { Metadata } from "next";
import Fahrzeuge from "./fahrzeuge-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Unsere Flotte: Mercedes Business, Premium & VIP | AirportTransfers Zürich", description: "Gepflegte Mercedes-Benz Flotte: E-Class, S-Class, V-Class und V300 Maybach – mit WLAN, Wasser und Kindersitzen." },
  en: { title: "Our Fleet: Mercedes Business, Premium & VIP | AirportTransfers Zurich", description: "Well-kept Mercedes-Benz fleet: E-Class, S-Class, V-Class and V300 Maybach – with WiFi, water and child seats." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}/fahrzeuge`,
      languages: { en: "/en/fahrzeuge", de: "/de/fahrzeuge", "x-default": "/en/fahrzeuge" },
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
      <Fahrzeuge />
    </>
  );
}
