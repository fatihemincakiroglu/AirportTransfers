import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import StaedteClient from "./staedte-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de
      ? "Reiseziele | Flughafentransfer in der ganzen Schweiz"
      : "Destinations | Airport transfers across Switzerland",
    description: de
      ? "Privater Flughafentransfer ab Flughafen Zürich (ZRH) in jede Stadt und jedes Bergdorf der Schweiz. Wählen Sie Ihre Destination."
      : "Private airport transfer from Zurich Airport (ZRH) to every city and mountain village in Switzerland. Pick your destination.",
    alternates: {
      canonical: `/${lang}${localizePath("/staedte", lang as never) === "/" ? "" : localizePath("/staedte", lang as never)}`,
      languages: langAlternates("/staedte"),
    },
  };
}

export default function Page() {
  return <StaedteClient />;
}
