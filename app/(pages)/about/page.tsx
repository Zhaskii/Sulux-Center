import AboutUs from "@/app/components/AboutUs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sulux Centre | 40 Years of Luxury Watch Heritage in Nepal",
  description:
    "Discover the story of Sulux Centre, Kathmandu's premier destination for authenticated luxury timepieces since 1983. Specializing in Rolex, Omega, and IWC with a legacy of trust and precision.",
  keywords: [
    "Sulux Centre",
    "Luxury watches Nepal",
    "Buy Rolex Kathmandu",
    "Authentic watches Nepal",
    "Sulux Centre New Road",
    "Premium timepieces Kathmandu",
  ],
  openGraph: {
    title: "About Sulux Centre | Legacy of Timeless Craftsmanship",
    description:
      "Curating the world's finest timepieces since 1983. Explore our heritage of trust and authenticity in the heart of Kathmandu.",
    url: "https://suluxcentre.com/about", // Replace with your actual domain
    siteName: "Sulux Centre",
    images: [
      {
        url: "/images/about-hero-og.jpg", // Create an OG image for best social sharing
        width: 1200,
        height: 630,
        alt: "Sulux Centre Luxury Watch Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sulux Centre | Luxury Watches in Nepal",
    description:
      "40 years of horological excellence. Certified pre-owned and new luxury watches in Kathmandu.",
  },
};

const About = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default About;
