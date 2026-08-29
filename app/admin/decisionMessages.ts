// ─────────────────────────────────────────────────────────────
//  KARAR MESAJLARI — müşteriye kendi dilinde gönderilir
//  Panelde "Kabul et" / "Reddet" sonrası hazır metin üretilir.
// ─────────────────────────────────────────────────────────────

export type Lang11 = "de" | "en" | "it" | "pt" | "fr" | "es" | "tr" | "sr" | "hr" | "ar" | "ru";

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
  it: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Buongiorno ${name},\n\nil suo transfer è confermato.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nIl suo autista la attenderà con un cartello con il nome. In caso di ritardo del volo adattiamo automaticamente l'orario.\n\nCordiali saluti\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Buongiorno ${name},\n\ngrazie per la sua richiesta (${route}, ${when}).\n\nPurtroppo non possiamo effettuare questo transfer: ${reason}.\n\nSaremo lieti di aiutarla in un'altra data.\n\nCordiali saluti\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Buongiorno ${name},\n\npurtroppo dobbiamo annullare il suo transfer confermato (${route}, ${when}): ${reason}.\n\nNon le è stato addebitato nulla. Saremo lieti di fissare una nuova data.\n\nCordiali saluti\nAirport Zurich Transfer`,
    reasons: {
      busy: "il veicolo è già impegnato in quell'orario",
      distance: "il percorso è fuori dalla nostra area di servizio",
      service: "il veicolo è in manutenzione",
      capacity: "la capacità richiesta non è disponibile",
      short: "il preavviso è troppo breve",
      other: "per motivi operativi",
      customer: "su sua richiesta",
      reschedule: "per la sua modifica di data",
      driver: "il nostro autista non è disponibile",
    },
  },
  pt: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Olá ${name},\n\no seu transfer está confirmado.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nO seu motorista aguarda-o com uma placa com o nome. Em caso de atraso do voo, ajustamos automaticamente a hora.\n\nCom os melhores cumprimentos\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Olá ${name},\n\nobrigado pelo seu pedido (${route}, ${when}).\n\nInfelizmente não podemos realizar este transfer: ${reason}.\n\nTeremos todo o gosto em ajudar noutra data.\n\nCom os melhores cumprimentos\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Olá ${name},\n\ninfelizmente temos de cancelar o seu transfer confirmado (${route}, ${when}): ${reason}.\n\nNão houve qualquer custo para si. Teremos todo o gosto em marcar uma nova data.\n\nCom os melhores cumprimentos\nAirport Zurich Transfer`,
    reasons: {
      busy: "o veículo já está reservado nesse horário",
      distance: "o percurso está fora da nossa área de serviço",
      service: "o veículo está em manutenção",
      capacity: "a capacidade necessária não está disponível",
      short: "a antecedência é demasiado curta",
      other: "por motivos operacionais",
      customer: "a seu pedido",
      reschedule: "devido à sua alteração de data",
      driver: "o nosso motorista não está disponível",
    },
  },
  fr: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Bonjour ${name},\n\nvotre transfert est confirmé.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nVotre chauffeur vous attendra avec une pancarte à votre nom. En cas de retard, nous ajustons l'heure automatiquement.\n\nCordialement\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Bonjour ${name},\n\nmerci pour votre demande (${route}, ${when}).\n\nMalheureusement nous ne pouvons pas assurer ce transfert : ${reason}.\n\nNous restons à votre disposition pour une autre date.\n\nCordialement\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Bonjour ${name},\n\nnous devons malheureusement annuler votre transfert confirmé (${route}, ${when}) : ${reason}.\n\nAucun frais ne vous a été facturé. Nous serions ravis de convenir d'une nouvelle date.\n\nCordialement\nAirport Zurich Transfer`,
    reasons: {
      busy: "le véhicule est déjà réservé à cette heure",
      distance: "le trajet est en dehors de notre zone de service",
      service: "notre véhicule est en entretien",
      capacity: "la capacité demandée n'est pas disponible",
      short: "le délai est trop court",
      other: "pour des raisons opérationnelles",
      customer: "à votre demande",
      reschedule: "en raison de votre changement de date",
      driver: "notre chauffeur n'est pas disponible",
    },
  },
  es: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Hola ${name},\n\nsu traslado está confirmado.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nSu conductor le esperará con un cartel con su nombre. Si el vuelo se retrasa, ajustamos la hora automáticamente.\n\nUn cordial saludo\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Hola ${name},\n\ngracias por su solicitud (${route}, ${when}).\n\nLamentablemente no podemos realizar este traslado: ${reason}.\n\nEstaremos encantados de ayudarle en otra fecha.\n\nUn cordial saludo\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Hola ${name},\n\nlamentablemente debemos cancelar su traslado confirmado (${route}, ${when}): ${reason}.\n\nNo se le ha cobrado nada. Estaremos encantados de fijar una nueva fecha.\n\nUn cordial saludo\nAirport Zurich Transfer`,
    reasons: {
      busy: "el vehículo ya está reservado a esa hora",
      distance: "la ruta está fuera de nuestra zona de servicio",
      service: "el vehículo está en mantenimiento",
      capacity: "la capacidad necesaria no está disponible",
      short: "el aviso es demasiado corto",
      other: "por motivos operativos",
      customer: "a petición suya",
      reschedule: "por su cambio de fecha",
      driver: "nuestro conductor no está disponible",
    },
  },
  tr: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Merhaba ${name},\n\ntransfer talebiniz onaylandı.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nŞoförünüz isim tabelasıyla sizi karşılayacak. Uçuşunuz rötar yaparsa alınış saatini otomatik güncelliyoruz.\n\nSaygılarımızla\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Merhaba ${name},\n\ntalebiniz için teşekkür ederiz (${route}, ${when}).\n\nMaalesef bu transferi gerçekleştiremiyoruz: ${reason}.\n\nBaşka bir tarih için memnuniyetle yardımcı oluruz.\n\nSaygılarımızla\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Merhaba ${name},\n\nonaylanmış transferinizi (${route}, ${when}) maalesef iptal etmek zorundayız: ${reason}.\n\nHerhangi bir ücret tahsil edilmemiştir. Yeni bir tarih için memnuniyetle yardımcı oluruz.\n\nSaygılarımızla\nAirport Zurich Transfer`,
    reasons: {
      busy: "araç o saatte doludur",
      distance: "güzergâh hizmet alanımızın dışındadır",
      service: "aracımız bakımdadır",
      capacity: "gerekli kapasite müsait değildir",
      short: "talep süresi çok kısadır",
      other: "operasyonel nedenlerle",
      customer: "talebiniz üzerine",
      reschedule: "tarih değişikliğiniz nedeniyle",
      driver: "şoförümüz müsait değil",
    },
  },
  sr: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Poštovani ${name},\n\nvaš transfer je potvrđen.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nVozač će vas čekati sa tablom sa imenom. U slučaju kašnjenja leta automatski prilagođavamo vreme.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Poštovani ${name},\n\nhvala na vašem upitu (${route}, ${when}).\n\nNažalost ne možemo preuzeti ovaj transfer: ${reason}.\n\nRado ćemo pomoći za neki drugi termin.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Poštovani ${name},\n\nnažalost moramo otkazati vaš potvrđeni transfer (${route}, ${when}): ${reason}.\n\nNikakvi troškovi vam nisu naplaćeni. Rado ćemo dogovoriti novi termin.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    reasons: {
      busy: "vozilo je već zauzeto u to vreme",
      distance: "ruta je izvan našeg područja rada",
      service: "vozilo je na servisu",
      capacity: "potreban kapacitet nije dostupan",
      short: "rok je prekratak",
      other: "iz operativnih razloga",
      customer: "na vaš zahtev",
      reschedule: "zbog promene termina",
      driver: "naš vozač nije dostupan",
    },
  },
  hr: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Poštovani ${name},\n\nvaš transfer je potvrđen.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nVozač će vas čekati s pločicom s imenom. U slučaju kašnjenja leta automatski prilagođavamo vrijeme.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Poštovani ${name},\n\nhvala na vašem upitu (${route}, ${when}).\n\nNažalost ne možemo preuzeti ovaj transfer: ${reason}.\n\nRado ćemo pomoći za neki drugi termin.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Poštovani ${name},\n\nnažalost moramo otkazati vaš potvrđeni transfer (${route}, ${when}): ${reason}.\n\nNikakvi troškovi nisu naplaćeni. Rado ćemo dogovoriti novi termin.\n\nSrdačan pozdrav\nAirport Zurich Transfer`,
    reasons: {
      busy: "vozilo je već zauzeto u to vrijeme",
      distance: "ruta je izvan našeg područja rada",
      service: "vozilo je na servisu",
      capacity: "potreban kapacitet nije dostupan",
      short: "rok je prekratak",
      other: "iz operativnih razloga",
      customer: "na vaš zahtjev",
      reschedule: "zbog promjene termina",
      driver: "naš vozač nije dostupan",
    },
  },
  ar: {
    accept: ({ name, route, when, price, vehicle }) =>
      `مرحبًا ${name}،\n\nتم تأكيد خدمة النقل الخاصة بك.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nسينتظرك السائق حاملًا لوحة باسمك. وفي حال تأخر رحلتك نعدّل موعد الاستلام تلقائيًا.\n\nمع خالص التحية\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `مرحبًا ${name}،\n\nشكرًا لطلبك (${route}، ${when}).\n\nنعتذر، لا يمكننا تنفيذ هذه الرحلة: ${reason}.\n\nيسعدنا خدمتك في موعد آخر.\n\nمع خالص التحية\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `مرحبًا ${name}،\n\nنأسف لاضطرارنا إلى إلغاء رحلتك المؤكدة (${route}، ${when}): ${reason}.\n\nلم يتم تحصيل أي رسوم منك. يسعدنا ترتيب موعد جديد.\n\nمع خالص التحية\nAirport Zurich Transfer`,
    reasons: {
      busy: "المركبة محجوزة في ذلك الوقت",
      distance: "الوجهة خارج نطاق خدمتنا",
      service: "المركبة في الصيانة",
      capacity: "السعة المطلوبة غير متوفرة",
      short: "المهلة قصيرة جدًا",
      other: "لأسباب تشغيلية",
      customer: "بناءً على طلبك",
      reschedule: "بسبب تغيير الموعد",
      driver: "السائق غير متاح",
    },
  },
  ru: {
    accept: ({ name, route, when, price, vehicle }) =>
      `Здравствуйте, ${name}!\n\nВаш трансфер подтверждён.\n\n📍 ${route}\n🕐 ${when}\n🚘 ${vehicle}\n💰 ${price}\n\nВодитель встретит вас с именной табличкой. При задержке рейса время подачи корректируется автоматически.\n\nС уважением\nAirport Zurich Transfer`,
    reject: ({ name, route, when, reason }) =>
      `Здравствуйте, ${name}!\n\nблагодарим за заявку (${route}, ${when}).\n\nК сожалению, мы не можем выполнить этот трансфер: ${reason}.\n\nБудем рады помочь в другую дату.\n\nС уважением\nAirport Zurich Transfer`,
    cancel: ({ name, route, when, reason }) =>
      `Здравствуйте, ${name}!\n\nк сожалению, нам приходится отменить подтверждённый трансфер (${route}, ${when}): ${reason}.\n\nНикаких списаний не производилось. Будем рады согласовать новую дату.\n\nС уважением\nAirport Zurich Transfer`,
    reasons: {
      busy: "автомобиль уже занят в это время",
      distance: "маршрут вне зоны нашего обслуживания",
      service: "автомобиль находится на техобслуживании",
      capacity: "требуемая вместимость недоступна",
      short: "слишком короткий срок",
      other: "по операционным причинам",
      customer: "по вашей просьбе",
      reschedule: "из-за изменения даты",
      driver: "наш водитель недоступен",
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
