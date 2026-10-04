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
  validThrough?: string;
}

export const OPENINGS: JobOpening[] = [
  {
    "id": "deputy-head-of-school",
    "title": "Deputy Head of School",
    "organisation": "Leading IB and Cambridge International School",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Chennai"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      },
      {
        "label": "Experience",
        "value": "10+ years of international school leadership"
      }
    ],
    "summary": "Provide strategic, academic and operational leadership across the whole school, working closely with the Head of School to strengthen teaching, student wellbeing, systems and school improvement.",
    "sections": [
      {
        "heading": "About the Role",
        "paragraphs": [
          "A senior leadership opportunity for an educator with the maturity and breadth of experience expected of a Head of School. The role involves independently leading significant areas of school operations and supporting the next phase of school growth."
        ]
      },
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Lead school improvement initiatives across academic and operational functions",
          "Oversee effective implementation of IB and Cambridge curricula, curriculum review and academic planning",
          "Monitor teaching, learning, assessment and student achievement through evidence-based improvement strategies",
          "Develop and monitor school systems, standard operating procedures, compliance and risk management",
          "Lead safeguarding, campus safety, emergency preparedness, student supervision and transport safety",
          "Mentor academic coordinators, middle leaders and teachers through coaching, performance reviews and professional development",
          "Conduct classroom observations and operational audits, using data to track measurable improvement",
          "Build transparent parent partnerships and represent the school with external stakeholders"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "Currently serving as Deputy Head of School or an equivalent senior role in a reputed IB and/or Cambridge international school",
          "Minimum 10 years of leadership experience within IB and/or Cambridge international schools",
          "Whole-school leadership experience beyond a single section or department",
          "Demonstrated success in school improvement, academic excellence and operational delivery",
          "Strong understanding of international accreditation standards and best practices",
          "Ability to lead, mentor and hold senior teams accountable",
          "Excellent organisation, attention to detail, systems orientation and professional judgement"
        ]
      }
    ]
  },
  {
    "id": "associate-early-years-coordinator",
    "title": "Associate Early Years Coordinator",
    "organisation": "Leading International School",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Chennai"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      },
      {
        "label": "Experience",
        "value": "3 to 5 years of relevant experience"
      }
    ],
    "summary": "Support the Early Years programme through play-based and inquiry-based learning, teacher mentoring, child wellbeing, parent engagement and day-to-day coordination.",
    "sections": [
      {
        "heading": "About the Role",
        "paragraphs": [
          "Work with the Early Years Coordinator to plan, implement and improve the programme, connecting teachers, teaching assistants, families and school departments. The role reports to the Head of Academics or Head of School."
        ]
      },
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Support curriculum implementation in line with the school philosophy and IB framework, where applicable",
          "Help teachers plan age-appropriate play-based and inquiry-based learning experiences",
          "Observe classrooms, provide constructive feedback and support differentiated teaching",
          "Monitor child development, wellbeing and inclusion, coordinating appropriate support with specialists",
          "Coordinate teachers, teaching assistants, staff induction, collaborative planning and professional discussions",
          "Ensure safe, organised learning spaces and coordinate resources, routines, arrival and dismissal",
          "Uphold child protection, supervision, health, hygiene and emergency procedures",
          "Monitor learning stories, portfolios, assessment records and progress reports",
          "Support parent meetings, communication, workshops, events and field trips",
          "Maintain confidential records, reports, schedules and trackers, and contribute to continuous improvement"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "Bachelor's or Master's degree in Early Childhood Education, Education, Psychology or a related field",
          "Relevant Early Years or Primary teaching qualification preferred",
          "3 to 5 years of relevant Early Years teaching or coordination experience, depending on school requirements",
          "Experience in an Early Years or international school environment",
          "IB PYP or inquiry-based learning experience is an advantage",
          "Strong understanding of child development, early childhood pedagogy and play-based learning",
          "Strong communication, teacher mentoring, staff coordination and parent relationship skills",
          "Child safeguarding awareness, digital literacy and strong documentation skills"
        ]
      }
    ]
  },
  {
    "id": "ib-primary-years-programme-coordinator",
    "title": "IB Primary Years Programme Coordinator",
    "organisation": "Leading IB International School",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Kodambakkam, Chennai"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      },
      {
        "label": "Experience",
        "value": "5+ years of primary teaching experience"
      }
    ],
    "summary": "Lead the IB Primary Years Programme through curriculum planning, teacher development, assessment, programme evaluation and parent communication.",
    "sections": [
      {
        "heading": "About the Role",
        "paragraphs": [
          "Coordinate and ensure effective teaching and learning within the IB Primary Years Programme, working with the Head of Academics. The leadership appointment is a three-year renewable position, subject to mutual agreement."
        ]
      },
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Lead collaborative planning and help teachers plan, assess, record and evaluate learning",
          "Mentor new teachers, conduct classroom visits and provide professional learning feedback",
          "Lead staff meetings and support primary teachers and subject specialists",
          "Coordinate IB self-study, review and programme evaluation activities",
          "Maintain communication with the IB and keep leadership and staff informed of programme developments",
          "Identify professional development needs and organise internal and external workshops",
          "Guide effective use of PYP subject continuum documents and unit planners",
          "Ensure curriculum mapping and documentation remain current through school learning systems",
          "Develop annual programme improvement plans and coordinate reviews of the Programme of Inquiry",
          "Maintain IB correspondence, documentation, resources and programme procedures",
          "Lead parent information workshops and contribute to school community communication"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "Minimum five years of teaching experience across primary age groups",
          "IB PYP training and IB PYP teaching experience are essential",
          "Previous leadership experience in a primary school is essential",
          "Experience as a PYP Coordinator is desirable",
          "Strong leadership, organisation, initiative and communication skills",
          "High personal integrity, attention to detail and effective time management",
          "Ability to work independently, manage multiple tasks and remain calm under pressure"
        ]
      }
    ]
  },
  {
    "id": "program-advisor-edtech-sales",
    "title": "Program Advisor - EdTech Sales",
    "organisation": "Leading EdTech and Professional Training Company",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Mumbai, Delhi, Bangalore, Pune, Hyderabad"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      },
      {
        "label": "Experience",
        "value": "1 to 3 years"
      }
    ],
    "summary": "Advise students and working professionals on upskilling programmes, manage qualified enquiries and support applications, enrolments and structured follow-ups.",
    "sections": [
      {
        "heading": "About the Role",
        "paragraphs": [
          "An on-site consultative admissions and inside sales role focused on understanding career goals, recommending suitable programmes and supporting learners throughout the enrolment journey."
        ]
      },
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Handle inbound and outbound enquiries through calls, WhatsApp, email and virtual counselling sessions",
          "Understand learner backgrounds, career goals and learning objectives",
          "Explain programme curriculum, learning outcomes, schedules, eligibility and career support",
          "Guide candidates through applications, documentation and enrolment",
          "Maintain structured follow-ups, address queries and convert qualified enquiries into confirmed enrolments",
          "Keep accurate CRM records of interactions, lead stages and admissions progress",
          "Share regular pipeline and enrolment updates",
          "Collaborate with marketing and academic teams and participate in webinars and information events",
          "Provide a professional and positive experience for every prospective learner"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "1 to 3 years of experience in EdTech admissions, academic counselling, inside sales or B2C advisory roles",
          "Strong communication and interpersonal skills; English and Hindi preferred",
          "Comfortable interacting with students and working professionals daily",
          "Ability to understand learner needs and support informed decisions",
          "Experience with CRM or lead management tools preferred",
          "Target-oriented approach and strong follow-up discipline"
        ]
      },
      {
        "heading": "What the Role Offers",
        "bullets": [
          "Exposure to career-focused counselling and admissions operations",
          "Consistent flow of qualified student enquiries",
          "Performance-driven growth opportunities within the admissions team"
        ]
      }
    ]
  },
  {
    "id": "computer-science-teacher-spain",
    "title": "Computer Science Teacher",
    "organisation": "International STEM School",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Spain"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      }
    ],
    "summary": "Teach secondary school Computer Science, develop programming and algorithmic problem-solving skills, and prepare academically ambitious students for Olympiads and coding competitions.",
    "sections": [
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Teach Computer Science to secondary school students within an international curriculum environment",
          "Develop foundations in programming, algorithms, computational thinking, data structures and problem solving",
          "Deliver academically rigorous instruction beyond standard school requirements",
          "Teach international curriculum programmes, including Cambridge pathways where applicable",
          "Prepare students for Computer Science and Informatics Olympiads and competitive programming contests",
          "Mentor students in advanced computing, algorithms and software development",
          "Support coding competitions, research projects, hackathons and STEM initiatives",
          "Create a challenging and engaging learning environment for highly able students"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "Master's degree, integrated Master's, M.Tech, PhD or an equivalent advanced qualification in Computer Science, Mathematics, Computing, Engineering or a closely related discipline",
          "Strong academic record from a highly regarded university",
          "Current or recent school-level Computer Science teaching experience, preferably in a reputed international school",
          "Experience with Cambridge IGCSE, Cambridge A Level, IB Computer Science or comparable international curricula",
          "Strong programming and algorithmic problem-solving capability",
          "Experience mentoring Olympiad or competitive programming participants, including ZCO, INOI, IOI, ICPC-related training, Codeforces or equivalent programmes",
          "Excellent spoken and written English and the ability to explain advanced concepts clearly",
          "Willingness to relocate to Spain"
        ]
      },
      {
        "heading": "Preferred Experience",
        "bullets": [
          "Teaching Computer Science in a leading international school",
          "Algorithms and data structures instruction and Informatics Olympiad preparation",
          "Experience working with highly able or gifted students",
          "Strong Mathematics background alongside Computer Science",
          "Personal participation in programming competitions or Olympiads"
        ]
      }
    ]
  },
  {
    "id": "physics-teacher-spain",
    "title": "Physics Teacher",
    "organisation": "International STEM School",
    "datePosted": "2026-10-04",
    "metadata": [
      {
        "label": "Location",
        "value": "Spain"
      },
      {
        "label": "Employment Type",
        "value": "Full Time"
      }
    ],
    "summary": "Teach middle and senior school Physics within international curricula, develop advanced scientific reasoning and problem-solving skills, and prepare students for Physics Olympiads.",
    "sections": [
      {
        "heading": "Key Responsibilities",
        "bullets": [
          "Teach concept-driven Physics to middle and senior school students",
          "Develop analytical thinking, problem solving, experimentation and scientific reasoning",
          "Prepare students for Cambridge IGCSE, AS and A Level examinations and other advanced academic pathways",
          "Coach academically advanced students for Physics competitions and Olympiads",
          "Create challenging learning materials, problem sets, assessments, laboratory activities and enrichment programmes",
          "Identify and mentor high-potential students for advanced Physics and competitive programmes",
          "Support independent projects, research, scientific investigations and STEM initiatives",
          "Contribute to curriculum development and monitor student engagement, assessment and academic progress"
        ]
      },
      {
        "heading": "Requirements",
        "bullets": [
          "Master's degree, integrated Master's, M.Tech, PhD or an equivalent advanced qualification in Physics or a closely related discipline",
          "Strong academic record from a highly regarded institution",
          "Current or recent school Physics teaching experience, preferably in a reputed international school",
          "Experience teaching senior school Physics",
          "Exposure to IBDP, Cambridge IGCSE, Cambridge AS and A Level or another rigorous international curriculum",
          "Demonstrable experience preparing or mentoring students for Physics Olympiads or comparable high-level science competitions",
          "Strong conceptual command of Physics and the ability to teach beyond standard textbook requirements",
          "Excellent spoken and written English and strong classroom communication",
          "Willingness to relocate to Spain"
        ]
      },
      {
        "heading": "Preferred Experience",
        "bullets": [
          "Teaching Physics at a leading IB or Cambridge school",
          "IBDP Higher Level Physics or Cambridge AS and A Level Physics teaching",
          "Olympiad coaching and mentoring students reaching regional, national or international stages",
          "Experience with highly able or gifted students",
          "Physics research and strong laboratory and experimental skills"
        ]
      }
    ]
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
  }
];
