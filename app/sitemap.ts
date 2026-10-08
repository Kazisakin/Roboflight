import type { MetadataRoute } from "next";
import { programs } from "@/lib/programs";
import { articles } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${site.url}${path}`;
  return [
    { url: u("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...programs.map((p) => ({ url: u(`/programs/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: u("/book"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: u("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/schools"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({ url: u(`/blog/${a.slug}`), lastModified: new Date(a.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: u("/build"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: u("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cookies"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
