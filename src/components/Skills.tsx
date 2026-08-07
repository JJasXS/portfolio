"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { personalInfo } from "@/data/personal";
import { projects } from "@/data/projects";
import {
  skillCategories,
  skillConnections,
  skills,
  type ConstellationSkill,
  type SkillCategoryId,
} from "@/data/skills";
import { isPlaceholderLink } from "@/lib/utils";
import { ConstellationMap } from "./ConstellationMap";
import { FadeIn } from "./FadeIn";
import { SkillCarousel } from "./SkillCarousel";
import { SkillCategoryGrid } from "./SkillCategoryGrid";
import { SkillLogo } from "./SkillLogo";

const VIEW_W = 1100;
const VIEW_H = 820;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;

const ORBIT_RADIUS: Record<1 | 2 | 3, number> = {
  1: 190,
  2: 300,
  3: 400,
};

function polar(orbit: 1 | 2 | 3, angleDeg: number) {
  const r = ORBIT_RADIUS[orbit];
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * r,
    y: CY + Math.sin(rad) * r,
  };
}

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

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const skill of skills) {
      map.set(skill.id, polar(skill.orbit, skill.angle));
    }
    return map;
  }, []);

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
      className="relative scroll-mt-24 overflow-x-clip px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#070b12]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 63% 22%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 82% 58%, rgba(45,212,191,0.45), transparent),
            radial-gradient(1px 1px at 48% 48%, rgba(255,255,255,0.15), transparent),
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(45,212,191,0.1), transparent)
          `,
        }}
      />

      <div className="relative mx-auto w-full min-w-0 max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-teal-300/90">
              Signature feature
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              My Skill Constellation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
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
                  className={`rounded-full px-3.5 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                    active
                      ? "bg-teal-400 text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:border-teal-400/40 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <FadeIn delay={0.1} className="relative hidden min-w-0 md:block">
            <ConstellationMap
              dragGuardRef={dragGuardRef}
              hoverCard={
                <AnimatePresence>
                  {hovered && !selected ? (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-left shadow-xl backdrop-blur md:left-4"
                    >
                      <p className="text-sm font-semibold text-slate-50">
                        {hovered.name}
                      </p>
                      <p className="mt-1 text-xs text-teal-300/90">
                        {categoryLabel(hovered.category)} · {hovered.level}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {hovered.description}
                      </p>
                      <p className="mt-3 text-xs text-slate-500">
                        Click to view related projects
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              }
            >
              <svg
                width={VIEW_W}
                height={VIEW_H}
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="max-w-none select-none"
                role="img"
                aria-label="Skill constellation diagram"
              >
                <defs>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(45,212,191,0.35)" />
                    <stop offset="100%" stopColor="rgba(45,212,191,0)" />
                  </radialGradient>
                </defs>

                <circle cx={CX} cy={CY} r="130" fill="url(#centerGlow)" />

                {skillConnections.map(([a, b]) => {
                  const pa = positions.get(a);
                  const pb = positions.get(b);
                  if (!pa || !pb) return null;
                  const active = isLineActive(a, b);
                  const dimmed = Boolean(focusId) && !active;

                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={pa.x}
                      y1={pa.y}
                      x2={pb.x}
                      y2={pb.y}
                      stroke={
                        active && focusId
                          ? "#2dd4bf"
                          : "rgba(148,163,184,0.28)"
                      }
                      strokeWidth={active && focusId ? 1.6 : 1}
                      strokeOpacity={
                        dimmed ? 0.12 : active && focusId ? 0.9 : 0.45
                      }
                      className="transition-all duration-300"
                    />
                  );
                })}

                <motion.g
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <circle
                    cx={CX}
                    cy={CY}
                    r="54"
                    fill="rgba(15,23,42,0.95)"
                    stroke="rgba(45,212,191,0.65)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={CX}
                    cy={CY}
                    r="62"
                    fill="none"
                    stroke="rgba(45,212,191,0.2)"
                    strokeWidth="1"
                  />
                  <text
                    x={CX}
                    y={CY - 6}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="15"
                    fontWeight="600"
                    fontFamily="var(--font-geist-sans), system-ui, sans-serif"
                  >
                    {personalInfo.firstName.toUpperCase()}
                  </text>
                  <text
                    x={CX}
                    y={CY + 14}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="var(--font-geist-sans), system-ui, sans-serif"
                  >
                    Software Engineer
                  </text>
                </motion.g>

                {skills.map((skill, index) => {
                  const pos = positions.get(skill.id);
                  if (!pos) return null;
                  const dimmed = isDimmed(skill.id);
                  const isFocus = focusId === skill.id;
                  const nodeR =
                    skill.orbit === 1 ? 30 : skill.orbit === 2 ? 26 : 24;

                  return (
                    <g
                      key={skill.id}
                      opacity={dimmed ? 0.22 : 1}
                      className={`transition-opacity duration-300 ${reduce ? "" : "constellation-float"}`}
                      style={
                        reduce
                          ? undefined
                          : {
                              animationDelay: `${index * 0.2}s`,
                              animationDuration: `${5 + (index % 4)}s`,
                            }
                      }
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isFocus ? nodeR + 6 : nodeR + 3}
                        fill={
                          isFocus
                            ? "rgba(45,212,191,0.18)"
                            : "rgba(45,212,191,0.06)"
                        }
                      />
                      <foreignObject
                        x={pos.x - nodeR}
                        y={pos.y - nodeR}
                        width={nodeR * 2}
                        height={nodeR * 2}
                      >
                        <button
                          type="button"
                          aria-label={`${skill.name}, ${categoryLabel(skill.category)}, ${skill.level}`}
                          aria-pressed={selectedId === skill.id}
                          onMouseEnter={() => setHoveredId(skill.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onFocus={() => setHoveredId(skill.id)}
                          onBlur={() => setHoveredId(null)}
                          onClick={() => {
                            if (dragGuardRef.current) return;
                            setSelectedId((prev) =>
                              prev === skill.id ? null : skill.id,
                            );
                          }}
                          className={`flex h-full w-full cursor-pointer items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                            isFocus
                              ? "scale-110 border-teal-300 bg-slate-900 shadow-[0_0_24px_rgba(45,212,191,0.35)]"
                              : "border-white/15 bg-slate-900/90 hover:border-teal-300/50"
                          }`}
                        >
                          <SkillLogo
                            skillId={skill.id}
                            name={skill.name}
                            monogram={skill.monogram}
                            size={skill.orbit === 1 ? 24 : 20}
                          />
                        </button>
                      </foreignObject>
                      <text
                        x={pos.x}
                        y={pos.y + nodeR + 14}
                        textAnchor="middle"
                        fill={dimmed ? "#475569" : "#cbd5e1"}
                        fontSize="11"
                        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
                        className="pointer-events-none select-none"
                      >
                        {skill.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </ConstellationMap>

            <p className="mt-3 text-center text-sm text-slate-500">
              Click and drag to look around. Use +/- to zoom.
            </p>
          </FadeIn>

          <SkillCarousel pages={mobileCategoryPages} />

          <FadeIn delay={0.12} className="min-w-0">
            <aside
              className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-slate-200 lg:sticky lg:top-24"
              aria-live="polite"
            >
              {selected ? (
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <SkillLogo
                          skillId={selected.id}
                          name={selected.name}
                          monogram={selected.monogram}
                          size={28}
                        />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-teal-300/90">
                          {categoryLabel(selected.category)}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-white">
                          {selected.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {selected.level}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                      aria-label="Close skill details"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {selected.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-white">
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
                              className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 transition hover:border-teal-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                            >
                              <span>{project.title}</span>
                              {project.demo &&
                              !isPlaceholderLink(project.demo) ? (
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                              ) : null}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">
                        No linked public projects yet. This skill is part of my
                        learning or supporting toolkit.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[220px] flex-col justify-center">
                  <p className="text-sm font-medium text-white">
                    Explore a technology
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Hover or tap a node to see what I&apos;ve used it for, and
                    which projects it connects to.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-500">
                    <li>What I know → technology nodes</li>
                    <li>How I use it → level & description</li>
                    <li>What I built → related projects</li>
                  </ul>
                </div>
              )}
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
