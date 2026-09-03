import type { Metadata } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
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
  title: "Rajavelavan Appaiyachetty",
  description:
    "A single-page field notebook: building full-stack systems end to end, shipping them to the cloud, and moving into AI engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
