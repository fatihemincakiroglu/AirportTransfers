import type { Metadata } from "next";
import Galerie from "./galerie-client";

export const metadata: Metadata = {
  title: "Galerie | AirportTransfers Zürich",
  description: "Eindrücke aus der Schweiz und von unseren Fahrten: Zürich, Luzern, Zermatt, die Jungfrau-Region und mehr.",
  alternates: { canonical: "/galerie" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"ImageGallery\", \"name\": \"Galerie – AirportTransfers Zürich\", \"image\": [\"/gallery/1.jpg\", \"/gallery/2.jpg\", \"/gallery/3.jpg\", \"/gallery/4.jpg\", \"/gallery/5.jpg\", \"/gallery/6.jpg\", \"/gallery/7.jpg\", \"/gallery/8.jpg\", \"/gallery/9.jpg\", \"/gallery/10.jpg\", \"/gallery/11.jpg\", \"/gallery/12.jpg\", \"/gallery/13.jpg\", \"/gallery/14.jpg\", \"/gallery/15.jpg\", \"/gallery/16.jpg\", \"/gallery/17.jpg\", \"/gallery/18.jpg\", \"/gallery/19.jpg\", \"/gallery/20.jpg\"]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"Startseite\", \"item\": \"/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"Galerie\", \"item\": \"/galerie\"}]}" }} />
      <Galerie />
    </>
  );
}
