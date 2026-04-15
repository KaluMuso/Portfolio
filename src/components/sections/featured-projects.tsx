import { getFeaturedProjects } from "@/lib/mdx/projects";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedProjectsClient } from "./featured-projects-client";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-gradient">Featured Work</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A selection of high-impact projects focusing on AI automation, 
              scalable web applications, and technical excellence.
            </p>
          </div>
          <Button asChild variant="ghost" className="group h-11 px-6">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <FeaturedProjectsClient projects={projects} />
      </Container>
    </section>
  );
}
