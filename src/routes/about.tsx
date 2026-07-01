import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Zap, Handshake, Lightbulb, Target, BookOpen, Users, Award } from "lucide-react";
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

function AboutPage() {
  return (
    <>
      <section className="bg-hero-navy text-white py-20 md:py-28">
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

      <section className="py-20 md:py-28">
        <div className="container-prose grid gap-10 md:grid-cols-2">
          <Card className="p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal"><Target className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-3 text-body">
              To simplify and elevate talent acquisition for education organizations by offering specialist, sector-focused recruitment that saves time and delivers verified professionals.
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

      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading eyebrow="What we do differently" title="What makes us different" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Sector depth", desc: "Our team has built and hired inside schools and EdTech — we speak the language." },
              { icon: Users, title: "Curated", desc: "We send 3–5 sharp profiles, not 30 resumes. Every candidate is screened end-to-end." },
              { icon: Award, title: "Leadership focus", desc: "From subject teachers to Academic Heads and CEOs — we hire across the org." },
              { icon: Shield, title: "Reliable", desc: "Confidential leadership mandates and a standard replacement guarantee on every placement." },
            ].map((d) => (
              <Card key={d.title} className="p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-navy-foreground"><d.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-bold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm text-body">{d.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading eyebrow="Our values" title="What We Stand For" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Integrity", desc: "Honest assessments, transparent timelines, no inflated profiles." },
              { icon: BookOpen, title: "Expertise", desc: "Deep knowledge of the education sector across formats and stages." },
              { icon: Zap, title: "Speed", desc: "Quick turnarounds without compromising on candidate quality." },
              { icon: Handshake, title: "Partnership", desc: "Long-term relationships with employers and candidates alike." },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-xl border border-border hover:border-teal/40 transition">
                <v.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-4 font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-body">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero-navy text-white">
        <div className="container-prose py-20 text-center max-w-2xl">
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
