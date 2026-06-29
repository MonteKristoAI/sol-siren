// Admin session auth — HMAC-signed cookie, no external dependency.
// Runs in both the Edge runtime (middleware) and Node runtime (route handlers)
// because it only uses Web Crypto + base64 globals available in both.

const COOKIE = "ss_admin";
const TTL_DAYS = 30;

function enc(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToStr(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET not set");
  return s;
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc(data));
  return b64url(sig);
}

// constant-time string compare
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export const COOKIE_NAME = COOKIE;

export type Session = { u: string; iat: number; exp: number };

export async function createSession(user = "erin"): Promise<{ value: string; maxAge: number }> {
  const now = Math.floor(Date.now() / 1000);
  const maxAge = TTL_DAYS * 24 * 60 * 60;
  const payload: Session = { u: user, iat: now, exp: now + maxAge };
  const body = b64url(enc(JSON.stringify(payload)));
  const mac = await sign(body);
  return { value: `${body}.${mac}`, maxAge };
}

export async function verifySession(token: string | undefined | null): Promise<Session | null> {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  let expected: string;
  try {
    expected = await sign(body);
  } catch {
    return null;
  }
  if (!safeEqual(mac, expected)) return null;
  try {
    const payload = JSON.parse(b64urlToStr(body)) as Session;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// Verify the submitted password against ADMIN_PASSWORD (constant-time).
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  return safeEqual(submitted, expected);
}
