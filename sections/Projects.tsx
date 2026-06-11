"use client";

import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import BrowserMock from "@/components/BrowserMock";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

function FeaturedProject() {
  const project = projects[0];
  return (
    <Reveal>
      <TiltCard max={4}>
        <article className="gradient-border group relative overflow-hidden rounded-2xl p-px transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(108,99,255,0.15)]">
          <div className="grid gap-10 rounded-2xl bg-bg-secondary p-8 sm:p-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="mb-2 font-mono text-xs tracking-widest text-accent-warm">
                FEATURED PROJECT
              </p>
              <h3 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{project.tagline}</p>

              <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-1 text-accent-cyan" aria-hidden>
                      ▹
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-bg-primary px-3 py-1 font-mono text-xs text-text-secondary"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/cta flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(108,99,255,0.45)]"
                >
                  Inside the Build
                  <FiArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent-cyan"
                >
                  <FiGithub /> GitHub <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center transition-transform duration-500 group-hover:scale-[1.02]">
              <BrowserMock />
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

function ComingSoonCard() {
  return (
    <Reveal delay={0.15}>
      <article className="relative overflow-hidden rounded-2xl border border-dashed border-accent-primary/30 bg-bg-secondary/60 p-10 text-center">
        {/* scanner line sweeping across */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-cyan/5 to-transparent motion-safe:animate-shimmer"
        />
        <span
          className="mx-auto mb-5 block h-3 w-3 rounded-full bg-accent-warm motion-safe:animate-pulse-dot"
          aria-hidden
        />
        <h3 className="font-display text-2xl font-semibold text-text-primary">
          Something&apos;s brewing...
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Next project in progress. Watch the GitHub.
        </p>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-text-muted px-5 py-2.5 font-mono text-xs text-text-secondary transition-colors duration-300 hover:border-accent-cyan/60 hover:text-accent-cyan"
        >
          @{site.githubHandle} on GitHub <FiArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeader label="projects" title="Things I've Built" className="mb-14" />
      <div className="space-y-8">
        <FeaturedProject />
        <div className="grid gap-8 sm:grid-cols-2">
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
