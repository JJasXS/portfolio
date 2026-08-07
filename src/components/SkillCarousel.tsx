"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SkillCarouselPage = {
  id: string;
  label: string;
  content: ReactNode;
};

type SkillCarouselProps = {
  pages: SkillCarouselPage[];
};

export function SkillCarousel({ pages }: SkillCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const syncIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.clientWidth) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.max(0, Math.min(pages.length - 1, next)));
  }, [pages.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncIndex();
    el.addEventListener("scroll", syncIndex, { passive: true });
    const ro = new ResizeObserver(syncIndex);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncIndex);
      ro.disconnect();
    };
  }, [syncIndex]);

  const goTo = (pageIndex: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pages.length - 1, pageIndex));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const current = pages[index];

  return (
    <div className="min-w-0 md:hidden">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">
          {current?.label ?? "Skills"}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous skill category"
            disabled={index <= 0}
            onClick={() => goTo(index - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition enabled:hover:border-teal-300/50 enabled:hover:text-teal-200 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next skill category"
            disabled={index >= pages.length - 1}
            onClick={() => goTo(index + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition enabled:hover:border-teal-300/50 enabled:hover:text-teal-200 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex max-w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          touchAction: "pan-x pinch-zoom",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {pages.map((page) => (
          <section
            key={page.id}
            aria-label={page.label}
            className="w-full min-w-full shrink-0 snap-start snap-always px-0.5"
          >
            {page.content}
          </section>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {pages.map((page, i) => (
          <button
            key={page.id}
            type="button"
            aria-label={`Go to ${page.label}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition ${
              i === index
                ? "w-6 bg-teal-300"
                : "w-2 bg-white/20 hover:bg-white/35"
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-[11px] text-slate-500">
        {index + 1} / {pages.length} · swipe for next category
      </p>
    </div>
  );
}
