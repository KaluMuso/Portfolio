import type { z } from "zod"

import type { projectFrontmatterSchema } from "@/lib/mdx/project-schema"

/** Raw frontmatter shape after Zod validation (from MDX files). */
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>

/**
 * Project as used in the app: filesystem slug plus validated frontmatter.
 * The slug comes from the filename (`my-project.mdx` → `my-project`), not from frontmatter.
 */
export type Project = ProjectFrontmatter & {
  slug: string
}

/** Listing card: metadata without loading full MDX body. */
export type ProjectListItem = Project
