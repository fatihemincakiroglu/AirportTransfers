import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Rückerstattungsrichtlinie | AirportTransfers Zürich" : "Refund Policy | AirportTransfers Zurich",
    description: de ? "Stornierungs- und Rückerstattungsbedingungen für Transferbuchungen." : "Cancellation and refund terms for transfer bookings.",
    alternates: {
      canonical: `/${lang}${localizePath("/rueckerstattung", lang as never) === "/" ? "" : localizePath("/rueckerstattung", lang as never)}`,
      languages: langAlternates("/rueckerstattung"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="rueckerstattung" />;
}
