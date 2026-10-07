// ─────────────────────────────────────────────────────────────
//  LÜKS OTEL TRANSFER SAYFALARI — /de/hoteltransfer/<slug> · /en/hotel-transfers/<slug>
//
//  Her otel için elle yazılmış DE/EN metin. Fiyat sayfada CANLI hesaplanır (price-calc.tsx):
//    • routeKey varsa otel o sabit rotanın şehrinde → fiyat = sabit rota fiyatı (rezervasyonla aynı)
//    • yoksa adres + koordinat ile yol mesafesi → km tarifesi (rezervasyonla aynı zincir)
//  km/min yalnızca routeKey OLMAYAN oteller için "ca." bilgisidir.
//
//  Bağımsız transfer hizmetiyiz; sayfalarda otelle ortaklık ima edilmez (bkz. disclaimer).
//  Yeni otel eklerken: adres, koordinat ve gerçekleri kontrol et; sitemap otomatik güncellenir.
//  DİKKAT: adres metni başka bir sabit rota adını içermemeli (ör. "Lake Lucerne" → Luzern fiyatı!).
//  resolveTrip adres içinde rota adını arar; routeKey yalnızca gerçekten o şehirdeki otellere verilir.
// ─────────────────────────────────────────────────────────────

export type HotelRegion = "zurich" | "lucerne" | "graubuenden" | "oberland" | "alps" | "cities";

type L10n = { de: string; en: string };

export const hotelRegions: { key: HotelRegion; label: L10n }[] = [
  { key: "zurich", label: { de: "Zürich", en: "Zurich" } },
  { key: "lucerne", label: { de: "Luzern & Vierwaldstättersee", en: "Lucerne & Lake Lucerne" } },
  { key: "graubuenden", label: { de: "Graubünden: St. Moritz & Davos", en: "Graubünden: St. Moritz & Davos" } },
  { key: "oberland", label: { de: "Berner Oberland & Gstaad", en: "Bernese Oberland & Gstaad" } },
  { key: "alps", label: { de: "Zermatt & Andermatt", en: "Zermatt & Andermatt" } },
  { key: "cities", label: { de: "Basel & Bern", en: "Basel & Bern" } },
];

export type HotelLang = {
  /** Kart ve hero'da kısa tanıtım (1 cümle) */
  teaser: string;
  intro: string[];
  /** Varış: yol, son kilometreler, otel önünde iniş */
  arrival: string[];
  tips: string[];
  faq: [string, string][];
};

export type Hotel = {
  slug: string;
  name: string;
  place: string;
  region: HotelRegion;
  /** Rezervasyona giden varış metni (görünen adres) */
  address: string;
  lat: number;
  lon: number;
  /** Otel bu sabit rotanın şehrindeyse (fiyat = rota fiyatı) */
  routeKey?: string;
  /** Sabit rota yoksa: yaklaşık yol km ve dakika (yalnızca bilgi) */
  km?: number;
  min?: number;
  img: string;
  /** İlgili blog rehberleri (slug) */
  guides: string[];
  de: HotelLang;
  en: HotelLang;
};

const R = (city: string) => `zurich-airport-to-${city}`;

