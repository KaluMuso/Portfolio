import type { MetadataRoute } from "next"
import { getProjectSlugs } from "@/lib/mdx/projects"
import { siteConfig } from "@/config/site"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteConfig.url.replace(/\/$/, "")
  const slugs = await getProjectSlugs()

  const projectUrls = slugs.map((slug) => ({
    url: `${url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${url}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectUrls,
  ]
}
