// ─────────────────────────────────────────────────────────────
//  SSS — ek soru grupları (mevcut 8 soru i18n.ts'te değişmeden kalır ve ilk grup olarak gösterilir).
//  En çok aranan konular: fiyat/mesafe, gece tarifesi, ödeme, buluşma, bekleme, iptal/iade,
//  araç/bagaj, çocuk, evcil hayvan, sınır ötesi, saatlik, kurumsal, otofrei hedefler.
//  Tüm gruplar FAQPage şemasına girer.
// ─────────────────────────────────────────────────────────────
export type FaqGroup = { title: string; list: [string, string][] };

export const faqGroups: Record<"de" | "en", FaqGroup[]> = {
  de: [
    {
      title: "Preise & Zahlung",
      list: [
        ["Wie wird der Preis berechnet?", "Nach Kilometertarif: ein Grundpreis nach Distanz plus gefahrene Kilometer × Kilometerpreis der Fahrzeugklasse (Business Class CHF 2.80, Business & Family Class CHF 3.40, Premium Class CHF 5.50 pro km). Die Distanz wird bei der Buchung aus der tatsächlichen Fahrstrecke ermittelt. Der Preis gilt pro Fahrzeug, inkl. MwSt."],
        ["Was kostet ein Taxi vom Flughafen Zürich in die Stadt?", "Das hängt von der genauen Adresse ab; für Zürich-Innenstadt liegt die Business Class beim Mindestpreis von CHF 83, die Business & Family Class bei CHF 87. Geben Sie Ihre Adresse im Buchungsassistenten ein – der Festpreis erscheint sofort, ohne Anmeldung."],
        ["Gibt es einen Mindestpreis?", "Ja: Business Class CHF 83, Business & Family Class CHF 87, Premium Class CHF 80. Liegt der berechnete Kilometerpreis darunter, gilt der Mindestpreis."],
        ["Gibt es einen Nachtzuschlag?", "Zwischen 00:00 und 06:00 Uhr gilt ein Nachttarif von 20 % (Stundenbuchungen 30 %). Er wird bei der Buchung sofort im Preis angezeigt. Tagsüber, am Wochenende und an Feiertagen gibt es keine Zuschläge."],
        ["Kann ich online bezahlen?", "Ja, sicher über Stripe mit Kreditkarte, TWINT, Apple Pay oder Google Pay – direkt im letzten Buchungsschritt. Alternativ bezahlen Sie im Fahrzeug bar, mit Karte oder TWINT."],
        ["Bekomme ich eine Rechnung mit Mehrwertsteuer?", "Ja, automatisch per E-Mail für jede Fahrt: mit Buchungsreferenz, Strecke, Betrag netto, MwSt. und brutto. Firmenkunden erhalten auf Wunsch eine monatliche Sammelrechnung."],
        ["Wie schnell bekomme ich mein Geld bei einer Stornierung zurück?", "Bei Stornierung bis 24 Stunden vorher oder wenn wir eine Anfrage ablehnen, wird eine Online-Zahlung automatisch vollständig zurückerstattet. Je nach Bank ist der Betrag innerhalb von 3 bis 10 Werktagen sichtbar."],
        ["Ist der Preis pro Person oder pro Fahrzeug?", "Pro Fahrzeug – ob eine Person in der E-Klasse sitzt oder sieben in der V-Klasse. Gepäck, Kindersitze, Meet & Greet und Wartezeit sind enthalten."],
      ],
    },
    {
      title: "Am Flughafen",
      list: [
        ["Wo genau wartet der Fahrer – Ankunft 1 oder Ankunft 2?", "In der öffentlichen Ankunftshalle direkt hinter dem Ausgang aus der Gepäckausgabe, mit Namensschild. Anhand Ihrer Flugnummer wissen wir, ob Sie über Ankunft 1 (meist Schengen) oder Ankunft 2 (meist Nicht-Schengen) kommen. Gehen Sie nicht zum Taxistand."],
        ["Wie lange wartet der Fahrer nach der Landung?", "60 Minuten nach der tatsächlichen Landung sind im Preis enthalten – genug für Passkontrolle, Gepäck und einen Kaffee. Dauert es länger, genügt eine kurze WhatsApp-Nachricht."],
        ["Was passiert, wenn mein Flug annulliert wird?", "Sie stornieren bis 24 Stunden vorher kostenlos. Bei kurzfristigen Annullierungen kontaktieren Sie uns bitte direkt – wir buchen auf den Ersatzflug um oder finden eine faire Lösung."],
        ["Fahren Sie auch nachts nach der letzten Landung?", "Ja, rund um die Uhr. Bitte buchen Sie Nachtfahrten im Voraus: Anfragen, die zwischen 23:00 und 06:00 Uhr eingehen und innerhalb der nächsten zwei Stunden starten sollen, können wir online nicht annehmen – dann helfen wir per WhatsApp."],
        ["Wie früh sollte ich für die Rückfahrt zum Flughafen abgeholt werden?", "Abflug minus Check-in-Frist (Europa ca. 2 Stunden, Langstrecke ca. 3) minus Fahrzeit minus Puffer. Zu Stosszeiten rund um Zürich 20–30 Minuten Puffer, auf Bergstrecken im Winter 45–60 Minuten. Schicken Sie uns Flugnummer und Adresse – wir schlagen eine Zeit vor."],
        ["Kann ich einen Gast abholen lassen?", "Ja. Tragen Sie den Namen des Gastes und auf Wunsch Ihren Firmennamen für das Namensschild ein; die Bestätigung und Rechnung gehen an Ihre E-Mail-Adresse."],
      ],
    },
    {
      title: "Fahrzeuge & Gepäck",
      list: [
        ["Welche Fahrzeuge haben Sie?", "Business Class: Mercedes-Benz E-Klasse, bis 2 Personen und 2 Koffer. Business & Family Class: Mercedes-Benz V-Klasse, bis 7 Personen und 7 Koffer. Premium Class: Mercedes-Benz S-Klasse, bis 3 Personen und 3 Koffer. Handgepäck zählt in der Regel nicht mit."],
        ["Wir sind 5 bis 7 Personen – passt das in ein Fahrzeug?", "Ja, in die Business & Family Class (V-Klasse) mit bis zu 7 Koffern. Zählen Sie das aufgegebene Gepäck ehrlich: mehr Koffer als Personen ist ein Zeichen für die grössere Klasse oder ein zweites Fahrzeug."],
        ["Nehmen Sie Hunde und Katzen mit?", "Ja, ohne Aufpreis – in einer Transportbox oder mit Sicherheitsgurt-Geschirr. Grosse Hunde in der Frachtbox reisen in der V-Klasse. Geben Sie das Tier bei der Buchung im Notizfeld an."],
        ["Passt ein Kinderwagen oder Golfgepäck?", "Ein zusammenklappbarer Buggy passt in jede Klasse; ein grosser Kombi-Kinderwagen, mehrere Golfbags oder Fahrräder gehören in die V-Klasse. Sperriges bitte im Notizfeld anmelden, damit der Laderaum vorbereitet ist."],
        ["Sind die Fahrzeuge für den Winter ausgerüstet?", "Ja. Winterreifen, Schneeketten bei Bedarf und Chauffeure, die Pässe, Autoverladungen und Ausweichrouten kennen – für Davos, St. Moritz, das Engadin und das Berner Oberland."],
      ],
    },
    {
      title: "Strecken & Ziele",
      list: [
        ["Fahren Sie überall hin – auch nach Deutschland, Frankreich, Österreich oder Italien?", "Ja. Geben Sie jede Adresse in der Schweiz oder im Ausland ein; der Preis wird nach Kilometertarif berechnet. Grenzübertritte sind ohne Umsteigen möglich; halten Sie Ausweis oder Reisepass bereit."],
        ["Wie lange dauert die Fahrt nach Luzern, Basel oder Bern?", "Bei normalem Verkehr: Luzern rund 75 Minuten, Basel rund 1 Stunde 45, Bern rund 2 Stunden 20. Davos rund 3 Stunden 15, St. Moritz rund 4 Stunden 15, Zermatt (bis Täsch) rund 4 Stunden 45."],
        ["Zermatt und Wengen sind autofrei – wie funktioniert der Transfer?", "Der Transfer endet an der Talstation: für Zermatt in Täsch (Shuttle-Zug in wenigen Minuten), für Wengen in Lauterbrunnen (Zahnradbahn). Der Fahrer hilft mit dem Gepäck bis zum Zug."],
        ["Kann ich Zwischenstopps einbauen?", "Ja, bis zu drei Zwischenstopps im Buchungsformular; die Distanz und damit der Preis werden entsprechend berechnet. Für längere Aufenthalte unterwegs ist die Stundenbuchung die passende Form."],
        ["Bieten Sie Stundenbuchungen an?", "Ja: erste Stunde CHF 80, jede weitere CHF 72, inklusive 25 km pro Stunde; bei längeren Strecken gilt der Kilometerpreis der Klasse. Ideal für Stadttouren, Termine, Events und Ausflüge mit Wartezeit."],
        ["Kann ich auch die Rückfahrt zum Flughafen buchen?", "Ja, zum gleichen Kilometertarif. Wählen Sie Ihre Adresse als Abholort und den Flughafen als Ziel – am besten direkt nach der Hinfahrt, dann ist beides fixiert."],
      ],
    },
    {
      title: "Buchung & Service",
      list: [
        ["Wie weit im Voraus muss ich buchen?", "Für Tagesfahrten reichen oft wenige Stunden; für Nachtlandungen, Wechselsamstage im Winter, Messewochen und das WEF empfehlen wir die Buchung, sobald der Flug feststeht."],
        ["Bekomme ich eine Bestätigung?", "Ja. Nach der Buchung erhalten Sie eine Eingangsbestätigung, nach unserer Prüfung eine Buchungsbestätigung per E-Mail in Ihrer Sprache – mit Strecke, Fahrzeug, Zeit und Referenz."],
        ["Wie erreiche ich Sie kurzfristig?", "Rund um die Uhr per WhatsApp oder Telefon unter +41 76 496 13 24, per E-Mail an info@zrhairporttaxi.ch. Die Nummer steht auch in jeder Bestätigung."],
        ["Kann ich meine Buchung ändern?", "Bis 24 Stunden vor der Abholung ändern Sie Zeit, Adresse oder Fahrzeugklasse nach Verfügbarkeit kostenlos – per Antwort auf die Bestätigung oder per WhatsApp mit Ihrer Referenz."],
        ["Ist Trinkgeld üblich?", "Freiwillig. Der Service ist im Preis enthalten; wer möchte, gibt dem Fahrer bar einen kleinen Betrag. Eine Google-Bewertung freut uns ebenso."],
        ["Was ist der Unterschied zu einem Taxi vom Stand?", "Fester Preis vor der Fahrt statt Taxameter, Chauffeur mit Namensschild in der Halle statt Warteschlange, Flugverfolgung, Kindersitze, Rechnung mit MwSt. – und das gewünschte Fahrzeug garantiert."],
      ],
    },
  ],
  en: [
    {
      title: "Prices & payment",
      list: [
        ["How is the price calculated?", "By kilometre tariff: a base fare by distance plus kilometres driven × the class kilometre rate (Business Class CHF 2.80, Business & Family Class CHF 3.40, Premium Class CHF 5.50 per km). The distance is determined at booking from the actual driving route. The price is per vehicle, incl. VAT."],
        ["How much is a taxi from Zurich Airport to the city?", "It depends on the exact address; for central Zurich the Business Class is at the minimum fare of CHF 83, the Business & Family Class at CHF 87. Enter your address in the booking assistant – the fixed price appears immediately, no sign-up needed."],
        ["Is there a minimum fare?", "Yes: Business Class CHF 83, Business & Family Class CHF 87, Premium Class CHF 80. If the calculated kilometre price is lower, the minimum fare applies."],
        ["Is there a night surcharge?", "Between midnight and 6 am a night tariff of 20 % applies (hourly bookings 30 %). It is shown in the price immediately when booking. Daytime, weekends and public holidays carry no surcharges."],
        ["Can I pay online?", "Yes, securely via Stripe with credit card, TWINT, Apple Pay or Google Pay – right in the last booking step. Alternatively pay in the vehicle by cash, card or TWINT."],
        ["Do I get an invoice with VAT?", "Yes, automatically by email for every journey: with booking reference, route, net amount, VAT and gross amount. Corporate clients can receive a monthly consolidated invoice on request."],
        ["How quickly do I get my money back after a cancellation?", "For cancellations up to 24 hours before, or if we decline a request, an online payment is refunded automatically in full. Depending on your bank the amount is visible within 3 to 10 business days."],
        ["Is the price per person or per vehicle?", "Per vehicle – whether one person sits in the E-Class or seven in the V-Class. Luggage, child seats, meet & greet and waiting time are included."],
      ],
    },
    {
      title: "At the airport",
      list: [
        ["Where exactly does the driver wait – Arrival 1 or Arrival 2?", "In the public arrivals hall right behind the exit from baggage claim, holding a name sign. Your flight number tells us whether you come through Arrival 1 (mostly Schengen) or Arrival 2 (mostly non-Schengen). Do not go to the taxi rank."],
        ["How long does the driver wait after landing?", "60 minutes after the actual landing are included – enough for passport control, luggage and a coffee. If it takes longer, a short WhatsApp message is enough."],
        ["What happens if my flight is cancelled?", "You cancel free of charge up to 24 hours before. For short-notice cancellations please contact us directly – we rebook to the replacement flight or find a fair solution."],
        ["Do you also drive at night after the last landing?", "Yes, around the clock. Please book night journeys in advance: requests received between 11 pm and 6 am for journeys starting within the next two hours cannot be accepted online – we then help via WhatsApp."],
        ["How early should I be picked up for the return to the airport?", "Departure minus check-in deadline (Europe about 2 hours, long-haul about 3) minus driving time minus buffer. At rush hours around Zurich 20–30 minutes of buffer, on mountain routes in winter 45–60 minutes. Send us flight number and address – we suggest a time."],
        ["Can I have a guest collected?", "Yes. Enter the guest's name and, if you wish, your company name for the name sign; confirmation and invoice go to your email address."],
      ],
    },
    {
      title: "Vehicles & luggage",
      list: [
        ["Which vehicles do you have?", "Business Class: Mercedes-Benz E-Class, up to 2 people and 2 suitcases. Business & Family Class: Mercedes-Benz V-Class, up to 7 people and 7 suitcases. Premium Class: Mercedes-Benz S-Class, up to 3 people and 3 suitcases. Hand luggage does not usually count."],
        ["We are 5 to 7 people – does that fit in one vehicle?", "Yes, in the Business & Family Class (V-Class) with up to 7 suitcases. Count checked luggage honestly: more suitcases than people is a sign for the larger class or a second vehicle."],
        ["Do you take dogs and cats?", "Yes, at no extra charge – in a carrier or with a seat-belt harness. Large dogs in a hold crate travel in the V-Class. State the animal in the remarks field when booking."],
        ["Does a pushchair or golf luggage fit?", "A folding buggy fits in every class; a large travel-system pram, several golf bags or bicycles belong in the V-Class. Please mention bulky items in the remarks field so the load space is prepared."],
        ["Are the vehicles equipped for winter?", "Yes. Winter tyres, snow chains when needed and chauffeurs who know passes, car-trains and alternative routes – for Davos, St. Moritz, the Engadin and the Bernese Oberland."],
      ],
    },
    {
      title: "Routes & destinations",
      list: [
        ["Do you go anywhere – including Germany, France, Austria or Italy?", "Yes. Enter any address in Switzerland or abroad; the price is calculated by kilometre tariff. Border crossings are possible without changing vehicles; keep your ID card or passport ready."],
        ["How long does the drive to Lucerne, Basel or Bern take?", "In normal traffic: Lucerne around 75 minutes, Basel around 1 hour 45, Bern around 2 hours 20. Davos around 3 hours 15, St. Moritz around 4 hours 15, Zermatt (to Täsch) around 4 hours 45."],
        ["Zermatt and Wengen are car-free – how does the transfer work?", "The transfer ends at the valley station: for Zermatt in Täsch (shuttle train in a few minutes), for Wengen in Lauterbrunnen (cog railway). The driver helps with the luggage to the train."],
        ["Can I add stops on the way?", "Yes, up to three stops in the booking form; distance and therefore price are calculated accordingly. For longer stays on the way, the hourly booking is the right format."],
        ["Do you offer hourly bookings?", "Yes: first hour CHF 80, each additional hour CHF 72, including 25 km per hour; for longer distances the class kilometre rate applies. Ideal for city tours, appointments, events and excursions with waiting time."],
        ["Can I also book the return to the airport?", "Yes, at the same kilometre tariff. Choose your address as pickup and the airport as destination – ideally right after the outbound journey, so both are fixed."],
      ],
    },
    {
      title: "Booking & service",
      list: [
        ["How far in advance do I need to book?", "For daytime journeys a few hours are often enough; for night landings, changeover Saturdays in winter, trade-fair weeks and the WEF we recommend booking as soon as the flight is fixed."],
        ["Do I get a confirmation?", "Yes. After booking you receive an acknowledgement, and after our check a booking confirmation by email in your language – with route, vehicle, time and reference."],
        ["How do I reach you at short notice?", "Around the clock via WhatsApp or phone on +41 76 496 13 24, by email at info@zrhairporttaxi.ch. The number is also in every confirmation."],
        ["Can I change my booking?", "Up to 24 hours before pickup you can change time, address or vehicle class free of charge, subject to availability – by replying to the confirmation or via WhatsApp with your reference."],
        ["Is tipping customary?", "Voluntary. Service is included in the price; if you like, hand the driver a small amount in cash. A Google review makes us just as happy."],
        ["What is the difference to a taxi from the rank?", "Fixed price before the journey instead of a meter, chauffeur with a name sign in the hall instead of a queue, flight tracking, child seats, invoice with VAT – and the vehicle you want, guaranteed."],
      ],
    },
  ],
};
