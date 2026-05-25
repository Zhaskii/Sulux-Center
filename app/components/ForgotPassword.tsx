"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, ArrowRight, Check } from "lucide-react";

type FormState = "request" | "success";
const E = [0.16, 1, 0.3, 1] as const;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<FormState>("request");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setState("success");
  };

  return (
    <main
      className="min-h-screen bg-white text-neutral-900 antialiased"
      style={{ fontFamily: "var(--font-body,'Barlow Condensed',sans-serif)" }}
    >
      <style>{`
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.018;pointer-events:none;z-index:0;
          animation:gr 0.8s steps(2) infinite;
        }
        @keyframes gr { 0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)} 40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)} }
        .inp { transition:border-color 0.22s ease,background 0.22s ease; }
        .inp:focus { border-color:#111!important;background:#fff!important;outline:none; }
        .inp::placeholder { color:rgba(0,0,0,0.22); }
        .btn-sub { transition:all 0.22s ease; }
        .btn-sub:hover:not(:disabled) { background:#333!important;transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,0.2); }
        .btn-sub:disabled { opacity:0.45;cursor:not-allowed; }
        .dot-grid { background-image:radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px); background-size:26px 26px; }
      `}</style>

      <div className="grain pointer-events-none" />

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* ══════════════════════════════════════════════════════
            LEFT — dark panel
        ══════════════════════════════════════════════════════ */}
        <div className="relative hidden lg:block bg-neutral-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
            alt="Sulux Centre"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.22) contrast(1.1) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/60 to-transparent" />
          <div className="dot-grid absolute inset-0 opacity-25 pointer-events-none" />

          {/* Watermark */}
          <div
            className="absolute -right-8 bottom-0 pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              className="font-black text-white leading-none"
              style={{
                fontSize: "22rem",
                letterSpacing: "-0.06em",
                opacity: 0.04,
              }}
            >
              SC
            </span>
          </div>

          {/* Side label */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-white/10" />
            <p
              className="text-white/15 tracking-[0.35em] uppercase"
              style={{ fontSize: "0.44rem", writingMode: "vertical-rl" }}
            >
              Est. 1983 · Kathmandu, Nepal
            </p>
            <div className="w-px h-16 bg-white/10" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full px-12 py-12">
            {/* Brand */}
            <Link href="/" className="flex flex-col">
              <span
                className="text-white font-black tracking-[0.22em] uppercase leading-none"
                style={{ fontSize: "1.6rem" }}
              >
                SULUX
              </span>
              <span
                className="text-white/35 font-bold tracking-[0.5em] uppercase"
                style={{ fontSize: "0.5rem", paddingLeft: "0.1em" }}
              >
                CENTRE
              </span>
            </Link>

            {/* Centre copy */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-5 h-px bg-white/20" />
                <span
                  className="text-white/50 font-bold tracking-[0.28em] uppercase"
                  style={{ fontSize: "0.8rem" }}
                >
                  Account Recovery
                </span>
              </div>
              <h2
                className="font-light text-white leading-[0.9] mb-7"
                style={{
                  fontFamily:
                    "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                  fontSize: "clamp(1.8rem,3vw,3rem)",
                }}
              >
                Regain access
                <br />
                <em className="italic text-white/35 font-normal">
                  to your <span className="text-red-700">collection.</span>
                </em>
              </h2>
              <p
                className="text-white/50 font-light italic leading-relaxed max-w-sm"
                style={{
                  fontSize: "1rem",
                  fontFamily:
                    "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                }}
              >
                Enter your registered email and we'll send you instructions to
                restore access to your Sulux Centre client profile.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-5 border-t border-white/[0.06] pt-8">
              {[
                {
                  n: "01",
                  t: "Enter your email",
                  s: "The one linked to your Sulux account",
                },
                {
                  n: "02",
                  t: "Check your inbox",
                  s: "Recovery link sent within minutes",
                },
                {
                  n: "03",
                  t: "Reset & sign back in",
                  s: "Full access to your collection restored",
                },
              ].map(({ n, t, s }) => (
                <div key={n} className="flex items-center gap-4">
                  <span
                    className="text-white/40 font-black w-8 flex-shrink-0"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    {n}
                  </span>
                  <div>
                    <p
                      className="text-white/60 font-semibold"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {t}
                    </p>
                    <p
                      className="text-white/40 font-light"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {s}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            RIGHT — form panel
        ══════════════════════════════════════════════════════ */}
        <div className="relative flex flex-col min-h-screen lg:min-h-0">
          <div className="dot-grid absolute inset-0 opacity-45 pointer-events-none" />

          {/* Top nav */}
          <nav className="relative z-10 flex items-center justify-between px-8 md:px-12 py-6 border-b border-neutral-100">
            <Link
              href="/login"
              className="group flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
            >
              <ArrowLeft
                size={14}
                strokeWidth={2}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              />
              <span
                className="font-bold tracking-[0.14em] uppercase"
                style={{ fontSize: "0.7rem" }}
              >
                Return to Login
              </span>
            </Link>

            {/* Mobile brand */}
            <Link href="/" className="lg:hidden flex flex-col items-end">
              <span
                className="font-black tracking-[0.2em] uppercase text-neutral-900 leading-none"
                style={{ fontSize: "1rem" }}
              >
                SULUX
              </span>
              <span
                className="text-neutral-400 font-bold tracking-[0.4em] uppercase"
                style={{ fontSize: "0.4rem" }}
              >
                CENTRE
              </span>
            </Link>
          </nav>

          {/* Content */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-12 py-16">
            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                {/* ── REQUEST STATE ── */}
                {state === "request" && (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.55, ease: E }}
                  >
                    {/* Heading */}
                    <div className="mb-9">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-5 h-px bg-neutral-400" />
                        <span
                          className="text-neutral-600 font-bold tracking-[0.28em] uppercase"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Password Recovery
                        </span>
                      </div>

                      <div className="overflow-hidden mb-3">
                        <motion.h1
                          initial={{ y: "108%", skewY: 2 }}
                          animate={{ y: 0, skewY: 0 }}
                          transition={{ duration: 0.85, delay: 0.1, ease: E }}
                          className="font-light leading-[0.88] text-neutral-900"
                          style={{
                            fontFamily:
                              "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                            fontSize: "clamp(2rem,5vw,3rem)",
                          }}
                        >
                          Forgot your
                          <br />
                          <em className="italic text-neutral-400 font-normal">
                            <span className="text-red-700">password?</span>
                          </em>
                        </motion.h1>
                      </div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.45, ease: E }}
                        className="text-neutral-600 font-light italic"
                        style={{
                          fontSize: "1rem",
                          fontFamily:
                            "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                        }}
                      >
                        Enter your email and we'll send recovery instructions.
                      </motion.p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[0.8rem] font-black tracking-[0.22em] uppercase text-neutral-700 mb-2">
                          Registered Email{" "}
                          <span className="text-neutral-300">*</span>
                        </label>
                        <div className="relative">
                          <Mail
                            size={14}
                            strokeWidth={1.6}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                          />
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                            }}
                            className="inp w-full border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3.5 text-neutral-900 font-medium"
                            style={{ fontSize: "0.84rem" }}
                          />
                        </div>
                        {error && (
                          <p
                            className="mt-2 text-red-500 font-semibold"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {error}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-sub w-full bg-neutral-900 text-white font-black py-4 flex items-center justify-center gap-3"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.24em" }}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="rgba(255,255,255,0.25)"
                                strokeWidth="2.5"
                              />
                              <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            SENDING…
                          </>
                        ) : (
                          <>
                            SEND RECOVERY LINK
                            <ArrowRight size={13} strokeWidth={2.2} />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-neutral-100" />
                        <span
                          className="text-neutral-300 font-medium"
                          style={{
                            fontSize: "0.58rem",
                            letterSpacing: "0.1em",
                          }}
                        >
                          OR
                        </span>
                        <div className="flex-1 h-px bg-neutral-100" />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <Link
                          href="/login"
                          className="flex-1 border border-neutral-200 text-neutral-600 font-black py-3 text-center hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200"
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.18em",
                          }}
                        >
                          SIGN IN
                        </Link>
                        <Link
                          href="/register"
                          className="flex-1 border border-neutral-200 text-neutral-600 font-black py-3 text-center hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200"
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.18em",
                          }}
                        >
                          CREATE ACCOUNT
                        </Link>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ── SUCCESS STATE ── */}
                {state === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.55, ease: E }}
                    className="text-center"
                  >
                    {/* Check icon */}
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: E }}
                      className="w-16 h-16 bg-neutral-900 flex items-center justify-center mx-auto mb-8"
                    >
                      <Check
                        size={24}
                        strokeWidth={2.5}
                        className="text-white"
                      />
                    </motion.div>

                    <div className="overflow-hidden mb-3">
                      <motion.h2
                        initial={{ y: "108%", skewY: 2 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 0.85, delay: 0.2, ease: E }}
                        className="font-light leading-[0.9] text-neutral-900"
                        style={{
                          fontFamily:
                            "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                          fontSize: "clamp(1.8rem,5vw,2.8rem)",
                        }}
                      >
                        Link sent
                        <br />
                        <em className="italic text-neutral-400 font-normal">
                          successfully.
                        </em>
                      </motion.h2>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.5, ease: E }}
                      className="text-neutral-400 font-light italic leading-relaxed mb-8"
                      style={{
                        fontSize: "0.9rem",
                        fontFamily:
                          "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                      }}
                    >
                      If an account exists for{" "}
                      <span className="text-neutral-900 font-semibold not-italic">
                        {email}
                      </span>
                      , a recovery link has been dispatched. Please check your
                      inbox.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.65, ease: E }}
                      className="flex flex-col gap-3"
                    >
                      {/* Back to login — primary */}
                      <Link
                        href="/login"
                        className="btn-sub w-full bg-neutral-900 text-white font-black py-4 flex items-center justify-center gap-3"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.24em" }}
                      >
                        BACK TO SIGN IN
                        <ArrowRight size={13} strokeWidth={2.2} />
                      </Link>

                      {/* Resend — ghost */}
                      <button
                        onClick={() => {
                          setState("request");
                          setEmail("");
                        }}
                        className="w-full border border-neutral-200 text-neutral-500 font-black py-3.5 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                      >
                        TRY A DIFFERENT EMAIL
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-neutral-100 px-8 md:px-12 py-4 bg-neutral-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p
                className="text-neutral-600 font-medium"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                © {new Date().getFullYear()} SULUX CENTRE · ALL RIGHTS RESERVED
              </p>
              <div className="flex items-center gap-4">
                {["Privacy", "Terms", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
