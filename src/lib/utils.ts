export function isPlaceholderLink(href: string) {
  return (
    href.startsWith("[") ||
    href.includes("[LINKEDIN") ||
    href.includes("[GITHUB") ||
    href.includes("[WEBSITE") ||
    href === "#"
  );
}
