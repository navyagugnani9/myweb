import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users, Landmark, Briefcase, BookOpen, GraduationCap, Monitor,
  TrendingUp, Handshake, Settings, ClipboardList, PieChart, UserCircle,
  HeartHandshake, ClipboardCheck, Search, FileText, UserCheck, Wallet,
  Home, Lightbulb, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Recruitment Services | Leadership, Academic, Admissions & Operations Hiring | AcadHire" },
      { name: "description", content: "AcadHire supports schools, EdTech companies, education consultancies, coaching and test-preparation organisations and other education businesses with targeted recruitment across leadership, academic, growth, operations and specialist functions." },
      { property: "og:title", content: "Recruitment Services | AcadHire" },
      { property: "og:description", content: "Recruitment support across the education ecosystem — search process, role categories and what you receive with each shortlist." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const PROCESS_COLORS = ["bg-teal/10 text-teal", "bg-amber-cta/15 text-amber-cta", "bg-navy/10 text-navy"];

const SEARCH_PROCESS = [
  { icon: ClipboardList, title: "Requirement Calibration", desc: "We align on the role, responsibilities, experience requirements, compensation, location, timeline and success criteria." },
  { icon: Search, title: "Search Strategy & Market Mapping", desc: "We map relevant talent pools, organisations and sourcing channels based on the requirement." },
  { icon: UserCircle, title: "Candidate Identification & Sourcing", desc: "We identify relevant professionals through targeted search, databases, networks and direct sourcing." },
  { icon: Handshake, title: "Candidate Outreach", desc: "We approach potential candidates, establish initial interest and assess suitability for the opportunity." },
  { icon: ClipboardCheck, title: "Structured Screening", desc: "We assess relevant experience, role alignment, compensation, location, availability, motivation and other mandate-specific criteria." },
  { icon: FileText, title: "Shortlist Presentation", desc: "We present a curated shortlist with candidate information and screening insights." },
  { icon: Users, title: "Interview Support", desc: "We coordinate interviews, maintain candidate communication and support feedback through the process." },
  { icon: UserCheck, title: "Offer and Joining Coordination", desc: "We support offer discussions, joining timelines and candidate communication through closure." },
];

const ROLE_TABS = [
  {
    value: "leadership",
    icon: Users,
    label: "Leadership & Senior Search",
    title: "Leadership and Senior Appointments",
    intro: "Education appointments often require a more targeted search than conventional recruitment. AcadHire combines market mapping, direct outreach and structured assessment to identify professionals with the relevant experience.",
    groups: [
      { icon: Landmark, title: "School & Academic Leadership", roles: ["Principal", "Head of School", "Deputy Head", "Vice Principal", "Academic Head", "Director of Academics"] },
      { icon: Briefcase, title: "Business & Functional Leadership", roles: ["Business Head", "Regional Head", "Centre Head", "Head of Operations", "Head of Admissions", "Head of Sales / Growth", "Senior Functional Leadership"] },
    ],
  },
  {
    value: "academic",
    icon: BookOpen,
    label: "Academic & Teaching",
    title: "Academic, Teaching and Learning Roles",
    intro: "Recruitment for professionals involved in teaching, curriculum, content, training and learning delivery across schools and education organisations.",
    groups: [
      { icon: Users, title: "Teaching & Faculty", roles: ["PRT, TGT & PGT Teachers", "Faculty & Tutors", "Subject Matter Experts", "Teacher Trainers"] },
      { icon: GraduationCap, title: "Academic & Curriculum", roles: ["Academic Coordinators", "Curriculum Specialists", "Curriculum Developers", "Academic Managers"] },
      { icon: Monitor, title: "Learning & Content", roles: ["Learning Designers", "Educational Content Professionals", "Instructional Designers", "Programme Faculty"] },
    ],
  },
  {
    value: "admissions",
    icon: TrendingUp,
    label: "Admissions & Growth",
    title: "Admissions, Student Recruitment and Growth Roles",
    intro: "Recruitment for teams responsible for enrolment, student acquisition, institutional partnerships and revenue growth.",
    groups: [
      { icon: Users, title: "Admissions & Enrolment", roles: ["Admissions Counsellors", "Education Counsellors", "Enrollment Managers", "Student Recruitment Professionals"] },
      { icon: TrendingUp, title: "Sales & Business Development", roles: ["Inside Sales", "Business Development Managers", "Sales Managers", "Growth Professionals"] },
      { icon: Handshake, title: "Partnerships", roles: ["Institutional Partnerships", "Partnership Managers", "Channel Managers", "University / School Partnerships"] },
    ],
  },
  {
    value: "operations",
    icon: Settings,
    label: "Operations & Functions",
    title: "Operations and Business Function Roles",
    intro: "Recruitment for the teams responsible for running and scaling education organisations.",
    groups: [
      { icon: ClipboardList, title: "Education Operations", roles: ["Academic Operations", "Programme Operations", "School Operations", "Centre Operations"] },
      { icon: Users, title: "People & Administration", roles: ["Human Resources", "Talent Acquisition", "Administration"] },
      { icon: PieChart, title: "Business Functions", roles: ["Finance", "Marketing", "Customer Success", "Student Success", "Business Operations"] },
    ],
  },
  {
    value: "specialist",
    icon: UserCircle,
    label: "Specialist Roles",
    title: "Specialist Education Roles",
    intro: "Recruitment for specialist professionals supporting student development, inclusion, assessment, research and learning.",
    groups: [
      { icon: HeartHandshake, title: "Student Support & Wellbeing", roles: ["Career Counsellors", "School Counsellors", "Special Educators", "Student Support Professionals"] },
      { icon: ClipboardCheck, title: "Assessment & Learning", roles: ["Assessment Professionals", "Learning Specialists", "Psychometric / Assessment Professionals"] },
      { icon: Search, title: "Research & Advisory", roles: ["Education Researchers", "Research Associates", "Education Consultants", "Monitoring & Evaluation Professionals"] },
    ],
  },
];

const SECTORS = [
  { icon: Home, label: "K-12 Schools & School Groups" },
  { icon: Monitor, label: "EdTech Companies" },
  { icon: GraduationCap, label: "Coaching & Test Preparation" },
  { icon: Users, label: "Education Consultancies" },
  { icon: Lightbulb, label: "Training & Learning Organisations" },
  { icon: ClipboardCheck, label: "Assessment & Education Services" },
  { icon: BookOpen, label: "Education Content & Publishing" },
  { icon: Briefcase, label: "Other Education Businesses" },
];

const DELIVERABLES = [
  { icon: FileText, title: "Candidate Profile", items: ["Resume", "Current organisation", "Relevant experience", "Location"] },
  { icon: UserCheck, title: "Screening Information", items: ["AcadHire screening summary", "Key alignment with the requirement", "Relevant concerns or gaps", "Candidate interest and motivation"] },
  { icon: Wallet, title: "Practical Considerations", items: ["Current and expected compensation", "Notice period / joining availability", "Location and relocation considerations"] },
];

function ServicesPage() {
  const [activeTab, setActiveTab] = useState(ROLE_TABS[0].value);
  const active = ROLE_TABS.find((t) => t.value === activeTab) ?? ROLE_TABS[0];

  return (
    <>
      {/* HERO */}
      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Our Services</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Recruitment Support Across the Education Sector</h1>
            <p className="mt-5 max-w-[600px] text-lg text-white/80">
              AcadHire supports schools, EdTech companies, education consultancies, coaching and test-preparation organisations, training businesses and other education organisations with targeted recruitment across leadership, academic, growth, operations and specialist functions.
            </p>
            <Button asChild className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
              <Link to="/for-employers">Submit a Hiring Requirement</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -bottom-5 -left-5 h-full w-full rounded-2xl border-2 border-teal/40" aria-hidden />
            <img
              src="/images/services-hero-laptop.png"
              alt="AcadHire candidate shortlist and screening workflow"
              className="relative w-full rounded-2xl shadow-elegant object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* ROLES WE RECRUIT FOR — tabbed, consolidated (Leadership included) */}
      <section id="what-we-recruit-for" className="section-y scroll-mt-20">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="What we recruit for" title="Roles We Recruit For" />

          <div className="mt-10 flex flex-wrap gap-2">
            {ROLE_TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveTab(t.value)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  activeTab === t.value
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-border bg-background text-body hover:border-navy/40",
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-foreground">{active.title}</h3>
            <p className="mt-2 max-w-[600px] text-body leading-relaxed">{active.intro}</p>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {active.groups.map((g) => (
                <div key={g.title}>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <g.icon className="h-4 w-4" />
                    </span>
                    <h4 className="font-bold text-foreground">{g.title}</h4>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {g.roles.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-body leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-cta" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS WE SUPPORT */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Sectors we support"
            title="Recruitment Across the Education Ecosystem"
            subtitle="Our search capability spans different types of education organisations, each with distinct talent requirements."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SECTORS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2.5 rounded-xl bg-background p-4 text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SEARCH PROCESS */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Our process" title="Our Search Process" subtitle="The standard process behind every AcadHire search, from requirement to joining." />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {SEARCH_PROCESS.map((step, i, arr) => (
              <div key={step.title} className="text-left">
                <div className="flex items-center">
                  <span className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${PROCESS_COLORS[i % PROCESS_COLORS.length]}`}>
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground ring-4 ring-background">
                      {i + 1}
                    </span>
                  </span>
                  {(i + 1) % 4 !== 0 && i !== arr.length - 1 && (
                    <span className="ml-2 hidden h-px flex-1 border-t border-dashed border-border lg:block" aria-hidden />
                  )}
                </div>
                <h4 className="mt-6 font-bold text-foreground">{step.title}</h4>
                <p className="mt-2 text-sm text-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-start gap-3 rounded-xl bg-surface border border-border p-5 max-w-3xl">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="text-sm text-body leading-relaxed">
              Candidates are screened against the role requirement before reaching your shortlist. Reference checks can be conducted as part of selected senior and leadership searches.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="bg-surface section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Deliverables" title="What You Get" subtitle="Each shortlisted profile can include the information required to make the next stage of assessment more efficient." />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <Card key={d.title} className="p-6 shadow-none border-border bg-background">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{d.title}</h3>
                <ul className="mt-3 space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-body leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" /> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
