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

let schemaChecked = false;

/** Tabloları oluşturur (varsa dokunmaz). Her sorgudan önce bir kez çalışır. */
export async function ensureSchema() {
  if (schemaChecked || !dbReady) return;
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
  schemaChecked = true;
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

export const BOOKING_STATUSES = ["new", "confirmed", "done", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** İsviçre KDV oranı (yolcu taşımacılığı, normal oran) */
export const VAT_RATE = 0.081;
