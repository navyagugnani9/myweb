export interface CredibilityStat {
  value: string;
  label: string;
}

// Update these as verified figures become available (e.g. mandates completed,
// candidates screened, placements made). Only include numbers that can be
// genuinely substantiated — do not add invented figures.
export const CREDIBILITY_STATS: CredibilityStat[] = [
  { value: "10+", label: "Clients" },
  { value: "500+", label: "Education organisations mapped" },
  { value: "Pan India", label: "Search capability" },
  { value: "Academic to Leadership", label: "Hiring coverage" },
  { value: "End-to-End", label: "Recruitment support" },
  { value: "Education Sector", label: "Specialist recruitment" },
];
