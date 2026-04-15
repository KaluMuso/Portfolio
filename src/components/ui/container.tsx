import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ContainerProps = ComponentProps<"div"> & {
  /** Narrow reading column vs full content width */
  size?: "default" | "narrow" | "wide"
}

/**
 * Horizontal padding + max-width presets so pages stay aligned across breakpoints.
 */
export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-7xl",
        className
      )}
      {...props}
    />
  )
}
