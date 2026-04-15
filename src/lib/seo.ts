import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

/** Subset of Open Graph types we use in this app; extend when you add more templates. */
type OpenGraphType = "website" | "article"

export type PageMetaInput = {
  title: string
  description: string
  /** Absolute or site-relative path for OG image */
  image?: string
  /** Defaults to `website`; use `article` for dated posts / case studies. */
  type?: OpenGraphType
  /** Set false to use title as-is without ` | Site Name` suffix */
  titleTemplate?: boolean
  noIndex?: boolean
  /** Path for this page (e.g. `/projects/foo`) — drives canonical + `og:url`. */
  pathname?: string
}

/**
 * Central place to build Next.js `Metadata` with consistent Open Graph defaults.
 * Uses `NEXT_PUBLIC_SITE_URL` when set (recommended in production).
 */
export function createMetadata({
  title,
  description,
  image,
  type = "website",
  titleTemplate = true,
  noIndex = false,
  pathname = "/",
}: PageMetaInput): Metadata {
  const url = siteConfig.url.replace(/\/$/, "")
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  const pageUrl = `${url}${path}`
  const resolvedImage =
    image != null
      ? image.startsWith("http")
        ? image
        : `${url}${image.startsWith("/") ? image : `/${image}`}`
      : undefined

  const fullTitle = titleTemplate ? `${title} | ${siteConfig.name}` : title

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(url),
    alternates: { canonical: pageUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      ...(resolvedImage
        ? {
            images: [
              { url: resolvedImage, width: 1200, height: 630, alt: title },
            ],
          }
        : {}),
      locale: "en_US",
      type,
    },
    twitter: {
      card: resolvedImage ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(resolvedImage ? { images: [resolvedImage] } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}

/** Default metadata for the root layout when a page does not override. */
export const defaultMetadata: Metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  titleTemplate: false,
  pathname: "/",
})
