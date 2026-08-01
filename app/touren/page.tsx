import type { Metadata } from "next";
import Touren from "./touren-client";

export const metadata: Metadata = {
  title: "Private Touren & Tagesausflüge ab Zürich | AirportTransfers",
  description: "Private Tagesausflüge mit Chauffeur ab Zürich: Rheinfall, Luzern, Titlis, Interlaken & Grindelwald, Bern – Abholung an Ihrer Adresse, Preis auf Anfrage.",
  alternates: { canonical: "/touren" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"ItemList\", \"name\": \"Private Touren ab Zürich\", \"numberOfItems\": 6, \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Rheinfall Schaffhausen\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}, {\"@type\": \"ListItem\", \"position\": 2, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Luzern & Vierwaldstättersee\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}, {\"@type\": \"ListItem\", \"position\": 3, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Titlis & Engelberg\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}, {\"@type\": \"ListItem\", \"position\": 4, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Zürich Stadtrundfahrt\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}, {\"@type\": \"ListItem\", \"position\": 5, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Interlaken & Grindelwald\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}, {\"@type\": \"ListItem\", \"position\": 6, \"item\": {\"@type\": \"TouristTrip\", \"name\": \"Bern & Emmental\", \"provider\": {\"@type\": \"TaxiService\", \"name\": \"AirportTransfers Zürich\"}}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"Startseite\", \"item\": \"/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"Touren\", \"item\": \"/touren\"}]}" }} />
      <Touren />
    </>
  );
}
