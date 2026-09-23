// ─────────────────────────────────────────────────────────────
//  BLOG — Temel yazılar (11 adet, revize 09/2026)
//  Slug, tarih ve görseller korunmuştur (URL'ler değişmez). İçerik yeni serilerle
//  aynı uzunlukta ve iç linkli. Fiyat/süre yalnızca config.ts'teki sabit rotalardan.
// ─────────────────────────────────────────────────────────────
import type { BlogPost } from "./blogContent";

export const basePosts: BlogPost[] = [
  {
    slug: "ankunft-flughafen-zuerich-fahrer-finden",
    date: "2026-07-21",
    img: "/gallery/1.jpg",
    de: {
      title: "Ankunft am Flughafen Zürich: So finden Sie Ihren Fahrer in 3 Minuten",
      excerpt: "Vom Gate bis zum Mercedes ohne Suchen: Wo Ihr Chauffeur wartet, was Meet & Greet konkret bedeutet, wie die Wartezeit geregelt ist und warum Verspätungen kein Thema sind.",
      body: [
        { p: [
          "Der Moment nach der Landung entscheidet über den ersten Eindruck einer Reise. Wer nach zwölf Stunden Flug noch Schilder lesen, Ticketautomaten bedienen oder am Taxistand anstehen muss, kommt gestresst an. Ein vorab gebuchter Transfer nimmt Ihnen genau das ab – vorausgesetzt, der Ablauf ist klar. Dieser Beitrag beschreibt ihn Schritt für Schritt: von der Gepäckausgabe bis zum Fahrzeug.",
        ]},
        { h: "Schritt 1: Gepäck holen, Ausgang folgen", p: [
          "Nach der Passkontrolle und der Gepäckausgabe folgen Sie der Beschilderung zum Ausgang in die öffentliche Ankunftshalle. Der Flughafen Zürich hat zwei Ankunftsbereiche – welcher für Sie gilt, hängt von Ihrem Flug ab; anhand Ihrer Flugnummer wissen wir es und positionieren den Fahrer entsprechend. Was Ankunft 1 und Ankunft 2 unterscheidet, erklärt [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Schritt 2: Das Namensschild", p: [
          "Unmittelbar hinter dem Ausgang, in der Ankunftshalle, steht Ihr Chauffeur mit einem Schild. Darauf steht der Name, den Sie bei der Buchung angegeben haben – auf Wunsch auch ein Firmenname, wenn Sie Gäste empfangen lassen. Sie müssen nicht nach draussen, nicht ins Parkhaus und nicht zum Taxistand. Der Fahrer stellt sich vor, übernimmt das Gepäck und begleitet Sie zum Fahrzeug im direkt angeschlossenen Parkhaus. Vom Schild bis zum Mercedes sind es wenige Minuten zu Fuss.",
        ]},
        { h: "Schritt 3: Wartezeit – 60 Minuten inklusive", p: [
          "Nach der tatsächlichen Landung sind 60 Minuten Wartezeit im Festpreis enthalten. Das reicht für Passkontrolle, Gepäck und einen Kaffee, auch wenn das Gepäckband einmal länger braucht. Dauert es aussergewöhnlich lange – etwa weil ein Koffer nicht angekommen ist –, genügt eine kurze WhatsApp-Nachricht. Der Fahrer bleibt.",
        ]},
        { h: "Verspätung? Wir wissen es vor Ihnen", p: [
          "Wir verfolgen Ihren Flug ab dem Abflug. Verspätet er sich, verschiebt sich die Abholung automatisch mit; Sie müssen niemanden anrufen. Auch bei Umleitungen finden wir eine Lösung. Was genau bei Verspätung, Umleitung und Annullierung passiert, steht in [Flug verspätet oder annulliert?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h: "Was Sie vorbereiten können", p: [
          "Geben Sie bei der Buchung die vollständige Flugnummer an. Schalten Sie nach der Landung das Telefon ein – das kostenlose Flughafen-WLAN reicht für WhatsApp. Und wenn Sie sich einmal nicht auf Anhieb finden: Bleiben Sie am Ausgang stehen und schreiben Sie uns Ihren Namen; die Zentrale ist rund um die Uhr erreichbar. So wird die Ankunft in Zürich zum einfachsten Teil der Reise – egal, ob es weiter nach [Luzern](/zurich-airport-to-luzern), [Basel](/zurich-airport-to-basel) oder in die Berge geht. [Transfer buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Arriving at Zurich Airport: How to Find Your Driver in 3 Minutes",
      excerpt: "From the gate to the Mercedes without searching: where your chauffeur waits, what meet & greet actually means, how waiting time is handled and why delays are not an issue.",
      body: [
        { p: [
          "The moment after landing shapes the first impression of a trip. Anyone who still has to read signs, operate ticket machines or queue at the taxi rank after a twelve-hour flight arrives stressed. A pre-booked transfer takes exactly that off your hands – provided the procedure is clear. This article describes it step by step: from baggage claim to the vehicle.",
        ]},
        { h: "Step 1: collect luggage, follow the exit", p: [
          "After passport control and baggage claim, follow the signs to the exit into the public arrivals hall. Zurich Airport has two arrivals areas – which one applies to you depends on your flight; your flight number tells us and we position the driver accordingly. What distinguishes Arrival 1 and Arrival 2 is explained in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Step 2: the name sign", p: [
          "Right behind the exit, in the arrivals hall, your chauffeur stands with a sign. It shows the name you entered when booking – on request also a company name if you have guests collected. You do not need to go outside, into the car park or to the taxi rank. The driver introduces himself, takes the luggage and walks you to the vehicle in the directly connected car park. From the sign to the Mercedes is a few minutes on foot.",
        ]},
        { h: "Step 3: waiting time – 60 minutes included", p: [
          "After the actual landing, 60 minutes of waiting time are included in the fixed price. That covers passport control, luggage and a coffee, even if the baggage belt takes longer for once. If it takes unusually long – for instance because a suitcase did not arrive – a short WhatsApp message is enough. The driver stays.",
        ]},
        { h: "Delayed? We know before you do", p: [
          "We track your flight from departure. If it is delayed, the pickup shifts automatically; you do not need to call anyone. We find a solution for diversions too. Exactly what happens in case of delay, diversion and cancellation is in [Flight delayed or cancelled?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h: "What you can prepare", p: [
          "Enter the complete flight number when booking. Switch on your phone after landing – the free airport Wi-Fi is enough for WhatsApp. And if for once you do not find each other straight away: stay at the exit and send us your name; dispatch is reachable around the clock. This makes arriving in Zurich the easiest part of the trip – whether you continue to [Lucerne](/zurich-airport-to-luzern), [Basel](/zurich-airport-to-basel) or the mountains. [Book a transfer](/buchung).",
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
      excerpt: "Die SBB ist exzellent – und trotzdem gibt es Situationen, in denen der private Transfer klar gewinnt. Ein fairer Blick auf Zeit, Komfort, Gepäck und Planbarkeit, ohne Verkaufsgerede.",
      body: [
        { p: [
          "Die Schweiz hat eines der besten Bahnnetze der Welt, und der Bahnhof liegt direkt unter dem Flughafen Zürich. Wer also behauptet, der Zug sei nie die richtige Wahl, ist unglaubwürdig. Umgekehrt gibt es Reisesituationen, in denen die Bahn ihre Stärken verliert und der private Transfer eindeutig die bessere Entscheidung ist. Dieser Beitrag ordnet beides ehrlich ein.",
        ]},
        { h: "Wann der Zug die richtige Wahl ist", p: [
          "Sie reisen allein oder zu zweit mit Handgepäck, Ihr Ziel liegt in Bahnhofsnähe einer grossen Stadt, Sie landen tagsüber, und Sie haben keine Eile. In diesem Fall ist die Bahn schnell, zuverlässig und landschaftlich schön – nach Zürich HB in wenigen Minuten, nach Bern oder Basel ohne Stau. Wer sich in der Schweiz auskennt, wird den Zug oft wählen, und das ist richtig so.",
        ]},
        { h: "Wann der Transfer gewinnt", p: [
          "Gepäck: Zwei grosse Koffer, Skitaschen, ein Kinderwagen – auf Perrons, in Treppenhäusern und beim Umsteigen wird das zur Belastung. Im Transfer bleibt alles im Kofferraum, bis der Fahrer es vor der Haustür auslädt. Welche Klasse zu welchem Gepäck passt, steht in [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "Gruppe: Ab drei Personen gilt der Festpreis pro Fahrzeug – der Vergleich pro Kopf verschiebt sich deutlich. Für fünf bis sieben Reisende ist die V-Klasse fast immer die wirtschaftlichere Lösung, wie [5 bis 7 Personen ab Flughafen Zürich](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug) vorrechnet.",
          "Ziel: Hotels am See, in den Bergen oder ausserhalb der Zentren liegen selten neben einem Bahnhof. Die letzte Etappe mit Postauto, Taxi oder zu Fuss kostet Zeit und Nerven. Der Transfer endet an der Adresse – ob in [Grindelwald](/zurich-airport-to-grindelwald), [Davos](/zurich-airport-to-davos) oder am Bürgenstock.",
          "Zeit: Spät abends und nachts dünnt der Fahrplan aus; nach 23 Uhr ist die Weiterreise in andere Landesteile oft nicht mehr möglich. Der Transfer fährt rund um die Uhr, siehe [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
          "Planbarkeit: Der Preis steht vor der Abreise fest, der Fahrer steht bei der Landung bereit, und Sie erhalten eine Rechnung mit Mehrwertsteuer. Für Geschäftsreisende ist das oft der entscheidende Punkt.",
        ]},
        { h: "Und das Taxi vom Stand?", p: [
          "Das Taxi ist für kurze, spontane Fahrten in die Stadt eine gute Option. Auf längeren Strecken kennen Sie den Preis erst am Ziel, und ein Fahrzeug mit sieben Plätzen oder Kindersitz ist am Stand nicht garantiert. Den vollständigen Vergleich finden Sie in [Taxi am Flughafen Zürich](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen).",
        ]},
        { h: "Fazit", p: [
          "Zug für den leichten Solo-Trip in die Stadt bei Tag; Transfer für Gepäck, Gruppen, abgelegene Ziele, späte Landungen und alle, die den Preis vorher kennen wollen. Unsere Festpreise sehen Sie auf der [Preisseite](/preise) – und entscheiden dann selbst. [Jetzt buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Taxi or Train From Zurich Airport? The Honest Comparison",
      excerpt: "Swiss rail is excellent – and yet there are situations in which a private transfer clearly wins. A fair look at time, comfort, luggage and predictability, without a sales pitch.",
      body: [
        { p: [
          "Switzerland has one of the best rail networks in the world, and the station lies directly beneath Zurich Airport. Anyone claiming the train is never the right choice is not credible. Conversely, there are travel situations in which rail loses its strengths and a private transfer is clearly the better decision. This article assesses both honestly.",
        ]},
        { h: "When the train is the right choice", p: [
          "You travel alone or as a couple with hand luggage, your destination is near the station of a major city, you land during the day, and you are in no hurry. In that case rail is fast, reliable and scenic – to Zurich main station in minutes, to Bern or Basel without traffic jams. Anyone who knows Switzerland will often choose the train, and rightly so.",
        ]},
        { h: "When the transfer wins", p: [
          "Luggage: two large suitcases, ski bags, a pushchair – on platforms, in stairwells and when changing trains this becomes a burden. In the transfer everything stays in the boot until the driver unloads it at your front door. Which class suits which luggage is in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "Group: from three people the fixed price is per vehicle – the per-head comparison shifts markedly. For five to seven travellers the V-Class is almost always the more economical solution, as [5 to 7 people from Zurich Airport](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug) works out.",
          "Destination: hotels on the lake, in the mountains or outside the centres are rarely next to a station. The last leg by bus, taxi or on foot costs time and nerves. The transfer ends at the address – whether in [Grindelwald](/zurich-airport-to-grindelwald), [Davos](/zurich-airport-to-davos) or on the Bürgenstock.",
          "Time: late in the evening and at night the timetable thins out; after 11 pm onward travel to other parts of the country is often no longer possible. The transfer runs around the clock, see [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
          "Predictability: the price is fixed before departure, the driver is ready when you land, and you receive an invoice with VAT. For business travellers this is often the deciding point.",
        ]},
        { h: "And the taxi from the rank?", p: [
          "The taxi is a good option for short, spontaneous rides into the city. On longer routes you only know the fare at the destination, and a vehicle with seven seats or a child seat is not guaranteed at the rank. The full comparison is in [Taxi at Zurich Airport](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen).",
        ]},
        { h: "Conclusion", p: [
          "Train for the light solo trip into the city by day; transfer for luggage, groups, remote destinations, late landings and anyone who wants to know the price in advance. Our fixed prices are on the [prices page](/preise) – then decide for yourself. [Book now](/buchung).",
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
      excerpt: "Davos, St. Moritz, Grindelwald, Engelberg: Fahrzeiten im Winter, Skigepäck ohne Aufpreis, Wechselsamstage und warum frühe Buchung in der Hochsaison Gold wert ist.",
      body: [
        { p: [
          "Von Dezember bis April ist der Flughafen Zürich das Tor zu den Alpen. Die meisten grossen Skigebiete liegen zwischen zwei und viereinhalb Stunden entfernt – nah genug für einen Transfer ohne Umsteigen, weit genug, dass Planung zählt. Dieser Guide fasst zusammen, was Sie beim Wintertransfer mit Skigepäck beachten sollten.",
        ]},
        { h: "Die wichtigsten Ski-Strecken ab Flughafen Zürich", p: [
          "[Davos](/zurich-airport-to-davos): rund 3 Stunden 15 Minuten. [St. Moritz](/zurich-airport-to-st-moritz): rund 4 Stunden 15 Minuten über den Julierpass – Details in [St. Moritz und Engadin im Winter](/blog/st-moritz-engadin-winter-transfer-flughafen-zuerich). [Grindelwald](/zurich-airport-to-grindelwald): rund 2 Stunden 50 Minuten; [Wengen](/zurich-airport-to-wengen) bis zur Talstation Lauterbrunnen. [Engelberg](/zurich-airport-to-engelberg): unter zwei Stunden. [Zermatt](/zurich-airport-to-zermatt) bis Täsch, wie in [Zermatt: Warum der Transfer in Täsch endet](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei) beschrieben. Alle Preise: Business Class, pro Fahrzeug – vollständige Liste auf der [Preisseite](/preise).",
        ]},
        { h: "Skigepäck: kostenlos, bis zu vier Taschen", p: [
          "Skitaschen und Snowboards befördern wir ohne Aufpreis, bis zu vier pro Fahrzeug. In der E-Klasse geht das über die Durchlade für zwei Personen mit Ausrüstung; für Familien und Gruppen ist die Business & Family Class (V-Klasse, bis 7 Personen und 7 Koffer) die richtige Wahl. Geben Sie Skigepäck bei der Buchung an, damit der Laderaum vorbereitet ist. Schuhe und Helme gehören in den Koffer oder eine separate Tasche.",
        ]},
        { h: "Winterfahrzeiten und Wechselsamstage", p: [
          "Schneefall, Räumung und Kolonnenverkehr verlängern die Fahrzeiten aus den Bergen spürbar. An Wechselsamstagen in den Weihnachts-, Sport- und Osterferien kommt Reiseverkehr dazu. Planen Sie für die Rückfahrt zum Flughafen mindestens 45 Minuten Puffer auf die Normalfahrzeit, bei angekündigtem Schneefall eine Stunde – die Rechnung dazu in [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). Unsere Fahrzeuge sind für den Winter ausgerüstet; die Fahrer kennen Pässe, Ausweichrouten und Autoverladungen.",
        ]},
        { h: "Frühe Buchung: warum sie im Winter zählt", p: [
          "Die Hochsaison zwischen Weihnachten und Neujahr, die Sportferien im Februar und das WEF in Davos im Januar binden Kapazitäten. Wer seinen Transfer mit dem Flug bucht, hat Fahrer, Fahrzeug und Kindersitze sicher. Für das WEF gelten Sonderregeln, siehe [WEF Davos Transfer-Guide](/blog/wef-davos-transfer-guide). Und bei Landungen nach 23 Uhr gilt: vorher buchen – [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr) erklärt, warum.",
        ]},
        { h: "Kinder im Skiurlaub", p: [
          "Kindersitze und Babyschalen stellen wir kostenlos bereit; geben Sie Alter und Anzahl an. In der V-Klasse sitzen Eltern und Kinder einander gegenüber – auf drei Stunden ins Engadin ein echter Vorteil. [Jetzt Wintertransfer buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Winter Season in the Alps: Ski Transfers From Zurich That Work",
      excerpt: "Davos, St. Moritz, Grindelwald, Engelberg: winter driving times, ski luggage at no extra charge, changeover Saturdays and why booking early in high season is worth its weight in gold.",
      body: [
        { p: [
          "From December to April, Zurich Airport is the gateway to the Alps. Most major ski resorts lie between two and four and a half hours away – close enough for a transfer without changes, far enough that planning matters. This guide summarises what to consider for a winter transfer with ski luggage.",
        ]},
        { h: "The key ski routes from Zurich Airport", p: [
          "[Davos](/zurich-airport-to-davos): around 3 hours 15 minutes. [St. Moritz](/zurich-airport-to-st-moritz): around 4 hours 15 minutes over the Julier Pass – details in [St. Moritz and the Engadin in winter](/blog/st-moritz-engadin-winter-transfer-flughafen-zuerich). [Grindelwald](/zurich-airport-to-grindelwald): around 2 hours 50 minutes; [Wengen](/zurich-airport-to-wengen) to the valley station in Lauterbrunnen. [Engelberg](/zurich-airport-to-engelberg): under two hours. [Zermatt](/zurich-airport-to-zermatt) to Täsch, as described in [Zermatt: why the transfer ends in Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei). All prices: Business Class, per vehicle – full list on the [prices page](/preise).",
        ]},
        { h: "Ski luggage: free, up to four bags", p: [
          "We carry ski bags and snowboards at no extra charge, up to four per vehicle. In the E-Class this works via the ski hatch for two people with equipment; for families and groups the Business & Family Class (V-Class, up to 7 people and 7 suitcases) is the right choice. Mention ski luggage when booking so the load space is prepared. Boots and helmets belong in the suitcase or a separate bag.",
        ]},
        { h: "Winter driving times and changeover Saturdays", p: [
          "Snowfall, clearing and column traffic noticeably extend driving times from the mountains. On changeover Saturdays during the Christmas, sports and Easter holidays, holiday traffic is added. For the return to the airport, allow at least 45 minutes of buffer on the normal driving time, one hour when snowfall is forecast – the calculation is in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). Our vehicles are equipped for winter; the drivers know passes, alternative routes and car-trains.",
        ]},
        { h: "Early booking: why it matters in winter", p: [
          "High season between Christmas and New Year, the February sports holidays and the WEF in Davos in January tie up capacity. Anyone who books the transfer with the flight has driver, vehicle and child seats secured. Special rules apply for the WEF, see [WEF Davos transfer guide](/blog/wef-davos-transfer-guide). And for landings after 11 pm: book in advance – [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr) explains why.",
        ]},
        { h: "Children on a ski holiday", p: [
          "Child seats and baby shells are provided free of charge; state age and number. In the V-Class, parents and children sit facing each other – a real advantage on three hours into the Engadin. [Book your winter transfer now](/buchung).",
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
      excerpt: "Ein voller Tag in Zürich, richtig getaktet: Altstadt, See, Aussicht und ein Abend am Wasser – mit Fahrer, der das Gepäck hütet und Sie pünktlich zum Anschlussflug bringt.",
      body: [
        { p: [
          "Ein Tag zwischen zwei Flügen ist kein verlorener Tag – wenn man ihn richtig plant. Zürich ist kompakt, der Flughafen liegt nur wenige Minuten entfernt, und mit einem Fahrer entfällt alles, was Zeit frisst: Gepäck, Fahrpläne, Parkplätze. Dieses Programm haben wir mit vielen Gästen erprobt. Für kürzere Zeitfenster empfehlen wir [Zwischenlandung in Zürich: 4 bis 8 Stunden](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ]},
        { h: "Morgen: Altstadt und Limmat", p: [
          "Der Fahrer holt Sie in der Ankunftshalle ab; das Gepäck bleibt im Fahrzeug. Erster Halt: Lindenhof, die Terrasse über der Limmat mit Blick auf Grossmünster, Fraumünster und die Dächer der Altstadt. Von dort zu Fuss durch das Niederdorf, am Grossmünster vorbei über die Münsterbrücke zum Fraumünster mit den Chagall-Fenstern. Kaffee in einem der Cafés an der Limmat.",
        ]},
        { h: "Mittag: See und Bahnhofstrasse", p: [
          "Die Bahnhofstrasse hinunter zum Bürkliplatz, wo sich der See öffnet und an klaren Tagen die Alpen am Horizont stehen. Mittagessen am Wasser – die Auswahl reicht von der Fischbeiz bis zum Sternerestaurant. Wer möchte, nimmt für eine Stunde das Kursschiff oder lässt sich vom Fahrer zum Seebad Utoquai oder zur Roten Fabrik fahren.",
        ]},
        { h: "Nachmittag: Aussicht", p: [
          "Mit Fahrer ist der Uetliberg keine Bergfahrt, sondern ein Abstecher: Der Wagen bringt Sie hinauf, oben warten Aussichtsturm und der Blick über See, Stadt und Alpenkette. Alternativ das Kunsthaus, das Landesmuseum beim Hauptbahnhof oder – für Familien – der Zoo mit der Masoala-Halle auf dem Zürichberg. Wer die Stadt kennt, fährt weiter zum Rheinfall, wie in [Rheinfall ab Flughafen Zürich](/blog/rheinfall-ab-flughafen-zuerich-halbtagesausflug) beschrieben.",
        ]},
        { h: "Abend: Zürich-West und Seebecken", p: [
          "Zürich-West unter dem Viadukt zeigt die moderne Seite der Stadt: Restaurants, Bars, das Prime Tower. Zum Abschluss zurück ans Seebecken, wo die Stadt abends am schönsten ist. Der Fahrer bringt Sie ins Hotel oder direkt zum Flughafen – je nachdem, wann der Anschlussflug geht.",
        ]},
        { h: "So funktioniert der Tag mit Fahrer", p: [
          "Buchen Sie unsere Stundenbuchung mit der gewünschten Dauer: Fahrzeug und Chauffeur stehen zur Verfügung, Sie steigen aus, wo Sie wollen, und ein, wenn Sie weiter möchten. Der Fahrer kennt die Stadt, schlägt Alternativen bei Regen vor und hält die Rückkehrzeit zum Flughafen ein, die Sie gemeinsam festgelegt haben. Buchen Sie im Voraus, damit er bei der Landung bereitsteht – [hier anfragen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "24 Hours in Zurich: The Perfect Programme Between Two Flights",
      excerpt: "A full day in Zurich, properly paced: old town, lake, viewpoint and an evening by the water – with a driver who guards the luggage and gets you to the connecting flight on time.",
      body: [
        { p: [
          "A day between two flights is not a lost day – if you plan it properly. Zurich is compact, the airport is only minutes away, and with a driver everything that eats time disappears: luggage, timetables, parking. We have tested this programme with many guests. For shorter windows we recommend [Layover in Zurich: 4 to 8 hours](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ]},
        { h: "Morning: old town and Limmat", p: [
          "The driver collects you in the arrivals hall; the luggage stays in the vehicle. First stop: Lindenhof, the terrace above the Limmat with a view of Grossmünster, Fraumünster and the roofs of the old town. From there on foot through the Niederdorf, past the Grossmünster and over the Münsterbrücke to the Fraumünster with its Chagall windows. Coffee in one of the cafés on the Limmat.",
        ]},
        { h: "Midday: lake and Bahnhofstrasse", p: [
          "Down Bahnhofstrasse to Bürkliplatz, where the lake opens up and on clear days the Alps stand on the horizon. Lunch by the water – the choice ranges from a fish tavern to a Michelin-starred restaurant. If you like, take the lake steamer for an hour or have the driver take you to the Utoquai lake baths or the Rote Fabrik.",
        ]},
        { h: "Afternoon: the view", p: [
          "With a driver, the Uetliberg is not a mountain trip but a detour: the car takes you up, at the top await the lookout tower and the view over lake, city and Alpine chain. Alternatively the Kunsthaus, the National Museum by the main station or – for families – the zoo with the Masoala hall on the Zürichberg. Anyone who knows the city continues to the Rhine Falls, as described in [Rhine Falls from Zurich Airport](/blog/rheinfall-ab-flughafen-zuerich-halbtagesausflug).",
        ]},
        { h: "Evening: Zurich West and the lake basin", p: [
          "Zurich West under the viaduct shows the modern side of the city: restaurants, bars, the Prime Tower. To finish, back to the lake basin, where the city is at its most beautiful in the evening. The driver takes you to the hotel or directly to the airport – depending on when the connecting flight leaves.",
        ]},
        { h: "How the day with a driver works", p: [
          "Book our hourly service for the desired duration: vehicle and chauffeur are available, you get out where you like and in when you want to move on. The driver knows the city, suggests alternatives in rain and keeps to the return time to the airport that you agreed together. Book in advance so he is ready when you land – [enquire here](/buchung).",
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
      excerpt: "Gesperrte Strassen, Sicherheitszonen, knappe Kapazitäten und enge Zeitfenster: So funktioniert der Transfer vom Flughafen Zürich nach Davos während des Weltwirtschaftsforums – und was Sie Monate vorher tun sollten.",
      body: [
        { p: [
          "Eine Woche im Januar verwandelt Davos in den am besten gesicherten Ort Europas. Für Delegationen, Unternehmen und Medien beginnt das Weltwirtschaftsforum lange vor der ersten Sitzung – mit der Frage, wie man überhaupt hinkommt. Dieser Guide erklärt, was den Transfer in der WEF-Woche von einer normalen Fahrt nach Davos unterscheidet. Die Eventseite mit Daten und Anfrage finden Sie unter [WEF Davos](/events).",
        ]},
        { h: "Die Strecke ausserhalb der WEF-Woche", p: [
          "Normalerweise dauert der [Transfer Flughafen Zürich–Davos](/zurich-airport-to-davos) über die A3 und A13 via Landquart und die Prättigauerstrasse rund 3 Stunden 15 Minuten; der Festpreis wird nach Kilometertarif berechnet, pro Fahrzeug. Während des WEF gelten für die letzte Etappe andere Regeln.",
        ]},
        { h: "Sicherheitszonen und Zufahrten", p: [
          "Rund um das Kongresszentrum und die Hotels der Delegationen richtet die Polizei Sperrzonen ein, in die nur akkreditierte Fahrzeuge einfahren dürfen. Für alle anderen enden die Fahrten an definierten Punkten am Ortsrand oder bei den Hotels ausserhalb der Zone. Unsere Fahrer kennen die jeweils aktuellen Regelungen und stimmen den Absetzpunkt mit Ihnen ab. Wenn Ihre Organisation Fahrzeugakkreditierungen ausstellt, teilen Sie uns das bei der Buchung mit – dann klären wir, ob eine Zufahrt bis zum Hotel möglich ist.",
        ]},
        { h: "Zeit: rechnen Sie grosszügig", p: [
          "In der WEF-Woche ist der Verkehr im Prättigau dicht, Kontrollen sind möglich, und Schneefall kommt im Januar dazu. Wir planen für die Strecke mindestens eine Stunde Puffer auf die Normalfahrzeit und empfehlen für Rückfahrten zum Flughafen frühe Abholzeiten. Die Rechnung dazu steht in [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). Für mehrere Flüge einer Delegation koordinieren wir Fahrzeuge so, dass die Gruppe gemeinsam oder gestaffelt ankommt.",
        ]},
        { h: "Kapazität: buchen Sie früh", p: [
          "Fahrzeuge und Fahrer für die WEF-Woche sind Monate im Voraus vergeben. Wer im Herbst bucht, hat Auswahl bei Fahrzeugklasse und Zeiten; wer im Januar anfragt, findet wenig. Für Delegationen empfehlen wir ein Fahrzeug pro Zeitfenster statt einer Sammelfahrt – so bleiben Änderungen einzelner Flüge beherrschbar. Unsere Premium Class (Mercedes-Benz S-Klasse) ist für Repräsentationsfahrten die passende Wahl; alle Klassen auf der [Fahrzeugseite](/fahrzeuge).",
        ]},
        { h: "Diskretion und Rechnung", p: [
          "Auf Wunsch tragen Namensschilder nur den Firmennamen, und der Fahrer wartet an einem vereinbarten Punkt statt in der Halle. Für Firmen erstellen wir Sammelrechnungen mit ausgewiesener Mehrwertsteuer. Schreiben Sie uns Personenzahl, Flüge und Hotel – Sie erhalten ein Angebot, das zur Woche passt. [WEF-Transfer anfragen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "WEF Davos: The Transfer Guide for the Most Demanding Week of the Year",
      excerpt: "Closed roads, security zones, scarce capacity and tight time windows: how the transfer from Zurich Airport to Davos works during the World Economic Forum – and what to do months in advance.",
      body: [
        { p: [
          "One week in January turns Davos into the best-secured place in Europe. For delegations, companies and media, the World Economic Forum begins long before the first session – with the question of how to get there at all. This guide explains what distinguishes the transfer in WEF week from a normal journey to Davos. The event page with dates and enquiry is at [WEF Davos](/events).",
        ]},
        { h: "The route outside WEF week", p: [
          "Normally the [Zurich Airport–Davos transfer](/zurich-airport-to-davos) via the A3 and A13 through Landquart and the Prättigau road takes around 3 hours 15 minutes; the fixed price is calculated by kilometre tariff, per vehicle. During the WEF, different rules apply to the final stage.",
        ]},
        { h: "Security zones and access", p: [
          "Around the congress centre and the delegation hotels, police set up closure zones that only accredited vehicles may enter. For everyone else, journeys end at defined points on the edge of town or at hotels outside the zone. Our drivers know the current regulations and agree the drop-off point with you. If your organisation issues vehicle accreditations, tell us when booking – then we clarify whether access to the hotel is possible.",
        ]},
        { h: "Time: calculate generously", p: [
          "In WEF week, traffic in the Prättigau is dense, checks are possible, and snowfall comes on top in January. We plan at least an hour of buffer on the normal driving time and recommend early pickup times for returns to the airport. The calculation is in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). For several flights of one delegation, we coordinate vehicles so the group arrives together or staggered.",
        ]},
        { h: "Capacity: book early", p: [
          "Vehicles and drivers for WEF week are allocated months in advance. Booking in autumn gives you a choice of vehicle class and times; enquiring in January leaves little. For delegations we recommend one vehicle per time window rather than a collective ride – this keeps changes to individual flights manageable. Our Premium Class (Mercedes-Benz S-Class) is the right choice for representative journeys; all classes on the [vehicles page](/fahrzeuge).",
        ]},
        { h: "Discretion and invoicing", p: [
          "On request, name signs show only the company name, and the driver waits at an agreed point instead of in the hall. For companies we issue consolidated invoices with VAT shown. Send us the number of people, flights and hotel – you receive a proposal that fits the week. [Enquire about a WEF transfer](/buchung).",
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
      excerpt: "Welche Sitzpflicht in der Schweiz gilt, welcher Sitz zu welchem Alter passt, wie Sie Kinder bei der Buchung angeben – und warum Kindersitze bei uns immer kostenlos sind.",
      body: [
        { p: [
          "Wer mit Kindern reist, hat andere Prioritäten: Sicherheit, wenig Umsteigen, kein Warten. Ein privater Transfer ab Flughafen Zürich erfüllt alle drei – wenn die Kindersitze stimmen. Dieser Beitrag erklärt die Schweizer Regeln, unsere Ausstattung und was Sie bei der Buchung angeben sollten. Für Babys und Kleinkinder im Speziellen lesen Sie auch [Mit Baby und Kleinkind ab Flughafen Zürich](/blog/mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen).",
        ]},
        { h: "Die Regel: bis 12 Jahre oder 150 cm", p: [
          "In der Schweiz müssen Kinder bis zum vollendeten 12. Lebensjahr oder bis zu einer Körpergrösse von 150 cm in einer geeigneten Kinderrückhaltevorrichtung mitfahren – in jedem Personenwagen, auch in Taxis und Transferfahrzeugen. Der Sitz muss zu Gewicht und Grösse des Kindes passen. Für Sie heisst das: Ein Sitz muss vorhanden sein. Bei uns ist er das, ohne Aufpreis.",
        ]},
        { h: "Welcher Sitz für welches Alter", p: [
          "Babyschale rückwärtsgerichtet für Säuglinge und Babys bis etwa 12 bis 15 Monate. Kindersitz mit Gurt oder Fangkörper für Kleinkinder ab etwa einem Jahr bis rund vier Jahre. Sitzerhöhung mit Rückenlehne für Kinder ab etwa vier Jahren bis 12 Jahre beziehungsweise 150 cm. Im Buchungsformular wählen Sie den Kindersitz für Kinder von 15 bis 36 kg direkt aus; für jüngere Kinder und Babyschalen geben Sie Alter und Anzahl im Notizfeld an. Eigene Sitze dürfen Sie selbstverständlich mitbringen.",
        ]},
        { h: "Welches Fahrzeug für Familien", p: [
          "Für eine Familie mit einem Kind und normalem Gepäck reicht die Business Class (E-Klasse, 2 Erwachsene plus Kind mit Sitz). Ab zwei Kindern oder mit Kinderwagen, Reisebett und mehreren Koffern ist die Business & Family Class (V-Klasse, bis 7 Personen und 7 Koffer) die entspanntere Wahl – Eltern und Kinder sitzen einander gegenüber, und alles Sperrige findet Platz. Unser [Gepäck-Guide](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse) hilft bei der Einschätzung; alle Klassen auf der [Fahrzeugseite](/fahrzeuge).",
        ]},
        { h: "Was den Familien-Transfer sonst ausmacht", p: [
          "Der Chauffeur wartet in der Ankunftshalle mit Namensschild, hilft mit Kinderwagen und Gepäck und bringt Sie zum Fahrzeug im direkt angeschlossenen Parkhaus – keine Treppen, kein Shuttle. 60 Minuten Wartezeit nach der Landung sind inklusive; wenn das Wickeln länger dauert, ist das kein Problem. Der Festpreis gilt pro Fahrzeug, ob nach [Luzern](/zurich-airport-to-luzern), [Interlaken](/zurich-airport-to-interlaken) oder ins Skigebiet. Und bei Verspätung passt sich die Abholzeit automatisch an.",
        ]},
        { h: "Checkliste für die Buchung", p: [
          "Anzahl und Alter der Kinder. Kinderwagen ja oder nein. Gepäck ehrlich gezählt. Flugnummer. Telefonnummer, die im Ausland erreichbar ist. Mehr braucht es nicht – [Familientransfer buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Travelling With Children: Child-Seat Rules and Family Transfers in Switzerland",
      excerpt: "Which seat requirements apply in Switzerland, which seat suits which age, how to state children when booking – and why child seats are always free with us.",
      body: [
        { p: [
          "Travelling with children means different priorities: safety, few changes, no waiting. A private transfer from Zurich Airport meets all three – if the child seats are right. This article explains the Swiss rules, our equipment and what to state when booking. For babies and toddlers in particular, also read [With a baby or toddler from Zurich Airport](/blog/mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen).",
        ]},
        { h: "The rule: up to 12 years or 150 cm", p: [
          "In Switzerland, children up to the age of 12 or up to a height of 150 cm must travel in a suitable child restraint – in every passenger car, including taxis and transfer vehicles. The seat must match the child's weight and height. For you this means: a seat must be present. With us it is, at no extra charge.",
        ]},
        { h: "Which seat for which age", p: [
          "Rear-facing baby shell for infants and babies up to around 12 to 15 months. Child seat with harness or impact shield for toddlers from about one year to around four years. High-back booster for children from about four years up to 12 years or 150 cm. In the booking form you select the child seat for children of 15 to 36 kg directly; for younger children and baby shells, state age and number in the notes field. You are of course welcome to bring your own seats.",
        ]},
        { h: "Which vehicle for families", p: [
          "For a family with one child and normal luggage, the Business Class (E-Class, 2 adults plus child with seat) is sufficient. From two children or with a pushchair, travel cot and several suitcases, the Business & Family Class (V-Class, up to 7 people and 7 suitcases) is the more relaxed choice – parents and children sit facing each other, and everything bulky fits. Our [luggage guide](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse) helps with the assessment; all classes on the [vehicles page](/fahrzeuge).",
        ]},
        { h: "What else makes the family transfer", p: [
          "The chauffeur waits in the arrivals hall with a name sign, helps with pushchair and luggage and takes you to the vehicle in the directly connected car park – no stairs, no shuttle. 60 minutes of waiting time after landing are included; if changing the baby takes longer, it is no problem. The fixed price applies per vehicle, whether to [Lucerne](/zurich-airport-to-luzern), [Interlaken](/zurich-airport-to-interlaken) or the ski resort. And if there is a delay, the pickup time adjusts automatically.",
        ]},
        { h: "Booking checklist", p: [
          "Number and age of children. Pushchair yes or no. Luggage counted honestly. Flight number. A phone number reachable abroad. Nothing more is needed – [book a family transfer](/buchung).",
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
      excerpt: "Vom Sitzplatz bis zur Spesenabrechnung: kleine Routinen, die Geschäftsreisen über den Flughafen Zürich messbar entspannter machen – und wie der Transfer in diese Routinen passt.",
      body: [
        { p: [
          "Wer jede Woche fliegt, optimiert nicht den einzelnen Flug, sondern das System. Die effizientesten Geschäftsreisenden, die wir fahren, haben ein paar Gewohnheiten gemeinsam. Keine davon ist spektakulär – aber zusammen sparen sie pro Reise eine Stunde und ein paar Nerven. Hier sind fünf, die sich am Flughafen Zürich besonders auszahlen.",
        ]},
        { h: "1. Den Transfer mit dem Flug buchen, nicht nach der Landung", p: [
          "Die Buchung des Transfers gehört in denselben Arbeitsschritt wie der Flug. Dann sind Fahrer, Fahrzeug und Zeit fixiert, die Flugnummer ist hinterlegt, und Verspätungen regeln sich von selbst. Wer nach der Landung erst ein Taxi sucht, verliert am Stand Zeit und kennt den Preis nicht. Unsere Festpreise nach [Zug](/zurich-airport-to-zug), [Basel](/zurich-airport-to-basel), [Bern](/zurich-airport-to-bern) oder [Winterthur](/zurich-airport-to-winterthur) stehen auf der [Preisseite](/preise).",
        ]},
        { h: "2. Die Rückfahrt gleich mitbuchen", p: [
          "Der Weg zum Flughafen ist der riskantere Teil der Reise. Eine fixe Abholzeit an der Adresse – der Fahrer wartet, nicht Sie – nimmt den Druck aus dem letzten Meeting. Wie Sie die Abholzeit für Morgenflüge richtig berechnen, zeigt [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "3. Die Fahrt als Arbeitszeit nutzen", p: [
          "75 Minuten nach Luzern oder 105 Minuten nach Basel sind ein produktiver Block: E-Mails, Vorbereitung, Anrufe – im Fahrzeug ungestört, mit Ladeanschluss und auf Wunsch WLAN. Wer im Zug sitzt, wechselt Perron und Sitzplatz; wer selbst fährt, arbeitet nicht. Unsere Business Class (E-Klasse) ist für genau diese Stunde gebaut; die Premium Class (S-Klasse) für Fahrten mit Gästen. Details auf der [Fahrzeugseite](/fahrzeuge).",
        ]},
        { h: "4. Eine Rechnung, die die Spesenabrechnung überlebt", p: [
          "Jede Fahrt bei uns erzeugt eine Rechnung mit ausgewiesener Mehrwertsteuer, Buchungsreferenz und Strecke – automatisch per E-Mail, ohne Quittungen vom Taxameter zu fotografieren. Für Firmen mit regelmässigen Fahrten erstellen wir Sammelrechnungen; Namensschilder tragen auf Wunsch den Firmennamen, wenn Sie Gäste empfangen lassen.",
        ]},
        { h: "5. Spät landen ohne Plan B", p: [
          "Der letzte Flug aus London oder Frankfurt landet oft nach 22 Uhr. Wer dann noch nach Zug oder Luzern muss, hat mit der Bahn wenig Optionen. Ein vorgebuchter Nachttransfer zum gleichen Festpreis macht die späte Verbindung zur normalen – [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr) erklärt die Details und die Regel für spontane Anfragen nach 23 Uhr.",
        ]},
        { h: "Fazit", p: [
          "Fünf Gewohnheiten, ein Ergebnis: Sie steigen aus dem Flugzeug und sind bereits unterwegs zum Termin. [Transfer buchen](/buchung) – oder schreiben Sie uns für ein Firmenkonto mit Sammelrechnung.",
        ]},
      ],
    },
    en: {
      title: "Business Travel Zurich: 5 Habits of Efficient Frequent Flyers",
      excerpt: "From seat selection to expense reports: small routines that make business trips via Zurich Airport measurably more relaxed – and how the transfer fits into those routines.",
      body: [
        { p: [
          "Those who fly every week do not optimise the individual flight but the system. The most efficient business travellers we drive share a few habits. None of them is spectacular – but together they save an hour and some nerves per trip. Here are five that pay off particularly at Zurich Airport.",
        ]},
        { h: "1. Book the transfer with the flight, not after landing", p: [
          "Booking the transfer belongs in the same work step as the flight. Then driver, vehicle and time are fixed, the flight number is on file, and delays sort themselves out. Anyone looking for a taxi after landing loses time at the rank and does not know the fare. Our fixed prices to [Zug](/zurich-airport-to-zug), [Basel](/zurich-airport-to-basel), [Bern](/zurich-airport-to-bern) or [Winterthur](/zurich-airport-to-winterthur) are on the [prices page](/preise).",
        ]},
        { h: "2. Book the return at the same time", p: [
          "The way to the airport is the riskier part of the trip. A fixed pickup time at the address – the driver waits, not you – takes the pressure off the last meeting. How to calculate the pickup time for morning flights properly is shown in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "3. Use the drive as working time", p: [
          "75 minutes to Lucerne or 105 minutes to Basel are a productive block: emails, preparation, calls – undisturbed in the vehicle, with charging port and Wi-Fi on request. On the train you change platforms and seats; driving yourself, you do not work. Our Business Class (E-Class) is built for exactly this hour; the Premium Class (S-Class) for journeys with guests. Details on the [vehicles page](/fahrzeuge).",
        ]},
        { h: "4. An invoice that survives the expense report", p: [
          "Every journey with us generates an invoice with VAT shown, booking reference and route – automatically by email, without photographing meter receipts. For companies with regular journeys we issue consolidated invoices; name signs show the company name on request when you have guests collected.",
        ]},
        { h: "5. Land late without a plan B", p: [
          "The last flight from London or Frankfurt often lands after 10 pm. Anyone who then needs to reach Zug or Lucerne has few rail options. A pre-booked night transfer at the same fixed price turns the late connection into a normal one – [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr) explains the details and the rule for spontaneous requests after 11 pm.",
        ]},
        { h: "Conclusion", p: [
          "Five habits, one result: you step off the plane and are already on the way to the meeting. [Book a transfer](/buchung) – or write to us for a corporate account with consolidated invoicing.",
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
      excerpt: "Vier Orte, ein Bergpanorama: Was die Dörfer der Jungfrau-Region unterscheidet, welcher zu welchem Reisenden passt und wie Sie ab Flughafen Zürich am besten anreisen – mit Fahrzeiten und Festpreisen.",
      body: [
        { p: [
          "Eiger, Mönch und Jungfrau bilden die berühmteste Bergkulisse der Schweiz – und zu ihren Füssen liegen vier Orte, die sich deutlich unterscheiden. Wer zum ersten Mal in die Jungfrau-Region reist, steht vor der Frage: Interlaken, Grindelwald, Wengen oder Lauterbrunnen? Dieser Guide hilft bei der Wahl und erklärt die Anreise ab Flughafen Zürich.",
        ]},
        { h: "Interlaken: die Drehscheibe zwischen zwei Seen", p: [
          "Interlaken liegt zwischen Thuner- und Brienzersee und ist der Verkehrsknoten der Region: Hotels aller Kategorien, Ausflugsschiffe, Paragliding über der Höhematte und der Startpunkt der Bahnen ins Tal. Ideal für Reisende, die flexibel bleiben und jeden Tag ein anderes Ziel ansteuern wollen. Der [Transfer Flughafen Zürich–Interlaken](/zurich-airport-to-interlaken) dauert rund 2 Stunden 30 Minuten über Bern und den Thunersee; Festpreis nach Kilometertarif pro Fahrzeug.",
        ]},
        { h: "Grindelwald: das Eigerdorf", p: [
          "Grindelwald liegt direkt unter der Eiger-Nordwand und ist mit dem Eiger Express, der First-Bahn und dem Zugang zum Jungfraujoch der aktivste Ort der Region – im Winter Skigebiet, im Sommer Wanderbasis. Für Familien und Sportler die erste Wahl. Der [Transfer nach Grindelwald](/zurich-airport-to-grindelwald) dauert rund 2 Stunden 50 Minuten; Festpreis nach Kilometertarif. Das Dorf ist mit dem Auto erreichbar, der Fahrer bringt Sie bis zum Hotel.",
        ]},
        { h: "Wengen: autofrei auf der Sonnenterrasse", p: [
          "Wengen thront auf einer Terrasse über dem Lauterbrunnental und ist autofrei – der Transfer endet an der Talstation in Lauterbrunnen, von wo die Zahnradbahn in wenigen Minuten hinauffährt. Ruhig, traditionell, mit Blick auf die Jungfrau; perfekt für alle, die Erholung suchen. [Transfer nach Wengen](/zurich-airport-to-wengen) bis Lauterbrunnen: rund 2 Stunden 40 Minuten. Das Prinzip ist dasselbe wie in Zermatt, siehe [Warum der Transfer in Täsch endet](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "Lauterbrunnen: das Tal der 72 Wasserfälle", p: [
          "Lauterbrunnen ist das Tal selbst: Staubbachfall direkt im Dorf, Trümmelbachfälle im Berg, Zugang nach Wengen und Mürren. Wer ein Zimmer mit Wasserfallblick will und die Bahnen in alle Richtungen nutzen möchte, ist hier richtig. Die Anreise entspricht der nach Wengen – der Fahrer setzt Sie im Dorf ab.",
        ]},
        { h: "Anreise planen: Zug, Auto oder Transfer?", p: [
          "Die Bahn ist landschaftlich schön, verlangt aber zwei bis drei Umstiege mit Gepäck. Der Transfer bringt Sie ohne Umsteigen bis ins Dorf oder zur Talstation; für Familien mit Skiausrüstung ist die Business & Family Class (V-Klasse) die richtige Wahl, siehe [Ski-Transfer ab Zürich](/blog/wintersaison-ski-transfers-schweiz). Im Winter planen Sie Puffer für die Rückfahrt ein. Alle Preise: Business Class, pro Fahrzeug, auf der [Preisseite](/preise). [Transfer in die Jungfrau-Region buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Jungfrau Region for Beginners: Interlaken, Grindelwald, Wengen & Lauterbrunnen",
      excerpt: "Four villages, one mountain panorama: what distinguishes the villages of the Jungfrau region, which suits which traveller and how best to get there from Zurich Airport – with driving times and fixed prices.",
      body: [
        { p: [
          "Eiger, Mönch and Jungfrau form Switzerland's most famous mountain backdrop – and at their feet lie four villages that differ markedly. Anyone travelling to the Jungfrau region for the first time faces the question: Interlaken, Grindelwald, Wengen or Lauterbrunnen? This guide helps with the choice and explains the journey from Zurich Airport.",
        ]},
        { h: "Interlaken: the hub between two lakes", p: [
          "Interlaken lies between Lake Thun and Lake Brienz and is the region's transport hub: hotels of all categories, excursion boats, paragliding over the Höhematte and the starting point of the railways into the valley. Ideal for travellers who want to stay flexible and head for a different destination every day. The [Zurich Airport–Interlaken transfer](/zurich-airport-to-interlaken) takes around 2 hours 30 minutes via Bern and Lake Thun; fixed price by kilometre tariff per vehicle.",
        ]},
        { h: "Grindelwald: the Eiger village", p: [
          "Grindelwald lies directly beneath the Eiger north face and, with the Eiger Express, the First gondola and access to the Jungfraujoch, is the most active place in the region – a ski resort in winter, a hiking base in summer. First choice for families and sports enthusiasts. The [transfer to Grindelwald](/zurich-airport-to-grindelwald) takes around 2 hours 50 minutes; fixed price by kilometre tariff. The village is accessible by car; the driver takes you to the hotel.",
        ]},
        { h: "Wengen: car-free on the sun terrace", p: [
          "Wengen sits on a terrace above the Lauterbrunnen valley and is car-free – the transfer ends at the valley station in Lauterbrunnen, from where the cog railway climbs in a few minutes. Quiet, traditional, with a view of the Jungfrau; perfect for anyone seeking rest. [Transfer to Wengen](/zurich-airport-to-wengen) to Lauterbrunnen: around 2 hours 40 minutes. The principle is the same as in Zermatt, see [Why the transfer ends in Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "Lauterbrunnen: the valley of 72 waterfalls", p: [
          "Lauterbrunnen is the valley itself: the Staubbach Falls right in the village, the Trümmelbach Falls inside the mountain, access to Wengen and Mürren. If you want a room with a waterfall view and the railways in all directions, this is the place. The journey corresponds to that to Wengen – the driver drops you in the village.",
        ]},
        { h: "Planning the journey: train, car or transfer?", p: [
          "The train is scenic but requires two to three changes with luggage. The transfer takes you without changes to the village or the valley station; for families with ski equipment the Business & Family Class (V-Class) is the right choice, see [Ski transfer from Zurich](/blog/wintersaison-ski-transfers-schweiz). In winter, allow a buffer for the return. All prices: Business Class, per vehicle, on the [prices page](/preise). [Book a transfer to the Jungfrau region](/buchung).",
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
      excerpt: "Warum unser Preis vor der Fahrt feststeht, was alles inbegriffen ist, wie sich die drei Fahrzeugklassen unterscheiden – und welche versteckten Kosten Sie bei uns nie sehen werden.",
      body: [
        { p: [
          "«Was kostet das?» ist die erste Frage vor jeder Fahrt – und beim Taxameter die letzte, die beantwortet wird. Ein Festpreis dreht das um: Sie kennen den Betrag, bevor Sie einsteigen, und er ändert sich nicht, egal was unterwegs passiert. Dieser Beitrag erklärt, wie unsere Festpreise entstehen, was sie enthalten und wo die Unterschiede zu Taxi und App-Diensten liegen.",
        ]},
        { h: "Wie ein Festpreis entsteht", p: [
          "Jede unserer festen Strecken hat einen Preis, der aus Distanz, typischer Fahrzeit inklusive Rückweg, Fahrzeugklasse und den enthaltenen Leistungen berechnet ist – nicht aus dem, was an einem bestimmten Tag im Stau passiert. Ob [Winterthur](/zurich-airport-to-winterthur), [Zug](/zurich-airport-to-zug), [Luzern](/zurich-airport-to-luzern) oder [Basel](/zurich-airport-to-basel): Der Preis folgt demselben Kilometertarif. Die vollständige Liste steht auf der [Preisseite](/preise); für Adressen ausserhalb der festen Strecken bestätigen wir den Preis individuell, bevor Sie buchen.",
        ]},
        { h: "Was im Festpreis enthalten ist", p: [
          "Meet & Greet in der Ankunftshalle mit Namensschild. 60 Minuten Wartezeit nach der tatsächlichen Landung. Flugverfolgung mit automatischer Anpassung der Abholzeit. Kindersitze und Babyschalen. Skitaschen, bis zu vier pro Fahrzeug. Hilfe mit dem Gepäck. Mehrwertsteuer. Und eine Rechnung, die Sie in der Spesenabrechnung verwenden können.",
        ]},
        { h: "Was Sie bei uns nie sehen", p: [
          "Keinen versteckten Zuschlag: Der einzige Aufschlag ist der Nachttarif von 20 % zwischen 00:00 und 06:00 Uhr – und er wird vor der Buchung angezeigt. Keinen Wochenend- oder Feiertagszuschlag. Keine Gepäckgebühr. Keine Gebühr für die Wartezeit nach der Landung. Keinen Aufpreis, wenn der Fahrer im Stau steht oder eine Umleitung fährt. Und keinen Preis pro Person: Der Festpreis gilt pro Fahrzeug – ob eine Person in der E-Klasse sitzt oder sieben in der V-Klasse.",
        ]},
        { h: "Die drei Fahrzeugklassen", p: [
          "Business Class (Mercedes-Benz E-Klasse): bis 2 Personen, 2 Koffer – der Standard für Geschäftsreisende und Paare. Business & Family Class (V-Klasse): bis 7 Personen, 7 Koffer – für Familien und Gruppen, siehe [5 bis 7 Personen ab Flughafen Zürich](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug). Premium Class (S-Klasse): bis 3 Personen, 3 Koffer – wenn die Fahrt Teil des Aufenthalts ist. Der Buchungsprozess zeigt den Preis jeder Klasse für Ihre Strecke, bevor Sie sich entscheiden. Details auf der [Fahrzeugseite](/fahrzeuge).",
        ]},
        { h: "Festpreis versus Taxameter versus App", p: [
          "Beim Taxi kennen Sie den Preis am Ziel; nachts und bei Stau ist er höher. Bei App-Diensten schwankt der Preis mit der Nachfrage – nach einer grossen Landung ist er selten günstig. Beim Festpreis wissen Sie ihn vor dem Abflug, und er bleibt. Den Vergleich mit dem Taxistand am Flughafen führt [Taxi am Flughafen Zürich](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen) im Detail. [Zum Festpreis buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Fixed Price Instead of Meter: How Fair Airport Transfers Are Calculated",
      excerpt: "Why our price is fixed before the journey, what is included, how the three vehicle classes differ – and which hidden costs you will never see with us.",
      body: [
        { p: [
          "\"How much is it?\" is the first question before every ride – and with a meter the last one to be answered. A fixed price turns that around: you know the amount before you get in, and it does not change whatever happens on the way. This article explains how our fixed prices are made, what they include and where the differences to taxi and app services lie.",
        ]},
        { h: "How a fixed price is made", p: [
          "Each of our fixed routes has a price calculated from distance, typical driving time including the return leg, vehicle class and the included services – not from what happens in traffic on a particular day. Whether [Winterthur](/zurich-airport-to-winterthur), [Zug](/zurich-airport-to-zug), [Lucerne](/zurich-airport-to-luzern) or [Basel](/zurich-airport-to-basel): the price follows the same kilometre tariff. The full list is on the [prices page](/preise); for addresses outside the fixed routes we confirm the price individually before you book.",
        ]},
        { h: "What the fixed price includes", p: [
          "Meet & greet in the arrivals hall with a name sign. 60 minutes of waiting time after the actual landing. Flight tracking with automatic adjustment of the pickup time. Child seats and baby shells. Ski bags, up to four per vehicle. Help with luggage. VAT. And an invoice you can use in your expense report.",
        ]},
        { h: "What you never see with us", p: [
          "No hidden surcharge: the only extra is the night tariff of 20 % between midnight and 6 am – and it is shown before you book. No weekend or public-holiday surcharge. No luggage fee. No fee for waiting time after landing. No extra charge if the driver sits in traffic or takes a diversion. And no price per person: the fixed price is per vehicle – whether one person sits in the E-Class or seven in the V-Class.",
        ]},
        { h: "The three vehicle classes", p: [
          "Business Class (Mercedes-Benz E-Class): up to 2 people, 2 suitcases – the standard for business travellers and couples. Business & Family Class (V-Class): up to 7 people, 7 suitcases – for families and groups, see [5 to 7 people from Zurich Airport](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug). Premium Class (S-Class): up to 3 people, 3 suitcases – when the journey is part of the stay. The booking process shows the price of each class for your route before you decide. Details on the [vehicles page](/fahrzeuge).",
        ]},
        { h: "Fixed price versus meter versus app", p: [
          "With a taxi you know the fare at the destination; at night and in traffic it is higher. With app services the price fluctuates with demand – after a big landing it is rarely cheap. With a fixed price you know it before departure, and it stays. The comparison with the airport taxi rank is made in detail in [Taxi at Zurich Airport](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen). [Book at a fixed price](/buchung).",
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
      excerpt: "Der Klassiker unter den Schweiz-Ausflügen, perfekt getaktet: unser bewährter Ablauf für einen Tag Luzern mit privatem Chauffeur – ab Flughafen oder ab Zürich, mit Rückfahrt am Abend.",
      body: [
        { p: [
          "Luzern ist der Ausflug, den fast jeder Schweiz-Besucher macht – und zu Recht: mittelalterliche Brücken, ein See mit Bergen auf allen Seiten und zwei Gipfel, die direkt von der Stadt aus erreichbar sind. Mit einem privaten Chauffeur wird aus dem Klassiker ein entspannter Tag ohne Fahrpläne. Hier unser bewährter Ablauf.",
        ]},
        { h: "Anreise: 75 Minuten ab Flughafen", p: [
          "Der [Transfer Flughafen Zürich–Luzern](/zurich-airport-to-luzern) dauert rund 76 Minuten über die A4 und A14; Festpreis nach Kilometertarif, pro Fahrzeug. Ab Zürich Innenstadt ist es etwa eine Stunde. Für den Tagesausflug mit Rückfahrt empfehlen wir die Stundenbuchung: Fahrzeug und Chauffeur bleiben den ganzen Tag bei Ihnen, das Gepäck im Kofferraum. Was Luzern als Ausgangspunkt sonst bietet, steht in [Flughafen Zürich–Luzern im Detail](/blog/flughafen-zuerich-luzern-transfer-preis-dauer).",
        ]},
        { h: "Vormittag: Altstadt und Kapellbrücke", p: [
          "Start an der Kapellbrücke, dem Wahrzeichen aus dem 14. Jahrhundert mit dem Wasserturm. Über die Brücke in die Altstadt mit ihren bemalten Fassaden am Weinmarkt und Hirschenplatz, weiter zur Museggmauer, deren Türme man besteigen kann – der beste Blick auf Stadt und See. Zum Abschluss das Löwendenkmal, den «traurigsten Stein der Welt», wie Mark Twain schrieb.",
        ]},
        { h: "Mittag: am See", p: [
          "Mittagessen am Schweizerhofquai oder in einem der Restaurants am Nationalquai mit Blick über den Vierwaldstättersee. Wer möchte, nimmt anschliessend das Kursschiff nach Vitznau oder Weggis – der Fahrer holt Sie dort ab und bringt Sie weiter.",
        ]},
        { h: "Nachmittag: Pilatus oder Rigi", p: [
          "Der Pilatus ist von Luzern aus mit der steilsten Zahnradbahn der Welt ab Alpnachstad (Sommer) oder mit der Gondelbahn ab Kriens erreichbar; der Fahrer bringt Sie zur Talstation und wartet an der anderen Seite – die berühmte «Goldene Rundfahrt» ohne Zeitdruck. Die Rigi, die «Königin der Berge», erreichen Sie über Vitznau oder Arth-Goldau. Beide sind in einem halben Nachmittag machbar; im Winter ist die Rigi mit Schnee besonders reizvoll.",
        ]},
        { h: "Abend: zurück oder weiter", p: [
          "Der Fahrer bringt Sie zurück nach Zürich, zum Flughafen oder – wenn Sie in der Region bleiben – ins Hotel am Bürgenstock, in Weggis oder in [Engelberg](/zurich-airport-to-engelberg). Für Familien ist die Business & Family Class die richtige Wahl; Kindersitze sind inklusive. Buchen Sie den Ausflug im Voraus, damit der Fahrer am Morgen bereitsteht – [hier anfragen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Lucerne Day Trip: Chapel Bridge, Lake and Pilatus in One Day",
      excerpt: "The classic among Swiss excursions, perfectly paced: our proven schedule for a day in Lucerne with a private chauffeur – from the airport or from Zurich, with return in the evening.",
      body: [
        { p: [
          "Lucerne is the excursion almost every visitor to Switzerland makes – and rightly so: medieval bridges, a lake with mountains on all sides and two summits reachable directly from the city. With a private chauffeur, the classic becomes a relaxed day without timetables. Here is our proven schedule.",
        ]},
        { h: "Getting there: 75 minutes from the airport", p: [
          "The [Zurich Airport–Lucerne transfer](/zurich-airport-to-luzern) takes around 76 minutes via the A4 and A14; fixed price by kilometre tariff, per vehicle. From Zurich city centre it is about an hour. For the day trip with return we recommend the hourly booking: vehicle and chauffeur stay with you all day, the luggage in the boot. What else Lucerne offers as a base is in [Zurich Airport–Lucerne in detail](/blog/flughafen-zuerich-luzern-transfer-preis-dauer).",
        ]},
        { h: "Morning: old town and Chapel Bridge", p: [
          "Start at the Chapel Bridge, the 14th-century landmark with its water tower. Across the bridge into the old town with its painted façades on Weinmarkt and Hirschenplatz, on to the Musegg Wall, whose towers you can climb – the best view of city and lake. To finish, the Lion Monument, \"the saddest stone in the world\", as Mark Twain wrote.",
        ]},
        { h: "Midday: by the lake", p: [
          "Lunch on Schweizerhofquai or in one of the restaurants on Nationalquai with a view over Lake Lucerne. If you like, take the lake steamer to Vitznau or Weggis afterwards – the driver collects you there and takes you onwards.",
        ]},
        { h: "Afternoon: Pilatus or Rigi", p: [
          "Pilatus is reachable from Lucerne by the world's steepest cog railway from Alpnachstad (summer) or by gondola from Kriens; the driver takes you to the valley station and waits on the other side – the famous \"Golden Round Trip\" without time pressure. The Rigi, the \"Queen of the Mountains\", is reached via Vitznau or Arth-Goldau. Both are feasible in half an afternoon; in winter the Rigi with snow is particularly charming.",
        ]},
        { h: "Evening: back or onwards", p: [
          "The driver takes you back to Zurich, to the airport or – if you stay in the region – to the hotel on the Bürgenstock, in Weggis or in [Engelberg](/zurich-airport-to-engelberg). For families the Business & Family Class is the right choice; child seats are included. Book the excursion in advance so the driver is ready in the morning – [enquire here](/buchung).",
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
      excerpt: "E-Klasse, V-Klasse oder S-Klasse: welche Koffermengen realistisch passen, wie Sie Handgepäck, Sondergepäck und Kinderwagen einrechnen – und wann Sie besser eine Klasse grösser buchen.",
      body: [
        { p: [
          "Die Frage nach dem Gepäck entscheidet, ob ein Transfer entspannt oder eng wird. Auf dem Papier passt vieles; am Gepäckband zählt die Realität. Dieser Guide gibt eine ehrliche Orientierung – ergänzt durch den ausführlichen Vergleich in [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse), der die Sonderfälle im Detail behandelt.",
        ]},
        { h: "Die Kapazitäten auf einen Blick", p: [
          "Business Class, Mercedes-Benz E-Klasse: 2 Personen, 2 grosse Koffer plus Handgepäck. Business & Family Class, Mercedes-Benz V-Klasse: 7 Personen, 7 grosse Koffer plus Handgepäck. Premium Class, Mercedes-Benz S-Klasse: 3 Personen, 3 grosse Koffer plus Handgepäck. Alle Details auf der [Fahrzeugseite](/fahrzeuge). «Grosser Koffer» meint das aufgegebene Gepäckstück; Trolleys, Laptoptaschen und Rucksäcke finden zusätzlich im Fussraum oder auf der Rückbank Platz.",
        ]},
        { h: "Die drei häufigsten Fehleinschätzungen", p: [
          "Erstens: «Wir sind nur zu zweit» – aber mit je zwei grossen Koffern nach einem Monat Reise. Das ist V-Klasse-Gepäck, auch für zwei Personen. Zweitens: «Der Kinderwagen ist klein» – der zusammenklappbare Buggy ja, der Kombi-Kinderwagen mit Wanne nein. Drittens: «Skitaschen zählen doch nicht» – sie zählen nicht zum Preis (bis zu vier sind kostenlos), aber zum Platz. Zwei Personen mit Ski und je einem Koffer passen in die E-Klasse; vier Personen mit Ski gehören in die V-Klasse. Mehr dazu in [Ski-Transfer ab Zürich](/blog/wintersaison-ski-transfers-schweiz).",
        ]},
        { h: "Sondergepäck anmelden", p: [
          "Golfbags, Fahrräder, Musikinstrumente in Flightcases, Messematerial: Oft geht mehr, als man denkt, aber wir wollen es vorher wissen. Schreiben Sie Sondergepäck ins Notizfeld der Buchung oder per WhatsApp – der Fahrer bereitet den Laderaum vor, und Sie haben am Flughafen keine Überraschung.",
        ]},
        { h: "Faustregel für die Buchung", p: [
          "Zählen Sie die aufgegebenen Gepäckstücke, nicht die Personen. Ist die Zahl der Koffer grösser als die Personenzahl, prüfen Sie die nächste Klasse. Reisen Sie zu dritt oder mehr mit je einem grossen Koffer, wählen Sie die V-Klasse. Und wenn Sie unsicher sind: eine Nachricht mit Personen und Gepäck genügt, wir antworten ehrlich – auch wenn die Antwort «die kleinere Klasse reicht» lautet. Für Gruppen ab fünf Personen zeigt [5 bis 7 Personen ab Flughafen Zürich](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug), warum ein Van fast immer die bessere Rechnung ist. [Jetzt buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "How Much Luggage Fits in the Vehicle? The Honest Capacity Guide",
      excerpt: "E-Class, V-Class or S-Class: which quantities of luggage realistically fit, how to account for hand luggage, special luggage and pushchairs – and when to book one class larger.",
      body: [
        { p: [
          "The luggage question decides whether a transfer is relaxed or cramped. On paper a lot fits; at the baggage belt reality counts. This guide gives honest orientation – complemented by the detailed comparison in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse), which covers the special cases in depth.",
        ]},
        { h: "Capacities at a glance", p: [
          "Business Class, Mercedes-Benz E-Class: 2 people, 2 large suitcases plus hand luggage. Business & Family Class, Mercedes-Benz V-Class: 7 people, 7 large suitcases plus hand luggage. Premium Class, Mercedes-Benz S-Class: 3 people, 3 large suitcases plus hand luggage. All details on the [vehicles page](/fahrzeuge). \"Large suitcase\" means the checked piece; trolleys, laptop bags and backpacks find additional space in the footwell or on the rear seat.",
        ]},
        { h: "The three most common misjudgements", p: [
          "First: \"There are only two of us\" – but with two large suitcases each after a month of travel. That is V-Class luggage, even for two people. Second: \"The pushchair is small\" – the folding buggy yes, the travel-system pram with carrycot no. Third: \"Ski bags don't count\" – they do not count towards the price (up to four are free), but towards space. Two people with skis and one suitcase each fit in the E-Class; four people with skis belong in the V-Class. More in [Ski transfer from Zurich](/blog/wintersaison-ski-transfers-schweiz).",
        ]},
        { h: "Declaring special luggage", p: [
          "Golf bags, bicycles, musical instruments in flight cases, trade-fair material: often more is possible than you think, but we want to know beforehand. Write special luggage in the notes field of the booking or via WhatsApp – the driver prepares the load space, and you have no surprise at the airport.",
        ]},
        { h: "Rule of thumb for booking", p: [
          "Count the checked pieces, not the people. If the number of suitcases exceeds the number of people, check the next class. If three or more of you travel with one large suitcase each, choose the V-Class. And if you are unsure: a message with people and luggage is enough, we answer honestly – even if the answer is \"the smaller class is enough\". For groups of five or more, [5 to 7 people from Zurich Airport](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug) shows why a van is almost always the better deal. [Book now](/buchung).",
        ]},
      ],
    },
  },
];
