// ─────────────────────────────────────────────────────────────
//  ROTA SEO META — 25 sabit rota için başlık + açıklama (DE/EN)
//  Kalıp: "Flughafen Zürich nach X Taxi – Privater Transfer" / "Zurich Airport to X Taxi – Private Transfer"
//  Fiyat yazılmaz (fiyat sayfada ve şemada var). Açıklama ~140–155 karakter.
// ─────────────────────────────────────────────────────────────

export type RouteMeta = { title: string; description: string };

export const routeMeta: Record<string, { de: RouteMeta; en: RouteMeta }> = {
  "zurich-airport-to-zug": {
    de: { title: "Flughafen Zürich nach Zug Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Zug in rund 55 Minuten, von Tür zu Tür. Festpreis, Chauffeur wartet, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Zug Taxi – Private Transfer", description: "Taxi from Zurich Airport to Zug in about 55 minutes, door to door. Fixed price, chauffeur in arrivals, flight tracked. Private transfer, book online." },
  },
  "zurich-airport-to-luzern": {
    de: { title: "Flughafen Zürich nach Luzern Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Luzern in rund 75 Minuten. Festpreis, Meet & Greet, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Lucerne Taxi – Private Transfer", description: "Taxi from Zurich Airport to Lucerne in about 75 minutes. Fixed price, meet & greet, free cancellation up to 24 h. Private transfer, book online." },
  },
  "zurich-airport-to-basel": {
    de: { title: "Flughafen Zürich nach Basel Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Basel in rund 1 h 45, bis vor die Haustür. Festpreis, Namensschild, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Basel Taxi – Private Transfer", description: "Taxi from Zurich Airport to Basel in about 1 h 45, straight to your door. Fixed price, name sign, child seats free. Private transfer, book online." },
  },
  "zurich-airport-to-geneva": {
    de: { title: "Flughafen Zürich nach Genf Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Genf ohne Umsteigen, von Tür zu Tür. Festpreis, bis 7 Personen, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Geneva Taxi – Private Transfer", description: "Taxi from Zurich Airport to Geneva door to door without changes. Fixed price, up to 7 passengers, flight tracked. Private transfer, book online." },
  },
  "zurich-airport-to-bern": {
    de: { title: "Flughafen Zürich nach Bern Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Bern in rund 2 h 20, bis zum Hotel oder Büro. Festpreis, Flugverfolgung inklusive. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Bern Taxi – Private Transfer", description: "Taxi from Zurich Airport to Bern in about 2 h 20, to your hotel or office. Fixed price, flight tracking, free waiting time. Private transfer, book online." },
  },
  "zurich-airport-to-interlaken": {
    de: { title: "Flughafen Zürich nach Interlaken Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Interlaken in rund 2 h 30. Festpreis, Skitaschen und Kindersitze gratis, Meet & Greet. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Interlaken Taxi – Private Transfer", description: "Taxi from Zurich Airport to Interlaken in about 2 h 30. Fixed price, ski bags and child seats free, meet & greet. Private transfer, book online." },
  },
  "zurich-airport-to-st-moritz": {
    de: { title: "Flughafen Zürich nach St. Moritz Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach St. Moritz über den Julierpass. Festpreis, Skigepäck gratis, erfahrene Bergfahrer. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to St. Moritz Taxi – Private Transfer", description: "Taxi from Zurich Airport to St. Moritz over the Julier Pass. Fixed price, ski luggage free, experienced alpine drivers. Private transfer, book online." },
  },
  "zurich-airport-to-zermatt": {
    de: { title: "Flughafen Zürich nach Zermatt Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Zermatt bis Terminal Täsch. Festpreis, Flugverfolgung, bis 7 Personen. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Zermatt Taxi – Private Transfer", description: "Taxi from Zurich Airport to Zermatt (Täsch terminal). Fixed price, flight tracked, up to 7 passengers. Private transfer, book online." },
  },
  "zurich-airport-to-davos": {
    de: { title: "Flughafen Zürich nach Davos Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Davos in rund 3 h 15. Festpreis, Meet & Greet, Winterflotte, früh buchen fürs WEF. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Davos Taxi – Private Transfer", description: "Taxi from Zurich Airport to Davos in about 3 h 15. Fixed price, meet & greet, winter-ready fleet, book early for WEF. Private transfer, book online." },
  },
  "zurich-airport-to-lausanne": {
    de: { title: "Flughafen Zürich nach Lausanne Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Lausanne ohne Umsteigen, von Tür zu Tür. Festpreis, Mercedes E-, V- oder S-Klasse. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Lausanne Taxi – Private Transfer", description: "Taxi from Zurich Airport to Lausanne door to door with no changes. Fixed price, Mercedes E, V or S-Class. Private transfer, book online." },
  },
  "zurich-airport-to-montreux": {
    de: { title: "Flughafen Zürich nach Montreux Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Montreux am Genfersee, von Tür zu Tür. Festpreis, Flugverfolgung, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Montreux Taxi – Private Transfer", description: "Taxi from Zurich Airport to Montreux on Lake Geneva, door to door. Fixed price, flight tracking, free cancellation 24 h. Private transfer, book online." },
  },
  "zurich-airport-to-lugano": {
    de: { title: "Flughafen Zürich nach Lugano Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Lugano durch den Gotthard, ohne Umsteigen. Festpreis, Namensschild, rund um die Uhr. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Lugano Taxi – Private Transfer", description: "Taxi from Zurich Airport to Lugano through the Gotthard, no changes. Fixed price, chauffeur with name sign, available 24/7. Private transfer, book online." },
  },
  "zurich-airport-to-grindelwald": {
    de: { title: "Flughafen Zürich nach Grindelwald Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Grindelwald in rund 2 h 50, bis zum Hotel. Festpreis, Ski und Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Grindelwald Taxi – Private Transfer", description: "Taxi from Zurich Airport to Grindelwald in about 2 h 50, straight to your hotel. Fixed price, ski bags and child seats free. Private transfer, book online." },
  },
  "zurich-airport-to-verbier": {
    de: { title: "Flughafen Zürich nach Verbier Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Verbier mit erfahrenem Bergfahrer. Festpreis, bis 4 Skitaschen gratis, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Verbier Taxi – Private Transfer", description: "Taxi from Zurich Airport to Verbier with an experienced alpine driver. Fixed price, up to 4 ski bags free, flight tracked. Private transfer, book online." },
  },
  "zurich-airport-to-wengen": {
    de: { title: "Flughafen Zürich nach Wengen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Wengen bis Bahnhof Lauterbrunnen. Festpreis, Skigepäck gratis, Chauffeur wartet. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Wengen Taxi – Private Transfer", description: "Taxi from Zurich Airport to Wengen via Lauterbrunnen station. Fixed price, ski luggage free, chauffeur waits. Private transfer, book online." },
  },
  "zurich-airport-to-st-gallen": {
    de: { title: "Flughafen Zürich nach St. Gallen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach St. Gallen in rund 1 h 40, von Tür zu Tür. Festpreis, Meet & Greet, MwSt-Rechnung. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to St. Gallen Taxi – Private Transfer", description: "Taxi from Zurich Airport to St. Gallen in about 1 h 40, door to door. Fixed price, meet & greet, VAT invoices for business. Private transfer, book online." },
  },
  "zurich-airport-to-chur": {
    de: { title: "Flughafen Zürich nach Chur Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Chur Tor nach Arosa, Lenzerheide und Flims. Festpreis, Skitaschen gratis, Winterflotte. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Chur Taxi – Private Transfer", description: "Taxi from Zurich Airport to Chur gateway to Arosa, Lenzerheide and Flims. Fixed price, ski bags free, winter-ready fleet. Private transfer, book online." },
  },
  "zurich-airport-to-winterthur": {
    de: { title: "Flughafen Zürich nach Winterthur Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Winterthur in rund 36 Minuten. Festpreis, kein Nacht- oder Gepäckzuschlag. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Winterthur Taxi – Private Transfer", description: "Taxi from Zurich Airport to Winterthur in about 36 minutes. Fixed price, no night or luggage fees, chauffeur waits. Private transfer, book online." },
  },
  "zurich-airport-to-locarno": {
    de: { title: "Flughafen Zürich nach Locarno Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Locarno und Ascona am Lago Maggiore. Festpreis, Flugverfolgung, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Locarno Taxi – Private Transfer", description: "Taxi from Zurich Airport to Locarno and Ascona on Lake Maggiore. Fixed price, flight tracking, free cancellation up to 24 h. Private transfer, book online." },
  },
  "zurich-airport-to-thun": {
    de: { title: "Flughafen Zürich nach Thun Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Thun in rund 2 h 50. Festpreis, Meet & Greet, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Thun Taxi – Private Transfer", description: "Taxi from Zurich Airport to Thun in about 2 h 50. Fixed price, meet & greet, child seats free. Private transfer, book online." },
  },
  "zurich-airport-to-sion": {
    de: { title: "Flughafen Zürich nach Sion Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Sion Basis für Crans-Montana und Nendaz. Festpreis, bis 7 Personen, Skitaschen gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Sion Taxi – Private Transfer", description: "Taxi from Zurich Airport to Sion base for Crans-Montana and Nendaz. Fixed price, up to 7 passengers, ski bags free. Private transfer, book online." },
  },
  "zurich-airport-to-bellinzona": {
    de: { title: "Flughafen Zürich nach Bellinzona Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Bellinzona durch den Gotthard, ohne Umsteigen. Festpreis, Namensschild, Flugverfolgung. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Bellinzona Taxi – Private Transfer", description: "Taxi from Zurich Airport to Bellinzona through the Gotthard, no changes. Fixed price, name sign, flight tracked. Private transfer, book online." },
  },
  "zurich-airport-to-fribourg": {
    de: { title: "Flughafen Zürich nach Freiburg Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Freiburg von Tür zu Tür. Festpreis, Mercedes-Flotte, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Fribourg Taxi – Private Transfer", description: "Taxi from Zurich Airport to Fribourg door to door. Fixed price, Mercedes fleet, free cancellation up to 24 h. Private transfer, book online." },
  },
  "zurich-airport-to-schaffhausen": {
    de: { title: "Flughafen Zürich nach Schaffhausen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Schaffhausen in rund 1 Stunde, Rheinfall am Weg. Festpreis, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Schaffhausen Taxi – Private Transfer", description: "Taxi from Zurich Airport to Schaffhausen in about 1 hour, Rhine Falls on the way. Fixed price, child seats free. Private transfer, book online." },
  },
  "zurich-airport-to-engelberg": {
    de: { title: "Flughafen Zürich nach Engelberg Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Engelberg in unter 2 Stunden, bis zum Hotel. Festpreis, Skitaschen gratis, Winterflotte. Privater Transfer, online buchen." },
    en: { title: "Zurich Airport to Engelberg Taxi – Private Transfer", description: "Taxi from Zurich Airport to Engelberg in under 2 hours, to your hotel. Fixed price, ski bags free, winter-ready fleet. Private transfer, book online." },
  },
};
