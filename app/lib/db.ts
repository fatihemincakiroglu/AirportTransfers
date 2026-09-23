// ─────────────────────────────────────────────────────────────
//  VERİTABANI — Supabase Postgres (postgres.js sürücüsü)
//  Bağlantı dizesi .env.local / Vercel'de DATABASE_URL olarak durur.
//  Supabase'in "Transaction pooler" adresi kullanılır (port 6543):
//  sunucusuz ortamda bağlantı havuzu tükenmesin diye.
//  Şema ilk sorguda otomatik oluşturulur (ayrı migration adımı yok).
// ─────────────────────────────────────────────────────────────
import postgres, { type TransactionSql } from "postgres";

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
 * Şema sürümü. Tablo/kolon eklediğinde BU SAYIYI ARTIR; aksi hâlde yeni DDL çalışmaz.
 * Sürüm veritabanındaki `schema_meta` ile eşleşiyorsa hiçbir DDL çalışmaz (tek SELECT).
 */
const SCHEMA_VERSION = 3;

/**
 * Tabloları oluşturur (varsa dokunmaz).
 * - Süreç başına tek söz (promise) paylaşılır.
 * - Hızlı yol: schema_meta.version güncelse DDL hiç çalışmaz — her sunucu örneğinin
 *   40 ALTER/CREATE çalıştırıp tabloları kilitlemesi bu şekilde önlenir.
 * - Güncelleme gerekiyorsa TEK transaction içinde pg_advisory_xact_lock ile yapılır:
 *   transaction pooler'da (Supavisor) oturum düzeyi pg_advisory_lock güvenilmez,
 *   kilit başka bağlantıda kalıp herkesi 300 sn bekletebilir (14.09.2026'da yaşandı).
 */
export async function ensureSchema(): Promise<void> {
  if (!dbReady) return;
  if (!schemaPromise) {
    schemaPromise = runSchema().catch((e) => {
      schemaPromise = null; // bir sonraki istekte tekrar denensin
      throw e;
    });
  }
  return schemaPromise;
}

async function currentVersion(): Promise<number> {
  try {
    const rows = (await sql`SELECT version FROM schema_meta WHERE id = 1`) as unknown as { version: number }[];
    return rows[0]?.version ?? 0;
  } catch {
    return 0; // tablo yok → ilk kurulum
  }
}

async function runSchema() {
  if ((await currentVersion()) >= SCHEMA_VERSION) return;
  await sql.begin(async (tx) => {
    await tx`SELECT pg_advisory_xact_lock(918273645)`;
    await tx`CREATE TABLE IF NOT EXISTS schema_meta (id INT PRIMARY KEY, version INT NOT NULL DEFAULT 0)`;
    const rows = (await tx`SELECT version FROM schema_meta WHERE id = 1`) as unknown as { version: number }[];
    if ((rows[0]?.version ?? 0) >= SCHEMA_VERSION) return; // kilidi bekleyen ikinci örnek: iş bitmiş
    await createTables(tx);
    await tx`
      INSERT INTO schema_meta (id, version) VALUES (1, ${SCHEMA_VERSION})
      ON CONFLICT (id) DO UPDATE SET version = EXCLUDED.version`;
  });
}

async function createTables(tx: TransactionSql) {
  await tx`
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
  // Stripe online ödeme
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status  TEXT DEFAULT 'none'`; // none|pending|paid|refunded
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_session  TEXT`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_intent   TEXT`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS paid_at         TIMESTAMPTZ`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refunded_at     TIMESTAMPTZ`;

  // Google Takvim senkronu
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS google_event_id TEXT`;

  // Kabul / ret kararı
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reject_reason TEXT`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS decided_at    TIMESTAMPTZ`;

  // Şoför ataması ve kaynak bilgisi
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS driver_id INT`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS source    TEXT DEFAULT 'site'`; // site | panel
  await tx`
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
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS invoice_no   TEXT`;
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS invoiced_at  TIMESTAMPTZ`;
  await tx`CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC)`;
  await tx`CREATE INDEX IF NOT EXISTS bookings_status_idx  ON bookings (status)`;

  await tx`
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
  await tx`
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
  await tx`CREATE INDEX IF NOT EXISTS visits_day_idx ON visits (day DESC)`;

  await tx`
    CREATE TABLE IF NOT EXISTS logs (
      id         SERIAL PRIMARY KEY,
      kind       TEXT NOT NULL,
      detail     TEXT,
      ip         TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await tx`ALTER TABLE logs ADD COLUMN IF NOT EXISTS actor TEXT`; // "panel" | "site" | "sistem"
  await tx`ALTER TABLE logs ADD COLUMN IF NOT EXISTS ref   TEXT`; // ilgili rezervasyon referansı
  await tx`CREATE INDEX IF NOT EXISTS logs_created_idx ON logs (created_at DESC)`;

  // ── Ölçüm (Data Layer spec v1.3.5, Faz 2: backend hattı) ──
  // Rezervasyon/lead kaydında yakalanan kimlik ve onay anlık görüntüsü (yalnızca izinli alanlar)
  for (const table of ["bookings", "contacts"]) {
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS ga_client_id  TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS ga_session_id TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS fbp           TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS fbc           TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS client_ip     TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS client_ua     TEXT`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS consent       JSONB`;
    await tx`ALTER TABLE ${tx(table)} ADD COLUMN IF NOT EXISTS source_url    TEXT`;
  }
  // İş olayı kutusu: her yaşam döngüsü olayı bir kez, değişmez
  await tx`
    CREATE TABLE IF NOT EXISTS analytics_outbox (
      id          SERIAL PRIMARY KEY,
      environment TEXT NOT NULL,
      event_name  TEXT NOT NULL,
      event_id    TEXT NOT NULL,
      occurred_at TIMESTAMPTZ NOT NULL,
      ref         TEXT,
      payload     JSONB NOT NULL,
      match       JSONB,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (environment, event_id)
    )`;
  // Hedef başına teslimat durumu (ga4 | meta_capi)
  await tx`
    CREATE TABLE IF NOT EXISTS analytics_delivery (
      id               SERIAL PRIMARY KEY,
      outbox_id        INT NOT NULL REFERENCES analytics_outbox(id) ON DELETE CASCADE,
      destination      TEXT NOT NULL,
      status           TEXT NOT NULL DEFAULT 'pending',
      reason           TEXT,
      attempt_count    INT NOT NULL DEFAULT 0,
      next_attempt_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_attempt_at  TIMESTAMPTZ,
      accepted_at      TIMESTAMPTZ,
      last_http_status INT,
      last_error       TEXT,
      expires_at       TIMESTAMPTZ NOT NULL,
      UNIQUE (outbox_id, destination)
    )`;
  await tx`CREATE INDEX IF NOT EXISTS analytics_delivery_due_idx ON analytics_delivery (status, next_attempt_at)`;
  // Yolculuk sonrası değerlendirme e-postası gönderim zamanı (cron)
  await tx`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS review_mail_at TIMESTAMPTZ`;
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

export const BOOKING_STATUSES = ["new", "confirmed", "done", "cancelled", "rejected", "no_show"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** İsviçre KDV oranı (yolcu taşımacılığı, normal oran) */
export { VAT_RATE } from "../config";

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
