import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allDesigns, designHref } from "@/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/email-design/`, changeFrequency: "weekly", priority: 0.9 },
    ...allDesigns.map((d) => ({ url: `${site.url}${designHref(d.slug)}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${site.url}/credits/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
