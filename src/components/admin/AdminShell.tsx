"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  email: string;
};

export function AdminShell({ children, title, subtitle, email }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#060608]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0">
        <AdminSidebar email={email} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64">
            <AdminSidebar email={email} onNavigate={() => setSidebarOpen(false)} />
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
