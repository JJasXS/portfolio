import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Learning } from "@/components/Learning";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="absolute left-4 top-4 z-[60] -translate-y-16 rounded-lg bg-accent px-4 py-2 text-sm text-white transition focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-background"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Learning />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
