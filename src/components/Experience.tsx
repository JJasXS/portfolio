"use client";

import {
  Briefcase,
  Calendar,
  Clock,
  Code2,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  experiences,
  type ExperienceItem,
  type ExperienceKind,
  type ExperienceProject,
  type ExperienceRole,
} from "@/data/experience";
import {
  DetailModal,
  ModalExternalLink,
  ModalPoster,
} from "./DetailModal";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

const kindMeta: Record<
  ExperienceKind,
  { label: string; icon: typeof Briefcase }
> = {
  internship: { label: "Internship", icon: Briefcase },
  work: { label: "Work", icon: Briefcase },
  leadership: { label: "Leadership", icon: Users },
  community: { label: "Community", icon: HeartHandshake },
  volunteer: { label: "Volunteering", icon: HeartHandshake },
  event: { label: "Event", icon: Calendar },
  technical: { label: "Technical", icon: Code2 },
};

type ActiveDetail =
  | { type: "role"; item: ExperienceItem; selectedRole?: ExperienceRole }
  | { type: "project"; parent: ExperienceItem; project: ExperienceProject };

function ProjectDetailBody({ project }: { project: ExperienceProject }) {
  return (
    <>
      {project.image ? (
        <ModalPoster src={project.image} alt={`${project.title} poster`} />
      ) : null}

      <p className="text-sm font-medium text-accent">{project.role}</p>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.details ?? project.description}
      </p>

      {project.eventMeta ? (
        <ul className="mt-5 space-y-2 text-sm text-foreground">
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{project.eventMeta.date}</span>
          </li>
          {project.eventMeta.time ? (
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{project.eventMeta.time}</span>
            </li>
          ) : null}
          {project.eventMeta.location ? (
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{project.eventMeta.location}</span>
            </li>
          ) : null}
        </ul>
      ) : null}

      {project.highlights?.length ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-foreground">What we offered</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.highlights.map((itemHighlight) => (
              <li
                key={itemHighlight}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
              >
                {itemHighlight}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.contributions?.length ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-foreground">
            Key contributions
          </p>
          <ul className="mt-2 space-y-2">
            {project.contributions.map((contribution) => (
              <li key={contribution} className="flex gap-2 text-sm text-muted">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.link ? (
        <ModalExternalLink
          href={project.link}
          label={project.linkLabel ?? "Learn more"}
        />
      ) : null}
    </>
  );
}

function RoleDetailBody({
  item,
  selectedRole,
}: {
  item: ExperienceItem;
  selectedRole?: ExperienceRole;
}) {
  const position = selectedRole?.position ?? item.position;
  const details = selectedRole?.details ?? item.details ?? item.description;
  const contributions = selectedRole?.contributions ?? item.contributions;

  return (
    <>
      {selectedRole?.employmentType ? (
        <p className="text-sm font-medium text-accent">
          {selectedRole.employmentType}
        </p>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-muted">{details}</p>

      <div className="mt-5">
        <p className="text-sm font-medium text-foreground">Key contributions</p>
        <ul className="mt-2 space-y-2">
          {contributions.map((contribution) => (
            <li key={contribution} className="flex gap-2 text-sm text-muted">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
      </div>

      {item.projects?.length && !selectedRole ? (
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">
            Projects under this role
          </p>
          <ul className="mt-3 space-y-3">
            {item.projects.map((project) => (
              <li
                key={project.id}
                className="rounded-xl border border-border bg-surface/60 p-4"
              >
                <p className="font-medium text-foreground">{project.title}</p>
                <p className="mt-1 text-sm text-accent">{project.role}</p>
                <p className="mt-2 text-sm text-muted">{project.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-xs text-muted">{position}</p>
    </>
  );
}

function ExperienceCard({
  item,
  onOpenRole,
  onOpenProject,
}: {
  item: ExperienceItem;
  onOpenRole: (item: ExperienceItem, role?: ExperienceRole) => void;
  onOpenProject: (item: ExperienceItem, project: ExperienceProject) => void;
}) {
  const roles = item.roles;
  const [tabId, setTabId] = useState(roles?.[0]?.id ?? "");
  const activeRole = roles?.find((role) => role.id === tabId) ?? roles?.[0];

  const display = activeRole
    ? {
        position: activeRole.position,
        year: activeRole.year,
        yearEnd: activeRole.yearEnd,
        description: activeRole.description,
        contributions: activeRole.contributions,
        kind: activeRole.kind,
        employmentType: activeRole.employmentType,
      }
    : {
        position: item.position,
        year: item.year,
        yearEnd: item.yearEnd,
        description: item.description,
        contributions: item.contributions,
        kind: item.kind,
        employmentType: undefined as string | undefined,
      };

  const meta = kindMeta[display.kind];
  const Icon = meta.icon;
  const preview = display.contributions.slice(0, 2);

  return (
    <article className="glass rounded-2xl p-5 transition hover:border-accent/30 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-accent-2">{item.organization}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
            {display.position}
          </h3>
        </div>
        <p className="rounded-full border border-border px-3 py-1 text-sm text-muted">
          {display.year}
          {display.yearEnd ? ` - ${display.yearEnd}` : ""}
        </p>
      </div>

      {roles && roles.length > 1 ? (
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label={`${item.organization} roles`}
        >
          {roles.map((role) => {
            const selected = role.id === activeRole?.id;
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTabId(role.id)}
                className={`rounded-full px-3 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected
                    ? "bg-accent text-white dark:text-background"
                    : "border border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {role.employmentType ?? role.position}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {display.employmentType ?? meta.label}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {display.description}
      </p>

      <ul className="mt-3 space-y-1.5">
        {preview.map((contribution) => (
          <li key={contribution} className="flex gap-2 text-sm text-muted">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="line-clamp-1">{contribution}</span>
          </li>
        ))}
      </ul>

      {item.projects?.length ? (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Projects
          </p>
          <ul className="mt-3 space-y-2">
            {item.projects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => onOpenProject(item, project)}
                  className="flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3.5 py-3 text-left transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{project.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{project.role}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-accent">
                    View more
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => onOpenRole(item, activeRole)}
        className="mt-4 text-sm font-medium text-accent transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        View role details
      </button>
    </article>
  );
}

export function Experience() {
  const [active, setActive] = useState<ActiveDetail | null>(null);

  const modalTitle = useMemo(() => {
    if (!active) return "";
    if (active.type === "role") {
      return active.selectedRole?.position ?? active.item.position;
    }
    return active.project.title;
  }, [active]);

  const modalSubtitle = useMemo(() => {
    if (!active) return undefined;
    if (active.type === "role") {
      const role = active.selectedRole;
      const year = role?.year ?? active.item.year;
      const yearEnd = role?.yearEnd ?? active.item.yearEnd;
      const type = role?.employmentType;
      return `${active.item.organization} · ${type ? `${type} · ` : ""}${year}${yearEnd ? ` - ${yearEnd}` : ""}`;
    }
    return `${active.project.role} · under ${active.parent.position} · ${active.project.year}`;
  }, [active]);

  return (
    <SectionShell id="experience">
      <FadeIn>
        <SectionHeading
          eyebrow="Beyond the classroom"
          title="Experience & Activities"
          description="Internships, leadership, and community work. Open an item to read the full story."
        />
      </FadeIn>

      <ul className="mt-12 space-y-4">
        {experiences.map((item, index) => (
          <li key={item.id}>
            <FadeIn delay={index * 0.04}>
              <ExperienceCard
                item={item}
                onOpenRole={(experience, role) =>
                  setActive({ type: "role", item: experience, selectedRole: role })
                }
                onOpenProject={(parent, project) =>
                  setActive({ type: "project", parent, project })
                }
              />
            </FadeIn>
          </li>
        ))}
      </ul>

      <DetailModal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={modalTitle}
        subtitle={modalSubtitle}
      >
        {active?.type === "role" ? (
          <RoleDetailBody
            item={active.item}
            selectedRole={active.selectedRole}
          />
        ) : null}
        {active?.type === "project" ? (
          <ProjectDetailBody project={active.project} />
        ) : null}
      </DetailModal>
    </SectionShell>
  );
}
