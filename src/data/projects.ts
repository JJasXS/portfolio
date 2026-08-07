export type ProjectCategory =
  | "Software"
  | "Web"
  | "Automation"
  | "AI"
  | "Academic"
  | "Personal";

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  technologies: string[];
  category: ProjectCategory;
  image?: string;
  github?: string;
  demo?: string;
  /** Extra note shown on the card (e.g. no public demo) */
  note?: string;
  /** Set true for placeholder entries you will replace later */
  placeholder?: boolean;
}

/**
 * Projects listed here are based on systems built during professional experience.
 * Replace github links and add personal projects as needed.
 */
export const projects: Project[] = [
  {
    id: "scanning-system",
    title: "ProAcc eScan",
    description:
      "A web-based scanning system for capturing and processing operational data, with OTP sign-in and a progressive web app install flow.",
    problem:
      "Helps organisations digitise scanning workflows instead of relying on slow, manual handling.",
    technologies: ["C#", ".NET", "SQL", "Firebird", "JavaScript"],
    category: "Software",
    image: "/projects/scanning.png",
    demo: "https://escan.oneclickclouds.com",
  },
  {
    id: "appointment-booking",
    title: "Appointment Booking System",
    description:
      "A web-based appointment booking application for managing schedules and reservations.",
    problem:
      "Reduces scheduling friction by centralising booking, availability, and related workflow steps.",
    technologies: ["C#", ".NET", "HTML", "CSS", "JavaScript", "SQL"],
    category: "Web",
    image: "/projects/appointment.png",
    demo: "https://ebooking.oneclickclouds.com",
  },
  {
    id: "quote-hub",
    title: "eQuote Hub",
    description:
      "A quotation hub connected to business workflows, supporting quote-related processes alongside ERP-integrated systems.",
    problem:
      "Makes quotation handling more consistent by connecting quote workflows with existing business systems.",
    technologies: ["C#", ".NET", "SQL", "Firebird", "SQL Account ERP"],
    category: "Software",
    image: "/projects/quote.png",
    demo: "https://equotehub.oneclickclouds.com",
  },
  {
    id: "approval-system",
    title: "eApproval",
    description:
      "An approval system for internal request workflows, built to support clearer review and sign-off processes.",
    problem:
      "Helps teams approve requests more consistently instead of chasing approvals through informal channels.",
    technologies: ["C#", ".NET", "SQL", "Firebird", "SQL Account ERP"],
    category: "Software",
    image: "/projects/approval.png",
    demo: "https://eapproval.oneclickclouds.com",
  },
  {
    id: "auto-emailing",
    title: "Auto Emailing Service",
    description:
      "Windows Services that generate and send scheduled email reports automatically from business data.",
    problem:
      "Removes repetitive manual reporting by delivering timely updates on a schedule.",
    technologies: ["C#", ".NET", "Windows Services", "SQL"],
    category: "Automation",
    image: "/projects/emailing.png",
    note: "Backend service with no public live demo (code/service only).",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation Experiments",
    description:
      "Hands-on exploration of n8n for building automation workflows, connecting triggers, APIs, and multi-step processes visually.",
    problem:
      "Useful for stitching tools together quickly when a full custom service is not required yet.",
    technologies: ["n8n", "Webhooks", "API integration", "Automation"],
    category: "Automation",
    image: "/projects/n8n.png",
    note: "Learning / practice work. Add a workflow screenshot or public demo URL when ready.",
  },
];

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Software",
  "Web",
  "Automation",
  "AI",
  "Academic",
  "Personal",
];
