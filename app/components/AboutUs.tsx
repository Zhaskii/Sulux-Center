"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  ArrowRight,
  ChevronDown,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import bgTime from "@/app/assets/store-pic/5.jpg";
import bgImage from "@/app/assets/store-pic/9.jpg";

// ── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    Icon: ShieldCheck,
    number: "01",
    title: "AUTHENTICITY",
    body: "Every timepiece undergoes rigorous multi-point inspection to guarantee 100% original parts, complete documentation and official manufacturer certification.",
    stat: "100%",
    statLabel: "Verified",
  },
  {
    Icon: Award,
    number: "02",
    title: "CURATION",
    body: "We hand-select each piece in our collection, focusing on historical significance, mechanical excellence, condition and long-term investment value.",
    stat: "2000+",
    statLabel: "Pieces",
  },
  {
    Icon: Clock,
    number: "03",
    title: "SERVICE",
    body: "Our commitment continues long after purchase — professional servicing, expert consultation and a dedicated after-sales team available year-round.",
    stat: "5-Year",
    statLabel: "Warranty",
  },
];

const TIMELINE = [
  {
    year: "1983",
    event: "Founded in New Road, Kathmandu by the Shrestha family.",
  },
  { year: "1995", event: "Became Nepal's first authorised Rolex retailer." },
  {
    year: "2005",
    event: "Expanded to include Omega, IWC and Breitling collections.",
  },
  {
    year: "2015",
    event: "Renovated flagship boutique and launched trade-in programme.",
  },
  {
    year: "2024",
    event: "Over 50,000 timepieces sold to collectors across South Asia.",
  },
];

const TEAM = [
  {
    name: "Rajan Shrestha",
    role: "Founder & Master Watchmaker",
    since: "1983",
  },
  {
    name: "Priya Shrestha",
    role: "Director — Client Relations",
    since: "2001",
  },
  { name: "Anil Maharjan", role: "Head of Authenticity", since: "2008" },
  { name: "Sameera Rai", role: "Senior Horological Consultant", since: "2014" },
];

const STORE_INFO = [
  { label: "ADDRESS", value: "New Road, Kathmandu" },
  { label: "HOURS", value: "Sun–Fri  11AM – 8PM" },
  { label: "PHONE", value: "+977 01-XXXXXXX" },
  { label: "EMAIL", value: "info@suluxcentre.com" },
];

// ── Easing ───────────────────────────────────────────────────────────────────
const E = [0.16, 1, 0.3, 1] as const;

// ── Word-split heading ────────────────────────────────────────────────────────
function SplitHeading({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.1em",
            marginRight: "0.22em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", skewY: 2 }}
            whileInView={{ y: "0%", skewY: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.88, delay: delay + i * 0.09, ease: E }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Fade-up helper ────────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: E as any },
};

