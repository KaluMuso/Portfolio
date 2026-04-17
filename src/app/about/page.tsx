import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, MessageCircle, Mail, CheckCircle, ArrowRight, Zap, Globe, Users, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "About | Vergeo Group",
  description: "Learn about Vergeo Group — the team converging Zambian businesses onto the digital space through innovation, skill and creativity.",
};

const process = [
  {
    step: "01",
    title: "Discover",
    description: "We deep-dive into your business model, goals, and target market to map out a digital strategy that actually fits.",
    icon: <Globe size={20} />,
  },
  {
    step: "02",
    title: "Design",
    description: "Our UI/UX team creates wireframes and high-fidelity designs that look premium and convert visitors into clients.",
    icon: <Award size={20} />,
  },
  {
    step: "03",
    title: "Build",
    description: "We develop with precision — scalable code, performance-first architecture, and thorough quality assurance.",
    icon: <Zap size={20} />,
  },
  {
    step: "04",
    title: "Launch",
    description: "We deploy, hand over full documentation, and provide continued support to keep your product growing.",
    icon: <CheckCircle size={20} />,
  },
];

const values = [
  "Full-Stack Web Development",
  "Workflow & Business Automation",
  "Frontend UI/UX Design",
  "Branding & Identity",
  "SEO & Performance",
  "AI Agent Consultation",
];

const stats = [
  { value: "2+", label: "Years building" },
  { value: "10+", label: "Projects shipped" },
  { value: "2 wks", label: "Max delivery" },
  { value: "200+", label: "Waitlist signups" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/8 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              About Vergeo Group
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              Converging business <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                onto the digital space
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Vergeo Group began as an idea — an idea to bring together different modes and forms of business to the digital space. We sought to converge products, services, events and supplies/inventory for multiple clients and vendors on one platform, through innovation, skill and creativity to provide a large customer base for all those seeking to boost their business and be visible.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {values.map((v) => (
                <span
                  key={v}
                  className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full"
                >
                  <CheckCircle size={14} className="text-blue-600 shrink-0" />
                  {v}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-blue-700 transition-all hover:scale-[1.03] shadow-lg shadow-blue-600/20"
              >
                Start a project <ArrowRight size={16} />
              </Link>
              <div className="flex gap-3">
                <a
                  href={SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all border border-gray-200 dark:border-white/10"
                >
                  <Github size={18} />
                </a>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-gray-200 dark:border-white/10"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={SITE_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all border border-gray-200 dark:border-white/10"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-all border border-gray-200 dark:border-white/10"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile card */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-violet-500/20 rounded-[2.5rem] blur-2xl" />
              <div className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl w-72">
                <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-5 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <Image
                    src="/profile.jpg"
                    alt="Kaluba Prosper Musonda"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                  {SITE_CONFIG.developerName}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-bold mb-3">
                  Founder & Lead Developer
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Based in {SITE_CONFIG.location.city}, {SITE_CONFIG.location.country}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">
                    Available for projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-12 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/8 px-4 py-2 rounded-full mb-4">
              <Users size={14} />
              How we work
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Our Process
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              A proven four-step framework that takes you from idea to launched product in under two weeks.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={step.step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%-1px)] w-full h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-900/50 z-0" />
                )}
                <div className="relative z-10 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors group">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/70 text-sm font-black uppercase tracking-[0.2em] mb-6">Our Mission</p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
            &ldquo;To converge every form of business onto one unified digital space — driving growth for vendors and convenience for customers across Zambia and beyond.&rdquo;
          </h2>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all hover:scale-[1.03] shadow-2xl shadow-blue-900/30"
          >
            Join the Convergeo Waitlist <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
