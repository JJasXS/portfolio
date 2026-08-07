"use client";

import { MessageCircle } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export function FloatingContact() {
  const reduce = useReducedMotion();

  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-surface/95 px-4 py-3 text-sm font-medium text-foreground shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Let's Talk: go to contact section"
    >
      <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
      Let&apos;s Talk
    </a>
  );
}
