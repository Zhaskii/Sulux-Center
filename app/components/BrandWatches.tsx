"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  ShoppingBag,
  ArrowUpDown,
  ArrowRight,
} from "lucide-react";

// ── Types (unchanged) ─────────────────────────────────────────

type ProductStatus = "in_stock" | "out_of_stock" | "variants";

export type WatchProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: string;
  dialColor: string;
  strap: string;
  strapColor: string;
  caseDiameter: string;
  movement: string;
  status: ProductStatus;
  createdAt: number;
};
export type FilterGroup = { id: string; label: string; options: string[] };
export type BrandWatchesProps = {
  brandName?: string;
  products?: WatchProduct[];
};

// ── Config ────────────────────────────────────────────────────

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "collection",
    label: "Collection",
    options: ["1975", "AIKON", "AIKONIC", "FIABA", "MASTERPIECE", "PONTOS"],
  },
  {
    id: "dialColor",
    label: "Dial Color",
    options: [
      "Anthracite",
      "Black",
      "Blue",
      "Ecru",
      "Green",
      "Grey",
      "Orange",
      "Silver",
    ],
  },
  {
    id: "strap",
    label: "Strap",
    options: ["Leather", "Metal", "Rubber", "Stainless Steel"],
  },
  {
    id: "caseDiameter",
    label: "Case Diameter",
    options: ["25mm – 34mm", "35mm – 44mm"],
  },
  {
    id: "strapColor",
    label: "Strap Color",
    options: [
      "Beige",
      "Black",
      "Blue",
      "Brown",
      "Gold",
      "Green",
      "Orange",
      "Rose Gold",
      "Silver",
      "Turquoise",
      "Yellow Gold",
    ],
  },
  { id: "movement", label: "Movement", options: ["Automatic", "Quartz"] },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name", label: "Name: A–Z" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const DEFAULT_PRODUCTS: WatchProduct[] = [
  {
    id: "ml-1",
    name: "Maurice Lacroix 1975 Quartz 33mm – 751006-101-1",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    collection: "1975",
    dialColor: "Blue",
    strap: "Stainless Steel",
    strapColor: "Silver",
    caseDiameter: "25mm – 34mm",
    movement: "Quartz",
    status: "in_stock",
    createdAt: 12,
  },
  {
    id: "ml-2",
    name: "Maurice Lacroix 1975 Quartz 33mm – 751006-101-2",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop",
    collection: "1975",
    dialColor: "Black",
    strap: "Stainless Steel",
    strapColor: "Silver",
    caseDiameter: "25mm – 34mm",
    movement: "Quartz",
    status: "out_of_stock",
    createdAt: 11,
  },
  {
    id: "ml-3",
    name: "Maurice Lacroix 1975 Quartz 33mm – 751006-101-3",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600&auto=format&fit=crop",
    collection: "1975",
    dialColor: "Green",
    strap: "Stainless Steel",
    strapColor: "Silver",
    caseDiameter: "25mm – 34mm",
    movement: "Quartz",
    status: "in_stock",
    createdAt: 10,
  },
  {
    id: "ml-4",
    name: "Maurice Lacroix 1975 Quartz 33mm – 751006-101-4",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    collection: "1975",
    dialColor: "Grey",
    strap: "Stainless Steel",
    strapColor: "Silver",
    caseDiameter: "25mm – 34mm",
    movement: "Quartz",
    status: "in_stock",
    createdAt: 9,
  },
  {
    id: "ml-5",
    name: "Maurice Lacroix AIKON Automatic Date 42mm – AI6008-SS002-330-1",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    collection: "AIKON",
    dialColor: "Black",
    strap: "Stainless Steel",
    strapColor: "Silver",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "in_stock",
    createdAt: 8,
  },
  {
    id: "ml-6",
    name: "Maurice Lacroix AIKON Automatic Date 42mm – AI6008-SS002-330-2",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1622434641400-ee8245c6e5b1?q=80&w=600&auto=format&fit=crop",
    collection: "AIKON",
    dialColor: "Blue",
    strap: "Rubber",
    strapColor: "Blue",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "variants",
    createdAt: 7,
  },
  {
    id: "ml-7",
    name: "Maurice Lacroix AIKON Automatic Date 42mm – AI6008-SS002-330-3",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31e?q=80&w=600&auto=format&fit=crop",
    collection: "AIKON",
    dialColor: "Anthracite",
    strap: "Metal",
    strapColor: "Black",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "in_stock",
    createdAt: 6,
  },
  {
    id: "ml-8",
    name: "Maurice Lacroix MASTERPIECE Moonphase – MP6528-SS001-330-1",
    price: 485000,
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=600&auto=format&fit=crop",
    collection: "MASTERPIECE",
    dialColor: "Silver",
    strap: "Leather",
    strapColor: "Brown",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "in_stock",
    createdAt: 5,
  },
  {
    id: "ml-9",
    name: "Maurice Lacroix PONTOS Day Date – PT6388-SS002-330-1",
    price: 312000,
    image:
      "https://images.unsplash.com/photo-1508685098649-7aac48f48d7c?q=80&w=600&auto=format&fit=crop",
    collection: "PONTOS",
    dialColor: "Blue",
    strap: "Leather",
    strapColor: "Black",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "in_stock",
    createdAt: 4,
  },
  {
    id: "ml-10",
    name: "Maurice Lacroix FIABA Date 32mm – FA1004-SS002-110-1",
    price: 198000,
    image:
      "https://images.unsplash.com/photo-1533139502658-019a62e0d122?q=80&w=600&auto=format&fit=crop",
    collection: "FIABA",
    dialColor: "Ecru",
    strap: "Leather",
    strapColor: "Beige",
    caseDiameter: "25mm – 34mm",
    movement: "Quartz",
    status: "out_of_stock",
    createdAt: 3,
  },
  {
    id: "ml-11",
    name: "Maurice Lacroix AIKONIC Automatic – AIK1018-SS002-330-1",
    price: 428000,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    collection: "AIKONIC",
    dialColor: "Green",
    strap: "Rubber",
    strapColor: "Green",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "variants",
    createdAt: 2,
  },
  {
    id: "ml-12",
    name: "Maurice Lacroix 1975 Automatic 40mm – 751006-101-5",
    price: 245000,
    image:
      "https://images.unsplash.com/photo-1518544889280-4a2338d1d6e2?q=80&w=600&auto=format&fit=crop",
    collection: "1975",
    dialColor: "Orange",
    strap: "Leather",
    strapColor: "Brown",
    caseDiameter: "35mm – 44mm",
    movement: "Automatic",
    status: "in_stock",
    createdAt: 1,
  },
];

