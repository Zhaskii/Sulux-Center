import BrandWatches from "@/app/components/BrandWatches";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maurice Lacroix | Shop | Sulux Centre",
  description:
    "Browse authenticated Maurice Lacroix timepieces at Sulux Centre — AIKON, 1975, Masterpiece, Pontos and more.",
};

export default function MauriceLacroixPage() {
  return <BrandWatches brandName="Maurice Lacroix" />;
}
