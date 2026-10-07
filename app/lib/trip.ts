// ─────────────────────────────────────────────────────────────
//  GÜZERGÂH ÇÖZÜMLEME — rezervasyon sayfası ve yazı içi fiyat hesaplayıcı ortak kullanır.
//  Aynı fonksiyon kullanıldığı için hesaplayıcıda görülen fiyat rezervasyon adımındakiyle aynıdır.
// ─────────────────────────────────────────────────────────────
import { routes } from "../config";
import { norm } from "../components";

/**
 * Serbest metin uçları sabit rotayla eşleştirir (aksan duyarsız, iki dilde).
 * Eşleşme yoksa özel güzergâh döner. Hem URL ön-doldurmada hem de
 * adım 1'deki "İleri" düğmesinde kullanılır.
 */
export function resolveTrip(from: string, to: string): { idx: number; rev: boolean; custom: { from: string; to: string } | null } {
  const isAirport = (s: string) => /zrh|flughafen|airport/.test(norm(s));
  const findIdx = (s: string) =>
    s
      ? routes.findIndex((r) => {
          const names = typeof r.to === "string" ? [r.to] : [r.to.de, r.to.en];
          return names.some((nm) => norm(s).includes(norm(nm)) || norm(nm).includes(norm(s)));
        })
      : -1;
  const fromAir = isAirport(from);
  const toAir = isAirport(to);
  let idx = -1;
  let rev = false;
  if (from && to && !fromAir && !toAir) {
    // İki uç da havalimanı değil → sabit rota yok, özel güzergâh
    return { idx: -1, rev: false, custom: { from, to } };
  }
  if (toAir && from) {
    idx = findIdx(from);            // Basel → ZRH
    if (idx >= 0) rev = true;
  } else if (to) {
    idx = findIdx(to);              // ZRH → Basel
  } else if (from && !fromAir) {
    idx = findIdx(from);            // sadece kalkış yazılmış: şehir → ZRH varsay
    if (idx >= 0) rev = true;
  }
  if (idx >= 0) return { idx, rev, custom: null };
  if (from || to) return { idx: -1, rev: false, custom: { from: from || "", to: to || "" } };
  return { idx: -1, rev: false, custom: null };
}

