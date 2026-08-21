// ─────────────────────────────────────────────────────────────
//  DEMO VERİ
//    node seed-demo.mjs          → son 12 aya yayılmış örnek veri ekler
//    node seed-demo.mjs --clear  → SADECE demo kayıtlarını siler
//
//  Demo kayıtları "DEMO-" ile başlayan referans numarasıyla işaretlenir,
//  bu yüzden gerçek kayıtlara dokunulmadan temizlenebilir.
// ─────────────────────────────────────────────────────────────
import fs from "node:fs";
import postgres from "postgres";

const env = fs.readFileSync(".env.local", "utf8");
const url = env.match(/^\s*DATABASE_URL\s*=\s*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, "");
if (!url) { console.error("DATABASE_URL bulunamadı (.env.local)"); process.exit(1); }

const sql = postgres(url, { ssl: "require", prepare: false, max: 2 });
const clear = process.argv.includes("--clear");

if (clear) {
  const a = await sql`DELETE FROM bookings WHERE ref LIKE 'DEMO-%' RETURNING id`;
  const b = await sql`DELETE FROM contacts WHERE message LIKE '%[demo]%' RETURNING id`;
  const c = await sql`DELETE FROM logs WHERE detail LIKE '%DEMO-%' OR detail LIKE '%[demo]%' RETURNING id`;
  console.log(`✔ Silindi — rezervasyon: ${a.length}, mesaj: ${b.length}, log: ${c.length}`);
  await sql.end();
  process.exit(0);
}

// ── Örnek veri havuzları ──
const DEST = [
  ["Luzern", 189, 63], ["Bern", 419, 125], ["Basel", 349, 88], ["Zürich City", 129, 13],
  ["Zermatt", 749, 240], ["St. Moritz", 749, 200], ["Interlaken", 489, 120], ["Davos", 649, 155],
  ["Genève", 899, 280], ["Lugano", 749, 210], ["Winterthur", 149, 25], ["Zug", 219, 45],
  ["Grindelwald", 559, 140], ["Montreux", 719, 230], ["St. Gallen", 289, 85], ["Chur", 449, 120],
];
const VEHICLES = [
  ["Business Class · Mercedes-Benz E-Class", 1.0],
  ["Business & Family Class · Mercedes-Benz V-Class", 1.19],
  ["Premium Class · Mercedes-Benz S-Class", 1.87],
];
const FIRST = ["Sophie","James","Elena","Markus","Anna","David","Thomas","Claudia","Marco","Giulia","Camille","Nicolas","Carmen","Javier","Emre","Ayşe","Nikola","Milica","Ivan","Petra","Анна","Дмитрий","أحمد","سارة","João","Ana","Michael","Sarah","Lucas","Emma"];
const LAST = ["Weber","Hunt","Rossi","Brunner","Keller","Lang","Reber","Müller","Bianchi","Ferrari","Dubois","Laurent","García","Moreno","Kaya","Demir","Jovanović","Petrović","Horvat","Marić","Смирнова","Козлов","الخالد","العلي","Silva","Costa","Turner","Parker","Meier","Schmid"];
const LANGS = ["de","de","de","de","en","en","en","fr","it","tr","ru","ar","es","pt","sr","hr"];
const PAY = ["TWINT","Bar / Cash","Kreditkarte"];
const STATUSES = ["done","done","done","done","confirmed","confirmed","confirmed","cancelled","new"];
const FLIGHTS = ["LX317","LX1485","TK1917","EK085","QR095","BA714","AF1214","SQ346","LH1216","EW2530"];

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pad = (n) => String(n).padStart(2, "0");

const bookings = [];
const now = new Date();