// ── Helpers ───────────────────────────────────────────────────

const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const parsePriceInput = (v: string) => {
  const n = parseInt(v.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : null;
};
type ActiveFilters = Record<string, Set<string>>;

function productMatchesFilters(
  p: WatchProduct,
  filters: ActiveFilters,
  min: number | null,
  max: number | null,
) {
  if (min !== null && p.price < min) return false;
  if (max !== null && p.price > max) return false;
  for (const [key, sel] of Object.entries(filters)) {
    if (sel.size === 0) continue;
    const val = p[key as keyof WatchProduct];
    if (typeof val === "string" && !sel.has(val)) return false;
  }
  return true;
}

const E = [0.16, 1, 0.3, 1] as const;

// ── Status config ─────────────────────────────────────────────

const STATUS_CONFIG = {
  in_stock: { label: "In Stock", dot: "bg-green-500" },
  out_of_stock: { label: "Sold Out", dot: "bg-neutral-400" },
  variants: { label: "Variants", dot: "bg-neutral-700" },
};

// ══════════════════════════════════════════════════════════════
//  FILTER CHECKBOX
// ══════════════════════════════════════════════════════════════

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-3 py-1.5 select-none"
    >
      <span
        className={`flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center border transition-all duration-200 ${checked ? "border-neutral-900 bg-neutral-900" : "border-neutral-300 bg-white group-hover:border-neutral-600"}`}
      >
        {checked && (
          <svg
            viewBox="0 0 10 8"
            className="h-[8px] w-[8px] text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M1 4l3 3 5-6" />
          </svg>
        )}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`text-[0.78rem] transition-colors duration-200 ${checked ? "font-semibold text-neutral-900" : "text-neutral-500 group-hover:text-neutral-900"}`}
      >
        {label}
      </span>
    </label>
  );
}

// ══════════════════════════════════════════════════════════════
//  FILTER SECTION (accordion)
// ══════════════════════════════════════════════════════════════

