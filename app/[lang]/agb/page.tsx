import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Allgemeine Geschäftsbedingungen (AGB) | AirportTransfers Zürich" : "Terms and Conditions | AirportTransfers Zurich",
    description: de ? "AGB für Buchung und Durchführung von Flughafentransfers der AirportTransfers Zürich." : "Terms and conditions for booking and providing airport transfers by AirportTransfers Zurich.",
    alternates: {
      canonical: `/${lang}${localizePath("/agb", lang as never) === "/" ? "" : localizePath("/agb", lang as never)}`,
      languages: langAlternates("/agb"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="agb" />;
}
