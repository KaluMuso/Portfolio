"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "AI Job Automation Platform",
    link: "/projects/ai-job-automation-platform",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Enterprise E-commerce Engine",
    link: "/projects/enterprise-ecommerce-engine",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "WhatsApp CRM Automation",
    link: "/projects/whatsapp-crm-automation",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "CLI Tooling",
    link: "/projects/cli-tooling",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Sample Dashboard",
    link: "/projects/sample-dashboard",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "AI Job Automation Platform",
    link: "/projects/ai-job-automation-platform",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Enterprise E-commerce Engine",
    link: "/projects/enterprise-ecommerce-engine",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "WhatsApp CRM Automation",
    link: "/projects/whatsapp-crm-automation",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "CLI Tooling",
    link: "/projects/cli-tooling",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Sample Dashboard",
    link: "/projects/sample-dashboard",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "AI Job Automation Platform",
    link: "/projects/ai-job-automation-platform",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Enterprise E-commerce Engine",
    link: "/projects/enterprise-ecommerce-engine",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "WhatsApp CRM Automation",
    link: "/projects/whatsapp-crm-automation",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "CLI Tooling",
    link: "/projects/cli-tooling",
    thumbnail: "/images/og-placeholder.svg",
  },
  {
    title: "Sample Dashboard",
    link: "/projects/sample-dashboard",
    thumbnail: "/images/og-placeholder.svg",
  },
];

export function HeroSection() {
  return <HeroParallax products={products} />;
}
