import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Search, MessageSquareText, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { TalentCard } from "@/components/TalentCard";
import { RequestProfileDialog } from "@/components/RequestProfileDialog";
import { TALENT_CARDS, PAGE_SIZE, type TalentCardData } from "@/lib/talent-cards";

export const Route = createFileRoute("/talent-cards")({
  head: () => ({
    meta: [
      { title: "AcadHire Talent Cards | Discover Pre-Screened Education Talent" },
      { name: "description", content: "Browse anonymous, pre-screened education professionals through AcadHire Talent Cards, and request the complete profile of a candidate who appears relevant to your organisation." },
      { property: "og:title", content: "AcadHire Talent Cards" },
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

function TalentCardsPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCard, setSelectedCard] = useState<TalentCardData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const visibleCards = TALENT_CARDS.slice(0, visibleCount);
  const hasMore = visibleCount < TALENT_CARDS.length;

  const handleRequestProfile = (card: TalentCardData) => {
    setSelectedCard(card);
    setDialogOpen(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-navy text-white">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden />
        <div className="container-prose relative py-20 md:py-28 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">AcadHire Talent Cards</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-[1.1]">
            Discover Pre-screened Education Talent
          </h1>
          <p className="mt-6 text-lg text-white/80">
            Explore selected professionals from across the education sector who are actively looking or selectively exploring new opportunities.
          </p>
          <p className="mt-3 text-base text-white/70">
            Each AcadHire Talent Card presents relevant experience, capabilities, career preferences and availability while protecting the candidate's identity.
          </p>
          <p className="mt-3 text-base text-white/70">
            Complete profiles are shared after employer interest is verified and the candidate provides consent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
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
          <p className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60">
            <ShieldCheck className="h-3.5 w-3.5" /> Candidate identities remain confidential until verified interest and consent are confirmed
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="pt-14 pb-8 md:pt-16 md:pb-10">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Why Talent Cards"
            title="Meet Talent Before You Open a Vacancy"
            subtitle="Some of the strongest hires begin before a position is formally advertised. AcadHire Talent Cards allow schools, EdTech companies, universities, training institutes and education consultancies to discover selected professionals who may be suitable for current or upcoming requirements. Every featured candidate is reviewed by AcadHire before being added to the platform."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
      <section id="talent-cards-listing" className="pt-8 pb-14 md:pt-10 md:pb-16 scroll-mt-20">
        <div className="container-prose">
          <SectionHeading eyebrow="Browse all" title="Talent Cards" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCards.map((card) => (
              <TalentCard key={card.candidateId} card={card} onRequestProfile={handleRequestProfile} />
            ))}
          </div>
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
      <section className="bg-hero-navy text-white">
        <div className="container-prose pt-16 pb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Didn't Find the Right Profile?</h2>
          <p className="mt-3 text-white/80">
            Tell us what you are hiring for, and AcadHire will conduct a targeted search across its education talent network.
          </p>
          <Button asChild size="lg" className="mt-6 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
            <Link to="/for-employers">Submit a Hiring Requirement</Link>
          </Button>
        </div>
      </section>

      <RequestProfileDialog card={selectedCard} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
