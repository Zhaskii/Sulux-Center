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
} from "lucide-react";
import { ease } from "@/app/components/ScrollAnimation";

// ── Types ─────────────────────────────────────────────────────────────────────

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

export type FilterGroup = {
  id: string;
  label: string;
  options: string[];
};

export type BrandWatchesProps = {
  brandName?: string;
  products?: WatchProduct[];
};

// ── Config ────────────────────────────────────────────────────────────────────

const ACCENT = "#b42318";

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
  {
    id: "movement",
    label: "Movement",
    options: ["Automatic", "Quartz"],
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function parsePriceInput(value: string) {
  const n = parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

type ActiveFilters = Record<string, Set<string>>;

function productMatchesFilters(
  product: WatchProduct,
  filters: ActiveFilters,
  priceMin: number | null,
  priceMax: number | null,
) {
  if (priceMin !== null && product.price < priceMin) return false;
  if (priceMax !== null && product.price > priceMax) return false;

  for (const [key, selected] of Object.entries(filters)) {
    if (selected.size === 0) continue;
    const value = product[key as keyof WatchProduct];
    if (typeof value === "string" && !selected.has(value)) return false;
  }
  return true;
}

// ── Subcomponents ─────────────────────────────────────────────────────────────

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
      className="group flex cursor-pointer items-center gap-3 py-1.5"
    >
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center border transition-all duration-200 ${
          checked
            ? "border-[var(--accent)] bg-[var(--accent)]"
            : "border-neutral-300 bg-white group-hover:border-neutral-500"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 10 8"
            className="h-2.5 w-2.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
      <span className="text-[0.82rem] text-neutral-600 transition-colors group-hover:text-neutral-900">
        {label}
      </span>
    </label>
  );
}

function FilterSection({
  group,
  filters,
  onToggle,
  defaultOpen = true,
}: {
  group: FilterGroup;
  filters: ActiveFilters;
  onToggle: (groupId: string, option: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const selected = filters[group.id] ?? new Set();

  return (
    <motion.div
      layout
      className="border-b border-neutral-100 py-5 last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mb-3 flex w-full items-center justify-between text-left"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-800">
          {group.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-neutral-400 transition-transform duration-250 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: ease.out }}
            className="overflow-hidden"
          >
            <div
              className={
                group.options.length > 6
                  ? "max-h-44 space-y-0 overflow-y-auto pr-2 scrollbar-thin"
                  : "space-y-0"
              }
            >
              {group.options.map((option) => (
                <FilterCheckbox
                  key={option}
                  id={`${group.id}-${option}`}
                  label={option}
                  checked={selected.has(option)}
                  onChange={() => onToggle(group.id, option)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: WatchProduct;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.32), ease: ease.out }}
      className="group flex flex-col border border-neutral-100 bg-white transition-shadow duration-300 hover:border-neutral-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <Link
        href={`/shop/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-neutral-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.status === "out_of_stock" && (
          <span className="absolute left-3 top-3 bg-neutral-900/80 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Sold Out
          </span>
        )}
      </Link>

      <motion.div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="mb-3 line-clamp-2 min-h-[2.75rem] text-[0.78rem] font-semibold uppercase leading-snug tracking-wide text-neutral-900 transition-colors group-hover:text-[var(--accent)] md:text-[0.82rem]">
            {product.name}
          </h3>
        </Link>

        <p
          className="mb-4 text-[1.05rem] font-light tracking-tight md:text-[1.1rem]"
          style={{ color: ACCENT }}
        >
          {formatPrice(product.price)}
        </p>

        {product.status === "in_stock" && (
          <button
            type="button"
            className="mt-auto w-full py-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: ACCENT }}
          >
            Add to Cart
          </button>
        )}
        {product.status === "out_of_stock" && (
          <button
            type="button"
            disabled
            className="mt-auto w-full cursor-not-allowed bg-neutral-100 py-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-neutral-400"
          >
            Out of Stock
          </button>
        )}
        {product.status === "variants" && (
          <Link
            href={`/shop/product/${product.id}`}
            className="mt-auto block w-full border border-neutral-200 bg-neutral-50 py-3 text-center text-[0.62rem] font-bold uppercase tracking-[0.22em] text-neutral-700 transition-all duration-200 hover:border-neutral-400 hover:bg-white"
          >
            View Variants
          </Link>
        )}
      </motion.div>
    </motion.article>
  );
}

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
  onToggle: (groupId: string, option: string) => void;
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
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: ease.out }}
        className="sticky top-24 border border-neutral-100 bg-white px-5 py-6 shadow-sm md:px-6"
      >
        <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-neutral-900">
            Filter By
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-[var(--accent)]"
            >
              Clear ({activeCount})
            </button>
          )}
        </div>

        <div className="border-b border-neutral-100 pb-5">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-800">
            Price
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="From"
              value={priceFrom}
              onChange={(e) => onPriceFrom(e.target.value)}
              className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[0.82rem] text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
            />
            <span className="text-neutral-300">—</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="To"
              value={priceTo}
              onChange={(e) => onPriceTo(e.target.value)}
              className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[0.82rem] text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
            />
          </div>
        </div>

        {FILTER_GROUPS.map((group, i) => (
          <FilterSection
            key={group.id}
            group={group}
            filters={filters}
            onToggle={onToggle}
            defaultOpen={i < 3}
          />
        ))}
      </motion.div>
    </aside>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const priceMin = parsePriceInput(priceFrom);
  const priceMax = parsePriceInput(priceTo);

  const toggleFilter = (groupId: string, option: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(prev[groupId]);
      if (set.has(option)) set.delete(option);
      else set.add(option);
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
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      {/* Page header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ease.out }}
        className="border-b border-neutral-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-14 md:py-14">
          <p className="mb-2 text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-neutral-400">
            Shop · Luxury Timepieces
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-tight tracking-tight text-neutral-900">
            {brandName}
          </h1>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-14 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Desktop filters */}
          <FiltersPanel
            className="hidden w-full max-w-[260px] flex-shrink-0 lg:block xl:max-w-[280px]"
            filters={filters}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onToggle={toggleFilter}
            onPriceFrom={setPriceFrom}
            onPriceTo={setPriceTo}
            onClear={clearFilters}
          />

          {/* Main column */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-5"
            >
              <p className="text-[0.85rem] text-neutral-600">
                Showing{" "}
                <span className="font-semibold text-neutral-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "result" : "results"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 border border-neutral-200 bg-white px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-700 transition-colors hover:border-neutral-400 lg:hidden"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                </button>

                <div className="relative flex items-center gap-2">
                  <ArrowUpDown
                    size={14}
                    className="pointer-events-none absolute left-3 text-neutral-400"
                  />
                  <label htmlFor="sort-select" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortValue)}
                    className="appearance-none border border-neutral-200 bg-white py-2.5 pl-9 pr-10 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-neutral-800 outline-none transition-colors hover:border-neutral-400 focus:border-neutral-500"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 text-neutral-400"
                  />
                </div>
              </div>
            </motion.div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border border-dashed border-neutral-200 bg-white py-24 text-center"
                >
                  <ShoppingBag
                    size={32}
                    strokeWidth={1.2}
                    className="mb-4 text-neutral-300"
                  />
                  <p className="mb-2 text-lg font-light text-neutral-800">
                    No watches match your filters
                  </p>
                  <p className="mb-6 max-w-sm text-[0.9rem] text-neutral-500">
                    Try adjusting your price range or clearing some filter
                    options.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-6 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: ease.out }}
              className="fixed inset-y-0 left-0 z-[70] w-[min(100%,320px)] overflow-y-auto bg-white shadow-2xl lg:hidden"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-5 py-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em]">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-600 hover:border-neutral-400"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-2 pb-8">
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
              <motion.div className="sticky bottom-0 border-t border-neutral-100 bg-white p-4">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  Show {filteredProducts.length} Results
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
