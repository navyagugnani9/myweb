import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";

interface OutcomeMetric {
  label: string;
  // Leave value unset until a verified figure is available for this metric.
  // Do not populate with invented numbers.
  value?: string;
}

// Replace with a real, anonymised mandate once verified figures are
// available. The narrative below is an illustrative walkthrough of how a
// typical search unfolds, not a claimed real case with fabricated results.
const CASE_STUDY = {
  requirement:
    "A K-12 school group needed to appoint an Academic Head with prior experience leading curriculum design and teacher development across multiple campuses.",
  challenge:
    "Suitable candidates at this seniority were largely not applying through job portals, so the mandate required a targeted search rather than broad application sourcing.",
  approach: [
    "Mapped comparable schools and education groups to identify relevant leadership profiles.",
    "Conducted direct outreach to identified candidates through database search and targeted networking.",
    "Screened candidates against the role's academic vision, leadership style, and compensation expectations before shortlisting.",
  ],
  outcomeMetrics: [
    { label: "Candidates identified" },
    { label: "Candidates approached" },
    { label: "Candidates screened" },
    { label: "Candidates shortlisted" },
    { label: "Time to first shortlist" },
  ] as OutcomeMetric[],
};

export function CaseStudySection() {
  return (
    <section className="py-14 md:py-20 bg-surface">
      <div className="container-prose">
        <SectionHeading
          eyebrow="Search in practice"
          title="How Our Search Process Works in Practice"
          subtitle="An illustrative walkthrough of how a typical leadership search unfolds."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2 items-start">
          <div className="space-y-5">
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">The Requirement</h3>
              <p className="mt-2 text-body leading-relaxed">{CASE_STUDY.requirement}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">The Search Challenge</h3>
              <p className="mt-2 text-body leading-relaxed">{CASE_STUDY.challenge}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">AcadHire's Approach</h3>
              <ul className="mt-2 space-y-2">
                {CASE_STUDY.approach.map((step, i) => (
                  <li key={i} className="flex gap-2 text-body leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-cta" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6 bg-navy text-white">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">The Outcome</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {CASE_STUDY.outcomeMetrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-white/5 p-4">
                  <p className="text-2xl font-bold text-white">{m.value ?? "—"}</p>
                  <p className="mt-1 text-xs text-white/70">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/50">Verified outcome figures will be added here once available.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
