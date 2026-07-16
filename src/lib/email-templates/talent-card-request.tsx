import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'AcadHire'
const NOTIFY_TO = 'recruitment@acadhire.co.in'

interface TalentCardRequestProps {
  candidateId?: string
  fields?: Array<{ label: string; value: string }>
  submittedAt?: string
}

const TalentCardRequestEmail = ({
  candidateId = '',
  fields = [],
  submittedAt,
}: TalentCardRequestProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New Talent Card request for Candidate {candidateId}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Talent Card Request</Heading>
        <Text style={text}>
          An employer has requested the complete profile for Candidate {candidateId} on {SITE_NAME}.
        </Text>
        {submittedAt && <Text style={meta}>Submitted: {submittedAt}</Text>}
        <Hr style={hr} />
        <Section>
          {fields.map((f, i) => (
            <Section key={i} style={fieldRow}>
              <Text style={fieldLabel}>{f.label}</Text>
              <Text style={fieldValue}>{f.value || '—'}</Text>
            </Section>
          ))}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Review this request, verify the employer, confirm candidate consent, and update the request status before sharing any profile details.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TalentCardRequestEmail,
  subject: (data: Record<string, any>) => `New Talent Card Request: Candidate ${data?.candidateId || ''}`,
  to: NOTIFY_TO,
  displayName: 'Talent Card profile request notification',
  previewData: {
    candidateId: 'AH 1042',
    submittedAt: new Date().toISOString(),
    fields: [
      { label: 'Organisation', value: 'Orchid International School' },
      { label: 'Contact', value: 'Jane Doe' },
      { label: 'Work Email', value: 'jane@orchidschool.edu' },
      { label: 'Requirement', value: 'Looking for an Admissions Manager for our Pune campus.' },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0a2540', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#333', lineHeight: '1.5', margin: '0 0 8px' }
const meta = { fontSize: '12px', color: '#666', margin: '0 0 8px' }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const fieldRow = { margin: '0 0 12px' }
const fieldLabel = { fontSize: '11px', color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 2px' }
const fieldValue = { fontSize: '14px', color: '#111', margin: '0', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '11px', color: '#999', margin: '20px 0 0' }
