// ─────────────────────────────────────────────────────────────
//  EVENTS — İsviçre'nin bilinen etkinlikleri & panorama trenleri
//  Rezervasyon CTA'sı ilgili şehri ön-dolu buchung'a götürür.
// ─────────────────────────────────────────────────────────────

export type EventCat = "business" | "festival" | "panorama" | "culture" | "tradition" | "sport";

type L10n = { de: string; en: string };

export type SwissEvent = {
  slug: string;
  name: string | L10n;
  cat: EventCat;
  when: L10n;
  city: string; // buchung'a "to" olarak gider
  desc: L10n; // açıklamalar şimdilik DE/EN — diğer diller EN gösterir
  img: string;  // mevcut galeri görsellerinden
  /** Etkinliğin blog rehberi (slug) — kartta "Anreise-Guide lesen" bağlantısı olarak görünür */
  guide?: string;
};

export const eventCats: { key: EventCat | "all"; label: L10n }[] = [
  { key: "all", label: { de: "Alle", en: "All" } },
  { key: "business", label: { de: "Kongress & Business", en: "Congress & business" } },
  { key: "festival", label: { de: "Festival", en: "Festival" } },
  { key: "panorama", label: { de: "Panoramabahn", en: "Panoramic rail" } },
  { key: "culture", label: { de: "Kunst & Kultur", en: "Arts & culture" } },
  { key: "tradition", label: { de: "Tradition", en: "Tradition" } },
  { key: "sport", label: { de: "Sport & Society", en: "Sport & society" } },
];

