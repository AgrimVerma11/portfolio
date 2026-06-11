import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Frontmatter schema for blog posts. Drop a `.mdx` file into `content/blog/`
 * with this shape and it will appear on /blog automatically:
 *
 * ---
 * title: "On Compilers and Koans"
 * date: "2026-06-01"
 * category: "Philosophy"
 * excerpt: "One line that earns the click."
 * ---
 */
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        category: data.category ?? "Notes",
        excerpt: data.excerpt ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      category: data.category ?? "Notes",
      excerpt: data.excerpt ?? "",
    },
    content,
  };
}
