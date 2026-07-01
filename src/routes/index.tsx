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
import { CTAStrip } from "@/components/CTAStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AcadHire | Specialist Recruitment for Schools, EdTech & Education Companies" },
      { name: "description", content: "Recruitment solutions for schools, EdTech, and education companies. We help you hire verified academic, leadership, sales, and operations talent — faster." },
      { property: "og:title", content: "AcadHire | Specialist Recruitment for Schools, EdTech & Education Companies" },
      { property: "og:description", content: "Recruitment solutions for schools, EdTech, and education companies." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-navy text-white">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-amber-cta/10 blur-3xl" aria-hidden />
        <div className="container-prose relative py-24 md:py-32 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90">
            <GraduationCap className="h-3.5 w-3.5" /> Specialist Education-Sector Recruitment
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Recruitment Solutions for Schools, EdTech & Education Companies
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            We help education organizations hire verified academic, operations, and leadership talent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
              <Link to="/for-employers">Submit a Hiring Requirement</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
              <Link to="/openings">Browse Openings</Link>
            </Button>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/60">
            Trusted by Schools · EdTech Companies · Education Groups
          </p>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Who we serve"
            title="Built Exclusively for the Education Sector"
            subtitle="Whether you're a school, edtech startup, training provider, education consultant or nonprofit, we understand the unique talent needs of the education sector and help you find the right people to drive impact."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* ROLES */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Roles we hire for"
            title="Every Role. Across the Entire Education Organization."
            subtitle="From the classroom to the boardroom — we cover the full talent stack."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              { icon: BookOpen, title: "Academic Roles", roles: ["Teachers", "Tutors", "Faculty", "Trainers", "Subject Matter Experts", "Curriculum Specialists"] },
              { icon: Award, title: "Leadership Roles", roles: ["Principals", "Academic Heads", "Business Heads", "Center Heads", "Operations Heads"] },
              { icon: LineChart, title: "Sales & Admissions", roles: ["Admissions Counsellors", "Inside Sales", "Enrollment Managers", "Business Development", "Partnerships"] },
              { icon: Users, title: "Operations & Success", roles: ["Academic Operations", "Center Operations", "Student Success", "Customer Success", "Program Management"] },
            ].map((c) => (
              <Card key={c.title} className="p-7 hover:shadow-elegant transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{c.title}</h3>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm text-body">
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

      {/* SERVICES SNAPSHOT */}
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Our services"
            title="Four Hiring Verticals. One Specialist Partner."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Academic Hiring", desc: "Teachers, faculty, and subject experts for classrooms and content." },
              { icon: Award, title: "Leadership Hiring", desc: "Principals, academic heads, and business heads for institutions." },
              { icon: LineChart, title: "Sales & Admissions", desc: "Counsellors and revenue talent to grow your enrolment funnel." },
              { icon: Users, title: "Operations & Success", desc: "Operators who keep your academic delivery running smoothly." },
            ].map((s) => (
              <Card key={s.title} className="p-6 hover:shadow-elegant transition-shadow">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-navy-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-body">{s.desc}</p>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-navy">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Why AcadHire"
            title="Why Education Organizations Choose AcadHire"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Target, title: "Sector-Only Focus", desc: "We work exclusively in education. No generalist noise." },
              { icon: UserCheck, title: "Verified Talent Pools", desc: "Pre-screened candidates with relevant experience." },
              { icon: Clock, title: "Fast Turnaround", desc: "Shortlists delivered within 5–7 business days." },
              { icon: Briefcase, title: "End-to-End Support", desc: "From JD writing to final offer negotiation." },
              { icon: MapPin, title: "Pan-India Reach", desc: "Candidates across metros and Tier 2 cities." },
              { icon: Lock, title: "Confidential & Professional", desc: "Discreet hiring for sensitive leadership roles." },
            ].map((b) => (
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
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading eyebrow="How we work" title="Our Hiring Process" />
          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: ClipboardList, title: "Requirement Briefing", desc: "Understand the role, culture, and expectations." },
              { icon: Search, title: "Talent Sourcing", desc: "Search our database and active headhunting." },
              { icon: FileSearch, title: "Screening & Assessment", desc: "Interviews, background checks, reference calls." },
              { icon: UserCheck, title: "Shortlist Delivery", desc: "3–5 curated profiles with assessments." },
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

      {/* TESTIMONIALS */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { quote: "AcadHire understood our culture instantly and delivered a shortlist of three strong Academic Heads in a week. We hired from the very first batch.", name: "Priya Sharma", role: "HR Head" },
              { quote: "Their grasp of the EdTech hiring market is unmatched. The candidates they shared were sharp, relevant, and already pre-aligned on role and CTC.", name: "Rohan Mehta", role: "VP People " },
              { quote: "We hired a counsellor through AcadHire. Reliable, professional, and refreshingly sector-focused.", name: "Ananya Iyer", role: "Director of Operations " },
            ].map((t) => (
              <Card key={t.name} className="p-7 bg-background">
                <div className="flex gap-1 text-amber-cta">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-body leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-prose max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-10">
            {[
              { q: "What types of organizations do you work with?", a: "We partner with K-12 schools (CBSE, ICSE, IB, state boards), international and boarding schools, preschools, coaching and tutoring institutes, EdTech companies (online learning, test prep, K-12, higher-ed platforms), skill development firms, training institutes, and higher education groups across India." },
              { q: "How long does it take to receive shortlisted candidates?", a: "For most academic, sales, and operations roles, we deliver a curated shortlist of 3–5 profiles within 5–7 business days of the briefing. Leadership and CXO mandates typically take 2–4 weeks given the depth of evaluation." },
              { q: "Do you charge candidates for placement?", a: "No. AcadHire never charges candidates. Our fees are paid by the hiring organization only — registration, profile review, and placement are completely free for candidates." },
              { q: "What is your fee structure for employers?", a: "We work on a success-based engagement model. Fees are a percentage of the candidate's annual CTC, billed only on successful joining, with a standard replacement guarantee. Volume and retained mandates are priced separately — happy to share a proposal." },
              { q: "Can you handle bulk hiring requirements?", a: "Yes. We regularly handle bulk and project hiring for new center launches, admissions seasons, and large EdTech expansions — including walk-in drives, structured assessments, and dedicated account managers." },
              { q: "Do you work across multiple cities?", a: "Yes. We have active candidate pools across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, and Tier 2 cities, plus fully remote roles for EdTech." },
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
