"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Heart,
  Plus,
  Eye,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ease } from "@/app/components/ScrollAnimation";

const WATCHES = [
  {
    id: 1,
    brand: "ROLEX",
    collection: "Oyster Perpetual",
    name: "Submariner Date",
    price: "NPR 12,80,000",
    oldPrice: "NPR 14,20,000",
    tag: "BESTSELLER",
    tagAccent: "#1a6b2a",
    description:
      "The quintessential diver's watch. Waterproof to 300 metres with a unidirectional rotatable bezel and Cerachrom insert.",
    specs: [
      { k: "Movement", v: "Cal. 3235" },
      { k: "Case", v: "41mm Oystersteel" },
      { k: "Water Resistance", v: "300m" },
    ],
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    imageBg: "#f0f0ee",
  },
  {
    id: 2,
    brand: "OMEGA",
    collection: "Moonwatch",
    name: "Speedmaster Professional",
    price: "NPR 8,40,000",
    oldPrice: "NPR 9,60,000",
    tag: "MOON WATCH",
    tagAccent: "#1a1a2e",
    description:
      "The first watch worn on the moon. A hand-wound chronograph that transcends time — now and always.",
    specs: [
      { k: "Movement", v: "Cal. 321" },
      { k: "Case", v: "42mm Steel" },
      { k: "Crystal", v: "Hesalite" },
    ],
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop",
    imageBg: "#e8e8e8",
  },
  {
    id: 3,
    brand: "IWC",
    collection: "Portugieser",
    name: "Annual Calendar",
    price: "NPR 15,20,000",
    oldPrice: "NPR 17,00,000",
    tag: "LIMITED",
    tagAccent: "#7a4a1a",
    description:
      "Timeless elegance fused with haute horlogerie. The annual calendar only needs resetting once a year.",
    specs: [
      { k: "Movement", v: "Cal. 52850" },
      { k: "Case", v: "44.2mm RG" },
      { k: "Power Reserve", v: "7 Days" },
    ],
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
    imageBg: "#f0ebe4",
  },
  {
    id: 4,
    brand: "BREITLING",
    collection: "Navitimer",
    name: "B01 Chronograph 43",
    price: "NPR 10,50,000",
    oldPrice: "NPR 12,00,000",
    tag: "NEW ARRIVAL",
    tagAccent: "#0a2a4a",
    description:
      "The pilot's watch par excellence. The slide rule bezel allows inflight calculations — aviation heritage at its finest.",
    specs: [
      { k: "Movement", v: "Cal. B01" },
      { k: "Case", v: "43mm Steel" },
      { k: "Water Resistance", v: "30m" },
    ],
    image:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop",
    imageBg: "#e4e8ec",
  },
];

const AUTOPLAY_DURATION = 4000;
type Direction = "next" | "prev";

// ease imported from scroll-animations
const ANIM_MS = 650;

