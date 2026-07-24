import type { Metadata } from "next";
import { Newsreader, Work_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

// Split normal and italic into separate font instances. Newsreader is a
// variable font, so Google serves one binary per style no matter how many
// weights we list, and next/font eagerly preloads whatever's bound to a
// variable used in the root layout. Headings (normal style) are visible
// immediately, so that one preloads. Italic is only used for a couple of
// accent quotes further down the page, so it loads on demand instead of
// competing with the hero for bandwidth on first paint.
// adjustFontFallback is off because Next.js doesn't have Newsreader in its
// built-in metrics table yet, so the automatic fallback-matching lookup
// always fails and logs an error on every build. Turning it off skips that
// lookup instead of attempting and failing it; the rendered result is
// identical either way, it just does it quietly.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Agrim Verma",
  },
  description: site.description,
  keywords: [
    "Agrim Verma",
    "Full Stack Engineer",
    "ML Developer",
    "TIET",
    "MERN",
    "Next.js",
    "Firasa",
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${newsreader.variable} ${newsreaderItalic.variable} ${workSans.variable} ${jetbrainsMono.variable} bg-bg-primary font-sans text-text-primary`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