for (let back = 11; back >= 0; back--) {
  const base = new Date(now.getFullYear(), now.getMonth() - back, 1);
  const y = base.getFullYear(), m = base.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  // Mevsimsellik: kış (ski) ve yaz yoğun, ilerleyen aylarda büyüme
  const season = [1.35, 1.25, 1.0, 0.85, 0.9, 1.05, 1.3, 1.35, 1.0, 0.9, 0.95, 1.2][m];
  const growth = 1 + (11 - back) * 0.06;
  const count = Math.max(3, Math.round(rnd(7, 12) * season * growth));

  for (let i = 0; i < count; i++) {
    const day = rnd(1, daysInMonth);
    const created = new Date(y, m, day, rnd(7, 23), rnd(0, 59));
    if (created > now) continue;

    // Yolculuk tarihi: kayıttan 1-20 gün sonra
    const ride = new Date(created.getTime() + rnd(1, 20) * 86400000);
    const [dest, price, km] = pick(DEST);
    const [vehicle, mult] = pick(VEHICLES);
    const reversed = Math.random() < 0.35;
    const total = Math.round(price * mult * 100) / 100;

    // Geleceğe ait yolculuklar henüz tamamlanmış olamaz
    let status = pick(STATUSES);
    if (ride > now && (status === "done")) status = "confirmed";
    if (back === 0 && Math.random() < 0.4) status = "new";

    const first = pick(FIRST), last = pick(LAST);
    const stops = Math.random() < 0.12 ? pick(["Zug", "Baar", "Winterthur", "Luzern"]) : null;

    bookings.push({
      ref: `DEMO-${String(bookings.length + 1).padStart(4, "0")}`,
      status,
      lang: pick(LANGS),
      channel: Math.random() < 0.8 ? "whatsapp" : "email",
      pickup: reversed ? dest : "Flughafen Zürich (ZRH)",
      dropoff: reversed ? "Flughafen Zürich (ZRH)" : dest,
      stops,
      ride_date: `${ride.getFullYear()}-${pad(ride.getMonth() + 1)}-${pad(ride.getDate())}`,
      ride_time: `${pad(rnd(5, 23))}:${pick(["00","15","30","45"])}`,
      pax: rnd(1, 6),
      luggage: rnd(1, 6),
      vehicle,
      price: total,
      payment: pick(PAY),
      first_name: first,
      last_name: last,
      email: `${first.toLowerCase().replace(/[^a-z]/g, "") || "guest"}.${last.toLowerCase().replace(/[^a-z]/g, "") || "demo"}@example.com`,
      phone: `+41 7${rnd(6,9)} ${rnd(100,999)} ${rnd(10,99)} ${rnd(10,99)}`,
      flight: pick(FLIGHTS),
      extras: Math.random() < 0.3 ? pick(["Kindersitz: 1", "Babyschale: 1", "Skitasche: 2"]) : null,
      notes: Math.random() < 0.2 ? pick(["Bitte pünktlich sein.", "Extra Gepäck vorhanden.", "Meet & Greet gewünscht."]) : null,
      created_at: created.toISOString(),
      km,
    });
  }
}

console.log(`${bookings.length} rezervasyon oluşturuluyor…`);

for (const b of bookings) {
  await sql`
    INSERT INTO bookings (ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
      pax, luggage, vehicle, price, payment, first_name, last_name, email, phone, flight,
      extras, notes, created_at, updated_at)
    VALUES (${b.ref}, ${b.status}, ${b.lang}, ${b.channel}, ${b.pickup}, ${b.dropoff}, ${b.stops},
      ${b.ride_date}, ${b.ride_time}, ${b.pax}, ${b.luggage}, ${b.vehicle}, ${b.price}, ${b.payment},
      ${b.first_name}, ${b.last_name}, ${b.email}, ${b.phone}, ${b.flight}, ${b.extras}, ${b.notes},
      ${b.created_at}, ${b.created_at})
    ON CONFLICT (ref) DO NOTHING`;
}

