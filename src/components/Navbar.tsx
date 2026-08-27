"use client";

import { Lock, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { navLinks, personalInfo } from "@/data/personal";
import { PORTFOLIO_LOCKED } from "@/data/projects";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const hash = href.slice(hashIndex);
    if (pathname === "/" || pathname === "") {
      event.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/75 py-2 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-4"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14"
        aria-label="Primary"
      >
        <Link
          href="/#home"
          onClick={(e) => handleNav("/#home", e)}
          className="text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {personalInfo.firstName}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/portfolio"
                ? pathname.startsWith("/portfolio")
                : false;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNav(link.href, e)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition hover:bg-accent-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active ? "text-foreground" : "text-muted"
                  }`}
                >
                  {link.label}
                  {link.href === "/portfolio" && PORTFOLIO_LOCKED ? (
                    <Lock className="h-3 w-3 opacity-70" aria-hidden />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-[1600px] flex-col gap-1 px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNav(link.href, e)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-base text-foreground hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                    {link.href === "/portfolio" && PORTFOLIO_LOCKED ? (
                      <Lock className="h-3.5 w-3.5 opacity-70" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
