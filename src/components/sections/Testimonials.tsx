import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
};

// Replace with real testimonials as you collect them
const testimonials: Testimonial[] = [
  {
    name: "Client Name",
    role: "Founder",
    company: "Company",
    quote:
      "Kaluba delivered our store in under 2 weeks. Clean code, fast site, and he kept us updated throughout. Will hire again for our next project.",
    initials: "CN",
  },
  {
    name: "Client Name",
    role: "Operations Manager",
    company: "Company",
    quote:
      "The WhatsApp automation he built saves us close to an hour every day. It just works — no maintenance, no errors.",
    initials: "CN",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FBBF24">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What clients say
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Real results from real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn(
                "bg-white border border-gray-200 rounded-2xl p-8",
                i === 0 && "md:col-span-1" // extend first card if only 1 testimonial
              )}
            >
              <StarRating />
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-base font-serif italic">
                &quot;{t.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
