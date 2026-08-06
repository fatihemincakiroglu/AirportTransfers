import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Datenschutzerklärung | AirportTransfers Zürich" : "Privacy Policy | AirportTransfers Zurich",
    description: de ? "Datenschutzerklärung von AirportTransfers Zürich: Wie wir Ihre Daten bei der Transferbuchung erheben, nutzen und schützen." : "AirportTransfers Zurich privacy policy: how we collect, use and protect your data when booking a transfer.",
    alternates: {
      canonical: `/${lang}${localizePath("/datenschutz", lang as never) === "/" ? "" : localizePath("/datenschutz", lang as never)}`,
      languages: langAlternates("/datenschutz"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="datenschutz" />;
}
