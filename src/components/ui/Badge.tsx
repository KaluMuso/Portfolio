import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "blue" | "green" | "amber" | "red" | "purple";

const variants: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  blue:    "bg-blue-50 text-blue-700",
  green:   "bg-green-50 text-green-700",
  amber:   "bg-amber-50 text-amber-700",
  red:     "bg-red-50 text-red-700",
  purple:  "bg-purple-50 text-purple-700",
};

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md",
      variants[variant],
      className
    )}>
      {label}
    </span>
  );
}
