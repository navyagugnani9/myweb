export type RoleType = "Academic" | "Leadership" | "Sales & Admissions" | "Operations";
export type Job = {
  id: string;
  title: string;
  org: string;
  orgType: "School" | "EdTech Company" | "Education Company";
  location: string;
  experience: string;
  type: RoleType;
  description: string;
};

export const JOBS: Job[] = [
  { id: "j1", title: "Academic Head", org: "International School Group", orgType: "School", location: "Bengaluru", experience: "12+ years", type: "Leadership",
    description: "Lead academic strategy across multiple campuses, drive curriculum standards, mentor principals, and represent the academic vision of a leading international school group." },
  { id: "j2", title: "Admissions Manager", org: "EdTech Platform", orgType: "EdTech Company", location: "Mumbai", experience: "5–8 years", type: "Sales & Admissions",
    description: "Own admissions funnel, manage a team of counsellors, optimize conversion, and partner with marketing to deliver enrolment targets for a fast-growing EdTech platform." },
  { id: "j3", title: "Senior Physics Teacher", org: "CBSE School", orgType: "School", location: "Delhi NCR", experience: "5–10 years", type: "Academic",
    description: "Teach senior secondary Physics (CBSE), prepare students for board and competitive exams, and contribute to curriculum and assessment design." },
  { id: "j4", title: "Business Development Manager", org: "Skill Development Company", orgType: "Education Company", location: "Hyderabad", experience: "4–7 years", type: "Sales & Admissions",
    description: "Build institutional partnerships with colleges and corporates, drive B2B revenue for skill development programs, and manage the regional pipeline." },
  { id: "j5", title: "Student Success Manager", org: "Online Learning Platform", orgType: "EdTech Company", location: "Remote", experience: "3–6 years", type: "Operations",
    description: "Drive learner engagement, completion, and outcomes for cohort-based programs; partner with product and academic teams to improve experience." },
  { id: "j6", title: "Center Head", org: "Tutoring Company", orgType: "Education Company", location: "Pune", experience: "6–10 years", type: "Leadership",
    description: "Run a P&L for a flagship tutoring center — academic delivery, parent experience, staff hiring, and revenue growth." },
  { id: "j7", title: "Curriculum Developer", org: "K-12 EdTech Startup", orgType: "EdTech Company", location: "Bengaluru", experience: "3–6 years", type: "Academic",
    description: "Design CBSE/ICSE-aligned digital content, learning paths, and assessments; collaborate with subject experts, designers, and product." },
  { id: "j8", title: "Operations Manager", org: "Education Group", orgType: "Education Company", location: "Chennai", experience: "5–9 years", type: "Operations",
    description: "Oversee academic and center operations across multiple locations, manage compliance, vendor partnerships, and standardize delivery." },
];
