"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiArrowDown, FiGithub, FiChevronDown } from "react-icons/fi";
import Magnetic from "@/components/Magnetic";
import { useTypewriter } from "@/hooks/useTypewriter";
import { site } from "@/lib/site";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

const PHRASES = [
  "Building products that scale.",
  "Mentoring the next generation of engineers.",
  "Final Year @ TIET · AI/ML Mentor @ GDG",
] as const;

const NAME = "Agrim Verma";

/**
 * Each character carries a slice of the hero gradient (oversized background,
 * offset per index) so the gradient reads continuously across the whole name
 * even though every letter animates independently.
 */
function GradientName() {
  const reduce = useReducedMotion();
  const chars = NAME.split("");
  const n = chars.length;

  return (
    <h1
      aria-label={NAME}
      className="font-display text-6xl font-bold tracking-tight sm:text-8xl lg:text-[6.5rem]"
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block bg-clip-text text-transparent will-change-transform"
          style={{
            backgroundImage: "var(--gradient-hero)",
            backgroundSize: `${n * 100}% 100%`,
            backgroundPosition: `${(i / (n - 1)) * 100}% 0`,
          }}
          initial={reduce ? false : { y: "0.55em", opacity: 0, filter: "blur(12px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            delay: 0.35 + i * 0.045,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const typed = useTypewriter(PHRASES);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#projects", { offset: -80 });
    else
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ambient gradient orbs, behind the particles */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-primary/20 blur-[120px] motion-safe:animate-orb-drift"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-cyan/10 blur-[120px] motion-safe:animate-orb-drift-alt"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-warm/10 blur-[100px]"
      />

      <ParticleField />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 rounded-full border border-white/10 bg-bg-primary/50 px-5 py-2 font-mono text-xs tracking-[0.25em] text-text-primary/90 backdrop-blur-md sm:text-sm"
        >
          FULL STACK ENGINEER &amp; ML DEVELOPER
        </motion.p>

        <GradientName />

        {/* typewriter – fixed height prevents layout shift between phrases */}
        <div className="mt-8 flex h-8 items-center justify-center">
          <p className="font-mono text-base text-text-secondary sm:text-lg">
            {typed}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-accent-primary motion-safe:animate-blink"
            />
          </p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(108,99,255,0.5)]"
            >
              View My Work
              <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-text-muted px-7 py-3.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-accent-cyan/60 hover:text-accent-cyan"
            >
              <FiGithub />
              @{site.githubHandle}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <FiChevronDown className="h-6 w-6 text-text-secondary motion-safe:animate-chevron-nudge" />
      </motion.div>
    </section>
  );
}
