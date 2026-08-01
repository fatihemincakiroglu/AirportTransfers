import type { Metadata } from "next";
import Fahrzeuge from "./fahrzeuge-client";

export const metadata: Metadata = {
  title: "Unsere Flotte: Mercedes Business, Premium & VIP | AirportTransfers Zürich",
  description: "Gepflegte Mercedes-Benz Flotte für Flughafentransfers ab Zürich: E-Class, S-Class, V-Class und V300 Maybach – mit WLAN, Wasser und Kindersitzen auf Wunsch.",
  alternates: { canonical: "/fahrzeuge" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"ItemList\", \"name\": \"Fahrzeugflotte AirportTransfers Zürich\", \"numberOfItems\": 4, \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"item\": {\"@type\": \"Service\", \"name\": \"Business Class – Mercedes-Benz E-Class\", \"description\": \"Chauffeurservice mit Mercedes-Benz E-Class, bis 2 Passagiere.\"}}, {\"@type\": \"ListItem\", \"position\": 2, \"item\": {\"@type\": \"Service\", \"name\": \"Business & Family Class – Mercedes-Benz V-Class\", \"description\": \"Chauffeurservice mit Mercedes-Benz V-Class, bis 7 Passagiere.\"}}, {\"@type\": \"ListItem\", \"position\": 3, \"item\": {\"@type\": \"Service\", \"name\": \"Premium Class – Mercedes-Benz S-Class\", \"description\": \"Chauffeurservice mit Mercedes-Benz S-Class, bis 3 Passagiere.\"}}, {\"@type\": \"ListItem\", \"position\": 4, \"item\": {\"@type\": \"Service\", \"name\": \"VIP Ultra Comfort – Mercedes-Benz V300 Maybach\", \"description\": \"Chauffeurservice mit Mercedes-Benz V300 Maybach, bis 5 Passagiere.\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"Startseite\", \"item\": \"/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"Fahrzeuge\", \"item\": \"/fahrzeuge\"}]}" }} />
      <Fahrzeuge />
    </>
  );
}
