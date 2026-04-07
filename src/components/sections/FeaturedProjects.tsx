import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Featured Work</h2>
          <p className="text-gray-500 max-w-xl font-medium">
            Selected projects that delivered measurable business outcomes 
            and automated critical workflows.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all text-sm group"
        >
          View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
