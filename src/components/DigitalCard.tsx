"use client";

import { Download, Mail, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import { personalInfo } from "@/data/personal";
import { isPlaceholderLink } from "@/lib/utils";
import { downloadCardImage } from "@/lib/cardImage";
import { FadeIn } from "./FadeIn";
import { InstagramIcon, LinkedInIcon } from "./icons";
import { SectionShell } from "./Section";

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <>
      <dt className="pt-3 text-sm text-muted sm:w-20 sm:shrink-0 sm:pt-0">
        {label}
      </dt>
      <dd className="pb-3 sm:pb-0">
        <a
          href={href}
          className="text-[15px] text-foreground underline-offset-4 transition hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {value}
        </a>
      </dd>
    </>
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

export function DigitalCard() {
  const handleDownload = () => {
    downloadCardImage();
  };

  const initials = `${personalInfo.firstName.slice(0, 1)}${personalInfo.lastName.slice(0, 1)}`;

  return (
    <SectionShell id="card" className="pt-4 lg:pt-8">
      <FadeIn>
        <p className="text-sm text-muted">Digital name card</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          How to reach me
        </h2>
      </FadeIn>

      <FadeIn delay={0.06} className="mt-10">
        <article className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Quiet top band: identity, not a grid of identical fields */}
          <div className="border-b border-border px-6 py-8 sm:px-9 sm:py-10">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold tracking-wide text-foreground"
                aria-hidden="true"
              >
                {initials}
              </div>
              <p className="flex items-center gap-1.5 pt-1 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {personalInfo.location}
              </p>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {personalInfo.fullName}
            </h3>
            <p className="mt-2 text-base text-muted">{personalInfo.role}</p>
          </div>

          {/* Contact: simple definition list, no nested cards */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-border px-6 py-2 sm:grid-cols-[5rem_1fr] sm:items-baseline sm:px-9 sm:py-4">
            <ContactLine
              label="Email"
              value={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
            />
          </dl>

          {/* Social: compact links, not field cards showing placeholders */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border px-6 py-5 sm:px-9">
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

          <div className="flex flex-wrap gap-3 border-t border-border bg-surface-soft/60 px-6 py-5 sm:px-9">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Download className="h-4 w-4" />
              Download Card Image
            </button>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </div>
        </article>
      </FadeIn>
    </SectionShell>
  );
}
