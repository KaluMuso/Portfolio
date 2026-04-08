import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidgetWrapper";
import { PageTransition } from "@/components/layout/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.developerName} | Full Stack Developer & Automation Builder`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: `${SITE_CONFIG.name} Portfolio`,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "LocalBusiness"],
    "name": SITE_CONFIG.developerName,
    "legalName": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": "Full Stack Developer & Automation Builder",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": SITE_CONFIG.location.city,
      "addressCountry": SITE_CONFIG.location.countryCode
    },
    "knowsAbout": [
      "Web Development",
      "Workflow Automation",
      "Full Stack Development",
      "Next.js",
      "Automation Builder"
    ],
    "image": `${SITE_CONFIG.url}/og-image.png`,
    "sameAs": [
      SITE_CONFIG.socials.github,
      SITE_CONFIG.socials.twitter
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
