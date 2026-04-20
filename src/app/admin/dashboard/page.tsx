import Link from "next/link";
import { Users, FolderOpen, TrendingUp, Clock, ArrowUpRight, Activity, CheckCircle, AlertCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

type RecentEntry = {
  name: string;
  company_name: string;
  district: string;
  created_at: string;
};

async function loadDashboard() {
  const supabase = createAdminClient();
  const [{ count }, { data: recent }] = await Promise.all([
    supabase.from("waitlist").select("*", { count: "exact", head: true }),
    supabase
      .from("waitlist")
      .select("name, company_name, district, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  return {
    waitlistCount: count ?? 0,
    recentEntries: (recent as RecentEntry[] | null) ?? [],
  };
}

export default async function AdminDashboard() {
  const user = await requireAdminUser();
  const { waitlistCount, recentEntries } = await loadDashboard();

  const statCards = [
    { label: "Waitlist Signups", value: waitlistCount.toString(), sub: "Convergeo vendors", icon: Users, color: "blue", href: "/admin/waitlist" },
    { label: "Active Projects",  value: "5",                       sub: "In portfolio",      icon: FolderOpen, color: "violet", href: "/admin/projects" },
    { label: "Avg. Delivery",    value: "11d",                     sub: "Under 2 weeks",     icon: Clock,     color: "green",  href: null },
    { label: "Convergeo Launch", value: "Jul 7",                   sub: "2026",              icon: TrendingUp,color: "amber",  href: null },
  ];

  const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
    blue:   { bg: "bg-blue-500/10",   text: "text-blue-400",   ring: "ring-blue-500/20" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20" },
    green:  { bg: "bg-green-500/10",  text: "text-green-400",  ring: "ring-green-500/20" },
    amber:  { bg: "bg-amber-500/10",  text: "text-amber-400",  ring: "ring-amber-500/20" },
  };

  return (
    <AdminShell title="Dashboard" subtitle="Welcome back, Kaluba" email={user.email ?? ""}>
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, sub, icon: Icon, color, href }) => {
          const c = colorMap[color];
          const card = (
            <div className={`bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5 transition-all ${href ? "hover:border-white/15 cursor-pointer" : ""}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${c.bg} ${c.text} rounded-xl flex items-center justify-center ring-1 ${c.ring}`}>
                  <Icon size={18} />
                </div>
                {href && <ArrowUpRight size={14} className="text-gray-700" />}
              </div>
              <p className={`text-3xl font-black ${c.text} mb-0.5`}>{value}</p>
              <p className="text-sm font-bold text-gray-300">{label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
            </div>
          );
          return href ? <Link key={label} href={href}>{card}</Link> : <div key={label}>{card}</div>;
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent waitlist */}
        <div className="lg:col-span-2 bg-[#0d0d14] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-black text-white text-sm">Recent Waitlist Signups</h2>
            <Link href="/admin/waitlist" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          {recentEntries.length === 0 ? (
            <div className="p-10 text-center text-gray-600">
              <Users size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No signups yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {recentEntries.map((entry, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                    {entry.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-200 truncate">{entry.name}</p>
                    <p className="text-xs text-gray-500 truncate">{entry.company_name} · {entry.district}</p>
                  </div>
                  <p className="text-xs text-gray-600 shrink-0">
                    {new Date(entry.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5">
            <h2 className="font-black text-white text-sm mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "View all waitlist entries", href: "/admin/waitlist", icon: Users, color: "text-blue-400" },
                { label: "Manage projects", href: "/admin/projects", icon: FolderOpen, color: "text-violet-400" },
                { label: "Update site settings", href: "/admin/settings", icon: Activity, color: "text-green-400" },
              ].map(({ label, href, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                >
                  <Icon size={15} className={color} />
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors font-medium">{label}</span>
                  <ArrowUpRight size={12} className="ml-auto text-gray-700 group-hover:text-gray-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Status indicators */}
          <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5">
            <h2 className="font-black text-white text-sm mb-4">System Status</h2>
            <div className="space-y-3">
              {[
                { label: "vergeo.company", status: "online" },
                { label: "Supabase DB", status: "online" },
                { label: "Convergeo Launch", status: "upcoming" },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-medium">{label}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${
                    status === "online" ? "text-green-400" : "text-amber-400"
                  }`}>
                    {status === "online"
                      ? <CheckCircle size={12} />
                      : <AlertCircle size={12} />
                    }
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
