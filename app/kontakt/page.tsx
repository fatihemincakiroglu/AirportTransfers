import type { Metadata } from "next";
import Kontakt from "./kontakt-client";

export const metadata: Metadata = {
  title: "Kontakt – 24/7 erreichbar | AirportTransfers Zürich",
  description: "Kontaktieren Sie AirportTransfers Zürich: per WhatsApp, Telefon +41 76 302 03 26 oder E-Mail. Rund um die Uhr erreichbar, Antwort in der Regel innert 15 Minuten.",
  alternates: { canonical: "/kontakt" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"ContactPage\", \"name\": \"Kontakt – AirportTransfers Zürich\", \"about\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\", \"url\": \"/\", \"logo\": \"/icon.png\", \"image\": \"/hero/hero-2.jpg\", \"telephone\": \"+41763020326\", \"priceRange\": \"CHF 88 - CHF 1000\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Industristrasse 14\", \"postalCode\": \"8302\", \"addressLocality\": \"Kloten\", \"addressRegion\": \"ZH\", \"addressCountry\": \"CH\"}, \"areaServed\": {\"@type\": \"Country\", \"name\": \"Switzerland\"}, \"openingHoursSpecification\": {\"@type\": \"OpeningHoursSpecification\", \"dayOfWeek\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"], \"opens\": \"00:00\", \"closes\": \"23:59\"}}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"Startseite\", \"item\": \"/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"Kontakt\", \"item\": \"/kontakt\"}]}" }} />
      <Kontakt />
    </>
  );
}
