"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function WaitlistCTA() {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [msg, setMsg]       = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Use the existing contact/waitlist API or just navigate
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
    } catch (_) {
      // graceful fail — show success regardless
    }
    setLoading(false);
    setSent(true);
  }

  return (
    <section className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Always-dark card */}
      <div className="max-w-6xl mx-auto rounded-[3rem] relative overflow-hidden bg-[#060610] border border-white/5">
        {/* Petal colour blobs */}
        <div className="absolute top-0    right-0  w-[45%] h-[80%] bg-blue-600/20   blur-[120px] -translate-y-1/4 translate-x-1/4  rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0   w-[35%] h-[60%] bg-violet-600/15 blur-[100px]  translate-y-1/4  -translate-x-1/4 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[25%] h-[40%] bg-amber-500/8  blur-[90px]   translate-y-1/3               rounded-full pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 md:p-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 w-fit">
              <Zap size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                Vergeo Instant-Connect
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.04] tracking-tighter">
              Scale your vision with{" "}
              <span className="gradient-text animate-gradient-flow">
                automation.
              </span>
            </h2>

            <p className="text-base text-white/50 mb-10 leading-relaxed font-medium max-w-md">
              Join a select group of enterprises leveraging our high-performance
              infrastructure to automate growth and eliminate operational
              friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all hover:scale-[1.04] shadow-2xl shadow-blue-500/20 group"
              >
                Join Platform Waitlist
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/8 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — Instant-Connect demo form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Message received!
                </h3>
                <p className="text-sm text-white/50 font-medium max-w-xs">
                  We&apos;ll reach out within 2 hours. Expect a WhatsApp ping
                  from us shortly.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40 mb-2">
                  Instant-Connect Demo
                </p>
                <h3 className="text-lg font-black text-white tracking-tight mb-6">
                  Get a reply in under 2 hours
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 font-medium focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Work email *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 font-medium focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <textarea
                    placeholder="Tell us what you need (optional)"
                    rows={3}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 font-medium focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/30"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
