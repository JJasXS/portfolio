export const personalInfo = {
  firstName: "Jason",
  lastName: "Choo Jie Sern",
  fullName: "Jason Choo Jie Sern",
  role: "Software Engineer",
  tagline: "Software Engineer | Builder | Technology Enthusiast",
  location: "Penang, Malaysia",
  email: "jason.choo2004@gmail.com",
  phone: "XXX-XXX XXXX",
  linkedin: "https://www.linkedin.com/in/jason-choo-7a871228a/",
  instagram: "https://www.instagram.com/jasch_04/",
  instagramHandle: "@jasch_04",
  /** Live website URL */
  website: "https://jschoo.com",
  /** Canonical site URL for SEO */
  siteUrl: "https://jschoo.com",
  /** Profile photo under /public */
  profileImage: "/profile/profile_picture.jpg",
  company: "Procc System Consulting",
  shortIntro:
    "I'm a software engineering graduate passionate about building practical software, learning new technologies, and turning ideas into useful solutions.",
  about: [
    "I'm a software engineering graduate from Tunku Abdul Rahman University of Management & Technology (Penang Branch), focused on building practical systems that solve real problems.",
    "I enjoy software development, automation, and exploring how AI and modern tools can improve everyday workflows. I care about clean solutions, reliable systems, and continuously learning new technologies.",
    "Whether it's a business system, a web app, or an automation workflow, I like turning ideas into working software and improving through hands-on experience.",
  ],
  interests: [
    "Software development",
    "Automation",
    "AI & technology",
    "Practical systems",
    "Continuous learning",
  ],
  languages: ["Bahasa Melayu", "English", "Mandarin"],
  lookingFor: "Open to meaningful opportunities and collaborations.",
} as const;

export const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: personalInfo.linkedin,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: personalInfo.instagram,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    external: false,
  },
] as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;
