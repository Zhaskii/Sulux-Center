import ContactPage from "@/app/components/Contact";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sulux Centre | Visit Our Luxury Showroom in Kathmandu",
  description:
    "Visit the Sulux Centre flagship showroom in New Road, Kathmandu. Get expert consultation for luxury watch sales, servicing, and authentication. Contact our specialists today.",
  keywords: [
    "Sulux Centre location",
    "Watch repair Kathmandu",
    "Luxury watch showroom Nepal",
    "Sulux Centre contact number",
    "Buy watches New Road Kathmandu",
  ],
  openGraph: {
    title: "Visit Sulux Centre | Luxury Watch Specialists in Nepal",
    description:
      "Located in the heart of Kathmandu. Connect with our horological experts for private viewings and professional watch services.",
    url: "https://suluxcentre.com/contact",
    siteName: "Sulux Centre",
    images: [
      {
        url: "/images/contact-showroom-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sulux Centre Showroom Kathmandu",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sulux Centre | Luxury Watch Sales & Service",
    description:
      "Expert consultation and private viewings at our New Road showroom. Reach out to Nepal's watch authority.",
  },
};

const Contact = () => {
  return (
    <>
      <ContactPage />
    </>
  );
};

export default Contact;
