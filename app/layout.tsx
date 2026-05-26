import type { Metadata } from "next";
import "@/app/globals.css"; // Central font and global CSS injection
import { Cormorant_Garamond } from "next/font/google";
import React from "react";
import PageLoader from "./components/PageLoader";
// Import the custom self-managed PageLoader component

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sulux Centre | Luxury Watches & Authentic Timepieces",
  description: "Nepal's premier destination for authentic luxury watches.",
};

export default function GlobalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} antialiased`}>
      <body className="min-h-screen bg-stone-950 text-stone-100 font-sans">
        {/* Renders the initial curtain loader on load, 
          and handles website-wide time-consuming spinners automatically.
        */}
        <PageLoader loading={false} branded={true} />

        {/* Next.js routes everything through here first */}
        {children}
      </body>
    </html>
  );
}
