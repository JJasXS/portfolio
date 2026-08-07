"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { SocialIcons } from "./SocialIcons";

function ProfilePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-border bg-surface-soft ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="flex h-full min-h-[280px] items-center justify-center sm:min-h-[360px]">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border border-border bg-surface text-4xl font-semibold tracking-tight text-accent sm:h-44 sm:w-44 sm:text-5xl">
          {personalInfo.firstName.slice(0, 1)}
          {personalInfo.lastName.slice(0, 1)}
        </div>
      </div>
      <span className="sr-only">Profile image placeholder</span>
    </div>
  );
}

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
          className="relative"
        >
          {/*
            Replace ProfilePlaceholder with next/image when you add
            a photo at /public/profile/jason.jpg
          */}
          <ProfilePlaceholder />
          <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-border bg-surface/90 p-4 backdrop-blur-md sm:left-8 sm:right-8">
            <p className="text-sm font-medium text-foreground">
              {personalInfo.role}
            </p>
            <p className="mt-1 text-xs text-muted">
              {personalInfo.location} · {personalInfo.lookingFor}
            </p>
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
