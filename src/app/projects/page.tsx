import { getAllProjects } from "@/lib/mdx/projects";
import ProjectClient from "./projects-client";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Systems & Projects | Kaluba Portfolio",
  description: "A selection of projects and systems designed for business impact and scalability.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Container className="py-20">
      <div className="max-w-3xl mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Selected <span className="text-primary italic">Systems</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A deep dive into the AI-powered systems, automation platforms, 
          and high-performance web applications I&apos;ve designed and delivered.
        </p>
      </div>
      
      <ProjectClient projects={projects} />
    </Container>
  );
}
