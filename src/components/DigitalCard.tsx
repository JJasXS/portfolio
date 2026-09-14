"use client";

import { Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { personalInfo } from "@/data/personal";
import { downloadCardImage } from "@/lib/cardImage";

/** Compact card panel for embedding beside Contact. */
export function DigitalCardPanel({ className = "" }: { className?: string }) {
  const handleDownload = () => {
    downloadCardImage();
  };

  return (
    <article
      className={`overflow-hidden rounded-3xl border border-border bg-surface ${className}`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Profile column */}
        <div className="relative flex flex-col items-center justify-center gap-3 border-b border-border bg-surface-soft/40 px-5 py-6 text-center sm:w-[38%] sm:border-b-0 sm:border-r sm:px-5 sm:py-7">
          <span
            className="absolute inset-y-0 left-0 w-1 bg-accent sm:block"
            aria-hidden="true"
          />
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-accent/40 sm:h-28 sm:w-28">
            <Image
              src={personalInfo.profileImage}
              alt={`${personalInfo.fullName} profile photo`}
              fill
              className="object-cover object-[center_18%]"
              sizes="112px"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {personalInfo.fullName}
            </h3>
            <p className="mt-1 text-sm text-muted">{personalInfo.role}</p>
            <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {personalInfo.location}
            </p>
          </div>
        </div>

        {/* Details column */}
        <div className="flex flex-1 flex-col justify-center gap-6 px-5 py-5 sm:px-6 sm:py-6">
          <dl>
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Email
              </dt>
              <dd className="min-w-0">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="break-all text-sm text-foreground underline-offset-4 transition hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-base"
                >
                  {personalInfo.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
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
        </div>
      </div>
    </article>
  );
}
