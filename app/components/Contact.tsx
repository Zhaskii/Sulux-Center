"use client";

import contactBG from "@/app/assets/contact.jpg";
import { FadeIn, FadeUp, SlideIn } from "@/app/components/ScrollAnimation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// ── Data ──────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    Icon: MapPin,
    label: "Our Boutique",
    primary: "New Road, Kathmandu",
    secondary: "Nepal — 44600",
    href: "https://maps.google.com/?q=New+Road+Kathmandu",
  },
  {
    Icon: Phone,
    label: "Telephone",
    primary: "+977 01-XXXXXXX",
    secondary: "Available during store hours",
    href: "tel:+97701XXXXXXX",
  },
  {
    Icon: Mail,
    label: "Email",
    primary: "info@suluxcentre.com",
    secondary: "We reply within 24 hours",
    href: "mailto:info@suluxcentre.com",
  },
  {
    Icon: Clock,
    label: "Store Hours",
    primary: "Sun – Fri: 10AM – 7PM",
    secondary: "Saturday: 11AM – 5PM",
    href: null,
  },
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Watch Purchase",
  "Trade-In Programme",
  "Watch Servicing",
  "Book a Private Viewing",
  "Corporate / Gifting",
];

const BRANDS = [
  "Rolex",
  "Omega",
  "IWC",
  "Breitling",
  "TAG Heuer",
  "Patek Philippe",
  "Tudor",
  "Seiko",
  "Other",
];

// ── SplitHeading (fixed, no overflow clip) ────────────────────

