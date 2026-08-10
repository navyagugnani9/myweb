import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";

// Replace with a real, anonymised mandate once one is available to share.
// The narrative below is an illustrative walkthrough of how a typical
// search unfolds, not a claimed real case — do not add fabricated
// placement outcomes or invented metrics here.
const CASE_STUDY = {
  requirement:
    "A K-12 school group needed to appoint an Academic Head with prior experience leading curriculum design and teacher development across multiple campuses.",
  challenge:
    "Suitable candidates at this seniority were largely not applying through job portals, so the mandate required a targeted search rather than broad application sourcing.",
  strategy: [
    "Mapped comparable schools and education groups to identify relevant leadership profiles.",
    "Conducted direct outreach to identified candidates through database search and targeted networking.",
    "Screened candidates against the role's academic vision, leadership style, and compensation expectations before shortlisting.",
  ],
  outcome:
    "This approach builds a shortlist of candidates matched to the school's specific curriculum, leadership style and compensation expectations — rather than a shortlist assembled from whoever happened to apply.",
};

export function CaseStudySection() {
  return (
    <section className="section-y bg-surface">
      <div className="container-prose">
        <SectionHeading
          align="left"
          eyebrow="Search in practice"
          title="Inside an AcadHire Search"
          subtitle="An illustrative walkthrough of how a typical leadership search unfolds."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 items-start">
          <div className="space-y-5">
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">The Requirement</h3>
              <p className="mt-2 text-body leading-relaxed">{CASE_STUDY.requirement}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">The Search Challenge</h3>
              <p className="mt-2 text-body leading-relaxed">{CASE_STUDY.challenge}</p>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-teal">AcadHire's Search Strategy</h3>
              <ul className="mt-2 space-y-2">
                {CASE_STUDY.strategy.map((step, i) => (
                  <li key={i} className="flex gap-2 text-body leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-cta" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 bg-navy text-white">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">The Outcome</h3>
              <p className="mt-2 text-white/85 leading-relaxed">{CASE_STUDY.outcome}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
