"use client";
import { ShoppingBag, Zap, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "E-commerce Development",
    description:
      "High-performance storefronts built with Next.js and Supabase. Optimised for speed, SEO, and extreme conversion rates.",
    icon: ShoppingBag,
    petal: "blue",
    iconBg: "bg-blue-600/10 dark:bg-blue-600/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-500/30",
    glowHover: "hover:shadow-blue-500/10",
    numColor: "text-blue-600/20 dark:text-blue-400/15",
    tagBg: "bg-blue-500/6 border-blue-500/15 text-blue-600 dark:text-blue-400",
    tags: ["Next.js", "Lenco and DPO", "Supabase"],
  },
  {
    num: "02",
    title: "Workflow Automation",
    description:
      "Connect your entire tech stack with N8N and AI integrations. Eliminate manual tasks, reduce human error, and reclaim hours every day.",
    icon: Zap,
    petal: "amber",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/30",
    glowHover: "hover:shadow-amber-500/10",
    numColor: "text-amber-600/20 dark:text-amber-400/15",
    tagBg: "bg-amber-500/6 border-amber-500/15 text-amber-600 dark:text-amber-400",
    tags: ["N8N", "WhatsApp API", "OpenAI"],
  },
  {
    num: "03",
    title: "SaaS & Web Apps",
    description:
      "Custom, scalable full-stack applications designed for growth. We prioritise reliability, security, and world-class UX from day one.",
    icon: Layers,
    petal: "violet",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderHover: "hover:border-violet-500/30",
    glowHover: "hover:shadow-violet-500/10",
    numColor: "text-violet-600/20 dark:text-violet-400/15",
    tagBg: "bg-violet-500/6 border-violet-500/15 text-violet-600 dark:text-violet-400",
    tags: ["React", "TypeScript", "PostgreSQL"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const card = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export function Services() {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Faint radial bg */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(29,78,216,0.03),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(29,78,216,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-4"
          >
            Our Expertise
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none text-balance max-w-xl">
              Expert solutions for the{" "}
              <span className="gradient-text">modern enterprise.</span>
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-sm font-medium leading-relaxed">
              Deep technical expertise combined with process-driven efficiency —
              so you ship faster and scale bigger.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={card}
              className={`group relative p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/6 ${s.borderHover} transition-all duration-500 hover:shadow-2xl ${s.glowHover} flex flex-col overflow-hidden`}
            >
              {/* Background number */}
              <span
                className={`absolute top-6 right-8 text-7xl font-black select-none ${s.numColor} transition-all duration-500 group-hover:opacity-40`}
              >
                {s.num}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${s.iconBg} group-hover:scale-110 transition-transform duration-500`}
              >
                <s.icon size={26} className={s.iconColor} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium flex-1 mb-6">
                {s.description}
              </p>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.tagBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA link */}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
              >
                Learn more
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:text-white transition-all duration-300">
                  <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
