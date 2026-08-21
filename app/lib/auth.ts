// ─────────────────────────────────────────────────────────────
//  ADMIN OTURUMU — imzalı çerez (harici kütüphane yok)
//  Ortam değişkenleri:
//    ADMIN_PASSWORD  → panele giriş parolası
//    AUTH_SECRET     → çerez imzası için rastgele uzun bir dize
// ─────────────────────────────────────────────────────────────
import { cookies } from "next/headers";

export const SESSION_COOKIE = "at_admin";
const MAX_AGE = 60 * 60 * 12; // 12 saat

const enc = new TextEncoder();

async function hmac(data: string): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "";
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(new Uint8Array(sig)).toString("base64url");
}

/** Parola doğru mu? (sabit süreli karşılaştırma) */
export function checkPassword(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD ?? "";
  if (!real || input.length !== real.length) return false;
  let diff = 0;
  for (let i = 0; i < real.length; i++) diff |= input.charCodeAt(i) ^ real.charCodeAt(i);
  return diff === 0;
}

/** Oturum jetonu üretir: <bitiş zamanı>.<imza> */
export async function createToken(): Promise<string> {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${await hmac(exp)}`;
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.AUTH_SECRET) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return (await hmac(exp)) === sig;
}

/** Sunucu bileşenlerinde/route'larda oturum kontrolü */
export async function isLoggedIn(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
