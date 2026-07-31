// ─────────────────────────────────────────────────────────────
//  BLOG İÇERİKLERİ — 10 özgün yazı (DE/EN)
//  Yeni yazı eklemek için aynı yapıyı kopyala.
// ─────────────────────────────────────────────────────────────

export type BlogBlock = { h?: string; p: string[] };
export type BlogLang = { title: string; excerpt: string; body: BlogBlock[] };
export type BlogPost = { slug: string; date: string; img: string; de: BlogLang; en: BlogLang };

export const blogPosts: BlogPost[] = [
  {
    slug: "ankunft-flughafen-zuerich-fahrer-finden",
    date: "2026-07-21",
    img: "/gallery/1.jpg",
    de: {
      title: "Ankunft am Flughafen Zürich: So finden Sie Ihren Fahrer in 3 Minuten",
      excerpt: "Vom Gate bis zum Mercedes ohne Suchen: Wo Ihr Chauffeur wartet, was Meet & Greet bedeutet und warum Sie sich um Verspätungen keine Gedanken machen müssen.",
      body: [
        { p: [
          "Nach einem langen Flug ist das Letzte, was man will, eine Suche nach dem Transfer. Deshalb ist unser Ablauf am Flughafen Zürich bewusst einfach gehalten: Ihr Chauffeur steht mit einem Namensschild direkt im Ankunftsbereich – bei Ankunft 1 oder Ankunft 2, je nachdem, wo Ihr Flug ankommt.",
        ]},
        { h: "Meet & Greet: So läuft es ab", p: [
          "Folgen Sie nach der Gepäckausgabe einfach den Schildern zur Ankunftshalle. Ihr Fahrer erwartet Sie am Ausgang, hilft mit dem Gepäck und begleitet Sie zum Fahrzeug, das nur wenige Gehminuten entfernt im Parkhaus steht. Kein Shuttle, kein Warten am Strassenrand.",
          "Sollten Sie sich einmal nicht sofort finden, genügt eine WhatsApp-Nachricht – Fahrer und Zentrale sind rund um die Uhr erreichbar.",
        ]},
        { h: "Flug verspätet? Kein Problem", p: [
          "Wir verfolgen jede Landung in Echtzeit. Verspätet sich Ihr Flug, verschiebt sich die Abholzeit automatisch – ohne Aufpreis und mit kostenloser Wartezeit nach der Landung. So beginnt die Schweiz entspannt.",
        ]},
      ],
    },
    en: {
      title: "Arriving at Zurich Airport: How to Find Your Driver in 3 Minutes",
      excerpt: "From the gate to your Mercedes without searching: where your chauffeur waits, what meet & greet means and why flight delays are never your problem.",
      body: [
        { p: [
          "After a long flight, the last thing you want is to hunt for your transfer. That is why our process at Zurich Airport is deliberately simple: your chauffeur stands with a name sign right in the arrivals area – at Arrival 1 or Arrival 2, depending on where your flight lands.",
        ]},
        { h: "Meet & greet: how it works", p: [
          "After baggage claim, simply follow the signs to the arrivals hall. Your driver awaits you at the exit, helps with the luggage and walks you to the car, parked just a few minutes away in the garage. No shuttle, no waiting at the kerb.",
          "If you ever miss each other, one WhatsApp message is enough – driver and dispatch are reachable around the clock.",
        ]},
        { h: "Flight delayed? No problem", p: [
          "We track every landing in real time. If your flight is late, the pickup shifts automatically – with no surcharge and free waiting time after touchdown. Switzerland starts relaxed.",
        ]},
      ],
    },
  },

  {
    slug: "taxi-oder-zug-flughafen-zuerich",
    date: "2026-07-08",
    img: "/gallery/3.jpg",
    de: {
      title: "Taxi oder Zug ab Flughafen Zürich? Der ehrliche Vergleich",
      excerpt: "Die SBB ist exzellent – und trotzdem gibt es Situationen, in denen der private Transfer klar gewinnt. Ein fairer Blick auf Kosten, Zeit und Komfort.",
      body: [
        { p: [
          "Vorweg: Das Schweizer Bahnnetz gehört zu den besten der Welt. Für eine Einzelperson mit Handgepäck nach Zürich HB ist der Zug oft die richtige Wahl. Doch sobald Koffer, Kinder, frühe Abflüge oder Ziele abseits der Bahnhöfe ins Spiel kommen, kippt die Rechnung.",
        ]},
        { h: "Wo der private Transfer gewinnt", p: [
          "Tür zu Tür ohne Umsteigen: Nach Luzern, Zug oder Interlaken bedeutet die Bahn Umstiege mit Gepäck – der Chauffeur fährt direkt vor Ihr Hotel. Zu viert im Fahrzeug kostet der Festpreis pro Person oft weniger als vier Bahnbillette erster Klasse.",
          "Und um 4 Uhr morgens zum Frühflug? Da fährt schlicht kein Zug – unser Service schon, rund um die Uhr.",
        ]},
        { h: "Unser Fazit", p: [
          "Solo und leicht unterwegs: Zug. Mit Familie, Gepäck, engem Zeitplan oder Ziel abseits der Hauptbahnhöfe: privater Transfer zum Festpreis. Am Ende zählt, wie entspannt Sie ankommen.",
        ]},
      ],
    },
    en: {
      title: "Taxi or Train from Zurich Airport? An Honest Comparison",
      excerpt: "Swiss rail is excellent – and yet there are situations where a private transfer clearly wins. A fair look at cost, time and comfort.",
      body: [
        { p: [
          "Let's be honest: the Swiss rail network is among the best in the world. For a solo traveller with hand luggage heading to Zurich main station, the train is often the right choice. But as soon as suitcases, children, early departures or destinations away from stations enter the picture, the maths changes.",
        ]},
        { h: "Where the private transfer wins", p: [
          "Door to door without changing: to Lucerne, Zug or Interlaken the train means transfers with luggage – a chauffeur drives straight to your hotel. With four people in one car, the fixed price per person is often less than four first-class rail tickets.",
          "And at 4 a.m. for an early flight? No train runs then – our service does, around the clock.",
        ]},
        { h: "Our verdict", p: [
          "Travelling solo and light: take the train. With family, luggage, a tight schedule or a destination away from main stations: private transfer at a fixed price. What counts is how relaxed you arrive.",
        ]},
      ],
    },
  },

  {
    slug: "wintersaison-ski-transfers-schweiz",
    date: "2026-06-24",
    img: "/gallery/10.jpg",
    de: {
      title: "Wintersaison in den Alpen: So klappt der Ski-Transfer ab Zürich",
      excerpt: "Davos, St. Moritz, Grindelwald: Was Sie beim Transfer mit Skigepäck beachten sollten – und warum frühe Buchung im Winter Gold wert ist.",
      body: [
        { p: [
          "Sobald der erste Schnee fällt, wird der Flughafen Zürich zum Tor der Alpen. Wir fahren Sie mit Winterreifen, erfahrenen Fahrern und Platz für die komplette Ausrüstung in jedes Skigebiet der Schweiz – von Davos über St. Moritz bis in die Jungfrau-Region.",
        ]},
        { h: "Skigepäck richtig anmelden", p: [
          "Skitaschen transportieren wir kostenlos, bis zu vier pro Fahrzeug. Geben Sie die Anzahl bei der Buchung an, damit wir das passende Fahrzeug einplanen: Für Familien mit voller Ausrüstung ist die V-Klasse mit 7 Gepäckplätzen ideal.",
        ]},
        { h: "Warum früh buchen?", p: [
          "In der Hochsaison – besonders an Samstagen im Februar und rund um Neujahr – sind die Alpentransfers Wochen im Voraus ausgebucht. Wer früh reserviert, sichert sich Fahrzeugwahl und Wunschzeit. Kostenlose Stornierung bis 24 Stunden vorher gibt Ihnen dabei volle Flexibilität.",
        ]},
      ],
    },
    en: {
      title: "Winter Season in the Alps: Ski Transfers from Zurich Done Right",
      excerpt: "Davos, St. Moritz, Grindelwald: what to consider when transferring with ski luggage – and why booking early in winter is worth gold.",
      body: [
        { p: [
          "As soon as the first snow falls, Zurich Airport becomes the gateway to the Alps. We drive you with winter tyres, experienced drivers and space for full equipment to every Swiss ski resort – from Davos and St. Moritz to the Jungfrau region.",
        ]},
        { h: "Registering ski luggage correctly", p: [
          "Ski bags travel free of charge, up to four per vehicle. State the number when booking so we can plan the right car: for families with full gear, the V-Class with seven luggage spaces is ideal.",
        ]},
        { h: "Why book early?", p: [
          "In high season – especially February Saturdays and around New Year – alpine transfers sell out weeks ahead. Booking early secures your preferred vehicle and time slot, while free cancellation up to 24 hours before keeps you fully flexible.",
        ]},
      ],
    },
  },

  {
    slug: "24-stunden-in-zuerich",
    date: "2026-06-10",
    img: "/gallery/2.jpg",
    de: {
      title: "24 Stunden in Zürich: Das perfekte Programm zwischen zwei Flügen",
      excerpt: "Langer Zwischenstopp? So holen Sie aus einem Tag in Zürich das Maximum heraus – von der Altstadt über den See bis zum besten Ausblick.",
      body: [
        { p: [
          "Ein Layover von 12 bis 24 Stunden in Zürich ist ein Geschenk: Die Stadt ist kompakt, sicher und vom Flughafen in nur 15 Minuten erreichbar. Gepäck einlagern, Transfer buchen – und los.",
        ]},
        { h: "Vormittag: Altstadt und Limmat", p: [
          "Starten Sie im Niederdorf, schlendern Sie über die Rathausbrücke und durch die Augustinergasse mit ihren bemalten Erkern. Grossmünster und Fraumünster mit den Chagall-Fenstern liegen nur wenige Schritte auseinander.",
        ]},
        { h: "Nachmittag: See und Aussicht", p: [
          "Am Bürkliplatz beginnt die Seepromenade – im Sommer lohnt eine kurze Schifffahrt. Für den besten Blick über Stadt, See und Alpen fahren Sie mit der Polybahn zur ETH-Terrasse. Zum Abschluss ein Kaffee an der Bahnhofstrasse, bevor Ihr Chauffeur Sie zurück zum Flughafen bringt – pünktlich zum Check-in.",
        ]},
      ],
    },
    en: {
      title: "24 Hours in Zurich: The Perfect Layover Itinerary",
      excerpt: "Long stopover? How to make the most of one day in Zurich – from the old town and the lake to the city's best viewpoint.",
      body: [
        { p: [
          "A 12-to-24-hour layover in Zurich is a gift: the city is compact, safe and only 15 minutes from the airport. Store the luggage, book a transfer – and off you go.",
        ]},
        { h: "Morning: old town and the Limmat", p: [
          "Start in the Niederdorf, stroll across the Rathausbrücke and through Augustinergasse with its painted bay windows. The Grossmünster and the Fraumünster with its Chagall windows are just steps apart.",
        ]},
        { h: "Afternoon: lake and views", p: [
          "The lake promenade begins at Bürkliplatz – in summer a short boat ride is worth it. For the best view over city, lake and Alps, take the Polybahn up to the ETH terrace. Finish with a coffee on Bahnhofstrasse before your chauffeur takes you back to the airport – right on time for check-in.",
        ]},
      ],
    },
  },

  {
    slug: "wef-davos-transfer-guide",
    date: "2026-05-27",
    img: "/gallery/9.jpg",
    de: {
      title: "WEF Davos: Der Transfer-Guide für die anspruchsvollste Woche des Jahres",
      excerpt: "Gesperrte Strassen, knappe Kapazitäten, enge Zeitfenster: So funktioniert der Transfer von Zürich nach Davos während des Weltwirtschaftsforums.",
      body: [
        { p: [
          "Eine Woche im Januar verwandelt sich Davos in das Zentrum der Weltpolitik – und die Anreise in eine logistische Herausforderung. Wer das WEF kennt, bucht seinen Transfer Monate im Voraus.",
        ]},
        { h: "Was während des WEF anders ist", p: [
          "Zufahrtskontrollen, Umleitungen und wechselnde Sicherheitszonen verlangen Fahrer mit Ortskenntnis und aktueller Lageinformation. Unsere Chauffeure fahren die Strecke Zürich–Davos regelmässig und kennen die Abläufe an den Kontrollpunkten.",
          "Diskretion ist selbstverständlich: keine Firmenlogos am Fahrzeug, vertrauliche Behandlung aller Fahrgastdaten, auf Wunsch Namensschild mit neutraler Kennung.",
        ]},
        { h: "Unsere Empfehlung", p: [
          "Buchen Sie Hin- und Rückfahrt gemeinsam und planen Sie grosszügige Puffer ein. Für Delegationen koordinieren wir mehrere Fahrzeuge inklusive Gepäcktransport – eine Anfrage per E-Mail genügt.",
        ]},
      ],
    },
    en: {
      title: "WEF Davos: The Transfer Guide for the Most Demanding Week of the Year",
      excerpt: "Closed roads, scarce capacity, tight windows: how transfers from Zurich to Davos work during the World Economic Forum.",
      body: [
        { p: [
          "For one week in January, Davos turns into the centre of world politics – and getting there becomes a logistical challenge. Those who know the WEF book their transfer months ahead.",
        ]},
        { h: "What changes during the WEF", p: [
          "Access controls, diversions and shifting security zones demand drivers with local knowledge and up-to-date information. Our chauffeurs drive the Zurich–Davos route regularly and know the procedures at the checkpoints.",
          "Discretion is a given: no company logos on the vehicle, confidential handling of all passenger data and, on request, a name sign with a neutral identifier.",
        ]},
        { h: "Our recommendation", p: [
          "Book outbound and return together and plan generous buffers. For delegations we coordinate multiple vehicles including luggage transport – one email request is enough.",
        ]},
      ],
    },
  },

  {
    slug: "mit-kindern-reisen-kindersitze-schweiz",
    date: "2026-05-13",
    img: "/gallery/14.jpg",
    de: {
      title: "Mit Kindern unterwegs: Kindersitz-Regeln und Familien-Transfers in der Schweiz",
      excerpt: "Welche Sitzpflicht gilt in der Schweiz, welcher Sitz passt zu welchem Alter – und warum bei uns Kindersitze immer kostenlos sind.",
      body: [
        { p: [
          "In der Schweiz müssen Kinder bis 12 Jahre oder unter 150 cm Körpergrösse in einer geeigneten Kinderrückhaltevorrichtung reisen. Für Familien, die mit dem Flugzeug ankommen, heisst das: Der Transfer muss vorbereitet sein – den eigenen Sitz schleppt niemand gern um die halbe Welt.",
        ]},
        { h: "Der richtige Sitz für jedes Alter", p: [
          "Babyschale für die Kleinsten bis ca. 13 kg, Kindersitz für ca. 4 bis 12 Jahre (15–36 kg): Beides stellen wir kostenlos bereit und montieren es vor Ihrer Ankunft fachgerecht. Geben Sie bei der Buchung einfach Alter oder Gewicht Ihrer Kinder an.",
        ]},
        { h: "Entspannt reisen mit der Familie", p: [
          "In der V-Klasse reisen bis zu 7 Personen mit Kinderwagen, Koffern und Spielzeug bequem gemeinsam. Ihr Fahrer hilft beim Verladen – und wenn der Flug Verspätung hat, warten wir selbstverständlich kostenlos.",
        ]},
      ],
    },
    en: {
      title: "Travelling with Children: Child-Seat Rules and Family Transfers in Switzerland",
      excerpt: "Which seat rules apply in Switzerland, which seat fits which age – and why child seats are always free with us.",
      body: [
        { p: [
          "In Switzerland, children up to 12 years old or under 150 cm must travel in a suitable child restraint. For families arriving by plane this means the transfer needs preparing – nobody enjoys hauling their own seat halfway around the world.",
        ]},
        { h: "The right seat for every age", p: [
          "A baby shell for the smallest up to approx. 13 kg, a child seat for roughly 4 to 12 years (15–36 kg): we provide both free of charge and fit them properly before you arrive. Simply state your children's age or weight when booking.",
        ]},
        { h: "Relaxed family travel", p: [
          "In the V-Class up to seven people travel comfortably together with pram, suitcases and toys. Your driver helps with loading – and if the flight is delayed, we naturally wait free of charge.",
        ]},
      ],
    },
  },

  {
    slug: "business-travel-zuerich-tipps",
    date: "2026-04-22",
    img: "/gallery/18.jpg",
    de: {
      title: "Business Travel Zürich: 5 Gewohnheiten effizienter Vielflieger",
      excerpt: "Vom Sitzplatz bis zum Transfer: kleine Routinen, die Geschäftsreisen über Zürich messbar entspannter machen.",
      body: [
        { p: [
          "Wer beruflich häufig über Zürich fliegt, entwickelt Routinen. Die besten davon haben ein gemeinsames Muster: Sie eliminieren Unsicherheit. Fünf Gewohnheiten, die wir bei unseren Stammkunden immer wieder beobachten.",
        ]},
        { h: "Die fünf Gewohnheiten", p: [
          "Erstens: Transfers als Serie buchen – wer Hin- und Rückfahrt gemeinsam reserviert, denkt nie wieder daran. Zweitens: Die Fahrt als Arbeitszeit planen; WLAN und ein ruhiger Fond ersetzen 60 Minuten Büro. Drittens: Fixe Abholzeiten mit Puffer statt knapper Rechnungen.",
          "Viertens: Eine einzige Nummer für alles – Änderungen per WhatsApp statt Hotline-Warteschleife. Fünftens: Belege automatisieren; auf Wunsch stellen wir Sammelrechnungen für Firmen aus.",
        ]},
        { h: "Das Ergebnis", p: [
          "Planbarkeit ist im Geschäftsreisealltag die härteste Währung. Ein Festpreis-Transfer mit Flugverfolgung ist dafür ein kleiner Baustein mit grosser Wirkung.",
        ]},
      ],
    },
    en: {
      title: "Business Travel Zurich: 5 Habits of Efficient Frequent Flyers",
      excerpt: "From seat choice to the transfer: small routines that make business trips via Zurich measurably calmer.",
      body: [
        { p: [
          "Fly through Zurich often enough for work and you develop routines. The best ones share a pattern: they eliminate uncertainty. Five habits we see again and again among our regulars.",
        ]},
        { h: "The five habits", p: [
          "First: book transfers as a series – reserve outbound and return together and never think about it again. Second: treat the ride as working time; Wi-Fi and a quiet cabin replace an hour at the office. Third: fixed pickup times with buffer instead of tight calculations.",
          "Fourth: one number for everything – changes via WhatsApp instead of hotline queues. Fifth: automate receipts; on request we issue consolidated invoices for companies.",
        ]},
        { h: "The result", p: [
          "Predictability is the hardest currency in business travel. A fixed-price transfer with flight tracking is a small building block with a big effect.",
        ]},
      ],
    },
  },

  {
    slug: "jungfrau-region-guide-interlaken-grindelwald",
    date: "2026-04-03",
    img: "/gallery/8.jpg",
    de: {
      title: "Jungfrau-Region für Einsteiger: Interlaken, Grindelwald, Wengen & Lauterbrunnen",
      excerpt: "Vier Orte, ein Bergpanorama: Was die Dörfer der Jungfrau-Region unterscheidet und wie Sie ab Flughafen Zürich am besten anreisen.",
      body: [
        { p: [
          "Eiger, Mönch und Jungfrau bilden die berühmteste Bergkulisse der Schweiz – doch welcher Ort ist der richtige Ausgangspunkt? Ein kurzer Überblick für die Planung.",
        ]},
        { h: "Die Orte im Vergleich", p: [
          "Interlaken zwischen zwei Seen ist die verkehrsgünstige Basis mit dem grössten Angebot. Grindelwald bietet die direkteste Bergkulisse und den Eiger-Express aufs Jungfraujoch. Autofreies Wengen auf der Sonnenterrasse ist ruhiger und familiär, während Lauterbrunnen mit seinen 72 Wasserfällen das fotogenste Tal der Alpen bleibt.",
        ]},
        { h: "Anreise ab Flughafen Zürich", p: [
          "Mit dem privaten Transfer erreichen Sie Interlaken in rund 2,5 Stunden und Grindelwald in knapp 3 – direkt vor die Hoteltür, mit Skigepäck und ohne Umsteigen. Nach Wengen fahren wir Sie bis zur Talstation Lauterbrunnen, von wo die Zahnradbahn übernimmt.",
        ]},
      ],
    },
    en: {
      title: "Jungfrau Region for First-Timers: Interlaken, Grindelwald, Wengen & Lauterbrunnen",
      excerpt: "Four villages, one alpine panorama: what sets the Jungfrau region's resorts apart and the best way to arrive from Zurich Airport.",
      body: [
        { p: [
          "The Eiger, Mönch and Jungfrau form Switzerland's most famous mountain backdrop – but which village is the right base? A short planning overview.",
        ]},
        { h: "The villages compared", p: [
          "Interlaken, set between two lakes, is the well-connected base with the widest offering. Grindelwald delivers the most direct mountain scenery and the Eiger Express towards the Jungfraujoch. Car-free Wengen on its sunny terrace is quieter and family-minded, while Lauterbrunnen with its 72 waterfalls remains the most photogenic valley in the Alps.",
        ]},
        { h: "Getting there from Zurich Airport", p: [
          "By private transfer you reach Interlaken in around 2.5 hours and Grindelwald in just under 3 – right to the hotel door, with ski luggage and no changes. For Wengen we drive you to the Lauterbrunnen valley station, where the cogwheel railway takes over.",
        ]},
      ],
    },
  },

  {
    slug: "festpreis-transfers-erklaert",
    date: "2026-03-18",
    img: "/gallery/17.jpg",
    de: {
      title: "Festpreis statt Taxameter: So kalkulieren faire Flughafentransfers",
      excerpt: "Warum unser Preis vor der Fahrt feststeht, was alles inbegriffen ist – und welche versteckten Kosten Sie bei uns nie sehen werden.",
      body: [
        { p: [
          "Ein Taxameter belohnt Stau. Ein Festpreis belohnt Planung. Deshalb steht bei uns jeder Preis fest, bevor das Fahrzeug losfährt – unabhängig von Verkehr, Wetter oder Uhrzeit.",
        ]},
        { h: "Was im Festpreis steckt", p: [
          "Der genannte Betrag gilt pro Fahrzeug, nicht pro Person, und enthält MwSt., Autobahnvignette, Meet & Greet, Wartezeit nach der Landung sowie Kindersitze und Skitaschen. Es gibt keine Nacht-, Wochenend- oder Gepäckzuschläge.",
        ]},
        { h: "Warum sich das für beide Seiten lohnt", p: [
          "Sie können budgetieren, wir können planen: Feste Preise ermöglichen feste Routen, ausgeruhte Fahrer und verlässliche Fahrzeuge. Kostenlose Stornierung bis 24 Stunden vor Abfahrt gehört ebenfalls dazu – Fairness funktioniert in beide Richtungen.",
        ]},
      ],
    },
    en: {
      title: "Fixed Price Instead of a Meter: How Fair Airport Transfers Are Priced",
      excerpt: "Why our price is set before the ride, everything that's included – and the hidden costs you will never see with us.",
      body: [
        { p: [
          "A taximeter rewards traffic jams. A fixed price rewards planning. That is why every one of our prices is set before the car moves – regardless of traffic, weather or time of day.",
        ]},
        { h: "What the fixed price includes", p: [
          "The quoted amount applies per vehicle, not per person, and covers VAT, the motorway vignette, meet & greet, waiting time after landing, plus child seats and ski bags. There are no night, weekend or luggage surcharges.",
        ]},
        { h: "Why it pays off for both sides", p: [
          "You can budget, we can plan: fixed prices enable fixed routes, rested drivers and reliable vehicles. Free cancellation up to 24 hours before departure is part of the deal too – fairness works both ways.",
        ]},
      ],
    },
  },

  {
    slug: "luzern-tagesausflug-ab-zuerich",
    date: "2026-02-25",
    img: "/gallery/17.jpg",
    de: {
      title: "Tagesausflug Luzern: Kapellbrücke, See und Pilatus an einem Tag",
      excerpt: "Der Klassiker unter den Schweiz-Ausflügen, perfekt getaktet: unser bewährter Ablauf für einen Tag Luzern mit privatem Chauffeur.",
      body: [
        { p: [
          "Kaum eine Stadt liefert auf so kleinem Raum so viel Schweiz wie Luzern: mittelalterliche Brücken, ein Bergpanorama direkt am Wasser und Ausflugsberge in Sichtweite. Mit privatem Fahrer wird daraus ein Tag ohne Fahrplan-Stress.",
        ]},
        { h: "Der bewährte Ablauf", p: [
          "Abfahrt am Morgen ab Zürich oder direkt ab Flughafen, rund 75 Minuten Fahrt. Vormittags Altstadt: Kapellbrücke, Weinmarkt, Löwendenkmal. Mittags am See essen – anschliessend wahlweise Schifffahrt auf dem Vierwaldstättersee oder Auffahrt auf den Pilatus mit der steilsten Zahnradbahn der Welt.",
        ]},
        { h: "Der Vorteil des Privattransfers", p: [
          "Ihr Fahrer wartet, wo Sie aussteigen, verstaut Einkäufe und passt den Zeitplan spontan an. Am Abend bringt er Sie zurück nach Zürich oder direkt zum Flughafen – müde, aber ohne einen einzigen Blick auf eine Abfahrtstafel.",
        ]},
      ],
    },
    en: {
      title: "Lucerne Day Trip: Chapel Bridge, Lake and Pilatus in One Day",
      excerpt: "The classic Swiss excursion, perfectly timed: our proven one-day Lucerne itinerary with a private chauffeur.",
      body: [
        { p: [
          "Few cities deliver so much Switzerland in such a small space as Lucerne: medieval bridges, an alpine panorama right on the water and excursion mountains within sight. With a private driver it becomes a day without timetable stress.",
        ]},
        { h: "The proven itinerary", p: [
          "Depart in the morning from Zurich or straight from the airport, around 75 minutes' drive. Old town in the morning: Chapel Bridge, Weinmarkt, Lion Monument. Lunch by the lake – then either a cruise on Lake Lucerne or a ride up Pilatus on the world's steepest cogwheel railway.",
        ]},
        { h: "The private-transfer advantage", p: [
          "Your driver waits wherever you step out, stores your shopping and adapts the schedule on the spot. In the evening he takes you back to Zurich or straight to the airport – tired, but without a single glance at a departure board.",
        ]},
      ],
    },
  },

  {
    slug: "gepaeck-tipps-flughafentransfer",
    date: "2026-02-05",
    img: "/gallery/6.jpg",
    de: {
      title: "Wie viel Gepäck passt ins Fahrzeug? Der ehrliche Kapazitäts-Guide",
      excerpt: "E-Klasse, V-Klasse oder V300: welche Koffermengen realistisch passen und wie Sie bei der Buchung richtig kalkulieren.",
      body: [
        { p: [
          "„Passt das alles rein?“ ist die häufigste Frage vor einem Transfer – und eine berechtigte. Hier die ehrlichen Zahlen aus der Praxis, damit am Flughafen keine Überraschung wartet.",
        ]},
        { h: "Die Kapazitäten im Überblick", p: [
          "Business Class (E-Klasse): 2 Passagiere mit 2 grossen Koffern plus Handgepäck. Premium Class (S-Klasse): 3 Passagiere, 3 Koffer. Business & Family (V-Klasse): bis 7 Passagiere und 7 Koffer – oder weniger Personen mit deutlich mehr Gepäck. VIP V300: 5 Passagiere mit 5 Koffern in maximalem Komfort.",
        ]},
        { h: "Unsere Faustregel", p: [
          "Zählen Sie grosse Koffer, nicht Handtaschen – und runden Sie bei Sperrigem (Kinderwagen, Golfbag, Skitasche) gedanklich einen Koffer auf. Im Zweifel: kurz per WhatsApp fragen. Lieber einmal die V-Klasse zu viel als einmal ein Koffer auf dem Schoss.",
        ]},
      ],
    },
    en: {
      title: "How Much Luggage Fits in the Car? The Honest Capacity Guide",
      excerpt: "E-Class, V-Class or V300: which luggage loads realistically fit and how to calculate correctly when booking.",
      body: [
        { p: [
          "\"Will it all fit?\" is the most common question before a transfer – and a fair one. Here are the honest, real-world numbers so there are no surprises at the airport.",
        ]},
        { h: "The capacities at a glance", p: [
          "Business Class (E-Class): 2 passengers with 2 large suitcases plus hand luggage. Premium Class (S-Class): 3 passengers, 3 suitcases. Business & Family (V-Class): up to 7 passengers and 7 suitcases – or fewer people with considerably more luggage. VIP V300: 5 passengers with 5 suitcases in maximum comfort.",
        ]},
        { h: "Our rule of thumb", p: [
          "Count large suitcases, not handbags – and mentally round up one suitcase for anything bulky (pram, golf bag, ski bag). When in doubt, ask via WhatsApp. Better one V-Class too many than one suitcase on your lap.",
        ]},
      ],
    },
  },
];
