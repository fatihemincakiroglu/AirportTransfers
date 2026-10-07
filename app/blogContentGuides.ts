// ─────────────────────────────────────────────────────────────
//  BLOG — Rehber serisi (havalimanı pratik bilgi, rotalar, sezon), DE/EN
//  Kendi transfer fiyatımız için rakam YOK (site kuralı); park/vinyet/pass gibi üçüncü taraf
//  fiyatları tarih ve kaynakla verilir. İç linkler [metin](/yol) biçiminde.
// ─────────────────────────────────────────────────────────────
import type { BlogPost } from "./blogContent";

export const guidePosts: BlogPost[] = [
  {
    slug: "lounges-flughafen-zuerich-zugang",
    date: "2026-10-07",
    img: "/hero/hero-3.jpg",
    de: {
      title: "Lounges am Flughafen Zürich: Welche es gibt, wie Sie hineinkommen und welche zu Ihrem Gate passt",
      seo: "Lounges am Flughafen Zürich: Zugang & Tipps",
      excerpt: "SWISS-Lounges, Aspire, Marhaba, Primeclass: Zürich hat eine der grössten Lounge-Auswahlen Europas. Welche Lounge in welchem Bereich liegt, wer mit Vielfliegerstatus, Kreditkarte oder Tagespass hineinkommt, warum das Gate entscheidet – und wie Sie die Zeit vor dem Abflug ohne Hektik nutzen.",
      body: [
        { p: [
          "Eine Lounge macht aus Wartezeit Erholung: ein ruhiger Platz, etwas zu essen, gutes WLAN, manchmal eine Dusche nach dem Nachtflug. Zürich ist als Drehkreuz der SWISS besonders gut ausgestattet – mit zahlreichen Airline-Lounges und mehreren unabhängigen Lounges, die auch ohne Business-Class-Ticket zugänglich sind.",
          "Dieser Guide erklärt, welche Lounges es gibt, wo sie liegen, wie Sie Zugang erhalten und worauf Sie achten sollten. Zugangsregeln und Preise ändern sich; prüfen Sie die Details vor der Reise auf der Website des Flughafens, Ihrer Airline oder Ihres Lounge-Programms.",
        ]},
        { h: "Das Wichtigste zuerst: Ihr Gate entscheidet", p: [
          "Der Flughafen Zürich hat zwei Zonen hinter der Sicherheitskontrolle: den Schengen-Bereich mit den Gates A und B im Airside Center und den Nicht-Schengen-Bereich mit den Gates D und E, für den Sie durch die Passkontrolle müssen. Lounges im Dock E erreichen Sie nur mit der Skymetro.",
          "Für die Wahl der Lounge heisst das: Fliegen Sie innerhalb Europas im Schengenraum, kommen nur Lounges im Airside Center in Frage. Fliegen Sie nach London, Dubai oder New York, wählen Sie eine Lounge auf der Nicht-Schengen-Seite. Wie der Flughafen aufgebaut ist, erklärt [Flughafen Zürich einfach erklärt](/blog/flughafen-zuerich-terminals-docks-erklaert).",
        ]},
        { h: "Die Lounges im Überblick", p: [
          "Eine vereinfachte Übersicht der wichtigsten Lounges (Stand Oktober 2026):",
        ], table: { head: ["Lounge", "Bereich", "Zugang (vereinfacht)"], rows: [
          ["SWISS Business, Senator und First Lounges", "Airside Center (A/B), Gates D und Dock E", "Ticketklasse oder Status bei SWISS und Star Alliance"],
          ["Aspire Lounge", "Airside Center (Schengen)", "Lounge-Programme, Tagespass"],
          ["Marhaba Lounge", "Airside Center (Schengen)", "Lounge-Programme, Tagespass"],
          ["Aspire Lounge E", "Dock E (Nicht-Schengen)", "Lounge-Programme, Tagespass"],
          ["Primeclass Lounge", "Dock E (Nicht-Schengen)", "Lounge-Programme, Tagespass, Partner-Airlines"],
          ["Airline-Lounges, z. B. Emirates", "Dock E", "Premium-Gäste der jeweiligen Airline"],
        ]}},
        { h: "Die SWISS-Lounges", p: [
          "Als Heimatflughafen der SWISS hat Zürich das grösste Netz an SWISS-Lounges: Business Lounges für Gäste mit Business-Class-Ticket, Senator Lounges für Vielflieger mit hohem Status und First Lounges für First-Class-Passagiere. Sie liegen in allen Bereichen, sodass Sie meist eine Lounge in der Nähe Ihres Gates finden.",
          "Zugang haben je nach Lounge Gäste mit entsprechendem Ticket bei SWISS und vielen Star-Alliance-Partnern sowie Inhaber eines passenden Vielfliegerstatus. Wer mit einer anderen Star-Alliance-Airline reist, kann die SWISS-Lounges oft ebenfalls nutzen.",
        ]},
        { h: "Unabhängige Lounges: für alle zugänglich", p: [
          "Wer keinen Status hat und Economy fliegt, ist nicht ausgeschlossen. Die Aspire Lounges, die Marhaba Lounge und die Primeclass Lounge nehmen Gäste unabhängig von Airline und Klasse auf – mit einem Tagespass oder über Lounge-Programme wie Priority Pass, die oft in Premium-Kreditkarten enthalten sind.",
          "Zu Spitzenzeiten, etwa am frühen Morgen und am Nachmittag vor den Langstreckenabflügen, können diese Lounges voll sein, und der Einlass wird dann begrenzt. Wer sicher gehen will, reserviert einen Tagespass vorab, sofern die Lounge das anbietet.",
        ]},
        { h: "Für wen sich eine Lounge lohnt", p: [
          "Eine Lounge lohnt sich vor allem, wenn Sie länger warten: bei Umstiegen von mehr als zwei Stunden, bei Verspätungen, nach einem Nachtflug mit Wunsch nach einer Dusche oder wenn Sie vor dem Abflug noch arbeiten müssen. Für Familien mit kleinen Kindern ist der ruhigere Raum oft Gold wert.",
          "Bei einem kurzen Aufenthalt von unter einer Stunde ist der Gewinn dagegen klein, besonders wenn das Gate im Dock E liegt und Sie noch Passkontrolle und Skymetro vor sich haben. Wie viel Zeit Sie vor dem Abflug einplanen sollten, steht in [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Ankunftslounges: gibt es nicht wirklich", p: [
          "Anders als manche Drehkreuze hat Zürich kein grosses Angebot an Ankunftslounges für alle Reisenden. Wer nach einem Nachtflug landet, findet aber Alternativen: Hotels direkt am Flughafen bieten teils Day-Use-Zimmer an, und nach der Ankunft ist man in der Regel schnell draussen.",
          "Am entspanntesten ist es, wenn nach der Landung niemand mehr suchen muss: Ihr Fahrer wartet mit Namensschild in der Ankunftshalle, und die 60 Minuten Wartezeit beginnen erst mit der tatsächlichen Landung. Ideen für Hotels finden Sie in [Hotels am Flughafen Zürich](/blog/hotels-flughafen-zuerich-uebernachten).",
        ]},
        { h: "Für Geschäftsreisende und VIPs", p: [
          "Für besonders diskrete oder schnelle Abläufe bietet der Flughafen Zürich einen eigenen VIP-Service mit separater Abfertigung an. Für Geschäftsreisende, die regelmässig ab Zürich fliegen, lohnt sich ausserdem ein Blick auf Status- und Kreditkartenprogramme, die Lounge-Zugang beinhalten.",
          "Kombiniert mit einem Transfer, der Sie direkt vor der Abflughalle absetzt, wird der Weg vom Büro zum Gate so kurz wie möglich. Tipps für effiziente Geschäftsreisen stehen in [Geschäftsreise Zürich: 5 Gewohnheiten](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "Häufige Fragen zu Lounges in Zürich", p: []},
        { h3: "Kann ich eine Lounge in Zürich mit Economy-Ticket nutzen?", p: [
          "Ja, die unabhängigen Lounges wie Aspire, Marhaba und Primeclass bieten Tagespässe an oder akzeptieren Lounge-Programme, unabhängig von der Ticketklasse.",
        ]},
        { h3: "Welche Lounge passt zu meinem Gate?", p: [
          "Für die Gates A und B eine Lounge im Airside Center, für die Gates D und E eine Lounge auf der Nicht-Schengen-Seite, im Fall von Dock E nach der Skymetro.",
        ]},
        { h3: "Gibt es Duschen in den Lounges?", p: [
          "Mehrere Lounges bieten Duschen an, vor allem auf der Langstreckenseite. Prüfen Sie die Ausstattung der jeweiligen Lounge vorab.",
        ]},
        { h3: "Kann ich nach der Ankunft in eine Lounge?", p: [
          "Ankunftslounges gibt es in Zürich kaum. Hotels am Flughafen bieten teils Zimmer für den Tag an.",
        ]},
        { h3: "Wie früh sollte ich kommen, um die Lounge zu nutzen?", p: [
          "Rechnen Sie zur normalen Empfehlung von zwei bis drei Stunden die gewünschte Lounge-Zeit hinzu, behalten Sie aber die Öffnungszeiten der Check-in-Schalter im Blick.",
          "Jetzt [Fahrt zum Flughafen buchen](/buchung) – entspannt ankommen, mehr Zeit in der Lounge.",
        ]},
      ],
    },
    en: {
      title: "Lounges at Zurich Airport: Which Ones Exist, How to Get In and Which Suits Your Gate",
      seo: "Zurich Airport Lounges: Access & Tips",
      excerpt: "SWISS lounges, Aspire, Marhaba, Primeclass: Zurich has one of Europe's largest lounge selections. Which lounge is in which area, who gets in with frequent-flyer status, a credit card or a day pass, why your gate decides – and how to use the time before departure without rushing.",
      body: [
        { p: [
          "A lounge turns waiting time into rest: a quiet seat, something to eat, good Wi-Fi, sometimes a shower after a night flight. As the SWISS hub, Zurich is particularly well equipped – with numerous airline lounges and several independent lounges that are accessible even without a business-class ticket.",
          "This guide explains which lounges exist, where they are, how to get access and what to watch out for. Access rules and prices change; check the details before you travel on the website of the airport, your airline or your lounge programme.",
        ]},
        { h: "First things first: your gate decides", p: [
          "Zurich Airport has two zones beyond security: the Schengen area with gates A and B in the Airside Center, and the non-Schengen area with gates D and E, for which you pass through passport control. Lounges in Dock E can only be reached by the Skymetro.",
          "For your choice of lounge this means: if you fly within Europe in the Schengen area, only lounges in the Airside Center are an option. If you fly to London, Dubai or New York, choose a lounge on the non-Schengen side. How the airport is laid out is explained in [Zurich Airport explained simply](/blog/flughafen-zuerich-terminals-docks-erklaert).",
        ]},
        { h: "The lounges at a glance", p: [
          "A simplified overview of the main lounges (as of October 2026):",
        ], table: { head: ["Lounge", "Area", "Access (simplified)"], rows: [
          ["SWISS Business, Senator and First Lounges", "Airside Center (A/B), gates D and Dock E", "Ticket class or status with SWISS and Star Alliance"],
          ["Aspire Lounge", "Airside Center (Schengen)", "Lounge programmes, day pass"],
          ["Marhaba Lounge", "Airside Center (Schengen)", "Lounge programmes, day pass"],
          ["Aspire Lounge E", "Dock E (non-Schengen)", "Lounge programmes, day pass"],
          ["Primeclass Lounge", "Dock E (non-Schengen)", "Lounge programmes, day pass, partner airlines"],
          ["Airline lounges, e.g. Emirates", "Dock E", "Premium guests of the respective airline"],
        ]}},
        { h: "The SWISS lounges", p: [
          "As SWISS's home airport, Zurich has the largest network of SWISS lounges: Business Lounges for guests with a business-class ticket, Senator Lounges for frequent flyers with high status and First Lounges for first-class passengers. They are located in all areas, so you will usually find a lounge near your gate.",
          "Depending on the lounge, access is granted to guests with the relevant ticket on SWISS and many Star Alliance partners, as well as holders of a suitable frequent-flyer status. If you are flying with another Star Alliance airline, you can often use the SWISS lounges too.",
        ]},
        { h: "Independent lounges: open to everyone", p: [
          "If you have no status and fly economy, you are not excluded. The Aspire lounges, the Marhaba Lounge and the Primeclass Lounge admit guests regardless of airline and class – with a day pass or through lounge programmes such as Priority Pass, which are often included in premium credit cards.",
          "At peak times, for example early in the morning and in the afternoon before the long-haul departures, these lounges can be full and entry is then limited. If you want to be sure, reserve a day pass in advance where the lounge offers this.",
        ]},
        { h: "Who a lounge is worthwhile for", p: [
          "A lounge is worthwhile above all if you have a longer wait: connections of more than two hours, delays, after a night flight when you want a shower, or if you need to work before departure. For families with small children the quieter space is often worth its weight in gold.",
          "On a short stay of under an hour, by contrast, the gain is small, especially if your gate is in Dock E and you still have passport control and the Skymetro ahead of you. How much time to allow before departure is explained in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Arrival lounges: not really an option", p: [
          "Unlike some hubs, Zurich has no large range of arrival lounges for all travellers. If you land after a night flight, there are alternatives, though: hotels right at the airport partly offer day-use rooms, and after arrival you are usually out quickly.",
          "It is most relaxed when nobody has to search after landing: your driver waits with a name sign in the arrivals hall, and the 60 minutes of waiting time only start with the actual landing. Hotel ideas are in [Hotels at Zurich Airport](/blog/hotels-flughafen-zuerich-uebernachten).",
        ]},
        { h: "For business travellers and VIPs", p: [
          "For particularly discreet or fast processes, Zurich Airport offers its own VIP service with separate handling. For business travellers who fly regularly from Zurich, status and credit card programmes that include lounge access are also worth a look.",
          "Combined with a transfer that drops you right in front of the departures hall, the way from the office to the gate becomes as short as possible. Tips for efficient business trips are in [Business travel Zurich: 5 habits](/blog/business-travel-zuerich-tipps).",
        ]},
        { h: "Frequently asked questions about lounges in Zurich", p: []},
        { h3: "Can I use a lounge in Zurich with an economy ticket?", p: [
          "Yes, the independent lounges such as Aspire, Marhaba and Primeclass offer day passes or accept lounge programmes, regardless of ticket class.",
        ]},
        { h3: "Which lounge suits my gate?", p: [
          "For gates A and B a lounge in the Airside Center; for gates D and E a lounge on the non-Schengen side, which for Dock E means after the Skymetro.",
        ]},
        { h3: "Are there showers in the lounges?", p: [
          "Several lounges offer showers, especially on the long-haul side. Check the facilities of the lounge in advance.",
        ]},
        { h3: "Can I use a lounge after arrival?", p: [
          "There are hardly any arrival lounges in Zurich. Hotels at the airport partly offer rooms for the day.",
        ]},
        { h3: "How early should I arrive to use the lounge?", p: [
          "Add your desired lounge time to the usual recommendation of two to three hours, but keep the opening times of the check-in counters in mind.",
          "[Book your ride to the airport now](/buchung) – arrive relaxed, more time in the lounge.",
        ]},
      ],
    },
  },
  {
    slug: "gepaeck-verloren-flughafen-zuerich-was-tun",
    date: "2026-10-07",
    img: "/hero/hero-2.jpg",
    de: {
      title: "Gepäck verloren, verspätet oder beschädigt am Flughafen Zürich: Was jetzt zu tun ist",
      seo: "Gepäck verloren am Flughafen Zürich: Was tun?",
      excerpt: "Das Band steht still, Ihr Koffer ist nicht da: Was Sie noch am Flughafen tun müssen, welche Fristen gelten, was Ihnen nach dem Montrealer Übereinkommen zusteht, wie die Nachlieferung ins Hotel funktioniert – und was mit Ihrem wartenden Fahrer passiert.",
      body: [
        { p: [
          "Kaum etwas verdirbt die Ankunft so sehr wie ein leeres Gepäckband. Die gute Nachricht: Die allermeisten verspäteten Koffer tauchen innerhalb weniger Tage wieder auf und werden nachgeliefert. Entscheidend ist, dass Sie in den ersten Minuten das Richtige tun – sonst wird es später schwierig, Ihre Ansprüche durchzusetzen.",
          "Dieser Guide erklärt Schritt für Schritt, was bei verspätetem, verlorenem oder beschädigtem Gepäck am Flughafen Zürich zu tun ist. Er ersetzt keine Rechtsberatung; massgebend sind die Bedingungen Ihrer Airline und die geltenden Abkommen.",
        ]},
        { h: "Schritt 1: Den Gepäckausgabebereich nicht verlassen", p: [
          "Melden Sie das Problem, bevor Sie durch den Zoll in die öffentliche Ankunftshalle gehen. Im Gepäckausgabebereich gibt es Schalter für Gepäckermittlung, an denen Sie den Verlust oder Schaden aufnehmen lassen. Viele Airlines bieten die Meldung zusätzlich online oder per App an.",
          "Sie erhalten einen Bericht, meist als Property Irregularity Report (PIR) bezeichnet, mit einer Referenznummer. Diese Nummer ist der Schlüssel für alles Weitere: Suche, Nachlieferung und Entschädigung. Fotografieren Sie den Bericht und bewahren Sie Gepäckabschnitt und Bordkarte auf.",
        ]},
        { h: "Schritt 2: Die richtigen Angaben machen", p: [
          "Je genauer Ihre Angaben, desto schneller wird der Koffer gefunden:",
        ], ul: [
          "**Beschreibung des Koffers:** Marke, Farbe, Grösse, Material, Besonderheiten wie Anhänger oder Aufkleber.",
          "**Inhalt:** einige auffällige Gegenstände, die das Gepäck eindeutig machen.",
          "**Lieferadresse:** das Hotel mit vollständiger Adresse und Ihre Aufenthaltsdauer; bei Bergorten auch, ob das Hotel nur mit der Bahn erreichbar ist.",
          "**Erreichbarkeit:** eine Telefonnummer, unter der Sie im Ausland erreichbar sind, und Ihre E-Mail-Adresse.",
        ]},
        { h: "Schritt 3: Ihr Fahrer wartet – sagen Sie Bescheid", p: [
          "Wenn Sie einen Transfer gebucht haben, wartet Ihr Fahrer in der Ankunftshalle. Im Preis sind 60 Minuten Wartezeit nach der tatsächlichen Landung enthalten; die Meldung von verlorenem Gepäck kann aber länger dauern, wenn vor dem Schalter eine Schlange steht.",
          "Schicken Sie uns in diesem Fall kurz eine WhatsApp-Nachricht, sobald Sie wissen, dass es länger dauert. Der Fahrer weiss dann Bescheid und muss sich keine Sorgen machen, dass Sie den Treffpunkt verpasst haben. Wie das Treffen in der Ankunftshalle funktioniert, steht in [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Die Fristen: unbedingt einhalten", p: [
          "Für internationale Flüge regelt das Montrealer Übereinkommen die Haftung der Airlines für Gepäck. Wichtig sind vor allem die Fristen für die schriftliche Meldung an die Airline:",
        ], table: { head: ["Fall", "Frist für die schriftliche Meldung"], rows: [
          ["Beschädigtes Gepäck oder fehlender Inhalt", "innerhalb von 7 Tagen nach Erhalt"],
          ["Verspätetes Gepäck", "innerhalb von 21 Tagen, nachdem es Ihnen zur Verfügung gestellt wurde"],
          ["Verlorenes Gepäck", "gilt als verloren, wenn es nach 21 Tagen nicht aufgetaucht ist"],
        ]}},
        { p: [
          "Die Haftung der Airline ist pro Person begrenzt; seit Ende 2024 liegt die Obergrenze bei 1'519 Sonderziehungsrechten, einer Recheneinheit des Internationalen Währungsfonds. Ersetzt wird grundsätzlich der nachgewiesene Schaden, nicht automatisch der Höchstbetrag. Für wertvolle Gegenstände lohnt sich vor dem Flug eine Wertdeklaration bei der Airline oder eine Reisegepäckversicherung.",
        ]},
        { h: "Notwendige Einkäufe: Belege aufbewahren", p: [
          "Wenn Ihr Koffer verspätet ist, dürfen Sie in angemessenem Rahmen das Nötigste kaufen: Zahnbürste, Wäsche, etwas Kleidung, bei einer Bergreise auch warme Sachen. Bewahren Sie alle Belege auf und reichen Sie sie zusammen mit der Referenznummer bei der Airline ein. Was angemessen ist, hängt von den Umständen ab; Luxuseinkäufe werden in der Regel nicht ersetzt.",
          "Viele Airlines geben am Schalter auch ein kleines Notfallset aus. Fragen Sie danach.",
        ]},
        { h: "Die Nachlieferung: ins Hotel, auch in die Berge", p: [
          "Wird Ihr Koffer gefunden, liefert ihn die Airline in der Regel an die angegebene Adresse nach. In die Stadt geht das oft innerhalb von ein bis zwei Tagen; in Bergorte und vor allem in autofreie Orte wie Zermatt oder Wengen kann es länger dauern, weil der Kurier bis zur letzten Station fährt und das Hotel den Rest übernimmt.",
          "Verfolgen Sie den Status mit der Referenznummer online. Wenn die Airline Ihnen anbietet, den Koffer selbst am Flughafen abzuholen, und Sie das wollen, können Sie dafür eine Fahrt bei uns buchen.",
        ]},
        { h: "Beschädigtes Gepäck", p: [
          "Ist der Koffer da, aber beschädigt – ein gebrochener Griff, ein abgerissenes Rad, ein aufgeplatzter Reissverschluss –, melden Sie das ebenfalls noch im Gepäckausgabebereich und lassen Sie den Schaden dokumentieren. Machen Sie Fotos. Entdecken Sie einen Schaden am Inhalt erst im Hotel, melden Sie ihn innerhalb von sieben Tagen schriftlich bei der Airline.",
        ]},
        { h: "So beugen Sie vor", p: [
          "Ein paar einfache Massnahmen machen den Unterschied, falls etwas schiefgeht:",
        ], ul: [
          "**Wichtiges ins Handgepäck:** Medikamente, Dokumente, Ladegeräte, eine Garnitur Wäsche und bei Bergreisen eine warme Schicht.",
          "**Koffer kennzeichnen:** Namensschild mit Telefonnummer innen und aussen, alte Anhänger entfernen.",
          "**Foto vom Koffer und vom Inhalt** vor dem Abflug machen.",
          "**Gepäck-Tracker** in den Koffer legen, damit Sie selbst sehen, wo er ist.",
          "**Genug Umsteigezeit** einplanen; knappe Anschlüsse sind die häufigste Ursache für verspätetes Gepäck.",
        ]},
        { h: "Häufige Fragen zu verlorenem Gepäck", p: []},
        { h3: "Wo melde ich verlorenes Gepäck am Flughafen Zürich?", p: [
          "Am Schalter für Gepäckermittlung im Gepäckausgabebereich, bevor Sie in die öffentliche Ankunftshalle gehen. Viele Airlines bieten zusätzlich eine Online-Meldung an.",
        ]},
        { h3: "Wie lange habe ich Zeit, einen Schaden zu melden?", p: [
          "Bei Beschädigung sieben Tage nach Erhalt, bei Verspätung 21 Tage, nachdem Ihnen das Gepäck zur Verfügung gestellt wurde.",
        ]},
        { h3: "Wann gilt ein Koffer als verloren?", p: [
          "Wenn er 21 Tage nach dem vorgesehenen Ankunftstag nicht aufgetaucht ist.",
        ]},
        { h3: "Wartet der Fahrer, wenn die Meldung länger dauert?", p: [
          "Schreiben Sie uns per WhatsApp, sobald absehbar ist, dass es länger dauert. So kann der Fahrer planen und weiss, dass Sie noch kommen.",
        ]},
        { h3: "Bringt die Airline den Koffer auch nach Zermatt?", p: [
          "In der Regel ja, an die angegebene Adresse. In autofreie Orte kann die Lieferung etwas länger dauern.",
          "Jetzt [Transfer ab Flughafen Zürich buchen](/buchung) – Fahrer wartet in der Ankunftshalle.",
        ]},
      ],
    },
    en: {
      title: "Luggage Lost, Delayed or Damaged at Zurich Airport: What to Do Now",
      seo: "Lost Luggage at Zurich Airport: What to Do",
      excerpt: "The belt has stopped and your suitcase is not there: what you need to do while still at the airport, which deadlines apply, what you are entitled to under the Montreal Convention, how delivery to your hotel works – and what happens with your waiting driver.",
      body: [
        { p: [
          "Few things spoil an arrival like an empty baggage belt. The good news: the vast majority of delayed suitcases turn up within a few days and are delivered. What matters is doing the right thing in the first few minutes – otherwise it becomes difficult to assert your claims later.",
          "This guide explains step by step what to do with delayed, lost or damaged luggage at Zurich Airport. It does not replace legal advice; your airline's conditions and the applicable conventions apply.",
        ]},
        { h: "Step 1: do not leave the baggage claim area", p: [
          "Report the problem before you go through customs into the public arrivals hall. In the baggage claim area there are baggage services counters where you can have the loss or damage recorded. Many airlines also offer reporting online or via their app.",
          "You receive a report, usually called a Property Irregularity Report (PIR), with a reference number. This number is the key to everything that follows: search, delivery and compensation. Photograph the report and keep your baggage tag and boarding pass.",
        ]},
        { h: "Step 2: give the right details", p: [
          "The more precise your details, the faster the suitcase is found:",
        ], ul: [
          "**Description of the suitcase:** brand, colour, size, material, distinguishing features such as tags or stickers.",
          "**Contents:** a few distinctive items that make the luggage unique.",
          "**Delivery address:** the hotel with its full address and the length of your stay; for mountain resorts, also whether the hotel can only be reached by train.",
          "**Contact:** a phone number on which you can be reached abroad, and your email address.",
        ]},
        { h: "Step 3: your driver is waiting – let us know", p: [
          "If you have booked a transfer, your driver is waiting in the arrivals hall. The price includes 60 minutes of waiting time after the actual landing, but reporting lost luggage can take longer if there is a queue at the counter.",
          "In that case, send us a quick WhatsApp message as soon as you know it will take longer. The driver is then informed and need not worry that you have missed the meeting point. How the meeting in the arrivals hall works is explained in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "The deadlines: be sure to meet them", p: [
          "For international flights the Montreal Convention governs airlines' liability for luggage. The deadlines for written notification to the airline are particularly important:",
        ], table: { head: ["Case", "Deadline for written notification"], rows: [
          ["Damaged luggage or missing contents", "within 7 days of receipt"],
          ["Delayed luggage", "within 21 days of it being placed at your disposal"],
          ["Lost luggage", "considered lost if it has not turned up after 21 days"],
        ]}},
        { p: [
          "The airline's liability is limited per person; since the end of 2024 the ceiling has been 1,519 Special Drawing Rights, a unit of account of the International Monetary Fund. In principle the proven loss is compensated, not automatically the maximum amount. For valuable items, a declaration of value with the airline or travel luggage insurance before the flight is worthwhile.",
        ]},
        { h: "Essential purchases: keep the receipts", p: [
          "If your suitcase is delayed, you may buy the essentials within reason: a toothbrush, underwear, some clothing, and for a mountain trip warm things too. Keep all receipts and submit them to the airline together with the reference number. What is reasonable depends on the circumstances; luxury purchases are usually not reimbursed.",
          "Many airlines also hand out a small emergency kit at the counter. Ask for one.",
        ]},
        { h: "Delivery: to your hotel, even in the mountains", p: [
          "When your suitcase is found, the airline usually delivers it to the address you gave. In the city this often happens within one or two days; to mountain resorts, and especially car-free villages such as Zermatt or Wengen, it can take longer because the courier goes to the last station and the hotel takes care of the rest.",
          "Track the status online with your reference number. If the airline offers you the option of collecting the suitcase yourself at the airport and you want to do so, you can book a ride with us for it.",
        ]},
        { h: "Damaged luggage", p: [
          "If the suitcase arrives but is damaged – a broken handle, a torn-off wheel, a burst zip – report it while still in the baggage claim area and have the damage documented. Take photos. If you only discover damage to the contents at the hotel, report it to the airline in writing within seven days.",
        ]},
        { h: "How to prevent problems", p: [
          "A few simple measures make all the difference if something goes wrong:",
        ], ul: [
          "**Essentials in your hand luggage:** medication, documents, chargers, a change of underwear and, for mountain trips, a warm layer.",
          "**Label your suitcase:** a name tag with your phone number inside and outside; remove old tags.",
          "**Take a photo of the suitcase and its contents** before departure.",
          "**Put a luggage tracker** in your suitcase so you can see where it is yourself.",
          "**Allow enough connection time**; tight connections are the most common cause of delayed luggage.",
        ]},
        { h: "Frequently asked questions about lost luggage", p: []},
        { h3: "Where do I report lost luggage at Zurich Airport?", p: [
          "At the baggage services counter in the baggage claim area, before you go into the public arrivals hall. Many airlines also offer online reporting.",
        ]},
        { h3: "How long do I have to report damage?", p: [
          "Seven days after receipt for damage, 21 days after the luggage was placed at your disposal for delay.",
        ]},
        { h3: "When is a suitcase considered lost?", p: [
          "If it has not turned up 21 days after the intended day of arrival.",
        ]},
        { h3: "Will the driver wait if reporting takes longer?", p: [
          "Message us on WhatsApp as soon as it becomes clear that it will take longer. That way the driver can plan and knows you are still coming.",
        ]},
        { h3: "Will the airline deliver my suitcase to Zermatt?", p: [
          "Usually yes, to the address you gave. Delivery to car-free villages can take a little longer.",
          "[Book a transfer from Zurich Airport now](/buchung) – your driver waits in the arrivals hall.",
        ]},
      ],
    },
  },
  {
    slug: "barrierefrei-reisen-flughafen-zuerich-transfer",
    date: "2026-10-07",
    img: "/gallery/20.jpg",
    de: {
      title: "Barrierefrei ab Flughafen Zürich: Assistenz, Rollstuhl, Rollator und der passende Transfer",
      seo: "Barrierefrei ab Flughafen Zürich reisen",
      excerpt: "Mit Rollstuhl, Rollator, eingeschränkter Mobilität oder im hohen Alter vom Flugzeug bis zur Hoteltür: wie die kostenlose Assistenz am Flughafen Zürich funktioniert, wann Sie sie anmelden, welches Fahrzeug passt, was faltbare und nicht faltbare Rollstühle bedeuten – und wie Sie die Reise ohne Stress planen.",
      body: [
        { p: [
          "Für Reisende mit eingeschränkter Mobilität beginnt der Stress oft nicht im Flugzeug, sondern danach: lange Wege, Gepäckband, Gedränge in der Ankunftshalle, die Frage, wie man mit Rollstuhl oder Rollator ins Auto oder in den Zug kommt. Mit der richtigen Planung lässt sich fast alles davon vermeiden.",
          "Dieser Guide erklärt, wie die Assistenz am Flughafen Zürich funktioniert, was Sie vorab erledigen sollten und worauf es beim Transfer ankommt – ehrlich, auch dort, wo wir an Grenzen stossen.",
        ]},
        { h: "Die Assistenz am Flughafen: kostenlos, aber anmelden", p: [
          "Am Flughafen Zürich gibt es für Reisende mit eingeschränkter Mobilität einen Assistenzdienst, der Sie vom Flugzeug bis in die Ankunftshalle begleitet – auf Wunsch mit Rollstuhl, durch Pass- und Zollkontrolle und zum Gepäckband. Beim Abflug funktioniert das umgekehrt. Der Dienst ist für Reisende kostenlos.",
          "Wichtig: Melden Sie den Bedarf bei Ihrer Airline an, idealerweise bei der Buchung und spätestens 48 Stunden vor dem Flug. Geben Sie an, ob Sie kurze Strecken gehen können, ob Sie Treppen bewältigen und ob Sie einen eigenen Rollstuhl mitbringen. Je genauer die Angaben, desto besser ist die Hilfe vor Ort vorbereitet.",
        ]},
        { h: "Was Sie der Airline mitteilen sollten", p: [
          "Airlines unterscheiden verschiedene Stufen der Unterstützung. Für eine gute Vorbereitung helfen diese Angaben:",
        ], ul: [
          "**Mobilität:** ob Sie längere Strecken nicht gehen können, Treppen nicht bewältigen oder vollständig auf einen Rollstuhl angewiesen sind.",
          "**Eigener Rollstuhl:** Art (manuell oder elektrisch), Gewicht, Masse und bei Elektrorollstühlen der Batterietyp.",
          "**Weitere Hilfsmittel:** Rollator, Gehstöcke, medizinische Geräte, Sauerstoff.",
          "**Begleitung:** ob Sie allein oder mit einer Begleitperson reisen.",
          "**Assistenzhund:** Assistenzhunde reisen nach den Regeln der Airline meist in der Kabine mit.",
        ]},
        { h: "Ankunft: Assistenz und Fahrer treffen sich", p: [
          "Bei der Ankunft begleitet Sie die Assistenz bis in die öffentliche Ankunftshalle. Dort wartet Ihr Fahrer mit einem Namensschild. Teilen Sie uns bei der Buchung mit, dass Sie mit Assistenz ankommen; der Fahrer weiss dann, dass es etwas länger dauern kann, und hält Ausschau nach Ihnen.",
          "Die 60 Minuten Wartezeit beginnen mit der tatsächlichen Landung. Wenn die Assistenz länger braucht, etwa weil der Rollstuhl erst aus dem Frachtraum kommt, schreiben Sie uns kurz per WhatsApp. Wie der Treffpunkt funktioniert, steht in [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Welches Fahrzeug passt?", p: [
          "Die richtige Fahrzeugklasse hängt von den Hilfsmitteln ab:",
        ], table: { head: ["Situation", "Empfehlung"], rows: [
          ["Gehbehinderung, Gehstock, kurze Strecken möglich", "E-Klasse oder S-Klasse, bequemer Einstieg, Fahrer hilft"],
          ["Faltbarer Rollstuhl oder Rollator", "E-Klasse für 1–2 Personen, V-Klasse mit mehr Gepäck oder Begleitung"],
          ["Faltbarer Elektro-Scooter", "V-Klasse, Masse und Gewicht vorab angeben"],
          ["Nicht faltbarer Elektrorollstuhl, Sitzen im Rollstuhl nötig", "Spezialfahrzeug mit Rampe – bitte vorab anfragen"],
        ]}},
        { h: "Ehrlich: nicht faltbare Elektrorollstühle", p: [
          "Unsere Fahrzeuge sind Mercedes-Limousinen und -Vans ohne Rampe. Faltbare Rollstühle, Rollatoren und viele faltbare Scooter transportieren wir problemlos, und die Fahrer helfen beim Ein- und Aussteigen. Wer jedoch im Rollstuhl sitzend befördert werden muss oder einen schweren, nicht faltbaren Elektrorollstuhl hat, braucht ein Spezialfahrzeug mit Rampe oder Lift.",
          "Fragen Sie uns in diesem Fall vor der Buchung. Wir sagen Ihnen offen, ob wir die Fahrt abdecken können, und helfen Ihnen, eine passende Lösung zu finden – lieber eine ehrliche Antwort vorab als eine Überraschung in der Ankunftshalle.",
        ]},
        { h: "Was der Fahrer übernimmt", p: [
          "Unsere Chauffeure helfen beim Gepäck, beim Ein- und Aussteigen und beim Verladen von Rollstuhl oder Rollator. Auf Wunsch fährt der Fahrer so nah wie möglich an den Hoteleingang heran und begleitet Sie bis zur Rezeption.",
          "Für längere Strecken, etwa in die Berge, lassen sich Pausen einplanen; sagen Sie dem Fahrer einfach, wann Sie anhalten möchten. Für die Rückfahrt zum Flughafen planen wir die Abholung so, dass genug Zeit für die Assistenz beim Abflug bleibt. Wie viel Zeit Sie am Flughafen einplanen, steht in [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Ältere Reisende und Reisende mit unsichtbaren Einschränkungen", p: [
          "Nicht jede Einschränkung ist sichtbar. Wer nach einem langen Flug schnell erschöpft ist, Orientierungsschwierigkeiten hat oder schlecht hört, profitiert ebenso von einer ruhigen, planbaren Ankunft. Schreiben Sie uns im Notizfeld, was Ihnen hilft – zum Beispiel, dass der Fahrer lieber per Nachricht als per Anruf Kontakt aufnimmt oder dass Sie etwas mehr Zeit brauchen.",
          "Für Familien mit älteren Angehörigen, die zum ersten Mal in die Schweiz reisen, ist ein Transfer oft die entspannteste Lösung: ein Fahrer, ein Fahrzeug, kein Umsteigen.",
        ]},
        { h: "Barrierefreiheit in Zug und Hotel", p: [
          "Wer in der Schweiz mit der Bahn weiterreist, kann bei den SBB eine Ein- und Ausstiegshilfe anmelden. Viele Bergbahnen sind teilweise barrierefrei, aber nicht alle; prüfen Sie das vorab, besonders bei autofreien Orten wie Zermatt oder Wengen.",
          "Bei Hotels lohnt sich eine direkte Rückfrage, ob das Zimmer wirklich schwellenfrei ist, ob es eine bodengleiche Dusche gibt und ob der Eingang ohne Stufen erreichbar ist. Tragen Sie die Adresse bei der Buchung genau ein; der Fahrer wählt dann den besten Halteplatz.",
        ]},
        { h: "Häufige Fragen zu barrierefreien Transfers", p: []},
        { h3: "Ist die Assistenz am Flughafen Zürich kostenlos?", p: [
          "Ja, für Reisende ist sie kostenlos. Melden Sie sie bei Ihrer Airline an, spätestens 48 Stunden vor dem Flug.",
        ]},
        { h3: "Kann ich einen faltbaren Rollstuhl mitnehmen?", p: [
          "Ja, faltbare Rollstühle und Rollatoren transportieren wir in allen Fahrzeugklassen; mit viel Gepäck empfehlen wir die V-Klasse.",
        ]},
        { h3: "Haben Sie Fahrzeuge mit Rampe?", p: [
          "Unsere Fahrzeuge haben keine Rampe. Für nicht faltbare Elektrorollstühle fragen Sie uns bitte vorab, damit wir gemeinsam eine Lösung finden.",
        ]},
        { h3: "Darf mein Assistenzhund mitfahren?", p: [
          "Ja, Assistenzhunde sind willkommen. Mehr zum Reisen mit Hunden steht in [Mit Hund oder Katze ab Flughafen Zürich](/blog/mit-hund-oder-katze-ab-flughafen-zuerich-transfer).",
        ]},
        { h3: "Wartet der Fahrer, wenn die Assistenz länger braucht?", p: [
          "Geben Sie bei der Buchung an, dass Sie mit Assistenz ankommen, und schreiben Sie per WhatsApp, wenn es länger dauert. Der Fahrer stellt sich darauf ein.",
          "Jetzt [Transfer anfragen oder buchen](/buchung) – sagen Sie uns im Notizfeld, was Sie brauchen.",
        ]},
      ],
    },
    en: {
      title: "Accessible Travel From Zurich Airport: Assistance, Wheelchair, Rollator and the Right Transfer",
      seo: "Accessible Travel From Zurich Airport",
      excerpt: "With a wheelchair, rollator, reduced mobility or in old age, from the plane to the hotel door: how the free assistance at Zurich Airport works, when to book it, which vehicle fits, what folding and non-folding wheelchairs mean – and how to plan the journey without stress.",
      body: [
        { p: [
          "For travellers with reduced mobility the stress often does not start on the plane but afterwards: long walks, the baggage belt, crowds in the arrivals hall, the question of how to get into the car or train with a wheelchair or rollator. With the right planning, almost all of it can be avoided.",
          "This guide explains how assistance at Zurich Airport works, what to arrange in advance and what matters for the transfer – honestly, including where we reach our limits.",
        ]},
        { h: "Assistance at the airport: free, but book it", p: [
          "Zurich Airport has an assistance service for travellers with reduced mobility that accompanies you from the aircraft to the arrivals hall – with a wheelchair if needed, through passport and customs control and to the baggage belt. On departure it works the other way round. The service is free of charge for travellers.",
          "Important: notify your airline of your needs, ideally when booking and at the latest 48 hours before the flight. State whether you can walk short distances, whether you can manage stairs and whether you are bringing your own wheelchair. The more precise the information, the better the help on site is prepared.",
        ]},
        { h: "What to tell the airline", p: [
          "Airlines distinguish different levels of support. These details help with good preparation:",
        ], ul: [
          "**Mobility:** whether you cannot walk longer distances, cannot manage stairs or depend completely on a wheelchair.",
          "**Your own wheelchair:** type (manual or electric), weight, dimensions and, for electric wheelchairs, the battery type.",
          "**Other aids:** rollator, walking sticks, medical devices, oxygen.",
          "**Companion:** whether you are travelling alone or with a companion.",
          "**Assistance dog:** assistance dogs usually travel in the cabin according to the airline's rules.",
        ]},
        { h: "Arrival: assistance and driver meet", p: [
          "On arrival the assistance accompanies you to the public arrivals hall. There your driver waits with a name sign. Tell us when booking that you are arriving with assistance; the driver then knows it may take a little longer and will look out for you.",
          "The 60 minutes of waiting time start with the actual landing. If the assistance takes longer, for example because the wheelchair has to come out of the hold first, send us a quick WhatsApp message. How the meeting point works is explained in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Which vehicle fits?", p: [
          "The right vehicle class depends on your mobility aids:",
        ], table: { head: ["Situation", "Recommendation"], rows: [
          ["Walking difficulties, walking stick, short distances possible", "E-Class or S-Class, comfortable entry, driver helps"],
          ["Folding wheelchair or rollator", "E-Class for 1–2 people, V-Class with more luggage or a companion"],
          ["Folding mobility scooter", "V-Class, give dimensions and weight in advance"],
          ["Non-folding power wheelchair, must stay seated in it", "Special vehicle with ramp – please ask in advance"],
        ]}},
        { h: "Honestly: non-folding power wheelchairs", p: [
          "Our vehicles are Mercedes saloons and vans without a ramp. We transport folding wheelchairs, rollators and many folding scooters without any problem, and the drivers help with getting in and out. However, anyone who needs to travel seated in their wheelchair or has a heavy, non-folding power wheelchair needs a special vehicle with a ramp or lift.",
          "In that case, please ask us before booking. We will tell you openly whether we can cover the journey and help you find a suitable solution – better an honest answer in advance than a surprise in the arrivals hall.",
        ]},
        { h: "What the driver takes care of", p: [
          "Our chauffeurs help with luggage, with getting in and out and with loading the wheelchair or rollator. On request the driver pulls up as close as possible to the hotel entrance and accompanies you to reception.",
          "For longer journeys, for example to the mountains, breaks can be planned; simply tell the driver when you would like to stop. For the return to the airport we plan the pickup so there is enough time for assistance on departure. How much time to allow at the airport is explained in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Older travellers and travellers with invisible impairments", p: [
          "Not every impairment is visible. Anyone who tires quickly after a long flight, has difficulty finding their way or is hard of hearing also benefits from a calm, predictable arrival. Tell us in the notes field what helps you – for example, that the driver should contact you by message rather than by phone, or that you need a little more time.",
          "For families with older relatives visiting Switzerland for the first time, a transfer is often the most relaxed solution: one driver, one vehicle, no changes.",
        ]},
        { h: "Accessibility on trains and in hotels", p: [
          "If you continue by train in Switzerland, you can request boarding and alighting assistance from SBB. Many mountain railways are partly accessible, but not all; check in advance, especially for car-free resorts such as Zermatt or Wengen.",
          "With hotels it is worth asking directly whether the room is genuinely step-free, whether there is a level-access shower and whether the entrance can be reached without steps. Enter the address precisely when booking; the driver will then choose the best place to stop.",
        ]},
        { h: "Frequently asked questions about accessible transfers", p: []},
        { h3: "Is assistance at Zurich Airport free?", p: [
          "Yes, it is free for travellers. Book it with your airline at the latest 48 hours before the flight.",
        ]},
        { h3: "Can I bring a folding wheelchair?", p: [
          "Yes, we transport folding wheelchairs and rollators in all vehicle classes; with a lot of luggage we recommend the V-Class.",
        ]},
        { h3: "Do you have vehicles with a ramp?", p: [
          "Our vehicles do not have a ramp. For non-folding power wheelchairs, please ask us in advance so we can find a solution together.",
        ]},
        { h3: "May my assistance dog come along?", p: [
          "Yes, assistance dogs are welcome. More on travelling with dogs is in [Flying with a dog or cat via Zurich Airport](/blog/mit-hund-oder-katze-ab-flughafen-zuerich-transfer).",
        ]},
        { h3: "Will the driver wait if the assistance takes longer?", p: [
          "Mention when booking that you are arriving with assistance, and message us on WhatsApp if it takes longer. The driver will plan accordingly.",
          "[Enquire about or book a transfer now](/buchung) – tell us in the notes field what you need.",
        ]},
      ],
    },
  },
  {
    slug: "beste-reisezeit-schweiz-monat-fuer-monat",
    date: "2026-10-07",
    img: "/gallery/5.jpg",
    de: {
      title: "Beste Reisezeit für die Schweiz: Monat für Monat – Wetter, Saisons, Anlässe und Zwischensaison",
      seo: "Beste Reisezeit für die Schweiz",
      excerpt: "Skifahren im Februar, Bergsommer im Juli, goldene Lärchen im Oktober, Weihnachtsmärkte im Dezember: wann die Schweiz für welche Reise am schönsten ist, wann es voll und teuer wird, welche Wochen Sie wegen der Zwischensaison meiden sollten – und was das für Ihre Anreise ab Zürich bedeutet.",
      body: [
        { p: [
          "Die Schweiz hat keine schlechte Reisezeit, aber sehr unterschiedliche. Dasselbe Bergdorf ist im Februar ein Skiort, im Juli ein Wanderparadies und im November manchmal fast geschlossen. Wer weiss, was er sucht, findet für jede Reise den passenden Monat.",
          "Dieser Guide geht die Monate durch, zeigt Hoch- und Zwischensaison und nennt die wichtigsten Anlässe. Am Ende finden Sie eine Kurzübersicht nach Reisetyp.",
        ]},
        { h: "Die Schweiz auf einen Blick: vier Reisezeiten", p: [
          "Grob lassen sich vier Phasen unterscheiden:",
        ], table: { head: ["Phase", "Monate", "Charakter"], rows: [
          ["Wintersaison", "Mitte Dezember bis März", "Skifahren, Schnee, Weihnachts- und Neujahrsferien, Wintersport-Anlässe"],
          ["Frühling und Zwischensaison", "April bis Mitte Juni", "Blüte im Tal und im Tessin, viele Bergbahnen in Revision, hohe Pässe noch zu"],
          ["Bergsommer", "Mitte Juni bis September", "Pässe offen, Wandern, Seen, Festivals, Hauptsaison"],
          ["Herbst und Zwischensaison", "Oktober bis Mitte Dezember", "Herbstfarben, Weinlese, ruhiger; im November viele Bergorte geschlossen"],
        ]}},
        { h: "Januar und Februar: Hochwinter", p: [
          "Die beste Zeit für Skiferien mit sicherem Schnee. Die Tage sind kurz und kalt, die Berge sonnig und klar. Anfang Januar ist es nach den Feiertagen etwas ruhiger; im Februar füllen die Sportferien in der Schweiz und den Nachbarländern die Skiorte.",
          "Wichtige Anlässe sind das WEF in Davos und die Lauberhornrennen in Wengen im Januar sowie die Basler Fasnacht im Februar oder März. Mehr dazu in [Lauberhornrennen Wengen](/blog/lauberhornrennen-wengen-anreise-transfer) und im [WEF-Transfer-Guide](/blog/wef-davos-transfer-guide).",
        ]},
        { h: "März: Frühlingsskifahren", p: [
          "Lange, sonnige Tage und meist noch gute Schneeverhältnisse in den höheren Skigebieten. Im Tal beginnt der Frühling, im Tessin blühen die ersten Kamelien. Ostern kann je nach Jahr in den März oder April fallen und bringt dann viel Verkehr am Gotthard.",
        ]},
        { h: "April und Mai: Blüte und Zwischensaison", p: [
          "Im Mittelland und im Tessin ist es jetzt besonders schön: Obstblüte, grüne Wiesen, angenehme Temperaturen. In den Bergen dagegen ist Zwischensaison: Viele Skigebiete schliessen nach Ostern, zahlreiche Bergbahnen und Hotels machen Revisionspause, und die hohen Alpenpässe sind noch geschlossen.",
          "Für Städtereisen nach Zürich, Luzern, Bern oder Basel, für das Tessin und den Genfersee sind April und Mai ideal. Für Bergziele lohnt sich ein Blick auf die Öffnungszeiten von Bahnen und Hotels. Im Mai beginnt die Saison der Seeschifffahrt.",
        ]},
        { h: "Juni: Start in den Bergsommer", p: [
          "Die Tage sind am längsten, die Alpwiesen blühen, und im Laufe des Monats öffnen die hohen Pässe wie Gotthard, Furka und Grimsel. Die Bergbahnen nehmen den Sommerbetrieb auf. Juni ist oft weniger voll als Juli und August und deshalb eine der schönsten Reisezeiten.",
          "In Basel findet im Juni die Art Basel statt; Hotels sind dann früh ausgebucht.",
        ]},
        { h: "Juli und August: Hochsommer und Hauptsaison", p: [
          "Die beliebteste Reisezeit: warm im Tal, angenehm in den Bergen, alle Bahnen und Pässe offen. Seen laden zum Baden ein, und die Festivals reihen sich aneinander – Montreux Jazz Festival, Street Parade in Zürich, Filmfestival Locarno, Lucerne Festival. Am 1. August feiert die Schweiz ihren Nationalfeiertag mit Feuerwerken und Höhenfeuern.",
          "Die Kehrseite: Beliebte Ziele wie Luzern, Interlaken, Jungfraujoch und Zermatt sind voll, Hotels teuer, und an Samstagen staut es sich am Gotthard. Früh buchen lohnt sich. Zu den grossen Anlässen siehe [Sommer in Zürich](/blog/sommer-zuerich-street-parade-zueri-faescht-transfer) und unsere [Eventseite](/events).",
        ]},
        { h: "September: der Geheimtipp", p: [
          "Für viele die beste Reisezeit überhaupt: stabiles Wetter, klare Fernsicht, angenehme Temperaturen und deutlich weniger Gedränge als im August. Bergbahnen und Pässe sind noch offen, im Wallis und am Genfersee beginnt die Weinlese. Ideal zum Wandern und für Rundreisen.",
        ]},
        { h: "Oktober: goldener Herbst", p: [
          "Die Wälder färben sich, und im Engadin und Wallis leuchten die Lärchen gegen Ende des Monats golden. Im Tessin ist Kastanienzeit. In St. Gallen findet die Olma statt. Ab Mitte oder Ende Oktober beginnen viele Bergbahnen mit der Revisionspause, und einige Pässe schliessen.",
        ]},
        { h: "November: ruhig, mit Vorsicht planen", p: [
          "November ist die ruhigste Zeit des Jahres. In den Städten ist das kein Problem, Ende des Monats öffnen die ersten Weihnachtsmärkte. In vielen Bergorten dagegen sind zahlreiche Hotels, Restaurants und Bahnen geschlossen, bis die Wintersaison beginnt. Gletscherskigebiete wie Zermatt oder der Titlis bei Engelberg sind oft schon offen.",
        ]},
        { h: "Dezember: Weihnachtsmärkte und Saisonstart", p: [
          "Der Advent bringt Weihnachtsmärkte in Zürich, Basel, Luzern und Bern; Mitte Dezember beginnt in den meisten Skigebieten die Saison. Zwischen Weihnachten und Neujahr sind die Bergorte voll, der Spengler Cup in Davos und der Silvesterzauber in Zürich sind Höhepunkte. Mehr in [Weihnachtsmärkte ab Flughafen Zürich](/blog/weihnachtsmaerkte-zuerich-basel-transfer-dezember), [Spengler Cup Davos](/blog/spengler-cup-davos-anreise-transfer) und [Silvester in Zürich](/blog/silvester-zuerich-feuerwerk-transfer).",
        ]},
        { h: "Kurzübersicht nach Reisetyp", p: [
          "Welcher Monat passt zu Ihnen?",
        ], ul: [
          "**Skiferien:** Januar bis März, schneesicher ab Mitte Dezember in hohen Lagen. Ziele in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "**Wandern und Berge:** Mitte Juni bis September, am schönsten im September.",
          "**Städtereisen:** fast ganzjährig, besonders April bis Juni und September bis Oktober.",
          "**Tessin und Seen:** April bis Oktober, mit Blüte im Frühling und Kastanien im Herbst.",
          "**Weniger Gedränge, gute Preise:** Juni, September und Anfang Oktober.",
          "**Meiden für Bergziele:** Ende April bis Mitte Juni und November, wegen der Zwischensaison.",
        ]},
        { h: "Was die Reisezeit für die Anreise bedeutet", p: [
          "Die Jahreszeit beeinflusst auch die Fahrt ab Flughafen Zürich. Im Winter planen wir auf Bergstrecken mehr Zeit ein, an Wechselsamstagen sind die Zufahrten voll, und Skigepäck bis zu vier Säcken pro Fahrzeug ist inklusive. Im Sommer ist der Gotthard an Ferienwochenenden das Nadelöhr, und Pässe wie der Gotthardpass bieten landschaftliche Alternativen.",
          "Unabhängig vom Monat gilt: Der Festpreis pro Fahrzeug steht vorab fest, Wochenenden und Feiertage kosten nichts extra, nur zwischen 00:00 und 06:00 Uhr gilt der Nachttarif von 20 %. Wie Sie die Abholzeit für die Rückreise berechnen, zeigt [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Häufige Fragen zur besten Reisezeit", p: []},
        { h3: "Wann ist die beste Reisezeit für die Schweiz?", p: [
          "Für Berge und Wandern Mitte Juni bis September, besonders September; für Skiferien Januar bis März; für Städte und das Tessin Frühling und Herbst.",
        ]},
        { h3: "Wann ist es in der Schweiz am günstigsten?", p: [
          "In der Zwischensaison und in ruhigen Wochen wie Anfang Januar, Juni und September. Beachten Sie aber, dass in der Zwischensaison viele Bergangebote geschlossen sind.",
        ]},
        { h3: "Ist das Jungfraujoch ganzjährig offen?", p: [
          "Ja, das Jungfraujoch ist ganzjährig erreichbar; bei schlechtem Wetter ist die Sicht jedoch eingeschränkt.",
        ]},
        { h3: "Wann sind die Alpenpässe offen?", p: [
          "Die hohen Pässe sind meist von Juni bis Oktober befahrbar. Die genauen Daten hängen vom Schnee ab.",
        ]},
        { h3: "Fahren Sie auch in der Zwischensaison in die Berge?", p: [
          "Ja, ganzjährig. Prüfen Sie nur vorab, ob Ihr Hotel und die gewünschten Bahnen geöffnet sind.",
          "Jetzt [Transfer ab Flughafen Zürich buchen](/buchung) – zu jeder Jahreszeit zum Festpreis.",
        ]},
      ],
    },
    en: {
      title: "Best Time to Visit Switzerland: Month by Month – Weather, Seasons, Events and Shoulder Season",
      seo: "Best Time to Visit Switzerland",
      excerpt: "Skiing in February, mountain summer in July, golden larches in October, Christmas markets in December: when Switzerland is at its best for which kind of trip, when it gets crowded and expensive, which weeks to avoid because of the shoulder season – and what that means for your journey from Zurich.",
      body: [
        { p: [
          "Switzerland has no bad time to visit, but very different ones. The same mountain village is a ski resort in February, a hiking paradise in July and sometimes almost closed in November. If you know what you are looking for, you will find the right month for every trip.",
          "This guide goes through the months, shows peak and shoulder seasons and names the most important events. At the end you will find a quick overview by type of trip.",
        ]},
        { h: "Switzerland at a glance: four travel seasons", p: [
          "Roughly, four phases can be distinguished:",
        ], table: { head: ["Phase", "Months", "Character"], rows: [
          ["Winter season", "mid-December to March", "Skiing, snow, Christmas and New Year holidays, winter sports events"],
          ["Spring and shoulder season", "April to mid-June", "Blossom in the valleys and Ticino, many mountain railways in maintenance, high passes still closed"],
          ["Mountain summer", "mid-June to September", "Passes open, hiking, lakes, festivals, peak season"],
          ["Autumn and shoulder season", "October to mid-December", "Autumn colours, grape harvest, quieter; in November many mountain resorts closed"],
        ]}},
        { h: "January and February: high winter", p: [
          "The best time for a ski holiday with reliable snow. The days are short and cold, the mountains sunny and clear. Early January is a little quieter after the holidays; in February the sports holidays in Switzerland and neighbouring countries fill the ski resorts.",
          "Important events are the WEF in Davos and the Lauberhorn races in Wengen in January, and Basel Fasnacht in February or March. More in [Lauberhorn races Wengen](/blog/lauberhornrennen-wengen-anreise-transfer) and in the [WEF transfer guide](/blog/wef-davos-transfer-guide).",
        ]},
        { h: "March: spring skiing", p: [
          "Long, sunny days and usually still good snow in the higher ski areas. In the valleys spring begins, and the first camellias bloom in Ticino. Depending on the year, Easter can fall in March or April and then brings heavy traffic at the Gotthard.",
        ]},
        { h: "April and May: blossom and shoulder season", p: [
          "The Swiss plateau and Ticino are particularly beautiful now: fruit blossom, green meadows, pleasant temperatures. In the mountains, however, it is shoulder season: many ski areas close after Easter, numerous mountain railways and hotels take a maintenance break, and the high Alpine passes are still closed.",
          "For city breaks to Zurich, Lucerne, Bern or Basel, for Ticino and Lake Geneva, April and May are ideal. For mountain destinations, check the opening times of railways and hotels. In May the lake steamer season begins.",
        ]},
        { h: "June: the start of mountain summer", p: [
          "The days are at their longest, the alpine meadows are in bloom, and during the month the high passes such as the Gotthard, Furka and Grimsel open. The mountain railways start their summer service. June is often less crowded than July and August and therefore one of the most beautiful times to travel.",
          "Art Basel takes place in Basel in June; hotels book up early.",
        ]},
        { h: "July and August: high summer and peak season", p: [
          "The most popular time to travel: warm in the valleys, pleasant in the mountains, all railways and passes open. The lakes invite you to swim, and the festivals follow one another – Montreux Jazz Festival, Street Parade in Zurich, Locarno Film Festival, Lucerne Festival. On 1 August Switzerland celebrates its national day with fireworks and bonfires on the hills.",
          "The downside: popular destinations such as Lucerne, Interlaken, the Jungfraujoch and Zermatt are crowded, hotels expensive, and on Saturdays there are queues at the Gotthard. Booking early pays off. For the big events see [Summer in Zurich](/blog/sommer-zuerich-street-parade-zueri-faescht-transfer) and our [events page](/events).",
        ]},
        { h: "September: the insider tip", p: [
          "For many the best time of all: settled weather, clear views, pleasant temperatures and far fewer crowds than in August. Mountain railways and passes are still open, and the grape harvest begins in Valais and around Lake Geneva. Ideal for hiking and round trips.",
        ]},
        { h: "October: golden autumn", p: [
          "The forests change colour, and towards the end of the month the larches glow gold in the Engadin and Valais. In Ticino it is chestnut season. St. Gallen hosts the Olma fair. From mid or late October many mountain railways begin their maintenance break, and some passes close.",
        ]},
        { h: "November: quiet, plan with care", p: [
          "November is the quietest time of the year. In the cities that is no problem, and at the end of the month the first Christmas markets open. In many mountain resorts, however, numerous hotels, restaurants and railways are closed until the winter season begins. Glacier ski areas such as Zermatt or the Titlis near Engelberg are often already open.",
        ]},
        { h: "December: Christmas markets and the start of the season", p: [
          "Advent brings Christmas markets in Zurich, Basel, Lucerne and Bern; in mid-December the season starts in most ski areas. Between Christmas and New Year the mountain resorts are full, and the Spengler Cup in Davos and Silvesterzauber in Zurich are highlights. More in [Christmas markets from Zurich Airport](/blog/weihnachtsmaerkte-zuerich-basel-transfer-dezember), [Spengler Cup Davos](/blog/spengler-cup-davos-anreise-transfer) and [New Year's Eve in Zurich](/blog/silvester-zuerich-feuerwerk-transfer).",
        ]},
        { h: "Quick overview by type of trip", p: [
          "Which month suits you?",
        ], ul: [
          "**Ski holidays:** January to March, snow-sure at high altitude from mid-December. Destinations in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "**Hiking and mountains:** mid-June to September, at its best in September.",
          "**City breaks:** almost all year, especially April to June and September to October.",
          "**Ticino and the lakes:** April to October, with blossom in spring and chestnuts in autumn.",
          "**Fewer crowds, good prices:** June, September and early October.",
          "**Avoid for mountain destinations:** late April to mid-June and November, because of the shoulder season.",
        ]},
        { h: "What the season means for your journey", p: [
          "The time of year also affects the drive from Zurich Airport. In winter we allow more time on mountain routes, the access roads are busy on changeover Saturdays, and ski luggage of up to four bags per vehicle is included. In summer the Gotthard is the bottleneck on holiday weekends, and passes such as the Gotthard Pass offer scenic alternatives.",
          "Whatever the month: the fixed price per vehicle is known in advance, weekends and public holidays cost nothing extra, and only between midnight and 6 am does the 20 % night tariff apply. How to calculate the pickup time for your return is shown in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Frequently asked questions about the best time to visit", p: []},
        { h3: "When is the best time to visit Switzerland?", p: [
          "For mountains and hiking mid-June to September, especially September; for ski holidays January to March; for cities and Ticino spring and autumn.",
        ]},
        { h3: "When is Switzerland cheapest?", p: [
          "In the shoulder season and in quiet weeks such as early January, June and September. Note, however, that many mountain offerings are closed in the shoulder season.",
        ]},
        { h3: "Is the Jungfraujoch open all year?", p: [
          "Yes, the Jungfraujoch can be reached all year round; in bad weather, however, visibility is limited.",
        ]},
        { h3: "When are the Alpine passes open?", p: [
          "The high passes are usually open from June to October. The exact dates depend on the snow.",
        ]},
        { h3: "Do you drive to the mountains in the shoulder season too?", p: [
          "Yes, all year round. Just check in advance whether your hotel and the railways you want are open.",
          "[Book a transfer from Zurich Airport now](/buchung) – at a fixed price in every season.",
        ]},
      ],
    },
  },
  {
    slug: "genf-oder-zuerich-flughafen-alpen",
    date: "2026-10-07",
    img: "/gallery/7.jpg",
    de: {
      title: "Genf oder Zürich: Welcher Flughafen ist der richtige für Ihre Alpenreise?",
      seo: "Genf oder Zürich: Welcher Flughafen?",
      excerpt: "Zermatt, Verbier, Gstaad, Interlaken, St. Moritz oder Luzern – je nach Ziel ist Genf oder Zürich der bessere Flughafen. Ein ehrlicher Vergleich nach Region, Flugangebot und Anreise, mit einer Übersicht, welche Orte näher an welchem Flughafen liegen, und Tipps für Gabelflüge.",
      body: [
        { p: [
          "Wer in die Schweizer Alpen reist, hat meist zwei Flughäfen zur Wahl: Zürich im Nordosten und Genf im Südwesten des Landes. Beide sind gut angebunden, beide liegen nahe an grossen Ferienregionen – und doch kann die Wahl eine Anreise um Stunden verkürzen oder verlängern.",
          "Als Transferanbieter in Zürich haben wir ein Interesse an Zürich, aber eine ehrliche Antwort hilft Ihnen mehr. Dieser Guide zeigt, welcher Flughafen für welches Ziel sinnvoll ist, worauf es beim Flugangebot ankommt und wie Sie beide Flughäfen klug kombinieren.",
        ]},
        { h: "Die beiden Flughäfen im Vergleich", p: [
          "Zürich ist der grösste Flughafen der Schweiz und Drehkreuz der SWISS. Hier landen die meisten Langstreckenflüge aus Nordamerika, Asien und dem Nahen Osten, und das Angebot an Direktverbindungen ist am grössten. Genf ist kleiner, hat aber ebenfalls viele Verbindungen innerhalb Europas und einige Langstrecken; er liegt direkt an der französischen Grenze und hat auch einen französischen Sektor.",
          "Für Reisende aus Übersee bedeutet das oft: Zürich ist mit einem Direktflug erreichbar, Genf nur mit Umsteigen. Ein Umsteigen in Europa kann die Zeitersparnis bei der Weiterfahrt schnell wieder aufheben.",
        ], table: { head: ["Kriterium", "Zürich (ZRH)", "Genf (GVA)"], rows: [
          ["Lage", "Nordostschweiz", "Südwestschweiz, an der Grenze zu Frankreich"],
          ["Langstreckenflüge", "grösstes Angebot, SWISS-Drehkreuz", "kleineres Angebot"],
          ["Nahe Regionen", "Zentralschweiz, Graubünden, Ostschweiz, Tessin", "Genfersee, Unterwallis, französische Alpen"],
          ["Sprachregion", "Deutsch", "Französisch"],
        ]}},
        { h: "Welches Ziel liegt näher an welchem Flughafen?", p: [
          "Als Faustregel gilt: Alles östlich einer Linie Bern–Brig erreichen Sie meist schneller ab Zürich, alles westlich davon ab Genf. Dazwischen liegt eine Zone, in der beide Flughäfen ähnlich gut funktionieren.",
        ], table: { head: ["Region / Ort", "Meist günstiger ab"], rows: [
          ["Luzern, Engelberg, Zug", "Zürich"],
          ["Davos, Klosters, St. Moritz, Laax, Lenzerheide", "Zürich"],
          ["Lugano, Locarno, Tessin", "Zürich"],
          ["Interlaken, Grindelwald, Wengen", "beide ähnlich, oft Zürich"],
          ["Bern", "beide ähnlich, oft Zürich"],
          ["Zermatt, Saas-Fee", "beide ähnlich"],
          ["Gstaad", "beide ähnlich, oft Genf"],
          ["Verbier, Crans-Montana", "Genf"],
          ["Lausanne, Montreux, Genfersee", "Genf"],
          ["Chamonix (Frankreich)", "Genf"],
        ]}},
        { h: "Wann Zürich die bessere Wahl ist", p: [
          "Zürich ist klar im Vorteil für die Zentral- und Ostschweiz: Luzern erreichen Sie in gut einer Stunde, Engelberg in knapp zwei, Davos und St. Moritz über Graubünden. Auch für das Tessin ist Zürich näher, die Fahrt durch den Gotthard bringt Sie direkt nach Lugano oder Locarno.",
          "Dazu kommt das Flugangebot: Wer aus den USA, Asien oder dem Nahen Osten direkt fliegen möchte, findet in Zürich oft die einzige Nonstop-Verbindung. Für die Jungfrau-Region und Zermatt gleicht das die etwas längere Anreise häufig aus. Unsere festen Strecken ab Zürich sehen Sie auf der [Streckenseite](/strecken).",
        ]},
        { h: "Wann Genf die bessere Wahl ist", p: [
          "Genf ist unschlagbar für die Genferseeregion – Lausanne, Montreux, Vevey – und für das Unterwallis mit Verbier und Crans-Montana. Auch Chamonix in Frankreich liegt von Genf aus nur rund eine Stunde entfernt. Wer dorthin reist und einen guten Flug nach Genf findet, sollte ihn nehmen.",
          "Fliegen Sie trotzdem nach Zürich, etwa wegen eines Direktflugs, bringen wir Sie auch in die Westschweiz. Wir haben feste Strecken nach [Genf](/zurich-airport-to-geneva), [Lausanne](/zurich-airport-to-lausanne), [Montreux](/zurich-airport-to-montreux) und [Verbier](/zurich-airport-to-verbier).",
        ]},
        { h: "Zermatt: der Sonderfall", p: [
          "Zermatt liegt etwa gleich weit von beiden Flughäfen entfernt. Ab Zürich führt die Fahrt über Bern und die Lötschberg-Autoverladung oder ganz auf der Strasse ins Wallis; ab Genf entlang des Genfersees und durch das Rhonetal. In beiden Fällen endet der Transfer in Täsch, weil Zermatt autofrei ist.",
          "Hier entscheidet das Flugangebot. Wer einen Direktflug nach Zürich hat, fährt von dort. Alles zur Anreise beschreibt [Zermatt-Transfer über Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "Im Winter: Strassen, Pässe und Autoverlad", p: [
          "Im Winter verändert sich die Rechnung manchmal. Viele Alpenpässe sind dann geschlossen, und die Verbindung von der Deutschschweiz ins Wallis führt entweder über die Lötschberg-Autoverladung zwischen Kandersteg und Goppenstein oder über die längere Strecke via Genfersee. An Wechselsamstagen bilden sich an der Autoverladung Wartezeiten, und auch das Rhonetal ist dann voll.",
          "Für Ziele im Wallis lohnt es sich deshalb, im Winter beide Flughäfen zu prüfen und an Samstagen grosszügig zu planen. Für Graubünden, die Zentralschweiz und das Berner Oberland bleibt Zürich auch im Winter die naheliegende Wahl. Mehr zur Wintersaison steht in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Gabelflüge: in Zürich landen, ab Genf zurück", p: [
          "Eine elegante Lösung für Rundreisen ist ein Gabelflug: Ankunft in Zürich, Rückflug ab Genf oder umgekehrt. So reisen Sie einmal quer durch die Schweiz, ohne den Weg zurückfahren zu müssen. Viele Airlines bieten solche Tickets ohne grossen Aufpreis an.",
          "Eine typische Route: Zürich – Luzern – Interlaken – Zermatt – Genfersee – Genf. Für die Ankunft und die letzte Etappe mit Gepäck ist ein Transfer bequem, dazwischen fahren viele Reisende Bahn. Wie sich das am besten kombinieren lässt, steht in [Lohnt sich der Swiss Travel Pass?](/blog/swiss-travel-pass-lohnt-sich-vergleich-transfer).",
        ]},
        { h: "Häufige Fragen", p: []},
        { h3: "Welcher Flughafen ist besser für Interlaken?", p: [
          "Beide funktionieren. Ab Zürich planen wir mit etwa zweieinhalb Stunden; entscheidend ist meist, wohin es den besseren Flug gibt.",
        ]},
        { h3: "Welcher Flughafen ist besser für Verbier?", p: [
          "Genf, weil Verbier deutlich näher liegt. Wer trotzdem in Zürich landet, kann einen Transfer ab Zürich buchen.",
        ]},
        { h3: "Fahren Sie auch von Zürich nach Genf?", p: [
          "Ja, das ist eine unserer festen Strecken. Den Festpreis zeigt der Buchungsrechner.",
        ]},
        { h3: "Wo gibt es mehr Langstreckenflüge?", p: [
          "In Zürich, dem Drehkreuz der SWISS. Genf hat ein kleineres Langstreckenangebot.",
        ]},
        { h3: "Lohnt sich ein Gabelflug Zürich–Genf?", p: [
          "Für Rundreisen durch die ganze Schweiz oft ja, weil Sie die Rückfahrt sparen.",
          "Jetzt [Transfer ab Flughafen Zürich buchen](/buchung) – Festpreis pro Fahrzeug.",
        ]},
      ],
    },
    en: {
      title: "Geneva or Zurich: Which Airport Is Right for Your Alpine Trip?",
      seo: "Geneva or Zurich: Which Airport?",
      excerpt: "Zermatt, Verbier, Gstaad, Interlaken, St. Moritz or Lucerne – depending on your destination, Geneva or Zurich is the better airport. An honest comparison by region, flight choice and onward journey, with an overview of which places are closer to which airport and tips for open-jaw trips.",
      body: [
        { p: [
          "If you are travelling to the Swiss Alps, you usually have two airports to choose from: Zurich in the north-east and Geneva in the south-west of the country. Both are well connected, both are close to major holiday regions – and yet the choice can shorten or lengthen your journey by hours.",
          "As a transfer company in Zurich we have an interest in Zurich, but an honest answer helps you more. This guide shows which airport makes sense for which destination, what matters in terms of flights and how to combine both airports cleverly.",
        ]},
        { h: "The two airports compared", p: [
          "Zurich is Switzerland's largest airport and the SWISS hub. Most long-haul flights from North America, Asia and the Middle East land here, and the choice of direct connections is the widest. Geneva is smaller but also has many European connections and some long-haul routes; it lies right on the French border and also has a French sector.",
          "For travellers from overseas this often means: Zurich can be reached on a direct flight, Geneva only with a connection. A connection in Europe can quickly cancel out any time saved on the onward drive.",
        ], table: { head: ["Criterion", "Zurich (ZRH)", "Geneva (GVA)"], rows: [
          ["Location", "north-eastern Switzerland", "south-western Switzerland, on the French border"],
          ["Long-haul flights", "widest choice, SWISS hub", "smaller choice"],
          ["Nearby regions", "Central Switzerland, Graubünden, eastern Switzerland, Ticino", "Lake Geneva, Lower Valais, French Alps"],
          ["Language region", "German", "French"],
        ]}},
        { h: "Which destination is closer to which airport?", p: [
          "As a rule of thumb: everything east of a line from Bern to Brig is usually quicker from Zurich, everything west of it from Geneva. In between there is a zone where both airports work similarly well.",
        ], table: { head: ["Region / place", "Usually better from"], rows: [
          ["Lucerne, Engelberg, Zug", "Zurich"],
          ["Davos, Klosters, St. Moritz, Laax, Lenzerheide", "Zurich"],
          ["Lugano, Locarno, Ticino", "Zurich"],
          ["Interlaken, Grindelwald, Wengen", "both similar, often Zurich"],
          ["Bern", "both similar, often Zurich"],
          ["Zermatt, Saas-Fee", "both similar"],
          ["Gstaad", "both similar, often Geneva"],
          ["Verbier, Crans-Montana", "Geneva"],
          ["Lausanne, Montreux, Lake Geneva", "Geneva"],
          ["Chamonix (France)", "Geneva"],
        ]}},
        { h: "When Zurich is the better choice", p: [
          "Zurich has a clear advantage for Central and eastern Switzerland: Lucerne is a little over an hour away, Engelberg just under two, Davos and St. Moritz via Graubünden. Zurich is also closer for Ticino; the drive through the Gotthard takes you straight to Lugano or Locarno.",
          "Then there is the choice of flights: if you want to fly direct from the USA, Asia or the Middle East, Zurich often has the only non-stop connection. For the Jungfrau region and Zermatt this frequently makes up for the slightly longer drive. Our fixed routes from Zurich are on the [routes page](/strecken).",
        ]},
        { h: "When Geneva is the better choice", p: [
          "Geneva is unbeatable for the Lake Geneva region – Lausanne, Montreux, Vevey – and for the Lower Valais with Verbier and Crans-Montana. Chamonix in France is also only around an hour from Geneva. If that is where you are going and you find a good flight to Geneva, take it.",
          "If you still fly to Zurich, for example because of a direct flight, we will take you to western Switzerland too. We have fixed routes to [Geneva](/zurich-airport-to-geneva), [Lausanne](/zurich-airport-to-lausanne), [Montreux](/zurich-airport-to-montreux) and [Verbier](/zurich-airport-to-verbier).",
        ]},
        { h: "Zermatt: the special case", p: [
          "Zermatt is about the same distance from both airports. From Zurich the drive goes via Bern and the Lötschberg car train or entirely by road into Valais; from Geneva along Lake Geneva and through the Rhône valley. In both cases the transfer ends in Täsch, because Zermatt is car-free.",
          "Here the choice of flights decides. If you have a direct flight to Zurich, travel from there. Everything about the journey is in [Zermatt transfer via Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
        ]},
        { h: "In winter: roads, passes and car trains", p: [
          "In winter the calculation sometimes changes. Many Alpine passes are closed, and the connection from German-speaking Switzerland into Valais runs either via the Lötschberg car train between Kandersteg and Goppenstein or via the longer route along Lake Geneva. On changeover Saturdays there are waits at the car train, and the Rhône valley is busy too.",
          "For destinations in Valais it is therefore worth checking both airports in winter and planning generously on Saturdays. For Graubünden, Central Switzerland and the Bernese Oberland, Zurich remains the obvious choice in winter too. More on the winter season is in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Open jaw: land in Zurich, fly home from Geneva", p: [
          "An elegant solution for round trips is an open-jaw ticket: arrive in Zurich, fly home from Geneva or the other way round. That way you cross Switzerland once without having to drive back. Many airlines offer such tickets without much of a surcharge.",
          "A typical route: Zurich – Lucerne – Interlaken – Zermatt – Lake Geneva – Geneva. A transfer is convenient for arrival and the last leg with luggage, and many travellers take the train in between. How best to combine them is explained in [Is the Swiss Travel Pass worth it?](/blog/swiss-travel-pass-lohnt-sich-vergleich-transfer).",
        ]},
        { h: "Frequently asked questions", p: []},
        { h3: "Which airport is better for Interlaken?", p: [
          "Both work. From Zurich we plan about two and a half hours; what usually decides is where the better flight goes.",
        ]},
        { h3: "Which airport is better for Verbier?", p: [
          "Geneva, because Verbier is considerably closer. If you land in Zurich anyway, you can book a transfer from Zurich.",
        ]},
        { h3: "Do you also drive from Zurich to Geneva?", p: [
          "Yes, it is one of our fixed routes. The booking calculator shows the fixed price.",
        ]},
        { h3: "Where are there more long-haul flights?", p: [
          "In Zurich, the SWISS hub. Geneva has a smaller long-haul offering.",
        ]},
        { h3: "Is an open-jaw Zurich–Geneva ticket worth it?", p: [
          "For round trips through all of Switzerland, often yes, because you save the journey back.",
          "[Book a transfer from Zurich Airport now](/buchung) – fixed price per vehicle.",
        ]},
      ],
    },
  },
  {
    slug: "flughafen-zuerich-lugano-tessin-transfer",
    date: "2026-10-07",
    img: "/gallery/3.jpg",
    de: {
      title: "Vom Flughafen Zürich nach Lugano und ins Tessin: Gotthard, Fahrzeit und die schönsten Orte im Süden",
      seo: "Flughafen Zürich–Lugano & Tessin: Transfer",
      excerpt: "In gut drei bis vier Stunden vom Flughafen Zürich unter die Palmen: wie der Transfer nach Lugano, Locarno, Ascona und Bellinzona funktioniert, wann der Gotthard staut, welche Alternative der Fahrer wählt und welche Orte im Tessin zu Ihnen passen.",
      body: [
        { p: [
          "Das Tessin ist die Schweiz mit italienischem Lebensgefühl: Palmen am Seeufer, Piazzas, Grotti mit Risotto und Merlot, dazu milde Winter und lange Sommer. Für viele Gäste ist es der Abschluss einer Schweizreise, für andere das Hauptziel – und erstaunlich viele reisen dafür über Zürich an.",
          "Dieser Guide zeigt, wie der Transfer vom Flughafen Zürich ins Tessin funktioniert, welche Route der Fahrer wählt, wann es am Gotthard eng wird und welche Orte sich für welchen Aufenthalt eignen.",
        ]},
        { h: "Die Strecken auf einen Blick", p: [
          "Die Fahrzeiten sind unsere Planungswerte für die festen Strecken inklusive Puffer; bei freier Fahrt am Gotthard sind Sie oft schneller.",
        ], table: { head: ["Ziel", "Distanz ab ZRH", "Geplante Fahrzeit"], rows: [
          ["[Bellinzona](/zurich-airport-to-bellinzona)", "rund 183 km", "etwa 219 Minuten"],
          ["[Locarno](/zurich-airport-to-locarno)", "rund 201 km", "etwa 242 Minuten"],
          ["[Lugano](/zurich-airport-to-lugano)", "rund 210 km", "etwa 252 Minuten"],
          ["[Ascona](/flughafentransfer-ascona)", "kurz hinter Locarno", "Preis im Buchungsrechner"],
        ]}},
        { h: "So entsteht der Preis", p: [
          "Für Lugano, Locarno und Bellinzona gelten feste Strecken mit einem Festpreis pro Fahrzeug, berechnet aus unserem Kilometertarif. Für andere Orte im Tessin berechnet der Buchungsrechner den Preis für Ihre genaue Adresse. Enthalten sind Meet & Greet, 60 Minuten Wartezeit nach der Landung, Flugverfolgung, Gepäck und Kindersitze; zwischen 00:00 und 06:00 Uhr gilt der Nachttarif von 20 %.",
          "Weil der Preis pro Fahrzeug gilt, teilen sich Familien und Gruppen bis sieben Personen eine V-Klasse – bei Strecken dieser Länge ein spürbarer Unterschied zu Einzeltickets.",
        ]},
        { h: "Die Route: durch den Gotthard", p: [
          "Vom Flughafen geht es auf der A4 und A2 Richtung Süden, am Vierwaldstättersee entlang durch das Urnerland bis Göschenen. Dort führt der Gotthard-Strassentunnel unter dem Massiv hindurch nach Airolo, und auf der anderen Seite beginnt das Tessin: die Leventina, Bellinzona mit seinen Burgen, dann der Monte Ceneri und Lugano.",
          "Im Sommer ist auch die Fahrt über den Gotthardpass möglich, mit der historischen Tremola-Strasse und ihren Kopfsteinpflaster-Kehren. Das verlängert die Reise, ist aber ein Erlebnis; sagen Sie es dem Fahrer bei der Buchung, wenn Sie diese Variante wünschen.",
        ]},
        { h: "Stau am Gotthard: wann und was der Fahrer tut", p: [
          "Der Gotthard ist an Ferientagen berüchtigt: Vor Ostern, an Pfingsten, an Auffahrt und an Sommersamstagen bilden sich vor den Tunnelportalen lange Kolonnen, Richtung Süden am Freitag und Samstag, Richtung Norden am Sonntag und Montag. Ausserhalb dieser Tage läuft der Verkehr meist flüssig.",
          "Bei Stau weicht der Fahrer häufig über die A13 und den San-Bernardino-Tunnel aus, die bei Bellinzona wieder auf die Gotthard-Route trifft. Welche Route schneller ist, entscheidet er nach der aktuellen Lage. Für die Rückfahrt an einem Ferienwochenende planen Sie einen grosszügigen Puffer ein.",
        ]},
        { h: "Welcher Ort im Tessin passt zu Ihnen?", p: [
          "Das Tessin ist vielseitiger, als es auf der Karte aussieht:",
        ], ul: [
          "**Lugano:** die grösste Stadt, mit Seepromenade, Einkaufsstrassen, Kongresszentrum und den Hausbergen Monte Brè und Monte San Salvatore. Ideal für Städtereisen und Geschäftsreisen.",
          "**Locarno:** die Sonnenstube am Lago Maggiore, bekannt für die Piazza Grande und das Filmfestival im August.",
          "**Ascona:** das elegante Nachbardorf von Locarno, mit Seepromenade, Boutiquen und gehobenen Hotels.",
          "**Bellinzona:** die Hauptstadt mit drei Burgen, die zum UNESCO-Welterbe gehören, und einem guten Ausgangspunkt für Wanderungen.",
          "**Morcote und Gandria:** malerische Dörfer am Luganersee, eher für einen Ausflug als für den ganzen Aufenthalt.",
          "**Valle Verzasca und Valle Maggia:** grüne Täler mit Flüssen, Steinbrücken und Badeplätzen, ideal für Natur und Wandern.",
        ]},
        { h: "Beste Reisezeit", p: [
          "Das Tessin hat das mildeste Klima der Schweiz. Im Frühling blühen Kamelien und Magnolien, oft schon Wochen früher als nördlich der Alpen; im Sommer ist es warm genug zum Baden in den Seen und Flüssen; der Herbst ist die Zeit der Kastanien und der Weinlese. Im August füllt das Filmfestival Locarno die Stadt, Hotels sind dann früh ausgebucht – mehr dazu auf unserer [Eventseite](/events).",
        ]},
        { h: "Weiter nach Italien", p: [
          "Vom Tessin sind es nur wenige Kilometer nach Italien. Der Comer See liegt kurz hinter der Grenze bei Chiasso, Mailand rund eine Stunde weiter. Viele Gäste kombinieren das Tessin mit diesen Zielen oder fliegen ab Mailand zurück. Details finden Sie in [Vom Flughafen Zürich an den Comer See](/blog/zuerich-comer-see-transfer-tagesausflug) und [Von Zürich nach Mailand](/blog/zuerich-mailand-transfer-zug-auto-vergleich).",
        ]},
        { h: "Transfer oder Zug?", p: [
          "Seit der Eröffnung des Gotthard-Basistunnels ist der Zug ins Tessin schnell, und für Alleinreisende mit leichtem Gepäck in Bahnhofsnähe eine gute Wahl. Ab Flughafen Zürich ist meist ein Umstieg nötig.",
          "Der Transfer gewinnt für Familien und Gruppen, mit viel Gepäck, Golf- oder Velotaschen, für Hotels ausserhalb der Zentren, etwa in Ascona, an den Seeufern oder in den Tälern, und für alle, die nach einem Langstreckenflug direkt ankommen möchten.",
        ]},
        { h: "Häufige Fragen zum Transfer ins Tessin", p: []},
        { h3: "Wie lange dauert die Fahrt vom Flughafen Zürich nach Lugano?", p: [
          "Wir planen mit etwa 252 Minuten. Ohne Stau am Gotthard ist es oft deutlich weniger.",
        ]},
        { h3: "Was passiert bei Stau am Gotthard?", p: [
          "Der Fahrer weicht bei Bedarf über den San Bernardino aus. Der Festpreis bleibt gleich.",
        ]},
        { h3: "Können wir über den Gotthardpass fahren?", p: [
          "Im Sommer, wenn der Pass offen ist, ja. Geben Sie den Wunsch bei der Buchung an; die Fahrt dauert länger.",
        ]},
        { h3: "Fahren Sie auch nach Ascona oder ins Verzascatal?", p: [
          "Ja. Geben Sie die Zieladresse ein, der Buchungsrechner zeigt den Preis.",
        ]},
        { h3: "Kann ich unterwegs in Luzern anhalten?", p: [
          "Ja, Luzern liegt auf dem Weg. Fügen Sie im Buchungsformular einen Zwischenstopp hinzu.",
          "Jetzt [Transfer ins Tessin buchen](/buchung) – Festpreis pro Fahrzeug.",
        ]},
      ],
    },
    en: {
      title: "From Zurich Airport to Lugano and Ticino: Gotthard, Driving Time and the Most Beautiful Places in the South",
      seo: "Zurich Airport to Lugano & Ticino: Transfer",
      excerpt: "From Zurich Airport to the palm trees in a little over three to four hours: how the transfer to Lugano, Locarno, Ascona and Bellinzona works, when the Gotthard gets congested, which alternative the driver takes and which places in Ticino suit you.",
      body: [
        { p: [
          "Ticino is Switzerland with an Italian way of life: palm trees on the lakeshore, piazzas, grotti serving risotto and Merlot, plus mild winters and long summers. For many guests it is the finale of a Swiss trip, for others the main destination – and a surprising number travel there via Zurich.",
          "This guide shows how the transfer from Zurich Airport to Ticino works, which route the driver takes, when things get tight at the Gotthard and which places suit which kind of stay.",
        ]},
        { h: "The routes at a glance", p: [
          "Driving times are our planning values for the fixed routes including a buffer; with free-flowing traffic at the Gotthard you are often quicker.",
        ], table: { head: ["Destination", "Distance from ZRH", "Planned driving time"], rows: [
          ["[Bellinzona](/zurich-airport-to-bellinzona)", "around 183 km", "about 219 minutes"],
          ["[Locarno](/zurich-airport-to-locarno)", "around 201 km", "about 242 minutes"],
          ["[Lugano](/zurich-airport-to-lugano)", "around 210 km", "about 252 minutes"],
          ["[Ascona](/flughafentransfer-ascona)", "just beyond Locarno", "price in the booking calculator"],
        ]}},
        { h: "How the price is made up", p: [
          "Lugano, Locarno and Bellinzona are fixed routes with a fixed price per vehicle, calculated from our per-kilometre tariff. For other places in Ticino, the booking calculator works out the price for your exact address. Included are meet & greet, 60 minutes of waiting time after landing, flight tracking, luggage and child seats; between midnight and 6 am the 20 % night tariff applies.",
          "Because the price is per vehicle, families and groups of up to seven share one V-Class – on routes of this length a noticeable difference compared with individual tickets.",
        ]},
        { h: "The route: through the Gotthard", p: [
          "From the airport the drive heads south on the A4 and A2, along Lake Lucerne and through the canton of Uri to Göschenen. There the Gotthard road tunnel runs under the massif to Airolo, and on the other side Ticino begins: the Leventina valley, Bellinzona with its castles, then Monte Ceneri and Lugano.",
          "In summer you can also take the Gotthard Pass road, with the historic Tremola and its cobbled hairpin bends. This lengthens the journey but is an experience in itself; tell the driver when booking if you would like this option.",
        ]},
        { h: "Gotthard traffic: when, and what the driver does", p: [
          "The Gotthard is notorious on holiday dates: before Easter, at Whitsun, at Ascension and on summer Saturdays long queues form in front of the tunnel portals – southbound on Fridays and Saturdays, northbound on Sundays and Mondays. Outside these dates traffic usually flows smoothly.",
          "In heavy traffic the driver often switches to the A13 and the San Bernardino tunnel, which rejoins the Gotthard route at Bellinzona. He decides which route is faster based on the current situation. For a return trip on a holiday weekend, allow a generous buffer.",
        ]},
        { h: "Which place in Ticino suits you?", p: [
          "Ticino is more varied than it looks on the map:",
        ], ul: [
          "**Lugano:** the largest city, with a lakeside promenade, shopping streets, a congress centre and the local mountains Monte Brè and Monte San Salvatore. Ideal for city breaks and business trips.",
          "**Locarno:** the sunny spot on Lake Maggiore, known for the Piazza Grande and the film festival in August.",
          "**Ascona:** Locarno's elegant neighbour, with a lakeside promenade, boutiques and upscale hotels.",
          "**Bellinzona:** the cantonal capital with three castles that are a UNESCO World Heritage Site, and a good base for hikes.",
          "**Morcote and Gandria:** picturesque villages on Lake Lugano, better for an excursion than for a whole stay.",
          "**Valle Verzasca and Valle Maggia:** green valleys with rivers, stone bridges and swimming spots, ideal for nature and hiking.",
        ]},
        { h: "Best time to travel", p: [
          "Ticino has the mildest climate in Switzerland. In spring camellias and magnolias bloom, often weeks earlier than north of the Alps; in summer it is warm enough to swim in the lakes and rivers; autumn is the time of chestnuts and the grape harvest. In August the Locarno Film Festival fills the town and hotels book up early – more on our [events page](/events).",
        ]},
        { h: "On to Italy", p: [
          "From Ticino Italy is only a few kilometres away. Lake Como lies just beyond the border at Chiasso, Milan around an hour further. Many guests combine Ticino with these destinations or fly home from Milan. Details are in [From Zurich Airport to Lake Como](/blog/zuerich-comer-see-transfer-tagesausflug) and [From Zurich to Milan](/blog/zuerich-mailand-transfer-zug-auto-vergleich).",
        ]},
        { h: "Transfer or train?", p: [
          "Since the Gotthard Base Tunnel opened, the train to Ticino has been fast, and for solo travellers with light luggage near the station it is a good choice. From Zurich Airport a change is usually needed.",
          "The transfer wins for families and groups, with a lot of luggage, golf or bike bags, for hotels outside the centres – in Ascona, on the lakeshores or in the valleys – and for anyone who wants to arrive directly after a long-haul flight.",
        ]},
        { h: "Frequently asked questions about the Ticino transfer", p: []},
        { h3: "How long is the drive from Zurich Airport to Lugano?", p: [
          "We plan about 252 minutes. Without traffic at the Gotthard it is often considerably less.",
        ]},
        { h3: "What happens if there is traffic at the Gotthard?", p: [
          "The driver switches to the San Bernardino if needed. The fixed price stays the same.",
        ]},
        { h3: "Can we drive over the Gotthard Pass?", p: [
          "In summer, when the pass is open, yes. Mention it when booking; the drive takes longer.",
        ]},
        { h3: "Do you also drive to Ascona or the Verzasca valley?", p: [
          "Yes. Enter the destination address and the booking calculator shows the price.",
        ]},
        { h3: "Can I stop in Lucerne on the way?", p: [
          "Yes, Lucerne is on the way. Add an intermediate stop in the booking form.",
          "[Book your Ticino transfer now](/buchung) – fixed price per vehicle.",
        ]},
      ],
    },
  },
  {
    slug: "hotels-flughafen-zuerich-uebernachten",
    date: "2026-10-07",
    img: "/hero/hero-2.jpg",
    de: {
      title: "Hotels am Flughafen Zürich: Wo übernachten vor dem Frühflug oder nach der späten Landung?",
      seo: "Hotels am Flughafen Zürich: die Optionen",
      excerpt: "Zu Fuss ins Terminal, mit dem Shuttle in fünf Minuten oder doch lieber in die Stadt? Welche Hotels direkt am Flughafen Zürich liegen, welche in Glattbrugg, Opfikon und Rümlang, für wen sich ein Flughafenhotel lohnt – und wie Sie am nächsten Morgen entspannt in die Berge oder zum Abflug kommen.",
      body: [
        { p: [
          "Ein Flug um 06:30 Uhr, eine Landung kurz vor Mitternacht, ein langer Umstieg: Es gibt viele Gründe, eine Nacht direkt am Flughafen Zürich zu verbringen. Rund um den Flughafen gibt es eine grosse Auswahl an Hotels – von Häusern, die zu Fuss mit dem Terminal verbunden sind, bis zu Hotels in den Nachbarorten mit Shuttle.",
          "Dieser Guide gibt einen Überblick über die Lagen, hilft bei der Entscheidung zwischen Flughafenhotel und Stadthotel und zeigt, wie Sie die Nacht am Flughafen mit der Weiterreise am nächsten Tag verbinden. Preise und Shuttle-Konditionen ändern sich; prüfen Sie diese direkt beim Hotel.",
        ]},
        { h: "Direkt am Flughafen: zu Fuss ins Terminal", p: [
          "Die bequemste Lage haben Hotels, die Sie ohne Shuttle erreichen:",
        ], ul: [
          "**Radisson Blu Hotel Zurich Airport:** direkt neben dem Flughafengebäude, über einen gedeckten Weg mit den Terminals verbunden und nur wenige Gehminuten vom Bahnhof entfernt.",
          "**Hyatt Regency und Hyatt Place in The Circle:** im modernen Quartier The Circle gegenüber dem Terminal, mit Restaurants, Geschäften und einem Kongresszentrum. Zu Fuss in wenigen Minuten am Check-in.",
        ]},
        { p: [
          "Diese Hotels sind ideal für sehr frühe Abflüge, späte Ankünfte und kurze Geschäftstermine in The Circle. Sie sind in der Regel teurer als Häuser in den Nachbarorten, sparen dafür aber jede Minute.",
        ]},
        { h: "In der Nähe: Glattbrugg, Opfikon, Kloten und Rümlang", p: [
          "In den Gemeinden rund um den Flughafen liegen zahlreiche weitere Hotels, viele davon mit Shuttle zum Terminal. Bekannte Häuser sind etwa das Mövenpick Hotel Zürich-Airport und das Dorint Airport-Hotel in Glattbrugg, das Hilton Zurich Airport in Opfikon sowie mehrere Häuser in Rümlang und Kloten, vom Businesshotel bis zur günstigen Option.",
          "Die Fahrt zum Terminal dauert meist nur wenige Minuten. Achten Sie bei der Buchung darauf, ob der Shuttle kostenlos ist, ab wann er am Morgen fährt und ob er zu Ihrer Abflugzeit schon verkehrt – gerade bei Abflügen vor 06:00 Uhr ist das nicht selbstverständlich.",
        ], table: { head: ["Lage", "Weg zum Terminal", "Geeignet für"], rows: [
          ["Am Flughafen / The Circle", "zu Fuss, wenige Minuten", "Frühflüge, späte Landung, kurze Termine"],
          ["Glattbrugg / Opfikon", "Shuttle oder kurze Fahrt", "Preisbewusste, Messe Zürich, Geschäftsreisen"],
          ["Kloten / Rümlang", "Shuttle oder kurze Fahrt", "Günstige Übernachtung, längere Aufenthalte"],
          ["Zürich Stadt", "ca. 10–15 Min. mit dem Zug", "Wer abends noch etwas von Zürich sehen will"],
        ]}},
        { h: "Flughafenhotel oder Stadthotel?", p: [
          "Ein Flughafenhotel lohnt sich, wenn die Nacht kurz ist: Frühflug, späte Landung, Umstieg mit Übernachtung. Wer dagegen den Abend nutzen möchte, übernachtet besser in Zürich; die Altstadt, der See und die Restaurants sind mit dem Zug in einer Viertelstunde erreichbar, und am nächsten Morgen sind Sie ebenso schnell am Flughafen.",
          "Für einen Aufenthalt von 24 Stunden zwischen zwei Flügen haben wir einen eigenen Ablauf: [24 Stunden in Zürich](/blog/24-stunden-in-zuerich). Und wer nur einige Stunden Zeit hat, findet Ideen in [Zwischenlandung in Zürich](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ]},
        { h: "Späte Landung: erst schlafen, dann in die Berge", p: [
          "Wer abends spät landet und eigentlich nach Zermatt, St. Moritz oder Grindelwald will, sollte überlegen, die Nacht am Flughafen zu verbringen. Eine drei- bis fünfstündige Fahrt nach einem Langstreckenflug mitten in der Nacht ist anstrengend, und zwischen 00:00 und 06:00 Uhr gilt unser Nachttarif von 20 %.",
          "Die entspanntere Variante: Übernachtung am Flughafen, ausgeschlafen frühstücken und am nächsten Morgen mit dem Transfer direkt vom Hotel in die Berge. Tragen Sie bei der Buchung einfach das Flughafenhotel als Abholadresse ein. Mehr zu späten Ankünften steht in [Nachtankunft am Flughafen Zürich](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "Frühflug: vom Hotel ans Terminal", p: [
          "Bei Hotels direkt am Flughafen gehen Sie einfach zu Fuss. Bei Hotels in den Nachbarorten ist der Shuttle praktisch, wenn er früh genug fährt; sonst ist eine kurze Transferfahrt mit Gepäck die zuverlässigere Lösung, besonders für Familien oder Gruppen mit mehreren Koffern.",
          "Wie viel Zeit Sie am Flughafen einplanen sollten, erklärt [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in). Bei Hotels direkt am Terminal genügt es, rund zwei Stunden vor einem Europaflug loszugehen.",
        ]},
        { h: "Für Geschäftsreisende: The Circle und Messe Zürich", p: [
          "Seit der Eröffnung von The Circle ist der Flughafen selbst ein Geschäftsstandort mit Büros, Kongresszentrum und Hotels. Für Meetings dort ist ein Hotel am Flughafen ideal. Die Messe Zürich in Oerlikon liegt ebenfalls nah; Hotels in Glattbrugg und Opfikon sind dafür eine gute Basis.",
          "Für Termine an mehreren Orten im Raum Zürich lohnt sich eine Stundenbuchung: Der Fahrer holt Sie im Hotel ab und wartet zwischen den Terminen. Die Rechnung mit ausgewiesener Mehrwertsteuer ist in [Firmentransfers in Zürich](/blog/firmentransfers-zuerich-rechnung-mwst-spesen) beschrieben.",
        ]},
        { h: "Häufige Fragen zu Hotels am Flughafen Zürich", p: []},
        { h3: "Welche Hotels sind zu Fuss vom Terminal erreichbar?", p: [
          "Das Radisson Blu Hotel Zurich Airport sowie das Hyatt Regency und das Hyatt Place in The Circle.",
        ]},
        { h3: "Fahren die Hotel-Shuttles auch sehr früh?", p: [
          "Das ist je nach Hotel unterschiedlich. Fragen Sie vor der Buchung nach den Zeiten, wenn Ihr Flug sehr früh startet.",
        ]},
        { h3: "Holen Sie mich auch im Flughafenhotel ab?", p: [
          "Ja. Geben Sie das Hotel als Abholadresse an, zum Beispiel für die Fahrt in die Berge am Morgen nach einer späten Landung.",
        ]},
        { h3: "Lohnt sich ein Flughafenhotel vor einem Flug um 07:00 Uhr?", p: [
          "Wenn Sie weiter als eine Stunde entfernt wohnen, oft ja – Sie gewinnen Schlaf und vermeiden den Nachttarif bei einer Abholung vor 06:00 Uhr.",
        ]},
        { h3: "Wie weit ist es vom Flughafen in die Stadt Zürich?", p: [
          "Mit dem Zug etwa 10 bis 15 Minuten bis Zürich HB, mit dem Auto je nach Verkehr etwas länger.",
          "Jetzt [Transfer ab Ihrem Hotel buchen](/buchung) – Festpreis pro Fahrzeug.",
        ]},
      ],
    },
    en: {
      title: "Hotels at Zurich Airport: Where to Stay Before an Early Flight or After a Late Landing",
      seo: "Hotels at Zurich Airport: Your Options",
      excerpt: "Walk to the terminal, take a five-minute shuttle or stay in the city after all? Which hotels are right at Zurich Airport, which are in Glattbrugg, Opfikon and Rümlang, who an airport hotel is worthwhile for – and how to travel relaxed to the mountains or your departure the next morning.",
      body: [
        { p: [
          "A flight at 6:30 am, a landing just before midnight, a long layover: there are many reasons to spend a night right at Zurich Airport. Around the airport there is a wide choice of hotels – from properties connected to the terminal on foot to hotels in neighbouring towns with a shuttle.",
          "This guide gives an overview of the locations, helps you decide between an airport hotel and a city hotel, and shows how to combine a night at the airport with onward travel the next day. Prices and shuttle conditions change; check them directly with the hotel.",
        ]},
        { h: "Right at the airport: walk to the terminal", p: [
          "The most convenient location is offered by hotels you can reach without a shuttle:",
        ], ul: [
          "**Radisson Blu Hotel Zurich Airport:** right next to the airport building, connected to the terminals by a covered walkway and only a few minutes' walk from the station.",
          "**Hyatt Regency and Hyatt Place at The Circle:** in the modern Circle quarter opposite the terminal, with restaurants, shops and a convention centre. A few minutes' walk to check-in.",
        ]},
        { p: [
          "These hotels are ideal for very early departures, late arrivals and short business meetings at The Circle. They are usually more expensive than hotels in the neighbouring towns, but save every minute.",
        ]},
        { h: "Nearby: Glattbrugg, Opfikon, Kloten and Rümlang", p: [
          "The towns around the airport have many more hotels, many with a shuttle to the terminal. Well-known names include the Mövenpick Hotel Zurich-Airport and the Dorint Airport-Hotel in Glattbrugg, the Hilton Zurich Airport in Opfikon and several properties in Rümlang and Kloten, from business hotels to budget options.",
          "The ride to the terminal usually takes only a few minutes. When booking, check whether the shuttle is free, when it starts running in the morning and whether it operates at your departure time – especially for departures before 6 am this is not a given.",
        ], table: { head: ["Location", "Way to the terminal", "Suitable for"], rows: [
          ["At the airport / The Circle", "on foot, a few minutes", "Early flights, late landings, short meetings"],
          ["Glattbrugg / Opfikon", "shuttle or short drive", "Budget-conscious, Messe Zürich, business trips"],
          ["Kloten / Rümlang", "shuttle or short drive", "Cheaper overnight stays, longer stays"],
          ["Zurich city", "approx. 10–15 min by train", "Anyone who wants to see some of Zurich in the evening"],
        ]}},
        { h: "Airport hotel or city hotel?", p: [
          "An airport hotel pays off when the night is short: an early flight, a late landing, a layover with an overnight stay. If you want to make use of the evening, however, it is better to stay in Zurich; the old town, the lake and the restaurants are a quarter of an hour away by train, and the next morning you are back at the airport just as quickly.",
          "For a 24-hour stay between two flights we have a dedicated schedule: [24 hours in Zurich](/blog/24-stunden-in-zuerich). And if you only have a few hours, you will find ideas in [Layover in Zurich](/blog/zwischenlandung-flughafen-zuerich-4-8-stunden-was-tun).",
        ]},
        { h: "Late landing: sleep first, then head for the mountains", p: [
          "If you land late in the evening and actually want to go to Zermatt, St. Moritz or Grindelwald, consider spending the night at the airport. A three- to five-hour drive after a long-haul flight in the middle of the night is tiring, and between midnight and 6 am our 20 % night tariff applies.",
          "The more relaxed option: stay at the airport, have a proper breakfast and take the transfer straight from the hotel to the mountains the next morning. Simply enter the airport hotel as your pickup address when booking. More on late arrivals is in [Late-night arrival at Zurich Airport](/blog/nachtankunft-flughafen-zuerich-nach-23-uhr).",
        ]},
        { h: "Early flight: from the hotel to the terminal", p: [
          "From hotels right at the airport you simply walk. From hotels in neighbouring towns the shuttle is practical if it runs early enough; otherwise a short transfer with luggage is the more reliable solution, especially for families or groups with several suitcases.",
          "How much time to allow at the airport is explained in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in). From hotels right at the terminal it is enough to set off around two hours before a European flight.",
        ]},
        { h: "For business travellers: The Circle and Messe Zürich", p: [
          "Since The Circle opened, the airport itself has become a business location with offices, a convention centre and hotels. For meetings there an airport hotel is ideal. Messe Zürich in Oerlikon is also close; hotels in Glattbrugg and Opfikon are a good base for it.",
          "For meetings in several places around Zurich an hourly booking pays off: the driver picks you up at the hotel and waits between appointments. Invoicing with VAT shown is described in [Corporate transfers in Zurich](/blog/firmentransfers-zuerich-rechnung-mwst-spesen).",
        ]},
        { h: "Frequently asked questions about hotels at Zurich Airport", p: []},
        { h3: "Which hotels can be reached on foot from the terminal?", p: [
          "The Radisson Blu Hotel Zurich Airport and the Hyatt Regency and Hyatt Place at The Circle.",
        ]},
        { h3: "Do the hotel shuttles run very early?", p: [
          "That varies from hotel to hotel. Ask about the times before booking if your flight leaves very early.",
        ]},
        { h3: "Will you pick me up at an airport hotel?", p: [
          "Yes. Enter the hotel as your pickup address, for example for the drive to the mountains the morning after a late landing.",
        ]},
        { h3: "Is an airport hotel worth it before a 7 am flight?", p: [
          "If you live more than an hour away, often yes – you gain sleep and avoid the night tariff for a pickup before 6 am.",
        ]},
        { h3: "How far is it from the airport to Zurich city?", p: [
          "About 10 to 15 minutes by train to Zurich HB, a little longer by car depending on traffic.",
          "[Book a transfer from your hotel now](/buchung) – fixed price per vehicle.",
        ]},
      ],
    },
  },
  {
    slug: "flughafen-zuerich-terminals-docks-erklaert",
    date: "2026-10-07",
    img: "/hero/hero-1.jpg",
    de: {
      title: "Flughafen Zürich einfach erklärt: Check-in 1, 2 und 3, Docks A, B, D und E und die Skymetro",
      seo: "Flughafen Zürich: Terminals & Docks erklärt",
      excerpt: "Zürich ist ein «One-Terminal»-Flughafen – und trotzdem verwirren Check-in-Bereiche, Docks, Gate-Buchstaben und die Skymetro viele Reisende. Wie der Flughafen aufgebaut ist, welche Gates für Schengen und Nicht-Schengen gelten, wie lange die Wege dauern und wo Sie Ihren Fahrer treffen.",
      body: [
        { p: [
          "Auf dem Ticket steht «Gate E42», auf der Anzeigetafel «Check-in 3», und am Telefon fragt der Fahrer, ob Sie in Ankunft 1 oder 2 sind. Wer zum ersten Mal in Zürich ist, fragt sich schnell, wie viele Terminals dieser Flughafen eigentlich hat. Die gute Nachricht: Zürich ist kompakt und logisch aufgebaut, wenn man das Prinzip einmal kennt.",
          "Dieser Guide erklärt den Aufbau des Flughafens Zürich Schritt für Schritt – vom Bahnhof über den Check-in bis zum Gate – und zeigt, wo Sie bei der Ankunft Ihren Fahrer treffen.",
        ]},
        { h: "Das Prinzip: ein Terminal, mehrere Docks", p: [
          "Der Flughafen Zürich ist ein sogenannter One-Terminal-Flughafen. Es gibt ein zentrales Gebäude mit den Check-in-Bereichen, eine gemeinsame Sicherheitskontrolle und hinter der Kontrolle das Airside Center, von dem die Docks mit den Gates abgehen. Sie können also überall durch die Kontrolle gehen und erreichen trotzdem jedes Gate.",
          "Laut Flughafen und Airlines brauchen Reisende vom Check-in bis zum Gate höchstens rund 30 Minuten. Das macht Zürich zu einem der angenehmsten Umsteigeflughäfen Europas.",
        ], table: { head: ["Bereich", "Was dort passiert"], rows: [
          ["Check-in 1, 2 und 3", "Schalter, Self-Check-in und Gepäckabgabe vor der Sicherheitskontrolle"],
          ["Sicherheitskontrolle", "zentral, für alle Gates gemeinsam"],
          ["Airside Center", "Shopping, Restaurants und Lounges hinter der Kontrolle, Verbindung zu den Docks"],
          ["Gates A und B", "Flüge innerhalb des Schengenraums"],
          ["Gates D und E", "Flüge ausserhalb des Schengenraums, mit Passkontrolle"],
          ["Ankunft 1 und Ankunft 2", "öffentliche Ankunftshallen, Treffpunkt mit dem Fahrer"],
        ]}},
        { h: "Check-in 1, 2 und 3", p: [
          "Die drei Check-in-Bereiche liegen alle vor der Sicherheitskontrolle. Check-in 1 und Check-in 2 befinden sich in der Abflughalle, Check-in 3 im Airport Center direkt über dem Bahnhof. Welcher Bereich für Sie gilt, hängt von der Airline ab und steht auf der Anzeigetafel und in der Buchungsbestätigung; die SWISS etwa nutzt Check-in 1 und Check-in 3.",
          "Wer online eingecheckt hat und nur Handgepäck dabeihat, geht direkt zur Sicherheitskontrolle. Mit aufgegebenem Gepäck führt der Weg zuerst zum Schalter oder zur Self-Bag-Drop-Station Ihrer Airline.",
        ]},
        { h: "Die Gates: A, B, D und E", p: [
          "Nach der Sicherheitskontrolle gelangen Sie ins Airside Center. Von hier gehen die Docks ab:",
        ], ul: [
          "**Dock A:** Gates A, Flüge innerhalb des Schengenraums, etwa nach Deutschland, Frankreich, Italien, Spanien oder Skandinavien.",
          "**Dock B mit den Gates B und D:** Die Gates B bedienen Schengen-Flüge, die Gates D im selben Dock Nicht-Schengen-Flüge, etwa nach London. Für D geht es durch die Passkontrolle.",
          "**Dock E:** das Langstrecken-Dock mit den Gates E, für Flüge ausserhalb des Schengenraums, etwa nach Nordamerika, Asien oder in den Nahen Osten. Es liegt zwischen den Pisten und ist nur mit der Skymetro erreichbar.",
        ]},
        { h: "Die Skymetro zum Dock E", p: [
          "Die Skymetro ist eine kleine, fahrerlose Bahn, die das Airside Center in rund drei Minuten mit dem Dock E verbindet und dabei unter einer Piste hindurchfährt. Sie fährt im Pendelbetrieb ohne Fahrplan, Sie müssen also nur einsteigen. Vorher passieren Sie die Passkontrolle.",
          "Verwechseln Sie die Skymetro nicht mit dem Zug in die Stadt: Sie verkehrt nur innerhalb des Sicherheitsbereichs. Planen Sie für den Weg zu einem E-Gate inklusive Passkontrolle und Skymetro etwas mehr Zeit ein als für die Gates A oder B.",
        ]},
        { h: "Bahnhof, Parkhäuser und The Circle", p: [
          "Der Bahnhof Zürich Flughafen liegt direkt unter dem Airport Center; von dort führen Rolltreppen und Lifte zu Check-in 3 und in die Abflughalle. Die Parkhäuser P1, P2 und P3 sind direkt mit dem Gebäude verbunden – Details und Preise stehen in [Parkieren am Flughafen Zürich](/blog/parkieren-flughafen-zuerich-preise-alternative).",
          "Gegenüber dem Terminal liegt The Circle mit Hotels, Restaurants, Büros und einem Kongresszentrum. Welche Hotels zu Fuss erreichbar sind, zeigt [Hotels am Flughafen Zürich](/blog/hotels-flughafen-zuerich-uebernachten). Wer Zeit hat, besucht die Zuschauerterrasse mit Blick auf das Vorfeld.",
        ]},
        { h: "Bei der Ankunft: Ankunft 1 oder Ankunft 2", p: [
          "Nach der Landung folgen Sie den Schildern zur Gepäckausgabe und zum Ausgang. Es gibt zwei öffentliche Ankunftshallen: Ankunft 1 und Ankunft 2. Welche für Sie gilt, hängt vom Flug ab; Ihr Fahrer kennt sie anhand der Flugnummer und wartet mit Namensschild direkt am Ausgang.",
          "Alles zum Treffpunkt, zur Wartezeit und dazu, was Sie tun, wenn Sie sich nicht gleich finden, steht in [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "Beim Abflug: wo der Fahrer Sie absetzt", p: [
          "Bei der Fahrt zum Flughafen setzt der Fahrer Sie vor der Abflughalle ab, möglichst nah am Check-in-Bereich Ihrer Airline. Sagen Sie ihm einfach, ob Sie zu Check-in 1, 2 oder 3 müssen; steht es noch nicht fest, bringt er Sie zum zentralen Eingang, von dem aus alle Bereiche in wenigen Minuten erreichbar sind.",
          "Wie viel Zeit Sie am Flughafen einplanen sollten, erklärt [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Häufige Fragen zum Aufbau des Flughafens Zürich", p: []},
        { h3: "Wie viele Terminals hat der Flughafen Zürich?", p: [
          "Eigentlich eines: Zürich ist ein One-Terminal-Flughafen mit drei Check-in-Bereichen und mehreren Docks mit den Gates A, B, D und E.",
        ]},
        { h3: "Wie komme ich zu den Gates E?", p: [
          "Nach der Sicherheits- und der Passkontrolle mit der Skymetro, die in rund drei Minuten zum Dock E fährt.",
        ]},
        { h3: "Welche Gates sind für Schengen-Flüge?", p: [
          "Die Gates A und B. Die Gates D und E bedienen Flüge ausserhalb des Schengenraums.",
        ]},
        { h3: "Wo ist der Bahnhof?", p: [
          "Direkt unter dem Airport Center, mit Rolltreppen zu Check-in 3 und zur Abflughalle.",
        ]},
        { h3: "Wo treffe ich meinen Fahrer?", p: [
          "In der öffentlichen Ankunftshalle, Ankunft 1 oder Ankunft 2, direkt nach dem Ausgang. Der Fahrer wartet mit einem Namensschild.",
          "Jetzt [Transfer ab Flughafen Zürich buchen](/buchung) – Meet & Greet in der Ankunftshalle inklusive.",
        ]},
      ],
    },
    en: {
      title: "Zurich Airport Explained Simply: Check-in 1, 2 and 3, Docks A, B, D and E and the Skymetro",
      seo: "Zurich Airport: Terminals & Docks Explained",
      excerpt: "Zurich is a one-terminal airport – and yet check-in areas, docks, gate letters and the Skymetro confuse many travellers. How the airport is laid out, which gates are for Schengen and non-Schengen flights, how long the walks take and where to meet your driver.",
      body: [
        { p: [
          "Your ticket says \"Gate E42\", the departure board says \"Check-in 3\", and on the phone the driver asks whether you are in Arrival 1 or 2. Anyone in Zurich for the first time soon wonders how many terminals this airport actually has. The good news: Zurich is compact and logically laid out once you know the principle.",
          "This guide explains the layout of Zurich Airport step by step – from the station via check-in to the gate – and shows where to meet your driver on arrival.",
        ]},
        { h: "The principle: one terminal, several docks", p: [
          "Zurich Airport is a so-called one-terminal airport. There is one central building with the check-in areas, a shared security check and, beyond security, the Airside Center from which the docks with the gates extend. So you can go through security anywhere and still reach every gate.",
          "According to the airport and airlines, travellers need at most around 30 minutes from check-in to the gate. That makes Zurich one of the most pleasant transfer airports in Europe.",
        ], table: { head: ["Area", "What happens there"], rows: [
          ["Check-in 1, 2 and 3", "Counters, self check-in and bag drop before security"],
          ["Security check", "central, shared for all gates"],
          ["Airside Center", "shops, restaurants and lounges beyond security, connection to the docks"],
          ["Gates A and B", "flights within the Schengen area"],
          ["Gates D and E", "flights outside the Schengen area, with passport control"],
          ["Arrival 1 and Arrival 2", "public arrivals halls, meeting point with the driver"],
        ]}},
        { h: "Check-in 1, 2 and 3", p: [
          "All three check-in areas are before security. Check-in 1 and Check-in 2 are in the departures hall, Check-in 3 is in the Airport Center directly above the railway station. Which area applies to you depends on the airline and is shown on the departure board and in your booking confirmation; SWISS, for example, uses Check-in 1 and Check-in 3.",
          "If you have checked in online and only have hand luggage, go straight to security. With checked luggage, first go to your airline's counter or self bag-drop station.",
        ]},
        { h: "The gates: A, B, D and E", p: [
          "After security you enter the Airside Center. The docks extend from here:",
        ], ul: [
          "**Dock A:** gates A, flights within the Schengen area, for example to Germany, France, Italy, Spain or Scandinavia.",
          "**Dock B with gates B and D:** gates B serve Schengen flights, gates D in the same dock serve non-Schengen flights, for example to London. For D you pass through passport control.",
          "**Dock E:** the long-haul dock with gates E, for flights outside the Schengen area, for example to North America, Asia or the Middle East. It lies between the runways and can only be reached by the Skymetro.",
        ]},
        { h: "The Skymetro to Dock E", p: [
          "The Skymetro is a small driverless train that connects the Airside Center with Dock E in around three minutes, passing under a runway. It runs as a shuttle without a timetable, so you simply get on. You pass through passport control beforehand.",
          "Do not confuse the Skymetro with the train to the city: it only runs within the security area. Allow a little more time to reach an E gate, including passport control and the Skymetro, than for gates A or B.",
        ]},
        { h: "Railway station, car parks and The Circle", p: [
          "Zürich Flughafen railway station lies directly beneath the Airport Center; escalators and lifts lead up to Check-in 3 and the departures hall. Car parks P1, P2 and P3 are directly connected to the building – details and prices are in [Parking at Zurich Airport](/blog/parkieren-flughafen-zuerich-preise-alternative).",
          "Opposite the terminal is The Circle, with hotels, restaurants, offices and a convention centre. Which hotels can be reached on foot is shown in [Hotels at Zurich Airport](/blog/hotels-flughafen-zuerich-uebernachten). If you have time, visit the observation deck overlooking the apron.",
        ]},
        { h: "On arrival: Arrival 1 or Arrival 2", p: [
          "After landing, follow the signs to baggage claim and the exit. There are two public arrivals halls: Arrival 1 and Arrival 2. Which one applies depends on your flight; your driver knows it from the flight number and waits with a name sign right at the exit.",
          "Everything about the meeting point, waiting time and what to do if you do not find each other straight away is in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich).",
        ]},
        { h: "On departure: where the driver drops you off", p: [
          "On the way to the airport the driver drops you in front of the departures hall, as close as possible to your airline's check-in area. Just tell him whether you need Check-in 1, 2 or 3; if it is not yet known, he takes you to the central entrance, from where all areas are a few minutes away.",
          "How much time to allow at the airport is explained in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Frequently asked questions about the layout of Zurich Airport", p: []},
        { h3: "How many terminals does Zurich Airport have?", p: [
          "Essentially one: Zurich is a one-terminal airport with three check-in areas and several docks with gates A, B, D and E.",
        ]},
        { h3: "How do I get to the E gates?", p: [
          "After security and passport control, take the Skymetro, which reaches Dock E in around three minutes.",
        ]},
        { h3: "Which gates are for Schengen flights?", p: [
          "Gates A and B. Gates D and E serve flights outside the Schengen area.",
        ]},
        { h3: "Where is the railway station?", p: [
          "Directly beneath the Airport Center, with escalators up to Check-in 3 and the departures hall.",
        ]},
        { h3: "Where do I meet my driver?", p: [
          "In the public arrivals hall, Arrival 1 or Arrival 2, right after the exit. The driver waits with a name sign.",
          "[Book a transfer from Zurich Airport now](/buchung) – meet & greet in the arrivals hall included.",
        ]},
      ],
    },
  },
  {
    slug: "spengler-cup-davos-anreise-transfer",
    date: "2026-10-07",
    img: "/gallery/13.jpg",
    de: {
      title: "Spengler Cup Davos 2026: Spielplan, Tickets, Unterkunft und die entspannte Anreise ab Zürich",
      seo: "Spengler Cup Davos 2026: Anreise & Tipps",
      excerpt: "Vom 26. bis 31. Dezember 2026 spielt in Davos das älteste internationale Eishockeyturnier der Welt. Was Sie über Spielzeiten, Tickets, Hotels und Kleidung wissen sollten – und wie die Anreise vom Flughafen Zürich zwischen Weihnachten und Neujahr reibungslos klappt.",
      body: [
        { p: [
          "Zwischen Weihnachten und Neujahr wird Davos zur Hauptstadt des Eishockeys. Der Spengler Cup, seit 1923 ausgetragen, ist das älteste internationale Eishockeyturnier der Welt und einer der grössten Sportanlässe der Schweiz. Rund 100'000 Besucher kommen jedes Jahr ins Eisstadion Davos und in die Fanzonen davor.",
          "Dieser Guide fasst zusammen, wann gespielt wird, wie Sie an Tickets kommen, wo Sie übernachten und wie die Anreise vom Flughafen Zürich in einer der verkehrsreichsten Wochen des Jahres funktioniert. Alle Angaben entsprechen dem Stand Oktober 2026; die Spielpaarungen und den genauen Spielplan veröffentlicht der Veranstalter auf der offiziellen Website.",
        ]},
        { h: "Der Spengler Cup 2026 auf einen Blick", p: [
          "Die wichtigsten Eckdaten zur 96. Austragung:",
        ], table: { head: ["Eckdaten", "Spengler Cup Davos 2026"], rows: [
          ["Datum", "26. bis 31. Dezember 2026"],
          ["Ort", "Eisstadion Davos (zondacrypto-Arena), Davos Platz"],
          ["Spielzeiten", "26.–30. Dezember je ein Nachmittags- und ein Abendspiel, Final am 31. Dezember um 12:00 Uhr"],
          ["Teams", "Gastgeber HC Davos und eingeladene Mannschaften aus aller Welt"],
          ["Tickets", "Sitzplätze ab CHF 98, Stehplätze CHF 35 (Angaben des Veranstalters)"],
          ["Besucher", "rund 100'000 pro Turnier"],
        ]}},
        { h: "Warum der Spengler Cup besonders ist", p: [
          "Der Reiz liegt in der Mischung: ein traditionsreiches Holzstadion mitten in einem Bergort, Mannschaften mit unterschiedlichen Spielstilen aus Europa und Nordamerika und ein Termin, an dem viele ohnehin Ferien haben. Davos ist während dieser Tage voller Fans, die tagsüber Ski fahren und abends ins Stadion gehen.",
          "Auch wer kein Eishockeyfan ist, erlebt in Davos eine besondere Stimmung: Fanzonen, Konzerte und volle Restaurants machen die Tage zwischen den Jahren zu einem Fest.",
        ]},
        { h: "Tickets: früh entscheiden", p: [
          "Tickets gibt es über den offiziellen Ticketverkauf des Spengler Cup. Die Finalspiele und die Spiele des HC Davos sind besonders gefragt; wer feste Sitzplätze will, sollte früh buchen. Stehplätze sind günstiger und bieten die lauteste Atmosphäre, verlangen aber warme Kleidung und Geduld beim Einlass.",
          "Planen Sie bei den Spielzeiten Puffer ein: Rund um Spielbeginn und Spielende sind die Strassen und Gehwege in Davos Platz voll. Wer direkt nach einem Abendspiel abgeholt werden möchte, vereinbart mit dem Fahrer einen Treffpunkt etwas ausserhalb des Stadionbereichs.",
        ]},
        { h: "Unterkunft: Davos, Klosters oder die Umgebung", p: [
          "Hotels in Davos sind in der Spengler-Woche oft Monate im Voraus ausgebucht und teurer als sonst. Gute Alternativen sind Klosters, rund 15 Minuten entfernt, sowie Orte im Prättigau. Wer flexibel ist, kombiniert den Spengler Cup mit Skitagen in Davos-Klosters und reist am 30. oder 31. Dezember für Silvester weiter.",
          "Tragen Sie bei der Transferbuchung den genauen Hotelnamen ein. Davos besteht aus Davos Dorf und Davos Platz, die einige Kilometer auseinanderliegen; der Fahrer bringt Sie direkt vor die richtige Tür.",
        ]},
        { h: "Anreise vom Flughafen Zürich", p: [
          "Die Fahrt vom Flughafen Zürich nach Davos führt über die A3 entlang des Zürich- und Walensees nach Landquart und weiter durch das Prättigau. Wir planen auf der festen Strecke mit etwa 194 Minuten; bei freier Strasse ist es weniger. Alle Details zur Route und zum Preis finden Sie auf der Seite [Transfer nach Davos](/zurich-airport-to-davos).",
          "Zwischen Weihnachten und Neujahr ist auf dieser Strecke allerdings viel los: Ferienbeginn, Wechselsamstage und Silvesterreisende treffen aufeinander, besonders am 26. Dezember und an den Samstagen. Bei Schneefall im Prättigau kann es zusätzlich langsamer werden. Der Fahrer verfolgt Ihren Flug, kennt die Verkehrslage und plant entsprechend; für die Rückreise empfehlen wir einen Puffer von 45 bis 60 Minuten.",
          "Skigepäck befördern wir kostenlos, bis zu vier Skisäcke pro Fahrzeug. Für Familien und Fangruppen bis sieben Personen ist die V-Klasse die richtige Wahl, der Festpreis gilt pro Fahrzeug.",
        ]},
        { h: "Was Sie mitnehmen sollten", p: [
          "Davos liegt auf über 1'500 Metern; Ende Dezember sind Temperaturen weit unter null normal. Für Stehplätze und die Fanzonen gehören warme Schuhe, Mütze, Handschuhe und mehrere Schichten Kleidung ins Gepäck. Im Stadion selbst ist es wärmer, aber nicht warm.",
          "Praktisch sind ausserdem ein kleiner Rucksack statt grosser Taschen und eine Powerbank – das Mobilnetz ist an Spieltagen stark belastet.",
        ]},
        { h: "Spengler Cup und Silvester kombinieren", p: [
          "Das Finale findet am 31. Dezember mittags statt. Wer danach Silvester in Davos feiert, bleibt einfach vor Ort. Wer den Jahreswechsel in Zürich verbringen möchte, plant die Rückfahrt direkt nach dem Final ein; den Ablauf in Zürich beschreibt [Silvester in Zürich](/blog/silvester-zuerich-feuerwerk-transfer). Für Januar lohnt sich ein Blick auf den [WEF-Transfer-Guide](/blog/wef-davos-transfer-guide), falls Sie geschäftlich wieder nach Davos kommen.",
        ]},
        { h: "Davos zwischen den Spielen", p: [
          "Die meisten Spiele beginnen am Nachmittag oder am Abend – der Vormittag gehört den Bergen. Die Skigebiete Parsenn, Jakobshorn und Madrisa sind in wenigen Minuten erreichbar, und Ende Dezember ist die Schneelage in Davos meist schon gut. Wer nicht Ski fährt, findet Schlittelbahnen, Winterwanderwege, Langlaufloipen und den zugefrorenen Davosersee.",
          "Am Abend nach dem letzten Spiel füllen sich die Bars in Davos Platz. Für die Rückfahrt ins Hotel nach Klosters oder ins Prättigau lohnt es sich, eine feste Abholzeit zu vereinbaren; der Fahrer wartet an einem ruhigeren Punkt ausserhalb des Stadionbereichs.",
        ]},
        { h: "Häufige Fragen zum Spengler Cup", p: []},
        { h3: "Wann findet der Spengler Cup 2026 statt?", p: [
          "Vom 26. bis 31. Dezember 2026 im Eisstadion Davos. Das Finale wird am 31. Dezember um 12:00 Uhr gespielt.",
        ]},
        { h3: "Wie lange dauert die Fahrt vom Flughafen Zürich nach Davos?", p: [
          "Wir planen mit etwa 194 Minuten. Zwischen Weihnachten und Neujahr kann es wegen des Ferienverkehrs länger dauern.",
        ]},
        { h3: "Kann mich der Fahrer nach einem Abendspiel abholen?", p: [
          "Ja. Vereinbaren Sie einen Treffpunkt etwas ausserhalb des Stadionbereichs und eine ungefähre Uhrzeit; der Fahrer wartet dort.",
        ]},
        { h3: "Gibt es einen Aufpreis an Feiertagen?", p: [
          "Nein, Feiertage und Wochenenden kosten nichts extra. Nur zwischen 00:00 und 06:00 Uhr gilt der Nachttarif von 20 %.",
        ]},
        { h3: "Fahren Sie auch nach Klosters?", p: [
          "Ja, Klosters liegt auf dem Weg nach Davos. Geben Sie einfach die Hoteladresse ein.",
          "Jetzt [Transfer nach Davos buchen](/buchung) – Festpreis pro Fahrzeug, Skigepäck inklusive.",
        ]},
      ],
    },
    en: {
      title: "Spengler Cup Davos 2026: Schedule, Tickets, Accommodation and a Relaxed Journey From Zurich",
      seo: "Spengler Cup Davos 2026: Travel Guide",
      excerpt: "From 26 to 31 December 2026 Davos hosts the world's oldest international ice hockey tournament. What you should know about game times, tickets, hotels and clothing – and how the journey from Zurich Airport works smoothly between Christmas and New Year.",
      body: [
        { p: [
          "Between Christmas and New Year, Davos becomes the capital of ice hockey. The Spengler Cup, held since 1923, is the oldest international ice hockey tournament in the world and one of Switzerland's biggest sporting events. Around 100,000 visitors come to the Davos ice stadium and the fan zones in front of it every year.",
          "This guide summarises when games are played, how to get tickets, where to stay and how the journey from Zurich Airport works in one of the busiest weeks of the year. All details are as of October 2026; the organiser publishes the line-up and exact schedule on the official website.",
        ]},
        { h: "The 2026 Spengler Cup at a glance", p: [
          "The key facts about the 96th edition:",
        ], table: { head: ["Key facts", "Spengler Cup Davos 2026"], rows: [
          ["Dates", "26 to 31 December 2026"],
          ["Venue", "Davos ice stadium (zondacrypto-Arena), Davos Platz"],
          ["Game times", "26–30 December one afternoon and one evening game each day, final on 31 December at 12 noon"],
          ["Teams", "Host HC Davos and invited teams from around the world"],
          ["Tickets", "Seats from CHF 98, standing CHF 35 (organiser's information)"],
          ["Visitors", "around 100,000 per tournament"],
        ]}},
        { h: "Why the Spengler Cup is special", p: [
          "Its appeal lies in the mix: a traditional wooden stadium in the middle of a mountain resort, teams with different playing styles from Europe and North America, and a date when many people are on holiday anyway. During these days Davos is full of fans who ski during the day and go to the stadium in the evening.",
          "Even if you are not an ice hockey fan, Davos has a special atmosphere: fan zones, concerts and packed restaurants turn the days between the years into a festival.",
        ]},
        { h: "Tickets: decide early", p: [
          "Tickets are available through the official Spengler Cup ticket sales. The final and the HC Davos games are in particular demand; if you want fixed seats, book early. Standing places are cheaper and offer the loudest atmosphere, but require warm clothing and patience at the entrance.",
          "Allow a buffer around game times: around the start and end of games the roads and pavements in Davos Platz are crowded. If you want to be picked up right after an evening game, agree a meeting point with the driver a little outside the stadium area.",
        ]},
        { h: "Accommodation: Davos, Klosters or the surroundings", p: [
          "Hotels in Davos are often booked out months in advance during Spengler week and are more expensive than usual. Good alternatives are Klosters, around 15 minutes away, and villages in the Prättigau valley. If you are flexible, combine the Spengler Cup with ski days in Davos-Klosters and travel on for New Year's Eve on 30 or 31 December.",
          "Enter the exact hotel name when booking your transfer. Davos consists of Davos Dorf and Davos Platz, which are a few kilometres apart; the driver takes you right to the correct door.",
        ]},
        { h: "Getting there from Zurich Airport", p: [
          "The drive from Zurich Airport to Davos follows the A3 along Lake Zurich and Lake Walen to Landquart and on through the Prättigau. On the fixed route we plan about 194 minutes; on a clear road it is less. All details on the route and price are on the page [Transfer to Davos](/zurich-airport-to-davos).",
          "Between Christmas and New Year this route is busy, however: the start of the holidays, changeover Saturdays and New Year travellers all meet, especially on 26 December and on Saturdays. Snowfall in the Prättigau can slow things down further. The driver tracks your flight, knows the traffic situation and plans accordingly; for the return trip we recommend a buffer of 45 to 60 minutes.",
          "We carry ski luggage free of charge, up to four ski bags per vehicle. For families and fan groups of up to seven the V-Class is the right choice; the fixed price is per vehicle.",
        ]},
        { h: "What to bring", p: [
          "Davos lies at over 1,500 metres; at the end of December temperatures well below zero are normal. For standing places and the fan zones, pack warm shoes, a hat, gloves and several layers of clothing. Inside the stadium it is warmer, but not warm.",
          "A small backpack instead of large bags and a power bank are also practical – the mobile network is heavily loaded on match days.",
        ]},
        { h: "Combining the Spengler Cup and New Year's Eve", p: [
          "The final takes place at midday on 31 December. If you celebrate New Year's Eve in Davos afterwards, simply stay. If you want to spend the turn of the year in Zurich, plan the return trip right after the final; what happens in Zurich is described in [New Year's Eve in Zurich](/blog/silvester-zuerich-feuerwerk-transfer). For January, the [WEF transfer guide](/blog/wef-davos-transfer-guide) is worth a look if you return to Davos on business.",
        ]},
        { h: "Davos between the games", p: [
          "Most games start in the afternoon or evening – the mornings belong to the mountains. The Parsenn, Jakobshorn and Madrisa ski areas are only minutes away, and at the end of December the snow in Davos is usually already good. Non-skiers will find toboggan runs, winter walking trails, cross-country tracks and the frozen Lake Davos.",
          "In the evening after the last game the bars in Davos Platz fill up. For the ride back to a hotel in Klosters or the Prättigau, it is worth agreeing a fixed pickup time; the driver waits at a quieter spot outside the stadium area.",
        ]},
        { h: "Frequently asked questions about the Spengler Cup", p: []},
        { h3: "When is the 2026 Spengler Cup?", p: [
          "From 26 to 31 December 2026 at the Davos ice stadium. The final is played on 31 December at 12 noon.",
        ]},
        { h3: "How long is the drive from Zurich Airport to Davos?", p: [
          "We plan about 194 minutes. Between Christmas and New Year it can take longer because of holiday traffic.",
        ]},
        { h3: "Can the driver pick me up after an evening game?", p: [
          "Yes. Agree a meeting point a little outside the stadium area and an approximate time; the driver waits there.",
        ]},
        { h3: "Is there a surcharge on public holidays?", p: [
          "No, public holidays and weekends cost nothing extra. Only between midnight and 6 am does the 20 % night tariff apply.",
        ]},
        { h3: "Do you also drive to Klosters?", p: [
          "Yes, Klosters is on the way to Davos. Simply enter the hotel address.",
          "[Book your Davos transfer now](/buchung) – fixed price per vehicle, ski luggage included.",
        ]},
      ],
    },
  },
  {
    slug: "lauberhornrennen-wengen-anreise-transfer",
    date: "2026-10-07",
    img: "/gallery/6.jpg",
    de: {
      title: "Lauberhornrennen Wengen 2027: Programm, Tickets, Unterkunft und die Anreise ins autofreie Wengen",
      seo: "Lauberhornrennen Wengen 2027: Anreise",
      excerpt: "Vom 15. bis 17. Januar 2027 fahren die besten Skirennfahrer der Welt die längste Abfahrt im Weltcup. Was Sie über Programm, Tickets, Zuschauerplätze und Unterkunft wissen sollten – und wie Sie mit Gepäck vom Flughafen Zürich ins autofreie Wengen kommen.",
      body: [
        { p: [
          "Einmal im Jahr wird Wengen zum Zentrum des Skisports. Die Lauberhornrennen gehören zu den traditionsreichsten Weltcuprennen überhaupt, und die Lauberhornabfahrt ist die längste Abfahrt im Weltcup – mit Passagen wie dem Hundschopf, dem Kernen-S und dem Haneggschuss, die jeder Skifan kennt. Zehntausende Zuschauer verfolgen die Rennen vor der Kulisse von Eiger, Mönch und Jungfrau.",
          "Dieser Guide erklärt Programm und Tickets, gibt Tipps für Zuschauerplätze und Unterkunft und zeigt, wie die Anreise vom Flughafen Zürich nach Wengen funktioniert, das nur mit der Bahn erreichbar ist.",
        ]},
        { h: "Die Lauberhornrennen 2027 auf einen Blick", p: [
          "Die 97. Internationalen Lauberhornrennen (Stand Oktober 2026, Angaben des Veranstalters):",
        ], table: { head: ["Tag", "Rennen", "Start"], rows: [
          ["Freitag, 15. Januar 2027", "Super-G", "12:30 Uhr"],
          ["Samstag, 16. Januar 2027", "Lauberhornabfahrt", "12:30 Uhr"],
          ["Sonntag, 17. Januar 2027", "Slalom, zwei Durchgänge", "10:00 und 13:00 Uhr"],
          ["Dienstag bis Donnerstag davor", "Abfahrtstrainings", "jeweils mittags (provisorisch)"],
        ]}},
        { h: "Tickets und Zuschauerplätze", p: [
          "Tickets für die Lauberhornrennen 2027 sind laut Veranstalter ab dem 2. November 2026 erhältlich und nur online buchbar. Es gibt Zugänge für das Zielgelände in Innerwengen, Plätze entlang der Strecke und Hospitality-Angebote auf der Wengernalp.",
          "Das Zielgelände bietet Grossleinwände, Stimmung und den Zieleinlauf; wer die Fahrer aus nächster Nähe in den Schlüsselpassagen sehen will, steht entlang der Strecke, etwa beim Hundschopf oder beim Ziel-S. Plätze an der Strecke erreichen Sie mit der Wengernalpbahn und zu Fuss – planen Sie dafür Zeit ein und tragen Sie Schuhe mit gutem Profil.",
          "Ein Höhepunkt ist traditionell die Flugshow der Patrouille Suisse über der Strecke. Abends wird im Weltcup-Dörfli in Wengen gefeiert, mit Startnummernauslosung, Siegerehrungen und Bars.",
        ]},
        { h: "Unterkunft: Wengen, Lauterbrunnen oder Interlaken", p: [
          "Hotels in Wengen sind am Rennwochenende sehr früh ausgebucht. Wer dort übernachten will, bucht im Sommer oder Herbst. Gute Alternativen sind Lauterbrunnen, nur 15 Minuten mit der Bahn von Wengen entfernt, sowie Interlaken, Wilderswil oder Grindelwald. Von Grindelwald erreichen Sie die Kleine Scheidegg und die obere Strecke ebenfalls per Bahn.",
          "Welches Dorf zu Ihnen passt, erklärt [Jungfrau-Region für Einsteiger](/blog/jungfrau-region-guide-interlaken-grindelwald).",
        ]},
        { h: "Anreise vom Flughafen Zürich: so funktioniert es", p: [
          "Wengen ist autofrei. Der Transfer bringt Sie deshalb nach Lauterbrunnen, wo Sie in die Wengernalpbahn umsteigen; die Fahrt hinauf nach Wengen dauert etwa eine Viertelstunde. Auf unserer festen Strecke planen wir bis Lauterbrunnen mit etwa 160 Minuten, die Route führt über Luzern und den Brünig oder über Bern. Details finden Sie auf der Seite [Transfer nach Wengen](/zurich-airport-to-wengen).",
          "Der Fahrer setzt Sie am Bahnhof Lauterbrunnen ab und hilft mit dem Gepäck bis zum Zug. In Wengen bringen viele Hotels das Gepäck mit Elektrofahrzeugen vom Bahnhof zum Haus – fragen Sie bei Ihrem Hotel nach. Wer in Lauterbrunnen oder Interlaken übernachtet, wird direkt vor die Tür gefahren.",
          "Am Rennwochenende sind die Bahnen zwischen Lauterbrunnen und Wengen stark ausgelastet, und die Strassen ins Lauterbrunnental werden voller. Reisen Sie wenn möglich am Donnerstag an und planen Sie für die Rückfahrt am Sonntag nach dem Slalom einen grosszügigen Puffer ein.",
        ]},
        { h: "Gepäck, Kleidung und Ausrüstung", p: [
          "Mitte Januar ist es in Wengen kalt, an der Strecke steht man oft stundenlang im Schnee. Warme Schuhe, Skihosen, Mütze, Handschuhe und Sonnenbrille gehören ins Gepäck. Wer neben dem Zuschauen selbst Ski fahren möchte, nimmt die Ausrüstung mit: Skisäcke befördern wir kostenlos, bis zu vier pro Fahrzeug.",
          "Für Gruppen von Skifans oder Familien bis sieben Personen ist die V-Klasse ideal; der Festpreis gilt pro Fahrzeug. Mehr zur Wintersaison steht in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Rückreise am Sonntag: richtig planen", p: [
          "Nach dem zweiten Slalomlauf wollen viele Zuschauer gleichzeitig ins Tal. Die Bahnen sind dann voll, und in Lauterbrunnen bilden sich Schlangen. Wenn Sie am Sonntagabend fliegen, rechnen Sie grosszügig: Zeit für den Weg von der Strecke zum Bahnhof, die Bahnfahrt nach Lauterbrunnen, die rund 160 Minuten Fahrt zum Flughafen und die Zeit am Flughafen. Wie Sie die Abholzeit berechnen, zeigt [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
          "Am entspanntesten ist es, die Abholung in Lauterbrunnen für eine feste Zeit zu vereinbaren und eine Bahn früher zu nehmen als geplant. Melden Sie sich per WhatsApp, wenn Sie später kommen; der Fahrer wartet.",
        ]},
        { h: "Mit Familie und Nicht-Skifahrern nach Wengen", p: [
          "Die Lauberhornrennen sind auch für Familien und Gäste ohne Skier ein Erlebnis. Das Zielgelände in Innerwengen ist von Wengen aus zu Fuss erreichbar, die Grossleinwände zeigen die ganze Strecke, und im Weltcup-Dörfli gibt es Essen, Musik und Programm. Für kleine Kinder empfehlen wir warme Kleidung in Schichten und Pausen in einem der Cafés im Dorf.",
          "Wer den Trubel lieber meidet, schaut sich die Rennen an einem Tag an und verbringt die übrigen Tage im ruhigeren Mürren, in Grindelwald oder bei einer Schifffahrt ab Interlaken. Die Jungfrau-Region bietet genug Alternativen, und die Bahnen verbinden alle Orte.",
        ]},
        { h: "Häufige Fragen zu den Lauberhornrennen", p: []},
        { h3: "Wann finden die Lauberhornrennen 2027 statt?", p: [
          "Vom 15. bis 17. Januar 2027: Super-G am Freitag, Abfahrt am Samstag, Slalom am Sonntag.",
        ]},
        { h3: "Kann ich mit dem Auto nach Wengen fahren?", p: [
          "Nein, Wengen ist autofrei. Der Transfer endet in Lauterbrunnen, von dort fahren Sie mit der Wengernalpbahn hinauf.",
        ]},
        { h3: "Wie lange dauert die Fahrt vom Flughafen Zürich nach Lauterbrunnen?", p: [
          "Wir planen mit etwa 160 Minuten. Am Rennwochenende kann es im Lauterbrunnental länger dauern.",
        ]},
        { h3: "Wo kaufe ich Tickets?", p: [
          "Ausschliesslich online über den offiziellen Ticketverkauf der Lauberhornrennen, laut Veranstalter ab dem 2. November 2026.",
        ]},
        { h3: "Kostet Skigepäck beim Transfer extra?", p: [
          "Nein, bis zu vier Skisäcke pro Fahrzeug sind im Festpreis enthalten.",
          "Jetzt [Transfer nach Lauterbrunnen und Wengen buchen](/buchung) – Festpreis pro Fahrzeug.",
        ]},
      ],
    },
    en: {
      title: "Lauberhorn Races Wengen 2027: Programme, Tickets, Accommodation and Getting to Car-Free Wengen",
      seo: "Lauberhorn Races Wengen 2027: Travel Guide",
      excerpt: "From 15 to 17 January 2027 the world's best ski racers tackle the longest downhill in the World Cup. What you should know about the programme, tickets, viewing spots and accommodation – and how to get from Zurich Airport to car-free Wengen with your luggage.",
      body: [
        { p: [
          "Once a year Wengen becomes the centre of the ski world. The Lauberhorn races are among the most traditional World Cup races of all, and the Lauberhorn downhill is the longest downhill in the World Cup – with sections such as the Hundschopf, the Kernen-S and the Hanegg-Schuss that every ski fan knows. Tens of thousands of spectators follow the races against the backdrop of the Eiger, Mönch and Jungfrau.",
          "This guide explains the programme and tickets, gives tips on viewing spots and accommodation, and shows how to travel from Zurich Airport to Wengen, which can only be reached by train.",
        ]},
        { h: "The 2027 Lauberhorn races at a glance", p: [
          "The 97th International Lauberhorn Races (as of October 2026, according to the organiser):",
        ], table: { head: ["Day", "Race", "Start"], rows: [
          ["Friday, 15 January 2027", "Super-G", "12:30 pm"],
          ["Saturday, 16 January 2027", "Lauberhorn downhill", "12:30 pm"],
          ["Sunday, 17 January 2027", "Slalom, two runs", "10:00 am and 1:00 pm"],
          ["Tuesday to Thursday before", "Downhill training", "around midday (provisional)"],
        ]}},
        { h: "Tickets and viewing spots", p: [
          "According to the organiser, tickets for the 2027 Lauberhorn races are available from 2 November 2026 and can only be booked online. There is access to the finish area in Innerwengen, places along the course and hospitality packages on the Wengernalp.",
          "The finish area offers big screens, atmosphere and the finish line; if you want to see the racers up close in the key sections, stand along the course, for example at the Hundschopf or the Ziel-S. Places on the course are reached by the Wengernalp railway and on foot – allow time and wear shoes with good grip.",
          "A traditional highlight is the Patrouille Suisse air display over the course. In the evenings the World Cup village in Wengen celebrates with bib draws, award ceremonies and bars.",
        ]},
        { h: "Accommodation: Wengen, Lauterbrunnen or Interlaken", p: [
          "Hotels in Wengen are booked out very early for race weekend. If you want to stay there, book in summer or autumn. Good alternatives are Lauterbrunnen, only 15 minutes by train from Wengen, as well as Interlaken, Wilderswil or Grindelwald. From Grindelwald you can also reach Kleine Scheidegg and the upper course by train.",
          "Which village suits you is explained in [Jungfrau region for beginners](/blog/jungfrau-region-guide-interlaken-grindelwald).",
        ]},
        { h: "Getting there from Zurich Airport: how it works", p: [
          "Wengen is car-free. The transfer therefore takes you to Lauterbrunnen, where you change to the Wengernalp railway; the ride up to Wengen takes about a quarter of an hour. On our fixed route we plan about 160 minutes to Lauterbrunnen, via Lucerne and the Brünig or via Bern. Details are on the page [Transfer to Wengen](/zurich-airport-to-wengen).",
          "The driver drops you at Lauterbrunnen station and helps with the luggage to the train. In Wengen many hotels take luggage from the station to the hotel with electric vehicles – ask your hotel. If you stay in Lauterbrunnen or Interlaken, you are driven right to the door.",
          "On race weekend the trains between Lauterbrunnen and Wengen are very busy, and the roads into the Lauterbrunnen valley fill up. If possible, arrive on Thursday and allow a generous buffer for the return trip on Sunday after the slalom.",
        ]},
        { h: "Luggage, clothing and equipment", p: [
          "In mid-January it is cold in Wengen, and on the course you often stand in the snow for hours. Warm shoes, ski trousers, a hat, gloves and sunglasses belong in your luggage. If you want to ski yourself as well as watch, bring your equipment: we carry ski bags free of charge, up to four per vehicle.",
          "For groups of ski fans or families of up to seven the V-Class is ideal; the fixed price is per vehicle. More on the winter season is in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Sunday return: plan it properly", p: [
          "After the second slalom run many spectators want to go down to the valley at the same time. The trains are then full, and queues form in Lauterbrunnen. If you fly on Sunday evening, calculate generously: time from the course to the station, the train to Lauterbrunnen, the roughly 160-minute drive to the airport and the time at the airport. How to calculate the pickup time is shown in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
          "The most relaxed approach is to agree a fixed pickup time in Lauterbrunnen and take a train earlier than planned. Message us on WhatsApp if you are running late; the driver will wait.",
        ]},
        { h: "Wengen with family and non-skiers", p: [
          "The Lauberhorn races are an experience for families and guests without skis too. The finish area in Innerwengen can be reached on foot from Wengen, big screens show the whole course, and the World Cup village offers food, music and entertainment. For small children we recommend warm layers and breaks in one of the village cafés.",
          "If you prefer to avoid the bustle, watch the races on one day and spend the other days in quieter Mürren, in Grindelwald or on a boat trip from Interlaken. The Jungfrau region offers plenty of alternatives, and the railways connect every village.",
        ]},
        { h: "Frequently asked questions about the Lauberhorn races", p: []},
        { h3: "When are the 2027 Lauberhorn races?", p: [
          "From 15 to 17 January 2027: super-G on Friday, downhill on Saturday, slalom on Sunday.",
        ]},
        { h3: "Can I drive to Wengen?", p: [
          "No, Wengen is car-free. The transfer ends in Lauterbrunnen, from where you take the Wengernalp railway up.",
        ]},
        { h3: "How long is the drive from Zurich Airport to Lauterbrunnen?", p: [
          "We plan about 160 minutes. On race weekend it can take longer in the Lauterbrunnen valley.",
        ]},
        { h3: "Where do I buy tickets?", p: [
          "Only online through the official Lauberhorn ticket sales, from 2 November 2026 according to the organiser.",
        ]},
        { h3: "Does ski luggage cost extra on the transfer?", p: [
          "No, up to four ski bags per vehicle are included in the fixed price.",
          "[Book your transfer to Lauterbrunnen and Wengen now](/buchung) – fixed price per vehicle.",
        ]},
      ],
    },
  },
  {
    slug: "zuerich-mailand-transfer-zug-auto-vergleich",
    date: "2026-10-07",
    img: "/hero/hero-3.jpg",
    de: {
      title: "Von Zürich nach Mailand: Zug, Auto oder Privattransfer? Der ehrliche Vergleich",
      seo: "Zürich nach Mailand: Zug oder Transfer?",
      excerpt: "Rund 280 km, drei bis vier Stunden, eine Grenze und der Gotthard dazwischen: wie Sie am besten vom Flughafen Zürich nach Mailand, Malpensa, zur Fiera Milano oder nach Monza kommen. Mit ehrlichem Vergleich zwischen Eurocity, Mietwagen und Privattransfer und Tipps zu Messen, Fashion Week und Formel 1.",
      body: [
        { p: [
          "Zürich und Mailand sind die zwei wirtschaftlichen Zentren beiderseits der Alpen, und zwischen ihnen pendeln täglich Geschäftsreisende, Messebesucher, Modeleute und Touristen. Viele landen mit einem Langstreckenflug in Zürich und haben ihr eigentliches Ziel in Mailand – oder kombinieren die Schweiz und Norditalien auf einer Reise.",
          "Dieser Guide vergleicht die Optionen ehrlich: Wann ist der Eurocity die beste Wahl, wann ein Privattransfer, und wofür lohnt sich ein Mietwagen? Dazu Infos zu Route, Grenze, Messen und Anlässen.",
        ]},
        { h: "Die Strecke auf einen Blick", p: [
          "Die Fahrzeiten sind Richtwerte, am Gotthard hängen sie stark vom Reisetag ab.",
        ], table: { head: ["Eckdaten", "Flughafen Zürich → Mailand"], rows: [
          ["Distanz bis Mailand Zentrum", "rund 280 km"],
          ["Fahrzeit", "ca. 3½ bis 4 Stunden"],
          ["Malpensa (MXP)", "ähnlich weit, je nach Route ca. 3 bis 3½ Stunden"],
          ["Route", "A2 durch den Gotthard oder A13 über den San Bernardino, via Lugano und Chiasso"],
          ["Grenze", "Chiasso (Schweiz–Italien), Ausweis erforderlich"],
          ["Preis", "Festpreis pro Fahrzeug für die genaue Adresse, vorab im Buchungsrechner"],
        ]}},
        { h: "Option 1: der Eurocity", p: [
          "Zwischen Zürich HB und Milano Centrale verkehren direkte Eurocity-Züge durch den Gotthard-Basistunnel; die Fahrt dauert rund dreieinhalb Stunden. Vom Flughafen Zürich müssen Sie zunächst nach Zürich HB fahren und dort umsteigen.",
          "Für Alleinreisende mit leichtem Gepäck, deren Ziel in der Nähe von Milano Centrale liegt, ist der Zug oft die beste Wahl: schnell, komfortabel, mit Arbeitsplatz. Weniger ideal ist er mit viel Gepäck, für Ziele ausserhalb des Zentrums wie die Fiera Milano in Rho, Monza oder Malpensa, für Gruppen und bei späten Ankünften in Zürich.",
        ]},
        { h: "Option 2: der Privattransfer", p: [
          "Beim Transfer holt Sie der Chauffeur in der Ankunftshalle ab und bringt Sie ohne Umsteigen direkt ans Ziel: Hotel in Brera, Büro in Porta Nuova, Messegelände in Rho oder Malpensa für den Weiterflug. Der Festpreis gilt pro Fahrzeug und wird vorab angezeigt; bis zu sieben Personen fahren in der V-Klasse.",
          "Der Transfer lohnt sich besonders für Gruppen und Familien, für Geschäftsreisende, die unterwegs telefonieren oder arbeiten wollen, für Messebesucher mit Material und für alle, die nach einem Langstreckenflug nicht mehr mit Koffern durch zwei Bahnhöfe wollen. Eine Übersicht der Ziele in Italien finden Sie auf der Seite [Transfer nach Mailand](/flughafentransfer-mailand-it).",
        ]},
        { h: "Option 3: der Mietwagen", p: [
          "Ein Mietwagen ist sinnvoll, wenn Sie in Norditalien viele Orte ansteuern wollen. Für Mailand selbst ist er unpraktisch: Die Innenstadt hat Zufahrtsbeschränkungen mit Gebühren, Parkplätze sind knapp und teuer, und bei einer Einwegmiete über die Grenze fallen oft hohe Rückführungsgebühren an. Wer den Wagen in der Schweiz mietet und in Italien abgibt, sollte das vorab genau prüfen.",
        ]},
        { h: "Die Route und die Grenze", p: [
          "Der Fahrer wählt je nach Verkehrslage den Gotthard-Strassentunnel oder den San Bernardino. Am Gotthard staut es sich an Ferientagen, besonders an Ostern, Pfingsten und an Sommersamstagen; dann ist der San Bernardino oft schneller. Nach Lugano folgt die Grenze bei Chiasso und die Autobahn nach Mailand.",
          "Die Schweiz und Italien gehören zum Schengenraum, systematische Passkontrollen gibt es nicht, Zollkontrollen aber schon. Alle Mitreisenden brauchen einen gültigen Ausweis. Wie es am Comer See weitergeht, der fast auf dem Weg liegt, beschreibt [Vom Flughafen Zürich an den Comer See](/blog/zuerich-comer-see-transfer-tagesausflug).",
        ]},
        { h: "Messen und Anlässe in Mailand", p: [
          "Einige Termine bringen besonders viele Reisende von Zürich nach Mailand:",
        ], ul: [
          "**Salone del Mobile** im April auf dem Messegelände Fiera Milano in Rho – die wichtigste Möbelmesse der Welt, Hotels sind Monate im Voraus voll.",
          "**Milano Fashion Week** im Februar und September, dazu die Männermode-Schauen im Januar und Juni.",
          "**Formel 1 in Monza** Anfang September, mit dichtem Verkehr rund um den Autodromo.",
          "**Saisoneröffnung der Scala** am 7. Dezember, einer der gesellschaftlichen Höhepunkte des Jahres.",
        ]},
        { h: "Mailand oder Malpensa als Abflughafen", p: [
          "Viele Reisende kombinieren Zürich und Mailand als Gabelflug: Ankunft in Zürich, Rückflug ab Malpensa oder umgekehrt. Das spart die Rückfahrt über die Alpen und eröffnet oft bessere Verbindungen. Den Transfer nach Malpensa finden Sie auf der Seite [Transfer nach Milano Malpensa](/flughafentransfer-milano-malpensa-it).",
          "Für Abflüge ab Malpensa planen Sie die Fahrt grosszügig: Rund um Mailand kann der Verkehr am Morgen dicht sein, und an der Grenze gibt es gelegentlich Wartezeiten.",
        ]},
        { h: "Geschäftsreise Zürich–Mailand an einem Tag", p: [
          "Für Termine in Mailand mit Rückflug am selben Abend ist eine Stundenbuchung oft die effizienteste Lösung: Der Fahrer holt Sie in Zürich ab, wartet während der Meetings in Mailand und bringt Sie zurück an den Flughafen. Die Fahrzeit nutzen Sie für Telefonate und E-Mails, die Rechnung kommt mit ausgewiesener Mehrwertsteuer – mehr dazu in [Firmentransfers in Zürich](/blog/firmentransfers-zuerich-rechnung-mwst-spesen).",
          "Bei mehreren Terminen in der Stadt, etwa in Porta Nuova und in der Nähe der Fiera, spart das die Taxisuche zwischen den Adressen. Geben Sie alle Stopps im Buchungsformular an, damit der Fahrer die Route planen kann.",
        ]},
        { h: "Häufige Fragen zur Strecke Zürich–Mailand", p: []},
        { h3: "Wie lange dauert die Fahrt von Zürich nach Mailand?", p: [
          "Mit dem Auto rund dreieinhalb bis vier Stunden, je nach Verkehr am Gotthard. Der Eurocity braucht ab Zürich HB rund dreieinhalb Stunden.",
        ]},
        { h3: "Ist der Zug oder der Transfer besser?", p: [
          "Für Alleinreisende mit leichtem Gepäck ins Zentrum meist der Zug. Für Gruppen, viel Gepäck, Ziele ausserhalb des Zentrums oder späte Ankünfte meist der Transfer.",
        ]},
        { h3: "Fahren Sie auch zur Fiera Milano oder nach Monza?", p: [
          "Ja. Geben Sie die genaue Adresse ein, zum Beispiel die Halle oder den Eingang; der Preis wird für die Distanz berechnet.",
        ]},
        { h3: "Brauche ich einen Pass?", p: [
          "Ja, alle Mitreisenden brauchen einen gültigen Reisepass oder eine Identitätskarte, Reisende aus Drittstaaten zusätzlich die nötigen Schengen-Dokumente.",
        ]},
        { h3: "Kann ich unterwegs in Lugano oder am Comer See anhalten?", p: [
          "Ja. Fügen Sie im Buchungsformular einen Zwischenstopp hinzu; der Preis wird für die gesamte Strecke berechnet.",
          "Jetzt [Transfer nach Mailand buchen](/buchung) – Festpreis für Ihre genaue Adresse.",
        ]},
      ],
    },
    en: {
      title: "From Zurich to Milan: Train, Car or Private Transfer? The Honest Comparison",
      seo: "Zurich to Milan: Train or Transfer?",
      excerpt: "Around 280 km, three to four hours, a border and the Gotthard in between: how best to get from Zurich Airport to Milan, Malpensa, Fiera Milano or Monza. With an honest comparison of the EuroCity train, a hire car and a private transfer, plus tips on trade fairs, Fashion Week and Formula 1.",
      body: [
        { p: [
          "Zurich and Milan are the two economic centres on either side of the Alps, and business travellers, trade-fair visitors, fashion people and tourists travel between them every day. Many land on a long-haul flight in Zurich with Milan as their actual destination – or combine Switzerland and northern Italy in one trip.",
          "This guide compares the options honestly: when is the EuroCity the best choice, when a private transfer, and what is a hire car worth it for? Plus information on the route, the border, trade fairs and events.",
        ]},
        { h: "The route at a glance", p: [
          "Driving times are guide values; at the Gotthard they depend heavily on the day of travel.",
        ], table: { head: ["Key facts", "Zurich Airport → Milan"], rows: [
          ["Distance to central Milan", "around 280 km"],
          ["Driving time", "approx. 3½ to 4 hours"],
          ["Malpensa (MXP)", "similar distance, approx. 3 to 3½ hours depending on the route"],
          ["Route", "A2 through the Gotthard or A13 via the San Bernardino, via Lugano and Chiasso"],
          ["Border", "Chiasso (Switzerland–Italy), ID required"],
          ["Price", "Fixed price per vehicle for the exact address, shown in advance in the booking calculator"],
        ]}},
        { h: "Option 1: the EuroCity", p: [
          "Direct EuroCity trains run between Zurich HB and Milano Centrale through the Gotthard Base Tunnel; the journey takes around three and a half hours. From Zurich Airport you first need to travel to Zurich HB and change there.",
          "For solo travellers with light luggage whose destination is near Milano Centrale, the train is often the best choice: fast, comfortable, with a place to work. It is less ideal with a lot of luggage, for destinations outside the centre such as Fiera Milano in Rho, Monza or Malpensa, for groups and for late arrivals in Zurich.",
        ]},
        { h: "Option 2: the private transfer", p: [
          "With a transfer the chauffeur meets you in the arrivals hall and takes you straight to your destination without changing: a hotel in Brera, an office in Porta Nuova, the exhibition centre in Rho or Malpensa for an onward flight. The fixed price is per vehicle and shown in advance; up to seven people travel in the V-Class.",
          "The transfer is particularly worthwhile for groups and families, for business travellers who want to call or work on the way, for trade-fair visitors with material and for anyone who does not want to drag suitcases through two stations after a long-haul flight. An overview of destinations in Italy is on the page [Transfer to Milan](/flughafentransfer-mailand-it).",
        ]},
        { h: "Option 3: the hire car", p: [
          "A hire car makes sense if you want to visit many places in northern Italy. For Milan itself it is impractical: the city centre has access restrictions with charges, parking is scarce and expensive, and one-way rentals across the border often carry high drop-off fees. If you rent in Switzerland and return the car in Italy, check this carefully in advance.",
        ]},
        { h: "The route and the border", p: [
          "Depending on traffic, the driver chooses the Gotthard road tunnel or the San Bernardino. The Gotthard has queues on holiday dates, especially at Easter, Whitsun and on summer Saturdays; the San Bernardino is then often faster. After Lugano comes the border at Chiasso and the motorway to Milan.",
          "Switzerland and Italy are in the Schengen area, so there are no systematic passport checks, but there are customs checks. All passengers need valid ID. How to continue to Lake Como, which is almost on the way, is described in [From Zurich Airport to Lake Como](/blog/zuerich-comer-see-transfer-tagesausflug).",
        ]},
        { h: "Trade fairs and events in Milan", p: [
          "Some dates bring particularly many travellers from Zurich to Milan:",
        ], ul: [
          "**Salone del Mobile** in April at the Fiera Milano exhibition centre in Rho – the world's most important furniture fair; hotels are full months in advance.",
          "**Milan Fashion Week** in February and September, plus the menswear shows in January and June.",
          "**Formula 1 at Monza** in early September, with heavy traffic around the Autodromo.",
          "**La Scala's season opening** on 7 December, one of the social highlights of the year.",
        ]},
        { h: "Milan or Malpensa as your departure airport", p: [
          "Many travellers combine Zurich and Milan as an open-jaw trip: arrive in Zurich, fly home from Malpensa or the other way round. That saves the return trip over the Alps and often opens up better connections. The transfer to Malpensa is on the page [Transfer to Milano Malpensa](/flughafentransfer-milano-malpensa-it).",
          "For departures from Malpensa, plan the drive generously: traffic around Milan can be heavy in the morning, and there are occasional waits at the border.",
        ]},
        { h: "A Zurich–Milan business trip in one day", p: [
          "For meetings in Milan with a return flight the same evening, an hourly booking is often the most efficient solution: the driver picks you up in Zurich, waits during your meetings in Milan and takes you back to the airport. You use the driving time for calls and emails, and the invoice comes with VAT shown – more in [Corporate transfers in Zurich](/blog/firmentransfers-zuerich-rechnung-mwst-spesen).",
          "With several meetings in the city, for example in Porta Nuova and near the Fiera, it saves hunting for taxis between addresses. Enter all stops in the booking form so the driver can plan the route.",
        ]},
        { h: "Frequently asked questions about Zurich–Milan", p: []},
        { h3: "How long is the drive from Zurich to Milan?", p: [
          "By car around three and a half to four hours, depending on traffic at the Gotthard. The EuroCity takes around three and a half hours from Zurich HB.",
        ]},
        { h3: "Is the train or the transfer better?", p: [
          "For solo travellers with light luggage heading to the centre, usually the train. For groups, a lot of luggage, destinations outside the centre or late arrivals, usually the transfer.",
        ]},
        { h3: "Do you also drive to Fiera Milano or Monza?", p: [
          "Yes. Enter the exact address, for example the hall or entrance; the price is calculated for the distance.",
        ]},
        { h3: "Do I need a passport?", p: [
          "Yes, all passengers need a valid passport or ID card; travellers from third countries also need the required Schengen documents.",
        ]},
        { h3: "Can I stop in Lugano or at Lake Como on the way?", p: [
          "Yes. Add an intermediate stop in the booking form; the price is calculated for the whole route.",
          "[Book your Milan transfer now](/buchung) – fixed price for your exact address.",
        ]},
      ],
    },
  },
  {
    slug: "zuerich-muenchen-transfer-zug-auto-vergleich",
    date: "2026-10-07",
    img: "/gallery/2.jpg",
    de: {
      title: "Von Zürich nach München: alle Optionen im Vergleich – Zug, Auto oder Privattransfer",
      seo: "Zürich nach München: Zug oder Transfer?",
      excerpt: "Rund 300 km über den Bodensee und das Allgäu, drei Länder in dreieinhalb bis vier Stunden: wie Sie vom Flughafen Zürich am besten nach München, zum Flughafen München oder zur Messe kommen. Mit ehrlichem Vergleich, Infos zu Route, Grenzen und Vignetten sowie Tipps für Oktoberfest, Messen und einen Abstecher nach Lindau oder Neuschwanstein.",
      body: [
        { p: [
          "München und Zürich liegen näher beieinander, als viele denken. Trotzdem ist die Strecke für Reisende oft ein Rätsel: Gibt es einen direkten Zug? Wie oft muss man umsteigen? Braucht man mit dem Auto eine Vignette, und wenn ja, welche? Und lohnt sich ein Privattransfer über drei Länder?",
          "Dieser Guide beantwortet diese Fragen, vergleicht die Optionen ehrlich und gibt Tipps für Anlässe wie das Oktoberfest und die grossen Messen.",
        ]},
        { h: "Die Strecke auf einen Blick", p: [
          "Die Fahrzeiten sind Richtwerte und hängen vom Verkehr rund um München und am Bodensee ab.",
        ], table: { head: ["Eckdaten", "Flughafen Zürich → München"], rows: [
          ["Distanz bis München Zentrum", "rund 300 km"],
          ["Fahrzeit", "ca. 3½ bis 4 Stunden"],
          ["Flughafen München (MUC)", "nordöstlich der Stadt, je nach Verkehr ca. 30–45 Minuten zusätzlich"],
          ["Route", "A1 bis St. Margrethen, kurzer Abschnitt durch Vorarlberg, über Lindau auf die A96 nach München"],
          ["Grenzen", "Schweiz–Österreich und Österreich–Deutschland, Ausweis erforderlich"],
          ["Preis", "Festpreis pro Fahrzeug für die genaue Adresse, vorab im Buchungsrechner"],
        ]}},
        { h: "Die Route: Bodensee, Vorarlberg, Allgäu", p: [
          "Vom Flughafen Zürich geht es auf der A1 Richtung Osten an Winterthur und St. Gallen vorbei bis zur Grenze bei St. Margrethen. Ein kurzes Stück führt durch Vorarlberg und den Pfändertunnel bei Bregenz, dann erreichen Sie bei Lindau Deutschland und fahren auf der A96 durch das Allgäu über Memmingen nach München.",
          "Für den österreichischen Abschnitt ist eine Vignette nötig – bei einem Transfer kümmern wir uns darum, Sie müssen nichts tun. Wer selbst fährt, braucht ab Februar 2027 die digitale österreichische Vignette; die Schweizer Vignette erklärt [Autobahnvignette Schweiz 2027](/blog/autobahnvignette-schweiz-2027-preis-e-vignette). In Deutschland ist die Autobahn für Autos gebührenfrei.",
        ]},
        { h: "Option 1: der Eurocity", p: [
          "Zwischen Zürich HB und München Hauptbahnhof verkehren direkte Eurocity-Züge über Lindau; die Fahrt dauert rund dreieinhalb Stunden. Vom Flughafen Zürich müssen Sie zunächst nach Zürich HB fahren.",
          "Für Alleinreisende mit leichtem Gepäck, deren Ziel nahe dem Münchner Hauptbahnhof liegt, ist der Zug eine gute Wahl. Für den Flughafen München, die Messe in Riem, Ziele im Umland oder Gruppen mit viel Gepäck bedeutet er weitere Umstiege.",
        ]},
        { h: "Option 2: der Privattransfer", p: [
          "Beim Transfer holt Sie der Chauffeur in der Ankunftshalle ab und fährt Sie ohne Umsteigen direkt ans Ziel – ins Hotel in der Altstadt, ins Büro, zur Messe oder zum Flughafen München für den Weiterflug. Der Festpreis gilt pro Fahrzeug, Grenzen und Vignette sind für Sie kein Thema, und bis zu sieben Personen fahren in der V-Klasse.",
          "Besonders sinnvoll ist das für Gruppen und Familien, für Geschäftsreisende, die unterwegs arbeiten wollen, und für Reisende mit viel Gepäck. Die Zielseite [Transfer nach München](/flughafentransfer-muenchen-de) zeigt, wie Sie den Preis für Ihre Adresse berechnen.",
        ]},
        { h: "Option 3: Mietwagen oder eigenes Auto", p: [
          "Mit dem eigenen Auto ist die Strecke unkompliziert, aber mit drei Ländern, zwei Vignettensystemen und dem Verkehr um München nicht ganz so entspannt, wie sie auf der Karte aussieht. Bei Mietwagen ist die Einwegmiete über die Grenze oft teuer; prüfen Sie Rückgabegebühren und die nötigen Vignetten vor der Buchung.",
        ]},
        { h: "Abstecher unterwegs: Lindau und Neuschwanstein", p: [
          "Die Route bietet schöne Zwischenhalte. Die Inselstadt Lindau am Bodensee liegt direkt an der Strecke und eignet sich für einen Spaziergang am Hafen mit Blick auf die Alpen. Bregenz mit den Seefestspielen im Sommer ist ebenfalls nah; Details zum Ziel finden Sie auf der Seite [Transfer nach Bregenz](/flughafentransfer-bregenz-at).",
          "Wer Schloss Neuschwanstein sehen möchte, plant einen Umweg über Füssen ein. Das verlängert die Reise um einige Stunden und lohnt sich am ehesten mit einer Stundenbuchung, bei der der Fahrer während der Besichtigung wartet. Tragen Sie Zwischenstopps im Buchungsformular ein, der Preis wird für die gesamte Strecke berechnet.",
        ]},
        { h: "Oktoberfest, Messen und Fussball", p: [
          "Einige Anlässe machen München besonders voll:",
        ], ul: [
          "**Oktoberfest** ab Mitte oder Ende September bis Anfang Oktober – Hotels sind dann sehr teuer und früh ausgebucht, die Strassen rund um die Theresienwiese gesperrt.",
          "**Messen in München-Riem**, darunter grosse Fachmessen, bei denen der Verkehr rund um das Messegelände dicht ist.",
          "**Heimspiele in der Allianz Arena**, mit Stau auf der A9 im Norden der Stadt.",
          "**Christkindlmärkte** im Advent, etwa am Marienplatz.",
        ]},
        { p: [
          "Für diese Termine lohnt sich die frühe Buchung, und im Notizfeld hilft ein Hinweis auf den Anlass – der Fahrer plant dann einen geeigneten Absetzpunkt.",
        ]},
        { h: "Gabelflug: in Zürich landen, ab München fliegen", p: [
          "Viele Reisende kombinieren die Schweiz und Süddeutschland auf einer Reise: Ankunft in Zürich, ein paar Tage in Luzern, im Berner Oberland oder am Bodensee, dann Weiterreise nach München und Rückflug von dort. So sparen Sie den Rückweg und haben oft eine grössere Auswahl an Verbindungen.",
          "Der Transfer lässt sich dafür flexibel planen: Abholung im Hotel in der Schweiz statt am Flughafen, Zwischenstopps unterwegs und Ankunft direkt am Terminal in München. Für den Abflug ab München planen Sie die Fahrt grosszügig und rechnen die Zeit am Flughafen nach den Regeln aus [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in) – sie gelten für München sinngemäss.",
        ]},
        { h: "Häufige Fragen zur Strecke Zürich–München", p: []},
        { h3: "Wie lange dauert die Fahrt von Zürich nach München?", p: [
          "Mit dem Auto rund dreieinhalb bis vier Stunden. Der direkte Eurocity braucht ab Zürich HB rund dreieinhalb Stunden.",
        ]},
        { h3: "Brauche ich eine Vignette?", p: [
          "Bei einem Transfer nicht, darum kümmern wir uns. Wer selbst fährt, braucht für die Strecke die Schweizer und die österreichische Vignette.",
        ]},
        { h3: "Fahren Sie auch direkt zum Flughafen München?", p: [
          "Ja. Geben Sie den Flughafen München als Ziel ein; der Preis wird für die Distanz berechnet.",
        ]},
        { h3: "Brauche ich einen Pass?", p: [
          "Ja, alle Mitreisenden brauchen einen gültigen Reisepass oder eine Identitätskarte, Reisende aus Drittstaaten die nötigen Schengen-Dokumente.",
        ]},
        { h3: "Kann ich in Lindau oder am Bodensee anhalten?", p: [
          "Ja. Fügen Sie im Buchungsformular einen Zwischenstopp hinzu.",
          "Jetzt [Transfer nach München buchen](/buchung) – Festpreis für Ihre genaue Adresse.",
        ]},
      ],
    },
    en: {
      title: "From Zurich to Munich: All Options Compared – Train, Car or Private Transfer",
      seo: "Zurich to Munich: Train or Transfer?",
      excerpt: "Around 300 km via Lake Constance and the Allgäu, three countries in three and a half to four hours: how best to get from Zurich Airport to Munich, Munich Airport or the exhibition centre. With an honest comparison, information on the route, borders and vignettes, plus tips for Oktoberfest, trade fairs and a detour to Lindau or Neuschwanstein.",
      body: [
        { p: [
          "Munich and Zurich are closer together than many people think. Yet the route is often a puzzle for travellers: is there a direct train? How often do you have to change? Do you need a vignette by car, and if so, which one? And is a private transfer across three countries worth it?",
          "This guide answers these questions, compares the options honestly and gives tips for events such as Oktoberfest and the major trade fairs.",
        ]},
        { h: "The route at a glance", p: [
          "Driving times are guide values and depend on traffic around Munich and at Lake Constance.",
        ], table: { head: ["Key facts", "Zurich Airport → Munich"], rows: [
          ["Distance to central Munich", "around 300 km"],
          ["Driving time", "approx. 3½ to 4 hours"],
          ["Munich Airport (MUC)", "north-east of the city, approx. 30–45 minutes extra depending on traffic"],
          ["Route", "A1 to St. Margrethen, a short section through Vorarlberg, via Lindau onto the A96 to Munich"],
          ["Borders", "Switzerland–Austria and Austria–Germany, ID required"],
          ["Price", "Fixed price per vehicle for the exact address, shown in advance in the booking calculator"],
        ]}},
        { h: "The route: Lake Constance, Vorarlberg, Allgäu", p: [
          "From Zurich Airport the A1 heads east past Winterthur and St. Gallen to the border at St. Margrethen. A short stretch leads through Vorarlberg and the Pfänder tunnel near Bregenz, then you reach Germany at Lindau and follow the A96 through the Allgäu via Memmingen to Munich.",
          "The Austrian section requires a vignette – with a transfer we take care of it, you need do nothing. If you drive yourself, from February 2027 you need the digital Austrian vignette; the Swiss vignette is explained in [Swiss motorway vignette 2027](/blog/autobahnvignette-schweiz-2027-preis-e-vignette). German motorways are toll-free for cars.",
        ]},
        { h: "Option 1: the EuroCity", p: [
          "Direct EuroCity trains run between Zurich HB and Munich Hauptbahnhof via Lindau; the journey takes around three and a half hours. From Zurich Airport you first need to travel to Zurich HB.",
          "For solo travellers with light luggage whose destination is near Munich's main station, the train is a good choice. For Munich Airport, the exhibition centre in Riem, destinations in the surrounding area or groups with a lot of luggage it means further changes.",
        ]},
        { h: "Option 2: the private transfer", p: [
          "With a transfer the chauffeur meets you in the arrivals hall and drives you straight to your destination without changing – to a hotel in the old town, an office, the exhibition centre or Munich Airport for an onward flight. The fixed price is per vehicle, borders and vignettes are no concern of yours, and up to seven people travel in the V-Class.",
          "This makes particular sense for groups and families, for business travellers who want to work on the way and for travellers with a lot of luggage. The destination page [Transfer to Munich](/flughafentransfer-muenchen-de) shows how to calculate the price for your address.",
        ]},
        { h: "Option 3: hire car or your own car", p: [
          "With your own car the route is straightforward, but with three countries, two vignette systems and the traffic around Munich it is not quite as relaxed as it looks on the map. With hire cars, one-way rentals across the border are often expensive; check drop-off fees and the required vignettes before booking.",
        ]},
        { h: "Detours on the way: Lindau and Neuschwanstein", p: [
          "The route offers lovely stops. The island town of Lindau on Lake Constance is right on the way and ideal for a stroll around the harbour with a view of the Alps. Bregenz, with its lake festival in summer, is close too; details are on the page [Transfer to Bregenz](/flughafentransfer-bregenz-at).",
          "If you want to see Neuschwanstein Castle, plan a detour via Füssen. That adds a few hours to the journey and is best done with an hourly booking, where the driver waits during your visit. Enter stops in the booking form; the price is calculated for the whole route.",
        ]},
        { h: "Oktoberfest, trade fairs and football", p: [
          "Some events make Munich particularly busy:",
        ], ul: [
          "**Oktoberfest** from mid or late September to early October – hotels are then very expensive and booked out early, and the roads around the Theresienwiese are closed.",
          "**Trade fairs in Munich-Riem**, including major industry fairs, when traffic around the exhibition centre is heavy.",
          "**Home matches at the Allianz Arena**, with queues on the A9 north of the city.",
          "**Christmas markets** in Advent, for example on Marienplatz.",
        ]},
        { p: [
          "For these dates early booking pays off, and a note about the occasion in the notes field helps – the driver will then plan a suitable drop-off point.",
        ]},
        { h: "Open jaw: land in Zurich, fly home from Munich", p: [
          "Many travellers combine Switzerland and southern Germany in one trip: arrive in Zurich, spend a few days in Lucerne, the Bernese Oberland or on Lake Constance, then travel on to Munich and fly home from there. That saves the way back and often gives you a wider choice of connections.",
          "The transfer can be planned flexibly for this: pickup at your hotel in Switzerland instead of the airport, stops on the way and arrival right at the terminal in Munich. For a departure from Munich, plan the drive generously and calculate your time at the airport using the rules in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in) – they apply to Munich in the same way.",
        ]},
        { h: "Frequently asked questions about Zurich–Munich", p: []},
        { h3: "How long is the drive from Zurich to Munich?", p: [
          "By car around three and a half to four hours. The direct EuroCity takes around three and a half hours from Zurich HB.",
        ]},
        { h3: "Do I need a vignette?", p: [
          "Not with a transfer – we take care of it. If you drive yourself, you need the Swiss and the Austrian vignette for the route.",
        ]},
        { h3: "Do you also drive directly to Munich Airport?", p: [
          "Yes. Enter Munich Airport as your destination; the price is calculated for the distance.",
        ]},
        { h3: "Do I need a passport?", p: [
          "Yes, all passengers need a valid passport or ID card; travellers from third countries need the required Schengen documents.",
        ]},
        { h3: "Can I stop in Lindau or on Lake Constance?", p: [
          "Yes. Add an intermediate stop in the booking form.",
          "[Book your Munich transfer now](/buchung) – fixed price for your exact address.",
        ]},
      ],
    },
  },
  {
    slug: "silvester-zuerich-feuerwerk-transfer",
    date: "2026-10-07",
    img: "/gallery/1.jpg",
    de: {
      title: "Silvester in Zürich: Feuerwerk über dem See, die besten Plätze und sicher nach Hause",
      seo: "Silvester in Zürich: Feuerwerk & Heimweg",
      excerpt: "Silvesterzauber am Seebecken, Glockengeläut, Feuerwerk um 00:20 Uhr und 150'000 Menschen in der Innenstadt: wie Zürich ins neue Jahr feiert, wo Sie am besten stehen, was Sie mitnehmen sollten – und wie Sie nach Mitternacht ohne Gedränge zurück ins Hotel, nach Hause oder zum Flughafen kommen.",
      body: [
        { p: [
          "In der Silvesternacht ist Zürich auf den Beinen. Rund um das Seebecken feiern jedes Jahr weit über hunderttausend Menschen, die Glocken des Grossmünsters läuten das Jahr aus, und kurz nach Mitternacht erleuchtet ein grosses Feuerwerk den Himmel über dem Zürichsee. Für Besucher aus aller Welt ist das einer der schönsten Momente, um die Stadt zu erleben – vorausgesetzt, die Planung stimmt.",
          "Dieser Guide erklärt, wie der Zürcher Silvester abläuft, wo Sie die beste Sicht haben, worauf Sie bei Kälte und Menschenmengen achten sollten und wie Sie nach dem Feuerwerk entspannt weiterkommen. Alle Angaben beruhen auf dem angekündigten Programm (Stand Oktober 2026); prüfen Sie kurz vor dem Fest die offizielle Website des Silvesterzaubers.",
        ]},
        { h: "Der Silvesterzauber am Seebecken", p: [
          "Der Silvesterzauber ist ein offenes Volksfest rund um das untere Seebecken: vom Limmatquai über das Bellevue und den Utoquai, über die Quaibrücke bis zum General-Guisan-Quai. Was 1988 als kleine Feier begann, ist heute einer der grössten Jahreswechsel der Schweiz. Der Eintritt ist frei; für die Magic Lake Zone mit beheizten Zelten, Lounges und freiem Blick auf das Feuerwerk gibt es kostenpflichtige Tickets.",
          "Das Fest beginnt am 31. Dezember am Nachmittag mit Streetfood und Bars, Familien finden eine Kinderzone. Ab dem Abend spielen auf mehreren Festplätzen DJs und Bands, gefeiert wird bis in die frühen Morgenstunden.",
        ], table: { head: ["Programmpunkt", "Zeit (Richtwerte)"], rows: [
          ["Festbeginn am Seebecken", "ab 14:00 Uhr"],
          ["Musik auf den Festplätzen", "ab ca. 20:00 Uhr"],
          ["Glockengeläut des Grossmünsters", "ca. 23:40–23:58 Uhr"],
          ["Lichter rund um das Seebecken gehen aus", "kurz nach Mitternacht"],
          ["Feuerwerk über dem See", "ca. 00:20 Uhr, rund 15–20 Minuten"],
          ["Festende", "ca. 03:00 Uhr"],
        ]}},
        { h: "Wo Sie das Feuerwerk am besten sehen", p: [
          "Das Feuerwerk wird von Schiffen auf dem See abgefeuert und ist rund um das Seebecken gut sichtbar. Die besten Plätze liegen an der Quaibrücke, am Bürkliplatz, am General-Guisan-Quai und am Utoquai. Wer dort stehen will, sollte spätestens gegen 23:00 Uhr da sein; danach wird es eng und die Zugänge werden teilweise gesperrt.",
          "Ruhiger, aber mit etwas Abstand: die Uferwege weiter seeaufwärts in Richtung Zürichhorn oder Wollishofen. Wer es exklusiv mag, bucht einen Platz in der Magic Lake Zone, einen Tisch in einem Restaurant mit Seeblick oder eine Silvesterfahrt auf einem Schiff – solche Plätze sind oft schon im Herbst ausverkauft.",
        ]},
        { h: "Praktische Tipps für die Silvesternacht", p: [
          "Ein paar Dinge machen den Abend deutlich angenehmer:",
        ], ul: [
          "**Warm anziehen:** Ende Dezember liegen die Temperaturen in Zürich nachts oft um den Gefrierpunkt, am See weht es zusätzlich. Mütze, Handschuhe und gute Schuhe sind Pflicht.",
          "**Treffpunkt vereinbaren:** In der Menge bricht das Mobilnetz kurz vor und nach Mitternacht oft zusammen. Legen Sie einen festen Treffpunkt fest, falls Sie sich verlieren.",
          "**Kein eigenes Feuerwerk:** Auf dem Festgelände ist privates Feuerwerk verboten, die Polizei setzt das konsequent durch.",
          "**Wenig mitnehmen:** Grosse Taschen sind lästig und werden an Zugängen teils kontrolliert. Wertsachen gehören in die Innentasche.",
          "**Mit Kindern:** Gehörschutz für kleine Kinder und ein Platz am Rand der Menge machen den Abend entspannter.",
        ]},
        { h: "Nach dem Feuerwerk: so kommen Sie weg", p: [
          "Direkt nach dem Feuerwerk wollen zehntausende Menschen gleichzeitig nach Hause. S-Bahnen, Trams und Busse fahren in der Silvesternacht länger als sonst, sind unmittelbar nach dem Feuerwerk aber sehr voll. Taxis sind in diesen Minuten knapp, und Fahrdienst-Apps reagieren mit langen Wartezeiten und hohen Preisen.",
          "Am entspanntesten ist es, die Rückfahrt vorab zu fixieren. Bei einem vorgebuchten Transfer vereinbaren Sie einen Abholpunkt ausserhalb der Sperrzone – etwa beim Hotel, am Hauptbahnhof oder in einer ruhigeren Seitenstrasse – und eine Uhrzeit, zum Beispiel 00:45 oder 01:00 Uhr, wenn sich die erste Welle gelegt hat. Der Fahrer wartet dort, und Sie gehen die letzten Minuten zu Fuss statt im Gedränge zu stehen.",
          "Weil die Abholung zwischen 00:00 und 06:00 Uhr liegt, gilt der Nachttarif von 20 %. Der Preis wird bei der Buchung sofort angezeigt und ändert sich danach nicht, egal wie gross die Nachfrage in dieser Nacht ist.",
        ]},
        { h: "Silvester mit Anreise: Ankunft am 30. oder 31. Dezember", p: [
          "Viele Gäste reisen kurz vor dem Jahreswechsel an. Am 30. und 31. Dezember ist der Flughafen Zürich stark frequentiert, Hotels in der Innenstadt sind ausgebucht, und am Silvesternachmittag sind die Strassen rund um das Seebecken ab dem frühen Abend teilweise gesperrt.",
          "Planen Sie die Ankunft deshalb möglichst bis zum frühen Nachmittag. Ihr Fahrer kennt die Sperrungen und bringt Sie so nah wie möglich ans Hotel; tragen Sie bei der Buchung den Hotelnamen ein. Wer am 1. Januar weiterfliegt, sollte die Fahrt zum Flughafen ebenfalls vorab buchen – am Neujahrsmorgen ist das Angebot an Taxis dünn. Wie Sie die Abholzeit berechnen, steht in [Wie früh am Flughafen Zürich sein?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Alternativen: Silvester in den Bergen oder in anderen Städten", p: [
          "Nicht jeder möchte in der Menge feiern. Beliebt sind auch Silvesterabende in den Bergen – in Davos, St. Moritz, Zermatt oder Grindelwald gibt es Feuerwerke, Galadiners und Partys im Schnee. Dort gilt: Die Anreise sollte spätestens am 30. Dezember erfolgen, weil die Bergstrassen zum Jahreswechsel voll sind. Ziele und Fahrzeiten finden Sie in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "Auch Luzern, Basel und Bern feiern mit Feuerwerken und Festen in der Altstadt, nur deutlich ruhiger als Zürich. Weitere Anlässe im Winter stehen auf unserer [Eventseite](/events).",
        ]},
        { h: "Häufige Fragen zu Silvester in Zürich", p: []},
        { h3: "Wann beginnt das Feuerwerk in Zürich?", p: [
          "Nach dem bisherigen Ablauf um etwa 00:20 Uhr, kurz nachdem die Lichter rund um das Seebecken gelöscht wurden. Es dauert rund 15 bis 20 Minuten.",
        ]},
        { h3: "Kostet der Silvesterzauber Eintritt?", p: [
          "Nein, das Fest am Seebecken ist frei zugänglich. Kostenpflichtig sind nur Zusatzbereiche wie die Magic Lake Zone.",
        ]},
        { h3: "Wie komme ich nach dem Feuerwerk zurück ins Hotel?", p: [
          "Zu Fuss, mit den verlängert fahrenden öffentlichen Verkehrsmitteln oder mit einem vorgebuchten Transfer ab einem vereinbarten Abholpunkt ausserhalb der Sperrzone. Spontane Taxis sind in der ersten Stunde nach Mitternacht schwer zu bekommen.",
        ]},
        { h3: "Kann ich in der Silvesternacht einen Transfer zum Flughafen buchen?", p: [
          "Ja, wir fahren rund um die Uhr. Zwischen 00:00 und 06:00 Uhr gilt der Nachttarif von 20 %, der sofort im Preis angezeigt wird. Buchen Sie früh, weil die Nachfrage in dieser Nacht hoch ist.",
        ]},
        { h3: "Welches Fahrzeug brauche ich für eine Gruppe?", p: [
          "Bis zu sieben Personen fahren in der V-Klasse; der Festpreis gilt pro Fahrzeug. Für grössere Gruppen buchen Sie mehrere Fahrzeuge mit demselben Abholpunkt.",
          "Jetzt [Silvester-Fahrt buchen](/buchung) – Abholpunkt und Uhrzeit vorab fix.",
        ]},
      ],
    },
    en: {
      title: "New Year's Eve in Zurich: Fireworks Over the Lake, the Best Spots and Getting Home Safely",
      seo: "New Year's Eve in Zurich: Fireworks Guide",
      excerpt: "Silvesterzauber at the lake basin, church bells, fireworks at 00:20 and 150,000 people in the city centre: how Zurich celebrates the new year, where to stand, what to bring – and how to get back to your hotel, home or the airport after midnight without the crush.",
      body: [
        { p: [
          "On New Year's Eve all of Zurich is out. Well over a hundred thousand people celebrate around the lake basin every year, the bells of the Grossmünster ring out the year, and shortly after midnight a large firework display lights up the sky over Lake Zurich. For visitors from around the world it is one of the most beautiful moments to experience the city – provided the planning is right.",
          "This guide explains how New Year's Eve in Zurich works, where you get the best view, what to watch out for with cold and crowds, and how to move on relaxed after the fireworks. All details are based on the announced programme (as of October 2026); check the official Silvesterzauber website shortly before the event.",
        ]},
        { h: "Silvesterzauber at the lake basin", p: [
          "Silvesterzauber is an open public festival around the lower lake basin: from Limmatquai via Bellevue and Utoquai, across the Quaibrücke to General-Guisan-Quai. What began in 1988 as a small celebration is today one of Switzerland's largest New Year's events. Entry is free; for the Magic Lake Zone with heated tents, lounges and a clear view of the fireworks there are paid tickets.",
          "The festival starts on the afternoon of 31 December with street food and bars, and families will find a children's zone. From the evening DJs and bands play on several stages, and the party goes on into the early hours.",
        ], table: { head: ["Programme", "Time (guide values)"], rows: [
          ["Festival opens at the lake basin", "from 2 pm"],
          ["Music on the festival stages", "from approx. 8 pm"],
          ["Bells of the Grossmünster", "approx. 11:40–11:58 pm"],
          ["Lights around the lake basin go out", "shortly after midnight"],
          ["Fireworks over the lake", "approx. 00:20, around 15–20 minutes"],
          ["Festival ends", "approx. 3 am"],
        ]}},
        { h: "Where to see the fireworks best", p: [
          "The fireworks are launched from boats on the lake and are clearly visible all around the lake basin. The best spots are on the Quaibrücke, at Bürkliplatz, on General-Guisan-Quai and on Utoquai. If you want to stand there, arrive by 11 pm at the latest; after that it gets crowded and some access points are closed.",
          "Quieter, but a little further away: the lakeside paths further up the lake towards Zürichhorn or Wollishofen. If you prefer something exclusive, book a place in the Magic Lake Zone, a table in a restaurant with a lake view or a New Year's cruise – such places are often sold out by the autumn.",
        ]},
        { h: "Practical tips for New Year's Eve", p: [
          "A few things make the evening considerably more pleasant:",
        ], ul: [
          "**Dress warmly:** at the end of December night temperatures in Zurich are often around freezing, and there is wind by the lake. Hat, gloves and good shoes are a must.",
          "**Agree a meeting point:** in the crowd the mobile network often fails shortly before and after midnight. Fix a meeting point in case you lose each other.",
          "**No private fireworks:** private fireworks are banned on the festival grounds, and the police enforce this strictly.",
          "**Travel light:** large bags are a nuisance and are sometimes checked at access points. Keep valuables in an inside pocket.",
          "**With children:** ear protection for small children and a spot at the edge of the crowd make the evening more relaxed.",
        ]},
        { h: "After the fireworks: how to get away", p: [
          "Right after the fireworks tens of thousands of people want to go home at the same time. S-Bahn trains, trams and buses run later than usual on New Year's Eve but are very full immediately after the fireworks. Taxis are scarce in those minutes, and ride-hailing apps respond with long waits and high prices.",
          "The most relaxed option is to fix your journey home in advance. With a pre-booked transfer you agree a pickup point outside the closed zone – for example at your hotel, the main station or a quieter side street – and a time, say 00:45 or 1 am, when the first wave has subsided. The driver waits there, and you walk the last few minutes instead of standing in the crush.",
          "Because the pickup falls between midnight and 6 am, the night tariff of 20 % applies. The price is shown immediately when booking and does not change afterwards, however high demand is that night.",
        ]},
        { h: "Arriving for New Year's: landing on 30 or 31 December", p: [
          "Many guests arrive just before the turn of the year. On 30 and 31 December Zurich Airport is very busy, city-centre hotels are fully booked, and on the afternoon of New Year's Eve the roads around the lake basin are partly closed from early evening.",
          "So plan your arrival by early afternoon if possible. Your driver knows the closures and takes you as close to the hotel as possible; enter the hotel name when booking. If you fly on 1 January, book the ride to the airport in advance too – taxis are thin on the ground on New Year's morning. How to calculate the pickup time is in [How early should you be at Zurich Airport?](/blog/wie-frueh-am-flughafen-zuerich-sein-check-in).",
        ]},
        { h: "Alternatives: New Year in the mountains or other cities", p: [
          "Not everyone wants to celebrate in a crowd. New Year's Eve in the mountains is popular too – Davos, St. Moritz, Zermatt and Grindelwald offer fireworks, gala dinners and parties in the snow. There, travel by 30 December at the latest, because mountain roads are busy at the turn of the year. Destinations and travel times are in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "Lucerne, Basel and Bern also celebrate with fireworks and festivities in their old towns, just much more quietly than Zurich. More winter events are on our [events page](/events).",
        ]},
        { h: "Frequently asked questions about New Year's Eve in Zurich", p: []},
        { h3: "When do the fireworks start in Zurich?", p: [
          "Based on previous years, at around 00:20, shortly after the lights around the lake basin are switched off. They last around 15 to 20 minutes.",
        ]},
        { h3: "Is there an entry fee for Silvesterzauber?", p: [
          "No, the festival at the lake basin is free. Only extra areas such as the Magic Lake Zone are ticketed.",
        ]},
        { h3: "How do I get back to my hotel after the fireworks?", p: [
          "On foot, by public transport running extended hours, or with a pre-booked transfer from an agreed pickup point outside the closed zone. Spontaneous taxis are hard to get in the first hour after midnight.",
        ]},
        { h3: "Can I book a transfer to the airport on New Year's night?", p: [
          "Yes, we drive around the clock. Between midnight and 6 am the night tariff of 20 % applies and is shown in the price straight away. Book early, as demand is high that night.",
        ]},
        { h3: "Which vehicle do I need for a group?", p: [
          "Up to seven people travel in the V-Class; the fixed price is per vehicle. For larger groups, book several vehicles with the same pickup point.",
          "[Book your New Year's ride now](/buchung) – pickup point and time fixed in advance.",
        ]},
      ],
    },
  },
  {
    slug: "zuerich-comer-see-transfer-tagesausflug",
    date: "2026-10-07",
    img: "/gallery/15.jpg",
    de: {
      title: "Vom Flughafen Zürich an den Comer See: Route, Fahrzeit, Grenze und die schönsten Orte am See",
      seo: "Flughafen Zürich–Comer See: Transfer-Guide",
      excerpt: "Rund drei Stunden vom Flughafen Zürich nach Como, Cernobbio, Bellagio oder Menaggio – über den Gotthard oder den San Bernardino. Was Sie über Route, Stau, Grenzübertritt und Saison wissen sollten, welcher Ort am See zu wem passt und warum sich ein Tagesausflug selten lohnt.",
      body: [
        { p: [
          "Der Comer See gehört zu den bekanntesten Reisezielen Europas: Villen mit Gärten bis ans Wasser, Dörfer an steilen Hängen, Hochzeiten in historischen Anwesen. Weniger bekannt ist, dass viele Gäste gar nicht über Mailand anreisen, sondern über Zürich – weil dort mehr Langstreckenflüge landen und der Weg an den See nicht länger ist als von Malpensa mit Stau rund um Mailand.",
          "Dieser Guide zeigt, wie der Transfer vom Flughafen Zürich an den Comer See funktioniert, welche Route der Fahrer wählt, was an der Grenze gilt, welcher Ort zu Ihnen passt und wann die beste Reisezeit ist.",
        ]},
        { h: "Die Strecke auf einen Blick", p: [
          "Die Fahrzeiten sind Richtwerte. Am Gotthard hängen sie stark vom Reisetag ab.",
        ], table: { head: ["Eckdaten", "Flughafen Zürich → Comer See"], rows: [
          ["Distanz bis Como", "rund 240 km"],
          ["Fahrzeit bis Como", "ca. 3 bis 3½ Stunden"],
          ["Bis Bellagio oder Menaggio", "je nach Ufer ca. 45–75 Minuten zusätzlich"],
          ["Route", "A2 durch den Gotthard-Strassentunnel oder A13 über den San Bernardino, dann via Lugano und Chiasso"],
          ["Grenze", "Chiasso–Brogeda (Schweiz–Italien), Ausweis erforderlich"],
          ["Preis", "Festpreis pro Fahrzeug für die genaue Adresse, vorab im Buchungsrechner"],
        ]}},
        { h: "Die Route: Gotthard oder San Bernardino", p: [
          "Der klassische Weg führt über die A4 und A2 Richtung Süden, durch den Gotthard-Strassentunnel ins Tessin und an Bellinzona und Lugano vorbei bis zur Grenze bei Chiasso. Von dort sind es nur wenige Kilometer bis Como. Die Strecke ist landschaftlich eindrucksvoll: Vierwaldstättersee, die Leventina, dann der erste Blick auf die Palmen am Luganersee.",
          "Der Gotthard ist an Ferientagen allerdings berüchtigt für Stau vor den Tunnelportalen, besonders an Ostern, Pfingsten, Auffahrt und an Sommersamstagen. Dann weicht der Fahrer häufig über die A13 und den San-Bernardino-Tunnel aus, die bei Bellinzona wieder auf die Gotthard-Route trifft. Welche Route schneller ist, entscheidet er nach der aktuellen Verkehrslage – Sie müssen sich darum nicht kümmern.",
          "Auf gut drei Stunden Fahrt ist eine Pause im Tessin angenehm, etwa für einen Espresso mit Blick auf den Luganersee. Sagen Sie dem Fahrer einfach Bescheid.",
        ]},
        { h: "Grenze Schweiz–Italien: was gilt", p: [
          "Die Schweiz und Italien gehören beide zum Schengenraum, systematische Passkontrollen gibt es nicht. Trotzdem ist die Grenze eine Zollgrenze, und Stichkontrollen sind häufig. Alle Mitreisenden brauchen einen gültigen Reisepass oder eine Identitätskarte, Reisende aus Drittstaaten zusätzlich die Dokumente für den Schengenraum.",
          "Bei Einkäufen, etwa Uhren oder Schmuck aus der Schweiz, gelten die Zollbestimmungen der EU. Was beim Grenzübertritt generell zu beachten ist, beschreibt [Vom Flughafen Zürich nach Deutschland oder Österreich](/blog/transfer-flughafen-zuerich-deutschland-oesterreich-grenze) – die Grundsätze gelten für Italien genauso.",
        ]},
        { h: "Welcher Ort am Comer See passt zu Ihnen?", p: [
          "Der See hat die Form eines umgedrehten Y, und jedes Ufer hat seinen eigenen Charakter:",
        ], ul: [
          "**Como:** die Stadt am Südende, mit Dom, Seepromenade und der Standseilbahn nach Brunate. Am schnellsten erreichbar und ideal als Ausgangspunkt für Schiffsausflüge.",
          "**Cernobbio:** wenige Minuten nördlich von Como, bekannt für Luxushotels wie die Villa d'Este und für Hochzeiten.",
          "**Tremezzo und Menaggio:** am Westufer, mit der Villa Carlotta und Fähren in alle Richtungen. Ein guter Kompromiss aus Erreichbarkeit und Ruhe.",
          "**Bellagio:** die «Perle des Sees» an der Spitze der Halbinsel, romantisch, aber über schmale Uferstrassen erreichbar; die Fahrt dauert entsprechend länger.",
          "**Varenna:** am Ostufer, malerisch und ruhiger, gut mit der Fähre nach Bellagio und Menaggio verbunden.",
        ]},
        { h: "Hotels und die letzte Meile", p: [
          "Viele Hotels am Comer See liegen an engen Uferstrassen oder an Hängen mit schmalen Zufahrten. Tragen Sie bei der Buchung unbedingt den Hotelnamen und die genaue Adresse ein. Bei Villen und Hochzeitslocations mit Privatzufahrt hilft ein Hinweis im Notizfeld, ob grosse Fahrzeuge bis zum Eingang fahren dürfen.",
          "Für Familien und Gruppen mit viel Gepäck ist die V-Klasse die richtige Wahl; für Paare, die stilvoll ankommen möchten, die S-Klasse. Den Preis für Ihre genaue Adresse zeigt der [Buchungsrechner](/buchung); eine Übersicht der Ziele in Italien finden Sie auf der Seite [Transfer nach Como](/flughafentransfer-como-it).",
        ]},
        { h: "Beste Reisezeit", p: [
          "Die Hauptsaison am Comer See reicht von April bis Oktober. Im Mai, Juni und September ist es warm, aber nicht überlaufen; Juli und August sind heiss und voll. Viele Hotels und Fährverbindungen schliessen im Winter oder fahren eingeschränkt, einige grosse Häuser öffnen erst im Frühling wieder.",
          "Für Hochzeiten und Gruppenreisen in der Hochsaison empfehlen wir, den Transfer gleich nach der Hotelbuchung festzulegen. Wenn mehrere Fahrzeuge gleichzeitig ankommen sollen, schreiben Sie uns, wir koordinieren die Abholung.",
        ]},
        { h: "Tagesausflug ab Zürich: lohnt sich das?", p: [
          "Ehrlich gesagt selten. Mit drei Stunden Fahrt pro Richtung bleiben am See nur wenige Stunden, und bei Stau am Gotthard schrumpft die Zeit weiter. Wer den Comer See wirklich erleben will, plant mindestens eine Übernachtung.",
          "Wenn es doch ein Tag sein muss, ist eine Stundenbuchung die bessere Wahl als zwei einzelne Fahrten: Der Fahrer begleitet Sie den ganzen Tag, wartet an jedem Halt und kann Como mit Lugano oder dem Luganersee kombinieren. Ein schöner Zwischenhalt auf dem Rückweg ist [Lugano](/zurich-airport-to-lugano).",
        ]},
        { h: "Weiter nach Mailand oder zum Lago Maggiore", p: [
          "Vom Comer See ist Mailand rund eine Stunde entfernt, der Flughafen Malpensa etwa ebenso. Viele Gäste fliegen in Zürich an und reisen über Mailand ab – oder umgekehrt. Beide Strecken lassen sich als Gabelflug mit zwei Transfers kombinieren; den Transfer nach Mailand finden Sie auf der Seite [Transfer nach Mailand](/flughafentransfer-mailand-it).",
        ]},
        { h: "Häufige Fragen zum Transfer an den Comer See", p: []},
        { h3: "Wie lange dauert die Fahrt vom Flughafen Zürich nach Como?", p: [
          "Rund drei bis dreieinhalb Stunden, je nach Verkehr am Gotthard. Bis Bellagio oder Menaggio kommt je nach Ufer eine knappe Stunde dazu.",
        ]},
        { h3: "Brauche ich einen Pass?", p: [
          "Ja, alle Mitreisenden brauchen einen gültigen Reisepass oder eine Identitätskarte, Reisende aus Drittstaaten zusätzlich die nötigen Schengen-Dokumente.",
        ]},
        { h3: "Ist Zürich oder Mailand der bessere Flughafen für den Comer See?", p: [
          "Malpensa ist näher, Zürich hat oft die besseren Langstreckenverbindungen und eine entspannte Ankunft. Ab Zürich dauert die Fahrt etwas länger, ist dafür landschaftlich die schönere.",
        ]},
        { h3: "Fahren Sie auch im Winter an den Comer See?", p: [
          "Ja, ganzjährig. Beachten Sie nur, dass viele Hotels am See im Winter geschlossen sind.",
        ]},
        { h3: "Können mehrere Fahrzeuge für eine Hochzeitsgesellschaft koordiniert werden?", p: [
          "Ja. Schreiben Sie uns Ankunftszeiten und Zieladresse, wir planen die Fahrzeuge so, dass die Gäste gemeinsam ankommen.",
          "Jetzt [Transfer an den Comer See buchen](/buchung) – Festpreis für Ihre genaue Adresse.",
        ]},
      ],
    },
    en: {
      title: "From Zurich Airport to Lake Como: Route, Driving Time, Border and the Most Beautiful Places on the Lake",
      seo: "Zurich Airport to Lake Como: Transfer Guide",
      excerpt: "Around three hours from Zurich Airport to Como, Cernobbio, Bellagio or Menaggio – via the Gotthard or the San Bernardino. What to know about the route, traffic, the border crossing and the season, which lakeside village suits whom, and why a day trip rarely pays off.",
      body: [
        { p: [
          "Lake Como is one of Europe's best-known destinations: villas with gardens down to the water, villages on steep slopes, weddings in historic estates. Less well known is that many guests do not travel via Milan at all but via Zurich – because more long-haul flights land there and the drive to the lake is no longer than from Malpensa with the traffic around Milan.",
          "This guide shows how the transfer from Zurich Airport to Lake Como works, which route the driver takes, what applies at the border, which village suits you and when the best time to travel is.",
        ]},
        { h: "The route at a glance", p: [
          "Driving times are guide values. At the Gotthard they depend heavily on the day of travel.",
        ], table: { head: ["Key facts", "Zurich Airport → Lake Como"], rows: [
          ["Distance to Como", "around 240 km"],
          ["Driving time to Como", "approx. 3 to 3½ hours"],
          ["To Bellagio or Menaggio", "approx. 45–75 minutes extra, depending on the shore"],
          ["Route", "A2 through the Gotthard road tunnel or A13 via the San Bernardino, then via Lugano and Chiasso"],
          ["Border", "Chiasso–Brogeda (Switzerland–Italy), ID required"],
          ["Price", "Fixed price per vehicle for the exact address, shown in advance in the booking calculator"],
        ]}},
        { h: "The route: Gotthard or San Bernardino", p: [
          "The classic way follows the A4 and A2 south, through the Gotthard road tunnel into Ticino and past Bellinzona and Lugano to the border at Chiasso. From there it is only a few kilometres to Como. The route is spectacular: Lake Lucerne, the Leventina valley, then the first glimpse of palm trees on Lake Lugano.",
          "On holiday dates, however, the Gotthard is notorious for queues in front of the tunnel portals, especially at Easter, Whitsun, Ascension and on summer Saturdays. The driver then often switches to the A13 and the San Bernardino tunnel, which rejoins the Gotthard route at Bellinzona. Which route is faster he decides based on the current traffic – you need not worry about it.",
          "On a drive of just over three hours, a break in Ticino is pleasant, for example an espresso overlooking Lake Lugano. Just let the driver know.",
        ]},
        { h: "The Switzerland–Italy border: what applies", p: [
          "Switzerland and Italy are both in the Schengen area, so there are no systematic passport checks. The border is nevertheless a customs border, and spot checks are common. All passengers need a valid passport or ID card; travellers from third countries also need the documents required for the Schengen area.",
          "For purchases such as watches or jewellery from Switzerland, EU customs rules apply. What to note at the border in general is described in [From Zurich Airport to Germany or Austria](/blog/transfer-flughafen-zuerich-deutschland-oesterreich-grenze) – the principles apply to Italy just the same.",
        ]},
        { h: "Which Lake Como village suits you?", p: [
          "The lake is shaped like an upside-down Y, and each shore has its own character:",
        ], ul: [
          "**Como:** the town at the southern end, with its cathedral, lakeside promenade and the funicular to Brunate. Quickest to reach and ideal as a base for boat trips.",
          "**Cernobbio:** a few minutes north of Como, known for luxury hotels such as the Villa d'Este and for weddings.",
          "**Tremezzo and Menaggio:** on the western shore, with the Villa Carlotta and ferries in every direction. A good compromise between accessibility and calm.",
          "**Bellagio:** the \"pearl of the lake\" at the tip of the peninsula, romantic but reached via narrow lakeside roads, so the drive takes longer.",
          "**Varenna:** on the eastern shore, picturesque and quieter, well connected by ferry to Bellagio and Menaggio.",
        ]},
        { h: "Hotels and the last mile", p: [
          "Many hotels on Lake Como are on narrow lakeside roads or on slopes with tight access. Be sure to enter the hotel name and exact address when booking. For villas and wedding venues with a private drive, a note in the notes field on whether large vehicles may drive up to the entrance helps.",
          "For families and groups with a lot of luggage the V-Class is the right choice; for couples who want to arrive in style, the S-Class. The [booking calculator](/buchung) shows the price for your exact address; an overview of destinations in Italy is on the page [Transfer to Como](/flughafentransfer-como-it).",
        ]},
        { h: "Best time to travel", p: [
          "The main season on Lake Como runs from April to October. May, June and September are warm but not overcrowded; July and August are hot and busy. Many hotels and ferry services close or run reduced services in winter, and some large hotels only reopen in spring.",
          "For weddings and group trips in high season, we recommend fixing the transfer right after booking the hotel. If several vehicles are to arrive at the same time, write to us and we will coordinate the pickup.",
        ]},
        { h: "Day trip from Zurich: is it worth it?", p: [
          "Honestly, rarely. With three hours' driving each way you only get a few hours at the lake, and with traffic at the Gotthard the time shrinks further. If you really want to experience Lake Como, plan at least one night.",
          "If it has to be one day, an hourly booking is the better choice than two separate rides: the driver accompanies you all day, waits at every stop and can combine Como with Lugano or Lake Lugano. A lovely stop on the way back is [Lugano](/zurich-airport-to-lugano).",
        ]},
        { h: "On to Milan or Lake Maggiore", p: [
          "From Lake Como, Milan is around an hour away, as is Malpensa airport. Many guests fly into Zurich and leave via Milan – or the other way round. Both routes can be combined as an open-jaw trip with two transfers; the transfer to Milan is on the page [Transfer to Milan](/flughafentransfer-mailand-it).",
        ]},
        { h: "Frequently asked questions about the Lake Como transfer", p: []},
        { h3: "How long is the drive from Zurich Airport to Como?", p: [
          "Around three to three and a half hours, depending on traffic at the Gotthard. Add just under an hour to Bellagio or Menaggio, depending on the shore.",
        ]},
        { h3: "Do I need a passport?", p: [
          "Yes, all passengers need a valid passport or ID card; travellers from third countries also need the required Schengen documents.",
        ]},
        { h3: "Is Zurich or Milan the better airport for Lake Como?", p: [
          "Malpensa is closer; Zurich often has better long-haul connections and a relaxed arrival. From Zurich the drive is a little longer but far more scenic.",
        ]},
        { h3: "Do you drive to Lake Como in winter too?", p: [
          "Yes, all year round. Just note that many lakeside hotels are closed in winter.",
        ]},
        { h3: "Can several vehicles be coordinated for a wedding party?", p: [
          "Yes. Send us the arrival times and destination address, and we will plan the vehicles so the guests arrive together.",
          "[Book your Lake Como transfer now](/buchung) – fixed price for your exact address.",
        ]},
      ],
    },
  },
  {
    slug: "flughafen-zuerich-interlaken-transfer-guide",
    date: "2026-10-07",
    img: "/gallery/11.jpg",
    de: {
      title: "Flughafen Zürich–Interlaken: Route über den Brünig, Fahrzeit, Hotels und Ausflüge in die Jungfrau-Region",
      seo: "Flughafen Zürich–Interlaken: Transfer-Guide",
      excerpt: "Rund 125 km, etwa zweieinhalb Stunden geplante Fahrzeit, Festpreis pro Fahrzeug: wie der Transfer vom Flughafen Zürich nach Interlaken funktioniert – über Luzern und den Brünigpass oder über Bern, mit Tipps zu Hotels, Winterfahrten, Jungfraujoch und der Weiterreise nach Grindelwald, Lauterbrunnen und Wengen.",
      body: [
        { p: [
          "Interlaken liegt zwischen Thuner- und Brienzersee, direkt vor Eiger, Mönch und Jungfrau. Für viele Reisende aus Indien, den Golfstaaten, Asien und Amerika ist es das Herz ihrer Schweizreise: Ausgangspunkt fürs Jungfraujoch, für Gleitschirmflüge, Schifffahrten und Ausflüge in die Bergdörfer.",
          "Dieser Guide beschreibt den Transfer vom Flughafen Zürich nach Interlaken: Preislogik, die beiden möglichen Routen, Fahrzeiten im Sommer und Winter, Hotels, Ausflüge und die ehrliche Frage, wann der Zug genügt.",
        ]},
        { h: "Die Strecke auf einen Blick", p: [
          "Die Fahrzeit ist unser Planungswert inklusive Puffer. Bei freier Strasse sind Sie oft schneller in Interlaken.",
        ], table: { head: ["Eckdaten", "Flughafen Zürich → Interlaken"], rows: [
          ["Distanz", "rund 125 km"],
          ["Geplante Fahrzeit", "etwa 150 Minuten (Tür zu Tür)"],
          ["Route", "über Luzern und den Brünigpass, alternativ über Bern und den Thunersee"],
          ["Preis", "Festpreis pro Fahrzeug, vorab bekannt"],
          ["Inklusive", "Meet & Greet, 60 Min. Wartezeit, Flugverfolgung, Gepäck, Skisäcke, Kindersitze"],
          ["Fahrzeuge", "E-Klasse (bis 2 Pers.), V-Klasse (bis 7 Pers.), S-Klasse (bis 3 Pers.)"],
        ]}},
        { h: "So entsteht der Preis", p: [
          "Der [Transfer Flughafen Zürich–Interlaken](/zurich-airport-to-interlaken) kostet einen Festpreis pro Fahrzeug, berechnet aus unserem Kilometertarif. Er hängt nur von der Fahrzeugklasse ab und wird im Buchungsformular angezeigt, bevor Sie bestätigen.",
          "Enthalten sind Mehrwertsteuer, Meet & Greet mit Namensschild, 60 Minuten Wartezeit nach der tatsächlichen Landung, Flugverfolgung, Gepäck inklusive bis zu vier Skisäcken und Kindersitze. Zwischen 00:00 und 06:00 Uhr gilt ein Nachttarif von 20 %. Weil der Preis pro Fahrzeug gilt, lohnt sich der Transfer besonders für Familien und Gruppen.",
        ]},
        { h: "Die Route: über den Brünig oder über Bern", p: [
          "Die kürzere und landschaftlich schönere Route führt über Luzern: auf der A4 und A14 bis Luzern, dann auf der A8 am Sarnersee entlang, hinauf zum Brünigpass und hinunter nach Brienz. Am Lungerersee und am Brienzersee sehen Sie die ersten Postkartenbilder, bevor Sie Interlaken von Osten erreichen.",
          "Die Alternative führt über die A1 nach Bern und dann auf der A6 und A8 am Thunersee entlang nach Interlaken. Sie ist etwas länger, aber durchgehend Autobahn. Der Fahrer wählt sie zum Beispiel bei starkem Schneefall am Brünig oder bei Stau in Luzern. Beide Routen sind im Festpreis enthalten.",
          "Auf rund zweieinhalb Stunden ist eine kurze Pause angenehm, etwa am Lungerersee mit Blick auf die Berge. Sagen Sie dem Fahrer einfach Bescheid.",
        ]},
        { h: "Im Winter: was Sie wissen sollten", p: [
          "Der Brünigpass liegt auf rund 1'000 Metern und ist ganzjährig befahrbar, kann bei Schneefall aber langsamer werden. Unsere Fahrer kennen die Strecke und planen im Winter mehr Zeit ein. An Wechselsamstagen sind die Zufahrten ins Berner Oberland voll; für die Rückfahrt an einem Samstag empfehlen wir einen zusätzlichen Puffer von 45 bis 60 Minuten.",
          "Skigepäck befördern wir kostenlos, bis zu vier Skisäcke pro Fahrzeug. Für eine Familie mit kompletter Ausrüstung ist die V-Klasse die richtige Wahl. Mehr dazu in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Ankommen in Interlaken", p: [
          "Die grossen Hotels am Höheweg mit Blick auf die Jungfrau fährt der Chauffeur direkt vor den Eingang, ebenso die Häuser rund um die Bahnhöfe Interlaken West und Ost. Viele Unterkünfte liegen in den Nachbarorten Matten, Unterseen, Wilderswil oder Bönigen – tragen Sie bei der Buchung den Hotelnamen und die genaue Adresse ein.",
          "Wer eine Ferienwohnung bezieht, schreibt im Notizfeld dazu, wie der Schlüssel übergeben wird; der Fahrer wartet bei Bedarf kurz, bis alles geklärt ist.",
        ]},
        { h: "Ausflüge ab Interlaken", p: [
          "Interlaken ist der ideale Ausgangspunkt für die Jungfrau-Region:",
        ], ul: [
          "**Jungfraujoch:** über Grindelwald und den Eiger Express oder über Lauterbrunnen und Wengen zur Kleinen Scheidegg, dann mit der Jungfraubahn hinauf zum höchstgelegenen Bahnhof Europas.",
          "**Harder Kulm:** die Standseilbahn direkt aus Interlaken mit Aussicht auf beide Seen und das Dreigestirn.",
          "**Schifffahrten** auf dem Thuner- und dem Brienzersee, etwa zu den Giessbachfällen oder nach Spiez.",
          "**Lauterbrunnental** mit Staubbachfall und Trümmelbachfällen, dazu Mürren und das Schilthorn.",
          "**Gleitschirm-Tandemflüge** mit Landung direkt auf der Höhematte im Zentrum.",
        ]},
        { h: "Weiter nach Grindelwald, Lauterbrunnen oder Wengen", p: [
          "Viele Gäste übernachten nicht in Interlaken selbst, sondern in den Bergdörfern. Grindelwald erreichen Sie von Interlaken aus in rund einer halben Stunde, Lauterbrunnen in etwa 20 Minuten. Wengen und Mürren sind autofrei: Der Transfer endet in Lauterbrunnen beziehungsweise Stechelberg, wo der Fahrer Sie mit dem Gepäck zur Bahn bringt.",
          "Am besten fahren Sie direkt: Wir haben feste Strecken nach [Grindelwald](/zurich-airport-to-grindelwald) und [Wengen](/zurich-airport-to-wengen). Welches Dorf zu Ihnen passt, erklärt [Jungfrau-Region für Einsteiger](/blog/jungfrau-region-guide-interlaken-grindelwald).",
        ]},
        { h: "Transfer oder Zug?", p: [
          "Der Zug vom Flughafen Zürich nach Interlaken ist eine gute Verbindung mit mindestens einem Umstieg, meist in Bern oder in Luzern. Für Alleinreisende mit leichtem Gepäck und einem Swiss Travel Pass ist er eine vernünftige Wahl.",
          "Der Transfer gewinnt bei Familien und Gruppen, bei viel Gepäck oder Skiausrüstung, bei späten Landungen, bei Unterkünften ausserhalb des Zentrums und bei allen, die nach einem Langstreckenflug nicht mehr umsteigen wollen. Wie sich Pass und Transfer kombinieren lassen, zeigt [Lohnt sich der Swiss Travel Pass?](/blog/swiss-travel-pass-lohnt-sich-vergleich-transfer).",
        ]},
        { h: "Häufige Fragen zum Transfer nach Interlaken", p: []},
        { h3: "Wie lange dauert der Transfer vom Flughafen Zürich nach Interlaken?", p: [
          "Wir planen mit etwa 150 Minuten von der Ankunftshalle bis zum Hotel. Bei freier Strasse sind es oft rund zwei Stunden.",
        ]},
        { h3: "Welche Route nimmt der Fahrer?", p: [
          "In der Regel über Luzern und den Brünigpass, bei Schnee oder Stau über Bern. Der Preis bleibt gleich.",
        ]},
        { h3: "Fahren Sie auch direkt nach Grindelwald oder Lauterbrunnen?", p: [
          "Ja. Geben Sie die Zieladresse ein; für autofreie Orte fahren wir bis zur Bahnstation.",
        ]},
        { h3: "Ist der Transfer für Familien und Gruppen günstiger als der Zug?", p: [
          "Für Gruppen von Erwachsenen oft ja, weil der Festpreis pro Fahrzeug gilt. Familien mit Swiss Travel Pass profitieren dagegen davon, dass Kinder unter 16 mit der Swiss Family Card gratis Zug fahren – dann entscheiden vor allem Gepäck und Umstiege. Den genauen Transferpreis zeigt der Buchungsrechner in Sekunden.",
        ]},
        { h3: "Kann der Fahrer unterwegs anhalten, etwa in Luzern?", p: [
          "Ja. Fügen Sie im Buchungsformular einen Zwischenstopp hinzu, zum Beispiel für ein Mittagessen in Luzern; der Preis wird für die gesamte Strecke berechnet.",
          "Jetzt [Transfer nach Interlaken buchen](/buchung) – Preis vorher bekannt, Chauffeur wartet in der Ankunftshalle.",
        ]},
      ],
    },
    en: {
      title: "Zurich Airport to Interlaken: Route Over the Brünig, Driving Time, Hotels and Excursions in the Jungfrau Region",
      seo: "Zurich Airport to Interlaken: Transfer Guide",
      excerpt: "Around 125 km, about two and a half hours of planned driving time, fixed price per vehicle: how the transfer from Zurich Airport to Interlaken works – via Lucerne and the Brünig Pass or via Bern, with tips on hotels, winter driving, the Jungfraujoch and onward travel to Grindelwald, Lauterbrunnen and Wengen.",
      body: [
        { p: [
          "Interlaken lies between Lake Thun and Lake Brienz, right in front of the Eiger, Mönch and Jungfrau. For many travellers from India, the Gulf, Asia and America it is the heart of their Swiss trip: the base for the Jungfraujoch, paragliding, boat trips and excursions to the mountain villages.",
          "This guide describes the transfer from Zurich Airport to Interlaken: pricing logic, the two possible routes, driving times in summer and winter, hotels, excursions and the honest question of when the train is enough.",
        ]},
        { h: "The route at a glance", p: [
          "The driving time is our planning value including a buffer. On a clear road you are often in Interlaken sooner.",
        ], table: { head: ["Key facts", "Zurich Airport → Interlaken"], rows: [
          ["Distance", "around 125 km"],
          ["Planned driving time", "about 150 minutes (door to door)"],
          ["Route", "via Lucerne and the Brünig Pass, alternatively via Bern and Lake Thun"],
          ["Price", "Fixed price per vehicle, known in advance"],
          ["Included", "Meet & greet, 60 min waiting time, flight tracking, luggage, ski bags, child seats"],
          ["Vehicles", "E-Class (up to 2), V-Class (up to 7), S-Class (up to 3)"],
        ]}},
        { h: "How the price is made up", p: [
          "The [Zurich Airport–Interlaken transfer](/zurich-airport-to-interlaken) has a fixed price per vehicle, calculated from our per-kilometre tariff. It depends only on the vehicle class and is shown in the booking form before you confirm.",
          "Included are VAT, meet & greet with a name sign, 60 minutes of waiting time after the actual landing, flight tracking, luggage including up to four ski bags, and child seats. Between midnight and 6 am a night tariff of 20 % applies. Because the price is per vehicle, the transfer is particularly worthwhile for families and groups.",
        ]},
        { h: "The route: over the Brünig or via Bern", p: [
          "The shorter and more scenic route goes via Lucerne: on the A4 and A14 to Lucerne, then on the A8 along Lake Sarnen, up to the Brünig Pass and down to Brienz. At Lake Lungern and Lake Brienz you see the first postcard views before reaching Interlaken from the east.",
          "The alternative follows the A1 to Bern and then the A6 and A8 along Lake Thun to Interlaken. It is a little longer but motorway all the way. The driver chooses it, for example, in heavy snowfall on the Brünig or in traffic around Lucerne. Both routes are covered by the fixed price.",
          "On a drive of around two and a half hours, a short break is pleasant, for example at Lake Lungern with a view of the mountains. Just let the driver know.",
        ]},
        { h: "In winter: what you should know", p: [
          "The Brünig Pass lies at around 1,000 metres and is open all year, but can be slower in snowfall. Our drivers know the route and allow more time in winter. On changeover Saturdays the roads into the Bernese Oberland are busy; for a return trip on a Saturday we recommend an extra buffer of 45 to 60 minutes.",
          "We carry ski luggage free of charge, up to four ski bags per vehicle. For a family with full equipment the V-Class is the right choice. More in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
        ]},
        { h: "Arriving in Interlaken", p: [
          "The grand hotels on the Höheweg with a view of the Jungfrau are driven right up to the entrance, as are those around Interlaken West and Ost stations. Many places to stay are in the neighbouring villages of Matten, Unterseen, Wilderswil or Bönigen – enter the hotel name and exact address when booking.",
          "If you are staying in a holiday apartment, note in the notes field how the key will be handed over; the driver will wait briefly if needed until everything is sorted.",
        ]},
        { h: "Excursions from Interlaken", p: [
          "Interlaken is the ideal base for the Jungfrau region:",
        ], ul: [
          "**Jungfraujoch:** via Grindelwald and the Eiger Express or via Lauterbrunnen and Wengen to Kleine Scheidegg, then on the Jungfrau Railway up to Europe's highest railway station.",
          "**Harder Kulm:** the funicular straight from Interlaken with views over both lakes and the famous trio of peaks.",
          "**Boat trips** on Lake Thun and Lake Brienz, for example to the Giessbach Falls or to Spiez.",
          "**Lauterbrunnen valley** with the Staubbach and Trümmelbach falls, plus Mürren and the Schilthorn.",
          "**Tandem paragliding** with a landing right on the Höhematte in the centre.",
        ]},
        { h: "On to Grindelwald, Lauterbrunnen or Wengen", p: [
          "Many guests do not stay in Interlaken itself but in the mountain villages. Grindelwald is around half an hour from Interlaken, Lauterbrunnen about 20 minutes. Wengen and Mürren are car-free: the transfer ends in Lauterbrunnen or Stechelberg respectively, where the driver takes you and your luggage to the train.",
          "It is best to drive directly: we have fixed routes to [Grindelwald](/zurich-airport-to-grindelwald) and [Wengen](/zurich-airport-to-wengen). Which village suits you is explained in [Jungfrau region for beginners](/blog/jungfrau-region-guide-interlaken-grindelwald).",
        ]},
        { h: "Transfer or train?", p: [
          "The train from Zurich Airport to Interlaken is a good connection with at least one change, usually in Bern or Lucerne. For solo travellers with light luggage and a Swiss Travel Pass it is a sensible choice.",
          "The transfer wins for families and groups, with a lot of luggage or ski equipment, after late landings, for accommodation outside the centre and for anyone who does not want to change trains after a long-haul flight. How a pass and a transfer can be combined is shown in [Is the Swiss Travel Pass worth it?](/blog/swiss-travel-pass-lohnt-sich-vergleich-transfer).",
        ]},
        { h: "Frequently asked questions about the Interlaken transfer", p: []},
        { h3: "How long does the transfer from Zurich Airport to Interlaken take?", p: [
          "We plan about 150 minutes from the arrivals hall to the hotel. On a clear road it is often around two hours.",
        ]},
        { h3: "Which route does the driver take?", p: [
          "Usually via Lucerne and the Brünig Pass, in snow or traffic via Bern. The price stays the same.",
        ]},
        { h3: "Do you also drive directly to Grindelwald or Lauterbrunnen?", p: [
          "Yes. Enter the destination address; for car-free villages we drive to the railway station.",
        ]},
        { h3: "Is the transfer cheaper than the train for families and groups?", p: [
          "For groups of adults often yes, because the fixed price is per vehicle. Families with a Swiss Travel Pass, on the other hand, benefit from children under 16 travelling free by train with the Swiss Family Card – then luggage and changes are the deciding factors. The booking calculator shows the exact transfer price in seconds.",
        ]},
        { h3: "Can the driver stop on the way, for example in Lucerne?", p: [
          "Yes. Add an intermediate stop in the booking form, for example for lunch in Lucerne; the price is calculated for the whole route.",
          "[Book your Interlaken transfer now](/buchung) – price known in advance, chauffeur waiting in the arrivals hall.",
        ]},
      ],
    },
  },
  {
    slug: "swiss-travel-pass-lohnt-sich-vergleich-transfer",
    date: "2026-10-07",
    img: "/gallery/10.jpg",
    de: {
      title: "Lohnt sich der Swiss Travel Pass? Ehrlicher Vergleich mit Einzeltickets und Privattransfer",
      seo: "Lohnt sich der Swiss Travel Pass?",
      excerpt: "Was der Swiss Travel Pass kostet und enthält, wann er sich rechnet, wann nicht – und warum die klügste Lösung für viele Reisende eine Kombination ist: Transfer für Ankunft und Abreise mit Gepäck, Pass für die Ausflugstage. Mit Rechenlogik für Paare, Familien und Gruppen.",
      body: [
        { p: [
          "Der Swiss Travel Pass ist das bekannteste Ticket für Schweiz-Besucher: ein Pass für Züge, Busse, Schiffe und viele Bergbahnen, ohne an jedem Bahnhof ein Billett kaufen zu müssen. «Lohnt er sich?» ist eine der meistgestellten Fragen vor einer Schweizreise – und die ehrliche Antwort lautet: oft ja, aber nicht immer, und selten für alles.",
          "Als Transferanbieter könnten wir einfach sagen, das Auto sei immer besser. Das stimmt nicht. Dieser Guide erklärt, wann der Pass die beste Wahl ist, wann Einzeltickets günstiger sind und wann ein Privattransfer Zeit, Nerven und manchmal Geld spart.",
        ]},
        { h: "Was ist der Swiss Travel Pass?", p: [
          "Der Pass richtet sich an Gäste mit Wohnsitz ausserhalb der Schweiz und Liechtensteins und ist in zwei Varianten erhältlich: für 3, 4, 6, 8 oder 15 aufeinanderfolgende Tage oder als Flex-Pass für dieselbe Anzahl frei wählbarer Reisetage innerhalb eines Monats. Es gibt ihn in der 1. und 2. Klasse; Jugendliche unter 25 Jahren erhalten eine Ermässigung.",
          "Die Preise ändern sich jährlich. Zur Orientierung nennt MySwitzerland für den Flex-Pass in der 2. Klasse (Stand Oktober 2026) CHF 289 für 3 Reisetage, CHF 459 für 8 und CHF 519 für 15 Reisetage innerhalb eines Monats, jeweils pro erwachsene Person. Die Variante mit aufeinanderfolgenden Tagen ist etwas günstiger. Aktuelle Preise finden Sie auf den offiziellen Seiten von Swiss Travel System und SBB.",
        ]},
        { h: "Was der Pass enthält – und was nicht", p: [
          "Enthalten sind:",
        ], ul: [
          "**Unbegrenzte Fahrten** mit Zügen, Bussen und Schiffen im öffentlichen Verkehr der Schweiz, auch mit dem Zug ab Flughafen Zürich.",
          "**Öffentlicher Verkehr in den Städten**, also Trams und Busse in Zürich, Luzern, Bern und vielen weiteren Orten.",
          "**Ausgewählte Bergbahnen gratis**, etwa die Rigi, und **Ermässigung auf die meisten anderen Bergbahnen**, je nach Bahn bis zu 50 %.",
          "**Den Swiss Museum Pass** mit freiem Eintritt in rund 500 Museen.",
          "**Die Swiss Family Card:** Kinder unter 16 Jahren reisen in Begleitung eines Elternteils mit Pass kostenlos.",
        ]},
        { p: [
          "Nicht enthalten sind die Sitzplatzreservierungen für Panoramazüge wie Glacier Express und Bernina Express, die vollen Fahrten aufs Jungfraujoch und viele hochalpine Bahnen (nur ermässigt) sowie natürlich alles, was nicht auf Schiene, Strasse oder Wasser des öffentlichen Verkehrs liegt. Und: Der Pass löst kein Gepäckproblem. Mit zwei grossen Koffern pro Person, Skisäcken oder einem Kinderwagen bleibt jeder Umstieg anstrengend.",
        ]},
        { h: "Wann sich der Pass rechnet", p: [
          "Der Swiss Travel Pass lohnt sich vor allem, wenn Sie viel unterwegs sind: mehrere lange Bahnstrecken in kurzer Zeit, dazu Schiffe, Stadtverkehr und ein oder zwei Bergausflüge. Klassisches Beispiel ist eine Rundreise Zürich–Luzern–Interlaken–Zermatt–Genf in einer Woche. Hier ist der Pass oft günstiger als Einzeltickets und vor allem bequemer.",
          "Besonders stark ist der Pass für Familien mit Kindern unter 16 Jahren, weil die Kinder mit der Swiss Family Card kostenlos mitfahren. Für eine vierköpfige Familie, die viel mit der Bahn unterwegs ist, ist das ein echter Vorteil.",
        ]},
        { h: "Wann er sich nicht rechnet", p: [
          "Der Pass ist oft zu teuer, wenn Sie vor allem an einem Ort bleiben – etwa eine Woche Skiferien in Davos oder ein Badeurlaub am See. Dann fahren Sie nur zweimal lange Strecken: zur Anreise und zur Abreise. Für den Rest genügen lokale Tickets, ein regionaler Pass oder das Halbtax-Abonnement für Gäste, mit dem Sie einen Monat lang zum halben Preis fahren.",
          "Auch für Gruppen von Erwachsenen sieht die Rechnung anders aus: Der Pass kostet pro Person, ein Transfer pro Fahrzeug. Vier Erwachsene zahlen viermal den Pass, aber nur einmal die V-Klasse.",
        ]},
        { h: "Die smarte Kombination: Transfer plus Flex-Pass", p: [
          "Für viele Reisende ist die beste Lösung keine Entweder-oder-Frage. Die anstrengendsten Tage einer Schweizreise sind fast immer der Ankunfts- und der Abreisetag: lange Flüge, viel Gepäck, müde Kinder, Umsteigen mit Koffern. Genau an diesen Tagen spielt ein Privattransfer seine Stärken aus.",
          "Eine typische Kombination sieht so aus: Ankunft in Zürich, Transfer direkt ins Hotel in Grindelwald, Luzern oder Zermatt-Täsch. Dann ein Flex-Pass für die Tage, an denen Sie wirklich Ausflüge machen, und am Ende wieder ein Transfer zum Flughafen. Weil der Flex-Pass nur an den Reisetagen zählt, verschwenden Sie keinen Passtag für die Fahrt mit dem Gepäck. Den Transferpreis für Ihre Strecke zeigt der [Buchungsrechner](/buchung) in Sekunden.",
        ]},
        { h: "Rechenlogik für Ihre Reise", p: [
          "So vergleichen Sie in fünf Minuten:",
        ], table: { head: ["Reisetyp", "Meist sinnvoll"], rows: [
          ["Alleinreisend, leichtes Gepäck, viele Orte", "Swiss Travel Pass"],
          ["Paar, Rundreise mit vielen Bahnstrecken", "Pass, Transfer für Ankunft mit viel Gepäck"],
          ["Familie mit Kindern unter 16, viel unterwegs", "Pass mit Family Card, Transfer für Ankunft und Abreise"],
          ["Familie oder Gruppe, ein fester Ferienort", "Transfer hin und zurück, vor Ort lokale Tickets"],
          ["Skiferien mit Ausrüstung", "Transfer hin und zurück"],
          ["Geschäftsreise mit Terminen an mehreren Orten", "Transfer oder Stundenbuchung"],
        ]}},
        { h: "Gepäck: der unterschätzte Faktor", p: [
          "In Schweizer Zügen dürfen Sie Gepäck kostenlos mitnehmen, müssen es aber selbst ein- und ausladen, über Treppen tragen und in den Gepäckablagen unterbringen. Mit zwei Personen und vier grossen Koffern ist jeder Umstieg ein Kraftakt, und auf beliebten Strecken wie Zürich–Luzern oder Interlaken–Grindelwald sind die Ablagen schnell voll.",
          "Die Bahn bietet zwar einen Gepäckservice von Bahnhof zu Bahnhof, der jedoch Vorlauf braucht und nicht zu jeder Uhrzeit verfügbar ist. Beim Transfer fährt das Gepäck einfach mit, inklusive Skisäcken und Kinderwagen. Wie viel in welches Fahrzeug passt, erklärt [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
        ]},
        { h: "Häufige Fragen zum Swiss Travel Pass", p: []},
        { h3: "Gilt der Swiss Travel Pass ab dem Flughafen Zürich?", p: [
          "Ja, der Zug ab Flughafen Zürich ist enthalten. Beim Flex-Pass zählt der Ankunftstag dann als Reisetag.",
        ]},
        { h3: "Ist das Jungfraujoch im Pass enthalten?", p: [
          "Nicht vollständig. Der Pass deckt die Fahrt bis in die Bergdörfer ab, für den letzten Abschnitt gibt es eine Ermässigung.",
        ]},
        { h3: "Gibt es einen Swiss Travel Pass für einen oder zwei Tage?", p: [
          "Nein, der kürzeste Pass gilt drei Tage. Für einzelne Fahrten sind Sparbillette oder Tageskarten oft günstiger.",
        ]},
        { h3: "Lohnt sich der Pass für eine Woche Skiferien?", p: [
          "Meist nicht, weil Sie vor allem an einem Ort bleiben. Ein Transfer hin und zurück mit Skigepäck plus lokaler Skipass ist in der Regel einfacher und oft günstiger.",
        ]},
        { h3: "Kann ich Pass und Transfer kombinieren?", p: [
          "Ja, und das ist für viele Reisende die beste Lösung: Transfer für Ankunft und Abreise, Flex-Pass für die Ausflugstage.",
          "Jetzt [Transfer für Ankunft oder Abreise buchen](/buchung) – Festpreis pro Fahrzeug, Gepäck inklusive.",
        ]},
      ],
    },
    en: {
      title: "Is the Swiss Travel Pass Worth It? An Honest Comparison With Single Tickets and a Private Transfer",
      seo: "Is the Swiss Travel Pass Worth It?",
      excerpt: "What the Swiss Travel Pass costs and includes, when it pays off and when it does not – and why for many travellers the smartest solution is a combination: a transfer for arrival and departure with luggage, the pass for excursion days. With a simple calculation logic for couples, families and groups.",
      body: [
        { p: [
          "The Swiss Travel Pass is the best-known ticket for visitors to Switzerland: one pass for trains, buses, boats and many mountain railways, without buying a ticket at every station. \"Is it worth it?\" is one of the most frequently asked questions before a Swiss trip – and the honest answer is: often yes, but not always, and rarely for everything.",
          "As a transfer company we could simply say the car is always better. That is not true. This guide explains when the pass is the best choice, when single tickets are cheaper and when a private transfer saves time, nerves and sometimes money.",
        ]},
        { h: "What is the Swiss Travel Pass?", p: [
          "The pass is aimed at guests living outside Switzerland and Liechtenstein and comes in two versions: for 3, 4, 6, 8 or 15 consecutive days, or as a Flex Pass for the same number of freely chosen travel days within one month. It is available in first and second class; young people under 25 get a discount.",
          "Prices change every year. As a guide, MySwitzerland lists the second-class Flex Pass (as of October 2026) at CHF 289 for 3 travel days, CHF 459 for 8 and CHF 519 for 15 travel days within a month, per adult. The consecutive-days version is a little cheaper. Current prices are on the official Swiss Travel System and SBB websites.",
        ]},
        { h: "What the pass includes – and what it does not", p: [
          "Included are:",
        ], ul: [
          "**Unlimited travel** on Swiss public transport trains, buses and boats, including the train from Zurich Airport.",
          "**Public transport in cities**, i.e. trams and buses in Zurich, Lucerne, Bern and many other places.",
          "**Selected mountain railways free of charge**, such as the Rigi, and **discounts on most other mountain railways**, up to 50 % depending on the line.",
          "**The Swiss Museum Pass** with free entry to around 500 museums.",
          "**The Swiss Family Card:** children under 16 travel free when accompanied by a parent with a pass.",
        ]},
        { p: [
          "Not included are seat reservations for panoramic trains such as the Glacier Express and Bernina Express, the full journey to the Jungfraujoch and many high-alpine railways (discounted only), and of course anything outside public transport by rail, road or water. And the pass does not solve the luggage problem. With two large suitcases per person, ski bags or a pushchair, every change of train remains hard work.",
        ]},
        { h: "When the pass pays off", p: [
          "The Swiss Travel Pass pays off above all if you travel a lot: several long rail journeys in a short time, plus boats, city transport and one or two mountain excursions. The classic example is a round trip Zurich–Lucerne–Interlaken–Zermatt–Geneva in one week. Here the pass is often cheaper than single tickets and above all more convenient.",
          "The pass is particularly strong for families with children under 16, because the children travel free with the Swiss Family Card. For a family of four that travels a lot by train, that is a real advantage.",
        ]},
        { h: "When it does not", p: [
          "The pass is often too expensive if you mainly stay in one place – for example a week's skiing in Davos or a lakeside holiday. Then you only make two long journeys: arrival and departure. For the rest, local tickets, a regional pass or the Swiss Half Fare Card for visitors, which gives half-price travel for a month, are enough.",
          "For groups of adults the maths also looks different: the pass costs per person, a transfer per vehicle. Four adults pay for four passes, but only once for the V-Class.",
        ]},
        { h: "The smart combination: transfer plus Flex Pass", p: [
          "For many travellers the best solution is not an either-or question. The most tiring days of a Swiss trip are almost always the arrival and departure days: long flights, lots of luggage, tired children, changing trains with suitcases. These are exactly the days when a private transfer shows its strengths.",
          "A typical combination looks like this: arrive in Zurich, take a transfer straight to your hotel in Grindelwald, Lucerne or Zermatt-Täsch. Then use a Flex Pass for the days you actually go on excursions, and at the end take a transfer back to the airport. Because the Flex Pass only counts on travel days, you do not waste a pass day on the journey with luggage. The [booking calculator](/buchung) shows the transfer price for your route in seconds.",
        ]},
        { h: "Calculation logic for your trip", p: [
          "How to compare in five minutes:",
        ], table: { head: ["Type of trip", "Usually makes sense"], rows: [
          ["Solo traveller, light luggage, many places", "Swiss Travel Pass"],
          ["Couple, round trip with many rail journeys", "Pass, transfer for arrival with lots of luggage"],
          ["Family with children under 16, travelling a lot", "Pass with Family Card, transfer for arrival and departure"],
          ["Family or group, one fixed holiday resort", "Transfer there and back, local tickets on site"],
          ["Ski holiday with equipment", "Transfer there and back"],
          ["Business trip with meetings in several places", "Transfer or hourly booking"],
        ]}},
        { h: "Luggage: the underestimated factor", p: [
          "On Swiss trains you can take luggage free of charge, but you have to load and unload it yourself, carry it up stairs and fit it into the luggage racks. With two people and four large suitcases, every change is a struggle, and on popular routes such as Zurich–Lucerne or Interlaken–Grindelwald the racks fill up quickly.",
          "The railways do offer a station-to-station luggage service, but it needs advance notice and is not available at every hour. With a transfer the luggage simply comes along, including ski bags and pushchairs. How much fits in which vehicle is explained in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
        ]},
        { h: "Frequently asked questions about the Swiss Travel Pass", p: []},
        { h3: "Is the Swiss Travel Pass valid from Zurich Airport?", p: [
          "Yes, the train from Zurich Airport is included. With the Flex Pass your arrival day then counts as a travel day.",
        ]},
        { h3: "Is the Jungfraujoch included in the pass?", p: [
          "Not fully. The pass covers the journey to the mountain villages; for the final section there is a discount.",
        ]},
        { h3: "Is there a Swiss Travel Pass for one or two days?", p: [
          "No, the shortest pass is valid for three days. For individual journeys, saver tickets or day passes are often cheaper.",
        ]},
        { h3: "Is the pass worth it for a week's skiing?", p: [
          "Usually not, because you mainly stay in one place. A transfer there and back with ski luggage plus a local ski pass is usually simpler and often cheaper.",
        ]},
        { h3: "Can I combine the pass and a transfer?", p: [
          "Yes, and for many travellers that is the best solution: a transfer for arrival and departure, a Flex Pass for excursion days.",
          "[Book a transfer for arrival or departure now](/buchung) – fixed price per vehicle, luggage included.",
        ]},
      ],
    },
  },
  {
    slug: "wie-frueh-am-flughafen-zuerich-sein-check-in",
    date: "2026-10-07",
    img: "/hero/hero-1.jpg",
    de: {
      title: "Wie früh am Flughafen Zürich sein? Check-in, Sicherheitskontrolle und die richtige Abholzeit",
      seo: "Wie früh am Flughafen Zürich sein?",
      excerpt: "Zwei Stunden, drei Stunden oder noch mehr? Was der Flughafen Zürich empfiehlt, wann Sie früher da sein sollten, warum zu früh ebenfalls nicht hilft, wie Check-in und Sicherheitskontrolle ablaufen – und wie Sie daraus die richtige Abholzeit für Ihren Transfer berechnen, mit drei Rechenbeispielen.",
      body: [
        { p: [
          "«Wie früh muss ich am Flughafen sein?» ist die Frage, die vor jedem Abflug kommt. Die Antwort entscheidet, ob Sie entspannt einen Kaffee trinken oder mit dem Koffer durch die Halle rennen. Zu spät ist riskant, aber auch viel zu früh ist keine gute Idee, wie der Flughafen Zürich selbst betont.",
          "Dieser Guide fasst zusammen, was der Flughafen empfiehlt, welche Faktoren die Zeit verlängern oder verkürzen und wie Sie daraus Schritt für Schritt die richtige Abholzeit für Ihren Transfer ableiten.",
        ]},
        { h: "Die kurze Antwort", p: [
          "Der Flughafen Zürich empfiehlt, zwei bis drei Stunden vor dem Abflug am Flughafen zu sein. Als Faustregel gelten rund zwei Stunden für Flüge innerhalb Europas und rund drei Stunden für Langstreckenflüge. Massgebend sind immer die Vorgaben Ihrer Airline, insbesondere die Schliesszeit des Check-ins und der Gepäckabgabe.",
          "Viel früher anzureisen bringt dagegen wenig: Die Schalter der meisten Airlines öffnen erst zwei bis drei Stunden vor dem Abflug, und der Flughafen hat in der Vergangenheit ausdrücklich darauf hingewiesen, dass sehr früh anreisende Passagiere die Hallen in Spitzenzeiten zusätzlich füllen.",
        ], table: { head: ["Situation", "Empfohlene Ankunft vor Abflug"], rows: [
          ["Europa, nur Handgepäck, online eingecheckt", "ca. 1½–2 Std."],
          ["Europa mit aufgegebenem Gepäck", "ca. 2 Std."],
          ["Langstrecke", "ca. 3 Std."],
          ["Ferienbeginn, Sommerwochenenden, Feiertage", "zusätzlich ca. 30 Min."],
          ["Assistenz, Haustier, alleinreisende Kinder", "nach Vorgabe der Airline, meist früher"],
        ]}},
        { h: "Was die Zeit am Flughafen bestimmt", p: [
          "Die zwei bis drei Stunden verteilen sich auf mehrere Stationen. Wer weiss, welche davon bei ihm anfallen, kann besser planen:",
        ], ul: [
          "**Check-in und Gepäckabgabe:** Wer online eincheckt und nur Handgepäck hat, überspringt diesen Schritt. Mit Koffer geht es an den Schalter oder die Self-Bag-Drop-Station.",
          "**Sicherheitskontrolle:** Sie liegt zentral zwischen den Check-in-Bereichen. Die Wartezeit ist meist kurz, kann in Spitzenzeiten aber deutlich steigen.",
          "**Passkontrolle:** Bei Flügen ausserhalb des Schengenraums, etwa nach London, Dubai oder New York, kommt die Ausreisekontrolle dazu.",
          "**Weg zum Gate:** Die Gates im Dock E erreichen Sie mit der unterirdischen Skymetro; planen Sie dafür einige Minuten zusätzlich ein.",
        ]},
        { h: "So sparen Sie Zeit", p: [
          "Checken Sie online ein, sobald Ihre Airline es erlaubt, und laden Sie die Bordkarte aufs Telefon. Einige Airlines bieten am Flughafen Zürich einen Vorabend-Check-in an, bei dem Sie das Gepäck bereits am Vortag abgeben; dann genügen laut Flughafen rund zwei Stunden auch bei grösseren Spitzen.",
          "Auf der Website des Flughafens Zürich finden Sie unter der Flugnummer eine Empfehlung, wann Sie für genau diesen Flug am Flughafen sein sollten, sowie die aktuellen Wartezeiten an der Sicherheitskontrolle. Packen Sie Laptop, Tablet, Powerbank und Flüssigkeiten so, dass Sie sie schnell herausnehmen können, und legen Sie Gürtel und Münzen vor der Kontrolle ins Handgepäck.",
        ]},
        { h: "Wann Sie früher da sein sollten", p: [
          "In einigen Situationen lohnt sich ein zusätzlicher Puffer. Am Beginn der Schulferien, an Sommerwochenenden und rund um Feiertage ist der Flughafen deutlich voller; der Morgen zwischen etwa 06:00 und 08:00 Uhr gehört ohnehin zu den Spitzenzeiten. Wer eine Mobilitätsassistenz braucht, meldet diese mindestens 48 Stunden vorher bei der Airline an und richtet sich nach deren Vorgaben. Gleiches gilt für Reisen mit Haustier oder alleinreisenden Kindern.",
          "Auch Sondergepäck wie Golf- oder Skitaschen kostet am Sperrgutschalter etwas mehr Zeit. Und wer zum ersten Mal ab Zürich fliegt, plant am besten zehn Minuten für die Orientierung ein.",
        ]},
        { h: "Von der Empfehlung zur Abholzeit", p: [
          "Für die Fahrt zum Flughafen gilt eine einfache Rechnung: Abflugzeit minus Zeit am Flughafen minus Fahrzeit minus Puffer. Die Fahrzeit für feste Strecken finden Sie auf unseren [Streckenseiten](/strecken). Der Puffer hängt von Tageszeit und Jahreszeit ab: Zu Stosszeiten rund um Zürich planen Sie 20 bis 30 Minuten zusätzlich, auf Bergstrecken im Winter 45 bis 60 Minuten.",
          "Ein Detail, das gern übersehen wird: Abholungen zwischen 00:00 und 06:00 Uhr fallen unter unseren Nachttarif von 20 %. Bei sehr frühen Abflügen ist das unvermeidlich, der Preis wird bei der Buchung aber sofort korrekt angezeigt, ohne Überraschung. Ausführliche Beispiele aus Basel, Luzern, Bern und den Bergen finden Sie in [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Drei Rechenbeispiele", p: [
          "So sieht die Rechnung in der Praxis aus:",
        ], table: { head: ["Beispiel", "Rechnung", "Abholung"], rows: [
          ["Europaflug 07:00 ab Zürich Stadt", "07:00 − 2 Std. − ca. 25 Min. Fahrt − 10 Min. Puffer", "ca. 04:25 (Nachttarif)"],
          ["Langstrecke 13:00 ab Luzern", "10:00 am Flughafen − ca. 76 Min. Fahrt − 20 Min. Morgenspitze", "ca. 08:25"],
          ["Europaflug 16:00 ab Davos, Wechselsamstag im Winter", "14:00 am Flughafen − ca. 194 Min. Fahrt − 45–60 Min. Puffer", "ca. 09:45–10:00"],
        ]}},
        { h: "Für die Ankunft: wie lange dauert es nach der Landung?", p: [
          "Auch die umgekehrte Richtung lässt sich planen. Bei Flügen aus dem Schengenraum sind Sie oft 20 bis 30 Minuten nach der Landung in der Ankunftshalle, bei Langstreckenflügen mit Passkontrolle und Gepäck kann es länger dauern. Deshalb beginnen unsere 60 Minuten Wartezeit erst mit der tatsächlichen Landung, und der Fahrer verfolgt Ihren Flug.",
          "Wo Sie ihn treffen, erklärt [Ankunft 1 oder Ankunft 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich). Und die häufigsten Stolperfallen beim ersten Besuch fasst [7 Fehler, die Sie am Flughafen Zürich vermeiden sollten](/blog/7-fehler-flughafen-zuerich-vermeiden) zusammen.",
        ]},
        { h: "Häufige Fragen", p: []},
        { h3: "Reichen zwei Stunden für einen Europaflug ab Zürich?", p: [
          "In der Regel ja. In Spitzenzeiten, zu Ferienbeginn oder mit Sondergepäck planen Sie besser 30 Minuten mehr ein.",
        ]},
        { h3: "Wie früh öffnet der Check-in am Flughafen Zürich?", p: [
          "Das hängt von der Airline ab; die meisten Schalter öffnen zwei bis drei Stunden vor dem Abflug. Online-Check-in und Vorabend-Check-in sind oft deutlich früher möglich.",
        ]},
        { h3: "Ist es schlimm, zu früh da zu sein?", p: [
          "Schlimm nicht, aber selten hilfreich: Vor der Schalteröffnung können Sie das Gepäck nicht abgeben, und in Spitzenzeiten werden die Hallen dadurch voller.",
        ]},
        { h3: "Wann holt mich der Fahrer für den Rückflug ab?", p: [
          "Das berechnen wir mit Ihnen anhand von Abflugzeit, Ziel und Adresse. Schicken Sie uns einfach die Flugnummer, wir schlagen Ihnen eine Zeit vor.",
        ]},
        { h3: "Kostet eine Abholung vor 6 Uhr mehr?", p: [
          "Ja, zwischen 00:00 und 06:00 Uhr gilt ein Nachttarif von 20 %. Er wird bei der Buchung sofort im Preis angezeigt.",
          "Jetzt [Fahrt zum Flughafen buchen](/buchung) – Festpreis pro Fahrzeug, pünktliche Abholung.",
        ]},
      ],
    },
    en: {
      title: "How Early Should You Be at Zurich Airport? Check-in, Security and the Right Pickup Time",
      seo: "How Early to Arrive at Zurich Airport",
      excerpt: "Two hours, three hours or even more? What Zurich Airport recommends, when you should arrive earlier, why too early does not help either, how check-in and security work – and how to turn all that into the right pickup time for your transfer, with three worked examples.",
      body: [
        { p: [
          "\"How early do I need to be at the airport?\" is the question before every departure. The answer decides whether you have a relaxed coffee or run through the hall with your suitcase. Too late is risky, but far too early is not a good idea either, as Zurich Airport itself points out.",
          "This guide summarises what the airport recommends, which factors lengthen or shorten the time and how to derive the right pickup time for your transfer step by step.",
        ]},
        { h: "The short answer", p: [
          "Zurich Airport recommends being at the airport two to three hours before departure. As a rule of thumb, allow around two hours for flights within Europe and around three hours for long-haul flights. Your airline's requirements always take precedence, especially the closing time for check-in and bag drop.",
          "Arriving much earlier, on the other hand, achieves little: most airlines' counters only open two to three hours before departure, and the airport has explicitly pointed out in the past that passengers arriving very early make the halls even busier at peak times.",
        ], table: { head: ["Situation", "Recommended arrival before departure"], rows: [
          ["Europe, hand luggage only, checked in online", "approx. 1½–2 h"],
          ["Europe with checked luggage", "approx. 2 h"],
          ["Long-haul", "approx. 3 h"],
          ["Start of school holidays, summer weekends, public holidays", "add approx. 30 min"],
          ["Assistance, pets, unaccompanied minors", "as required by the airline, usually earlier"],
        ]}},
        { h: "What determines your time at the airport", p: [
          "The two to three hours are spread over several stations. If you know which apply to you, you can plan better:",
        ], ul: [
          "**Check-in and bag drop:** if you check in online and only have hand luggage, you skip this step. With a suitcase you go to the counter or the self bag-drop station.",
          "**Security check:** it is located centrally between the check-in areas. Waiting times are usually short but can rise significantly at peak times.",
          "**Passport control:** for flights outside the Schengen area, for example to London, Dubai or New York, exit control is added.",
          "**Walk to the gate:** gates in Dock E are reached by the underground Skymetro; allow a few extra minutes for that.",
        ]},
        { h: "How to save time", p: [
          "Check in online as soon as your airline allows and load the boarding pass onto your phone. Some airlines offer an evening-before check-in at Zurich Airport, where you drop your luggage the day before; according to the airport, around two hours is then enough even at busier times.",
          "On the Zurich Airport website you will find, under your flight number, a recommendation of when to be at the airport for that specific flight, as well as current waiting times at security. Pack your laptop, tablet, power bank and liquids so you can take them out quickly, and put belts and coins into your hand luggage before the check.",
        ]},
        { h: "When you should arrive earlier", p: [
          "In some situations an extra buffer pays off. At the start of school holidays, on summer weekends and around public holidays the airport is considerably busier; the morning between roughly 6 and 8 am is a peak time anyway. If you need mobility assistance, register it with your airline at least 48 hours in advance and follow its instructions. The same applies to travelling with pets or unaccompanied children.",
          "Special luggage such as golf or ski bags also takes a little more time at the oversize counter. And if you are flying from Zurich for the first time, allow ten minutes to find your way around.",
        ]},
        { h: "From recommendation to pickup time", p: [
          "For the drive to the airport a simple calculation applies: departure time minus time at the airport minus driving time minus buffer. You will find driving times for fixed routes on our [route pages](/strecken). The buffer depends on the time of day and season: at rush hour around Zurich allow an extra 20 to 30 minutes, on mountain routes in winter 45 to 60 minutes.",
          "One detail that is easily overlooked: pickups between midnight and 6 am fall under our night tariff of 20 %. For very early departures this is unavoidable, but the price is shown correctly as soon as you book, with no surprises. Detailed examples from Basel, Lucerne, Bern and the mountains are in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Three worked examples", p: [
          "This is how the calculation looks in practice:",
        ], table: { head: ["Example", "Calculation", "Pickup"], rows: [
          ["European flight 07:00 from Zurich city", "07:00 − 2 h − approx. 25 min drive − 10 min buffer", "approx. 04:25 (night tariff)"],
          ["Long-haul 13:00 from Lucerne", "10:00 at the airport − approx. 76 min drive − 20 min morning peak", "approx. 08:25"],
          ["European flight 16:00 from Davos, winter changeover Saturday", "14:00 at the airport − approx. 194 min drive − 45–60 min buffer", "approx. 09:45–10:00"],
        ]}},
        { h: "For arrivals: how long does it take after landing?", p: [
          "The opposite direction can be planned too. On flights from the Schengen area you are often in the arrivals hall 20 to 30 minutes after landing; on long-haul flights with passport control and luggage it can take longer. That is why our 60 minutes of waiting time only start with the actual landing, and the driver tracks your flight.",
          "Where you meet him is explained in [Arrival 1 or Arrival 2?](/blog/ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich). And the most common pitfalls on a first visit are summarised in [7 mistakes to avoid at Zurich Airport](/blog/7-fehler-flughafen-zuerich-vermeiden).",
        ]},
        { h: "Frequently asked questions", p: []},
        { h3: "Are two hours enough for a European flight from Zurich?", p: [
          "Usually yes. At peak times, at the start of holidays or with special luggage, better allow 30 minutes more.",
        ]},
        { h3: "How early does check-in open at Zurich Airport?", p: [
          "That depends on the airline; most counters open two to three hours before departure. Online check-in and evening-before check-in are often possible much earlier.",
        ]},
        { h3: "Is it a problem to be too early?", p: [
          "Not a problem, but rarely helpful: before the counters open you cannot drop your luggage, and at peak times the halls get even busier.",
        ]},
        { h3: "When will the driver pick me up for my return flight?", p: [
          "We work that out with you based on departure time, destination and address. Simply send us your flight number and we will suggest a time.",
        ]},
        { h3: "Does a pickup before 6 am cost more?", p: [
          "Yes, between midnight and 6 am a night tariff of 20 % applies. It is shown in the price immediately when booking.",
          "[Book your ride to the airport now](/buchung) – fixed price per vehicle, punctual pickup.",
        ]},
      ],
    },
  },
  {
    slug: "parkieren-flughafen-zuerich-preise-alternative",
    date: "2026-10-07",
    img: "/hero/hero-2.jpg",
    de: {
      title: "Parkieren am Flughafen Zürich: Parkhäuser, Preise und wann der Transfer günstiger ist",
      seo: "Parkieren Flughafen Zürich: Preise & Tipps",
      excerpt: "P1, P2, P3, P6 oder Aussenparkplatz? Was Parkieren am Flughafen Zürich kostet, wie Online-Buchung den Preis verändert, welche Kosten oft vergessen werden – und eine ehrliche Rechnung, ab wann zwei Transferfahrten günstiger und entspannter sind als eine Woche Parkhaus.",
      body: [
        { p: [
          "Mit dem eigenen Auto zum Flughafen zu fahren, fühlt sich nach Freiheit an: losfahren, wann man will, Koffer in den Kofferraum, fertig. Die Rechnung kommt am Ende der Reise, an der Ausfahrtsschranke. Und die fällt am Flughafen Zürich je nach Parkhaus, Buchungszeitpunkt und Reisedauer sehr unterschiedlich aus.",
          "Dieser Guide erklärt die Parkmöglichkeiten am Flughafen Zürich, zeigt aktuelle Preisbeispiele, nennt die Kosten, die bei der Planung gern vergessen werden, und hilft bei der Entscheidung, ob Parkieren oder ein Transfer für Ihre Reise die bessere Wahl ist.",
        ]},
        { h: "Die Parkmöglichkeiten im Überblick", p: [
          "Der Flughafen Zürich betreibt mehrere Parkhäuser und Parkplätze, die sich vor allem in einem Punkt unterscheiden: wie weit Sie mit dem Gepäck laufen müssen.",
        ], ul: [
          "**P1, P2 und P3** liegen direkt am Flughafengebäude und sind mit den Check-in-Bereichen verbunden. Kürzester Weg, höchster Preis. Im P3 gibt es zusätzlich breitere XXL-Parkplätze für grosse Fahrzeuge.",
          "**P6** liegt rund fünf Gehminuten vom Terminal entfernt und ist ab einer Parkdauer von etwa zwei Stunden günstiger als P1 bis P3.",
          "**Aussenparkplätze für Langzeitparkierer** am Rand des Flughafengeländes sind die günstigste Variante des Flughafens, aber nur mit Online-Vorausbuchung nutzbar; der Weg zum Terminal dauert entsprechend länger.",
          "**Private Anbieter und Valet-Services** in der Umgebung nehmen das Auto am Terminal entgegen oder bringen Sie per Shuttle zum Flughafen.",
        ]},
        { h: "Was kostet Parkieren am Flughafen Zürich?", p: [
          "Die Preise ändern sich laufend und sind bei Online-Buchung nachfrageabhängig. Als Orientierung (Stand Herbst 2026): Wer ohne Reservierung in eines der Terminal-Parkhäuser P1 bis P3 fährt, zahlt pro Tag rund CHF 54 bis 56 als Tagesmaximum. Für eine Woche summiert sich das vor Ort auf gut CHF 240.",
          "Online im Voraus gebucht wird es je nach Parkplatz deutlich günstiger oder auch teurer – je nach Datum und Nachfrage. Ein Preisvergleich von travelnews.ch für eine Woche ab dem 10. Oktober 2026 ergab rund CHF 132 für den Aussenparkplatz P65 und rund CHF 276 für einen gedeckten Platz im P1 direkt am Terminal; Valet- und Privatanbieter lagen dazwischen.",
          "Die verbindlichen Tarife finden Sie immer auf der offiziellen Website des Flughafens Zürich. Faustregel: Je früher Sie buchen und je weiter weg Sie parkieren, desto günstiger.",
        ], table: { head: ["Parkoption", "Lage", "Für wen geeignet"], rows: [
          ["P1 / P2 / P3", "direkt am Terminal", "Kurze Reisen, viel Gepäck, eingeschränkte Mobilität"],
          ["P6", "ca. 5 Min. zu Fuss", "Mehrtägige Reisen mit wenig Gepäck"],
          ["Aussenparkplätze (online)", "Rand des Flughafengeländes", "Lange Reisen, Preis vor Komfort"],
          ["Valet / private Anbieter", "Übergabe am Terminal oder Shuttle", "Wer das Auto nicht selbst parkieren will"],
        ]}},
        { h: "Die Kosten, die gern vergessen werden", p: [
          "Der Parkpreis ist nur ein Teil der Rechnung. Wer ehrlich vergleichen will, zählt auch diese Punkte mit:",
        ], ul: [
          "**Treibstoff oder Strom** für Hin- und Rückfahrt sowie die Abnutzung des Fahrzeugs.",
          "**Die Autobahnvignette**, falls Sie mit einem Fahrzeug ohne Schweizer Vignette unterwegs sind – mehr dazu in [Autobahnvignette Schweiz 2027](/blog/autobahnvignette-schweiz-2027-preis-e-vignette).",
          "**Zeit für die Parkplatzsuche** und den Weg vom Aussenparkplatz zum Terminal, gerade zu Ferienbeginn, wenn die Parkhäuser voll sind.",
          "**Die Rückkehr:** Nach einem Langstreckenflug selbst eine Stunde oder länger zu fahren, ist anstrengend und nachts nicht ungefährlich. Im Winter kommt manchmal ein eingeschneites Auto dazu.",
          "**Bring- und Abholdienste von Angehörigen** sind nicht gratis: Wer Sie bringt, fährt zweimal hin und zurück.",
        ]},
        { h: "Die Rechnung: Parkhaus oder zwei Transferfahrten?", p: [
          "Beim Transfer zahlen Sie zwei Festpreise – einen für die Hinfahrt, einen für die Rückfahrt – pro Fahrzeug, unabhängig davon, wie lange Sie verreist sind. Beim Parkieren steigt der Preis mit jedem Tag. Daraus ergibt sich eine einfache Logik: Je länger die Reise und je näher Sie am Flughafen wohnen, desto eher lohnt sich der Transfer.",
          "So vergleichen Sie in zwei Minuten: Rechnen Sie den Parkpreis für Ihre Reisedauer aus und addieren Sie Treibstoff und gegebenenfalls Vignette. Dann geben Sie Ihre Adresse in unseren [Buchungsrechner](/buchung) ein – er zeigt den Festpreis für Hin- und Rückfahrt sofort an, ohne dass Sie etwas bestätigen müssen. Für Zürich und die Agglomeration, für Winterthur, Zug oder Baden ist das Ergebnis bei Reisen ab einer Woche oft überraschend.",
        ]},
        { h: "Wann Parkieren die bessere Wahl ist", p: [
          "Fairerweise gibt es Situationen, in denen das eigene Auto am Flughafen sinnvoll ist: bei sehr kurzen Reisen von ein oder zwei Tagen, wenn Sie allein reisen und weit vom Flughafen entfernt wohnen, oder wenn Sie nach der Landung direkt mit dem eigenen Fahrzeug weiterfahren wollen, etwa zu einem Termin in einer anderen Region. Auch wer einen Firmenparkplatz oder eine Parkkarte nutzen kann, fährt oft selbst.",
        ]},
        { h: "Wann der Transfer klar gewinnt", p: [
          "Der Transfer ist in diesen Fällen fast immer günstiger oder zumindest deutlich entspannter:",
        ], ul: [
          "**Reisen ab einer Woche**, weil der Parkpreis mit jedem Tag weiter steigt, der Transferpreis aber nicht.",
          "**Familien und Gruppen**, weil der Festpreis pro Fahrzeug gilt und bis zu sieben Personen in die V-Klasse passen.",
          "**Frühe Abflüge und späte Landungen**, wenn Sie nicht übermüdet selbst fahren wollen.",
          "**Winter**, wenn Schnee und Glätte die Rückfahrt zur Belastung machen.",
          "**Geschäftsreisen**, bei denen die Fahrzeit für Telefonate und E-Mails genutzt werden kann und die Rechnung mit ausgewiesener Mehrwertsteuer kommt.",
        ]},
        { h: "Tipps, falls Sie doch parkieren", p: [
          "Buchen Sie online und möglichst früh, besonders vor Schulferien und an langen Wochenenden. Prüfen Sie die Einfahrtshöhe: In mehreren Parkhäusern liegt sie bei etwa zwei Metern, was für Dachboxen und grosse Vans knapp wird. Notieren oder fotografieren Sie Ihren Stellplatz, und planen Sie für Aussenparkplätze zusätzliche Zeit für den Weg zum Terminal ein.",
          "Wer Angehörige nur absetzt, nutzt die kurzen Haltezonen vor dem Terminal; längeres Warten ist dort nicht vorgesehen. Für das Abholen lohnt sich ein Blick auf die tatsächliche Landezeit, bevor man losfährt.",
        ]},
        { h: "Häufige Fragen zum Parkieren am Flughafen Zürich", p: []},
        { h3: "Welches Parkhaus liegt am nächsten am Terminal?", p: [
          "P1, P2 und P3 sind direkt mit dem Flughafengebäude verbunden. Welches für Sie am praktischsten ist, hängt vom Check-in-Bereich Ihrer Airline ab.",
        ]},
        { h3: "Ist Online-Buchung immer günstiger?", p: [
          "Meistens, aber nicht immer: Die Online-Preise sind nachfrageabhängig und können in Spitzenzeiten über dem Vor-Ort-Tarif liegen. Vergleichen Sie deshalb beide.",
        ]},
        { h3: "Ab wann lohnt sich ein Transfer statt Parkieren?", p: [
          "Für Reisende aus dem Raum Zürich oft schon ab einer Woche, für Familien und Gruppen noch früher. Den genauen Vergleich liefert der Buchungsrechner mit Ihrer Adresse.",
        ]},
        { h3: "Holt mich der Fahrer auch bei Verspätung ab?", p: [
          "Ja. Wir verfolgen Ihren Flug, und die 60 Minuten Wartezeit beginnen erst mit der tatsächlichen Landung. Mehr in [Flug verspätet oder annulliert](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h3: "Kann ich Hin- und Rückfahrt zusammen buchen?", p: [
          "Ja. Buchen Sie beide Fahrten nacheinander; für die Abholung zum Abflug schlagen wir Ihnen eine passende Zeit vor, siehe [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
          "Jetzt [Preis für Ihre Adresse berechnen](/buchung) – in wenigen Sekunden, unverbindlich.",
        ]},
      ],
    },
    en: {
      title: "Parking at Zurich Airport: Car Parks, Prices and When a Transfer Is Cheaper",
      seo: "Zurich Airport Parking: Prices & Tips",
      excerpt: "P1, P2, P3, P6 or an outdoor car park? What parking at Zurich Airport costs, how booking online changes the price, which costs are often forgotten – and an honest calculation of when two transfer rides are cheaper and more relaxed than a week in a car park.",
      body: [
        { p: [
          "Driving your own car to the airport feels like freedom: leave when you like, suitcases in the boot, done. The bill comes at the end of the trip, at the exit barrier. And at Zurich Airport it varies a great deal depending on the car park, when you booked and how long you were away.",
          "This guide explains the parking options at Zurich Airport, shows current price examples, names the costs that are easily forgotten when planning, and helps you decide whether parking or a transfer is the better choice for your trip.",
        ]},
        { h: "The parking options at a glance", p: [
          "Zurich Airport operates several car parks and parking areas that differ mainly in one respect: how far you have to walk with your luggage.",
        ], ul: [
          "**P1, P2 and P3** are right next to the airport building and connected to the check-in areas. Shortest walk, highest price. P3 also has wider XXL spaces for large vehicles.",
          "**P6** is about a five-minute walk from the terminal and becomes cheaper than P1 to P3 from a stay of around two hours.",
          "**Outdoor long-stay car parks** on the edge of the airport site are the airport's cheapest option, but can only be used with an online advance booking; the way to the terminal takes correspondingly longer.",
          "**Private operators and valet services** in the area take the car at the terminal or bring you to the airport by shuttle.",
        ]},
        { h: "What does parking at Zurich Airport cost?", p: [
          "Prices change constantly and depend on demand when booked online. As a guide (autumn 2026): drive into one of the terminal car parks P1 to P3 without a reservation and the daily maximum is around CHF 54 to 56. Over a week that adds up to a little over CHF 240 on site.",
          "Booked online in advance it can be considerably cheaper – or more expensive – depending on the car park, date and demand. A price comparison by travelnews.ch for one week from 10 October 2026 found around CHF 132 for the outdoor car park P65 and around CHF 276 for a covered space in P1 right at the terminal; valet and private operators were in between.",
          "You will always find the binding tariffs on the official Zurich Airport website. Rule of thumb: the earlier you book and the further away you park, the cheaper it gets.",
        ], table: { head: ["Parking option", "Location", "Suitable for"], rows: [
          ["P1 / P2 / P3", "right at the terminal", "Short trips, lots of luggage, reduced mobility"],
          ["P6", "approx. 5 min walk", "Trips of several days with little luggage"],
          ["Outdoor car parks (online)", "edge of the airport site", "Long trips, price before comfort"],
          ["Valet / private operators", "handover at terminal or shuttle", "Anyone who does not want to park themselves"],
        ]}},
        { h: "The costs that are easily forgotten", p: [
          "The parking fee is only part of the bill. If you want an honest comparison, count these too:",
        ], ul: [
          "**Fuel or electricity** for the outward and return trip, plus wear on the vehicle.",
          "**The motorway vignette**, if you are driving a vehicle without a Swiss vignette – more in [Swiss motorway vignette 2027](/blog/autobahnvignette-schweiz-2027-preis-e-vignette).",
          "**Time spent looking for a space** and walking from the outdoor car park to the terminal, especially at the start of school holidays when car parks are full.",
          "**The return:** driving yourself for an hour or more after a long-haul flight is tiring and not without risk at night. In winter there is sometimes a snowed-in car as well.",
          "**Lifts from relatives** are not free either: whoever drops you off drives there and back twice.",
        ]},
        { h: "The calculation: car park or two transfer rides?", p: [
          "With a transfer you pay two fixed prices – one for the outward journey, one for the return – per vehicle, no matter how long you are away. With parking, the price rises every day. That gives a simple logic: the longer the trip and the closer you live to the airport, the more likely the transfer pays off.",
          "Here is how to compare in two minutes: work out the parking fee for your trip length and add fuel and, if needed, the vignette. Then enter your address in our [booking calculator](/buchung) – it shows the fixed price for the outward and return journey immediately, without you having to confirm anything. For Zurich and its suburbs, for Winterthur, Zug or Baden, the result for trips of a week or more is often surprising.",
        ]},
        { h: "When parking is the better choice", p: [
          "To be fair, there are situations in which your own car at the airport makes sense: very short trips of one or two days, travelling alone from far away, or wanting to drive on in your own vehicle straight after landing, for example to an appointment in another region. People who can use a company space or a parking card also often drive themselves.",
        ]},
        { h: "When the transfer clearly wins", p: [
          "In these cases the transfer is almost always cheaper or at least considerably more relaxed:",
        ], ul: [
          "**Trips of a week or more**, because the parking fee keeps rising every day while the transfer price does not.",
          "**Families and groups**, because the fixed price is per vehicle and up to seven people fit in the V-Class.",
          "**Early departures and late arrivals**, when you do not want to drive yourself while exhausted.",
          "**Winter**, when snow and ice make the drive home a burden.",
          "**Business trips**, where the driving time can be used for calls and emails and the invoice comes with VAT shown.",
        ]},
        { h: "Tips if you do park", p: [
          "Book online and as early as possible, especially before school holidays and long weekends. Check the height limit: in several car parks it is around two metres, which is tight for roof boxes and large vans. Note or photograph your space, and for outdoor car parks allow extra time to get to the terminal.",
          "If you are only dropping someone off, use the short-stay zones in front of the terminal; longer waiting is not intended there. When collecting someone, check the actual landing time before you set off.",
        ]},
        { h: "Frequently asked questions about parking at Zurich Airport", p: []},
        { h3: "Which car park is closest to the terminal?", p: [
          "P1, P2 and P3 are directly connected to the airport building. Which is most practical for you depends on your airline's check-in area.",
        ]},
        { h3: "Is booking online always cheaper?", p: [
          "Usually, but not always: online prices depend on demand and can exceed the on-site tariff at peak times. So compare both.",
        ]},
        { h3: "When is a transfer worth it instead of parking?", p: [
          "For travellers from the Zurich area often from one week, for families and groups even sooner. The booking calculator gives you the exact comparison for your address.",
        ]},
        { h3: "Will the driver collect me if my flight is delayed?", p: [
          "Yes. We track your flight, and the 60 minutes of waiting time only start with the actual landing. More in [Flight delayed or cancelled](/blog/flug-verspaetet-oder-annulliert-was-passiert-mit-dem-transfer).",
        ]},
        { h3: "Can I book the outward and return journeys together?", p: [
          "Yes. Book both rides one after the other; for the pickup to your departure we will suggest a suitable time, see [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
          "[Calculate the price for your address now](/buchung) – in seconds, without obligation.",
        ]},
      ],
    },
  },
  {
    slug: "skigebiete-ab-flughafen-zuerich-fahrzeit-transfer",
    date: "2026-10-07",
    img: "/gallery/9.jpg",
    de: {
      title: "Die besten Skigebiete ab Flughafen Zürich: Fahrzeiten, Schneesicherheit und der entspannte Transfer",
      seo: "Skigebiete ab Zürich: Fahrzeit & Transfer",
      excerpt: "Von Engelberg in knapp zwei Stunden bis Zermatt und Verbier: welche Skigebiete Sie ab Flughafen Zürich wie schnell erreichen, welche für Familien, Geniesser oder Schneesicherheit taugen, welche Orte autofrei sind – und wie der Transfer mit Skigepäck an Wechselsamstagen reibungslos klappt.",
      body: [
        { p: [
          "Die Schweiz hat Hunderte Skigebiete, und vom Flughafen Zürich aus liegen erstaunlich viele davon in Reichweite eines halben Tages. Wer morgens landet, kann am Nachmittag im Chalet in Davos, Grindelwald oder Engelberg sitzen – vorausgesetzt, die Anreise mit Koffern, Skisäcken und Kindern ist gut geplant.",
          "Dieser Guide stellt die wichtigsten Skigebiete ab Zürich vor, sortiert nach Fahrzeit, ordnet sie nach Reisetyp ein und erklärt, worauf Sie bei der Anreise im Winter achten sollten.",
        ]},
        { h: "Skigebiete nach Fahrzeit ab Flughafen Zürich", p: [
          "Die Zeiten mit fester Strecke sind unsere Planungswerte inklusive Puffer; bei den übrigen Zielen nennen wir Richtwerte. An Wechselsamstagen und bei Schneefall kann es länger dauern.",
        ], table: { head: ["Skigebiet", "Region", "Fahrzeit ab ZRH"], rows: [
          ["[Engelberg-Titlis](/zurich-airport-to-engelberg)", "Zentralschweiz", "etwa 113 Min. (geplant)"],
          ["Flumserberg", "Ostschweiz", "ca. 1¼–1½ Std."],
          ["Hoch-Ybrig / Stoos", "Zentralschweiz", "ca. 1¼–1½ Std."],
          ["[Andermatt-Sedrun](/flughafentransfer-andermatt)", "Gotthard", "ca. 2 Std."],
          ["[Laax-Flims](/flughafentransfer-laax) / [Lenzerheide](/flughafentransfer-lenzerheide)", "Graubünden", "ca. 2–2½ Std."],
          ["[Wengen-Mürren](/zurich-airport-to-wengen)", "Berner Oberland", "etwa 160 Min. bis Lauterbrunnen (geplant)"],
          ["[Grindelwald](/zurich-airport-to-grindelwald)", "Berner Oberland", "etwa 170 Min. (geplant)"],
          ["[Davos](/zurich-airport-to-davos) / [Klosters](/flughafentransfer-klosters)", "Graubünden", "etwa 194 Min. bis Davos (geplant)"],
          ["[St. Moritz](/zurich-airport-to-st-moritz)", "Engadin", "etwa 255 Min. (geplant)"],
          ["[Zermatt](/zurich-airport-to-zermatt)", "Wallis", "etwa 284 Min. bis Täsch (geplant)"],
          ["[Saas-Fee](/flughafentransfer-saas-fee)", "Wallis", "ca. 4½–5 Std."],
          ["[Verbier](/zurich-airport-to-verbier)", "Wallis", "etwa 324 Min. (geplant)"],
        ]}},
        { h: "Nah und schnell: Skifahren am Ankunftstag", p: [
          "**Engelberg-Titlis** ist das grosse Skigebiet, das Zürich am nächsten liegt. Der Titlis-Gletscher sorgt für eine lange Saison, oft schon ab dem Herbst, und für Schnee bis ins Frühjahr. Engelberg ist zugleich ein Ort für Freerider und für Familien, mit Hotels, die direkt mit dem Auto erreichbar sind.",
          "**Flumserberg** über dem Walensee und **Hoch-Ybrig** im Kanton Schwyz sind klassische Ziele der Zürcher für Tagesausflüge: familienfreundlich, mit schöner Aussicht und kurzer Anfahrt. Etwas tiefer gelegen sind sie früh und spät in der Saison weniger schneesicher. **Stoos** ist autofrei und über die steilste Standseilbahn der Welt ab Schwyz erreichbar – der Fahrer bringt Sie bis zur Talstation.",
        ]},
        { h: "Graubünden: die grossen Namen", p: [
          "**Davos und Klosters** bilden zusammen eines der grössten Skigebiete der Schweiz, mit Pisten für alle Niveaus und einer Stadt, die auch abseits der Piste viel bietet. Im Januar ist Davos wegen des WEF eine Ausnahme; was dann gilt, erklärt unser [WEF-Transfer-Guide](/blog/wef-davos-transfer-guide).",
          "**Laax-Flims** ist das Zentrum für Snowboarder und Freestyler, **Lenzerheide** zusammen mit Arosa ein riesiges, familienfreundliches Gebiet. **St. Moritz** im Engadin steht für Glamour, sonnige Tage und trockenen Pulverschnee; die Anreise über den Julierpass beschreibt [St. Moritz und das Engadin](/blog/st-moritz-engadin-winter-transfer-flughafen-zuerich) im Detail.",
        ]},
        { h: "Berner Oberland: Eiger, Mönch und Jungfrau", p: [
          "**Grindelwald** ist mit dem Auto erreichbar und bietet mit dem Eiger Express einen schnellen Zugang zum Skigebiet Kleine Scheidegg–Männlichen. **Wengen** und **Mürren** sind dagegen autofrei: Der Transfer endet in Lauterbrunnen beziehungsweise Stechelberg, von dort geht es mit Zahnradbahn oder Seilbahn weiter. Das Gepäck bringt der Fahrer bis auf den Bahnsteig.",
          "Welches Dorf zu wem passt, beschreibt [Jungfrau-Region für Einsteiger](/blog/jungfrau-region-guide-interlaken-grindelwald). Weitere Ziele im Oberland sind Adelboden und Gstaad, die wir ebenfalls direkt anfahren.",
        ]},
        { h: "Wallis: Schneesicherheit und Gletscher", p: [
          "**Zermatt** bietet unter dem Matterhorn eines der höchsten Skigebiete der Alpen, mit Gletscherskifahren fast das ganze Jahr. Der Ort ist autofrei; der Transfer endet in Täsch, von wo der Shuttlezug in wenigen Minuten nach Zermatt fährt – alles dazu in [Zermatt-Transfer über Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
          "**Saas-Fee** ist ebenfalls autofrei, hoch gelegen und sehr schneesicher; der Fahrer setzt Sie am Dorfeingang ab. **Verbier** in den Walliser Alpen ist das Ziel für anspruchsvolle Skifahrer und Freerider und mit dem Auto direkt erreichbar. Je nach Verkehrslage fahren wir ins Wallis über die Lötschberg-Autoverladung oder ganz auf der Strasse.",
        ]},
        { h: "Welches Skigebiet passt zu Ihnen?", p: [
          "Eine schnelle Orientierung nach Reisetyp:",
        ], ul: [
          "**Kurzer Aufenthalt oder Skifahren am Ankunftstag:** Engelberg, Flumserberg, Hoch-Ybrig, Stoos.",
          "**Familien mit Kindern:** Lenzerheide, Laax-Flims, Grindelwald, Engelberg – breite Pisten, Skischulen, kurze Wege.",
          "**Maximale Schneesicherheit:** Zermatt, Saas-Fee, Engelberg mit dem Titlis-Gletscher, Davos.",
          "**Luxus und Après-Ski:** St. Moritz, Gstaad, Verbier, Zermatt.",
          "**Freeride und Freestyle:** Verbier, Engelberg, Laax, Andermatt.",
        ]},
        { h: "Wechselsamstag: wann es eng wird", p: [
          "In vielen Ferienorten wechseln die Gäste am Samstag. Dann sind die Zufahrten zu den Bergen voll, besonders die A3 entlang des Walensees Richtung Graubünden und die Strecken ins Berner Oberland. Landen Sie an einem Samstag zur Mittagszeit, rechnen Sie mit Verzögerungen.",
          "Ihr Fahrer kennt die Ausweichrouten und verfolgt den Flug, Sie müssen sich um nichts kümmern. Für die Rückreise am Samstag gilt: lieber früher abholen lassen und am Flughafen einen Kaffee trinken, als im Stau auf die Uhr zu schauen. Die genaue Berechnung zeigt [Wann losfahren zum Flughafen Zürich?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Skigepäck, Fahrzeug und Kinder", p: [
          "Skisäcke befördern wir kostenlos, bis zu vier pro Fahrzeug. In der E-Klasse passen zwei Personen mit Ski durch die Durchladeöffnung, für Familien oder Gruppen mit kompletter Ausrüstung ist die V-Klasse die richtige Wahl. Wie wir Gepäck zählen, erklärt [Wie viele Koffer passen wirklich?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "Kindersitze sind kostenlos; geben Sie bei der Buchung Anzahl und Alter der Kinder an. Tragen Sie im letzten Schritt den Namen des Chalets oder Hotels ein – gerade in Bergdörfern mit verwinkelten Strassen spart das Zeit. Mehr zur Wintersaison allgemein steht in [Ski-Transfers ab Zürich](/blog/wintersaison-ski-transfers-schweiz).",
        ]},
        { h: "Häufige Fragen zu Skitransfers ab Zürich", p: []},
        { h3: "Welches grosse Skigebiet liegt am nächsten am Flughafen Zürich?", p: [
          "Engelberg-Titlis. Wir planen mit knapp zwei Stunden; Flumserberg und Hoch-Ybrig sind etwas näher, aber kleiner und tiefer gelegen.",
        ]},
        { h3: "Wann beginnt die Skisaison?", p: [
          "In den meisten Gebieten Anfang bis Mitte Dezember, bis in den April. Gletschergebiete wie Zermatt, Saas-Fee und der Titlis öffnen früher und schliessen später.",
        ]},
        { h3: "Kostet Skigepäck extra?", p: [
          "Nein. Bis zu vier Skisäcke pro Fahrzeug sind im Festpreis enthalten.",
        ]},
        { h3: "Fahren Sie bis in autofreie Orte?", p: [
          "Bis zum letzten mit dem Auto erreichbaren Punkt: Täsch für Zermatt, Lauterbrunnen für Wengen, Stechelberg für Mürren, der Dorfeingang von Saas-Fee, die Talstation für Stoos.",
        ]},
        { h3: "Was passiert bei starkem Schneefall?", p: [
          "Wir fahren, solange die Strassen offen sind, und planen mehr Zeit ein. Sind Pässe oder Strassen gesperrt, melden wir uns und besprechen mit Ihnen die Alternative.",
          "Jetzt [Skitransfer buchen](/buchung) – Festpreis pro Fahrzeug, Skigepäck inklusive.",
        ]},
      ],
    },
    en: {
      title: "The Best Ski Resorts From Zurich Airport: Travel Times, Snow Reliability and a Relaxed Transfer",
      seo: "Ski Resorts Near Zurich: Times & Transfers",
      excerpt: "From Engelberg in under two hours to Zermatt and Verbier: which ski resorts you reach how quickly from Zurich Airport, which suit families, connoisseurs or snow reliability, which villages are car-free – and how the transfer with ski luggage works smoothly on changeover Saturdays.",
      body: [
        { p: [
          "Switzerland has hundreds of ski areas, and from Zurich Airport a surprising number of them are within half a day's reach. Land in the morning and you can be sitting in a chalet in Davos, Grindelwald or Engelberg by the afternoon – provided the journey with suitcases, ski bags and children is well planned.",
          "This guide presents the most important ski resorts from Zurich, sorted by travel time, groups them by type of traveller and explains what to watch out for when travelling in winter.",
        ]},
        { h: "Ski resorts by travel time from Zurich Airport", p: [
          "Times for fixed routes are our planning values including a buffer; for the other destinations we give guide values. On changeover Saturdays and in snowfall it can take longer.",
        ], table: { head: ["Ski resort", "Region", "Travel time from ZRH"], rows: [
          ["[Engelberg-Titlis](/zurich-airport-to-engelberg)", "Central Switzerland", "about 113 min (planned)"],
          ["Flumserberg", "Eastern Switzerland", "approx. 1¼–1½ h"],
          ["Hoch-Ybrig / Stoos", "Central Switzerland", "approx. 1¼–1½ h"],
          ["[Andermatt-Sedrun](/flughafentransfer-andermatt)", "Gotthard", "approx. 2 h"],
          ["[Laax-Flims](/flughafentransfer-laax) / [Lenzerheide](/flughafentransfer-lenzerheide)", "Graubünden", "approx. 2–2½ h"],
          ["[Wengen-Mürren](/zurich-airport-to-wengen)", "Bernese Oberland", "about 160 min to Lauterbrunnen (planned)"],
          ["[Grindelwald](/zurich-airport-to-grindelwald)", "Bernese Oberland", "about 170 min (planned)"],
          ["[Davos](/zurich-airport-to-davos) / [Klosters](/flughafentransfer-klosters)", "Graubünden", "about 194 min to Davos (planned)"],
          ["[St. Moritz](/zurich-airport-to-st-moritz)", "Engadin", "about 255 min (planned)"],
          ["[Zermatt](/zurich-airport-to-zermatt)", "Valais", "about 284 min to Täsch (planned)"],
          ["[Saas-Fee](/flughafentransfer-saas-fee)", "Valais", "approx. 4½–5 h"],
          ["[Verbier](/zurich-airport-to-verbier)", "Valais", "about 324 min (planned)"],
        ]}},
        { h: "Close and quick: skiing on arrival day", p: [
          "**Engelberg-Titlis** is the large ski area closest to Zurich. The Titlis glacier ensures a long season, often from autumn, and snow well into spring. Engelberg is a place for freeriders and families alike, with hotels that can be reached directly by car.",
          "**Flumserberg** above Lake Walen and **Hoch-Ybrig** in the canton of Schwyz are classic day-trip destinations for Zurich locals: family-friendly, with lovely views and a short drive. Being lower, they are less snow-sure early and late in the season. **Stoos** is car-free and reached from Schwyz by the world's steepest funicular – the driver takes you to the valley station.",
        ]},
        { h: "Graubünden: the big names", p: [
          "**Davos and Klosters** together form one of Switzerland's largest ski areas, with slopes for every level and a town that offers plenty off the piste too. In January Davos is an exception because of the WEF; what applies then is explained in our [WEF transfer guide](/blog/wef-davos-transfer-guide).",
          "**Laax-Flims** is the centre for snowboarders and freestylers, **Lenzerheide** together with Arosa a huge, family-friendly area. **St. Moritz** in the Engadin stands for glamour, sunny days and dry powder snow; the journey over the Julier Pass is described in detail in [St. Moritz and the Engadin](/blog/st-moritz-engadin-winter-transfer-flughafen-zuerich).",
        ]},
        { h: "Bernese Oberland: Eiger, Mönch and Jungfrau", p: [
          "**Grindelwald** can be reached by car and, with the Eiger Express, offers quick access to the Kleine Scheidegg–Männlichen ski area. **Wengen** and **Mürren**, by contrast, are car-free: the transfer ends in Lauterbrunnen or Stechelberg respectively, from where you continue by cogwheel train or cable car. The driver carries your luggage to the platform.",
          "Which village suits whom is described in [Jungfrau region for beginners](/blog/jungfrau-region-guide-interlaken-grindelwald). Further destinations in the Oberland are Adelboden and Gstaad, which we also drive to directly.",
        ]},
        { h: "Valais: snow reliability and glaciers", p: [
          "**Zermatt** offers one of the highest ski areas in the Alps beneath the Matterhorn, with glacier skiing almost all year round. The village is car-free; the transfer ends in Täsch, from where the shuttle train reaches Zermatt in a few minutes – everything about it in [Zermatt transfer via Täsch](/blog/zermatt-transfer-flughafen-zuerich-taesch-autofrei).",
          "**Saas-Fee** is also car-free, high and very snow-sure; the driver drops you at the village entrance. **Verbier** in the Valais Alps is the destination for demanding skiers and freeriders and can be reached directly by car. Depending on traffic, we drive to Valais via the Lötschberg car train or entirely by road.",
        ]},
        { h: "Which ski resort suits you?", p: [
          "A quick orientation by type of traveller:",
        ], ul: [
          "**Short stay or skiing on arrival day:** Engelberg, Flumserberg, Hoch-Ybrig, Stoos.",
          "**Families with children:** Lenzerheide, Laax-Flims, Grindelwald, Engelberg – wide slopes, ski schools, short distances.",
          "**Maximum snow reliability:** Zermatt, Saas-Fee, Engelberg with the Titlis glacier, Davos.",
          "**Luxury and après-ski:** St. Moritz, Gstaad, Verbier, Zermatt.",
          "**Freeride and freestyle:** Verbier, Engelberg, Laax, Andermatt.",
        ]},
        { h: "Changeover Saturday: when it gets tight", p: [
          "In many resorts guests change over on Saturdays. The roads to the mountains are then busy, especially the A3 along Lake Walen towards Graubünden and the routes into the Bernese Oberland. If you land around midday on a Saturday, expect delays.",
          "Your driver knows the alternative routes and tracks your flight; you need not worry about anything. For a Saturday departure: better be picked up earlier and have a coffee at the airport than watch the clock in a traffic jam. The exact calculation is in [When to leave for Zurich Airport?](/blog/wann-losfahren-zum-flughafen-zuerich-abholzeit-berechnen).",
        ]},
        { h: "Ski luggage, vehicle and children", p: [
          "We carry ski bags free of charge, up to four per vehicle. In the E-Class two people with skis fit thanks to the ski hatch; for families or groups with full equipment the V-Class is the right choice. How we count luggage is explained in [How many suitcases really fit?](/blog/wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse).",
          "Child seats are free; state the number and ages of the children when booking. In the last step, enter the name of the chalet or hotel – in mountain villages with winding lanes this saves time. More on the winter season in general is in [Ski transfers from Zurich](/blog/wintersaison-ski-transfers-schweiz).",
        ]},
        { h: "Frequently asked questions about ski transfers from Zurich", p: []},
        { h3: "Which large ski resort is closest to Zurich Airport?", p: [
          "Engelberg-Titlis. We plan just under two hours; Flumserberg and Hoch-Ybrig are a little closer but smaller and lower.",
        ]},
        { h3: "When does the ski season start?", p: [
          "In most areas in early to mid-December, running into April. Glacier areas such as Zermatt, Saas-Fee and the Titlis open earlier and close later.",
        ]},
        { h3: "Does ski luggage cost extra?", p: [
          "No. Up to four ski bags per vehicle are included in the fixed price.",
        ]},
        { h3: "Do you drive to car-free resorts?", p: [
          "To the last point reachable by car: Täsch for Zermatt, Lauterbrunnen for Wengen, Stechelberg for Mürren, the village entrance of Saas-Fee, the valley station for Stoos.",
        ]},
        { h3: "What happens in heavy snowfall?", p: [
          "We drive as long as the roads are open and allow more time. If passes or roads are closed, we get in touch and discuss the alternative with you.",
          "[Book your ski transfer now](/buchung) – fixed price per vehicle, ski luggage included.",
        ]},
      ],
    },
  },
  {
    slug: "autobahnvignette-schweiz-2027-preis-e-vignette",
    date: "2026-10-07",
    img: "/gallery/3.jpg",
    de: {
      title: "Autobahnvignette Schweiz 2027: Preis, E-Vignette, Gültigkeit – und wann Sie gar keine brauchen",
      seo: "Autobahnvignette 2027: Preis & E-Vignette",
      excerpt: "Was die Schweizer Autobahnvignette 2027 kostet, ab wann sie gilt, wie die E-Vignette funktioniert, wo Sie sie offiziell kaufen, was bei Mietwagen aus dem Ausland gilt und welche Busse droht. Dazu: Mietwagen oder Transfer – eine ehrliche Rechnung für Reisende ab Flughafen Zürich.",
      body: [
        { p: [
          "Wer in der Schweiz Autobahnen oder Autostrassen benutzt, braucht eine gültige Vignette. Für Einheimische ist das Routine, für Besucher mit Mietwagen oder dem eigenen Auto aus dem Ausland eine der häufigsten Fragen vor der Reise – und ein Grund für unnötige Bussen.",
          "Dieser Guide erklärt alles zur Vignette 2027: Preis, Gültigkeitsdauer, E-Vignette und Klebevignette, die offiziellen Verkaufsstellen, Sonderfälle wie Wechselnummern und Anhänger – und warum Sie die Vignette bei einem Transfer gar nicht brauchen.",
        ]},
        { h: "Die Vignette 2027 auf einen Blick", p: [
          "Die wichtigsten Eckdaten (Stand Oktober 2026, Angaben des Bundesamts für Zoll und Grenzsicherheit BAZG):",
        ], table: { head: ["Frage", "Antwort"], rows: [
          ["Preis", "CHF 40 – für E-Vignette und Klebevignette gleich"],
          ["Gültigkeit", "1. Dezember 2026 bis 31. Januar 2028 (14 Monate)"],
          ["Erhältlich ab", "1. Dezember 2026"],
          ["Vignette 2026 gilt noch", "bis 31. Januar 2027"],
          ["Für wen", "Motorfahrzeuge und Anhänger bis 3,5 Tonnen auf Autobahnen und Autostrassen"],
          ["Busse ohne Vignette", "CHF 200, zusätzlich muss eine Vignette gekauft werden"],
        ]}},
        { h: "Was kostet die Vignette 2027?", p: [
          "Die Schweizer Autobahnvignette kostet seit vielen Jahren unverändert CHF 40. Eine Kurzzeitvignette für einige Tage oder Wochen, wie es sie in Österreich gibt, existiert in der Schweiz nicht: Auch wer nur einen Tag über die Autobahn fährt, kauft die Jahresvignette.",
          "Beim Kauf der E-Vignette mit einer ausländischen Kreditkarte kann der effektive Betrag wegen Wechselkurs und Kartengebühren leicht abweichen. Vorsicht bei inoffiziellen Websites: Einige Anbieter verkaufen die Vignette mit erheblichem Aufschlag. Offiziell erhalten Sie die E-Vignette über das Online-Portal des BAZG.",
        ]},
        { h: "Ab wann und wie lange gilt sie?", p: [
          "Jede Vignette gilt 14 Monate: vom 1. Dezember des Vorjahres bis zum 31. Januar des Folgejahres. Die Vignette 2027 gilt also vom 1. Dezember 2026 bis zum 31. Januar 2028. Weil sich die Zeiträume überlappen, dürfen Sie mit der Vignette 2026 noch bis Ende Januar 2027 fahren; ab dem 1. Februar 2027 brauchen Sie die neue.",
        ]},
        { h: "E-Vignette oder Klebevignette?", p: [
          "Beide kosten gleich viel und gelten gleich lange. Die Unterschiede liegen im Alltag:",
        ], ul: [
          "**E-Vignette:** online gekauft, an das Kontrollschild gebunden, sofort gültig. Ideal für Wechselnummern, weil die Vignette für das Schild gilt, nicht für das Fahrzeug. Wechseln Sie das Auto, behalten aber das Schild, bleibt sie gültig.",
          "**Klebevignette:** an Zoll, Poststellen, Tankstellen und Raststätten erhältlich, muss direkt an der Windschutzscheibe kleben. Sie gilt nur für das Fahrzeug, an dem sie klebt – bei einem Scheibenbruch oder Fahrzeugwechsel brauchen Sie eine neue.",
          "**Für ausländische Fahrzeuge** ist die E-Vignette meist die einfachere Wahl, weil Sie sie vor der Reise kaufen und sich den Halt an der Grenze sparen.",
        ]},
        { h: "Wer braucht eine Vignette – und wer nicht?", p: [
          "Vignettenpflichtig sind alle Motorfahrzeuge und Anhänger bis 3,5 Tonnen, die auf Autobahnen oder Autostrassen fahren – also Autos, Motorräder, Wohnmobile bis 3,5 Tonnen und auch Anhänger, die eine eigene Vignette brauchen. Schwerere Fahrzeuge zahlen eine andere Abgabe.",
          "Keine Vignette brauchen Sie, wenn Sie ausschliesslich auf Haupt- und Nebenstrassen unterwegs sind. Das ist in der Praxis selten realistisch: Die meisten Verbindungen ab Flughafen Zürich, ob nach Luzern, Basel, Bern oder in die Berge, führen über die Autobahn.",
        ]},
        { h: "Mietwagen: Wer kümmert sich um die Vignette?", p: [
          "Mietwagen mit Schweizer Kennzeichen, die Sie am Flughafen Zürich übernehmen, haben die Vignette in der Regel bereits. Anders ist es bei Fahrzeugen, die in Deutschland, Frankreich oder Italien gemietet werden, etwa auf der französischen Seite des EuroAirport Basel-Mulhouse oder in Konstanz. Diese haben oft keine Schweizer Vignette; fragen Sie bei der Übernahme nach und kaufen Sie sie im Zweifel vor der ersten Autobahnauffahrt.",
          "Fahren Sie weiter nach Österreich, beachten Sie: Ab dem 1. Februar 2027 akzeptiert Österreich nur noch die digitale Vignette, das Pickerl zum Kleben gibt es dort nicht mehr. Deutschland verlangt für Autos keine Autobahngebühr. Was sonst beim Grenzübertritt gilt, steht in [Vom Flughafen Zürich nach Deutschland oder Österreich](/blog/transfer-flughafen-zuerich-deutschland-oesterreich-grenze).",
        ]},
        { h: "Kontrollen und Bussen", p: [
          "Wer ohne gültige Vignette auf der Autobahn erwischt wird, zahlt eine Busse von CHF 200 und muss zusätzlich sofort eine Vignette kaufen. Kontrolliert wird von Polizei und Zoll, auch an Grenzübergängen. Eine Klebevignette, die nicht direkt auf die Scheibe geklebt, sondern etwa mit Folie befestigt wird, gilt als ungültig.",
        ]},
        { h: "Mietwagen oder Transfer? Die ehrliche Rechnung", p: [
          "Die Vignette selbst ist selten das Problem – CHF 40 sind überschaubar. Teurer wird ein Mietwagen durch das, was dazukommt: Tagesmiete, Versicherung, Treibstoff, Parkgebühren in Hotelgaragen der Städte und Bergorte, im Winter Ketten oder Aufpreise für Winterausrüstung. Hinzu kommt, dass wichtige Ferienorte wie Zermatt, Wengen, Mürren und Saas-Fee autofrei sind; das Auto steht dort eine Woche lang auf einem bezahlten Parkplatz.",
          "Ein Transfer ab Flughafen Zürich bringt Sie dagegen zum Festpreis pro Fahrzeug direkt vor die Hoteltür, ohne Vignette, Parkplatzsuche oder Fahren nach einem Langstreckenflug. Für Reisende, die vor Ort vor allem Bahn, Bergbahnen und Schiffe nutzen, ist das fast immer die günstigere und entspanntere Lösung. Den Preis für Ihre Strecke zeigt der [Buchungsrechner](/buchung) in Sekunden; Ziele in den Bergen finden Sie in [Die besten Skigebiete ab Flughafen Zürich](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "Der Mietwagen lohnt sich dagegen, wenn Sie eine Rundreise mit vielen abgelegenen Zielen planen oder täglich an einen anderen Ort fahren wollen. Eine Kombination ist oft ideal: Transfer vom Flughafen ins erste Hotel, dort ausruhen, und den Mietwagen erst für die Tage übernehmen, an denen Sie ihn wirklich brauchen.",
        ]},
        { h: "Häufige Fragen zur Autobahnvignette 2027", p: []},
        { h3: "Was kostet die Vignette 2027?", p: [
          "CHF 40, als E-Vignette wie als Klebevignette. Kurzzeitvignetten gibt es in der Schweiz nicht.",
        ]},
        { h3: "Ab wann brauche ich die Vignette 2027?", p: [
          "Spätestens ab dem 1. Februar 2027. Erhältlich und gültig ist sie ab dem 1. Dezember 2026.",
        ]},
        { h3: "Wo kaufe ich die E-Vignette offiziell?", p: [
          "Über das Online-Portal des Bundesamts für Zoll und Grenzsicherheit (BAZG). Meiden Sie Drittanbieter mit Aufschlag.",
        ]},
        { h3: "Hat mein Mietwagen eine Vignette?", p: [
          "In der Schweiz gemietete Fahrzeuge in der Regel ja. Bei Fahrzeugen aus dem Ausland fragen Sie bei der Übernahme nach.",
        ]},
        { h3: "Brauche ich bei einem Transfer eine Vignette?", p: [
          "Nein. Unsere Fahrzeuge sind Schweizer Fahrzeuge mit allen nötigen Abgaben; Sie steigen ein und lehnen sich zurück.",
          "Jetzt [Transfer ab Flughafen Zürich buchen](/buchung) – ohne Vignette, ohne Parkplatzsuche.",
        ]},
      ],
    },
    en: {
      title: "Swiss Motorway Vignette 2027: Price, E-Vignette, Validity – and When You Do Not Need One",
      seo: "Swiss Vignette 2027: Price & E-Vignette",
      excerpt: "What the Swiss motorway vignette 2027 costs, when it is valid, how the e-vignette works, where to buy it officially, what applies to hire cars from abroad and which fine applies. Plus: hire car or transfer – an honest calculation for travellers from Zurich Airport.",
      body: [
        { p: [
          "Anyone using motorways or expressways in Switzerland needs a valid vignette. For locals it is routine; for visitors with a hire car or their own car from abroad it is one of the most common questions before the trip – and a reason for unnecessary fines.",
          "This guide explains everything about the 2027 vignette: price, validity, e-vignette and sticker, the official sales points, special cases such as interchangeable number plates and trailers – and why you do not need a vignette at all with a transfer.",
        ]},
        { h: "The 2027 vignette at a glance", p: [
          "The key facts (as of October 2026, according to the Federal Office for Customs and Border Security, FOCBS):",
        ], table: { head: ["Question", "Answer"], rows: [
          ["Price", "CHF 40 – the same for e-vignette and sticker"],
          ["Validity", "1 December 2026 to 31 January 2028 (14 months)"],
          ["Available from", "1 December 2026"],
          ["2026 vignette still valid", "until 31 January 2027"],
          ["Who needs it", "Motor vehicles and trailers up to 3.5 tonnes on motorways and expressways"],
          ["Fine without vignette", "CHF 200, plus you must buy a vignette"],
        ]}},
        { h: "What does the 2027 vignette cost?", p: [
          "The Swiss motorway vignette has cost an unchanged CHF 40 for many years. A short-term vignette for a few days or weeks, as in Austria, does not exist in Switzerland: even if you only use the motorway for one day, you buy the annual vignette.",
          "When buying the e-vignette with a foreign credit card, the actual amount may differ slightly due to the exchange rate and card fees. Beware of unofficial websites: some sellers add a considerable mark-up. Officially, you get the e-vignette through the FOCBS online portal.",
        ]},
        { h: "When is it valid and for how long?", p: [
          "Each vignette is valid for 14 months: from 1 December of the previous year to 31 January of the following year. The 2027 vignette is therefore valid from 1 December 2026 to 31 January 2028. Because the periods overlap, you may still drive with the 2026 vignette until the end of January 2027; from 1 February 2027 you need the new one.",
        ]},
        { h: "E-vignette or sticker?", p: [
          "Both cost the same and are valid for the same period. The differences show in everyday use:",
        ], ul: [
          "**E-vignette:** bought online, linked to the number plate, valid immediately. Ideal for interchangeable plates, because the vignette applies to the plate, not the vehicle. If you change car but keep the plate, it remains valid.",
          "**Sticker:** available at customs, post offices, petrol stations and service areas, must be stuck directly onto the windscreen. It only applies to the vehicle it is stuck to – after a broken windscreen or a change of vehicle you need a new one.",
          "**For foreign vehicles** the e-vignette is usually the simpler choice, because you buy it before the trip and save the stop at the border.",
        ]},
        { h: "Who needs a vignette – and who does not?", p: [
          "All motor vehicles and trailers up to 3.5 tonnes using motorways or expressways need a vignette – cars, motorbikes, motorhomes up to 3.5 tonnes and also trailers, which need their own vignette. Heavier vehicles pay a different charge.",
          "You do not need a vignette if you only use main and minor roads. In practice that is rarely realistic: most connections from Zurich Airport, whether to Lucerne, Basel, Bern or the mountains, use the motorway.",
        ]},
        { h: "Hire cars: who takes care of the vignette?", p: [
          "Hire cars with Swiss plates that you collect at Zurich Airport usually already have the vignette. It is different with vehicles hired in Germany, France or Italy, for example on the French side of EuroAirport Basel-Mulhouse or in Konstanz. These often have no Swiss vignette; ask at pickup and, if in doubt, buy one before the first motorway slip road.",
          "If you drive on to Austria, note: from 1 February 2027 Austria only accepts the digital vignette; the sticker no longer exists there. Germany charges no motorway toll for cars. What else applies at the border is in [From Zurich Airport to Germany or Austria](/blog/transfer-flughafen-zuerich-deutschland-oesterreich-grenze).",
        ]},
        { h: "Checks and fines", p: [
          "Anyone caught on the motorway without a valid vignette pays a fine of CHF 200 and must also buy a vignette on the spot. Checks are carried out by police and customs, including at border crossings. A sticker that is not stuck directly onto the windscreen but attached with film, for example, is considered invalid.",
        ]},
        { h: "Hire car or transfer? The honest calculation", p: [
          "The vignette itself is rarely the issue – CHF 40 is manageable. What makes a hire car expensive is everything else: the daily rate, insurance, fuel, parking fees in hotel garages in cities and mountain resorts, and in winter chains or surcharges for winter equipment. On top of that, key holiday resorts such as Zermatt, Wengen, Mürren and Saas-Fee are car-free; the car sits in a paid car park for a week.",
          "A transfer from Zurich Airport, on the other hand, takes you right to the hotel door at a fixed price per vehicle, without a vignette, searching for parking or driving after a long-haul flight. For travellers who mainly use trains, mountain railways and boats once there, it is almost always the cheaper and more relaxed solution. The [booking calculator](/buchung) shows the price for your route in seconds; mountain destinations are in [The best ski resorts from Zurich Airport](/blog/skigebiete-ab-flughafen-zuerich-fahrzeit-transfer).",
          "A hire car pays off, by contrast, if you are planning a round trip with many remote destinations or want to drive somewhere different every day. A combination is often ideal: transfer from the airport to the first hotel, rest there, and only pick up the hire car for the days you really need it.",
        ]},
        { h: "Frequently asked questions about the 2027 vignette", p: []},
        { h3: "What does the 2027 vignette cost?", p: [
          "CHF 40, both as an e-vignette and as a sticker. There are no short-term vignettes in Switzerland.",
        ]},
        { h3: "From when do I need the 2027 vignette?", p: [
          "From 1 February 2027 at the latest. It is available and valid from 1 December 2026.",
        ]},
        { h3: "Where do I buy the e-vignette officially?", p: [
          "Through the online portal of the Federal Office for Customs and Border Security (FOCBS). Avoid third-party sellers with mark-ups.",
        ]},
        { h3: "Does my hire car have a vignette?", p: [
          "Vehicles hired in Switzerland usually do. For vehicles from abroad, ask at pickup.",
        ]},
        { h3: "Do I need a vignette for a transfer?", p: [
          "No. Our vehicles are Swiss vehicles with all required charges paid; you get in and sit back.",
          "[Book a transfer from Zurich Airport now](/buchung) – no vignette, no searching for parking.",
        ]},
      ],
    },
  },
];
