-- Talent Card employer profile requests
-- Stores every "Request Full Profile" submission from the /talent-cards page.
-- Rows are written exclusively by the server route via the service-role client;
-- no anon/authenticated access is granted, keeping candidate and employer
-- details confidential until AcadHire manually reviews and progresses a request.

CREATE TABLE IF NOT EXISTS public.talent_card_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id TEXT NOT NULL,
  employer_name TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  designation TEXT,
  work_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  role_considered TEXT NOT NULL,
  hiring_location TEXT,
  salary_range TEXT,
  joining_timeline TEXT,
  requirement_details TEXT NOT NULL,
  is_business_email BOOLEAN NOT NULL DEFAULT true,
  verification_status TEXT NOT NULL DEFAULT 'Pending'
    CHECK (verification_status IN ('Pending', 'Manual Review Required', 'Verified', 'Rejected')),
  candidate_consent_status TEXT NOT NULL DEFAULT 'Pending'
    CHECK (candidate_consent_status IN ('Pending', 'Granted', 'Declined')),
  request_status TEXT NOT NULL DEFAULT 'New'
    CHECK (request_status IN (
      'New', 'Employer Verification Pending', 'Candidate Consent Pending',
      'Approved for Introduction', 'Profile Shared', 'Interview in Progress',
      'Closed', 'Rejected'
    )),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.talent_card_requests TO service_role;

ALTER TABLE public.talent_card_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Service role can read talent card requests"
    ON public.talent_card_requests FOR SELECT
    USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Service role can insert talent card requests"
    ON public.talent_card_requests FOR INSERT
    WITH CHECK (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Service role can update talent card requests"
    ON public.talent_card_requests FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_talent_card_requests_candidate ON public.talent_card_requests(candidate_id);
CREATE INDEX IF NOT EXISTS idx_talent_card_requests_created ON public.talent_card_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_talent_card_requests_status ON public.talent_card_requests(request_status);
