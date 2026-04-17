import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Zap } from "lucide-react";
import type { Project } from "@/types";

const statusConfig = {
  active:    { label: "Live",      classes: "bg-green-500/10 text-green-600 border-green-500/20" },
  upcoming:  { label: "Upcoming",  classes: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  saas:      { label: "SaaS",      classes: "bg-violet-500/10 text-violet-600 border-violet-500/20" },
};

export function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 bg-white dark:bg-[#0c0c0c] relative"
    >
      {/* SaaS ribbon */}
      {project.status === "saas" && (
        <div className="absolute top-5 -left-8 z-20 rotate-[-45deg] bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-10 py-1 shadow-lg">
          SaaS
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => {}}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 via-[#0c0c0c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status badge on image */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] border px-3 py-1.5 rounded-full backdrop-blur-sm ${status.classes}`}>
            {project.status === "upcoming" ? <Clock size={10} /> : <Zap size={10} />}
            {status.label}
          </span>
        </div>

        {/* Result badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500 dark:text-emerald-400 glass border-emerald-500/20 px-3 py-1.5 rounded-full">
            {project.result}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-400/5 border border-blue-500/10 dark:border-blue-400/10 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <h3 className="font-extrabold text-gray-900 dark:text-white text-2xl mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium line-clamp-2">
          {project.tagline}
        </p>

        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 pt-6 border-t border-gray-100 dark:border-white/5 group-hover:gap-3 transition-all">
          Explore Case Study <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}
