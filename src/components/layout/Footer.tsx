"use client";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github, MessageCircle, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/logo.png"
              alt="Vergeo Group Logo"
              width={224}
              height={24}
              className="rounded-sm"
            />
          </Link>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-6 text-sm">
            Full-stack developer and automation builder based in {SITE_CONFIG.location.country}.
            Helping businesses ship fast, scalable products globally.
          </p>
          <div className="flex gap-4">
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SITE_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={SITE_CONFIG.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-all"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition-all"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-5 uppercase text-[10px] tracking-widest">Navigation</h4>
          <ul className="space-y-3">
            {["Projects", "Services", "About", "Waitlist", "Contact"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-5 uppercase text-[10px] tracking-widest">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
        <p>© {currentYear} {SITE_CONFIG.developerName}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>{SITE_CONFIG.email}</p>
          <span className="text-gray-200">|</span>
          <p>Built with {SITE_CONFIG.name} Technology.</p>
        </div>
      </div>
    </footer>
  );
}
