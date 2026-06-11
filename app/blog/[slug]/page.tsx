import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/Footer";
import { getAllPosts, getPost } from "@/lib/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: { title: post.meta.title, description: post.meta.excerpt, type: "article" },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-32">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <FiArrowLeft /> all posts
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="tracking-widest text-accent-warm">
              {post.meta.category.toUpperCase()}
            </span>
            <time dateTime={post.meta.date} className="text-text-muted">
              {post.meta.date}
            </time>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {post.meta.title}
          </h1>
        </header>

        <article className="prose prose-invert mt-12 max-w-none prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent-cyan prose-strong:text-text-primary prose-code:font-mono prose-code:text-accent-warm prose-blockquote:border-l-accent-primary prose-blockquote:font-serif prose-blockquote:italic">
          <MDXRemote source={post.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}