function FilterSection({
  group,
  filters,
  onToggle,
  defaultOpen = true,
}: {
  group: FilterGroup;
  filters: ActiveFilters;
  onToggle: (g: string, o: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const selected = filters[group.id] ?? new Set();

  return (
    <div className="border-b border-neutral-100 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between mb-2"
      >
        <span className="text-[0.6rem] font-black tracking-[0.24em] uppercase text-neutral-800">
          {group.label}
          {selected.size > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white text-[0.45rem] font-black rounded-sm">
              {selected.size}
            </span>
          )}
        </span>
        <ChevronDown
          size={13}
          className={`text-neutral-400 transition-transform duration-250 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: E }}
            className="overflow-hidden"
          >
            <div
              className={
                group.options.length > 7
                  ? "max-h-44 overflow-y-auto pr-1 scrollbar-thin"
                  : ""
              }
            >
              {group.options.map((opt) => (
                <FilterCheckbox
                  key={opt}
                  id={`${group.id}-${opt}`}
                  label={opt}
                  checked={selected.has(opt)}
                  onChange={() => onToggle(group.id, opt)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PRODUCT CARD
// ══════════════════════════════════════════════════════════════

function ProductCard({
  product,
  index,
}: {
  product: WatchProduct;
  index: number;
}) {
  const st = STATUS_CONFIG[product.status];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.35),
        ease: E,
      }}
      className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-400"
    >
      {/* Image */}
      <Link
        href={`/shop/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-neutral-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          className="object-contain p-8 transition-transform duration-600 group-hover:scale-105"
        />

        {/* Status badge */}
        {product.status === "out_of_stock" && (
          <div className="absolute top-0 left-0 bg-neutral-900 px-3 py-1.5">
            <span
              className="text-white font-black tracking-[0.18em] uppercase"
              style={{ fontSize: "0.48rem" }}
            >
              Sold Out
            </span>
          </div>
        )}
        {product.status === "variants" && (
          <div className="absolute top-0 left-0 bg-neutral-700 px-3 py-1.5">
            <span
              className="text-white font-black tracking-[0.18em] uppercase"
              style={{ fontSize: "0.48rem" }}
            >
              Multiple Options
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-400 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="border border-neutral-900/20 bg-white/80 backdrop-blur-sm px-4 py-2 flex items-center gap-2 -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span
              className="text-neutral-900 font-black tracking-[0.18em] uppercase"
              style={{ fontSize: "0.5rem" }}
            >
              View Details
            </span>
            <ArrowRight size={10} className="text-neutral-900" />
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Collection tag */}
        <span
          className="text-neutral-400 font-black tracking-[0.2em] uppercase mb-2"
          style={{ fontSize: "0.46rem" }}
        >
          {product.collection}
        </span>

        {/* Name */}
        <Link href={`/shop/product/${product.id}`}>
          <h3
            className="text-[0.78rem] md:text-[0.82rem] font-semibold text-neutral-800 line-clamp-2 leading-snug mb-3 group-hover:text-neutral-900 transition-colors min-h-[2.5rem]"
            style={{ letterSpacing: "0.01em" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p
          className="text-neutral-900 font-black mb-4"
          style={{
            fontSize: "clamp(1rem,2vw,1.1rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {formatPrice(product.price)}
        </p>

        {/* CTA */}
        {product.status === "in_stock" && (
          <button
            type="button"
            className="mt-auto w-full bg-neutral-900 hover:bg-neutral-700 text-white py-3 font-black tracking-[0.2em] uppercase transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ fontSize: "0.58rem" }}
          >
            Add to Cart
          </button>
        )}
        {product.status === "out_of_stock" && (
          <button
            type="button"
            disabled
            className="mt-auto w-full bg-neutral-100 text-neutral-400 py-3 font-black tracking-[0.2em] uppercase cursor-not-allowed"
            style={{ fontSize: "0.58rem" }}
          >
            Unavailable
          </button>
        )}
        {product.status === "variants" && (
          <Link
            href={`/shop/product/${product.id}`}
            className="mt-auto block w-full border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white py-3 text-center font-black tracking-[0.2em] uppercase transition-all duration-200"
            style={{ fontSize: "0.58rem" }}
          >
            View Variants
          </Link>
        )}
      </div>
    </motion.article>
  );
}

// ══════════════════════════════════════════════════════════════
//  FILTERS PANEL
// ══════════════════════════════════════════════════════════════

function FiltersPanel({
  filters,
  priceFrom,
  priceTo,
  onToggle,
  onPriceFrom,
  onPriceTo,
  onClear,
  className = "",
}: {
  filters: ActiveFilters;
  priceFrom: string;
  priceTo: string;
  onToggle: (g: string, o: string) => void;
  onPriceFrom: (v: string) => void;
  onPriceTo: (v: string) => void;
  onClear: () => void;
  className?: string;
}) {
  const activeCount =
    Object.values(filters).reduce((n, s) => n + s.size, 0) +
    (priceFrom ? 1 : 0) +
    (priceTo ? 1 : 0);

  return (
    <aside className={className}>
      <div className="sticky top-24">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-neutral-900">
          <span className="text-[0.6rem] font-black tracking-[0.3em] uppercase text-neutral-900">
            Refine
          </span>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
              style={{ fontSize: "0.58rem" }}
            >
              <X size={10} />
              Clear {activeCount}
            </button>
          )}
        </div>

        {/* Price range */}
        <div className="mb-1 pb-4 border-b border-neutral-100">
          <p className="text-[0.6rem] font-black tracking-[0.24em] uppercase text-neutral-800 mb-3">
            Price
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Min"
              value={priceFrom}
              onChange={(e) => onPriceFrom(e.target.value)}
              className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[0.78rem] text-neutral-800 outline-none transition-all placeholder:text-neutral-300 focus:border-neutral-900 focus:bg-white"
            />
            <div className="w-3 h-px bg-neutral-300 flex-shrink-0" />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Max"
              value={priceTo}
              onChange={(e) => onPriceTo(e.target.value)}
              className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[0.78rem] text-neutral-800 outline-none transition-all placeholder:text-neutral-300 focus:border-neutral-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Filter groups */}
        {FILTER_GROUPS.map((group, i) => (
          <FilterSection
            key={group.id}
            group={group}
            filters={filters}
            onToggle={onToggle}
            defaultOpen={i < 2}
          />
        ))}
      </div>
    </aside>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════

export default function BrandWatches({
  brandName = "Maurice Lacroix",
  products = DEFAULT_PRODUCTS,
}: BrandWatchesProps) {
  const [filters, setFilters] = useState<ActiveFilters>(() =>
    Object.fromEntries(FILTER_GROUPS.map((g) => [g.id, new Set<string>()])),
  );
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sort, setSort] = useState<SortValue>("newest");
  const [mobileOpen, setMobileOpen] = useState(false);

  const priceMin = parsePriceInput(priceFrom);
  const priceMax = parsePriceInput(priceTo);

  const toggleFilter = (groupId: string, option: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(prev[groupId]);
      set.has(option) ? set.delete(option) : set.add(option);
      next[groupId] = set;
      return next;
    });
  };

  const clearFilters = () => {
    setFilters(
      Object.fromEntries(FILTER_GROUPS.map((g) => [g.id, new Set<string>()])),
    );
    setPriceFrom("");
    setPriceTo("");
  };

  const activeCount =
    Object.values(filters).reduce((n, s) => n + s.size, 0) +
    (priceFrom ? 1 : 0) +
    (priceTo ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) =>
      productMatchesFilters(p, filters, priceMin, priceMax),
    );
    switch (sort) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [products, filters, priceMin, priceMax, sort]);

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-neutral-900"
      style={{ fontFamily: "var(--font-body,'Barlow Condensed',sans-serif)" }}
    >
      {/* ══ PAGE HEADER ══ */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: E }}
        className="bg-white border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 md:py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <Link
              href="/"
              className="text-neutral-400 hover:text-neutral-900 transition-colors font-medium"
              style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
            >
              HOME
            </Link>
            <span className="text-neutral-300" style={{ fontSize: "0.6rem" }}>
              ›
            </span>
            <Link
              href="/shop"
              className="text-neutral-400 hover:text-neutral-900 transition-colors font-medium"
              style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
            >
              SHOP
            </Link>
            <span className="text-neutral-300" style={{ fontSize: "0.6rem" }}>
              ›
            </span>
            <span
              className="text-neutral-900 font-bold"
              style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
            >
              {brandName.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p
                className="text-neutral-400 font-bold tracking-[0.3em] uppercase mb-2"
                style={{ fontSize: "0.5rem" }}
              >
                Authorized Retailer · Est. 1983
              </p>
              <h1
                className="font-light leading-[0.9] text-neutral-900"
                style={{
                  fontFamily:
                    "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                }}
              >
                {brandName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span
                className="text-neutral-500 font-medium"
                style={{ fontSize: "0.68rem" }}
              >
                {products.length} timepieces available
              </span>
            </div>
          </div>
        </div>

        {/* Black bottom rule */}
        <div className="h-[2px] bg-neutral-900 max-w-7xl mx-auto" />
      </motion.header>

      {/* ══ BODY ══ */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Desktop sidebar */}
          <FiltersPanel
            className="hidden lg:block w-full max-w-[240px] xl:max-w-[260px] flex-shrink-0"
            filters={filters}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onToggle={toggleFilter}
            onPriceFrom={setPriceFrom}
            onPriceTo={setPriceTo}
            onClear={clearFilters}
          />

          {/* Main */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-neutral-200"
            >
              <div className="flex items-center gap-4">
                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-neutral-900 bg-white px-4 py-2.5 font-black tracking-[0.16em] uppercase transition-colors hover:bg-neutral-900 hover:text-white"
                  style={{ fontSize: "0.6rem" }}
                >
                  <SlidersHorizontal size={13} />
                  Filter
                  {activeCount > 0 && (
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-neutral-900 text-white text-[0.45rem] font-black rounded-sm group-hover:bg-white group-hover:text-neutral-900">
                      {activeCount}
                    </span>
                  )}
                </button>

                <p
                  className="text-neutral-500 font-medium"
                  style={{ fontSize: "0.75rem" }}
                >
                  <span className="font-black text-neutral-900">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "result" : "results"}
                </p>
              </div>

              {/* Sort */}
              <div className="relative flex items-center">
                <ArrowUpDown
                  size={12}
                  className="absolute left-3 text-neutral-400 pointer-events-none"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                  className="appearance-none border border-neutral-200 bg-white py-2.5 pl-8 pr-8 font-semibold text-neutral-800 outline-none hover:border-neutral-900 focus:border-neutral-900 transition-colors cursor-pointer"
                  style={{ fontSize: "0.68rem", letterSpacing: "0.06em" }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-3 text-neutral-400 pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Active filter chips */}
            {activeCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-wrap gap-2 mb-5"
              >
                {Object.entries(filters).flatMap(([gId, sel]) =>
                  [...sel].map((opt) => (
                    <button
                      key={`${gId}-${opt}`}
                      onClick={() => toggleFilter(gId, opt)}
                      className="flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 text-white px-3 py-1.5 hover:bg-neutral-700 transition-colors"
                      style={{ fontSize: "0.55rem", letterSpacing: "0.1em" }}
                    >
                      {opt}
                      <X size={9} />
                    </button>
                  )),
                )}
                {(priceFrom || priceTo) && (
                  <button
                    onClick={() => {
                      setPriceFrom("");
                      setPriceTo("");
                    }}
                    className="flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 text-white px-3 py-1.5 hover:bg-neutral-700 transition-colors"
                    style={{ fontSize: "0.55rem", letterSpacing: "0.1em" }}
                  >
                    Rs. {priceFrom || "—"} – {priceTo || "—"}
                    <X size={9} />
                  </button>
                )}
              </motion.div>
            )}

            {/* Product grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {filteredProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border border-dashed border-neutral-300 bg-white py-24 text-center"
                >
                  <div className="w-14 h-14 border border-neutral-200 flex items-center justify-center mb-6">
                    <ShoppingBag
                      size={22}
                      strokeWidth={1.4}
                      className="text-neutral-300"
                    />
                  </div>
                  <h3
                    className="font-light mb-2"
                    style={{
                      fontFamily:
                        "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                      fontSize: "1.6rem",
                    }}
                  >
                    No results found
                  </h3>
                  <p
                    className="text-neutral-400 font-light italic mb-8 max-w-xs leading-relaxed"
                    style={{
                      fontSize: "0.9rem",
                      fontFamily:
                        "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                    }}
                  >
                    Try adjusting your filters or browsing the full collection.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="bg-neutral-900 text-white px-8 py-3.5 font-black tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ══ MOBILE FILTER DRAWER ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: E }}
              className="fixed inset-y-0 left-0 z-[70] w-[min(100%,320px)] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 flex-shrink-0">
                <span className="text-[0.6rem] font-black tracking-[0.3em] uppercase">
                  Refine
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 border border-neutral-200 flex items-center justify-center hover:border-neutral-900 transition-colors"
                >
                  <X size={15} className="text-neutral-600" />
                </button>
              </div>

              {/* Scrollable filters */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <FiltersPanel
                  filters={filters}
                  priceFrom={priceFrom}
                  priceTo={priceTo}
                  onToggle={toggleFilter}
                  onPriceFrom={setPriceFrom}
                  onPriceTo={setPriceTo}
                  onClear={clearFilters}
                />
              </div>

              {/* Show results */}
              <div className="flex-shrink-0 border-t border-neutral-200 p-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-neutral-900 hover:bg-neutral-700 text-white py-4 font-black tracking-[0.22em] uppercase transition-colors"
                  style={{ fontSize: "0.62rem" }}
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
