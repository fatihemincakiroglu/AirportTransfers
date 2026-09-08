// ─────────────────────────────────────────────────────────────
//  KARAR MESAJLARI — müşteriye kendi dilinde gönderilir
//  Panelde "Kabul et" / "Reddet" sonrası hazır metin üretilir.
// ─────────────────────────────────────────────────────────────

export type Lang11 = "de" | "en";

/** Kabul edilmiş bir yolculuğun iptal sebepleri */
export const CANCEL_REASONS: { key: string; label: string }[] = [
  { key: "customer",   label: "Müşteri isteği" },
  { key: "reschedule", label: "Müşteri tarihi değiştirdi" },
  { key: "busy",       label: "Araç o saatte dolu" },
  { key: "service",    label: "Araç arıza / bakım" },
  { key: "driver",     label: "Şoför müsait değil" },
  { key: "other",      label: "Diğer" },
];

/** Ret sebepleri — panelde seçilir, müşteri metnine uygun cümle olarak girer */
export const REJECT_REASONS: { key: string; label: string }[] = [
  { key: "busy",     label: "Araç o saatte dolu" },
  { key: "distance", label: "Konum hizmet alanımızın dışında" },
  { key: "service",  label: "Araç bakımda" },
  { key: "capacity", label: "Yolcu/bagaj kapasitesi yetersiz" },
  { key: "short",    label: "Talep çok kısa sürede (yetişmiyor)" },
  { key: "other",    label: "Diğer" },
];

type Msg = {
  accept: (p: { name: string; route: string; when: string; price: string; vehicle: string }) => string;
  reject: (p: { name: string; route: string; when: string; reason: string }) => string;
  cancel: (p: { name: string; route: string; when: string; reason: string }) => string;
  reasons: Record<string, string>;
};

const M: Record<Lang11, Msg> = {
  de: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Guten Tag ${name},\n\nIhre Transferanfrage ist bestätigt.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nIhr Chauffeur erwartet Sie mit Namensschild. Bei Flugverspätung passen wir die Abholzeit automatisch an.\n\nFreundliche Grüsse\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Guten Tag ${name},\n\nvielen Dank für Ihre Anfrage (${route}, ${when}).\n\nLeider können wir diesen Transfer nicht übernehmen: ${reason}.\n\nGerne stehen wir Ihnen für einen anderen Termin zur Verfügung.\n\nFreundliche Grüsse\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Guten Tag ${name},\n\nleider müssen wir Ihren bestätigten Transfer (${route}, ${when}) stornieren: ${reason}.\n\nEs sind Ihnen selbstverständlich keine Kosten entstanden. Gerne finden wir einen neuen Termin für Sie.\n\nFreundliche Grüsse\nAirport Zurich Transfer`,
    reasons: {
      busy: "das Fahrzeug ist zu dieser Zeit bereits vergeben",
      distance: "die Strecke liegt ausserhalb unseres Einsatzgebiets",
      service: "unser Fahrzeug befindet sich im Service",
      capacity: "die benötigte Kapazität steht nicht zur Verfügung",
      short: "die Vorlaufzeit ist zu kurz",
      other: "aus betrieblichen Gründen",
      customer: "auf Ihren Wunsch",
      reschedule: "wegen Ihrer Terminänderung",
      driver: "unser Chauffeur ist nicht verfügbar",
    },
  },
  en: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Hello ${name},\n\nYour transfer is confirmed.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nYour chauffeur will await you with a name sign. If your flight is delayed, we adjust the pickup time automatically.\n\nKind regards\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Hello ${name},\n\nthank you for your request (${route}, ${when}).\n\nUnfortunately we cannot take this transfer: ${reason}.\n\nWe would be glad to help you with another date.\n\nKind regards\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Hello ${name},\n\nunfortunately we have to cancel your confirmed transfer (${route}, ${when}): ${reason}.\n\nNo costs have been incurred for you. We would be happy to arrange a new date.\n\nKind regards\nAirport Zurich Transfer`,
    reasons: {
      busy: "the vehicle is already booked at that time",
      distance: "the route is outside our service area",
      service: "our vehicle is currently in service",
      capacity: "the required capacity is not available",
      short: "the notice period is too short",
      other: "for operational reasons",
      customer: "at your request",
      reschedule: "due to your change of date",
      driver: "our chauffeur is unavailable",
    },
  },
};

const safe = (l?: string | null): Lang11 => ((l && l in M) ? (l as Lang11) : "de");

export function acceptMessage(lang: string | null | undefined, p: {
  name: string; route: string; when: string; price: string; vehicle: string;
}) {
  return M[safe(lang)].accept(p);
}

export function cancelMessage(lang: string | null | undefined, reasonKey: string, p: {
  name: string; route: string; when: string;
}) {
  const l = safe(lang);
  return M[l].cancel({ ...p, reason: M[l].reasons[reasonKey] ?? M[l].reasons.other });
}

export function rejectMessage(lang: string | null | undefined, reasonKey: string, p: {
  name: string; route: string; when: string;
}) {
  const l = safe(lang);
  return M[l].reject({ ...p, reason: M[l].reasons[reasonKey] ?? M[l].reasons.other });
}
