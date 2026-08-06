import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import EventsClient from "./events-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === "de";
  return {
    title: de
      ? "Events in der Schweiz | Ihr privater Transfer"
      : "Events in Switzerland | Your private transfer",
    description: de
      ? "Chauffeurservice zu Messen, Festivals und Panoramafahrten in der ganzen Schweiz – vom WEF Davos bis zum Montreux Jazz Festival."
      : "Chauffeur service to fairs, festivals and panoramic journeys across Switzerland – from WEF Davos to the Montreux Jazz Festival.",
    alternates: {
      canonical: `/${lang}${localizePath("/events", lang as never) === "/" ? "" : localizePath("/events", lang as never)}`,
      languages: langAlternates("/events"),
    },
  };
}

export default function Page() {
  return <EventsClient />;
}
