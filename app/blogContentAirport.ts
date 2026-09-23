// ─────────────────────────────────────────────────────────────
//  BLOG — "Praktisches Flughafenwissen" Serie (10 Beiträge, DE/EN)
//  Kural: fiyat yalnızca sitede yayımlanan sabit fiyatlardan (config.ts) alınır.
//  Taksi, tren, Uber vb. için rakam VERİLMEZ. Hizmet şartları (60 dk bekleme,
//  24 saat ücretsiz iptal, ücretsiz çocuk koltuğu, 4 kayak çantası) siteyle aynıdır.
// ─────────────────────────────────────────────────────────────
import type { BlogPost } from "./blogContent";

export const airportPosts: BlogPost[] = [
  // 1 ─────────────────────────────────────────────────────────
  {
    slug: "nachtankunft-flughafen-zuerich-nach-23-uhr",
    date: "2026-09-10",
    img: "/gallery/12.jpg",
    de: {
      title: "Nachtankunft am Flughafen Zürich: So kommen Sie nach 23 Uhr sicher in die Stadt – und weiter",
      excerpt: "Späte Landung, leerer Bahnhof, lange Taxischlange? Was nachts am Flughafen Zürich wirklich fährt, warum eine Vorabbuchung nach 23 Uhr entscheidend ist und wie Sie Ihren Transfer richtig planen.",
      body: [
        { p: [
          "Viele Langstreckenflüge und die letzten Verbindungen aus europäischen Metropolen landen zwischen 22 und 24 Uhr in Zürich-Kloten. Genau dann wird die Weiterreise zur Geduldsprobe: Der Bahnhof unter dem Flughafen wird leerer, die Taktung dünner, und wer nach Luzern, Basel, Bern oder in die Berge muss, steht oft vor einer ungeplanten Übernachtung. Dieser Guide erklärt, welche Optionen Ihnen nachts tatsächlich bleiben – und wie Sie sie stressfrei nutzen.",
        ]},
        { h: "Was nachts am Flughafen Zürich noch fährt", p: [
          "Der Flughafen Zürich ist bis in die späten Abendstunden gut an das Schweizer Bahnnetz angebunden, doch nach Mitternacht wird die Auswahl klein. Regionalverbindungen nach Zürich HB laufen am längsten, Fernverbindungen in andere Landesteile enden früher. Wer nach 23 Uhr landet, das Gepäck holt und die Passkontrolle passiert, erreicht den letzten Zug in seine Zielregion häufig nicht mehr. Unter der Woche und an Sonntagen ist der Nachtfahrplan zusätzlich reduziert.",
          "Taxis am Stand vor der Ankunftshalle sind nachts vorhanden, aber nicht immer in ausreichender Zahl. Bei mehreren gleichzeitigen Landungen bildet sich eine Schlange, und für längere Strecken ausserhalb des Kantons müssen Sie den Preis vorher aushandeln – nachts gelten bei Taxis grundsätzlich andere Tarife als tagsüber. Rechnen Sie also nicht mit dem, was Sie am Nachmittag bezahlt hätten.",
        ]},
        { h: "Warum ein vorgebuchter Transfer nachts den grössten Unterschied macht", p: [
          "Bei einem vorab gebuchten Transfer wartet Ihr Chauffeur mit Namensschild direkt in der Ankunftshalle – unabhängig davon, ob Sie um 22:40 oder um 00:20 aus dem Zoll kommen. Wir verfolgen Ihren Flug in Echtzeit; verspätet sich die Landung, verschiebt sich die Abholung automatisch. 60 Minuten Wartezeit nach der Landung sind bereits im Festpreis enthalten, und der Festpreis gilt pro Fahrzeug, rund um die Uhr, ohne Taxameter – zwischen 00:00 und 06:00 Uhr gilt ein transparenter Nachttarif von 20 %, der vor der Buchung angezeigt wird.",
          "Für Familien mit müden Kindern, Gruppen mit viel Gepäck oder Reisende, die noch in derselben Nacht in Davos, Grindelwald oder St. Moritz ankommen wollen, ist das der entscheidende Vorteil: Sie steigen ein und werden bis vor die Haustür gefahren, statt Anschlüsse zu suchen.",
        ]},
        { h: "Wichtig: Spontane Anfragen nach 23 Uhr", p: [
          "Unsere Zentrale plant Nachtfahrten sorgfältig, damit für jede Buchung ein ausgeruhter Fahrer bereitsteht. Deshalb können wir zwischen 23:00 und 06:00 Uhr eingehende Anfragen für Fahrten, die innerhalb der nächsten zwei Stunden starten sollen, nicht über das Online-Formular annehmen. Das Buchungssystem weist Sie in diesem Fall darauf hin und bietet Ihnen an, uns direkt per WhatsApp zu kontaktieren – oft finden wir kurzfristig eine Lösung, versprechen können wir sie aber nur bei Vorabbuchung.",
          "Die Faustregel: Buchen Sie Ihren Nachttransfer, sobald Ihre Flugnummer feststeht. Dann sind Fahrer, Fahrzeug und Kindersitze reserviert, und Sie haben nach der Landung nur noch eine Aufgabe – Ihr Namensschild zu finden.",
        ]},
        { h: "So planen Sie die Nachtankunft Schritt für Schritt", p: [
          "Erstens: Tragen Sie bei der Buchung Ihre Flugnummer ein, nicht nur die geplante Landezeit. Nur so kann die Abholung automatisch angepasst werden. Zweitens: Wählen Sie das Fahrzeug nach Gepäck, nicht nur nach Personen – nach Nachtflügen kommen erfahrungsgemäss mehr Koffer zusammen als geplant. Drittens: Geben Sie Kinder mit Alter an, damit die passenden Sitze kostenlos montiert sind. Viertens: Speichern Sie unsere WhatsApp-Nummer, bevor Sie abfliegen; sie ist der schnellste Draht, falls sich etwas ändert.",
          "Mit diesen vier Punkten ist eine Landung um Mitternacht kein Risiko mehr, sondern schlicht der ruhigste Moment des Tages, um durch die Schweiz zu fahren.",
        ]},
      ],
    },
    en: {
      title: "Late-Night Arrival at Zurich Airport: Getting Into the City (and Beyond) After 11 pm",
      excerpt: "Late landing, empty station, long taxi queue? What actually runs at night at Zurich Airport, why pre-booking after 11 pm is decisive and how to plan your transfer properly.",
      body: [
        { p: [
          "Many long-haul flights and the last connections from European hubs land in Zurich-Kloten between 10 pm and midnight. That is exactly when the onward journey becomes a test of patience: the station beneath the airport empties, frequencies thin out, and anyone heading to Lucerne, Basel, Bern or the mountains often faces an unplanned overnight stay. This guide explains which options genuinely remain at night – and how to use them without stress.",
        ]},
        { h: "What still runs at Zurich Airport at night", p: [
          "Zurich Airport is well connected to the Swiss rail network late into the evening, but after midnight the choice becomes small. Regional trains to Zurich main station run longest; long-distance services to other parts of the country end earlier. If you land after 11 pm, collect your luggage and pass passport control, you frequently miss the last train to your destination region. On weekdays and Sundays the night timetable is reduced further.",
          "Taxis at the rank outside arrivals exist at night, but not always in sufficient numbers. When several flights land at once, a queue forms, and for longer journeys outside the canton you need to negotiate the fare in advance – at night, taxis generally apply different tariffs than during the day. Do not count on what you would have paid in the afternoon.",
        ]},
        { h: "Why a pre-booked transfer makes the biggest difference at night", p: [
          "With a pre-booked transfer, your chauffeur waits with a name sign right in the arrivals hall – whether you clear customs at 10:40 pm or 12:20 am. We track your flight in real time; if the landing is delayed, the pickup shifts automatically. 60 minutes of waiting time after landing are already included in the fixed price, and the fixed price applies per vehicle, around the clock, with no taximeter – between midnight and 6 am a transparent night tariff of 20 % applies, shown before you book.",
          "For families with tired children, groups with plenty of luggage or travellers who want to reach Davos, Grindelwald or St. Moritz the same night, this is the decisive advantage: you get in and are driven to your front door instead of hunting for connections.",
        ]},
        { h: "Important: spontaneous requests after 11 pm", p: [
          "Our dispatch plans night journeys carefully so that a rested driver is available for every booking. For this reason, between 11 pm and 6 am we cannot accept requests via the online form for journeys due to start within the next two hours. The booking system tells you so and offers to put you in touch with us directly via WhatsApp – we often find a short-notice solution, but we can only promise one with an advance booking.",
          "The rule of thumb: book your night transfer as soon as your flight number is fixed. Then driver, vehicle and child seats are reserved, and after landing you have just one task left – finding your name sign.",
        ]},
        { h: "Planning a night arrival step by step", p: [
          "First: enter your flight number when booking, not just the scheduled landing time. Only then can the pickup be adjusted automatically. Second: choose the vehicle by luggage, not just by passengers – after night flights, more suitcases tend to come together than planned. Third: state children with their ages so that the right seats are fitted free of charge. Fourth: save our WhatsApp number before you depart; it is the fastest line if anything changes.",
          "With these four points, a midnight landing is no longer a risk, but simply the quietest moment of the day to drive through Switzerland.",
        ]},
      ],
    },
  },

  // 2 ─────────────────────────────────────────────────────────
  {
    slug: "ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich",
    date: "2026-09-03",
    img: "/gallery/1.jpg",
    de: {
      title: "Ankunft 1 oder Ankunft 2? Wo Sie Ihren Chauffeur am Flughafen Zürich treffen",
      excerpt: "Zwei Ankunftsbereiche, ein Flughafen: Welche Airlines wo landen, wie der Treffpunkt mit Ihrem Fahrer funktioniert und was Sie tun, wenn Sie sich einmal nicht sofort finden.",
      body: [
        { p: [
          "Der Flughafen Zürich hat keine getrennten Terminals im klassischen Sinn, sondern ein zentrales Gebäude mit zwei Ankunftsbereichen: Ankunft 1 und Ankunft 2. Für Reisende ist die Unterscheidung wichtig, denn sie bestimmt, an welchem Ausgang Sie auf Ihren Chauffeur treffen. Die gute Nachricht: Sie müssen sich das nicht merken – wir wissen anhand Ihrer Flugnummer, wo Sie ankommen, und positionieren den Fahrer entsprechend.",
        ]},
        { h: "Wer landet wo?", p: [
          "Als Faustregel gilt: Flüge aus dem Schengen-Raum werden meist über Ankunft 1 abgewickelt, Flüge von ausserhalb des Schengen-Raums – etwa aus Grossbritannien, den USA, dem Nahen Osten oder Asien – über Ankunft 2, weil dort die Passkontrolle liegt. Die Zuordnung kann sich je nach Airline, Tageszeit und Gate-Belegung ändern, daher lohnt sich der Blick auf die Anzeigetafeln nach der Landung. Sowohl Ankunft 1 als auch Ankunft 2 liegen im selben Gebäude und sind nur wenige Gehminuten voneinander entfernt.",
        ]},
        { h: "Der Treffpunkt: Meet & Greet in der Ankunftshalle", p: [
          "Nach der Gepäckausgabe folgen Sie den Schildern zum Ausgang in die öffentliche Ankunftshalle. Dort – nicht draussen am Strassenrand und nicht im Parkhaus – steht Ihr Chauffeur mit einem Namensschild. Auf dem Schild steht der Name, den Sie bei der Buchung angegeben haben; auf Wunsch auch ein Firmenname, etwa wenn Sie Gäste empfangen lassen. Der Fahrer hilft mit dem Gepäck und begleitet Sie zum Fahrzeug im Parkhaus, das direkt an das Terminal angeschlossen ist.",
          "Meet & Greet ist bei uns kein Zusatz, sondern Standard und im Festpreis enthalten. Ebenso enthalten sind 60 Minuten Wartezeit nach der Landung – Zeit genug für Passkontrolle, Gepäck und einen Kaffee.",
        ]},
        { h: "Was, wenn Sie sich nicht sofort finden?", p: [
          "Es passiert selten, aber es passiert: Ihr Flug wird auf den anderen Ankunftsbereich umgeleitet, Sie verlassen die Halle durch einen Nebenausgang, oder die Halle ist bei mehreren Landungen einfach voll. In diesem Fall bleiben Sie bitte am Ausgang stehen und schreiben Sie uns eine WhatsApp-Nachricht mit Ihrem Namen. Fahrer und Zentrale sind rund um die Uhr erreichbar und lotsen Sie in wenigen Sätzen zum richtigen Punkt. Laufen Sie nicht nach draussen zum Taxistand – dort sucht Sie niemand.",
        ]},
        { h: "Tipps für einen reibungslosen Empfang", p: [
          "Geben Sie bei der Buchung die vollständige Flugnummer an (z. B. LX 1234), damit wir die richtige Ankunft und die tatsächliche Landezeit kennen. Schalten Sie nach der Landung das Mobiltelefon ein und aktivieren Sie mobile Daten oder das kostenlose Flughafen-WLAN. Wenn Sie Gäste abholen lassen, teilen Sie ihnen vorab mit, dass ein Schild mit ihrem Namen auf sie wartet – das nimmt Unsicherheit, besonders bei Erstbesuchern der Schweiz.",
          "Mit diesen wenigen Vorbereitungen dauert der Weg vom Gate bis zum Mercedes selten länger als der Weg vom Gate bis zum Gepäckband.",
        ]},
      ],
    },
    en: {
      title: "Arrival 1 or Arrival 2? Where to Meet Your Chauffeur at Zurich Airport",
      excerpt: "Two arrivals areas, one airport: which airlines land where, how the meeting point with your driver works and what to do if you do not spot each other right away.",
      body: [
        { p: [
          "Zurich Airport does not have separate terminals in the classic sense but one central building with two arrivals areas: Arrival 1 and Arrival 2. For travellers the distinction matters, because it determines at which exit you meet your chauffeur. The good news: you do not need to remember it – your flight number tells us where you arrive, and we position the driver accordingly.",
        ]},
        { h: "Who lands where?", p: [
          "As a rule of thumb, flights from within the Schengen area are usually handled via Arrival 1, while flights from outside Schengen – for example from the UK, the USA, the Middle East or Asia – use Arrival 2, where passport control is located. The allocation can change depending on airline, time of day and gate usage, so it is worth checking the display boards after landing. Both Arrival 1 and Arrival 2 are in the same building and only a few minutes' walk apart.",
        ]},
        { h: "The meeting point: meet & greet in the arrivals hall", p: [
          "After baggage claim, follow the signs to the exit into the public arrivals hall. There – not outside at the kerb and not in the car park – your chauffeur stands with a name sign. The sign shows the name you entered when booking; on request also a company name, for instance when you have guests collected. The driver helps with the luggage and walks you to the vehicle in the car park directly connected to the terminal.",
          "Meet & greet is not an add-on with us but standard and included in the fixed price. Also included are 60 minutes of waiting time after landing – enough for passport control, luggage and a coffee.",
        ]},
        { h: "What if you do not find each other immediately?", p: [
          "It rarely happens, but it does: your flight is rerouted to the other arrivals area, you leave the hall through a side exit, or the hall is simply crowded when several flights land at once. In that case, please stay at the exit and send us a WhatsApp message with your name. Driver and dispatch are reachable around the clock and guide you to the right spot in a few sentences. Do not walk outside to the taxi rank – nobody is looking for you there.",
        ]},
        { h: "Tips for a smooth welcome", p: [
          "Enter the complete flight number when booking (e.g. LX 1234) so we know the correct arrivals area and the actual landing time. Switch on your phone after landing and enable mobile data or the free airport Wi-Fi. If you have guests collected, tell them beforehand that a sign with their name will be waiting – it removes uncertainty, especially for first-time visitors to Switzerland.",
          "With these few preparations, the walk from the gate to the Mercedes rarely takes longer than the walk from the gate to the baggage belt.",
        ]},
      ],
    },
  },

  // 3 ─────────────────────────────────────────────────────────
  {
    slug: "flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer",
    date: "2026-08-27",
    img: "/gallery/5.jpg",
    de: {
      title: "Flug verspätet oder annulliert – was passiert mit meinem Transfer?",
      excerpt: "Flugverfolgung, kostenlose Wartezeit, Umbuchung und Rückerstattung: So gehen wir mit Verspätungen, Umleitungen und Annullierungen um – und was Sie selbst tun sollten.",
      body: [
        { p: [
          "Kaum eine Frage erreicht uns häufiger als diese: «Was ist, wenn mein Flug Verspätung hat?» Die Sorge ist verständlich – bei einem gewöhnlichen Taxi oder einem Mietwagen ist die Abholzeit fix, und jede Änderung wird zum Problem. Bei einem professionellen Flughafentransfer ist das anders. Dieser Beitrag erklärt Schritt für Schritt, was bei Verspätung, Umleitung oder Annullierung passiert.",
        ]},
        { h: "Verspätung: Sie müssen nichts tun", p: [
          "Sobald Sie bei der Buchung Ihre Flugnummer angegeben haben, verfolgen wir den Flug in Echtzeit – vom Abflug bis zur tatsächlichen Landung in Zürich. Verspätet sich die Maschine um 20 Minuten oder um zwei Stunden, verschiebt sich die Abholzeit automatisch mit. Sie müssen uns nicht anrufen, nicht schreiben und sich im Flugzeug keine Gedanken machen. Ihr Chauffeur erscheint zur tatsächlichen Landezeit in der Ankunftshalle.",
          "Nach der Landung sind 60 Minuten Wartezeit im Festpreis enthalten. Diese Zeit ist bewusst grosszügig bemessen, damit Passkontrolle, Gepäckausgabe und ein verspätetes Gepäckband keinen Stress verursachen. Sollte es aussergewöhnlich lange dauern, etwa weil Ihr Koffer nicht angekommen ist, genügt eine kurze Nachricht – wir warten.",
        ]},
        { h: "Umleitung auf einen anderen Flughafen", p: [
          "Bei Nebel oder Gewitter kommt es vor, dass Flüge nach Basel, Genf oder ins nahe Ausland umgeleitet werden. Melden Sie sich in diesem Fall bitte per WhatsApp, sobald Sie am Boden sind. Gemeinsam entscheiden wir, ob der Fahrer Sie am Ausweichflughafen abholt oder ob eine spätere Abholung in Zürich sinnvoller ist. Da wir feste Strecken zu den wichtigsten Schweizer Zielen anbieten, lässt sich eine Abholung in Basel meist unkompliziert organisieren.",
        ]},
        { h: "Annullierung: kostenlose Stornierung und volle Rückerstattung", p: [
          "Wird Ihr Flug annulliert und Sie reisen nicht, stornieren Sie den Transfer bis 24 Stunden vor der geplanten Abholung kostenlos und erhalten den vollen Betrag zurück. Haben Sie online bezahlt, wird die Rückerstattung automatisch auf das ursprüngliche Zahlungsmittel ausgelöst. Bei kurzfristigen Annullierungen innerhalb der 24 Stunden – die bei Wetterlagen leider vorkommen – nehmen Sie bitte direkt Kontakt mit uns auf. Wir finden in aller Regel eine faire Lösung, sei es eine Umbuchung auf den Ersatzflug oder eine Gutschrift.",
          "Wichtig für Geschäftsreisende: Sie erhalten für jede Buchung eine Rechnung mit ausgewiesener Mehrwertsteuer, auch bei Umbuchungen. So bleibt die Spesenabrechnung sauber.",
        ]},
        { h: "Was Sie selbst tun können", p: [
          "Geben Sie immer die Flugnummer an – ohne sie können wir nicht verfolgen. Prüfen Sie, dass die bei der Buchung hinterlegte Mobilnummer im Ausland erreichbar ist, idealerweise über WhatsApp. Und wenn sich Ihre Reisepläne ändern, sagen Sie es uns, sobald Sie es wissen: Je früher wir Bescheid wissen, desto einfacher lässt sich Ihr Fahrer neu einplanen.",
          "Kurz gesagt: Verspätungen sind unser Alltag, nicht Ihr Problem. Sie landen, wann Sie landen – wir sind da.",
        ]},
      ],
    },
    en: {
      title: "Flight Delayed or Cancelled – What Happens to My Transfer?",
      excerpt: "Flight tracking, free waiting time, rebooking and refunds: how we handle delays, diversions and cancellations – and what you should do yourself.",
      body: [
        { p: [
          "Hardly any question reaches us more often than this one: \"What if my flight is delayed?\" The concern is understandable – with an ordinary taxi or a hire car the pickup time is fixed, and every change becomes a problem. With a professional airport transfer it is different. This article explains step by step what happens in case of delay, diversion or cancellation.",
        ]},
        { h: "Delay: you do not need to do anything", p: [
          "As soon as you have entered your flight number when booking, we track the flight in real time – from departure to the actual landing in Zurich. Whether the aircraft is 20 minutes or two hours late, the pickup time shifts automatically. You do not need to call, text or worry on board. Your chauffeur appears in the arrivals hall at the actual landing time.",
          "After landing, 60 minutes of waiting time are included in the fixed price. This allowance is deliberately generous so that passport control, baggage claim and a late baggage belt cause no stress. Should it take unusually long, for instance because your suitcase did not arrive, a short message is enough – we wait.",
        ]},
        { h: "Diversion to another airport", p: [
          "In fog or thunderstorms, flights are occasionally diverted to Basel, Geneva or nearby foreign airports. In that case, please contact us via WhatsApp as soon as you are on the ground. Together we decide whether the driver collects you at the alternate airport or whether a later pickup in Zurich makes more sense. Since we offer fixed routes to the main Swiss destinations, a pickup in Basel can usually be organised without complication.",
        ]},
        { h: "Cancellation: free cancellation and full refund", p: [
          "If your flight is cancelled and you do not travel, you can cancel the transfer free of charge up to 24 hours before the scheduled pickup and receive the full amount back. If you paid online, the refund is triggered automatically to the original payment method. For short-notice cancellations within the 24 hours – which unfortunately happen in bad weather – please contact us directly. As a rule we find a fair solution, be it a rebooking to the replacement flight or a credit note.",
          "Important for business travellers: you receive an invoice with VAT shown for every booking, including rebookings. This keeps expense reports clean.",
        ]},
        { h: "What you can do yourself", p: [
          "Always enter the flight number – without it we cannot track. Check that the mobile number provided at booking is reachable abroad, ideally via WhatsApp. And if your travel plans change, tell us as soon as you know: the earlier we know, the easier it is to reschedule your driver.",
          "In short: delays are our daily routine, not your problem. You land when you land – we are there.",
        ]},
      ],
    },
  },

  // 4 ─────────────────────────────────────────────────────────
  {
    slug: "gruppen-5-7-personen-flughafen-zuerich-ein-fahrzeug",
    date: "2026-08-20",
    img: "/gallery/14.jpg",
    de: {
      title: "5 bis 7 Personen ab Flughafen Zürich: Warum ein Van günstiger und entspannter ist als zwei Taxis",
      excerpt: "Familienurlaub, Freundesgruppe oder Team-Reise: So rechnen Sie Gepäck und Sitzplätze richtig, was die Business & Family Class bietet und weshalb sich ein Fahrzeug fast immer lohnt.",
      body: [
        { p: [
          "Sobald mehr als vier Personen zusammen reisen, stellt sich am Flughafen Zürich dieselbe Frage: Zwei Taxis nehmen, den Zug mit Umsteigen wagen oder ein grösseres Fahrzeug buchen? Wer schon einmal mit sechs Koffern, zwei Kindern und Skiausrüstung am Gepäckband stand, kennt die Antwort. Dieser Guide zeigt, wie Sie Sitzplätze und Gepäck realistisch kalkulieren und warum der Van für Gruppen fast immer die klügere Wahl ist.",
        ]},
        { h: "Sitzplätze zählen ist einfach – Gepäck zählen ist entscheidend", p: [
          "Unsere Business & Family Class, ein Mercedes-Benz V-Class, bietet Platz für bis zu 7 Passagiere und 7 Gepäckstücke. Das klingt nach viel, und es ist viel – vorausgesetzt, Sie zählen ehrlich. Ein grosser Reisekoffer zählt als ein Gepäckstück; ein Handgepäck-Trolley oder ein Rucksack findet meist zusätzlich Platz zu Füssen oder auf dem Schoss. Kinderwagen, Golfbags und Skitaschen sind sperriger und sollten bei der Buchung angemeldet werden, damit der Fahrer den Laderaum entsprechend vorbereitet. Skitaschen nehmen wir kostenlos mit, bis zu vier pro Fahrzeug.",
          "Die Faustregel: Wenn Sie sieben Personen mit je einem grossen Koffer sind, passt es. Wenn sieben Personen mit je zwei grossen Koffern reisen, ist ein zweites Fahrzeug die ehrlichere Lösung – sagen Sie es uns, wir planen es ein.",
        ]},
        { h: "Ein Fahrzeug statt zwei Taxis: die Rechnung", p: [
          "Ein Taxi vom Stand nimmt in der Regel vier Passagiere mit; für eine Gruppe von sechs bedeutet das zwei Fahrzeuge, zwei Taxameter, zwei separate Preisverhandlungen für die Fernstrecke – und zwei Ankunftszeiten, weil sich die Wagen im Verkehr trennen. Bei uns gilt der Festpreis pro Fahrzeug, nicht pro Person. Für die Strecke Flughafen Zürich–Luzern etwa wird der Festpreis der Business Class nach Kilometertarif berechnet, pro Fahrzeug; die Business & Family Class liegt beim Buchen sichtbar darüber, transportiert aber die ganze Gruppe samt Gepäck in einem Wagen. Auf sechs Personen umgelegt ist das deutlich weniger, als zwei Einzelfahrten kosten würden.",
          "Der Preis ist dabei nur ein Teil des Arguments. Die Gruppe kommt gemeinsam an, niemand wartet im Regen auf den zweiten Wagen, die Kinder sitzen bei den Eltern, und die Diskussion, wer mit wem fährt, entfällt.",
        ]},
        { h: "Familien: Kindersitze inklusive", p: [
          "Für Familien stellen wir Babyschalen und Kindersitze kostenlos bereit. Geben Sie bei der Buchung die Anzahl und das Alter der Kinder an; die Sitze sind montiert, bevor Sie am Fahrzeug ankommen. In der V-Class lassen sich mehrere Kindersitze problemlos kombinieren, und die Sitzanordnung erlaubt es, dass Eltern und Kinder einander gegenübersitzen – auf einer zweistündigen Fahrt ins Berner Oberland ein unterschätzter Vorteil.",
        ]},
        { h: "Grössere Gruppen und Firmenreisen", p: [
          "Ab acht Personen kombinieren wir mehrere Fahrzeuge, die zeitgleich am Flughafen bereitstehen und gemeinsam fahren. Für Firmen empfiehlt sich die Buchung mit Firmenname auf dem Namensschild und einer Sammelrechnung mit ausgewiesener Mehrwertsteuer. Schreiben Sie uns einfach Personenzahl, Gepäck und Ziel – Sie erhalten einen Vorschlag, der zu Ihrer Gruppe passt.",
          "Fazit: Bei fünf bis sieben Reisenden ist die Business & Family Class fast immer die wirtschaftlichste und mit Abstand die entspannteste Option ab Flughafen Zürich. Zählen Sie das Gepäck ehrlich, melden Sie Sperriges an – den Rest übernehmen wir.",
        ]},
      ],
    },
    en: {
      title: "5 to 7 People from Zurich Airport: Why One Van Beats Two Taxis on Cost and Comfort",
      excerpt: "Family holiday, group of friends or team trip: how to count luggage and seats realistically, what the Business & Family Class offers and why one vehicle almost always pays off.",
      body: [
        { p: [
          "As soon as more than four people travel together, the same question arises at Zurich Airport: take two taxis, risk the train with changes, or book a larger vehicle? Anyone who has ever stood at the baggage belt with six suitcases, two children and ski equipment knows the answer. This guide shows how to calculate seats and luggage realistically and why the van is almost always the smarter choice for groups.",
        ]},
        { h: "Counting seats is easy – counting luggage is what matters", p: [
          "Our Business & Family Class, a Mercedes-Benz V-Class, seats up to 7 passengers and carries 7 pieces of luggage. That sounds like a lot, and it is – provided you count honestly. A large suitcase counts as one piece; a carry-on trolley or a backpack usually finds additional space at your feet or on your lap. Pushchairs, golf bags and ski bags are bulkier and should be mentioned when booking so the driver prepares the load space accordingly. We carry ski bags free of charge, up to four per vehicle.",
          "The rule of thumb: seven people with one large suitcase each fits. Seven people with two large suitcases each is more honestly served by a second vehicle – tell us and we plan for it.",
        ]},
        { h: "One vehicle instead of two taxis: the maths", p: [
          "A taxi from the rank usually takes four passengers; for a group of six that means two vehicles, two meters, two separate fare negotiations for the long-distance leg – and two arrival times, because the cars separate in traffic. With us the fixed price applies per vehicle, not per person. On the Zurich Airport–Lucerne route, for example, the Business Class price is calculated by kilometre tariff, per vehicle; the Business & Family Class is visibly above that when booking, but transports the whole group and all luggage in one car. Spread across six people, that is markedly less than two individual journeys would cost.",
          "Price is only part of the argument. The group arrives together, nobody waits in the rain for the second car, the children sit with their parents, and the discussion about who travels with whom simply disappears.",
        ]},
        { h: "Families: child seats included", p: [
          "For families we provide baby shells and child seats free of charge. State the number and age of the children when booking; the seats are fitted before you reach the vehicle. In the V-Class, several child seats combine without difficulty, and the seating layout allows parents and children to sit facing each other – an underrated advantage on a two-hour drive to the Bernese Oberland.",
        ]},
        { h: "Larger groups and corporate trips", p: [
          "From eight people we combine several vehicles that stand ready at the airport at the same time and travel together. For companies we recommend booking with the company name on the name sign and a consolidated invoice with VAT shown. Simply send us the number of people, luggage and destination – you receive a proposal that fits your group.",
          "Bottom line: for five to seven travellers the Business & Family Class is almost always the most economical and by far the most relaxed option from Zurich Airport. Count the luggage honestly, mention anything bulky – we take care of the rest.",
        ]},
      ],
    },
  },

  // 5 ─────────────────────────────────────────────────────────
  {
    slug: "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse",
    date: "2026-08-13",
    img: "/gallery/6.jpg",
    de: {
      title: "Wie viele Koffer passen wirklich? Gepäckkapazität von E-Klasse, V-Klasse und S-Klasse im Detail",
      excerpt: "Reisekoffer, Handgepäck, Skitaschen, Golfbags, Kinderwagen: Was in welches Fahrzeug passt, wie wir zählen und wann Sie besser eine Klasse grösser buchen.",
      body: [
        { p: [
          "«Passt unser Gepäck?» ist die praktischste Frage vor jeder Buchung – und die, bei der ehrliche Antworten am meisten wert sind. Ein Fahrzeug, das auf dem Papier genug Platz hat, wird zur Enttäuschung, wenn am Flughafen ein Koffer auf dem Schoss mitfahren muss. Deshalb hier eine klare Übersicht, wie viel in unsere drei Fahrzeugklassen passt und wie Sie Ihr Gepäck realistisch einschätzen.",
        ]},
        { h: "Die drei Klassen im Überblick", p: [
          "Business Class – Mercedes-Benz E-Klasse: bis zu 2 Passagiere und 2 Gepäckstücke. Die ideale Wahl für Geschäftsreisende, Paare und alle, die mit einem Koffer und Handgepäck unterwegs sind.",
          "Business & Family Class – Mercedes-Benz V-Klasse: bis zu 7 Passagiere und 7 Gepäckstücke. Der Van für Familien, Gruppen und alle, die mit Skiausrüstung, Kinderwagen oder mehreren grossen Koffern reisen.",
          "Premium Class – Mercedes-Benz S-Klasse: bis zu 3 Passagiere und 3 Gepäckstücke. Höchster Fahrkomfort für Reisende, die den Weg als Teil des Aufenthalts verstehen.",
        ]},
        { h: "Wie wir zählen", p: [
          "Ein Gepäckstück ist für uns ein grosser Reisekoffer, also das, was Sie am Flughafen aufgegeben haben. Handgepäck – ein kleiner Trolley, eine Laptoptasche, ein Rucksack – zählt in der Regel nicht mit, weil es im Fussraum oder auf der Rückbank Platz findet. Zwei Personen mit je einem grossen Koffer und je einem Handgepäck reisen in der E-Klasse also bequem. Zwei Personen mit je zwei grossen Koffern reisen in der E-Klasse eng – hier empfehlen wir die V-Klasse, auch wenn Sie nur zu zweit sind.",
        ]},
        { h: "Sondergepäck: Ski, Golf, Kinderwagen, Fahrräder", p: [
          "Skitaschen befördern wir kostenlos, bis zu vier pro Fahrzeug. In der E-Klasse geht das über die Durchlade, in der V-Klasse problemlos im Laderaum. Golfbags sind sperriger als Skitaschen; ein bis zwei passen in die E-Klasse, für mehr empfehlen wir die V-Klasse. Ein zusammenklappbarer Kinderwagen oder Buggy findet in jeder Klasse Platz, ein grosser Kombi-Kinderwagen gehört in die V-Klasse. Fahrräder, Musikinstrumente in Grosskoffern oder Ausstellungsmaterial sollten Sie uns bitte vorab schreiben – oft geht mehr, als man denkt, aber wir wollen es vorher wissen.",
          "Melden Sie Sondergepäck am besten im Notizfeld der Buchung an. Der Fahrer bereitet den Laderaum vor und weiss, was ihn erwartet.",
        ]},
        { h: "Wann Sie eine Klasse grösser buchen sollten", p: [
          "Buchen Sie die V-Klasse, wenn Sie zu dritt oder viert mit je einem grossen Koffer reisen, wenn Skiausrüstung für mehr als zwei Personen dabei ist, wenn ein Kinderwagen plus Koffer plus Kindersitze zusammenkommen, oder wenn Sie nach einem Langstreckenflug schlicht nicht mehr über Gepäck nachdenken wollen. Der Aufpreis gegenüber der E-Klasse ist im Buchungsprozess transparent ersichtlich; dafür haben alle Platz, und niemand sitzt zwischen Koffern.",
          "Und wenn Sie unsicher sind: Schreiben Sie uns kurz Personen und Gepäck per WhatsApp. Wir sagen Ihnen ehrlich, was passt – auch wenn die Antwort «die kleinere Klasse reicht» lautet.",
        ]},
      ],
    },
    en: {
      title: "How Many Suitcases Really Fit? Luggage Capacity of E-Class, V-Class and S-Class in Detail",
      excerpt: "Suitcases, carry-ons, ski bags, golf bags, pushchairs: what fits in which vehicle, how we count and when you should book one class larger.",
      body: [
        { p: [
          "\"Does our luggage fit?\" is the most practical question before any booking – and the one where honest answers are worth most. A vehicle that has enough space on paper becomes a disappointment when a suitcase has to travel on someone's lap. So here is a clear overview of how much fits in our three vehicle classes and how to assess your luggage realistically.",
        ]},
        { h: "The three classes at a glance", p: [
          "Business Class – Mercedes-Benz E-Class: up to 2 passengers and 2 pieces of luggage. The ideal choice for business travellers, couples and anyone travelling with one suitcase and hand luggage.",
          "Business & Family Class – Mercedes-Benz V-Class: up to 7 passengers and 7 pieces of luggage. The van for families, groups and anyone travelling with ski equipment, a pushchair or several large suitcases.",
          "Premium Class – Mercedes-Benz S-Class: up to 3 passengers and 3 pieces of luggage. The highest level of ride comfort for travellers who see the journey as part of the stay.",
        ]},
        { h: "How we count", p: [
          "For us, a piece of luggage is a large suitcase – what you checked in at the airport. Hand luggage – a small trolley, a laptop bag, a backpack – does not usually count, because it finds space in the footwell or on the rear seat. Two people with one large suitcase and one carry-on each therefore travel comfortably in the E-Class. Two people with two large suitcases each travel tightly in the E-Class – here we recommend the V-Class, even if there are only two of you.",
        ]},
        { h: "Special luggage: skis, golf, pushchairs, bicycles", p: [
          "We carry ski bags free of charge, up to four per vehicle. In the E-Class this works via the ski hatch, in the V-Class easily in the load space. Golf bags are bulkier than ski bags; one or two fit in the E-Class, for more we recommend the V-Class. A folding pushchair or buggy fits in every class; a large travel-system pram belongs in the V-Class. Bicycles, musical instruments in flight cases or exhibition material – please write to us in advance. Often more is possible than you think, but we want to know beforehand.",
          "The best place to mention special luggage is the notes field of the booking. The driver prepares the load space and knows what to expect.",
        ]},
        { h: "When to book one class larger", p: [
          "Book the V-Class if three or four of you travel with one large suitcase each, if ski equipment for more than two people is on board, if a pushchair plus suitcases plus child seats come together, or if after a long-haul flight you simply do not want to think about luggage any more. The difference to the E-Class is shown transparently in the booking process; in return everyone has space and nobody sits between suitcases.",
          "And if you are unsure: send us people and luggage in a short WhatsApp message. We tell you honestly what fits – even if the answer is \"the smaller class is enough\".",
        ]},
      ],
    },
  },

  // 6 ─────────────────────────────────────────────────────────
  {
    slug: "transfer-flughafen-zuerich-deutschland-oesterreich-grenze",
    date: "2026-08-06",
    img: "/gallery/5.jpg",
    de: {
      title: "Vom Flughafen Zürich nach Deutschland oder Österreich: Grenzübertritt, Dokumente und was Sie wissen sollten",
      excerpt: "Konstanz, Freiburg, Bregenz, Friedrichshafen oder Stuttgart: So funktioniert der Transfer über die Grenze, welche Dokumente Sie brauchen und warum Zürich oft der bessere Flughafen ist.",
      body: [
        { p: [
          "Der Flughafen Zürich liegt keine Stunde von der deutschen und knapp zwei Stunden von der österreichischen Grenze entfernt. Für viele Reisende nach Süddeutschland und Vorarlberg ist er deshalb der praktischere Ankunftsort – mit mehr Direktflügen und einer Weiterreise, die im privaten Transfer ohne Umsteigen auskommt. Dieser Beitrag beantwortet die Fragen, die uns zu grenzüberschreitenden Fahrten am häufigsten gestellt werden.",
        ]},
        { h: "Wie läuft der Grenzübertritt im Transfer ab?", p: [
          "Sie sitzen im Fahrzeug, Ihr Chauffeur fährt Sie über die Grenze – so einfach ist es in den allermeisten Fällen. Die Schweiz ist Teil des Schengen-Raums, deshalb gibt es an den Übergängen nach Deutschland und Österreich in der Regel keine systematische Passkontrolle. Zollbeamte können stichprobenartig kontrollieren; halten Sie daher Ausweis oder Reisepass griffbereit. Unsere Fahrer kennen die Übergänge, die zu Stosszeiten weniger belastet sind, und wählen die Route entsprechend.",
          "Wichtig: Der Transfer ist eine Fahrt von Tür zu Tür. Sie müssen nicht an der Grenze umsteigen, kein zweites Fahrzeug organisieren und nicht in einem fremden Land ein Taxi suchen.",
        ]},
        { h: "Welche Dokumente brauchen Sie?", p: [
          "Für Bürgerinnen und Bürger der EU, des EWR und der Schweiz genügt eine gültige Identitätskarte oder ein Reisepass. Reisende aus Drittstaaten benötigen einen Reisepass und, je nach Nationalität, ein Schengen-Visum; da die Schweiz und Deutschland beziehungsweise Österreich alle zum Schengen-Raum gehören, gilt ein gültiges Schengen-Visum für die gesamte Fahrt. Prüfen Sie die aktuellen Einreisebestimmungen für Ihre Nationalität vor der Reise bei den offiziellen Stellen.",
          "Zollvorschriften gelten unabhängig vom Verkehrsmittel: Waren, die über die Freimengen hinausgehen, müssen deklariert werden – das betrifft im Transfer genauso wie im eigenen Auto. Bei Fragen zu bestimmten Gütern helfen die Zollbehörden weiter.",
        ]},
        { h: "Beliebte grenzüberschreitende Ziele", p: [
          "Konstanz und der Bodensee sind vom Flughafen Zürich aus schnell erreicht; unsere feste Strecke nach Schaffhausen führt bereits in diese Richtung, und Konstanz liegt nur wenig weiter. Freiburg im Breisgau und der Schwarzwald sind ein typisches Ziel für Wanderer und Kurgäste. Bregenz, Dornbirn und das Montafon in Vorarlberg erreichen wir über St. Gallen und die Rheintal-Autobahn – im Winter ein beliebter Weg zu den Skigebieten. Friedrichshafen, Lindau und Ulm liegen ebenfalls im Radius, Stuttgart und München sind längere, aber gut planbare Fahrten.",
          "Für diese Ziele ausserhalb unserer festen Strecken erstellen wir ein individuelles Angebot. Geben Sie im Buchungsformular einfach Ihre Adresse ein; wir bestätigen Ihnen den Preis, bevor Sie sich festlegen.",
        ]},
        { h: "Praktische Hinweise", p: [
          "Erstens: Planen Sie für Fahrten ins Ausland etwas Zeitpuffer ein, falls an der Grenze kontrolliert wird. Zweitens: Wenn Sie Kinder dabei haben, gelten in Deutschland und Österreich ähnliche Kindersitzpflichten wie in der Schweiz – unsere kostenlosen Kindersitze erfüllen sie. Drittens: Die Rückfahrt zum Flughafen Zürich lässt sich gleich mitbuchen; der Fahrer holt Sie an Ihrer Adresse im Ausland ab und bringt Sie rechtzeitig zum Check-in.",
          "So wird Zürich zum bequemsten Tor nach Süddeutschland und Vorarlberg – und der Grenzübertritt zu einem Moment, den Sie im Fahrzeug kaum bemerken.",
        ]},
      ],
    },
    en: {
      title: "From Zurich Airport to Germany or Austria: Border Crossing, Documents and What You Should Know",
      excerpt: "Konstanz, Freiburg, Bregenz, Friedrichshafen or Stuttgart: how the cross-border transfer works, which documents you need and why Zurich is often the better airport.",
      body: [
        { p: [
          "Zurich Airport is less than an hour from the German border and just under two hours from the Austrian border. For many travellers to southern Germany and Vorarlberg it is therefore the more practical arrival point – with more direct flights and an onward journey that, in a private transfer, requires no changes. This article answers the questions we are asked most often about cross-border journeys.",
        ]},
        { h: "How does the border crossing work in a transfer?", p: [
          "You sit in the vehicle, your chauffeur drives you across the border – in the vast majority of cases it is that simple. Switzerland is part of the Schengen area, so there is usually no systematic passport control at the crossings to Germany and Austria. Customs officers may carry out spot checks; keep your ID card or passport within reach. Our drivers know which crossings are less congested at peak times and choose the route accordingly.",
          "Important: the transfer is a door-to-door journey. You do not change vehicles at the border, do not need to organise a second car and do not search for a taxi in a foreign country.",
        ]},
        { h: "Which documents do you need?", p: [
          "For citizens of the EU, the EEA and Switzerland a valid identity card or passport is sufficient. Travellers from third countries need a passport and, depending on nationality, a Schengen visa; since Switzerland, Germany and Austria all belong to the Schengen area, a valid Schengen visa covers the entire journey. Check the current entry requirements for your nationality with the official authorities before travelling.",
          "Customs rules apply regardless of the mode of transport: goods exceeding the duty-free allowances must be declared – in a transfer just as in your own car. The customs authorities can help with questions about specific goods.",
        ]},
        { h: "Popular cross-border destinations", p: [
          "Konstanz and Lake Constance are reached quickly from Zurich Airport; our fixed route to Schaffhausen already heads in that direction, and Konstanz is only a little further. Freiburg im Breisgau and the Black Forest are a typical destination for hikers and spa guests. Bregenz, Dornbirn and the Montafon in Vorarlberg are reached via St. Gallen and the Rhine Valley motorway – in winter a popular way to the ski resorts. Friedrichshafen, Lindau and Ulm are also within range; Stuttgart and Munich are longer but easily planned journeys.",
          "For these destinations outside our fixed routes we prepare an individual quote. Simply enter your address in the booking form; we confirm the price before you commit.",
        ]},
        { h: "Practical notes", p: [
          "First: allow a little time buffer for journeys abroad in case there are checks at the border. Second: if you travel with children, Germany and Austria have child-seat requirements similar to Switzerland – our free child seats meet them. Third: the return journey to Zurich Airport can be booked at the same time; the driver collects you at your address abroad and brings you to check-in on time.",
          "This makes Zurich the most convenient gateway to southern Germany and Vorarlberg – and the border crossing a moment you barely notice inside the vehicle.",
        ]},
      ],
    },
  },

  // 7 ─────────────────────────────────────────────────────────
  {
    slug: "mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen",
    date: "2026-07-30",
    img: "/gallery/11.jpg",
    de: {
      title: "Mit Baby und Kleinkind ab Flughafen Zürich: Kindersitze, Kinderwagen und ein entspannter Start",
      excerpt: "Welche Sitze für welches Alter, wie Sie Kinder bei der Buchung angeben, was mit dem Kinderwagen passiert und warum der private Transfer für junge Familien die ruhigste Option ist.",
      body: [
        { p: [
          "Mit einem Baby oder Kleinkind zu fliegen ist anstrengend genug – die Weiterreise ab Flughafen sollte es nicht auch noch sein. Zug mit Umsteigen und Kinderwagen im Treppenhaus, Taxi ohne passenden Sitz, Mietwagen mit Sitzmontage im Parkhaus: Es gibt gute Gründe, warum junge Familien den privaten Transfer wählen. Hier erfahren Sie, wie wir Kinder befördern und was Sie bei der Buchung beachten sollten.",
        ]},
        { h: "Kindersitzpflicht in der Schweiz – kurz erklärt", p: [
          "In der Schweiz müssen Kinder bis zum vollendeten 12. Lebensjahr oder bis zu einer Körpergrösse von 150 cm in einer geeigneten Kinderrückhaltevorrichtung mitfahren. Das gilt in jedem Personenwagen, auch in Taxis und Transferfahrzeugen. Für Sie heisst das: Ein Sitz muss vorhanden sein, und er muss zum Alter und Gewicht des Kindes passen. Genau das übernehmen wir – kostenlos.",
        ]},
        { h: "Welche Sitze wir bereitstellen", p: [
          "Babyschalen für Säuglinge, Kindersitze für Kleinkinder und Sitzerhöhungen mit Rückenlehne für Kinder bis etwa zwölf Jahre. Im Buchungsformular können Sie einen Kindersitz für Kinder von 15 bis 36 kg (etwa 4 bis 12 Jahre) direkt auswählen; für jüngere Kinder und Babyschalen geben Sie Anzahl und Alter im Notizfeld an. Der Fahrer montiert die Sitze vor der Abholung, sodass Sie am Fahrzeug nur noch einsteigen und anschnallen müssen.",
          "Wenn Sie Ihren eigenen Sitz mitbringen möchten – etwa weil Ihr Kind daran gewöhnt ist – ist das selbstverständlich möglich. Sagen Sie es uns kurz, damit wir keinen zweiten montieren.",
        ]},
        { h: "Kinderwagen, Buggy und Reisebett", p: [
          "Ein zusammenklappbarer Buggy findet in jeder Fahrzeugklasse Platz. Ein grosser Kombi-Kinderwagen mit Wanne und Gestell braucht mehr Raum; hier empfehlen wir die Business & Family Class (V-Klasse), in der auch Reisebett, Wickeltasche und die Koffer der Eltern problemlos Platz finden. Die V-Klasse hat zudem den Vorteil, dass die Eltern dem Kind gegenübersitzen können – bei einer längeren Fahrt nach Interlaken oder Davos ist das Gold wert.",
          "Melden Sie den Kinderwagen bei der Buchung an. Wie bei allem sperrigen Gepäck gilt: Wenn wir es wissen, ist der Laderaum vorbereitet.",
        ]},
        { h: "Warum der private Transfer für Familien die ruhigste Wahl ist", p: [
          "Ihr Chauffeur wartet in der Ankunftshalle mit Namensschild, hilft mit Gepäck und Kinderwagen und bringt Sie zum Fahrzeug im Parkhaus, das direkt am Terminal liegt – kein Shuttle, keine Treppe, kein Warten am Strassenrand. 60 Minuten Wartezeit nach der Landung sind inklusive; wenn das Wickeln oder das Gepäckband länger dauert, ist das kein Problem. Der Festpreis gilt pro Fahrzeug, Kindersitze kosten nichts extra, und Sie werden bis vor die Haustür oder den Hoteleingang gefahren.",
          "Und sollte sich der Flug verspäten: Wir verfolgen ihn und passen die Abholzeit automatisch an. Sie kümmern sich um das Kind – wir uns um den Rest.",
        ]},
      ],
    },
    en: {
      title: "With a Baby or Toddler from Zurich Airport: Child Seats, Pushchairs and a Relaxed Start",
      excerpt: "Which seats for which age, how to state children when booking, what happens to the pushchair and why a private transfer is the calmest option for young families.",
      body: [
        { p: [
          "Flying with a baby or toddler is tiring enough – the onward journey from the airport should not add to it. Train with changes and a pushchair in the stairwell, taxi without a suitable seat, hire car with seat installation in the car park: there are good reasons why young families choose a private transfer. Here you learn how we carry children and what to keep in mind when booking.",
        ]},
        { h: "Child-seat requirements in Switzerland – briefly explained", p: [
          "In Switzerland, children up to the age of 12 or up to a height of 150 cm must travel in a suitable child restraint. This applies in every passenger car, including taxis and transfer vehicles. For you it means: a seat must be present, and it must match the child's age and weight. That is exactly what we take care of – free of charge.",
        ]},
        { h: "Which seats we provide", p: [
          "Baby shells for infants, child seats for toddlers and high-back boosters for children up to around twelve. In the booking form you can directly select a child seat for children of 15 to 36 kg (roughly 4 to 12 years); for younger children and baby shells, state number and age in the notes field. The driver fits the seats before the pickup, so at the vehicle you only need to get in and buckle up.",
          "If you would like to bring your own seat – for instance because your child is used to it – that is of course possible. Just let us know so we do not fit a second one.",
        ]},
        { h: "Pushchair, buggy and travel cot", p: [
          "A folding buggy fits in every vehicle class. A large travel-system pram with carrycot and chassis needs more room; here we recommend the Business & Family Class (V-Class), where travel cot, changing bag and the parents' suitcases also fit without difficulty. The V-Class has the added advantage that parents can sit facing the child – on a longer drive to Interlaken or Davos this is worth its weight in gold.",
          "Mention the pushchair when booking. As with all bulky luggage: if we know, the load space is prepared.",
        ]},
        { h: "Why a private transfer is the calmest choice for families", p: [
          "Your chauffeur waits in the arrivals hall with a name sign, helps with luggage and pushchair and takes you to the vehicle in the car park right next to the terminal – no shuttle, no stairs, no waiting at the kerb. 60 minutes of waiting time after landing are included; if changing the baby or the baggage belt takes longer, it is no problem. The fixed price applies per vehicle, child seats cost nothing extra, and you are driven to your front door or hotel entrance.",
          "And should the flight be delayed: we track it and adjust the pickup automatically. You look after the child – we look after the rest.",
        ]},
      ],
    },
  },

  // 8 ─────────────────────────────────────────────────────────
  {
    slug: "zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun",
    date: "2026-07-23",
    img: "/gallery/2.jpg",
    de: {
      title: "Zwischenlandung in Zürich: Was Sie bei 4 bis 8 Stunden Aufenthalt am Flughafen unternehmen können",
      excerpt: "Gepäck einlagern, in die Stadt fahren, den See sehen und rechtzeitig zurück sein: Ein realistischer Zeitplan für lange Layovers am Flughafen Zürich – mit und ohne Fahrer.",
      body: [
        { p: [
          "Zürich ist ein beliebter Umsteigeflughafen, und viele Reisende haben zwischen zwei Flügen mehrere Stunden Zeit. Die Frage «Lohnt es sich, in die Stadt zu fahren?» lässt sich klar beantworten: Ab etwa vier Stunden Aufenthalt ja – wenn Sie die Zeit richtig planen. Dieser Guide zeigt, was in welchem Zeitfenster realistisch ist und wie Sie das Risiko ausschliessen, den Anschlussflug zu verpassen.",
        ]},
        { h: "Zuerst die Rechnung: Wie viel Zeit haben Sie wirklich?", p: [
          "Ziehen Sie von Ihrer Aufenthaltsdauer ab: die Zeit vom Ausstieg bis zur Ankunftshalle, eventuell die Passkontrolle bei Nicht-Schengen-Flügen, und am Ende mindestens die Zeit, die Ihre Airline für das erneute Boarding verlangt – bei internationalen Flügen meist deutlich mehr als eine Stunde vor Abflug. Übrig bleibt Ihr Zeitfenster für die Stadt. Bei vier Stunden Aufenthalt sind das etwa zwei Stunden, bei sechs Stunden rund vier, bei acht Stunden ein ganzer Nachmittag.",
        ]},
        { h: "Gepäck: einlagern oder mitnehmen?", p: [
          "Bei einem durchgecheckten Anschlussflug bleibt Ihr Koffer im System, und Sie sind nur mit Handgepäck unterwegs. Wenn Sie das Gepäck abholen müssen, nutzen Sie die Gepäckaufbewahrung am Flughafen oder – bequemer – lassen Sie es im Transferfahrzeug. Ihr Chauffeur bleibt während des Stadtaufenthalts bei Ihnen; Koffer und Mäntel bleiben im Kofferraum, Sie gehen mit leeren Händen.",
        ]},
        { h: "Zwei Stunden: Zürichsee und Altstadt", p: [
          "Mit einem Fahrer erreichen Sie das Seebecken in wenigen Minuten. Ein Spaziergang am Bürkliplatz, ein Blick über den See zu den Alpen, ein Kaffee in der Altstadt – und zurück. Das ist keine Stadtbesichtigung, aber ein echter Eindruck von Zürich, und er ist in zwei Stunden ohne Hektik machbar, weil das Fahrzeug wartet und Sie nicht auf einen Zug angewiesen sind.",
        ]},
        { h: "Vier Stunden: Zürich richtig sehen", p: [
          "Jetzt lohnt sich die Runde: Grossmünster und Fraumünster, die Bahnhofstrasse, ein Mittagessen am Wasser, vielleicht der Lindenhof mit Blick über die Limmat. Mit unserer Stundenbuchung steht Ihnen Fahrzeug und Chauffeur für die gewünschte Dauer zur Verfügung – Sie steigen aus, wo Sie möchten, und ein, wenn Sie weiter wollen. Kein Parkplatz-Suchen, keine Fahrpläne.",
        ]},
        { h: "Sechs bis acht Stunden: Rheinfall oder Zug", p: [
          "Mit einem halben Tag wird sogar ein Ausflug ausserhalb der Stadt möglich. Der Rheinfall bei Schaffhausen, Europas grösster Wasserfall, liegt auf unserer festen Strecke nach Schaffhausen und ist vom Flughafen aus in unter einer Stunde erreicht. Die Altstadt von Zug am gleichnamigen See ist eine ruhigere Alternative. In beiden Fällen bringt Sie der Fahrer rechtzeitig zurück – und rechtzeitig heisst: mit der Reserve, die Sie vorher gemeinsam festgelegt haben.",
        ]},
        { h: "So bleibt der Anschlussflug sicher", p: [
          "Legen Sie mit dem Fahrer eine feste Rückkehrzeit am Flughafen fest und halten Sie sie ein. Behalten Sie die Bordkarte des Anschlussflugs bei sich. Und buchen Sie den Ausflug im Voraus, damit der Fahrer bei der Landung bereitsteht – bei einem Layover zählt jede Viertelstunde. Mit dieser Planung wird aus einer langen Wartezeit ein kurzer Besuch in einer der schönsten Städte Europas.",
        ]},
      ],
    },
    en: {
      title: "Layover in Zurich: What to Do With 4 to 8 Hours at the Airport",
      excerpt: "Store the luggage, head into the city, see the lake and be back on time: a realistic schedule for long layovers at Zurich Airport – with and without a driver.",
      body: [
        { p: [
          "Zurich is a popular transfer airport, and many travellers have several hours between two flights. The question \"Is it worth going into the city?\" has a clear answer: from around four hours yes – if you plan the time properly. This guide shows what is realistic in which time window and how to rule out the risk of missing the connecting flight.",
        ]},
        { h: "First the maths: how much time do you really have?", p: [
          "Subtract from your layover: the time from leaving the aircraft to the arrivals hall, possibly passport control on non-Schengen flights, and at the end at least the time your airline requires for re-boarding – on international flights usually well over an hour before departure. What remains is your window for the city. With a four-hour layover that is roughly two hours, with six hours around four, with eight hours a whole afternoon.",
        ]},
        { h: "Luggage: store it or take it along?", p: [
          "With a through-checked connection your suitcase stays in the system, and you travel with hand luggage only. If you have to collect your luggage, use the left-luggage service at the airport or – more conveniently – leave it in the transfer vehicle. Your chauffeur stays with you during the city visit; suitcases and coats remain in the boot, you walk with empty hands.",
        ]},
        { h: "Two hours: Lake Zurich and the old town", p: [
          "With a driver you reach the lake basin in a few minutes. A stroll at Bürkliplatz, a view across the lake to the Alps, a coffee in the old town – and back. That is not a sightseeing tour, but a genuine impression of Zurich, and it is doable in two hours without rush, because the vehicle waits and you do not depend on a train.",
        ]},
        { h: "Four hours: seeing Zurich properly", p: [
          "Now the full round pays off: Grossmünster and Fraumünster, Bahnhofstrasse, lunch by the water, perhaps the Lindenhof with its view over the Limmat. With our hourly booking, vehicle and chauffeur are at your disposal for the desired duration – you get out where you like and get in when you want to move on. No parking search, no timetables.",
        ]},
        { h: "Six to eight hours: Rhine Falls or Zug", p: [
          "With half a day, even an excursion outside the city becomes possible. The Rhine Falls near Schaffhausen, Europe's largest waterfall, lie on our fixed route to Schaffhausen and are reached from the airport in under an hour. The old town of Zug on the lake of the same name is a quieter alternative. In both cases the driver brings you back on time – and on time means: with the reserve you agreed together beforehand.",
        ]},
        { h: "Keeping the connecting flight safe", p: [
          "Agree a fixed return time at the airport with the driver and stick to it. Keep the boarding pass of the connecting flight with you. And book the excursion in advance so that the driver is ready when you land – on a layover, every quarter of an hour counts. With this planning, a long wait becomes a short visit to one of Europe's most beautiful cities.",
        ]},
      ],
    },
  },

  // 9 ─────────────────────────────────────────────────────────
  {
    slug: "wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen",
    date: "2026-07-16",
    img: "/gallery/18.jpg",
    de: {
      title: "Wann losfahren? So berechnen Sie die richtige Abholzeit zum Flughafen Zürich aus Basel, Luzern, Bern und den Bergen",
      excerpt: "Fahrzeit, Stosszeiten, Winterwetter, Check-in-Fristen: Eine ehrliche Rechnung, wie viel Vorlauf Sie für den Weg zum Flughafen einplanen sollten – Strecke für Strecke.",
      body: [
        { p: [
          "Die Anreise zum Flughafen ist die einzige Etappe der Reise, bei der zu früh sein nichts kostet und zu spät sein alles. Trotzdem wird die Abholzeit oft nach Gefühl gewählt. Dieser Beitrag rechnet vor, wie sich eine verlässliche Abholzeit zusammensetzt, und nennt für unsere wichtigsten Strecken die Fahrzeiten, mit denen wir planen.",
        ]},
        { h: "Die Formel: Abflug minus Check-in minus Fahrzeit minus Puffer", p: [
          "Beginnen Sie mit der Abflugzeit. Ziehen Sie die Zeit ab, die Ihre Airline für Check-in und Sicherheitskontrolle empfiehlt – bei europäischen Flügen meist rund zwei Stunden, bei Langstrecke und Nicht-Schengen-Zielen eher drei. Ziehen Sie dann die reine Fahrzeit ab. Und fügen Sie einen Puffer hinzu, der zur Tageszeit und zur Jahreszeit passt. Das Ergebnis ist Ihre Abholzeit – nicht die Zeit, zu der Sie «ungefähr» aufbrechen möchten.",
        ]},
        { h: "Fahrzeiten, mit denen wir planen", p: [
          "Winterthur: rund 36 Minuten. Zug: rund 55 Minuten. Schaffhausen: rund eine Stunde. Luzern: rund 1 Stunde 15 Minuten. St. Gallen: rund 1 Stunde 40 Minuten. Basel: rund 1 Stunde 45 Minuten. Bern: rund 2 Stunden 20 Minuten. Interlaken: rund 2 Stunden 30 Minuten. Davos: rund 3 Stunden 15 Minuten. St. Moritz: rund 4 Stunden 15 Minuten. Zermatt (bis Täsch): rund 4 Stunden 45 Minuten. Diese Werte gelten bei normalem Verkehr; die Details finden Sie auf unseren Streckenseiten.",
        ]},
        { h: "Stosszeiten rund um Zürich", p: [
          "Der Grossraum Zürich ist werktags morgens zwischen etwa 6:30 und 9:00 Uhr sowie abends zwischen 16:30 und 19:00 Uhr dicht befahren. Die Zufahrten zum Flughafen über die Nordumfahrung und den Gubrist-Tunnel sind die neuralgischen Punkte. Wer aus Basel oder Bern zu einem Morgenflug anreist, sollte für diese Zeitfenster 20 bis 30 Minuten zusätzlich einplanen. Unsere Fahrer kennen die Ausweichrouten, aber auch sie können einen Unfall auf der A1 nicht wegzaubern.",
        ]},
        { h: "Winter und Berge: der grösste Unsicherheitsfaktor", p: [
          "Von Dezember bis März verlängern Schneefall, Räumung und Kolonnenverkehr die Fahrzeiten aus Davos, St. Moritz, Grindelwald oder Engelberg spürbar. An Samstagen in der Hochsaison, wenn die Skigebiete wechseln, kommt Reiseverkehr dazu. Unsere Empfehlung für Bergstrecken im Winter: mindestens 45 Minuten Puffer auf die Normalfahrzeit, bei angekündigtem Schneefall eine Stunde. Ein früherer Start kostet Sie einen Kaffee am Flughafen; ein späterer kostet unter Umständen den Flug.",
        ]},
        { h: "Warum die Abholzeit bei uns verlässlich ist", p: [
          "Ihr Fahrer steht zur vereinbarten Zeit an Ihrer Adresse – nicht «gleich» und nicht «in zehn Minuten», sondern zur Minute. Er fährt die Strecke regelmässig, kennt Baustellen und Umleitungen und wählt die Route, die an diesem Tag die schnellste ist. Sie steigen an der Haustür ein und am Abflugterminal aus. Wenn Sie unsicher sind, welche Abholzeit für Ihren Flug sinnvoll ist, schreiben Sie uns Flugnummer und Adresse – wir schlagen Ihnen eine Zeit vor, die nachts gut schlafen lässt.",
        ]},
      ],
    },
    en: {
      title: "When to Leave? Calculating the Right Pickup Time to Zurich Airport From Basel, Lucerne, Bern and the Mountains",
      excerpt: "Driving time, rush hours, winter weather, check-in deadlines: an honest calculation of how much lead time to plan for the journey to the airport – route by route.",
      body: [
        { p: [
          "The journey to the airport is the only leg of a trip where being early costs nothing and being late costs everything. Yet the pickup time is often chosen by gut feeling. This article works out what a reliable pickup time consists of and lists, for our most important routes, the driving times we plan with.",
        ]},
        { h: "The formula: departure minus check-in minus driving time minus buffer", p: [
          "Start with the departure time. Subtract the time your airline recommends for check-in and security – usually around two hours for European flights, closer to three for long-haul and non-Schengen destinations. Then subtract the pure driving time. And add a buffer that matches the time of day and the season. The result is your pickup time – not the time you would \"roughly\" like to set off.",
        ]},
        { h: "Driving times we plan with", p: [
          "Winterthur: around 36 minutes. Zug: around 55 minutes. Schaffhausen: around one hour. Lucerne: around 1 hour 15 minutes. St. Gallen: around 1 hour 40 minutes. Basel: around 1 hour 45 minutes. Bern: around 2 hours 20 minutes. Interlaken: around 2 hours 30 minutes. Davos: around 3 hours 15 minutes. St. Moritz: around 4 hours 15 minutes. Zermatt (to Täsch): around 4 hours 45 minutes. These values apply in normal traffic; you find the details on our route pages.",
        ]},
        { h: "Rush hours around Zurich", p: [
          "Greater Zurich is congested on weekdays roughly between 6:30 and 9:00 in the morning and between 16:30 and 19:00 in the evening. The approaches to the airport via the northern bypass and the Gubrist tunnel are the critical points. Anyone travelling from Basel or Bern for a morning flight should allow an extra 20 to 30 minutes in these windows. Our drivers know the alternative routes, but even they cannot conjure away an accident on the A1.",
        ]},
        { h: "Winter and mountains: the biggest uncertainty", p: [
          "From December to March, snowfall, clearing and column traffic noticeably extend driving times from Davos, St. Moritz, Grindelwald or Engelberg. On Saturdays in high season, when the ski resorts change over, holiday traffic is added. Our recommendation for mountain routes in winter: at least 45 minutes of buffer on the normal driving time, one hour when snowfall is forecast. An earlier start costs you a coffee at the airport; a later one may cost the flight.",
        ]},
        { h: "Why the pickup time is reliable with us", p: [
          "Your driver is at your address at the agreed time – not \"shortly\" and not \"in ten minutes\", but to the minute. He drives the route regularly, knows roadworks and diversions and chooses the route that is fastest on that day. You get in at your front door and out at the departures terminal. If you are unsure which pickup time makes sense for your flight, send us flight number and address – we suggest a time that lets you sleep well the night before.",
        ]},
      ],
    },
  },

  // 10 ────────────────────────────────────────────────────────
  {
    slug: "taxi-flughafen-zuerich-finden-kosten-alternativen",
    date: "2026-07-09",
    img: "/gallery/3.jpg",
    de: {
      title: "Taxi am Flughafen Zürich: Wo Sie es finden, wie der Preis entsteht – und wann ein Festpreis-Transfer die bessere Wahl ist",
      excerpt: "Taxistand, Taxameter, Zuschläge und Wartezeit: Wie das Taxi ab Kloten funktioniert, welche Nachteile es auf längeren Strecken hat und was ein vorab gebuchter Transfer anders macht.",
      body: [
        { p: [
          "Das Taxi ist die naheliegendste Wahl nach der Landung – man geht hinaus, steigt ein, fährt los. Für kurze Strecken in die Stadt ist das oft auch vernünftig. Auf längeren Wegen nach Luzern, Basel, Bern oder in die Berge zeigen sich jedoch die Grenzen des Systems. Dieser Beitrag erklärt, wie das Taxi am Flughafen Zürich funktioniert, welche Fragen Sie vorher klären sollten und wann ein vorab gebuchter Transfer die bessere Entscheidung ist.",
        ]},
        { h: "Wo Sie den Taxistand finden", p: [
          "Die Taxistände liegen unmittelbar vor den Ankunftsbereichen – Sie verlassen die Ankunftshalle und folgen der Beschilderung «Taxi». Tagsüber stehen in der Regel ausreichend Fahrzeuge bereit; am späten Abend, bei mehreren gleichzeitigen Landungen oder bei schlechtem Wetter bilden sich Schlangen. Die Wartezeit lässt sich nicht vorhersagen, und ein Fahrzeug mit Platz für sieben Personen oder mit Kindersitz ist am Stand nicht garantiert.",
        ]},
        { h: "Wie der Taxipreis entsteht", p: [
          "Taxis in Zürich fahren nach Taxameter: eine Grundgebühr plus ein Betrag pro gefahrenem Kilometer plus Zeit im Stau. Nachts und an Sonn- und Feiertagen gelten andere Tarife, und je nach Anbieter können Zuschläge für Gepäck oder zusätzliche Passagiere anfallen. Der entscheidende Punkt: Sie wissen den Endpreis erst, wenn Sie angekommen sind. Für eine Fahrt in die Innenstadt ist die Spanne überschaubar. Für eine Fahrt nach Bern oder Davos ist sie es nicht – hier sollten Sie den Preis vor der Abfahrt ausdrücklich vereinbaren und sich bestätigen lassen.",
          "Wir nennen hier bewusst keine Taxitarife: Sie unterscheiden sich je nach Unternehmen, Uhrzeit und Route und ändern sich regelmässig. Fragen Sie am Stand nach dem Tarif oder einem Festbetrag, bevor Sie einsteigen.",
        ]},
        { h: "Was ein Festpreis-Transfer anders macht", p: [
          "Bei einem vorab gebuchten Transfer steht der Preis fest, bevor Sie abfliegen – pro Fahrzeug, unabhängig von Uhrzeit, Stau oder Umweg. Auf unseren Streckenseiten sehen Sie ihn transparent: jede Strecke – ob Winterthur, Zug, Luzern oder Basel – zum Festpreis nach Kilometertarif, pro Fahrzeug und für jede Klasse einzeln ausgewiesen. Im Preis enthalten sind Meet & Greet in der Ankunftshalle, 60 Minuten Wartezeit nach der Landung, Flugverfolgung und Kindersitze. Es gibt keine Gepäckgebühr; nachts (00–06 Uhr) gilt ein Nachttarif von 20 %, der vor der Buchung sichtbar ist.",
          "Dazu kommt die Planbarkeit: Ihr Chauffeur ist da, wenn Sie landen, mit dem Fahrzeug, das Sie gebucht haben. Sie wählen vorher, ob Sie zu zweit in der E-Klasse, zu siebt in der V-Klasse oder zu dritt in der S-Klasse reisen. Und Sie erhalten eine Rechnung mit ausgewiesener Mehrwertsteuer – für Geschäftsreisende oft der ausschlaggebende Punkt.",
        ]},
        { h: "Wann das Taxi trotzdem sinnvoll ist", p: [
          "Für spontane, kurze Fahrten in die Stadt am Tag, ohne viel Gepäck und ohne Kinder, ist das Taxi vom Stand eine gute Option. Sobald eine der folgenden Bedingungen zutrifft, lohnt sich die Vorabbuchung: Sie reisen zu mehr als vier Personen, Sie haben Skiausrüstung oder Sondergepäck, Sie landen spät abends oder nachts, Ihr Ziel liegt ausserhalb des Kantons Zürich, oder Sie möchten den Preis vorher kennen. In diesen Fällen ist der Festpreis-Transfer nicht nur bequemer, sondern in aller Regel auch die wirtschaftlichere Wahl.",
        ]},
      ],
    },
    en: {
      title: "Taxi at Zurich Airport: Where to Find One, How the Fare Is Made Up – and When a Fixed-Price Transfer Is the Better Choice",
      excerpt: "Taxi rank, meter, surcharges and waiting: how the taxi from Kloten works, where it falls short on longer journeys and what a pre-booked transfer does differently.",
      body: [
        { p: [
          "The taxi is the most obvious choice after landing – you walk out, get in, drive off. For short journeys into the city that is often reasonable. On longer routes to Lucerne, Basel, Bern or the mountains, however, the limits of the system show. This article explains how the taxi at Zurich Airport works, which questions you should clarify beforehand and when a pre-booked transfer is the better decision.",
        ]},
        { h: "Where to find the taxi rank", p: [
          "The taxi ranks are right outside the arrivals areas – you leave the arrivals hall and follow the \"Taxi\" signs. During the day there are usually enough vehicles; late in the evening, when several flights land at once or in bad weather, queues form. The waiting time cannot be predicted, and a vehicle with room for seven people or with a child seat is not guaranteed at the rank.",
        ]},
        { h: "How the taxi fare is made up", p: [
          "Taxis in Zurich run on the meter: a base fare plus an amount per kilometre driven plus time spent in traffic. At night and on Sundays and public holidays different tariffs apply, and depending on the operator there may be surcharges for luggage or additional passengers. The crucial point: you only know the final fare when you have arrived. For a ride into the city centre the range is manageable. For a ride to Bern or Davos it is not – here you should explicitly agree the fare before departure and have it confirmed.",
          "We deliberately do not quote taxi tariffs here: they differ by company, time of day and route and change regularly. Ask at the rank for the tariff or a fixed amount before you get in.",
        ]},
        { h: "What a fixed-price transfer does differently", p: [
          "With a pre-booked transfer the price is fixed before you depart – per vehicle, regardless of time of day, traffic or detours. On our route pages you see it transparently: every route – whether Winterthur, Zug, Lucerne or Basel – at a fixed price by kilometre tariff, per vehicle and shown separately for each class. Included in the price are meet & greet in the arrivals hall, 60 minutes of waiting time after landing, flight tracking and child seats. There is no luggage fee; at night (midnight to 6 am) a night tariff of 20 % applies and is visible before booking.",
          "Add to that predictability: your chauffeur is there when you land, with the vehicle you booked. You choose in advance whether to travel as a couple in the E-Class, as a group of seven in the V-Class or as three in the S-Class. And you receive an invoice with VAT shown – for business travellers often the deciding factor.",
        ]},
        { h: "When the taxi still makes sense", p: [
          "For spontaneous, short daytime rides into the city, without much luggage and without children, the taxi from the rank is a good option. As soon as one of the following applies, pre-booking pays off: you travel with more than four people, you have ski equipment or special luggage, you land late in the evening or at night, your destination is outside the canton of Zurich, or you want to know the price in advance. In these cases the fixed-price transfer is not only more convenient but as a rule also the more economical choice.",
        ]},
      ],
    },
  },
];
