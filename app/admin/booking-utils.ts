// Sunucu ve istemci tarafında ortak yardımcılar (bu dosya "use client" DEĞİL).
/** Rezervasyon = ad, soyad, e-posta ve telefon dolu. Eksikler "Yarım Kalanlar" sayfasında. */
export const isComplete = (r: { first_name?: string | null; last_name?: string | null; email?: string | null; phone?: string | null }) =>
  Boolean(r.first_name?.trim() && r.last_name?.trim() && r.email?.trim() && r.phone?.trim());