// Tamamlanmışların bir kısmına fatura numarası
const done = await sql`SELECT id, ref, created_at FROM bookings WHERE ref LIKE 'DEMO-%' AND status = 'done' ORDER BY created_at`;
let counter = {};
for (const d of done) {
  if (Math.random() < 0.75) {
    const year = new Date(d.created_at).getFullYear();
    counter[year] = (counter[year] ?? 0) + 1;
    const no = `RE-${year}-${String(counter[year]).padStart(4, "0")}`;
    await sql`UPDATE bookings SET invoice_no = ${no}, invoiced_at = ${d.created_at} WHERE id = ${d.id}`;
  }
}
console.log(`✔ ${Object.values(counter).reduce((a, b) => a + b, 0)} fatura numarası atandı`);

// İletişim mesajları
const MSGS = [
  "Guten Tag, ich möchte einen Transfer für 6 Personen nach Davos anfragen. Ist das möglich? [demo]",
  "Hello, do you offer child seats for a 2-year-old? Our flight arrives at 07:20. [demo]",
  "Bonjour, pouvez-vous m'envoyer un devis pour Genève aller-retour ? [demo]",
  "Merhaba, 4 kişilik grup için Zermatt fiyatı alabilir miyim? [demo]",
  "Buongiorno, avete un servizio orario per una giornata a Lucerna? [demo]",
  "Здравствуйте, нужен трансфер в Санкт-Мориц 14 января. [demo]",
  "Hallo, wie lange warten Sie bei Flugverspätung kostenlos? [demo]",
  "Do you accept credit cards in the car? [demo]",
];
for (let i = 0; i < MSGS.length; i++) {
  const d = new Date(now.getTime() - rnd(1, 120) * 86400000);
  const first = pick(FIRST), last = pick(LAST);
  await sql`
    INSERT INTO contacts (status, lang, name, email, phone, message, created_at)
    VALUES (${pick(["new","new","read","replied"])}, ${pick(LANGS)}, ${first + " " + last},
      ${`${first.toLowerCase().replace(/[^a-z]/g, "") || "guest"}@example.com`},
      ${`+41 7${rnd(6,9)} ${rnd(100,999)} ${rnd(10,99)} ${rnd(10,99)}`}, ${MSGS[i]}, ${d.toISOString()})`;
}
console.log(`✔ ${MSGS.length} iletişim mesajı eklendi`);

// Loglar
const recent = await sql`SELECT ref, dropoff, first_name, last_name, price, created_at FROM bookings WHERE ref LIKE 'DEMO-%' ORDER BY created_at DESC LIMIT 40`;
for (const r of recent) {
  await sql`
    INSERT INTO logs (kind, detail, actor, ref, created_at)
    VALUES ('booking_new',
      ${`Yeni rezervasyon talebi: ${r.ref} · Flughafen Zürich (ZRH) → ${r.dropoff} · CHF ${Number(r.price).toFixed(2)} (whatsapp) [demo]`},
      'site', ${r.ref}, ${r.created_at})`;
  if (Math.random() < 0.6) {
    const later = new Date(new Date(r.created_at).getTime() + rnd(10, 600) * 60000);
    await sql`
      INSERT INTO logs (kind, detail, actor, ref, created_at)
      VALUES ('booking_status',
        ${`${r.ref} (${r.first_name} ${r.last_name} · ${r.dropoff}) durumu "Yeni" → "Onaylandı" olarak değiştirildi [demo]`},
        'panel', ${r.ref}, ${later.toISOString()})`;
  }
}
for (let i = 0; i < 6; i++) {
  const d = new Date(now.getTime() - rnd(1, 60) * 86400000);
  await sql`
    INSERT INTO logs (kind, detail, actor, ip, created_at)
    VALUES ('login_ok', 'Panele başarıyla giriş yapıldı [demo]', 'panel', ${`46.1.${rnd(1,254)}.${rnd(1,254)}`}, ${d.toISOString()})`;
}
console.log("✔ Sistem logları eklendi");

const [{ n }] = await sql`SELECT COUNT(*)::int AS n FROM bookings WHERE ref LIKE 'DEMO-%'`;
console.log(`\n✔ TAMAM — ${n} demo rezervasyon hazır. Paneli açıp gezebilirsin.`);
console.log("  Temizlemek için:  node seed-demo.mjs --clear");
await sql.end();
