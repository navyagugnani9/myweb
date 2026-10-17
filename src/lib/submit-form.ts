/**
 * Submit a form to the public notification endpoint.
 * Sends an email with optional file attachment via Resend.
 */

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5MB

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function submitFormNotification(params: {
  formType: string;
  fields: Array<{ label: string; value: string | number | undefined | null }>;
  attachment?: File | null;
}): Promise<void> {
  const cleanFields = params.fields.map((f) => ({
    label: f.label,
    value: f.value == null || f.value === "" ? "—" : String(f.value),
  }));

  let attachment: { filename: string; content: string } | undefined;

  if (params.attachment && params.attachment.size > 0) {
    if (params.attachment.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Attachment exceeds 5MB limit");
    }
    attachment = {
      filename: params.attachment.name,
      content: await fileToBase64(params.attachment),
    };
  }

  const body = JSON.stringify({ formType: params.formType, fields: cleanFields, attachment });
  // Coalesce overlapping clicks before React has updated the button state.
  const existing = pendingSubmissions.get(body);
  if (existing) return existing;
  const submission = sendSubmission(body);
  pendingSubmissions.set(body, submission);
  try {
    await submission;
  } finally {
    pendingSubmissions.delete(body);
  }
}

const pendingSubmissions = new Map<string, Promise<void>>();

async function sendSubmission(body: string): Promise<void> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/public/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(30_000),
      });
      if (res.status >= 500 && attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        continue;
      }
      if (!res.ok)
        throw new Error(
          "We could not confirm delivery. Please retry with the same details, or contact recruitment@acadhire.co.in.",
        );
      const result = await res.json();
      if (result.success !== true || typeof result.receipt !== "string" || !result.receipt) {
        throw new Error(
          "We could not confirm delivery. Please retry with the same details, or contact recruitment@acadhire.co.in.",
        );
      }
      return;
    } catch (error) {
      if (
        attempt === 0 &&
        (error instanceof TypeError || (error instanceof Error && error.name === "TimeoutError"))
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        continue;
      }
      throw new Error(
        "We could not confirm delivery. Please retry with the same details, or contact recruitment@acadhire.co.in.",
      );
    }
  }
}
