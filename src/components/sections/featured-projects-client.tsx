"use client";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/projects/project-card";

interface FeaturedProjectsClientProps {
  projects: Project[];
}

export function FeaturedProjectsClient({ projects }: FeaturedProjectsClientProps) {
  const categories = ["all", "ai", "automation", "web"];
  
  const tabs = categories.map((cat) => ({
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: cat,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
        {projects
          .filter((p) => cat === "all" || p.category === cat)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
      </div>
    ),
  }));

  return (
    <div className="w-full mt-10">
      <Tabs tabs={tabs} />
    </div>
  );
}
