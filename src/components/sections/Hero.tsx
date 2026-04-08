"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const available = process.env.NEXT_PUBLIC_AVAILABLE;

  return (
    <section className="min-h-[85vh] flex items-center px-6 md:px-12 max-w-6xl mx-auto text-left relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.03)_0%,transparent_50%)] z-0 pointer-events-none" />

      <div className="max-w-3xl relative z-10 py-12">
        {available && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${available === 'true' ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${available === 'true' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {available === 'true' ? 'Available for new projects — 2 spots open' : 'Limited availability'}
            </span>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-blue-600 tracking-[0.2em] mb-4 uppercase"
        >
          Vergeo5 Technology
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight"
        >
          We build web apps and automations that{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">actually ship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed font-medium"
        >
          Full-stack development specializing in high-performance e-commerce,
          business systems, and N8N workflow automations. Based in Zambia,
          engineering for the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/25 justify-center"
          >
            Start a project <ArrowRight size={18} />
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-800 px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition-all justify-center backdrop-blur-sm"
          >
            Join the waitlist
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
