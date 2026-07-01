import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Award, LineChart, Users, ClipboardList, Search, FileSearch, UserCheck, Calendar, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Recruitment Services | Academic, Leadership, Sales & Operations Hiring | AcadHire" },
      { name: "description", content: "Specialist recruitment across four verticals — academic, leadership, sales & admissions, and operations & success hiring for the education sector." },
      { property: "og:title", content: "Recruitment Services | AcadHire" },
      { property: "og:description", content: "Four hiring verticals, one specialist partner for the education sector." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: BookOpen,
    title: "Academic Hiring",
    desc: [
      "We hire the people who teach, train, and shape learning experiences — from full-time classroom teachers to part-time subject experts and curriculum specialists.",
      "Our academic mandates cover CBSE, ICSE, IB, IGCSE, state boards, and competitive exam coaching, alongside content and curriculum roles for EdTech platforms.",
      "Every academic candidate is screened for subject depth, classroom or content delivery, and cultural fit with your institution's pedagogy.",
    ],
    roles: ["Teachers (PRT, TGT, PGT)", "Tutors and Mentors", "Faculty & Lecturers", "Trainers", "Subject Matter Experts", "Curriculum Specialists"],
    for: "K-12 schools, coaching institutes, tutoring centers, EdTech content teams, training academies.",
  },
  {
    icon: Award,
    title: "Leadership Hiring",
    desc: [
      "Senior hires define the next five years of any education organization. We run discreet, retained-style searches for Principals, Academic Heads, Business Heads, and CXO-level roles.",
      "Our leadership process includes structured competency interviews, deep reference checks, and (where required) academic vision presentations and case discussions.",
      "We are equally comfortable hiring for an established institution and a fast-scaling EdTech business.",
    ],
    roles: ["Principals & Vice Principals", "Academic Heads", "Business Heads & Center Heads", "Operations Heads", "VP / Director-level roles"],
    for: "School groups, EdTech companies, training institutes, higher education and skill development organizations.",
  },
  {
    icon: LineChart,
    title: "Sales & Admissions Hiring",
    desc: [
      "Admissions and inside sales are the revenue engine of every education business. We hire counsellors and sales managers who can balance empathy with conversion.",
      "We benchmark candidates on funnel ownership, ticket size, conversion ratios, and CRM discipline — not just years of experience.",
      "From single-counsellor hires to building full pods for new center launches, we scale with you.",
    ],
    roles: ["Admissions Counsellors", "Inside Sales Executives", "Enrollment Managers", "Business Development Managers", "Partnerships & Channel Managers"],
    for: "EdTech platforms, test prep companies, coaching institutes, tutoring chains, skill development firms.",
  },
  {
    icon: Users,
    title: "Operations & Success Hiring",
    desc: [
      "Behind every great classroom and every great EdTech product is an operations team that makes delivery reliable. We hire the people who run academic operations, center operations, and student/customer success.",
      "Our candidates come with experience in batch management, SOP design, NPS improvement, and cross-functional coordination with academic and product teams.",
      "We help you build the operating spine that protects your brand and your renewals.",
    ],
    roles: ["Academic Operations Managers", "Center Operations Managers", "Student Success Managers", "Customer Success Managers", "Program Managers"],
    for: "EdTech companies, multi-center education businesses, tutoring chains, training institutes.",
  },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-hero-navy text-white py-20">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Our Services</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Recruitment Services Built for Education</h1>
          <p className="mt-5 text-lg text-white/80">Four specialist hiring verticals covering every critical role in your organization.</p>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "py-20 md:py-24" : "py-20 md:py-24 bg-surface"}>
          <div className="container-prose grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-navy-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-foreground">{s.title}</h2>
              <div className="mt-5 space-y-4 text-body">
                {s.desc.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
              <Button asChild className="mt-7 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
                <Link to="/for-employers">Submit a Hiring Requirement</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide text-teal">Roles Covered</h4>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {s.roles.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-cta" /> {r}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6 bg-navy/5 border-navy/10">
                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide text-teal">Who It's For</h4>
                <p className="mt-3 text-sm text-body">{s.for}</p>
              </Card>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 md:py-28 bg-background">
        <div className="container-prose">
          <SectionHeading eyebrow="Our process" title="How an AcadHire Mandate Runs" />
          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: ClipboardList, title: "Briefing" },
              { icon: Search, title: "Sourcing" },
              { icon: FileSearch, title: "Screening" },
              { icon: UserCheck, title: "Shortlist" },
              { icon: Calendar, title: "Coordination" },
              { icon: Handshake, title: "Offer & Onboarding" },
            ].map((s, i) => (
              <div key={s.title} className="p-5 rounded-xl border border-border text-center">
                <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">{i + 1}</div>
                <s.icon className="mx-auto mt-4 h-6 w-6 text-teal" />
                <h4 className="mt-3 font-semibold text-foreground text-sm">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
