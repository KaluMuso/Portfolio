import { Container } from "@/components/ui/container";
import { GitBranch, Star, Terminal } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const techStack = [
  {
    title: "Next.js",
    description: "Building fast, SEO-friendly React apps with server-side rendering and static site generation.",
    link: "https://nextjs.org",
  },
  {
    title: "Python",
    description: "Developing robust backend services, AI integrations, and automation scripts.",
    link: "https://python.org",
  },
  {
    title: "AWS",
    description: "Deploying scalable infrastructure using EC2, S3, Lambda, and other cloud services.",
    link: "https://aws.amazon.com",
  },
  {
    title: "OpenAI",
    description: "Integrating powerful AI models to automate tasks and extract intelligent insights.",
    link: "https://openai.com",
  },
];

const testimonials = [
  {
    quote:
      "Working with Kaluba was a game-changer for our lead generation. The AI system he built reduced our manual work by 80% while increasing our output.",
    name: "Sarah Chen",
    title: "Founder @ GrowthScale",
  },
  {
    quote:
      "The automation pipeline he designed for our e-commerce fulfillment is flawless. We've scaled 3x without adding any operational overhead.",
    name: "Marcus Thorne",
    title: "COO @ DirectFlow",
  },
  {
    quote:
      "Technical depth combined with a sharp business mind. He doesn't just write code; he builds solutions that drive actual revenue.",
    name: "Elena Rodriguez",
    title: "CTO @ VentureLabs",
  },
];

export function CredibilitySection() {
  return (
    <section className="py-16 md:py-20 border-y border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* GitHub Stats Stats Card */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">500+</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">OSS Contributions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">1.2k</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Stars Earned</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">15+</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Systems Deployed</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Hover Cards */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-2xl font-bold mb-2">My Tech Stack</h3>
            <p className="text-muted-foreground text-sm">Technologies I frequently use to build scalable systems.</p>
            <HoverEffect items={techStack} />
          </div>
        </div>
      </Container>
      
      <div className="flex flex-col items-center justify-center">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
