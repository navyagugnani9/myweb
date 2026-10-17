import { createHash } from "node:crypto";

/** Resend retains these keys for 24 hours, including across server instances. */
export function deliveryKey(payload: unknown): string {
  return `website-form/${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

export async function deliverEmail(
  apiKey: string,
  email: Record<string, unknown>,
  key: string,
  transport: typeof fetch = fetch,
): Promise<string> {
  const response = await transport("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(10_000),
  });
  const result = (await response.json()) as { id?: string; name?: string };
  if (!response.ok || !result.id) {
    // Record status/type only: never log addresses, form contents or credentials.
    console.error("Form email delivery failed", response.status, result.name);
    throw new Error("Email delivery could not be confirmed");
  }
  return result.id;
}
