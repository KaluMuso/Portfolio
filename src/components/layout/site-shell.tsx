import type { ReactNode } from "react"
import { Home, User, Briefcase, Mail } from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { FloatingNav } from "@/components/layout/floating-nav"

const navItems = [
  { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
  { name: "About", link: "#about", icon: <User className="h-4 w-4" /> },
  { name: "Projects", link: "#projects", icon: <Briefcase className="h-4 w-4" /> },
  { name: "Contact", link: "#contact", icon: <Mail className="h-4 w-4" /> },
];

/** Wraps all pages with shared chrome (nav + footer). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <FloatingNav navItems={navItems} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
