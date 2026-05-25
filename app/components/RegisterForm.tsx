"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Shield, Star, Gift } from "lucide-react";

// ── Easing ────────────────────────────────────────────────────
const E = [0.16, 1, 0.3, 1] as const;

// ── Left panel perks ──────────────────────────────────────────
const PERKS = [
  {
    Icon: Shield,
    label: "Verified Collector Status",
    sub: "Exclusive authentication badge on your profile",
  },
  {
    Icon: Star,
    label: "Priority Allocation Access",
    sub: "First access to limited & rare timepieces",
  },
  {
    Icon: Gift,
    label: "Concierge Circle",
    sub: "Curated events, insights & heritage stories",
  },
];

// ── Field config ──────────────────────────────────────────────
type FieldKey = "firstName" | "lastName" | "email" | "phone" | "password";

const FIELDS: {
  id: FieldKey;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  col?: string;
}[] = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Rajan",
    required: true,
    col: "half",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Shrestha",
    required: true,
    col: "half",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+977 98XXXXXXXX",
    required: true,
    col: "half",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "name@domain.com",
    required: true,
    col: "half",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••••••",
    required: true,
    col: "full",
  },
];

export default function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    agreeToTerms: false,
    joinConcierge: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    console.log("Register:", formData);
    setLoading(false);
  };

  return (
    <main
      className="min-h-screen bg-white text-neutral-900 antialiased overflow-x-hidden"
      style={{ fontFamily: "var(--font-body,'Barlow Condensed',sans-serif)" }}
    >
      <style>{`
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.018;pointer-events:none;z-index:0;
          animation:gr 0.8s steps(2) infinite;
        }
        @keyframes gr {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)}
          40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)}
        }
        .inp { transition:border-color 0.22s ease, background 0.22s ease; }
        .inp:focus { border-color:#111!important; background:#fff!important; outline:none; }
        .inp::placeholder { color:rgba(0,0,0,0.22); }
        .inp[type="date"]::-webkit-calendar-picker-indicator { opacity:0.3; cursor:pointer; }
        .chk {
          appearance:none; width:15px; height:15px; flex-shrink:0;
          border:1px solid #d4d4d4; background:white; cursor:pointer;
          transition:all 0.2s ease; position:relative; margin-top:2px;
        }
        .chk:checked { background:#111; border-color:#111; }
        .chk:checked::after {
          content:''; position:absolute; top:2px; left:4px;
          width:4px; height:8px;
          border:2px solid white; border-top:none; border-left:none;
          transform:rotate(45deg);
        }
        .btn-sub { transition:all 0.22s ease; }
        .btn-sub:hover:not(:disabled) { background:#333!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.2); }
        .btn-sub:disabled { opacity:0.5; cursor:not-allowed; }
        .dot-grid {
          background-image:radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px);
          background-size:26px 26px;
        }
      `}</style>

      <div className="grain pointer-events-none" />

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* ══════════════════════════════════════════════════════
            LEFT — dark image panel
        ══════════════════════════════════════════════════════ */}
        <div className="relative hidden lg:block bg-neutral-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1200&auto=format&fit=crop"
            alt="Sulux Centre timepieces"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.25) contrast(1.1) saturate(0.65)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/55 to-transparent" />
          <div className="dot-grid absolute inset-0 opacity-25 pointer-events-none" />

          {/* "SC" watermark */}
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
              className="text-white/16 tracking-[0.35em] uppercase"
              style={{ fontSize: "0.44rem", writingMode: "vertical-rl" }}
            >
              Est. 1983 · Kathmandu, Nepal
            </p>
            <div className="w-px h-16 bg-white/10" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full px-12 py-12">
            {/* Brand */}
            <Link href="/" className="group flex flex-col">
              <span
                className="text-white font-black tracking-[0.22em] uppercase leading-none"
                style={{ fontSize: "1.6rem" }}
              >
                SULUX
              </span>
              <span
                className="text-white/38 font-bold tracking-[0.5em] uppercase"
                style={{ fontSize: "0.5rem", paddingLeft: "0.1em" }}
              >
                CENTRE
              </span>
            </Link>

            {/* Centre copy */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-5 h-px bg-white/22" />
                <span
                  className="text-white/60 font-bold tracking-[0.28em] uppercase"
                  style={{ fontSize: "0.8rem" }}
                >
                  New Client Registration
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
                Join our circle
                <br />
                <em className="italic text-white/38 font-normal">
                  of <span className="text-red-700">collectors.</span>
                </em>
              </h2>
              <p
                className="text-white/60 font-light italic leading-relaxed max-w-sm"
                style={{
                  fontSize: "0.95rem",
                  fontFamily:
                    "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                }}
              >
                Create a private account and unlock exclusive privileges
                reserved for Sulux Centre's collector community.
              </p>
            </div>

            {/* Perks */}
            <div className="space-y-4 border-t border-white/[0.07] pt-8">
              {PERKS.map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={14}
                      strokeWidth={1.4}
                      className="text-white/35"
                    />
                  </div>
                  <div>
                    <p
                      className="text-white/65 font-semibold"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-white/50 font-light"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {sub}
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
        <div className="relative flex flex-col min-h-screen lg:min-h-0 overflow-y-auto">
          <div className="dot-grid absolute inset-0 opacity-45 pointer-events-none" />

          {/* Top nav */}
          <nav className="relative z-10 flex items-center justify-between px-8 md:px-12 py-6 border-b border-neutral-100 flex-shrink-0">
            <Link href="/" className="group lg:hidden">
              <div className="flex flex-col">
                <span
                  className="font-black tracking-[0.2em] uppercase text-neutral-900 leading-none"
                  style={{ fontSize: "1.1rem" }}
                >
                  SULUX
                </span>
                <span
                  className="text-neutral-400 font-bold tracking-[0.4em] uppercase"
                  style={{ fontSize: "0.42rem" }}
                >
                  CENTRE
                </span>
              </div>
            </Link>
            <span
              className="text-neutral-600 font-medium lg:ml-auto"
              style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}
            >
              New Road · Kathmandu
            </span>
          </nav>

          {/* Form area */}
          <div className="relative z-10 flex-1 flex items-start lg:items-center justify-center px-8 md:px-12 py-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: E }}
              className="w-full max-w-lg"
            >
              {/* Heading */}
              <div className="mb-9">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: E }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-5 h-px bg-neutral-400" />
                  <span
                    className="text-neutral-600 font-bold tracking-[0.28em] uppercase"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Create Account
                  </span>
                </motion.div>

                <div className="overflow-hidden mb-3">
                  <motion.h1
                    initial={{ y: "108%", skewY: 2 }}
                    animate={{ y: 0, skewY: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: E }}
                    className="font-light leading-[0.88] text-neutral-900"
                    style={{
                      fontFamily:
                        "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                      fontSize: "clamp(2rem,5vw,3rem)",
                    }}
                  >
                    Begin your
                    <br />
                    <em className="italic text-neutral-400 font-normal">
                      <span className="text-red-700">collection</span> journey.
                    </em>
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: E }}
                  className="text-neutral-600 font-light italic"
                  style={{
                    fontSize: "1rem",
                    fontFamily:
                      "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                  }}
                >
                  Your private client profile at Sulux Centre.
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fields grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map(
                    ({ id, label, type, placeholder, required, col }) => {
                      const isPassword = id === "password";
                      const isFullWidth = col === "full";

                      return (
                        <div
                          key={id}
                          className={isFullWidth ? "sm:col-span-2" : ""}
                        >
                          <label className="block text-[0.7rem] font-black tracking-[0.22em] uppercase text-neutral-600 mb-2">
                            {label}{" "}
                            {required && (
                              <span className="text-neutral-500">*</span>
                            )}
                          </label>

                          {isPassword ? (
                            <div className="relative">
                              <input
                                id={id}
                                type={showPwd ? "text" : "password"}
                                required={required}
                                placeholder={placeholder}
                                value={(formData as any)[id]}
                                onChange={handleChange}
                                className="inp w-full border border-neutral-200 bg-neutral-50 px-4 py-3.5 pr-12 text-neutral-900 font-medium tracking-widest"
                                style={{ fontSize: "0.84rem" }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                              >
                                {showPwd ? (
                                  <EyeOff size={15} strokeWidth={1.8} />
                                ) : (
                                  <Eye size={15} strokeWidth={1.8} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <input
                              id={id}
                              type={type}
                              required={required}
                              placeholder={placeholder}
                              value={(formData as any)[id]}
                              onChange={handleChange}
                              className="inp w-full border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-neutral-900 font-medium"
                              style={{ fontSize: "0.84rem" }}
                            />
                          )}
                        </div>
                      );
                    },
                  )}
                </div>

                {/* Checkboxes */}
                <div className="border-t border-neutral-100 pt-5 space-y-4">
                  {/* Concierge */}
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      id="joinConcierge"
                      type="checkbox"
                      checked={formData.joinConcierge}
                      onChange={handleChange}
                      className="chk mt-0.5"
                    />
                    <div>
                      <p
                        className="text-neutral-800 font-bold group-hover:text-neutral-900 transition-colors"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Sulux Private Concierge Circle
                      </p>
                      <p
                        className="text-neutral-600 font-light mt-0.5"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Priority allocations, heritage events and curated
                        horological acquisition insights.
                      </p>
                    </div>
                  </label>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="chk mt-0.5"
                    />
                    <p
                      className="text-neutral-600 font-light group-hover:text-neutral-800 transition-colors"
                      style={{ fontSize: "0.8rem" }}
                    >
                      I accept the{" "}
                      <Link
                        href="/policy/terms"
                        className="text-neutral-800 font-semibold border-b border-neutral-400 hover:border-neutral-900 transition-colors"
                      >
                        terms of data confidentiality
                      </Link>
                      , authentication criteria, and client guidelines of Sulux
                      Centre. <span className="text-neutral-400">*</span>
                    </p>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !formData.agreeToTerms}
                  className="btn-sub w-full bg-neutral-900 text-white font-black py-4 flex items-center justify-center gap-3 mt-2"
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
                      CREATING ACCOUNT…
                    </>
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight
                        size={13}
                        strokeWidth={2.2}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <span
                    className="text-neutral-300 font-medium"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}
                  >
                    OR
                  </span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>

                {/* Sign in link */}
                <p
                  className="text-center text-neutral-600 font-light"
                  style={{ fontSize: "0.8rem" }}
                >
                  Already have a profile?{" "}
                  <Link
                    href="/login"
                    className="text-neutral-900 font-black border-b-2 border-neutral-900 hover:border-neutral-400 hover:text-neutral-500 transition-all duration-200 pb-px ml-1"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-neutral-100 px-8 md:px-12 py-4 bg-neutral-50 flex-shrink-0">
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
