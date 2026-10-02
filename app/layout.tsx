import type { Metadata } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SidebarNav } from "./components/layout/sidebar-nav";
import { SocialBar } from "./components/ui/social-bar";
import "./globals.css";

/* Handwriting — notes, headings, marginalia. Variable font (400–700). */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

/* Technical text — body copy, code, labels. Variable font. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajavelavan Appaiyachetty — Full-Stack & AI Engineer",
  description:
    "A single-page field notebook: building full-stack systems end to end, shipping them to the cloud, and moving into AI engineering.",
  metadataBase: new URL("https://rajavelavan.vercel.app"),
  openGraph: {
    title: "Rajavelavan Appaiyachetty — Full-Stack & AI Engineer",
    description:
      "A single-page field notebook: building full-stack systems end to end, shipping them to the cloud, and moving into AI engineering.",
    type: "website",
    locale: "en_US",
    siteName: "Rajavelavan Appaiyachetty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajavelavan Appaiyachetty — Full-Stack & AI Engineer",
    description:
      "A single-page field notebook: building full-stack systems end to end, shipping them to the cloud, and moving into AI engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Next 15+ compatible Layout Props
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <a
          href="#cover"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:border focus:border-edge focus:bg-canvas-raised focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent focus:outline-none"
        >
          Skip to content
        </a>
        <div className="fixed top-4 right-4 z-50 font-mono text-[0.6rem] tracking-wider text-ink-dim/60 select-none pointer-events-none">
          This notebook is a living document
        </div>
        <SidebarNav />
        {children}
        <SocialBar />
        <Analytics />
      </body>
    </html>
  );
}
