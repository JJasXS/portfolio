import { Download, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { FadeIn } from "./FadeIn";
import { ProfilePhoto } from "./ProfilePhoto";
import { SectionHeading, SectionShell } from "./Section";

export function Resume() {
  return (
    <SectionShell id="resume">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <FadeIn className="order-1 mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:mx-0">
          <ProfilePhoto sizes="300px" className="w-full" />
        </FadeIn>

        <FadeIn delay={0.1} className="order-2 min-w-0">
          <SectionHeading
            eyebrow="Resume"
            title="My resume"
            description={`${personalInfo.role} at ${personalInfo.company}, based in ${personalInfo.location}. ${personalInfo.lookingFor}`}
          />

          <p className="mt-6 text-base leading-relaxed text-muted">
            Download a copy for the full picture: education, professional
            experience, technical skills, and community involvement.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={personalInfo.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-background"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href={personalInfo.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              View PDF
            </a>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
