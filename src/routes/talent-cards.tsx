import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck, Search, MessageSquareText, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { TalentCard } from "@/components/TalentCard";
import { TalentCardDetailDialog } from "@/components/TalentCardDetailDialog";
import { RequestProfileDialog } from "@/components/RequestProfileDialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { TALENT_CARDS, PAGE_SIZE, type TalentCardData, type AvailabilityStatus } from "@/lib/talent-cards";

export const Route = createFileRoute("/talent-cards")({
  head: () => ({
    meta: [
      { title: "Explore Screened Education Talent | AcadHire Talent Cards" },
      { name: "description", content: "Browse selected professionals across academic, leadership, admissions, operations and education business functions. Candidate identities remain confidential until employer interest and candidate consent are established." },
      { property: "og:title", content: "Explore Screened Education Talent | AcadHire" },
      { property: "og:description", content: "Discover pre-screened education talent, with full profiles shared only after verified employer interest and candidate consent." },
      { property: "og:url", content: "/talent-cards" },
    ],
    links: [{ rel: "canonical", href: "/talent-cards" }],
  }),
  component: TalentCardsPage,
});

const PROCESS_STEPS = [
  { icon: Search, title: "Explore", desc: "Browse anonymous profiles based on role, experience, location and availability." },
  { icon: MessageSquareText, title: "Express Interest", desc: "Request the complete profile of a candidate who appears relevant to your organisation." },
  { icon: Handshake, title: "Connect", desc: "AcadHire verifies the requirement, obtains the candidate's consent and coordinates the introduction." },
];

const ALL = "all";

