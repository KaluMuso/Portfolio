"use client";
import React from "react";
import { Container } from "@/components/ui/container";
import { Search, PenTool, Terminal, LineChart } from "lucide-react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  {
    title: "Discovery & Analysis",
    description: "I identify manual bottlenecks and data silos that are costing your business time and money.",
    icon: Search,
    colors: [[59, 130, 246]], // Blue
  },
  {
    title: "System Architecture",
    description: "Design a scalable blueprint that integrates AI and automation into your workflow.",
    icon: PenTool,
    colors: [[168, 85, 247]], // Purple
  },
  {
    title: "Rapid Deployment",
    description: "Built using iterative cycles. You see functional system modules every week.",
    icon: Terminal,
    colors: [[236, 72, 153]], // Pink/Primary
  },
  {
    title: "Monitoring & Scaling",
    description: "Post-launch support to monitor ROI metrics and scale as operations grow.",
    icon: LineChart,
    colors: [[34, 197, 94]], // Green
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-20 bg-background overflow-hidden relative border-t">
      <Container>
        <div className="flex flex-col mb-12 items-center text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold text-primary tracking-widest uppercase">
            THE WORKFLOW
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A System-First Approach <br />
            <span className="text-primary italic">to Digital Transformation.</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            I deliver a predictable process designed to maximize business efficiency 
            and technical longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <Card key={step.title} title={step.title} icon={<step.icon className="h-10 w-10 text-white" />} description={step.description} index={i+1}>
               <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={step.colors}
                dotSize={2}
              />
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

const Card = ({
  title,
  icon,
  children,
  description,
  index,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
  index: number;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-3xl overflow-hidden"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center flex-col">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
             {icon}
          </div>
          <h2 className="dark:text-white text-xl font-bold mt-4">
             {title}
          </h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/canvas-card:opacity-100 transition duration-200 w-full mx-auto flex flex-col items-center justify-center">
           <div className="text-[10px] font-bold text-primary mb-2 font-mono">STEP 0{index}</div>
           <h2 className="dark:text-white text-3xl text-center font-bold">
            {title}
          </h2>
          <p className="text-sm text-neutral-300 text-center mt-4 px-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
