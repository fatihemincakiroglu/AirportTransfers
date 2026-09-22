// ─────────────────────────────────────────────────────────────
//  BLOG — Uzun form seri (10 bölüm × 3 paragraf, listeler, tablolar)
//  Fiyat rakamı YOK (site kuralı). İç linkler [metin](/yol) biçiminde.
// ─────────────────────────────────────────────────────────────
import type { BlogPost } from "./blogContent";

export const longformPosts: BlogPost[] = [
  {
    slug: "uber-taxi-oder-privater-transfer-flughafen-zuerich",
    date: "2026-09-18",
    img: "/gallery/3.jpg",
    de: {
      title: "Uber, Taxi oder privater Transfer am Flughafen Zürich?",
      excerpt: "Drei Wege vom Terminal in die Schweiz – und drei völlig verschiedene Erfahrungen. Wir vergleichen Wartezeit, Preislogik, Gepäck, Kinder, Nachtfahrten und Planbarkeit ehrlich, ohne Verkaufsgerede: Wann welche Option wirklich die richtige ist.",
      body: [
        { p: [
          "Wer in Zürich landet, steht nach dem Zoll vor einer stillen Entscheidung, die den Rest des Tages prägt: die App öffnen, zum Taxistand gehen oder den vorab gebuchten Chauffeur in der Ankunftshalle suchen. Alle drei Wege führen ans Ziel, aber sie unterscheiden sich in Wartezeit, Preislogik, Komfort und vor allem in dem, was passiert, wenn etwas nicht nach Plan läuft. Dieser Vergleich nimmt jede Option auseinander – ohne Rangliste, sondern mit der Frage: Für wen und für welche Reise ist sie die richtige?",
          "Wir fahren selbst private Transfers, und genau deshalb versuchen wir, fair zu bleiben. Es gibt Situationen, in denen ein Taxi vom Stand die klügste Wahl ist, und Situationen, in denen eine App gute Dienste leistet. Es gibt aber auch Reisen, bei denen beide an ihre Grenzen stossen: Nachtlandungen, Familien mit Kindersitzen, Gruppen mit Skigepäck, Ziele ausserhalb des Kantons. Für diese Fälle ist der vorab gebuchte Transfer nicht Luxus, sondern die einfachere Lösung.",
          "Der Beitrag ist in zehn Kapitel gegliedert, die jeweils eine Dimension beleuchten: von der Wartezeit über die Preislogik bis zur Rechnung für die Spesenabrechnung. Am Ende steht eine Entscheidungshilfe, die Sie in dreissig Sekunden zur passenden Option führt. Wer bereits weiss, was er braucht, kann direkt zu [unserer Buchungsseite](/buchung) springen – wer noch abwägt, liest weiter.",
        ]},
        { h: "1. Die drei Optionen in einem Satz", p: [
          "Das **Taxi vom Stand** ist die klassische Lösung: Sie verlassen die Ankunftshalle, folgen der Beschilderung und steigen in das nächste freie Fahrzeug. Bezahlt wird nach Taxameter, also nach Distanz und Zeit, mit unterschiedlichen Tarifen je nach Tageszeit. Für kurze Fahrten in die Stadt ist das schnell und unkompliziert, sofern gerade ein Wagen da ist.",
          "**Ride-Hailing-Apps** wie Uber funktionieren in Zürich, sind aber nicht so allgegenwärtig wie in London oder New York. Sie bestellen ein Fahrzeug per App, der Preis wird vorab angezeigt und richtet sich nach der aktuellen Nachfrage – landen mehrere Maschinen gleichzeitig, steigt er. Der Treffpunkt ist ein definierter Abholbereich, den Sie selbst finden müssen.",
          "Der **private Transfer** wird vor der Reise gebucht, mit Flugnummer, Ziel und Fahrzeugklasse. Der Preis steht fest, bevor Sie abfliegen, und ändert sich nicht. Ihr Chauffeur wartet mit Namensschild in der Ankunftshalle, verfolgt Ihren Flug und bringt Sie bis vor die Haustür – ob nach [Luzern](/zurich-airport-to-luzern), [Basel](/zurich-airport-to-basel) oder in ein Skidorf im Engadin.",
        ]},
        { h: "2. Wartezeit nach der Landung", p: [
          "Beim Taxistand hängt alles vom Moment ab. An einem ruhigen Dienstagvormittag stehen Fahrzeuge bereit, und Sie sitzen in zwei Minuten. Wenn zwischen 22 und 23 Uhr drei Langstreckenflüge gleichzeitig landen, bildet sich eine Schlange, und die Wartezeit ist nicht vorhersehbar. Für ein Fahrzeug mit sieben Plätzen oder einem Kindersitz gibt es am Stand ohnehin keine Garantie – Sie nehmen, was kommt.",
          "Bei der App beginnt die Wartezeit erst, wenn Sie bestellen – also nachdem Sie Gepäck geholt, das Telefon eingeschaltet und den Abholbereich gefunden haben. Dann dauert es, bis ein Fahrer akzeptiert und anfährt. Bei hoher Nachfrage werden Fahrten storniert oder der Preis steigt, während Sie mit Koffern am Strassenrand stehen. In der Stadt funktioniert das gut; am Flughafen nach einem Nachtflug ist es der unsicherste Teil.",
          "Beim privaten Transfer ist die Wartezeit Null, und zwar auf Ihrer Seite: Der Chauffeur ist vor Ihnen da. Weil wir den Flug verfolgen, steht er zur tatsächlichen Landezeit in der Halle, nicht zur geplanten. 60 Minuten Wartezeit nach der Landung sind inklusive, damit Passkontrolle, Gepäck und ein Kaffee keinen Stress verursachen. Wie der Treffpunkt konkret funktioniert, zeigt [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "3. Preislogik: Taxameter, Nachfrage, Festpreis", p: [
          "Wir nennen hier bewusst keine Beträge – Taxitarife und App-Preise ändern sich je nach Anbieter, Uhrzeit und Tag. Wichtiger ist die Logik dahinter. Das Taxameter rechnet Grundgebühr plus Kilometer plus Zeit; jeder Stau, jede Umleitung und jeder Nachtzuschlag verändert den Endbetrag. Sie wissen den Preis erst, wenn Sie angekommen sind. Für die Innenstadt ist die Spanne klein, für Bern oder Davos ist sie es nicht.",
          "Die App zeigt den Preis vorab, was ein echter Fortschritt gegenüber dem Taxameter ist. Aber dieser Preis ist eine Momentaufnahme der Nachfrage: Regen, Feierabend, mehrere Landungen – und der Betrag, den Sie beim Öffnen der App sahen, ist zehn Minuten später ein anderer. Wer eine Stunde vor der Landung nachschaut, sieht nicht den Preis, den er später zahlt.",
          "Der Festpreis ist genau das: fest. Er gilt pro Fahrzeug, unabhängig von Uhrzeit, Wochentag, Stau oder Umweg, und er enthält Mehrwertsteuer, Wartezeit, Kindersitze und Gepäck. Wie ein solcher Preis kalkuliert wird und was er alles einschliesst, erklärt [Festpreis statt Taxameter](/blog/festpreis-transfers-erklaert). Die konkreten Beträge für alle Strecken stehen auf der [Preisseite](/preise).",
        ], table: {
          head: ["Kriterium", "Taxi vom Stand", "App (Uber & Co.)", "Privater Transfer"],
          rows: [
            ["Preis bekannt", "Erst am Ziel", "Vor der Fahrt, aber nachfrageabhängig", "Vor der Abreise, fest"],
            ["Nachtzuschlag", "Ja, nach Taxameter", "Indirekt (höhere Nachfrage)", "20 % (00–06 Uhr), vorab bekannt"],
            ["Gepäckgebühr", "Je nach Anbieter", "Nein", "Nein"],
            ["Wartezeit inklusive", "Nein", "Wenige Minuten", "60 Min. nach Landung"],
            ["Rechnung mit MwSt.", "Quittung", "App-Beleg", "Automatisch per E-Mail"],
          ],
        }},
        { h: "4. Gepäck: Wo der Unterschied sichtbar wird", p: [
          "Mit einem Handgepäck-Trolley ist jedes Fahrzeug gut. Der Unterschied beginnt beim zweiten grossen Koffer, spätestens bei Skitaschen, Golfbags oder einem Kinderwagen. Ein Taxi vom Stand ist meistens eine Limousine mit normalem Kofferraum; ob es Ihre Ausrüstung aufnimmt, sehen Sie erst, wenn Sie davorstehen. Ein grösseres Fahrzeug anzufordern ist möglich, aber nicht garantiert.",
          "Bei der App wählen Sie eine Fahrzeugkategorie, doch das konkrete Modell bestimmt der Fahrer, der die Fahrt annimmt. «XL» heisst mehr Sitze, nicht zwingend mehr Laderaum. Für Skigepäck gibt es keine Option, und der Fahrer darf ablehnen, wenn es nicht passt. Das ist kein Vorwurf an die Fahrer – es ist die Konsequenz eines Systems, das auf Stadtfahrten optimiert ist.",
          "Beim privaten Transfer ist das Gepäck Teil der Buchung. Sie wählen die Klasse nach Personen und Koffern, melden Sperriges im Notizfeld an, und der Fahrer bereitet den Laderaum vor. Skitaschen befördern wir kostenlos, bis zu vier pro Fahrzeug. Welche Klasse wie viel aufnimmt, steht in [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse) – ehrlich, inklusive der Fälle, in denen die kleinere Klasse reicht.",
        ]},
        { h: "5. Reisen mit Kindern", p: [
          "In der Schweiz müssen Kinder bis zwölf Jahre oder 150 cm in einer geeigneten Rückhaltevorrichtung mitfahren – auch im Taxi. In der Praxis bedeutet das: Am Taxistand ist ein Kindersitz Glückssache. Manche Fahrer haben eine Sitzerhöhung im Kofferraum, viele nicht. Mit einem Säugling bleibt dann nur, die eigene Babyschale mitzubringen oder zu warten, bis ein passendes Fahrzeug kommt.",
          "Bei Apps ist das Bild ähnlich. In einigen Städten gibt es eine Kindersitz-Option, in Zürich ist sie nicht zuverlässig verfügbar. Die Alternative – ohne Sitz fahren – ist gesetzlich nicht erlaubt und sicherheitstechnisch keine Diskussion wert. Familien merken hier am deutlichsten, dass Ride-Hailing für Einzelpersonen in der Stadt gebaut wurde.",
          "Beim privaten Transfer sind Babyschalen, Kindersitze und Sitzerhöhungen kostenlos und vor der Abholung montiert; Sie geben Alter und Anzahl bei der Buchung an. In der V-Klasse sitzen Eltern und Kinder einander gegenüber, was auf zwei Stunden ins Berner Oberland viel wert ist. Alles Weitere zu Regeln und Ablauf steht in [Mit Baby und Kleinkind ab Flughafen Zürich](/blog/mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen).",
        ], ul: [
          "**Taxi:** Kindersitz nicht garantiert, eigenen Sitz mitbringen",
          "**App:** Kindersitz-Option in Zürich nicht zuverlässig",
          "**Transfer:** Babyschale, Kindersitz, Sitzerhöhung inklusive und vormontiert",
        ]},
        { h: "6. Nachtankunft: der Härtetest", p: [
          "Nachts trennt sich die Spreu vom Weizen. Der Taxistand ist nach 23 Uhr dünner besetzt, die Züge in andere Landesteile fahren nicht mehr, und wer nach Luzern oder St. Gallen muss, beginnt Preisverhandlungen am Strassenrand. Nachttarife sind höher, und ob der Fahrer die lange Strecke überhaupt annimmt, entscheidet er selbst. Das ist legitim – aber es ist nicht planbar.",
          "Apps haben nachts weniger aktive Fahrer und dafür höhere Nachfrage nach den letzten Landungen. Das Ergebnis sind lange Anfahrzeiten, Stornierungen und Preise, die mit jeder Minute steigen. Für eine Fahrt in die Stadt lässt sich das aushalten; für eine Fahrt nach Davos ist es der falsche Moment, um auf Algorithmen zu vertrauen.",
          "Der private Transfer fährt rund um die Uhr zum Festpreis; nachts zwischen 00:00 und 06:00 Uhr gilt ein Nachttarif von 20 %, der vor der Buchung feststeht – keine Überraschung am Ziel. Voraussetzung ist die Vorabbuchung: Anfragen, die zwischen 23 und 6 Uhr eingehen und innerhalb von zwei Stunden starten sollen, können wir online nicht annehmen, weil ein ausgeruhter Fahrer eingeplant werden muss. Wer seinen Nachttransfer mit dem Flug bucht, hat dieses Problem nie – Details in [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "7. Wenn der Flug Verspätung hat", p: [
          "Beim Taxi spielt Verspätung keine Rolle, weil Sie erst nach der Landung zum Stand gehen. Das ist der eine echte Vorteil des Spontansystems: Es kann nicht warten, weil es nicht weiss, dass Sie kommen. Der Nachteil zeigt sich erst, wenn die Verspätung Sie in die Nachtstunden schiebt und der Stand leer ist.",
          "Bei Apps ist es ähnlich – Sie bestellen, wenn Sie da sind. Wer die Fahrt vorbestellt hat, muss sie bei Verspätung selbst verschieben oder stornieren; manche Anbieter berechnen dafür Gebühren. Automatische Flugverfolgung bieten die meisten Apps in Zürich nicht, und Fahrer warten nicht unbegrenzt am Abholbereich.",
          "Beim privaten Transfer ist die Flugnummer Teil der Buchung. Verspätet sich die Maschine, verschiebt sich die Abholung automatisch; Sie rufen niemanden an. Bei Umleitungen nach Basel oder Genf finden wir gemeinsam eine Lösung, bei Annullierungen gilt die kostenlose Stornierung bis 24 Stunden vorher. Der gesamte Ablauf ist in [Flug verspätet oder annulliert?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer) beschrieben.",
        ]},
        { h: "8. Gruppen und Geschäftsreisende", p: [
          "Ab drei Personen kippt die Rechnung. Ein Taxi vom Stand nimmt in der Regel vier Passagiere; sechs Reisende brauchen zwei Wagen, zwei Taxameter und kommen getrennt an. Beim privaten Transfer gilt der Festpreis pro Fahrzeug – die V-Klasse befördert bis zu sieben Personen mit sieben Koffern in einem Wagen. Was das im Vergleich bedeutet, rechnet [5 bis 7 Personen ab Flughafen Zürich](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug) vor.",
          "Geschäftsreisende haben ein anderes Kriterium: die Rechnung. Ein Taxameter-Beleg mit handschriftlichem Betrag ist in vielen Spesenprozessen ein Problem; ein App-Beleg ist besser, aber selten mit ausgewiesener Schweizer Mehrwertsteuer. Beim Transfer erhalten Sie automatisch eine Rechnung mit MwSt., Buchungsreferenz und Strecke – für Firmen auf Wunsch als Sammelrechnung.",
          "Dazu kommt die Fahrt selbst als Arbeitszeit: 75 Minuten nach Luzern im ruhigen Fahrzeug mit Ladeanschluss sind produktiv, dieselbe Zeit mit Umsteigen oder in einem unbekannten Auto nicht. Welche Gewohnheiten Vielflieger am Flughafen Zürich sonst pflegen, steht in [Business Travel Zürich: 5 Gewohnheiten](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "9. Ziele ausserhalb der Stadt", p: [
          "Für die Fahrt vom Flughafen in die Zürcher Innenstadt sind alle drei Optionen tauglich; der Weg ist kurz und die Fahrer kennen ihn. Interessant wird es ab dem Kantonsrand. Ein Taxifahrer darf lange Fahrten ablehnen, und viele tun es, weil die Rückfahrt leer ist. Wer ihn überzeugt, verhandelt einen Betrag – oder zahlt Taxameter für 200 Kilometer.",
          "Apps sind für längere Distanzen technisch möglich, praktisch aber unzuverlässig: Fahrer sehen das Ziel erst nach Annahme und stornieren, wenn es zu weit ist. Auf Bergstrecken kommen Winterausrüstung und Ortskenntnis dazu – ein Stadtfahrer im Sommerreifen ist am Julierpass fehl am Platz.",
          "Der private Transfer ist für genau diese Fahrten gebaut. Unsere Chauffeure fahren die Strecken nach [Davos](/zurich-airport-to-davos), [St. Moritz](/zurich-airport-to-st-moritz), [Grindelwald](/zurich-airport-to-grindelwald) oder [Zermatt](/zurich-airport-to-zermatt) regelmässig, kennen Pässe, Autoverladungen und Ausweichrouten, und die Fahrzeuge sind für den Winter ausgerüstet. Alle festen Strecken finden Sie in der [Streckenübersicht](/strecken).",
        ]},
        { h: "10. Entscheidungshilfe in dreissig Sekunden", p: [
          "Nehmen Sie das Taxi vom Stand, wenn Sie tagsüber landen, allein oder zu zweit mit wenig Gepäck sind, in die Stadt wollen und keine Kinder dabeihaben. Es ist da, es ist schnell, und für kurze Wege ist die Preisspanne überschaubar. Nutzen Sie die App in denselben Situationen, wenn Sie den Preis lieber vorher sehen und bereit sind, den Abholbereich zu suchen.",
          "Buchen Sie den privaten Transfer, sobald eine dieser Bedingungen zutrifft: Sie landen spät oder nachts, Sie reisen zu dritt oder mehr, Sie haben Kinder, Skigepäck oder Sperriges, Ihr Ziel liegt ausserhalb des Kantons Zürich, oder Sie möchten den Preis vor dem Abflug kennen und eine ordentliche Rechnung erhalten. In diesen Fällen ist der Transfer nicht die teurere Variante, sondern meistens die günstigere – und immer die ruhigere.",
          "Und wenn Sie noch unsicher sind: Schreiben Sie uns Flugnummer, Personenzahl, Gepäck und Ziel per WhatsApp. Wir sagen Ihnen ehrlich, ob der Transfer für Sie sinnvoll ist – auch dann, wenn die Antwort «nehmen Sie den Zug» lautet. Wer überzeugt ist, [bucht in zwei Minuten](/buchung): Flugnummer, Ziel, Fahrzeug, fertig.",
        ], ul: [
          "Taxi vom Stand: tagsüber, Stadt, wenig Gepäck, keine Kinder",
          "App: dieselben Fälle, wenn Sie den Preis vorab sehen möchten",
          "Privater Transfer: Nacht, Gruppen, Kinder, Skigepäck, Ziele ausserhalb Zürichs, Rechnung mit MwSt.",
        ]},
      ],
    },
    en: {
      title: "Uber, Taxi or Private Transfer at Zurich Airport?",
      excerpt: "Three ways from the terminal into Switzerland – and three completely different experiences. We compare waiting time, pricing logic, luggage, children, night journeys and predictability honestly, without a sales pitch: when each option is genuinely the right one.",
      body: [
        { p: [
          "Anyone landing in Zurich faces a quiet decision after customs that shapes the rest of the day: open the app, walk to the taxi rank, or look for the pre-booked chauffeur in the arrivals hall. All three get you there, but they differ in waiting time, pricing logic, comfort and above all in what happens when something does not go to plan. This comparison takes each option apart – not as a ranking, but with the question: for whom and for which journey is it the right one?",
          "We run private transfers ourselves, and for exactly that reason we try to stay fair. There are situations in which a taxi from the rank is the smartest choice, and situations in which an app serves well. But there are also journeys where both reach their limits: night landings, families with child seats, groups with ski luggage, destinations outside the canton. For those cases the pre-booked transfer is not a luxury but the simpler solution.",
          "The article is divided into ten chapters, each examining one dimension: from waiting time and pricing logic to the invoice for your expense report. It ends with a decision aid that gets you to the right option in thirty seconds. If you already know what you need, jump straight to [our booking page](/buchung) – if you are still weighing up, read on.",
        ]},
        { h: "1. The three options in one sentence", p: [
          "The **taxi from the rank** is the classic solution: you leave the arrivals hall, follow the signs and get into the next available car. You pay by meter – distance plus time – with different tariffs depending on the hour. For short rides into the city that is quick and uncomplicated, provided a car is there at that moment.",
          "**Ride-hailing apps** such as Uber work in Zurich, but they are not as ubiquitous as in London or New York. You order a car via the app, the price is shown in advance and depends on current demand – when several aircraft land at once, it rises. The meeting point is a designated pickup area that you have to find yourself.",
          "The **private transfer** is booked before the trip, with flight number, destination and vehicle class. The price is fixed before you depart and does not change. Your chauffeur waits with a name sign in the arrivals hall, tracks your flight and takes you to your front door – whether to [Lucerne](/zurich-airport-to-luzern), [Basel](/zurich-airport-to-basel) or a ski village in the Engadin.",
        ]},
        { h: "2. Waiting time after landing", p: [
          "At the taxi rank everything depends on the moment. On a quiet Tuesday morning cars are waiting and you are seated in two minutes. When three long-haul flights land between 10 and 11 pm, a queue forms and the waiting time is unpredictable. For a vehicle with seven seats or a child seat there is no guarantee at the rank anyway – you take what comes.",
          "With the app, waiting only begins once you order – after collecting luggage, switching on your phone and finding the pickup area. Then it takes time for a driver to accept and drive over. In high demand, rides get cancelled or the price rises while you stand at the kerb with suitcases. In the city it works well; at the airport after a night flight it is the least certain part.",
          "With a private transfer the waiting time is zero, on your side: the chauffeur is there before you. Because we track the flight, he is in the hall at the actual landing time, not the scheduled one. 60 minutes of waiting after landing are included so that passport control, luggage and a coffee cause no stress. How the meeting point works in practice is shown in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "3. Pricing logic: meter, demand, fixed price", p: [
          "We deliberately quote no amounts here – taxi tariffs and app prices change by operator, hour and day. What matters is the logic behind them. The meter adds a base fare plus kilometres plus time; every traffic jam, every diversion and every night surcharge changes the final amount. You know the price only when you have arrived. For the city centre the range is small; for Bern or Davos it is not.",
          "The app shows the price in advance, which is a real improvement over the meter. But that price is a snapshot of demand: rain, rush hour, several landings – and the amount you saw when opening the app is a different one ten minutes later. Anyone checking an hour before landing does not see the price they will pay.",
          "The fixed price is exactly that: fixed. It applies per vehicle regardless of hour, weekday, traffic or detour, and it includes VAT, waiting time, child seats and luggage. How such a price is calculated and what it covers is explained in [Fixed price instead of meter](/blog/festpreis-transfers-erklaert). The actual amounts for all routes are on the [prices page](/preise).",
        ], table: {
          head: ["Criterion", "Taxi from the rank", "App (Uber etc.)", "Private transfer"],
          rows: [
            ["Price known", "Only at the destination", "Before the ride, but demand-based", "Before departure, fixed"],
            ["Night surcharge", "Yes, by meter", "Indirectly (higher demand)", "20 % (midnight–6 am), known in advance"],
            ["Luggage fee", "Depends on operator", "No", "No"],
            ["Waiting included", "No", "A few minutes", "60 min after landing"],
            ["Invoice with VAT", "Receipt", "App receipt", "Automatically by email"],
          ],
        }},
        { h: "4. Luggage: where the difference shows", p: [
          "With a carry-on trolley any vehicle is fine. The difference begins with the second large suitcase, and certainly with ski bags, golf bags or a pushchair. A taxi from the rank is usually a saloon with a normal boot; whether it takes your equipment you only see when you stand in front of it. Requesting a larger vehicle is possible but not guaranteed.",
          "With the app you choose a vehicle category, but the actual model is decided by the driver who accepts the ride. \"XL\" means more seats, not necessarily more load space. There is no option for ski luggage, and the driver may decline if it does not fit. That is no criticism of drivers – it is the consequence of a system optimised for city rides.",
          "With a private transfer, luggage is part of the booking. You choose the class by people and suitcases, note anything bulky in the remarks field, and the driver prepares the load space. We carry ski bags free of charge, up to four per vehicle. Which class takes how much is in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse) – honestly, including the cases where the smaller class is enough.",
        ]},
        { h: "5. Travelling with children", p: [
          "In Switzerland, children up to twelve years or 150 cm must travel in a suitable restraint – in taxis too. In practice this means: at the taxi rank a child seat is a matter of luck. Some drivers keep a booster in the boot, many do not. With an infant, the only options are bringing your own baby shell or waiting for a suitable vehicle.",
          "With apps the picture is similar. Some cities offer a child-seat option; in Zurich it is not reliably available. The alternative – riding without a seat – is not legal and not worth discussing from a safety point of view. Families notice most clearly here that ride-hailing was built for individuals in the city.",
          "With a private transfer, baby shells, child seats and boosters are free and fitted before pickup; you state age and number when booking. In the V-Class, parents and children sit facing each other, which is worth a lot on two hours to the Bernese Oberland. Everything else on rules and procedure is in [With a baby or toddler from Zurich Airport](/blog/mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen).",
        ], ul: [
          "**Taxi:** child seat not guaranteed, bring your own",
          "**App:** child-seat option not reliable in Zurich",
          "**Transfer:** baby shell, child seat, booster included and pre-fitted",
        ]},
        { h: "6. Night arrival: the stress test", p: [
          "At night the differences become stark. The taxi rank is thinner after 11 pm, trains to other parts of the country have stopped, and anyone heading to Lucerne or St. Gallen starts negotiating at the kerb. Night tariffs are higher, and whether the driver accepts the long journey at all is up to him. That is legitimate – but it is not plannable.",
          "Apps have fewer active drivers at night and higher demand after the last landings. The result is long approach times, cancellations and prices that rise by the minute. For a ride into the city that is bearable; for a ride to Davos it is the wrong moment to trust an algorithm.",
          "The private transfer runs around the clock at a fixed price; at night between midnight and 6 am a night tariff of 20 % applies, fixed before you book – no surprise at the destination. The condition is advance booking: requests received between 11 pm and 6 am for journeys starting within two hours cannot be accepted online, because a rested driver has to be scheduled. Anyone who books the night transfer with the flight never has this problem – details in [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "7. When the flight is delayed", p: [
          "With a taxi, delay plays no role because you only go to the rank after landing. That is the one genuine advantage of the spontaneous system: it cannot wait because it does not know you are coming. The downside appears only when the delay pushes you into the night hours and the rank is empty.",
          "With apps it is similar – you order when you are there. Anyone who pre-ordered has to reschedule or cancel on delay themselves; some providers charge fees. Most apps in Zurich do not offer automatic flight tracking, and drivers do not wait indefinitely at the pickup area.",
          "With a private transfer the flight number is part of the booking. If the aircraft is late, the pickup shifts automatically; you call nobody. For diversions to Basel or Geneva we find a solution together; for cancellations, free cancellation applies up to 24 hours before. The whole procedure is described in [Flight delayed or cancelled?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h: "8. Groups and business travellers", p: [
          "From three people the maths tips. A taxi from the rank usually takes four passengers; six travellers need two cars, two meters, and arrive separately. With a private transfer the fixed price applies per vehicle – the V-Class carries up to seven people with seven suitcases in one car. What that means in comparison is worked out in [5 to 7 people from Zurich Airport](/blog/gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug).",
          "Business travellers have a different criterion: the invoice. A meter receipt with a handwritten amount is a problem in many expense processes; an app receipt is better but rarely shows Swiss VAT. With a transfer you automatically receive an invoice with VAT, booking reference and route – for companies as a consolidated invoice on request.",
          "Add the journey itself as working time: 75 minutes to Lucerne in a quiet vehicle with a charging port are productive; the same time with train changes or in an unfamiliar car is not. Which other habits frequent flyers cultivate at Zurich Airport is in [Business travel Zurich: 5 habits](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "9. Destinations outside the city", p: [
          "For the ride from the airport into Zurich's city centre all three options are suitable; the way is short and drivers know it. It gets interesting from the canton border. A taxi driver may decline long journeys, and many do, because the return is empty. Anyone who persuades him negotiates an amount – or pays the meter for 200 kilometres.",
          "Apps are technically possible for longer distances but practically unreliable: drivers only see the destination after accepting and cancel if it is too far. On mountain routes, winter equipment and local knowledge come on top – a city driver on summer tyres is out of place on the Julier Pass.",
          "The private transfer is built for exactly these journeys. Our chauffeurs drive the routes to [Davos](/zurich-airport-to-davos), [St. Moritz](/zurich-airport-to-st-moritz), [Grindelwald](/zurich-airport-to-grindelwald) or [Zermatt](/zurich-airport-to-zermatt) regularly, know passes, car-trains and alternative routes, and the vehicles are winter-equipped. All fixed routes are in the [route overview](/strecken).",
        ]},
        { h: "10. Decision aid in thirty seconds", p: [
          "Take the taxi from the rank if you land during the day, travel alone or as a couple with little luggage, want to go into the city and have no children with you. It is there, it is quick, and for short distances the price range is manageable. Use the app in the same situations if you prefer to see the price beforehand and are willing to find the pickup area.",
          "Book the private transfer as soon as one of these applies: you land late or at night, you travel as three or more, you have children, ski luggage or bulky items, your destination is outside the canton of Zurich, or you want to know the price before departure and receive a proper invoice. In these cases the transfer is not the more expensive option but usually the cheaper one – and always the calmer one.",
          "And if you are still unsure: send us flight number, number of people, luggage and destination via WhatsApp. We tell you honestly whether the transfer makes sense for you – even if the answer is \"take the train\". If you are convinced, [book in two minutes](/buchung): flight number, destination, vehicle, done.",
        ], ul: [
          "Taxi from the rank: daytime, city, little luggage, no children",
          "App: the same cases if you prefer to see the price in advance",
          "Private transfer: night, groups, children, ski luggage, destinations outside Zurich, invoice with VAT",
        ]},
      ],
    },
  },

  // ── 2. Trinkgeld ─────────────────────────────────────────
  {
    slug: "trinkgeld-taxi-schweiz-was-ist-ueblich",
    date: "2026-09-19",
    img: "/gallery/17.jpg",
    de: {
      title: "Trinkgeld im Taxi in der Schweiz: Was ist üblich?",
      excerpt: "Runden, prozentual oder gar nichts? Wie Trinkgeld in der Schweiz wirklich funktioniert – im Taxi, beim privaten Transfer, im Restaurant und im Hotel. Mit Tabelle für Reisende aus den USA, Grossbritannien, Deutschland und Asien.",
      body: [
        { p: [
          "Kaum eine Frage wird uns von Gästen aus dem Ausland häufiger gestellt als diese: «Wie viel Trinkgeld gebe ich dem Fahrer?» Die Unsicherheit ist verständlich, denn die Schweiz hat weder die amerikanische Prozentkultur noch die britische Pauschale, und die Antwort «gar nichts» klingt für viele unhöflich. Dieser Beitrag erklärt die Schweizer Praxis Schritt für Schritt – für Taxi, privaten Transfer und die anderen Situationen einer Reise.",
          "Die Kurzfassung vorweg: In der Schweiz ist Trinkgeld freiwillig, weil der Service im Preis enthalten ist. Wer aufrundet oder ein paar Franken gibt, zeigt Anerkennung; wer nichts gibt, verstösst gegen keine Regel. Das gilt für Taxis genauso wie für unsere Chauffeure. Trotzdem gibt es Nuancen, die den Unterschied zwischen «korrekt» und «souverän» ausmachen.",
          "Wir haben die Kapitel so gegliedert, dass Sie in zwei Minuten die Antwort für Ihre Situation finden: die gesetzliche Grundlage, Taxi, privater Transfer, Restaurant und Hotel, Bargeld versus Karte, kulturelle Unterschiede nach Herkunftsland und ein paar konkrete Beispiele aus unserem Alltag. Wenn Sie ausschliesslich wissen möchten, was Sie unserem Fahrer geben sollen: Kapitel 4.",
        ]},
        { h: "1. Warum Trinkgeld in der Schweiz anders funktioniert", p: [
          "Seit 1974 ist in der Schweiz der Service im Preis inbegriffen – die sogenannte «Service-compris»-Regelung. Restaurants, Hotels und Taxis müssen ihre Mitarbeitenden aus dem regulären Preis bezahlen, nicht aus dem Trinkgeld. Das ist der wichtigste Unterschied zu den USA, wo Trinkgeld einen Teil des Lohnes ersetzt, und der Grund, warum die Schweiz keine Prozentkultur kennt.",
          "Die Folge: Trinkgeld ist eine Geste, keine Pflicht. Ein Taxifahrer in Zürich verdient einen regulären Lohn, und die Fahrt kostet, was das Taxameter anzeigt. Wer nichts gibt, wird nicht schief angesehen; wer aufrundet, macht dem Fahrer eine Freude. Diese Entspanntheit ist für Reisende aus Trinkgeld-Kulturen zunächst ungewohnt, aber sie erleichtert vieles.",
          "Zugleich ist die Schweiz kein Land, in dem Trinkgeld verpönt wäre – anders als etwa Japan. Anerkennung für guten Service ist willkommen, und in der Praxis geben die meisten Schweizerinnen und Schweizer im Restaurant und im Taxi etwas. Nur die Höhe ist bescheidener und die Form ist das Aufrunden, nicht das Prozentrechnen.",
        ]},
        { h: "2. Trinkgeld im Taxi vom Stand", p: [
          "Beim klassischen Taxi ist das Aufrunden auf den nächsten Franken oder auf einen runden Betrag üblich. Kurze Stadtfahrt: einen oder zwei Franken. Längere Fahrt mit Gepäckhilfe: fünf Franken oder auf die nächste Zehnerstelle. Mehr ist nicht erwartet, weniger ist kein Affront. Wer mit Karte zahlt, sagt beim Betrag einfach «machen Sie x», und der Fahrer tippt es ein.",
          "Es gibt Situationen, in denen etwas mehr angemessen ist: Der Fahrer hat schwere Koffer über eine Treppe getragen, ist bei Schnee besonders vorsichtig gefahren, hat auf Sie gewartet oder einen Umweg für einen Zwischenhalt gemacht. Dann sind zehn Prozent oder ein zusätzlicher Fünfliber eine schöne Geste – aber immer noch freiwillig.",
          "Umgekehrt gibt es keine Verpflichtung, wenn der Service schlecht war: unfreundlicher Ton, unnötiger Umweg, Zigarettengeruch im Wagen. Dann zahlen Sie den Taxameterbetrag und nichts darüber hinaus. Wie der Taxipreis in Zürich überhaupt zustande kommt, erklärt [Taxi am Flughafen Zürich](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen).",
        ], ul: [
          "Kurze Stadtfahrt: auf den nächsten Franken aufrunden",
          "Längere Fahrt mit Gepäck: rund fünf Franken oder auf die Zehnerstelle",
          "Besonderer Einsatz (Treppen, Schnee, Warten): bis etwa zehn Prozent",
          "Schlechter Service: kein Trinkgeld, ohne schlechtes Gewissen",
        ]},
        { h: "3. Trinkgeld beim privaten Transfer", p: [
          "Beim privaten Transfer ist der Preis vorab fixiert und enthält alles: Meet & Greet, Wartezeit, Gepäckhilfe, Kindersitze, Mehrwertsteuer. Ein Trinkgeld ist deshalb ebenfalls freiwillig – unsere Chauffeure werden regulär bezahlt und erwarten nichts. Viele Gäste geben dennoch etwas, weil die Fahrt eine persönliche Dienstleistung ist: jemand hat mit Namensschild gewartet, geholfen, gefahren und sich verabschiedet.",
          "Wenn Sie etwas geben möchten, ist Bargeld direkt an den Fahrer der einfachste Weg; auf der Online-Rechnung gibt es keinen Trinkgeldposten, und das ist Absicht – der Festpreis soll der Festpreis bleiben. Die Höhe orientiert sich an der Fahrt: Für eine Stunde nach Luzern ist ein Fünf- oder Zehnfrankenschein grosszügig, für eine Fahrt nach Zermatt mit Skigepäck und Zwischenhalt ist auch ein Zwanziger keine Übertreibung.",
          "Wer nichts gibt, aber eine gute Bewertung hinterlässt, tut dem Fahrer und uns einen mindestens ebenso grossen Gefallen. Eine ehrliche Rezension bei Google oder Trustpilot bringt neue Gäste, und wir geben Lob an die Fahrer weiter. Und wenn etwas nicht gepasst hat, schreiben Sie uns bitte zuerst – wir klären es lieber, als dass es in der Bewertung steht.",
        ]},
        { h: "4. Die kurze Antwort für unsere Gäste", p: [
          "Wenn Sie mit uns fahren und sich fragen, was angemessen ist: Nichts ist falsch, ein kleiner Betrag ist willkommen, ein grosser Betrag ist unnötig. Runden Sie in Gedanken auf oder geben Sie dem Fahrer beim Aussteigen einen Schein, der Ihnen richtig vorkommt. Er wird sich bedanken, ob es fünf oder zwanzig Franken sind.",
          "Bei Firmenkunden, deren Spesenrichtlinie kein Trinkgeld vorsieht, ist das völlig in Ordnung – unsere Fahrer wissen das und erwarten von Geschäftsreisenden nichts. Bei Gruppen genügt ein Trinkgeld pro Fahrzeug, nicht pro Person. Und bei Familien mit Kindern, bei denen die Hände ohnehin voll sind, ist ein freundliches Danke oft das, was am meisten zählt.",
          "Eine Bitte haben wir nur: Fragen Sie den Fahrer nicht, «wie viel üblich ist». Er wird aus Höflichkeit abwinken, und Sie sind so klug wie vorher. Die Antwort steht hier – und sie lautet: freiwillig, bescheiden, gern gesehen.",
        ]},
        { h: "5. Restaurant, Hotel, Gepäckträger", p: [
          "Im Restaurant runden Schweizer meistens auf: Bei einer Rechnung von 47 Franken werden 50 daraus, bei 93 werden es 100. Bei sehr gutem Service und grösserer Runde sind fünf bis zehn Prozent üblich, aber nicht verlangt. Die Bedienung fragt beim Kartenzahlen, ob der Betrag stimmt oder ob Sie einen anderen möchten – das ist der Moment, in dem man den aufgerundeten Betrag nennt.",
          "Im Hotel ist Trinkgeld noch weniger verbreitet. Für den Zimmerservice oder den Portier, der Koffer aufs Zimmer bringt, sind zwei bis fünf Franken angemessen; für das Housekeeping hinterlassen manche Gäste am Ende des Aufenthalts einen kleinen Betrag, die meisten nicht. Eine Rezeption erwartet nichts.",
          "Bei Bergbahnen, Museen, Bootsfahrten und ähnlichen Angeboten gibt es kein Trinkgeld. Bei geführten Touren ist eine kleine Anerkennung für den Guide üblich, wenn er gut war. Kurz: Überall, wo eine Person Sie persönlich betreut hat, ist eine Geste willkommen; wo ein System Sie bedient hat, nicht.",
        ]},
        { h: "6. Bargeld oder Karte?", p: [
          "Die Schweiz ist bargeldfreundlich, aber Kartenzahlung ist überall möglich – auch im Taxi. Wer per Karte oder TWINT zahlt, kann das Trinkgeld beim Betrag dazusagen; das Terminal wird entsprechend eingegeben. Bargeld hat den Vorteil, dass es direkt beim Fahrer ankommt und nicht über die Buchhaltung läuft.",
          "Bei unseren Transfers wird der Fahrpreis online bezahlt, vor der Fahrt; Trinkgeld ist davon getrennt und bleibt Sache zwischen Ihnen und dem Fahrer. Wer kein Bargeld dabeihat, muss sich keine Gedanken machen – ein Danke und eine Bewertung sind vollkommen genug. Wie die Online-Zahlung abläuft, steht in [unseren Buchungsschritten](/buchung).",
          "Ein praktischer Hinweis für Ankommende: Am Flughafen Zürich gibt es Geldautomaten in der Ankunftshalle, und Franken sind für Trinkgeld die richtige Währung. Euro werden zwar oft angenommen, aber zu einem ungünstigen Kurs, und Münzen aus dem Euroraum kann der Fahrer nicht wechseln.",
        ]},
        { h: "7. Wie viel? Eine Orientierung nach Situation", p: [
          "Die folgende Tabelle ist keine Regel, sondern das, was wir im Alltag beobachten. Sie zeigt, was Schweizerinnen und Schweizer typischerweise geben – nicht, was Sie geben müssen. Wer darunter bleibt, ist nicht unhöflich; wer darüber liegt, ist grosszügig.",
          "Bemerkenswert ist, wie klein die Beträge im internationalen Vergleich sind. Das ist kein Zeichen von Geiz, sondern die logische Folge davon, dass Löhne in der Schweiz hoch und Preise ohnehin inklusive Service sind. Ein Trinkgeld von zwanzig Prozent, wie in den USA üblich, wäre hier eher irritierend als beeindruckend.",
          "Bei allen Zahlen gilt: Die Geste zählt mehr als der Betrag. Ein freundliches Wort beim Aussteigen, ein Dankeschön für die Hilfe mit dem Kinderwagen – das bleibt einem Fahrer länger in Erinnerung als die Höhe des Scheins.",
        ], table: {
          head: ["Situation", "Üblich in der Schweiz", "Bemerkung"],
          rows: [
            ["Taxi, kurze Stadtfahrt", "Aufrunden auf den nächsten Franken", "Nicht erwartet"],
            ["Taxi, lange Fahrt mit Gepäck", "Etwa fünf Franken oder auf die Zehnerstelle", "Bei besonderem Einsatz mehr"],
            ["Privater Transfer", "Freiwillig, fünf bis zwanzig Franken je nach Fahrt", "Bargeld an den Fahrer, nicht über die Rechnung"],
            ["Restaurant", "Aufrunden, bei gutem Service 5–10 %", "Beim Kartenzahlen dazusagen"],
            ["Hotelportier / Zimmerservice", "Zwei bis fünf Franken", "Housekeeping optional"],
            ["Guide auf Tour", "Kleine Anerkennung", "Bei Gruppen pro Gruppe"],
          ],
        }},
        { h: "8. Kulturelle Unterschiede: Woher Sie kommen, prägt die Erwartung", p: [
          "Gäste aus den **USA** geben aus Gewohnheit zu viel und sind dann unsicher, ob sie zu wenig gegeben haben. Unsere Antwort: Rechnen Sie nicht in Prozent, runden Sie auf. Ein Fahrer in Zürich ist nicht auf Trinkgeld angewiesen, und ein Betrag, der in New York normal wäre, wirkt hier eher wie ein Missverständnis.",
          "Gäste aus **Grossbritannien** kennen das Aufrunden und finden sich in der Schweiz schnell zurecht; die Beträge liegen etwas höher als zu Hause, weil die Preise höher sind. Gäste aus **Deutschland und Österreich** bringen die richtige Grundhaltung mit – «stimmt so» beim Bezahlen –, sollten aber wissen, dass in der Schweiz das Runden auf Franken, nicht auf Euro gemeint ist.",
          "Gäste aus **Japan, China und Korea** sind Trinkgeld kaum gewohnt und müssen sich nicht umstellen: Nichts zu geben ist in der Schweiz korrekt. Wer eine Geste machen möchte, gibt einen kleinen Betrag; niemand wird es erwarten. Gäste aus den **Golfstaaten** sind oft sehr grosszügig – auch das ist willkommen, aber die Hälfte täte es ebenso.",
        ]},
        { h: "9. Drei Beispiele aus unserem Alltag", p: [
          "Ein Ehepaar aus Boston landet um 22 Uhr, fährt mit uns nach [Luzern](/zurich-airport-to-luzern) und fragt beim Aussteigen leise, ob zwanzig Prozent richtig seien. Der Fahrer lächelt, sagt, es sei alles im Preis, und die beiden geben zehn Franken. Alle sind zufrieden. Der Punkt: Die Frage war unnötig, die Geste war schön.",
          "Eine Familie aus München fährt mit zwei Kindern und Skigepäck nach [Davos](/zurich-airport-to-davos). Der Fahrer montiert die Kindersitze, verstaut vier Skitaschen, hält unterwegs für eine Windel und trägt am Ende alles in die Ferienwohnung. Die Mutter gibt zwanzig Franken und bedankt sich. Auch hier: kein Muss, aber angemessen für den Einsatz.",
          "Eine Geschäftsreisende aus Singapur fährt nach [Zug](/zurich-airport-to-zug), arbeitet die ganze Fahrt am Laptop, bedankt sich beim Aussteigen und gibt nichts. Zwei Tage später kommt eine Fünf-Sterne-Bewertung mit dem Namen des Fahrers. Das ist, ehrlich gesagt, das wertvollste Trinkgeld, das es gibt.",
        ]},
        { h: "10. Fazit: freiwillig, bescheiden, gern gesehen", p: [
          "Trinkgeld in der Schweiz ist einfach, sobald man das Prinzip verstanden hat: Der Service ist bezahlt, die Geste ist frei. Im Taxi rundet man auf, beim privaten Transfer gibt man, was einem richtig erscheint, im Restaurant nennt man einen runden Betrag. Niemand rechnet Prozente, und niemand nimmt es übel, wenn nichts kommt.",
          "Für Reisende bedeutet das vor allem Entspannung. Sie müssen nicht am Ende jeder Fahrt kalkulieren, keine kleinen Scheine horten und keine Angst vor einem Fauxpas haben. Sie können sich auf das konzentrieren, was in der Schweiz wirklich zählt: die Aussicht auf dem Weg vom Flughafen in die Berge.",
          "Wenn Sie noch Fragen zur Etikette haben – oder einfach wissen wollen, wie Ihr Transfer abläuft –, schreiben Sie uns. Und wenn Sie einen Fahrer besonders loben möchten: Sein Name steht auf dem Namensschild. Er freut sich mehr über eine Bewertung, als Sie denken. [Transfer buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Do You Tip Taxi Drivers in Switzerland?",
      excerpt: "Round up, a percentage or nothing at all? How tipping really works in Switzerland – in taxis, on a private transfer, in restaurants and hotels. With a table for travellers from the USA, the UK, Germany and Asia.",
      body: [
        { p: [
          "Hardly any question is asked more often by guests from abroad than this one: \"How much do I tip the driver?\" The uncertainty is understandable, because Switzerland has neither the American percentage culture nor the British flat rate, and the answer \"nothing\" sounds impolite to many. This article explains Swiss practice step by step – for taxis, private transfers and the other situations of a trip.",
          "The short version first: in Switzerland tipping is voluntary, because service is included in the price. Anyone who rounds up or gives a few francs shows appreciation; anyone who gives nothing breaks no rule. That applies to taxis just as to our chauffeurs. Still, there are nuances that make the difference between \"correct\" and \"confident\".",
          "We have structured the chapters so that you find the answer for your situation in two minutes: the legal basis, taxi, private transfer, restaurant and hotel, cash versus card, cultural differences by country of origin and a few concrete examples from our daily work. If you only want to know what to give our driver: chapter 4.",
        ]},
        { h: "1. Why tipping works differently in Switzerland", p: [
          "Since 1974, service has been included in the price in Switzerland – the so-called \"service compris\" rule. Restaurants, hotels and taxis must pay their staff from the regular price, not from tips. That is the most important difference to the USA, where tips replace part of the wage, and the reason why Switzerland has no percentage culture.",
          "The consequence: a tip is a gesture, not an obligation. A taxi driver in Zurich earns a regular wage, and the ride costs what the meter shows. Anyone who gives nothing is not frowned upon; anyone who rounds up makes the driver happy. This relaxed attitude is unfamiliar at first for travellers from tipping cultures, but it makes many things easier.",
          "At the same time, Switzerland is not a country where tipping is frowned upon – unlike Japan, for example. Appreciation for good service is welcome, and in practice most Swiss give something in restaurants and taxis. Only the amount is more modest, and the form is rounding up, not calculating percentages.",
        ]},
        { h: "2. Tipping in a taxi from the rank", p: [
          "In a classic taxi, rounding up to the next franc or to a round amount is customary. Short city ride: one or two francs. Longer ride with help with luggage: five francs or up to the next ten. More is not expected, less is no affront. If you pay by card, you simply say \"make it x\" when the amount comes up, and the driver keys it in.",
          "There are situations where a little more is appropriate: the driver carried heavy suitcases up a staircase, drove especially carefully in snow, waited for you or made a detour for a stop. Then ten percent or an extra five-franc coin is a nice gesture – but still voluntary.",
          "Conversely, there is no obligation if the service was poor: unfriendly tone, unnecessary detour, cigarette smell in the car. Then you pay the meter amount and nothing beyond. How the taxi fare in Zurich is made up in the first place is explained in [Taxi at Zurich Airport](/blog/taxi-flughafen-zuerich-finden-kosten-alternativen).",
        ], ul: [
          "Short city ride: round up to the next franc",
          "Longer ride with luggage: around five francs or up to the next ten",
          "Special effort (stairs, snow, waiting): up to about ten percent",
          "Poor service: no tip, without a guilty conscience",
        ]},
        { h: "3. Tipping on a private transfer", p: [
          "With a private transfer the price is fixed in advance and includes everything: meet & greet, waiting time, help with luggage, child seats, VAT. A tip is therefore also voluntary – our chauffeurs are paid regularly and expect nothing. Many guests still give something, because the journey is a personal service: someone waited with a name sign, helped, drove and said goodbye.",
          "If you would like to give something, cash directly to the driver is the simplest way; there is no tip line on the online invoice, and that is intentional – the fixed price should remain the fixed price. The amount follows the journey: for an hour to Lucerne a five or ten-franc note is generous; for a trip to Zermatt with ski luggage and a stop, twenty is no exaggeration either.",
          "Anyone who gives nothing but leaves a good review does the driver and us at least as big a favour. An honest review on Google or Trustpilot brings new guests, and we pass praise on to the drivers. And if something was not right, please write to us first – we would rather sort it out than read it in a review.",
        ]},
        { h: "4. The short answer for our guests", p: [
          "If you travel with us and wonder what is appropriate: nothing is wrong, a small amount is welcome, a large amount is unnecessary. Round up in your head or hand the driver a note that feels right when getting out. He will thank you, whether it is five or twenty francs.",
          "For corporate clients whose expense policy does not allow tips, that is perfectly fine – our drivers know this and expect nothing from business travellers. For groups, one tip per vehicle is enough, not per person. And for families with children whose hands are full anyway, a friendly thank-you is often what counts most.",
          "We have only one request: do not ask the driver \"how much is customary\". He will wave it off out of politeness, and you are none the wiser. The answer is here – and it is: voluntary, modest, appreciated.",
        ]},
        { h: "5. Restaurant, hotel, porter", p: [
          "In restaurants the Swiss usually round up: a bill of 47 francs becomes 50, 93 becomes 100. For very good service and a larger group, five to ten percent is customary but not required. When paying by card, the server asks whether the amount is correct or whether you would like a different one – that is the moment to name the rounded amount.",
          "In hotels tipping is even less common. For room service or the porter who brings suitcases to the room, two to five francs is appropriate; for housekeeping some guests leave a small amount at the end of the stay, most do not. A reception desk expects nothing.",
          "At mountain railways, museums, boat trips and similar attractions there is no tipping. On guided tours a small token for the guide is customary if he or she was good. In short: wherever a person looked after you personally, a gesture is welcome; where a system served you, it is not.",
        ]},
        { h: "6. Cash or card?", p: [
          "Switzerland is cash-friendly, but card payment is possible everywhere – including taxis. If you pay by card or TWINT, you can add the tip to the amount; the terminal is set accordingly. Cash has the advantage that it reaches the driver directly and does not pass through accounting.",
          "On our transfers the fare is paid online before the journey; a tip is separate and remains between you and the driver. If you have no cash, do not worry – a thank-you and a review are entirely enough. How online payment works is in [our booking steps](/buchung).",
          "A practical note for arrivals: Zurich Airport has cash machines in the arrivals hall, and francs are the right currency for tips. Euros are often accepted, but at an unfavourable rate, and the driver cannot change euro coins.",
        ]},
        { h: "7. How much? A guide by situation", p: [
          "The following table is not a rule but what we observe day to day. It shows what Swiss people typically give – not what you must give. Anyone who stays below is not impolite; anyone above is generous.",
          "What stands out is how small the amounts are by international comparison. That is not a sign of stinginess but the logical consequence of high wages and prices that already include service. A tip of twenty percent, as customary in the USA, would be more puzzling than impressive here.",
          "For all figures: the gesture counts more than the amount. A friendly word when getting out, a thank-you for help with the pushchair – that stays in a driver's memory longer than the size of the note.",
        ], table: {
          head: ["Situation", "Customary in Switzerland", "Note"],
          rows: [
            ["Taxi, short city ride", "Round up to the next franc", "Not expected"],
            ["Taxi, long ride with luggage", "About five francs or up to the next ten", "More for special effort"],
            ["Private transfer", "Voluntary, five to twenty francs depending on the journey", "Cash to the driver, not via the invoice"],
            ["Restaurant", "Round up, 5–10 % for good service", "Say it when paying by card"],
            ["Hotel porter / room service", "Two to five francs", "Housekeeping optional"],
            ["Tour guide", "Small token", "Per group for groups"],
          ],
        }},
        { h: "8. Cultural differences: where you come from shapes expectations", p: [
          "Guests from the **USA** give too much out of habit and then worry they gave too little. Our answer: do not calculate percentages, round up. A driver in Zurich does not depend on tips, and an amount that would be normal in New York looks more like a misunderstanding here.",
          "Guests from the **UK** know rounding up and settle in quickly; amounts are slightly higher than at home because prices are higher. Guests from **Germany and Austria** bring the right attitude – \"keep the change\" when paying – but should know that in Switzerland rounding refers to francs, not euros.",
          "Guests from **Japan, China and Korea** are hardly used to tipping and need not adjust: giving nothing is correct in Switzerland. Anyone wanting to make a gesture gives a small amount; nobody will expect it. Guests from the **Gulf states** are often very generous – that is welcome too, but half would do just as well.",
        ]},
        { h: "9. Three examples from our daily work", p: [
          "A couple from Boston lands at 10 pm, travels with us to [Lucerne](/zurich-airport-to-luzern) and quietly asks when getting out whether twenty percent is right. The driver smiles, says it is all included, and the two give ten francs. Everyone is happy. The point: the question was unnecessary, the gesture was lovely.",
          "A family from Munich travels with two children and ski luggage to [Davos](/zurich-airport-to-davos). The driver fits the child seats, stows four ski bags, stops for a nappy change and carries everything into the holiday flat at the end. The mother gives twenty francs and says thank you. Again: not a must, but appropriate for the effort.",
          "A businesswoman from Singapore travels to [Zug](/zurich-airport-to-zug), works on her laptop the whole way, thanks the driver when getting out and gives nothing. Two days later a five-star review arrives naming the driver. That is, frankly, the most valuable tip there is.",
        ]},
        { h: "10. Conclusion: voluntary, modest, appreciated", p: [
          "Tipping in Switzerland is simple once you understand the principle: the service is paid, the gesture is free. In a taxi you round up, on a private transfer you give what feels right, in a restaurant you name a round amount. Nobody calculates percentages, and nobody takes offence if nothing comes.",
          "For travellers this means, above all, relaxation. You do not have to calculate at the end of every ride, hoard small notes or fear a faux pas. You can concentrate on what really counts in Switzerland: the view on the way from the airport into the mountains.",
          "If you still have questions about etiquette – or simply want to know how your transfer works – write to us. And if you would like to praise a driver in particular: his name is on the name sign. He is happier about a review than you think. [Book a transfer](/buchung).",
        ]},
      ],
    },
  },

  // ── 3. Sieben Fehler ─────────────────────────────────────
  {
    slug: "7-fehler-flughafen-zuerich-vermeiden",
    date: "2026-09-20",
    img: "/gallery/1.jpg",
    de: {
      title: "7 Fehler, die Sie am Flughafen Zürich vermeiden sollten",
      excerpt: "Falscher Ankunftsbereich, kein Kindersitz, Trinkgeld in Euro, spontane Nachtfahrt ohne Plan: Die häufigsten Fehler von Erstbesuchern am Flughafen Zürich – und wie Sie jeden einzelnen mit einer Minute Vorbereitung vermeiden.",
      body: [
        { p: [
          "Der Flughafen Zürich gilt als einer der angenehmsten Europas: kompakt, sauber, mit Bahnhof im Untergeschoss und Ankunftshalle in Gehweite der Gates. Trotzdem sehen wir jede Woche dieselben Fehler – nicht, weil die Reisenden unvorsichtig wären, sondern weil Zürich ein paar Eigenheiten hat, die niemand vorher erklärt. Dieser Beitrag tut genau das.",
          "Wir haben die sieben häufigsten Fehler aus tausenden Abholungen gesammelt und jeweils beschrieben, was passiert, warum es passiert und was Sie stattdessen tun sollten. Manche kosten Zeit, manche Geld, einer kann den Anschlussflug kosten. Alle lassen sich mit einer Minute Vorbereitung vermeiden.",
          "Die Reihenfolge folgt der Reise: von der Vorbereitung zu Hause über die Ankunft bis zur Weiterfahrt. Am Ende steht eine Checkliste, die Sie vor dem Abflug abhaken können. Wer nur eines mitnimmt: Geben Sie bei jeder Buchung Ihre Flugnummer an – das löst mehr Probleme, als Sie denken.",
        ]},
        { h: "Fehler 1: Die Flugnummer nicht angeben", p: [
          "Es klingt banal, ist aber der häufigste Fehler: Reisende buchen einen Transfer mit Datum und Uhrzeit, aber ohne Flugnummer. Landet die Maschine dann eine Stunde später, weiss niemand davon – der Fahrer wartet zur geplanten Zeit, das Zeitfenster verstreicht, und am Ende stehen beide Seiten mit einem Problem da, das vermeidbar war.",
          "Mit Flugnummer verfolgen wir den Flug vom Abflug bis zur Landung und verschieben die Abholung automatisch. Verspätungen kosten nichts, Umleitungen lassen sich lösen, und der Fahrer steht in der Halle, wenn Sie wirklich kommen. Was genau bei Verspätung passiert, steht in [Flug verspätet oder annulliert?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
          "Die Flugnummer steht auf Ihrer Bordkarte und in der Buchungsbestätigung der Airline, im Format «LX 1234» oder «BA 712». Geben Sie sie bei der Buchung ein, auch wenn Sie den Transfer für die Rückfahrt zum Flughafen buchen – dort hilft sie, die richtige Abflugzeit zu prüfen.",
        ]},
        { h: "Fehler 2: Zum Taxistand laufen, obwohl ein Fahrer wartet", p: [
          "Wer einen Transfer gebucht hat und aus Gewohnheit nach draussen zum Taxistand geht, sucht am falschen Ort. Der Chauffeur steht mit Namensschild in der Ankunftshalle, unmittelbar hinter dem Ausgang aus der Gepäckausgabe – nicht am Strassenrand, nicht im Parkhaus. Am Taxistand sucht Sie niemand, und das Telefon klingelt erst, wenn beide sich wundern.",
          "Die Lösung ist einfach: Bleiben Sie nach dem Ausgang stehen und schauen Sie sich um. Das Schild trägt den Namen, den Sie bei der Buchung angegeben haben. Sehen Sie es nicht, schreiben Sie uns eine WhatsApp-Nachricht mit Ihrem Namen – die Zentrale lotst Sie in wenigen Sätzen zum richtigen Punkt.",
          "Wenn Sie Gäste abholen lassen, sagen Sie ihnen das vorher: «Ein Fahrer wartet mit eurem Namen in der Halle, geht nicht raus.» Dieser eine Satz erspart Erstbesuchern zehn Minuten Verwirrung. Wie der Treffpunkt in beiden Ankunftsbereichen funktioniert, erklärt [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Fehler 3: Nach 23 Uhr spontan eine lange Fahrt suchen", p: [
          "Nachtlandungen sind der Moment, in dem Improvisation am teuersten wird. Wer um 23:30 Uhr mit Gepäck aus dem Zoll kommt und erst dann überlegt, wie er nach Luzern kommt, findet: keinen Zug mehr, einen dünn besetzten Taxistand, Fahrer, die lange Strecken ablehnen, und Apps mit steigenden Preisen. Die Alternative ist oft eine ungeplante Nacht am Flughafen.",
          "Der Fehler liegt nicht in der späten Landung, sondern im fehlenden Plan. Ein vorab gebuchter Transfer fährt nachts zum gleichen Festpreis; der Fahrer ist eingeplant, das Fahrzeug bereit, die Kindersitze montiert. Spontane Anfragen zwischen 23 und 6 Uhr für Fahrten innerhalb von zwei Stunden können wir online nicht annehmen – genau deshalb lohnt sich die Buchung mit dem Flug.",
          "Wenn Sie doch ohne Buchung dastehen: Schreiben Sie uns per WhatsApp, oft finden wir eine Lösung. Aber versprechen können wir sie nur bei Vorabbuchung. Alles zur Nachtankunft steht in [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "Fehler 4: Gepäck und Personen nach Gefühl schätzen", p: [
          "«Wir sind zu viert, das passt schon» – bis vier grosse Koffer, zwei Handgepäckstücke und ein Kinderwagen vor einer E-Klasse stehen. Der Fehler ist nicht die Fahrzeugwahl, sondern die Schätzung: Reisende zählen Personen und vergessen Koffer. Ein Fahrzeug, das auf dem Papier passt, wird am Gepäckband eng.",
          "Die Faustregel: Zählen Sie die aufgegebenen Gepäckstücke, nicht die Personen. Ist die Zahl der Koffer grösser als die Personenzahl, prüfen Sie die nächste Klasse. Ab drei Personen mit je einem grossen Koffer ist die V-Klasse die entspanntere Wahl. Skitaschen, Golfbags und Kinderwagen melden Sie im Notizfeld an, damit der Laderaum vorbereitet ist.",
          "Was in welche Klasse passt, mit den typischen Fehleinschätzungen, steht in [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse). Und wenn Sie unsicher sind: Schreiben Sie uns Personen und Gepäck, wir antworten ehrlich – auch wenn die kleinere Klasse reicht.",
        ]},
        { h: "Fehler 5: Ohne Kindersitz losfahren wollen", p: [
          "In der Schweiz müssen Kinder bis zwölf Jahre oder 150 cm in einer geeigneten Rückhaltevorrichtung mitfahren, auch in Taxis und Transferfahrzeugen. Reisende aus Ländern, in denen Taxis davon ausgenommen sind, erwarten das nicht und stehen am Taxistand ohne Sitz da. Der Fahrer darf nicht fahren; die Familie wartet.",
          "Bei uns sind Babyschalen, Kindersitze und Sitzerhöhungen kostenlos und vor der Abholung montiert – vorausgesetzt, Sie geben Alter und Anzahl der Kinder bei der Buchung an. Das ist der ganze Trick: ein Feld im Formular. Für Kinder von 15 bis 36 kg wählen Sie den Kindersitz direkt aus, für jüngere schreiben Sie das Alter ins Notizfeld.",
          "Eigene Sitze dürfen Sie selbstverständlich mitbringen; sagen Sie es uns kurz, damit wir keinen zweiten montieren. Welche Sitze für welches Alter passen und wie der Familien-Transfer sonst abläuft, steht in [Mit Kindern unterwegs](/blog/mit-kindern-reisen-kindersitze-schweiz).",
        ]},
        { h: "Fehler 6: Zu wenig Zeit für den Rückweg einplanen", p: [
          "Der gefährlichste Fehler passiert nicht bei der Ankunft, sondern bei der Abreise. Reisende rechnen mit der Fahrzeit, die sie auf dem Hinweg hatten, und vergessen den Puffer: Berufsverkehr rund um Zürich am Morgen, Schneefall auf der Bergstrecke, Wechselsamstag in den Sportferien. Aus 3 Stunden 15 Minuten von Davos werden dann vier – und der Check-in ist geschlossen.",
          "Die Formel ist einfach: Abflug minus Check-in-Frist minus Fahrzeit minus Puffer. Für europäische Flüge rechnen Sie rund zwei Stunden Check-in, für Langstrecke eher drei. Im Winter kommen auf Bergstrecken 45 bis 60 Minuten Puffer dazu. Ein früher Start kostet Sie einen Kaffee am Flughafen; ein später kostet unter Umständen den Flug.",
          "Wenn Sie unsicher sind, welche Abholzeit für Ihren Flug sinnvoll ist, schreiben Sie uns Flugnummer und Adresse – wir schlagen eine Zeit vor. Die vollständige Rechnung mit Fahrzeiten für alle Strecken steht in [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ], table: {
          head: ["Abreise von", "Normale Fahrzeit", "Empfohlener Puffer"],
          rows: [
            ["Zürich Stadt", "rund 20 Minuten", "20 Minuten (Berufsverkehr)"],
            ["Luzern", "rund 1 h 15", "30 Minuten"],
            ["Basel / Bern", "rund 1 h 45 – 2 h 20", "30 Minuten"],
            ["Davos / Engadin (Winter)", "3 h 15 – 4 h 15", "45–60 Minuten"],
            ["Zermatt (ab Täsch, Winter)", "rund 4 h 45", "60 Minuten"],
          ],
        }},
        { h: "Fehler 7: Mit Euro-Münzen und Prozentrechnung ankommen", p: [
          "Zwei kleine Fehler mit derselben Wurzel: Reisende wollen dem Fahrer etwas geben, haben aber nur Euro-Münzen – die kann er nicht wechseln – oder rechnen Trinkgeld wie zu Hause in Prozent und sind dann unsicher. In der Schweiz ist Trinkgeld freiwillig, weil der Service im Preis enthalten ist; man rundet auf oder gibt einen kleinen Schein in Franken.",
          "Beim privaten Transfer ist der Festpreis vorab bezahlt und enthält alles. Ein Trinkgeld ist eine Geste, kein Muss; wer nichts gibt, macht keinen Fehler. Wer etwas geben möchte, gibt Bargeld in Franken direkt an den Fahrer. Geldautomaten gibt es in der Ankunftshalle.",
          "Die ausführliche Version mit Beträgen nach Situation, Herkunftsland und Beispielen steht in [Trinkgeld im Taxi in der Schweiz](/blog/trinkgeld-taxi-schweiz-was-ist-ueblich). Die Kurzfassung: freiwillig, bescheiden, gern gesehen.",
        ]},
        { h: "Bonus: Drei kleine Dinge, die viel Zeit sparen", p: [
          "Erstens: Aktivieren Sie nach der Landung das kostenlose Flughafen-WLAN, bevor Sie mobile Daten brauchen – WhatsApp funktioniert damit, und Sie sind erreichbar, falls der Fahrer Sie sucht. Zweitens: Wechseln Sie am Automaten in der Ankunftshalle ein paar Franken; für kleine Dinge unterwegs ist Bargeld praktisch, auch wenn Karten überall gehen.",
          "Drittens: Fotografieren Sie die Bestätigungs-E-Mail des Transfers oder speichern Sie sie offline. Darauf stehen Referenz, Zeit, Fahrzeug und unsere Nummer – alles, was Sie brauchen, wenn das Netz an Bord noch nicht da ist. Reisende, die diese drei Dinge tun, kommen entspannter an als solche, die im Terminal nach Empfang suchen.",
          "Und ein vierter Punkt für Vielflieger: Buchen Sie die Rückfahrt gleich mit. Der Weg zum Flughafen ist der riskantere Teil der Reise, und eine fixe Abholzeit an der Adresse nimmt den Druck aus dem letzten Tag. Mehr solcher Gewohnheiten in [Business Travel Zürich](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "Checkliste vor dem Abflug", p: [
          "Diese Liste können Sie in einer Minute abhaken. Sie deckt alle sieben Fehler ab und ist die Kurzfassung dieses Beitrags. Wer sie vor dem Abflug durchgeht, hat am Flughafen Zürich nichts mehr zu entscheiden – nur noch anzukommen.",
          "Wenn Sie mit uns fahren, sind die meisten Punkte im Buchungsformular ohnehin abgefragt: Flugnummer, Personen, Gepäck, Kinder, Zeit. Der Rest – Halle statt Taxistand, Franken statt Euro, Puffer statt Hoffnung – ist Wissen, das Sie jetzt haben.",
          "Bleibt nur noch die Buchung. Zwei Minuten, Flugnummer, Ziel, Fahrzeug – und der Fahrer wartet in der Halle, wenn Sie landen. [Jetzt buchen](/buchung).",
        ], ul: [
          "Flugnummer in der Buchung angegeben",
          "Personen **und** Koffer ehrlich gezählt, Sperriges angemeldet",
          "Kinder mit Alter angegeben (Sitze sind kostenlos)",
          "Nachtlandung? Transfer vorab gebucht, nicht spontan",
          "Treffpunkt bekannt: Ankunftshalle, nicht Taxistand",
          "Rückfahrt mit Puffer geplant, Rückfahrt mitgebucht",
          "Ein paar Franken Bargeld, Trinkgeld freiwillig",
        ]},
      ],
    },
    en: {
      title: "7 Mistakes to Avoid at Zurich Airport",
      excerpt: "Wrong arrivals area, no child seat, tipping in euros, a spontaneous night journey without a plan: the most common mistakes first-time visitors make at Zurich Airport – and how to avoid every single one with a minute of preparation.",
      body: [
        { p: [
          "Zurich Airport is considered one of the most pleasant in Europe: compact, clean, with the railway station in the basement and the arrivals hall within walking distance of the gates. Yet every week we see the same mistakes – not because travellers are careless, but because Zurich has a few quirks nobody explains beforehand. This article does exactly that.",
          "We have collected the seven most common mistakes from thousands of pickups and described for each what happens, why it happens and what you should do instead. Some cost time, some cost money, one can cost the connecting flight. All can be avoided with a minute of preparation.",
          "The order follows the trip: from preparation at home through arrival to the onward journey. At the end is a checklist you can tick off before departure. If you take away only one thing: enter your flight number with every booking – it solves more problems than you think.",
        ]},
        { h: "Mistake 1: Not entering the flight number", p: [
          "It sounds trivial but is the most common mistake: travellers book a transfer with date and time but without a flight number. If the aircraft then lands an hour late, nobody knows – the driver waits at the scheduled time, the window passes, and in the end both sides have a problem that was avoidable.",
          "With a flight number we track the flight from departure to landing and shift the pickup automatically. Delays cost nothing, diversions can be solved, and the driver is in the hall when you actually arrive. Exactly what happens on delay is in [Flight delayed or cancelled?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
          "The flight number is on your boarding pass and in the airline's booking confirmation, in the format \"LX 1234\" or \"BA 712\". Enter it when booking, even if you book the transfer for the return to the airport – there it helps to check the correct departure time.",
        ]},
        { h: "Mistake 2: Walking to the taxi rank although a driver is waiting", p: [
          "Anyone who has booked a transfer and walks outside to the taxi rank out of habit is looking in the wrong place. The chauffeur stands with a name sign in the arrivals hall, right behind the exit from baggage claim – not at the kerb, not in the car park. At the taxi rank nobody is looking for you, and the phone only rings once both sides are puzzled.",
          "The solution is simple: stop after the exit and look around. The sign shows the name you entered when booking. If you do not see it, send us a WhatsApp message with your name – dispatch guides you to the right spot in a few sentences.",
          "If you have guests collected, tell them beforehand: \"A driver is waiting with your name in the hall, do not go outside.\" This one sentence saves first-time visitors ten minutes of confusion. How the meeting point works in both arrivals areas is explained in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Mistake 3: Looking for a long ride spontaneously after 11 pm", p: [
          "Night landings are the moment when improvisation becomes most expensive. Anyone leaving customs with luggage at 11:30 pm and only then thinking about how to get to Lucerne finds: no more trains, a thinly staffed taxi rank, drivers declining long journeys, and apps with rising prices. The alternative is often an unplanned night at the airport.",
          "The mistake is not the late landing but the missing plan. A pre-booked transfer runs at night at the same fixed price; the driver is scheduled, the vehicle ready, the child seats fitted. Spontaneous requests between 11 pm and 6 am for journeys within two hours cannot be accepted online – exactly why booking with the flight pays off.",
          "If you do find yourself without a booking: message us on WhatsApp, we often find a solution. But we can only promise one with advance booking. Everything about night arrivals is in [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "Mistake 4: Guessing luggage and passengers", p: [
          "\"There are four of us, it'll fit\" – until four large suitcases, two carry-ons and a pushchair stand in front of an E-Class. The mistake is not the vehicle choice but the estimate: travellers count people and forget suitcases. A vehicle that fits on paper becomes tight at the baggage belt.",
          "The rule of thumb: count the checked pieces, not the people. If the number of suitcases exceeds the number of people, check the next class. From three people with one large suitcase each, the V-Class is the more relaxed choice. Mention ski bags, golf bags and pushchairs in the remarks field so the load space is prepared.",
          "What fits in which class, with the typical misjudgements, is in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse). And if you are unsure: send us people and luggage, we answer honestly – even if the smaller class is enough.",
        ]},
        { h: "Mistake 5: Wanting to set off without a child seat", p: [
          "In Switzerland, children up to twelve years or 150 cm must travel in a suitable restraint, including in taxis and transfer vehicles. Travellers from countries where taxis are exempt do not expect this and stand at the taxi rank without a seat. The driver may not drive; the family waits.",
          "With us, baby shells, child seats and boosters are free and fitted before pickup – provided you state the age and number of children when booking. That is the whole trick: one field in the form. For children of 15 to 36 kg you select the child seat directly; for younger ones write the age in the remarks field.",
          "You are of course welcome to bring your own seats; just tell us so we do not fit a second one. Which seats suit which age and how the family transfer works otherwise is in [Travelling with children](/blog/mit-kindern-reisen-kindersitze-schweiz).",
        ]},
        { h: "Mistake 6: Allowing too little time for the way back", p: [
          "The most dangerous mistake happens not on arrival but on departure. Travellers count on the driving time they had on the way out and forget the buffer: rush hour around Zurich in the morning, snowfall on the mountain route, changeover Saturday during the sports holidays. 3 hours 15 minutes from Davos become four – and check-in is closed.",
          "The formula is simple: departure minus check-in deadline minus driving time minus buffer. For European flights count around two hours for check-in, for long-haul closer to three. In winter add 45 to 60 minutes of buffer on mountain routes. An early start costs you a coffee at the airport; a late one may cost the flight.",
          "If you are unsure which pickup time makes sense for your flight, send us flight number and address – we suggest a time. The full calculation with driving times for all routes is in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ], table: {
          head: ["Departing from", "Normal driving time", "Recommended buffer"],
          rows: [
            ["Zurich city", "around 20 minutes", "20 minutes (rush hour)"],
            ["Lucerne", "around 1 h 15", "30 minutes"],
            ["Basel / Bern", "around 1 h 45 – 2 h 20", "30 minutes"],
            ["Davos / Engadin (winter)", "3 h 15 – 4 h 15", "45–60 minutes"],
            ["Zermatt (from Täsch, winter)", "around 4 h 45", "60 minutes"],
          ],
        }},
        { h: "Mistake 7: Arriving with euro coins and percentage maths", p: [
          "Two small mistakes with the same root: travellers want to give the driver something but only have euro coins – which he cannot change – or calculate tips in percentages as at home and then feel unsure. In Switzerland tipping is voluntary because service is included in the price; you round up or give a small note in francs.",
          "With a private transfer the fixed price is paid in advance and includes everything. A tip is a gesture, not a must; anyone who gives nothing makes no mistake. Anyone who wants to give something hands cash in francs directly to the driver. Cash machines are in the arrivals hall.",
          "The detailed version with amounts by situation, country of origin and examples is in [Do you tip taxi drivers in Switzerland?](/blog/trinkgeld-taxi-schweiz-was-ist-ueblich). The short version: voluntary, modest, appreciated.",
        ]},
        { h: "Bonus: three small things that save a lot of time", p: [
          "First: activate the free airport Wi-Fi after landing before you need mobile data – WhatsApp works with it, and you are reachable if the driver is looking for you. Second: withdraw a few francs at the machine in the arrivals hall; for small things on the way, cash is practical even though cards work everywhere.",
          "Third: screenshot the transfer confirmation email or save it offline. It contains reference, time, vehicle and our number – everything you need when the network is not there yet on board. Travellers who do these three things arrive more relaxed than those searching for a signal in the terminal.",
          "And a fourth point for frequent flyers: book the return at the same time. The way to the airport is the riskier part of the trip, and a fixed pickup time at the address takes the pressure off the last day. More such habits in [Business travel Zurich](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "Checklist before departure", p: [
          "You can tick off this list in a minute. It covers all seven mistakes and is the short version of this article. Anyone who goes through it before departure has nothing left to decide at Zurich Airport – only to arrive.",
          "If you travel with us, most points are asked in the booking form anyway: flight number, people, luggage, children, time. The rest – hall instead of taxi rank, francs instead of euros, buffer instead of hope – is knowledge you now have.",
          "All that remains is the booking. Two minutes, flight number, destination, vehicle – and the driver is waiting in the hall when you land. [Book now](/buchung).",
        ], ul: [
          "Flight number entered in the booking",
          "People **and** suitcases counted honestly, bulky items mentioned",
          "Children stated with age (seats are free)",
          "Night landing? Transfer pre-booked, not spontaneous",
          "Meeting point known: arrivals hall, not taxi rank",
          "Return planned with buffer, return booked",
          "A few francs in cash, tip voluntary",
        ]},
      ],
    },
  },

  // ── 4. Fünf Orte unter 90 Minuten ────────────────────────
  {
    slug: "5-orte-unter-90-minuten-ab-flughafen-zuerich",
    date: "2026-09-21",
    img: "/gallery/5.jpg",
    de: {
      title: "5 Orte unter 90 Minuten ab Flughafen Zürich",
      excerpt: "Rheinfall, Luzern, Zug, Winterthur, Einsiedeln: Fünf Ziele, die Sie in weniger als eineinhalb Stunden ab Ankunftshalle erreichen – mit dem, was sich dort an einem halben Tag lohnt, den besten Kombinationen und ehrlichen Hinweisen, wann der Zug reicht.",
      body: [
        { p: [
          "Neunzig Minuten sind eine magische Grenze. Näher als das, und ein Ziel lässt sich am Anreisetag noch besuchen, bei einer langen Zwischenlandung erreichen oder als Tagesausflug ohne Frühaufstehen einplanen. Der Flughafen Zürich liegt so zentral, dass in diesem Radius fünf sehr verschiedene Orte liegen: ein Wasserfall, eine Seestadt, eine Kleinstadt am Wasser, eine Kulturstadt und ein Kloster in den Voralpen.",
          "Wir haben die fünf nach unserer Erfahrung ausgewählt – nach dem, was Gäste tatsächlich buchen und wovon sie begeistert zurückkommen. Zu jedem Ort stehen Fahrzeit ab Ankunftshalle, was sich an einem halben Tag lohnt, wie sich der Besuch mit einem zweiten Ziel kombinieren lässt und wann der Zug die vernünftigere Wahl ist. Fahrzeiten sind unsere Planwerte bei normalem Verkehr; die Details stehen auf den [Streckenseiten](/strecken).",
          "Alle fünf funktionieren mit dem privaten Fahrer besonders gut, weil das Gepäck im Kofferraum bleibt und die Rückkehrzeit fest steht. Für einen Ausflug mit Wartezeit ist unsere Stundenbuchung die passende Form. Wer nur ein Ziel sehen will, bucht die einfache Strecke; wer zwei kombinieren will, liest bis zum Ende.",
        ]},
        { h: "1. Rheinfall bei Schaffhausen – rund 1 Stunde", p: [
          "Europas grösster Wasserfall liegt näher am Flughafen als die meisten Reisenden vermuten: über die A4 nach Norden sind es rund 59 Minuten bis Neuhausen am Rheinfall. Von der Südseite bei Schloss Laufen führen Plattformen bis unmittelbar an das tosende Wasser; von der Nordseite starten die Boote zur Felsplattform mitten im Fall. Wer beides sehen will, plant zwei bis drei Stunden ein.",
          "Der Rheinfall ist ganzjährig zugänglich und im Frühsommer nach der Schneeschmelze am eindrucksvollsten. Für Familien ist er ideal: kein Aufstieg, kurze Wege, Restaurants am Wasser. Für einen Layover von sechs Stunden oder mehr ist er machbar – eine Stunde hin, zwei vor Ort, eine zurück, plus Boarding-Reserve.",
          "Kombination: Die Altstadt von Schaffhausen mit dem Munot liegt wenige Minuten entfernt, Stein am Rhein eine halbe Stunde weiter. Unsere feste Strecke nach [Schaffhausen](/zurich-airport-to-schaffhausen) führt direkt am Rheinfall vorbei. Der ausführliche Plan steht in [Rheinfall ab Flughafen Zürich](/blog/rheinfall-ab-flughafen-zuerich-halbtagesausflug). Zug statt Transfer? Möglich mit Umsteigen; mit Gepäck und Kindern ist der Fahrer die entspanntere Wahl.",
        ]},
        { h: "2. Luzern – rund 75 Minuten", p: [
          "Luzern ist der Klassiker, und das zu Recht: Kapellbrücke, Seebecken, Altstadt mit bemalten Fassaden, Löwendenkmal und die Museggmauer mit dem besten Blick über Stadt und See. Über die A4 und A14 planen wir mit rund 76 Minuten ab Ankunftshalle bis in die Innenstadt. Die Fahrt über den Hirzel und entlang des Zugersees ist bereits Teil des Erlebnisses.",
          "Ein halber Tag reicht für die Altstadt und einen Spaziergang am Nationalquai; ein ganzer Tag erlaubt den Pilatus oder die Rigi dazu. Wer in Luzern übernachtet, hat die Zentralschweiz vor der Tür – Weggis, Vitznau, Bürgenstock, Engelberg. Für Hotels ausserhalb der Stadt bestätigen wir den Preis vor der Buchung.",
          "Kombination: Luzern lässt sich mit Zug (Ziel 3) verbinden, das auf halbem Weg liegt, oder mit Engelberg für Titlis im Sommer. Unsere Strecke [Flughafen Zürich–Luzern](/zurich-airport-to-luzern) ist die meistgebuchte überhaupt; den Tagesplan mit Pilatus und Rigi liefert [Tagesausflug Luzern](/blog/luzern-tagesausflug-ab-zuerich). Zug statt Transfer? Für Alleinreisende mit Handgepäck, die am Bahnhof wohnen, ja.",
        ]},
        { h: "3. Zug – rund 55 Minuten", p: [
          "Zug ist die unterschätzte Perle: eine intakte Altstadt am Zugersee, der Zytturm mit Blick auf die Rigi, eine Seepromenade, auf der abends die Sonne hinter dem Pilatus untergeht. Über die A4 sind es rund 55 Minuten ab Flughafen. Die Stadt ist klein genug, um sie in zwei Stunden zu Fuss zu erkunden, und ruhig genug, um sie zu geniessen.",
          "Zug ist zugleich Wirtschaftsstandort mit vielen internationalen Firmen – für Geschäftsreisende, die zwischen zwei Terminen einen Blick auf die Schweiz werfen möchten, ein idealer Ort. Der Hafen, die Kirschtorte und die Seebäder im Sommer sind die drei Dinge, die Gäste am häufigsten erwähnen.",
          "Kombination: Zug liegt auf dem Weg nach Luzern; wer beides sehen will, macht in Zug Halt und fährt weiter. Unsere Strecke [Flughafen Zürich–Zug](/zurich-airport-to-zug) ist eine der kürzesten mit Festpreis. Zug statt Transfer? Die Bahn fährt direkt und schnell – für Einzelreisende ohne Gepäck durchaus eine Option; mit Koffern und Kindern nicht.",
        ]},
        { h: "4. Winterthur – rund 36 Minuten", p: [
          "Winterthur ist das nächste Ziel auf der Liste und das überraschendste: die sechstgrösste Stadt der Schweiz ist heimliche Kulturhauptstadt. Das Kunst Museum mit der Sammlung Oskar Reinhart, das Fotomuseum im alten Industriequartier, die grösste Fussgänger-Altstadt des Landes und das Technorama – ein Science Center, für das Familien allein einen Tag brauchen.",
          "Rund 36 Minuten über die A1, und Sie sind in einer Stadt, die kein Tourist auf dem Plan hat und die genau deshalb entspannt ist. Für einen kurzen Layover ist Winterthur das realistischste Ziel: Hin und zurück in gut einer Stunde, dazwischen zwei Stunden Altstadt oder Museum.",
          "Kombination: Winterthur liegt auf dem Weg nach St. Gallen und Schaffhausen. Wer den Rheinfall besucht, kann auf dem Rückweg in Winterthur essen. Unsere Strecke [Flughafen Zürich–Winterthur](/zurich-airport-to-winterthur) ist die kürzeste mit Festpreis. Zug statt Transfer? Die S-Bahn fährt in wenigen Minuten – für Einzelreisende ohne Gepäck die bessere Wahl, ehrlich gesagt.",
        ]},
        { h: "5. Einsiedeln – rund 60 Minuten", p: [
          "Das Kloster Einsiedeln ist der bedeutendste Wallfahrtsort der Schweiz und eines der schönsten Barockensembles Europas. Die Klosterkirche mit der Schwarzen Madonna, der riesige Klosterplatz, die Bibliothek und die Klosterschule – all das liegt in einem Voralpental, das im Winter Langlaufgebiet und im Sommer Wanderregion ist. Ab Flughafen sind es rund 60 Minuten über die A3 und den Etzel.",
          "Einsiedeln ist der ruhigste Ort auf dieser Liste. Wer nach einem Langstreckenflug etwas Stille sucht, findet sie in der Kirche und auf dem Platz; wer Kultur sucht, in den Fresken und der Bibliothek. Der Sihlsee liegt gleich hinter dem Dorf. Ein halber Tag reicht, ein ganzer Tag mit Wanderung ist schöner.",
          "Kombination: Einsiedeln liegt am Weg nach Schwyz und zum Vierwaldstättersee; die Rückfahrt über Rapperswil und den Zürichsee ist landschaftlich die Krönung. Für Einsiedeln gibt es keine feste Strecke – geben Sie die Adresse im Formular ein, wir bestätigen den Preis vor der Buchung. Zug statt Transfer? Möglich mit Umsteigen; der Fahrer erspart Ihnen eine Stunde Umwege.",
        ]},
        { h: "Die fünf im Überblick", p: [
          "Die Tabelle zeigt die Planwerte bei normalem Verkehr und die Halbtagesdauer, die wir empfehlen. Sie soll bei der Wahl helfen, nicht ersetzen: Wer Wasser mag, fährt zum Rheinfall; wer eine Stadt will, nach Luzern; wer Ruhe sucht, nach Einsiedeln.",
          "Alle Fahrzeiten sind ab Ankunftshalle bis ins Zentrum gerechnet. Zu Stosszeiten rund um Zürich – werktags morgens und am späten Nachmittag – kommen 15 bis 30 Minuten dazu. Wie Sie den Rückweg zum Flughafen sicher berechnen, steht in [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
          "Für Layover-Reisende gilt: Ziehen Sie vom Aufenthalt die Zeit bis zur Ankunftshalle und die Boarding-Reserve ab; was bleibt, ist Ihr Zeitfenster. Die Rechnung dazu liefert [Zwischenlandung in Zürich](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ], table: {
          head: ["Ziel", "Fahrzeit ab Halle", "Halber Tag reicht für", "Zug als Alternative"],
          rows: [
            ["Rheinfall", "rund 1 h", "Beide Seiten, Boot, Schaffhausen", "Mit Umsteigen"],
            ["Luzern", "rund 1 h 15", "Altstadt, See, Museggmauer", "Ja, für Einzelreisende"],
            ["Zug", "rund 55 min", "Altstadt, Zytturm, Seepromenade", "Ja, direkt"],
            ["Winterthur", "rund 36 min", "Altstadt oder ein Museum", "Ja, S-Bahn"],
            ["Einsiedeln", "rund 1 h", "Kloster, Platz, Sihlsee", "Mit Umsteigen"],
          ],
        }},
        { h: "Zwei Ziele an einem Tag: bewährte Paare", p: [
          "Rheinfall und Winterthur ergänzen sich perfekt: morgens Wasser, mittags Altstadt, nachmittags Museum, abends zurück. Zug und Luzern liegen auf einer Linie – ein Halt in Zug, weiter nach Luzern, Rückfahrt am Abend. Einsiedeln und Rapperswil verbinden Kloster und Rosenstadt am Zürichsee, mit der Fahrt über den Seedamm als Höhepunkt.",
          "Für alle Paare ist die Stundenbuchung die richtige Form: Fahrzeug und Chauffeur stehen für die gewünschte Dauer zur Verfügung, Sie steigen aus, wo Sie wollen, und ein, wenn Sie weiter möchten. Das Gepäck bleibt im Kofferraum, die Rückkehrzeit ist fix, und niemand sucht einen Parkplatz.",
          "Wer mehr Zeit hat, hebt die Neunzig-Minuten-Grenze auf: Bern, Basel, Interlaken und das Berner Oberland liegen in zwei bis zweieinhalb Stunden. Was ein voller Tag in der Stadt Zürich selbst hergibt, steht in [24 Stunden in Zürich](/blog/24-stunden-in-zuerich).",
        ], ul: [
          "**Wasser + Kultur:** Rheinfall → Winterthur",
          "**Zwei Seen:** Zug → Luzern",
          "**Stille + Rosen:** Einsiedeln → Rapperswil",
        ]},
        { h: "Was Sie mitnehmen sollten", p: [
          "Für alle fünf Ziele genügt Alltagskleidung; für den Rheinfall im Frühsommer ist eine leichte Jacke gegen den Sprühnebel sinnvoll, für Einsiedeln im Winter warme Schuhe. Bargeld brauchen Sie kaum – Karten und TWINT funktionieren überall, auch am Bootssteg und im Klosterladen.",
          "Wer mit Kindern reist, findet an allen fünf Orten kinderfreundliche Wege: der Rheinfall ohne Aufstieg, Luzern mit Verkehrshaus, Zug mit Seebad, Winterthur mit Technorama, Einsiedeln mit dem Sihlsee. Kindersitze stellen wir kostenlos bereit; geben Sie Alter und Anzahl bei der Buchung an.",
          "Und ein Hinweis für Reisende mit wenig Zeit: Die Fahrzeit ist Teil des Ausflugs. Der Blick über den Zugersee auf die Rigi, die Fahrt über den Etzel nach Einsiedeln, der erste Blick auf den Rheinfall aus dem Fahrzeug – das sind Momente, die im Zug an einem Fenster vorbeiziehen und im Auto bleiben.",
        ]},
        { h: "Wann der Zug wirklich reicht", p: [
          "Ehrlich gesagt: Für Winterthur und Zug ist die Bahn für Einzelreisende ohne Gepäck die vernünftige Wahl – schnell, direkt, günstig. Für Luzern ist sie gut, wenn Sie am Bahnhof wohnen. Für den Rheinfall und Einsiedeln ist sie möglich, aber mit Umsteigen, und die Zeitersparnis des Fahrers ist deutlich.",
          "Der Fahrer gewinnt, sobald Gepäck, Kinder, Gruppen oder zwei Ziele an einem Tag ins Spiel kommen. Er gewinnt auch bei Zwischenlandungen, weil die Rückkehrzeit fix ist und niemand auf einen Anschluss wartet. Und er gewinnt, wenn die Fahrt selbst Teil des Erlebnisses sein soll.",
          "Den vollständigen Vergleich für alle Situationen liefert [Taxi oder Zug ab Flughafen Zürich?](/blog/taxi-oder-zug-flughafen-zuerich). Für die Entscheidung im Einzelfall schreiben Sie uns Personen, Gepäck und Ziel – wir antworten ehrlich, auch wenn die Antwort «nehmen Sie den Zug» lautet.",
        ]},
        { h: "So buchen Sie den Ausflug", p: [
          "Für ein einzelnes Ziel wählen Sie die feste Strecke – Schaffhausen, Luzern, Zug oder Winterthur – und buchen Hin- und Rückfahrt nacheinander. Für Einsiedeln oder zwei Ziele an einem Tag nutzen Sie die Stundenbuchung mit der gewünschten Dauer oder geben die Adresse ins Formular ein; wir bestätigen den Preis vor der Buchung.",
          "Tragen Sie die Flugnummer ein, damit der Fahrer bei Verspätung trotzdem zur richtigen Zeit in der Halle steht. Geben Sie Kinder mit Alter an, melden Sie Sperriges an, und speichern Sie unsere WhatsApp-Nummer für unterwegs. Mehr braucht es nicht.",
          "Der Rest ist Aussicht. [Jetzt buchen](/buchung) – und in weniger als neunzig Minuten ist die Schweiz nicht mehr das Land hinter der Flughafenscheibe, sondern das Land vor Ihnen.",
        ]},
      ],
    },
    en: {
      title: "5 Places Under 90 Minutes from Zurich Airport",
      excerpt: "Rhine Falls, Lucerne, Zug, Winterthur, Einsiedeln: five destinations you reach in less than an hour and a half from the arrivals hall – with what is worth doing there in half a day, the best combinations and honest notes on when the train is enough.",
      body: [
        { p: [
          "Ninety minutes is a magic boundary. Closer than that, and a destination can still be visited on arrival day, reached during a long layover or planned as a day trip without an early start. Zurich Airport is so central that five very different places lie within this radius: a waterfall, a lakeside city, a small town on the water, a city of culture and a monastery in the pre-Alps.",
          "We chose the five from our experience – from what guests actually book and return from enthusiastic. For each place you find the driving time from the arrivals hall, what is worth doing in half a day, how the visit combines with a second destination and when the train is the more sensible choice. Driving times are our planning values in normal traffic; details are on the [route pages](/strecken).",
          "All five work particularly well with a private driver, because the luggage stays in the boot and the return time is fixed. For an excursion with waiting time, our hourly booking is the right format. If you only want to see one place, book the simple route; if you want to combine two, read to the end.",
        ]},
        { h: "1. Rhine Falls near Schaffhausen – around 1 hour", p: [
          "Europe's largest waterfall lies closer to the airport than most travellers expect: north via the A4 it is around 59 minutes to Neuhausen am Rheinfall. From the south side at Laufen Castle, platforms lead right up to the roaring water; from the north side the boats depart to the rock platform in the middle of the falls. If you want both, allow two to three hours.",
          "The Rhine Falls are accessible all year and most impressive in early summer after the snowmelt. For families they are ideal: no climb, short walks, restaurants by the water. For a layover of six hours or more they are feasible – one hour there, two on site, one back, plus boarding reserve.",
          "Combination: Schaffhausen's old town with the Munot is a few minutes away, Stein am Rhein half an hour further. Our fixed route to [Schaffhausen](/zurich-airport-to-schaffhausen) passes right by the falls. The detailed plan is in [Rhine Falls from Zurich Airport](/blog/rheinfall-ab-flughafen-zuerich-halbtagesausflug). Train instead of transfer? Possible with changes; with luggage and children the driver is the more relaxed choice.",
        ]},
        { h: "2. Lucerne – around 75 minutes", p: [
          "Lucerne is the classic, and rightly so: Chapel Bridge, lake basin, old town with painted façades, Lion Monument and the Musegg Wall with the best view over city and lake. Via the A4 and A14 we plan around 76 minutes from the arrivals hall to the city centre. The drive over the Hirzel and along Lake Zug is already part of the experience.",
          "Half a day is enough for the old town and a walk on the Nationalquai; a full day allows Pilatus or Rigi as well. Anyone staying overnight in Lucerne has Central Switzerland on the doorstep – Weggis, Vitznau, Bürgenstock, Engelberg. For hotels outside the city we confirm the price before booking.",
          "Combination: Lucerne combines with Zug (destination 3), which lies halfway, or with Engelberg for Titlis in summer. Our route [Zurich Airport–Lucerne](/zurich-airport-to-luzern) is the most-booked of all; the day plan with Pilatus and Rigi is in [Lucerne day trip](/blog/luzern-tagesausflug-ab-zuerich). Train instead of transfer? For solo travellers with hand luggage staying at the station, yes.",
        ]},
        { h: "3. Zug – around 55 minutes", p: [
          "Zug is the underrated gem: an intact old town on Lake Zug, the Zytturm with a view of the Rigi, a lakeside promenade where the sun sets behind Pilatus in the evening. Via the A4 it is around 55 minutes from the airport. The town is small enough to explore on foot in two hours and quiet enough to enjoy.",
          "Zug is also a business hub with many international companies – for business travellers who want a glimpse of Switzerland between two meetings, an ideal place. The harbour, the cherry cake and the lake baths in summer are the three things guests mention most often.",
          "Combination: Zug lies on the way to Lucerne; anyone who wants both stops in Zug and continues. Our route [Zurich Airport–Zug](/zurich-airport-to-zug) is one of the shortest with a fixed price. Train instead of transfer? Rail runs direct and fast – for solo travellers without luggage certainly an option; with suitcases and children not.",
        ]},
        { h: "4. Winterthur – around 36 minutes", p: [
          "Winterthur is the closest destination on the list and the most surprising: Switzerland's sixth-largest city is a secret cultural capital. The Kunst Museum with the Oskar Reinhart collection, the Fotomuseum in the old industrial quarter, the country's largest pedestrian old town and the Technorama – a science centre for which families alone need a day.",
          "Around 36 minutes via the A1, and you are in a city no tourist has on the plan and which is relaxed for exactly that reason. For a short layover Winterthur is the most realistic destination: there and back in a good hour, two hours of old town or museum in between.",
          "Combination: Winterthur lies on the way to St. Gallen and Schaffhausen. Anyone visiting the Rhine Falls can eat in Winterthur on the way back. Our route [Zurich Airport–Winterthur](/zurich-airport-to-winterthur) is the shortest with a fixed price. Train instead of transfer? The S-Bahn runs in minutes – for solo travellers without luggage the better choice, honestly.",
        ]},
        { h: "5. Einsiedeln – around 60 minutes", p: [
          "Einsiedeln Abbey is Switzerland's most important pilgrimage site and one of Europe's most beautiful baroque ensembles. The abbey church with the Black Madonna, the vast square, the library and the school – all in a pre-Alpine valley that is a cross-country ski area in winter and a hiking region in summer. From the airport it is around 60 minutes via the A3 and the Etzel.",
          "Einsiedeln is the quietest place on this list. Anyone seeking some stillness after a long-haul flight finds it in the church and on the square; anyone seeking culture, in the frescoes and the library. Lake Sihl lies just behind the village. Half a day is enough; a full day with a hike is nicer.",
          "Combination: Einsiedeln lies on the way to Schwyz and Lake Lucerne; the return via Rapperswil and Lake Zurich is the scenic crowning glory. There is no fixed route for Einsiedeln – enter the address in the form, we confirm the price before booking. Train instead of transfer? Possible with changes; the driver saves you an hour of detours.",
        ]},
        { h: "The five at a glance", p: [
          "The table shows planning values in normal traffic and the half-day duration we recommend. It is meant to help with the choice, not replace it: if you like water, go to the Rhine Falls; if you want a city, Lucerne; if you seek quiet, Einsiedeln.",
          "All driving times are from the arrivals hall to the centre. At rush hours around Zurich – weekday mornings and late afternoons – add 15 to 30 minutes. How to calculate the return to the airport safely is in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
          "For layover travellers: subtract from your stay the time to the arrivals hall and the boarding reserve; what remains is your window. The calculation is in [Layover in Zurich](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ], table: {
          head: ["Destination", "Driving time from hall", "Half a day covers", "Train as alternative"],
          rows: [
            ["Rhine Falls", "around 1 h", "Both sides, boat, Schaffhausen", "With changes"],
            ["Lucerne", "around 1 h 15", "Old town, lake, Musegg Wall", "Yes, for solo travellers"],
            ["Zug", "around 55 min", "Old town, Zytturm, promenade", "Yes, direct"],
            ["Winterthur", "around 36 min", "Old town or one museum", "Yes, S-Bahn"],
            ["Einsiedeln", "around 1 h", "Abbey, square, Lake Sihl", "With changes"],
          ],
        }},
        { h: "Two destinations in one day: proven pairs", p: [
          "Rhine Falls and Winterthur complement each other perfectly: water in the morning, old town at noon, museum in the afternoon, back in the evening. Zug and Lucerne lie on one line – a stop in Zug, on to Lucerne, return in the evening. Einsiedeln and Rapperswil connect abbey and rose town on Lake Zurich, with the drive across the causeway as the highlight.",
          "For all pairs the hourly booking is the right format: vehicle and chauffeur are available for the desired duration, you get out where you like and in when you want to move on. The luggage stays in the boot, the return time is fixed, and nobody looks for parking.",
          "Anyone with more time lifts the ninety-minute boundary: Bern, Basel, Interlaken and the Bernese Oberland are two to two and a half hours away. What a full day in the city of Zurich itself offers is in [24 hours in Zurich](/blog/24-stunden-in-zuerich).",
        ], ul: [
          "**Water + culture:** Rhine Falls → Winterthur",
          "**Two lakes:** Zug → Lucerne",
          "**Stillness + roses:** Einsiedeln → Rapperswil",
        ]},
        { h: "What to bring", p: [
          "Everyday clothing is enough for all five; for the Rhine Falls in early summer a light jacket against the spray makes sense, for Einsiedeln in winter warm shoes. You hardly need cash – cards and TWINT work everywhere, including at the boat pier and in the abbey shop.",
          "Anyone travelling with children finds child-friendly paths at all five places: the Rhine Falls without a climb, Lucerne with the Transport Museum, Zug with the lake baths, Winterthur with the Technorama, Einsiedeln with Lake Sihl. We provide child seats free of charge; state age and number when booking.",
          "And a note for travellers with little time: the drive is part of the excursion. The view across Lake Zug to the Rigi, the drive over the Etzel to Einsiedeln, the first glimpse of the Rhine Falls from the car – these are moments that pass by a window on the train and stay with you in the car.",
        ]},
        { h: "When the train is genuinely enough", p: [
          "Honestly: for Winterthur and Zug, rail is the sensible choice for solo travellers without luggage – fast, direct, inexpensive. For Lucerne it is good if you stay at the station. For the Rhine Falls and Einsiedeln it is possible but with changes, and the driver's time saving is considerable.",
          "The driver wins as soon as luggage, children, groups or two destinations in one day come into play. He also wins on layovers, because the return time is fixed and nobody waits for a connection. And he wins when the drive itself is meant to be part of the experience.",
          "The full comparison for all situations is in [Taxi or train from Zurich Airport?](/blog/taxi-oder-zug-flughafen-zuerich). For the individual decision, send us people, luggage and destination – we answer honestly, even if the answer is \"take the train\".",
        ]},
        { h: "How to book the excursion", p: [
          "For a single destination choose the fixed route – Schaffhausen, Lucerne, Zug or Winterthur – and book outbound and return one after the other. For Einsiedeln or two destinations in one day, use the hourly booking with the desired duration or enter the address in the form; we confirm the price before booking.",
          "Enter the flight number so the driver is in the hall at the right time even if there is a delay. State children with their ages, mention anything bulky, and save our WhatsApp number for the road. That is all it takes.",
          "The rest is scenery. [Book now](/buchung) – and in less than ninety minutes Switzerland is no longer the country behind the airport window, but the country in front of you.",
        ]},
      ],
    },
  },

  // ── 5. Firmenkunden ──────────────────────────────────────
  {
    slug: "firmentransfers-zuerich-rechnung-mwst-spesen",
    date: "2026-09-22",
    img: "/gallery/18.jpg",
    de: {
      title: "Firmentransfers in Zürich: Rechnung, MwSt. und Spesen",
      excerpt: "Wie Unternehmen Flughafentransfers so buchen, dass Buchhaltung, Reisende und Assistenz zufrieden sind: Sammelrechnung mit ausgewiesener Mehrwertsteuer, Kostenstellen, Gäste-Abholung mit Firmennamen, Stornierungsregeln und ein Prozess, der ohne Rückfragen läuft.",
      body: [
        { p: [
          "Geschäftsreisen scheitern selten an der Fahrt selbst, sondern an dem, was danach kommt: dem Beleg, der nicht ins System passt, der Mehrwertsteuer, die fehlt, der Kostenstelle, die niemand zugeordnet hat. Ein Taxameter-Zettel mit handschriftlichem Betrag ist für viele Buchhaltungen ein Problem; ein App-Beleg ohne Schweizer MwSt. auch. Dieser Beitrag beschreibt, wie Firmentransfers ab Flughafen Zürich so laufen, dass alle Beteiligten ihre Ruhe haben.",
          "Wir fahren für Unternehmen aus Zürich, Zug, Basel und dem Ausland – von der Assistenz, die dreissig Gäste für eine Konferenz koordiniert, bis zum Einzelunternehmer, der zweimal im Monat nach [Zug](/zurich-airport-to-zug) fliegt. Die Anforderungen ähneln sich: verlässliche Abholung, korrekte Rechnung, klare Regeln bei Änderungen, ein Ansprechpartner.",
          "Der Beitrag ist in zehn Kapitel gegliedert: Rechnung und MwSt., Sammelrechnung und Kostenstellen, Gästeabholung, Buchung durch Dritte, Stornierung und Änderung, Fahrzeugklassen für Repräsentation, Veranstaltungen, Datenschutz, Prozessvorschlag und Kontakt. Wer nur den Prozess sucht: Kapitel 9.",
        ]},
        { h: "1. Die Rechnung: automatisch, mit ausgewiesener Mehrwertsteuer", p: [
          "Jede Fahrt bei uns erzeugt eine Rechnung, die Sie per E-Mail erhalten – mit Buchungsreferenz, Datum, Strecke, Fahrzeugklasse, Betrag netto, Mehrwertsteuer und Betrag brutto. Die Schweizer MwSt. ist ausgewiesen, sodass vorsteuerabzugsberechtigte Unternehmen sie geltend machen können. Es gibt keinen handschriftlichen Beleg und keine Quittung zum Fotografieren.",
          "Die Rechnung wird aus dem System erzeugt, nicht vom Fahrer. Das heisst: Sie ist einheitlich, nummeriert, und sie stimmt mit dem Festpreis überein, den Sie vor der Fahrt gesehen haben. Wer online bezahlt hat, findet die Zahlungsreferenz auf der Rechnung; wer auf Rechnung fährt, findet die Zahlungsfrist.",
          "Für Reisende, die selbst abrechnen, heisst das: Rechnung weiterleiten, fertig. Für Assistenzen, die für andere buchen, heisst es: Die Rechnung geht an die E-Mail-Adresse, die bei der Buchung angegeben wurde – also an die Assistenz, nicht an den Gast, wenn Sie es so eintragen. Wie sich der Festpreis zusammensetzt, erklärt [Festpreis statt Taxameter](/blog/festpreis-transfers-erklaert).",
        ]},
        { h: "2. Sammelrechnung und Kostenstellen", p: [
          "Unternehmen mit regelmässigen Fahrten erhalten auf Wunsch eine Sammelrechnung – monatlich oder pro Projekt – statt einer Einzelrechnung pro Fahrt. Die Sammelrechnung listet jede Fahrt mit Datum, Reisendem, Strecke und Betrag auf und weist die MwSt. gesamthaft aus. Für die Buchhaltung bedeutet das eine Buchung statt zwanzig.",
          "Kostenstellen, Projektnummern oder Reisende-Kürzel tragen Sie bei der Buchung ins Notizfeld ein; sie erscheinen auf der Rechnung. Wer einen festen Standard hat – etwa «KST 4711 / Projekt Alpha» – teilt ihn uns einmal mit, und wir übernehmen ihn für alle Fahrten des Kontos.",
          "Zahlungsbedingungen für Firmenkunden vereinbaren wir individuell: Online-Zahlung per Karte bei der Buchung ist Standard, Rechnung mit Zahlungsfrist ist nach Absprache möglich. Für die Einrichtung genügt eine E-Mail mit Firmenname, Rechnungsadresse, MwSt.-Nummer und dem gewünschten Rhythmus.",
        ], ul: [
          "Monatliche oder projektbezogene Sammelrechnung",
          "Kostenstelle / Projekt im Notizfeld → erscheint auf der Rechnung",
          "Zahlung per Karte bei Buchung oder auf Rechnung nach Absprache",
        ]},
        { h: "3. Gäste abholen lassen: Firmenname auf dem Schild", p: [
          "Wenn Sie Kunden, Bewerber oder Partner am Flughafen abholen lassen, ist der erste Eindruck der Fahrer mit dem Schild. Auf Wunsch steht darauf Ihr Firmenname – oder Firmenname und Gastname –, sodass Ihr Gast Sie sofort erkennt. Das Feld dafür heisst im Buchungsformular «Namensschild».",
          "Der Gast muss nichts wissen ausser: «Ein Fahrer wartet mit unserem Namen in der Ankunftshalle.» Wir verfolgen den Flug, der Fahrer steht zur tatsächlichen Landezeit bereit, 60 Minuten Wartezeit sind inklusive, und der Gast wird bis zum Hotel oder zu Ihrem Standort gebracht. Sie erhalten auf Wunsch eine Nachricht, wenn der Gast eingestiegen ist.",
          "Für Gäste, die zum ersten Mal in der Schweiz sind, empfiehlt sich der Hinweis auf den Treffpunkt in der Bestätigung, die Sie ihnen weiterleiten. Die Details stehen in [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich). Die Rechnung geht an Sie, nicht an den Gast.",
        ]},
        { h: "4. Buchung durch Assistenz oder Travel Management", p: [
          "Die meisten Firmenbuchungen kommen nicht vom Reisenden, sondern von der Assistenz oder einem Travel-Manager. Das Formular ist darauf ausgelegt: Sie tragen Name und Telefonnummer des Reisenden ein, aber Ihre eigene E-Mail für Bestätigung und Rechnung. Der Reisende erhält, wenn gewünscht, eine separate Kopie.",
          "Für mehrere Fahrten – etwa Hin- und Rückfahrt oder mehrere Reisende am selben Tag – buchen Sie nacheinander; jede Fahrt hat ihre Referenz. Für grössere Mengen, etwa eine Konferenz mit zwanzig Ankünften, schicken Sie uns eine Liste mit Namen, Flügen und Hotels, und wir legen die Fahrten an und bestätigen sie gesammelt.",
          "Änderungen laufen über dieselbe Referenz: neue Flugnummer, andere Adresse, andere Zeit – eine E-Mail oder WhatsApp genügt. Bis 24 Stunden vor der Abholung sind Änderungen nach Verfügbarkeit kostenlos. Wie Vielflieger die Buchung in ihren Ablauf integrieren, steht in [Business Travel Zürich: 5 Gewohnheiten](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "5. Stornierung und Änderung: klare Regeln", p: [
          "Bis 24 Stunden vor der vereinbarten Abholzeit stornieren Sie kostenlos; eine geleistete Zahlung wird vollständig zurückerstattet. Bei Firmenkunden auf Rechnung entfällt die Position schlicht. Innerhalb der 24 Stunden ist der Fahrer in der Regel bereits eingeteilt; hier behalten wir uns den vollen Fahrpreis vor, finden aber bei Flugannullierungen und ähnlichen Fällen eine faire Lösung.",
          "Flugverspätungen sind keine Änderung: Wir verfolgen den Flug und passen die Abholung automatisch an, ohne Zusatzkosten. Bei Umleitungen auf einen anderen Flughafen sprechen wir uns ab. Bei Nichterscheinen ohne Mitteilung ist der Fahrpreis geschuldet – deshalb ist die Telefonnummer des Reisenden wichtig, nicht nur die der Assistenz.",
          "Alle Regeln stehen in unserer Rückerstattungsrichtlinie, verlinkt in der Fusszeile. Sie sind bewusst einfach gehalten, damit niemand im Reisebüro nachschlagen muss. Was bei Verspätung, Umleitung und Annullierung konkret passiert, beschreibt [Flug verspätet oder annulliert?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h: "6. Welche Fahrzeugklasse für welchen Anlass", p: [
          "Für den einzelnen Reisenden mit Koffer und Laptop ist die Business Class – Mercedes-Benz E-Klasse – der Standard: ruhig, mit Ladeanschluss, ausreichend Platz zum Arbeiten. Für Delegationen bis sieben Personen oder für Gäste mit viel Gepäck ist die Business & Family Class (V-Klasse) die richtige Wahl; alle fahren gemeinsam, das Gespräch geht weiter.",
          "Für Repräsentationsfahrten – Verwaltungsrat, wichtige Kunden, Gäste, bei denen der erste Eindruck zählt – bieten wir die Premium Class, eine Mercedes-Benz S-Klasse. Der Unterschied ist spürbar, und er ist im Buchungsprozess transparent ausgewiesen. Alle Klassen mit Kapazitäten stehen auf der [Fahrzeugseite](/fahrzeuge).",
          "Für mehrere Fahrzeuge gleichzeitig – etwa zwei S-Klassen und eine V-Klasse für eine Delegation – koordinieren wir die Abholung so, dass alle Wagen zur selben Zeit in der Halle bereitstehen. Schreiben Sie uns Personen, Flüge und Ziel; Sie erhalten einen Vorschlag.",
        ]},
        { h: "7. Veranstaltungen, Messen, Kongresse", p: [
          "Für Konferenzen in Zürich, Messen in Basel oder das WEF in Davos übernehmen wir die gesamte Ankunftslogistik: eine Liste mit Namen, Flügen und Hotels, und wir legen die Fahrten an, verfolgen jeden Flug, stellen Fahrer und Fahrzeuge bereit und melden Ihnen, wer angekommen ist. Sie haben einen Ansprechpartner, nicht zwanzig Fahrer.",
          "Für Messewochen empfehlen wir die Buchung, sobald die Daten feststehen – Kapazitäten sind dann knapp, und wer früh bucht, hat Auswahl bei Fahrzeugklasse und Zeiten. Für das WEF gelten Sonderregeln mit Sperrzonen und Zufahrten; Details in [WEF Davos Transfer-Guide](/blog/wef-davos-transfer-guide). Für Basel während der Kunst- und Uhrenmessen in [Flughafen Zürich–Basel](/blog/flughafen-zuerich-basel-transfer-preis-dauer-vergleich).",
          "Die Abrechnung erfolgt als Sammelrechnung pro Veranstaltung mit allen Fahrten, Namen und Beträgen. Für Sponsoren oder Gäste, die selbst zahlen, legen wir einzelne Rechnungen an. Und für Rückfahrten am letzten Tag, wenn alle gleichzeitig zum Flughafen wollen, planen wir gestaffelt.",
        ]},
        { h: "8. Datenschutz: was wir mit Reisendendaten tun", p: [
          "Für eine Fahrt brauchen wir Name, Telefonnummer, Flugnummer, Adressen und Zeit. Diese Daten werden an den eingeteilten Chauffeur weitergegeben und in unserem System sowie im Dispositionskalender gespeichert. Wir verkaufen keine Daten, und wir nutzen sie nicht für Marketing an Ihre Reisenden.",
          "Rechnungsdaten bewahren wir gemäss den gesetzlichen Fristen auf. Auf Anfrage geben wir Auskunft, berichtigen oder löschen Daten, soweit keine Aufbewahrungspflicht besteht. Für Unternehmen, die eine Auftragsbearbeitungsvereinbarung benötigen, stellen wir diese bereit.",
          "Die vollständige Datenschutzerklärung ist in der Fusszeile verlinkt. Sie beschreibt auch die eingesetzten Dienstleister – Zahlungsabwicklung, Hosting, Kalender – und die Rechtsgrundlagen nach Schweizer Datenschutzgesetz und, soweit anwendbar, DSGVO.",
        ]},
        { h: "9. Ein Prozess, der ohne Rückfragen läuft", p: [
          "Die folgende Tabelle beschreibt den Ablauf, wie er sich bei unseren Firmenkunden bewährt hat: einmal einrichten, dann läuft er. Der Schlüssel ist, dass jede Fahrt dieselben fünf Angaben hat und die Rechnung immer an dieselbe Adresse geht.",
          "Wer diesen Prozess einmal aufgesetzt hat, muss pro Fahrt nur noch Flugnummer, Ziel und Zeit eintragen. Alles andere – Firmenname auf dem Schild, Kostenstelle, Rechnungsadresse, Sammelrechnung – ist hinterlegt. Änderungen laufen über die Referenz, Stornierungen nach den Regeln aus Kapitel 5.",
          "Und wenn etwas nicht passt: Sie haben eine Telefonnummer und eine E-Mail-Adresse, hinter denen jemand sitzt, der die Fahrt kennt. Das ist am Ende der Unterschied zwischen einer App und einem Dienstleister.",
        ], table: {
          head: ["Schritt", "Einmalig", "Pro Fahrt"],
          rows: [
            ["Konto einrichten", "Firmenname, Rechnungsadresse, MwSt.-Nr., Rhythmus der Sammelrechnung", "—"],
            ["Standard festlegen", "Fahrzeugklasse, Namensschild-Text, Kostenstellen-Format", "—"],
            ["Buchen", "—", "Reisender, Flugnummer, Ziel, Zeit, Kostenstelle"],
            ["Bestätigung", "—", "Automatisch an die Assistenz, Kopie an den Reisenden"],
            ["Abholung", "—", "Flugverfolgung, Fahrer mit Schild, Meldung bei Einstieg"],
            ["Rechnung", "Sammelrechnung monatlich", "Oder Einzelrechnung sofort"],
          ],
        }},
        { h: "10. So starten Sie", p: [
          "Für die erste Fahrt brauchen Sie kein Konto: Buchen Sie online, tragen Sie Firmenname ins Notizfeld ein, und Sie erhalten eine Rechnung mit MwSt. Wenn es gut lief – und das ist der Test, den wir bestehen wollen –, schreiben Sie uns für die Einrichtung eines Firmenkontos mit Sammelrechnung.",
          "Für Assistenzen und Travel-Manager, die mehrere Reisende betreuen, bieten wir ein kurzes Gespräch an: fünfzehn Minuten, in denen wir Ihren Ablauf verstehen und den unseren anpassen. Danach läuft es per E-Mail und WhatsApp, ohne Formalitäten.",
          "Die Strecken, die Firmenkunden am häufigsten buchen: [Zug](/zurich-airport-to-zug), [Basel](/zurich-airport-to-basel), [Bern](/zurich-airport-to-bern), [Luzern](/zurich-airport-to-luzern) und Zürich Stadt. Alle Festpreise stehen auf der [Preisseite](/preise). [Erste Fahrt buchen](/buchung).",
        ]},
      ],
    },
    en: {
      title: "Corporate Transfers in Zurich: Invoices and VAT",
      excerpt: "How companies book airport transfers so that accounting, travellers and assistants are all happy: consolidated invoices with VAT shown, cost centres, guest pickups with the company name, cancellation rules and a process that runs without queries.",
      body: [
        { p: [
          "Business trips rarely fail because of the ride itself, but because of what comes afterwards: the receipt that does not fit the system, the VAT that is missing, the cost centre nobody assigned. A meter slip with a handwritten amount is a problem for many accounting departments; an app receipt without Swiss VAT too. This article describes how corporate transfers from Zurich Airport run so that everyone involved has peace of mind.",
          "We drive for companies from Zurich, Zug, Basel and abroad – from the assistant coordinating thirty guests for a conference to the sole trader flying to [Zug](/zurich-airport-to-zug) twice a month. The requirements are similar: reliable pickup, correct invoice, clear rules on changes, one point of contact.",
          "The article is divided into ten chapters: invoice and VAT, consolidated invoices and cost centres, guest pickups, booking by third parties, cancellation and changes, vehicle classes for representation, events, data protection, a process proposal and contact. If you only want the process: chapter 9.",
        ]},
        { h: "1. The invoice: automatic, with VAT shown", p: [
          "Every journey with us generates an invoice you receive by email – with booking reference, date, route, vehicle class, net amount, VAT and gross amount. Swiss VAT is shown, so companies entitled to input tax deduction can claim it. There is no handwritten slip and no receipt to photograph.",
          "The invoice is generated by the system, not by the driver. That means it is uniform, numbered, and matches the fixed price you saw before the journey. Anyone who paid online finds the payment reference on the invoice; anyone travelling on account finds the payment term.",
          "For travellers who submit their own expenses this means: forward the invoice, done. For assistants booking for others it means: the invoice goes to the email address entered at booking – the assistant's, not the guest's, if you enter it that way. How the fixed price is made up is explained in [Fixed price instead of meter](/blog/festpreis-transfers-erklaert).",
        ]},
        { h: "2. Consolidated invoices and cost centres", p: [
          "Companies with regular journeys receive, on request, a consolidated invoice – monthly or per project – instead of one invoice per ride. The consolidated invoice lists every journey with date, traveller, route and amount and shows VAT in total. For accounting that means one entry instead of twenty.",
          "Cost centres, project numbers or traveller codes go into the remarks field when booking; they appear on the invoice. Anyone with a fixed standard – say \"CC 4711 / Project Alpha\" – tells us once, and we apply it to all journeys on the account.",
          "Payment terms for corporate clients are agreed individually: online card payment at booking is standard, invoice with payment term is possible by arrangement. To set up, an email with company name, billing address, VAT number and the desired rhythm is enough.",
        ], ul: [
          "Monthly or project-based consolidated invoice",
          "Cost centre / project in the remarks field → appears on the invoice",
          "Payment by card at booking or on account by arrangement",
        ]},
        { h: "3. Having guests collected: company name on the sign", p: [
          "When you have customers, candidates or partners collected at the airport, the first impression is the driver with the sign. On request it shows your company name – or company and guest name – so your guest recognises you immediately. The field for this in the booking form is called \"Name sign\".",
          "The guest needs to know nothing except: \"A driver is waiting with our name in the arrivals hall.\" We track the flight, the driver is ready at the actual landing time, 60 minutes of waiting are included, and the guest is taken to the hotel or your site. On request you receive a message when the guest has boarded.",
          "For guests visiting Switzerland for the first time, a note on the meeting point in the confirmation you forward is advisable. Details are in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich). The invoice goes to you, not to the guest.",
        ]},
        { h: "4. Booking by assistants or travel management", p: [
          "Most corporate bookings come not from the traveller but from an assistant or travel manager. The form is designed for this: you enter the traveller's name and phone number, but your own email for confirmation and invoice. The traveller receives a separate copy if desired.",
          "For several journeys – outbound and return, or several travellers on the same day – book one after the other; each journey has its reference. For larger volumes, such as a conference with twenty arrivals, send us a list with names, flights and hotels, and we create the journeys and confirm them together.",
          "Changes run via the same reference: new flight number, different address, different time – an email or WhatsApp is enough. Up to 24 hours before pickup, changes are free subject to availability. How frequent flyers integrate booking into their routine is in [Business travel Zurich: 5 habits](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "5. Cancellation and changes: clear rules", p: [
          "Up to 24 hours before the agreed pickup time you cancel free of charge; any payment made is refunded in full. For corporate clients on account the line simply drops out. Within 24 hours the driver is usually already assigned; here we reserve the right to charge the full fare, but find a fair solution for flight cancellations and similar cases.",
          "Flight delays are not a change: we track the flight and adjust the pickup automatically at no extra cost. For diversions to another airport we coordinate. For no-shows without notice the fare is due – which is why the traveller's phone number matters, not only the assistant's.",
          "All rules are in our refund policy, linked in the footer. They are deliberately kept simple so nobody in the travel office has to look anything up. What happens in practice on delay, diversion and cancellation is described in [Flight delayed or cancelled?](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h: "6. Which vehicle class for which occasion", p: [
          "For the individual traveller with suitcase and laptop, the Business Class – Mercedes-Benz E-Class – is the standard: quiet, with charging port, enough space to work. For delegations of up to seven or guests with plenty of luggage, the Business & Family Class (V-Class) is the right choice; everyone travels together, the conversation continues.",
          "For representative journeys – board members, key clients, guests where the first impression counts – we offer the Premium Class, a Mercedes-Benz S-Class. The difference is tangible, and it is shown transparently in the booking process. All classes with capacities are on the [vehicles page](/fahrzeuge).",
          "For several vehicles at once – say two S-Classes and a V-Class for a delegation – we coordinate the pickup so all cars are ready in the hall at the same time. Send us people, flights and destination; you receive a proposal.",
        ]},
        { h: "7. Events, trade fairs, congresses", p: [
          "For conferences in Zurich, fairs in Basel or the WEF in Davos we take over the entire arrival logistics: a list with names, flights and hotels, and we create the journeys, track every flight, provide drivers and vehicles and report to you who has arrived. You have one contact, not twenty drivers.",
          "For fair weeks we recommend booking as soon as the dates are fixed – capacity is scarce then, and early bookers have a choice of vehicle class and times. Special rules with closure zones and access apply for the WEF; details in [WEF Davos transfer guide](/blog/wef-davos-transfer-guide). For Basel during the art and watch fairs, see [Zurich Airport–Basel](/blog/flughafen-zuerich-basel-transfer-preis-dauer-vergleich).",
          "Billing is by consolidated invoice per event with all journeys, names and amounts. For sponsors or guests paying themselves we create individual invoices. And for returns on the last day, when everyone wants to go to the airport at once, we plan staggered.",
        ]},
        { h: "8. Data protection: what we do with traveller data", p: [
          "For a journey we need name, phone number, flight number, addresses and time. This data is passed to the assigned chauffeur and stored in our system and dispatch calendar. We do not sell data, and we do not use it for marketing to your travellers.",
          "We retain invoice data in accordance with statutory periods. On request we provide information, correct or delete data where no retention obligation exists. For companies that need a data processing agreement, we provide one.",
          "The full privacy policy is linked in the footer. It also describes the service providers used – payment processing, hosting, calendar – and the legal bases under the Swiss Data Protection Act and, where applicable, GDPR.",
        ]},
        { h: "9. A process that runs without queries", p: [
          "The following table describes the procedure as it has proven itself with our corporate clients: set up once, then it runs. The key is that every journey has the same five details and the invoice always goes to the same address.",
          "Anyone who has set up this process once only needs to enter flight number, destination and time per journey. Everything else – company name on the sign, cost centre, billing address, consolidated invoice – is on file. Changes run via the reference, cancellations by the rules in chapter 5.",
          "And if something is not right: you have a phone number and an email address with someone behind them who knows the journey. That, in the end, is the difference between an app and a service provider.",
        ], table: {
          head: ["Step", "Once", "Per journey"],
          rows: [
            ["Set up account", "Company name, billing address, VAT no., consolidated-invoice rhythm", "—"],
            ["Define standard", "Vehicle class, name-sign text, cost-centre format", "—"],
            ["Book", "—", "Traveller, flight number, destination, time, cost centre"],
            ["Confirmation", "—", "Automatically to the assistant, copy to the traveller"],
            ["Pickup", "—", "Flight tracking, driver with sign, boarding notice"],
            ["Invoice", "Consolidated monthly", "Or individual invoice immediately"],
          ],
        }},
        { h: "10. How to start", p: [
          "For the first journey you need no account: book online, enter the company name in the remarks field, and you receive an invoice with VAT. If it went well – and that is the test we want to pass – write to us to set up a corporate account with consolidated invoicing.",
          "For assistants and travel managers looking after several travellers we offer a short call: fifteen minutes in which we understand your process and adapt ours. After that it runs by email and WhatsApp, without formalities.",
          "The routes corporate clients book most often: [Zug](/zurich-airport-to-zug), [Basel](/zurich-airport-to-basel), [Bern](/zurich-airport-to-bern), [Lucerne](/zurich-airport-to-luzern) and Zurich city. All fixed prices are on the [prices page](/preise). [Book the first journey](/buchung).",
        ]},
      ],
    },
  },

  // ── 6. Mit Haustier ──────────────────────────────────────
  {
    slug: "mit-hund-oder-katze-ab-flughafen-zuerich-transfer",
    date: "2026-09-23",
    img: "/gallery/8.jpg",
    de: {
      title: "Mit Hund oder Katze ab Flughafen Zürich",
      excerpt: "Einreise mit Haustier, Abholung am Tierterminal, Transportbox im Fahrzeug, Hundetransfers ohne Aufpreis: Alles, was Sie wissen müssen, wenn Ihr Vierbeiner in Zürich landet – von den Dokumenten bis zur Fahrt ins Hotel oder in die Berge.",
      body: [
        { p: [
          "Immer mehr Reisende bringen ihren Hund oder ihre Katze mit in die Schweiz – zum Skiurlaub, zum Wandern, für einen längeren Aufenthalt oder weil das Tier schlicht zur Familie gehört. Am Flughafen Zürich beginnt dann eine Reihe von Fragen, die sich mit ein wenig Vorbereitung alle beantworten lassen: Wo hole ich das Tier ab? Was braucht es für die Einreise? Und wie kommt es vom Flughafen ins Hotel?",
          "Wir fahren regelmässig Gäste mit Haustieren, und die Regeln sind einfacher als befürchtet. Dieser Beitrag beschreibt die Einreise, die Abholung, den Transport im Fahrzeug und die Weiterreise – mit dem, was wir in der Praxis erleben. Für die verbindlichen Einreisebestimmungen verweisen wir auf das Bundesamt für Lebensmittelsicherheit und Veterinärwesen (BLV); sie ändern sich gelegentlich.",
          "Die Kapitel folgen der Reise: Dokumente, Ankunft in der Kabine oder im Frachtraum, Tierterminal, Transfer, Fahrzeugwahl, Ziele, Hotels, Rückflug und eine Checkliste. Wer nur wissen will, ob wir Hunde mitnehmen: Ja, ohne Aufpreis, in einer Transportbox oder mit Sicherheitsgurt – Kapitel 5.",
        ]},
        { h: "1. Einreise: Chip, Impfung, Heimtierausweis", p: [
          "Für Hunde, Katzen und Frettchen aus der EU und den meisten europäischen Ländern gelten drei Grundvoraussetzungen: ein Mikrochip, eine gültige Tollwutimpfung, die mindestens 21 Tage vor der Einreise verabreicht wurde, und ein EU-Heimtierausweis, in dem beides eingetragen ist. Für Tiere aus Drittstaaten – etwa USA, Kanada, Golfstaaten, Asien – kommen je nach Land zusätzliche Anforderungen dazu, teils ein Tollwut-Antikörpertest und eine amtliche Gesundheitsbescheinigung.",
          "Welpen unter zwölf Wochen und bestimmte Hunderassen unterliegen Sonderregeln; einzelne Kantone kennen Rasselisten. Prüfen Sie die Bestimmungen für Ihre Herkunft und Ihr Tier vor der Buchung des Flugs auf der Website des BLV, nicht erst vor der Abreise. Was fehlt, lässt sich am Flughafen nicht nachholen.",
          "Bei der Einreise aus einem EU-Land ist die Kontrolle meist unkompliziert: Sie deklarieren das Tier beim Zoll, zeigen den Ausweis, fertig. Aus Drittstaaten müssen Tiere am Flughafen Zürich über den Tierterminal abgefertigt werden, wo die Papiere geprüft werden. Planen Sie dafür Zeit ein – und sagen Sie es uns, damit der Fahrer entsprechend wartet.",
        ], ul: [
          "Mikrochip (ISO-Norm)",
          "Tollwutimpfung, mindestens 21 Tage alt",
          "EU-Heimtierausweis oder amtliche Bescheinigung",
          "Aus Drittstaaten: ggf. Antikörpertest und Gesundheitszeugnis",
        ]},
        { h: "2. Kabine oder Frachtraum?", p: [
          "Kleine Hunde und Katzen bis zu einem Gewichtslimit der Airline reisen in einer weichen Tasche in der Kabine unter dem Vordersitz. Grössere Hunde reisen im klimatisierten Frachtraum in einer IATA-konformen Box. Die Airline entscheidet nach Gewicht, Boxgrösse und Flugzeugtyp; buchen Sie den Tierplatz früh, denn die Anzahl pro Flug ist begrenzt.",
          "Für die Ankunft in Zürich macht der Unterschied viel aus. Kabinentiere kommen mit Ihnen durch Passkontrolle und Gepäckausgabe und stehen mit Ihnen in der Ankunftshalle; der Transfer läuft wie jede andere Fahrt. Frachtraumtiere werden separat ausgeladen und entweder am Sperrgepäckschalter oder – aus Drittstaaten – am Tierterminal übergeben.",
          "Rechnen Sie bei Frachtraumtieren mit zusätzlicher Zeit nach der Landung: Entladen, Transport zum Ausgabepunkt, Papierprüfung. 60 Minuten Wartezeit sind bei uns inklusive; wenn es länger dauert, genügt eine kurze Nachricht an den Fahrer. Nach einem langen Flug ist das Tier meist unruhig – ein ruhiger Fahrer und ein ruhiges Fahrzeug helfen mehr als Eile.",
        ]},
        { h: "3. Der Tierterminal am Flughafen Zürich", p: [
          "Der Flughafen Zürich betreibt eine eigene Tierstation im Frachtbereich, wo Tiere aus Drittstaaten veterinäramtlich kontrolliert werden. Sie liegt nicht im Passagierterminal, sondern in einem separaten Gebäude, das mit dem Auto erreichbar ist. Genau hier ist der private Transfer ein echter Vorteil: Der Fahrer holt Sie in der Ankunftshalle ab, fährt mit Ihnen zum Tierterminal, wartet, und danach geht es weiter zum Ziel.",
          "Mit einem Taxi vom Stand ist das umständlicher: Sie müssen die Fahrt zum Frachtbereich erklären, der Fahrer wartet ungern, und das Taxameter läuft. Mit dem Zug ist es praktisch nicht machbar. Wer sein Tier am Tierterminal abholt, sollte den Transfer deshalb vorab buchen und im Notizfeld «Abholung am Tierterminal» vermerken.",
          "Die Öffnungszeiten der Tierstation und die genauen Abläufe für Ihre Herkunft finden Sie beim Flughafen Zürich und beim BLV. In der Praxis dauert die Kontrolle bei vollständigen Papieren wenige Minuten; bei fehlenden Dokumenten kann das Tier in Quarantäne genommen werden – ein weiterer Grund, die Papiere vor dem Flug zu prüfen.",
        ]},
        { h: "4. Wer holt ab: Fahrer, Sie, oder beide?", p: [
          "Der einfachste Ablauf: Sie landen, holen Ihr Kabinentier, und der Fahrer wartet mit Namensschild in der Halle wie bei jeder anderen Fahrt. Bei Frachtraumtieren aus der EU holen Sie das Tier am Ausgabepunkt und kommen dann in die Halle. Bei Tieren aus Drittstaaten fahren Sie mit dem Fahrer zum Tierterminal.",
          "Wir holen Tiere nicht ohne Sie ab – aus gutem Grund: Die Übergabe verlangt Ihre Papiere und Ihre Unterschrift, und das Tier soll nach einem langen Flug ein bekanntes Gesicht sehen, nicht einen fremden Fahrer. Was wir tun: warten, fahren, helfen, Box tragen, Wasser bereithalten.",
          "Geben Sie bei der Buchung Tierart, Grösse und Transportweg an. Ein Chihuahua in der Kabinentasche und ein Bernhardiner in der Frachtbox sind zwei sehr verschiedene Fahrten – die Fahrzeugwahl und die Vorbereitung hängen davon ab. Wie die Ankunft grundsätzlich abläuft, zeigt [Ankunft am Flughafen Zürich: Fahrer finden](/blog/ankunft-flughafen-zuerich-fahrer-finden).",
        ]},
        { h: "5. Im Fahrzeug: Box, Gurt, Decke – ohne Aufpreis", p: [
          "Wir nehmen Hunde und Katzen ohne Aufpreis mit. Die Regel ist dieselbe wie überall in der Schweiz: Das Tier muss so gesichert sein, dass es Fahrer und Insassen nicht gefährdet – in einer Transportbox, mit einem Sicherheitsgurt-Geschirr oder hinter einem Trenngitter im Laderaum. Ein Hund auf dem Schoss oder frei auf der Rückbank ist nicht erlaubt und wäre bei einer Bremsung gefährlich.",
          "Kleine Tiere reisen in ihrer Kabinentasche oder Box auf dem Boden vor der Rückbank. Mittlere Hunde mit Geschirr und Gurt auf der Rückbank, auf einer Decke, die wir bereithalten. Grosse Hunde in der Frachtbox im Laderaum der V-Klasse – dort passt eine IATA-Box der grössten Standardgrösse neben zwei Koffer. Bringen Sie das Gurt-Geschirr Ihres Hundes mit, wenn Sie eines haben; sonst haben wir eines dabei.",
          "Das Fahrzeug wird nach jeder Tierfahrt gereinigt; das ist im Preis enthalten. Bei nassem Fell nach einem Winterspaziergang oder bei Reisekrankheit hilft eine Decke, und der Fahrer hält gern für eine Pause an – sagen Sie es einfach. Auf längeren Strecken wie nach [Davos](/zurich-airport-to-davos) oder [St. Moritz](/zurich-airport-to-st-moritz) planen wir einen Halt mit Wiese ein, wenn Sie es wünschen.",
        ], table: {
          head: ["Tier", "Sicherung im Fahrzeug", "Empfohlene Klasse"],
          rows: [
            ["Katze, kleiner Hund in Kabinentasche", "Tasche/Box im Fussraum", "Business Class (E-Klasse)"],
            ["Mittlerer Hund", "Geschirr mit Gurt auf der Rückbank, Decke", "Business Class oder V-Klasse"],
            ["Grosser Hund in Frachtbox", "Box im Laderaum", "Business & Family Class (V-Klasse)"],
            ["Zwei oder mehr Tiere", "Boxen im Laderaum, Gurte auf der Rückbank", "V-Klasse"],
          ],
        }},
        { h: "6. Welche Fahrzeugklasse", p: [
          "Für ein Kabinentier und zwei Personen mit Gepäck reicht die Business Class (E-Klasse). Für einen grossen Hund in der Frachtbox oder für zwei Hunde ist die Business & Family Class (V-Klasse) die richtige Wahl: Der Laderaum nimmt die Box auf, die Koffer finden daneben Platz, und der Hund fährt in seiner gewohnten Box, was ihn beruhigt.",
          "Bei Familien mit Kindern und Hund kommt die V-Klasse ohnehin zum Einsatz – Kindersitze, Kinderwagen, Koffer und Hundebox brauchen Raum, und die gegenüberliegenden Sitze erlauben es, dass jemand beim Hund sitzt. Was in welche Klasse passt, mit Gepäck gerechnet, steht in [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "Geben Sie das Tier bei der Buchung im Notizfeld an: Art, Grösse, Box ja oder nein. Der Fahrer bereitet Decke, Gurt und Laderaum vor, und es gibt am Fahrzeug keine Überraschung. Alle Klassen auf der [Fahrzeugseite](/fahrzeuge).",
        ]},
        { h: "7. Ziele mit Hund: Berge, Seen, Städte", p: [
          "Die Schweiz ist ein hundefreundliches Reiseland. Wanderwege sind für Hunde offen, viele Bergbahnen nehmen sie mit – meist mit Leine, manchmal mit Maulkorb –, und die meisten Restaurants erlauben Hunde auf der Terrasse. In den Bergen gilt: Auf Alpweiden mit Kühen Leine anlegen, Herdenschutzhunde respektieren, im Sommer Wasser mitnehmen.",
          "Für Skiurlaube mit Hund sind [Davos](/zurich-airport-to-davos), [Engelberg](/zurich-airport-to-engelberg) und das Berner Oberland beliebt; für Wanderferien Appenzell und das Engadin; für Städtereisen mit Hund Luzern und Bern mit ihren Uferwegen. Autofreie Orte wie Zermatt und Wengen sind mit Hund gut machbar – der Transfer endet an der Talstation, und die Bahn nimmt Hunde mit.",
          "Ein praktischer Hinweis: In Zermatt (bis Täsch) und Wengen (bis Lauterbrunnen) fährt Ihr Hund den letzten Abschnitt mit dem Zug; ein Ticket für den Hund ist nötig. Wie diese Transfers ablaufen, steht in [Zermatt: Warum der Transfer in Täsch endet](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "8. Hotels und Unterkünfte", p: [
          "Viele Schweizer Hotels nehmen Hunde auf, oft gegen eine Gebühr pro Nacht; Katzen seltener. Fragen Sie bei der Hotelbuchung ausdrücklich nach und lassen Sie sich die Zusage schriftlich geben. Ferienwohnungen sind mit Tier meist die entspanntere Wahl – eigener Eingang, kein Frühstücksraum, Garten.",
          "Für die Anreise ins Hotel hilft ein Detail: Geben Sie uns die genaue Adresse und, wenn möglich, den Hoteleingang. Der Fahrer hält so nah wie erlaubt, trägt die Box, und Sie gehen mit dem Hund an der Leine hinein. Bei Hotels in Fussgängerzonen – etwa in Berner oder Luzerner Altstädten – ist der letzte Weg kurz, aber zu Fuss.",
          "Wenn Sie mehrere Unterkünfte an verschiedenen Orten haben, buchen Sie die Fahrten zwischen ihnen gleich mit. Für Adressen ausserhalb unserer festen Strecken bestätigen wir den Preis vor der Buchung; die Übersicht der Strecken finden Sie unter [Strecken](/strecken).",
        ]},
        { h: "9. Rückflug: Zeit für das Tier einplanen", p: [
          "Bei der Abreise ist die Reihenfolge umgekehrt: Kabinentiere gehen mit Ihnen durch Check-in und Sicherheitskontrolle, wo das Tier kurz aus der Tasche genommen wird. Frachtraumtiere geben Sie am Sperrgepäckschalter oder – bei Flügen in Drittstaaten – nach Vorgabe der Airline ab, oft deutlich vor dem normalen Check-in-Schluss.",
          "Planen Sie deshalb mehr Vorlauf als ohne Tier: eine Stunde zusätzlich für Frachtraumtiere ist realistisch, dazu der übliche Puffer für die Fahrt. Wie Sie die Abholzeit berechnen, erklärt [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). Der Fahrer hilft am Flughafen mit der Box bis zum Schalter.",
          "Vor dem Rückflug ins Ausland gelten wieder die Einreisebestimmungen des Ziellandes – etwa eine Bandwurmbehandlung für Grossbritannien, Irland, Malta und Norwegen, die in einem bestimmten Zeitfenster vor der Einreise erfolgen muss. Ein Tierarzt in der Schweiz kann sie eintragen; planen Sie den Termin ein.",
        ]},
        { h: "10. Checkliste für die Reise mit Tier", p: [
          "Die folgende Liste deckt alles ab, was in diesem Beitrag steht. Wer sie vor dem Flug durchgeht, hat am Flughafen Zürich nur noch eine Aufgabe: das Tier abholen und in ein Fahrzeug steigen, in dem alles vorbereitet ist.",
          "Bei uns geben Sie das Tier im Notizfeld der Buchung an – Art, Grösse, Box, Tierterminal ja oder nein – und wählen die Fahrzeugklasse nach Kapitel 6. Der Rest ist unsere Aufgabe: Decke, Gurt, Wartezeit, Pause unterwegs, ein ruhiger Fahrer.",
          "Und wenn Sie eine Frage haben, die hier nicht beantwortet ist: Schreiben Sie uns per WhatsApp. Wir fahren Hunde und Katzen seit Jahren und wissen, was funktioniert. [Transfer mit Haustier buchen](/buchung).",
        ], ul: [
          "Einreisebestimmungen beim BLV geprüft (Chip, Tollwut, Ausweis, ggf. Antikörpertest)",
          "Tierplatz bei der Airline gebucht, Box IATA-konform",
          "Transfer gebucht mit Tierart, Grösse, Box und Tierterminal im Notizfeld",
          "Fahrzeugklasse nach Grösse gewählt (V-Klasse für Frachtboxen)",
          "Gurt-Geschirr, Wasser, Decke, Leine im Handgepäck",
          "Hotel schriftlich bestätigt, dass Tiere willkommen sind",
          "Rückflug: zusätzliche Stunde für Frachtraumtiere, Zielland-Regeln geprüft",
        ]},
      ],
    },
    en: {
      title: "Flying with a Dog or Cat via Zurich Airport",
      excerpt: "Entry with a pet, pickup at the animal terminal, carrier in the vehicle, dog transfers at no extra charge: everything you need to know when your four-legged companion lands in Zurich – from documents to the drive to the hotel or the mountains.",
      body: [
        { p: [
          "More and more travellers bring their dog or cat to Switzerland – for a ski holiday, for hiking, for a longer stay or simply because the animal is part of the family. At Zurich Airport a series of questions then begins, all of which can be answered with a little preparation: where do I collect the animal? What does it need for entry? And how does it get from the airport to the hotel?",
          "We regularly drive guests with pets, and the rules are simpler than feared. This article describes entry, pickup, transport in the vehicle and onward travel – with what we experience in practice. For the binding entry regulations we refer to the Federal Food Safety and Veterinary Office (FSVO); they change occasionally.",
          "The chapters follow the journey: documents, arrival in the cabin or hold, animal terminal, transfer, vehicle choice, destinations, hotels, return flight and a checklist. If you only want to know whether we take dogs: yes, at no extra charge, in a carrier or with a seat-belt harness – chapter 5.",
        ]},
        { h: "1. Entry: chip, vaccination, pet passport", p: [
          "For dogs, cats and ferrets from the EU and most European countries three basic requirements apply: a microchip, a valid rabies vaccination administered at least 21 days before entry, and an EU pet passport recording both. For animals from third countries – USA, Canada, Gulf states, Asia – additional requirements apply depending on the country, sometimes a rabies antibody test and an official health certificate.",
          "Puppies under twelve weeks and certain dog breeds are subject to special rules; some cantons keep breed lists. Check the regulations for your origin and your animal on the FSVO website before booking the flight, not just before departure. What is missing cannot be made up at the airport.",
          "For entry from an EU country the check is usually uncomplicated: you declare the animal at customs, show the passport, done. From third countries, animals must be processed at Zurich Airport's animal terminal, where the papers are checked. Allow time for this – and tell us, so the driver waits accordingly.",
        ], ul: [
          "Microchip (ISO standard)",
          "Rabies vaccination at least 21 days old",
          "EU pet passport or official certificate",
          "From third countries: antibody test and health certificate where required",
        ]},
        { h: "2. Cabin or hold?", p: [
          "Small dogs and cats up to the airline's weight limit travel in a soft bag in the cabin under the seat in front. Larger dogs travel in the climate-controlled hold in an IATA-compliant crate. The airline decides by weight, crate size and aircraft type; book the pet place early, because the number per flight is limited.",
          "For the arrival in Zurich the difference matters a lot. Cabin animals come with you through passport control and baggage claim and stand with you in the arrivals hall; the transfer runs like any other ride. Hold animals are unloaded separately and handed over either at the oversized-baggage counter or – from third countries – at the animal terminal.",
          "Allow extra time after landing for hold animals: unloading, transport to the handover point, document check. 60 minutes of waiting are included with us; if it takes longer, a short message to the driver is enough. After a long flight the animal is usually restless – a calm driver and a quiet vehicle help more than haste.",
        ]},
        { h: "3. The animal terminal at Zurich Airport", p: [
          "Zurich Airport operates its own animal station in the cargo area, where animals from third countries are checked by the veterinary authority. It is not in the passenger terminal but in a separate building reachable by car. This is exactly where a private transfer is a real advantage: the driver collects you in the arrivals hall, drives with you to the animal terminal, waits, and then continues to the destination.",
          "With a taxi from the rank this is more cumbersome: you have to explain the trip to the cargo area, the driver is reluctant to wait, and the meter runs. By train it is practically not feasible. Anyone collecting their animal at the animal terminal should therefore book the transfer in advance and note \"pickup at animal terminal\" in the remarks field.",
          "The animal station's opening hours and the exact procedures for your origin are available from Zurich Airport and the FSVO. In practice the check takes a few minutes with complete papers; with missing documents the animal can be placed in quarantine – another reason to check the papers before the flight.",
        ]},
        { h: "4. Who collects: driver, you, or both?", p: [
          "The simplest procedure: you land, collect your cabin animal, and the driver waits with a name sign in the hall as on any other ride. For hold animals from the EU you collect the animal at the handover point and then come to the hall. For animals from third countries you drive with the driver to the animal terminal.",
          "We do not collect animals without you – for good reason: the handover requires your papers and your signature, and after a long flight the animal should see a familiar face, not a stranger. What we do: wait, drive, help, carry the crate, keep water ready.",
          "State the animal's species, size and transport route when booking. A Chihuahua in a cabin bag and a St. Bernard in a hold crate are two very different rides – vehicle choice and preparation depend on it. How arrival works in general is shown in [Arriving at Zurich Airport: finding your driver](/blog/ankunft-flughafen-zuerich-fahrer-finden).",
        ]},
        { h: "5. In the vehicle: crate, belt, blanket – at no extra charge", p: [
          "We take dogs and cats at no extra charge. The rule is the same as everywhere in Switzerland: the animal must be secured so that it does not endanger driver and passengers – in a carrier, with a seat-belt harness or behind a partition in the load space. A dog on the lap or loose on the back seat is not permitted and would be dangerous under braking.",
          "Small animals travel in their cabin bag or carrier on the floor in front of the back seat. Medium dogs with harness and belt on the back seat, on a blanket we keep ready. Large dogs in the hold crate in the load space of the V-Class – an IATA crate of the largest standard size fits there next to two suitcases. Bring your dog's belt harness if you have one; otherwise we have one on board.",
          "The vehicle is cleaned after every animal ride; that is included in the price. For wet fur after a winter walk or travel sickness a blanket helps, and the driver is happy to stop for a break – just say so. On longer routes such as to [Davos](/zurich-airport-to-davos) or [St. Moritz](/zurich-airport-to-st-moritz) we plan a stop with a meadow if you wish.",
        ], table: {
          head: ["Animal", "Securing in the vehicle", "Recommended class"],
          rows: [
            ["Cat, small dog in cabin bag", "Bag/carrier in the footwell", "Business Class (E-Class)"],
            ["Medium dog", "Harness with belt on the back seat, blanket", "Business Class or V-Class"],
            ["Large dog in hold crate", "Crate in the load space", "Business & Family Class (V-Class)"],
            ["Two or more animals", "Crates in the load space, belts on the back seat", "V-Class"],
          ],
        }},
        { h: "6. Which vehicle class", p: [
          "For a cabin animal and two people with luggage, the Business Class (E-Class) is enough. For a large dog in a hold crate or for two dogs, the Business & Family Class (V-Class) is the right choice: the load space takes the crate, the suitcases fit next to it, and the dog travels in its familiar crate, which calms it.",
          "For families with children and a dog the V-Class is used anyway – child seats, pushchair, suitcases and dog crate need room, and the facing seats allow someone to sit with the dog. What fits in which class, counting luggage, is in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "State the animal in the remarks field when booking: species, size, crate yes or no. The driver prepares blanket, belt and load space, and there is no surprise at the vehicle. All classes on the [vehicles page](/fahrzeuge).",
        ]},
        { h: "7. Destinations with a dog: mountains, lakes, cities", p: [
          "Switzerland is a dog-friendly travel destination. Hiking trails are open to dogs, many mountain railways take them – usually on a lead, sometimes muzzled – and most restaurants allow dogs on the terrace. In the mountains: keep the lead on alpine pastures with cattle, respect livestock guardian dogs, carry water in summer.",
          "For ski holidays with a dog, [Davos](/zurich-airport-to-davos), [Engelberg](/zurich-airport-to-engelberg) and the Bernese Oberland are popular; for hiking holidays Appenzell and the Engadin; for city breaks with a dog Lucerne and Bern with their lakeside paths. Car-free places like Zermatt and Wengen are perfectly feasible with a dog – the transfer ends at the valley station, and the railway takes dogs.",
          "A practical note: in Zermatt (to Täsch) and Wengen (to Lauterbrunnen) your dog rides the last section by train; a ticket for the dog is required. How these transfers work is in [Zermatt: why the transfer ends in Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "8. Hotels and accommodation", p: [
          "Many Swiss hotels accept dogs, often for a fee per night; cats less often. Ask explicitly when booking the hotel and get the confirmation in writing. Holiday flats are usually the more relaxed choice with an animal – own entrance, no breakfast room, garden.",
          "For the drive to the hotel one detail helps: give us the exact address and, if possible, the hotel entrance. The driver stops as close as permitted, carries the crate, and you walk in with the dog on a lead. For hotels in pedestrian zones – in the old towns of Bern or Lucerne, for example – the last stretch is short but on foot.",
          "If you have several accommodations in different places, book the journeys between them at the same time. For addresses outside our fixed routes we confirm the price before booking; the overview of routes is under [Routes](/strecken).",
        ]},
        { h: "9. Return flight: allow time for the animal", p: [
          "On departure the order is reversed: cabin animals go with you through check-in and security, where the animal is briefly taken out of the bag. Hold animals are handed in at the oversized-baggage counter or – for flights to third countries – as specified by the airline, often well before the normal check-in deadline.",
          "So plan more lead time than without an animal: an extra hour for hold animals is realistic, plus the usual buffer for the drive. How to calculate the pickup time is explained in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen). The driver helps with the crate to the counter at the airport.",
          "Before the return flight abroad, the entry regulations of the destination country apply again – for example a tapeworm treatment for the UK, Ireland, Malta and Norway, which must be carried out within a specific window before entry. A vet in Switzerland can record it; plan the appointment.",
        ]},
        { h: "10. Checklist for travelling with a pet", p: [
          "The following list covers everything in this article. Anyone who goes through it before the flight has only one task at Zurich Airport: collect the animal and get into a vehicle where everything is prepared.",
          "With us you state the animal in the booking's remarks field – species, size, crate, animal terminal yes or no – and choose the vehicle class according to chapter 6. The rest is our job: blanket, belt, waiting time, break on the way, a calm driver.",
          "And if you have a question not answered here: message us on WhatsApp. We have driven dogs and cats for years and know what works. [Book a transfer with a pet](/buchung).",
        ], ul: [
          "Entry regulations checked with the FSVO (chip, rabies, passport, antibody test where required)",
          "Pet place booked with the airline, crate IATA-compliant",
          "Transfer booked with species, size, crate and animal terminal in the remarks field",
          "Vehicle class chosen by size (V-Class for hold crates)",
          "Belt harness, water, blanket, lead in hand luggage",
          "Hotel confirmed in writing that animals are welcome",
          "Return flight: extra hour for hold animals, destination-country rules checked",
        ]},
      ],
    },
  },
];
