import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isPlaceholderLink(href: string) {
  return (
    href.startsWith("[") ||
    href.includes("[LINKEDIN") ||
    href.includes("[GITHUB") ||
    href.includes("[WEBSITE") ||
    href === "#"
  );
}
