import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap, Building2, Monitor, Target, CheckCircle2,
  BookOpen, LineChart, Users, Award, Star, Search, Handshake, ArrowRight,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { CREDIBILITY_STATS } from "@/lib/site-stats";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AcadHire | Specialist Recruitment for the Education Sector" },
      { name: "description", content: "AcadHire helps schools and education organisations identify, assess and hire talent across India — from teachers and counsellors to Principals, Academic Heads and business leaders." },
      { property: "og:title", content: "AcadHire | Specialist Recruitment for the Education Sector" },
      { property: "og:description", content: "Specialist recruitment for schools and education organisations across India." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const ORGANISATIONS = [
  { icon: Building2, title: "Schools & School Groups", desc: "K-12 schools, international schools, preschools, boarding schools and school groups." },
  { icon: Monitor, title: "EdTech & Learning Organisations", desc: "EdTech companies and training and learning organisations." },
  { icon: GraduationCap, title: "Education Consultancies & Services", desc: "Coaching and test preparation, education consultancies, assessment and education services, and other education businesses." },
];

const ROLE_CATEGORIES = [
  { icon: Award, title: "Leadership", examples: "Principals, Heads of School, Academic Heads, Business Heads." },
  { icon: BookOpen, title: "Academic & Teaching", examples: "Teachers, academic coordinators, curriculum specialists." },
  { icon: LineChart, title: "Admissions & Growth", examples: "Admissions, enrollment, sales, partnerships." },
  { icon: Users, title: "Operations & Functions", examples: "Academic operations, HR, administration, marketing." },
  { icon: Target, title: "Specialist Roles", examples: "Counsellors, special educators, assessment professionals." },
];

const WHY_ACADHIRE = [
  { icon: Target, title: "Sector Specialisation", desc: "AcadHire works specifically within education, allowing searches to be interpreted in the context of schools, learning companies and education roles." },
  { icon: Search, title: "Targeted Candidate Search", desc: "We combine databases, market research, LinkedIn research, targeted outreach and direct candidate search rather than relying only on incoming applications." },
  { icon: CheckCircle2, title: "Assessed Shortlists", desc: "Candidates are reviewed against the specific requirement, including relevant experience, compensation expectations, location, availability and role alignment before being presented." },
  { icon: Handshake, title: "Support Through Appointment", desc: "AcadHire supports interview coordination, candidate communication, feedback, offer discussions and joining." },
];

const TESTIMONIALS = [
  { quote: "AcadHire understood our culture instantly and delivered a shortlist of three strong Academic Heads in a week. We hired from the very first batch.", role: "HR Head", org: "Leading K12 School Group, Delhi NCR" },
  { quote: "Their grasp of the EdTech hiring market is unmatched. The candidates they shared were sharp, relevant, and already pre-aligned on role and CTC.", role: "VP People", org: "EdTech Company, Bengaluru" },
  { quote: "We hired a counsellor through AcadHire. Reliable, professional, and refreshingly sector-focused.", role: "Director of Operations", org: "Education Organisation, Mumbai" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden text-white min-h-[560px] flex items-center">
        <img
          src="/images/homepage-hero.png"
          alt="Reviewing and shortlisting candidate profiles for education roles"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" aria-hidden />
        <div className="container-prose relative py-10 md:py-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90">
              <GraduationCap className="h-3.5 w-3.5" /> Specialist Education-Sector Recruitment
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Specialist Recruitment for the Education Sector
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              From teachers and counsellors to Principals, Academic Heads and business leaders, AcadHire helps schools and education organisations identify, assess and hire talent across India.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
                <Link to="/for-employers">Hire Talent</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
                <Link to="/contact" hash="general-enquiry">Speak to Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
                <Link to="/talent-cards">Explore Talent</Link>
              </Button>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/60">
              Trusted by Schools · EdTech Companies · Education Groups
            </p>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STATS — moving strip */}
      <section className="overflow-hidden bg-surface py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0 items-center">
              {CREDIBILITY_STATS.map((s) => (
                <div key={`${rep}-${s.label}`} className="flex flex-col items-center px-10 text-center">
                  <p className="text-xl md:text-2xl font-bold text-navy">{s.value}</p>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Who we work with" title="Built Exclusively for Education Hiring" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ORGANISATIONS.map((c, i) => (
              <Card key={c.title} className="p-7 shadow-none hover:shadow-elegant transition-shadow">
                <span className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-full",
                  ["bg-navy/10 text-navy", "bg-teal/10 text-teal", "bg-amber-cta/15 text-amber-cta"][i % 3],
                )}>
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-body leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE HIRE FOR */}
      <section className="section-y bg-surface">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="What we hire for" title="Roles Across the Education Organisation" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ROLE_CATEGORIES.map((c) => (
              <Card key={c.title} className="p-6 bg-background hover:shadow-elegant transition-shadow">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{c.examples}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/services" hash="what-we-recruit-for">Explore Recruitment Services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY ACADHIRE */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Why AcadHire" title="Why Education Organisations Choose AcadHire" className="max-w-none" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {WHY_ACADHIRE.map((b) => (
              <div key={b.title} className="p-6 rounded-xl bg-surface border border-border hover:border-teal/40 transition">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-cta/15 text-amber-cta">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="mt-3 text-body leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />
          <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
            {TESTIMONIALS.map((t) => (
              <Card key={t.org} className="flex h-full flex-col p-7 bg-background">
                <div className="flex gap-1 text-amber-cta">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-body leading-relaxed">"{t.quote}"</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{t.role}</p>
                  <p className="text-sm text-muted-foreground">{t.org}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="mt-10 max-w-3xl rounded-2xl border border-border bg-background px-6">
            <Accordion type="single" collapsible>
              {[
                { q: "What types of organizations do you work with?", a: "We partner with K-12 schools (CBSE, ICSE, IB, state boards), international and boarding schools, preschools, coaching and tutoring institutes, EdTech companies (online learning, test prep, K-12, higher-ed platforms), skill development firms, training institutes, and higher education groups across India." },
                { q: "How long does it take to receive shortlisted candidates?", a: "Initial shortlisted profiles are typically presented within 5 to 7 business days for standard mandates, subject to the complexity and seniority of the requirement." },
                { q: "Do you charge candidates for placement?", a: "No. AcadHire never charges candidates. Our fees are paid by the hiring organization only — registration, profile review, and placement are completely free for candidates." },
                { q: "What is your fee structure for employers?", a: "We work on a success-based engagement model. Fees are a percentage of the candidate's annual CTC, billed only on successful joining, with a standard replacement guarantee. Volume and retained mandates are priced separately — happy to share a proposal." },
                { q: "Can you handle bulk hiring requirements?", a: "Yes. We regularly handle bulk and project hiring for new center launches, admissions seasons, and large EdTech expansions — including walk-in drives, structured assessments, and dedicated account managers." },
                { q: "Do you work across multiple cities?", a: "Yes. We work across India, supporting education organisations with hiring requirements in metropolitan, Tier 2, and Tier 3 cities, as well as remote roles." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-body">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* EMPLOYER CTA — primary emphasis */}
      <section className="pt-0 pb-10 md:pb-14">
        <div className="container-prose">
          <div className="rounded-2xl bg-hero-navy text-white p-8 md:p-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Hiring for an education role?</h2>
              <p className="mt-4 text-lg text-white/80">Tell us what you are looking for and our team will assess the requirement before beginning the search.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
                  <Link to="/for-employers">Submit a Hiring Requirement</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
                  <Link to="/contact">Speak to AcadHire</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
