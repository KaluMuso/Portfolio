"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, Users, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects",  label: "Projects",  icon: FolderOpen },
  { href: "/admin/waitlist",  label: "Waitlist",  icon: Users },
  { href: "/admin/settings",  label: "Settings",  icon: Settings },
];

type Props = {
  email: string;
  onNavigate?: () => void;
};

export function AdminSidebar({ email, onNavigate }: Props) {
  const pathname = usePathname();
  const initials = email?.[0]?.toUpperCase() ?? "A";

  return (
    <aside className="w-64 flex flex-col h-full bg-gray-50 dark:bg-[#0a0a10] border-r border-gray-200 dark:border-white/[0.06]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-white/[0.06]">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
          <Image src="/Vergeo5.png" alt="Vergeo" fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-black bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
            Vergeo Admin
          </p>
          <p className="text-[10px] text-gray-500 dark:text-gray-600 font-bold uppercase tracking-wider">Control Panel</p>
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
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                active
                  ? "bg-blue-600/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                  : "text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={17} className={active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-400"} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-blue-500/60 dark:text-blue-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/[0.03] mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-gray-800 dark:text-gray-300 truncate">{email}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-600 font-bold">Administrator</p>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all"
          >
            <LogOut size={15} /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
