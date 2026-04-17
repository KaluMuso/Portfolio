"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, Trash2, FolderOpen } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";
import type { ProjectStatus, ProjectCategory } from "@/types";

type AdminProject = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
  live_url: string;
  featured: boolean;
};

const statusColors: Record<ProjectStatus, string> = {
  active:   "bg-green-500/10 text-green-400 border-green-500/20",
  upcoming: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  saas:     "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/admin/login"); return; }
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    };
    init();
  }, [router]);

  const toggleStatus = async (id: string, current: ProjectStatus) => {
    const next: ProjectStatus = current === "active" ? "upcoming" : current === "upcoming" ? "saas" : "active";
    const supabase = createBrowserClient();
    await supabase.from("projects").update({ status: next }).eq("id", id);
    setProjects((p) => p.map((pr) => pr.id === id ? { ...pr, status: next } : pr));
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project permanently?")) return;
    const supabase = createBrowserClient();
    await supabase.from("projects").delete().eq("id", id);
    setProjects((p) => p.filter((pr) => pr.id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Projects</h1>
            <p className="text-gray-400 text-sm">{projects.length} total projects</p>
          </div>
          <button className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-700 transition-colors">
            <Plus size={16} /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="text-center py-24 text-gray-500">
                <FolderOpen size={32} className="mx-auto mb-3 opacity-30" />
                <p>No projects in database yet.</p>
                <p className="text-xs mt-1">Projects are currently managed via static data in <code className="text-blue-400">src/data/projects.ts</code></p>
              </div>
            ) : projects.map((project) => (
              <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-white">{project.title}</h3>
                    <button
                      onClick={() => toggleStatus(project.id, project.status)}
                      className={`text-[10px] font-black uppercase tracking-widest border px-2.5 py-1 rounded-full cursor-pointer ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </button>
                    {project.featured && (
                      <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-400 border border-blue-600/20 px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{project.tagline}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-9 h-9 bg-white/5 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-colors">
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="w-9 h-9 bg-red-500/5 text-red-400 hover:bg-red-500/20 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-600/5 border border-blue-600/20 rounded-2xl p-5 text-sm">
          <p className="text-blue-400 font-bold mb-1">Static project data</p>
          <p className="text-gray-400">
            Projects are currently managed via <code className="text-blue-400">src/data/projects.ts</code>.
            Once your Supabase <code className="text-blue-400">projects</code> table is seeded, this panel will manage them fully.
          </p>
        </div>
      </div>
    </div>
  );
}
