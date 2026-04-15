"use client";
import { Container } from "@/components/ui/container";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

const metrics = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Hours Saved with AI", value: "2,000+" },
  { label: "Uptime Guaranteed", value: "99.9%" },
  { label: "Countries Served", value: "12" }
];

export function MetricsSection() {
  return (
    <section className="relative bg-background overflow-hidden border-y">
      <LampContainer className="h-[40rem]">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center text-center">
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1 group">
                  <div className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter group-hover:scale-105 transition-transform duration-300 text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </motion.div>
      </LampContainer>
    </section>
  );
}
