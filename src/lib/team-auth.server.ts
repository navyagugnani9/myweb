// Lightweight shared-password gate for internal team tools — no user
// accounts, just one secret known to AcadHire staff. Not for anything
// beyond low-stakes internal utilities.

const COOKIE_NAME = "team_session";
const SALT = "acadhire-team-tool";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function expectedToken(): Promise<string | null> {
  const password = process.env.TEAM_ACCESS_PASSWORD;
  if (!password) return null;
  return sha256Hex(`${password}:${SALT}`);
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = await expectedToken();
  if (!expected) return false;
  return expected === (await sha256Hex(`${candidate}:${SALT}`));
}

export async function sessionCookieHeader(): Promise<string> {
  const token = await expectedToken();
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function clearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const expected = await expectedToken();
  if (!expected) return false;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return !!match && match[1] === expected;
}
