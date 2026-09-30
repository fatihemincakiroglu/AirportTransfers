// Zürih saat dilimi yardımcıları — tarayıcı ve sunucu aynı kuralları kullanır.
// Formdaki tarih/saat her zaman Zürih yerel saatidir; müşterinin ya da sunucunun
// (Vercel = UTC) saat dilimi hesaba karışmaz.

export const ZRH_TZ = "Europe/Zurich";

/** Online rezervasyon için alışa en az kalması gereken süre (dakika). Daha kısası WhatsApp'a yönlenir. */
export const MIN_LEAD_MINUTES = 60;

/** Verilen andaki Zürih yerel tarih ve saati: { date: "YYYY-MM-DD", time: "HH:MM" } */
export function zurichParts(ms: number = Date.now()): { date: string; time: string } {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: ZRH_TZ, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}

/** Zürih'in verilen andaki UTC farkı (dakika; yaz +120, kış +60) */
function offsetMinutes(ms: number): number {
  const { date, time } = zurichParts(ms);
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  return Math.round((Date.UTC(y, m - 1, d, h, mi) - Math.floor(ms / 60_000) * 60_000) / 60_000);
}

/** Zürih yerel "YYYY-MM-DD" + "HH:MM" → gerçek an (epoch ms). Geçersizse NaN. */
export function zurichToMs(date: string, time: string): number {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const tm = /^(\d{2}):(\d{2})/.exec(time);
  if (!dm || !tm) return NaN;
  const naive = Date.UTC(+dm[1], +dm[2] - 1, +dm[3], +tm[1], +tm[2]);
  // Yaz/kış saati geçişi için iki tur
  let ms = naive - offsetMinutes(naive) * 60_000;
  ms = naive - offsetMinutes(ms) * 60_000;
  return ms;
}

/** Tarih+saat (Zürih) geçmişte mi? Saat boşsa günün sonu kabul edilir. */
export function isPastZurich(date: string, time: string, graceMinutes = 0): boolean {
  if (!date) return false;
  const t = zurichToMs(date, time || "23:59");
  return Number.isFinite(t) && t < Date.now() - graceMinutes * 60_000;
}

/** Alışa MIN_LEAD_MINUTES'tan az mı kaldı? (geçmiş anlar da true döner; önce isPastZurich'e bakın) */
export function isTooSoonZurich(date: string, time: string, graceMinutes = 0): boolean {
  if (!date || !time) return false;
  const t = zurichToMs(date, time);
  return Number.isFinite(t) && t < Date.now() + (MIN_LEAD_MINUTES - graceMinutes) * 60_000;
}

/** Online rezervasyonun kabul edilebileceği en erken an (Zürih yerel) */
export const earliestBookable = () => zurichParts(Date.now() + MIN_LEAD_MINUTES * 60_000);
