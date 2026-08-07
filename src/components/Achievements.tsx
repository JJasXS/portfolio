"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, Trophy } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  achievements,
  type Achievement,
} from "@/data/achievements";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

const VISIBLE = 3;
const INTERVAL_MS = 5000;
const GAP_PX = 16;
const SLIDE_MS = 500;

function AchievementImage({
  src,
  alt,
  isPlaceholder,
}: {
  src?: string;
  alt: string;
  isPlaceholder?: boolean;
}) {
  if (!src) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
        <ImageIcon className="h-7 w-7 opacity-50" aria-hidden />
        <span className="text-[11px]">Image placeholder</span>
      </div>
    );
  }

  if (isPlaceholder || src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="20vw"
    />
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <article className="glass flex h-full flex-col overflow-hidden rounded-3xl transition hover:border-accent/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/80">
        <AchievementImage
          src={item.image}
          alt={
            item.imagePlaceholder
              ? `${item.title} image placeholder`
              : item.title
          }
          isPlaceholder={item.imagePlaceholder}
        />
        {item.imagePlaceholder ? (
          <span className="absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/55 px-2 py-0.5 text-[9px] uppercase tracking-wide text-slate-300 backdrop-blur-sm">
            Photo coming soon
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {item.year ? (
            <span className="text-xs text-muted">{item.year}</span>
          ) : null}
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground sm:text-base">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs font-medium text-accent-2">
          {item.organization}
        </p>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
          {item.explanation}
        </p>
        {item.placeholder ? (
          <p className="mt-2 text-[10px] uppercase tracking-wide text-accent">
            Placeholder
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function Achievements() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const count = achievements.length;
  const loop = [...achievements, ...achievements, ...achievements];

  // Absolute index into the tripled track; start in the middle copy
  const [index, setIndex] = useState(count);
  const [cardWidth, setCardWidth] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const wrappingRef = useRef(false);

  const step = cardWidth + GAP_PX;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const width =
      (viewport.clientWidth - GAP_PX * (VISIBLE - 1)) / VISIBLE;
    setCardWidth(width);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Auto-advance +1 every 5s (continuous forward loop)
  useEffect(() => {
    if (paused || count <= 1 || !cardWidth) return;
    const id = window.setInterval(() => {
      if (wrappingRef.current) return;
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count, cardWidth]);

  // After sliding past the middle copy, jump back by one full set (no reverse)
  useEffect(() => {
    if (index < count * 2) return;

    wrappingRef.current = true;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex((prev) => prev - count);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          wrappingRef.current = false;
        });
      });
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, count]);

  // After sliding before the middle copy, jump forward one set (seamless loop)
  useEffect(() => {
    if (index >= count) return;

    wrappingRef.current = true;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex((prev) => prev + count);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          wrappingRef.current = false;
        });
      });
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, count]);

  const go = (dir: -1 | 1) => {
    if (wrappingRef.current) return;
    setAnimate(true);
    setIndex((prev) => prev + dir);
  };

  const logical = ((index % count) + count) % count;

  return (
    <SectionShell id="achievements">
      <FadeIn>
        <SectionHeading
          eyebrow="Recognition"
          title="Achievements"
          description="Awards and recognitions from competition and community involvement."
        />
      </FadeIn>

      <div
        className="relative mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div ref={viewportRef} className="overflow-hidden">
          <div
            className="flex"
            style={{
              gap: GAP_PX,
              transform: cardWidth
                ? `translate3d(-${index * step}px, 0, 0)`
                : undefined,
              transition: animate
                ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : "none",
            }}
          >
            {loop.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth || undefined, flex: cardWidth ? undefined : `0 0 calc((100% - ${(VISIBLE - 1) * GAP_PX}px) / ${VISIBLE})` }}
              >
                <AchievementCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous achievement"
            onClick={() => go(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-xs text-muted">
            {logical + 1} / {count}
          </p>
          <button
            type="button"
            aria-label="Next achievement"
            onClick={() => go(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
