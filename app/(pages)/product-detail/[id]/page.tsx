// app/(pages)/product-detail/[id]/page.tsx
import ProductDetails from "@/app/components/ProductDetails";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  // 1. You MUST await the params promise first
  const resolvedParams = await params;

  // 2. Safely grab the id string
  const productId = resolvedParams?.id;

  // 3. Fallback protection: If ID is missing, don't crash
  if (!productId) {
    return (
      <div className="text-white p-10">System Error: Missing Product ID</div>
    );
  }

  return <ProductDetails id={productId} />;
}
