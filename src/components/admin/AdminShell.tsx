"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, Users, Settings, LogOut,
  Menu, X, ChevronRight, Bell,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects",  label: "Projects",  icon: FolderOpen },
  { href: "/admin/waitlist",  label: "Waitlist",  icon: Users },
  { href: "/admin/settings",  label: "Settings",  icon: Settings },
];

export function AdminShell({ children, title, subtitle }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/admin/login"); return; }
      setUser(session.user);
    };
    init();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const initials = user?.email?.[0]?.toUpperCase() ?? "A";

  const Sidebar = () => (
    <aside className="w-64 flex flex-col h-full bg-[#0a0a10] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
          <Image src="/Vergeo5.png" alt="Vergeo" fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Vergeo Admin
          </p>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Control Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={17} className={active ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-blue-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-gray-300 truncate">{user?.email ?? "Loading..."}</p>
            <p className="text-[10px] text-gray-600 font-bold">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#060608]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-6 border-b border-white/[0.06] bg-[#0a0a10] shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base font-black text-white truncate">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/5"
            >
              View site ↗
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
