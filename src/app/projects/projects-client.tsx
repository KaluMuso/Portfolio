"use client"

import { useState } from "react";
import ProjectGrid from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const categories = ["all", "ai", "automation", "web", "mobile", "business"] as const;

interface ProjectClientProps {
  projects: Project[];
}

export default function ProjectClient({ projects }: ProjectClientProps) {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "capitalize rounded-full px-6 transition-all",
              activeCategory === cat ? "shadow-lg shadow-primary/20" : "hover:bg-primary/5 hover:border-primary/30"
            )}
          >
            {cat}
          </Button>
        ))}
      </div>
      
      <div className="min-h-[400px]">
        <ProjectGrid projects={filteredProjects} />
      </div>
    </div>
  );
}
