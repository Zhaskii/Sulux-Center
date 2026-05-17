"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  X,
} from "lucide-react";

const STATS = [
  { value: "40+", label: "Years of Trust" },
  { value: "2000+", label: "Timepieces" },
  { value: "100%", label: "Authenticated" },
];

const HomePage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[600px] lg:h-190 w-full text-white overflow-hidden">
      <style>{`
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.025;pointer-events:none;z-index:5;
          animation:grain 0.8s steps(2) infinite;
        }
        @keyframes grain {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          50%{transform:translate(-3%,1%)} 100%{transform:translate(0,0)}
        }
        @keyframes caretBounce {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)}
        }
        .caret-bounce{animation:caretBounce 2s ease-in-out infinite;}
        .vignette{
          background: 
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%);
        }
        .cta-primary:hover{background:rgba(255,255,255,1)!important;transform:translateY(-2px);}
        .stat-sep{width:1px;height:100%;background:rgba(255,255,255,0.08);}
        
        /* Mobile visibility boost */
        .mobile-text-shadow {
           text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
      `}</style>

      <div className="grain pointer-events-none" />

      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/mp4/heroBG.mp4" type="video/mp4" />
        </video>
        <div className="vignette absolute inset-0" />
      </div>

      {/* ── Hero Content ── */}
      <main className="relative z-10 flex flex-col h-full min-h-screen lg:min-h-0">
        <div className="h-16 md:h-20 lg:h-24" />

        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-between px-6 md:px-14 xl:px-20 pb-10 lg:pb-16 gap-8">
          {/* LEFT: Copy */}
          <div className="flex-1 flex flex-col items-center sm:items-start justify-center lg:justify-end pb-8 md:pb-10 lg:pb-12 max-w-2xl w-full text-center sm:text-left">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="w-5 h-px bg-white/60 hidden sm:block" />
              <span
                className="text-white/80 font-bold tracking-[0.32em] uppercase mobile-text-shadow"
                style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)" }}
              >
                Pre-Summer Sale · Save up to 30%
              </span>
            </div>

            {/* Headline */}
            <div
              className={`mb-4 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <h1
                className="font-light leading-[1.1] lg:leading-[0.9] tracking-tight mobile-text-shadow"
                style={{
                  fontSize: "clamp(2.4rem, 9vw, 6rem)",
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                }}
              >
                Time <em className="italic font-normal text-white/70">tells</em>
                <br />
                <span
                  className="font-semibold tracking-[0.22em] block lg:inline"
                  style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
                >
                  YOUR STORY.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p
              className={`text-white/85 font-medium leading-relaxed mb-8 max-w-sm italic transition-all duration-700 delay-200 mobile-text-shadow ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
              }}
            >
              Curating the world's finest timepieces since 1983. Each watch we
              carry is a chapter in someone's story.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-10 transition-all duration-700 delay-300 w-full sm:w-auto ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Link
                href="/shop"
                className="cta-primary group flex items-center justify-center gap-3 bg-white/85 text-black font-black px-7 py-4 tracking-[0.2em] uppercase shadow-2xl w-full sm:w-auto"
                style={{ fontSize: "0.65rem" }}
              >
                Shop Collection
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* "Our Story" Fixed Glassmorphism for Mobile */}
              <Link
                href="/about"
                className="group flex items-center justify-center gap-3 text-white font-bold tracking-[0.18em] uppercase border border-white/30 bg-white/5 backdrop-blur-sm px-7 py-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:border-b sm:border-white/40 pb-3 sm:pb-0.5 w-full sm:w-fit transition-all duration-300"
                style={{ fontSize: "0.65rem" }}
              >
                Our Story
                <ArrowRight size={12} className="sm:hidden opacity-50" />
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-0 pt-6 transition-all duration-700 delay-400 w-full sm:w-auto ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              {STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div
                    className={`sm:pr-8 ${i > 0 ? "sm:pl-8" : ""} text-center sm:text-left`}
                  >
                    <p
                      className="font-black text-white leading-none mb-1 mobile-text-shadow"
                      style={{ fontSize: "clamp(1.3rem, 3vw, 1.5rem)" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-white/60 font-bold tracking-[0.2em] uppercase"
                      style={{ fontSize: "clamp(0.45rem, 1vw, 0.5rem)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="stat-sep hidden sm:block self-stretch" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 overflow-hidden" />
      </main>

      {/* ════════════════════════════════════════════════
          FLOATING WIDGETS
      ════════════════════════════════════════════════ */}
      <div
        className={`fixed z-50 flex flex-col items-end gap-2 sm:gap-3
          bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8
          transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1500ms]
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Chat popup */}
        {chatOpen && (
          <div className="chat-pop bg-white text-black shadow-2xl mb-1 border border-neutral-100 w-[calc(100vw-2rem)] sm:w-72 max-w-xs">
            {/* Header */}
            <div className="bg-neutral-900 text-white px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between">
              <div>
                <p
                  className="font-black tracking-wider"
                  style={{ fontSize: "clamp(0.78rem, 2vw, 0.88rem)" }}
                >
                  SULUX CENTRE
                </p>
                <p
                  className="text-white/35 tracking-widest mt-0.5"
                  style={{ fontSize: "clamp(0.58rem, 1.5vw, 0.7rem)" }}
                >
                  Est. 1983 · Kathmandu
                </p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/40 hover:text-white transition-colors ml-4 w-7 h-7 flex items-center justify-center"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-4 sm:px-5 py-4 sm:py-5">
              {/* Bot message */}
              <div className="bg-neutral-50 border-l-2 border-neutral-900 px-3 sm:px-4 py-2.5 sm:py-3 mb-3 sm:mb-4">
                <p
                  className="text-neutral-600 leading-relaxed"
                  style={{ fontSize: "clamp(0.76rem, 2vw, 0.86rem)" }}
                >
                  Welcome to Sulux Centre 👋 How can we help you find your
                  perfect timepiece?
                </p>
              </div>

              {/* Quick actions */}
              <div className="flex gap-2 mb-3 sm:mb-4 flex-wrap">
                {["Browse Watches", "Book Visit", "Trade-In"].map((opt) => (
                  <button
                    key={opt}
                    className="chat-opt border border-neutral-200 text-neutral-500 tracking-wide font-medium"
                    style={{
                      fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                      padding: "5px 10px",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message…"
                  className="chat-input flex-1 border border-neutral-200 border-r-0 px-3 py-2.5 text-neutral-800 placeholder-neutral-300"
                  style={{ fontSize: "clamp(0.76rem, 2vw, 0.86rem)" }}
                />
                <button
                  className="bg-neutral-900 hover:bg-neutral-700 text-white px-4 font-bold transition-colors"
                  style={{ fontSize: "0.9rem" }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat toggle button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="fw-btn group flex items-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-md text-white
            px-3.5 sm:px-5 py-2.5 sm:py-3.5 shadow-2xl border border-white/10 hover:border-white/25"
          style={{
            fontSize: "clamp(0.52rem, 1.4vw, 0.6rem)",
            letterSpacing: "0.14em",
          }}
        >
          <MessageCircle
            size={13}
            strokeWidth={1.4}
            className="text-white/50 flex-shrink-0"
          />
          <span className="font-black tracking-widest">CHAT</span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse ml-0.5" />
        </button>

        {/* Rewards button */}
        <Link
          href="/rewards"
          className="fw-btn group flex items-center gap-2 sm:gap-3 bg-white text-black font-black
            px-3.5 sm:px-5 py-2.5 sm:py-3.5 shadow-xl hover:bg-white/88"
          style={{
            fontSize: "clamp(0.52rem, 1.4vw, 0.6rem)",
            letterSpacing: "0.14em",
          }}
        >
          <ShoppingBag size={13} strokeWidth={2} className="flex-shrink-0" />
          <span className="tracking-widest">REWARDS</span>
          <ArrowRight
            size={10}
            className="opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
