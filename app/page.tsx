import type { Metadata } from "next";
import dynamic from "next/dynamic";

// 1. Direct import for the Hero component (Critical for SEO & LCP)
// This ensures the main H1 and initial "above-the-fold" content
// is present in the initial HTML sent to search engines.
import Hero from "@/app/components/Hero";
import WatchSlider from "./components/WatchSlider";
import WatchCarousel from "./components/WatchCarousel";
import AboutWatch from "./components/AboutWatch";

export const metadata: Metadata = {
  title: "Sulux Centre | Luxury Watches & Authentic Timepieces in Nepal",
  description:
    "Explore Sulux Centre, Nepal's premier destination for authentic luxury watches. Authorized retailer for Rolex, Omega, IWC, and more. Experience timeless elegance in Kathmandu since 1983.",
  keywords: [
    "Luxury Watches Nepal",
    "Sulux Centre Kathmandu",
    "Buy Rolex Nepal",
    "Authentic Watches Nepal",
    "Omega Watches Kathmandu",
    "Premium Timepieces Nepal",
  ],
  openGraph: {
    title: "Sulux Centre | Curating the World's Finest Timepieces",
    description:
      "Discover an exclusive collection of 100% authentic luxury watches at Sulux Centre, Kathmandu. Authorized dealer for global heritage brands.",
    url: "https://suluxcentre.com", // Replace with your actual domain
    siteName: "Sulux Centre",
  },
};
export default function Home() {
  return (
    <main>
      <Hero />

      <WatchSlider />
      <WatchCarousel />
      <AboutWatch />
    </main>
  );
}
