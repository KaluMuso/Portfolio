import { Linkedin, Github, MessageCircle, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">About Me</h1>
      <div className="prose prose-lg text-gray-600 mb-12">
        <p className="mb-6 leading-relaxed">
          I&apos;m a full-stack developer and automation builder based in {SITE_CONFIG.location.country}, 
          dedicated to helping businesses ship fast, scalable products and 
          automated workflows.
        </p>
        <p className="leading-relaxed mb-10">
          With expertise in the Next.js ecosystem and automation tools like N8N, 
          I bridge the gap between complex technical challenges and elegant, 
          user-centric solutions.
        </p>
        
        <div className="flex gap-5 items-center not-prose">
          <a 
            href={SITE_CONFIG.socials.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-100"
            title="GitHub"
          >
            <Github size={22} />
          </a>
          <a 
            href={SITE_CONFIG.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all border border-gray-100"
            title="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a 
            href={SITE_CONFIG.socials.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-all border border-gray-100"
            title="WhatsApp"
          >
            <MessageCircle size={22} />
          </a>
          <a 
            href={`mailto:${SITE_CONFIG.email}`} 
            className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition-all border border-gray-100"
            title="Email"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}
