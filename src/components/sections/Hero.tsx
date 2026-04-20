"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, ArrowDown } from "lucide-react";

const stats = [
  { value: "30+", label: "Projects Shipped" },
  { value: "20+", label: "Happy Clients" },
  { value: "2wk", label: "Avg Delivery" },
  { value: "100%", label: "On-Time Rate" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
};

export function Hero() {
  const available = process.env.NEXT_PUBLIC_AVAILABLE;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      {/* ── Multi-colour petal blobs (logo colours) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-8%]  w-[45%] h-[55%] rounded-full bg-blue-600/10   dark:bg-blue-600/8   blur-[140px]" />
        <div className="absolute top-[10%]  right-[-8%] w-[38%] h-[45%] rounded-full bg-violet-600/8  dark:bg-violet-600/6  blur-[130px]" />
        <div className="absolute bottom-[5%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-600/6 dark:bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[5%] w-[30%] h-[35%] rounded-full bg-amber-500/6  dark:bg-amber-500/5  blur-[110px]" />
      </div>

      {/* ── Grid dot pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1d4ed8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-28 pb-16">
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
        >
          {/* Availability pill */}
          {available && (
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-white/30 dark:border-white/8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${
                      available === "true" ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      available === "true" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                </span>
                {available === "true"
                  ? "Available for new projects"
                  : "Limited availability — book now"}
              </span>
            </motion.div>
          )}

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 mb-6"
          >
            <Sparkles size={13} />
            Vergeo5 Technology · Lusaka, Zambia
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black leading-[1.02] tracking-tighter text-gray-900 dark:text-white mb-6 text-balance max-w-5xl"
          >
            We build{" "}
            <span className="gradient-text animate-gradient-flow">
              web apps
            </span>
            <br className="hidden md:block" />
            &amp; automations that{" "}
            <span className="relative inline-block">
              <span className="gradient-text animate-gradient-flow">
                actually ship.
              </span>
              {/* underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-red-500 origin-left"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed font-medium text-balance"
          >
            High-performance e-commerce, custom business systems, and scalable
            N8N workflow automations. Engineering excellence designed to drive
            measurable growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-9 py-4 rounded-2xl font-black text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-blue-600/30 glow-blue"
            >
              Start a project
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>

            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2 glass text-gray-800 dark:text-gray-200 px-9 py-4 rounded-2xl font-black text-sm transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/8 hover:scale-[1.03] active:scale-[0.97]"
            >
              Join the waitlist
            </Link>

            <a
              href="/company-profile.pdf"
              download
              className="group inline-flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 px-9 py-4 rounded-2xl font-black text-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Download size={16} />
              Download Profile
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="group">
                <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {s.value}
                </p>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 dark:text-white/20"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
