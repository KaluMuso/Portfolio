"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  accentColor: string;
  avatarBg: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Client Name",
    role: "Founder",
    company: "Company",
    quote:
      "Kaluba delivered our store in under 2 weeks. Clean code, fast site, and he kept us updated throughout. Will hire again for our next project.",
    initials: "CN",
    accentColor: "text-blue-600 dark:text-blue-400",
    avatarBg: "bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Client Name",
    role: "Operations Manager",
    company: "Company",
    quote:
      "The WhatsApp automation he built saves us close to an hour every day. It just works — no maintenance, no errors. Absolute game-changer.",
    initials: "CN",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    avatarBg: "bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#FBBF24">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50/60 dark:bg-white/[0.02] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-blue-600/3 dark:bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-4">
            Social Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            What clients say
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">
            Real results from real projects.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative bg-white dark:bg-[#0c0c0e] border border-gray-100 dark:border-white/6 rounded-[2rem] p-8 hover:border-blue-500/20 dark:hover:border-blue-400/15 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-6 right-7 opacity-6 group-hover:opacity-10 transition-opacity duration-500">
                <Quote size={72} className="text-blue-600 dark:text-blue-400" />
              </div>

              <Stars />

              <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-base font-medium relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm select-none ${t.avatarBg}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className={`font-black text-sm ${t.accentColor}`}>
                    {t.name}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-bold">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
