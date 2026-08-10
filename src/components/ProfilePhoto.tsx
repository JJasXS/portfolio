"use client";

import Image from "next/image";
import { personalInfo } from "@/data/personal";

type ProfilePhotoProps = {
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Profile photo with a lightweight HUD-style digital scan overlay.
 * Photo itself is not recolored, filtered, or distorted.
 */
export function ProfilePhoto({
  className = "",
  sizes = "340px",
  priority = false,
}: ProfilePhotoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer HUD brackets */}
      <div className="pointer-events-none absolute -inset-1.5 z-10" aria-hidden>
        <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-accent/55 sm:h-5 sm:w-5" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-accent/55 sm:h-5 sm:w-5" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent/55 sm:h-5 sm:w-5" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/55 sm:h-5 sm:w-5" />
      </div>

      <div className="profile-scan relative overflow-hidden rounded-2xl border border-border/70 bg-surface-soft shadow-[0_18px_50px_-28px_rgba(45,212,191,0.28)]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={personalInfo.profileImage}
            alt={`${personalInfo.fullName} profile photo`}
            fill
            priority={priority}
            className="object-cover object-[center_18%]"
            sizes={sizes}
          />

          {/* Faint HUD grid */}
          <div className="profile-scan-grid pointer-events-none absolute inset-0" aria-hidden />

          {/* Tiny static particles */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <span className="absolute left-[12%] top-[18%] h-0.5 w-0.5 rounded-full bg-accent/50" />
            <span className="absolute right-[16%] top-[28%] h-0.5 w-0.5 rounded-full bg-accent/35" />
            <span className="absolute left-[22%] bottom-[24%] h-0.5 w-0.5 rounded-full bg-accent/40" />
            <span className="absolute right-[20%] bottom-[36%] h-[3px] w-[3px] rounded-full bg-accent/30" />
            <span className="absolute left-[48%] top-[12%] h-0.5 w-0.5 rounded-full bg-accent/25" />
          </div>

          {/* Horizontal neon scan beam */}
          <div className="profile-scan-beam pointer-events-none absolute inset-x-0 z-[2]" aria-hidden>
            <div className="profile-scan-beam-core mx-auto h-px w-full" />
          </div>

          {/* Bottom arrival pulse */}
          <div className="profile-scan-pulse pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16" aria-hidden />
        </div>
      </div>
    </div>
  );
}