export const hotels: Hotel[] = [
  // ══════════════════════ ZÜRICH ══════════════════════
  {
    slug: "baur-au-lac",
    name: "Baur au Lac",
    place: "Zürich",
    region: "zurich",
    address: "Baur au Lac, Talstrasse 1, 8001 Zürich",
    lat: 47.3667, lon: 8.5393,
    km: 12, min: 22,
    img: "/gallery/2.jpg",
    guides: ["ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich", "24-stunden-in-zuerich", "business-travel-zuerich-tipps"],
    de: {
      teaser: "Das traditionsreiche Grandhotel zwischen Bahnhofstrasse, Park und Zürichsee – seit 1844 in Familienbesitz.",
      intro: [
        "Das Baur au Lac liegt dort, wo die Bahnhofstrasse auf den Zürichsee trifft: eingebettet in einen eigenen Park, begrenzt vom Schanzengraben und mit Blick auf See und Alpen. Seit 1844 führt dieselbe Familie das Haus, und genau diese Mischung aus Diskretion und Gelassenheit erwarten Gäste auch von der Anreise.",
        "Vom Flughafen Zürich sind es rund 12 Kilometer. Ihr Chauffeur empfängt Sie in der Ankunftshalle, übernimmt das Gepäck und bringt Sie im Mercedes direkt in die Vorfahrt an der Talstrasse – ohne Taxischlange, ohne Taxameter und mit einem Festpreis, den Sie schon vor dem Abflug kennen.",
      ],
      arrival: [
        "Je nach Tageszeit dauert die Fahrt 15 bis 30 Minuten; in den Stosszeiten am Morgen und am späten Nachmittag wählt der Fahrer die Route, die gerade am besten fliesst. Die Einfahrt liegt an der Talstrasse 1, der Portier nimmt Sie und Ihr Gepäck dort in Empfang.",
        "Für den Rückweg holen wir Sie zur vereinbarten Zeit am Hoteleingang ab. Für Flüge innerhalb Europas empfehlen wir die Abholung rund zweieinhalb Stunden vor Abflug, für Langstrecken drei Stunden.",
      ],
      tips: [
        "Bahnhofstrasse, Paradeplatz und die Altstadt erreichen Sie vom Hotel bequem zu Fuss – für einen Stadttag brauchen Sie kein Auto.",
        "Geschäftsreisende buchen gern einen Stundentransfer: Der Fahrer wartet zwischen den Terminen, die Rechnung mit MwSt. kommt per E-Mail.",
        "Landen Sie spät am Abend, ist der private Transfer oft die angenehmste Lösung – Ihr Fahrer verfolgt den Flug und wartet auch bei Verspätung.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zum Baur au Lac?", "In der Regel 15 bis 30 Minuten für rund 12 Kilometer, je nach Verkehr. Am Wochenende und spät abends geht es meist schneller."],
        ["Kann der Fahrer direkt vor dem Hotel halten?", "Ja. Wir fahren in die Vorfahrt an der Talstrasse 1; dort übernimmt der Portier das Gepäck."],
      ],
    },
    en: {
      teaser: "The storied grand hotel between Bahnhofstrasse, its private park and Lake Zurich – owned by the same family since 1844.",
      intro: [
        "Baur au Lac sits exactly where Bahnhofstrasse meets Lake Zurich: set in its own park, bordered by the Schanzengraben canal and looking out over the lake towards the Alps. The same family has run the hotel since 1844, and guests expect the same blend of discretion and calm from their arrival.",
        "The hotel is about 12 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall, takes care of the luggage and drives you in a Mercedes straight to the forecourt on Talstrasse – no taxi queue, no meter, and a fixed price you know before you take off.",
      ],
      arrival: [
        "Depending on the time of day the drive takes 15 to 30 minutes; during the morning and late-afternoon rush your driver picks whichever route is flowing best. The entrance is at Talstrasse 1, where the doorman will welcome you and take your bags.",
        "For the way back we collect you at the hotel entrance at the agreed time. For flights within Europe we recommend a pick-up about two and a half hours before departure, for long-haul three hours.",
      ],
      tips: [
        "Bahnhofstrasse, Paradeplatz and the Old Town are an easy walk from the hotel – you won't need a car for a day in the city.",
        "Business travellers often book an hourly chauffeur: the driver waits between meetings and the VAT invoice arrives by email.",
        "If you land late in the evening, a private transfer is usually the most relaxed option – your driver tracks the flight and waits even if you are delayed.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to Baur au Lac?", "Usually 15 to 30 minutes for about 12 kilometres, depending on traffic. At weekends and late in the evening it is generally quicker."],
        ["Can the driver stop right outside the hotel?", "Yes. We pull into the forecourt at Talstrasse 1, where the doorman takes over your luggage."],
      ],
    },
  },
  {
    slug: "the-dolder-grand",
    name: "The Dolder Grand",
    place: "Zürich",
    region: "zurich",
    address: "The Dolder Grand, Kurhausstrasse 65, 8032 Zürich",
    lat: 47.3727, lon: 8.5741,
    km: 11, min: 20,
    img: "/gallery/1.jpg",
    guides: ["ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich", "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse", "24-stunden-in-zuerich"],
    de: {
      teaser: "Das Märchenschloss am Waldrand über Zürich, 1899 eröffnet und von Foster + Partners neu interpretiert.",
      intro: [
        "Hoch über der Stadt, am Waldrand des Adlisbergs, thront The Dolder Grand mit seinen Türmchen aus dem Jahr 1899 – ergänzt um die geschwungenen Flügel, mit denen Foster + Partners das Haus 2008 in die Gegenwart geholt haben. Von der Terrasse reicht der Blick über Zürich, den See und bei klarem Wetter bis zu den Alpen.",
        "Weil das Hotel nicht im Zentrum, sondern am Hang liegt, ist der Weg vom Flughafen kürzer, als viele denken: rund 11 Kilometer. Ihr Chauffeur holt Sie in der Ankunftshalle ab und fährt Sie direkt bis vor den Haupteingang – zum Festpreis pro Fahrzeug, inklusive Gepäck.",
      ],
      arrival: [
        "Die Fahrt dauert meist rund 20 Minuten. Je nach Verkehrslage führt sie über Dübendorf und den Wald hinauf oder durch die Stadt; der Fahrer entscheidet nach aktueller Lage. Zum Schluss geht es die Kurhausstrasse hinauf bis in die Vorfahrt des Hotels.",
        "Wer zwischendurch in die Stadt möchte, kann die Dolderbahn nehmen – die kleine Zahnradbahn verbindet den Römerhof mit dem Hotelgelände. Für Termine mit Gepäck oder abends ist ein Transfer bequemer.",
      ],
      tips: [
        "Reisen Sie mit Golfbag oder viel Gepäck, wählen Sie die V-Klasse – sie fasst bis zu sieben Koffer.",
        "Für ein Abendessen in der Stadt und die Rückfahrt den Hügel hinauf lohnt sich ein Stundentransfer: Der Fahrer wartet, Sie müssen kein Taxi suchen.",
        "Frühflug? Der Weg zum Flughafen ist kurz, trotzdem empfehlen wir die Abholung zweieinhalb Stunden vor Abflug innerhalb Europas.",
      ],
      faq: [
        ["Wie weit ist The Dolder Grand vom Flughafen Zürich entfernt?", "Rund 11 Kilometer. Die Fahrt dauert meist etwa 20 Minuten, in den Stosszeiten etwas länger."],
        ["Fahren Sie bis vor den Eingang, obwohl das Hotel am Hang liegt?", "Ja, die Zufahrt über die Kurhausstrasse führt direkt in die Vorfahrt des Hotels."],
      ],
    },
    en: {
      teaser: "The fairy-tale castle on the forest edge above Zurich, opened in 1899 and reimagined by Foster + Partners.",
      intro: [
        "High above the city on the wooded slopes of the Adlisberg, The Dolder Grand rises with its turrets from 1899 – joined by the curved wings with which Foster + Partners brought the hotel into the present in 2008. From the terrace the view stretches over Zurich and the lake and, on clear days, all the way to the Alps.",
        "Because the hotel sits on the hillside rather than in the centre, the trip from the airport is shorter than many expect: around 11 kilometres. Your chauffeur meets you in the arrivals hall and drives you right up to the main entrance – at a fixed price per vehicle, luggage included.",
      ],
      arrival: [
        "The drive usually takes about 20 minutes. Depending on traffic it goes via Dübendorf and up through the forest or through the city; your driver decides based on current conditions. The last stretch climbs Kurhausstrasse into the hotel's forecourt.",
        "If you want to pop into town, the Dolderbahn – a small rack railway – links Römerhof with the hotel grounds. For appointments with luggage or in the evening, a transfer is more convenient.",
      ],
      tips: [
        "Travelling with a golf bag or lots of luggage? Choose the V-Class – it takes up to seven suitcases.",
        "For dinner in town and the ride back up the hill an hourly booking is worth it: the driver waits and you don't need to hunt for a taxi.",
        "Early flight? The airport is close, but we still recommend a pick-up two and a half hours before European departures.",
      ],
      faq: [
        ["How far is The Dolder Grand from Zurich Airport?", "About 11 kilometres. The drive usually takes around 20 minutes, a little longer at rush hour."],
        ["Do you drive right to the entrance even though the hotel is on a hill?", "Yes, the approach via Kurhausstrasse leads straight into the hotel's forecourt."],
      ],
    },
  },
  {
    slug: "la-reserve-eden-au-lac",
    name: "La Réserve Eden au Lac",
    place: "Zürich",
    region: "zurich",
    address: "La Réserve Eden au Lac, Utoquai 45, 8008 Zürich",
    lat: 47.3613, lon: 8.548,
    km: 13, min: 25,
    img: "/gallery/2.jpg",
    guides: ["ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich", "silvester-zuerich-feuerwerk-transfer", "sommer-zuerich-street-parade-zueri-faescht-transfer"],
    de: {
      teaser: "Belle-Époque-Haus direkt an der Seepromenade, von Philippe Starck mit Augenzwinkern neu gestaltet.",
      intro: [
        "Das La Réserve Eden au Lac steht am Utoquai, der Seepromenade zwischen Bellevue und Seefeld, nur wenige Schritte vom Opernhaus entfernt. Hinter der denkmalgeschützten Belle-Époque-Fassade hat Philippe Starck ein Interieur geschaffen, das an eine Yacht erinnert – mit Dachterrasse und freiem Blick über den Zürichsee.",
        "Vom Flughafen sind es rund 13 Kilometer bis zur Promenade. Ihr Chauffeur empfängt Sie mit Namensschild in der Ankunftshalle und fährt Sie direkt vor den Eingang am Utoquai, Gepäck inklusive und zum Festpreis.",
      ],
      arrival: [
        "Je nach Verkehr dauert die Fahrt 20 bis 35 Minuten; der letzte Abschnitt führt am Bellevue vorbei an das Seeufer. Der Fahrer hält direkt vor dem Hoteleingang am Utoquai 45.",
        "An Grossanlässen wie dem Silvesterfeuerwerk, der Street Parade oder dem Züri Fäscht ist das Seebecken zeitweise gesperrt. Dann vereinbaren wir mit Ihnen einen nahegelegenen Treffpunkt – sagen Sie uns bei der Buchung Bescheid, wenn Sie an einem dieser Tage reisen.",
      ],
      tips: [
        "Opernhaus, Bellevue und die Altstadt erreichen Sie zu Fuss in wenigen Minuten.",
        "Wenn Sie an Silvester oder während der Street Parade anreisen, planen Sie mehr Zeit ein – unsere Event-Guides erklären die Sperrzonen.",
        "Für den Rückflug am frühen Morgen ist die Strasse am See frei; rechnen Sie mit rund 25 Minuten bis zum Terminal.",
      ],
      faq: [
        ["Wie lange fährt man vom Flughafen Zürich zum La Réserve Eden au Lac?", "Meist 20 bis 35 Minuten für rund 13 Kilometer, abhängig von der Tageszeit."],
        ["Was passiert bei Sperrungen am See?", "An Grossanlässen ist das Seeufer teilweise gesperrt. Wir sprechen dann einen Treffpunkt in Gehdistanz zum Hotel ab und informieren Sie vorab."],
      ],
    },
    en: {
      teaser: "A Belle Époque house right on the lakeside promenade, playfully redesigned by Philippe Starck.",
      intro: [
        "La Réserve Eden au Lac stands on the Utoquai, the lakeside promenade between Bellevue and Seefeld, just steps from the opera house. Behind the listed Belle Époque façade, Philippe Starck created an interior reminiscent of a yacht – with a rooftop terrace and open views across Lake Zurich.",
        "The promenade is about 13 kilometres from the airport. Your chauffeur greets you with a name sign in the arrivals hall and drives you straight to the entrance on the Utoquai, luggage included and at a fixed price.",
      ],
      arrival: [
        "Depending on traffic the drive takes 20 to 35 minutes; the final stretch passes Bellevue and runs along the lakeshore. The driver stops right outside the hotel entrance at Utoquai 45.",
        "During big events such as the New Year's Eve fireworks, the Street Parade or the Züri Fäscht, parts of the lakeshore are closed. On those days we arrange a nearby meeting point with you – just let us know when booking if you are travelling on one of those dates.",
      ],
      tips: [
        "The opera house, Bellevue and the Old Town are a few minutes away on foot.",
        "Arriving on New Year's Eve or during the Street Parade? Allow extra time – our event guides explain the closure zones.",
        "For an early-morning flight home the lakeside road is clear; allow about 25 minutes to the terminal.",
      ],
      faq: [
        ["How long is the drive from Zurich Airport to La Réserve Eden au Lac?", "Usually 20 to 35 minutes for about 13 kilometres, depending on the time of day."],
        ["What happens when the lakeshore is closed?", "During big events parts of the lakeshore are closed. We then agree a meeting point within walking distance of the hotel and let you know in advance."],
      ],
    },
  },

  // ══════════════════════ LUZERN & VIERWALDSTÄTTERSEE ══════════════════════
  {
    slug: "buergenstock-resort",
    name: "Bürgenstock Resort",
    place: "Obbürgen",
    region: "lucerne",
    address: "Bürgenstock Resort, 6363 Obbürgen",
    lat: 46.9958, lon: 8.3822,
    km: 78, min: 75,
    img: "/gallery/17.jpg",
    guides: ["flughafen-zuerich-luzern-transfer-preis-dauer", "luzern-tagesausflug-ab-zuerich", "jungfraujoch-titlis-pilatus-vergleich"],
    de: {
      teaser: "Das Resort auf dem Felsplateau rund 500 Meter über dem Vierwaldstättersee – mit mehreren Hotels und Alpine Spa.",
      intro: [
        "Der Bürgenstock ragt wie ein Felsriegel in den Vierwaldstättersee. Oben, rund 500 Meter über dem Wasser, liegt das Bürgenstock Resort mit mehreren Hotels, Restaurants und dem weitläufigen Alpine Spa – und einer Aussicht, die von Luzern bis zum Pilatus reicht.",
        "Vom Flughafen Zürich sind es rund 75 bis 80 Kilometer. Ihr Chauffeur holt Sie in der Ankunftshalle ab und fährt Sie über die Autobahn Richtung Stans und dann die Bergstrasse hinauf direkt bis zu Ihrem Hotel im Resort. Der Preis steht vorher fest und gilt pro Fahrzeug.",
      ],
      arrival: [
        "Die Fahrt dauert meist 70 bis 85 Minuten. Nach der Autobahnausfahrt bei Stansstad führt eine kurvige Strasse über Obbürgen auf das Plateau. Im Resort fährt der Fahrer bis vor das Hotel, in dem Sie gebucht haben – nennen Sie uns dazu bei der Buchung den Hotelnamen.",
        "Es gibt auch einen zweiten, besonders schönen Weg: mit dem Schiff von Luzern zur Station Kehrsiten-Bürgenstock und von dort mit der Standseilbahn hinauf. Auf Wunsch bringen wir Sie mit dem Gepäck zur Schiffstation in Luzern – oder das Gepäck direkt ins Resort.",
      ],
      tips: [
        "Geben Sie bei der Buchung an, in welchem Hotel des Resorts Sie wohnen; die Gebäude liegen teils einige hundert Meter auseinander.",
        "Für einen Ausflug nach Luzern oder auf den Pilatus ist ein Stundentransfer ab dem Resort praktisch – die Bergstrasse ist eng und Parkplätze in Luzern sind rar.",
        "Familien mit viel Gepäck reisen am entspanntesten in der V-Klasse; Kindersitze sind kostenlos.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zum Bürgenstock?", "Meist 70 bis 85 Minuten für rund 75 bis 80 Kilometer, je nach Verkehr auf der A4 und der A2."],
        ["Kann ich mit dem Schiff ankommen und das Gepäck separat schicken?", "Ja. Wir bringen Sie zur Schiffstation in Luzern und das Gepäck auf Wunsch direkt ins Resort. Sprechen Sie das bei der Buchung an."],
      ],
    },
    en: {
      teaser: "The resort on a rocky plateau around 500 metres above Lake Lucerne – with several hotels and the Alpine Spa.",
      intro: [
        "The Bürgenstock juts into Lake Lucerne like a rocky ridge. On top, around 500 metres above the water, sits the Bürgenstock Resort with several hotels, restaurants and the extensive Alpine Spa – and a view that reaches from Lucerne to Mount Pilatus.",
        "It is about 75 to 80 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you via the motorway towards Stans, then up the mountain road straight to your hotel within the resort. The price is fixed in advance and applies per vehicle.",
      ],
      arrival: [
        "The drive usually takes 70 to 85 minutes. After leaving the motorway near Stansstad, a winding road climbs via Obbürgen to the plateau. Within the resort the driver takes you to the door of the hotel you booked – just tell us the hotel name when booking.",
        "There is a second, particularly beautiful way up: by boat from Lucerne to the Kehrsiten-Bürgenstock landing and from there by funicular. On request we take you and your luggage to the boat station in Lucerne – or deliver the luggage straight to the resort.",
      ],
      tips: [
        "Tell us which of the resort's hotels you are staying in; some buildings are a few hundred metres apart.",
        "For a trip to Lucerne or up Pilatus, an hourly booking from the resort is handy – the mountain road is narrow and parking in Lucerne is scarce.",
        "Families with lots of luggage travel most comfortably in the V-Class; child seats are free of charge.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to the Bürgenstock?", "Usually 70 to 85 minutes for about 75 to 80 kilometres, depending on traffic on the A4 and A2."],
        ["Can I arrive by boat and send my luggage separately?", "Yes. We drop you at the boat station in Lucerne and, on request, take the luggage directly to the resort. Just mention it when booking."],
      ],
    },
  },
  {
    slug: "mandarin-oriental-palace-luzern",
    name: "Mandarin Oriental Palace, Luzern",
    place: "Luzern",
    region: "lucerne",
    address: "Mandarin Oriental Palace, Haldenstrasse 10, 6006 Luzern",
    lat: 47.0545, lon: 8.3135,
    routeKey: R("luzern"),
    img: "/gallery/17.jpg",
    guides: ["flughafen-zuerich-luzern-transfer-preis-dauer", "luzern-tagesausflug-ab-zuerich", "weihnachtsmaerkte-zuerich-basel-transfer-dezember"],
    de: {
      teaser: "Der Belle-Époque-Palast an der Luzerner Seepromenade, seit 2022 unter der Flagge von Mandarin Oriental.",
      intro: [
        "Das Palace an der Haldenstrasse ist eines der Wahrzeichen der Luzerner Seepromenade: ein Belle-Époque-Bau aus dem frühen 20. Jahrhundert, der nach umfassender Renovation 2022 als Mandarin Oriental Palace wiedereröffnet wurde. Vor den Fenstern liegen der Vierwaldstättersee, die Rigi und der Pilatus.",
        "Für Luzern gilt bei uns ein fester Streckenpreis ab Flughafen Zürich. Ihr Chauffeur holt Sie in der Ankunftshalle ab, und rund 75 Minuten später halten Sie direkt vor dem Hoteleingang am See.",
      ],
      arrival: [
        "Die Route führt über die A4 durch das Knonaueramt und die A14 nach Luzern; im Stadtgebiet geht es am Bahnhof vorbei über die Seebrücke an den Nationalquai. Der Fahrer hält direkt vor dem Haupteingang an der Haldenstrasse 10.",
        "Im Sommer, während des Lucerne Festival, und in der Adventszeit ist die Innenstadt voller als sonst. Wir planen dann etwas Puffer ein, damit Sie pünktlich zum Konzert oder Abendessen ankommen.",
      ],
      tips: [
        "Das KKL mit dem Konzertsaal des Lucerne Festival liegt etwa eine Viertelstunde zu Fuss entlang der Promenade.",
        "Ausflüge auf den Pilatus, die Rigi oder den Titlis lassen sich mit einem Stundentransfer flexibel kombinieren.",
        "Für die Weiterreise ins Berner Oberland oder nach Engelberg holen wir Sie direkt im Hotel ab.",
      ],
      faq: [
        ["Was kostet der Transfer vom Flughafen Zürich zum Mandarin Oriental Palace?", "Es gilt unser fester Streckenpreis Flughafen Zürich–Luzern pro Fahrzeug; den genauen Betrag für jede Fahrzeugklasse sehen Sie im Rechner oben."],
        ["Wie lange dauert die Fahrt?", "Etwa 75 Minuten für rund 63 Kilometer, je nach Verkehr am Knonaueramt und in der Luzerner Innenstadt."],
      ],
    },
    en: {
      teaser: "The Belle Époque palace on Lucerne's lakeside promenade, flying the Mandarin Oriental flag since 2022.",
      intro: [
        "The Palace on Haldenstrasse is one of the landmarks of Lucerne's lakeside promenade: a Belle Époque building from the early 20th century that reopened in 2022 as the Mandarin Oriental Palace after extensive renovation. Outside the windows lie Lake Lucerne, the Rigi and Mount Pilatus.",
        "Lucerne is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall, and about an hour and a quarter later you pull up right outside the hotel entrance on the lake.",
      ],
      arrival: [
        "The route takes the A4 through the Knonaueramt and the A14 into Lucerne; in town it passes the station and crosses the Seebrücke onto the Nationalquai. The driver stops right at the main entrance at Haldenstrasse 10.",
        "In summer during the Lucerne Festival and in the run-up to Christmas the city centre is busier than usual. We then build in a buffer so you arrive on time for the concert or dinner.",
      ],
      tips: [
        "The KKL, home of the Lucerne Festival concert hall, is about a fifteen-minute walk along the promenade.",
        "Trips up Pilatus, the Rigi or the Titlis combine easily with an hourly booking.",
        "For onward travel to the Bernese Oberland or Engelberg we pick you up directly at the hotel.",
      ],
      faq: [
        ["How much is the transfer from Zurich Airport to the Mandarin Oriental Palace?", "Our fixed route price Zurich Airport–Lucerne applies per vehicle; you can see the exact amount for each vehicle class in the calculator above."],
        ["How long does the drive take?", "About 75 minutes for roughly 63 kilometres, depending on traffic in the Knonaueramt and central Lucerne."],
      ],
    },
  },
  {
    slug: "park-hotel-vitznau",
    name: "Park Hotel Vitznau",
    place: "Vitznau",
    region: "lucerne",
    address: "Park Hotel Vitznau, Seestrasse 18, 6354 Vitznau",
    lat: 47.0096, lon: 8.4795,
    km: 70, min: 70,
    img: "/gallery/15.jpg",
    guides: ["luzern-tagesausflug-ab-zuerich", "jungfraujoch-titlis-pilatus-vergleich", "5-orte-unter-90-minuten-ab-flughafen-zuerich"],
    de: {
      teaser: "Das Belle-Époque-Haus direkt am Ufer des Vierwaldstättersees, am Fuss der Rigi.",
      intro: [
        "Das Park Hotel Vitznau steht direkt am Wasser, dort, wo der Vierwaldstättersee zwischen Rigi und Bürgenstock am ruhigsten wirkt. Nur wenige Schritte entfernt beginnt die Vitznau-Rigi-Bahn, die älteste Bergbahn Europas.",
        "Vom Flughafen Zürich sind es rund 70 Kilometer. Ihr Chauffeur empfängt Sie in der Ankunftshalle und fährt Sie am See entlang bis vor den Eingang an der Seestrasse – zum Festpreis pro Fahrzeug, unabhängig von Verkehr und Wartezeit.",
      ],
      arrival: [
        "Die Fahrt dauert meist 60 bis 80 Minuten. Die Route führt über die A4 nach Küssnacht und dann auf der Uferstrasse über Weggis nach Vitznau – der letzte Abschnitt gehört zu den schönsten Seestrecken der Schweiz.",
        "An sonnigen Wochenenden ist die Uferstrasse beliebt. Für Rückflüge an Samstagen oder Sonntagen planen wir deshalb etwas mehr Zeit ein.",
      ],
      tips: [
        "Die Rigi erreichen Sie ab der Talstation in Vitznau mit der Zahnradbahn – ideal für den ersten Nachmittag.",
        "Nach Luzern geht es per Schiff oder mit einem Stundentransfer; mit dem Auto sind es rund 30 Minuten.",
        "Wer die Weiterreise ins Berner Oberland plant, kann direkt ab Vitznau über den Brünig fahren.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich nach Vitznau?", "Meist 60 bis 80 Minuten für rund 70 Kilometer; an sonnigen Wochenenden kann die Uferstrasse etwas länger brauchen."],
        ["Holen Sie mich für die Rückfahrt im Hotel ab?", "Ja, der Fahrer wartet zur vereinbarten Zeit am Eingang an der Seestrasse und hilft mit dem Gepäck."],
      ],
    },
    en: {
      teaser: "The Belle Époque house right on the shore of Lake Lucerne, at the foot of the Rigi.",
      intro: [
        "Park Hotel Vitznau stands right at the water's edge, where Lake Lucerne is at its calmest between the Rigi and the Bürgenstock. Just a few steps away starts the Vitznau–Rigi railway, Europe's oldest mountain railway.",
        "It is about 70 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you along the lake to the entrance on Seestrasse – at a fixed price per vehicle, whatever the traffic or waiting time.",
      ],
      arrival: [
        "The drive usually takes 60 to 80 minutes. The route takes the A4 to Küssnacht, then the lakeside road via Weggis to Vitznau – the last section is one of the most beautiful lakeside drives in Switzerland.",
        "On sunny weekends the lakeside road is popular. For return flights on Saturdays or Sundays we therefore allow a little more time.",
      ],
      tips: [
        "The Rigi is a short walk away by rack railway from Vitznau – ideal for your first afternoon.",
        "Lucerne is reachable by boat or with an hourly booking; by car it is about 30 minutes.",
        "If you are continuing to the Bernese Oberland, you can drive straight from Vitznau over the Brünig Pass.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to Vitznau?", "Usually 60 to 80 minutes for about 70 kilometres; on sunny weekends the lakeside road can take a little longer."],
        ["Will you pick me up at the hotel for the return trip?", "Yes, the driver waits at the entrance on Seestrasse at the agreed time and helps with the luggage."],
      ],
    },
  },

  // ══════════════════════ GRAUBÜNDEN ══════════════════════
  {
    slug: "badrutts-palace",
    name: "Badrutt's Palace Hotel",
    place: "St. Moritz",
    region: "graubuenden",
    address: "Badrutt's Palace Hotel, Via Serlas 27, 7500 St. Moritz",
    lat: 46.4977, lon: 9.8402,
    routeKey: R("st-moritz"),
    img: "/gallery/3.jpg",
    guides: ["st-moritz-engadin-winter-transfer-flughafen-zuerich", "skigebiete-ab-flughafen-zuerich-fahrzeit-transfer", "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse"],
    de: {
      teaser: "Das Grandhotel mit dem markanten Turm über dem St. Moritzersee – seit 1896 eine Legende des Engadins.",
      intro: [
        "Mit seinem Turm ist Badrutt's Palace seit 1896 das Wahrzeichen von St. Moritz. Das Haus liegt mitten im Ort über dem St. Moritzersee, ein paar Schritte von Via Serlas und den Boutiquen entfernt, und wird bis heute von der Familie Badrutt geprägt.",
        "St. Moritz gehört zu unseren Festpreis-Strecken ab Flughafen Zürich. Ihr Chauffeur empfängt Sie in der Ankunftshalle, verstaut Ski und Koffer und bringt Sie ohne Umsteigen bis vor den Eingang des Palace – deutlich entspannter als mit Zug, Umstieg in Chur und Gepäck.",
      ],
      arrival: [
        "Die Route führt über Chur, die Lenzerheide und den Julierpass ins Oberengadin. Der Julier ist in der Regel ganzjährig offen; im Winter fahren wir mit Winterausrüstung, und bei starkem Schneefall planen wir zusätzliche Zeit ein. Der Fahrer hält direkt in der Vorfahrt an der Via Serlas.",
        "In der Hochsaison zwischen Weihnachten und Neujahr und während Anlässen wie White Turf ist St. Moritz sehr gefragt. Buchen Sie Ihren Transfer früh, damit wir Ihr Wunschfahrzeug sicher einplanen können.",
      ],
      tips: [
        "Reisen Sie mit Skiausrüstung, ist die V-Klasse ideal: Skitaschen und Koffer finden gleichzeitig Platz.",
        "Für Rückflüge am Vormittag empfehlen wir im Winter eine frühe Abholung – rechnen Sie Pass und Wetter grosszügig ein.",
        "Ausflüge nach Pontresina, Samedan oder zum Morteratsch-Gletscher lassen sich als Stundentransfer ab dem Hotel buchen.",
      ],
      faq: [
        ["Was kostet der Transfer vom Flughafen Zürich zu Badrutt's Palace?", "Es gilt unser fester Streckenpreis Flughafen Zürich–St. Moritz pro Fahrzeug, auch im Winter. Den Betrag für jede Klasse zeigt der Rechner oben."],
        ["Ist der Julierpass im Winter offen?", "In der Regel ja; die Strasse wird geräumt. Bei starkem Schneefall kann es Verzögerungen geben – Ihr Fahrer kennt die Lage und informiert Sie."],
      ],
    },
    en: {
      teaser: "The grand hotel with the distinctive tower above Lake St. Moritz – an Engadin legend since 1896.",
      intro: [
        "With its tower, Badrutt's Palace has been the landmark of St. Moritz since 1896. The hotel sits in the heart of the resort above Lake St. Moritz, a few steps from Via Serlas and its boutiques, and is still shaped by the Badrutt family today.",
        "St. Moritz is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall, stows skis and suitcases and takes you all the way to the Palace entrance without a single change – far more relaxed than the train with a change in Chur and luggage in tow.",
      ],
      arrival: [
        "The route runs via Chur, Lenzerheide and the Julier Pass into the Upper Engadine. The Julier is normally open all year; in winter we drive with full winter equipment, and in heavy snowfall we allow extra time. The driver pulls up in the forecourt on Via Serlas.",
        "In peak season between Christmas and New Year and during events such as White Turf, St. Moritz is in high demand. Book your transfer early so we can reliably schedule the vehicle you want.",
      ],
      tips: [
        "Travelling with ski gear? The V-Class is ideal: ski bags and suitcases fit at the same time.",
        "For morning flights home in winter we recommend an early pick-up – allow generously for the pass and the weather.",
        "Trips to Pontresina, Samedan or the Morteratsch Glacier can be booked as an hourly chauffeur from the hotel.",
      ],
      faq: [
        ["How much is the transfer from Zurich Airport to Badrutt's Palace?", "Our fixed route price Zurich Airport–St. Moritz applies per vehicle, in winter too. The calculator above shows the amount for each class."],
        ["Is the Julier Pass open in winter?", "Normally yes; the road is cleared. Heavy snowfall can cause delays – your driver knows the conditions and will keep you informed."],
      ],
    },
  },
  {
    slug: "suvretta-house",
    name: "Suvretta House",
    place: "St. Moritz",
    region: "graubuenden",
    address: "Suvretta House, Via Chasellas 1, 7500 St. Moritz",
    lat: 46.487, lon: 9.8167,
    routeKey: R("st-moritz"),
    img: "/gallery/3.jpg",
    guides: ["st-moritz-engadin-winter-transfer-flughafen-zuerich", "wintersaison-ski-transfers-schweiz", "mit-kindern-reisen-kindersitze-schweiz"],
    de: {
      teaser: "Das Grandhotel von 1912 am Waldrand zwischen St. Moritz und Champfèr, mit direktem Zugang zum Skigebiet Corviglia.",
      intro: [
        "Suvretta House liegt etwas abseits des Dorfzentrums auf einer Anhöhe zwischen St. Moritz und Champfèr, umgeben von Lärchenwald und mit Blick über die Seenlandschaft des Oberengadins. Das Haus von 1912 ist bei Familien und Skifahrern besonders beliebt, denn die Pisten des Skigebiets Corviglia beginnen praktisch vor der Tür.",
        "Für die Fahrt ab Flughafen Zürich gilt unser Festpreis nach St. Moritz. Ihr Chauffeur holt Sie in der Ankunftshalle ab und bringt Sie samt Ski, Kinderwagen und Koffern direkt zum Eingang an der Via Chasellas.",
      ],
      arrival: [
        "Die Route führt wie nach St. Moritz über Chur, die Lenzerheide und den Julierpass. Kurz vor dem Dorf zweigt die Zufahrt zum Hotel ab; Sie müssen also nicht durch das Zentrum. Im Winter fahren wir mit Winterausrüstung, bei Schneefall planen wir Reserve ein.",
        "Reisen Sie mit Kindern, sagen Sie uns bei der Buchung Alter und Anzahl – passende Kindersitze und Sitzerhöhungen sind kostenlos an Bord.",
      ],
      tips: [
        "Familien mit Skigepäck wählen am besten die V-Klasse mit bis zu sieben Plätzen.",
        "Für Ausflüge nach St. Moritz Dorf, Pontresina oder Maloja ist ein Stundentransfer ab dem Hotel bequem.",
        "In den Weihnachts- und Sportferien ist die Nachfrage gross – buchen Sie den Transfer zusammen mit dem Zimmer.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zum Suvretta House?", "Rund vier Stunden, je nach Verkehr, Pass und Wetter. Im Winter rechnen wir lieber etwas mehr Zeit ein."],
        ["Gibt es Kindersitze?", "Ja, Kindersitze und Sitzerhöhungen sind kostenlos. Geben Sie bei der Buchung das Alter der Kinder an."],
      ],
    },
    en: {
      teaser: "The 1912 grand hotel on the forest edge between St. Moritz and Champfèr, with direct access to the Corviglia ski area.",
      intro: [
        "Suvretta House sits slightly away from the village centre on a rise between St. Moritz and Champfèr, surrounded by larch forest and looking out over the lakes of the Upper Engadine. The 1912 hotel is particularly popular with families and skiers, as the slopes of the Corviglia ski area start practically at the door.",
        "Our fixed St. Moritz price applies to the drive from Zurich Airport. Your chauffeur meets you in the arrivals hall and takes you, along with skis, pushchair and suitcases, straight to the entrance on Via Chasellas.",
      ],
      arrival: [
        "As for St. Moritz, the route runs via Chur, Lenzerheide and the Julier Pass. Shortly before the village the access road to the hotel branches off, so you don't need to go through the centre. In winter we drive with full winter equipment, and in snowfall we build in a reserve.",
        "Travelling with children? Tell us their ages and number when booking – suitable child seats and boosters are on board free of charge.",
      ],
      tips: [
        "Families with ski luggage are best off in the V-Class with up to seven seats.",
        "For trips to St. Moritz village, Pontresina or Maloja, an hourly booking from the hotel is convenient.",
        "Demand is high over Christmas and the February school holidays – book the transfer together with your room.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to Suvretta House?", "About four hours, depending on traffic, the pass and the weather. In winter we prefer to allow a little more time."],
        ["Do you provide child seats?", "Yes, child seats and boosters are free of charge. Please give the children's ages when booking."],
      ],
    },
  },
  {
    slug: "steigenberger-grandhotel-belvedere-davos",
    name: "Steigenberger Grandhotel Belvédère",
    place: "Davos",
    region: "graubuenden",
    address: "Steigenberger Grandhotel Belvédère, Promenade 89, 7270 Davos Platz",
    lat: 46.7966, lon: 9.8233,
    routeKey: R("davos"),
    img: "/gallery/10.jpg",
    guides: ["wef-davos-transfer-guide", "spengler-cup-davos-anreise-transfer", "skigebiete-ab-flughafen-zuerich-fahrzeit-transfer"],
    de: {
      teaser: "Das Grandhotel an der Davoser Promenade – während des WEF einer der zentralen Treffpunkte, nur wenige Schritte vom Kongresszentrum.",
      intro: [
        "Das Steigenberger Grandhotel Belvédère steht an der Promenade in Davos Platz und gehört zu den bekanntesten Adressen des Ortes. Im Januar, während des World Economic Forum, liegt es mitten im Geschehen; das Kongresszentrum erreicht man in wenigen Gehminuten. Im Winter lockt das Skigebiet Parsenn, im Dezember der Spengler Cup.",
        "Davos ist eine unserer Festpreis-Strecken ab Flughafen Zürich. Ihr Chauffeur empfängt Sie in der Ankunftshalle und bringt Sie über Landquart und das Prättigau direkt bis vor das Hotel an der Promenade.",
      ],
      arrival: [
        "Die Fahrt führt über die A3 und die A13 bis Landquart und dann durch das Prättigau und über Klosters und den Wolfgangpass nach Davos. Je nach Verkehr dauert sie zweieinhalb bis gut drei Stunden; der Fahrer hält direkt vor dem Hoteleingang.",
        "Während des WEF gelten in Davos Sicherheitszonen und Zufahrtsbeschränkungen, und die Nachfrage nach Fahrzeugen ist enorm. Buchen Sie für diese Woche so früh wie möglich und nennen Sie uns Ihre Akkreditierung oder den Termin im Kongresszentrum – unser WEF-Guide erklärt den Ablauf.",
      ],
      tips: [
        "Für die WEF-Woche lohnt sich ein Fahrer auf Stundenbasis, der Sie zwischen Hotel, Kongresszentrum und Empfängen begleitet.",
        "Zum Spengler Cup zwischen Weihnachten und Silvester ist Davos ausgebucht – den Transfer früh reservieren.",
        "Im Winter sind Klosters und der Wolfgangpass meist gut befahrbar; bei Neuschnee planen wir Reserve ein.",
      ],
      faq: [
        ["Was kostet der Transfer vom Flughafen Zürich zum Steigenberger Belvédère in Davos?", "Es gilt unser fester Streckenpreis Flughafen Zürich–Davos pro Fahrzeug. Den Betrag für jede Klasse sehen Sie im Rechner oben – auch während des WEF ohne Aufpreis für Wartezeit bei Ankunft."],
        ["Können Sie während des WEF bis vor das Hotel fahren?", "Das hängt von den aktuellen Sicherheitszonen ab. Wir klären die Zufahrt vorab und vereinbaren bei Bedarf einen Treffpunkt in unmittelbarer Nähe."],
      ],
    },
    en: {
      teaser: "The grand hotel on the Davos Promenade – one of the key meeting places during the WEF, steps from the Congress Centre.",
      intro: [
        "The Steigenberger Grandhotel Belvédère stands on the Promenade in Davos Platz and is one of the town's best-known addresses. In January, during the World Economic Forum, it is right at the centre of things; the Congress Centre is a few minutes' walk away. In winter the Parsenn ski area beckons, and in December the Spengler Cup.",
        "Davos is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you via Landquart and the Prättigau valley right to the hotel on the Promenade.",
      ],
      arrival: [
        "The drive follows the A3 and A13 to Landquart, then runs through the Prättigau and over Klosters and the Wolfgang Pass into Davos. Depending on traffic it takes two and a half to just over three hours; the driver stops right outside the hotel entrance.",
        "During the WEF, security zones and access restrictions apply in Davos and demand for vehicles is enormous. Book as early as possible for that week and tell us your accreditation or appointment at the Congress Centre – our WEF guide explains how it works.",
      ],
      tips: [
        "For WEF week, an hourly chauffeur who takes you between the hotel, the Congress Centre and receptions is well worth it.",
        "Davos is fully booked for the Spengler Cup between Christmas and New Year – reserve your transfer early.",
        "In winter Klosters and the Wolfgang Pass are usually easy to drive; after fresh snow we build in a reserve.",
      ],
      faq: [
        ["How much is the transfer from Zurich Airport to the Steigenberger Belvédère in Davos?", "Our fixed route price Zurich Airport–Davos applies per vehicle. The calculator above shows the amount for each class – during the WEF too, with no extra charge for arrival waiting time."],
        ["Can you drive right up to the hotel during the WEF?", "That depends on the current security zones. We check access in advance and, if needed, agree a meeting point close by."],
      ],
    },
  },

  // ══════════════════════ BERNER OBERLAND & GSTAAD ══════════════════════
  {
    slug: "victoria-jungfrau-interlaken",
    name: "Victoria-Jungfrau Grand Hotel & Spa",
    place: "Interlaken",
    region: "oberland",
    address: "Victoria-Jungfrau Grand Hotel & Spa, Höheweg 41, 3800 Interlaken",
    lat: 46.6863, lon: 7.8574,
    routeKey: R("interlaken"),
    img: "/gallery/11.jpg",
    guides: ["flughafen-zuerich-interlaken-transfer-guide", "jungfrau-region-guide-interlaken-grindelwald", "jungfraujoch-titlis-pilatus-vergleich"],
    de: {
      teaser: "Das Grandhotel am Höheweg mit freiem Blick über die Höhematte auf die Jungfrau.",
      intro: [
        "Das Victoria-Jungfrau ist seit dem 19. Jahrhundert die erste Adresse in Interlaken. Es liegt am Höheweg, direkt an der grossen Wiese der Höhematte, und von vielen Zimmern schaut man über das Grün hinweg auf die vergletscherte Jungfrau.",
        "Interlaken gehört zu unseren Festpreis-Strecken ab Flughafen Zürich. Ihr Chauffeur holt Sie in der Ankunftshalle ab und fährt Sie ohne Umsteigen bis vor den Hoteleingang – mit Gepäck, Kinderwagen oder Golfbag, ganz wie Sie reisen.",
      ],
      arrival: [
        "Die schönste Route führt über Luzern und den Brünigpass, vorbei an Sarnersee und Lungerersee, hinunter nach Brienz und am Brienzersee entlang nach Interlaken. Je nach Verkehr wählt der Fahrer auch die Autobahn über Bern und Thun. Am Höheweg hält er direkt in der Vorfahrt.",
        "Viele Gäste nutzen das Hotel als Ausgangspunkt für Jungfraujoch, Grindelwald oder Lauterbrunnen. Für die Weiterfahrt holen wir Sie im Hotel ab – auch für den Transfer nach Zermatt, Luzern oder zurück an den Flughafen.",
      ],
      tips: [
        "Die Bahnen Richtung Jungfraujoch, Grindelwald und Lauterbrunnen fahren ab Interlaken Ost, wenige Minuten vom Hotel entfernt.",
        "Wer die Route über den Brünig wählt, erlebt schon auf der Anreise die Seen der Zentralschweiz – ideal bei gutem Wetter.",
        "Für den Lauberhorn-Weltcup im Januar bringen wir Sie bis Lauterbrunnen, von wo die Bahn nach Wengen fährt.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zum Victoria-Jungfrau?", "Rund zweieinhalb Stunden, je nach Route und Verkehr. Über den Brünig ist die Fahrt landschaftlich am schönsten."],
        ["Fahren Sie auch weiter nach Grindelwald oder Wengen?", "Ja. Grindelwald und Wengen (bis Lauterbrunnen) sind eigene Festpreis-Strecken; Transfers zwischen den Orten buchen Sie einfach als Fahrt ab Hotel."],
      ],
    },
    en: {
      teaser: "The grand hotel on the Höheweg with an open view across the Höhematte meadow to the Jungfrau.",
      intro: [
        "The Victoria-Jungfrau has been Interlaken's leading address since the 19th century. It stands on the Höheweg, right on the great Höhematte meadow, and from many rooms you look across the green to the glaciated Jungfrau.",
        "Interlaken is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you without a single change right to the hotel entrance – with luggage, pushchair or golf bag, however you travel.",
      ],
      arrival: [
        "The most scenic route runs via Lucerne and the Brünig Pass, past Lake Sarnen and Lake Lungern, down to Brienz and along Lake Brienz to Interlaken. Depending on traffic the driver may also take the motorway via Bern and Thun. On the Höheweg he pulls straight into the forecourt.",
        "Many guests use the hotel as a base for the Jungfraujoch, Grindelwald or Lauterbrunnen. For onward travel we pick you up at the hotel – including transfers to Zermatt, Lucerne or back to the airport.",
      ],
      tips: [
        "Trains towards the Jungfraujoch, Grindelwald and Lauterbrunnen leave from Interlaken Ost, a few minutes from the hotel.",
        "Choosing the Brünig route lets you see the lakes of Central Switzerland on the way in – ideal in good weather.",
        "For the Lauberhorn World Cup in January we take you to Lauterbrunnen, from where the train runs up to Wengen.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to the Victoria-Jungfrau?", "About two and a half hours, depending on route and traffic. The Brünig route is the most scenic."],
        ["Do you also drive on to Grindelwald or Wengen?", "Yes. Grindelwald and Wengen (to Lauterbrunnen) are fixed-price routes of their own; transfers between resorts can simply be booked as a ride from your hotel."],
      ],
    },
  },
  {
    slug: "gstaad-palace",
    name: "Gstaad Palace",
    place: "Gstaad",
    region: "oberland",
    address: "Gstaad Palace, Palacestrasse 1, 3780 Gstaad",
    lat: 46.4757, lon: 7.2886,
    km: 200, min: 165,
    img: "/gallery/16.jpg",
    guides: ["skigebiete-ab-flughafen-zuerich-fahrzeit-transfer", "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse", "wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen"],
    de: {
      teaser: "Das familiengeführte Märchenschloss über dem Dorf – seit 1913 das Symbol von Gstaad.",
      intro: [
        "Mit seinen Türmen über dem Dorf ist das Gstaad Palace seit 1913 das Erkennungszeichen von Gstaad. Das Haus wird bis heute von einer Familie geführt und ist im Winter wie im Sommer Treffpunkt für Gäste aus aller Welt – zum Skifahren im Saanenland, zum Menuhin Festival oder einfach für die Ruhe der Berge.",
        "Gstaad liegt rund 200 Kilometer vom Flughafen Zürich entfernt. Ihr Chauffeur holt Sie in der Ankunftshalle ab und fährt Sie in einem Stück bis hinauf zum Hotel – ohne das mehrfache Umsteigen, das die Bahnreise mit sich bringt. Der Preis wird nach der tatsächlichen Strecke berechnet und steht vor der Buchung fest.",
      ],
      arrival: [
        "Die Fahrt dauert meist zweieinhalb bis drei Stunden. Sie führt über die Autobahn nach Bern und Spiez und dann durch das Simmental über Zweisimmen und Saanenmöser nach Gstaad. Die autofreie Promenade im Dorfzentrum umfahren wir; die Zufahrt zum Palace führt direkt den Hügel hinauf in die Vorfahrt.",
        "Im Winter sind die Strassen ins Saanenland gut unterhalten; bei Schneefall planen wir zusätzliche Zeit ein. Für die Rückfahrt zu Morgenflügen empfehlen wir, entsprechend früh aufzubrechen.",
      ],
      tips: [
        "Für Reisen mit Skiausrüstung oder grossem Gepäck ist die V-Klasse die beste Wahl.",
        "Das Gstaad Menuhin Festival im Sommer findet in Kirchen des ganzen Saanenlands statt – ein Stundentransfer bringt Sie bequem zu den Konzerten.",
        "Auch der Flughafen Genf ist von Gstaad gut erreichbar; wir fahren beide Flughäfen an.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zum Gstaad Palace?", "Meist zweieinhalb bis drei Stunden für rund 200 Kilometer, je nach Verkehr rund um Bern und im Simmental."],
        ["Wie wird der Preis berechnet?", "Für Gstaad gilt keine Pauschalstrecke, sondern unser Kilometertarif mit Festpreis. Der Rechner oben zeigt Ihnen den genauen Betrag pro Fahrzeug, bevor Sie buchen."],
      ],
    },
    en: {
      teaser: "The family-run fairy-tale castle above the village – the symbol of Gstaad since 1913.",
      intro: [
        "With its towers above the village, the Gstaad Palace has been Gstaad's emblem since 1913. The hotel is still family-run and, winter and summer alike, a meeting place for guests from all over the world – for skiing in the Saanenland, the Menuhin Festival or simply the calm of the mountains.",
        "Gstaad is about 200 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you in one go right up to the hotel – without the several changes the train journey involves. The price is calculated on the actual route and fixed before you book.",
      ],
      arrival: [
        "The drive usually takes two and a half to three hours. It follows the motorway to Bern and Spiez, then runs through the Simmental valley via Zweisimmen and Saanenmöser to Gstaad. We skirt the car-free promenade in the village centre; the approach to the Palace climbs the hill straight into the forecourt.",
        "In winter the roads into the Saanenland are well maintained; in snowfall we allow extra time. For morning flights home we recommend setting off correspondingly early.",
      ],
      tips: [
        "For trips with ski gear or lots of luggage, the V-Class is the best choice.",
        "The Gstaad Menuhin Festival in summer takes place in churches across the Saanenland – an hourly chauffeur takes you comfortably to the concerts.",
        "Geneva Airport is also within easy reach of Gstaad; we serve both airports.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to the Gstaad Palace?", "Usually two and a half to three hours for about 200 kilometres, depending on traffic around Bern and in the Simmental."],
        ["How is the price calculated?", "Gstaad isn't a flat-rate route; our per-kilometre tariff applies, as a fixed price. The calculator above shows you the exact amount per vehicle before you book."],
      ],
    },
  },
  {
    slug: "the-alpina-gstaad",
    name: "The Alpina Gstaad",
    place: "Gstaad",
    region: "oberland",
    address: "The Alpina Gstaad, Alpinastrasse 23, 3780 Gstaad",
    lat: 46.479, lon: 7.281,
    km: 200, min: 165,
    img: "/gallery/16.jpg",
    guides: ["skigebiete-ab-flughafen-zuerich-fahrzeit-transfer", "mit-kindern-reisen-kindersitze-schweiz", "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse"],
    de: {
      teaser: "Das zeitgenössische Chalet-Hotel auf einer Anhöhe über Gstaad, 2012 eröffnet.",
      intro: [
        "The Alpina Gstaad wurde 2012 eröffnet und zeigt, wie modern ein Chalet sein kann: altes Holz, Naturstein und viel zeitgenössische Kunst, dazu ein grosses Spa und Restaurants mit internationaler Küche. Das Hotel liegt auf einer ruhigen Anhöhe oberhalb des Dorfes, wenige Minuten vom Zentrum entfernt.",
        "Vom Flughafen Zürich sind es rund 200 Kilometer. Ihr Chauffeur empfängt Sie in der Ankunftshalle und bringt Sie ohne Umsteigen bis vor den Eingang an der Alpinastrasse; der Festpreis richtet sich nach der tatsächlichen Strecke und steht vor der Buchung fest.",
      ],
      arrival: [
        "Die Route führt über Bern und Spiez ins Simmental und über Zweisimmen und Saanenmöser nach Gstaad, meist in zweieinhalb bis drei Stunden. Kurz vor dem Dorf biegt der Fahrer zur Alpinastrasse ab und fährt den Hang hinauf bis zur Vorfahrt.",
        "Bei Schneefall rechnen wir im Simmental etwas mehr Zeit ein; im Winter fahren wir mit Winterausrüstung.",
      ],
      tips: [
        "Familien mit Kindern und Skigepäck reisen am bequemsten in der V-Klasse; Kindersitze sind kostenlos.",
        "Für Abende in Gstaad oder Saanen bietet sich ein Stundentransfer an – die Wege sind kurz, Parkplätze in der Saison aber knapp.",
        "Wer nach Genf weiterreist, kann den Transfer direkt ab Hotel buchen.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich zu The Alpina Gstaad?", "Meist zweieinhalb bis drei Stunden für rund 200 Kilometer."],
        ["Kann der Fahrer bis zum Hotel hinauffahren?", "Ja, die Zufahrt über die Alpinastrasse führt direkt zum Hoteleingang."],
      ],
    },
    en: {
      teaser: "The contemporary chalet hotel on a rise above Gstaad, opened in 2012.",
      intro: [
        "The Alpina Gstaad opened in 2012 and shows just how modern a chalet can be: reclaimed wood, natural stone and plenty of contemporary art, plus a large spa and restaurants with international cuisine. The hotel sits on a quiet rise above the village, a few minutes from the centre.",
        "It is about 200 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall and takes you without a single change to the entrance on Alpinastrasse; the fixed price is based on the actual route and set before you book.",
      ],
      arrival: [
        "The route runs via Bern and Spiez into the Simmental and over Zweisimmen and Saanenmöser to Gstaad, usually in two and a half to three hours. Just before the village the driver turns onto Alpinastrasse and climbs the slope to the forecourt.",
        "In snowfall we allow a little more time in the Simmental; in winter we drive with full winter equipment.",
      ],
      tips: [
        "Families with children and ski luggage travel most comfortably in the V-Class; child seats are free of charge.",
        "For evenings in Gstaad or Saanen an hourly chauffeur makes sense – distances are short, but parking is scarce in season.",
        "Continuing to Geneva? Book the transfer directly from the hotel.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to The Alpina Gstaad?", "Usually two and a half to three hours for about 200 kilometres."],
        ["Can the driver go all the way up to the hotel?", "Yes, the approach via Alpinastrasse leads straight to the hotel entrance."],
      ],
    },
  },

  // ══════════════════════ ZERMATT & ANDERMATT ══════════════════════
  {
    slug: "mont-cervin-palace-zermatt",
    name: "Mont Cervin Palace",
    place: "Zermatt",
    region: "alps",
    address: "Mont Cervin Palace, Bahnhofstrasse 31, 3920 Zermatt",
    lat: 46.0207, lon: 7.7476,
    routeKey: R("zermatt"),
    img: "/gallery/4.jpg",
    guides: ["zermatt-transfer-flughafen-zuerich-taesch-autofrei", "skigebiete-ab-flughafen-zuerich-fahrzeit-transfer", "schweiz-reiseplan-7-tage-ab-zuerich"],
    de: {
      teaser: "Das traditionsreiche Grandhotel an der Zermatter Bahnhofstrasse – wenige Gehminuten vom Bahnhof, mit Blick aufs Matterhorn.",
      intro: [
        "Das Mont Cervin Palace liegt an der Bahnhofstrasse, der Hauptachse des autofreien Zermatt, nur wenige Gehminuten vom Bahnhof entfernt. Es gehört zu den traditionsreichsten Häusern im Ort; von vielen Zimmern und vom Garten aus sieht man das Matterhorn.",
        "Weil Zermatt für Autos gesperrt ist, endet jeder Transfer in Täsch, rund fünf Kilometer vor dem Dorf. Ihr Chauffeur bringt Sie vom Flughafen Zürich zum Matterhorn Terminal Täsch, hilft mit dem Gepäck auf den Shuttlezug, und nach rund zwölf Minuten Fahrt sind Sie im Zentrum. Diese Strecke ist bei uns ein Festpreis.",
      ],
      arrival: [
        "Die rund 237 Kilometer nach Täsch dauern bei normalem Verkehr etwa 4 Stunden 45 Minuten. Je nach Saison und Verkehr führt die Route über die Furka-Verladung oder über Bern und den Lötschberg-Autoverlad ins Wallis. Im Matterhorn Terminal Täsch stehen Gepäckwagen bereit, der Shuttlezug fährt in kurzen Abständen.",
        "Am Bahnhof Zermatt warten elektrische Hoteltaxis und Shuttles vieler Hotels. Melden Sie Ihre Ankunftszeit direkt beim Mont Cervin Palace an – zu Fuss sind es mit leichtem Gepäck nur wenige Minuten die Bahnhofstrasse hinauf.",
      ],
      tips: [
        "Geben Sie uns Ihre geplante Ankunftszeit in Zermatt an; wir rechnen die Abholung am Flughafen und den Shuttlezug in Täsch passend ein.",
        "Mit viel Skigepäck ist die V-Klasse sinnvoll – in Täsch hilft der Fahrer beim Umladen auf die Gepäckwagen.",
        "Für die Rückreise holen wir Sie am Matterhorn Terminal in Täsch ab; nehmen Sie den Shuttlezug rund 30 Minuten vor der vereinbarten Zeit.",
      ],
      faq: [
        ["Warum endet der Transfer in Täsch und nicht in Zermatt?", "Zermatt ist autofrei. Alle privaten Fahrzeuge parken in Täsch; von dort fährt der Shuttlezug in rund zwölf Minuten ins Dorf. Unser Festpreis gilt bis zum Matterhorn Terminal Täsch."],
        ["Wie komme ich vom Bahnhof Zermatt ins Hotel?", "Das Mont Cervin Palace liegt wenige Gehminuten vom Bahnhof an der Bahnhofstrasse. Für Gepäck fragen Sie das Hotel nach dem Abholservice mit Elektrofahrzeug."],
      ],
    },
    en: {
      teaser: "The storied grand hotel on Zermatt's Bahnhofstrasse – a few minutes' walk from the station, with Matterhorn views.",
      intro: [
        "The Mont Cervin Palace stands on Bahnhofstrasse, the main street of car-free Zermatt, just a few minutes' walk from the station. It is one of the resort's most storied hotels; many rooms and the garden look out on the Matterhorn.",
        "Because Zermatt is closed to cars, every transfer ends in Täsch, about five kilometres below the village. Your chauffeur drives you from Zurich Airport to the Matterhorn Terminal Täsch and helps with your luggage onto the shuttle train; about twelve minutes later you are in the centre. This route is a fixed price with us.",
      ],
      arrival: [
        "The roughly 237 kilometres to Täsch take about 4 hours 45 minutes in normal traffic. Depending on season and traffic the route uses the Furka car train or runs via Bern and the Lötschberg car train into the Valais. At the Matterhorn Terminal Täsch luggage trolleys are available and the shuttle train runs at short intervals.",
        "At Zermatt station, electric hotel taxis and many hotels' shuttles are waiting. Let the Mont Cervin Palace know your arrival time directly – with light luggage it's only a few minutes' walk up Bahnhofstrasse.",
      ],
      tips: [
        "Tell us your planned arrival time in Zermatt; we schedule the airport pick-up and the shuttle train in Täsch accordingly.",
        "With lots of ski luggage the V-Class makes sense – in Täsch the driver helps load everything onto the trolleys.",
        "For the return we pick you up at the Matterhorn Terminal in Täsch; take the shuttle train about 30 minutes before the agreed time.",
      ],
      faq: [
        ["Why does the transfer end in Täsch rather than Zermatt?", "Zermatt is car-free. All private vehicles park in Täsch, from where the shuttle train reaches the village in about twelve minutes. Our fixed price applies to the Matterhorn Terminal Täsch."],
        ["How do I get from Zermatt station to the hotel?", "The Mont Cervin Palace is a few minutes' walk from the station on Bahnhofstrasse. For luggage, ask the hotel about its electric-vehicle pick-up."],
      ],
    },
  },
  {
    slug: "the-chedi-andermatt",
    name: "The Chedi Andermatt",
    place: "Andermatt",
    region: "alps",
    address: "The Chedi Andermatt, Gotthardstrasse 4, 6490 Andermatt",
    lat: 46.6366, lon: 8.5937,
    km: 112, min: 100,
    img: "/gallery/15.jpg",
    guides: ["skigebiete-ab-flughafen-zuerich-fahrzeit-transfer", "wintersaison-ski-transfers-schweiz", "jungfraujoch-titlis-pilatus-vergleich"],
    de: {
      teaser: "Alpiner Luxus mit asiatischer Handschrift im Bergdorf Andermatt, 2013 eröffnet.",
      intro: [
        "The Chedi Andermatt verbindet Chalet-Architektur mit asiatischer Gestaltung: dunkles Holz, offene Kamine und ein grosses Spa, entworfen vom Architekten Jean-Michel Gathy. Das Hotel liegt am Dorfeingang von Andermatt, im Herzen der Schweizer Alpen, und ist Ausgangspunkt für das Skigebiet Andermatt–Sedrun und den Gemsstock.",
        "Vom Flughafen Zürich sind es rund 110 Kilometer. Ihr Chauffeur holt Sie in der Ankunftshalle ab und bringt Sie über die Gotthard-Autobahn und durch die Schöllenenschlucht direkt bis vor den Eingang an der Gotthardstrasse. Der Festpreis richtet sich nach der tatsächlichen Strecke und steht vor der Buchung fest.",
      ],
      arrival: [
        "Die Fahrt dauert meist rund eineinhalb bis eindreiviertel Stunden: über die A4 und die A2 am Vierwaldstättersee vorbei bis Göschenen, dann hinauf durch die Schöllenenschlucht nach Andermatt. Diese letzte Strasse ist das ganze Jahr geöffnet – anders als die Pässe rundherum (Gotthard, Furka, Oberalp), die im Winter gesperrt sind.",
        "In Göschenen beginnt kurz vor Andermatt die Schöllenen; bei Schnee kann es hier langsamer gehen. Unsere Fahrer kennen die Strecke und planen im Winter Reserve ein.",
      ],
      tips: [
        "Die V-Klasse bietet Platz für Ski- und Golfgepäck – Andermatt hat auch einen 18-Loch-Golfplatz.",
        "Im Sommer lohnt sich ein Stundentransfer über die Pässe Furka, Grimsel oder Susten: drei Pässe an einem Tag.",
        "Für die Weiterreise ins Tessin oder nach Zermatt holen wir Sie direkt im Hotel ab.",
      ],
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich nach Andermatt?", "Meist rund 90 bis 105 Minuten für rund 110 Kilometer, je nach Verkehr am Gotthard und Wetter in der Schöllenen."],
        ["Ist Andermatt im Winter mit dem Auto erreichbar?", "Ja. Die Strasse von Göschenen durch die Schöllenenschlucht nach Andermatt ist ganzjährig offen; gesperrt sind im Winter nur die Pässe rund um Andermatt."],
      ],
    },
    en: {
      teaser: "Alpine luxury with an Asian signature in the mountain village of Andermatt, opened in 2013.",
      intro: [
        "The Chedi Andermatt blends chalet architecture with Asian design: dark wood, open fireplaces and a large spa, created by architect Jean-Michel Gathy. The hotel sits at the entrance to the village of Andermatt, in the heart of the Swiss Alps, and is the base for the Andermatt–Sedrun ski area and the Gemsstock.",
        "It is about 110 kilometres from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you via the Gotthard motorway and through the Schöllenen Gorge right to the entrance on Gotthardstrasse. The fixed price is based on the actual route and set before you book.",
      ],
      arrival: [
        "The drive usually takes about an hour and a half to an hour and three quarters: via the A4 and A2 past Lake Lucerne to Göschenen, then up through the Schöllenen Gorge to Andermatt. This last road is open all year – unlike the passes around it (Gotthard, Furka, Oberalp), which close in winter.",
        "The Schöllenen begins at Göschenen just below Andermatt; in snow it can be slower here. Our drivers know the road and build in a reserve in winter.",
      ],
      tips: [
        "The V-Class has room for ski and golf luggage – Andermatt also has an 18-hole golf course.",
        "In summer an hourly booking over the Furka, Grimsel or Susten passes is worth it: three passes in one day.",
        "For onward travel to Ticino or Zermatt we pick you up directly at the hotel.",
      ],
      faq: [
        ["How long is the transfer from Zurich Airport to Andermatt?", "Usually about 90 to 105 minutes for around 110 kilometres, depending on Gotthard traffic and the weather in the Schöllenen."],
        ["Can you reach Andermatt by car in winter?", "Yes. The road from Göschenen through the Schöllenen Gorge to Andermatt is open all year; only the passes around Andermatt close in winter."],
      ],
    },
  },

  // ══════════════════════ BASEL & BERN ══════════════════════
  {
    slug: "les-trois-rois-basel",
    name: "Grand Hotel Les Trois Rois",
    place: "Basel",
    region: "cities",
    address: "Grand Hotel Les Trois Rois, Blumenrain 8, 4051 Basel",
    lat: 47.5604, lon: 7.5876,
    routeKey: R("basel"),
    img: "/gallery/18.jpg",
    guides: ["flughafen-zuerich-basel-transfer-preis-dauer-vergleich", "swiss-indoors-basel-anreise-transfer", "weihnachtsmaerkte-zuerich-basel-transfer-dezember"],
    de: {
      teaser: "Eines der ältesten Stadthotels Europas, direkt am Rhein in der Basler Altstadt.",
      intro: [
        "Das Grand Hotel Les Trois Rois steht seit Jahrhunderten am Rheinufer in der Basler Altstadt und gilt als eines der ältesten Stadthotels Europas. Von den Balkonen schaut man auf den Rhein und die Mittlere Brücke; Marktplatz, Rathaus und Münster liegen in Gehdistanz.",
        "Basel gehört zu unseren Festpreis-Strecken ab Flughafen Zürich. Ihr Chauffeur empfängt Sie in der Ankunftshalle und fährt Sie über die A1 und die A3 direkt bis vor den Hoteleingang am Blumenrain – praktisch für Geschäftsreisen, Messen und Kunstwochen.",
      ],
      arrival: [
        "Die Fahrt dauert je nach Verkehr rund 75 bis 105 Minuten. Am Ende geht es durch die Grossbasler Altstadt an den Blumenrain, wo der Fahrer direkt vor dem Haupteingang hält.",
        "Während Art Basel im Juni, der Swiss Indoors im Oktober und der Basler Fasnacht ist die Stadt voll und die Altstadt teils gesperrt. Wir planen dann mehr Zeit ein und stimmen die Zufahrt vorab ab.",
      ],
      tips: [
        "Messe Basel und die St. Jakobshalle erreichen Sie ab dem Hotel mit einem kurzen Transfer – auch abends nach dem letzten Match oder Empfang.",
        "Zur Art Basel sind Fahrzeuge in der ganzen Region knapp: Buchen Sie Ihren Transfer zusammen mit dem Hotel.",
        "Für Termine in Zürich und Basel am selben Tag lohnt sich ein Stundentransfer mit Rechnung inkl. MwSt.",
      ],
      faq: [
        ["Was kostet der Transfer vom Flughafen Zürich zum Les Trois Rois?", "Es gilt unser fester Streckenpreis Flughafen Zürich–Basel pro Fahrzeug. Den Betrag für jede Klasse zeigt der Rechner oben."],
        ["Wäre der Flughafen Basel nicht näher?", "Für Flüge ab Basel-Mulhouse ja – auch diese Strecke fahren wir. Viele Langstrecken- und SWISS-Verbindungen landen aber in Zürich; dann ist der direkte Transfer die bequemste Lösung."],
      ],
    },
    en: {
      teaser: "One of Europe's oldest city hotels, right on the Rhine in Basel's Old Town.",
      intro: [
        "The Grand Hotel Les Trois Rois has stood on the banks of the Rhine in Basel's Old Town for centuries and is considered one of the oldest city hotels in Europe. From the balconies you look out over the Rhine and the Mittlere Brücke; the Marktplatz, town hall and cathedral are within walking distance.",
        "Basel is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you via the A1 and A3 right to the hotel entrance on Blumenrain – ideal for business trips, trade fairs and art weeks.",
      ],
      arrival: [
        "Depending on traffic the drive takes about 75 to 105 minutes. The final stretch runs through the Grossbasel Old Town to Blumenrain, where the driver stops right outside the main entrance.",
        "During Art Basel in June, the Swiss Indoors in October and the Basel Fasnacht, the city is full and parts of the Old Town are closed. We then allow more time and arrange access in advance.",
      ],
      tips: [
        "Messe Basel and the St. Jakobshalle are a short transfer from the hotel – including late at night after the last match or reception.",
        "During Art Basel vehicles are scarce across the region: book your transfer together with the hotel.",
        "For meetings in Zurich and Basel on the same day, an hourly booking with a VAT invoice is worth it.",
      ],
      faq: [
        ["How much is the transfer from Zurich Airport to Les Trois Rois?", "Our fixed route price Zurich Airport–Basel applies per vehicle. The calculator above shows the amount for each class."],
        ["Wouldn't Basel Airport be closer?", "For flights via Basel-Mulhouse, yes – we drive that route too. But many long-haul and SWISS connections land in Zurich, and then a direct transfer is the most convenient option."],
      ],
    },
  },
  {
    slug: "bellevue-palace-bern",
    name: "Bellevue Palace",
    place: "Bern",
    region: "cities",
    address: "Bellevue Palace, Kochergasse 3-5, 3011 Bern",
    lat: 46.9465, lon: 7.4441,
    routeKey: R("bern"),
    img: "/gallery/18.jpg",
    guides: ["flughafen-zuerich-bern-transfer-preis-dauer", "firmentransfers-zuerich-rechnung-mwst-spesen", "business-travel-zuerich-tipps"],
    de: {
      teaser: "Das Grandhotel neben dem Bundeshaus – offizielles Gästehaus der Eidgenossenschaft, mit Terrasse über der Aare.",
      intro: [
        "Das Bellevue Palace liegt unmittelbar neben dem Bundeshaus und ist das offizielle Gästehaus der Schweizer Regierung: Staatsgäste, Delegationen und Geschäftsleute gehen hier ein und aus. Von der Terrasse reicht der Blick über die Aare bis zu den Berner Alpen.",
        "Bern gehört zu unseren Festpreis-Strecken ab Flughafen Zürich. Ihr Chauffeur empfängt Sie in der Ankunftshalle und bringt Sie über die A1 direkt in die Altstadt an die Kochergasse – diskret, pünktlich und mit Rechnung inklusive MwSt., wenn Sie geschäftlich reisen.",
      ],
      arrival: [
        "Die Fahrt dauert je nach Verkehr rund zwei bis zweieinhalb Stunden. In der Altstadt fährt der Fahrer an die Kochergasse und hält direkt vor dem Hoteleingang.",
        "Bei Staatsbesuchen und während der Sessionen des Parlaments kann es rund um den Bundesplatz Absperrungen geben. Wir klären die Zufahrt dann vorab und nennen Ihnen bei Bedarf einen Treffpunkt in der Nähe.",
      ],
      tips: [
        "Delegationen mit mehreren Personen reisen gemeinsam in der V-Klasse oder mit mehreren Fahrzeugen im Konvoi – sprechen Sie uns an.",
        "Für einen Tag mit Terminen in Bern und Zürich ist ein Stundentransfer meist günstiger als zwei Einzelfahrten.",
        "Wer ins Berner Oberland weiterreist: Thun, Interlaken und Gstaad sind ab Bern rasch erreichbar.",
      ],
      faq: [
        ["Was kostet der Transfer vom Flughafen Zürich zum Bellevue Palace?", "Es gilt unser fester Streckenpreis Flughafen Zürich–Bern pro Fahrzeug. Den Betrag für jede Klasse sehen Sie im Rechner oben."],
        ["Erhalte ich eine Rechnung für die Spesenabrechnung?", "Ja, Sie bekommen nach der Fahrt eine Rechnung mit ausgewiesener Mehrwertsteuer per E-Mail; auf Wunsch mit Firmenadresse."],
      ],
    },
    en: {
      teaser: "The grand hotel next to the Federal Palace – the Swiss government's official guest house, with a terrace above the Aare.",
      intro: [
        "The Bellevue Palace sits right next to the Federal Palace and is the official guest house of the Swiss government: state guests, delegations and business travellers come and go. From the terrace the view stretches across the Aare to the Bernese Alps.",
        "Bern is one of our fixed-price routes from Zurich Airport. Your chauffeur meets you in the arrivals hall and drives you via the A1 straight into the Old Town to Kochergasse – discreet, punctual and with a VAT invoice if you travel on business.",
      ],
      arrival: [
        "Depending on traffic the drive takes about two to two and a half hours. In the Old Town the driver heads for Kochergasse and stops right outside the hotel entrance.",
        "During state visits and parliamentary sessions there may be closures around the Bundesplatz. We then check access in advance and, if necessary, give you a nearby meeting point.",
      ],
      tips: [
        "Delegations travel together in the V-Class or with several vehicles in convoy – just ask us.",
        "For a day of meetings in Bern and Zurich, an hourly booking is usually cheaper than two single rides.",
        "Continuing to the Bernese Oberland? Thun, Interlaken and Gstaad are quickly reached from Bern.",
      ],
      faq: [
        ["How much is the transfer from Zurich Airport to the Bellevue Palace?", "Our fixed route price Zurich Airport–Bern applies per vehicle. The calculator above shows the amount for each class."],
        ["Will I get an invoice for my expense report?", "Yes, after the ride you receive an invoice with VAT shown by email; with your company address on request."],
      ],
    },
  },
];

export const findHotel = (slug: string) => hotels.find((h) => h.slug === slug);
