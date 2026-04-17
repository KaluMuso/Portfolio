"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Users, FolderOpen, Settings, LogOut, Activity, TrendingUp, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
  { href: "/admin/projects",  label: "Projects",  icon: <FolderOpen size={18} /> },
  { href: "/admin/waitlist",  label: "Waitlist",  icon: <Users size={18} /> },
  { href: "/admin/settings",  label: "Settings",  icon: <Settings size={18} /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [stats, setStats] = useState({ waitlist: 0, projects: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/admin/login"); return; }
      setUser(session.user);

      const [{ count: waitlistCount }, { count: projectCount }] = await Promise.all([
        supabase.from("waitlist").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
      ]);
      setStats({ waitlist: waitlistCount || 0, projects: projectCount || 0, messages: 0 });
      setLoading(false);
    };
    init();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: "Waitlist Signups", value: stats.waitlist, icon: <Users size={20} />, color: "blue", trend: "+12 this week" },
    { label: "Active Projects", value: stats.projects, icon: <FolderOpen size={20} />, color: "violet", trend: "3 in progress" },
    { label: "Conversion Rate", value: "68%", icon: <TrendingUp size={20} />, color: "green", trend: "+5% this month" },
    { label: "Avg. Delivery", value: "11d", icon: <Clock size={20} />, color: "orange", trend: "Under 2 weeks" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 shrink-0">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden">
            <Image src="/Vergeo5.png" alt="Vergeo" fill className="object-cover" />
          </div>
          <span className="font-black text-base bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Vergeo Admin
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                href === "/admin/dashboard"
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {icon} {label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate">{user?.email}</p>
              <p className="text-[10px] text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm font-bold transition-colors w-full px-2 py-1.5"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {user?.email?.split("@")[0]}.</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map(({ label, value, icon, color, trend }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                  color === "blue" ? "bg-blue-600/10 text-blue-400" :
                  color === "violet" ? "bg-violet-600/10 text-violet-400" :
                  color === "green" ? "bg-green-600/10 text-green-400" :
                  "bg-orange-600/10 text-orange-400"
                }`}>
                  {icon}
                </div>
                <p className="text-2xl font-black text-white mb-0.5">{value}</p>
                <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
                <p className="text-[11px] text-gray-600">{trend}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/admin/waitlist"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
            >
              <Users size={24} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-black text-white mb-1">View Waitlist</h3>
              <p className="text-sm text-gray-400">See all Convergeo signups, export CSV</p>
            </Link>

            <Link
              href="/admin/projects"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all group"
            >
              <FolderOpen size={24} className="text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-black text-white mb-1">Manage Projects</h3>
              <p className="text-sm text-gray-400">Add, edit, or update project statuses</p>
            </Link>

            <Link
              href="/admin/settings"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all group"
            >
              <Activity size={24} className="text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-black text-white mb-1">Site Settings</h3>
              <p className="text-sm text-gray-400">Availability toggle, contact info, pricing</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
