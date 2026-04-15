import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, Lightbulb, TrendingUp } from "lucide-react"

interface CalloutProps {
  children: React.ReactNode
  type?: "info" | "warning" | "success" | "idea"
}

const Callout = ({ children, type = "info" }: CalloutProps) => {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    idea: <Lightbulb className="h-5 w-5 text-purple-500" />,
  }

  const styles = {
    info: "border-blue-500/20 bg-blue-500/5",
    warning: "border-amber-500/20 bg-amber-500/5",
    success: "border-emerald-500/20 bg-emerald-500/5",
    idea: "border-purple-500/20 bg-purple-500/5",
  }

  return (
    <div className={cn("my-6 flex gap-4 rounded-xl border p-4", styles[type])}>
      <div className="mt-1 shrink-0">{icons[type]}</div>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  description?: string
}

const MetricCard = ({ label, value, description }: MetricCardProps) => (
  <div className="my-6 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-70">
      <TrendingUp className="h-3 w-3" />
      {label}
    </div>
    <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</div>
    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
  </div>
)

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "font-heading mt-8 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "font-heading mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("mt-4 leading-7 text-muted-foreground first:mt-0", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("font-medium text-primary underline underline-offset-4", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-4 ml-6 list-disc text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 ml-6 list-decimal text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-4 overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Callout,
  MetricCard,
}
