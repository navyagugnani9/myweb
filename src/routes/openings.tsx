import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { OPENINGS, type JobOpening } from "@/lib/openings";

const SITE_URL = "https://www.acadhire.co.in";

function getMeta(job: JobOpening, label: string) {
  return job.metadata.find((m) => m.label === label)?.value;
}

function buildJobPostingSchema(job: JobOpening) {
  const location = getMeta(job, "Location") ?? "";
  const isRemote = location.toLowerCase().includes("remote");
  const employmentType = getMeta(job, "Employment Type") === "Full Time" ? "FULL_TIME" : "OTHER";
  const description = [
    job.summary,
    ...job.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.bullets ?? [])]),
  ].join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.organisation,
    },
    ...(isRemote
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: location,
              addressCountry: "IN",
            },
          },
        }),
    directApply: false,
    url: `${SITE_URL}/openings`,
  };
}

export const Route = createFileRoute("/openings")({
  head: () => ({
    meta: [
      { title: "Current Openings in Education | AcadHire" },
      { name: "description", content: "Browse current openings across schools, EdTech companies, and education organizations — academic, leadership, sales, and operations roles." },
      { property: "og:title", content: "Current Openings | AcadHire" },
      { property: "og:description", content: "Browse active roles across the education sector." },
      { property: "og:url", content: "/openings" },
    ],
    links: [{ rel: "canonical", href: "/openings" }],
  }),
  component: OpeningsPage,
});

function OpeningsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      {OPENINGS.map((job) => (
        <script
          key={job.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJobPostingSchema(job)) }}
        />
      ))}

      <section className="bg-hero-navy text-white py-20">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Openings</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Current Openings</h1>
          <p className="mt-5 text-lg text-white/80">Browse active roles across schools, education organisations, and EdTech companies.</p>
        </div>
      </section>

      <section className="pt-20 pb-8 md:pt-28 md:pb-10">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Openings"
            title="Current Opportunities"
            subtitle="Explore active opportunities across schools, education consultancies and education organisations."
            className="max-w-none"
          />

          <div className="mt-14">
            {OPENINGS.map((job) => {
              const expanded = expandedId === job.id;
              return (
                <div key={job.id} className="border-t border-border py-10 first:border-t-0 first:pt-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-teal">{job.organisation}</p>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
                    {job.metadata.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5 text-sm">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}:</span>
                        <span className="text-body">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 max-w-3xl text-body leading-relaxed">{job.summary}</p>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setExpandedId(expanded ? null : job.id)}
                      aria-expanded={expanded}
                    >
                      {expanded ? "Hide Details" : "View Details"}
                      <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </Button>
                  </div>

                  {expanded && (
                    <div className="mt-8 max-w-3xl space-y-7 border-t border-border pt-8">
                      {job.sections.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-bold text-foreground">{section.heading}</h4>
                          {section.paragraphs?.map((p, i) => (
                            <p key={i} className="mt-2 text-body leading-relaxed">{p}</p>
                          ))}
                          {section.bullets && (
                            <ul className="mt-3 space-y-2">
                              {section.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2 text-body leading-relaxed">
                                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-cta" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-body leading-relaxed">
            To apply, email your resume to recruitment@acadhire.co.in with the subject line: Application for [Job Title] | [Your Name]
          </p>
        </div>
      </section>
    </>
  );
}
