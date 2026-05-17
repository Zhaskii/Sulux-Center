"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Heart,
  Star,
  Check,
  Eye,
  Award,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ease } from "@/app/components/ScrollAnimation";

const WATCHES = [
  {
    id: 1,
    name: "Royal Noir Day-Date",
    brand: "Sulux Centre",
    tag: "BESTSELLER",
    price: "NPR 30,889",
    oldPrice: "NPR 43,609",
    warranty: "5-Year Warranty",
    description:
      "Polished silver case with Arabic day-date display and premium rubber strap for everyday luxury.",
    rating: 4.8,
    reviews: 124,
    specs: [
      { k: "Case", v: "40mm" },
      { k: "Water", v: "100m" },
      { k: "Movement", v: "Automatic" },
    ],
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    cardBg: "#EDEDEB",
    accentLine: "#888",
  },
  {
    id: 2,
    name: "Chocolate Day-Date",
    brand: "Sulux Centre",
    tag: "NEW",
    price: "NPR 36,340",
    oldPrice: "NPR 54,512",
    warranty: "5-Year Warranty",
    description:
      "Refined rose gold case with warm-toned Arabic numerals and a sumptuous brown rubber strap.",
    rating: 4.6,
    reviews: 89,
    specs: [
      { k: "Case", v: "42mm" },
      { k: "Water", v: "50m" },
      { k: "Movement", v: "Quartz" },
    ],
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop",
    cardBg: "#D9CFC0",
    accentLine: "#a07850",
  },
  {
    id: 3,
    name: "Matte Noir Royal",
    brand: "Sulux Centre",
    tag: "LIMITED",
    price: "NPR 30,889",
    oldPrice: "NPR 43,609",
    warranty: "5-Year Warranty",
    description:
      "All-black PVD coating with luminous markers — a stealth timepiece for the discerning collector.",
    rating: 4.9,
    reviews: 203,
    specs: [
      { k: "Case", v: "41mm" },
      { k: "Water", v: "200m" },
      { k: "Movement", v: "Automatic" },
    ],
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop",
    cardBg: "#C4C4C4",
    accentLine: "#555",
  },
  {
    id: 4,
    name: "Midnight Blue Dial",
    brand: "Sulux Centre",
    tag: "NEW ARRIVAL",
    price: "NPR 42,500",
    oldPrice: "NPR 55,000",
    warranty: "5-Year Warranty",
    description:
      "A midnight blue sunburst dial with brushed steel bracelet — precision and elegance in one.",
    rating: 4.7,
    reviews: 67,
    specs: [
      { k: "Case", v: "39mm" },
      { k: "Water", v: "50m" },
      { k: "Movement", v: "Automatic" },
    ],
    image:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=800&auto=format&fit=crop",
    cardBg: "#BEC8D0",
    accentLine: "#4a6a8a",
  },
  {
    id: 5,
    name: "Heritage Champagne",
    brand: "Sulux Centre",
    tag: "HERITAGE",
    price: "NPR 58,000",
    oldPrice: "NPR 72,000",
    warranty: "5-Year Warranty",
    description:
      "Vintage aesthetics with modern movement — champagne dial, gold case, hand-stitched leather strap.",
    rating: 4.9,
    reviews: 155,
    specs: [
      { k: "Case", v: "40mm" },
      { k: "Water", v: "30m" },
      { k: "Movement", v: "Manual" },
    ],
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop",
    cardBg: "#D8D0BC",
    accentLine: "#b8903a",
  },
];

const TAG_STYLE: Record<string, { bg: string; text: string }> = {
  BESTSELLER: { bg: "bg-neutral-900", text: "text-white" },
  NEW: { bg: "bg-white", text: "text-neutral-900" },
  LIMITED: { bg: "bg-neutral-900", text: "text-white" },
  "NEW ARRIVAL": { bg: "bg-white", text: "text-neutral-900" },
  HERITAGE: { bg: "bg-neutral-900", text: "text-white" },
};

