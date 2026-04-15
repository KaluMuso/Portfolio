import type { Metadata } from "next"

import { FeaturedProjects } from "@/components/sections/featured-projects"
import { HomeContent } from "@/components/layout/home-content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Software Engineer | AI & Automation Specialist",
  description:
    "Building high-performance web systems and AI-driven automation. Explore my projects and ventures.",
  pathname: "/",
})

export default function HomePage() {
  return (
    <HomeContent featuredProjects={<FeaturedProjects />} />
  )
}
