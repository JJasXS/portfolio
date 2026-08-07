export type ExperienceKind =
  | "internship"
  | "work"
  | "leadership"
  | "community"
  | "volunteer"
  | "event"
  | "technical";

export interface ExperienceProject {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  details?: string;
  contributions?: string[];
  highlights?: string[];
  eventMeta?: {
    date: string;
    time?: string;
    location?: string;
  };
  image?: string;
  link?: string;
  linkLabel?: string;
}

export interface ExperienceRole {
  id: string;
  position: string;
  year: string;
  yearEnd?: string;
  /** e.g. Full-time, Internship */
  employmentType?: string;
  description: string;
  contributions: string[];
  details?: string;
  kind: ExperienceKind;
}

export interface ExperienceItem {
  id: string;
  year: string;
  yearEnd?: string;
  organization: string;
  position: string;
  /** Short text shown on the card */
  description: string;
  /** Key points previewed on the card (first few) */
  contributions: string[];
  kind: ExperienceKind;
  /** Longer story shown in the detail modal */
  details?: string;
  /** Multiple roles at the same company (shown as tabs) */
  roles?: ExperienceRole[];
  /** Nested projects / initiatives under this role */
  projects?: ExperienceProject[];
  highlights?: string[];
  eventMeta?: {
    date: string;
    time?: string;
    location?: string;
  };
  image?: string;
  link?: string;
  linkLabel?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "procc",
    year: "Present",
    organization: "Procc System Consulting",
    position: "Software Engineer",
    description:
      "Currently employed full-time, building and maintaining business systems used in day-to-day operations.",
    contributions: [
      "Develop and maintain business systems including scanning, booking, approval, and procurement workflows",
      "Integrate custom applications with SQL Account ERP",
      "Support deployment, testing, troubleshooting, and users",
    ],
    details:
      "I am currently employed full-time as a Software Engineer at Procc System Consulting, continuing the systems work I started during my internship: building practical business applications and supporting them in production.",
    kind: "work",
    roles: [
      {
        id: "procc-fulltime",
        position: "Software Engineer",
        year: "Present",
        employmentType: "Full-time",
        description:
          "Currently employed full-time, building and maintaining business systems used in day-to-day operations.",
        contributions: [
          "Develop and maintain business systems across scanning, booking, approval, procurement, and related workflows",
          "Integrate custom applications with SQL Account ERP for quotation, stock, customer, and invoice processes",
          "Support deployment, configuration, debugging, and user support in production",
          "Continue improving automation such as scheduled reporting services",
        ],
        details:
          "I am currently working full-time as a Software Engineer at Procc System Consulting. My focus is building and supporting practical business systems, from feature development through to deployment and day-to-day user support.",
        kind: "work",
      },
      {
        id: "procc-intern",
        position: "Software Engineer Intern",
        year: "2026",
        employmentType: "Internship",
        description:
          "Built and supported business systems used in day-to-day operations.",
        contributions: [
          "Built Scanning, Appointment Booking, Approval, Procurement, and Auto Emailing systems",
          "Integrated custom systems with SQL Account ERP for quotation, procurement, stock, customer, and invoice workflows",
          "Created Windows Services for scheduled email reports",
          "Worked with Firebird databases including SQL queries, tables, UDF fields, and troubleshooting",
          "Supported system testing, debugging, deployment, configuration, and user support",
        ],
        details:
          "During this internship I worked across several internal products, from feature development to testing, deployment, and user support. A big part of the work was connecting custom systems with SQL Account ERP so quotation, procurement, approval, stock, customer, and invoice workflows stayed consistent.",
        kind: "internship",
      },
    ],
  },
  {
    id: "jci-vp-2026",
    year: "2026",
    organization: "Junior Chamber International United Penang",
    position: "Vice President of Community",
    description:
      "Leading community initiatives and member development, including flagship outreach projects that support families and strengthen local connections.",
    contributions: [
      "Develop and nurture future leaders within the chapter",
      "Build confidence in public speaking and communication among members",
      "Create a supportive environment for growth and community service",
    ],
    details:
      "As Vice President of Community at JCI United Penang, I focus on leadership development, public speaking, and community projects that bring people together with practical support and care.",
    kind: "leadership",
    projects: [
      {
        id: "care-for-every-family",
        title: "Care for Every Family",
        role: "Organising Chairperson",
        year: "2025",
        description:
          "A community day for B40 families with free care services, grocery support, and activities for kids.",
        details:
          "Care for Every Family was a community outreach day for B40 families, built around a simple idea: every family deserves care, support, and a little extra kindness. Together with JCI United Penang and JCI Nibong Tebal, we put together a practical afternoon of free services and family support at C-Mart Nibong Tebal.",
        contributions: [
          "Organised the event as Chairperson with JCI United Penang & JCI Nibong Tebal",
          "Coordinated free haircuts, eye checks, and health screenings",
          "Arranged grocery packs for families and goodies for children",
        ],
        highlights: [
          "Free haircut",
          "Free eye check",
          "Free health screening",
          "Grocery pack for families",
          "Free goodies for kids",
        ],
        eventMeta: {
          date: "25 April 2025",
          time: "11:00 AM - 2:00 PM",
          location: "C-Mart Nibong Tebal, Pulau Pinang",
        },
        image: "/events/care-for-every-family.jpg",
        link: "https://www.facebook.com/jciup/photos/-care-for-every-family-a-special-day-for-our-b40-families-%EF%B8%8Fwe-believe-every-fami/979124634511781/",
        linkLabel: "View on Facebook",
      },
    ],
  },
  {
    id: "cny-sharer",
    year: "Present",
    organization: "JCI United Penang / Community Projects",
    position: "Volunteer",
    description:
      "Community outreach programmes promoting inclusiveness and compassion.",
    contributions: [
      "Supported CNY Sharer of Joy 4.0, a flagship community project",
      "Contributed to “Spring of Care and Joy” by visiting Agape Home and supporting underprivileged communities",
    ],
    details:
      "Through JCI United Penang I have volunteered in community projects that promote inclusiveness and care, including CNY Sharer of Joy 4.0 and the Spring of Care and Joy outreach visit to Agape Home.",
    kind: "volunteer",
  },
  {
    id: "penang-hill-2021",
    year: "2021",
    yearEnd: "2022",
    organization: "Penang Hill",
    position: "Web Designer Intern",
    description:
      "Supported internal digital operations through web pages and database work.",
    contributions: [
      "Developed internal web pages for office use",
      "Enhanced existing databases using various software tools",
      "Gained hands-on experience with GitHub, WordPress, and Visual Studio Code",
      "Assisted in testing and implementing critical systems for Penang Hill operations",
    ],
    details:
      "At Penang Hill I supported internal operations by building office web pages, improving database workflows, and helping test systems used in day-to-day work. This internship also gave me early hands-on experience with GitHub, WordPress, and VS Code.",
    kind: "internship",
  },
];
