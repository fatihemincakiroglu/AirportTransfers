// İletişim bilgisi doğrulaması — tarayıcı ve sunucu aynı kuralları kullanır.
// Telefon: biçim/uzunluk/karakter sınırı YOK; yalnızca boş olmamalı (müşteri numarayı istediği
// gibi yazabilir: +, boşluk, tire, parantez, dahili numara vb.). E-posta: ad@alan.uzantı zorunlu.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
export const isValidEmail = (v: string) => EMAIL_RE.test(v.trim());

export const digitsOf = (v: string) => v.replace(/\D/g, "");

/** Telefon: yalnızca boş olup olmadığına bakılır */
export function phoneIssue(local: string): "empty" | null {
  return local.trim() ? null : "empty";
}

/** Sunucu: birleşik numara — yalnızca boş olmamalı */
export function isValidFullPhone(v: string): boolean {
  return v.trim().length > 0;
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
