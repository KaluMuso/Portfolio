"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/waitlist", label: "Waitlist" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Prosper Nation Logo" 
            width={32} 
            height={32} 
            className="rounded-sm"
          />
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            ProsperNation<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-all duration-200 ${
                pathname === href 
                  ? "text-blue-600 underline underline-offset-4" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-blue-600 text-white text-xs px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-500/20"
          >
            Work with me
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-gray-900" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top duration-300">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="text-base font-bold text-gray-800 border-b border-gray-50 pb-2">
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="text-base font-bold text-blue-600">
            Work with me →
          </Link>
        </div>
      )}
    </nav>
  );
}
