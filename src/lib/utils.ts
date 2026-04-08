import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging Tailwind classes safely — used everywhere
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for case studies / blog posts
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

// Truncate long strings for meta descriptions
export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length - 3) + "..." : str;
}
