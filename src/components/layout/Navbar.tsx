"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/projects",  label: "Projects"  },
  { href: "/services",  label: "Services"  },
  { href: "/waitlist",  label: "Waitlist"  },
  { href: "/about",     label: "About"     },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto glass rounded-2xl md:rounded-[1.75rem] px-5 md:px-7 h-14 md:h-16 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "shadow-[0_16px_48px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.4)]"
            : "shadow-none"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-8 md:w-9 aspect-square rounded-lg overflow-hidden group-hover:rotate-12 transition-transform duration-300">
            <Image
              src="/Vergeo5.png"
              alt="Vergeo Group"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-black text-lg tracking-tighter">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Vergeo Group
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 ${
                  active
                    ? "text-blue-600 dark:text-blue-400 bg-blue-600/8 dark:bg-blue-400/8"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <div className="h-5 w-px bg-gray-200 dark:bg-white/10" />
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-xl font-black transition-all hover:scale-[1.04] active:scale-[0.97] shadow-md shadow-blue-600/25"
          >
            Start a project
          </Link>
        </div>

        {/* Mobile toggles */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-2 max-w-7xl mx-auto glass rounded-3xl p-6 flex flex-col gap-1 border-white/20 dark:border-white/5 shadow-2xl"
          >
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-base font-black px-4 py-3 rounded-2xl transition-all ${
                    active
                      ? "text-blue-600 dark:text-blue-400 bg-blue-600/8"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <div className="mt-2 pt-4 border-t border-gray-100 dark:border-white/5">
              <Link
                href="/contact"
                className="block bg-blue-600 text-white text-center py-3.5 rounded-2xl font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
