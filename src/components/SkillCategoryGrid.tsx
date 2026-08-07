"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { ConstellationSkill } from "@/data/skills";
import { SkillLogo } from "./SkillLogo";

const COLS = 3;
const ROWS = 4;
const VISIBLE_LIMIT = COLS * ROWS; // 12

type SkillCategoryGridProps = {
  items: ConstellationSkill[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function SkillCategoryGrid({
  items,
  selectedId,
  onSelect,
}: SkillCategoryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > VISIBLE_LIMIT;
  const visible = expanded || !hasMore ? items : items.slice(0, VISIBLE_LIMIT);
  const hiddenCount = items.length - VISIBLE_LIMIT;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-3">
        {visible.map((skill) => {
          const active = selectedId === skill.id;
          return (
            <li key={skill.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(skill.id)}
                className={`flex h-[110px] w-full flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                  active
                    ? "border-teal-300/60 bg-teal-400/10"
                    : "border-white/10 bg-[#141a22]"
                }`}
              >
                <SkillLogo
                  skillId={skill.id}
                  name={skill.name}
                  monogram={skill.monogram}
                  size={32}
                />
                <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-200">
                  {skill.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-teal-300/40 hover:text-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" aria-hidden />
            </>
          ) : (
            <>
              More ({hiddenCount})
              <ChevronDown className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}
