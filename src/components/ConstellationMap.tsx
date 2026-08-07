"use client";

import {
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const MIN_SCALE = 0.55;
const MAX_SCALE = 2.6;

interface ConstellationMapProps {
  children: ReactNode;
  hoverCard?: ReactNode;
  className?: string;
  /** Set to true after a pan so skill clicks can be ignored */
  dragGuardRef?: MutableRefObject<boolean>;
}

/**
 * Google Maps-style pan + zoom for the skill constellation canvas.
 * Drag to move, scroll / buttons to zoom, Reset to recenter.
 */
export function ConstellationMap({
  children,
  hoverCard,
  className = "",
  dragGuardRef,
}: ConstellationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.85);
  const [grabbing, setGrabbing] = useState(false);

  const dragRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const clampScale = (value: number) =>
    Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const zoomAt = useCallback((nextScale: number, clientX?: number, clientY?: number) => {
    const el = containerRef.current;
    if (!el) {
      setScale(clampScale(nextScale));
      return;
    }

    const rect = el.getBoundingClientRect();
    const cx = clientX ?? rect.left + rect.width / 2;
    const cy = clientY ?? rect.top + rect.height / 2;
    const pointX = cx - rect.left;
    const pointY = cy - rect.top;

    setScale((prevScale) => {
      const clamped = clampScale(nextScale);
      const ratio = clamped / prevScale;
      setOffset((prev) => ({
        x: pointX - (pointX - prev.x) * ratio,
        y: pointY - (pointY - prev.y) * ratio,
      }));
      return clamped;
    });
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    // Only block pan when using map controls
    if (target.closest("[data-no-pan]")) return;

    if (dragGuardRef) dragGuardRef.current = false;
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setGrabbing(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 5) {
      drag.moved = true;
      if (dragGuardRef) dragGuardRef.current = true;
    }

    setOffset({
      x: drag.originX + dx,
      y: drag.originY + dy,
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    setGrabbing(false);
  };

  const resetView = () => {
    setOffset({ x: 0, y: 0 });
    setScale(0.85);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className={`relative h-[min(72vh,660px)] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_0_80px_-40px_rgba(45,212,191,0.45)] touch-none ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="application"
        aria-label="Skill constellation map. Click and drag to pan. Use buttons to zoom."
      >
        <div
          className="absolute left-1/2 top-1/2 will-change-transform"
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>

        {hoverCard}

        <div
          className="absolute bottom-3 right-3 z-20 flex flex-col gap-1"
          data-no-pan
        >
          <button
            type="button"
            onClick={() => zoomAt(scale * 1.18)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-slate-950/90 text-slate-200 backdrop-blur transition hover:border-teal-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => zoomAt(scale / 1.18)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-slate-950/90 text-slate-200 backdrop-blur transition hover:border-teal-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-slate-950/90 text-slate-200 backdrop-blur transition hover:border-teal-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            aria-label="Reset map view"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <p className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-400 backdrop-blur">
          Click and drag to move
        </p>
      </div>
    </div>
  );
}
