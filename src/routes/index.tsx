import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap, Building2, Monitor, Briefcase, Users, Target, Award,
  CheckCircle2, MapPin, Lock, Clock, BookOpen, LineChart, ArrowRight, Star,
  FileSearch, UserCheck, ClipboardList, Calendar, Handshake, Search,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { CaseStudySection } from "@/components/CaseStudySection";
import { CREDIBILITY_STATS } from "@/lib/site-stats";
import { TALENT_CARDS } from "@/lib/talent-cards";

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

const WHY_ACADHIRE = [
  { icon: Target, title: "Education Sector Search Specialists", desc: "School leadership, academic, admissions, operations and education business roles." },
  { icon: CheckCircle2, title: "Shortlists, Not CV Dumps", desc: "Every profile is reviewed against the actual role requirements before being presented to the employer." },
  { icon: Search, title: "Active Search Beyond Job Portals", desc: "Database sourcing, market mapping, LinkedIn research, targeted outreach and direct candidate search." },
  { icon: UserCheck, title: "Candidate Alignment Before Submission", desc: "Relevant experience, compensation expectations, location, interest and joining considerations are reviewed before profiles reach the employer." },
  { icon: Handshake, title: "Search Support Through Joining", desc: "Interview coordination, candidate communication, feedback, offer discussions and joining follow up are supported by AcadHire." },
];

const TESTIMONIALS = [
  { quote: "AcadHire understood our culture instantly and delivered a shortlist of three strong Academic Heads in a week. We hired from the very first batch.", role: "HR Head", org: "Leading K12 School Group, Delhi NCR" },
  { quote: "Their grasp of the EdTech hiring market is unmatched. The candidates they shared were sharp, relevant, and already pre-aligned on role and CTC.", role: "VP People", org: "EdTech Company, Bengaluru" },
  { quote: "We hired a counsellor through AcadHire. Reliable, professional, and refreshingly sector-focused.", role: "Director of Operations", org: "Education Organisation, Mumbai" },
];

