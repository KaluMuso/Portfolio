import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gray-50 border-b border-gray-100 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} /> All projects
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                View Live Project <ExternalLink size={18} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                View Source <Code size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Main project image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-20 bg-gray-100 border border-gray-200">
            {project.image && (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4">Outcome</h2>
                <p className="text-blue-900 text-lg font-medium leading-relaxed">{project.result}</p>
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
