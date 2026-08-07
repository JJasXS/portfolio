"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { isPlaceholderLink } from "@/lib/utils";
import {
  DetailModal,
  ModalExternalLink,
} from "./DetailModal";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

function ProjectThumb({
  title,
  placeholder,
  hasDemo,
}: {
  title: string;
  placeholder?: boolean;
  hasDemo?: boolean;
}) {
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-soft">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-2/20" />
      <div className="relative px-4 text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted">
          {placeholder
            ? "Placeholder project"
            : hasDemo
              ? "Live demo available"
              : "Add thumbnail at /public/projects"}
        </p>
      </div>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <p className="text-sm leading-relaxed text-muted">{project.description}</p>

      <p className="mt-4 text-sm">
        <span className="font-medium text-foreground">Problem it solves: </span>
        <span className="text-muted">{project.problem}</span>
      </p>

      <div className="mt-5">
        <p className="text-sm font-medium text-foreground">Technologies</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.note ? (
        <p className="mt-5 text-sm text-muted">{project.note}</p>
      ) : null}

      {project.demo && !isPlaceholderLink(project.demo) ? (
        <ModalExternalLink href={project.demo} label="Open live demo" />
      ) : null}
    </>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  const active = projects.find((project) => project.id === activeId) ?? null;

  return (
    <SectionShell id="projects">
      <FadeIn>
        <SectionHeading
          eyebrow="Portfolio"
          title="What I've Built"
          description="Selected systems from professional work. Tap a project to view more details."
        />
      </FadeIn>

      <FadeIn delay={0.05} className="mt-8">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => {
            const selected = filter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(category)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected
                    ? "bg-accent text-white dark:text-background"
                    : "border border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </FadeIn>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((project, index) => (
          <li key={project.id}>
            <FadeIn delay={index * 0.04}>
              <article className="group glass flex h-full flex-col rounded-2xl p-4 transition hover:border-accent/30 sm:p-5">
                <ProjectThumb
                  title={project.title}
                  placeholder={project.placeholder}
                  hasDemo={Boolean(
                    project.demo && !isPlaceholderLink(project.demo),
                  )}
                />

                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-surface-soft px-2.5 py-1 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                    {project.technologies.length > 4 ? (
                      <li className="rounded-full bg-surface-soft px-2.5 py-1 text-xs text-muted">
                        +{project.technologies.length - 4}
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveId(project.id)}
                      className="text-sm font-medium text-accent transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      View more
                    </button>

                    {project.demo && !isPlaceholderLink(project.demo) ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </FadeIn>
          </li>
        ))}
      </ul>

      <DetailModal
        open={Boolean(active)}
        onClose={() => setActiveId(null)}
        title={active?.title ?? ""}
        subtitle={active?.category}
      >
        {active ? <ProjectDetail project={active} /> : null}
      </DetailModal>
    </SectionShell>
  );
}
