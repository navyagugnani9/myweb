import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [{ title: 'Unsubscribe | AcadHire' }],
  }),
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const [state, setState] = useState<'loading' | 'valid' | 'invalid' | 'already' | 'success' | 'error'>('loading')
  const [submitting, setSubmitting] = useState(false)

  const token = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('token') : null

  useEffect(() => {
    if (!token) { setState('invalid'); return }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}))
        if (!r.ok) { setState('invalid'); return }
        if (data.valid) setState('valid')
        else if (data.reason === 'already_unsubscribed') setState('already')
        else setState('invalid')
      })
      .catch(() => setState('error'))
  }, [token])

  const confirm = async () => {
    if (!token) return
    setSubmitting(true)
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.success) setState('success')
      else if (data.reason === 'already_unsubscribed') setState('already')
      else setState('error')
    } catch {
      setState('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container-prose max-w-md">
        <Card className="p-8 text-center">
          {state === 'loading' && <p className="text-body">Checking your link…</p>}
          {state === 'valid' && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Unsubscribe</h1>
              <p className="mt-3 text-body">Click below to confirm you no longer want to receive emails from AcadHire.</p>
              <Button onClick={confirm} disabled={submitting} className="mt-6 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
                {submitting ? 'Processing…' : 'Confirm unsubscribe'}
              </Button>
            </>
          )}
          {state === 'already' && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Already unsubscribed</h1>
              <p className="mt-3 text-body">This email address is already unsubscribed.</p>
            </>
          )}
          {state === 'success' && (
            <>
              <h1 className="text-2xl font-bold text-foreground">You're unsubscribed</h1>
              <p className="mt-3 text-body">You won't receive further emails from AcadHire.</p>
            </>
          )}
          {state === 'invalid' && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Invalid link</h1>
              <p className="mt-3 text-body">This unsubscribe link is invalid or has expired.</p>
            </>
          )}
          {state === 'error' && (
            <>
              <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
              <p className="mt-3 text-body">Please try again later.</p>
            </>
          )}
        </Card>
      </div>
    </section>
  )
}
