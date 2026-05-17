import type { Metadata } from "next";
import "./globals.css"; // This loads your Barlow and Cormorant fonts

import { Cormorant_Garamond } from "next/font/google";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
