// ─────────────────────────────────────────────────────────────
//  EVENTS — İsviçre'nin bilinen etkinlikleri & panorama trenleri
//  Rezervasyon CTA'sı ilgili şehri ön-dolu buchung'a götürür.
// ─────────────────────────────────────────────────────────────

export type EventCat = "business" | "festival" | "panorama" | "culture" | "tradition" | "sport";

import type { Lang } from "./i18n";

type L10n = { de: string; en: string } & Partial<Record<Lang, string>>;

export type SwissEvent = {
  slug: string;
  name: string;
  cat: EventCat;
  when: L10n;
  city: string; // buchung'a "to" olarak gider
  desc: L10n; // açıklamalar şimdilik DE/EN — diğer diller EN gösterir
  img: string;  // mevcut galeri görsellerinden
};

export const eventCats: { key: EventCat | "all"; label: L10n }[] = [
  { key: "all", label: { de: "Alle", en: "All", it: "Tutti", pt: "Todos", fr: "Tous", es: "Todos", tr: "Tümü", sr: "Svi", hr: "Sva", ar: "الكل", ru: "Все" } },
  { key: "business", label: { de: "Kongress & Business", en: "Congress & business", it: "Congressi e business", pt: "Congressos e negócios", fr: "Congrès et business", es: "Congresos y negocios", tr: "Kongre ve iş", sr: "Kongresi i biznis", hr: "Kongresi i poslovanje", ar: "مؤتمرات وأعمال", ru: "Конгрессы и бизнес" } },
  { key: "festival", label: { de: "Festival", en: "Festival", it: "Festival", pt: "Festival", fr: "Festival", es: "Festival", tr: "Festival", sr: "Festival", hr: "Festival", ar: "مهرجان", ru: "Фестиваль" } },
  { key: "panorama", label: { de: "Panoramabahn", en: "Panoramic rail", it: "Treno panoramico", pt: "Comboio panorâmico", fr: "Train panoramique", es: "Tren panorámico", tr: "Panoramik tren", sr: "Panoramski voz", hr: "Panoramski vlak", ar: "قطار بانورامي", ru: "Панорамный поезд" } },
  { key: "culture", label: { de: "Kunst & Kultur", en: "Arts & culture", it: "Arte e cultura", pt: "Arte e cultura", fr: "Art et culture", es: "Arte y cultura", tr: "Sanat ve kültür", sr: "Umetnost i kultura", hr: "Umjetnost i kultura", ar: "فن وثقافة", ru: "Искусство и культура" } },
  { key: "tradition", label: { de: "Tradition", en: "Tradition", it: "Tradizione", pt: "Tradição", fr: "Tradition", es: "Tradición", tr: "Gelenek", sr: "Tradicija", hr: "Tradicija", ar: "تقاليد", ru: "Традиции" } },
  { key: "sport", label: { de: "Sport & Society", en: "Sport & society", it: "Sport e società", pt: "Desporto e sociedade", fr: "Sport et société", es: "Deporte y sociedad", tr: "Spor ve sosyete", sr: "Sport i društvo", hr: "Sport i društvo", ar: "رياضة ومجتمع", ru: "Спорт и светская жизнь" } },
];

