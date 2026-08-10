import { MapPin, Briefcase, Clock, Wallet, Building2, CalendarClock, Star, ArrowRight } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TalentCardData } from "@/lib/talent-cards";

interface Props {
  card: TalentCardData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestProfile: (card: TalentCardData) => void;
}

export function TalentCardDetailDialog({ card, open, onOpenChange, onRequestProfile }: Props) {
  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <Badge variant="outline" className="w-fit border-navy/20 bg-navy/5 text-navy font-semibold tracking-wide">
            Candidate {card.candidateId}
          </Badge>
          <DialogTitle className="mt-2 text-xl">{card.targetRole}</DialogTitle>
          <DialogDescription className="text-xs font-medium uppercase tracking-wide text-teal">
            {card.roleCategory}
          </DialogDescription>
        </DialogHeader>

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
              <span>Expected: {card.expectedSalaryRange}</span>
            </div>
          )}
          {card.workMode && (
            <div className="flex items-center gap-2 text-body">
              <Building2 className="h-4 w-4 text-teal shrink-0" />
              <span>{card.workMode}</span>
            </div>
          )}
          {card.availability && (
            <div className="flex items-center gap-2 text-body">
              <CalendarClock className="h-4 w-4 text-teal shrink-0" />
              <span>{card.availability}</span>
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
            <ul className="mt-1.5 space-y-1.5">
              {card.currentResponsibility.map((point, i) => (
                <li key={i} className="flex gap-2 text-body leading-relaxed">
                  {point.isAchievement ? (
                    <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-amber-cta text-amber-cta" />
                  ) : (
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  )}
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
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

        <Button
          className="mt-2 w-full bg-navy text-navy-foreground hover:bg-navy/90"
          onClick={() => onRequestProfile(card)}
        >
          Express Interest
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
