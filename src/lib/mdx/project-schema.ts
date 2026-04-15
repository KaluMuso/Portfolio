import { z } from "zod";

/**
 * Zod schema for project MDX frontmatter.
 * Keeps content authors honest and fails fast at build/runtime if YAML is invalid.
 */
export const projectFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),

  /** routing - though slug is usually derived from filename, we'll keep it as requested */
  slug: z.string(),

  /** classification */
  featured: z.boolean().default(false),
  status: z.enum(["live", "in-progress", "archived"]),
  published: z.boolean().default(true),

  /** business relevance */
  category: z.enum([
    "web",
    "automation",
    "ai",
    "mobile",
    "business",
  ]),

  /** stack */
  tech: z.array(z.string()),

  /** links */
  github: z.string().optional(),
  demo: z.string().optional(),

  /** media - Path under `/public`, e.g. `/images/projects/cover.png` */
  coverImage: z.string().optional(),

  /** metrics (VERY IMPORTANT for credibility) */
  results: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),

  /** dates - ISO date string for sorting / display */
  createdAt: z.string(),
});
