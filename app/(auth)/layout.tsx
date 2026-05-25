import type { Metadata } from "next";
import "@/app/globals.css";

import { Cormorant_Garamond } from "next/font/google";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sulux Centre | Authentication",
  description: "Access your private horological collection profile.",
};

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} antialiased`}>
      {/* NO Navbar or Footer components are imported or rendered here. 
        This keeps your registration screen flawlessly clean and centered.
      */}
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans">
        {children}
      </body>
    </html>
  );
}
