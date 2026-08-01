import type { Metadata } from "next";
import Home from "./home-client";

export const metadata: Metadata = {
  title: "AirportTransfers Zürich | Flughafentransfer ZRH · VIP Mercedes zum Festpreis",
  description: "Privater Flughafentransfer Zürich zum Festpreis: Mercedes-Flotte, Meet & Greet, Flugverfolgung, 24/7. Private Zurich Airport transfers at fixed prices.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\", \"url\": \"/\", \"logo\": \"/icon.png\", \"image\": \"/hero/hero-2.jpg\", \"telephone\": \"+41763020326\", \"priceRange\": \"CHF 88 - CHF 1000\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Industristrasse 14\", \"postalCode\": \"8302\", \"addressLocality\": \"Kloten\", \"addressRegion\": \"ZH\", \"addressCountry\": \"CH\"}, \"areaServed\": {\"@type\": \"Country\", \"name\": \"Switzerland\"}, \"openingHoursSpecification\": {\"@type\": \"OpeningHoursSpecification\", \"dayOfWeek\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"], \"opens\": \"00:00\", \"closes\": \"23:59\"}}" }} />
      <Home />
    </>
  );
}
