import { ShoppingBag, Zap, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "E-commerce Development",
    description: "Full-stack stores built for speed and high conversion using Next.js and Supabase.",
    icon: ShoppingBag,
    color: "bg-blue-600/5 text-blue-600",
  },
  {
    title: "Workflow Automation",
    description: "Eliminate manual tasks by connecting your tools with N8N and AI integrations.",
    icon: Zap,
    color: "bg-amber-600/5 text-amber-600",
  },
  {
    title: "Business Websites",
    description: "Professional, SEO-optimized web presences designed to build trust and generate leads.",
    icon: Globe,
    color: "bg-indigo-600/5 text-indigo-600",
  },
];

export function Services() {
  return (
    <section className="py-20 bg-gray-50/50 px-6 md:px-12 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Expert Solutions</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Helping businesses grow by combining technical excellence with 
            process-driven efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm font-medium">{service.description}</p>
              <Link href="/services" className="text-xs font-bold text-blue-600 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
