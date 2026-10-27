"use client";

import Image from "next/image";
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

const LOTUS_ARTICLES = [
  {
    tag: "Inner Work",
    title: "The computer engineer who ran the numbers on faith",
    excerpt:
      "What a computer scientist found when he applied his most trusted tool to something it was not designed to measure.",
    href: "https://alotusinthemud.com/engineer-who-believes-in-souls-faith-logic/",
  },
  {
    tag: "Spirituality · Sufism, Part 1",
    title: "Sufism: The ancient spiritual path that still speaks to the modern world",
    excerpt:
      "More than prayer: love without expectation, transformative companions, and conduct that reveals the heart.",
    href: "https://alotusinthemud.com/sufism-explained-sufi-way-of-life-beliefs-teachings-spiritual-practices/",
  },
  {
    tag: "Spirituality · Sufism, Part 2",
    title: "Love beyond the self: The radical wisdom of Indian Sufi saints",
    excerpt:
      "Patience, humility and selfless love as the way to the Divine, through letting go of ego.",
    href: "https://alotusinthemud.com/indian-sufi-wisdom-divine-love/",
  },
];

function LotusFeature() {
  return (
    <Reveal delay={0.1} className="mt-12">
      <div className="gradient-border rounded-2xl p-px">
        <div className="rounded-2xl bg-bg-secondary p-7 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src="/writing/lotus-logo.png"
              alt="A Lotus in the Mud logo"
              width={576}
              height={433}
              className="h-auto w-24 shrink-0 sm:w-28"
            />
            <div>
              <p className="font-mono text-xs tracking-widest text-accent-warm">
                CONTRIBUTING AUTHOR · INTERNATIONAL WEBZINE
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                A Lotus in the Mud
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
                A wellness and spirituality web magazine published by the American
                Center for Wellness &amp; Spirituality and founded by Parveen
                Chopra. I write on faith, reason and the inner life.
              </p>
            </div>
          </div>

          <blockquote className="mt-8 border-l-2 border-accent-warm/50 pl-5">
            <p className="font-serif text-lg italic leading-relaxed text-text-primary">
              &ldquo;Am feeling overwhelmed &ndash; great content and your writing
              style, comma perfect, no editing required. I feel rewarded in my work
              as editor when I discover writers like you and read their work before
              it is published.&rdquo;
            </p>
            <footer className="mt-3 font-mono text-xs text-text-secondary">
              <span className="text-text-muted">&mdash;</span> Parveen Chopra,
              Founder &amp; Editor, A Lotus in the Mud
            </footer>
          </blockquote>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {LOTUS_ARTICLES.map((a) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-black/8 bg-bg-primary p-5 transition-all duration-300 hover:border-accent-warm/30 hover:bg-white"
              >
                <span className="font-mono text-[11px] tracking-widest text-accent-warm">
                  {a.tag.toUpperCase()}
                </span>
                <h4 className="mt-2 font-display text-lg font-semibold leading-snug text-text-primary">
                  {a.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {a.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-text-secondary transition-colors duration-300 group-hover:text-accent-warm">
                  Read on A Lotus in the Mud
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>

          <a
            href={site.alotus}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors duration-300 hover:text-accent-warm"
          >
            View my author profile <FiArrowUpRight />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

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

      <LotusFeature />

      <Reveal delay={0.1} className="mt-16">
        <p className="font-mono text-sm tracking-wider text-accent-primary/80">
          <span className="text-text-muted">{"//"}</span> on my own substack
        </p>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={0.1 + i * 0.1} className="h-full">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-black/8 bg-bg-secondary p-7 transition-all duration-300 hover:border-accent-warm/30 hover:bg-bg-surface"
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
