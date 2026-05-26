"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Compass,
  Droplet,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Star,
  Globe,
  Truck,
  Award,
  Wind,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Re-exported primitives from animations.tsx
// (copied inline so this file is self-contained — import from animations.tsx
//  in your project instead of duplicating)
// ─────────────────────────────────────────────────────────────────────────────
const animEase = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};
const VIEW_OPTS = { once: true, margin: "-60px 0px" } as const;

import { useInView } from "framer-motion";

// FadeUp
function FadeUp({
  delay = 0,
  distance = 28,
  duration = 0.8,
  children,
  className,
}: {
  delay?: number;
  distance?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: animEase.out }}
    >
      {children}
    </motion.div>
  );
}

// FadeIn
function FadeIn({
  delay = 0,
  duration = 0.7,
  children,
  className,
}: {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: animEase.out }}
    >
      {children}
    </motion.div>
  );
}

// SlideIn
function SlideIn({
  from = "left",
  delay = 0,
  distance = 40,
  duration = 0.9,
  children,
  className,
}: {
  from?: "left" | "right";
  delay?: number;
  distance?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  const x = from === "left" ? -distance : distance;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: animEase.out }}
    >
      {children}
    </motion.div>
  );
}

// ScaleIn
function ScaleIn({
  delay = 0,
  from = 0.92,
  duration = 0.9,
  children,
  className,
}: {
  delay?: number;
  from?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay, ease: animEase.out }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container + child variants
const staggerContainerVariants: Variants = {
  hidden: {},
  show: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};
const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

function Stagger({
  staggerDelay = 0.1,
  children,
  className,
}: {
  staggerDelay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

// LineReveal
function LineReveal({
  delay = 0,
  duration = 1.1,
  className = "",
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <motion.div
      ref={ref}
      className={`h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration, delay, ease: animEase.out }}
    />
  );
}

// RevealImage — sliding mask reveal
function RevealImage({
  src,
  alt,
  delay = 0,
  className = "",
  imgClassName = "",
  style,
}: {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW_OPTS);
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <motion.div
        className="absolute inset-0 origin-left z-10"
        style={{ background: "#0a0a0a" }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.85, delay, ease: animEase.out }}
      />
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.15, delay: delay + 0.05, ease: animEase.out }}
      />
    </div>
  );
}

// NumberCount (CountUp)
function CountUp({
  to,
  suffix,
  delay,
}: {
  to: number;
  suffix: string;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now() + delay * 1000;
    const duration = 1400;
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Specification {
  label: string;
  value: string;
}
interface ProductData {
  name: string;
  slug: string;
  status: string;
  brand: string;
  categories: string[];
  shortDescription: string;
  price: number;
  compareAtPrice: number;
  sku: string;
  stockQuantity: number;
  isFeatured: boolean;
  featuredImage: string;
  gallery: string[];
  gender: string;
  movement: string;
  caseMaterial: string;
  strapMaterial: string;
  dialColor: string;
  caseSizeMm: number;
  waterResistance: string;
  warranty: string;
  specifications: Specification[];
}
interface ProductDetailsProps {
  product?: ProductData;
  id: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Assets
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_MAP: Record<string, string> = {
  "664fa3c0b9a1d72f93b30001":
    "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=900&auto=format&fit=crop",
  "664fa3c0b9a1d72f93b30002":
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop",
  "664fa3c0b9a1d72f93b30003":
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=900&auto=format&fit=crop",
  "664fa3c0b9a1d72f93b30004":
    "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=900&auto=format&fit=crop",
};
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop";

const DEFAULT_PRODUCT: ProductData = {
  name: "Seiko Prospex Diver Automatic Black Dial",
  slug: "seiko-prospex-diver-automatic-black-dial",
  status: "published",
  brand: "664fa3c0b9a1d72f93b10001",
  categories: ["664fa3c0b9a1d72f93b20001", "664fa3c0b9a1d72f93b20002"],
  shortDescription:
    "A premium automatic diving watch featuring sapphire crystal, 200m water resistance, and luminous hands for superior readability.",
  price: 899,
  compareAtPrice: 1099,
  sku: "SEI-PRO-AUTO-BLK-001",
  stockQuantity: 24,
  isFeatured: true,
  featuredImage: "664fa3c0b9a1d72f93b30001",
  gallery: [
    "664fa3c0b9a1d72f93b30002",
    "664fa3c0b9a1d72f93b30003",
    "664fa3c0b9a1d72f93b30004",
  ],
  gender: "men",
  movement: "automatic",
  caseMaterial: "Stainless Steel",
  strapMaterial: "Silicone Rubber",
  dialColor: "Black",
  caseSizeMm: 42,
  waterResistance: "200m / 20 ATM",
  warranty: "3 Years International Warranty",
  specifications: [
    { label: "Glass Type", value: "Sapphire Crystal" },
    { label: "Power Reserve", value: "70 Hours" },
    { label: "Case Thickness", value: "13.2mm" },
    { label: "Lug Width", value: "20mm" },
    { label: "Bezel", value: "Unidirectional Rotating Bezel" },
    { label: "Lume", value: "LumiBrite Hands & Markers" },
    { label: "Clasp Type", value: "Fold-Over Clasp" },
    { label: "Country of Origin", value: "Japan" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Stat card with scroll-triggered count-up
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: animEase.out }}
    >
      <span className="text-4xl font-extralight tracking-tight text-white tabular-nums">
        {inView ? (
          <CountUp to={value} suffix={suffix} delay={delay} />
        ) : (
          `0${suffix}`
        )}
      </span>
      <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-stone-500">
        {label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-entry overlay — the cinematic intro sequence
// ─────────────────────────────────────────────────────────────────────────────
function PageEntryOverlay() {
  return (
    <>
      {/* Full-screen black curtain that slides up */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "#080808", transformOrigin: "top" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* SULUX wordmark that fades before curtain lifts */}
      <motion.div
        className="fixed inset-0 z-[101] pointer-events-none flex flex-col items-center justify-center gap-1"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <span
          className="text-[28px] font-thin tracking-[0.6em] text-white uppercase"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          SULUX
        </span>
        <span
          className="text-[9px] font-black tracking-[0.9em] uppercase"
          style={{ color: "#555" }}
        >
          CENTER
        </span>
        {/* thin animated line below wordmark */}
        <motion.div
          className="mt-4 h-px bg-white/30 origin-left"
          initial={{ scaleX: 0, width: "60px" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.05, ease: animEase.out }}
          style={{ width: "60px" }}
        />
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductDetails({
  product = DEFAULT_PRODUCT,
}: ProductDetailsProps) {
  const allImages = [product.featuredImage, ...product.gallery];
  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "care" | "shipping">(
    "specs",
  );
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const handleQty = (dir: "inc" | "dec") => {
    if (dir === "inc" && quantity < product.stockQuantity)
      setQuantity((q) => q + 1);
    if (dir === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };
  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };
  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const discount = product.compareAtPrice - product.price;
  const discountPct = Math.round((discount / product.compareAtPrice) * 100);
  const tabs = [
    { id: "specs" as const, label: "Specifications" },
    { id: "care" as const, label: "Care & Maintenance" },
    // { id: "shipping" as const, label: "Shipping & Returns" },
  ];

  // header slides down after page entry completes
  const headerDelay = 1.05;

  return (
    <div
      className="min-h-screen text-stone-100 antialiased selection:bg-white selection:text-black"
      style={{
        background: "#080808",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      {/* ── CINEMATIC PAGE-ENTRY ── */}
      <PageEntryOverlay />

      {/* ── NOISE TEXTURE ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── HERO CINEMATIC BAR ── */}
      <div
        ref={heroRef}
        className="relative pt-15 md:pt-25 overflow-hidden flex items-end"
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #111 0%, #0a0a0a 50%, #141414 100%)",
            }}
          />
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px w-full"
                style={{
                  top: `${15 + i * 14}%`,
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.3 - i * 0.04}), transparent)`,
                  transform: `rotate(${-1 + i * 0.4}deg)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Breadcrumb — fades up after entry */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-10 pb-8">
          <motion.nav
            className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-stone-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: headerDelay + 0.2,
              ease: animEase.out,
            }}
          >
            <Link href="/" className="hover:text-stone-300 transition-colors">
              Home
            </Link>
            <ChevronRight size={9} />
            <span className="hover:text-stone-300 cursor-pointer capitalize">
              {product.gender}&apos;s Timepieces
            </span>
            <ChevronRight size={9} />
            <span className="text-stone-400 line-clamp-1">{product.name}</span>
          </motion.nav>
        </div>
      </div>

      {/* ── MAIN PRODUCT ── */}
      <main className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_560px] gap-10 xl:gap-16">
          {/* ── LEFT: IMAGE GALLERY ── */}
          {/* ScaleIn wraps the entire image column for a unified entrance */}
          <ScaleIn
            delay={headerDelay + 0.1}
            from={0.94}
            duration={1.0}
            className="flex flex-col gap-4 lg:sticky lg:top-[88px] lg:self-start"
          >
            {/* Main stage */}
            <div
              className="relative w-full overflow-hidden group"
              style={{
                aspectRatio: "1/1",
                background: "linear-gradient(145deg, #141414, #0e0e0e)",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                "top-4 left-4 border-t border-l",
                "top-4 right-4 border-t border-r",
                "bottom-4 left-4 border-b border-l",
                "bottom-4 right-4 border-b border-r",
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-6 h-6 ${cls} pointer-events-none z-10`}
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: headerDelay + 0.5 + i * 0.07,
                  }}
                />
              ))}

              {/* Badges */}
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                {product.isFeatured && (
                  <motion.span
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: headerDelay + 0.6,
                      ease: animEase.out,
                    }}
                    className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1.5"
                    style={{
                      background: "white",
                      color: "black",
                      borderRadius: "2px",
                    }}
                  >
                    Featured Edition
                  </motion.span>
                )}
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: headerDelay + 0.72,
                    ease: animEase.out,
                  }}
                  className="text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                  }}
                >
                  -{discountPct}% Off
                </motion.span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={IMAGE_MAP[activeImage] ?? FALLBACK_IMG}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain p-10 md:p-16 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
                }}
              />
            </div>

            {/* Thumbnails — staggered fade-up */}
            <Stagger staggerDelay={0.07} className="grid grid-cols-4 gap-2.5">
              {allImages.map((imgId, idx) => (
                <motion.button
                  key={imgId + idx}
                  variants={staggerChildVariants}
                  onClick={() => setActiveImage(imgId)}
                  className="relative overflow-hidden transition-all duration-300"
                  style={{
                    aspectRatio: "1/1",
                    borderRadius: "3px",
                    border:
                      activeImage === imgId
                        ? "1px solid rgba(255,255,255,0.7)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background: "#111",
                    opacity: activeImage === imgId ? 1 : 0.5,
                    transform:
                      activeImage === imgId ? "scale(0.97)" : "scale(1)",
                  }}
                >
                  <Image
                    src={IMAGE_MAP[imgId] ?? FALLBACK_IMG}
                    alt={`View ${idx + 1}`}
                    fill
                    sizes="12vw"
                    className="object-contain p-2"
                  />
                  {activeImage === imgId && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-px bg-white/60" />
                  )}
                </motion.button>
              ))}
            </Stagger>
          </ScaleIn>

          {/* ── RIGHT: PRODUCT INFO ── */}
          <div className="flex flex-col">
            {/* Stars + movement badge */}
            <FadeIn
              delay={headerDelay + 0.3}
              className="flex items-center justify-between mb-5"
            >
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    fill={i < 4 ? "white" : "none"}
                    stroke={i < 4 ? "white" : "rgba(255,255,255,0.3)"}
                  />
                ))}
                <span className="text-[11px] text-stone-500 ml-1">
                  4.9 (128 verified)
                </span>
              </div>
              <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {product.movement}
              </span>
            </FadeIn>

            {/* Title */}
            <FadeUp delay={headerDelay + 0.38} distance={22} duration={0.9}>
              <h1
                className="text-[28px] sm:text-[38px] lg:text-[32px] xl:text-[42px] font-light leading-[1.15] text-white mb-2"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h1>
            </FadeUp>

            <FadeIn delay={headerDelay + 0.46}>
              <p className="text-[12px] font-semibold tracking-[0.3em] uppercase text-stone-600 mb-7">
                SKU{" "}
                <span className="font-mono normal-case tracking-normal text-stone-500">
                  {product.sku}
                </span>
              </p>
            </FadeIn>

            {/* Line reveal separator */}
            <LineReveal
              delay={headerDelay + 0.52}
              className="bg-white/10 mb-7"
            />

            {/* Price block */}
            <FadeUp delay={headerDelay + 0.56} distance={16} duration={0.7}>
              <div
                className="flex items-center justify-between mb-7 px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-stone-600 mb-1">
                    Vault Price
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[30px] font-light tracking-tight text-white">
                      {fmt(product.price)}
                    </span>
                    <span className="text-stone-600 line-through text-[15px]">
                      {fmt(product.compareAtPrice)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-stone-600 mb-1">
                    You Save
                  </p>
                  <span
                    className="text-[22px] font-light"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {fmt(discount)}
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Description */}
            <FadeUp delay={headerDelay + 0.62} distance={14} duration={0.7}>
              <p className="text-[14px] text-stone-400 leading-[1.75] mb-8 font-light">
                {product.shortDescription}
              </p>
            </FadeUp>

            {/* Micro-spec grid — staggered */}
            <Stagger
              staggerDelay={0.09}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {[
                {
                  icon: <Compass size={14} strokeWidth={1.5} />,
                  label: "Case",
                  value: `${product.caseSizeMm}mm · ${product.caseMaterial}`,
                },
                {
                  icon: <Droplet size={14} strokeWidth={1.5} />,
                  label: "Water Resistance",
                  value: product.waterResistance,
                },
                {
                  icon: <Wind size={14} strokeWidth={1.5} />,
                  label: "Power Reserve",
                  value: "70 Hours",
                },
                {
                  icon: <Award size={14} strokeWidth={1.5} />,
                  label: "Warranty",
                  value: "3 Years",
                },
              ].map(({ icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={staggerChildVariants}
                  className="flex items-start gap-3 px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "4px",
                  }}
                >
                  <span className="mt-0.5 text-stone-500 shrink-0">{icon}</span>
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-stone-600 mb-0.5">
                      {label}
                    </p>
                    <p className="text-[12px] text-stone-300 font-medium leading-snug">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </Stagger>

            <div
              className="h-px w-full mb-7"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            {/* Quantity + CTA */}
            <FadeUp delay={headerDelay + 0.78} distance={16} duration={0.7}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-stone-500">
                    Quantity
                  </span>
                  <span className="text-[11px] text-stone-600">
                    <span className="text-stone-400">
                      {product.stockQuantity}
                    </span>{" "}
                    left in vault
                  </span>
                </div>

                <div className="flex gap-3">
                  <div
                    className="flex items-center"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => handleQty("dec")}
                      className="px-4 py-4 text-stone-500 hover:text-white transition-colors"
                      style={{
                        borderRight: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-[14px] font-mono font-semibold text-white select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQty("inc")}
                      className="px-4 py-4 text-stone-500 hover:text-white transition-colors"
                      style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity === 0}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="flex-1 relative overflow-hidden font-semibold tracking-[0.2em] uppercase text-[11px] transition-colors duration-500 disabled:opacity-30"
                    style={{
                      background: isAdded ? "rgba(255,255,255,0.1)" : "white",
                      color: isAdded ? "white" : "black",
                      borderRadius: "4px",
                      border: isAdded
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "none",
                      minHeight: "52px",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isAdded ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check size={13} strokeWidth={3} /> Added to Vault
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={13} /> Acquire Timepiece
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                <button
                  className="w-full py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 hover:text-stone-200 transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </FadeUp>

            {/* Trust badges — staggered */}
            <div
              className="mt-7 pt-7"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Stagger staggerDelay={0.1} className="space-y-3">
                {[
                  {
                    icon: <ShieldCheck size={14} strokeWidth={1.5} />,
                    text: `Certified Authentic · ${product.warranty}`,
                  },
                  {
                    icon: <Truck size={14} strokeWidth={1.5} />,
                    text: "Complimentary white-glove worldwide delivery",
                  },
                  {
                    icon: <Globe size={14} strokeWidth={1.5} />,
                    text: "Insured & tracked from our Geneva vault",
                  },
                ].map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    variants={staggerChildVariants}
                    className="flex items-center gap-3 text-[12px] text-stone-500"
                  >
                    <span className="text-stone-400 shrink-0">{icon}</span>
                    <span>{text}</span>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </div>

        {/* ── STATISTICS BAND ── */}
        <ScaleIn delay={0} from={0.96} duration={0.8}>
          <section
            className="my-16 md:my-24 py-12 px-8 md:px-16 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              <StatCard
                value={1200}
                label="Timepieces Curated"
                suffix="+"
                delay={0}
              />
              <StatCard value={48} label="Countries Delivered" delay={0.1} />
              <StatCard
                value={99}
                label="Satisfaction Rate"
                suffix="%"
                delay={0.2}
              />
              <StatCard value={3} label="Years Warranty" delay={0.3} />
            </div>
          </section>
        </ScaleIn>

        {/* ── SPECIFICATIONS TABS ── */}
        <section className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
            {/* Left intro */}
            <SlideIn
              from="left"
              delay={0}
              distance={32}
              duration={0.9}
              className="lg:sticky lg:top-[100px] lg:self-start"
            >
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-stone-600 block mb-3">
                Technical Mastery
              </span>
              <h2
                className="text-[28px] md:text-[38px] font-light text-white leading-tight mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Horological Architecture
              </h2>
              <LineReveal
                delay={0.1}
                duration={1.0}
                className="bg-white/20 mb-5"
              />
              <p className="text-[13px] text-stone-500 leading-relaxed font-light">
                Every Sulux Center allocation undergoes rigorous calibration
                checks, movement accuracy testing, and luxury finishing
                inspection before acquisition.
              </p>

              <div className="mt-8 flex flex-row lg:flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300"
                    style={{
                      borderRadius: "3px",
                      background:
                        activeTab === tab.id
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                      color:
                        activeTab === tab.id
                          ? "white"
                          : "rgba(255,255,255,0.3)",
                      border: "1px solid",
                      borderColor:
                        activeTab === tab.id
                          ? "rgba(255,255,255,0.15)"
                          : "transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </SlideIn>

            {/* Tab content */}
            <SlideIn from="right" delay={0.1} distance={32} duration={0.9}>
              <AnimatePresence mode="wait">
                {activeTab === "specs" && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: animEase.out }}
                  >
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-px"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      {[
                        {
                          label: "Strap Material",
                          value: product.strapMaterial,
                        },
                        {
                          label: "Dial Color",
                          value: `${product.dialColor} Palette`,
                        },
                        ...product.specifications,
                      ].map((spec, i) => (
                        <motion.div
                          key={spec.label + i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: i * 0.045,
                            duration: 0.5,
                            ease: animEase.out,
                          }}
                          className="group px-6 py-5 hover:bg-white/[0.02] transition-colors"
                          style={{ background: "#0c0c0c" }}
                        >
                          <p className="text-[9px] font-black tracking-[0.35em] uppercase text-stone-600 mb-1.5 group-hover:text-stone-400 transition-colors">
                            {spec.label}
                          </p>
                          <p className="text-[15px] text-stone-300 font-light">
                            {spec.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "care" && (
                  <motion.div
                    key="care"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: animEase.out }}
                    className="space-y-5"
                  >
                    {[
                      {
                        title: "Regular Servicing",
                        body: "For automatic movements, we recommend a professional service every 3–5 years to ensure optimal performance and lubrication of the caliber.",
                      },
                      {
                        title: "Water Resistance",
                        body: "Rated at 200m/20ATM, this timepiece is suitable for recreational scuba diving. Ensure crown is pushed fully in before submersion. Have seals inspected annually.",
                      },
                      {
                        title: "Cleaning",
                        body: "Rinse with fresh water after saltwater exposure. Use a soft, lint-free cloth to polish the case. Avoid harsh chemicals on the strap.",
                      },
                      {
                        title: "Storage",
                        body: "Store in the provided watch box away from magnetic fields and direct sunlight. Use a watch winder if storing for extended periods.",
                      },
                    ].map(({ title, body }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07,
                          duration: 0.5,
                          ease: animEase.out,
                        }}
                        className="px-6 py-5"
                        style={{
                          background: "#0c0c0c",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "4px",
                        }}
                      >
                        <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-stone-300 mb-2">
                          {title}
                        </p>
                        <p className="text-[14px] text-stone-500 leading-relaxed font-light">
                          {body}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: animEase.out }}
                    className="space-y-5"
                  >
                    {[
                      {
                        title: "White-Glove Delivery",
                        body: "All Sulux Center timepieces are delivered via insured, signature-required courier. Full tracking from our secure vault to your door.",
                      },
                      {
                        title: "Global Shipping",
                        body: "We ship to 48 countries worldwide. Estimated delivery: 3–7 business days for most destinations. Duties and taxes may apply.",
                      },
                      {
                        title: "Return Policy",
                        body: "We offer a 14-day return window from receipt. Timepiece must be in original condition with full packaging. Initiate via your account portal.",
                      },
                      {
                        title: "Insurance",
                        body: "Every shipment is fully insured for its declared value. In the unlikely event of damage in transit, we guarantee full replacement.",
                      },
                    ].map(({ title, body }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07,
                          duration: 0.5,
                          ease: animEase.out,
                        }}
                        className="px-6 py-5"
                        style={{
                          background: "#0c0c0c",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "4px",
                        }}
                      >
                        <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-stone-300 mb-2">
                          {title}
                        </p>
                        <p className="text-[14px] text-stone-500 leading-relaxed font-light">
                          {body}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </SlideIn>
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ── */}
        <FadeUp delay={0} distance={24} duration={0.8}>
          <section
            className="mt-20 md:mt-28 py-12 px-8 md:px-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-stone-600 mb-2">
                Private Consultation
              </p>
              <p
                className="text-[22px] font-light text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Speak with a Watch Specialist
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-black px-8 py-4 shrink-0 hover:bg-stone-200 transition-colors"
              style={{ background: "white", borderRadius: "2px" }}
            >
              Book Consultation <ArrowUpRight size={13} />
            </motion.button>
          </section>
        </FadeUp>
      </main>
    </div>
  );
}
