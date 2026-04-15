import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectMetaBySlug, getProjectSlugs } from "@/lib/mdx/projects";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import ProjectHeader from "@/components/projects/project-header";
import ProjectContent from "@/components/projects/project-content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectMetaBySlug(slug);

  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    image: project.coverImage,
    pathname: `/projects/${slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Container className="py-12 md:py-20">
      <article>
        <ProjectHeader project={project} />
        
        <ProjectContent project={project}>
          {project.content}
        </ProjectContent>
      </article>
    </Container>
  );
}
