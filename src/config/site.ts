/**
 * Site-wide strings and canonical URL for SEO / Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com).
 */
export const siteConfig = {
  name: "Kaluba Portfolio",
  description: "Portfolio and selected projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const
