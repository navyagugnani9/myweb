import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MapPin, Briefcase, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { OPENINGS, type JobOpening } from "@/lib/openings";

const METADATA_ICONS: Record<string, typeof MapPin> = {
  Location: MapPin,
  "Employment Type": Briefcase,
  Experience: Clock,
};

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

      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Openings</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Current Openings</h1>
            <p className="mt-5 text-lg text-white/80">Browse active roles across schools, education organisations, and EdTech companies.</p>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-6 md:pt-14 md:pb-10">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Current Opportunities"
            title="Explore Active Opportunities"
            subtitle="Roles currently open across schools, education consultancies and education organisations."
            className="max-w-none"
          />

          <div className="mt-10 space-y-6">
            {OPENINGS.map((job) => {
              const expanded = expandedId === job.id;
              const highlights = job.metadata.filter((m) => METADATA_ICONS[m.label]);
              return (
                <Card key={job.id} className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{job.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-teal">{job.organisation}</p>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {highlights.map((m) => {
                      const Icon = METADATA_ICONS[m.label];
                      return (
                        <span key={m.label} className="flex items-center gap-1.5 text-sm text-body">
                          <Icon className="h-4 w-4 text-teal shrink-0" /> {m.value}
                        </span>
                      );
                    })}
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
                      {job.metadata.some((m) => !METADATA_ICONS[m.label]) && (
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                          {job.metadata.filter((m) => !METADATA_ICONS[m.label]).map((m) => (
                            <div key={m.label} className="flex items-baseline gap-1.5 text-sm">
                              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}:</span>
                              <span className="text-body">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
                </Card>
              );
            })}
          </div>

          <Card className="mt-10 flex flex-col items-start gap-3 bg-surface p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Send className="h-4 w-4" />
              </span>
              <p className="text-sm text-body leading-relaxed">
                To apply, email your resume to <a href="mailto:recruitment@acadhire.co.in" className="font-medium text-foreground hover:text-teal hover:underline">recruitment@acadhire.co.in</a> with the subject line: <span className="font-medium text-foreground">Application for [Job Title] | [Your Name]</span>
              </p>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
