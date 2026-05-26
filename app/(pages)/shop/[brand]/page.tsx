import Product from "@/app/components/Product";
import BrandWatches from "@/app/components/Product";
import { Metadata } from "next";

interface Props {
  params: Promise<{ brand: string }>;
}

// Helper function to format slug (e.g., "maurice-lacroix" -> "Maurice Lacroix")
function formatBrandName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ── DYNAMIC METADATA ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const cleanBrandName = formatBrandName(brand);

  return {
    title: `${cleanBrandName} | Shop | Sulux Centre`,
    description: `Browse authenticated ${cleanBrandName} timepieces at Sulux Centre. Discover our collections and finding your perfect match.`,
  };
}

// ── DYNAMIC PAGE ─────────────────────────────────────────────────────────────
export default async function DynamicBrandPage({ params }: Props) {
  const { brand } = await params;
  const cleanBrandName = formatBrandName(brand);

  return <Product brandName={cleanBrandName} />;
}
