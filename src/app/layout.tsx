import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { ThemeProvider } from "@/components/layout/theme-provider"
import { SiteShell } from "@/components/layout/site-shell"
import { defaultMetadata } from "@/lib/seo"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={
        {
          "--font-sans": "var(--font-geist-sans)",
        } as CSSProperties
      }
    >
      <body className="flex min-h-full flex-col">
        {/* ThemeProvider is client-only; everything inside can still be mostly RSC. */}
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
