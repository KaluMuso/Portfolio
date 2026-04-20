import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "blue" | "green" | "amber" | "red" | "purple";

const variants: Record<BadgeVariant, string> = {
  default: "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-400 border-gray-200/50 dark:border-white/10",
  blue:    "bg-blue-50 dark:bg-blue-400/5 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-400/10",
  green:   "bg-green-50 dark:bg-emerald-400/5 text-green-700 dark:text-emerald-400 border-green-200/50 dark:border-emerald-400/10",
  amber:   "bg-amber-50 dark:bg-amber-400/5 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-400/10",
  red:     "bg-red-50 dark:bg-red-400/5 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-400/10",
  purple:  "bg-purple-50 dark:bg-purple-400/5 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-400/10",
};

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full border",
      variants[variant],
      className
    )}>
      {label}
    </span>
  );
}

