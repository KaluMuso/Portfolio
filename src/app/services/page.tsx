import Link from "next/link";
import { ArrowRight, Code2, Zap, Palette, Search, Bot, ShoppingBag, Megaphone } from "lucide-react";
import { WebDevCalculator, WorkflowCalculator } from "@/components/ui/PricingCalculator";

export const metadata = {
  title: "Services | Vergeo Group",
  description: "Full-stack web development, automation, SEO, branding, and AI consultation services. Starting from $75.",
};

const services = [
  {
    slug: "web-development",
    icon: <Code2 size={24} />,
    title: "Web Development",
    tagline: "Fast, scalable web apps",
    description: "From single-page applications to complex SaaS platforms — built with Next.js, React, and Supabase for maximum performance and scalability.",
    features: ["Next.js & React", "Supabase backend", "E-commerce stores", "PWA / mobile-ready"],
    from: 75,
    color: "blue",
  },
  {
    slug: "automation",
    icon: <Zap size={24} />,
    title: "Workflow Automation",
    tagline: "Eliminate repetitive tasks",
    description: "Connect your business tools and automate manual workflows using N8N — CRM sync, WhatsApp automation, invoice generation, and more.",
    features: ["N8N workflows", "App integrations", "WhatsApp bots", "AI-powered flows"],
    from: 120,
    color: "violet",
  },
  {
    slug: "ui-ux-design",
    icon: <Palette size={24} />,
    title: "UI/UX Design",
    tagline: "Interfaces people love",
    description: "High-fidelity designs that convert — wireframes, prototypes, and pixel-perfect component libraries ready for developer handoff.",
    features: ["Wireframes & prototypes", "Design systems", "Mobile-first", "Figma deliverables"],
    from: 120,
    color: "pink",
  },
  {
    slug: "seo",
    icon: <Search size={24} />,
    title: "SEO & Performance",
    tagline: "Rank higher, load faster",
    description: "Technical SEO audits, Core Web Vitals optimization, structured data, and content strategy to drive organic traffic to your business.",
    features: ["Technical SEO audit", "Schema markup", "Core Web Vitals", "Performance tuning"],
    from: 60,
    color: "green",
  },
  {
    slug: "branding",
    icon: <Megaphone size={24} />,
    title: "Branding & Identity",
    tagline: "Look the part",
    description: "Logo design, brand guidelines, color systems, and typography that communicate your values and attract your ideal customers.",
    features: ["Logo & icon design", "Brand guidelines", "Color & type systems", "Social media kits"],
    from: 80,
    color: "orange",
  },
  {
    slug: "ai-consultation",
    icon: <Bot size={24} />,
    title: "AI Agent Consultation",
    tagline: "AI built for your business",
    description: "Custom AI agents, chatbots, and automation pipelines using the latest LLMs — scoped, built, and integrated into your existing stack.",
    features: ["Custom AI agents", "LLM integrations", "RAG pipelines", "Business-specific training"],
    from: 200,
    color: "indigo",
  },
  {
    slug: "ecommerce",
    icon: <ShoppingBag size={24} />,
    title: "E-Commerce",
    tagline: "Stores that convert",
    description: "Production-ready online stores with product management, cart, checkout, and payment integration — optimized for conversion and speed.",
    features: ["Product management", "Stripe payments", "Inventory sync", "Mobile checkout"],
    from: 350,
    color: "teal",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-600/10",   text: "text-blue-600",   border: "hover:border-blue-200 dark:hover:border-blue-900" },
  violet: { bg: "bg-violet-600/10", text: "text-violet-600", border: "hover:border-violet-200 dark:hover:border-violet-900" },
  pink:   { bg: "bg-pink-600/10",   text: "text-pink-600",   border: "hover:border-pink-200 dark:hover:border-pink-900" },
  green:  { bg: "bg-green-600/10",  text: "text-green-600",  border: "hover:border-green-200 dark:hover:border-green-900" },
  orange: { bg: "bg-orange-600/10", text: "text-orange-600", border: "hover:border-orange-200 dark:hover:border-orange-900" },
  indigo: { bg: "bg-indigo-600/10", text: "text-indigo-600", border: "hover:border-indigo-200 dark:hover:border-indigo-900" },
  teal:   { bg: "bg-teal-600/10",   text: "text-teal-600",   border: "hover:border-teal-200 dark:hover:border-teal-900" },
};

const tiers = [
  {
    name: "Starter",
    monthly: 75,
    yearly: 60,
    description: "Perfect for small businesses and landing pages",
    features: [
      "1 SPA or landing page",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "Vercel deployment",
      "2 revision rounds",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Professional",
    monthly: 350,
    yearly: 280,
    description: "For growing businesses that need more features",
    features: [
      "Up to 10 pages",
      "E-commerce or blog",
      "Auth system",
      "Admin dashboard",
      "3 workflow automations",
      "Full SEO package",
      "30-day post-launch support",
      "Google Analytics setup",
    ],
    cta: "Most popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "Complex platforms, SaaS, and team projects",
    features: [
      "Unlimited pages & features",
      "Custom API development",
      "AI agent integration",
      "Full automation suite",
      "Dedicated project manager",
      "Priority support",
      "Monthly retainer option",
      "Scalability planning",
    ],
    cta: "Custom quote",
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/8 px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            What we offer
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
            Services built for<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              real business growth
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            From your first website to enterprise automation — Vergeo Group delivers end-to-end digital solutions, starting from <span className="font-black text-gray-900 dark:text-white">$75</span>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all hover:scale-[1.03] shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              Get a free quote <ArrowRight size={16} />
            </Link>
            <a
              href="#calculators"
              className="bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Calculate my price
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6 md:px-12 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const c = colorMap[service.color];
              return (
                <div
                  key={service.slug}
                  className={`bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-7 transition-all duration-300 ${c.border} hover:shadow-xl group`}
                >
                  <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white">{service.title}</h3>
                      <p className={`text-xs font-bold ${c.text} uppercase tracking-wider mt-0.5`}>{service.tagline}</p>
                    </div>
                    <span className="text-sm font-black text-gray-400 shrink-0 ml-2">from ${service.from}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.features.map((f) => (
                      <span key={f} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-black ${c.text} hover:gap-2.5 transition-all`}
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hidden fees. No surprise invoices. Pay for what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 ${
                  tier.highlight
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-600/30"
                    : "bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-black mb-2 ${tier.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
                  {tier.description}
                </p>
                <div className="mb-8">
                  {tier.monthly ? (
                    <>
                      <span className={`text-4xl font-black ${tier.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                        ${tier.monthly}
                      </span>
                      <span className={`text-sm ml-1 ${tier.highlight ? "text-blue-200" : "text-gray-400"}`}>
                        /project
                      </span>
                    </>
                  ) : (
                    <span className={`text-2xl font-black ${tier.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                      Custom
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm font-medium ${tier.highlight ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? "bg-white/20 text-white" : "bg-blue-600/10 text-blue-600"}`}>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-4 rounded-2xl font-black text-sm transition-all ${
                    tier.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Build your own quote
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Drag-and-drop your requirements to get an instant price estimate.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <WebDevCalculator />
            <WorkflowCalculator />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Projects delivered in under 2 weeks. Replies within 2 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all hover:scale-[1.03] shadow-2xl shadow-blue-900/30"
          >
            Start a project today <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
