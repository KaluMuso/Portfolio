"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// This is the most important component — it sets the conversion tone immediately.
// Lead with outcome, not job title.
export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 max-w-6xl mx-auto text-left">
      <div className="max-w-3xl">
        {/* Social proof hook — builds credibility before the pitch */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-blue-600 tracking-wide mb-4 uppercase"
        >
          Available for freelance work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
        >
          I build web apps and automations that{" "}
          <span className="text-blue-600">actually ship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed"
        >
          Full-stack developer specialising in e-commerce stores, business websites,
          and workflow automations using N8N and AI tools. Based in Zambia, working
          globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors justify-center"
          >
            Start a project <ArrowRight size={16} />
          </Link>
          {/* Secondary CTA — the waitlist conversion */}
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors justify-center"
          >
            Join the platform waitlist
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
