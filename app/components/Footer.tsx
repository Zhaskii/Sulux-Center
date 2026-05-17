"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { ArrowRight, Send, Check } from "lucide-react";
import logo from "@/app/assets/Sulux-Logo.svg";

// ── Data ──────────────────────────────────────────────────────

const FOOTER_COLS = [
  {
    title: "EXPLORE",
    links: [
      { label: "All Watches", href: "/shop" },
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Bestsellers", href: "/shop/bestsellers" },
      { label: "Vintage Collection", href: "/shop/vintage" },
      { label: "Straps & Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "Watch Servicing", href: "/services/servicing" },
      { label: "Trade-In Program", href: "/services/trade-in" },
      { label: "Gift Cards", href: "/services/gifts" },
      { label: "Book Consultation", href: "/services/book" },
      { label: "Insurance", href: "/services/insurance" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about/story" },
      { label: "Authenticity Guarantee", href: "/about/authenticity" },
      { label: "Returns Policy", href: "/policy/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const CONTACT = [
  {
    Icon: MapPinIcon,
    label: "Visit Us",
    text: "New Road, Kathmandu, Nepal",
    href: "https://maps.google.com/?q=New+Road+Kathmandu",
  },
  {
    Icon: PhoneIcon,
    label: "Call Us",
    text: "+977 01-XXXXXXX",
    href: "tel:+97701XXXXXXX",
  },
  {
    Icon: EnvelopeIcon,
    label: "Email Us",
    text: "info@suluxcentre.com",
    href: "mailto:info@suluxcentre.com",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    short: "IG",
    href: "https://instagram.com",
    Icon: () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    short: "FB",
    href: "https://facebook.com",
    Icon: () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    short: "TK",
    href: "https://tiktok.com",
    Icon: () => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const BRANDS = [
  "ROLEX",
  "OMEGA",
  "IWC",
  "BREITLING",
  "TAG HEUER",
  "PATEK PHILIPPE",
  "TUDOR",
  "SEIKO",
  "TISSOT",
  "LONGINES",
];

const STORE_HOURS = [
  { days: "Sunday – Friday", hours: "10:00 AM – 7:00 PM" },
  { days: "Saturday", hours: "11:00 AM – 5:00 PM" },
];

const E = [0.16, 1, 0.3, 1] as const;

// ── Footer ────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hovCol, setHovCol] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaInV = useInView(ctaRef, { once: true, margin: "-60px" });
  const bodyInV = useInView(bodyRef, { once: true, margin: "-60px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      ref={rootRef}
      className="relative bg-white text-neutral-900 overflow-hidden"
    >
      <style>{`
        /* ── Link underline ── */
        .fl { position:relative; display:inline-flex; align-items:center; }
        .fl::after {
          content:'';
          position:absolute; bottom:-1px; left:0;
          width:0; height:1px; background:#111;
          transition: width 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .fl:hover::after { width:100%; }

        /* ── Social button ── */
        .soc { transition:all 0.22s ease; }
        .soc:hover { background:#111 !important; color:#fff !important; transform:translateY(-2px); border-color:#111 !important; }

        /* ── Newsletter input ── */
        .nli { transition:border-color 0.22s ease; }
        .nli:focus { border-color:#111 !important; outline:none; }
        .nli::placeholder { color:rgba(0,0,0,0.25); }

        /* ── Column border ── */
        .colbdr { transition:border-color 0.3s ease; }

        /* ── Contact row ── */
        .ctr-icon { transition:all 0.22s ease; }
        .ctr:hover .ctr-icon { background:#111 !important; color:#fff !important; border-color:#111 !important; transform:scale(1.05); }

        /* ── Marquee ── */
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mqtrack { animation:mq 30s linear infinite; will-change:transform; }

        /* ── CTA primary ── */
        .btnprim { transition:all 0.22s ease; }
        .btnprim:hover { background:#333 !important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.15); }

        /* ── CTA ghost ── */
        .btnghost { transition:all 0.22s ease; }
        .btnghost:hover { border-color:#111 !important; color:#111 !important; transform:translateY(-2px); }

        /* ── Newsletter submit ── */
        .nlbtn { transition:all 0.22s ease; }
        .nlbtn:hover { background:#333 !important; transform:translateY(-1px); }

        /* ── Open dot ── */
        @keyframes openBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .open-dot { animation:openBlink 2.4s ease-in-out infinite; }

        /* ── Bottom line ── */
        @keyframes lineIn { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .line-in { transform-origin:left; animation:lineIn 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s both; }

        /* ── Dot grid ── */
        .dot-grid {
          background-image:radial-gradient(circle,rgba(0,0,0,0.045) 1px,transparent 1px);
          background-size:26px 26px;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          2 ─ BRAND MARQUEE
      ══════════════════════════════════════════════════════ */}
      <div className="relative border-b border-neutral-200 overflow-hidden bg-neutral-50">
        {/* Top rule */}
        {mounted && (
          <div className="line-in h-[2px] bg-neutral-900 absolute top-0 left-0 right-0" />
        )}

        <div className="flex items-stretch">
          {/* Label */}
          <div
            className="flex-shrink-0 bg-neutral-900 px-6 py-4 flex items-center border-r border-neutral-700"
            style={{ fontSize: "0.46rem", letterSpacing: "0.3em" }}
          >
            <p className="text-white font-black tracking-widest uppercase whitespace-nowrap">
              Authorized Retailer
            </p>
          </div>

          {/* Track */}
          <div className="overflow-hidden flex-1 flex items-center">
            <div
              className="mqtrack flex items-center"
              style={{ width: "max-content" }}
            >
              {[...Array(3)].map((_, ri) => (
                <span key={ri} className="flex items-center">
                  {BRANDS.map((b, bi) => (
                    <span key={`${ri}-${bi}`} className="flex items-center">
                      <span
                        className="text-neutral-400 font-black tracking-[0.22em] px-6 py-4 hover:text-neutral-900 transition-colors duration-200 cursor-default"
                        style={{ fontSize: "0.55rem" }}
                      >
                        {b}
                      </span>
                      <span className="text-neutral-200 text-xs">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3 ─ MAIN GRID
      ══════════════════════════════════════════════════════ */}
      <div
        ref={bodyRef}
        className="relative bg-white px-8 md:px-14 xl:px-20 pt-16 pb-12"
      >
        {/* Subtle dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-70" />

        {/* SULUX watermark */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-black text-neutral-900 leading-none"
            style={{
              fontSize: "clamp(6rem, 22vw, 20rem)",
              letterSpacing: "-0.04em",
              opacity: 0.022,
              transform: "translateY(15%)",
            }}
          >
            SULUX
          </span>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* ── A: Brand column (4/12) ── */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 36 }}
            animate={bodyInV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: E }}
          >
            {/* Logo */}
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src={logo}
                alt="Sulux Centre"
                className="h-14 md:h-35 w-auto object-contain transition-all duration-300 group-hover:opacity-55"
              />
            </Link>

            {/* Tagline */}
            <p
              className="italic text-neutral-400 font-light leading-relaxed mb-8 max-w-xs"
              style={{
                fontSize: "1.05rem",
                fontFamily: "var(--font-cormorant,'Georgia',serif)",
              }}
            >
              "Curating the world's finest timepieces for over four decades —
              where every watch tells a story."
            </p>

            {/* Contact rows */}
            <div className="space-y-3.5 mb-9">
              {CONTACT.map(({ Icon, label, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="ctr flex items-center gap-3 group"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <div className="ctr-icon w-8 h-8 border border-neutral-200 flex items-center justify-center flex-shrink-0 bg-white text-neutral-500">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p
                      className="text-neutral-400 font-bold tracking-[0.18em] uppercase leading-none mb-0.5"
                      style={{ fontSize: "0.44rem" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-neutral-600 font-light group-hover:text-neutral-900 transition-colors duration-200 leading-snug"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {text}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, short, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="soc w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-500 bg-white"
                  title={label}
                >
                  <Icon />
                </a>
              ))}
              <span
                className="text-neutral-300 font-black tracking-widest ml-2"
                style={{ fontSize: "0.46rem" }}
              >
                FOLLOW US
              </span>
            </div>
          </motion.div>

          {/* ── B: Nav columns (5/12) ── */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FOOTER_COLS.map(({ title, links }, ci) => (
              <motion.div
                key={title}
                className={`colbdr border-l-2 pl-5 ${hovCol === ci ? "border-neutral-900" : "border-neutral-200"}`}
                onMouseEnter={() => setHovCol(ci)}
                onMouseLeave={() => setHovCol(null)}
                initial={{ opacity: 0, y: 36 }}
                animate={bodyInV ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: ci * 0.07, ease: E }}
              >
                <p
                  className="text-neutral-900 font-black tracking-[0.28em] uppercase mb-6"
                  style={{ fontSize: "0.5rem" }}
                >
                  {title}
                </p>
                <ul className="space-y-3.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="fl group text-neutral-500 hover:text-neutral-900 transition-colors duration-200 font-light gap-1.5"
                        style={{ fontSize: "0.82rem" }}
                      >
                        <ArrowRight
                          size={10}
                          className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                        />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── C: Newsletter + cards (3/12) ── */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-4"
            initial={{ opacity: 0, y: 36 }}
            animate={bodyInV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: E }}
          >
            {/* Newsletter card */}
            <div className="relative border border-neutral-200 p-6 xl:p-7 overflow-hidden bg-neutral-50">
              {/* Corner brackets */}
              <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-neutral-900" />
              <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-neutral-300" />

              <p
                className="text-neutral-900 font-black tracking-[0.24em] uppercase mb-2"
                style={{ fontSize: "0.48rem" }}
              >
                Newsletter
              </p>
              <h3
                className="font-light text-neutral-900 leading-tight mb-2"
                style={{
                  fontSize: "1.75rem",
                  fontFamily: "var(--font-cormorant,'Georgia',serif)",
                }}
              >
                Stay in the{" "}
                <em className="italic text-neutral-400 font-normal">loop</em>
              </h3>
              <p
                className="text-neutral-400 font-light mb-5 leading-relaxed"
                style={{ fontSize: "0.7rem" }}
              >
                New arrivals, exclusive events & curated horological stories.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 bg-neutral-900 text-white px-4 py-3">
                  <Check size={13} strokeWidth={2.5} />
                  <span
                    className="font-black tracking-[0.18em]"
                    style={{ fontSize: "0.58rem" }}
                  >
                    YOU'RE IN — WELCOME
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="nli w-full bg-white border border-neutral-200 text-neutral-900 px-4 py-3 font-light"
                    style={{ fontSize: "0.8rem", fontFamily: "inherit" }}
                  />
                  <button
                    type="submit"
                    className="nlbtn bg-neutral-900 text-white font-black px-4 py-3 flex items-center justify-center gap-2"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                  >
                    SUBSCRIBE
                    <Send size={11} strokeWidth={2} />
                  </button>
                </form>
              )}

              <p
                className="text-neutral-300 font-light mt-3"
                style={{ fontSize: "0.58rem" }}
              >
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Authenticity badge */}
            <div className="border border-neutral-200 bg-white px-5 py-4 flex items-center gap-3.5">
              <div className="w-9 h-9 bg-neutral-900 flex items-center justify-center flex-shrink-0">
                <Check size={14} strokeWidth={2.5} className="text-white" />
              </div>
              <div>
                <p
                  className="text-neutral-900 font-black"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.06em" }}
                >
                  100% Authentic Guarantee
                </p>
                <p
                  className="text-neutral-400 font-light mt-0.5"
                  style={{ fontSize: "0.58rem" }}
                >
                  Every timepiece certified & verified
                </p>
              </div>
            </div>

            {/* Store hours */}
            <div className="border border-neutral-200 bg-neutral-50 px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="open-dot w-1.5 h-1.5 rounded-full bg-green-500" />
                <p
                  className="text-neutral-900 font-black tracking-[0.22em] uppercase"
                  style={{ fontSize: "0.46rem" }}
                >
                  Store Hours
                </p>
              </div>
              <div className="space-y-2">
                {STORE_HOURS.map(({ days, hours }) => (
                  <div
                    key={days}
                    className="flex justify-between items-baseline gap-4"
                  >
                    <span
                      className="text-neutral-500 font-light"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {days}
                    </span>
                    <span
                      className="text-neutral-900 font-semibold whitespace-nowrap"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4 ─ BOTTOM BAR
      ══════════════════════════════════════════════════════ */}
      <div className="relative bg-neutral-50 border-t-2 border-neutral-900">
        <div className="px-8 md:px-14 xl:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <span
            className="text-neutral-400 font-light tracking-widest uppercase"
            style={{ fontSize: "0.52rem" }}
          >
            © {new Date().getFullYear()} SULUX CENTRE · ALL RIGHTS RESERVED
          </span>

          {/* Legal links */}
          <div className="flex items-center gap-1">
            {[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Sitemap", "/sitemap"],
            ].map(([label, href], i) => (
              <React.Fragment key={label}>
                <Link
                  href={href}
                  className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200 font-light tracking-widest uppercase"
                  style={{ fontSize: "0.52rem" }}
                >
                  {label}
                </Link>
                {i < 2 && (
                  <span className="text-neutral-200 mx-2.5 text-xs">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Nepali pride */}
          <div
            className="flex items-center gap-2 text-neutral-400 font-semibold tracking-widest uppercase"
            style={{ fontSize: "0.52rem" }}
          >
            <span>🇳🇵</span>
            <span>Proudly Nepali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
