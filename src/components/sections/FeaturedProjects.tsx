import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Work</h2>
          <p className="text-gray-600 max-w-xl">
            Selected projects where I've helped clients ship high-performance
            solutions and automated business workflows.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
        >
          View all projects <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
