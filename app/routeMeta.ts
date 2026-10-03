// ─────────────────────────────────────────────────────────────
//  ROTA SEO META — 25 sabit rota için başlık + açıklama (DE/EN)
//  Kalıp: DE "Flughafen Zürich nach X Taxi – Privater Transfer" / EN "Zürich Airport to X Private Transfer"
//  EN açıklama başlıkla eşleşir: "Private transfer from Zürich Airport to X …" + rotaya özgü bilgi + CTA.
//  Süre yazılmaz (sayfadaki süreyle çelişmesin) — Winterthur hariç, sayfadakiyle aynı.
//  Fiyat yazılmaz (fiyat sayfada ve şemada var). Açıklama 120–160 karakter.
// ─────────────────────────────────────────────────────────────

export type RouteMeta = { title: string; description: string };

export const routeMeta: Record<string, { de: RouteMeta; en: RouteMeta }> = {
  "zurich-airport-to-zug": {
    de: { title: "Flughafen Zürich nach Zug Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Zug in rund 55 Minuten, von Tür zu Tür. Festpreis, Chauffeur wartet, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Zug Private Transfer", description: "Private transfer from Zürich Airport to Zug, door to door. Your chauffeur meets you in arrivals and tracks your flight. Fixed price per vehicle, book online." },
  },
  "zurich-airport-to-luzern": {
    de: { title: "Flughafen Zürich nach Luzern Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Luzern in rund 75 Minuten. Festpreis, Meet & Greet, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Lucerne Private Transfer", description: "Private transfer from Zürich Airport to Lucerne, straight to your hotel by the lake. Meet & greet, fixed price, free cancellation up to 24 h. Book online." },
  },
  "zurich-airport-to-basel": {
    de: { title: "Flughafen Zürich nach Basel Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Basel in rund 1 h 45, bis vor die Haustür. Festpreis, Namensschild, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Basel Private Transfer", description: "Private transfer from Zürich Airport to Basel, door to door. Name-sign welcome, free child seats and a fixed price per vehicle. Book your ride online." },
  },
  "zurich-airport-to-geneva": {
    de: { title: "Flughafen Zürich nach Genf Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Genf ohne Umsteigen, von Tür zu Tür. Festpreis, bis 7 Personen, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Geneva Private Transfer", description: "Private transfer from Zürich Airport to Geneva without changing trains. Up to 7 passengers, flight tracking, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-bern": {
    de: { title: "Flughafen Zürich nach Bern Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Bern in rund 2 h 20, bis zum Hotel oder Büro. Festpreis, Flugverfolgung inklusive. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Bern Private Transfer", description: "Private transfer from Zürich Airport to Bern, to your hotel or office. Flight tracking, free waiting time and a fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-interlaken": {
    de: { title: "Flughafen Zürich nach Interlaken Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Interlaken in rund 2 h 30. Festpreis, Skitaschen und Kindersitze gratis, Meet & Greet. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Interlaken Private Transfer", description: "Private transfer from Zürich Airport to Interlaken. Ski bags and child seats free, meet & greet in arrivals, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-st-moritz": {
    de: { title: "Flughafen Zürich nach St. Moritz Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach St. Moritz über den Julierpass. Festpreis, Skigepäck gratis, erfahrene Bergfahrer. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to St. Moritz Private Transfer", description: "Private transfer from Zürich Airport to St. Moritz with experienced alpine drivers. Ski luggage free, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-zermatt": {
    de: { title: "Flughafen Zürich nach Zermatt Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Zermatt bis Terminal Täsch. Festpreis, Flugverfolgung, bis 7 Personen. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Zermatt Private Transfer", description: "Private transfer from Zürich Airport to Zermatt via the Täsch terminal. Up to 7 passengers, flight tracked, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-davos": {
    de: { title: "Flughafen Zürich nach Davos Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Davos in rund 3 h 15. Festpreis, Meet & Greet, Winterflotte, früh buchen fürs WEF. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Davos Private Transfer", description: "Private transfer from Zürich Airport to Davos in a winter-ready Mercedes. Meet & greet and a fixed price per vehicle – reserve early for the WEF." },
  },
  "zurich-airport-to-lausanne": {
    de: { title: "Flughafen Zürich nach Lausanne Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Lausanne ohne Umsteigen, von Tür zu Tür. Festpreis, Mercedes E-, V- oder S-Klasse. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Lausanne Private Transfer", description: "Private transfer from Zürich Airport to Lausanne, door to door with no changes. Choose a Mercedes E, V or S-Class at a fixed price. Book online." },
  },
  "zurich-airport-to-montreux": {
    de: { title: "Flughafen Zürich nach Montreux Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Montreux am Genfersee, von Tür zu Tür. Festpreis, Flugverfolgung, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Montreux Private Transfer", description: "Private transfer from Zürich Airport to Montreux on Lake Geneva. Flight tracking, free cancellation up to 24 h, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-lugano": {
    de: { title: "Flughafen Zürich nach Lugano Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Lugano durch den Gotthard, ohne Umsteigen. Festpreis, Namensschild, rund um die Uhr. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Lugano Private Transfer", description: "Private transfer from Zürich Airport to Lugano through the Gotthard, no changes. Chauffeur with name sign, available 24/7, fixed price. Book online." },
  },
  "zurich-airport-to-grindelwald": {
    de: { title: "Flughafen Zürich nach Grindelwald Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Grindelwald in rund 2 h 50, bis zum Hotel. Festpreis, Ski und Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Grindelwald Private Transfer", description: "Private transfer from Zürich Airport to Grindelwald, straight to your hotel. Ski bags and child seats free, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-verbier": {
    de: { title: "Flughafen Zürich nach Verbier Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Verbier mit erfahrenem Bergfahrer. Festpreis, bis 4 Skitaschen gratis, Flug wird verfolgt. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Verbier Private Transfer", description: "Private transfer from Zürich Airport to Verbier, right up to your chalet. Up to 4 ski bags free, flight tracked, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-wengen": {
    de: { title: "Flughafen Zürich nach Wengen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Wengen bis Bahnhof Lauterbrunnen. Festpreis, Skigepäck gratis, Chauffeur wartet. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Wengen Private Transfer", description: "Private transfer from Zürich Airport to Lauterbrunnen station for Wengen. Ski luggage free, your chauffeur waits, fixed price. Book online." },
  },
  "zurich-airport-to-st-gallen": {
    de: { title: "Flughafen Zürich nach St. Gallen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach St. Gallen in rund 1 h 40, von Tür zu Tür. Festpreis, Meet & Greet, MwSt-Rechnung. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to St. Gallen Private Transfer", description: "Private transfer from Zürich Airport to St. Gallen, door to door. Meet & greet, VAT invoices for business travel, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-chur": {
    de: { title: "Flughafen Zürich nach Chur Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Chur Tor nach Arosa, Lenzerheide und Flims. Festpreis, Skitaschen gratis, Winterflotte. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Chur Private Transfer", description: "Private transfer from Zürich Airport to Chur, gateway to Arosa, Lenzerheide and Flims. Ski bags free, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-winterthur": {
    de: { title: "Flughafen Zürich nach Winterthur Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Winterthur in rund 36 Minuten. Festpreis, kein Gepäckzuschlag, Chauffeur wartet. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Winterthur Private Transfer", description: "Private transfer from Zürich Airport to Winterthur in about 36 minutes. No luggage fees, your chauffeur waits, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-locarno": {
    de: { title: "Flughafen Zürich nach Locarno Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Locarno und Ascona am Lago Maggiore. Festpreis, Flugverfolgung, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Locarno Private Transfer", description: "Private transfer from Zürich Airport to Locarno and Ascona on Lake Maggiore. Flight tracking, free cancellation up to 24 h, fixed price. Book online." },
  },
  "zurich-airport-to-thun": {
    de: { title: "Flughafen Zürich nach Thun Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Thun in rund 2 h 50. Festpreis, Meet & Greet, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Thun Private Transfer", description: "Private transfer from Zürich Airport to Thun on Lake Thun. Meet & greet in arrivals, free child seats, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-sion": {
    de: { title: "Flughafen Zürich nach Sion Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Sion Basis für Crans-Montana und Nendaz. Festpreis, bis 7 Personen, Skitaschen gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Sion Private Transfer", description: "Private transfer from Zürich Airport to Sion, base for Crans-Montana and Nendaz. Up to 7 passengers, ski bags free, fixed price. Book online." },
  },
  "zurich-airport-to-bellinzona": {
    de: { title: "Flughafen Zürich nach Bellinzona Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Bellinzona durch den Gotthard, ohne Umsteigen. Festpreis, Namensschild, Flugverfolgung. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Bellinzona Private Transfer", description: "Private transfer from Zürich Airport to Bellinzona through the Gotthard, no changes. Name-sign welcome, flight tracked, fixed price. Book online." },
  },
  "zurich-airport-to-fribourg": {
    de: { title: "Flughafen Zürich nach Freiburg Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Freiburg von Tür zu Tür. Festpreis, Mercedes-Flotte, Storno bis 24 h gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Fribourg Private Transfer", description: "Private transfer from Zürich Airport to Fribourg, door to door in a Mercedes. Free cancellation up to 24 h, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-schaffhausen": {
    de: { title: "Flughafen Zürich nach Schaffhausen Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Schaffhausen in rund 1 Stunde, Rheinfall am Weg. Festpreis, Kindersitze gratis. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Schaffhausen Private Transfer", description: "Private transfer from Zürich Airport to Schaffhausen, with the Rhine Falls nearby. Free child seats, fixed price per vehicle. Book online." },
  },
  "zurich-airport-to-engelberg": {
    de: { title: "Flughafen Zürich nach Engelberg Taxi – Privater Transfer", description: "Taxi vom Flughafen Zürich nach Engelberg in unter 2 Stunden, bis zum Hotel. Festpreis, Skitaschen gratis, Winterflotte. Privater Transfer, online buchen." },
    en: { title: "Zürich Airport to Engelberg Private Transfer", description: "Private transfer from Zürich Airport to Engelberg, straight to your hotel. Ski bags free, winter-ready fleet, fixed price per vehicle. Book online." },
  },
};
