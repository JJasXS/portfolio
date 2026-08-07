import { personalInfo } from "@/data/personal";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

export function About() {
  return (
    <SectionShell id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-24 w-24 rounded-3xl border border-accent/30" />
            <div className="glass relative overflow-hidden rounded-3xl p-2">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.25rem] bg-surface-soft">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border bg-background text-3xl font-semibold text-accent">
                  {personalInfo.firstName.slice(0, 1)}
                  {personalInfo.lastName.slice(0, 1)}
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              {/* Swap this block for next/image when a profile photo is ready */}
              Profile image placeholder
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
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

          <ul className="mt-8 flex flex-wrap gap-2">
            {personalInfo.interests.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted">
            Languages: {personalInfo.languages.join(" · ")}
          </p>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
