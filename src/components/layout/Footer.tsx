"use client";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github, Mail, Download, Phone, MapPin, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const navLinks = [
  { label: "Projects",  href: "/projects"  },
  { label: "Services",  href: "/services"  },
  { label: "About",     href: "/about"     },
  { label: "Waitlist",  href: "/waitlist"  },
  { label: "Contact",   href: "/contact"   },
];

const legalLinks = [
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms of Service",  href: "/terms"   },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50/50 dark:bg-[#060608] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative w-10 aspect-square rounded-xl overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                <Image
                  src="/Vergeo5.png"
                  alt="Vergeo Group Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Vergeo Group
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-8 font-medium">
              Building the next generation of digital products with technical
              precision and creative flair. Engineering for the modern web.
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-8">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Mail size={14} />
                </div>
                {SITE_CONFIG.email}
              </a>
              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <MessageSquare size={14} />
                </div>
                {SITE_CONFIG.whatsappDisplay}
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                Lusaka, Zambia
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: Github,    href: SITE_CONFIG.socials.github,    title: "GitHub",    hover: "hover:bg-gray-900 hover:text-white dark:hover:bg-white/10 dark:hover:text-white" },
                { icon: Linkedin,  href: SITE_CONFIG.socials.linkedin,  title: "LinkedIn",  hover: "hover:bg-blue-600 hover:text-white" },
                { icon: Phone,     href: SITE_CONFIG.socials.whatsapp,  title: "WhatsApp",  hover: "hover:bg-emerald-500 hover:text-white" },
                { icon: Mail,      href: `mailto:${SITE_CONFIG.email}`, title: "Email",     hover: "hover:bg-blue-500 hover:text-white" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={s.title}
                  className={`w-10 h-10 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all duration-300 ${s.hover}`}
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[10px] tracking-[0.25em]">
              Platform
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Download */}
          <div className="md:col-span-4">
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[10px] tracking-[0.25em]">
              Legal
            </h4>
            <ul className="space-y-3 mb-10">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Download company profile */}
            <div className="p-5 rounded-2xl bg-blue-600/5 dark:bg-blue-600/8 border border-blue-500/15">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
                Company Profile
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4 leading-relaxed">
                Download our full company profile — services, case studies &amp; pricing.
              </p>
              <a
                href="/company-profile.pdf"
                download
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-blue-600/25"
              >
                <Download size={13} />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>Built with precision by Vergeo · Lusaka, Zambia</p>
        </div>
      </div>
    </footer>
  );
}
