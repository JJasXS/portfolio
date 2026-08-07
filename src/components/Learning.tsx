import { learningFocus } from "@/data/skills";
import { FadeIn } from "./FadeIn";
import { SectionShell } from "./Section";

export function Learning() {
  return (
    <SectionShell id="learning" className="py-12 lg:py-16">
      <FadeIn>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10">
          <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-accent-2/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent">
                Growth mindset
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Always Learning
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Technology keeps changing, and so do I. I enjoy exploring new
                tools, frameworks, and technologies while turning what I learn
                into practical projects.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {learningFocus.map((item) => (
                <li
                  key={item.name}
                  className="rounded-2xl border border-border bg-background/60 p-4"
                >
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
