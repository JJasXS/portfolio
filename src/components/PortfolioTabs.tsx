"use client";

import { Lock } from "lucide-react";
import { useMemo, useState } from "react";
import {
  portfolioTabs,
  projects,
  type PortfolioCollection,
} from "@/data/projects";
import { LockedPanel } from "./LockedPanel";
import { ProjectGrid } from "./Projects";

export function PortfolioTabs() {
  const [active, setActive] = useState<PortfolioCollection>("systems");
  const tab = portfolioTabs.find((item) => item.id === active) ?? portfolioTabs[0];

  const items = useMemo(
    () => projects.filter((project) => project.collection === active),
    [active],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Portfolio collections"
      >
        {portfolioTabs.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(item.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selected
                  ? "bg-accent text-white dark:text-background"
                  : "border border-border bg-surface text-muted hover:text-foreground"
              }`}
            >
              {item.locked ? <Lock className="h-3.5 w-3.5" aria-hidden /> : null}
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10" role="tabpanel" aria-label={tab.label}>
        {tab.locked ? (
          <LockedPanel
            title="Videography is locked"
            description={`${tab.empty} This section will open when the work is ready to share.`}
          />
        ) : items.length ? (
          <ProjectGrid items={items} />
        ) : (
          <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-sm text-muted">
            {tab.empty}
          </p>
        )}
      </div>
    </div>
  );
}