export const swissEvents: SwissEvent[] = [
  { slug: "wef-davos", name: "WEF Davos", cat: "business", when: { de: "Januar", en: "January" }, city: "Davos",
    desc: { de: "Der wichtigste Wirtschaftsgipfel der Welt – diskrete Transfers für Delegationen und Gäste.", en: "The world's leading economic summit – discreet transfers for delegations and guests." }, img: "/gallery/10.jpg",
    guide: "wef-davos-transfer-guide" },
  { slug: "art-basel", name: "Art Basel", cat: "culture", when: { de: "Juni", en: "June" }, city: "Basel",
    desc: { de: "Die führende Messe für moderne und zeitgenössische Kunst – stilvoll ankommen.", en: "The leading fair for modern and contemporary art – arrive in style." }, img: "/gallery/20.jpg" },
  { slug: "bernina-express", name: "Bernina Express", cat: "panorama", when: { de: "Ganzjährig", en: "Year-round" }, city: "Chur",
    desc: { de: "Die spektakulärste Alpenüberquerung per Panoramazug – wir bringen Sie zum Startbahnhof.", en: "The most spectacular Alpine crossing by panoramic train – we take you to the departure station." }, img: "/gallery/3.jpg" },
  { slug: "montreux-jazz", name: "Montreux Jazz Festival", cat: "festival", when: { de: "Juli", en: "July" }, city: "Montreux",
    desc: { de: "Legendäres Musikfestival am Ufer des Genfersees – Tür-zu-Tür-Transfer ohne Parkplatzsuche.", en: "Legendary music festival on the shores of Lake Geneva – door-to-door without the parking hunt." }, img: "/gallery/7.jpg" },
  { slug: "locarno-film", name: "Locarno Film Festival", cat: "festival", when: { de: "August", en: "August" }, city: "Locarno",
    desc: { de: "Internationales Filmfestival mit der berühmten Piazza Grande – entspannt ins Tessin reisen.", en: "International film festival with the famous Piazza Grande – travel to Ticino relaxed." }, img: "/gallery/13.jpg" },
  { slug: "lucerne-festival", name: "Lucerne Festival", cat: "festival", when: { de: "Sommer", en: "Summer" }, city: "Luzern",
    desc: { de: "Klassik von Weltrang im KKL am Vierwaldstättersee – pünktlich zum Konzertbeginn.", en: "World-class classical music at the KKL on Lake Lucerne – on time for the overture." }, img: "/gallery/17.jpg" },
  { slug: "street-parade", name: "Street Parade Zürich", cat: "festival", when: { de: "August", en: "August" }, city: "Zürich",
    desc: { de: "Die grösste Technoparade der Welt am Zürichsee – sichere Anreise und Rückfahrt.", en: "The world's biggest techno parade on Lake Zurich – a safe ride there and back." }, img: "/gallery/1.jpg",
    guide: "sommer-zuerich-street-parade-zueri-faescht-transfer" },
  { slug: "glacier-express", name: "Glacier Express", cat: "panorama", when: { de: "Ganzjährig", en: "Year-round" }, city: "Zermatt",
    desc: { de: "Der langsamste Schnellzug der Welt, von Zermatt nach St. Moritz – Transfer zu beiden Enden.", en: "The slowest express train in the world, Zermatt to St. Moritz – transfers at both ends." }, img: "/gallery/4.jpg" },
  { slug: "basel-fasnacht", name: "Basler Fasnacht", cat: "tradition", when: { de: "Februar/März", en: "February/March" }, city: "Basel",
    desc: { de: "Die grösste Fasnacht der Schweiz, UNESCO-Kulturerbe – Anreise ohne Stress.", en: "Switzerland's biggest carnival, UNESCO cultural heritage – arrive without stress." }, img: "/gallery/20.jpg" },
  { slug: "zurich-filmfestival", name: "Zurich Film Festival", cat: "festival", when: { de: "September/Oktober", en: "September/October" }, city: "Zürich",
    desc: { de: "Glamouröses Filmfestival mitten in Zürich – Chauffeurservice bis vor den grünen Teppich.", en: "Glamorous film festival in the heart of Zurich – chauffeur service right to the green carpet." }, img: "/gallery/2.jpg" },
  { slug: "verbier-festival", name: "Verbier Festival", cat: "festival", when: { de: "Juli/August", en: "July/August" }, city: "Verbier",
    desc: { de: "Klassik hoch über dem Tal in den Walliser Alpen – komfortabel bis ins Bergdorf.", en: "Classical music high above the valley in the Valais Alps – comfort all the way to the village." }, img: "/gallery/16.jpg" },
  { slug: "gstaad-menuhin", name: "Gstaad Menuhin Festival", cat: "festival", when: { de: "Juli–September", en: "July–September" }, city: "Gstaad",
    desc: { de: "Erlesene Klassik in den eleganten Bergdörfern des Saanenlands – diskret chauffiert.", en: "Fine classical music in the elegant villages of the Saanenland – discreetly chauffeured." }, img: "/gallery/6.jpg" },
  { slug: "montreux-comedy", name: "Montreux Comedy Festival", cat: "festival", when: { de: "Dezember", en: "December" }, city: "Montreux",
    desc: { de: "Das grösste Comedy-Festival Europas am Genfersee – entspannt hin und zurück.", en: "Europe's biggest comedy festival on Lake Geneva – a relaxed ride there and back." }, img: "/gallery/7.jpg" },
  { slug: "zermatt-unplugged", name: "Zermatt Unplugged", cat: "festival", when: { de: "April", en: "April" }, city: "Zermatt",
    desc: { de: "Akustische Livemusik am Fuss des Matterhorns – Transfer bis Täsch, weiter geht's autofrei.", en: "Acoustic live music at the foot of the Matterhorn – transfer to Täsch, then car-free onwards." }, img: "/gallery/4.jpg" },
  { slug: "white-turf", name: "White Turf St. Moritz", cat: "sport", when: { de: "Februar", en: "February" }, city: "St. Moritz",
    desc: { de: "Elegante Pferderennen auf dem gefrorenen See von St. Moritz – standesgemäss vorfahren.", en: "Elegant horse racing on the frozen lake of St. Moritz – arrive in fitting style." }, img: "/gallery/3.jpg" },
  // ── Blog rehberi olan kış/sezon etkinlikleri ──
  { slug: "spengler-cup", name: "Spengler Cup Davos", cat: "sport", when: { de: "26.–31. Dezember", en: "26–31 December" }, city: "Davos",
    desc: { de: "Das traditionsreichste Eishockeyturnier der Welt zwischen Weihnachten und Silvester – Transfer bis vor die Eishalle oder ins Hotel.", en: "The world's most traditional ice hockey tournament between Christmas and New Year – transfer right to the arena or your hotel." }, img: "/gallery/10.jpg",
    guide: "spengler-cup-davos-anreise-transfer" },
  { slug: "lauberhorn", name: "Lauberhornrennen Wengen", cat: "sport", when: { de: "Januar", en: "January" }, city: "Wengen",
    desc: { de: "Die längste Abfahrt im Weltcup – wir fahren Sie bis Lauterbrunnen, weiter geht es mit der Bahn ins autofreie Wengen.", en: "The longest downhill on the World Cup circuit – we drive you to Lauterbrunnen, then the train takes you up to car-free Wengen." }, img: "/gallery/6.jpg",
    guide: "lauberhornrennen-wengen-anreise-transfer" },
  { slug: "swiss-indoors", name: "Swiss Indoors Basel", cat: "sport", when: { de: "Oktober", en: "October" }, city: "Basel",
    desc: { de: "Welttennis in der St. Jakobshalle – direkt vom Flughafen oder Hotel zum Spiel und abends wieder zurück.", en: "World-class tennis at St. Jakobshalle – straight from the airport or hotel to the match and back again at night." }, img: "/gallery/18.jpg",
    guide: "swiss-indoors-basel-anreise-transfer" },
  { slug: "silvester-zuerich", name: "Silvester Zürich", cat: "tradition", when: { de: "31. Dezember", en: "31 December" }, city: "Zürich",
    desc: { de: "Feuerwerk über dem Zürichsee – bequem hin und nach Mitternacht sicher nach Hause, ohne Gedränge an Tram und Bahn.", en: "Fireworks over Lake Zurich – arrive comfortably and get home safely after midnight, without the crowds at tram and train." }, img: "/gallery/1.jpg",
    guide: "silvester-zuerich-feuerwerk-transfer" },
  { slug: "weihnachtsmaerkte", name: { de: "Weihnachtsmärkte", en: "Christmas markets" }, cat: "tradition", when: { de: "Ende November–Dezember", en: "Late November–December" }, city: "Basel",
    desc: { de: "Zürich, Basel, Luzern und Bern im Lichterglanz – mit Fahrer statt Parkplatzsuche, auch mehrere Märkte an einem Tag.", en: "Zurich, Basel, Lucerne and Bern in festive lights – with a driver instead of hunting for parking, even several markets in one day." }, img: "/gallery/2.jpg",
    guide: "weihnachtsmaerkte-zuerich-basel-transfer-dezember" },
];