export default function WatchCarousel() {
  const [current, setCurrent] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const len = WATCHES.length;
  const w = WATCHES[current];

  const goPrev = useCallback(() => {
    setAdded(false);
    setCurrent((c) => (c - 1 + len) % len);
  }, [len]);
  const goNext = useCallback(() => {
    setAdded(false);
    setCurrent((c) => (c + 1) % len);
  }, [len]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );
  };

  const savePct = (item: (typeof WATCHES)[0]) =>
    Math.round(
      (1 -
        parseInt(item.price.replace(/\D/g, "")) /
          parseInt(item.oldPrice.replace(/\D/g, ""))) *
        100,
    );

  const getOffset = (idx: number) => {
    let off = idx - current;
    if (off > len / 2) off -= len;
    if (off < -len / 2) off += len;
    return off;
  };

  const stageStyle = (off: number): React.CSSProperties => {
    const abs = Math.abs(off);
    if (abs === 0)
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "none",
      };
    if (abs === 1)
      return {
        transform: `translateX(${off * 50}%) scale(0.78)`,
        zIndex: 20,
        opacity: 0.6,
        filter: "brightness(0.5) saturate(0.6)",
      };
    return {
      transform: `translateX(${off * 66}%) scale(0.62)`,
      zIndex: 10,
      opacity: 0.22,
      filter: "brightness(0.35) saturate(0.4)",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0c0c0b] text-white overflow-hidden flex flex-col"
      style={{
        minHeight: "100svh",
      }}
    >
      <style>{`
        .cormorant { font-family: var(--font-display); }

        .card-anim { transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, filter 0.45s ease; }

        @keyframes infoReveal { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .info-reveal { animation: infoReveal 0.45s cubic-bezier(0.16,1,0.3,1) both; }

        .card-shimmer { position:relative; overflow:hidden; }
        .card-shimmer::after {
          content:''; position:absolute; top:0; left:-120%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
          transition:left 0.8s ease;
        }
        .card-shimmer:hover::after { left:140%; }

        .nav-circ { transition: all 0.2s ease; }
        .nav-circ:hover { background:white!important; color:black!important; border-color:white!important; transform:scale(1.08); }

        .btn-cart { transition: all 0.22s ease; }
        .btn-cart:hover { background:#1a1a1a!important; transform:translateY(-2px); box-shadow:0 10px 28px rgba(255,255,255,0.08); }

        .btn-ghost { transition: all 0.22s ease; }
        .btn-ghost:hover { border-color:rgba(255,255,255,0.4)!important; color:white!important; }

        .btn-wish { transition: all 0.22s ease; }
        .btn-wish:hover { border-color:rgba(255,255,255,0.4)!important; }

        .thumb-item { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .thumb-item:hover { transform:translateY(-3px) scale(1.06); }

        .spec-pill { transition: all 0.2s ease; }
        .spec-pill:hover { border-color:rgba(255,255,255,0.22)!important; background:rgba(255,255,255,0.06)!important; }

        .nav-dot { transition: all 0.35s cubic-bezier(0.16,1,0.3,1); border:none; cursor:pointer; }

        /* Grain */
        .grain::after {
          content:''; position:fixed; inset:-200%; width:400%; height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.018; pointer-events:none; z-index:5;
          animation:grainMove 0.8s steps(2) infinite;
        }
        @keyframes grainMove {
          0%,100%{transform:translate(0,0)} 25%{transform:translate(2%,3%)} 50%{transform:translate(-2%,1%)} 75%{transform:translate(1%,-2%)}
        }
      `}</style>

      {/* Grain + dot grid */}
      <div className="grain pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow centered on carousel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Top accent line — animates in */}
      <motion.div
        className="w-full h-[2px] bg-white/[0.07] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: ease.out }}
      />

      {/* ══ HEADER ══ */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-5 sm:px-10 lg:px-16 pt-8 sm:pt-10 pb-3 border-b border-white/[0.06]"
        initial={{ opacity: 0, y: -18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: ease.out }}
      >
        {/* Left: label */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-px bg-white/25" />
          <span
            className="text-white/35 font-bold tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.42rem, 1.1vw, 0.5rem)" }}
          >
            Featured Timepieces
          </span>
        </div>

        {/* Right: counter + nav arrows */}
        <div className="flex items-center gap-3">
          <span
            className="font-light text-white/18"
            style={{
              fontSize: "clamp(0.5rem, 1.3vw, 0.58rem)",
              letterSpacing: "0.15em",
            }}
          >
            <span className="text-white/55 font-black">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5">/</span>
            {String(len).padStart(2, "0")}
          </span>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <button
              onClick={goPrev}
              className="nav-circ w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/40"
              aria-label="Previous"
            >
              <ArrowLeft size={12} strokeWidth={1.8} />
            </button>
            <button
              onClick={goNext}
              className="nav-circ w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/40"
              aria-label="Next"
            >
              <ArrowRight size={12} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ══ CAROUSEL STAGE ══ */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ height: "clamp(320px, 48vh, 500px)", perspective: "1400px" }}
      >
        {/* Large prev/next hit areas */}
        <motion.button
          onClick={goPrev}
          className="nav-circ absolute left-2 sm:left-5 lg:left-10 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-white/40"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: ease.out }}
          aria-label="Previous"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
        </motion.button>
        <motion.button
          onClick={goNext}
          className="nav-circ absolute right-2 sm:right-5 lg:right-10 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-white/40"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: ease.out }}
          aria-label="Next"
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </motion.button>

        {/* Cards */}
        <motion.div
          className="relative w-full flex items-center justify-center h-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease: ease.out }}
        >
          {WATCHES.map((watch, idx) => {
            const off = getOffset(idx);
            if (Math.abs(off) > 2) return null;
            const isCenter = off === 0;
            const tag = TAG_STYLE[watch.tag] ?? {
              bg: "bg-neutral-900",
              text: "text-white",
            };

            return (
              <div
                key={watch.id}
                className="card-anim absolute"
                style={{ ...stageStyle(off), width: "min(280px, 55vw)" }}
                onClick={() => {
                  if (!isCenter) {
                    setAdded(false);
                    setCurrent(idx);
                  }
                }}
              >
                {/* Card */}
                <div
                  className="card-shimmer relative cursor-pointer"
                  style={{
                    background: watch.cardBg,
                    aspectRatio: "3/4",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  {/* Per-watch accent line at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: watch.accentLine, opacity: 0.6 }}
                  />

                  {isCenter && (
                    <>
                      {/* Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-black tracking-[0.18em] uppercase rounded-sm ${tag.bg} ${tag.text}`}
                          style={{ fontSize: "clamp(0.36rem, 0.9vw, 0.44rem)" }}
                        >
                          <span
                            className="w-1 h-1 rounded-full opacity-60"
                            style={{
                              background:
                                watch.tag === "NEW" ||
                                watch.tag === "NEW ARRIVAL"
                                  ? "#111"
                                  : "white",
                            }}
                          />
                          {watch.tag}
                        </span>
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={(e) => toggleWishlist(watch.id, e)}
                        className="btn-wish absolute top-4 right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-sm border border-black/10 flex items-center justify-center"
                      >
                        <Heart
                          size={13}
                          strokeWidth={1.8}
                          fill={wishlist.includes(watch.id) ? "black" : "none"}
                          className="text-black/65"
                          style={{ transition: "all 0.2s ease" }}
                        />
                      </button>
                    </>
                  )}

                  {/* Watch image */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-7">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="w-full h-full object-contain"
                      style={{
                        filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.3))",
                      }}
                      draggable={false}
                    />
                  </div>

                  {/* Bottom fade for center */}
                  {isCenter && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  )}

                  {/* Select overlay for side cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity duration-250">
                      <span
                        className="bg-black/75 text-white font-bold px-3 py-1.5 tracking-[0.22em] rounded-sm"
                        style={{ fontSize: "0.42rem" }}
                      >
                        SELECT
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ══ PRODUCT INFO ══ */}
      <div
        key={current}
        className="info-reveal flex-1 flex flex-col items-center px-5 sm:px-10 lg:px-16 pt-6 pb-4"
      >
        {/* Brand */}
        <motion.div
          className="flex items-center gap-3 mb-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: ease.out }}
        >
          <div className="w-4 h-px bg-white/20" />
          <span
            className="text-white/30 font-bold tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.42rem, 1vw, 0.5rem)" }}
          >
            {w.brand}
          </span>
          <div className="w-4 h-px bg-white/20" />
        </motion.div>

        {/* Name */}
        <h2
          className="cormorant font-light text-white text-center leading-tight mb-2"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
        >
          {w.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                strokeWidth={0}
                fill={
                  i < Math.floor(w.rating) ? "white" : "rgba(255,255,255,0.15)"
                }
              />
            ))}
          </div>
          <span
            className="text-white/30 font-light"
            style={{ fontSize: "clamp(0.54rem, 1.3vw, 0.62rem)" }}
          >
            {w.rating} · {w.reviews} reviews
          </span>
        </div>

        {/* Thin rule */}
        <div className="w-16 h-px bg-white/10 mb-4" />

        {/* Description */}
        <p
          className="cormorant italic text-white/38 text-center leading-relaxed mb-5 max-w-xs sm:max-w-sm"
          style={{ fontSize: "clamp(0.88rem, 2.2vw, 1rem)" }}
        >
          {w.description}
        </p>

        {/* Spec pills */}
        <div className="flex items-center gap-2 mb-5 flex-wrap justify-center">
          {w.specs.map(({ k, v }) => (
            <div
              key={k}
              className="spec-pill flex items-center gap-2 border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm"
            >
              <span
                className="text-white/22 font-black tracking-[0.18em] uppercase"
                style={{ fontSize: "clamp(0.36rem, 0.9vw, 0.42rem)" }}
              >
                {k}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span
                className="text-white/60 font-semibold"
                style={{
                  fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                  letterSpacing: "0.04em",
                }}
              >
                {v}
              </span>
            </div>
          ))}
          {/* Warranty pill */}
          <div className="spec-pill flex items-center gap-2 border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
            <span
              className="text-white/40 font-light"
              style={{ fontSize: "clamp(0.56rem, 1.3vw, 0.62rem)" }}
            >
              {w.warranty}
            </span>
          </div>
        </div>

        {/* Pricing + CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-5 w-full max-w-md">
          {/* Price block */}
          <div className="flex items-baseline gap-3 flex-shrink-0">
            <span
              className="font-black text-white"
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 1.55rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {w.price}
            </span>
            <span
              className="text-white/20 line-through font-light"
              style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)" }}
            >
              {w.oldPrice}
            </span>
            <span
              className="bg-white/90 text-black font-black px-2 py-0.5 rounded-sm"
              style={{
                fontSize: "clamp(0.4rem, 1vw, 0.48rem)",
                letterSpacing: "0.1em",
              }}
            >
              −{savePct(w)}%
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <motion.button
              className="btn-cart flex items-center gap-2 bg-white text-black font-black px-5 sm:px-7 py-3 sm:py-3.5 rounded-sm tracking-[0.18em] uppercase"
              style={{ fontSize: "clamp(0.54rem, 1.3vw, 0.62rem)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={13} strokeWidth={2.5} /> ADDED
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingBag size={13} strokeWidth={2} /> ADD TO CART
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              className="btn-ghost flex items-center gap-1.5 border border-white/12 text-white/38 font-bold px-4 py-3 sm:py-3.5 rounded-sm"
              style={{
                fontSize: "clamp(0.54rem, 1.3vw, 0.62rem)",
                letterSpacing: "0.15em",
              }}
            >
              <Eye size={13} strokeWidth={1.6} />
              <span className="hidden sm:inline">VIEW</span>
            </button>

            <motion.button
              onClick={(e) => toggleWishlist(w.id, e)}
              className="btn-wish border border-white/10 flex items-center justify-center rounded-sm"
              style={{
                width: "clamp(42px, 7vw, 50px)",
                height: "clamp(42px, 7vw, 50px)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={15}
                strokeWidth={1.5}
                fill={wishlist.includes(w.id) ? "white" : "none"}
                className={
                  wishlist.includes(w.id) ? "text-white" : "text-white/32"
                }
                style={{ transition: "all 0.2s ease" }}
              />
            </motion.button>
          </div>
        </div>

        {/* Auth badge */}
        <div className="flex items-center gap-2 mb-5 border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 rounded-sm">
          <Award
            size={13}
            strokeWidth={1.4}
            className="text-white/35 flex-shrink-0"
          />
          <span
            className="text-white/35 font-light"
            style={{ fontSize: "clamp(0.54rem, 1.3vw, 0.62rem)" }}
          >
            100% Authenticated · Official Manufacturer Warranty Included
          </span>
        </div>

        {/* Dot progress */}
        <div className="flex items-center gap-2 mb-4">
          {WATCHES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAdded(false);
                setCurrent(i);
              }}
              className="nav-dot"
              style={{
                height: "2px",
                width: i === current ? "28px" : "8px",
                borderRadius: "1px",
                background:
                  i === current
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(255,255,255,0.14)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ THUMBNAIL STRIP ══ */}
      <motion.div
        className="flex-shrink-0 border-t border-white/[0.06] bg-white/[0.015]"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45, ease: ease.out }}
      >
        <div
          className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 py-4 sm:py-5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {WATCHES.map((watch, i) => (
            <button
              key={watch.id}
              onClick={() => {
                setAdded(false);
                setCurrent(i);
              }}
              className={`thumb-item relative flex-shrink-0 overflow-hidden border
                ${i === current ? "border-white/50 shadow-lg shadow-black/50" : "border-white/08 opacity-35 hover:opacity-60"}`}
              style={{
                width: "clamp(40px, 5.5vw, 52px)",
                height: "clamp(40px, 5.5vw, 52px)",
                background: watch.cardBg,
                borderRadius: "3px",
                outline:
                  i === current ? "1px solid rgba(255,255,255,0.18)" : "none",
                outlineOffset: "2px",
              }}
            >
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-full object-contain p-1.5"
                draggable={false}
              />
              {/* Active watch accent bar */}
              {i === current && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: watch.accentLine }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
