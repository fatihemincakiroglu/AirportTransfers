import type { Metadata } from "next";
import Buchung from "./buchung-client";

export const metadata: Metadata = {
  title: "Online buchen: Transfer ab Flughafen Zürich | AirportTransfers",
  description: "Buchen Sie Ihren Flughafentransfer ab Zürich in 3 Schritten: Strecke wählen, Fahrzeug wählen, bestätigen – Festpreis, Bestätigung innert 15 Minuten.",
  alternates: { canonical: "/buchung" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Service\", \"serviceType\": \"Airport transfer booking\", \"name\": \"Online-Buchung – Flughafentransfer Zürich\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\", \"url\": \"/\", \"logo\": \"/icon.png\", \"image\": \"/hero/hero-2.jpg\", \"telephone\": \"+41763020326\", \"priceRange\": \"CHF 88 - CHF 1000\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Industristrasse 14\", \"postalCode\": \"8302\", \"addressLocality\": \"Kloten\", \"addressRegion\": \"ZH\", \"addressCountry\": \"CH\"}, \"areaServed\": {\"@type\": \"Country\", \"name\": \"Switzerland\"}, \"openingHoursSpecification\": {\"@type\": \"OpeningHoursSpecification\", \"dayOfWeek\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"], \"opens\": \"00:00\", \"closes\": \"23:59\"}}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"Startseite\", \"item\": \"/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"Buchung\", \"item\": \"/buchung\"}]}" }} />
      <Buchung />
    </>
  );
}
