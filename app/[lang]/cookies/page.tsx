import type { Metadata } from "next";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de ? "Cookie-Richtlinie | AirportTransfers Zürich" : "Cookie Policy | AirportTransfers Zurich",
    description: de ? "Cookie-Richtlinie: Welche Cookies diese Website verwendet und wofür." : "Cookie policy: which cookies this website uses and why.",
    alternates: {
      canonical: de ? "/de/cookie-richtlinie" : "/en/cookie-policy",
      languages: { en: "/en/cookie-policy", de: "/de/cookie-richtlinie", "x-default": "/en/cookie-policy" },
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="cookies" />;
}
