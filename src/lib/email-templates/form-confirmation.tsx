import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'

export const CONFIRMATIONS = {
  'Candidate Registration': {
    subject: 'We have received your profile | AcadHire',
    message: 'Thank you for registering with AcadHire. We have received your profile. Our team will review your details and contact you if a suitable opportunity matches your experience and interests.',
  },
  'Employer Requirement': {
    subject: 'We have received your hiring requirements | AcadHire',
    message: 'Thank you for sharing your hiring requirements with AcadHire. Our team will review the details and get in touch to discuss your recruitment needs.',
  },
  Contact: {
    subject: 'Thank you for contacting AcadHire',
    message: 'Thank you for reaching out to AcadHire. We have received your enquiry, and our team will respond shortly.',
  },
} as const

export function FormConfirmationEmail({ formType }: { formType: keyof typeof CONFIRMATIONS }) {
  const confirmation = CONFIRMATIONS[formType]
  return (
    <Html lang="en">
      <Head />
      <Preview>{confirmation.subject}</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#333333' }}>
        <Container style={{ padding: '24px', maxWidth: '600px' }}>
          <Heading style={{ fontSize: '22px', color: '#0a2540' }}>{confirmation.subject}</Heading>
          <Text>Hello,</Text>
          <Text style={{ fontSize: '14px', lineHeight: '1.6' }}>{confirmation.message}</Text>
          <Text>If you would like to add any information, you can reply to this email.</Text>
          <Text>Best regards,<br />Team AcadHire</Text>
        </Container>
      </Body>
    </Html>
  )
}
