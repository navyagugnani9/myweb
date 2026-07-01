/**
 * Submit a form to the public notification endpoint.
 * Sends an email with optional file attachment via Resend.
 */

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024 // 5MB

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export async function submitFormNotification(params: {
  formType: string
  fields: Array<{ label: string; value: string | number | undefined | null }>
  attachment?: File | null
}): Promise<void> {
  const cleanFields = params.fields.map((f) => ({
    label: f.label,
    value: f.value == null || f.value === '' ? '—' : String(f.value),
  }))

  let attachment: { filename: string; content: string } | undefined

  if (params.attachment && params.attachment.size > 0) {
    if (params.attachment.size > MAX_ATTACHMENT_BYTES) {
      throw new Error('Attachment exceeds 5MB limit')
    }
    attachment = {
      filename: params.attachment.name,
      content: await fileToBase64(params.attachment),
    }
  }

  const res = await fetch('/api/public/form-submission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: params.formType,
      fields: cleanFields,
      attachment,
    }),
  })

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`)
  }
}
