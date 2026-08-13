"use client";

import { Rocket } from "lucide-react";
import { useMemo, useState } from "react";
import {
  journey,
  type JourneySubItem,
  type JourneyType,
} from "@/data/journey";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

const typeLabel: Record<JourneyType, string> = {
  education: "Education",
  internship: "Internship",
  work: "Work",
  project: "Project",
  achievement: "Achievement",
  leadership: "Leadership",
};

type JourneyCommit = {
  id: string;
  type: JourneyType;
  title: string;
  institution: string;
  description: string;
  yearLabel: string;
  highlight?: string;
  status?: string;
  isHead: boolean;
};

function formatYears(year: string, yearEnd?: string) {
  if (!yearEnd) return year;
  return `${year} – ${yearEnd}`;
}

function buildCommits(): JourneyCommit[] {
  const flat: Array<JourneySubItem & { yearLabel: string }> = [];

  for (const group of journey) {
    for (const item of group.items) {
      flat.push({
        ...item,
        yearLabel: formatYears(group.year, group.yearEnd),
      });
    }
  }

  return flat.map((item, index) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    institution: item.institution,
    description: item.description,
    yearLabel: item.yearLabel,
    highlight: item.highlight,
    status: item.status,
    isHead: index === 0,
  }));
}

function CommitRow({
  commit,
  expanded,
  isLast,
  onToggle,
}: {
  commit: JourneyCommit;
  expanded: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="relative">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="group grid w-full grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 rounded-lg px-1 py-2.5 text-left transition hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50"
      >
        <span className="relative flex flex-col items-center pt-1.5" aria-hidden>
          <span
            className={`relative z-[1] h-2.5 w-2.5 rounded-full border ${
              commit.isHead
                ? "border-teal-300 bg-teal-400 git-head-pulse"
                : "border-teal-400/55 bg-[#0b1118]"
            }`}
          />
          {!isLast ? (
            <span className="mt-1 w-px flex-1 min-h-[2.5rem] bg-teal-400/25" />
          ) : null}
        </span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal-400/10 px-2 py-0.5 text-[11px] font-medium text-teal-300">
              {typeLabel[commit.type]}
            </span>

            {commit.isHead ? (
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-2 py-0.5 text-[11px] font-medium text-fuchsia-300">
                Current
              </span>
            ) : null}

            {commit.status && !commit.isHead ? (
              <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2 py-0.5 text-[11px] font-medium text-teal-300">
                {commit.status}
              </span>
            ) : null}

            {commit.highlight ? (
              <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-2 py-0.5 text-[11px] font-medium text-yellow-200/90">
                {commit.highlight}
              </span>
            ) : null}

            <span className="ml-auto hidden text-[12px] text-slate-500 sm:inline">
              {commit.yearLabel}
            </span>
          </span>

          <span className="mt-1.5 block text-[15px] font-medium leading-snug text-slate-100 group-hover:text-white sm:text-base">
            {commit.title}
          </span>

          <span className="mt-0.5 block text-[13px] text-slate-400">
            {commit.institution}
          </span>

          <span className="mt-1 block text-[12px] text-slate-500 sm:hidden">
            {commit.yearLabel}
          </span>
        </span>
      </button>

      {expanded ? (
        <div
          className="ml-[1.25rem] border-l border-teal-400/20 pl-5 pb-3 pt-0.5"
          role="region"
          aria-label={`Details for ${commit.title}`}
        >
          <p className="max-w-2xl text-[13px] leading-relaxed text-slate-300 sm:text-sm">
            {commit.description}
          </p>
        </div>
      ) : null}

      {!isLast && !expanded ? (
        <div className="ml-[0.55rem] h-1.5 w-px bg-teal-400/25" aria-hidden />
      ) : null}
    </li>
  );
}

export function Journey() {
  const commits = useMemo(() => buildCommits(), []);
  const [expandedId, setExpandedId] = useState<string | null>(
    commits[0]?.id ?? null,
  );

  return (
    <SectionShell id="journey">
      <FadeIn>
        <SectionHeading
          eyebrow="Story so far"
          title="My Journey"
          description="From education to hands-on systems work and leadership. A clear path of building, learning, and growing."
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mx-auto mt-10 max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-[#0b1118] shadow-[0_18px_50px_-28px_rgba(45,212,191,0.28)]">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <p className="text-[11px] tracking-wide text-slate-400">
              Career timeline
            </p>
            <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-teal-400/80">
              Story
            </span>
          </div>

          <ol className="px-3 py-3 sm:px-4">
            {commits.map((commit, index) => (
              <CommitRow
                key={commit.id}
                commit={commit}
                expanded={expandedId === commit.id}
                isLast={index === commits.length - 1}
                onToggle={() =>
                  setExpandedId((prev) =>
                    prev === commit.id ? null : commit.id,
                  )
                }
              />
            ))}
          </ol>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <Rocket className="h-4 w-4 text-accent" aria-hidden="true" />
          Next: building, shipping, and growing as an engineer
        </div>
      </FadeIn>
    </SectionShell>
  );
}
