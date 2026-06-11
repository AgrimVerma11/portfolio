import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/blog`, lastModified: new Date(), priority: 0.7 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
