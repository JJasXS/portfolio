export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  explanation: string;
  /** Path under /public, or omit to show an image placeholder slot */
  image?: string;
  /** True when the image is still a stand-in awaiting a real photo */
  imagePlaceholder?: boolean;
  /** True until real award details replace this entry */
  placeholder?: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "jci-debate-runner-up",
    year: "",
    title: "1st Runner Up, English Debate Competition",
    organization: "Area North Convention by JCI",
    explanation:
      "Placed 1st runner up in the English debate competition at the Area North Convention organised by JCI.",
    image: "/achievements/jci-debate-placeholder.svg",
    imagePlaceholder: true,
  },
  {
    id: "jci-active-new-member",
    year: "",
    title: "Active New Member",
    organization: "JCI United Penang",
    explanation:
      "Recognised as an Active New Member of JCI United Penang.",
    image: "/achievements/jci-active-member-placeholder.svg",
    imagePlaceholder: true,
  },
  ...Array.from({ length: 8 }, (_, i) => {
    const n = i + 3;
    return {
      id: `award-${n}`,
      year: "",
      title: `Award ${n}`,
      organization: "[ORGANIZATION]",
      explanation:
        "Placeholder award entry. Replace with a real achievement when ready.",
      image: "/achievements/award-placeholder.svg",
      imagePlaceholder: true,
      placeholder: true,
    } satisfies Achievement;
  }),
];
