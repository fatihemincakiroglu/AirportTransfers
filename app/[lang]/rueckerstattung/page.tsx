import type { Metadata } from "next";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Rückerstattungsrichtlinie | AirportTransfers Zürich" : "Refund Policy | AirportTransfers Zurich",
    description: de ? "Stornierungs- und Rückerstattungsbedingungen für Transferbuchungen." : "Cancellation and refund terms for transfer bookings.",
    alternates: {
      canonical: de ? "/de/rueckerstattung" : "/en/refund-policy",
      languages: { en: "/en/refund-policy", de: "/de/rueckerstattung", "x-default": "/en/refund-policy" },
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="rueckerstattung" />;
}
