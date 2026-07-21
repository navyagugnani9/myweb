export interface JobSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  organisation: string;
  metadata: { label: string; value: string }[];
  summary: string;
  sections: JobSection[];
  datePosted: string;
  validThrough: string;
}

export const OPENINGS: JobOpening[] = [
  {
    id: "education-counsellor",
    title: "Education Counsellor",
    organisation: "Leading Education Consultancy",
    datePosted: "2026-07-01",
    validThrough: "2026-10-01",
    metadata: [
      { label: "Location", value: "Bavdhan, Pune" },
      { label: "Employment Type", value: "Full Time" },
      { label: "Working Hours", value: "10:00 AM to 6:30 PM, Monday to Saturday" },
      { label: "Experience", value: "1 to 2 years" },
      { label: "Joining", value: "Immediate" },
    ],
    summary:
      "Guide students regarding online UG and PG programmes, manage prospective student enquiries and support the complete admission and enrolment process.",
    sections: [
      {
        heading: "Key Responsibilities",
        bullets: [
          "Counsel students regarding online UG and PG course opportunities",
          "Understand student requirements and recommend suitable programmes and universities",
          "Handle inbound and outbound calls",
          "Follow up with prospective students and support lead conversion",
          "Guide students through the admission and enrolment process",
          "Maintain accurate records of student interactions and application status",
          "Achieve monthly admission and conversion targets",
          "Coordinate with internal teams to ensure a smooth admission process",
        ],
      },
      {
        heading: "Requirements",
        bullets: [
          "1 to 2 years of experience in Education Counselling, Admissions or Academic Sales",
          "Prior experience in online UG and PG admissions is mandatory",
          "Strong communication, negotiation and interpersonal skills",
          "Ability to work in a target driven environment",
          "Proficiency in MS Office and CRM tools is preferred",
        ],
      },
    ],
  },
  {
    id: "social-media-content-manager",
    title: "Social Media & Content Manager",
    organisation: "Leading K to 12 School",
    datePosted: "2026-07-01",
    validThrough: "2026-10-01",
    metadata: [
      { label: "Location", value: "Remote" },
      { label: "Employment Type", value: "Full Time" },
      { label: "Working Hours", value: "9:00 AM to 5:00 PM, Monday to Saturday" },
      { label: "Experience", value: "1 to 3 years preferred" },
      { label: "Joining", value: "Immediate" },
    ],
    summary:
      "Take complete ownership of a school's social media presence by planning content, creating reels, designing posts, writing captions and coordinating with the school team.",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We are looking for a creative, responsible and proactive person who can take complete ownership of the school's social media presence across Instagram, Facebook, YouTube Shorts and other digital platforms.",
          "This is a full time remote role with working hours from 9:00 AM to 5:00 PM. The person should remain available during these hours for content planning, coordination, discussions, urgent edits and timely posting.",
          "The ideal candidate should be able to think creatively, understand school content, identify trends, plan campaigns, edit reels, create engaging visuals and help build a strong digital presence for the school.",
        ],
      },
      {
        heading: "Key Responsibilities",
        bullets: [
          "Create a monthly social media plan at the beginning of every month",
          "Discuss the content plan with the school team and align it with events, admissions, festivals, activities, sports, achievements and announcements",
          "Manage the daily social media presence across Instagram, Facebook, YouTube Shorts and other platforms",
          "Find trending reel ideas, audio, formats and content styles suitable for a school brand",
          "Edit reels and short form videos using photos and videos shared by the school team",
          "Create posts, stories, carousels, event creatives, admission creatives and celebration posts",
          "Write captions in a polished, warm and school friendly tone",
          "Maintain weekly and monthly content calendars",
          "Coordinate with teachers, campus teams and administration staff to collect content",
          "Ensure school activities, celebrations, competitions, achievements and sports events are posted on time",
          "Suggest creative ideas to improve reach, engagement and brand visibility",
          "Track basic social media performance and share insights",
          "Support admissions related digital marketing and social media campaigns",
          "Maintain consistency in the school's branding, tone and visual identity",
        ],
      },
      {
        heading: "Skills Required",
        bullets: [
          "Strong understanding of Instagram, Facebook, YouTube Shorts and social media trends",
          "Good reel editing and short form video editing skills",
          "Ability to adapt trends for a school or education brand",
          "Good knowledge of Canva and basic graphic design",
          "Experience with CapCut, InShot, Premiere Rush or similar tools",
          "Basic understanding of social media SEO, keywords, hashtags and engagement strategy",
          "Good communication and coordination skills",
          "Ability to work independently and take ownership",
          "Creative mindset and attention to detail",
          "Prior experience with school, education, coaching institute, lifestyle, sports, creator or brand social media pages is preferred",
        ],
      },
      {
        heading: "What We Are Looking For",
        paragraphs: [
          "Someone creative, fast, organised and capable of planning and executing school content without constant follow up.",
        ],
      },
    ],
  },
];
