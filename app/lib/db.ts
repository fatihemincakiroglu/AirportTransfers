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
  schemaChecked = true;
}

/** Sistem kaydı (giriş denemeleri, durum değişiklikleri vb.) */
export async function logEvent(kind: string, detail: string, ip?: string) {
  if (!dbReady) return;
  try {
    await ensureSchema();
    await sql`INSERT INTO logs (kind, detail, ip) VALUES (${kind}, ${detail}, ${ip ?? null})`;
  } catch (e) {
    console.error("[db] log yazılamadı", e);
  }
}

export const BOOKING_STATUSES = ["new", "confirmed", "done", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
