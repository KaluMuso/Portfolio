export function TrustBar() {
  const tools = ["Next.js", "Framer", "Supabase", "N8N", "Stripe", "PostgreSQL", "React", "TypeScript"];

  return (
    <section className="py-12 border-b border-gray-100 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8 text-center">
          Building with modern tools
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          {tools.map((tool) => (
            <span key={tool} className="text-lg font-bold text-gray-600">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
