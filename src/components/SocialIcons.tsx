"use client";

import { Mail } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/personal";
import { isPlaceholderLink } from "@/lib/utils";
import { InstagramIcon, LinkedInIcon } from "./icons";

const icons = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  email: Mail,
} as const;

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
}

export function SocialIcons({
  className = "",
  iconClassName = "h-4 w-4",
}: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = icons[link.id as keyof typeof icons];
        const placeholder = isPlaceholderLink(link.href);
        const href = placeholder && link.id !== "email" ? undefined : link.href;

        if (!href) {
          return (
            <span
              key={link.id}
              title={`Add your ${link.label} URL in src/data/personal.ts`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted opacity-60"
              aria-label={`${link.label} (placeholder)`}
            >
              <Icon className={iconClassName} />
            </span>
          );
        }

        return (
          <a
            key={link.id}
            href={href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={
              link.id === "email"
                ? `Email ${personalInfo.email}`
                : link.label
            }
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