export default function WatchSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("next");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const w = WATCHES[current];
  const len = WATCHES.length;

  const go = useCallback(
    (nextIdx: number, dir: Direction) => {
      if (animating || nextIdx === current) return;
      setDirection(dir);
      setPrev(current);
      setCurrent(nextIdx);
      setAnimating(true);
      setProgress(0);
      setAddedToCart(false);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, ANIM_MS);
    },
    [animating, current],
  );

  const goNext = useCallback(
    () => go((current + 1) % len, "next"),
    [go, current, len],
  );
  const goPrev = useCallback(
    () => go((current - 1 + len) % len, "prev"),
    [go, current, len],
  );

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    const step = 100 / (AUTOPLAY_DURATION / 50);
    progressRef.current = setInterval(
      () => setProgress((p) => Math.min(p + step, 100)),
      50,
    );
    intervalRef.current = setInterval(goNext, AUTOPLAY_DURATION);
    return () => {
      clearInterval(intervalRef.current!);
      clearInterval(progressRef.current!);
    };
  }, [current, goNext]);

  const toggleWishlist = (id: number) =>
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const savePercent = Math.round(
    (1 -
      parseInt(w.price.replace(/\D/g, "")) /
        parseInt(w.oldPrice.replace(/\D/g, ""))) *
      100,
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F8F7F5] text-neutral-900 overflow-hidden select-none"
      style={{
        minHeight: "100svh",
      }}
    >
      <style>{`
        .cormorant { font-family: var(--font-display); }

        /* Slide animations */
        @keyframes slideInRight { from{opacity:0;transform:translateX(5%) scale(0.97)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-5%) scale(0.97)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes slideOutLeft { from{opacity:1;transform:translateX(0) scale(1)} to{opacity:0;transform:translateX(-5%) scale(0.97)} }
        @keyframes slideOutRight{ from{opacity:1;transform:translateX(0) scale(1)} to{opacity:0;transform:translateX(5%) scale(0.97)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeDown{ from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }

        .img-in-next  { animation: slideInRight ${ANIM_MS}ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-in-prev  { animation: slideInLeft  ${ANIM_MS}ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-out-next { animation: slideOutLeft ${ANIM_MS}ms cubic-bezier(0.4,0,1,1)    forwards; }
        .img-out-prev { animation: slideOutRight${ANIM_MS}ms cubic-bezier(0.4,0,1,1)    forwards; }
        .text-in { animation: fadeUp   0.5s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .tag-in  { animation: fadeDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }

        /* Hover micro-interactions */
        .thumb-item { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .thumb-item:hover { transform: translateY(-3px) scale(1.04); }
        .thumb-item.active { outline: 2px solid #111; outline-offset: 2px; }

        .spec-card { transition: all 0.2s ease; }
        .spec-card:hover { background: #efefed!important; transform: translateY(-1px); }

        .btn-primary { transition: all 0.22s ease; }
        .btn-primary:hover { background: #1a1a1a!important; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }

        .btn-secondary { transition: all 0.22s ease; }
        .btn-secondary:hover { border-color: #111!important; color: #111!important; transform: translateY(-2px); }

        .nav-arrow { transition: all 0.2s ease; }
        .nav-arrow:hover { background: #111!important; color: white!important; transform: scale(1.05); }

        .wish-btn { transition: all 0.2s ease; }
        .wish-btn:hover { border-color: #555!important; transform: scale(1.05); }

        /* Progress ring */
        .progress-ring { transform: rotate(-90deg); }

        /* Dot grid */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Subtle dot grid on right half */}
      <div className="dot-grid absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-60" />

      {/* Thin top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-900 origin-left"
        initial={{ scaleX: 0 }}
        animate={sectionInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: ease.out }}
      />

      {/* ══════════ HEADER ══════════ */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-14 xl:px-20 pt-8 sm:pt-10 pb-4 sm:pb-5 border-b border-neutral-200"
        initial={{ opacity: 0, y: -20 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: ease.out }}
      >
        {/* Left: label */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-5 h-px bg-neutral-900" />
          <span
            className="font-black tracking-[0.28em] sm:tracking-[0.32em] text-neutral-900 uppercase"
            style={{ fontSize: "clamp(0.46rem, 1.2vw, 0.56rem)" }}
          >
            Featured Collection
          </span>
        </div>

        {/* Center: slide counter */}
        <div className="flex items-center gap-3 sm:gap-4">
          {WATCHES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? "next" : "prev")}
              className="font-black transition-all duration-200 hover:opacity-100"
              style={{
                fontSize: "clamp(0.52rem, 1.5vw, 0.62rem)",
                color: i === current ? "#111" : "rgba(0,0,0,0.18)",
                letterSpacing: "0.15em",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
          <span className="text-neutral-200 mx-0.5">|</span>
          <span
            className="text-neutral-300 font-light"
            style={{ fontSize: "clamp(0.52rem, 1.5vw, 0.62rem)" }}
          >
            {String(len).padStart(2, "0")}
          </span>
        </div>

        {/* Right: autoplay progress ring */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <svg width="24" height="24" className="opacity-50">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="#111"
                strokeWidth="1.5"
                className="progress-ring"
                strokeDasharray={`${2 * Math.PI * 9}`}
                strokeDashoffset={`${2 * Math.PI * 9 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>
            <span
              className="text-neutral-400 font-light"
              style={{ fontSize: "0.48rem", letterSpacing: "0.12em" }}
            >
              AUTO
            </span>
          </div>
          {/* Prev/Next compact */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={goPrev}
              className="nav-arrow w-7 h-7 sm:w-8 sm:h-8 border border-neutral-200 flex items-center justify-center text-neutral-400 bg-white rounded-sm"
            >
              <ArrowLeft size={12} strokeWidth={1.8} />
            </button>
            <button
              onClick={goNext}
              className="nav-arrow w-7 h-7 sm:w-8 sm:h-8 border border-neutral-200 flex items-center justify-center text-neutral-400 bg-white rounded-sm"
            >
              <ArrowRight size={12} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ══════════ MAIN LAYOUT ══════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100svh-80px)] px-5 sm:px-8 md:px-14 xl:px-20">
        {/* ───── LEFT: IMAGE COLUMN ───── */}
        <motion.div
          className="w-full lg:w-[52%] xl:w-[55%] flex flex-col justify-center py-8 sm:py-10 lg:py-14 lg:pr-10 xl:pr-16"
          initial={{ opacity: 0, x: -40 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: ease.out }}
        >
          {/* Brand eyebrow */}
          <div
            key={`eyebrow-${current}`}
            className="tag-in mb-4 sm:mb-6"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-black tracking-[0.32em] text-neutral-900 uppercase"
                style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)" }}
              >
                {w.brand}
              </span>
              <div className="w-4 h-px bg-neutral-300" />
              <span
                className="cormorant italic text-neutral-400 font-light"
                style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)" }}
              >
                {w.collection}
              </span>
            </div>
          </div>

          {/* Image container — editorial square */}
          <div
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto lg:mx-0"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* Colored bg panel behind image */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: w.imageBg }}
              key={`bg-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-neutral-900/20 pointer-events-none z-10 rounded-tl-sm" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-neutral-900/20 pointer-events-none z-10 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-neutral-900/20 pointer-events-none z-10 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-neutral-900/20 pointer-events-none z-10 rounded-br-sm" />

            {/* Tag badge */}
            <div className="absolute top-4 left-4 z-20">
              <div
                key={`tag-${current}`}
                className="tag-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-black tracking-[0.2em] text-white uppercase rounded-sm"
                  style={{
                    fontSize: "clamp(0.38rem, 1vw, 0.48rem)",
                    background: w.tagAccent,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  {w.tag}
                </span>
              </div>
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(w.id)}
              className="wish-btn absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white border border-neutral-200 flex items-center justify-center shadow-sm rounded-sm"
            >
              <Heart
                size={15}
                strokeWidth={1.5}
                className={
                  wishlist.includes(w.id)
                    ? "fill-neutral-900 text-neutral-900"
                    : "text-neutral-400"
                }
                style={{ transition: "all 0.22s ease" }}
              />
            </button>

            {/* Outgoing image */}
            {prev !== null && (
              <div
                className={`absolute inset-0 z-[1] rounded-2xl overflow-hidden ${direction === "next" ? "img-out-next" : "img-out-prev"}`}
              >
                <Image
                  src={WATCHES[prev].image}
                  alt={WATCHES[prev].name}
                  fill
                  className="object-contain p-8 sm:p-10 lg:p-12"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.14))",
                  }}
                />
              </div>
            )}

            {/* Active image */}
            <div
              key={`img-${current}`}
              className={`absolute inset-0 z-[2] rounded-2xl overflow-hidden ${animating ? (direction === "next" ? "img-in-next" : "img-in-prev") : ""}`}
            >
              <Image
                src={w.image}
                alt={w.name}
                fill
                priority
                className="object-contain p-8 sm:p-10 lg:p-12"
                style={{ filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.18))" }}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
            {WATCHES.map((watch, i) => (
              <button
                key={watch.id}
                onClick={() => go(i, i > current ? "next" : "prev")}
                className={`thumb-item relative overflow-hidden rounded-sm border bg-white flex-shrink-0
                  ${i === current ? "active border-neutral-900 opacity-100" : "border-neutral-200 opacity-45 hover:opacity-70"}`}
                style={{
                  width: "clamp(44px, 8vw, 56px)",
                  height: "clamp(44px, 8vw, 56px)",
                }}
                aria-label={watch.name}
              >
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-contain p-1.5"
                  style={{ filter: i === current ? "none" : "grayscale(50%)" }}
                />
              </button>
            ))}

            {/* Progress bar beneath thumbnails */}
            <div className="flex-1 ml-2">
              <div className="h-px bg-neutral-200 relative overflow-hidden rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-neutral-900 transition-none rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span
                  className="text-neutral-300 font-light"
                  style={{ fontSize: "0.42rem", letterSpacing: "0.1em" }}
                >
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(len).padStart(2, "0")}
                </span>
                <span
                  className="text-neutral-300 font-light"
                  style={{ fontSize: "0.42rem", letterSpacing: "0.1em" }}
                >
                  AUTO
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───── DIVIDER ───── */}
        <div className="hidden lg:flex flex-col items-center justify-center py-16 px-6 xl:px-8">
          <motion.div
            className="w-px flex-1 bg-neutral-200"
            initial={{ scaleY: 0 }}
            animate={sectionInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.35, ease: ease.out }}
            style={{ originY: 0 }}
          />
          <div
            className="my-6 text-neutral-200 rotate-90 font-light"
            style={{
              fontSize: "0.4rem",
              letterSpacing: "0.25em",
              writingMode: "vertical-rl",
            }}
          >
            ···
          </div>
          <motion.div
            className="w-px flex-1 bg-neutral-200"
            initial={{ scaleY: 0 }}
            animate={sectionInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.45, ease: ease.out }}
            style={{ originY: 0 }}
          />
        </div>

        {/* ───── RIGHT: INFO COLUMN ───── */}
        <motion.div
          className="w-full lg:flex-1 flex flex-col justify-center py-8 sm:py-10 lg:py-14 lg:pl-4 xl:pl-8 border-t border-neutral-200 lg:border-t-0"
          initial={{ opacity: 0, x: 40 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: ease.out }}
        >
          {/* Watch name */}
          <div
            key={`name-${current}`}
            className="text-in mb-3 sm:mb-4"
            style={{ animationDelay: "0.05s" }}
          >
            <h2
              className="cormorant font-light leading-[0.92] text-neutral-900"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
            >
              {w.name}
            </h2>
          </div>

          {/* Pricing row */}
          <div
            key={`price-${current}`}
            className="text-in flex flex-wrap items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6"
            style={{ animationDelay: "0.12s" }}
          >
            <span
              className="font-black text-neutral-900"
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {w.price}
            </span>
            <span
              className="text-neutral-900 font-light line-through"
              style={{ fontSize: "clamp(0.85rem, 2.2vw, 1rem)" }}
            >
              {w.oldPrice}
            </span>
            <span
              className="bg-neutral-900 text-white font-black px-2 py-0.5"
              style={{
                fontSize: "clamp(0.44rem, 1.1vw, 0.54rem)",
                letterSpacing: "0.1em",
              }}
            >
              −{savePercent}%
            </span>
          </div>

          {/* Horizontal rule */}
          <div
            key={`rule-${current}`}
            className="text-in mb-5"
            style={{ animationDelay: "0.18s" }}
          >
            <div className="h-px bg-neutral-200" />
          </div>

          {/* Description */}
          <div
            key={`desc-${current}`}
            className="text-in mb-6"
            style={{ animationDelay: "0.22s" }}
          >
            <p
              className="cormorant italic text-neutral-500 leading-relaxed"
              style={{
                fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                maxWidth: "340px",
              }}
            >
              {w.description}
            </p>
          </div>

          {/* Specs grid */}
          <div
            key={`specs-${current}`}
            className="text-in grid grid-cols-3 gap-2 mb-6 sm:mb-8"
            style={{ animationDelay: "0.28s" }}
          >
            {w.specs.map(({ k, v }) => (
              <div
                key={k}
                className="spec-card border border-neutral-200 px-3 py-2.5 sm:px-4 sm:py-3 bg-white rounded-sm"
              >
                <p
                  className="text-neutral-400 font-black tracking-[0.18em] uppercase mb-1"
                  style={{ fontSize: "clamp(0.36rem, 0.9vw, 0.44rem)" }}
                >
                  {k}
                </p>
                <p
                  className="text-neutral-900 font-bold"
                  style={{
                    fontSize: "clamp(0.62rem, 1.5vw, 0.74rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            key={`cta-${current}`}
            className="text-in flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-7 sm:mb-8"
            style={{ animationDelay: "0.34s" }}
          >
            <button
              onClick={() => {
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
              }}
              className="btn-primary flex items-center gap-2.5 bg-neutral-900 text-white font-black w-full sm:w-auto justify-center sm:justify-start"
              style={{
                fontSize: "clamp(0.56rem, 1.4vw, 0.65rem)",
                letterSpacing: "0.2em",
                padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)",
              }}
            >
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span
                    key="added"
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <span>✓</span> ADDED TO CART
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <ShoppingBag size={14} strokeWidth={1.8} /> ADD TO CART
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                className="btn-secondary flex items-center gap-2 border border-neutral-300 text-neutral-500 font-bold flex-1 sm:flex-none justify-center"
                style={{
                  fontSize: "clamp(0.56rem, 1.4vw, 0.65rem)",
                  letterSpacing: "0.2em",
                  padding:
                    "clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem)",
                }}
              >
                <Eye size={13} strokeWidth={1.6} />
                <span className="hidden xs:inline">VIEW</span>
              </button>

              <button
                onClick={() => toggleWishlist(w.id)}
                className="wish-btn border border-neutral-200 bg-white flex items-center justify-center"
                style={{
                  width: "clamp(40px, 6vw, 52px)",
                  height: "clamp(40px, 6vw, 52px)",
                }}
                aria-label="Wishlist"
              >
                <Heart
                  size={15}
                  strokeWidth={1.5}
                  className={
                    wishlist.includes(w.id)
                      ? "fill-neutral-900 text-neutral-900"
                      : "text-neutral-400"
                  }
                  style={{ transition: "all 0.22s ease" }}
                />
              </button>
            </div>
          </div>

          {/* Auth + warranty badges */}
          <div
            key={`badges-${current}`}
            className="text-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 border-t border-neutral-200 pt-5 sm:pt-6">
              {/* Authenticated */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-white font-bold"
                    style={{ fontSize: "0.6rem" }}
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <p
                    className="text-neutral-900 font-bold leading-tight"
                    style={{
                      fontSize: "clamp(0.6rem, 1.4vw, 0.68rem)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    100% Authenticated
                  </p>
                  <p
                    className="text-neutral-400 font-light leading-tight"
                    style={{ fontSize: "clamp(0.52rem, 1.2vw, 0.6rem)" }}
                  >
                    Official manufacturer warranty
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-neutral-200" />

              {/* Free shipping */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 flex items-center justify-center flex-shrink-0 bg-white">
                  <Plus
                    size={12}
                    strokeWidth={2}
                    className="text-neutral-500"
                  />
                </div>
                <div>
                  <p
                    className="text-neutral-900 font-bold leading-tight"
                    style={{
                      fontSize: "clamp(0.6rem, 1.4vw, 0.68rem)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Free Delivery
                  </p>
                  <p
                    className="text-neutral-400 font-light leading-tight"
                    style={{ fontSize: "clamp(0.52rem, 1.2vw, 0.6rem)" }}
                  >
                    Across Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════ BOTTOM BAR ══════════ */}
      <motion.div
        className="relative z-10 border-t border-neutral-200 px-5 sm:px-8 md:px-14 xl:px-20 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 bg-white/60 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: ease.out }}
      >
        {/* Dot progress */}
        <div className="flex items-center gap-2">
          {WATCHES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? "next" : "prev")}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: "2px",
                width: i === current ? "28px" : "8px",
                background: i === current ? "#111" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
                transition: "all 0.35s ease",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>

        {/* Center: brand name */}
        <span
          className="cormorant italic text-neutral-300 hidden md:block"
          style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
        >
          {w.brand} · {w.collection}
        </span>

        {/* Right: nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="nav-arrow flex items-center gap-2 border border-neutral-200 text-neutral-400 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm"
            style={{
              fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
              letterSpacing: "0.16em",
            }}
          >
            <ArrowLeft size={11} strokeWidth={2} />
            <span className="hidden sm:inline font-bold">PREV</span>
          </button>
          <button
            onClick={goNext}
            className="nav-arrow flex items-center gap-2 border border-neutral-200 text-neutral-400 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm"
            style={{
              fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
              letterSpacing: "0.16em",
            }}
          >
            <span className="hidden sm:inline font-bold">NEXT</span>
            <ArrowRight size={11} strokeWidth={2} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
