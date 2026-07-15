"use client";

import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const POSTS = [
  {
    category: "Reflection · Relationships",
    title: "तकल्लुफ़ – Not Everyone Who Stays, Stays",
    excerpt:
      "On false warmth, folding ears, and the ones who were never really there.",
    href: "https://agrimverma.substack.com/p/not-everyone-who-stays-stays",
  },
  {
    category: "Mysticism · Philosophy",
    title: "The Unknown, Unknowns",
    excerpt:
      "Alpajña: on the grace of not knowing, and the roads we couldn't have planned.",
    href: "https://agrimverma.substack.com/p/the-unknown-unknowns",
  },
  {
    category: "The Genesis",
    title: "Chronicles of this Soul",
    excerpt: "The first entry, where this Substack, and the writing, begins.",
    href: "https://agrimverma.substack.com/p/chronicles-of-this-soul",
  },
];

export default function Writing() {
  return (
    <section id="writing" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeader label="writing" title="Beyond the Code" />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-md font-serif text-lg italic text-text-secondary">
          Occasionally, I write about philosophy, mysticism, and the things that
          don&apos;t compile.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={0.1 + i * 0.1} className="h-full">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-white/5 bg-bg-secondary p-7 transition-all duration-300 hover:border-accent-warm/30 hover:bg-bg-surface"
            >
              <span className="font-mono text-xs tracking-widest text-accent-warm">
                {post.category.toUpperCase()}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-text-primary">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors duration-300 group-hover:text-accent-warm">
                Read on Substack
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25} className="mt-10">
        <a
          href={site.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors duration-300 hover:text-accent-warm"
        >
          Read all posts on Substack <FiArrowUpRight />
        </a>
      </Reveal>
    </section>
  );
}
