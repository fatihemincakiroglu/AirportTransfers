// ─────────────────────────────────────────────────────────────
//  E-POSTA İŞLEM JETONU
//  Bildirim e-postasındaki "Kabul et / Reddet" bağlantılarını imzalar.
//  Panele giriş yapmadan tek tıkla karar verilmesini sağlar; jeton
//  yalnızca ilgili rezervasyon + işlem için geçerlidir.
// ─────────────────────────────────────────────────────────────
import crypto from "node:crypto";

export type MailAction = "confirm" | "reject";

export function actionToken(id: number, action: MailAction): string {
  const secret = process.env.AUTH_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(`${id}:${action}`).digest("base64url");
}

export function verifyActionToken(id: number, action: MailAction, token: string): boolean {
  if (!process.env.AUTH_SECRET || !token) return false;
  const expected = actionToken(id, action);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
