export function TrustBar() {
  const tools = [
    "Next.js", "Supabase", "N8N", "Lenco and DPO", "PostgreSQL",
    "React", "TypeScript", "Tailwind CSS", "Vercel", "OpenAI",
    "WhatsApp API", "Framer Motion",
  ];

  // Duplicate for seamless infinite loop
  const doubled = [...tools, ...tools];

  return (
    <section className="py-14 border-y border-gray-100 dark:border-white/5 overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.35em] mb-8 text-center">
        Engineered with excellence
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50/80 dark:from-[#060608] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50/80 dark:from-[#060608] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-0 w-max">
          {doubled.map((tool, i) => (
            <span
              key={i}
              className="inline-flex items-center px-8 text-lg md:text-xl font-black text-gray-400 dark:text-white/25 tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default select-none whitespace-nowrap"
            >
              {tool}
              <span className="ml-8 text-gray-200 dark:text-white/10 text-2xl select-none">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
