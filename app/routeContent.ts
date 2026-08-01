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

  "zurich-airport-to-st-moritz": {
    de: {
      intro: [
        "Ins Engadin ohne Umsteigen: Unser Langstreckentransfer bringt Sie in gut 4 Stunden vom Flughafen Zürich nach St. Moritz – über den Julierpass oder via Vereina-Autoverlad, je nach Wetter und Jahreszeit. Ihr Chauffeur kennt beide Varianten und wählt die verlässlichste.",
        "Ob Wintersaison mit Skigepäck oder Sommerfrische auf 1'800 Metern: Sie reisen im Mercedes mit Winterausrüstung, Ihr Gepäck fährt mit, und am Ziel stehen Sie direkt vor dem Hotel – vom Badrutt's Palace bis zur Ferienwohnung in Celerina.",
      ],
      aboutTitle: "Über St. Moritz",
      about:
        "Der Geburtsort des Wintertourismus glänzt mit Champagner-Klima, dem gefrorenen See mit White Turf und Polo, Gletscherpanoramen an der Diavolezza und der Bernina-Bahnstrecke, die zum UNESCO-Welterbe zählt. Im Sommer locken Segeln, Wandern und das Engadiner Licht, das schon Künstler wie Segantini inspirierte.",
      faq: [
        ["Wie lange dauert der Transfer nach St. Moritz?", "Für die rund 213 km planen wir etwa 4 Stunden 15 Minuten ein. Im Winter kann die Route über den Vereina-Autoverlad führen – Ihr Fahrer entscheidet nach aktueller Lage."],
        ["Was kostet die Fahrt Zürich–St. Moritz?", "Ab CHF 638.00 in der Business Class – Festpreis pro Fahrzeug inkl. Pässe, Vignette und MwSt."],
        ["Sind die Strassen im Winter sicher befahrbar?", "Ja. Unsere Fahrzeuge sind komplett winterbereift, die Fahrer alpenerfahren. Bei kritischer Witterung weichen wir auf den Autoverlad aus."],
        ["Nehmen Sie Ski- und Snowboardgepäck mit?", "Selbstverständlich – Skitaschen transportieren wir kostenlos, bis 4 Stück pro Fahrzeug. Bitte bei der Buchung angeben."],
      ],
    },
    en: {
      intro: [
        "To the Engadin without changing trains: our long-distance transfer takes you from Zurich Airport to St. Moritz in a good 4 hours – via the Julier Pass or the Vereina car shuttle, depending on weather and season. Your chauffeur knows both options and picks the most reliable one.",
        "Whether it's ski season with full equipment or summer at 1,800 metres: you travel in a winter-equipped Mercedes, your luggage rides along, and you arrive right at your hotel door – from Badrutt's Palace to a holiday flat in Celerina.",
      ],
      aboutTitle: "About St. Moritz",
      about:
        "The birthplace of winter tourism shines with its champagne climate, the frozen lake hosting White Turf and polo, glacier panoramas at Diavolezza and the UNESCO-listed Bernina railway line. In summer, sailing, hiking and the famous Engadin light that inspired painters like Segantini take over.",
      faq: [
        ["How long does the transfer to St. Moritz take?", "Plan around 4 hours 15 minutes for the roughly 213 km. In winter the route may use the Vereina car shuttle – your driver decides based on conditions."],
        ["How much is the Zurich–St. Moritz ride?", "From CHF 638.00 in Business Class – a fixed price per vehicle including passes, vignette and VAT."],
        ["Are the roads safe in winter?", "Yes. Our vehicles run full winter tyres and our drivers are alpine-experienced. In critical weather we switch to the car shuttle."],
        ["Do you carry ski and snowboard luggage?", "Of course – ski bags travel free, up to 4 per vehicle. Please state them when booking."],
      ],
    },
  },

  "zurich-airport-to-zermatt": {
    de: {
      intro: [
        "Zermatt ist autofrei – und genau deshalb ist der private Transfer die komfortabelste Anreise: Wir fahren Sie in rund 4 Stunden 45 Minuten vom Flughafen Zürich bis zum Terminal in Täsch, von wo Sie in 12 Minuten mit dem Zermatt-Shuttle-Zug oder einem Elektrotaxi ins Dorf gelangen. Auf Wunsch organisieren wir den Anschluss gleich mit.",
        "Statt dreimal Umsteigen mit Skigepäck geniessen Sie eine durchgehende Fahrt durchs Rhonetal – mit Pausen nach Wunsch und einem Fahrer, der Ihr Gepäck bis zur Bahn trägt.",
      ],
      aboutTitle: "Über Zermatt",
      about:
        "Am Fuss des Matterhorns liegt das berühmteste Bergdorf der Welt: 360 Pistenkilometer bis auf 3'883 Meter (Klein Matterhorn), Gornergrat-Bahn mit Gletscherblick, Gourmet-Dichte wie in einer Grossstadt – und dank Autofreiheit eine Bergluft, die man riecht, sobald man aussteigt.",
      faq: [
        ["Fahren Sie direkt bis nach Zermatt?", "Zermatt ist autofrei – wir bringen Sie bis zum Matterhorn Terminal Täsch (5 km vor Zermatt). Von dort fährt alle 20 Minuten der Shuttle-Zug ins Dorf; Elektrotaxis stehen ebenfalls bereit."],
        ["Wie lange dauert der Transfer?", "Rund 4 Stunden 45 Minuten für die 237 km via Rhonetal – deutlich entspannter als die Bahnverbindung mit mehrfachem Umsteigen."],
        ["Was kostet die Fahrt nach Zermatt/Täsch?", "Ab CHF 711.00 in der Business Class – Festpreis pro Fahrzeug, inkl. MwSt. und Gepäck."],
        ["Lohnt sich der Transfer gegenüber dem Zug?", "Zu viert mit Wintersportgepäck: fast immer. Tür-zu-Terminal, keine Umstiege, Abfahrt wann Sie wollen – auch nachts."],
      ],
    },
    en: {
      intro: [
        "Zermatt is car-free – which is exactly why a private transfer is the most comfortable way in: we drive you from Zurich Airport to the terminal in Täsch in around 4 hours 45 minutes, from where the Zermatt shuttle train or an electro-taxi takes you into the village in 12 minutes. On request we arrange that connection too.",
        "Instead of changing trains three times with ski luggage, you enjoy one continuous drive through the Rhone valley – with breaks whenever you wish and a driver who carries your bags to the train.",
      ],
      aboutTitle: "About Zermatt",
      about:
        "At the foot of the Matterhorn lies the world's most famous mountain village: 360 km of pistes reaching 3,883 m (Klein Matterhorn), the Gornergrat railway with glacier views, big-city gourmet density – and thanks to the car ban, mountain air you can smell the moment you step out.",
      faq: [
        ["Do you drive directly into Zermatt?", "Zermatt is car-free – we take you to the Matterhorn Terminal in Täsch (5 km before Zermatt). A shuttle train runs to the village every 20 minutes; electro-taxis are available too."],
        ["How long does the transfer take?", "Around 4 hours 45 minutes for the 237 km via the Rhone valley – far more relaxed than the rail connection with multiple changes."],
        ["How much is the ride to Zermatt/Täsch?", "From CHF 711.00 in Business Class – a fixed price per vehicle incl. VAT and luggage."],
        ["Is the transfer worth it versus the train?", "With four people and winter-sports luggage: almost always. Door-to-terminal, no changes, departure whenever you want – even at night."],
      ],
    },
  },

  "zurich-airport-to-davos": {
    de: {
      intro: [
        "Die höchstgelegene Stadt Europas erreichen Sie mit uns in rund 3 Stunden 15 Minuten ab Flughafen Zürich – über die A3/A13 und den Wolfgangpass direkt ins Landwassertal. Kein Umsteigen in Landquart, kein Warten auf die Rhätische Bahn.",
        "Davos ist Kongress- und Sportstadt zugleich: Wir fahren WEF-Delegationen ebenso wie Familien auf dem Weg zu Parsenn und Jakobshorn – diskret, pünktlich und mit Platz für Ski, Rollkoffer und Laptoptaschen.",
      ],
      aboutTitle: "Über Davos",
      about:
        "Auf 1'560 Metern vereint Davos alpinen Grossstadtcharakter mit legendären Skigebieten: Parsenn mit der Weissfluh, das freeride-berühmte Jakobshorn, dazu Langlaufloipen, das grösste Natureisfeld Europas und im Januar das Weltwirtschaftsforum. Die Schatzalp erinnert an Thomas Manns «Zauberberg».",
      faq: [
        ["Wie lange dauert der Transfer nach Davos?", "Rund 3 Stunden 15 Minuten für 161 km – je nach Verkehr auf der A3 am Walensee."],
        ["Was kostet die Fahrt Zürich–Davos?", "Ab CHF 484.50 in der Business Class, Festpreis pro Fahrzeug – auch während des WEF ohne Zuschlag."],
        ["Fahren Sie auch nach Klosters?", "Ja, Klosters liegt auf der Route – nennen Sie bei der Buchung einfach Ihre Zieladresse."],
        ["Sind Transfers während des WEF möglich?", "Ja, mit frühzeitiger Buchung. Unsere Fahrer kennen die Sicherheitszonen und Umleitungen während der Forumswoche."],
      ],
    },
    en: {
      intro: [
        "Europe's highest town is around 3 hours 15 minutes from Zurich Airport with us – via the A3/A13 and the Wolfgang Pass straight into the Landwasser valley. No changing in Landquart, no waiting for the Rhaetian Railway.",
        "Davos is a congress and sports town in one: we drive WEF delegations as well as families heading for Parsenn and Jakobshorn – discreet, punctual and with room for skis, trolleys and laptop bags.",
      ],
      aboutTitle: "About Davos",
      about:
        "At 1,560 m, Davos combines an alpine city feel with legendary ski areas: Parsenn with the Weissfluh, freeride-famous Jakobshorn, plus cross-country trails, Europe's largest natural ice rink and, each January, the World Economic Forum. The Schatzalp still echoes Thomas Mann's 'Magic Mountain'.",
      faq: [
        ["How long does the transfer to Davos take?", "Around 3 hours 15 minutes for 161 km – depending on traffic along Lake Walen on the A3."],
        ["How much is the Zurich–Davos ride?", "From CHF 484.50 in Business Class, fixed per vehicle – no surcharge even during the WEF."],
        ["Do you also serve Klosters?", "Yes, Klosters is on the way – simply state your exact address when booking."],
        ["Are transfers possible during the WEF?", "Yes, with early booking. Our drivers know the security zones and diversions during forum week."],
      ],
    },
  },

  "zurich-airport-to-lausanne": {
    de: {
      intro: [
        "Vom Flughafen Zürich an den Genfersee: In rund 4 Stunden 20 Minuten bringt Sie Ihr Chauffeur nach Lausanne – die Olympia-Hauptstadt an den Hängen über dem Lac Léman. Ideal für Geschäftstermine bei IOC und Verbänden, Studienbeginn an EPFL oder UNIL oder den Start einer Lavaux-Reise.",
        "Die Direktfahrt über die A1 wird zur produktiven Bürozeit oder zum ruhigen Übergang in die Romandie – mit Pausen nach Wunsch und Abholung direkt am Gate.",
      ],
      aboutTitle: "Über Lausanne",
      about:
        "Lausanne steigt in Terrassen vom See zur gotischen Kathedrale hinauf: Olympisches Museum in Ouchy, das lebendige Quartier Flon, Metro statt Tram (die einzige der Schweiz) – und vor der Haustür die UNESCO-Weinterrassen des Lavaux mit Blick auf die Savoyer Alpen.",
      faq: [
        ["Wie lange dauert der Transfer nach Lausanne?", "Rund 4 Stunden 20 Minuten für 215 km über die A1 – mit Pausen nach Ihren Wünschen."],
        ["Was kostet die Fahrt Zürich–Lausanne?", "Ab CHF 646.50 in der Business Class – Festpreis pro Fahrzeug, oft günstiger als mehrere 1.-Klasse-Billette."],
        ["Fahren Sie auch nach Ouchy oder ins Lavaux?", "Ja, wir bringen Sie an jede Adresse – auch zu Weingütern in Epesses, Rivaz oder St-Saphorin."],
        ["Ist der Rücktransfer zum Flughafen buchbar?", "Ja, jede Strecke fahren wir in beide Richtungen zum gleichen Festpreis."],
      ],
    },
    en: {
      intro: [
        "From Zurich Airport to Lake Geneva: your chauffeur takes you to Lausanne in around 4 hours 20 minutes – the Olympic capital rising above Lac Léman. Ideal for meetings at the IOC and federations, starting a semester at EPFL or UNIL, or the beginning of a Lavaux wine trip.",
        "The direct drive along the A1 becomes productive office time or a calm transition into French-speaking Switzerland – with breaks on request and pickup right at the gate.",
      ],
      aboutTitle: "About Lausanne",
      about:
        "Lausanne climbs in terraces from the lake to its Gothic cathedral: the Olympic Museum in Ouchy, the lively Flon district, a metro instead of trams (Switzerland's only one) – and on the doorstep, the UNESCO wine terraces of Lavaux facing the Savoy Alps.",
      faq: [
        ["How long does the transfer to Lausanne take?", "Around 4 hours 20 minutes for 215 km via the A1 – with breaks whenever you wish."],
        ["How much is the Zurich–Lausanne ride?", "From CHF 646.50 in Business Class – a fixed price per vehicle, often cheaper than several first-class rail tickets."],
        ["Do you also drive to Ouchy or the Lavaux?", "Yes, we take you to any address – including wineries in Epesses, Rivaz or St-Saphorin."],
        ["Can I book the return to the airport?", "Yes, every route runs both ways at the same fixed price."],
      ],
    },
  },

  "zurich-airport-to-montreux": {
    de: {
      intro: [
        "An die Schweizer Riviera in einem Zug – dem Ihres Chauffeurs: Rund 4 Stunden 50 Minuten dauert die Fahrt vom Flughafen Zürich nach Montreux, wo Palmen, Belle-Époque-Hotels und die mildeste Luft des Landes warten.",
        "Ob Jazz Festival im Juli, ein Aufenthalt im Montreux Palace oder der Besuch des Schlosses Chillon: Sie reisen ohne Umsteigen, Ihr Gepäck bleibt im Kofferraum, und die letzte Etappe dem See entlang gehört zu den schönsten Ankünften der Schweiz.",
      ],
      aboutTitle: "Über Montreux",
      about:
        "Montreux schmiegt sich zwischen Weinberge und Genfersee: die Uferpromenade mit Freddie-Mercury-Statue, das weltberühmte Jazz Festival, das Wasserschloss Chillon und die GoldenPass-Linie in die Berge. Dank Mikroklima gedeihen hier Palmen und Zypressen – Riviera-Gefühl mit Alpenblick.",
      faq: [
        ["Wie lange dauert der Transfer nach Montreux?", "Etwa 4 Stunden 50 Minuten für 243 km – die Schlussetappe führt malerisch dem Genfersee entlang."],
        ["Was kostet die Fahrt Zürich–Montreux?", "Ab CHF 730.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Gibt es Transfers während des Jazz Festivals?", "Ja – buchen Sie früh, die Festivalwochen sind stark nachgefragt. Der Festpreis bleibt unverändert."],
        ["Können wir am Schloss Chillon halten?", "Ein Fotostopp ist nach Absprache möglich; für eine Besichtigung empfehlen wir unseren stundenweisen Service."],
      ],
    },
    en: {
      intro: [
        "To the Swiss Riviera in one go – your chauffeur's: the drive from Zurich Airport to Montreux takes around 4 hours 50 minutes, where palm trees, Belle Époque hotels and the country's mildest air await.",
        "Whether it's the Jazz Festival in July, a stay at the Montreux Palace or a visit to Chillon Castle: you travel without changing, your luggage stays in the boot, and the final stretch along the lake is one of Switzerland's most beautiful arrivals.",
      ],
      aboutTitle: "About Montreux",
      about:
        "Montreux nestles between vineyards and Lake Geneva: the lakeside promenade with the Freddie Mercury statue, the world-famous Jazz Festival, the water castle of Chillon and the GoldenPass line into the mountains. A microclimate lets palms and cypresses thrive – Riviera feeling with an Alpine backdrop.",
      faq: [
        ["How long does the transfer to Montreux take?", "About 4 hours 50 minutes for 243 km – the final stretch runs scenically along Lake Geneva."],
        ["How much is the Zurich–Montreux ride?", "From CHF 730.50 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you run transfers during the Jazz Festival?", "Yes – book early, festival weeks are in high demand. The fixed price stays the same."],
        ["Can we stop at Chillon Castle?", "A photo stop is possible by arrangement; for a full visit we recommend our hourly service."],
      ],
    },
  },

  "zurich-airport-to-lugano": {
    de: {
      intro: [
        "Durch den Gotthard in die Sonnenstube: Unser Transfer bringt Sie in rund 4 Stunden 10 Minuten vom Flughafen Zürich nach Lugano – durch den längsten Strassentunnel der Alpen direkt ans mediterrane Seeufer des Tessins.",
        "Palmen statt Tannen, Piazza statt Perron: Wer im Süden ankommt, will nicht mit Koffern umsteigen. Ihr Fahrer bringt Sie bis vor das Hotel am Ceresio – oder weiter nach Morcote, Ascona und an jeden Ort im Tessin.",
      ],
      aboutTitle: "Über Lugano",
      about:
        "Die grösste Stadt des Tessins verbindet Schweizer Verlässlichkeit mit italienischem Lebensgefühl: Arkaden und Piazze der Altstadt, die Seepromenade zum Parco Ciani, Aussichtsberge Monte Brè und San Salvatore und das Dolce Vita der Grotti, in denen Merlot und Polenta serviert werden.",
      faq: [
        ["Wie lange dauert der Transfer nach Lugano?", "Rund 4 Stunden 10 Minuten für 210 km. Vor Feiertagen kann der Gotthard Wartezeiten haben – Ihr Fahrer kalkuliert das ein oder weicht via San Bernardino aus."],
        ["Was kostet die Fahrt Zürich–Lugano?", "Ab CHF 630.50 in der Business Class – Festpreis pro Fahrzeug, Tunnel und Vignette inklusive."],
        ["Fahren Sie auch nach Ascona, Morcote oder Como?", "Ja – das ganze Tessin und auf Anfrage auch grenznahe Ziele in Italien. Nennen Sie einfach Ihre Adresse."],
        ["Was passiert bei Stau am Gotthard?", "Der Festpreis gilt unabhängig von der Fahrzeit. Bei absehbarem Stau wählt Ihr Fahrer die Ausweichroute über den San Bernardino."],
      ],
    },
    en: {
      intro: [
        "Through the Gotthard into Switzerland's sun lounge: our transfer takes you from Zurich Airport to Lugano in around 4 hours 10 minutes – through the Alps' longest road tunnel straight to Ticino's Mediterranean lakeside.",
        "Palms instead of pines, piazza instead of platform: arriving in the south, nobody wants to change trains with suitcases. Your driver takes you right to your hotel on Lake Lugano – or on to Morcote, Ascona and anywhere in Ticino.",
      ],
      aboutTitle: "About Lugano",
      about:
        "Ticino's largest city pairs Swiss reliability with Italian lifestyle: arcades and piazzas in the old town, the lakeside walk to Parco Ciani, panoramic peaks Monte Brè and San Salvatore, and the dolce vita of grotti serving Merlot and polenta.",
      faq: [
        ["How long does the transfer to Lugano take?", "Around 4 hours 10 minutes for 210 km. Before holidays the Gotthard can jam – your driver plans for it or diverts via the San Bernardino."],
        ["How much is the Zurich–Lugano ride?", "From CHF 630.50 in Business Class – a fixed price per vehicle, tunnel and vignette included."],
        ["Do you also drive to Ascona, Morcote or Como?", "Yes – all of Ticino and, on request, nearby destinations in Italy. Just state your address."],
        ["What if there's a Gotthard traffic jam?", "The fixed price applies regardless of duration. If a jam is foreseeable, your driver takes the San Bernardino alternative."],
      ],
    },
  },

  "zurich-airport-to-grindelwald": {
    de: {
      intro: [
        "Unter die Eiger-Nordwand in knapp 3 Stunden: Unser Transfer verbindet den Flughafen Zürich direkt mit Grindelwald – ohne die drei Umstiege der Bahnverbindung, dafür mit Brünig-Panorama und Gepäck, das im Kofferraum bleibt.",
        "Grindelwald ist der aktivste Ort der Jungfrau-Region: Vom Terminal schweben Sie mit dem Eiger Express in 15 Minuten Richtung Jungfraujoch. Wir setzen Sie wahlweise am Hotel, an der Talstation oder bei Ihrem Chalet ab.",
      ],
      aboutTitle: "Über Grindelwald",
      about:
        "Das Gletscherdorf liegt spektakulär unter Eiger, Wetterhorn und Schreckhorn: Eiger Express und Jungfraubahn zum «Top of Europe», der First mit Cliff Walk und Trottibike-Abfahrten, im Winter 160 Pistenkilometer der Region – und im Sommer die vielleicht berühmteste Wanderkulisse der Alpen.",
      faq: [
        ["Wie lange dauert der Transfer nach Grindelwald?", "Rund 2 Stunden 50 Minuten für 142 km – via Luzern und Brünigpass oder via Bern, je nach Verkehr."],
        ["Was kostet die Fahrt Zürich–Grindelwald?", "Ab CHF 425.00 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Bringen Sie uns zum Eiger-Express-Terminal?", "Ja, gerne direkt zur Talstation des Grindelwald Terminals – ideal für die Weiterreise aufs Jungfraujoch oder nach Mürren."],
        ["Transportieren Sie Ski- und Wandergepäck?", "Skitaschen kostenlos (max. 4), sperriges Gepäck nach Absprache. Für Familien empfiehlt sich die V-Klasse mit 7 Gepäckplätzen."],
      ],
    },
    en: {
      intro: [
        "Beneath the Eiger north face in just under 3 hours: our transfer connects Zurich Airport directly with Grindelwald – skipping the rail route's three changes, adding Brünig scenery, with luggage that stays in the boot.",
        "Grindelwald is the most active base in the Jungfrau region: from the terminal, the Eiger Express floats you towards the Jungfraujoch in 15 minutes. We drop you at your hotel, the valley station or your chalet – your choice.",
      ],
      aboutTitle: "About Grindelwald",
      about:
        "The glacier village sits spectacularly beneath Eiger, Wetterhorn and Schreckhorn: Eiger Express and Jungfrau Railway to the 'Top of Europe', the First with its Cliff Walk and trotti-bike descents, 160 km of regional pistes in winter – and in summer, perhaps the most famous hiking backdrop in the Alps.",
      faq: [
        ["How long does the transfer to Grindelwald take?", "Around 2 hours 50 minutes for 142 km – via Lucerne and the Brünig Pass or via Bern, depending on traffic."],
        ["How much is the Zurich–Grindelwald ride?", "From CHF 425.00 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Can you take us to the Eiger Express terminal?", "Yes, happily straight to the Grindelwald Terminal valley station – ideal for continuing to the Jungfraujoch or Mürren."],
        ["Do you carry ski and hiking luggage?", "Ski bags free of charge (max. 4); bulky items by arrangement. For families, the V-Class with 7 luggage spaces is ideal."],
      ],
    },
  },

  "zurich-airport-to-verbier": {
    de: {
      intro: [
        "Ins Herz der 4 Vallées in einer Fahrt: Rund 5 Stunden 25 Minuten trennen den Flughafen Zürich von Verbier – wir überbrücken sie mit einer komfortablen Direktfahrt durchs Rhonetal und die Serpentinen ab Le Châble hinauf ins Dorf auf 1'500 Metern.",
        "Gerade zur Skisaison ist die Anreise per Bahn mit Umstieg auf die Gondel in Le Châble mühsam – wir fahren Sie mit kompletter Ausrüstung bis vor Ihr Chalet oder Hotel, auch spätabends nach dem letzten Flug.",
      ],
      aboutTitle: "Über Verbier",
      about:
        "Verbier ist die Freeride-Hauptstadt der Alpen: Hausberg des Xtreme Verbier auf dem Bec des Rosses, 410 Pistenkilometer der 4 Vallées bis zum Mont Fort auf 3'330 Metern, dazu ein internationales Publikum, das Après-Ski im Farinet ebenso schätzt wie das Klassikfestival im Sommer.",
      faq: [
        ["Wie lange dauert der Transfer nach Verbier?", "Rund 5 Stunden 25 Minuten für 270 km – inklusive der Bergstrasse ab Le Châble. Im Winter fahren wir mit voller Winterausrüstung."],
        ["Was kostet die Fahrt Zürich–Verbier?", "Ab CHF 809.50 in der Business Class – Festpreis pro Fahrzeug, unabhängig von Saison und Uhrzeit."],
        ["Fahren Sie bis ins Dorf hinauf?", "Ja, direkt bis zu Ihrer Unterkunft in Verbier – kein Umsteigen auf die Gondel in Le Châble nötig."],
        ["Nehmen Sie Ski- und Freeride-Ausrüstung mit?", "Selbstverständlich, kostenlos bis 4 Skitaschen. Für Gruppen mit viel Material empfehlen wir die V-Klasse."],
      ],
    },
    en: {
      intro: [
        "Into the heart of the 4 Vallées in one drive: around 5 hours 25 minutes separate Zurich Airport from Verbier – we bridge them with a comfortable direct ride through the Rhone valley and up the hairpins from Le Châble to the village at 1,500 m.",
        "Especially in ski season, the rail route with a gondola change in Le Châble is tedious – we drive you with full equipment right to your chalet or hotel, even late at night after the last flight.",
      ],
      aboutTitle: "About Verbier",
      about:
        "Verbier is the freeride capital of the Alps: home mountain of the Xtreme Verbier on the Bec des Rosses, 410 km of 4 Vallées pistes up to Mont Fort at 3,330 m, plus an international crowd that loves après-ski at the Farinet as much as the classical music festival in summer.",
      faq: [
        ["How long does the transfer to Verbier take?", "Around 5 hours 25 minutes for 270 km – including the mountain road from Le Châble. In winter we run full winter equipment."],
        ["How much is the Zurich–Verbier ride?", "From CHF 809.50 in Business Class – a fixed price per vehicle, regardless of season or time of day."],
        ["Do you drive all the way up to the village?", "Yes, straight to your accommodation in Verbier – no gondola change in Le Châble required."],
        ["Do you carry ski and freeride gear?", "Of course, free of charge up to 4 ski bags. For groups with lots of kit we recommend the V-Class."],
      ],
    },
  },

  "zurich-airport-to-wengen": {
    de: {
      intro: [
        "Wengen ist autofrei – die eleganteste Anreise führt deshalb über uns: In rund 2 Stunden 40 Minuten fahren wir Sie vom Flughafen Zürich zur Talstation Lauterbrunnen, wo die Wengernalpbahn übernimmt und Sie in 14 Minuten auf die Sonnenterrasse hinaufbringt.",
        "Ihr Fahrer hilft beim Umladen direkt an der Bahn – mit Ski, Kinderwagen und Koffern deutlich entspannter als dreimal Umsteigen ab Zürich HB. Auf Wunsch koordinieren wir die Abfahrt mit dem Bahnfahrplan.",
      ],
      aboutTitle: "Über Wengen",
      about:
        "Auf einer Sonnenterrasse 400 Meter über dem Lauterbrunnental liegt das autofreie Wengen: Austragungsort des legendären Lauberhorn-Rennens, Station der Bahn Richtung Kleine Scheidegg und Jungfraujoch, mit nostalgischen Hotels aus der Belle Époque und einem Panorama auf Eiger, Mönch und Jungfrau, das seit 130 Jahren Gäste verzaubert.",
      faq: [
        ["Fahren Sie direkt nach Wengen?", "Wengen ist autofrei – wir bringen Sie zur Talstation Lauterbrunnen (Parkhaus/Bahnhof). Von dort fährt die Wengernalpbahn alle 30 Minuten in 14 Minuten hinauf."],
        ["Wie lange dauert der Transfer?", "Rund 2 Stunden 40 Minuten bis Lauterbrunnen für 133 km – plus die kurze Bahnfahrt nach Wengen."],
        ["Was kostet die Fahrt?", "Ab CHF 400.50 in der Business Class – Festpreis pro Fahrzeug bis Lauterbrunnen, inkl. Gepäckservice bis zur Bahn."],
        ["Klappt das auch zum Lauberhorn-Rennen?", "Ja, mit früher Buchung. An den Rennwochenenden planen wir zusätzliche Pufferzeit für die Anfahrt ein."],
      ],
    },
    en: {
      intro: [
        "Wengen is car-free – so the most elegant approach is with us: in around 2 hours 40 minutes we drive you from Zurich Airport to the Lauterbrunnen valley station, where the Wengernalp railway takes over and lifts you to the sun terrace in 14 minutes.",
        "Your driver helps you transfer luggage right at the train – far more relaxed with skis, prams and suitcases than three changes from Zurich main station. On request we time the departure to the railway schedule.",
      ],
      aboutTitle: "About Wengen",
      about:
        "On a sun terrace 400 m above the Lauterbrunnen valley lies car-free Wengen: host of the legendary Lauberhorn downhill, a stop on the railway towards Kleine Scheidegg and the Jungfraujoch, with nostalgic Belle Époque hotels and a panorama of Eiger, Mönch and Jungfrau that has enchanted guests for 130 years.",
      faq: [
        ["Do you drive directly to Wengen?", "Wengen is car-free – we take you to the Lauterbrunnen valley station (car park/rail station). From there the Wengernalp railway runs up every 30 minutes, taking 14 minutes."],
        ["How long does the transfer take?", "Around 2 hours 40 minutes to Lauterbrunnen for 133 km – plus the short train ride to Wengen."],
        ["How much does the ride cost?", "From CHF 400.50 in Business Class – a fixed price per vehicle to Lauterbrunnen, incl. luggage service to the train."],
        ["Does this work for the Lauberhorn race weekend?", "Yes, with early booking. On race weekends we plan extra buffer time for the approach."],
      ],
    },
  },

  "zurich-airport-to-st-gallen": {
    de: {
      intro: [
        "In die Ostschweiz in gut anderthalb Stunden: Unser Transfer verbindet den Flughafen Zürich direkt mit St. Gallen – über die A1 an Winterthur und Wil vorbei, ohne Umsteigen und ohne Gedränge im Intercity.",
        "Ob Termin bei einem der Textil- und Technologieunternehmen, Besuch der Universität oder Auftakt einer Bodensee-Reise: Ihr Fahrer setzt Sie punktgenau ab – auch in der autoarmen Altstadt so nah wie möglich am Ziel.",
      ],
      aboutTitle: "Über St. Gallen",
      about:
        "Das Herzstück St. Gallens ist Weltkulturerbe: Der barocke Stiftsbezirk mit der berühmten Stiftsbibliothek und ihren 170'000 Bänden zählt zu den schönsten Bibliothekssälen der Welt. Dazu kommen die erkerreiche Altstadt, die rote «Stadtlounge» von Pipilotti Rist und die Nähe zu Appenzell und Bodensee.",
      faq: [
        ["Wie lange dauert der Transfer nach St. Gallen?", "Rund 1 Stunde 37 Minuten für 81 km über die A1 – zu Stosszeiten mit etwas Puffer."],
        ["Was kostet die Fahrt Zürich–St. Gallen?", "Ab CHF 243.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie auch an den Bodensee oder nach Appenzell?", "Ja, Rorschach, Arbon, Appenzell und weitere Ziele der Ostschweiz bedienen wir gerne – fragen Sie einfach an."],
        ["Gibt es Rückfahrten am selben Tag?", "Ja, für Tagestermine koordinieren wir Hin- und Rückfahrt oder Ihr Fahrer wartet vor Ort (stundenweiser Service)."],
      ],
    },
    en: {
      intro: [
        "Into eastern Switzerland in a good hour and a half: our transfer links Zurich Airport directly with St. Gallen – along the A1 past Winterthur and Wil, with no changes and no crowded intercity.",
        "Whether it's a meeting at one of the textile and tech companies, a visit to the university or the start of a Lake Constance trip: your driver drops you precisely – even in the largely car-free old town, as close to your destination as possible.",
      ],
      aboutTitle: "About St. Gallen",
      about:
        "St. Gallen's heart is a World Heritage Site: the baroque Abbey District with its famous library of 170,000 volumes ranks among the most beautiful library halls on earth. Add the oriel-studded old town, Pipilotti Rist's red 'City Lounge' and easy reach of Appenzell and Lake Constance.",
      faq: [
        ["How long does the transfer to St. Gallen take?", "Around 1 hour 37 minutes for 81 km via the A1 – with a little buffer at rush hour."],
        ["How much is the Zurich–St. Gallen ride?", "From CHF 243.50 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you also serve Lake Constance or Appenzell?", "Yes, Rorschach, Arbon, Appenzell and other eastern-Swiss destinations – just ask."],
        ["Same-day returns possible?", "Yes, for day appointments we coordinate outbound and return, or your driver waits on site (hourly service)."],
      ],
    },
  },

  "zurich-airport-to-chur": {
    de: {
      intro: [
        "In die älteste Stadt der Schweiz: Rund 2 Stunden 45 Minuten dauert die Fahrt vom Flughafen Zürich nach Chur – der A3 entlang des Walensees folgend, eine der schönsten Autobahnstrecken des Landes.",
        "Chur ist das Tor zu Graubünden: Von hier starten Glacier- und Bernina Express, die Wege nach Arosa, Lenzerheide und Flims. Wir bringen Sie zum Bahnhof, ins Hotel oder gleich weiter in Ihre Feriendestination.",
      ],
      aboutTitle: "Über Chur",
      about:
        "Seit über 5'000 Jahren besiedelt, überrascht Chur mit einer mediterran anmutenden Altstadt, der Kathedrale im Hof, Torkeln und Weinbergen am Stadtrand – und dem Hausberg Brambrüesch, den man direkt aus der Altstadt per Bahn erreicht. Bündner Gerstensuppe und Capuns inklusive.",
      faq: [
        ["Wie lange dauert der Transfer nach Chur?", "Rund 2 Stunden 45 Minuten für 135 km über die A3/A13 – mit Walensee-Panorama unterwegs."],
        ["Was kostet die Fahrt Zürich–Chur?", "Ab CHF 406.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie auch nach Arosa, Lenzerheide oder Flims?", "Ja, alle Bündner Destinationen auf Anfrage – nennen Sie Ihr Ziel, wir nennen den Festpreis."],
        ["Erreichen wir den Glacier Express?", "Ja, wir koordinieren die Ankunft am Bahnhof Chur gerne mit Ihrer Zugverbindung – inklusive Zeitpuffer."],
      ],
    },
    en: {
      intro: [
        "To Switzerland's oldest town: the drive from Zurich Airport to Chur takes around 2 hours 45 minutes – following the A3 along Lake Walen, one of the country's most scenic motorway stretches.",
        "Chur is the gateway to Graubünden: the Glacier and Bernina Express depart here, as do the roads to Arosa, Lenzerheide and Flims. We take you to the station, your hotel or straight on to your holiday destination.",
      ],
      aboutTitle: "About Chur",
      about:
        "Settled for over 5,000 years, Chur surprises with an almost Mediterranean old town, the cathedral in its court, wine presses and vineyards at the town's edge – and its home mountain Brambrüesch, reached by cable car straight from the old town. Grisons barley soup and capuns included.",
      faq: [
        ["How long does the transfer to Chur take?", "Around 2 hours 45 minutes for 135 km via the A3/A13 – with Lake Walen views on the way."],
        ["How much is the Zurich–Chur ride?", "From CHF 406.50 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you also serve Arosa, Lenzerheide or Flims?", "Yes, all Graubünden destinations on request – name your destination and we'll name the fixed price."],
        ["Will we make the Glacier Express?", "Yes, we happily coordinate arrival at Chur station with your train connection – buffer included."],
      ],
    },
  },

  "zurich-airport-to-winterthur": {
    de: {
      intro: [
        "Die kürzeste Strecke in unserem Programm – und oft die dankbarste: In gut 35 Minuten bringt Sie Ihr Chauffeur vom Flughafen Zürich nach Winterthur, Tür zu Tür und ohne Umweg über den Hauptbahnhof.",
        "Gerade mit Gepäck, nach Nachtflügen oder für Termine im Technopark schlägt die Direktfahrt jede S-Bahn-Verbindung: Abholung am Gate, Festpreis, und Sie sind vor Ort, bevor andere ihr Billett gelöst haben.",
      ],
      aboutTitle: "Über Winterthur",
      about:
        "Die sechstgrösste Stadt der Schweiz ist heimliche Kulturhauptstadt: Sammlung Oskar Reinhart und Kunst Museum, das Fotomuseum im alten Industriequartier, dazu die grösste Fussgänger-Altstadt des Landes und das Technorama in Sichtweite – Industriegeschichte, die zu Museen, Lofts und Musikclubs wurde.",
      faq: [
        ["Wie lange dauert der Transfer nach Winterthur?", "Nur rund 35 Minuten für 30 km – je nach Verkehr auf der A1."],
        ["Was kostet die Fahrt Flughafen–Winterthur?", "Ab CHF 88.90 in der Business Class – Festpreis pro Fahrzeug, keine Zuschläge zu Randzeiten."],
        ["Lohnt sich das gegenüber der S-Bahn?", "Mit Gepäck, zu zweit oder mit knappem Zeitplan: ja. Tür zu Tür sind Sie meist schneller als mit Umsteigen am Flughafenbahnhof."],
        ["Fahren Sie auch früh morgens zum Flughafen?", "Rund um die Uhr – die Strecke ist bei Frühabflügen ab Winterthur besonders gefragt."],
      ],
    },
    en: {
      intro: [
        "The shortest route in our programme – and often the most rewarding: in a good 35 minutes your chauffeur takes you from Zurich Airport to Winterthur, door to door and without detouring via the main station.",
        "Especially with luggage, after night flights or for meetings at the Technopark, the direct drive beats any S-Bahn connection: pickup at the gate, fixed price, and you're there before others have bought their ticket.",
      ],
      aboutTitle: "About Winterthur",
      about:
        "Switzerland's sixth-largest city is a secret culture capital: the Oskar Reinhart collection and Kunst Museum, the photography museum in the old industrial quarter, the country's largest pedestrian old town and the Technorama nearby – industrial history reborn as museums, lofts and music clubs.",
      faq: [
        ["How long does the transfer to Winterthur take?", "Only around 35 minutes for 30 km – depending on A1 traffic."],
        ["How much is the airport–Winterthur ride?", "From CHF 88.90 in Business Class – a fixed price per vehicle, no off-peak surcharges."],
        ["Is it worth it versus the S-Bahn?", "With luggage, as a pair or on a tight schedule: yes. Door to door you're usually faster than changing at the airport station."],
        ["Do you also drive to the airport early in the morning?", "Around the clock – this route is especially popular for early departures from Winterthur."],
      ],
    },
  },

  "zurich-airport-to-locarno": {
    de: {
      intro: [
        "An den Lago Maggiore in einer Fahrt: Rund 4 Stunden trennen den Flughafen Zürich von Locarno – durch den Gotthard und die Leventina hinunter ans nördlichste Mittelmeerufer Europas, wie die Einheimischen sagen.",
        "Kamelien statt Koffer schleppen: Wer zum Filmfestival, in die Ferienwohnung in Ascona oder ins Tessiner Grotto reist, geniesst die Direktfahrt mit Pausen nach Wunsch und Ankunft direkt an der Piazza – soweit die Zufahrt es erlaubt.",
      ],
      aboutTitle: "Über Locarno",
      about:
        "Locarno ist die wärmste Stadt der Schweiz: die Piazza Grande mit ihrem Filmfestival im August, die Wallfahrtskirche Madonna del Sasso hoch über dem See, Kamelienpark und Palmenpromenade – und die wilden Täler Verzasca und Maggia mit smaragdgrünen Flussbädern direkt vor der Tür.",
      faq: [
        ["Wie lange dauert der Transfer nach Locarno?", "Rund 4 Stunden für 201 km durch den Gotthard – bei Stau weicht Ihr Fahrer über den San Bernardino aus."],
        ["Was kostet die Fahrt Zürich–Locarno?", "Ab CHF 604.00 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie auch nach Ascona oder ins Verzascatal?", "Ja, das ganze Sopraceneri bedienen wir – auch Ascona, Brissago und die Seitentäler."],
        ["Transfers zum Filmfestival möglich?", "Ja, mit früher Buchung – im August ist Locarno stark ausgelastet, der Festpreis bleibt gleich."],
      ],
    },
    en: {
      intro: [
        "To Lake Maggiore in one drive: around 4 hours separate Zurich Airport from Locarno – through the Gotthard and down the Leventina to what locals call Europe's northernmost Mediterranean shore.",
        "Camellias instead of hauling suitcases: whether you're heading to the film festival, a holiday flat in Ascona or a Ticino grotto, enjoy the direct drive with breaks on request and arrival right by the piazza – as far as access allows.",
      ],
      aboutTitle: "About Locarno",
      about:
        "Locarno is Switzerland's warmest town: the Piazza Grande with its August film festival, the pilgrimage church Madonna del Sasso high above the lake, camellia park and palm-lined promenade – plus the wild Verzasca and Maggia valleys with emerald river pools on the doorstep.",
      faq: [
        ["How long does the transfer to Locarno take?", "Around 4 hours for 201 km through the Gotthard – in case of jams your driver diverts via the San Bernardino."],
        ["How much is the Zurich–Locarno ride?", "From CHF 604.00 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you also drive to Ascona or the Verzasca valley?", "Yes, we serve the whole Sopraceneri – including Ascona, Brissago and the side valleys."],
        ["Transfers for the film festival?", "Yes, with early booking – Locarno fills up in August, but the fixed price stays the same."],
      ],
    },
  },

  "zurich-airport-to-thun": {
    de: {
      intro: [
        "Ans Tor zum Berner Oberland: In rund 2 Stunden 50 Minuten bringt Sie Ihr Chauffeur vom Flughafen Zürich nach Thun – die Stadt mit dem Schloss über der Aare, wo der gleichnamige See beginnt und die Alpenkette zum Greifen nah wirkt.",
        "Thun ist idealer Ausgangspunkt für Seeschifffahrt, Niesen und Stockhorn oder den Weg weiter nach Gstaad und ins Simmental. Wir setzen Sie am Hotel, an der Schifflände oder an jeder Adresse rund um den See ab.",
      ],
      aboutTitle: "Über Thun",
      about:
        "Über der mittelalterlichen Altstadt thront das Schloss Thun mit seinem Rittersaal; unten teilt die Aare die Stadt in Gassen mit Hochtrottoirs – begehbaren zweistöckigen Läden, wie es sie nur hier gibt. Vom Quai starten Schiffe Richtung Spiez, Oberhofen und Interlaken, während Surfer auf der Flusswelle «Mühleschleuse» reiten.",
      faq: [
        ["Wie lange dauert der Transfer nach Thun?", "Rund 2 Stunden 50 Minuten für 142 km – via Bern über die A1/A6."],
        ["Was kostet die Fahrt Zürich–Thun?", "Ab CHF 425.00 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie auch nach Spiez, Oberhofen oder Gunten?", "Ja, alle Orte am Thunersee bedienen wir – geben Sie einfach Ihre Zieladresse an."],
        ["Weiterfahrt nach Gstaad möglich?", "Ja, über das Simmental fahren wir Sie gerne weiter – fragen Sie den Festpreis für Ihre Wunschstrecke an."],
      ],
    },
    en: {
      intro: [
        "To the gateway of the Bernese Oberland: in around 2 hours 50 minutes your chauffeur takes you from Zurich Airport to Thun – the town with the castle above the Aare, where the lake of the same name begins and the Alpine chain feels close enough to touch.",
        "Thun is the ideal base for lake cruises, the Niesen and Stockhorn, or the road on to Gstaad and the Simmental. We drop you at your hotel, the boat landing or any address around the lake.",
      ],
      aboutTitle: "About Thun",
      about:
        "Thun Castle with its knights' hall crowns the medieval old town; below, the Aare splits the town into lanes with 'Hochtrottoirs' – walkable two-storey shopfronts found nowhere else. Boats leave the quay for Spiez, Oberhofen and Interlaken, while surfers ride the standing river wave at the Mühleschleuse.",
      faq: [
        ["How long does the transfer to Thun take?", "Around 2 hours 50 minutes for 142 km – via Bern on the A1/A6."],
        ["How much is the Zurich–Thun ride?", "From CHF 425.00 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you also serve Spiez, Oberhofen or Gunten?", "Yes, all villages around Lake Thun – simply state your destination address."],
        ["Can we continue to Gstaad?", "Yes, we happily drive you on through the Simmental – ask for the fixed price of your preferred route."],
      ],
    },
  },

  "zurich-airport-to-sion": {
    de: {
      intro: [
        "In die Hauptstadt des Wallis: Rund 5 Stunden 25 Minuten dauert die Fahrt vom Flughafen Zürich nach Sion – durchs Rhonetal, vorbei an Rebbergen und den charakteristischen Hügeln Valère und Tourbillon, die die Stadt von weitem ankündigen.",
        "Sion ist Drehscheibe für die Walliser Südtäler: Nach Nendaz, Veysonnaz, Anzère oder ins Val d'Hérens sind es nur noch Minuten. Wir fahren Sie ans Ziel Ihrer Wahl – auch direkt bis in die Skistation.",
      ],
      aboutTitle: "Über Sion",
      about:
        "Über 7'000 Jahre Siedlungsgeschichte machen Sion zu einem der ältesten Orte der Schweiz: die Burghügel Valère mit der ältesten spielbaren Orgel der Welt und Tourbillon, verwinkelte Altstadtgassen, dazu 300 Sonnentage, Walliser Weine wie Fendant und Petite Arvine – und die Viertausender stets am Horizont.",
      faq: [
        ["Wie lange dauert der Transfer nach Sion?", "Rund 5 Stunden 25 Minuten für 271 km – durchs Rhonetal mit Pausen nach Wunsch."],
        ["Was kostet die Fahrt Zürich–Sion?", "Ab CHF 812.00 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie weiter nach Nendaz, Anzère oder Evolène?", "Ja, alle Stationen rund um Sion bedienen wir direkt – nennen Sie Ihre Unterkunft bei der Buchung."],
        ["Gibt es die Strecke auch ab Genf?", "Unser Standard ist ZRH; Transfers ab anderen Flughäfen organisieren wir auf Anfrage gerne."],
      ],
    },
    en: {
      intro: [
        "To the capital of the Valais: the drive from Zurich Airport to Sion takes around 5 hours 25 minutes – through the Rhone valley, past vineyards and the twin hills of Valère and Tourbillon that announce the town from afar.",
        "Sion is the hub for the southern Valais valleys: Nendaz, Veysonnaz, Anzère or the Val d'Hérens are just minutes away. We drive you to the destination of your choice – right into the ski resort if you like.",
      ],
      aboutTitle: "About Sion",
      about:
        "Over 7,000 years of settlement make Sion one of Switzerland's oldest places: the castle hills of Valère – home to the world's oldest playable organ – and Tourbillon, winding old-town lanes, 300 days of sunshine, Valais wines like Fendant and Petite Arvine – and four-thousand-metre peaks always on the horizon.",
      faq: [
        ["How long does the transfer to Sion take?", "Around 5 hours 25 minutes for 271 km – through the Rhone valley with breaks on request."],
        ["How much is the Zurich–Sion ride?", "From CHF 812.00 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you continue to Nendaz, Anzère or Evolène?", "Yes, we serve all resorts around Sion directly – state your accommodation when booking."],
        ["Is this route also available from Geneva?", "Our standard is ZRH; transfers from other airports can gladly be arranged on request."],
      ],
    },
  },

  "zurich-airport-to-bellinzona": {
    de: {
      intro: [
        "Zur Burgenstadt des Tessins: In rund 3 Stunden 40 Minuten bringt Sie unser Transfer vom Flughafen Zürich nach Bellinzona – als erste grosse Station nach dem Gotthard das eigentliche Tor zum Süden.",
        "Wer geschäftlich in der Kantonshauptstadt zu tun hat oder von hier Richtung Lukmanier, Misox oder Lago Maggiore weiterreist, spart sich mit der Direktfahrt Umstiege und Wartezeiten – und gewinnt eine Fahrt durch die schönste Alpenquerung des Landes.",
      ],
      aboutTitle: "Über Bellinzona",
      about:
        "Drei Burgen wachen über Bellinzona – Castelgrande, Montebello und Sasso Corbaro, zusammen UNESCO-Welterbe und das besterhaltene mittelalterliche Wehrensemble der Alpen. Samstags verwandelt der Markt die Altstadt in ein südländisches Fest aus Alpkäse, Brot und Merlot.",
      faq: [
        ["Wie lange dauert der Transfer nach Bellinzona?", "Rund 3 Stunden 40 Minuten für 183 km durch den Gotthardtunnel."],
        ["Was kostet die Fahrt Zürich–Bellinzona?", "Ab CHF 548.00 in der Business Class – Festpreis pro Fahrzeug inkl. Tunnel und Vignette."],
        ["Halten Sie bei den Burgen?", "Ein Fotostopp am Castelgrande ist nach Absprache möglich – für Besichtigungen empfehlen wir den stundenweisen Service."],
        ["Fahren Sie weiter ins Misox oder Bleniotal?", "Ja, alle Tessiner und Südbündner Täler bedienen wir auf Anfrage."],
      ],
    },
    en: {
      intro: [
        "To Ticino's city of castles: our transfer takes you from Zurich Airport to Bellinzona in around 3 hours 40 minutes – the first major stop after the Gotthard and the true gateway to the south.",
        "Whether you have business in the cantonal capital or continue towards the Lukmanier, Misox or Lake Maggiore, the direct drive saves changes and waiting times – and rewards you with the country's most beautiful Alpine crossing.",
      ],
      aboutTitle: "About Bellinzona",
      about:
        "Three castles watch over Bellinzona – Castelgrande, Montebello and Sasso Corbaro, together a UNESCO World Heritage Site and the best-preserved medieval fortification ensemble in the Alps. On Saturdays the market turns the old town into a southern feast of alpine cheese, bread and Merlot.",
      faq: [
        ["How long does the transfer to Bellinzona take?", "Around 3 hours 40 minutes for 183 km through the Gotthard tunnel."],
        ["How much is the Zurich–Bellinzona ride?", "From CHF 548.00 in Business Class – a fixed price per vehicle incl. tunnel and vignette."],
        ["Can we stop at the castles?", "A photo stop at Castelgrande is possible by arrangement – for visits we recommend our hourly service."],
        ["Do you continue into the Misox or Blenio valley?", "Yes, we serve all Ticino and southern Graubünden valleys on request."],
      ],
    },
  },

  "zurich-airport-to-fribourg": {
    de: {
      intro: [
        "In die Zähringerstadt an der Sprachgrenze: Rund 3 Stunden dauert der Transfer vom Flughafen Zürich nach Fribourg – über die A1 direkt in die Stadt, in der man auf einer Strassenseite «Bonjour» und auf der anderen «Grüezi» hört.",
        "Universität, Kantonsverwaltung, Greyerzerland vor der Tür: Wir fahren Studierende zum Semesterstart ebenso wie Delegationen und Feriengäste auf dem Weg nach Gruyères, Charmey oder Schwarzsee.",
      ],
      aboutTitle: "Über Fribourg",
      about:
        "Fribourg besitzt eines der grössten zusammenhängenden mittelalterlichen Stadtbilder Europas: 200 gotische Fassaden über der Saaneschlucht, die Kathedrale St. Nikolaus mit ihrem 76-Meter-Turm, gedeckte Holzbrücken und die steile Standseilbahn, die – einzigartig – mit Abwasser als Ballast fährt.",
      faq: [
        ["Wie lange dauert der Transfer nach Fribourg?", "Rund 3 Stunden für 155 km über die A1 via Bern."],
        ["Was kostet die Fahrt Zürich–Fribourg?", "Ab CHF 464.00 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Fahren Sie weiter nach Gruyères oder Charmey?", "Ja, das ganze Greyerzerland bedienen wir gerne – ideal kombinierbar mit einem Stopp bei der Schaukäserei."],
        ["Setzen Sie in der Unterstadt ab?", "Soweit die engen Gassen es erlauben, ja – ansonsten am nächstmöglichen Punkt mit kurzem Fussweg."],
      ],
    },
    en: {
      intro: [
        "To the Zähringen town on the language border: the transfer from Zurich Airport to Fribourg takes around 3 hours – straight down the A1 into the city where you hear 'Bonjour' on one side of the street and 'Grüezi' on the other.",
        "University, cantonal government, the Gruyère region on the doorstep: we drive students at semester start as well as delegations and holidaymakers heading for Gruyères, Charmey or Schwarzsee.",
      ],
      aboutTitle: "About Fribourg",
      about:
        "Fribourg holds one of Europe's largest intact medieval townscapes: 200 Gothic façades above the Sarine gorge, St. Nicholas Cathedral with its 76-metre tower, covered wooden bridges and a steep funicular that – uniquely – runs on wastewater as ballast.",
      faq: [
        ["How long does the transfer to Fribourg take?", "Around 3 hours for 155 km via Bern on the A1."],
        ["How much is the Zurich–Fribourg ride?", "From CHF 464.00 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Do you continue to Gruyères or Charmey?", "Yes, we gladly serve the whole Gruyère region – ideally combined with a stop at the show dairy."],
        ["Do you drop off in the lower town?", "As far as the narrow lanes allow, yes – otherwise at the nearest point with a short walk."],
      ],
    },
  },

  "zurich-airport-to-schaffhausen": {
    de: {
      intro: [
        "Zur Munot-Stadt am Rheinfall: In knapp einer Stunde bringt Sie Ihr Chauffeur vom Flughafen Zürich nach Schaffhausen – die perfekte Distanz für Geschäftstermine, Heimreisen in den Norden oder den Besuch des grössten Wasserfalls Europas.",
        "Viele Gäste kombinieren den Transfer mit einem Halt am Rheinfall: Ihr Fahrer wartet, während Sie das Tosen vom Schlössli Wörth oder von den Felsplattformen aus erleben – ein Umweg von wenigen Minuten mit maximalem Effekt.",
      ],
      aboutTitle: "Über Schaffhausen",
      about:
        "Über der erkergeschmückten Altstadt thront die kreisrunde Munot-Festung; wenige Kilometer flussabwärts donnert der Rheinfall mit 600'000 Litern pro Sekunde über die Felsen – Europas grösster Wasserfall. Dazu Riesling-Reben am Stadtrand und Rheinschifffahrten bis Stein am Rhein.",
      faq: [
        ["Wie lange dauert der Transfer nach Schaffhausen?", "Rund 1 Stunde für 50 km – je nach Verkehr im Raum Winterthur."],
        ["Was kostet die Fahrt Zürich–Schaffhausen?", "Ab CHF 148.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Können wir am Rheinfall anhalten?", "Ja – ein Fotostopp ist nach Absprache möglich, für längere Besuche empfehlen wir den stundenweisen Service."],
        ["Fahren Sie auch nach Stein am Rhein oder über die Grenze?", "Ja, Stein am Rhein, Neuhausen und grenznahe deutsche Ziele bedienen wir auf Anfrage."],
      ],
    },
    en: {
      intro: [
        "To the Munot town by the Rhine Falls: your chauffeur takes you from Zurich Airport to Schaffhausen in just under an hour – the perfect distance for business meetings, journeys home to the north or a visit to Europe's largest waterfall.",
        "Many guests combine the transfer with a stop at the Rhine Falls: your driver waits while you feel the thunder from Schlössli Wörth or the rock platforms – a detour of minutes with maximum effect.",
      ],
      aboutTitle: "About Schaffhausen",
      about:
        "The circular Munot fortress crowns the oriel-decorated old town; a few kilometres downstream the Rhine Falls thunder over the rocks at 600,000 litres per second – Europe's largest waterfall. Add Riesling vineyards at the town's edge and river cruises to Stein am Rhein.",
      faq: [
        ["How long does the transfer to Schaffhausen take?", "Around 1 hour for 50 km – depending on traffic around Winterthur."],
        ["How much is the Zurich–Schaffhausen ride?", "From CHF 148.50 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Can we stop at the Rhine Falls?", "Yes – a photo stop is possible by arrangement; for longer visits we recommend our hourly service."],
        ["Do you also drive to Stein am Rhein or across the border?", "Yes, Stein am Rhein, Neuhausen and nearby German destinations on request."],
      ],
    },
  },

  "zurich-airport-to-engelberg": {
    de: {
      intro: [
        "Ins Klosterdorf unter dem Titlis: Rund 1 Stunde 55 Minuten dauert der Transfer vom Flughafen Zürich nach Engelberg – via Luzern und durch das enge Engelbergertal hinauf auf 1'000 Meter.",
        "Engelberg ist bei internationalen Gästen besonders beliebt; entsprechend oft fahren wir diese Strecke mit Familien, Ski- und Snowboardgruppen. Ihr Gepäck reist im selben Fahrzeug, und Sie stehen direkt vor Hotel oder Talstation.",
      ],
      aboutTitle: "Über Engelberg",
      about:
        "Seit 1120 prägt das Benediktinerkloster das Dorf – heute mit Schaukäserei im Innenhof. Darüber thront der Titlis (3'238 m) mit der drehbaren Rotair-Gondel, Gletschergrotte und Hängebrücke; die Nordabfahrt Laub gilt unter Freeridern als eine der grossartigsten der Alpen.",
      faq: [
        ["Wie lange dauert der Transfer nach Engelberg?", "Rund 1 Stunde 55 Minuten für 94 km – via Luzern und Stans."],
        ["Was kostet die Fahrt Zürich–Engelberg?", "Ab CHF 282.50 in der Business Class – Festpreis pro Fahrzeug inkl. MwSt."],
        ["Bringen Sie uns zur Titlis-Talstation?", "Ja, gerne direkt zur Talstation Titlis Xpress oder zu jeder anderen Adresse im Dorf."],
        ["Transportieren Sie Wintersportgepäck?", "Skitaschen kostenlos (max. 4 pro Fahrzeug); für Gruppen mit viel Ausrüstung empfehlen wir die V-Klasse."],
      ],
    },
    en: {
      intro: [
        "To the monastery village beneath the Titlis: the transfer from Zurich Airport to Engelberg takes around 1 hour 55 minutes – via Lucerne and up through the narrow Engelberg valley to 1,000 m.",
        "Engelberg is especially popular with international guests, so we drive this route often with families and ski or snowboard groups. Your luggage travels in the same vehicle, and you're dropped right at your hotel or the valley station.",
      ],
      aboutTitle: "About Engelberg",
      about:
        "The Benedictine monastery has shaped the village since 1120 – today with a show dairy in its courtyard. Above it towers the Titlis (3,238 m) with the rotating Rotair gondola, glacier cave and suspension bridge; the north-facing Laub run counts among freeriding's greatest descents in the Alps.",
      faq: [
        ["How long does the transfer to Engelberg take?", "Around 1 hour 55 minutes for 94 km – via Lucerne and Stans."],
        ["How much is the Zurich–Engelberg ride?", "From CHF 282.50 in Business Class – a fixed price per vehicle incl. VAT."],
        ["Can you take us to the Titlis valley station?", "Yes, happily straight to the Titlis Xpress valley station or any other address in the village."],
        ["Do you carry winter-sports luggage?", "Ski bags free of charge (max. 4 per vehicle); for groups with lots of gear we recommend the V-Class."],
      ],
    },
  },
};
