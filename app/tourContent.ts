// ─────────────────────────────────────────────────────────────
//  TUR İÇERİKLERİ — 6 özel tur (DE/EN)
//  Yeni tur eklemek için aynı yapıyı kopyala ve i18n.ts'teki
//  toursSec.list dizisine slug'ıyla birlikte bir kart ekle.
// ─────────────────────────────────────────────────────────────

export type TourStop = { time: string; title: string; desc: string };
export type TourLang = {
  title: string;
  tagline: string;
  intro: string[];
  highlights: string[];
  itinerary: TourStop[];
  included: string[];
  notIncluded: string[];
  faq: [string, string][];
};
export type Tour = {
  slug: string;
  durationKey: "half" | "full" | "hours3"; // rozet
  hours: string;                            // "≈ 4 Std." gösterimi için ham değer
  img: string;
  photos: string[];                         // foto şerit (galeri yolları)
  de: TourLang;
  en: TourLang;
};

export const tours: Tour[] = [
  {
    slug: "rhine-falls-schaffhausen",
    durationKey: "half",
    hours: "4–5",
    img: "/gallery/5.jpg",
    photos: ["/gallery/5.jpg", "/gallery/18.jpg", "/gallery/1.jpg"],
    de: {
      title: "Rheinfall & Schaffhausen – Privattour ab Zürich",
      tagline: "Europas grösster Wasserfall in einem entspannten halben Tag – mit eigenem Chauffeur, ohne Gruppenbus.",
      intro: [
        "600'000 Liter pro Sekunde, 23 Meter Fallhöhe, Gischt, die man auf der Haut spürt: Der Rheinfall ist ein Naturerlebnis, das man gesehen haben muss – und von Zürich aus liegt er nur 45 Minuten entfernt. Auf dieser privaten Halbtagestour bestimmen Sie das Tempo: kein Sammelbus, keine fixen Abfahrtszeiten, kein Warten auf Fremde.",
        "Ihr Chauffeur holt Sie am Hotel, am Flughafen oder an jeder Adresse in Zürich ab und bringt Sie zu den besten Aussichtspunkten auf beiden Rheinseiten. Wer möchte, nimmt das Boot zum Felsen mitten im Fall – ein Erlebnis, das Kinder wie Erwachsene begeistert.",
      ],
      highlights: [
        "Europas grösster Wasserfall aus nächster Nähe",
        "Schloss Laufen mit Panoramaweg direkt am Fall",
        "Optional: Bootsfahrt zum Felsen mitten im Rheinfall",
        "Altstadt Schaffhausen mit Munot-Festung",
        "Auf Wunsch Abstecher ins mittelalterliche Stein am Rhein",
      ],
      itinerary: [
        { time: "09:00", title: "Abholung in Zürich", desc: "Ihr Chauffeur holt Sie an Ihrer Wunschadresse ab – Hotel, Wohnung oder Flughafen." },
        { time: "09:45", title: "Rheinfall – Schloss Laufen", desc: "Panoramaweg und Aussichtskanzel «Känzeli» direkt über dem tosenden Wasser; optional Bootsfahrt zum Mittelfelsen." },
        { time: "11:30", title: "Schaffhausen", desc: "Spaziergang durch die erkergeschmückte Altstadt, Aufstieg oder Fahrt zur kreisrunden Munot-Festung mit Blick über Stadt und Rebberge." },
        { time: "12:30", title: "Optional: Stein am Rhein", desc: "Auf Wunsch weiter zum wohl schönsten mittelalterlichen Städtchen der Schweiz mit bemalten Fassaden (+1 Std.)." },
        { time: "13:30", title: "Rückfahrt", desc: "Entspannte Rückkehr nach Zürich – oder direkt an den Flughafen, wenn Sie weiterreisen." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung & Rückfahrt an Ihrer Adresse", "Treibstoff, Vignette, Parkgebühren", "Wartezeit an allen Stopps", "Wasser im Fahrzeug"],
      notIncluded: ["Bootsfahrt am Rheinfall (ca. CHF 10–20 p. P.)", "Eintritte & Verpflegung"],
      faq: [
        ["Wie lange dauert die Tour?", "Rund 4–5 Stunden ab/bis Zürich. Mit dem Abstecher nach Stein am Rhein etwa eine Stunde mehr – Sie entscheiden unterwegs."],
        ["Ist die Tour für Kinder geeignet?", "Sehr gut sogar – die Bootsfahrt und die Aussichtsplattformen begeistern Kinder. Kindersitze stellen wir kostenlos."],
        ["Was kostet die Tour?", "Der Preis richtet sich nach Fahrzeugklasse und Programm. Fragen Sie unverbindlich per WhatsApp an – Sie erhalten innert 15 Minuten ein Festpreisangebot."],
        ["Können wir am Flughafen starten oder enden?", "Ja, die Tour lässt sich perfekt mit einem Layover oder der Abreise kombinieren – Gepäck bleibt sicher im Fahrzeug."],
      ],
    },
    en: {
      title: "Rhine Falls & Schaffhausen – Private Tour from Zurich",
      tagline: "Europe's largest waterfall in one relaxed half day – with your own chauffeur, no group bus.",
      intro: [
        "600,000 litres per second, a 23-metre drop, spray you can feel on your skin: the Rhine Falls are a must-see natural spectacle – and only 45 minutes from Zurich. On this private half-day tour you set the pace: no coach, no fixed departure times, no waiting for strangers.",
        "Your chauffeur picks you up at your hotel, the airport or any address in Zurich and takes you to the best viewpoints on both banks of the Rhine. If you like, take the boat to the rock in the middle of the falls – a thrill for children and adults alike.",
      ],
      highlights: [
        "Europe's largest waterfall up close",
        "Laufen Castle with its panorama trail right at the falls",
        "Optional boat ride to the rock amid the falls",
        "Schaffhausen old town with the Munot fortress",
        "Optional detour to medieval Stein am Rhein",
      ],
      itinerary: [
        { time: "09:00", title: "Pickup in Zurich", desc: "Your chauffeur collects you at the address of your choice – hotel, apartment or airport." },
        { time: "09:45", title: "Rhine Falls – Laufen Castle", desc: "Panorama trail and the 'Känzeli' viewing platform right above the thundering water; optional boat to the central rock." },
        { time: "11:30", title: "Schaffhausen", desc: "Stroll through the oriel-decorated old town, then up to the circular Munot fortress overlooking town and vineyards." },
        { time: "12:30", title: "Optional: Stein am Rhein", desc: "Continue to what may be Switzerland's prettiest medieval townlet with painted façades (+1 h)." },
        { time: "13:30", title: "Return", desc: "Relaxed drive back to Zurich – or straight to the airport if you're travelling on." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup & return at your address", "Fuel, vignette, parking fees", "Waiting time at every stop", "Bottled water on board"],
      notIncluded: ["Rhine Falls boat ride (approx. CHF 10–20 p.p.)", "Entrance fees & meals"],
      faq: [
        ["How long does the tour take?", "Around 4–5 hours from/to Zurich. With the Stein am Rhein detour about one hour more – you decide en route."],
        ["Is the tour suitable for children?", "Very much so – the boat ride and platforms are a hit with kids. Child seats are provided free."],
        ["How much does the tour cost?", "The price depends on vehicle class and programme. Send a no-obligation WhatsApp enquiry – you'll receive a fixed-price offer within 15 minutes."],
        ["Can we start or end at the airport?", "Yes, the tour combines perfectly with a layover or your departure – luggage stays safely in the vehicle."],
      ],
    },
  },

  {
    slug: "lucerne-lake-lucerne",
    durationKey: "full",
    hours: "8–9",
    img: "/gallery/17.jpg",
    photos: ["/gallery/17.jpg", "/gallery/13.jpg", "/gallery/19.jpg"],
    de: {
      title: "Luzern & Vierwaldstättersee – Privattour ab Zürich",
      tagline: "Kapellbrücke, Löwendenkmal, See und auf Wunsch der Pilatus – der Klassiker unter den Schweiz-Tagen, privat gefahren.",
      intro: [
        "Kaum ein Ort verdichtet die Schweiz so schön wie Luzern: mittelalterliche Holzbrücken, ein tiefblauer See, dahinter die Silhouette von Pilatus und Rigi. Auf dieser privaten Tagestour erleben Sie Stadt, See und – wenn Sie möchten – einen echten Ausflugsberg, ohne einmal auf einen Fahrplan zu schauen.",
        "Ihr Chauffeur kennt die Fotospots, die versteckten Gassen und die beste Reihenfolge, um Reisegruppen zu umgehen. Mittagessen am Wasser, Schifffahrt oder Pilatus-Auffahrt: Das Programm passt sich Ihnen an, nicht umgekehrt.",
      ],
      highlights: [
        "Kapellbrücke & Wasserturm – das Wahrzeichen der Schweiz",
        "Löwendenkmal und Museggmauer",
        "Freizeit für Uhrengeschäfte am Schwanenplatz",
        "Optional: Schifffahrt auf dem Vierwaldstättersee",
        "Optional: Pilatus mit der steilsten Zahnradbahn der Welt",
      ],
      itinerary: [
        { time: "08:30", title: "Abholung in Zürich", desc: "Start an Ihrer Adresse; rund 50 Minuten Fahrt in die Zentralschweiz." },
        { time: "09:30", title: "Altstadt Luzern", desc: "Geführter Spaziergang zu Kapellbrücke, Weinmarkt und Löwendenkmal – mit Zeit für Fotos und Kaffee." },
        { time: "12:00", title: "Mittagessen am See", desc: "Ihr Fahrer empfiehlt Restaurants von traditionell bis Gourmet – reserviert auf Wunsch vorab." },
        { time: "13:30", title: "See oder Berg", desc: "Wahlweise Panorama-Schifffahrt auf dem Vierwaldstättersee oder Auffahrt auf den Pilatus (2'132 m) mit Zahnrad- und Luftseilbahn." },
        { time: "17:30", title: "Rückfahrt", desc: "Rückkehr nach Zürich mit Fotostopp nach Wunsch – Ankunft am frühen Abend." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung & Rückfahrt an Ihrer Adresse", "Treibstoff, Vignette, Parkgebühren", "Flexible Programmgestaltung", "Wasser im Fahrzeug"],
      notIncluded: ["Berg- & Schiffstickets (Pilatus ca. CHF 78 p. P.)", "Verpflegung"],
      faq: [
        ["Schifffahrt oder Pilatus – was empfehlen Sie?", "Bei klarem Wetter der Pilatus (die Aussicht ist spektakulär), bei Dunst die Schifffahrt. Sie können am Morgen spontan entscheiden."],
        ["Lohnt sich die «Goldene Rundfahrt»?", "Ja – Schiff nach Alpnachstad, Zahnradbahn hinauf, Luftseilbahn nach Kriens hinunter: Ihr Fahrer nimmt Sie an der Talstation wieder in Empfang."],
        ["Was kostet die Tour?", "Preis nach Fahrzeugklasse und Programm – fragen Sie per WhatsApp an und erhalten Sie innert 15 Minuten Ihr Festpreisangebot."],
        ["Können wir früher zurück oder länger bleiben?", "Selbstverständlich – es ist Ihre Tour. Der Fahrer richtet sich vollständig nach Ihnen."],
      ],
    },
    en: {
      title: "Lucerne & Lake Lucerne – Private Tour from Zurich",
      tagline: "Chapel Bridge, Lion Monument, the lake and optionally Mt. Pilatus – the classic Swiss day, driven privately.",
      intro: [
        "Few places condense Switzerland as beautifully as Lucerne: medieval wooden bridges, a deep-blue lake, the silhouettes of Pilatus and Rigi behind. On this private day tour you experience town, lake and – if you wish – a genuine excursion mountain, without once looking at a timetable.",
        "Your chauffeur knows the photo spots, the hidden lanes and the best order to dodge the tour groups. Lunch by the water, a lake cruise or the Pilatus ascent: the programme adapts to you, not the other way round.",
      ],
      highlights: [
        "Chapel Bridge & Water Tower – Switzerland's landmark",
        "Lion Monument and the Musegg Wall",
        "Free time for the watch boutiques at Schwanenplatz",
        "Optional: cruise on Lake Lucerne",
        "Optional: Mt. Pilatus via the world's steepest cogwheel railway",
      ],
      itinerary: [
        { time: "08:30", title: "Pickup in Zurich", desc: "Start at your address; around 50 minutes' drive into Central Switzerland." },
        { time: "09:30", title: "Lucerne old town", desc: "Guided stroll to the Chapel Bridge, Weinmarkt and Lion Monument – with time for photos and coffee." },
        { time: "12:00", title: "Lunch by the lake", desc: "Your driver recommends restaurants from traditional to gourmet – reserved in advance on request." },
        { time: "13:30", title: "Lake or mountain", desc: "Choose a panoramic cruise on Lake Lucerne or the ascent of Mt. Pilatus (2,132 m) by cogwheel railway and cable car." },
        { time: "17:30", title: "Return", desc: "Drive back to Zurich with a photo stop on request – arrival in the early evening." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup & return at your address", "Fuel, vignette, parking fees", "Flexible programme", "Bottled water on board"],
      notIncluded: ["Mountain & boat tickets (Pilatus approx. CHF 78 p.p.)", "Meals"],
      faq: [
        ["Cruise or Pilatus – what do you recommend?", "In clear weather, Pilatus (the view is spectacular); in haze, the cruise. You can decide spontaneously in the morning."],
        ["Is the 'Golden Round Trip' worth it?", "Yes – boat to Alpnachstad, cogwheel railway up, cable car down to Kriens: your driver meets you again at the valley station."],
        ["How much does the tour cost?", "Priced by vehicle class and programme – enquire via WhatsApp and receive your fixed-price offer within 15 minutes."],
        ["Can we return earlier or stay longer?", "Of course – it's your tour. The driver follows your lead entirely."],
      ],
    },
  },

  {
    slug: "titlis-engelberg",
    durationKey: "full",
    hours: "8–9",
    img: "/gallery/19.jpg",
    photos: ["/gallery/19.jpg", "/gallery/9.jpg", "/gallery/14.jpg"],
    de: {
      title: "Titlis & Engelberg – Gletschertour ab Zürich",
      tagline: "Ewiges Eis auf 3'020 Metern, drehende Gondel, Hängebrücke – Schnee garantiert, das ganze Jahr.",
      intro: [
        "Wer nur einen Tag hat und «richtige» Schweizer Berge sehen will, fährt auf den Titlis: Als einziger Gletscherberg der Zentralschweiz bietet er Schnee an 365 Tagen – im Hochsommer wie im Winter. Diese private Tagestour verbindet das Klosterdorf Engelberg mit dem Gipfelerlebnis auf 3'020 Metern.",
        "Die Auffahrt selbst ist die Attraktion: Die Rotair, die erste drehbare Luftseilbahn der Welt, dreht sich während der Fahrt einmal um die eigene Achse – 360-Grad-Panorama inklusive. Oben warten Gletschergrotte, Hängebrücke und Aussichtsterrassen; unten Käserei, Kloster und Bergdorfcharme.",
      ],
      highlights: [
        "Rotair – die erste drehbare Gondelbahn der Welt",
        "Gletschergrotte 20 Meter tief im ewigen Eis",
        "Titlis Cliff Walk – höchstgelegene Hängebrücke Europas",
        "Benediktinerkloster Engelberg mit Schaukäserei",
        "Schnee garantiert – auch im Sommer",
      ],
      itinerary: [
        { time: "08:30", title: "Abholung in Zürich", desc: "Fahrt via Luzern durch das Engelbergertal – rund 1 Std. 45 Min. mit Panorama." },
        { time: "10:15", title: "Auffahrt zum Titlis", desc: "Gondelbahn ab Engelberg, letzte Etappe mit der drehbaren Rotair auf 3'020 Meter." },
        { time: "11:00", title: "Gipfelerlebnis", desc: "Gletschergrotte, Cliff Walk-Hängebrücke, Aussichtsterrassen – und Mittagessen im Gipfelrestaurant." },
        { time: "14:00", title: "Engelberg Dorf", desc: "Besuch der Schaukäserei im Kloster, Spaziergang durchs Dorf, Zeit für Kaffee und Souvenirs." },
        { time: "16:00", title: "Rückfahrt", desc: "Rückkehr nach Zürich mit Fotostopps am Vierwaldstättersee nach Wunsch." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung & Rückfahrt an Ihrer Adresse", "Treibstoff, Vignette, Parkgebühren", "Wartezeit während des Gipfelbesuchs", "Wasser im Fahrzeug"],
      notIncluded: ["Titlis-Bergbahnticket (ca. CHF 96 p. P.)", "Verpflegung"],
      faq: [
        ["Brauchen wir Winterkleidung?", "Auf dem Gipfel hat es auch im Juli um 0 °C – feste Schuhe, Jacke und Sonnenbrille (der Schnee blendet) gehören ins Gepäck."],
        ["Ist die Tour für Grosseltern und Kinder machbar?", "Ja – alle Attraktionen sind ohne Wandern per Bahn erreichbar. Die Hängebrücke ist freiwillig."],
        ["Was kostet die Tour?", "Preis nach Fahrzeugklasse – fragen Sie per WhatsApp an, das Festpreisangebot kommt innert 15 Minuten. Bergbahntickets organisieren wir auf Wunsch vorab."],
        ["Was passiert bei schlechtem Wetter?", "Wir prüfen am Vortag die Gipfelwebcam mit Ihnen. Bei geschlossener Sicht schlagen wir kostenfrei ein Alternativprogramm oder einen anderen Tag vor."],
      ],
    },
    en: {
      title: "Titlis & Engelberg – Glacier Tour from Zurich",
      tagline: "Eternal ice at 3,020 metres, a rotating gondola, a suspension bridge – snow guaranteed, all year round.",
      intro: [
        "If you have only one day and want to see 'proper' Swiss mountains, go up the Titlis: Central Switzerland's only glacier peak offers snow 365 days a year – in high summer as in winter. This private day tour combines the monastery village of Engelberg with the summit experience at 3,020 metres.",
        "The ascent itself is the attraction: the Rotair, the world's first rotating cable car, turns a full circle during the ride – 360-degree panorama included. Up top await the glacier cave, the suspension bridge and viewing terraces; down below, cheese dairy, monastery and mountain-village charm.",
      ],
      highlights: [
        "Rotair – the world's first rotating gondola",
        "Glacier cave 20 metres deep in eternal ice",
        "Titlis Cliff Walk – Europe's highest suspension bridge",
        "Engelberg Benedictine monastery with show dairy",
        "Snow guaranteed – even in summer",
      ],
      itinerary: [
        { time: "08:30", title: "Pickup in Zurich", desc: "Drive via Lucerne through the Engelberg valley – around 1 h 45 min of scenery." },
        { time: "10:15", title: "Ascent to Titlis", desc: "Gondola from Engelberg, final leg on the rotating Rotair to 3,020 metres." },
        { time: "11:00", title: "Summit experience", desc: "Glacier cave, Cliff Walk suspension bridge, viewing terraces – and lunch at the summit restaurant." },
        { time: "14:00", title: "Engelberg village", desc: "Visit the monastery's show dairy, stroll the village, time for coffee and souvenirs." },
        { time: "16:00", title: "Return", desc: "Back to Zurich with photo stops at Lake Lucerne on request." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup & return at your address", "Fuel, vignette, parking fees", "Waiting time during the summit visit", "Bottled water on board"],
      notIncluded: ["Titlis cable-car ticket (approx. CHF 96 p.p.)", "Meals"],
      faq: [
        ["Do we need winter clothing?", "The summit hovers around 0 °C even in July – sturdy shoes, a jacket and sunglasses (the snow dazzles) belong in your bag."],
        ["Is the tour doable for grandparents and children?", "Yes – every attraction is reachable by cable car without hiking. The suspension bridge is optional."],
        ["How much does the tour cost?", "Priced by vehicle class – enquire via WhatsApp and the fixed-price offer arrives within 15 minutes. We can pre-book cable-car tickets on request."],
        ["What happens in bad weather?", "We check the summit webcam with you the day before. If visibility is poor, we suggest an alternative programme or another day free of charge."],
      ],
    },
  },

  {
    slug: "zurich-city-tour",
    durationKey: "hours3",
    hours: "3",
    img: "/gallery/1.jpg",
    photos: ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/18.jpg"],
    de: {
      title: "Zürich Stadtrundfahrt – privat mit Chauffeur",
      tagline: "Die Stadt in drei Stunden: Altstadt, See, Aussichtspunkte – ideal für Layover und erste Eindrücke.",
      intro: [
        "Zwischen zwei Flügen, am Anreisetag oder als Auftakt eines Schweiz-Urlaubs: Diese dreistündige Privattour zeigt Ihnen das Beste von Zürich, ohne dass Sie einen Stadtplan brauchen. Ihr Chauffeur fährt, parkt und wartet – Sie schauen, fotografieren und geniessen.",
        "Der Mix macht's: Wir kombinieren Fahrstrecken entlang von See und Limmat mit kurzen Spaziergängen dort, wo Autos nicht hindürfen – durchs Niederdorf, über den Lindenhof, zur Augustinergasse. Auf Wunsch mit Stopp im Lindt Home of Chocolate oder Auffahrt auf den Hausberg Uetliberg.",
      ],
      highlights: [
        "Grossmünster, Fraumünster & Chagall-Fenster",
        "Lindenhof – der schönste Blick über die Altstadt",
        "Bahnhofstrasse und Paradeplatz",
        "Seepromenade mit Alpenblick",
        "Optional: Lindt Home of Chocolate oder Uetliberg",
      ],
      itinerary: [
        { time: "00:00", title: "Abholung", desc: "Start an Hotel, Flughafen oder Bahnhof – die Startzeit bestimmen Sie, auch abends." },
        { time: "00:15", title: "Altstadt zu Fuss", desc: "Kurzer Spaziergang: Lindenhof, Augustinergasse, St. Peter mit dem grössten Zifferblatt Europas, Fraumünster." },
        { time: "01:15", title: "Panoramafahrt", desc: "Limmatquai, Grossmünster, Opernhaus, Seefeld und die Goldküste entlang – Fotostopps nach Wunsch." },
        { time: "02:00", title: "Wahlprogramm", desc: "Lindt Home of Chocolate, Uetliberg-Aussicht oder Shoppingstopp an der Bahnhofstrasse – Sie wählen." },
        { time: "03:00", title: "Rückgabe", desc: "Absetzen an Ihrer Wunschadresse – oder nahtloser Übergang zu Ihrem Flughafentransfer." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung an jeder Adresse in Zürich/Flughafen", "Treibstoff & Parkgebühren", "Flexible Routenwahl", "Wasser im Fahrzeug"],
      notIncluded: ["Eintritte (z. B. Lindt Home of Chocolate)", "Verpflegung"],
      faq: [
        ["Reichen 3 Stunden für Zürich?", "Für die Highlights ja. Wer Museen besuchen will, verlängert die Tour einfach stundenweise – sagen Sie es dem Fahrer unterwegs."],
        ["Funktioniert die Tour bei einem Layover?", "Perfekt sogar: Ab 6 Stunden Aufenthalt holen wir Sie am Gate-Ausgang ab, das Gepäck bleibt im Fahrzeug, und wir bringen Sie pünktlich zum Check-in zurück."],
        ["Was kostet die Stadtrundfahrt?", "Preis nach Fahrzeugklasse und Dauer – WhatsApp-Anfrage genügt, das Angebot kommt innert 15 Minuten."],
        ["Gibt es die Tour auch abends?", "Ja – Zürich bei Dämmerung ist wunderschön. Die Tour fahren wir zu jeder Tageszeit."],
      ],
    },
    en: {
      title: "Zurich City Tour – Private with Chauffeur",
      tagline: "The city in three hours: old town, lake, viewpoints – ideal for layovers and first impressions.",
      intro: [
        "Between two flights, on arrival day or as the opener of a Swiss holiday: this three-hour private tour shows you the best of Zurich without you ever needing a map. Your chauffeur drives, parks and waits – you look, photograph and enjoy.",
        "The mix does it: we combine drives along lake and Limmat with short walks where cars can't go – through the Niederdorf, across the Lindenhof, into Augustinergasse. On request with a stop at the Lindt Home of Chocolate or a ride up the Uetliberg, Zurich's home mountain.",
      ],
      highlights: [
        "Grossmünster, Fraumünster & the Chagall windows",
        "Lindenhof – the finest view over the old town",
        "Bahnhofstrasse and Paradeplatz",
        "Lake promenade with Alpine views",
        "Optional: Lindt Home of Chocolate or Uetliberg",
      ],
      itinerary: [
        { time: "00:00", title: "Pickup", desc: "Start at your hotel, the airport or the station – you set the start time, evenings included." },
        { time: "00:15", title: "Old town on foot", desc: "Short stroll: Lindenhof, Augustinergasse, St. Peter with Europe's largest clock face, Fraumünster." },
        { time: "01:15", title: "Panoramic drive", desc: "Along Limmatquai, Grossmünster, opera house, Seefeld and the Gold Coast – photo stops on request." },
        { time: "02:00", title: "Your choice", desc: "Lindt Home of Chocolate, Uetliberg viewpoint or a shopping stop on Bahnhofstrasse – you pick." },
        { time: "03:00", title: "Drop-off", desc: "Return to your preferred address – or a seamless handover to your airport transfer." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup at any Zurich/airport address", "Fuel & parking fees", "Flexible routing", "Bottled water on board"],
      notIncluded: ["Entrance fees (e.g. Lindt Home of Chocolate)", "Meals"],
      faq: [
        ["Are 3 hours enough for Zurich?", "For the highlights, yes. If you want museums, simply extend by the hour – just tell your driver en route."],
        ["Does the tour work on a layover?", "Perfectly: from a 6-hour stopover we collect you at the gate exit, luggage stays in the car, and we return you punctually for check-in."],
        ["How much does the city tour cost?", "Priced by vehicle class and duration – a WhatsApp enquiry is enough, the offer arrives within 15 minutes."],
        ["Is the tour available in the evening?", "Yes – Zurich at dusk is beautiful. We run the tour at any time of day."],
      ],
    },
  },

  {
    slug: "interlaken-grindelwald",
    durationKey: "full",
    hours: "9–10",
    img: "/gallery/8.jpg",
    photos: ["/gallery/8.jpg", "/gallery/11.jpg", "/gallery/12.jpg"],
    de: {
      title: "Interlaken & Grindelwald – Jungfrau-Tour ab Zürich",
      tagline: "Zwei Seen, ein Gletscherdorf und die berühmteste Bergkulisse der Alpen – an einem einzigen Tag.",
      intro: [
        "Eiger, Mönch und Jungfrau an einem Tag ab Zürich? Mit privatem Chauffeur wird daraus ein entspanntes Erlebnis statt eines Bahnmarathons. Die Route über den Brünigpass gehört selbst schon zu den schönsten der Schweiz – mit dem türkisen Brienzersee als ständigem Begleiter.",
        "In Grindelwald stehen Sie direkt unter der Eiger-Nordwand; wer höher hinaus will, nimmt den Eiger Express oder die Firstbahn, während Ihr Fahrer wartet. Auf dem Rückweg lohnt der Halt im Lauterbrunnental, wo der Staubbachfall 300 Meter frei über die Felswand stürzt.",
      ],
      highlights: [
        "Panoramafahrt über den Brünigpass",
        "Interlaken zwischen Thuner- und Brienzersee",
        "Grindelwald unter der Eiger-Nordwand",
        "Optional: Eiger Express / First mit Cliff Walk",
        "Lauterbrunnental mit Staubbachfall",
      ],
      itinerary: [
        { time: "08:00", title: "Abholung in Zürich", desc: "Frühstart lohnt sich – via Luzern und Brünigpass mit erstem Fotostopp am Lungerersee." },
        { time: "10:00", title: "Interlaken", desc: "Spaziergang über die Höhematte mit Jungfraublick, Kaffee an der Aare, Blick auf die Paraglider." },
        { time: "11:30", title: "Grindelwald", desc: "Das Gletscherdorf unter der Eiger-Nordwand – Mittagessen mit Bergpanorama, optional Auffahrt mit Eiger Express oder Firstbahn." },
        { time: "15:00", title: "Lauterbrunnental", desc: "Kurzer Halt beim Staubbachfall – das Tal der 72 Wasserfälle, das schon Goethe und Tolkien inspirierte." },
        { time: "16:00", title: "Rückfahrt", desc: "Rückkehr nach Zürich via Bern oder Brünig – Ankunft am frühen Abend." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung & Rückfahrt an Ihrer Adresse", "Treibstoff, Vignette, Parkgebühren", "Wartezeit bei allen Stopps & Bahnfahrten", "Wasser im Fahrzeug"],
      notIncluded: ["Bergbahntickets (Eiger Express/First ca. CHF 64–88 p. P.)", "Verpflegung"],
      faq: [
        ["Schaffen wir auch das Jungfraujoch an diesem Tag?", "Möglich, aber sportlich: Rechnen Sie 3,5 Stunden zusätzlich und früheren Start. Für das Joch empfehlen wir eher eine eigene Tour – sprechen Sie uns an."],
        ["Wann ist die beste Reisezeit?", "Mai bis Oktober für grüne Wiesen und offene Bahnen; Dezember bis März für Winterzauber. Die Strecke fahren wir ganzjährig."],
        ["Was kostet die Tour?", "Preis nach Fahrzeugklasse – WhatsApp-Anfrage genügt, das Festpreisangebot kommt innert 15 Minuten."],
        ["Können wir stattdessen nach Wengen oder Mürren?", "Ja, das Programm ist frei kombinierbar – nennen Sie Ihre Wünsche, wir bauen die Route darum."],
      ],
    },
    en: {
      title: "Interlaken & Grindelwald – Jungfrau Tour from Zurich",
      tagline: "Two lakes, a glacier village and the most famous mountain backdrop in the Alps – in a single day.",
      intro: [
        "Eiger, Mönch and Jungfrau in one day from Zurich? With a private chauffeur it becomes a relaxed experience instead of a railway marathon. The route over the Brünig Pass is itself among Switzerland's most beautiful – with the turquoise Lake Brienz as constant companion.",
        "In Grindelwald you stand right beneath the Eiger north face; if you want to go higher, take the Eiger Express or the First gondola while your driver waits. On the way back, the stop in the Lauterbrunnen valley rewards you with the Staubbach Falls plunging 300 metres free over the rock wall.",
      ],
      highlights: [
        "Panoramic drive over the Brünig Pass",
        "Interlaken between Lakes Thun and Brienz",
        "Grindelwald beneath the Eiger north face",
        "Optional: Eiger Express / First with Cliff Walk",
        "Lauterbrunnen valley with the Staubbach Falls",
      ],
      itinerary: [
        { time: "08:00", title: "Pickup in Zurich", desc: "An early start pays off – via Lucerne and the Brünig Pass with a first photo stop at Lake Lungern." },
        { time: "10:00", title: "Interlaken", desc: "Stroll across the Höhematte with Jungfrau views, coffee by the Aare, paragliders overhead." },
        { time: "11:30", title: "Grindelwald", desc: "The glacier village beneath the Eiger north face – lunch with mountain panorama, optional ride on the Eiger Express or First gondola." },
        { time: "15:00", title: "Lauterbrunnen valley", desc: "Short stop at the Staubbach Falls – the valley of 72 waterfalls that inspired Goethe and Tolkien." },
        { time: "16:00", title: "Return", desc: "Back to Zurich via Bern or the Brünig – arrival in the early evening." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup & return at your address", "Fuel, vignette, parking fees", "Waiting time at all stops & during cable-car rides", "Bottled water on board"],
      notIncluded: ["Cable-car tickets (Eiger Express/First approx. CHF 64–88 p.p.)", "Meals"],
      faq: [
        ["Can we also fit in the Jungfraujoch that day?", "Possible but ambitious: allow 3.5 extra hours and an earlier start. For the Joch we rather recommend a dedicated tour – talk to us."],
        ["When is the best season?", "May to October for green meadows and open lifts; December to March for winter magic. We drive the route all year."],
        ["How much does the tour cost?", "Priced by vehicle class – a WhatsApp enquiry is enough, the fixed-price offer arrives within 15 minutes."],
        ["Could we go to Wengen or Mürren instead?", "Yes, the programme is freely combinable – tell us your wishes and we build the route around them."],
      ],
    },
  },

  {
    slug: "bern-emmental",
    durationKey: "full",
    hours: "8",
    img: "/gallery/18.jpg",
    photos: ["/gallery/18.jpg", "/gallery/14.jpg", "/gallery/16.jpg"],
    de: {
      title: "Bern & Emmental – Hauptstadt und Käseland ab Zürich",
      tagline: "UNESCO-Altstadt am Vormittag, Schaukäserei und Hügelland am Nachmittag – die genussvollste Tagestour im Programm.",
      intro: [
        "Diese Tour verbindet zwei Gesichter der Schweiz, die perfekt zusammenpassen: die entspannte Bundeshauptstadt mit ihren sechs Kilometern Lauben – und das Emmental, dessen sanfte Hügel und Bauernhöfe aussehen, als hätte man ein Bilderbuch aufgeschlagen.",
        "In Bern schlendern Sie durch die UNESCO-Altstadt, sehen Zytglogge und Bundeshaus und besuchen die Bären im Park an der Aare. Danach rollt der Mercedes durch das Emmental zur Schaukäserei Affoltern, wo der berühmteste Käse der Welt vor Ihren Augen entsteht – Degustation inklusive.",
      ],
      highlights: [
        "UNESCO-Altstadt Bern mit Zytglogge",
        "BärenPark an der Aareschlaufe",
        "Rosengarten – der Postkartenblick auf Bern",
        "Emmentaler Schaukäserei Affoltern mit Degustation",
        "Fahrt durch das schönste Hügelland der Schweiz",
      ],
      itinerary: [
        { time: "08:30", title: "Abholung in Zürich", desc: "Rund 1 Std. 20 Min. Fahrt in die Bundesstadt – Kaffee unterwegs nach Wunsch." },
        { time: "10:00", title: "Altstadt Bern", desc: "Spaziergang unter den Lauben: Zytglogge, Münsterplattform, Bundeshaus, Einsteins Wohnhaus." },
        { time: "12:00", title: "BärenPark & Rosengarten", desc: "Die Berner Bären an der Aare, danach der klassische Panoramablick vom Rosengarten – ideal fürs Gruppenfoto." },
        { time: "13:30", title: "Emmental", desc: "Fahrt durch Hügel und Dörfer zur Schaukäserei Affoltern: Produktion live, Degustation und Lädeli." },
        { time: "16:00", title: "Rückfahrt", desc: "Gemütliche Rückkehr nach Zürich über Landstrassen oder Autobahn – wie Sie mögen." },
      ],
      included: ["Privater Mercedes mit Chauffeur", "Abholung & Rückfahrt an Ihrer Adresse", "Treibstoff, Vignette, Parkgebühren", "Wartezeit an allen Stopps", "Wasser im Fahrzeug"],
      notIncluded: ["Käse-Degustationspakete (ab ca. CHF 10 p. P.)", "Verpflegung"],
      faq: [
        ["Sieht man die Bären das ganze Jahr?", "Meist ja – im Winter halten sie Winterruhe und zeigen sich seltener. Der Park an der Aare ist trotzdem einen Besuch wert."],
        ["Ist die Tour für Kinder interessant?", "Sehr: Bären, Käserei mit Degustation und die Zytglogge-Figuren zur vollen Stunde kommen bei Kindern bestens an."],
        ["Was kostet die Tour?", "Preis nach Fahrzeugklasse – fragen Sie per WhatsApp an, das Festpreisangebot kommt innert 15 Minuten."],
        ["Können wir Gruyères statt Emmental besuchen?", "Ja – La Maison du Gruyère und das Städtchen Gruyères sind eine schöne Alternative; die Tour dauert dann rund eine Stunde länger."],
      ],
    },
    en: {
      title: "Bern & Emmental – Capital and Cheese Country from Zurich",
      tagline: "UNESCO old town in the morning, show dairy and rolling hills in the afternoon – the most indulgent day tour on our list.",
      intro: [
        "This tour combines two faces of Switzerland that fit together perfectly: the relaxed federal capital with its six kilometres of arcades – and the Emmental, whose gentle hills and farmhouses look like an open picture book.",
        "In Bern you stroll through the UNESCO old town, see the Zytglogge and the Federal Palace and visit the bears in their park by the Aare. Then the Mercedes rolls through the Emmental to the Affoltern show dairy, where the world's most famous cheese is made before your eyes – tasting included.",
      ],
      highlights: [
        "UNESCO old town of Bern with the Zytglogge",
        "Bear Park on the Aare loop",
        "Rose Garden – the postcard view of Bern",
        "Emmental show dairy in Affoltern with tasting",
        "Drive through Switzerland's loveliest hill country",
      ],
      itinerary: [
        { time: "08:30", title: "Pickup in Zurich", desc: "Around 1 h 20 min to the federal capital – coffee stop on request." },
        { time: "10:00", title: "Bern old town", desc: "Walk beneath the arcades: Zytglogge, Minster platform, Federal Palace, Einstein's house." },
        { time: "12:00", title: "Bear Park & Rose Garden", desc: "Bern's bears by the Aare, then the classic panorama from the Rose Garden – perfect for the group photo." },
        { time: "13:30", title: "Emmental", desc: "Through hills and villages to the Affoltern show dairy: live production, tasting and farm shop." },
        { time: "16:00", title: "Return", desc: "Leisurely drive back to Zurich via country roads or motorway – as you prefer." },
      ],
      included: ["Private Mercedes with chauffeur", "Pickup & return at your address", "Fuel, vignette, parking fees", "Waiting time at every stop", "Bottled water on board"],
      notIncluded: ["Cheese tasting packages (from approx. CHF 10 p.p.)", "Meals"],
      faq: [
        ["Can you see the bears all year?", "Usually yes – in winter they rest and appear less often. The park by the Aare is worth a visit regardless."],
        ["Is the tour interesting for children?", "Very: bears, a dairy with tasting and the Zytglogge figures striking the hour go down brilliantly with kids."],
        ["How much does the tour cost?", "Priced by vehicle class – enquire via WhatsApp and the fixed-price offer arrives within 15 minutes."],
        ["Could we visit Gruyères instead of the Emmental?", "Yes – La Maison du Gruyère and the townlet of Gruyères are a lovely alternative; the tour then runs about an hour longer."],
      ],
    },
  },
];
