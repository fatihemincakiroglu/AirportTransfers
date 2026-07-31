// ─────────────────────────────────────────────────────────────
//  ROTA İÇERİKLERİ (SEO)
//  İlk 6 popüler rota için özgün DE/EN metinler.
//  Yeni rota içeriği eklemek için aynı yapıyı kopyala; içeriği
//  olmayan rotalarda sayfa otomatik olarak kısa sürümü gösterir.
// ─────────────────────────────────────────────────────────────

export type RouteContent = {
  intro: string[];        // giriş paragrafları
  aboutTitle: string;     // varış noktası başlığı
  about: string;          // varış noktası metni
  faq: [string, string][]; // soru-cevap listesi
};

export const routeContent: Record<string, { de: RouteContent; en: RouteContent }> = {
  "zurich-airport-to-zug": {
    de: {
      intro: [
        "Unser privater Flughafentransfer bringt Sie in rund 55 Minuten vom Flughafen Zürich direkt an die Zuger Seepromenade oder zu Ihrem Geschäftstermin. Ihr Chauffeur erwartet Sie mit Namensschild in der Ankunftshalle, übernimmt Ihr Gepäck und fährt Sie ohne Umwege über die A4 nach Zug – zum garantierten Festpreis, ohne Taxameter und ohne Zuschläge.",
        "Zug ist einer der wichtigsten Wirtschaftsstandorte der Schweiz. Gerade für Geschäftsreisende zählt jede Minute: Wir überwachen Ihren Flug, passen die Abholzeit bei Verspätungen automatisch an und bieten auf Wunsch WLAN im Fahrzeug, damit Sie die Fahrt produktiv nutzen können.",
      ],
      aboutTitle: "Über Zug",
      about:
        "Die Stadt am Zugersee verbindet mittelalterliche Altstadt mit internationalem Business: Zytturm, Seepromenade und die berühmten Sonnenuntergänge über dem Pilatus auf der einen Seite – Hauptsitze globaler Unternehmen auf der anderen. Auch der Ausblick vom Zugerberg lohnt einen Abstecher.",
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich nach Zug?", "Die Fahrt über die A4 dauert je nach Verkehr rund 55 Minuten für die 46 km lange Strecke. Zu Stosszeiten planen wir automatisch einen Puffer ein."],
        ["Was kostet ein Taxi vom Flughafen Zürich nach Zug?", "Der Festpreis beginnt bei CHF 138.69 in der Business Class (Mercedes E-Klasse) – pro Fahrzeug, nicht pro Person, inkl. MwSt. und Gebühren."],
        ["Wartet der Fahrer bei einer Flugverspätung?", "Ja. Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit kostenlos an – inklusive Gratis-Wartezeit nach der Landung."],
        ["Kann ich einen Kindersitz reservieren?", "Ja, Babyschalen und Kindersitze stellen wir auf Wunsch kostenlos bereit. Geben Sie die Anzahl einfach bei der Buchung an."],
      ],
    },
    en: {
      intro: [
        "Our private airport transfer takes you from Zurich Airport straight to the Zug lakefront or your business meeting in around 55 minutes. Your chauffeur greets you with a name sign in the arrivals hall, takes care of your luggage and drives you directly via the A4 motorway – at a guaranteed fixed price, with no meter and no surcharges.",
        "Zug is one of Switzerland's most important business hubs, and for corporate travellers every minute counts: we track your flight, adjust the pickup time automatically if you are delayed, and offer on-board Wi-Fi on request so you can work while you ride.",
      ],
      aboutTitle: "About Zug",
      about:
        "The town on Lake Zug pairs a medieval old town with international business: the Zytturm clock tower, the lake promenade and famously colourful sunsets on one side – global corporate headquarters on the other. The viewpoint on the Zugerberg is well worth a detour.",
      faq: [
        ["How long does the transfer from Zurich Airport to Zug take?", "The 46 km drive via the A4 takes around 55 minutes depending on traffic. During rush hour we automatically plan a buffer."],
        ["How much is a taxi from Zurich Airport to Zug?", "Fixed prices start at CHF 138.69 in Business Class (Mercedes E-Class) – per vehicle, not per person, including VAT and fees."],
        ["Will the driver wait if my flight is delayed?", "Yes. We monitor your flight in real time and adjust the pickup at no cost – free waiting time after landing is included."],
        ["Can I reserve a child seat?", "Yes, baby and child seats are provided free of charge on request. Simply state the number when booking."],
      ],
    },
  },

  "zurich-airport-to-luzern": {
    de: {
      intro: [
        "Vom Gate direkt an den Vierwaldstättersee: Unser Chauffeurservice bringt Sie in etwa 1 Stunde 15 Minuten vom Flughafen Zürich nach Luzern – bequemer als jeder Zugumstieg mit Koffern. Sie reisen im gepflegten Mercedes, Ihr Fahrer hilft beim Gepäck und setzt Sie direkt vor Ihrem Hotel ab, ob am Schwanenplatz oder oberhalb der Stadt.",
        "Ob Ferienauftakt in der Zentralschweiz, Ausgangspunkt für Pilatus und Titlis oder Kongressbesuch im KKL: Mit Festpreis, Flugverfolgung und Meet & Greet beginnt Ihre Reise entspannt – rund um die Uhr, auch für frühe Abflüge und späte Ankünfte.",
      ],
      aboutTitle: "Über Luzern",
      about:
        "Luzern gilt als eine der schönsten Städte der Schweiz: die hölzerne Kapellbrücke mit dem Wasserturm, die Museggmauer, das Löwendenkmal und die Uferpromenade am Vierwaldstättersee. Von hier starten Schiffe, Zahnradbahnen und Seilbahnen zu Rigi, Pilatus und Titlis.",
      faq: [
        ["Wie lange dauert die Fahrt vom Flughafen Zürich nach Luzern?", "Für die 63 km rechnen wir rund 1 Stunde 15 Minuten. Ihr Fahrer wählt je nach Verkehrslage die schnellste Route."],
        ["Was kostet der Transfer nach Luzern?", "Ab CHF 189.75 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt., ohne versteckte Zuschläge."],
        ["Holen Sie auch nachts oder früh morgens ab?", "Ja, unser Service ist rund um die Uhr verfügbar – ideal für Frühflüge ab Zürich und späte Landungen."],
        ["Können wir unterwegs einen Fotostopp machen?", "Kurze Stopps sind nach Absprache mit dem Fahrer möglich. Für längere Aufenthalte empfehlen wir unseren stundenweisen Chauffeurservice."],
      ],
    },
    en: {
      intro: [
        "From the gate straight to Lake Lucerne: our chauffeur service takes you from Zurich Airport to Lucerne in about 1 hour 15 minutes – far more comfortable than changing trains with suitcases. You travel in a well-kept Mercedes, your driver helps with the luggage and drops you right at your hotel, whether at Schwanenplatz or above the town.",
        "Whether you are starting a holiday in Central Switzerland, heading for Pilatus and Titlis or attending a congress at the KKL: with fixed prices, flight tracking and meet & greet your trip begins relaxed – around the clock, including early departures and late arrivals.",
      ],
      aboutTitle: "About Lucerne",
      about:
        "Lucerne is considered one of Switzerland's most beautiful cities: the wooden Chapel Bridge with its water tower, the Musegg Wall, the Lion Monument and the lakeside promenade. Boats, cogwheel railways and cable cars depart from here to Rigi, Pilatus and Titlis.",
      faq: [
        ["How long is the drive from Zurich Airport to Lucerne?", "Allow around 1 hour 15 minutes for the 63 km. Your driver picks the fastest route depending on traffic."],
        ["How much does the transfer to Lucerne cost?", "From CHF 189.75 in Business Class – a fixed price per vehicle incl. VAT, with no hidden surcharges."],
        ["Do you also pick up at night or early in the morning?", "Yes, our service runs around the clock – ideal for early flights from Zurich and late landings."],
        ["Can we make a photo stop on the way?", "Short stops are possible by arrangement with the driver. For longer visits we recommend our hourly chauffeur service."],
      ],
    },
  },

  "zurich-airport-to-basel": {
    de: {
      intro: [
        "Direkt vom Flughafen Zürich in die Kulturhauptstadt am Rheinknie: In rund 1 Stunde 45 Minuten bringt Sie Ihr privater Chauffeur nach Basel – zur Messe, in die Innenstadt oder ins Dreiländereck. Kein Umsteigen, kein Kofferschleppen, keine Wartezeiten am Bahnhof.",
        "Gerade zu Grossanlässen wie Messen und Kongressen ist ein zuverlässiger Transfer Gold wert: Wir garantieren Festpreise ohne Event-Zuschläge, verfolgen Ihren Flug und stehen mit Namensschild bereit, wenn Sie landen.",
      ],
      aboutTitle: "Über Basel",
      about:
        "Basel ist die Kunst- und Kulturmetropole der Schweiz: das Kunstmuseum, die Fondation Beyeler, das Münster hoch über dem Rhein und die Fähren, die sich nur mit der Strömung übersetzen lassen. Als Messestadt und Grenzstadt zu Deutschland und Frankreich ist Basel zudem ein wichtiger Geschäftsstandort.",
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich nach Basel?", "Für die 86 km über die A3 benötigen wir je nach Verkehr rund 1 Stunde 45 Minuten."],
        ["Was kostet die Fahrt nach Basel?", "Ab CHF 258.50 in der Business Class – Festpreis pro Fahrzeug, auch während Messen ohne Aufschlag."],
        ["Fahren Sie auch zum EuroAirport Basel-Mulhouse?", "Ja, wir bedienen auch Ziele im Dreiländereck inklusive EuroAirport – fragen Sie uns einfach per WhatsApp an."],
        ["Ist genug Platz für Messegepäck und Rollups?", "Unsere V-Klasse bietet Platz für bis zu 7 Gepäckstücke; sperriges Material transportieren wir nach Absprache gerne."],
      ],
    },
    en: {
      intro: [
        "Straight from Zurich Airport to the cultural capital on the Rhine: in around 1 hour 45 minutes your private chauffeur takes you to Basel – to the trade fair, the city centre or the tri-border area. No changing trains, no dragging suitcases, no waiting at the station.",
        "Especially during major fairs and congresses a reliable transfer is worth gold: we guarantee fixed prices without event surcharges, track your flight and wait with a name sign when you land.",
      ],
      aboutTitle: "About Basel",
      about:
        "Basel is Switzerland's capital of art and culture: the Kunstmuseum, the Fondation Beyeler, the Minster high above the Rhine and the current-driven ferries crossing the river. As a trade-fair city bordering Germany and France, Basel is also a major business location.",
      faq: [
        ["How long does the transfer from Zurich Airport to Basel take?", "Allow around 1 hour 45 minutes for the 86 km via the A3, depending on traffic."],
        ["How much is the ride to Basel?", "From CHF 258.50 in Business Class – a fixed price per vehicle, with no surcharge even during trade fairs."],
        ["Do you also drive to EuroAirport Basel-Mulhouse?", "Yes, we serve destinations across the tri-border area including EuroAirport – just ask us via WhatsApp."],
        ["Is there enough space for trade-fair luggage and roll-ups?", "Our V-Class carries up to 7 pieces of luggage; bulky items are welcome by prior arrangement."],
      ],
    },
  },

  "zurich-airport-to-geneva": {
    de: {
      intro: [
        "Quer durch die Schweiz im Komfort einer Mercedes-Limousine: Unser Langstreckentransfer verbindet den Flughafen Zürich mit Genf – rund 266 km und 5 gemütliche Stunden, in denen Sie arbeiten, schlafen oder einfach die Landschaft zwischen Mittelland und Genfersee geniessen können.",
        "Für Delegationen, Diplomaten und Geschäftsreisende ist die Direktfahrt oft die entspannteste Option: keine Umstiege, vertraulicher Raum für Gespräche, Pausen nach Wunsch und ein Fahrer, der Sie bis vor die Tür Ihrer Organisation oder Ihres Hotels bringt.",
      ],
      aboutTitle: "Über Genf",
      about:
        "Genf ist die internationalste Stadt der Schweiz: Sitz der UNO, des IKRK und unzähliger Organisationen, berühmt für den Jet d'eau, die Altstadt um die Kathedrale St. Peter und die Uhrmacherkunst. Die Lage am westlichen Ende des Genfersees macht die Stadt auch zum Tor nach Frankreich.",
      faq: [
        ["Wie lange dauert die Fahrt von Zürich nach Genf?", "Für die rund 266 km planen wir etwa 5 Stunden 20 Minuten ein – inklusive Pausen nach Ihren Wünschen."],
        ["Was kostet der Transfer nach Genf?", "Ab CHF 798.50 in der Business Class – als Festpreis pro Fahrzeug oft günstiger als mehrere Erste-Klasse-Bahntickets mit Gepäck."],
        ["Können wir unterwegs Pausen einlegen?", "Selbstverständlich. Ihr Fahrer hält auf Wunsch an Raststätten oder für einen Kaffee – die Fahrt richtet sich nach Ihnen."],
        ["Bieten Sie auch die Strecke Genf → Flughafen Zürich an?", "Ja, alle Strecken fahren wir in beide Richtungen. Geben Sie bei der Buchung einfach die gewünschte Abholadresse an."],
      ],
    },
    en: {
      intro: [
        "Across Switzerland in the comfort of a Mercedes: our long-distance transfer connects Zurich Airport with Geneva – around 266 km and five relaxed hours in which you can work, sleep or simply enjoy the scenery between the Mittelland and Lake Geneva.",
        "For delegations, diplomats and business travellers the direct drive is often the most relaxing option: no changes, a private space for conversations, breaks whenever you wish and a driver who takes you right to the door of your organisation or hotel.",
      ],
      aboutTitle: "About Geneva",
      about:
        "Geneva is Switzerland's most international city: home to the UN, the ICRC and countless organisations, famous for the Jet d'eau, the old town around St. Peter's Cathedral and its watchmaking heritage. Its position at the western tip of Lake Geneva also makes it the gateway to France.",
      faq: [
        ["How long is the drive from Zurich to Geneva?", "Plan around 5 hours 20 minutes for the 266 km – including breaks whenever you like."],
        ["How much does the transfer to Geneva cost?", "From CHF 798.50 in Business Class – as a fixed price per vehicle it is often cheaper than several first-class rail tickets with luggage."],
        ["Can we take breaks along the way?", "Of course. Your driver stops at service areas or for a coffee on request – the journey follows your schedule."],
        ["Do you also offer Geneva → Zurich Airport?", "Yes, every route runs in both directions. Simply state your preferred pickup address when booking."],
      ],
    },
  },

  "zurich-airport-to-bern": {
    de: {
      intro: [
        "Vom Flughafen Zürich direkt in die Bundesstadt: In rund 2 Stunden 20 Minuten erreichen Sie mit Ihrem privaten Chauffeur Bern – ohne Umsteigen in Zürich HB und ohne Gedränge im Intercity. Ideal für Termine im Bundeshaus, bei Verbänden oder Botschaften.",
        "Ihr Fahrer kennt die Anfahrt in die autoarme Altstadt und setzt Sie so nah wie möglich an Ihrem Ziel ab. Auf Wunsch wartet er vor Ort oder holt Sie nach Ihrem Termin wieder ab – fragen Sie nach unserem stundenweisen Service.",
      ],
      aboutTitle: "Über Bern",
      about:
        "Die Berner Altstadt gehört zum UNESCO-Welterbe: sechs Kilometer Lauben, der Zytglogge-Turm, das Münster mit dem höchsten Kirchturm der Schweiz und die Aareschlaufe, in der im Sommer die Berner flussschwimmen. Als Hauptstadt vereint Bern Politik, Geschichte und Gemütlichkeit.",
      faq: [
        ["Wie lange dauert der Transfer vom Flughafen Zürich nach Bern?", "Für die 117 km über die A1 rechnen wir rund 2 Stunden 20 Minuten, je nach Verkehrsaufkommen."],
        ["Was kostet die Fahrt nach Bern?", "Ab CHF 352.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt. und Gebühren."],
        ["Fahren Sie bis in die Altstadt?", "Ja, soweit es die Verkehrsführung erlaubt, bringen wir Sie bis vor die Tür – ansonsten zum nächstmöglichen Halt."],
        ["Ist der Rücktransfer zum gleichen Preis buchbar?", "Ja, Hin- und Rückfahrt kosten gleich viel. Bei Buchung beider Wege koordinieren wir die Zeiten gerne für Sie."],
      ],
    },
    en: {
      intro: [
        "From Zurich Airport straight to the federal capital: with your private chauffeur you reach Bern in around 2 hours 20 minutes – no changing at Zurich main station and no crowded intercity trains. Ideal for appointments at the Federal Palace, associations or embassies.",
        "Your driver knows the approach to the largely car-free old town and drops you as close to your destination as possible. On request he waits on site or picks you up again after your meeting – ask about our hourly service.",
      ],
      aboutTitle: "About Bern",
      about:
        "Bern's old town is a UNESCO World Heritage site: six kilometres of arcades, the Zytglogge clock tower, the Minster with Switzerland's tallest church spire and the Aare loop where locals float downriver in summer. As the capital, Bern combines politics, history and a famously relaxed pace.",
      faq: [
        ["How long does the transfer from Zurich Airport to Bern take?", "Allow around 2 hours 20 minutes for the 117 km via the A1, depending on traffic."],
        ["How much is the ride to Bern?", "From CHF 352.50 in Business Class – a fixed price per vehicle incl. VAT and fees."],
        ["Do you drive into the old town?", "Yes, as far as traffic rules allow we take you right to the door – otherwise to the nearest possible stop."],
        ["Can I book the return at the same price?", "Yes, outbound and return cost the same. If you book both, we happily coordinate the timings for you."],
      ],
    },
  },

  "zurich-airport-to-interlaken": {
    de: {
      intro: [
        "Das Tor zur Jungfrau-Region ohne Kofferschleppen erreichen: Unser Transfer bringt Sie in rund 2,5 Stunden vom Flughafen Zürich nach Interlaken – vorbei an Luzern und über den Brünig, eine der schönsten Strecken der Schweiz. Lehnen Sie sich zurück, während die Berge näher rücken.",
        "Familien mit Wintersportgepäck, Honeymooner und Gruppen schätzen die Direktfahrt besonders: Skitaschen transportieren wir kostenlos, Kindersitze stehen bereit, und in der V-Klasse reisen bis zu 7 Personen mit komplettem Gepäck bequem gemeinsam.",
      ],
      aboutTitle: "Über Interlaken",
      about:
        "Zwischen Thuner- und Brienzersee gelegen, ist Interlaken der Ausgangspunkt für Eiger, Mönch und Jungfrau: Ausflüge aufs Jungfraujoch, Paragliding über der Höhematte, Schifffahrten auf türkisblauen Seen und Bergdörfer wie Grindelwald, Wengen und Lauterbrunnen liegen direkt vor der Tür.",
      faq: [
        ["Wie lange dauert der Transfer nach Interlaken?", "Für die 125 km planen Sie rund 2 Stunden 30 Minuten ein – je nach Route via Luzern/Brünig oder Bern."],
        ["Was kostet die Fahrt vom Flughafen Zürich nach Interlaken?", "Ab CHF 375.63 in der Business Class – Festpreis pro Fahrzeug, ideal auch für Familien und Gruppen."],
        ["Transportieren Sie Ski- und Snowboardgepäck?", "Ja, Skitaschen befördern wir kostenlos (max. 4 pro Fahrzeug). Bitte bei der Buchung angeben."],
        ["Fahren Sie auch weiter nach Grindelwald, Wengen oder Lauterbrunnen?", "Ja, wir bedienen die gesamte Jungfrau-Region – wählen Sie einfach die entsprechende Strecke oder fragen Sie uns an."],
      ],
    },
    en: {
      intro: [
        "Reach the gateway to the Jungfrau region without hauling luggage: our transfer takes you from Zurich Airport to Interlaken in around 2.5 hours – past Lucerne and over the Brünig Pass, one of Switzerland's most scenic drives. Sit back while the mountains draw closer.",
        "Families with winter-sports gear, honeymooners and groups especially value the direct drive: ski bags travel free, child seats are ready, and in the V-Class up to 7 people ride comfortably together with full luggage.",
      ],
      aboutTitle: "About Interlaken",
      about:
        "Set between Lake Thun and Lake Brienz, Interlaken is the base for the Eiger, Mönch and Jungfrau: trips to the Jungfraujoch, paragliding over the Höhematte, cruises on turquoise lakes and mountain villages such as Grindelwald, Wengen and Lauterbrunnen are all on the doorstep.",
      faq: [
        ["How long does the transfer to Interlaken take?", "Plan around 2 hours 30 minutes for the 125 km – via Lucerne/Brünig or Bern depending on conditions."],
        ["How much is the ride from Zurich Airport to Interlaken?", "From CHF 375.63 in Business Class – a fixed price per vehicle, ideal for families and groups."],
        ["Do you carry ski and snowboard luggage?", "Yes, ski bags travel free of charge (max. 4 per vehicle). Please state them when booking."],
        ["Do you continue to Grindelwald, Wengen or Lauterbrunnen?", "Yes, we serve the entire Jungfrau region – simply pick the relevant route or send us a request."],
      ],
    },
  },
};
