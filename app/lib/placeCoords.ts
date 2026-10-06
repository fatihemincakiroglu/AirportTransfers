// ─────────────────────────────────────────────────────────────
//  SEÇİLEN YERLERİN KOORDİNATLARI (yalnızca tarayıcı)
//  Müşteri listeden bir öneri seçtiğinde o noktanın koordinatı burada saklanır.
//  Mesafe/fiyat hesabı metni yeniden aramak yerine bu koordinatı kullanır;
//  böylece "doğru yeri seçtim ama fiyat başka yere göre çıktı" hatası olmaz.
//  sessionStorage: ana sayfadan rezervasyon sayfasına geçişte de korunur.
// ─────────────────────────────────────────────────────────────
import { norm } from "./places";

const KEY = "place-coords-v1";
const mem = new Map<string, [number, number]>();
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) for (const [k, v] of Object.entries(JSON.parse(raw) as Record<string, [number, number]>)) mem.set(k, v);
  } catch { /* depolama kapalıysa yalnızca bellekte tutulur */ }
}

function save() {
  try {
    // En son 40 kayıt yeter
    const entries = [...mem.entries()].slice(-40);
    window.sessionStorage.setItem(KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch { /* yok say */ }
}

export function rememberPlace(text: string, lat?: number, lon?: number) {
  if (typeof lat !== "number" || typeof lon !== "number") return;
  load();
  const k = norm(text);
  mem.delete(k);
  mem.set(k, [lat, lon]);
  save();
}

/** Metin, listeden seçilen öneriyle aynıysa koordinatı döner; müşteri sonradan değiştirdiyse null */
export function recallPlace(text: string): { lat: number; lon: number } | null {
  load();
  const v = mem.get(norm(text));
  return v ? { lat: v[0], lon: v[1] } : null;
}

/** Sunucuya gönderilecek ipuçları: { "metin": [lat, lon] } — sunucu bunları doğrulayarak kullanır */
export function coordHints(texts: string[]): Record<string, [number, number]> {
  load();
  const out: Record<string, [number, number]> = {};
  for (const t of texts) {
    const v = mem.get(norm(t));
    if (v) out[t] = v;
  }
  return out;
}
