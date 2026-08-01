// ─────────────────────────────────────────────────────────────
//  YASAL SAYFA İÇERİKLERİ — yer tutucu metinler.
//  Gerçek içerikler geldiğinde SADECE bu dosya güncellenecek.
// ─────────────────────────────────────────────────────────────

export type LegalKey = "datenschutz" | "cookies" | "agb" | "rueckerstattung";

export const legalPages: Record<
  LegalKey,
  { de: { title: string; body: string[] }; en: { title: string; body: string[] } }
> = {
  datenschutz: {
    de: {
      title: "Datenschutzerklärung",
      body: [
        "Der Schutz Ihrer persönlichen Daten ist uns wichtig. AirportTransfers Zürich (Kula-ZATK, Industristrasse 14, 8302 Kloten) erhebt und verarbeitet personenbezogene Daten ausschliesslich zur Abwicklung Ihrer Transferbuchung – etwa Name, Kontaktdaten, Flugnummer und Fahrtdetails.",
        "Ihre Daten werden vertraulich behandelt, nicht an Dritte verkauft und nur so lange gespeichert, wie es für die Auftragsabwicklung und gesetzliche Aufbewahrungspflichten erforderlich ist.",
        "Die vollständige Datenschutzerklärung wird in Kürze an dieser Stelle veröffentlicht. Bei Fragen erreichen Sie uns jederzeit per WhatsApp oder Telefon.",
      ],
    },
    en: {
      title: "Privacy Policy",
      body: [
        "Protecting your personal data matters to us. AirportTransfers Zurich (Kula-ZATK, Industristrasse 14, 8302 Kloten) collects and processes personal data solely to handle your transfer booking – such as your name, contact details, flight number and trip details.",
        "Your data is treated confidentially, never sold to third parties, and stored only as long as required for order processing and statutory retention periods.",
        "The full privacy policy will be published here shortly. If you have any questions, you can reach us anytime via WhatsApp or phone.",
      ],
    },
  },
  cookies: {
    de: {
      title: "Cookie-Richtlinie",
      body: [
        "Diese Website verwendet nur technisch notwendige Cookies – etwa zur Speicherung Ihrer Sprachwahl. Es werden keine Tracking- oder Werbe-Cookies von Drittanbietern gesetzt.",
        "Eingebettete Inhalte wie Google Maps können eigene Cookies verwenden; dafür gilt die Datenschutzerklärung des jeweiligen Anbieters.",
        "Die vollständige Cookie-Richtlinie wird in Kürze an dieser Stelle veröffentlicht.",
      ],
    },
    en: {
      title: "Cookie Policy",
      body: [
        "This website uses only technically necessary cookies – for example, to remember your language preference. No third-party tracking or advertising cookies are set.",
        "Embedded content such as Google Maps may use its own cookies; the respective provider's privacy policy applies.",
        "The full cookie policy will be published here shortly.",
      ],
    },
  },
  agb: {
    de: {
      title: "Allgemeine Geschäftsbedingungen (AGB)",
      body: [
        "Diese Allgemeinen Geschäftsbedingungen regeln die Buchung und Durchführung von Transferleistungen der AirportTransfers Zürich (Kula-ZATK). Mit Abschluss einer Buchung akzeptieren Sie diese Bedingungen.",
        "Alle angegebenen Preise sind Festpreise pro Fahrzeug inkl. MwSt., sofern nicht anders vermerkt. Die Bezahlung erfolgt bequem im Fahrzeug – bar, mit Karte oder TWINT.",
        "Die vollständigen AGB werden in Kürze an dieser Stelle veröffentlicht. Bei Fragen kontaktieren Sie uns gerne vor Ihrer Buchung.",
      ],
    },
    en: {
      title: "Terms and Conditions",
      body: [
        "These terms and conditions govern the booking and provision of transfer services by AirportTransfers Zurich (Kula-ZATK). By completing a booking, you accept these terms.",
        "All quoted prices are fixed prices per vehicle incl. VAT unless stated otherwise. Payment is made conveniently in the vehicle – by cash, card or TWINT.",
        "The full terms and conditions will be published here shortly. If you have questions, feel free to contact us before booking.",
      ],
    },
  },
  rueckerstattung: {
    de: {
      title: "Rückerstattungsrichtlinie",
      body: [
        "Stornierungen sind bis 24 Stunden vor der geplanten Abholung kostenlos möglich. Bei kurzfristigeren Stornierungen kontaktieren Sie uns bitte direkt – wir finden gemeinsam eine faire Lösung.",
        "Bei Flugverspätungen entstehen Ihnen keine Zusatzkosten: Wir verfolgen Ihren Flug und passen die Abholzeit automatisch an.",
        "Die vollständige Rückerstattungsrichtlinie wird in Kürze an dieser Stelle veröffentlicht.",
      ],
    },
    en: {
      title: "Refund Policy",
      body: [
        "Cancellations are free of charge up to 24 hours before the scheduled pickup. For shorter-notice cancellations, please contact us directly – we will find a fair solution together.",
        "Flight delays never cost you extra: we track your flight and adjust the pickup time automatically.",
        "The full refund policy will be published here shortly.",
      ],
    },
  },
};
