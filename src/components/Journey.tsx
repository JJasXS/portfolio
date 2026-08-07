"use client";

import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Rocket,
  Users,
} from "lucide-react";
import { journey, type JourneyType } from "@/data/journey";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

const typeMeta: Record<
  JourneyType,
  { label: string; icon: typeof GraduationCap }
> = {
  education: { label: "Education", icon: GraduationCap },
  internship: { label: "Internship", icon: Briefcase },
  work: { label: "Work", icon: Briefcase },
  project: { label: "Project", icon: Code2 },
  achievement: { label: "Achievement", icon: Award },
  leadership: { label: "Leadership", icon: Users },
};

function formatYears(year: string, yearEnd?: string) {
  if (!yearEnd) return year;
  return `${year} - ${yearEnd}`;
}

export function Journey() {
  return (
    <SectionShell id="journey">
      <FadeIn>
        <SectionHeading
          eyebrow="Story so far"
          title="My Journey"
          description="From education to hands-on systems work and leadership. A clear path of building, learning, and growing."
        />
      </FadeIn>

      <div className="relative mx-auto mt-10 max-w-3xl">
        <ol className="relative border-l border-border sm:ml-2">
          {journey.map((group, groupIndex) => {
            const isLastGroup = groupIndex === journey.length - 1;
            const multi = group.items.length > 1;

            return (
              <li key={group.id} className="relative pl-8 sm:pl-10">
                <span
                  className="absolute -left-[5px] top-4 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-background"
                  aria-hidden="true"
                />

                <FadeIn delay={groupIndex * 0.04}>
                  <div
                    className={`pb-7 ${isLastGroup ? "pb-2" : "border-b border-border/70"}`}
                  >
                    <time className="block pt-2.5 text-sm font-semibold tracking-wide text-accent">
                      {formatYears(group.year, group.yearEnd)}
                    </time>

                    <ul className={multi ? "mt-4 space-y-4" : "mt-3"}>
                      {group.items.map((item) => {
                        const meta = typeMeta[item.type];
                        const Icon = meta.icon;

                        return (
                          <li
                            key={item.id}
                            className={
                              multi
                                ? "rounded-xl border border-border/80 bg-surface/40 px-4 py-3.5"
                                : undefined
                            }
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                                <Icon className="h-3 w-3" aria-hidden="true" />
                                {meta.label}
                              </span>
                              {item.highlight ? (
                                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                                  {item.highlight}
                                </span>
                              ) : null}
                              {item.status ? (
                                <span className="rounded-full border border-accent/30 bg-accent-soft/50 px-2 py-0.5 text-[11px] font-medium text-accent">
                                  {item.status}
                                </span>
                              ) : null}
                            </div>

                            <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                              {item.title}
                            </h3>
                            <p className="mt-0.5 text-sm text-accent-2">
                              {item.institution}
                            </p>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                              {item.description}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ol>

        <FadeIn delay={0.15} className="mt-6 pl-8 sm:pl-10">
          <div className="inline-flex items-center gap-2 text-sm text-muted">
            <Rocket className="h-4 w-4 text-accent" aria-hidden="true" />
            Next: building, shipping, and growing as an engineer
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
