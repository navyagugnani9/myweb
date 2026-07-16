export type RoleCategory = "Academic" | "Leadership" | "Sales & Admissions" | "Operations & Success";
export type WorkMode = "On-site" | "Hybrid" | "Remote" | "Flexible";
export type AvailabilityStatus = "Actively Looking" | "Selectively Exploring" | "Open to Offers";

export interface TalentCardData {
  candidateId: string;
  targetRole: string;
  roleCategory: RoleCategory;
  locations: string[];
  experienceYears: string;
  sectorExperience: string;
  currentResponsibility: string;
  keyAchievement: string;
  noticePeriod?: string;
  expectedSalaryRange?: string;
  workMode?: WorkMode;
  openTo: string[];
  status: AvailabilityStatus;
  featured?: boolean;
}

// Approved, published Talent Cards. Only candidates who have completed
// AcadHire's review and are cleared for anonymous display appear here.
export const TALENT_CARDS: TalentCardData[] = [
  {
    candidateId: "AH 1042",
    targetRole: "Admissions Manager",
    roleCategory: "Sales & Admissions",
    locations: ["Pune"],
    experienceYears: "5 years",
    sectorExperience: "Higher education and online learning",
    currentResponsibility: "Managing a team of six admissions counsellors",
    keyAchievement: "Achieved 118% of the annual admissions target",
    openTo: ["Universities", "EdTech companies", "Education consultancies"],
    status: "Selectively Exploring",
    featured: true,
  },
];

export const PAGE_SIZE = 6;
