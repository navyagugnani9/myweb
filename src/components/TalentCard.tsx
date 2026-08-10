import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TalentCardData } from "@/lib/talent-cards";

interface Props {
  card: TalentCardData;
  onView: (card: TalentCardData) => void;
}

export function TalentCard({ card, onView }: Props) {
  return (
    <Card
      onClick={() => onView(card)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-elegant hover:border-teal/40"
    >
      <div className="bg-surface px-6 pb-5 pt-6">
        <Badge variant="outline" className="border-navy/20 bg-navy/5 text-navy font-semibold tracking-wide">
          Candidate {card.candidateId}
        </Badge>
        <h3 className="mt-3 text-xl font-bold text-foreground leading-snug">{card.targetRole}</h3>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-teal">{card.roleCategory}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-body">
            <MapPin className="h-4 w-4 text-teal shrink-0" />
            <span>{card.locations.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-body">
            <Briefcase className="h-4 w-4 text-teal shrink-0" />
            <span>{card.experienceYears}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
          View Full Profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Card>
  );
}
