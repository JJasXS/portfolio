"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import {
  skillCategories,
  skillConnections,
  skills,
  type ConstellationSkill,
  type SkillCategoryId,
} from "@/data/skills";
import { isPlaceholderLink } from "@/lib/utils";
import { FadeIn } from "./FadeIn";
import { SkillCarousel } from "./SkillCarousel";
import { SkillCategoryGrid } from "./SkillCategoryGrid";
import { SkillLogo } from "./SkillLogo";
import { SkillSphere } from "./SkillSphere";

function getRelatedProjects(skill: ConstellationSkill) {
  return projects.filter((project) => skill.projects.includes(project.id));
}

function categoryLabel(id: SkillCategoryId) {
  return skillCategories.find((category) => category.id === id)?.label ?? id;
}

export function Skills() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<SkillCategoryId | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragGuardRef = useRef(false);

  const selected = skills.find((skill) => skill.id === selectedId) ?? null;
  const hovered = skills.find((skill) => skill.id === hoveredId) ?? null;
  const focusId = selectedId ?? hoveredId;

  const connectedIds = useMemo(() => {
    if (!focusId) return new Set<string>();
    const set = new Set<string>([focusId]);
    for (const [a, b] of skillConnections) {
      if (a === focusId) set.add(b);
      if (b === focusId) set.add(a);
    }
    return set;
  }, [focusId]);

  const isDimmed = (id: string) => {
    const skill = skills.find((item) => item.id === id);
    if (!skill) return true;
    if (filter !== "all" && skill.category !== filter) return true;
    if (focusId && !connectedIds.has(id)) return true;
    return false;
  };

  const isLineActive = (a: string, b: string) => {
    const skillA = skills.find((s) => s.id === a);
    const skillB = skills.find((s) => s.id === b);
    if (!skillA || !skillB) return false;
    if (filter !== "all") {
      if (skillA.category !== filter && skillB.category !== filter) return false;
    }
    if (!focusId) return true;
    return connectedIds.has(a) && connectedIds.has(b);
  };

  const relatedProjects = selected ? getRelatedProjects(selected) : [];

  const mobileCategoryPages = skillCategories
    .filter((category) => category.id !== "all")
    .map((category) => {
      const items = skills.filter((skill) => skill.category === category.id);
      return { category, items };
    })
    .filter(({ items }) => items.length > 0)
    .map(({ category, items }) => ({
      id: category.id,
      label: category.label,
      content: (
        <SkillCategoryGrid
          items={items}
          selectedId={selectedId}
          onSelect={(id) =>
            setSelectedId((prev) => (prev === id ? null : id))
          }
        />
      ),
    }));

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-x-clip px-4 py-20 sm:px-6 lg:px-10 xl:px-14 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, var(--grid), transparent),
            radial-gradient(1px 1px at 28% 72%, var(--grid), transparent),
            radial-gradient(1px 1px at 63% 22%, var(--grid), transparent),
            radial-gradient(1.5px 1.5px at 82% 58%, var(--glow), transparent),
            radial-gradient(ellipse 60% 50% at 50% 50%, var(--accent-soft), transparent)
          `,
        }}
      />

      <div className="relative mx-auto w-full min-w-0 max-w-[1600px]">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-accent">
              Signature feature
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              My Skill Constellation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              A collection of technologies I&apos;ve explored, learned, and used
              to build things.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-8 hidden md:block">
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Filter skills by category"
          >
            {skillCategories.map((category) => {
              const active = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active
                      ? "bg-accent text-white dark:text-background"
                      : "border border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div
          className={`mt-8 grid min-w-0 gap-6 lg:items-start ${
            selected
              ? "lg:grid-cols-[minmax(0,1fr)_320px]"
              : "lg:grid-cols-1"
          }`}
        >
          <FadeIn delay={0.1} className="relative hidden min-w-0 md:block">
            <SkillSphere
              focusId={focusId}
              selectedId={selectedId}
              dragGuardRef={dragGuardRef}
              isDimmed={isDimmed}
              isLineActive={isLineActive}
              onHover={setHoveredId}
              onSelect={(id) =>
                setSelectedId((prev) => (prev === id ? null : id))
              }
              hoverCard={
                <AnimatePresence>
                  {hovered && !selected ? (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-sm rounded-2xl border border-border bg-surface/95 p-4 text-left shadow-xl backdrop-blur"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {hovered.name}
                      </p>
                      <p className="mt-1 text-xs text-accent">
                        {categoryLabel(hovered.category)} · {hovered.level}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {hovered.description}
                      </p>
                      <p className="mt-3 text-xs text-muted">
                        Click to view related projects
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              }
            />

            <p className="mt-3 text-center text-sm text-muted">
              Drag to spin the sphere. Use +/- to zoom. Wires pulse as you move.
            </p>
          </FadeIn>

          <SkillCarousel pages={mobileCategoryPages} />

          {selected ? (
            <FadeIn delay={0.12} className="min-w-0">
              <aside
                className="rounded-3xl border border-border bg-surface p-5 text-foreground lg:sticky lg:top-24"
                aria-live="polite"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-soft">
                        <SkillLogo
                          skillId={selected.id}
                          name={selected.name}
                          monogram={selected.monogram}
                          size={28}
                        />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-accent">
                          {categoryLabel(selected.category)}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-foreground">
                          {selected.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {selected.level}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="Close skill details"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {selected.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-foreground">
                      Projects using {selected.name}
                    </p>
                    {relatedProjects.length ? (
                      <ul className="mt-3 space-y-2">
                        {relatedProjects.map((project) => (
                          <li key={project.id}>
                            <a
                              href={
                                project.demo &&
                                !isPlaceholderLink(project.demo)
                                  ? project.demo
                                  : "#projects"
                              }
                              target={
                                project.demo &&
                                !isPlaceholderLink(project.demo)
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                project.demo &&
                                !isPlaceholderLink(project.demo)
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface-soft px-3 py-2.5 text-sm text-foreground transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <span>{project.title}</span>
                              {project.demo &&
                              !isPlaceholderLink(project.demo) ? (
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-accent" />
                              ) : null}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">
                        No linked public projects yet. This skill is part of my
                        learning or supporting toolkit.
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </FadeIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
