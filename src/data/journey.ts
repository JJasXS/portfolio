export type JourneyType =
  | "education"
  | "internship"
  | "work"
  | "project"
  | "achievement"
  | "leadership";

export interface JourneyNestedSub {
  id: string;
  title: string;
  yearLabel: string;
  description?: string;
}

export interface JourneySubItem {
  id: string;
  title: string;
  institution: string;
  /** Omit when `subs` carry the detail instead. */
  description?: string;
  type: JourneyType;
  highlight?: string;
  /** Optional status chip, e.g. Present */
  status?: string;
  /** Compact nested rows (e.g. degrees under one school). */
  subs?: JourneyNestedSub[];
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
        id: "procc",
        title: "Procc System Consulting",
        institution: "Software Engineer · converted from internship",
        type: "work",
        status: "Present",
        highlight: "Full-time",
        subs: [
          {
            id: "procc-fulltime",
            title: "Software Engineer",
            yearLabel: "Full-time",
          },
          {
            id: "procc-intern",
            title: "Software Engineer Intern",
            yearLabel: "Internship",
          },
        ],
      },
      {
        id: "jci",
        title: "Vice President of Community",
        institution: "Junior Chamber International United Penang",
        type: "leadership",
      },
    ],
  },
  {
    id: "year-education",
    year: "2021",
    yearEnd: "2026",
    items: [
      {
        id: "tar-umt-studies",
        title: "Software Engineering studies",
        institution:
          "Tunku Abdul Rahman University of Management & Technology, Penang Branch",
        type: "education",
        subs: [
          {
            id: "bse",
            title: "Bachelor of Software Engineering",
            yearLabel: "2024 – 2026",
          },
          {
            id: "diploma",
            title: "Diploma in Information Technology",
            yearLabel: "2021 – 2023",
          },
        ],
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
        title: "Junior Software Engineer",
        institution: "Penang Hill",
        description:
          "Developed internal web pages, enhanced existing databases, and gained hands-on experience with GitHub, WordPress, and Visual Studio Code.",
        type: "internship",
      },
    ],
  },
];
