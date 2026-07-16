export interface TalentCardRequestParams {
  candidateId: string
  fullName: string
  organizationName: string
  designation?: string
  workEmail: string
  phone: string
  organizationType: string
  roleConsidered: string
  hiringLocation?: string
  salaryRange?: string
  joiningTimeline?: string
  requirementDetails: string
  consent: boolean
  website?: string // honeypot — must stay empty
  formRenderedAt: number
}

export async function submitTalentCardRequest(params: TalentCardRequestParams): Promise<void> {
  const res = await fetch('/api/public/talent-card-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`)
  }
}
