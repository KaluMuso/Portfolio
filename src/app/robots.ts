import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const url = siteConfig.url.replace(/\/$/, "")

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
