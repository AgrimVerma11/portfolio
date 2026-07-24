"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiArrowDown, FiGithub, FiChevronDown } from "react-icons/fi";
import Magnetic from "@/components/Magnetic";
import { useTypewriter } from "@/hooks/useTypewriter";
import { site } from "@/lib/site";

const PHRASES = [
  "Building products that scale.",
  "Founder of Firasa · 260+ users, 10+ countries.",
  "Final Year @ TIET · AI/ML Mentor @ GDG",
] as const;

const WORDS = ["Agrim", "Verma"];

/**
 * Words fade and rise in, staggered. Deliberately opacity/transform only:
 * an earlier per-character version animated filter blur on eleven separate
 * elements, which is one of the most expensive properties to animate and
 * was visibly janking on mid-range mobile GPUs. Two elements, two cheap
 * properties, composited on every device.
 */
function AnimatedName() {
  const reduce = useReducedMotion();

  return (
    <h1
      aria-label={WORDS.join(" ")}
      className="font-display text-6xl font-semibold text-accent-primary sm:text-8xl lg:text-[6.5rem]"
    >
      {WORDS.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden
          className={`inline-block will-change-transform ${i < WORDS.length - 1 ? "mr-[0.22em]" : ""}`}
          initial={reduce ? false : { y: "0.3em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.35 + i * 0.12,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
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
      {/* ambient gradient washes */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-primary/8 blur-[120px] motion-safe:animate-orb-drift"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-cyan/6 blur-[120px] motion-safe:animate-orb-drift-alt"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-warm/6 blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 rounded-full border border-black/10 bg-bg-secondary/70 px-5 py-2 font-mono text-xs tracking-[0.25em] text-text-primary/90 backdrop-blur-md sm:text-sm"
        >
          FULL STACK ENGINEER &amp; ML DEVELOPER
        </motion.p>

        <AnimatedName />

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
              className="group flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(30,58,95,0.3)]"
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
              {site.githubHandle}
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
