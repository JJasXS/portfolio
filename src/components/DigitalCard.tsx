"use client";

import { Download, Mail, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import { personalInfo } from "@/data/personal";
import { isPlaceholderLink } from "@/lib/utils";
import { downloadCardImage } from "@/lib/cardImage";
import { InstagramIcon, LinkedInIcon } from "./icons";

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-16 shrink-0 text-xs uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="min-w-0">
        {href ? (
          <a
            href={href}
            className="break-all text-sm text-foreground underline-offset-4 transition hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-foreground">{value}</span>
        )}
      </dd>
    </div>
  );
}

function SocialLink({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const placeholder = isPlaceholderLink(href);

  if (placeholder) {
    return (
      <span
        className="inline-flex items-center gap-2 text-sm text-muted/70"
        title={`Add your ${label} URL in src/data/personal.ts`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-foreground transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

/** Compact card panel for embedding beside Contact. */
export function DigitalCardPanel({ className = "" }: { className?: string }) {
  const handleDownload = () => {
    downloadCardImage();
  };

  const initials = `${personalInfo.firstName.slice(0, 1)}${personalInfo.lastName.slice(0, 1)}`;

  return (
    <article
      className={`overflow-hidden rounded-3xl border border-border bg-surface ${className}`}
    >
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold tracking-wide text-foreground"
            aria-hidden="true"
          >
            {initials}
          </div>
          <p className="flex items-center gap-1.5 pt-1 text-xs text-muted sm:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {personalInfo.location}
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          {personalInfo.fullName}
        </h3>
        <p className="mt-1 text-sm text-muted">{personalInfo.role}</p>
      </div>

      <dl className="space-y-3 border-b border-border px-5 py-4 sm:px-6">
        <ContactLine
          label="Email"
          value={personalInfo.email}
          href={`mailto:${personalInfo.email}`}
        />
        <ContactLine label="Phone" value={personalInfo.phone} />
      </dl>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-5 py-4 sm:px-6">
        <SocialLink
          label="LinkedIn"
          href={personalInfo.linkedin}
          icon={LinkedInIcon}
        />
        <SocialLink
          label={personalInfo.instagramHandle}
          href={personalInfo.instagram}
          icon={InstagramIcon}
        />
      </div>

      <div className="flex flex-wrap gap-2 bg-surface-soft/60 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-3.5 py-2.5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Download className="h-4 w-4" />
          Download Card
        </button>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Mail className="h-4 w-4" />
          Email me
        </a>
      </div>
    </article>
  );
}
