"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { ProfilePhoto } from "./ProfilePhoto";
import { SocialIcons } from "./SocialIcons";

export function Hero() {
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow-orb left-[-10%] top-20 h-72 w-72" />
      <div className="glow-orb bottom-10 right-[-5%] h-80 w-80 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-sm font-medium tracking-wide text-accent"
          >
            Personal portfolio & digital name card
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {personalInfo.firstName}.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 text-lg text-muted sm:text-xl"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted"
          >
            {personalInfo.shortIntro}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo("#journey")}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-background"
            >
              View My Journey
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View My Projects
            </button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-8"
          >
            <SocialIcons />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[280px] pb-2 sm:max-w-[320px] lg:ml-auto lg:mr-0 lg:max-w-[340px]"
        >
          <ProfilePhoto
            priority
            className="w-full"
            sizes="(max-width: 1024px) 280px, 340px"
          />

          <div className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-3.5 sm:bottom-3.5">
            <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-[#070a0e]/82 px-3 py-2.5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.75)] backdrop-blur-md dark:bg-[#070a0e]/78">
              <span
                className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-accent/70"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-accent/70"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-accent/70"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent/70"
                aria-hidden
              />

              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent">
                  Currently
                </p>
                <p className="font-mono text-[9px] tracking-wide text-slate-400">
                  Penang
                </p>
              </div>
              <p className="mt-1 text-[13px] font-semibold tracking-tight text-slate-50">
                {personalInfo.role}
              </p>
              <p className="text-[11px] text-slate-400">{personalInfo.company}</p>
              <p className="mt-2 border-t border-white/10 pt-1.5 text-[10px] leading-snug text-slate-400">
                {personalInfo.lookingFor}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("#about")}
        className="mx-auto mt-16 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Scroll to about section"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
