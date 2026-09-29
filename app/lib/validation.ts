// İletişim bilgisi doğrulaması — tarayıcı ve sunucu aynı kuralları kullanır.
// Telefon: uluslararası E.164 (ülke kodu dahil en fazla 15 rakam); ülke kodu ayrı seçildiği için
// yerel kısım 5–13 rakam, toplam 8–15 rakam. E-posta: ad@alan.uzantı biçimi zorunlu.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
export const isValidEmail = (v: string) => EMAIL_RE.test(v.trim());

export const digitsOf = (v: string) => v.replace(/\D/g, "");

/** Yerel numara (ülke kodu hariç) uzunluk kontrolü */
export function phoneIssue(local: string, dial = "+41"): "empty" | "short" | "long" | null {
  const d = digitsOf(local);
  if (!d) return "empty";
  if (d.length < 5) return "short";
  if (d.length > 13 || digitsOf(dial).length + d.length > 15) return "long";
  return null;
}

/** Sunucu: birleşik numara ("+41 76 …") — toplam 8–15 rakam */
export function isValidFullPhone(v: string): boolean {
  const d = digitsOf(v);
  return d.length >= 8 && d.length <= 15;
}

/** Sunucu: tam kayıt için zorunlu alanlar; eksik/geçersiz alan adlarını döner */
export function contactProblems(b: Record<string, unknown>): string[] {
  const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const out: string[] = [];
  if (!s("firstName")) out.push("firstName");
  if (!s("lastName")) out.push("lastName");
  if (!isValidEmail(s("email"))) out.push("email");
  if (!isValidFullPhone(s("phone"))) out.push("phone");
  return out;
}
