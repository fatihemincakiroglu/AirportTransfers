import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Cookie-Richtlinie | AirportTransfers Zürich" : "Cookie Policy | AirportTransfers Zurich",
    description: de ? "Cookie-Richtlinie: Welche Cookies diese Website verwendet und wofür." : "Cookie policy: which cookies this website uses and why.",
    alternates: {
      canonical: `/${lang}${localizePath("/cookies", lang as never) === "/" ? "" : localizePath("/cookies", lang as never)}`,
      languages: langAlternates("/cookies"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="cookies" />;
}
