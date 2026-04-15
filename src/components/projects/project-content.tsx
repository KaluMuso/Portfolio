import type { ReactNode } from "react";
import type { Project } from "@/types/project";

interface ProjectContentProps {
  project: Project;
  children: ReactNode;
}

export default function ProjectContent({ project, children }: ProjectContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        {children}
      </div>

      <aside className="space-y-8">
        {project.results && project.results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Results & Impact
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {project.results.map((result, i) => (
                <div key={i} className="p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{result.value}</div>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Project Details
          </h3>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium capitalize">{project.category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium capitalize">{project.status.replace("-", " ")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Completion Date</dt>
              <dd className="font-medium">{new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
