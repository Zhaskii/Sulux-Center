"use client";

import { ArrowRight, Clock, Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const QUICK_LINKS = [
  {
    label: "Shop All Watches",
    href: "/shop",
    sub: "2,000+ timepieces",
    icon: ShoppingBag,
  },
  { label: "New Arrivals", href: "/shop/new", sub: "Just landed", icon: Clock },
  { label: "Book a Visit", href: "/contact", sub: "New Road, KTM", icon: Home },
  { label: "About Us", href: "/about", sub: "Since 1983", icon: ArrowRight },
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [time, setTime] = useState({ h: 4, m: 0, s: 0 });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Live clock for the watch face
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime({
        h: now.getHours() % 12,
        m: now.getMinutes(),
        s: now.getSeconds(),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const r = (delay: string) =>
    `transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:${delay}] ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  // Clock hand angles
  const sDeg = time.s * 6;
  const mDeg = time.m * 6 + time.s * 0.1;
  const hDeg = time.h * 30 + time.m * 0.5;

  const handX = (deg: number, len: number) =>
    130 + Math.sin((deg * Math.PI) / 180) * len;
  const handY = (deg: number, len: number) =>
    130 - Math.cos((deg * Math.PI) / 180) * len;

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a09] text-white overflow-hidden flex flex-col">
      <style>{`
        .cormorant { font-family: var(--font-display); }

        /* Film grain */
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.022;pointer-events:none;z-index:5;
          animation:grainAnim 0.8s steps(2) infinite;
        }
        @keyframes grainAnim {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)}
          40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)}
        }

        /* Rings */
        @keyframes slowSpin    { to { transform: rotate(360deg);  } }
        @keyframes counterSpin { to { transform: rotate(-360deg); } }
        .ring-spin    { animation: slowSpin    22s linear infinite; transform-origin: center; }
        .ring-counter { animation: counterSpin 14s linear infinite; transform-origin: center; }

        /* Second hand — smooth sweep */
        .second-hand-el { transition: transform 0.18s cubic-bezier(0.4,2.5,0.6,1); transform-origin: 130px 130px; }

        /* Pulse */
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        /* Glow ring pulse */
        @keyframes glowRing { 0%,100%{opacity:0.5;r:90} 50%{opacity:1;r:95} }

        /* Quick link */
        .qlink { transition: all 0.22s ease; }
        .qlink:hover { border-color: rgba(255,255,255,0.22) !important; background: rgba(255,255,255,0.04) !important; transform: translateX(4px); }
        .qlink:hover .ql-arrow { opacity:1; transform:translateX(0); }
        .ql-arrow { opacity:0; transform:translateX(-4px); transition: all 0.22s ease; }

        /* Inputs / buttons */
        .search-input:focus { border-color: rgba(255,255,255,0.35) !important; outline:none; }
        .search-input { transition: border-color 0.2s ease; }
        .btn-white { transition: all 0.22s ease; }
        .btn-white:hover { background: rgba(255,255,255,0.88) !important; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(255,255,255,0.07); }
        .btn-ghost { transition: all 0.22s ease; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.35) !important; color: white !important; transform: translateY(-2px); }

        /* Dot grid */
        .dot-grid { background-image: radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px); background-size: 28px 28px; }

        /* Footer link */
        .foot-link { transition: color 0.18s ease; }
        .foot-link:hover { color: rgba(255,255,255,0.55) !important; }
      `}</style>

      <div className="grain pointer-events-none" />
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Radial glow behind clock */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.035) 0%, transparent 55%)",
        }}
      />

      {/* ── MAIN ── */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-8 md:px-14 xl:px-20 py-22 gap-12 xl:gap-24">
        {/* LEFT: Watch clock */}
        <div
          className={`${r("0.15s")} flex-shrink-0 flex flex-col items-center gap-8`}
        >
          {/* Watch case outer shell */}
          <div className="relative" style={{ width: "280px", height: "280px" }}>
            {/* Outermost tick ring — spins */}
            <svg
              className="ring-spin absolute inset-0 w-full h-full"
              viewBox="0 0 260 260"
            >
              {Array.from({ length: 60 }, (_, i) => {
                const angle = (i * 6 * Math.PI) / 180;
                const isHour = i % 5 === 0;
                const r1 = 120,
                  r2 = isHour ? 108 : 114;
                return (
                  <line
                    key={i}
                    x1={130 + Math.sin(angle) * r1}
                    y1={130 - Math.cos(angle) * r1}
                    x2={130 + Math.sin(angle) * r2}
                    y2={130 - Math.cos(angle) * r2}
                    stroke={`rgba(255,255,255,${isHour ? 0.4 : 0.1})`}
                    strokeWidth={isHour ? 1.5 : 0.8}
                    strokeLinecap="round"
                  />
                );
              })}
              <circle
                cx="130"
                cy="130"
                r="125"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            </svg>

            {/* Dashed ring — counter-spins */}
            <svg
              className="ring-counter absolute inset-0 w-full h-full"
              viewBox="0 0 260 260"
            >
              <circle
                cx="130"
                cy="130"
                r="103"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="3 9"
              />
            </svg>

            {/* Static watch face */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 260 260"
            >
              {/* Bezel */}
              <circle cx="130" cy="130" r="90" fill="rgba(255,255,255,0.025)" />
              <circle
                cx="130"
                cy="130"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />

              {/* Subtle inner shadow ring */}
              <circle
                cx="130"
                cy="130"
                r="86"
                fill="none"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="3"
              />

              {/* Hour indices */}
              {Array.from({ length: 12 }, (_, i) => {
                const ang = (i * 30 * Math.PI) / 180;
                const ri = 78,
                  ro = 84;
                return (
                  <line
                    key={i}
                    x1={130 + Math.sin(ang) * ri}
                    y1={130 - Math.cos(ang) * ri}
                    x2={130 + Math.sin(ang) * ro}
                    y2={130 - Math.cos(ang) * ro}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* "404" — main dial text */}
              <text
                x="130"
                y="122"
                textAnchor="middle"
                fill="white"
                fontSize="30"
                fontWeight="900"
                fontFamily="var(--font-display)"
                letterSpacing="-1"
                fillOpacity="0.95"
              >
                404
              </text>
              <text
                x="130"
                y="136"
                textAnchor="middle"
                fill="rgba(255,255,255,0.22)"
                fontSize="6.5"
                fontFamily="var(--font-display)"
                letterSpacing="3.5"
              >
                PAGE NOT FOUND
              </text>

              {/* Sub-dial at 6 o'clock */}
              <circle
                cx="130"
                cy="160"
                r="10"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.8"
              />
              <circle cx="130" cy="160" r="1" fill="rgba(255,255,255,0.3)" />

              {/* LIVE minute hand */}
              <line
                className="second-hand-el"
                style={{ transform: `rotate(${mDeg}deg)` }}
                x1="130"
                y1="130"
                x2="130"
                y2="72"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeOpacity="0.75"
              />

              {/* LIVE hour hand */}
              <line
                x1="130"
                y1="130"
                x2={handX(hDeg, 50)}
                y2={handY(hDeg, 50)}
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.88"
              />

              {/* LIVE second hand */}
              <line
                className="second-hand-el"
                style={{ transform: `rotate(${sDeg}deg)` }}
                x1="130"
                y1="148"
                x2="130"
                y2="58"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle
                className="second-hand-el"
                style={{ transform: `rotate(${sDeg}deg)` }}
                cx="130"
                cy="148"
                r="3.5"
                fill="white"
                fillOpacity="0.8"
              />

              {/* Center crown */}
              <circle cx="130" cy="130" r="5" fill="white" fillOpacity="0.65" />
              <circle cx="130" cy="130" r="2.5" fill="#0a0a09" />
            </svg>

            {/* Pulse at base */}
            <div className="pulse-dot absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>

          {/* Watch lug strip below clock */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-6 bg-white/10" />
            <span
              className="text-white/18 font-bold tracking-[0.28em] uppercase"
              style={{ fontSize: "0.44rem" }}
            >
              SULUX CENTRE · KTM
            </span>
            <div className="w-px h-6 bg-white/10" />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex-1 max-w-lg">
          {/* Eyebrow */}
          <div className={`${r("0.3s")} flex items-center gap-3 mb-7`}>
            <div className="w-5 h-px bg-white/30" />
            <span
              className="text-white/35 font-bold tracking-[0.3em] uppercase"
              style={{ fontSize: "0.8rem" }}
            >
              Error <span className="text-red-700 text-[18px]">404</span>
            </span>
          </div>

          {/* Headline */}
          <div className={`${r("0.45s")} mb-6`}>
            <h1
              className="cormorant font-light leading-[0.88] text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              This page has
              <br />
              <em className="italic text-white/42 font-normal">
                <span className="text-red-700">stopped</span> ticking.
              </em>
            </h1>
          </div>

          {/* Divider */}
          <div className={`${r("0.52s")} flex items-center gap-4 mb-7`}>
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span
              className="text-white/15 font-light"
              style={{ fontSize: "0.5rem", letterSpacing: "0.12em" }}
            >
              — EST. 1983 —
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Body */}
          <p
            className={`${r("0.6s")} cormorant italic text-white/38 font-light leading-relaxed mb-9`}
            style={{ fontSize: "1.1rem", maxWidth: "380px" }}
          >
            The page you're looking for doesn't exist or has been moved. Let us
            help you find the right timepiece.
          </p>

          {/* Search */}
          <div className={`${r("0.7s")} flex gap-0 mb-9`}>
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/22"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search watches, brands…"
                className="search-input w-full bg-white/[0.03] border border-white/[0.1] border-r-0 pl-10 pr-4 py-3.5 text-white placeholder-white/18 font-light"
                style={{ fontSize: "0.82rem", fontFamily: "inherit" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim())
                    window.location.href = `/shop?q=${encodeURIComponent(query)}`;
                }}
              />
            </div>
            <button
              className="btn-white bg-white text-black font-black px-6 py-3.5 flex-shrink-0 tracking-[0.18em] uppercase"
              style={{ fontSize: "0.62rem" }}
              onClick={() => {
                if (query.trim())
                  window.location.href = `/shop?q=${encodeURIComponent(query)}`;
              }}
            >
              SEARCH
            </button>
          </div>

          {/* CTAs */}
          <div
            className={`${r("0.78s")} flex flex-wrap items-center gap-3 mb-10`}
          >
            <Link
              href="/"
              className="btn-white group flex items-center gap-2.5 bg-white text-black font-black px-7 py-3.5"
              style={{ fontSize: "0.64rem", letterSpacing: "0.2em" }}
            >
              <Home size={13} strokeWidth={2} /> HOME
            </Link>
            <Link
              href="/shop"
              className="btn-ghost group flex items-center gap-2.5 border border-white/15 text-white/50 font-bold px-7 py-3.5"
              style={{ fontSize: "0.64rem", letterSpacing: "0.2em" }}
            >
              <Clock size={13} strokeWidth={1.8} /> SHOP WATCHES
            </Link>
          </div>

          {/* Quick links */}
          <div className={r("0.88s")}>
            <p
              className="text-white/18 font-black tracking-[0.3em] uppercase mb-3"
              style={{ fontSize: "0.44rem" }}
            >
              Or jump to
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LINKS.map(({ label, href, sub, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="qlink flex items-center justify-between border border-white/[0.07] bg-white/[0.02] px-4 py-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-7 h-7 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.03]">
                      <Icon
                        size={12}
                        strokeWidth={1.5}
                        className="text-white/40 group-hover:text-white/70 transition-colors duration-200"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-white font-semibold leading-tight truncate"
                        style={{ fontSize: "0.73rem" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-white/25 font-light"
                        style={{ fontSize: "0.56rem" }}
                      >
                        {sub}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={12}
                    strokeWidth={1.8}
                    className="ql-arrow text-white flex-shrink-0 ml-2"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM BAR ── */}
      <footer
        className={`${r("1s")} relative z-10 border-t border-white/[0.06] px-8 md:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3`}
      >
        <div className="flex items-center gap-2.5">
          <div className="pulse-dot w-1.5 h-1.5 rounded-full bg-green-400" />
          <span
            className="text-white/22 font-semibold tracking-[0.16em] uppercase"
            style={{ fontSize: "0.52rem" }}
          >
            Sulux Centre · Online
          </span>
        </div>

        <span
          className="text-white/12 font-light tracking-[0.1em]"
          style={{ fontSize: "0.52rem" }}
        >
          © {new Date().getFullYear()} SULUX CENTRE · NEW ROAD, KATHMANDU
        </span>

        <div className="flex items-center gap-5">
          {["Shop", "Contact", "FAQ"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="foot-link text-white/18 font-semibold tracking-[0.14em] uppercase"
              style={{ fontSize: "0.5rem" }}
            >
              {item}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
