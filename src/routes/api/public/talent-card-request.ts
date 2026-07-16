import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { Resend } from 'resend'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const SITE_NAME = 'AcadHire'
const FROM_DOMAIN = 'notify.acadhire.co.in'

// Bots fill hidden fields and submit faster than a human can read the form.
const MIN_HUMAN_FILL_MS = 2500
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'hotmail.com', 'outlook.com',
  'live.com', 'rediffmail.com', 'icloud.com', 'aol.com', 'protonmail.com',
])

const BodySchema = z.object({
  candidateId: z.string().trim().min(1).max(40),
  fullName: z.string().trim().min(2).max(120),
  organizationName: z.string().trim().min(2).max(150),
  designation: z.string().trim().max(120).optional().or(z.literal('')),
  workEmail: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(20),
  organizationType: z.string().trim().min(1).max(80),
  roleConsidered: z.string().trim().min(2).max(150),
  hiringLocation: z.string().trim().max(120).optional().or(z.literal('')),
  salaryRange: z.string().trim().max(120).optional().or(z.literal('')),
  joiningTimeline: z.string().trim().max(60).optional().or(z.literal('')),
  requirementDetails: z.string().trim().min(10).max(3000),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal('')),
  formRenderedAt: z.coerce.number(),
})

export const Route = createFileRoute('/api/public/talent-card-request')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed
        try {
          parsed = BodySchema.parse(await request.json())
        } catch (e) {
          console.error('Parse error:', e)
          return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        // Honeypot tripped — silently accept without storing or notifying.
        if (parsed.website) {
          return Response.json({ success: true })
        }

        const elapsedMs = Date.now() - parsed.formRenderedAt
        const emailDomain = parsed.workEmail.split('@')[1]?.toLowerCase() ?? ''
        const isBusinessEmail = !FREE_EMAIL_DOMAINS.has(emailDomain)
        const needsManualReview = !isBusinessEmail || elapsedMs < MIN_HUMAN_FILL_MS

        const { data: inserted, error: insertError } = await supabaseAdmin
          .from('talent_card_requests')
          .insert({
            candidate_id: parsed.candidateId,
            employer_name: parsed.fullName,
            organization_name: parsed.organizationName,
            designation: parsed.designation || null,
            work_email: parsed.workEmail,
            phone: parsed.phone,
            organization_type: parsed.organizationType,
            role_considered: parsed.roleConsidered,
            hiring_location: parsed.hiringLocation || null,
            salary_range: parsed.salaryRange || null,
            joining_timeline: parsed.joiningTimeline || null,
            requirement_details: parsed.requirementDetails,
            is_business_email: isBusinessEmail,
            verification_status: needsManualReview ? 'Manual Review Required' : 'Pending',
            candidate_consent_status: 'Pending',
            request_status: 'New',
            internal_notes: !isBusinessEmail ? 'Submitted from a non-business email address — verify employer before proceeding.' : null,
          })
          .select('id')
          .single()

        if (insertError) {
          console.error('Failed to store talent card request:', insertError)
          return Response.json({ error: 'Failed to save request' }, { status: 500 })
        }

        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
          console.error('RESEND_API_KEY is not set — request stored but notification email was not sent')
          return Response.json({ success: true, requestId: inserted?.id })
        }

        const template = TEMPLATES['talent-card-request']
        const templateData = {
          candidateId: parsed.candidateId,
          submittedAt: new Date().toISOString(),
          fields: [
            { label: 'Candidate ID', value: parsed.candidateId },
            { label: 'Full Name', value: parsed.fullName },
            { label: 'Organisation', value: parsed.organizationName },
            { label: 'Designation', value: parsed.designation || '' },
            { label: 'Work Email', value: parsed.workEmail },
            { label: 'Phone', value: parsed.phone },
            { label: 'Organisation Type', value: parsed.organizationType },
            { label: 'Role Being Considered', value: parsed.roleConsidered },
            { label: 'Hiring Location', value: parsed.hiringLocation || '' },
            { label: 'Salary Range', value: parsed.salaryRange || '' },
            { label: 'Joining Timeline', value: parsed.joiningTimeline || '' },
            { label: 'Requirement Details', value: parsed.requirementDetails },
            { label: 'Verification', value: needsManualReview ? 'Manual review required' : 'Business email' },
          ],
        }

        try {
          const element = React.createElement(template.component, templateData)
          const html = await render(element)
          const text = await render(element, { plainText: true })
          const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

          const resend = new Resend(resendApiKey)
          const { error } = await resend.emails.send({
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            to: template.to!,
            replyTo: parsed.workEmail,
            subject,
            html,
            text,
          })

          if (error) {
            console.error('Resend error:', JSON.stringify(error))
          }
        } catch (err) {
          console.error('Failed to send talent card request notification:', err)
        }

        return Response.json({ success: true, requestId: inserted?.id })
      },
    },
  },
})
