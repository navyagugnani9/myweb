import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { Resend } from 'resend'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'
import { CONFIRMATIONS, FormConfirmationEmail } from '@/lib/email-templates/form-confirmation'

const SITE_NAME = 'AcadHire'
const FROM_DOMAIN = 'notify.acadhire.co.in'
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024

const FieldSchema = z.object({
  label: z.string().min(1).max(120),
  value: z.string().max(5000),
})

const AttachmentSchema = z.object({
  filename: z.string().min(1).max(255),
  content: z.string().min(1),
})

const BodySchema = z.object({
  formType: z.enum(['Candidate Registration', 'Employer Requirement', 'Contact']),
  fields: z.array(FieldSchema).min(1).max(40),
  attachment: AttachmentSchema.optional(),
})

export const Route = createFileRoute('/api/public/form-submission')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const resendApiKey = process.env.RESEND_API_KEY

        if (!resendApiKey) {
          console.error('RESEND_API_KEY is not set')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed
        try {
          parsed = BodySchema.parse(await request.json())
        } catch (e) {
          console.error('Parse error:', e)
          return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        if (parsed.attachment) {
          const approxBytes = (parsed.attachment.content.length * 3) / 4
          if (approxBytes > MAX_ATTACHMENT_BYTES) {
            return Response.json({ error: 'Attachment too large' }, { status: 400 })
          }
        }

        const emailField = parsed.fields.find((field) => field.label === 'Email')
        const recipient = z.string().trim().email().safeParse(emailField?.value)
        if (!recipient.success) {
          return Response.json({ error: 'A valid email address is required' }, { status: 400 })
        }

        const template = TEMPLATES['form-notification']
        if (!template || !template.to) {
          return Response.json({ error: 'Notification template unavailable' }, { status: 500 })
        }

        const templateData = {
          formType: parsed.formType,
          fields: parsed.fields,
          submittedAt: new Date().toISOString(),
        }

        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject =
          typeof template.subject === 'function'
            ? template.subject(templateData)
            : template.subject

        try {
          const resend = new Resend(resendApiKey)
          const { error } = await resend.emails.send({
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            to: template.to,
            replyTo: recipient.data,
            subject,
            html,
            text,
            attachments: parsed.attachment
              ? [{ filename: parsed.attachment.filename, content: parsed.attachment.content }]
              : undefined,
          })

          if (error) {
            console.error('Resend error:', JSON.stringify(error))
            return Response.json({ error: 'Failed to send' }, { status: 500 })
          }
        } catch (err) {
          console.error('Failed to send email:', err)
          return Response.json({ error: 'Failed to send' }, { status: 500 })
        }

        // A confirmation failure must not ask the visitor to resubmit an
        // application that has already reached the recruitment team.
        try {
          const confirmation = CONFIRMATIONS[parsed.formType]
          const confirmationElement = React.createElement(FormConfirmationEmail, { formType: parsed.formType })
          const { error } = await new Resend(resendApiKey).emails.send({
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            to: recipient.data,
            replyTo: template.to,
            subject: confirmation.subject,
            html: await render(confirmationElement),
            text: await render(confirmationElement, { plainText: true }),
          })
          if (error) console.error('Form confirmation failed:', error.name, error.message)
        } catch (error) {
          console.error('Form confirmation failed:', error)
        }

        return Response.json({ success: true })
      },
    },
  },
})
