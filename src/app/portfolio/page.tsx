import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { LockedPanel } from "@/components/LockedPanel";
import { Navbar } from "@/components/Navbar";
import { SectionHeading, SectionShell } from "@/components/Section";
import { personalInfo } from "@/data/personal";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Systems, websites, and creative work by ${personalInfo.fullName}.`,
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <a
        href="#main"
        className="absolute left-4 top-4 z-[60] -translate-y-16 rounded-lg bg-accent px-4 py-2 text-sm text-white transition focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-background"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <SectionShell id="portfolio" className="pt-28 lg:pt-32">
          <FadeIn>
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected work"
              description="Work is being prepared. This page will open when the portfolio is ready."
            />
          </FadeIn>
          <FadeIn delay={0.06} className="mt-10">
            <LockedPanel />
          </FadeIn>
        </SectionShell>
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
