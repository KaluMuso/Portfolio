"use client";
import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Clock, Zap, Star, Tag } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { projects } from "@/data/projects";
import type { ProjectStatus, ProjectCategory } from "@/types";

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  active:   { label: "Live",     classes: "bg-green-500/10 text-green-400 border-green-500/20" },
  upcoming: { label: "Upcoming", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  saas:     { label: "SaaS",     classes: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

const categoryColors: Record<ProjectCategory, string> = {
  "Web Apps":    "text-blue-400 bg-blue-500/10",
  "Automation":  "text-orange-400 bg-orange-500/10",
  "E-commerce":  "text-teal-400 bg-teal-500/10",
  "SaaS":        "text-violet-400 bg-violet-500/10",
};

const ALL_CATEGORIES = ["All", "Web Apps", "E-commerce", "Automation", "SaaS"] as const;
const ALL_STATUSES = ["All", "active", "upcoming", "saas"] as const;

export default function AdminProjectsPage() {
  const [catFilter, setCatFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = projects.filter((p) => {
    const catMatch = catFilter === "All" || p.category === catFilter;
    const statusMatch = statusFilter === "All" || p.status === statusFilter;
    return catMatch && statusMatch;
  });

  return (
    <AdminShell title="Projects" subtitle={`${projects.length} total · ${projects.filter((p) => p.status === "upcoming").length} upcoming`}>
      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-6 text-sm">
        <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">i</div>
        <div>
          <p className="font-bold text-blue-400 mb-0.5">Projects are managed via static data</p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Edit <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">src/data/projects.ts</code> to add or update projects.
            Full CMS editing (Supabase-backed) can be enabled by seeding the <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">projects</code> table.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-1.5 p-1 bg-[#0d0d14] border border-white/[0.06] rounded-xl">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                catFilter === cat
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 p-1 bg-[#0d0d14] border border-white/[0.06] rounded-xl">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all capitalize ${
                statusFilter === s
                  ? "bg-violet-600 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Project cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const status = statusConfig[project.status];
          const catColor = categoryColors[project.category];
          return (
            <div
              key={project.slug}
              className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5 hover:border-white/15 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-full ${status.classes}`}>
                      {project.status === "upcoming" ? <Clock size={8} className="inline mr-1" /> : <Zap size={8} className="inline mr-1" />}
                      {status.label}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={8} /> Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-gray-200 text-base leading-tight">{project.title}</h3>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.04] text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors shrink-0"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>

              {/* Category + tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${catColor}`}>
                  <Tag size={9} /> {project.category}
                </span>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-600 bg-white/[0.04] px-2 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Result */}
              <div className="bg-green-500/5 border border-green-500/10 rounded-xl px-3 py-2 mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-0.5">Outcome</p>
                <p className="text-xs text-gray-400 line-clamp-2">{project.result}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="flex-1 text-center py-2 rounded-xl text-xs font-black text-gray-400 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  View case study
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <p className="text-sm font-bold">No projects match these filters</p>
        </div>
      )}
    </AdminShell>
  );
}