function SplitHeading({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className ?? ""}`}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            paddingBottom: "0.1em",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginRight: "0.22em",
            lineHeight: "1.1",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "102%", skewY: 2 }}
            whileInView={{ y: "0%", skewY: 0 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    brand: "",
    message: "",
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((p) => ({
      ...p,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800)); // simulate API
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="bg-[#0a0a09] text-white selection:bg-white selection:text-black overflow-x-hidden">
      <style>{`
        /* Grain */
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.022;pointer-events:none;z-index:3;
          animation:grainA 0.8s steps(2) infinite;
        }
        @keyframes grainA {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)}
          40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)}
        }

        /* Dot grid */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.038) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Form inputs */
        .form-field {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          transition: border-color 0.25s ease, background 0.25s ease;
          outline: none;
          width: 100%;
          font-family: inherit;
        }
        .form-field:focus {
          border-color: rgba(255,255,255,0.35) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        .form-field::placeholder { color: rgba(255,255,255,0.22); }
        .form-field option { background: #111; color: white; }

        /* Select arrow */
        .form-select { appearance: none; }

        /* Submit button */
        .btn-submit { transition: all 0.25s ease; }
        .btn-submit:hover:not(:disabled) { background: rgba(255,255,255,0.9) !important; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(255,255,255,0.1); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Contact card */
        .contact-card { transition: border-color 0.3s ease, background 0.3s ease; }
        .contact-card:hover { border-color: rgba(255,255,255,0.2) !important; background: rgba(255,255,255,0.04) !important; }

        /* Checkbox */
        .custom-check {
          appearance: none;
          width: 16px; height: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
          position: relative;
        }
        .custom-check:checked {
          background: white;
          border-color: white;
        }
        .custom-check:checked::after {
          content: '';
          position: absolute;
          top: 2px; left: 5px;
          width: 4px; height: 8px;
          border: 2px solid #0a0a09;
          border-top: none; border-left: none;
          transform: rotate(45deg);
        }

        /* Success checkmark */
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        .check-draw { stroke-dasharray: 100; animation: checkDraw 0.6s ease forwards 0.3s; }
      `}</style>

      <div className="grain pointer-events-none" />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] flex flex-col justify-end overflow-hidden border-b border-white/[0.06]">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src={contactBG}
            alt="Sulux Centre boutique"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a09]/60 via-transparent to-[#0a0a09]" />
        </div>

        <div className="dot-grid absolute inset-0 pointer-events-none opacity-50" />

        {/* Monogram watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
          aria-hidden
        >
          <span
            className="font-black text-white/[0.03]"
            style={{ fontSize: "16rem", letterSpacing: "-0.06em" }}
          >
            SC
          </span>
        </div>

        <div className="relative z-10 px-8 md:px-14 xl:px-20 pt-32 pb-16">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-white/30" />
              <span
                className="text-white/50 font-bold tracking-[0.32em] uppercase"
                style={{ fontSize: "0.8rem" }}
              >
                Get in Touch
              </span>
            </div>
          </FadeIn>

          <h1
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
            }}
            className="font-light leading-[0.9] mb-6"
          >
            <SplitHeading text="Let's Talk" delay={0.2} />
            <br />
            <SplitHeading
              text="Timepieces."
              delay={0.38}
              className="italic text-white/45 font-normal"
            />
          </h1>

          <FadeUp delay={0.7}>
            <p
              className="text-white/40 font-light italic max-w-md leading-relaxed"
              style={{
                fontSize: "1.02rem",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
              }}
            >
              Whether you're looking for your first luxury watch or a rare
              collector's piece — our experts are here to guide you every step
              of the way.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT INFO GRID
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CONTACT_INFO.map(
              ({ Icon, label, primary, secondary, href }, i) => {
                const inner = (
                  <div className="contact-card border border-white/[0.07] bg-white/[0.01] p-6 h-full">
                    <div className="w-9 h-9 border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5 flex-shrink-0">
                      <Icon
                        size={15}
                        strokeWidth={1.4}
                        className="text-white/40"
                      />
                    </div>
                    <p
                      className="text-white/28 font-black tracking-[0.24em] uppercase mb-2"
                      style={{ fontSize: "0.44rem" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-white font-semibold leading-snug mb-1"
                      style={{ fontSize: "0.82rem" }}
                    >
                      {primary}
                    </p>
                    <p
                      className="text-white/35 font-light"
                      style={{ fontSize: "0.68rem" }}
                    >
                      {secondary}
                    </p>
                  </div>
                );

                return (
                  <FadeUp key={label} delay={i * 0.08}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="block h-full"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </FadeUp>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORM + MAP SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* ── LEFT: Form ── */}
          <div>
            <SlideIn from="left" delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-white/30" />
                <span
                  className="text-white/30 font-bold tracking-[0.3em] uppercase"
                  style={{ fontSize: "0.5rem" }}
                >
                  Send a Message
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
                className="font-light leading-tight mb-10"
              >
                <SplitHeading text="We'd love to hear" delay={0.05} />
                <br />
                <SplitHeading
                  text="from you."
                  delay={0.2}
                  className="italic text-white/45 font-normal"
                />
              </h2>
            </SlideIn>

            {submitted ? (
              /* ── Success state ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/10 bg-white/[0.03] p-10 text-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 h-14 mx-auto mb-6"
                  fill="none"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />
                  <path
                    className="check-draw"
                    d="M18 33 L28 43 L46 24"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3
                  className="font-black text-white mb-3 tracking-wide"
                  style={{ fontSize: "1.1rem" }}
                >
                  Message Received
                </h3>
                <p
                  className="text-white/40 font-light italic mb-8"
                  style={{
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                  }}
                >
                  Thank you for reaching out. One of our horological experts
                  will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      enquiryType: "",
                      brand: "",
                      message: "",
                      newsletter: false,
                    });
                  }}
                  className="border border-white/15 text-white/45 hover:border-white/35 hover:text-white font-bold px-7 py-3 transition-all duration-250"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "firstName",
                      label: "First Name",
                      placeholder: "Rajan",
                    },
                    {
                      name: "lastName",
                      label: "Last Name",
                      placeholder: "Shrestha",
                    },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label
                        className="block text-white/35 font-bold tracking-[0.2em] uppercase mb-2"
                        style={{ fontSize: "0.46rem" }}
                      >
                        {label} <span className="text-white/20">*</span>
                      </label>
                      <input
                        name={name}
                        type="text"
                        required
                        placeholder={placeholder}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        className="form-field px-4 py-3.5"
                        style={{ fontSize: "0.82rem" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      name: "email",
                      label: "Email Address",
                      placeholder: "you@example.com",
                      type: "email",
                      required: true,
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      placeholder: "+977 98XXXXXXXX",
                      type: "tel",
                      required: false,
                    },
                  ].map(({ name, label, placeholder, type, required }) => (
                    <div key={name}>
                      <label
                        className="block text-white/35 font-bold tracking-[0.2em] uppercase mb-2"
                        style={{ fontSize: "0.46rem" }}
                      >
                        {label}{" "}
                        {required && <span className="text-white/20">*</span>}
                      </label>
                      <input
                        name={name}
                        type={type}
                        required={required}
                        placeholder={placeholder}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-field px-4 py-3.5"
                        style={{ fontSize: "0.82rem" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Enquiry type + Brand */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Enquiry type */}
                  <div>
                    <label
                      className="block text-white/35 font-bold tracking-[0.2em] uppercase mb-2"
                      style={{ fontSize: "0.46rem" }}
                    >
                      Enquiry Type <span className="text-white/20">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="enquiryType"
                        required
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="form-field form-select px-4 py-3.5 pr-10"
                        style={{ fontSize: "0.82rem" }}
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Brand of interest */}
                  <div>
                    <label
                      className="block text-white/35 font-bold tracking-[0.2em] uppercase mb-2"
                      style={{ fontSize: "0.46rem" }}
                    >
                      Brand of Interest
                    </label>
                    <div className="relative">
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="form-field form-select px-4 py-3.5 pr-10"
                        style={{ fontSize: "0.82rem" }}
                      >
                        <option value="">Any / Not sure</option>
                        {BRANDS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-white/35 font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ fontSize: "0.46rem" }}
                  >
                    Your Message <span className="text-white/20">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you're looking for, your budget, or any questions you have…"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-field px-4 py-3.5 resize-none"
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>

                {/* Newsletter checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="newsletter"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="custom-check mt-0.5"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-white/35 font-light cursor-pointer leading-relaxed"
                    style={{ fontSize: "0.72rem" }}
                  >
                    Keep me updated on new arrivals, exclusive events and
                    curated collections.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-submit w-full flex items-center justify-center gap-3 bg-white text-black font-black py-4 mt-2"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(0,0,0,0.2)"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="black"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      SENDING…
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} />
                      SEND MESSAGE
                    </>
                  )}
                </button>

                <p
                  className="text-white/18 font-light text-center"
                  style={{ fontSize: "0.6rem" }}
                >
                  Your information is kept confidential. We never share your
                  details.
                </p>
              </form>
            )}
          </div>

          {/* ── RIGHT: Map + Info ── */}
          <SlideIn from="right" delay={0.15}>
            <div className="space-y-6 sticky top-24">
              {/* Map placeholder */}
              <div
                className="relative overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: "4/3" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.236797848381!2d85.31455687568216!3d27.709974125375208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b2448ec775%3A0xf7c42b4d7ff182de!2sSulux%20Centre!5e0!3m2!1sen!2sus!4v1778479577112!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 contrast-125 opacity-60"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sulux Centre location"
                />

                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/30 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/30 pointer-events-none" />
              </div>

              {/* Directions link */}
              <a
                href="https://maps.app.goo.gl/p3iXQQVVdfNpR2CbA"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] px-5 py-4 transition-all duration-250"
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    size={15}
                    strokeWidth={1.4}
                    className="text-white/35"
                  />
                  <div>
                    <p
                      className="text-white font-semibold"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Get Directions
                    </p>
                    <p
                      className="text-white/30 font-light"
                      style={{ fontSize: "0.62rem" }}
                    >
                      Open in Google Maps
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-white/25 group-hover:text-white/55 group-hover:translate-x-1 transition-all duration-250"
                />
              </a>

              {/* What to expect */}
              <div className="border border-white/[0.07] bg-white/[0.01] p-6">
                <p
                  className="text-white/28 font-black tracking-[0.24em] uppercase mb-5"
                  style={{ fontSize: "0.44rem" }}
                >
                  What to Expect
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      text: "A personal horological consultation with our expert team",
                    },
                    {
                      step: "02",
                      text: "Hands-on time with any timepiece from our collection",
                    },
                    {
                      step: "03",
                      text: "Transparent pricing with no pressure whatsoever",
                    },
                    {
                      step: "04",
                      text: "Full authenticity documentation and warranty on purchase",
                    },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex gap-4">
                      <span
                        className="text-white/20 font-black flex-shrink-0"
                        style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                      >
                        {step}
                      </span>
                      <p
                        className="text-white/45 font-light leading-snug italic"
                        style={{
                          fontSize: "0.82rem",
                          fontFamily: "var(--font-cormorant, Georgia, serif)",
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+97701XXXXXXX"
                  className="group flex items-center gap-2.5 border border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] px-4 py-3.5 transition-all duration-250"
                >
                  <Phone
                    size={13}
                    strokeWidth={1.4}
                    className="text-white/30 flex-shrink-0"
                  />
                  <div>
                    <p
                      className="text-white font-semibold"
                      style={{ fontSize: "0.68rem" }}
                    >
                      Call Us
                    </p>
                    <p
                      className="text-white/25 font-light"
                      style={{ fontSize: "0.55rem" }}
                    >
                      +977 01-XXXXXXX
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:info@suluxcentre.com"
                  className="group flex items-center gap-2.5 border border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] px-4 py-3.5 transition-all duration-250"
                >
                  <Mail
                    size={13}
                    strokeWidth={1.4}
                    className="text-white/30 flex-shrink-0"
                  />
                  <div>
                    <p
                      className="text-white font-semibold"
                      style={{ fontSize: "0.68rem" }}
                    >
                      Email
                    </p>
                    <p
                      className="text-white/25 font-light"
                      style={{ fontSize: "0.55rem" }}
                    >
                      info@suluxcentre.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA — private viewing
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <FadeUp delay={0}>
              <div>
                <p
                  className="text-white/25 font-bold tracking-[0.28em] uppercase mb-2"
                  style={{ fontSize: "0.48rem" }}
                >
                  Prefer in person?
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  }}
                  className="font-light text-white leading-tight"
                >
                  Book a private viewing at our boutique.
                </h3>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/shop"
                  className="group flex items-center justify-center gap-3 bg-white text-black font-black px-8 py-4 hover:bg-white/88 hover:-translate-y-0.5 transition-all duration-250"
                  style={{ fontSize: "0.63rem", letterSpacing: "0.2em" }}
                >
                  BROWSE COLLECTION
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </Link>
                <Link
                  href="#top"
                  className="flex items-center justify-center border border-white/15 text-white/45 hover:border-white/35 hover:text-white font-bold px-8 py-4 transition-all duration-250"
                  style={{ fontSize: "0.63rem", letterSpacing: "0.18em" }}
                >
                  BOOK ONLINE ↑
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}
