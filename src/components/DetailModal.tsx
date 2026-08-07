"use client";

import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DetailModal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: DetailModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h3
              id={titleId}
              className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
            >
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  );
}

export function ModalPoster({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl border border-border bg-surface-soft">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={750}
        className="h-auto w-full object-cover"
        sizes="(max-width: 672px) 100vw, 672px"
      />
    </div>
  );
}

export function ModalExternalLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ExternalLink className="h-4 w-4" />
      {label}
    </a>
  );
}
