"use client";

import logo from "@/app/assets/sulux.png";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Nav links config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Shop",
    href: "/shop",
    mega: [
      {
        heading: "By Category",
        items: [
          { label: "Dive Watches", href: "/shop/dive-watches" },
          { label: "Dress Watches", href: "/shop/dress-watches" },
          { label: "Chronographs", href: "/shop/chronographs" },
          { label: "Smartwatches", href: "/shop/smartwatches" },
          { label: "Vintage", href: "/shop/vintage" },
        ],
      },
      {
        heading: "By Brand",
        items: [
          { label: "Rado", href: "/shop/rado" },
          { label: "Bell & Ross", href: "/shop/bell-ross" },
          { label: "Norqain", href: "/shop/norqain" },
          { label: "Oris", href: "/shop/oris" },
          { label: "Raymond Weil", href: "/shop/raymond-weil" },
          { label: "Tissot", href: "/shop/tissot" },
          { label: "TW Steel", href: "/shop/tw-steel" },
          { label: "Victorinox", href: "/shop/victorinox" },
          { label: "Traser", href: "/shop/traser" },
          { label: "Tag Heuer", href: "/shop/tag-heuer" },
          { label: "Nuun", href: "/shop/nuun" },
          { label: "Baltic", href: "/shop/baltic" },
          { label: "Maurice Lacroix", href: "/shop/maurice-lacroix" },
        ],
      },
      {
        heading: "Collections",
        items: [
          { label: "1975", href: "/shop/1975" },
          { label: "AIKON", href: "/shop/aikon" },
          { label: "AIKONIC", href: "/shop/aikonic" },
          { label: "FIABA", href: "/shop/fiaba" },
          { label: "MASTERPIECE", href: "/shop/masterpiece" },
          { label: "PONTOS", href: "/shop/pontos" },
        ],
      },
    ],
  },
  { label: "Store", href: "/store" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// ── MegaMenu ──────────────────────────────────────────────────────────────────
function MegaMenu({
  columns,
}: {
  columns: { heading: string; items: { label: string; href: string }[] }[];
}) {
  return (
    <div
      className="mt-5
      absolute top-[calc(100%+1px)] left-1/2 -translate-x-1/2
      w-[920px] bg-white text-black
      border-t-[2.5px] border-neutral-900
      grid grid-cols-4 gap-0
      opacity-0 invisible translate-y-3
      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      z-50
      shadow-[0_24px_64px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]
    "
    >
      {columns.map((col, ci) => {
        const isBrand = col.heading === "By Brand";
        return (
          <div
            key={col.heading}
            className={`px-8 py-9 border-r border-neutral-100 last:border-r-0 ${isBrand ? "col-span-2" : ""}`}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-4 h-px bg-red-700" />
              <p
                className="text-red-700 font-black tracking-[0.22em] uppercase"
                style={{ fontSize: "0.8rem" }}
              >
                {col.heading}
              </p>
            </div>
            <ul
              className={`space-y-0 ${isBrand ? "grid grid-cols-2 gap-x-6" : ""}`}
            >
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group/item flex items-center gap-0 py-2 text-neutral-500 hover:text-neutral-900 font-semibold transition-all duration-200"
                    style={{ fontSize: "0.82rem", letterSpacing: "0.04em" }}
                  >
                    <span className="w-0 h-px bg-neutral-900 group-hover/item:w-3 mr-0 group-hover/item:mr-2.5 transition-all duration-250 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {/* Bottom strip */}
      <div className="col-span-4 border-t border-neutral-100 bg-neutral-50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span
            className="text-neutral-400 font-semibold tracking-[0.2em] uppercase"
            style={{ fontSize: "0.6rem" }}
          >
            <span className="text-red-700 text-[16px]">2,000+</span> Authentic
            Timepieces In Store
          </span>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-neutral-900 font-black tracking-[0.18em] uppercase hover:gap-3.5 transition-all duration-250 group hover:text-red-700"
          style={{ fontSize: "0.6rem" }}
        >
          View All
          <ArrowRight
            size={11}
            className="group-hover:translate-x-0.5 transition-transform duration-250"
          />
        </Link>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileExpandedLink, setMobileExpandedLink] = useState<string | null>(
    null,
  );
  const [mobileExpandedSubSection, setMobileExpandedSubSection] = useState<
    string | null
  >(null);

  // Currency Dropdown States
  const [currency, setCurrency] = useState<{ code: string; flag: string }>({
    code: "NPR",
    flag: "🇳🇵",
  });
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close currency dropdown when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        html, body { max-width: 100vw; overflow-x: hidden; }

        /* Underline on nav links */
        .sulux-link { position: relative; }
        .sulux-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1.5px;
          background: #000;
          transition: width 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .sulux-link:hover::after, .sulux-link.active::after { width: 100%; }

        /* Scrolled state */
        .nav-scrolled {
          background: rgba(255,255,255,0.97) !important;
          backdrop-filter: blur(28px) saturate(1.8) !important;
          -webkit-backdrop-filter: blur(28px) saturate(1.8) !important;
          box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06) !important;
        }

        /* Transparent state */
        .nav-transparent {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        /* Icon buttons */
        .icon-btn { transition: all 0.18s ease; position: relative; }
        .icon-btn:hover { opacity: 0.45; transform: scale(1.05); }
        .icon-btn:active { transform: scale(0.95); }

        /* Search overlay */
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }
        @keyframes searchSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .search-overlay { animation: overlayIn 0.28s ease forwards; }
        .search-content { animation: searchSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s both; }

        /* Mobile drawer */
        @keyframes drawerIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        @keyframes backdropIn { from{opacity:0} to{opacity:1} }
        .drawer-slide { animation: drawerIn 0.42s cubic-bezier(0.16,1,0.3,1) forwards; }
        .drawer-backdrop { animation: backdropIn 0.3s ease forwards; }

        /* Mobile expand accordion */
        .mobile-sub { overflow: hidden; }

        /* Announcement ticker */
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-inner { animation: ticker 28s linear infinite; }

        /* Book Visit CTA */
        .book-cta { transition: all 0.2s ease; }
        .book-cta:hover { background: #1a1a1a !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.18); }

        /* Search suggestion hover */
        .search-tag { transition: all 0.18s ease; }
        .search-tag:hover { border-color: #111 !important; color: #111 !important; background: #f9f9f9; }

        /* Mobile nav item */
        .mob-link { transition: color 0.18s ease; }
        .mob-link:hover { color: rgba(0,0,0,0.4) !important; }

        /* Cart badge pulse */
        @keyframes badgePop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .cart-badge { animation: badgePop 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* ══ ANNOUNCEMENT BAR ══ */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-neutral-950 text-white overflow-hidden transition-all duration-500
        ${scrolled ? "h-0 opacity-0 pointer-events-none" : "h-8 opacity-100"}`}
      >
        <div className="h-full flex items-center">
          <div className="ticker-inner flex items-center whitespace-nowrap will-change-transform">
            {[...Array(3)].map((_, ri) => (
              <span key={ri} className="flex items-center">
                {[
                  "FREE DELIVERY ACROSS NEPAL",
                  "100% AUTHENTICATED TIMEPIECES",
                  "ESTABLISHED 1983",
                  "OFFICIAL AUTHORIZED RETAILER",
                  "KATHMANDU'S FINEST WATCH BOUTIQUE",
                ].map((msg) => (
                  <span
                    key={`${ri}-${msg}`}
                    className="flex items-center gap-5 mx-8 flex-shrink-0"
                  >
                    <span className="w-px h-3 bg-white/15" />
                    <span
                      className="font-semibold tracking-[0.22em] text-white/70"
                      style={{ fontSize: "0.5rem" }}
                    >
                      {msg}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN NAV ══ */}
      <nav
        className={`fixed left-0 w-full z-40 flex items-center justify-between px-6 sm:px-8 md:px-12 xl:px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? "nav-scrolled top-0 py-4 md:py-3.5" : "nav-transparent top-8 py-3 md:py-4"}`}
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0 group block">
          <Image
            src={logo}
            alt="Sulux Centre"
            className={`w-auto object-contain transition-all duration-500 group-hover:opacity-55 ${scrolled ? "h-10 md:h-11" : "h-10 md:h-14"}`}
            priority
          />
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <div key={link.label} className="relative group">
                <button
                  className="sulux-link flex items-center gap-1.5 font-black tracking-[0.14em] uppercase text-neutral-900 transition-opacity duration-200 hover:opacity-45"
                  style={{ fontSize: "0.85rem" }}
                >
                  {link.label}
                  <ChevronDown
                    size={11}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:rotate-180 text-neutral-500"
                  />
                </button>
                <MegaMenu columns={link.mega} />
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="sulux-link font-black tracking-[0.14em] uppercase text-neutral-900 transition-opacity duration-200 hover:opacity-45"
                style={{ fontSize: "0.85rem" }}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Interactive Currency Dropdown Selector */}
          <div ref={currencyRef} className="hidden xl:block relative">
            <button
              onClick={() => setCurrencyOpen((prev) => !prev)}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-45 transition-opacity outline-none"
            >
              <span style={{ fontSize: "0.75rem" }}>{currency.flag}</span>
              <span
                className="text-neutral-900 font-bold tracking-wider"
                style={{ fontSize: "0.8rem" }}
              >
                {currency.code}
              </span>
              <ChevronDown
                size={10}
                strokeWidth={2.5}
                className={`text-neutral-500 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Box Menu */}
            {currencyOpen && (
              <div
                className={`absolute right-0 top-[calc(100%+12px)] border border-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1.5 w-24 z-50 animate-[overlayIn_0.15s_ease_forwards]
                ${scrolled ? "bg-white/97 backdrop-blur-[28px]" : "bg-white/75 backdrop-blur-[12px]"}`}
              >
                <button
                  onClick={() => {
                    setCurrency({ code: "NPR", flag: "🇳🇵" });
                    setCurrencyOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-neutral-900/5 text-neutral-900 font-bold tracking-wider transition-colors text-[0.8rem] ${currency.code === "NPR" ? "bg-neutral-900/5" : ""}`}
                >
                  <span>🇳🇵</span> NPR
                </button>
                <button
                  onClick={() => {
                    setCurrency({ code: "USD", flag: "🇺🇸" });
                    setCurrencyOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-neutral-900/5 text-neutral-900 font-bold tracking-wider transition-colors text-[0.8rem] ${currency.code === "USD" ? "bg-neutral-900/5" : ""}`}
                >
                  <span>🇺🇸</span> USD
                </button>
              </div>
            )}
          </div>
          <div className="hidden xl:block h-3.5 w-px bg-neutral-200" />

          {/* Search */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="icon-btn text-neutral-900"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* Account */}
          <Link
            href="/login"
            aria-label="Account"
            className="icon-btn text-neutral-900 hidden sm:block"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="icon-btn relative text-neutral-900"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="cart-badge absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center bg-neutral-900 text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden md:block h-3.5 w-px bg-neutral-200" />

          {/* Book Visit CTA */}
          <Link
            href="/contact"
            className="book-cta hidden md:flex items-center gap-2 bg-neutral-900 text-white font-black px-4 xl:px-5 py-2.5"
            style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
          >
            Book Visit
            <ArrowRight size={10} strokeWidth={2} />
          </Link>

          {/* Hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="icon-btn lg:hidden text-neutral-900 ml-1"
          >
            <Menu size={21} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* ══ SEARCH OVERLAY ══ */}
      {searchOpen && (
        <div
          className="search-overlay fixed inset-0 z-[60] bg-white/97"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 pt-8 sm:pt-10 border-b border-neutral-100">
            <Image
              src={logo}
              alt="Sulux Centre"
              className="h-14 md:h-18 w-auto object-contain"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="flex items-center gap-2.5 text-black hover:text-red-900 transition-all duration-200 group"
            >
              <span
                className="font-bold tracking-[0.18em] uppercase hidden sm:inline"
                style={{ fontSize: "0.56rem" }}
              >
                Close
              </span>
              <div className="w-8 h-8 border border-black group-hover:border-red-900 flex items-center justify-center transition-colors">
                <X size={15} strokeWidth={1.8} />
              </div>
            </button>
          </div>

          {/* Search body */}
          <div className="search-content flex flex-col items-center justify-center h-[calc(100%-80px)] px-6 sm:px-10">
            <div className="w-full max-w-2xl">
              <p
                className="text-black font-black tracking-[0.38em] uppercase mb-8"
                style={{ fontSize: "1rem" }}
              >
                What are you looking for?
              </p>

              <div className="relative border-b-2 border-black focus-within:border-neutral-900 transition-colors duration-300">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search watches, brands, models…"
                  className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 font-light pb-5 outline-none"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    letterSpacing: "0.02em",
                  }}
                />
                <Search
                  size={20}
                  className="absolute right-0 bottom-5 text-neutral-300"
                  strokeWidth={1.4}
                />
              </div>

              <div className="mt-10">
                <p
                  className="text-black font-black tracking-[0.3em] uppercase mb-4"
                  style={{ fontSize: "0.6rem" }}
                >
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Rolex Submariner",
                    "Omega Speedmaster",
                    "IWC Pilot",
                    "TAG Heuer Carrera",
                    "Tudor Black Bay",
                  ].map((s) => (
                    <button
                      key={s}
                      className="search-tag border border-neutral-400 text-black px-3.5 sm:px-4 py-2 font-medium"
                      style={{
                        fontSize: "clamp(0.6rem, 1.4vw, 0.7rem)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE DRAWER ══ */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="drawer-backdrop fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <aside className="drawer-slide fixed top-0 left-0 h-full w-full z-[60] bg-white flex flex-col shadow-[4px_0_48px_rgba(0,0,0,0.14)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <Image
                src={logo}
                alt="Sulux Centre"
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-neutral-200 hover:border-neutral-900 transition-colors"
              >
                <X size={15} strokeWidth={1.8} className="text-neutral-500" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="mob-link flex-1 py-4 px-6 font-black tracking-[0.14em] uppercase text-neutral-900"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {link.label}
                    </Link>
                    {link.mega && (
                      <button
                        onClick={() =>
                          setMobileExpandedLink(
                            mobileExpandedLink === link.label
                              ? null
                              : link.label,
                          )
                        }
                        className="px-5 py-4 text-neutral-400 hover:text-neutral-900 transition-colors"
                      >
                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={`transition-transform duration-300 ${mobileExpandedLink === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Level 1: sections */}
                  {link.mega && mobileExpandedLink === link.label && (
                    <div className="bg-neutral-50 border-t border-neutral-100">
                      {link.mega.map((section) => (
                        <div
                          key={section.heading}
                          className="border-b border-neutral-100 last:border-0"
                        >
                          <button
                            onClick={() =>
                              setMobileExpandedSubSection(
                                mobileExpandedSubSection === section.heading
                                  ? null
                                  : section.heading,
                              )
                            }
                            className="w-full flex items-center justify-between px-6 py-3.5"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-px bg-neutral-300" />
                              <span
                                className="font-black tracking-[0.2em] uppercase text-red-700"
                                style={{ fontSize: "0.6rem" }}
                              >
                                {section.heading}
                              </span>
                            </div>
                            <ChevronDown
                              size={12}
                              strokeWidth={2.5}
                              className={`text-neutral-400 transition-transform duration-250 ${mobileExpandedSubSection === section.heading ? "rotate-180" : ""}`}
                            />
                          </button>

                          {/* Level 2: items */}
                          {mobileExpandedSubSection === section.heading && (
                            <div className="pb-3 px-6 border-l-2 border-neutral-200 ml-6 mb-3">
                              {section.items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2 text-neutral-500 hover:text-neutral-900 font-semibold transition-colors"
                                  style={{
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-100 space-y-4">
              {/* Utility links */}
              <div className="flex gap-5">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 font-semibold transition-colors"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}
                >
                  <User size={14} strokeWidth={1.6} /> Account
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 font-semibold transition-colors"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}
                >
                  <ShoppingBag size={14} strokeWidth={1.6} /> Cart ({cartCount})
                </Link>
              </div>

              {/* Book Visit */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full bg-neutral-900 text-white font-black py-3.5 hover:bg-neutral-800 transition-colors"
                style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
              >
                BOOK A VISIT
                <ArrowRight size={11} strokeWidth={2} />
              </Link>

              {/* Brand stamp */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-neutral-300" />
                <p
                  className="text-neutral-300 font-semibold tracking-[0.18em] uppercase"
                  style={{ fontSize: "0.4rem" }}
                >
                  Est. 1983 · New Road, Kathmandu, Nepal
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
