import { createHash } from "node:crypto";

// Lightweight shared-password gate for internal team tools — no user
// accounts, just one secret known to AcadHire staff. Not for anything
// beyond low-stakes internal utilities.

const COOKIE_NAME = "team_session";
const SALT = "acadhire-team-tool";

function expectedToken(): string | null {
  const password = process.env.TEAM_ACCESS_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`${password}:${SALT}`).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const expected = expectedToken();
  return !!expected && expected === createHash("sha256").update(`${candidate}:${SALT}`).digest("hex");
}

export function sessionCookieHeader(): string {
  const token = expectedToken();
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function clearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export function isAuthenticated(request: Request): boolean {
  const expected = expectedToken();
  if (!expected) return false;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return !!match && match[1] === expected;
}
