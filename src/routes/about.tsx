import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, MessageSquare, Target, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | AcadHire" },
      { name: "description", content: "AcadHire is a specialist recruitment consultancy built exclusively for the education sector — schools, EdTech, and education companies." },
      { property: "og:title", content: "About Us | AcadHire" },
      { property: "og:description", content: "A recruitment consultancy built specifically for the education sector." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const APPROACH = [
  "Sector specialisation",
  "Research led search",
  "Candidate quality over application volume",
  "Role specific screening",
  "Professional candidate and employer communication",
];

const VALUES = [
  { icon: Target, title: "Relevance over volume", desc: "We focus on presenting candidates aligned with the actual requirement rather than maximising CV submissions." },
  { icon: MessageSquare, title: "Clarity in communication", desc: "Employers and candidates receive clear information throughout the recruitment process." },
  { icon: BookOpen, title: "Sector understanding", desc: "Search criteria are interpreted within the context of education organisations and roles." },
  { icon: Shield, title: "Confidentiality", desc: "Candidate and employer information is handled appropriately throughout the search." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">About AcadHire</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
            A recruitment consultancy built specifically for the education sector.
          </h1>
          <p className="mt-6 text-lg text-white/80">
            We are sector-only by design: every conversation, every shortlist, every placement comes from people who understand classrooms, admissions funnels, accreditation, parent expectations, and EdTech growth cycles.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-prose grid gap-10 md:grid-cols-2">
          <Card className="p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal"><Target className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-3 text-body">
              To simplify and elevate talent acquisition for education organizations by offering specialist, sector-focused recruitment that saves time and presents candidates aligned to the actual requirement.
            </p>
          </Card>
          <Card className="p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-cta/15 text-amber-cta"><Lightbulb className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 text-body">
              To be the most trusted recruitment partner for schools, EdTech companies, and education groups across India.
            </p>
          </Card>
        </div>
      </section>

      {/* BUILT SPECIFICALLY FOR EDUCATION HIRING */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Who we are"
            title="Built Specifically for Education Hiring"
            subtitle="AcadHire focuses exclusively on recruitment across schools, education companies, EdTech organisations, education consultancies and related institutions. Our search approach combines sector research, candidate sourcing, structured screening and employer specific role assessment."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {APPROACH.map((a, i) => (
              <div key={a} className="p-8 rounded-xl bg-background border border-border">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">{i + 1}</div>
                <p className="mt-4 font-semibold text-foreground text-sm leading-snug">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="How we work" title="What We Stand For" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {VALUES.map((v) => (
              <div key={v.title} className="p-8 rounded-xl border border-border hover:border-teal/40 transition">
                <v.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-5 font-bold text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm text-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero-navy text-white">
        <div className="container-prose py-16 md:py-24 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to build your team?</h2>
          <p className="mt-4 text-white/80">Tell us what you're hiring for and we'll come back with a plan within 24 hours.</p>
          <Button asChild className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
