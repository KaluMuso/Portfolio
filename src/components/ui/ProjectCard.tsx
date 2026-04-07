import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-200"
    >
      {/* Image area */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{project.tagline}</p>

        {/* Inline result — the most important trust signal on the card */}
        <p className="text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-lg">
          {project.result}
        </p>

        <div className="flex items-center gap-1 mt-4 text-sm font-medium text-blue-600">
          View case study <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}
