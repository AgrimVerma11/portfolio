"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import GdgLogo from "@/components/GdgLogo";

const TERMINAL_LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "agrim — engineer, mentor, occasional writer" },
  { prompt: true, text: "cat ./focus.txt" },
  { prompt: false, text: "full-stack systems · ML pipelines · DSA" },
  { prompt: true, text: "ls ./roles" },
  { prompt: false, text: "gdg-aiml-mentor/  spic-macay/  taas/" },
  { prompt: true, text: "echo $MOTTO" },
  { prompt: false, text: '"The water that scares you rejuvenates me"' },
];

const STATS = [
  { value: "3+", label: "Projects" },
  { value: "GDG", label: "AI/ML Mentor", gdg: true },
  { value: "'27", label: "TIET" },
];

const FLOATING_BADGES = [
  { label: "React", className: "-left-4 top-6", delay: "0s" },
  { label: "PyTorch", className: "-right-6 top-16", delay: "0.8s" },
  { label: "Node.js", className: "-left-8 bottom-20", delay: "1.6s" },
  { label: "MongoDB", className: "-right-4 bottom-8", delay: "2.4s" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-5">
        {/* Left — 60% */}
        <div className="lg:col-span-3">
          <p className="mb-3 font-mono text-sm tracking-wider text-accent-primary/80">
            <span className="text-text-muted">{"//"}</span> about me
          </p>
          <div className="mb-8">
            <SplitText
              as="h2"
              text="Engineer by Craft,"
              className="block font-display text-4xl font-semibold leading-tight sm:text-5xl"
            />
            <SplitText
              as="h2"
              text="Thinker by Nature."
              delay={0.2}
              className="block font-display text-4xl font-semibold leading-tight text-text-secondary sm:text-5xl"
            />
          </div>

          <Reveal delay={0.1}>
            <p className="mb-5 max-w-xl leading-relaxed text-text-secondary">
              I&apos;m Agrim — a final-year Computer Engineering student at TIET,
              building things at the intersection of full-stack web and machine
              learning. I believe good software is like good writing:{" "}
              <em className="font-serif text-lg italic text-accent-warm">
                precise where it needs to be, and human everywhere else.
              </em>
            </p>
            <p className="max-w-xl leading-relaxed text-text-secondary">
              Currently, I&apos;m focused on shipping production-ready systems,
              sharpening my DSA foundations, and mentoring the AI/ML track at{" "}
              <span className="whitespace-nowrap">
                <GdgLogo className="mx-0.5 inline-block h-3 w-6 align-baseline" />
              </span>{" "}
              Google Developer Groups, TIET. Outside the terminal, I write —
              philosophy, mysticism, and whatever the soul insists on.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <dl className="grid grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/5 bg-bg-secondary px-4 py-3 text-center transition-colors duration-300 hover:border-accent-primary/30"
                >
                  <dt className="order-2 font-mono text-xs text-text-secondary">
                    {stat.label}
                  </dt>
                  <dd className="flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-text-primary">
                    {stat.gdg && <GdgLogo className="h-3 w-6" />}
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — 40%: terminal card with orbiting badges */}
        <div className="relative lg:col-span-2">
          <Reveal delay={0.2}>
            <div className="gradient-border relative rounded-2xl p-px">
              <div className="rounded-2xl bg-bg-secondary p-5">
                <div className="mb-4 flex items-center gap-1.5" aria-hidden>
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 font-mono text-xs text-text-muted">
                    agrim@tiet ~ zsh
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-[13px] leading-relaxed">
                  {TERMINAL_LINES.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={reduce ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: 0.4 + i * 0.3, duration: 0.25 }}
                      className={line.prompt ? "text-text-primary" : "text-text-secondary"}
                    >
                      {line.prompt && <span className="text-accent-cyan">❯ </span>}
                      {line.text}
                    </motion.p>
                  ))}
                  <motion.span
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + TERMINAL_LINES.length * 0.3 }}
                    className="inline-block"
                  >
                    <span className="text-accent-cyan">❯ </span>
                    <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-accent-primary motion-safe:animate-blink" />
                  </motion.span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* floating tech badges, gently bobbing at offset phases */}
          {FLOATING_BADGES.map((badge) => (
            <span
              key={badge.label}
              aria-hidden
              style={{ animationDelay: badge.delay }}
              className={`absolute hidden rounded-full border border-white/10 bg-bg-surface/90 px-3 py-1 font-mono text-xs text-text-secondary shadow-lg backdrop-blur motion-safe:animate-bob lg:inline-block ${badge.className}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
