"use client";
import dynamic from "next/dynamic";
import { CredibilitySection } from "@/components/sections/credibility"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { VenturesSection } from "@/components/sections/ventures"
import { MetricsSection } from "@/components/sections/metrics"
import { NewsletterSection } from "@/components/sections/newsletter"
import { ContactSection } from "@/components/sections/contact"

const HeroSection = dynamic(() => import("@/components/sections/hero").then(mod => mod.HeroSection), { ssr: false });
const BentoSection = dynamic(() => import("@/components/sections/bento").then(mod => mod.BentoSection), { ssr: false });
const ProcessSection = dynamic(() => import("@/components/sections/process").then(mod => mod.ProcessSection), { ssr: false });

export function HomeContent({ featuredProjects }: { featuredProjects: any }) {
  return (
    <main className="relative flex flex-col">
      <HeroSection />
      <CredibilitySection />
      <BentoSection />
      <ProcessSection />
      {featuredProjects}
      <VenturesSection />
      <MetricsSection />
      <NewsletterSection />
      <ContactSection />
    </main>
  );
}
