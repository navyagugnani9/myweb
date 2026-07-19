export type RoleCategory =
  | "Academic"
  | "Leadership"
  | "Sales & Admissions"
  | "Operations & Success"
  | "Operations & Leadership"
  | "Teaching, Assessment & Consulting";
export type WorkMode = "On-site" | "Hybrid" | "Remote" | "Flexible";
export type AvailabilityStatus = "Actively Looking" | "Selectively Exploring" | "Open to Offers";

export interface ResponsibilityPoint {
  text: string;
  isAchievement?: boolean;
}

export interface TalentCardData {
  candidateId: string;
  targetRole: string;
  roleCategory: RoleCategory;
  locations: string[];
  experienceYears: string;
  sectorExperience: string;
  currentResponsibility: ResponsibilityPoint[];
  noticePeriod?: string;
  expectedSalaryRange?: string;
  workMode?: WorkMode;
  availability?: string;
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
    currentResponsibility: [
      { text: "Managing a team of six admissions counsellors." },
      { text: "Achieved 118% of the annual admissions target.", isAchievement: true },
    ],
    expectedSalaryRange: "₹10 LPA",
    openTo: ["Universities", "EdTech companies", "Education consultancies"],
    status: "Selectively Exploring",
    featured: true,
  },
  {
    candidateId: "AH 1043",
    targetRole: "Centre Director",
    roleCategory: "Operations & Leadership",
    locations: ["Mumbai"],
    experienceYears: "10+ years",
    sectorExperience: "Early Childhood Education, Childcare & Education Operations",
    currentResponsibility: [
      { text: "Leading end-to-end centre operations, academic quality, compliance, team management, and parent engagement at a UK-based childcare centre." },
      { text: "Successfully managed centre operations while driving quality standards, team performance, and parent satisfaction.", isAchievement: true },
    ],
    expectedSalaryRange: "₹14 LPA",
    openTo: ["K12 Schools", "Early Years Schools", "EdTech Companies", "Education Groups", "Education Consultancies"],
    status: "Actively Looking",
  },
  {
    candidateId: "AH 1044",
    targetRole: "A Level Psychology Educator",
    roleCategory: "Teaching, Assessment & Consulting",
    locations: ["Open to Remote and Hybrid Roles"],
    experienceYears: "34+ years",
    sectorExperience: "Sixth Form Education, Examination Assessment and Organisational Psychology",
    currentResponsibility: [
      { text: "Teaching A Level Psychology across AQA and OCR specifications, developing curriculum and assessment resources, mentoring students, and supporting examination preparation." },
      { text: "Experienced as an OCR A Level Psychology Examiner." },
      { text: "Consistently achieved strong pass rates and student outcomes while preparing learners for A Level examinations and progression to higher education.", isAchievement: true },
    ],
    workMode: "Remote",
    availability: "From September 2026",
    expectedSalaryRange: "₹30 LPA",
    openTo: [
      "Online Psychology Teaching",
      "Private Tutoring",
      "Examination and Assessment Work",
      "Student Mentoring",
      "Educational Consultancy",
      "Curriculum Development",
      "Organisational Psychology Consulting",
    ],
    status: "Selectively Exploring",
  },
];

export const PAGE_SIZE = 6;