function parseLeadingNumber(text: string): number | null {
  const match = text.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function TalentCardsPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCard, setSelectedCard] = useState<TalentCardData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewCard, setViewCard] = useState<TalentCardData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const [roleCategory, setRoleCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [experienceBucket, setExperienceBucket] = useState(ALL);

  const roleCategories = useMemo(() => Array.from(new Set(TALENT_CARDS.map((c) => c.roleCategory))), []);
  const locations = useMemo(() => Array.from(new Set(TALENT_CARDS.flatMap((c) => c.locations))), []);
  const statuses = useMemo(() => Array.from(new Set(TALENT_CARDS.map((c) => c.status))) as AvailabilityStatus[], []);

  const experienceBuckets = [
    { value: "0-5", label: "0–5 years", test: (n: number) => n < 5 },
    { value: "5-10", label: "5–10 years", test: (n: number) => n >= 5 && n < 10 },
    { value: "10-15", label: "10–15 years", test: (n: number) => n >= 10 && n < 15 },
    { value: "15+", label: "15+ years", test: (n: number) => n >= 15 },
  ];

  const filteredCards = useMemo(() => {
    return TALENT_CARDS.filter((c) => {
      if (roleCategory !== ALL && c.roleCategory !== roleCategory) return false;
      if (location !== ALL && !c.locations.includes(location)) return false;
      if (status !== ALL && c.status !== status) return false;
      if (experienceBucket !== ALL) {
        const n = parseLeadingNumber(c.experienceYears);
        const bucket = experienceBuckets.find((b) => b.value === experienceBucket);
        if (n === null || !bucket?.test(n)) return false;
      }
      return true;
    });
  }, [roleCategory, location, status, experienceBucket]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;
  const filtersActive = roleCategory !== ALL || location !== ALL || status !== ALL || experienceBucket !== ALL;

  const resetFilters = () => {
    setRoleCategory(ALL);
    setLocation(ALL);
    setStatus(ALL);
    setExperienceBucket(ALL);
    setVisibleCount(PAGE_SIZE);
  };

  const handleRequestProfile = (card: TalentCardData) => {
    setViewDialogOpen(false);
    setSelectedCard(card);
    setDialogOpen(true);
  };

  const handleViewCard = (card: TalentCardData) => {
    setViewCard(card);
    setViewDialogOpen(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-navy text-white">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden />
        <div className="container-prose relative section-y grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">AcadHire Talent Cards</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Explore Screened Education Talent
            </h1>
            <p className="mt-6 max-w-[600px] text-lg text-white/80">
              Browse selected professionals across academic, leadership, admissions, operations and education business functions. Candidate identities remain confidential until employer interest and candidate consent are established.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground"
                onClick={() => document.getElementById("talent-cards-listing")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Talent Cards
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-navy text-slate-800">
                <Link to="/for-employers">Share a Hiring Requirement</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60">
              <ShieldCheck className="h-3.5 w-3.5" /> Candidate identities remain confidential until verified interest and consent are confirmed
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rotate-3 rounded-2xl bg-teal/25" aria-hidden />
            <img
              src="/images/talent-network.png"
              alt="Network of screened education talent profiles"
              className="relative w-full -rotate-2 rounded-2xl shadow-elegant object-cover aspect-square ring-1 ring-white/10"
            />
            <button
              onClick={() => document.getElementById("talent-cards-listing")?.scrollIntoView({ behavior: "smooth" })}
              className="absolute -bottom-5 -left-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-elegant transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <ShieldCheck className="h-5 w-5 text-teal" />
              <span className="text-xs font-semibold text-navy">Verified Candidate Profiles</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pt-10 pb-6 md:pt-14 md:pb-10">
        <div className="container-prose">
          <SectionHeading
            align="left"
            eyebrow="Why Talent Cards"
            title="Meet Talent Before You Open a Vacancy"
            subtitle="Some of the strongest hires begin before a position is formally advertised. AcadHire Talent Cards allow schools, EdTech companies, universities, training institutes and education consultancies to discover selected professionals who may be suitable for current or upcoming requirements. Every featured candidate is reviewed by AcadHire before being added to the platform."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className="relative rounded-xl border border-border bg-surface p-6">
                <div className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  {i + 1}
                </div>
                <s.icon className="mt-2 h-6 w-6 text-teal" />
                <h3 className="mt-4 font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL LISTING */}
      <section id="talent-cards-listing" className="bg-surface pt-6 pb-10 md:pt-10 md:pb-14 scroll-mt-20">
        <div className="container-prose">
          <SectionHeading eyebrow="Browse all" title="Talent Cards" />

          {/* FILTERS */}
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-4">
            <Select value={roleCategory} onValueChange={(v) => { setRoleCategory(v); setVisibleCount(PAGE_SIZE); }}>
              <SelectTrigger className="w-auto min-w-[160px]"><SelectValue placeholder="Function" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All functions</SelectItem>
                {roleCategories.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={(v) => { setLocation(v); setVisibleCount(PAGE_SIZE); }}>
              <SelectTrigger className="w-auto min-w-[160px]"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All locations</SelectItem>
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={experienceBucket} onValueChange={(v) => { setExperienceBucket(v); setVisibleCount(PAGE_SIZE); }}>
              <SelectTrigger className="w-auto min-w-[160px]"><SelectValue placeholder="Experience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All experience</SelectItem>
                {experienceBuckets.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => { setStatus(v); setVisibleCount(PAGE_SIZE); }}>
              <SelectTrigger className="w-auto min-w-[160px]"><SelectValue placeholder="Availability" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All availability</SelectItem>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            {filtersActive && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>Clear filters</Button>
            )}
          </div>

          {filteredCards.length === 0 ? (
            <p className="mt-10 text-center text-body">No talent cards match these filters. Try adjusting your selection.</p>
          ) : (
            <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card) => (
                <TalentCard key={card.candidateId} card={card} onView={handleViewCard} />
              ))}
            </div>
          )}
          {hasMore && (
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* DIDN'T FIND THE RIGHT PROFILE */}
      <section className="section-y">
        <div className="container-prose">
          <div className="rounded-2xl bg-hero-navy text-white p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Didn't Find the Right Profile?</h2>
              <p className="mt-3 text-white/80">
                Tell us what you are hiring for, and AcadHire will conduct a targeted search across its education talent network.
              </p>
              <Button asChild size="lg" className="mt-6 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
                <Link to="/for-employers">Submit a Hiring Requirement</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TalentCardDetailDialog
        card={viewCard}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        onRequestProfile={handleRequestProfile}
      />
      <RequestProfileDialog card={selectedCard} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
