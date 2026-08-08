export type SkillLevel =
  | "Studied"
  | "Familiar"
  | "Hands-on"
  | "Used in Projects"
  | "Currently Learning";

export type SkillCategoryId =
  | "programming"
  | "development"
  | "database"
  | "tools"
  | "automation";

export interface ConstellationSkill {
  id: string;
  name: string;
  category: SkillCategoryId;
  /** Short monogram shown in the node */
  monogram: string;
  description: string;
  /** Project IDs from src/data/projects.ts */
  projects: string[];
  level: SkillLevel;
  /** 1 = closest to center, 3 = outer ring */
  orbit: 1 | 2 | 3;
  /** Angle in degrees (0 = right, 90 = down) */
  angle: number;
}

export const skillCategories: Array<{
  id: SkillCategoryId | "all";
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "programming", label: "Programming" },
  { id: "development", label: "Development" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools" },
  { id: "automation", label: "Automation / AI" },
];

/**
 * Skill constellation nodes.
 * Edit freely. Positions use orbit + angle (responsive layout computes x/y).
 */
export const skills: ConstellationSkill[] = [
  {
    id: "csharp",
    name: "C#",
    category: "programming",
    monogram: "C#",
    description:
      "Primary language for business applications, Windows services, and backend workflows.",
    projects: [
      "scanning-system",
      "appointment-booking",
      "quote-hub",
      "approval-system",
      "auto-emailing",
    ],
    level: "Used in Projects",
    orbit: 1,
    angle: 200,
  },
  {
    id: "dotnet",
    name: ".NET",
    category: "development",
    monogram: ".NET",
    description:
      "Built and maintained business systems with C#/.NET across multiple internal products.",
    projects: [
      "scanning-system",
      "appointment-booking",
      "quote-hub",
      "approval-system",
      "auto-emailing",
    ],
    level: "Used in Projects",
    orbit: 1,
    angle: 320,
  },
  {
    id: "sql",
    name: "SQL",
    category: "database",
    monogram: "SQL",
    description:
      "Queries, troubleshooting, and data workflows for business systems.",
    projects: [
      "scanning-system",
      "appointment-booking",
      "quote-hub",
      "approval-system",
      "auto-emailing",
    ],
    level: "Used in Projects",
    orbit: 1,
    angle: 110,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "programming",
    monogram: "JS",
    description:
      "Front-end interactivity for web-based business applications.",
    projects: ["scanning-system", "appointment-booking"],
    level: "Used in Projects",
    orbit: 1,
    angle: 40,
  },
  {
    id: "python",
    name: "Python",
    category: "programming",
    monogram: "Py",
    description:
      "Scripting, automation support, and application tooling.",
    projects: [],
    level: "Hands-on",
    orbit: 2,
    angle: 270,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "programming",
    monogram: "TS",
    description:
      "Typed JavaScript for modern web apps. Actively improving.",
    projects: [],
    level: "Familiar",
    orbit: 2,
    angle: 20,
  },
  {
    id: "react",
    name: "React",
    category: "development",
    monogram: "Re",
    description:
      "Building modern web interfaces; used alongside Next.js while learning.",
    projects: [],
    level: "Familiar",
    orbit: 2,
    angle: 150,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "development",
    monogram: "Nx",
    description:
      "Actively learning for full-stack and portfolio web applications.",
    projects: [],
    level: "Currently Learning",
    orbit: 2,
    angle: 175,
  },
  {
    id: "htmlcss",
    name: "HTML & CSS",
    category: "development",
    monogram: "web",
    description:
      "Responsive layouts and front-end structure for web systems.",
    projects: ["appointment-booking", "scanning-system"],
    level: "Used in Projects",
    orbit: 2,
    angle: 70,
  },
  {
    id: "firebird",
    name: "Firebird SQL",
    category: "database",
    monogram: "Fb",
    description:
      "Queries, tables, UDF fields, and troubleshooting in production systems.",
    projects: ["scanning-system", "quote-hub", "approval-system"],
    level: "Used in Projects",
    orbit: 2,
    angle: 95,
  },
  {
    id: "mssql",
    name: "MSSQL",
    category: "database",
    monogram: "MS",
    description:
      "Business data and application backends with Microsoft SQL Server (MSSQL).",
    projects: [],
    level: "Hands-on",
    orbit: 3,
    angle: 125,
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    monogram: "Git",
    description:
      "Version control for collaborative development and day-to-day work.",
    projects: [],
    level: "Hands-on",
    orbit: 2,
    angle: 300,
  },
  {
    id: "vscode",
    name: "VS Code / Visual Studio",
    category: "tools",
    monogram: "VS",
    description:
      "Daily development environments for coding, debugging, and delivery.",
    projects: [],
    level: "Hands-on",
    orbit: 3,
    angle: 340,
  },
  {
    id: "erp",
    name: "SQL Account ERP",
    category: "tools",
    monogram: "ERP",
    description:
      "Integrated custom systems with ERP workflows for quotation, stock, and invoices.",
    projects: ["quote-hub", "approval-system"],
    level: "Used in Projects",
    orbit: 2,
    angle: 230,
  },
  {
    id: "n8n",
    name: "n8n",
    category: "automation",
    monogram: "n8n",
    description:
      "Explored for visual automation workflows and API stitching.",
    projects: ["n8n-automation"],
    level: "Hands-on",
    orbit: 2,
    angle: 250,
  },
  {
    id: "api",
    name: "API Integration",
    category: "automation",
    monogram: "API",
    description:
      "Connecting systems and data across tools and services.",
    projects: ["n8n-automation", "scanning-system"],
    level: "Hands-on",
    orbit: 3,
    angle: 210,
  },
  {
    id: "ai",
    name: "AI APIs",
    category: "automation",
    monogram: "AI",
    description:
      "Exploring practical AI use in software and automation workflows.",
    projects: [],
    level: "Currently Learning",
    orbit: 3,
    angle: 260,
  },
  {
    id: "automation",
    name: "Automation",
    category: "automation",
    monogram: "Auto",
    description:
      "Scheduled services and process automation for reporting and workflows.",
    projects: ["auto-emailing", "n8n-automation"],
    level: "Used in Projects",
    orbit: 3,
    angle: 185,
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "development",
    monogram: "Fl",
    description:
      "Explored for cross-platform mobile UI development.",
    projects: [],
    level: "Familiar",
    orbit: 3,
    angle: 55,
  },
  {
    id: "firebase",
    name: "Google Firebase",
    category: "development",
    monogram: "Fz",
    description:
      "Familiar with Firebase services for app backends and supporting tooling.",
    projects: [],
    level: "Familiar",
    orbit: 3,
    angle: 85,
  },
  {
    id: "php",
    name: "PHP",
    category: "programming",
    monogram: "PHP",
    description:
      "Familiar with PHP for web scripting and server-side pages.",
    projects: [],
    level: "Familiar",
    orbit: 3,
    angle: 10,
  },
  {
    id: "cpp",
    name: "C++",
    category: "programming",
    monogram: "C++",
    description:
      "Familiar with C++ fundamentals from coursework and practice.",
    projects: [],
    level: "Familiar",
    orbit: 3,
    angle: 160,
  },
  {
    id: "cmd",
    name: "CMD",
    category: "tools",
    monogram: "CMD",
    description:
      "Command-line usage for day-to-day development and system tasks.",
    projects: [],
    level: "Familiar",
    orbit: 3,
    angle: 315,
  },
];

/** Subtle relationship lines between skill nodes */
export const skillConnections: Array<[string, string]> = [
  ["csharp", "dotnet"],
  ["csharp", "sql"],
  ["dotnet", "sql"],
  ["dotnet", "erp"],
  ["sql", "firebird"],
  ["sql", "mssql"],
  ["javascript", "typescript"],
  ["javascript", "htmlcss"],
  ["react", "nextjs"],
  ["react", "typescript"],
  ["python", "ai"],
  ["python", "automation"],
  ["n8n", "api"],
  ["n8n", "automation"],
  ["api", "ai"],
  ["git", "vscode"],
  ["csharp", "automation"],
  ["flutter", "firebase"],
  ["php", "htmlcss"],
  ["cpp", "csharp"],
  ["cmd", "git"],
  ["firebase", "api"],
];

export const learningFocus = [
  { name: "AI", note: "Practical AI APIs and workflows" },
  { name: "Cloud", note: "AWS and modern cloud services" },
  { name: "DevOps", note: "Deployment and CI practices" },
  { name: "Automation", note: "n8n and workflow tooling" },
  { name: "System Design", note: "Scalable application architecture" },
  { name: "Cybersecurity", note: "Secure development fundamentals" },
];
