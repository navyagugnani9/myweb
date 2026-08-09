import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen, LineChart, Users, Search, Target, ArrowRight,
  FileText, Wallet, Clock, MapPin, CheckCircle2, AlertCircle, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Recruitment Services | Leadership, Academic, Admissions & Operations Hiring | AcadHire" },
      { name: "description", content: "AcadHire's recruitment support across the education sector — leadership and senior search, academic and teaching recruitment, admissions and growth recruitment, and operations and functional recruitment." },
      { property: "og:title", content: "Recruitment Services | AcadHire" },
      { property: "og:description", content: "What recruitment work AcadHire can handle, across four categories of education hiring." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const LEADERSHIP_PROCESS = [
  "Requirement Calibration",
  "Market Mapping",
  "Target Organisation Identification",
  "Direct Candidate Search",
  "Structured Screening",
  "Shortlist Presentation",
  "Interview Support",
  "Offer and Joining Coordination",
];

const LEADERSHIP_FLOW = [
  "Role Calibration",
  "Market Mapping",
  "Targeted Outreach",
  "Leadership Screening",
  "Shortlist",
  "Interview and Appointment Support",
];

const OTHER_CATEGORIES = [
  {
    icon: BookOpen,
    title: "Academic and Teaching Recruitment",
    desc: "For teachers, coordinators, curriculum specialists, teacher trainers and academic professionals.",
    roles: ["Teachers (PRT, TGT, PGT)", "Curriculum Specialists", "Teacher Trainers", "Academic Coordinators", "Subject Matter Experts"],
  },
  {
    icon: LineChart,
    title: "Admissions, Counselling and Growth Recruitment",
    desc: "For admissions, education counselling, student recruitment, sales and related roles.",
    roles: ["Admissions Counsellors", "Inside Sales Executives", "Enrollment Managers", "Business Development Managers", "Partnerships & Channel Managers"],
  },
  {
    icon: Users,
    title: "Operations and Functional Recruitment",
    desc: "For school operations, HR, marketing, finance, administration and other education business functions.",
    roles: ["Academic Operations Managers", "Center Operations Managers", "HR & Administration", "Finance & Marketing", "Student & Customer Success"],
  },
];

const DELIVERABLES = [
  { icon: FileText, label: "Resume" },
  { icon: CheckCircle2, label: "AcadHire screening summary" },
  { icon: Users, label: "Current organisation and relevant experience" },
  { icon: Wallet, label: "Current and expected compensation" },
  { icon: Clock, label: "Notice period or joining availability" },
  { icon: MapPin, label: "Location and relocation considerations" },
  { icon: Target, label: "Key alignment with the role" },
  { icon: AlertCircle, label: "Relevant concerns or gaps identified during screening" },
  { icon: MessageSquare, label: "Candidate interest and motivation" },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Our Services</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Recruitment Support Across the Education Sector</h1>
          <p className="mt-5 text-lg text-white/80">AcadHire supports different levels and types of hiring — from senior leadership search to academic, admissions and operations recruitment.</p>
        </div>
      </section>

      {/* LEADERSHIP SEARCH — most prominent */}
      <section className="bg-navy text-white section-y">
        <div className="container-prose">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-teal">Leadership and Senior Search</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white leading-snug">
              Critical education leadership appointments require a more targeted search process.
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              AcadHire supports schools and education organisations with focused searches for senior academic and business leadership positions where relevant candidates may not be actively applying through job portals.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Principal", "Head of School", "Deputy Head", "Academic Head", "Director", "Business Head", "Senior functional leadership"].map((r) => (
              <span key={r} className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/90">{r}</span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-3">
            {LEADERSHIP_FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                <span className="rounded-lg bg-white/10 px-3.5 py-2 text-sm font-medium text-white">{step}</span>
                {i < LEADERSHIP_FLOW.length - 1 && <ArrowRight className="h-4 w-4 text-white/40 shrink-0" />}
              </div>
            ))}
          </div>

          <Button asChild className="mt-10 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
            <Link to="/for-employers">Submit a Hiring Requirement</Link>
          </Button>
        </div>
      </section>

      {/* OTHER CATEGORIES */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="Other recruitment categories" title="Academic, Admissions and Operations Recruitment" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {OTHER_CATEGORIES.map((c) => (
              <Card key={c.title} className="p-7 hover:shadow-elegant transition-shadow">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-navy-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{c.desc}</p>
                <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-body">
                  {c.roles.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-cta" /> {r}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (general) */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="Our process" title="How We Approach Every Search" />
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {LEADERSHIP_PROCESS.map((step, i) => (
              <div key={step} className="relative p-5 rounded-xl bg-background border border-border">
                <div className="absolute -top-3 left-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  {i + 1}
                </div>
                <p className="mt-2 font-semibold text-foreground text-sm">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-body max-w-2xl">
            Candidates are pre screened against the role requirement before reaching your shortlist. Reference checks can be conducted as part of selected senior and leadership searches.
          </p>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="Deliverables" title="What You Receive With Each Shortlist" subtitle="AcadHire provides assessed shortlists, not forwarded applications." />
          <Card className="mt-16 p-6 md:p-10">
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {DELIVERABLES.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <d.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{d.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
