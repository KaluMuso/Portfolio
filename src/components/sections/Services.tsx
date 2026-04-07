import { ShoppingBag, Zap, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "E-commerce Development",
    description: "Full-stack stores built for speed and high conversion using Next.js and Supabase.",
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Workflow Automation",
    description: "Eliminate manual tasks by connecting your tools with N8N and AI integrations.",
    icon: Zap,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Business Websites",
    description: "Professional, SEO-optimized web presences designed to build trust and generate leads.",
    icon: Globe,
    color: "bg-purple-50 text-purple-600",
  },
];

export function Services() {
  return (
    <section className="py-24 bg-gray-50 px-6 md:px-12 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Services</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            I help businesses grow by combining technical excellence with 
            process-driven efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className={`${service.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <Link href="/services" className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1 group">
                Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