function Home() {
  const featuredTalent = TALENT_CARDS.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-navy text-white">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-amber-cta/10 blur-3xl" aria-hidden />
        <div className="container-prose relative py-16 md:py-24 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90">
            <GraduationCap className="h-3.5 w-3.5" /> Specialist Education-Sector Recruitment
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Specialist Recruitment for the Education Sector
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            From teachers and counsellors to Principals, Academic Heads and business leaders, AcadHire helps schools and education organisations identify, assess and hire talent across India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
              <Link to="/for-employers">Hire Talent</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
              <Link to="/talent-cards">Explore Talent</Link>
            </Button>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/60">
            Trusted by Schools · EdTech Companies · Education Groups
          </p>
        </div>
      </section>

      {/* CREDIBILITY STATS */}
      <section className="py-10 md:py-12 bg-navy text-white">
        <div className="container-prose">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {CREDIBILITY_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1.5 text-xs md:text-sm text-white/70 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ACADHIRE RECRUITS FOR */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading
            eyebrow="What we recruit for"
            title="Built Exclusively for the Education Sector"
            subtitle="Whether you're a school, edtech startup, training provider, education consultant or nonprofit, we understand the unique talent needs of the education sector and help you find the right people to drive impact."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: Building2, title: "Schools", desc: "K-12, international schools, preschools, boarding schools, coaching institutes, and tutoring centers." },
              { icon: Monitor, title: "EdTech Companies", desc: "Online learning platforms, ed-tech startups, test prep platforms, and digital education products." },
              { icon: GraduationCap, title: "Education Companies", desc: "Training institutes, skill development firms, higher education groups, and learning academies." },
            ].map((c) => (
              <Card key={c.title} className="p-7 border-t-4 border-t-navy hover:shadow-elegant transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-body">{c.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Academic Hiring", roles: ["Teachers", "Tutors", "Faculty", "Trainers", "Curriculum Specialists"] },
              { icon: Award, title: "Leadership Hiring", roles: ["Principals", "Academic Heads", "Business Heads", "Center Heads"] },
              { icon: LineChart, title: "Sales & Admissions", roles: ["Admissions Counsellors", "Inside Sales", "Enrollment Managers"] },
              { icon: Users, title: "Operations & Success", roles: ["Academic Operations", "Center Operations", "Program Management"] },
            ].map((c) => (
              <Card key={c.title} className="p-6 hover:shadow-elegant transition-shadow">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{c.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-body">
                  {c.roles.map((r) => (
                    <li key={r} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-cta" /> {r}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ACADHIRE */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Why AcadHire"
            title="Why Education Organizations Choose AcadHire"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ACADHIRE.map((b) => (
              <div key={b.title} className="p-6 rounded-xl bg-background border border-border hover:border-teal/40 transition">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-cta/15 text-amber-cta">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="mt-3 text-sm text-body">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="How we work" title="How the Search Process Works" />
          <div className="mt-16 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: ClipboardList, title: "Requirement Briefing", desc: "Understand the role, culture, and expectations." },
              { icon: Search, title: "Talent Sourcing", desc: "Search our database and active headhunting." },
              { icon: FileSearch, title: "Screening & Assessment", desc: "Structured review against the role requirement." },
              { icon: UserCheck, title: "Shortlist Delivery", desc: "Curated profiles with screening notes." },
              { icon: Calendar, title: "Interview Coordination", desc: "We manage scheduling and communication." },
              { icon: Handshake, title: "Offer & Onboarding", desc: "Support through offer and joining." },
            ].map((s, i) => (
              <div key={s.title} className="relative p-5 rounded-xl bg-surface border border-border">
                <div className="absolute -top-3 left-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  {i + 1}
                </div>
                <s.icon className="mt-2 h-6 w-6 text-teal" />
                <h4 className="mt-3 font-semibold text-foreground text-sm">{s.title}</h4>
                <p className="mt-1 text-xs text-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI CASE STUDY */}
      <CaseStudySection />

      {/* TALENT AVAILABLE NOW */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Talent available now"
            title="Talent Available Now"
            subtitle="Explore selected education professionals already screened by AcadHire."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {featuredTalent.map((card) => (
              <Card key={card.candidateId} className="p-6 hover:shadow-elegant transition-shadow">
                <span className="inline-flex items-center rounded-full border border-navy/20 bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy">
                  Candidate {card.candidateId}
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground leading-snug">{card.targetRole}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-teal">{card.roleCategory}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-body">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal" /> {card.locations.join(", ")}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-teal" /> {card.experienceYears}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-navy-foreground">
              <Link to="/talent-cards">Explore Talent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.org} className="p-7 bg-background">
                <div className="flex gap-1 text-amber-cta">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-body leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{t.role}</p>
                  <p className="text-sm text-muted-foreground">{t.org}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER CTA — primary emphasis */}
      <section className="bg-hero-navy text-white">
        <div className="container-prose py-16 md:py-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Hiring for an education role?</h2>
          <p className="mt-4 text-lg text-white/80">Tell us what you are looking for and our team will assess the requirement before beginning the search.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
              <Link to="/for-employers">Submit a Hiring Requirement</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
              <Link to="/contact">Speak to AcadHire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CANDIDATE CTA — secondary emphasis */}
      <section className="py-10 border-b border-border">
        <div className="container-prose flex flex-col items-center gap-3 text-center">
          <h3 className="text-lg font-semibold text-foreground">Looking for your next role in education?</h3>
          <Button asChild variant="outline">
            <Link to="/openings">Explore Opportunities</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-prose max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-10">
            {[
              { q: "What types of organizations do you work with?", a: "We partner with K-12 schools (CBSE, ICSE, IB, state boards), international and boarding schools, preschools, coaching and tutoring institutes, EdTech companies (online learning, test prep, K-12, higher-ed platforms), skill development firms, training institutes, and higher education groups across India." },
              { q: "How long does it take to receive shortlisted candidates?", a: "Initial shortlisted profiles are typically presented within 5 to 7 business days for standard mandates, subject to the complexity and seniority of the requirement." },
              { q: "Do you charge candidates for placement?", a: "No. AcadHire never charges candidates. Our fees are paid by the hiring organization only — registration, profile review, and placement are completely free for candidates." },
              { q: "What is your fee structure for employers?", a: "We work on a success-based engagement model. Fees are a percentage of the candidate's annual CTC, billed only on successful joining, with a standard replacement guarantee. Volume and retained mandates are priced separately — happy to share a proposal." },
              { q: "Can you handle bulk hiring requirements?", a: "Yes. We regularly handle bulk and project hiring for new center launches, admissions seasons, and large EdTech expansions — including walk-in drives, structured assessments, and dedicated account managers." },
              { q: "Do you work across multiple cities?", a: "Yes. We work across India, supporting education organisations with hiring requirements in metropolitan, Tier 2, and Tier 3 cities, as well as remote roles." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground">{f.q}</AccordionTrigger>
                <AccordionContent className="text-body">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