export const swissEvents: SwissEvent[] = [
  { slug: "wef-davos", name: "WEF Davos", cat: "business", when: { de: "Januar", en: "January", it: "Gennaio", pt: "Janeiro", fr: "Janvier", es: "Enero", tr: "Ocak", sr: "Januar", hr: "Siječanj", ar: "يناير", ru: "Январь" }, city: "Davos",
    desc: { de: "Der wichtigste Wirtschaftsgipfel der Welt – diskrete Transfers für Delegationen und Gäste.", en: "The world's leading economic summit – discreet transfers for delegations and guests." }, img: "/gallery/10.jpg" },
  { slug: "art-basel", name: "Art Basel", cat: "culture", when: { de: "Juni", en: "June", it: "Giugno", pt: "Junho", fr: "Juin", es: "Junio", tr: "Haziran", sr: "Jun", hr: "Lipanj", ar: "يونيو", ru: "Июнь" }, city: "Basel",
    desc: { de: "Die führende Messe für moderne und zeitgenössische Kunst – stilvoll ankommen.", en: "The leading fair for modern and contemporary art – arrive in style." }, img: "/gallery/20.jpg" },
  { slug: "bernina-express", name: "Bernina Express", cat: "panorama", when: { de: "Ganzjährig", en: "Year-round", it: "Tutto l'anno", pt: "Todo o ano", fr: "Toute l'année", es: "Todo el año", tr: "Yıl boyu", sr: "Tokom cele godine", hr: "Tijekom cijele godine", ar: "طوال العام", ru: "Круглый год" }, city: "Chur",
    desc: { de: "Die spektakulärste Alpenüberquerung per Panoramazug – wir bringen Sie zum Startbahnhof.", en: "The most spectacular Alpine crossing by panoramic train – we take you to the departure station." }, img: "/gallery/3.jpg" },
  { slug: "montreux-jazz", name: "Montreux Jazz Festival", cat: "festival", when: { de: "Juli", en: "July", it: "Luglio", pt: "Julho", fr: "Juillet", es: "Julio", tr: "Temmuz", sr: "Jul", hr: "Srpanj", ar: "يوليو", ru: "Июль" }, city: "Montreux",
    desc: { de: "Legendäres Musikfestival am Ufer des Genfersees – Tür-zu-Tür-Transfer ohne Parkplatzsuche.", en: "Legendary music festival on the shores of Lake Geneva – door-to-door without the parking hunt." }, img: "/gallery/7.jpg" },
  { slug: "locarno-film", name: "Locarno Film Festival", cat: "festival", when: { de: "August", en: "August", it: "Agosto", pt: "Agosto", fr: "Août", es: "Agosto", tr: "Ağustos", sr: "Avgust", hr: "Kolovoz", ar: "أغسطس", ru: "Август" }, city: "Locarno",
    desc: { de: "Internationales Filmfestival mit der berühmten Piazza Grande – entspannt ins Tessin reisen.", en: "International film festival with the famous Piazza Grande – travel to Ticino relaxed." }, img: "/gallery/13.jpg" },
  { slug: "lucerne-festival", name: "Lucerne Festival", cat: "festival", when: { de: "Sommer", en: "Summer", it: "Estate", pt: "Verão", fr: "Été", es: "Verano", tr: "Yaz", sr: "Leto", hr: "Ljeto", ar: "الصيف", ru: "Лето" }, city: "Luzern",
    desc: { de: "Klassik von Weltrang im KKL am Vierwaldstättersee – pünktlich zum Konzertbeginn.", en: "World-class classical music at the KKL on Lake Lucerne – on time for the overture." }, img: "/gallery/17.jpg" },
  { slug: "street-parade", name: "Street Parade Zürich", cat: "festival", when: { de: "August", en: "August", it: "Agosto", pt: "Agosto", fr: "Août", es: "Agosto", tr: "Ağustos", sr: "Avgust", hr: "Kolovoz", ar: "أغسطس", ru: "Август" }, city: "Zürich",
    desc: { de: "Die grösste Technoparade der Welt am Zürichsee – sichere Anreise und Rückfahrt.", en: "The world's biggest techno parade on Lake Zurich – a safe ride there and back." }, img: "/gallery/1.jpg" },
  { slug: "glacier-express", name: "Glacier Express", cat: "panorama", when: { de: "Ganzjährig", en: "Year-round", it: "Tutto l'anno", pt: "Todo o ano", fr: "Toute l'année", es: "Todo el año", tr: "Yıl boyu", sr: "Tokom cele godine", hr: "Tijekom cijele godine", ar: "طوال العام", ru: "Круглый год" }, city: "Zermatt",
    desc: { de: "Der langsamste Schnellzug der Welt, von Zermatt nach St. Moritz – Transfer zu beiden Enden.", en: "The slowest express train in the world, Zermatt to St. Moritz – transfers at both ends." }, img: "/gallery/4.jpg" },
  { slug: "basel-fasnacht", name: "Basler Fasnacht", cat: "tradition", when: { de: "Februar/März", en: "February/March", it: "Febbraio/Marzo", pt: "Fevereiro/Março", fr: "Février/Mars", es: "Febrero/Marzo", tr: "Şubat/Mart", sr: "Februar/Mart", hr: "Veljača/Ožujak", ar: "فبراير/مارس", ru: "Февраль/Март" }, city: "Basel",
    desc: { de: "Die grösste Fasnacht der Schweiz, UNESCO-Kulturerbe – Anreise ohne Stress.", en: "Switzerland's biggest carnival, UNESCO cultural heritage – arrive without stress." }, img: "/gallery/20.jpg" },
  { slug: "zurich-filmfestival", name: "Zurich Film Festival", cat: "festival", when: { de: "September/Oktober", en: "September/October", it: "Settembre/Ottobre", pt: "Setembro/Outubro", fr: "Septembre/Octobre", es: "Septiembre/Octubre", tr: "Eylül/Ekim", sr: "Septembar/Oktobar", hr: "Rujan/Listopad", ar: "سبتمبر/أكتوبر", ru: "Сентябрь/Октябрь" }, city: "Zürich",
    desc: { de: "Glamouröses Filmfestival mitten in Zürich – Chauffeurservice bis vor den grünen Teppich.", en: "Glamorous film festival in the heart of Zurich – chauffeur service right to the green carpet." }, img: "/gallery/2.jpg" },
  { slug: "verbier-festival", name: "Verbier Festival", cat: "festival", when: { de: "Juli/August", en: "July/August", it: "Luglio/Agosto", pt: "Julho/Agosto", fr: "Juillet/Août", es: "Julio/Agosto", tr: "Temmuz/Ağustos", sr: "Jul/Avgust", hr: "Srpanj/Kolovoz", ar: "يوليو/أغسطس", ru: "Июль/Август" }, city: "Verbier",
    desc: { de: "Klassik hoch über dem Tal in den Walliser Alpen – komfortabel bis ins Bergdorf.", en: "Classical music high above the valley in the Valais Alps – comfort all the way to the village." }, img: "/gallery/16.jpg" },
  { slug: "gstaad-menuhin", name: "Gstaad Menuhin Festival", cat: "festival", when: { de: "Juli–September", en: "July–September", it: "Luglio–Settembre", pt: "Julho–Setembro", fr: "Juillet–Septembre", es: "Julio–Septiembre", tr: "Temmuz–Eylül", sr: "Jul–Septembar", hr: "Srpanj–Rujan", ar: "يوليو–سبتمبر", ru: "Июль–Сентябрь" }, city: "Gstaad",
    desc: { de: "Erlesene Klassik in den eleganten Bergdörfern des Saanenlands – diskret chauffiert.", en: "Fine classical music in the elegant villages of the Saanenland – discreetly chauffeured." }, img: "/gallery/6.jpg" },
  { slug: "montreux-comedy", name: "Montreux Comedy Festival", cat: "festival", when: { de: "Dezember", en: "December", it: "Dicembre", pt: "Dezembro", fr: "Décembre", es: "Diciembre", tr: "Aralık", sr: "Decembar", hr: "Prosinac", ar: "ديسمبر", ru: "Декабрь" }, city: "Montreux",
    desc: { de: "Das grösste Comedy-Festival Europas am Genfersee – entspannt hin und zurück.", en: "Europe's biggest comedy festival on Lake Geneva – a relaxed ride there and back." }, img: "/gallery/7.jpg" },
  { slug: "zermatt-unplugged", name: "Zermatt Unplugged", cat: "festival", when: { de: "April", en: "April", it: "Aprile", pt: "Abril", fr: "Avril", es: "Abril", tr: "Nisan", sr: "April", hr: "Travanj", ar: "أبريل", ru: "Апрель" }, city: "Zermatt",
    desc: { de: "Akustische Livemusik am Fuss des Matterhorns – Transfer bis Täsch, weiter geht's autofrei.", en: "Acoustic live music at the foot of the Matterhorn – transfer to Täsch, then car-free onwards." }, img: "/gallery/4.jpg" },
  { slug: "white-turf", name: "White Turf St. Moritz", cat: "sport", when: { de: "Februar", en: "February", it: "Febbraio", pt: "Fevereiro", fr: "Février", es: "Febrero", tr: "Şubat", sr: "Februar", hr: "Veljača", ar: "فبراير", ru: "Февраль" }, city: "St. Moritz",
    desc: { de: "Elegante Pferderennen auf dem gefrorenen See von St. Moritz – standesgemäss vorfahren.", en: "Elegant horse racing on the frozen lake of St. Moritz – arrive in fitting style." }, img: "/gallery/3.jpg" },
];
