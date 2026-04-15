import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveLeft, GitBranch, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-8 mb-12">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <MoveLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="px-3 py-1 text-xs capitalize">
            {project.category}
          </Badge>
          <Badge variant={project.status === "live" ? "default" : "outline"} className="px-3 py-1 text-xs capitalize">
            {project.status.replace("-", " ")}
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {project.github && (
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <GitBranch className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.demo && (
            <Button asChild size="sm">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {project.tech.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
