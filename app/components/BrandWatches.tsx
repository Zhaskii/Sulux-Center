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
// ── Types ─────────────────────────────────────────────────────
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
export type BrandWatchesProps = {
  brandName?: string;
  products?: WatchProduct[];
};
// ── Config ────────────────────────────────────────────────────
const FILTER_GROUPS = [
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
  { value: "newest", label: "Latest Releases" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name", label: "Model: A–Z" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];
const DEFAULT_PRODUCTS: WatchProduct[] = [
  {
    id: "ml-1",
    name: "Rado Captain Cook Automatic 42mm",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop",
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
    name: "Bell & Ross BR 05 Chronograph",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop",
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
    name: "Norqain Adventure Sport 37mm",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
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
    name: "Oris Aquis Date Calibre 400",
    price: 159500,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600&auto=format&fit=crop",
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
    name: "Raymond Weil Freelancer Automatic",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop",
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
    name: "Tissot PRX Powermatic 80",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop",
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
    name: "TW Steel CEO Tech Chronograph",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=600&auto=format&fit=crop",
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
    name: "Victorinox I.N.O.X Mechanical",
    price: 485000,
    image:
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
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
    name: "Traser P67 Officer Pro",
    price: 312000,
    image:
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=600&auto=format&fit=crop",
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
    name: "Tag Heuer Carrera Day-Date",
    price: 198000,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
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
    name: "Nuun Official Chrono Sport",
    price: 428000,
    image:
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
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
    name: "Baltic Aquascaphe Classic",
    price: 245000,
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=600&auto=format&fit=crop",
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
const fmt = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const parseNum = (v: string) => {
  const n = parseInt(v.replace(/\D/g, ""), 10);
  return isFinite(n) ? n : null;
};
type ActiveFilters = Record<string, Set<string>>;
function matches(
  p: WatchProduct,
  f: ActiveFilters,
  min: number | null,
  max: number | null,
) {
  if (min !== null && p.price < min) return false;
  if (max !== null && p.price > max) return false;
  for (const [key, sel] of Object.entries(f)) {
    if (!sel.size) continue;
    const v = p[key as keyof WatchProduct];
    if (typeof v === "string" && !sel.has(v)) return false;
  }
  return true;
}
const E = [0.16, 1, 0.3, 1] as const;
// ── Filter Checkbox ───────────────────────────────────────────
function Checkbox({
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
      className="flex cursor-pointer items-center gap-3 py-2 select-none group"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-all duration-300 rounded-[2px] ${
          checked
            ? "border-stone-100 bg-stone-100 shadow-sm"
            : "border-stone-700 bg-stone-900/40 group-hover:border-stone-500"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 10 8"
            className="h-2.5 w-2.5 text-stone-950"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4l2.5 2.5L9 1" />
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
        className={`text-[14px] tracking-wide transition-colors duration-200 ${
          checked
            ? "font-semibold text-stone-100"
            : "text-stone-400 group-hover:text-stone-200"
        }`}
      >
        {label}
      </span>
    </label>
  );
}
// ── Filter Section ────────────────────────────────────────────
function FilterSection({
  group,
  filters,
  onToggle,
  open: defaultOpen = true,
}: {
  group: (typeof FILTER_GROUPS)[number];
  filters: ActiveFilters;
  onToggle: (g: string, o: string) => void;
  open?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const sel = filters[group.id] ?? new Set();
  return (
    <div className="border-b border-stone-800/60 py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between mb-2 group text-left"
      >
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-stone-300 transition-colors group-hover:text-stone-100 flex items-center gap-2">
          {group.label}
          {sel.size > 0 && (
            <span className="inline-flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-stone-100 text-stone-950 text-[10px] font-bold">
              {sel.size}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`text-stone-500 transition-transform duration-300 ease-out group-hover:text-stone-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: E }}
            className="overflow-hidden"
          >
            <div
              className={`pt-1 pb-1 ${
                group.options.length > 7
                  ? "max-h-44 overflow-y-auto pr-1 custom-scrollbar"
                  : ""
              }`}
            >
              {group.options.map((opt) => (
                <Checkbox
                  key={opt}
                  id={`${group.id}-${opt}`}
                  label={opt}
                  checked={sel.has(opt)}
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
// ── Filters Panel ─────────────────────────────────────────────
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
  const count =
    Object.values(filters).reduce((n, s) => n + s.size, 0) +
    (priceFrom ? 1 : 0) +
    (priceTo ? 1 : 0);
  return (
    <aside className={className}>
      <div className="sticky top-28 bg-stone-900/40 backdrop-blur-md rounded-lg p-5 border border-stone-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-stone-800">
          <span className="text-[13px] font-bold tracking-[0.25em] uppercase text-stone-100">
            Filter By
          </span>
          {count > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 text-stone-400 hover:text-stone-100 transition-colors text-[13px] font-medium"
            >
              <X size={12} /> Reset ({count})
            </button>
          )}
        </div>
        {/* Price */}
        <div className="mb-2 pb-4 border-b border-stone-800">
          <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-stone-300 mb-3">
            Price Range (Rs.)
          </p>
          <div className="flex items-center gap-2">
            {["Minimum", "Maximum"].map((ph, i) => (
              <input
                key={ph}
                type="text"
                inputMode="numeric"
                placeholder={ph}
                value={i === 0 ? priceFrom : priceTo}
                onChange={(e) =>
                  i === 0
                    ? onPriceFrom(e.target.value)
                    : onPriceTo(e.target.value)
                }
                className="w-full border border-stone-800 bg-stone-950 rounded-[4px] px-3 py-2 text-[14px] text-stone-100 outline-none focus:border-stone-600 focus:bg-stone-900 transition-all duration-200 placeholder:text-stone-600 shadow-inner"
              />
            ))}
          </div>
        </div>
        {FILTER_GROUPS.map((g, i) => (
          <FilterSection
            key={g.id}
            group={g}
            filters={filters}
            onToggle={onToggle}
            open={i < 2}
          />
        ))}
      </div>
    </aside>
  );
}
// ── Product Card ──────────────────────────────────────────────
const STATUS = {
  in_stock: {
    badge: null,
    btn: "bg-stone-100 hover:bg-stone-200 text-stone-950 cursor-pointer border border-transparent shadow-sm hover:scale-[1.04]",
  },
  out_of_stock: {
    badge: {
      text: "Sold Out",
      cls: "bg-stone-900 text-stone-400 border border-stone-800",
    },
    btn: "bg-stone-900/40 border border-stone-800 text-stone-600 cursor-not-allowed opacity-50",
  },
  variants: {
    badge: { text: "Exclusive selections", cls: "bg-[#ef312e] text-white" },
    btn: null,
  },
};
function ProductCard({
  product: p,
  index,
}: {
  product: WatchProduct;
  index: number;
}) {
  const st = STATUS[p.status];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.25),
        ease: E,
      }}
      className="group flex flex-col bg-stone-900/30 rounded-lg border border-stone-800/80 overflow-hidden hover:border-stone-600 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
    >
      <Link
        href={`/shop/product/${p.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 block"
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width:640px)50vw,(max-width:1024px)33vw,25vw"
          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {st.badge && (
          <div
            className={`absolute top-3 left-3 ${st.badge.cls} px-3 py-1 rounded-[2px] shadow-sm z-10`}
          >
            <span className="font-bold tracking-widest uppercase text-[10px]">
              {st.badge.text}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center p-4">
          <span className="flex items-center gap-2 bg-stone-100 px-4 py-2.5 rounded-[2px] text-[12px] font-bold tracking-[0.2em] uppercase text-stone-950 shadow-xl translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            Explore Model <ArrowRight size={13} className="text-[#ef312e]" />
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5 bg-stone-900/40">
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#ef312e] mb-1.5">
          {p.collection}
        </span>
        <Link href={`/shop/product/${p.id}`}>
          <h3 className="text-[16px] font-medium text-stone-200 line-clamp-2 leading-relaxed mb-3 group-hover:text-stone-55 transition-colors min-h-[2.6rem]">
            {p.name}
          </h3>
        </Link>
        <div className="mt-auto pt-3 border-t border-stone-800/80 flex items-center justify-between gap-4">
          <p className="text-stone-100 font-semibold text-[16px] tracking-tight">
            {fmt(p.price)}
          </p>
          {p.status === "variants" ? (
            <Link
              href={`/shop/product/${p.id}`}
              className="flex items-center justify-center h-9 w-9 rounded-full border border-stone-700 text-stone-200 hover:bg-stone-100 hover:text-red-700 transition-all duration-300 shadow-sm shrink-0"
              title="View Editions"
            >
              <ArrowRight size={15} />
            </Link>
          ) : (
            <button
              type="button"
              disabled={p.status === "out_of_stock"}
              className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 shrink-0 ${st.btn}`}
              title={
                p.status === "out_of_stock" ? "Out of Stock" : "Add to Cart"
              }
            >
              <ShoppingBag size={17} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
// ── Main Page ─────────────────────────────────────────────────
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
  const priceMin = parseNum(priceFrom),
    priceMax = parseNum(priceTo);
  const toggleFilter = (groupId: string, option: string) =>
    setFilters((prev) => {
      const set = new Set(prev[groupId]);
      set.has(option) ? set.delete(option) : set.add(option);
      return { ...prev, [groupId]: set };
    });
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
  const filtered = useMemo(() => {
    let list = products.filter((p) => matches(p, filters, priceMin, priceMax));
    if (sort === "price_asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [products, filters, priceMin, priceMax, sort]);
  const filterProps = {
    filters,
    priceFrom,
    priceTo,
    onToggle: toggleFilter,
    onPriceFrom: setPriceFrom,
    onPriceTo: setPriceTo,
    onClear: clearFilters,
  };
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-stone-800 pt-12">
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: E }}
        className="bg-transparent border-b border-stone-900/80 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8 flex flex-col gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase text-stone-500">
            {["Home", "Collections", brandName].map((label, i, arr) => (
              <React.Fragment key={label}>
                {i < arr.length - 1 ? (
                  <Link
                    href={i === 0 ? "/" : "/shop"}
                    className="hover:text-stone-200 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className="text-stone-100 font-semibold">{label}</span>
                )}
                {i < arr.length - 1 && (
                  <span className="text-stone-700 px-0.5">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#ef312e] mb-1.5">
                Authorized Haute Horlogerie Retailer · Est. 1983
              </p>
              <h1
                className="text-4xl md:text-6xl font-light tracking-tight text-stone-55 leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {brandName}
              </h1>
            </div>
            <div className="flex items-center gap-2.5 self-start sm:self-auto bg-stone-900/60 border border-stone-800/80 px-4 py-2 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[14px] font-medium text-stone-400 tracking-wide">
                {products.length} Curated Masterpieces
              </span>
            </div>
          </div>
        </div>
      </motion.header>
      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="flex gap-10 lg:gap-12">
          {/* Desktop Sidebar */}
          <FiltersPanel
            className="hidden lg:block w-[260px] shrink-0"
            {...filterProps}
          />
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-900">
              <div className="flex items-center gap-3">
                {/* Mobile filter */}
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-stone-700 rounded-[4px] bg-stone-900/40 px-4 py-2 text-[13px] font-bold tracking-wider uppercase hover:bg-stone-100 hover:text-stone-950 transition-all duration-300 shadow-sm"
                >
                  <SlidersHorizontal size={13} /> Filter
                  {activeCount > 0 && (
                    <span className="inline-flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-stone-100 text-stone-950 text-[10px] font-bold">
                      {activeCount}
                    </span>
                  )}
                </button>
                <p className="text-[16px] text-stone-400 tracking-wide font-medium">
                  Showing{" "}
                  <span className="font-bold text-stone-100">
                    {filtered.length}
                  </span>{" "}
                  exquisite results
                </p>
              </div>
              {/* Sort */}
              <div className="relative flex items-center shadow-sm rounded-[4px] bg-stone-900 overflow-hidden border border-stone-800 hover:border-stone-600 transition-colors duration-300">
                <ArrowUpDown
                  size={12}
                  className="absolute left-3.5 text-stone-500 pointer-events-none"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                  className="appearance-none bg-transparent py-2.5 pl-9 pr-9 text-[13px] font-semibold text-stone-300 outline-none cursor-pointer tracking-wide"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option
                      key={o.value}
                      value={o.value}
                      className="bg-stone-900 text-stone-200"
                    >
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-3 text-stone-500 pointer-events-none"
                />
              </div>
            </div>
            {/* Active chips */}
            {activeCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {Object.entries(filters).flatMap(([gId, sel]) =>
                  [...sel].map((opt) => (
                    <button
                      key={`${gId}-${opt}`}
                      onClick={() => toggleFilter(gId, opt)}
                      className="flex items-center gap-2 bg-stone-100 text-stone-950 rounded-[4px] px-3 py-1.5 hover:bg-stone-200 transition-all duration-200 text-[12px] font-bold tracking-widest uppercase shadow-sm"
                    >
                      {opt} <X size={10} className="text-stone-600" />
                    </button>
                  )),
                )}
                {(priceFrom || priceTo) && (
                  <button
                    onClick={() => {
                      setPriceFrom("");
                      setPriceTo("");
                    }}
                    className="flex items-center gap-2 bg-stone-100 text-stone-950 rounded-[4px] px-3 py-1.5 hover:bg-stone-200 transition-all duration-200 text-[12px] font-bold tracking-widest uppercase shadow-sm"
                  >
                    Rs. {priceFrom || "—"} – {priceTo || "—"}{" "}
                    <X size={10} className="text-stone-600" />
                  </button>
                )}
              </motion.div>
            )}
            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 2xl:grid-cols-4"
                >
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border border-dashed border-stone-800 rounded-lg bg-stone-900/20 py-28 text-center px-6 shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mb-6 shadow-sm">
                    <ShoppingBag
                      size={24}
                      strokeWidth={1.2}
                      className="text-stone-500"
                    />
                  </div>
                  <h3
                    className="text-3xl font-light mb-3 text-stone-100"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    No exact editions match your criteria
                  </h3>
                  <p
                    className="text-stone-400 italic text-[15px] mb-8 max-w-sm leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    Widen your horizon by resetting the dynamic filters or
                    adjusting your pricing criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-stone-100 text-stone-950 rounded-[4px] px-8 py-3.5 font-bold tracking-[0.2em] uppercase text-[12px] hover:bg-stone-200 transition-all duration-300 shadow-md"
                  >
                    Reset Dynamic Horizon
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: E }}
              className="fixed inset-y-0 left-0 z-[70] w-[min(100%,340px)] bg-stone-950 shadow-2xl lg:hidden flex flex-col border-r border-stone-900"
            >
              <div className="flex items-center justify-between bg-stone-900/80 border-b border-stone-800 px-6 py-5 shrink-0">
                <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-stone-100">
                  Refined Horizons
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full border border-stone-800 flex items-center justify-center hover:border-stone-600 transition-colors duration-200 bg-stone-900"
                >
                  <X size={14} className="text-stone-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <FiltersPanel {...filterProps} />
              </div>
              <div className="shrink-0 border-t border-stone-900 bg-stone-900/80 p-5">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-950 py-4 rounded-[4px] font-bold tracking-[0.2em] uppercase text-[12px] transition-all duration-300 shadow-md"
                >
                  Display {filtered.length} Curations
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
