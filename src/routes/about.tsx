import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, MessageSquare, Target, Lightbulb, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | AcadHire" },
      { name: "description", content: "AcadHire is a recruitment consultancy built around the realities of education hiring — sector understanding, targeted search and considered candidate assessment." },
      { property: "og:title", content: "About Us | AcadHire" },
      { property: "og:description", content: "Recruitment built around the realities of education." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { icon: Target, title: "Relevance Over Volume", desc: "We focus on candidates aligned with the requirement rather than maximising CV submissions." },
  { icon: BookOpen, title: "Sector Understanding", desc: "Search criteria are interpreted within the context of education organisations and education roles." },
  { icon: Search, title: "Rigour in Search", desc: "Each mandate begins with understanding the requirement before sourcing candidates." },
  { icon: MessageSquare, title: "Clarity in Communication", desc: "Employers and candidates receive clear information throughout the process." },
  { icon: Shield, title: "Confidentiality", desc: "Candidate and employer information is handled appropriately throughout the search." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">About AcadHire</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
              Recruitment built around the realities of education.
            </h1>
            <p className="mt-6 max-w-[600px] text-lg text-white/80">
              AcadHire was created to bring greater sector understanding, rigour and relevance to education recruitment. We work with schools and education organisations to identify candidates whose experience, expectations and capabilities genuinely align with the requirement.
            </p>
          </div>
          <img
            src="/images/about-hero-notepad.png"
            alt="Reviewing candidate profiles for education roles"
            className="w-full rounded-2xl shadow-elegant object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* WHY ACADHIRE EXISTS */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Why AcadHire exists" title="Education Hiring Is Highly Context Dependent" />
          <div className="mt-8 max-w-[650px] space-y-4 text-body leading-relaxed">
            <p>
              A candidate who appears suitable based on title alone may have worked within a completely different curriculum, school structure, student segment, business model or organisational environment.
            </p>
            <p>
              Recruitment therefore requires understanding the context behind the CV rather than simply matching titles and keywords. AcadHire was built around targeted search, sector understanding and more considered candidate assessment.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-surface section-y">
        <div className="container-prose grid gap-9 md:grid-cols-2">
          <Card className="px-9 py-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal"><Target className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-3 max-w-[600px] text-body leading-relaxed">
              To strengthen education organisations by helping them find the people who shape better learning, stronger teams and more effective institutions. Through focused search, sector understanding and thoughtful candidate assessment, we aim to make education recruitment more informed, relevant and effective.
            </p>
          </Card>
          <Card className="px-9 py-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-cta/15 text-amber-cta"><Lightbulb className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 max-w-[600px] text-body leading-relaxed">
              To contribute to a stronger education ecosystem by helping schools and education organisations build teams capable of creating meaningful learning experiences and lasting institutional impact. We aspire to be a trusted recruitment partner across India, connecting organisations with the people who can help education move forward.
            </p>
          </Card>
        </div>
      </section>

      {/* WHAT GUIDES OUR WORK */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="How we work" title="What Guides Our Work" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((v) => (
              <div key={v.title} className="p-6 rounded-xl border border-border hover:border-teal/40 transition">
                <v.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-5 font-bold text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm text-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero-navy text-white">
        <div className="container-prose py-12 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to build your team?</h2>
            <p className="mt-4 text-white/80">Tell us what you're hiring for and a member of the AcadHire team will get in touch.</p>
            <Button asChild className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
