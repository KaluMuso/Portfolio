import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Replace with your real name and domain once you buy one
export const metadata: Metadata = {
  title: {
    default: "Your Name — Full Stack Developer & Automation Builder",
    template: "%s | Your Name",
  },
  description:
    "I build fast, scalable web applications and workflow automations that save time and drive growth. Available for freelance projects.",
  metadataBase: new URL("https://yourname.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourname.vercel.app",
    siteName: "Your Name Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
