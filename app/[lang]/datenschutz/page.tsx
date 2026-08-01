import type { Metadata } from "next";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Datenschutzerklärung | AirportTransfers Zürich" : "Privacy Policy | AirportTransfers Zurich",
    description: de ? "Datenschutzerklärung von AirportTransfers Zürich: Wie wir Ihre Daten bei der Transferbuchung erheben, nutzen und schützen." : "AirportTransfers Zurich privacy policy: how we collect, use and protect your data when booking a transfer.",
    alternates: {
      canonical: de ? "/de/datenschutz" : "/en/privacy-policy",
      languages: { en: "/en/privacy-policy", de: "/de/datenschutz", "x-default": "/en/privacy-policy" },
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="datenschutz" />;
}
