import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yourname.vercel.app";
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  
  const routes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1, changeFrequency: "weekly" as const },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/services`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/waitlist`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" as const },
    ...projectRoutes,
  ];

  return routes;
}
