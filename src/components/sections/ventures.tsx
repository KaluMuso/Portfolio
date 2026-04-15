"use client";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Rocket, MessageSquare, ShoppingCart, Workflow } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";

const ventures = [
  {
    title: "AI Job Discovery Platform",
    description: "Full-cycle automation from discovery to application using LLMs.",
    impact: "80% reduction in manual search",
    icon: Rocket,
    link: "/projects/ai-job-automation-platform",
    tech: ["Next.js", "Python", "OpenAI"]
  },
  {
    title: "Enterprise E-commerce Engine",
    description: "High-performance headless commerce for multi-region fulfillment.",
    impact: "40% faster checkout flow",
    icon: ShoppingCart,
    link: "/projects/enterprise-ecommerce-engine",
    tech: ["React", "FastAPI", "Stripe"]
  },
  {
    title: "WhatsApp CRM Automation",
    description: "Intelligent support bot integrated with enterprise databases.",
    impact: "60% of queries automated",
    icon: MessageSquare,
    link: "/projects/whatsapp-crm-automation",
    tech: ["Node.js", "Supabase", "Anthropic"]
  }
];

export function VenturesSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <Container>
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Differentiator</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Systems & Ventures</h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I don&apos;t just build websites; I build business-critical platforms and 
            automation engines designed for maximum ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ventures.map((venture) => (
            <MovingBorderButton
              key={venture.title}
              borderRadius="1.75rem"
              duration={Math.floor(Math.random() * 10000) + 10000}
              className="bg-card dark:bg-slate-900/[0.8] text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="p-6 md:p-8 flex flex-col h-full w-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <venture.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{venture.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {venture.description}
                </p>
                
                <div className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-primary/5 border border-primary/10 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary opacity-70 leading-none">Impact</span>
                  <span className="text-xs font-semibold">{venture.impact}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {venture.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px] bg-background/50 h-5 px-2">
                      {t}
                    </Badge>
                  ))}
                </div>
                
                <a href={venture.link} className="inline-flex items-center text-sm font-bold text-primary hover:translate-x-1 transition-transform">
                  Case Study
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </div>
            </MovingBorderButton>
          ))}
        </div>
      </Container>
    </section>
  );
}
