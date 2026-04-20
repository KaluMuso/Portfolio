"use client";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Clock, Rocket } from "lucide-react";

// Coming-soon items
const comingSoon = [
  {
    title: "Vergeo Instant-Connect",
    description:
      "AI-powered contact form that qualifies leads, books meetings, and sends instant WhatsApp follow-ups — all without human touch.",
    tags: ["AI", "WhatsApp API", "N8N"],
    accent: "blue",
    eta: "Q2 2025",
  },
  {
    title: "SmartInvoice Pro",
    description:
      "Automated invoicing & payment reminder system with Lenco and DPO integration. Zero manual follow-up, faster collections.",
    tags: ["Lenco and DPO", "Automation", "SaaS"],
    accent: "amber",
    eta: "Q3 2025",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time business intelligence dashboard pulling from multiple data sources with AI-generated weekly summaries.",
    tags: ["Next.js", "PostgreSQL", "AI"],
    accent: "violet",
    eta: "Q3 2025",
  },
];

const accentMap: Record<string, { border: string; tag: string; icon: string; glow: string }> = {
  blue:   { border: "border-blue-500/20",   tag: "bg-blue-500/8 border-blue-500/20 text-blue-500",   icon: "text-blue-500",   glow: "hover:shadow-blue-500/8"   },
  amber:  { border: "border-amber-500/20",  tag: "bg-amber-500/8 border-amber-500/20 text-amber-500",  icon: "text-amber-500",  glow: "hover:shadow-amber-500/8"  },
  violet: { border: "border-violet-500/20", tag: "bg-violet-500/8 border-violet-500/20 text-violet-500", icon: "text-violet-500", glow: "hover:shadow-violet-500/8" },
};

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4"
            >
              <Trophy size={13} /> Case Studies
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-4"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-balance"
            >
              Technical implementations that delivered significant business
              impact and measurable operational excellence.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-white/10 transition-all group"
            >
              View Archive
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Live Projects Grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {featured.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Coming Soon ── */}
        <div className="pt-16 border-t border-gray-100 dark:border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Rocket size={15} className="text-violet-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Coming Soon
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  In-development products
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-violet-500/8 border border-violet-500/20 text-violet-500">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Active development
            </span>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {comingSoon.map((cs) => {
              const a = accentMap[cs.accent];
              return (
                <motion.div
                  key={cs.title}
                  variants={item}
                  className={`group relative p-7 rounded-[2rem] bg-white dark:bg-white/[0.025] border border-gray-100 dark:border-white/5 ${a.border} transition-all duration-400 hover:shadow-xl ${a.glow} overflow-hidden`}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer rounded-[2rem]" />

                  {/* ETA badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${a.tag}`}
                    >
                      <Clock size={9} />
                      {cs.eta}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  </div>

                  <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-3">
                    {cs.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-6">
                    {cs.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${a.tag}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
