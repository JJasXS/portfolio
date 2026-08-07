export type JourneyType =
  | "education"
  | "internship"
  | "work"
  | "project"
  | "achievement"
  | "leadership";

export interface JourneySubItem {
  id: string;
  title: string;
  institution: string;
  description: string;
  type: JourneyType;
  highlight?: string;
  /** Optional status chip, e.g. Present */
  status?: string;
}

export interface JourneyGroup {
  id: string;
  year: string;
  yearEnd?: string;
  items: JourneySubItem[];
}

/**
 * Journey timeline grouped by year.
 * Items under the same year share one year header with sub-entries.
 */
export const journey: JourneyGroup[] = [
  {
    id: "year-2026",
    year: "2026",
    items: [
      {
        id: "procc-se",
        title: "Software Engineer",
        institution: "Procc System Consulting",
        description:
          "Currently employed full-time, building and maintaining business systems and ERP-integrated workflows.",
        type: "work",
        highlight: "Full-time",
        status: "Present",
      },
      {
        id: "procc-intern",
        title: "Software Engineer Intern",
        institution: "Procc System Consulting",
        description:
          "Built business systems including scanning, appointment booking, approval, procurement, and auto-emailing services using C#/.NET, Python, SQL, and Firebird. Integrated workflows with SQL Account ERP.",
        type: "internship",
      },
      {
        id: "jci",
        title: "Vice President of Community",
        institution: "Junior Chamber International United Penang",
        description:
          "Leading community initiatives and member development. Includes Care for Every Family (Organising Chairperson), a B40 family outreach day with free care services and support.",
        type: "leadership",
      },
    ],
  },
  {
    id: "year-bse",
    year: "2024",
    yearEnd: "2026",
    items: [
      {
        id: "bse",
        title: "Bachelor of Software Engineering",
        institution:
          "Tunku Abdul Rahman University of Management & Technology, Penang Branch",
        description:
          "Pursuing a bachelor's degree focused on software engineering principles, system design, and practical application development.",
        type: "education",
        highlight: "CGPA 3.0",
      },
    ],
  },
  {
    id: "year-diploma",
    year: "2021",
    yearEnd: "2023",
    items: [
      {
        id: "diploma",
        title: "Diploma in Information Technology",
        institution:
          "Tunku Abdul Rahman University of Management & Technology, Penang Branch",
        description:
          "Built foundational skills in IT, programming, databases, and web development.",
        type: "education",
      },
    ],
  },
  {
    id: "year-penang-hill",
    year: "2021",
    yearEnd: "2022",
    items: [
      {
        id: "penang-hill",
        title: "Web Designer Intern",
        institution: "Penang Hill",
        description:
          "Developed internal web pages, enhanced existing databases, and gained hands-on experience with GitHub, WordPress, and Visual Studio Code.",
        type: "internship",
      },
    ],
  },
];
