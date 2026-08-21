// Veritabanı bağlantı teşhisi:  node check-db.mjs
// .env.local'ı okur, dizeyi analiz eder, bağlanmayı dener ve sorunu söyler.
import fs from "node:fs";
import postgres from "postgres";

const line = "─".repeat(60);
const ok = (m) => console.log("  ✔ " + m);
const bad = (m) => console.log("  ✘ HATA: " + m);
const info = (m) => console.log("  · " + m);

console.log(line);
console.log("VERİTABANI BAĞLANTI TEŞHİSİ");
console.log(line);

// 1) Dosya var mı?
if (!fs.existsSync(".env.local")) {
  bad(".env.local dosyası bulunamadı (proje kökünde olmalı).");
  const alt = fs.readdirSync(".").filter((f) => f.startsWith(".env"));
  if (alt.length) info("Bulunan benzer dosyalar: " + alt.join(", "));
  process.exit(1);
}
ok(".env.local bulundu");

// 2) DATABASE_URL satırını çek
const raw = fs.readFileSync(".env.local", "utf8");
const m = raw.match(/^\s*DATABASE_URL\s*=\s*(.+)$/m);
if (!m) {
  bad("DATABASE_URL satırı yok.");
  process.exit(1);
}
let url = m[1].trim().replace(/^["']|["']$/g, "").trim();
ok("DATABASE_URL satırı okundu");

// 3) Yapısal kontroller
console.log("\nDİZE ANALİZİ");
if (url.includes("[") || url.includes("]")) {
  bad("Dizede köşeli parantez var — [YOUR-PASSWORD] yer tutucusu değiştirilmemiş!");
}
let u;
try {
  u = new URL(url);
} catch {
  bad("Dize geçerli bir URL değil. Parolada özel karakter olabilir (@ : / # ?).");
  process.exit(1);
}

const user = decodeURIComponent(u.username);
const pass = decodeURIComponent(u.password ?? "");
const host = u.hostname;
const port = u.port || "5432";

info(`kullanıcı : ${user}`);
info(`sunucu    : ${host}`);
info(`port      : ${port}`);
info(`veritabanı: ${u.pathname.replace("/", "")}`);
info(`parola    : ${pass ? `${pass.length} karakter (${pass.slice(0, 2)}***${pass.slice(-2)})` : "YOK"}`);

const isPooler = host.includes("pooler.supabase.com");
const isDirect = host.startsWith("db.") && host.endsWith("supabase.co");

if (isPooler) {
  ok("Pooler adresi kullanılıyor (doğru tercih)");
  if (!user.includes(".")) bad(`Pooler'da kullanıcı "postgres.projekimligi" olmalı, ama "${user}" yazıyor.`);
  if (port !== "6543") info(`Port ${port} — transaction pooler için 6543 önerilir.`);
} else if (isDirect) {
  info("Doğrudan bağlantı (db.xxx.supabase.co) kullanılıyor.");
  info("Vercel için pooler önerilir ama yerelde çalışır.");
} else {
  bad(`Sunucu adresi Supabase'e benzemiyor: ${host}`);
}

if (/[@:/#?]/.test(pass)) {
  bad("Parolada URL'yi bozan karakter var (@ : / # ?). Parolayı sıfırlayıp harf-rakam kullan.");
}

// 4) Gerçek bağlantı denemesi
console.log("\nBAĞLANTI DENEMESİ");
const sql = postgres(url, { ssl: "require", prepare: false, max: 1, idle_timeout: 5, connect_timeout: 15 });
try {
  const [row] = await sql`SELECT current_user AS u, version() AS v`;
  ok(`BAĞLANDI! Kullanıcı: ${row.u}`);
  info(row.v.split(",")[0]);
  const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename`;
  info("Mevcut tablolar: " + (tables.map((t) => t.tablename).join(", ") || "(henüz yok — panel ilk açılışta oluşturur)"));
  console.log("\n" + line);
  console.log("SONUÇ: Bağlantı sorunsuz. 'npm run dev' ile paneli açabilirsin.");
} catch (e) {
  bad(e.message);
  console.log("\nOLASI SEBEP:");
  const msg = String(e.message).toLowerCase();
  if (msg.includes("password authentication")) {
    console.log("  Parola yanlış. Supabase → Settings → Database → Reset database password");
    console.log("  ile yeni parola üret, dizedeki parola kısmını onunla değiştir.");
  } else if (msg.includes("tenant") || msg.includes("enotfound")) {
    console.log("  Proje kimliği/sunucu adresi hatalı. Connect → Transaction pooler dizesini");
    console.log("  olduğu gibi kopyala, sadece [YOUR-PASSWORD] kısmını değiştir.");
  } else if (msg.includes("timeout") || msg.includes("econnrefused")) {
    console.log("  Ağ/güvenlik duvarı engeli ya da proje duraklatılmış olabilir.");
    console.log("  Supabase panelinde proje 'Active' mi kontrol et.");
  }
  console.log(line);
} finally {
  await sql.end({ timeout: 5 });
}
