// ─────────────────────────────────────────────────────────────
//  EK ÇEVİRİLER — Reiseziele / Preise / Events / anasayfa blokları
//  (app/i18n.ts'i büyütmemek için ayrı dosya)
// ─────────────────────────────────────────────────────────────

import type { Lang } from "./i18n";
import { it } from "./langs/it";
import { pt } from "./langs/pt";
import { fr } from "./langs/fr";
import { es } from "./langs/es";
import { tr } from "./langs/tr";
import { sr } from "./langs/sr";
import { hr } from "./langs/hr";
import { ar } from "./langs/ar";
import { ru } from "./langs/ru";

const baseX = {
  de: {
    nav: { destinations: "Reiseziele", prices: "Preise", events: "Events" },
    heroBadges: ["Kostenlose Stornierung", "24/7 Support", "Flugverfolgung", "Festpreis"],
    heroRating: { score: "Ausgezeichnet · 4.8/5", sub: "Beliebt bei Reisenden am Flughafen Zürich" },
    howSec: {
      eyebrow: "Ablauf",
      title: "In drei einfachen Schritten buchen",
      steps: [
        ["Strecke eingeben & Fahrzeug wählen", "Abholort, Ziel und Zeit angeben – dann das passende Fahrzeug auswählen."],
        ["Buchung abschliessen", "Kontaktdaten hinzufügen und die Bestätigung mit allen Details erhalten."],
        ["Chauffeur treffen", "Ihr Fahrer erwartet Sie mit Namensschild – Wartezeit ist inklusive."],
      ] as [string, string][],
      cta: "Preis erhalten",
    },
    faqSec: { eyebrow: "FAQ", title: "Häufig gestellte Fragen", sub: "Alles Wichtige rund um Ihre Buchung auf einen Blick.", all: "Alle Fragen ansehen" },
    hourly: {
      tabTransfer: "Transfer", tabHourly: "Stündlich",
      duration: "Dauer", hoursShort: "Stunden",
      note: "Chauffeur & Fahrzeug zur freien Verfügung – ideal für Termine, Events und Stadttouren.",
      cta: "Preise ansehen",
      bookingLabel: "Stundenmiete", bookingNote: (h: string) => `Stundenbuchung: ${h} Stunden – Chauffeur zur freien Verfügung`,
    },
    stops: { add: "Zwischenstopp hinzufügen", ph: "Zwischenstopp – Adresse", remove: "Entfernen", label: "Zwischenstopps:" },
    busy: { title: "Zu dieser Zeit sind unsere Fahrzeuge belegt", text: "In diesem Zeitfenster ist bereits ein Transfer geplant. Bitte wählen Sie eine andere Uhrzeit oder kontaktieren Sie uns – wir finden gemeinsam eine Lösung.", cta: "Mit dem Kundendienst sprechen", next: "Nächste freie Zeit:" },
    done: { title: "Anfrage übermittelt!", body: (r: string) => `Ihre Transferanfrage ${r} wurde erstellt und in WhatsApp bzw. E-Mail geöffnet. Bitte senden Sie die Nachricht ab – wir bestätigen in der Regel innerhalb von 15 Minuten.`, hint: "Vielen Dank für Ihre Anfrage! Bitte prüfen Sie auch Ihren Posteingang bzw. Spam-Ordner.", payment: "Zahlungsart", home: "Zur Startseite" },
    dest: {
      crumb: "Reiseziele",
      pageTitle: "Transfers in der ganzen Schweiz",
      pageSub: "Vom Flughafen Zürich zu jeder Stadt und jedem Bergdorf. Wählen Sie Ihre Destination oder buchen Sie direkt.",
      popular: "Beliebte Orte",
      searchPh: "Ort suchen …",
      fixed: "ab CHF", onRequest: "Preis auf Anfrage",
      hero: (n: string) => `Flughafentransfer ${n}`,
      heroSub: (n: string) => `Privater Chauffeur- und Flughafentransfer von und nach ${n}. Festpreis pro Fahrzeug, geschulte Fahrer und Flugverfolgung – rund um die Uhr.`,
      chips: ["Festpreis", "Flugverfolgung", "24/7", "Lizenzierte Fahrer"],
      calc: "Preis berechnen",
      f1: ["Feste Preise", "Ihr Preis steht vor der Fahrt fest – ohne Überraschungen."],
      f2: ["Immer pünktlich", "Wir überwachen Ihren Flug und passen die Abholzeit an."],
      f3: ["Sicher & lizenziert", "Geschulte Chauffeure, gepflegte Mercedes-Fahrzeuge."],
      vehiclesFor: (n: string) => `Fahrzeuge für ${n}`,
      routeKnown: (n: string, p: string) => `Festpreis Flughafen Zürich → ${n}: ab CHF ${p} pro Fahrzeug.`,
      routeDetail: "Strecke im Detail ansehen",
      seo: (n: string, r: string) => [
        [`Flughafentaxi ${n} zum Festpreis`,
         `Sie suchen einen zuverlässigen Flughafentransfer ${n}? Bei uns buchen Sie Ihren privaten Transfer vom und zum Flughafen Zürich (ZRH) zum garantierten Festpreis pro Fahrzeug. Kein Taxameter, keine versteckten Zuschläge – der Preis steht schon bei der Buchung fest, unabhängig von Verkehr oder Tageszeit.`],
        [`Ab Flughafen Zürich (ZRH) nach ${n}`,
         `Ihr Chauffeur erwartet Sie mit Namensschild direkt in der Ankunftshalle (Meet & Greet) und hilft mit dem Gepäck. Für die Rückfahrt aus ${r} kalkulieren wir Verkehr und Check-in-Zeiten ein, damit Sie entspannt und rechtzeitig am Flughafen sind.`],
        [`24/7 mit Flugverfolgung`,
         `Wir überwachen Ihren Flug in Echtzeit. Landet Ihre Maschine früher oder später, passt sich die Abholzeit automatisch an – die Wartezeit nach der Landung ist im Festpreis enthalten. Unser Service ist 365 Tage im Jahr für Sie im Einsatz.`],
        [`Für jeden Anlass das passende Fahrzeug`,
         `Ob Geschäftstermin, Familienreise oder Skiferien: Von der Business Class bis zum geräumigen Van mit bis zu 7 Sitzen finden Sie das passende Fahrzeug für Ihren Transfer nach ${n}. Kindersitze und Babyschalen stellen wir kostenlos bereit.`],
      ] as [string, string][],
      faqTitle: (n: string) => `Häufige Fragen zum Transfer ${n}`,
      faq: (n: string) => [
        [`Was kostet ein Flughafentaxi ${n}?`, `Der Preis ist ein Festpreis pro Fahrzeug und hängt von der Distanz ab Flughafen Zürich sowie der Fahrzeugklasse ab. Fragen Sie in Sekunden unverbindlich an – Sie erhalten den fixen Preis vor der Fahrt.`],
        [`Wie buche ich meinen Transfer nach ${n}?`, `Adresse eingeben, Datum und Uhrzeit wählen, Flugnummer hinterlegen – fertig. Die Buchung dauert unter einer Minute, online oder per WhatsApp.`],
        ["Ist die Flugverfolgung inklusive?", "Ja. Wir überwachen jeden Flug und passen die Abholzeit automatisch an. Die Wartezeit nach der Landung ist im Preis enthalten."],
        ["Kann ich kostenlos stornieren?", "Ja, bis 24 Stunden vor der geplanten Abholung stornieren Sie kostenlos."],
      ] as [string, string][],
      more: "Weitere Destinationen",
      all: "Alle Orte",
      ctaTitle: "Bereit, entspannt anzukommen?",
      ctaSub: "Erhalten Sie in Sekunden einen festen, transparenten Preis – ganz ohne Konto.",
      ctaBtn: "Jetzt buchen",
    },
    prices: {
      crumb: "Preise",
      title: "Transparente Festpreise",
      sub: "Jede Fahrt zum festen Preis pro Fahrzeug – inkl. 60 Min. Wartezeit am Flughafen, Meet & Greet und Flugverfolgung. Keine versteckten Kosten.",
      f1: ["Festpreis garantiert", "Der Preis wird bei der Buchung fixiert."],
      f2: ["Flugverfolgung", "Kostenlose Wartezeit bei Verspätung."],
      f3: ["Alles inklusive", "Steuern, Maut & Meet-&-Greet inbegriffen."],
      classesTitle: "Unsere Fahrzeugklassen & Preise",
      from: "ab", perVehicle: "pro Fahrzeug", book: "Buchen",
      tableTitle: "Festpreise nach Strecke",
      tableSub: "Alle Strecken ab Flughafen Zürich (ZRH) – Preis pro Fahrzeug, nicht pro Person.",
      colDest: "Ziel", colKm: "Distanz", colDur: "Dauer",
      destTitle: "Preise nach Zielort",
      destSub: "Über 250 Orte in der Schweiz und den Nachbarregionen. Wählen Sie Ihren Zielort für Details.",
      request: "Anfrage",
    },
    events: {
      crumb: "Events",
      title: "Events in der Schweiz – Ihr privater Transfer",
      sub: "Reservieren Sie Ihren Chauffeur zu den bekanntesten Messen, Festivals und Panoramafahrten der Schweiz.",
      all: "Alle",
      book: "Transfer buchen",
    },
  },
  en: {
    nav: { destinations: "Destinations", prices: "Prices", events: "Events" },
    heroBadges: ["Free cancellation", "24/7 support", "Flight tracking", "Fixed price"],
    heroRating: { score: "Excellent · 4.8/5", sub: "Trusted by travellers at Zurich Airport" },
    howSec: {
      eyebrow: "How it works",
      title: "Book in three simple steps",
      steps: [
        ["Enter route & choose vehicle", "Add pickup, destination and time – then pick the vehicle that suits you."],
        ["Complete your booking", "Add contact details and receive your confirmation with all trip details."],
        ["Meet your chauffeur", "Your driver awaits you with a name sign – waiting time is included."],
      ] as [string, string][],
      cta: "Get a price",
    },
    faqSec: { eyebrow: "FAQ", title: "Frequently asked questions", sub: "Everything you need to know about your booking at a glance.", all: "View all questions" },
    hourly: {
      tabTransfer: "Transfer", tabHourly: "Hourly",
      duration: "Duration", hoursShort: "hours",
      note: "Chauffeur & vehicle at your disposal – ideal for meetings, events and city tours.",
      cta: "See prices",
      bookingLabel: "Hourly hire", bookingNote: (h: string) => `Hourly booking: ${h} hours – chauffeur at your disposal`,
    },
    stops: { add: "Add a stop", ph: "Stop – address", remove: "Remove", label: "Stops:" },
    busy: { title: "Our vehicles are booked at this time", text: "A transfer is already scheduled in this time window. Please choose another time or contact us – we will find a solution together.", cta: "Talk to customer service", next: "Next available time:" },
    done: { title: "Request submitted!", body: (r: string) => `Your transfer request ${r} has been created and opened in WhatsApp or e-mail. Please send the message – we usually confirm within 15 minutes.`, hint: "Thank you for your request! Please also check your inbox or spam folder.", payment: "Payment method", home: "Back to homepage" },
    dest: {
      crumb: "Destinations",
      pageTitle: "Transfers across all of Switzerland",
      pageSub: "From Zurich Airport to every city and mountain village. Pick your destination or book directly.",
      popular: "Popular places",
      searchPh: "Search a place …",
      fixed: "from CHF", onRequest: "Price on request",
      hero: (n: string) => `Airport transfer ${n}`,
      heroSub: (n: string) => `Private chauffeur and airport transfer to and from ${n}. Fixed price per vehicle, trained drivers and flight tracking – around the clock.`,
      chips: ["Fixed price", "Flight tracking", "24/7", "Licensed drivers"],
      calc: "Calculate price",
      f1: ["Fixed prices", "Your price is set before the ride – no surprises."],
      f2: ["Always on time", "We monitor your flight and adjust the pickup time."],
      f3: ["Safe & licensed", "Trained chauffeurs, well-kept Mercedes vehicles."],
      vehiclesFor: (n: string) => `Vehicles for ${n}`,
      routeKnown: (n: string, p: string) => `Fixed price Zurich Airport → ${n}: from CHF ${p} per vehicle.`,
      routeDetail: "View route in detail",
      seo: (n: string, r: string) => [
        [`Airport taxi ${n} at a fixed price`,
         `Looking for a reliable airport transfer to ${n}? Book your private transfer to and from Zurich Airport (ZRH) at a guaranteed fixed price per vehicle. No taximeter, no hidden surcharges – the price is set at booking, regardless of traffic or time of day.`],
        [`From Zurich Airport (ZRH) to ${n}`,
         `Your chauffeur awaits you with a name sign right in the arrivals hall (Meet & Greet) and helps with your luggage. For the return trip from ${r}, we factor in traffic and check-in times so you arrive at the airport relaxed and on time.`],
        [`24/7 with flight tracking`,
         `We monitor your flight in real time. If your plane lands earlier or later, the pickup time adjusts automatically – waiting time after landing is included in the fixed price. Our service operates 365 days a year.`],
        [`The right vehicle for every occasion`,
         `Business trip, family holiday or ski vacation: from Business Class to a spacious van with up to 7 seats, you'll find the right vehicle for your transfer to ${n}. Child seats and baby carriers are provided free of charge.`],
      ] as [string, string][],
      faqTitle: (n: string) => `Frequent questions about transfers to ${n}`,
      faq: (n: string) => [
        [`How much is an airport taxi to ${n}?`, `The price is a fixed price per vehicle and depends on the distance from Zurich Airport and the vehicle class. Request a quote in seconds – you'll receive the fixed price before the ride.`],
        [`How do I book my transfer to ${n}?`, `Enter your address, choose date and time, add your flight number – done. Booking takes under a minute, online or via WhatsApp.`],
        ["Is flight tracking included?", "Yes. We monitor every flight and adjust the pickup time automatically. Waiting time after landing is included in the price."],
        ["Can I cancel free of charge?", "Yes, cancellation is free up to 24 hours before the scheduled pickup."],
      ] as [string, string][],
      more: "More destinations",
      all: "All places",
      ctaTitle: "Ready to arrive relaxed?",
      ctaSub: "Get a fixed, transparent price in seconds – no account needed.",
      ctaBtn: "Book now",
    },
    prices: {
      crumb: "Prices",
      title: "Transparent fixed prices",
      sub: "Every ride at a fixed price per vehicle – incl. 60 min. waiting time at the airport, meet & greet and flight tracking. No hidden costs.",
      f1: ["Fixed price guaranteed", "Your price is locked in at booking."],
      f2: ["Flight tracking", "Free waiting time if your flight is delayed."],
      f3: ["All inclusive", "Taxes, tolls & meet-&-greet included."],
      classesTitle: "Our vehicle classes & prices",
      from: "from", perVehicle: "per vehicle", book: "Book",
      tableTitle: "Fixed prices by route",
      tableSub: "All routes from Zurich Airport (ZRH) – price per vehicle, not per person.",
      colDest: "Destination", colKm: "Distance", colDur: "Duration",
      destTitle: "Prices by destination",
      destSub: "Over 250 places across Switzerland and neighbouring regions. Choose your destination for details.",
      request: "On request",
    },
    events: {
      crumb: "Events",
      title: "Events in Switzerland – your private transfer",
      sub: "Reserve your chauffeur for Switzerland's best-known fairs, festivals and panoramic journeys.",
      all: "All",
      book: "Book transfer",
    },
  },
};

export type DictX = typeof baseX.de;

export const tx: Record<Lang, DictX> = {
  ...baseX,
  it: it.tx, pt: pt.tx, fr: fr.tx, es: es.tx, tr: tr.tx,
  sr: sr.tx, hr: hr.tx, ar: ar.tx, ru: ru.tx,
};
