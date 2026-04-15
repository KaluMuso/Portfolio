"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Container } from "@/components/ui/container";
import { Globe } from "@/components/ui/globe";
import { Code2, BarChart3, Workflow, Boxes, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-muted/30">
      <Container>
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Identity & Signal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A software engineer focused on building high-impact systems. 
            I combine technical depth with business sense.
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {gridItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
}

const gridItems = [
  {
    title: "The Technical Core",
    description: "Specializing in React/Next.js and Python/Node.js to build scalable AI-powered systems.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 p-4">
        <Code2 className="h-10 w-10 text-primary opacity-50" />
      </div>
    ),
    icon: <Code2 className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Global Reach",
    description: "Available across timezones, delivering high-performance solutions worldwide.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
         <Globe className="opacity-60 mix-blend-screen scale-[1.5] absolute -bottom-10" />
      </div>
    ),
    icon: <MapPin className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Systems Architecture",
    description: "Designing workflows that replace manual effort with scalable automation.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 p-4">
        <Workflow className="h-10 w-10 text-primary opacity-50" />
      </div>
    ),
    icon: <Workflow className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Tech Stack",
    description: "Modern web ecosystems and AI integration.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 p-4 flex-wrap gap-2 items-center justify-center">
        {["Next.js", "Python", "OpenAI", "AWS", "FastAPI", "Stripe"].map((t) => (
          <Badge key={t} variant="outline" className="text-[10px]">
            {t}
          </Badge>
        ))}
      </div>
    ),
    icon: <Boxes className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Business Impact",
    description: "Reducing costs and increasing throughput through technical excellence.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 p-4">
        <BarChart3 className="h-10 w-10 text-primary opacity-50" />
      </div>
    ),
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
];
