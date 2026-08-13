import { personalInfo } from "@/data/personal";
import { FadeIn } from "./FadeIn";
import { JsonSnippet } from "./JsonSnippet";
import { SectionHeading, SectionShell } from "./Section";

export function About() {
  return (
    <SectionShell id="about">
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <FadeIn className="order-2 min-w-0 lg:order-1">
          <JsonSnippet />
        </FadeIn>

        <FadeIn delay={0.1} className="order-1 min-w-0 lg:order-2">
          <SectionHeading
            eyebrow="About"
            title="A little about me"
            description={personalInfo.about[0]}
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {personalInfo.about.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs tracking-wide text-muted">
            Flip the tabs for profile · stack · now
          </p>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
