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
import logo from "@/app/assets/sulux.png";

// ── Data ──────────────────────────────────────────────────────

const FOOTER_COLS = [
  {
    title: "Explore",
    links: [
      { label: "All Watches", href: "/shop" },
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Bestsellers", href: "/shop/bestsellers" },
      { label: "Vintage Collection", href: "/shop/vintage" },
      { label: "Straps & Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Watch Servicing", href: "/services/servicing" },
      { label: "Trade-In Program", href: "/services/trade-in" },
      { label: "Gift Cards", href: "/services/gifts" },
      { label: "Book Consultation", href: "/services/book" },
      { label: "Insurance", href: "/services/insurance" },
    ],
  },
  {
    title: "Company",
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
    href: "https://maps.google.com",
  },
  {
    Icon: PhoneIcon,
    label: "Call Us",
    text: "+977 01-XXXXXXX",
    href: "tel:+97701XXXXXXX",
  },
  {
    Icon: EmailUs,
    label: "Email Us",
    text: "info@suluxcentre.com",
    href: "mailto:info@suluxcentre.com",
  },
];

function EmailUs(props: React.ComponentProps<typeof EnvelopeIcon>) {
  return <EnvelopeIcon {...props} />;
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sulux.centre.nepal/",
    Icon: () => (
      <svg
        width="18"
        height="18"
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
    href: "https://www.facebook.com/sulux.centre.nepal",
    Icon: () => (
      <svg
        width="18"
        height="18"
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
    href: "https://www.tiktok.com/@sulux.centre.nepal",
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
  { days: "Sunday – Friday", hours: "11:00 AM – 8:00 PM" },
  { days: "Saturday", hours: "11:00 AM – 5:00 PM" },
];

const E = [0.16, 1, 0.3, 1] as const;

// ── Footer ────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hovCol, setHovCol] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
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
    <footer className="relative bg-white text-neutral-900 border-t border-neutral-200">
      <style>{`
        @keyframes marquee {
          0 { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* ── Brand Ticker Marquee ── */}
      <div className="relative border-b border-neutral-200 overflow-hidden bg-neutral-50/50 flex items-stretch">
        {mounted && (
          <div className="h-[2px] bg-neutral-900 absolute top-0 left-0 right-0 scale-x-100 origin-left transition-transform duration-1000" />
        )}
        <div className="bg-neutral-950 text-white text-[10px] tracking-[0.25em] font-bold uppercase px-6 py-4 flex items-center shrink-0 border-r border-neutral-800 z-10">
          Authorized Retailer
        </div>
        <div className="overflow-hidden flex items-center flex-1">
          <div className="animate-marquee-slow whitespace-nowrap">
            {[...Array(3)].map((_, ri) => (
              <div key={ri} className="flex items-center">
                {BRANDS.map((brand, bi) => (
                  <div key={`${ri}-${bi}`} className="flex items-center mx-6">
                    <span className="text-xs font-black tracking-[0.2em] text-neutral-800 cursor-default uppercase">
                      {brand}
                    </span>
                    <span className="text-neutral-300 text-[10px] ml-12">
                      ◆
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Layout Content Container ── */}
      <div
        ref={bodyRef}
        className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20"
      >
        {/* Subtle Watermark Branding Backdrop */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none select-none overflow-hidden h-1/2"
          aria-hidden
        >
          <span className="font-black text-red-700/5 leading-none select-none text-[15vw] tracking-tighter translate-y-[20%]">
            SULUX
          </span>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column A: Core Brand Identity Details */}
          <motion.div
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={bodyInV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: E }}
          >
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-75"
            >
              <Image
                src={logo}
                alt="Sulux Centre"
                className="h-26 w-80 object-contain"
                priority
              />
            </Link>

            <p className="text-neutral-500 text-lg italic leading-relaxed font-serif max-w-sm">
              "Curating the world's finest timepieces for over four decades —
              where every watch tells a story."
            </p>

            <div className="space-y-4">
              {CONTACT.map(({ Icon, label, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-start gap-4 group"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <div className="w-10 h-10 border border-neutral-200 rounded-sm flex items-center justify-center shrink-0 bg-white text-neutral-500 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950 transition-all duration-300 transform group-hover:scale-105">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-widest text-red-700 uppercase">
                      {label}
                    </span>
                    <span className="text-neutral-700 font-medium text-sm group-hover:text-neutral-950 transition-colors duration-200">
                      {text}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-neutral-200 rounded-sm flex items-center justify-center text-neutral-500 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
              <span className="text-red-700 font-bold tracking-widest text-xs ml-2">
                FOLLOW US
              </span>
            </div>
          </motion.div>

          {/* Column B: Primary System Links Grid + Properly Positioned Luxury Highlights */}
          <div className="lg:col-span-5">
            {/* Original System Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {FOOTER_COLS.map(({ title, links }, ci) => (
                <motion.div
                  key={title}
                  className={`border-l-2 pl-5 transition-colors duration-300 ${
                    hovCol === ci ? "border-neutral-950" : "border-neutral-200"
                  }`}
                  onMouseEnter={() => setHovCol(ci)}
                  onMouseLeave={() => setHovCol(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={bodyInV ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: ci * 0.05, ease: E }}
                >
                  <h4 className="text-red-700 font-bold tracking-widest text-[18px] uppercase mb-6">
                    {title}
                  </h4>
                  <ul className="space-y-4">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="group flex items-center text-neutral-700 hover:text-red-600 transition-colors duration-200 text-[14px] font-medium relative"
                        >
                          <ArrowRight
                            size={12}
                            className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                          />
                          <span className="relative">
                            {label}
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-neutral-950 transition-all duration-300 group-hover:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Positioned inside the white space without hitting the watermark text */}
            <motion.div
              className="mt-12 border-t border-neutral-200/60 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={bodyInV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: E }}
            >
              <div className="space-y-2">
                <span className="block font-mono text-[12px] text-red-700 font-bold tracking-[0.15em]">
                  01 / HERITAGE
                </span>
                <h5 className="text-[13px] font-black tracking-wider text-neutral-950 uppercase">
                  Legacy Since 1983
                </h5>
                <p className="text-neutral-500 text-[12px] leading-relaxed font-medium">
                  Nepal's definitive horizon for authentic global luxury
                  watches.
                </p>
              </div>
              <div className="space-y-2">
                <span className="block font-mono text-[12px] text-red-700 font-bold tracking-[0.15em]">
                  02 / PRECISION
                </span>
                <h5 className="text-[13px] font-black tracking-wider text-neutral-950 uppercase">
                  Certified Calibers
                </h5>
                <p className="text-neutral-500 text-[12px] leading-relaxed font-medium">
                  Every piece passes standard chronometer validation
                  evaluations.
                </p>
              </div>
              <div className="space-y-2">
                <span className="block font-mono text-[12px] text-red-700 font-bold tracking-[0.15em]">
                  03 / CRAFT
                </span>
                <h5 className="text-[13px] font-black tracking-wider text-neutral-950 uppercase">
                  Master Horology
                </h5>
                <p className="text-neutral-500 text-[12px] leading-relaxed font-medium">
                  Bespoke assistance, lifetime care, and elite watch curation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Column C: Interactive Actions & Operating Criteria */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={bodyInV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: E }}
          >
            {/* Embedded Action Box */}
            <div className="relative border border-neutral-200 p-6 bg-neutral-50/50 rounded-sm">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neutral-950" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neutral-200" />

              <span className="block text-[10px] font-bold tracking-widest text-red-700 uppercase mb-1">
                Newsletter
              </span>
              <h3 className="font-light text-neutral-950 text-2xl font-serif mb-2">
                Stay in the{" "}
                <em className="italic text-neutral-400 font-normal">loop</em>
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-6">
                New arrivals, luxury preview events & bespoke horological
                insights.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-3 bg-neutral-950 text-white px-4 py-3.5 rounded-sm">
                  <Check size={16} className="text-white shrink-0" />
                  <span className="font-bold tracking-wider text-xs">
                    SUBSCRIPTION ACTIVATED
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2.5"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white border border-neutral-200 focus:border-neutral-950 text-neutral-900 px-4 py-3 text-sm rounded-sm transition-colors duration-200 outline-none placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-neutral-950 text-white font-bold text-xs tracking-widest py-3.5 rounded-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors duration-200"
                  >
                    SUBSCRIBE
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>

            {/* Verification Tag */}
            <div className="border border-neutral-200 bg-white p-4 flex items-center gap-4 rounded-sm">
              <div className="w-10 h-10 bg-neutral-950 flex items-center justify-center shrink-0 rounded-sm">
                <Check size={16} className="text-white" strokeWidth={3} />
              </div>
              <div>
                <h5 className="text-neutral-950 font-bold text-xl">
                  <span className="text-red-700">100%</span> Authentic Guarantee
                </h5>
                <p className="text-neutral-400 text-xs mt-0.5">
                  Every timepiece certified & verified
                </p>
              </div>
            </div>

            {/* Operating Hours Block */}
            <div className="border border-neutral-200 bg-neutral-50/50 p-5 rounded-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h5 className="text-red-700 font-bold tracking-widest text-[14px] uppercase">
                  Store Hours
                </h5>
              </div>
              <div className="space-y-2.5">
                {STORE_HOURS.map(({ days, hours }) => (
                  <div
                    key={days}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-neutral-500 font-medium">{days}</span>
                    <span className="text-neutral-950 font-semibold whitespace-nowrap">
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Lower Utility Footer bar ── */}
      <div className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold tracking-widest text-neutral-400">
          <span className="uppercase text-center sm:text-left">
            © {new Date().getFullYear()} SULUX CENTRE · ALL RIGHTS RESERVED
          </span>

          <div className="flex items-center gap-2">
            {[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Sitemap", "/sitemap"],
            ].map(([label, href], i) => (
              <React.Fragment key={label}>
                <Link
                  href={href}
                  className="hover:text-neutral-950 transition-colors duration-200 uppercase"
                >
                  {label}
                </Link>
                {i < 2 && (
                  <span className="text-neutral-200 select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 uppercase text-neutral-500">
            <span className="text-base leading-none">🇳🇵</span>
            <span className="font-black">Proudly Nepali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