// ── Main ─────────────────────────────────────────────────────────────────────
export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#0b0b0a] text-white selection:bg-white selection:text-black overflow-x-hidden">
      <style>{`
        /* Grain */
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.022;pointer-events:none;z-index:3;
          animation:grainA .8s steps(2) infinite;
        }
        @keyframes grainA {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)}
          40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)}
        }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .bounce-caret { animation:bounce 2s ease-in-out infinite; }

        /* Dot grid */
        .dot-grid { background-image:radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:26px 26px; }

        /* Vignette */
        .vig {
          background:
            radial-gradient(ellipse at center,transparent 15%,rgba(0,0,0,0.55) 100%),
            linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.02) 38%,rgba(0,0,0,0.88) 100%);
        }

        /* Card hover */
        .val-card  { transition:border-color .3s ease,background .3s ease,transform .3s ease; }
        .val-card:hover  { border-color:rgba(255,255,255,0.2)!important; background:rgba(255,255,255,0.04)!important; transform:translateY(-4px); }
        .team-card { transition:border-color .25s ease,background .25s ease,transform .25s ease; }
        .team-card:hover { border-color:rgba(255,255,255,0.2)!important; background:rgba(255,255,255,0.03)!important; transform:translateY(-3px); }

        /* Timeline */
        .tl-dot { transition:transform .3s ease,background .3s ease; }
        .tl-item:hover .tl-dot { transform:scale(1.5); background:white!important; }
        .tl-item:hover .tl-year { color:white!important; }
        .tl-year { transition:color .25s ease; }

        /* Buttons */
        .btn-w { transition:all .22s ease; }
        .btn-w:hover { background:rgba(255,255,255,.88)!important; transform:translateY(-2px); box-shadow:0 16px 40px rgba(0,0,0,.4); }
        .btn-g { transition:all .22s ease; }
        .btn-g:hover { border-color:rgba(255,255,255,.5)!important; color:white!important; }

        /* Horizontal rule shimmer */
        .hr-shimmer { background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent); height:1px; }

        /* Readability over video / imagery */
        .about-headline-shadow {
          text-shadow:
            0 2px 36px rgba(0,0,0,0.65),
            0 1px 3px rgba(0,0,0,0.5);
        }
        .about-lead-shadow {
          text-shadow: 0 1px 24px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.35);
        }
      `}</style>

      <div className="grain pointer-events-none" />

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col overflow-hidden"
      >
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden={true}
            className="h-full w-full min-h-full object-cover"
            style={{
              filter: "brightness(0.8) contrast(1) saturate(1)",
            }}
          >
            <source src="/mp4/about.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="vig absolute inset-0" />
        <div className="dot-grid absolute inset-0 opacity-70 pointer-events-none" />
        <div
          className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/60 via-black/35 to-black/75"
          aria-hidden={true}
        />

        {/* Left label */}
        <div
          className={`absolute left-5 xl:left-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-4
          transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[800ms]
          ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <div className="w-px h-14 bg-white/10" />
          <p
            className="text-white/50 tracking-[0.38em] uppercase"
            style={{ fontSize: "0.44rem", writingMode: "vertical-rl" }}
          >
            Est. 1983 · Kathmandu
          </p>
          <div className="w-px h-14 bg-white/10" />
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-28 md:pt-36 pb-20"
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: E }}
          >
            <div className="w-6 h-px bg-white/25" />
            <span
              className="text-white/60 font-bold tracking-[0.38em] uppercase about-lead-shadow"
              style={{ fontSize: "0.48rem" }}
            >
              Our Heritage
            </span>
            <div className="w-6 h-px bg-white/25" />
          </motion.div>

          <h1
            className="font-light leading-[0.86] tracking-tight mb-8 about-headline-shadow"
            style={{
              fontFamily:
                'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: "clamp(4rem, 13vw, 11rem)",
            }}
          >
            <SplitHeading text="Sulux" delay={0.4} />{" "}
            <SplitHeading
              text="Centre"
              delay={0.52}
              className="italic text-white/65 font-normal"
            />
          </h1>

          <motion.p
            className="text-white/92 font-light max-w-md leading-relaxed mb-12 about-lead-shadow"
            style={{
              fontSize: "clamp(1.05rem, 2.4vw, 1.35rem)",
              fontFamily:
                'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: E }}
          >
            Nepal's most trusted horological authority — curating the world's
            finest timepieces since 1983.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: E }}
          >
            <Link
              href="/shop"
              className="btn-w group flex items-center gap-3 bg-white text-black font-black px-8 py-4 w-full sm:w-auto justify-center"
              style={{ fontSize: "0.64rem", letterSpacing: "0.22em" }}
            >
              SHOP COLLECTION
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
            <Link
              href="/contact"
              className="btn-g group flex items-center gap-3 border border-white/25 text-white/85 font-bold px-8 py-4 w-full sm:w-auto justify-center"
              style={{ fontSize: "0.64rem", letterSpacing: "0.22em" }}
            >
              BOOK A VISIT
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span
            className="text-white/45 font-bold tracking-[0.32em] uppercase"
            style={{ fontSize: "0.44rem" }}
          >
            Scroll
          </span>
          <div className="bounce-caret">
            <ChevronDown size={13} className="text-white/45" />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════ */}
      <div className="relative border-y border-white/[0.06]">
        {/* Top progress line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-white/20 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: E }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {[
            { v: "40+", l: "Years of Trust" },
            { v: "2000+", l: "Timepieces" },
            { v: "100%", l: "Authenticated" },
            { v: "50K+", l: "Happy Collectors" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.08, ease: E as any }}
              className={`text-center py-8 px-4 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.06]" : ""}`}
            >
              <p
                className="font-black text-white leading-none mb-2"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
              >
                {s.v}
              </p>
              <p
                className="text-white/55 font-semibold tracking-[0.22em] uppercase"
                style={{ fontSize: "0.42rem" }}
              >
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          LEGACY
      ════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 xl:px-20 py-24 md:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image */}
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Reveal mask */}
              <motion.div
                className="absolute inset-0 bg-[#0b0b0a] z-10 origin-top"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: E }}
              />
              <Image
                src={bgTime}
                alt="Sulux Centre showroom"
                className="w-full h-full object-cover"
                style={{
                  filter: "brightness(0.7) contrast(1.08) saturate(0.82)",
                }}
              />

              {/* Year badge */}
              <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-sm border border-white/10 px-5 py-4 z-20">
                <p
                  className="text-white/55 font-black tracking-[0.3em] uppercase"
                  style={{ fontSize: "0.42rem" }}
                >
                  EST.
                </p>
                <p
                  className="font-black text-white leading-none"
                  style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}
                >
                  1983
                </p>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: E }}
              className="hidden sm:block absolute ml-auto -translate-y-28  xl:translate-x-[calc(100%+4rem)] bg-[#0b0b0a] border border-white/12 px-6 py-5 shadow-2xl w-52"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    strokeWidth={0}
                    fill="rgba(255,255,255,0.65)"
                  />
                ))}
              </div>
              <p
                className="text-white font-semibold leading-tight mb-1"
                style={{ fontSize: "0.8rem" }}
              >
                Kathmandu's most trusted
              </p>
              <p
                className="text-white/60 font-light"
                style={{ fontSize: "0.7rem" }}
              >
                watch boutique since 1983
              </p>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <motion.div {...fadeUp} className="flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-white/25" />
              <span
                className="text-white/58 font-bold tracking-[0.32em] uppercase"
                style={{ fontSize: "0.48rem" }}
              >
                The Legacy
              </span>
            </motion.div>

            <h2
              className="font-light leading-[0.88] mb-10"
              style={{
                fontFamily:
                  'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
              }}
            >
              <SplitHeading text="Timeless" delay={0.05} />
              <br />
              <SplitHeading text="craftsmanship" delay={0.15} />
              <br />
              <SplitHeading
                text="since 1983."
                delay={0.25}
                className="italic text-white/65 font-normal"
              />
            </h2>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.2, ease: E as any }}
              className="space-y-5 mb-10"
            >
              {[
                "Nestled in the heart of Kathmandu at New Road, Sulux Centre has been the definitive destination for horological excellence for over four decades. Our journey began with a simple vision: to bring the world's most prestigious timepieces to Nepal.",
                "As a family-owned establishment, we treat every client as a guest in our home, ensuring that the selection of a timepiece is as memorable as the watch itself.",
              ].map((p, i) => (
                <p
                  key={i}
                  className="text-white/82 font-light leading-relaxed"
                  style={{
                    fontSize: "clamp(0.9rem, 1.9vw, 1.08rem)",
                    fontFamily:
                      'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                  }}
                >
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.3, ease: E as any }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/shop"
                className="btn-w group flex items-center justify-center gap-3 bg-white text-black font-black px-8 py-4"
                style={{ fontSize: "0.64rem", letterSpacing: "0.22em" }}
              >
                SHOP NOW
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/contact"
                className="btn-g flex items-center justify-center gap-2 border border-white/20 text-white/80 font-bold px-8 py-4"
                style={{ fontSize: "0.64rem", letterSpacing: "0.2em" }}
              >
                CONTACT US
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          VALUES
      ════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] relative overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
          aria-hidden
        >
          <span
            className="font-black text-white/[0.025]"
            style={{ fontSize: "16rem", letterSpacing: "-0.06em" }}
          >
            SC
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-14 xl:px-20 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-white/25" />
                <span
                  className="text-white/58 font-bold tracking-[0.32em] uppercase"
                  style={{ fontSize: "0.48rem" }}
                >
                  What We Stand For
                </span>
              </motion.div>
              <h2
                className="font-light leading-tight"
                style={{
                  fontFamily:
                    'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                }}
              >
                <SplitHeading text="Our Core Values" delay={0.05} />
              </h2>
            </div>
            <motion.p
              {...fadeUp}
              className="text-white/58 font-light italic max-w-xs"
              style={{
                fontSize: "0.84rem",
                fontFamily:
                  'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              }}
            >
              Three principles that have guided us for over forty years.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                {...fadeUp}
                transition={{ duration: 0.8, delay: i * 0.1, ease: E as any }}
                className="val-card border border-white/[0.07] bg-white/[0.015] p-8 relative overflow-hidden group"
              >
                {/* Number watermark */}
                <span
                  className="absolute top-3 right-5 font-black text-white/[0.045] pointer-events-none select-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {val.number}
                </span>
                {/* Hover shimmer line at top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <val.Icon
                  size={22}
                  strokeWidth={1.2}
                  className="text-white/45 mb-7 group-hover:text-white/65 transition-colors duration-300"
                />
                <p
                  className="text-white font-black tracking-[0.24em] uppercase mb-3"
                  style={{ fontSize: "0.62rem" }}
                >
                  {val.title}
                </p>
                <p
                  className="text-white/78 font-light leading-relaxed mb-8"
                  style={{
                    fontSize: "0.85rem",
                    fontFamily:
                      'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                  }}
                >
                  {val.body}
                </p>
                <div className="flex items-center gap-3 border-t border-white/[0.07] pt-6">
                  <span
                    className="font-black text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {val.stat}
                  </span>
                  <span
                    className="text-white/52 font-semibold tracking-[0.2em] uppercase"
                    style={{ fontSize: "0.44rem" }}
                  >
                    {val.statLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TIMELINE
      ════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 xl:px-20 py-24 md:py-32">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-14">
          <div className="w-6 h-px bg-white/25" />
          <span
            className="text-white/58 font-bold tracking-[0.32em] uppercase"
            style={{ fontSize: "0.48rem" }}
          >
            Our Journey
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="font-light leading-[0.88] mb-8"
              style={{
                fontFamily:
                  'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              }}
            >
              <SplitHeading text="Four decades" delay={0.05} />
              <br />
              <SplitHeading
                text="of excellence."
                delay={0.18}
                className="italic text-white/65 font-normal"
              />
            </h2>
            <motion.p
              {...fadeUp}
              className="text-white/68 italic font-light leading-relaxed max-w-sm hidden lg:block"
              style={{
                fontSize: "0.97rem",
                fontFamily:
                  'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              }}
            >
              From a small boutique to Nepal's premier watch destination — every
              year a chapter in our story.
            </motion.p>
          </div>

          <div>
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.09, ease: E as any }}
                className="tl-item flex gap-6 group cursor-default"
                style={{ paddingBottom: i < TIMELINE.length - 1 ? "0" : "0" }}
              >
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div className="tl-dot w-2.5 h-2.5 rounded-full bg-white/18 border border-white/25" />
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-px flex-1 bg-white/[0.07] mt-2 mb-2"
                      style={{ minHeight: "40px" }}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <p
                    className="tl-year font-black text-white/72 tracking-[0.14em] mb-2"
                    style={{ fontSize: "0.72rem" }}
                  >
                    {item.year}
                  </p>
                  <p
                    className="text-white/78 font-light leading-relaxed"
                    style={{
                      fontSize: "0.94rem",
                      fontFamily:
                        'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                    }}
                  >
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TEAM
      ════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 md:px-14 xl:px-20 py-24 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-white/25" />
                <span
                  className="text-white/58 font-bold tracking-[0.32em] uppercase"
                  style={{ fontSize: "0.48rem" }}
                >
                  The People
                </span>
              </motion.div>
              <h2
                className="font-light leading-tight"
                style={{
                  fontFamily:
                    'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                }}
              >
                <SplitHeading text="Meet our experts" delay={0.05} />
              </h2>
            </div>
            <motion.p
              {...fadeUp}
              className="text-white/58 font-light italic max-w-xs"
              style={{
                fontSize: "0.84rem",
                fontFamily:
                  'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              }}
            >
              The passionate horologists who bring Sulux Centre to life every
              day.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.1, ease: E as any }}
                className="team-card border border-white/[0.07] bg-white/[0.015] p-5 md:p-7 group relative overflow-hidden"
              >
                {/* Hover shimmer */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Avatar */}
                <div className="w-10 h-10 border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5 group-hover:border-white/22 transition-colors">
                  <span
                    className="font-black text-white/45 group-hover:text-white/65 transition-colors"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <p
                  className="text-white font-bold leading-tight mb-1.5"
                  style={{ fontSize: "0.76rem", letterSpacing: "0.04em" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-white/65 font-light mb-4 leading-snug"
                  style={{ fontSize: "0.63rem" }}
                >
                  {member.role}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-white/15" />
                  <p
                    className="text-white/55 font-black tracking-[0.2em] uppercase"
                    style={{ fontSize: "0.42rem" }}
                  >
                    Since {member.since}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          VISIT CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="TimePieces"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1) saturate(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(11,11,10,0.97) 0%, rgba(11,11,10,0.75) 45%, rgba(11,11,10,0.3) 100%)",
            }}
          />
        </div>
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

        {/* Monogram */}
        <div
          className="absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
          aria-hidden
        >
          <span
            className="font-black text-white/[0.028]"
            style={{ fontSize: "20rem", letterSpacing: "-0.06em" }}
          >
            SC
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 xl:px-20 py-28 md:py-36">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-7">
            <MapPin size={13} strokeWidth={1.5} className="text-white/58" />
            <span
              className="text-white/58 font-bold tracking-[0.3em] uppercase"
              style={{ fontSize: "0.48rem" }}
            >
              New Road, Kathmandu, Nepal
            </span>
          </motion.div>

          <h2
            className="font-light leading-[0.88] mb-6 max-w-2xl"
            style={{
              fontFamily:
                'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            }}
          >
            <SplitHeading text="Experience the collection" delay={0.05} />
            <br />
            <SplitHeading
              text="in person."
              delay={0.18}
              className="italic text-white/65 font-normal"
            />
          </h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease: E as any }}
            className="text-white/78 font-light leading-relaxed mb-10 max-w-md"
            style={{
              fontSize: "1.02rem",
              fontFamily:
                'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            }}
          >
            Our flagship showroom awaits you — where every visit is a journey
            through horological history.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.3, ease: E as any }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link
              href="/contact"
              className="btn-w group flex items-center justify-center gap-3 bg-white text-black font-black px-9 py-4"
              style={{ fontSize: "0.64rem", letterSpacing: "0.22em" }}
            >
              BOOK A PRIVATE VIEWING
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/shop"
              className="btn-g flex items-center justify-center gap-2 border border-white/20 text-white/80 font-bold px-9 py-4"
              style={{ fontSize: "0.64rem", letterSpacing: "0.2em" }}
            >
              BROWSE ONLINE
            </Link>
          </motion.div>

          {/* Store info strip */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.4, ease: E as any }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/[0.08]"
          >
            {STORE_INFO.map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-white font-black tracking-[0.28em] uppercase mb-1.5"
                  style={{ fontSize: "1rem" }}
                >
                  {label}
                </p>
                <p
                  className="text-white/80 font-light"
                  style={{ fontSize: "0.8rem" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}
