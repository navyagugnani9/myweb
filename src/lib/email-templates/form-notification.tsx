import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'AcadHire'
const NOTIFY_TO = 'recruitment@acadhire.co.in'

interface FormNotificationProps {
  formType?: string
  fields?: Array<{ label: string; value: string }>
  submittedAt?: string
}

const FormNotificationEmail = ({
  formType = 'Form',
  fields = [],
  submittedAt,
}: FormNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {formType} submission on {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New {formType} submission</Heading>
        <Text style={text}>
          A new submission was received on the {SITE_NAME} website.
        </Text>
        {submittedAt && (
          <Text style={meta}>Submitted: {submittedAt}</Text>
        )}
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
        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: FormNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New ${data?.formType || 'form'} submission — ${SITE_NAME}`,
  to: NOTIFY_TO,
  displayName: 'Form submission notification',
  previewData: {
    formType: 'Contact',
    submittedAt: new Date().toISOString(),
    fields: [
      { label: 'Name', value: 'Jane Doe' },
      { label: 'Email', value: 'jane@example.com' },
      { label: 'Message', value: 'Hello, I have a question.' },
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
