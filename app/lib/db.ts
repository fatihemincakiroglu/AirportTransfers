// ─────────────────────────────────────────────────────────────
//  VERİTABANI — Supabase Postgres (postgres.js sürücüsü)
//  Bağlantı dizesi .env.local / Vercel'de DATABASE_URL olarak durur.
//  Supabase'in "Transaction pooler" adresi kullanılır (port 6543):
//  sunucusuz ortamda bağlantı havuzu tükenmesin diye.
//  Şema ilk sorguda otomatik oluşturulur (ayrı migration adımı yok).
// ─────────────────────────────────────────────────────────────
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  // Build sırasında değil, ilk kullanımda anlamlı hata verelim.
  console.warn("[db] DATABASE_URL tanımlı değil — panel ve kayıt devre dışı.");
}

export const dbReady = Boolean(url);

// Geliştirmede hot-reload her seferinde yeni havuz açmasın diye global'de saklanır.
const g = globalThis as unknown as { __sql?: ReturnType<typeof postgres> };

export const sql =
  g.__sql ??
  postgres(url ?? "postgres://invalid", {
    ssl: "require",
    prepare: false,   // pooler (Supavisor) transaction modunda şart
    max: 3,           // sunucusuz ortam için küçük havuz
    idle_timeout: 20,
  });

if (process.env.NODE_ENV !== "production") g.__sql = sql;

let schemaPromise: Promise<void> | null = null;

/**
 * Tabloları oluşturur (varsa dokunmaz).
 * Aynı anda birden fazla sayfa çağırabildiği için tek bir söz (promise)
 * paylaşılır; ayrıca danışma kilidi ile eşzamanlı DDL çakışması önlenir.
 */
export async function ensureSchema(): Promise<void> {
  if (!dbReady) return;
  if (!schemaPromise) {
    schemaPromise = runSchema().catch((e) => {
      // Başarısız olursa bir sonraki istekte tekrar denensin
      schemaPromise = null;
      throw e;
    });
  }
  return schemaPromise;
}

async function runSchema() {
  // Aynı anda çalışan örneklerin birbirini bozmaması için kilit
  await sql`SELECT pg_advisory_lock(918273645)`;
  try {
    await createTables();
  } finally {
    await sql`SELECT pg_advisory_unlock(918273645)`;
  }
}

async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id           SERIAL PRIMARY KEY,
      ref          TEXT UNIQUE NOT NULL,
      status       TEXT NOT NULL DEFAULT 'new',
      lang         TEXT,
      channel      TEXT,
      pickup       TEXT,
      dropoff      TEXT,
      stops        TEXT,
      ride_date    TEXT,
      ride_time    TEXT,
      pax          INT,
      luggage      INT,
      vehicle      TEXT,
      price        NUMERIC(10,2),
      payment      TEXT,
      first_name   TEXT,
      last_name    TEXT,
      email        TEXT,
      phone        TEXT,
      flight       TEXT,
      nameboard    TEXT,
      extras       TEXT,
      notes        TEXT,
      admin_note   TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  // Kabul / ret kararı
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reject_reason TEXT`;
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS decided_at    TIMESTAMPTZ`;

  // Şoför ataması ve kaynak bilgisi
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS driver_id INT`;
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS source    TEXT DEFAULT 'site'`; // site | panel
  await sql`
    CREATE TABLE IF NOT EXISTS drivers (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      phone      TEXT,
      email      TEXT,
      vehicle    TEXT,
      note       TEXT,
      active     BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  // Fatura alanları (sonradan eklendi)
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS invoice_no   TEXT`;
  await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS invoiced_at  TIMESTAMPTZ`;
  await sql`CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS bookings_status_idx  ON bookings (status)`;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      status     TEXT NOT NULL DEFAULT 'new',
      lang       TEXT,
      name       TEXT,
      email      TEXT,
      phone      TEXT,
      message    TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  // Ziyaretçi sayaçları — kişisel veri (IP) SAKLANMAZ, yalnızca toplamlar
  await sql`
    CREATE TABLE IF NOT EXISTS visits (
      day     DATE NOT NULL,
      country TEXT NOT NULL DEFAULT '??',
      city    TEXT NOT NULL DEFAULT '',
      region  TEXT NOT NULL DEFAULT '',
      lang    TEXT NOT NULL DEFAULT '',
      page    TEXT NOT NULL DEFAULT '',
      hits    INT  NOT NULL DEFAULT 0,
      PRIMARY KEY (day, country, city, region, lang, page)
    )`;
  await sql`CREATE INDEX IF NOT EXISTS visits_day_idx ON visits (day DESC)`;

  await sql`
    CREATE TABLE IF NOT EXISTS logs (
      id         SERIAL PRIMARY KEY,
      kind       TEXT NOT NULL,
      detail     TEXT,
      ip         TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`ALTER TABLE logs ADD COLUMN IF NOT EXISTS actor TEXT`; // "panel" | "site" | "sistem"
  await sql`ALTER TABLE logs ADD COLUMN IF NOT EXISTS ref   TEXT`; // ilgili rezervasyon referansı
  await sql`CREATE INDEX IF NOT EXISTS logs_created_idx ON logs (created_at DESC)`;
}

/**
 * Sistem kaydı. detail insan tarafından okunabilir Türkçe cümle olmalı.
 * actor: işlemi kimin yaptığı ("panel" = yönetici, "site" = ziyaretçi, "sistem")
 */
export async function logEvent(
  kind: string,
  detail: string,
  opts: { ip?: string; actor?: "panel" | "site" | "sistem"; ref?: string } = {},
) {
  if (!dbReady) return;
  try {
    await ensureSchema();
    await sql`
      INSERT INTO logs (kind, detail, ip, actor, ref)
      VALUES (${kind}, ${detail}, ${opts.ip ?? null}, ${opts.actor ?? "sistem"}, ${opts.ref ?? null})`;
  } catch (e) {
    console.error("[db] log yazılamadı", e);
  }
}

export const BOOKING_STATUSES = ["new", "confirmed", "done", "cancelled", "rejected"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** İsviçre KDV oranı (yolcu taşımacılığı, normal oran) */
export const VAT_RATE = 0.081;

/**
 * Panel sayfaları için: şema hazırlığı başarısız olsa bile sayfa açılsın.
 * (Tablolar zaten varsa sorgular normal çalışmaya devam eder.)
 */
export async function ensureSchemaSafe(): Promise<void> {
  try {
    await ensureSchema();
  } catch (e) {
    console.error("[db] şema hazırlanamadı", e);
  }
}
