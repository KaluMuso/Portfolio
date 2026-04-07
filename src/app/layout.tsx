import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Vergeo Group — Kaluba Prosper Musonda | Full Stack Developer & Automation Builder",
    template: "%s | Prosper Nation",
  },
  description:
    "I build fast, scalable web applications and workflow automations that drive growth. Full-stack development by Kaluba Prosper Musonda.",
  metadataBase: new URL("https://vergeo.company"), // Replace with your real domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vergeo.company",
    siteName: "Vergeo Group Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@king5gates",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
