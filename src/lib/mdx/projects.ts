import fs from "fs/promises"
import path from "path"
import type { ReactElement } from "react"

import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/components/mdx/mdx-components"
import type { Project } from "@/types/project"

import { projectFrontmatterSchema } from "./project-schema"

/** Resolved MDX ready to render as `{content}` in a Server Component. */
export type CompiledProject = Project & {
  content: ReactElement
}

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects")

function parseFrontmatter(raw: string, slug: string): Project {
  const { data } = matter(raw)
  const frontmatter = projectFrontmatterSchema.parse(data)
  // Ensure the slug from frontmatter or filename matches what's used
  return { ...frontmatter, slug }
}

/**
 * Reads an MDX file from disk, splits frontmatter with gray-matter,
 * validates YAML with Zod, then compiles the MDX body for RSC via next-mdx-remote.
 */
export async function getProjectBySlug(
  slug: string
): Promise<CompiledProject | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  let raw: string
  try {
    raw = await fs.readFile(filePath, "utf8")
  } catch {
    return null
  }
  const { data, content } = matter(raw)
  const frontmatter = projectFrontmatterSchema.parse(data)
  const { content: compiled } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  })
  return { ...frontmatter, slug, content: compiled }
}

/** All `.mdx` filenames without extension — for `generateStaticParams`. */
export async function getProjectSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PROJECTS_DIR)
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
  } catch {
    return []
  }
}

/**
 * Lightweight index for `/projects`: parses frontmatter only (no MDX compile).
 */
export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs()
  const projects: Project[] = []
  for (const slug of slugs) {
    const raw = await fs.readFile(
      path.join(PROJECTS_DIR, `${slug}.mdx`),
      "utf8"
    )
    const project = parseFrontmatter(raw, slug)
    if (project.published) projects.push(project)
  }
  
  // Sort by createdAt descending
  return projects.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((p) => p.featured)
}

/** Frontmatter only — for `generateMetadata` without compiling MDX. */
export async function getProjectMetaBySlug(
  slug: string
): Promise<Project | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  try {
    const raw = await fs.readFile(filePath, "utf8")
    return parseFrontmatter(raw, slug)
  } catch {
    return null
  }
}
