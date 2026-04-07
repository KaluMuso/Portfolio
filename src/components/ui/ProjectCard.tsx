import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden border-b border-gray-50">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Inline result */}
        <div className="text-[11px] font-bold text-green-700 bg-green-50/70 px-3 py-2 rounded-xl border border-green-100/50 mb-4 inline-block">
          {project.result}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 pt-2 border-t border-gray-50 group-hover:gap-2.5 transition-all">
          View case study <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}
