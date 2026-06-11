import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on philosophy, mysticism, and the things that don't compile — by Agrim Verma.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <main className="mx-auto min-h-[70vh] max-w-4xl px-6 pb-28 pt-36">
        <p className="mb-3 font-mono text-sm tracking-wider text-accent-primary/80">
          <span className="text-text-muted">{"//"}</span> writing
        </p>
        <SplitText
          as="h1"
          text="Beyond the Code"
          className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-md font-serif text-lg italic text-text-secondary">
            Philosophy, mysticism, and whatever the soul insists on.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal delay={0.3} className="mt-20">
            <div className="rounded-2xl border border-dashed border-white/10 bg-bg-secondary/40 p-12 text-center">
              <p className="font-mono text-sm text-text-secondary">
                No posts yet — writing happens when the thoughts are ready.
              </p>
              <a
                href={site.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-accent-warm transition-opacity hover:opacity-80"
              >
                In the meantime, read on Substack <FiArrowUpRight />
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="mt-16 space-y-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={0.1 + i * 0.07}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-white/5 bg-bg-secondary p-7 transition-all duration-300 hover:border-accent-warm/30 hover:bg-bg-surface"
                >
                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span className="tracking-widest text-accent-warm">
                      {post.category.toUpperCase()}
                    </span>
                    <time dateTime={post.date} className="text-text-muted">
                      {post.date}
                    </time>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
