import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

const SERVICES_OFFERED = [
  {
    icon: ClipboardList,
    title: "Specialist Recruitment",
    desc: "End to end recruitment support for teaching, academic leadership, admissions, counselling, marketing, operations, HR, finance, and administrative roles. We manage sourcing, preliminary screening, candidate assessment, interview coordination, and joining follow up to help institutions hire relevant professionals efficiently.",
  },
  {
    icon: Landmark,
    title: "Campus and Expansion Hiring",
    desc: "Structured recruitment support for new schools, additional campuses, and organisations hiring across several positions or locations. We help plan workforce requirements, prioritise critical roles, map relevant talent markets, and coordinate multiple searches.",
  },
  {
    icon: Briefcase,
    title: "Leadership and Executive Search",
    desc: "A focused search service for senior and business critical roles such as Principals, Vice Principals, Academic Heads, School Directors, Centre Heads, Admissions Leaders, and Operations Heads. Each search is handled with discretion, targeted market mapping, and detailed assessment of leadership experience, motivation, and institutional fit.",
  },
  {
    icon: PieChart,
    title: "Talent Mapping and Market Insights",
    desc: "Research led mapping of relevant professionals across specific roles, locations, school boards, organisations, and experience levels. This helps institutions understand candidate availability, compensation expectations, competitor talent pools, and the overall market landscape before beginning a search.",
  },
];

const DELIVERABLES = [
  { icon: FileText, title: "Curated Candidate Shortlists", desc: "Profiles selected against the agreed mandate, with relevant career background, current organisation, experience, location and role specific information presented clearly for review." },
  { icon: ClipboardCheck, title: "Candidate Assessment Notes", desc: "Each shortlisted profile is accompanied by AcadHire's screening perspective, including alignment with the requirement, relevant strengths, areas requiring further assessment and overall suitability for progression." },
  { icon: Wallet, title: "Candidate Availability and Expectations", desc: "Clear visibility into compensation expectations, notice period, joining timeline, location preferences, relocation considerations and level of interest in the opportunity." },
  { icon: TrendingUp, title: "Search and Market Feedback", desc: "Where relevant, we share observations emerging from the search, including candidate availability, compensation patterns, common reasons for declining an opportunity and any challenges affecting the talent pool." },
  { icon: Search, title: "Search Progress Visibility", desc: "Ongoing communication on sourcing progress, candidate conversations, interview movement and other developments across the mandate." },
  { icon: Handshake, title: "Interview and Closure Support", desc: "Coordination through interviews, feedback, offer discussions and joining, helping maintain momentum with both the institution and the candidate until the search is closed." },
  { icon: ShieldCheck, title: "Leadership Search Documentation", desc: "For selected senior and leadership mandates, deliverables may also include deeper candidate assessment, career motivation, leadership context, market mapping and reference checks where agreed as part of the search." },
];

function ServicesPage() {
  const [activeTab, setActiveTab] = useState(ROLE_TABS[0].value);
  const active = ROLE_TABS.find((t) => t.value === activeTab) ?? ROLE_TABS[0];
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (ROLE_TABS.some((t) => t.value === hash)) {
      setActiveTab(hash);
      requestAnimationFrame(() => {
        document.getElementById("what-we-recruit-for")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);

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
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rotate-3 rounded-2xl bg-teal/25" aria-hidden />
            <img
              src="/images/services-hero-laptop.png"
              alt="AcadHire candidate shortlist and screening workflow"
              className="relative w-full -rotate-2 rounded-2xl shadow-elegant object-cover aspect-[4/3] ring-1 ring-white/10"
            />
            <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-elegant">
              <ShieldCheck className="h-5 w-5 text-teal" />
              <span className="text-xs font-semibold text-navy">Screened, Assessed Shortlists</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OFFERED */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading align="left" eyebrow="Services offered" title="How AcadHire Supports Your Hiring" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {SERVICES_OFFERED.map((s) => (
              <div key={s.title} className="p-6 rounded-xl bg-surface border border-border hover:border-teal/40 transition">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-3 text-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES WE RECRUIT FOR — tabbed, consolidated (Leadership included) */}
      <section id="what-we-recruit-for" className="bg-surface section-y scroll-mt-20">
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
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Sectors we support"
            title="Recruitment Across the Education Ecosystem"
            subtitle="Our search capability spans different types of education organisations, each with distinct talent requirements."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SECTORS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2.5 rounded-xl bg-surface p-4 text-center">
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
      <section className="bg-surface section-y">
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
          <div className="mt-12 flex items-start gap-3 rounded-xl bg-background border border-border p-5 max-w-3xl">
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
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Deliverables"
            title="What AcadHire Brings to Every Search"
            subtitle="Our work is designed to give hiring teams clearer visibility into the market, stronger candidate context and a more organised path from search to appointment."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <Card key={d.title} className="p-6 shadow-none border-border bg-surface">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{d.title}</h3>
                <p className="mt-3 text-sm text-body leading-relaxed">{d.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
