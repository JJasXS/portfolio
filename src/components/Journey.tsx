import {
  journey,
  type JourneyNestedSub,
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

type JourneyEntry = {
  id: string;
  type: JourneyType;
  title: string;
  institution: string;
  description?: string;
  yearLabel: string;
  highlight?: string;
  status?: string;
  subs?: JourneyNestedSub[];
  isHead: boolean;
};

function formatYears(year: string, yearEnd?: string) {
  if (!yearEnd) return year;
  return `${year} – ${yearEnd}`;
}

function buildEntries(): JourneyEntry[] {
  const flat: Array<JourneySubItem & { yearLabel: string }> = [];

  for (const group of journey) {
    for (const item of group.items) {
      flat.push({
        ...item,
        yearLabel: formatYears(group.year, group.yearEnd),
      });
    }
  }

  return flat.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    institution: item.institution,
    description: item.description,
    yearLabel: item.yearLabel,
    highlight: item.highlight,
    status: item.status,
    subs: item.subs,
    isHead: item.status === "Present",
  }));
}

const journeyEntries = buildEntries();

function JourneyRow({
  entry,
  isLast,
}: {
  entry: JourneyEntry;
  isLast: boolean;
}) {
  const subs = entry.subs;

  return (
    <li className="group relative grid gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-x-6">
      <div className="flex items-center gap-3 sm:block sm:pt-1">
        <time
          className={`font-mono text-[12px] tracking-wide sm:text-[13px] ${
            entry.isHead ? "text-accent" : "text-muted"
          }`}
        >
          {entry.yearLabel}
        </time>
      </div>

      <div className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4">
        <div className="relative flex flex-col items-center" aria-hidden>
          <span
            className={`relative z-[1] mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
              entry.isHead
                ? "border-accent bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                : "border-accent/50 bg-background"
            }`}
          />
          {!isLast ? (
            <span className="mt-1 w-px flex-1 min-h-[1.5rem] bg-border" />
          ) : null}
        </div>

        <div className="min-w-0 rounded-xl px-1 py-1 transition-colors group-hover:bg-accent-soft/40 sm:px-2 sm:py-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
              {typeLabel[entry.type]}
            </span>

            {entry.isHead ? (
              <span className="rounded-full border border-accent/35 bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                Current
              </span>
            ) : null}

            {entry.status && !entry.isHead ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                {entry.status}
              </span>
            ) : null}

            {entry.highlight ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                {entry.highlight}
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 text-[15px] font-medium leading-snug text-foreground sm:text-base">
            {entry.title}
          </h3>

          <p className="mt-0.5 text-[13px] text-muted">{entry.institution}</p>

          {entry.description ? (
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted sm:text-sm">
              {entry.description}
            </p>
          ) : null}

          {subs?.length ? (
            <ul className="mt-3 space-y-2 border-l border-border pl-3 sm:pl-4">
              {subs.map((sub) => (
                <li key={sub.id} className="min-w-0">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <time className="shrink-0 font-mono text-[11px] tracking-wide text-muted sm:w-[6.5rem]">
                      {sub.yearLabel}
                    </time>
                    <span className="text-[13px] font-medium text-foreground sm:text-sm">
                      {sub.title}
                    </span>
                  </div>
                  {sub.description ? (
                    <p className="mt-1 text-[12px] leading-relaxed text-muted sm:pl-[calc(6.5rem+0.75rem)]">
                      {sub.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function Journey() {
  return (
    <SectionShell id="journey" className="!pb-10 lg:!pb-14">
      <FadeIn>
        <SectionHeading
          eyebrow="Story so far"
          title="My Journey"
          description="From education to hands-on systems work and leadership. A clear path of building, learning, and growing."
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mx-auto mt-10 max-w-4xl">
        <ol className="space-y-1">
          {journeyEntries.map((entry, index) => (
            <JourneyRow
              key={entry.id}
              entry={entry}
              isLast={index === journeyEntries.length - 1}
            />
          ))}
        </ol>
      </FadeIn>
    </SectionShell>
  );
}
