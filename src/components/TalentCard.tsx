import { MapPin, Briefcase, Award, Clock, Wallet, Building2, CircleDot, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TalentCardData, AvailabilityStatus } from "@/lib/talent-cards";

const statusStyles: Record<AvailabilityStatus, string> = {
  "Actively Looking": "bg-teal/10 text-teal border-teal/30",
  "Selectively Exploring": "bg-amber-cta/15 text-amber-cta border-amber-cta/30",
  "Open to Offers": "bg-navy/10 text-navy border-navy/30",
};

interface Props {
  card: TalentCardData;
  onRequestProfile: (card: TalentCardData) => void;
}

export function TalentCard({ card, onRequestProfile }: Props) {
  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-elegant hover:border-teal/40">
      {/* Header */}
      <div className="bg-surface px-6 pb-5 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="outline" className="border-navy/20 bg-navy/5 text-navy font-semibold tracking-wide">
              Candidate {card.candidateId}
            </Badge>
            <h3 className="mt-3 text-xl font-bold text-foreground leading-snug">{card.targetRole}</h3>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-teal">{card.roleCategory}</p>
          </div>
          <Badge variant="outline" className={`${statusStyles[card.status]} shrink-0 whitespace-nowrap`}>
            <CircleDot className="mr-1 h-3 w-3" /> {card.status}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
          <div className="flex items-center gap-2 text-body">
            <MapPin className="h-4 w-4 text-teal shrink-0" />
            <span>{card.locations.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-body">
            <Briefcase className="h-4 w-4 text-teal shrink-0" />
            <span>{card.experienceYears}</span>
          </div>
          {card.noticePeriod && (
            <div className="flex items-center gap-2 text-body">
              <Clock className="h-4 w-4 text-teal shrink-0" />
              <span>{card.noticePeriod} notice</span>
            </div>
          )}
          {card.expectedSalaryRange && (
            <div className="flex items-center gap-2 text-body">
              <Wallet className="h-4 w-4 text-teal shrink-0" />
              <span>{card.expectedSalaryRange}</span>
            </div>
          )}
          {card.workMode && (
            <div className="flex items-center gap-2 text-body">
              <Building2 className="h-4 w-4 text-teal shrink-0" />
              <span>{card.workMode}</span>
            </div>
          )}
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sector Experience</p>
            <p className="mt-1 text-body leading-relaxed">{card.sectorExperience}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current Responsibility</p>
            <p className="mt-1 text-body leading-relaxed">{card.currentResponsibility}</p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-cta/20 bg-amber-cta/5 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
            <Award className="h-3.5 w-3.5 text-amber-cta" /> Key Achievement
          </p>
          <p className="mt-1.5 text-sm text-body leading-relaxed">{card.keyAchievement}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Open To</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {card.openTo.map((o) => (
              <span key={o} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-body">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-6">
        <Button
          className="w-full bg-navy text-navy-foreground transition-colors hover:bg-navy/90 group-hover:bg-teal"
          onClick={() => onRequestProfile(card)}
        >
          Request Full Profile
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Card>
  );
}
