"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCategory } from "@/types";

const ALL = "All";
const categories: (typeof ALL | ProjectCategory)[] = [ALL, "Web Apps", "E-commerce", "Automation", "SaaS"];

export default function ProjectsPage() {
  const [active, setActive] = useState<typeof ALL | ProjectCategory>(ALL);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/8 px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Our work
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-[1.1] tracking-tight">
            Projects that drive
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent"> real results</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            A collection of web applications, automation workflows, and digital platforms designed to drive business growth and operational efficiency.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${
                  active === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs ${active === cat ? "text-blue-200" : "text-gray-400 dark:text-gray-600"}`}>
                  {cat === ALL ? projects.length : projects.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">No projects in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
