import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import PreiseClient from "./preise-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de
      ? "Preise | Transparente Festpreise für Flughafentransfers"
      : "Prices | Transparent fixed prices for airport transfers",
    description: de
      ? "Alle Festpreise ab Flughafen Zürich (ZRH): pro Fahrzeug, inkl. 60 Min. Wartezeit, Meet & Greet und Flugverfolgung. Keine versteckten Kosten."
      : "All fixed prices from Zurich Airport (ZRH): per vehicle, incl. 60 min. waiting time, meet & greet and flight tracking. No hidden costs.",
    alternates: {
      canonical: `/${lang}${localizePath("/preise", lang as never) === "/" ? "" : localizePath("/preise", lang as never)}`,
      languages: langAlternates("/preise"),
    },
  };
}

export default function Page() {
  return <PreiseClient />;
}
