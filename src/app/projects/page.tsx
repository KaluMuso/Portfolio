import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export const metadata = {
  title: "Projects | Vergeo Group",
  description: "Explore a showcase of featured works, including e-commerce stores and custom business automation solutions.",
};

export default function ProjectsPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">All Projects</h1>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          A collection of web applications and automated workflows designed to
          drive business growth and operational efficiency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
