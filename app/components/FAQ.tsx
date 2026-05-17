"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { ArrowRight, MessageCircle } from "lucide-react";
import faqBg from "@/app/assets/faqBG.jpg";

// ── Data ──────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    number: "01",
    category: "AUTHENTICITY & GUARANTEE",
    icon: "◎",
    items: [
      {
        q: "How does Sulux Centre ensure the authenticity of its timepieces?",
        a: "Every watch in our collection undergoes a rigorous multi-point inspection by our master watchmakers. We verify the movement, serial numbers, and components against manufacturer records. Each purchase is accompanied by original papers (where available) and our exclusive Sulux Certificate of Authenticity.",
      },
      {
        q: "What warranty is provided with a purchase?",
        a: "In addition to any remaining manufacturer warranty, Sulux Centre provides a comprehensive 24-month mechanical warranty. This covers the internal movement of the watch, ensuring your investment is protected by our in-house experts.",
      },
      {
        q: "Can I verify the serial number before purchasing?",
        a: "Yes. For security and transparency, we can provide blurred serial number photos upon request, or verify them in person at our Kathmandu showroom during a private viewing appointment.",
      },
    ],
  },
  {
    number: "02",
    category: "SHIPPING & TRANSACTIONS",
    icon: "◇",
    items: [
      {
        q: "Do you offer worldwide insured shipping?",
        a: "We ship globally via FedEx and DHL Express. Every shipment is fully insured for the total purchase value. A signature is required upon delivery to ensure your timepiece reaches you safely.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept secure Bank Wire Transfers, major Credit Cards (Visa, Mastercard, Amex), and verified Cryptocurrency. For local clients in Nepal, we also accept bank-certified checks at our physical location.",
      },
      {
        q: "Is there a return policy?",
        a: "We offer a 7-day inspection period for online orders. If the watch does not meet your expectations, it can be returned in its original, unworn condition for a full refund minus shipping costs.",
      },
    ],
  },
  {
    number: "03",
    category: "CARE & MAINTENANCE",
    icon: "◉",
    items: [
      {
        q: "How often should my mechanical watch be serviced?",
        a: "To maintain precision and water resistance, we recommend a full movement service every 5 to 7 years. Luxury watches are intricate machines that require fresh lubrication and seal replacements to last generations.",
      },
      {
        q: "How should I store my watch when not in use?",
        a: "We recommend storing your timepiece in a dry, room-temperature environment — preferably in a dedicated watch box or a watch winder for automatic movements. Avoid placing it near strong magnetic fields.",
      },
    ],
  },
  {
    number: "04",
    category: "TRADE-IN & SERVICES",
    icon: "◈",
    items: [
      {
        q: "Do you offer a trade-in programme?",
        a: "Yes. Bring your current timepiece to our boutique for a complimentary valuation. We offer competitive trade-in values toward the purchase of any watch in our collection.",
      },
      {
        q: "Can you service watches purchased elsewhere?",
        a: "Absolutely. Our master watchmakers service most Swiss and Japanese luxury brands, regardless of where the watch was purchased. Contact us to book a service appointment.",
      },
    ],
  },
];

// ── SplitHeading ──────────────────────────────────────────────

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

// ── Accordion Item ────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`border-b border-neutral-200 last:border-0 transition-colors duration-200 ${open ? "border-neutral-400" : ""}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        {/* Question */}
        <span
          className={`font-bold leading-snug transition-colors duration-200 ${open ? "text-neutral-900" : "text-neutral-800 group-hover:text-neutral-900"}`}
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            letterSpacing: "0.01em",
          }}
        >
          {question}
        </span>

        {/* Toggle icon */}
        <div
          className={`w-7 h-7 flex-shrink-0 border flex items-center justify-center transition-all duration-250 mt-0.5 ${open ? "bg-neutral-900 border-neutral-900" : "border-neutral-300 group-hover:border-neutral-900"}`}
        >
          {open ? (
            <MinusIcon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          ) : (
            <PlusIcon
              className="h-3.5 w-3.5 text-neutral-800"
              strokeWidth={2.5}
            />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-neutral-600 font-medium leading-relaxed pb-5 italic pr-10"
              style={{
                fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
                fontFamily: "var(--font-serif)",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main FAQ Page ─────────────────────────────────────────────

export default function FAQ() {
  const introRef = useRef(null);
  const introInV = useInView(introRef, { once: true, margin: "-60px" });

  return (
    <main className="bg-white text-neutral-900 min-h-screen antialiased">
      <style>{`
        /* Vignette - Strengthened for text readability */
        .hero-vig {
          background:
            radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.7) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,1) 100%);
        }
        /* Grain */
        .grain::after {
          content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.022;pointer-events:none;z-index:3;
          animation:grA 0.8s steps(2) infinite;
        }
        @keyframes grA {
          0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)} 40%{transform:translate(-2%,3%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)}
        }
        /* CTA hover */
        .btn-cta { transition:all 0.22s ease; }
        .btn-cta:hover { background:#333 !important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.18); }
        .btn-outline { transition:all 0.22s ease; }
        .btn-outline:hover { border-color:#111 !important; color:#111 !important; transform:translateY(-2px); }
        /* Category card hover */
        .cat-card { transition:border-color 0.28s ease, background 0.28s ease; }
        .cat-card:hover { border-color:#111 !important; background:#f9f9f9 !important; }
      `}</style>

      <div className="grain pointer-events-none" />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex flex-col justify-end overflow-hidden bg-black mt-12">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={faqBg}
            alt="Sulux Centre FAQ"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.55) contrast(1.1)" }}
            priority
          />
        </div>

        {/* Vignette */}
        <div className="hero-vig absolute inset-0 z-[1]" />

        {/* Side label */}
        <div className="absolute left-6 xl:left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4">
          <div className="w-px h-14 bg-white/25" />
          <p
            className="text-white/40 tracking-[0.35em] uppercase font-bold"
            style={{ fontSize: "0.5rem", writingMode: "vertical-rl" }}
          >
            Est. 1983 · Kathmandu
          </p>
          <div className="w-px h-14 bg-white/25" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-8 md:px-14 xl:px-20 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-px bg-white/50" />
            <span
              className="text-white/80 font-bold tracking-[0.32em] uppercase"
              style={{ fontSize: "0.6rem" }}
            >
              Sulux Centre · Horological Expertise
            </span>
          </motion.div>

          <h1
            className="font-light leading-[0.88] text-white mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 10vw, 8.5rem)",
            }}
          >
            <SplitHeading text="Frequently" delay={0.4} />
            <br className="hidden md:block" />
            <SplitHeading
              text="Asked"
              delay={0.52}
              className="italic text-white/70 font-normal"
            />{" "}
            <SplitHeading text="Questions." delay={0.64} />
          </h1>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              {
                v: String(FAQ_DATA.reduce((a, s) => a + s.items.length, 0)),
                l: "Questions answered",
              },
              { v: "4", l: "Topic categories" },
              { v: "24h", l: "Support response" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3">
                <span
                  className="font-black text-white"
                  style={{ fontSize: "1.4rem" }}
                >
                  {s.v}
                </span>
                <span
                  className="text-white/60 font-bold"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
                >
                  {s.l.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="max-w-5xl mx-auto px-8 md:px-14 py-16 md:py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={introInV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-6 h-px bg-neutral-400" />
            <span
              className="text-neutral-500 font-black tracking-[0.28em] uppercase"
              style={{ fontSize: "0.6rem" }}
            >
              Everything you need to know
            </span>
            <div className="w-6 h-px bg-neutral-400" />
          </div>

          <p
            className="italic text-neutral-700 font-medium leading-relaxed"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontFamily: "var(--font-serif)",
            }}
          >
            Discover answers to common queries regarding our curated collection
            of luxury timepieces. As specialists in{" "}
            <span className="text-neutral-900 font-bold not-italic border-b-2 border-neutral-300">
              Rolex
            </span>
            ,{" "}
            <span className="text-neutral-900 font-bold not-italic border-b-2 border-neutral-300">
              Patek Philippe
            </span>
            ,{" "}
            <span className="text-neutral-900 font-bold not-italic border-b-2 border-neutral-300">
              Omega
            </span>{" "}
            and more, we are here to guide you through every step of your
            horological journey.
          </p>
        </motion.div>

        {/* Category overview pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introInV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2 mt-10"
        >
          {FAQ_DATA.map((s) => (
            <span
              key={s.category}
              className="border border-neutral-300 text-neutral-600 font-bold tracking-[0.18em] px-4 py-2 uppercase"
              style={{ fontSize: "0.6rem" }}
            >
              {s.number} · {s.category}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 xl:px-20">
        <div className="h-px bg-neutral-200 w-full" />
      </div>

      {/* ══════════════════════════════════════════════════════
          FAQ GRID
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-14 md:gap-y-20">
          {FAQ_DATA.map((section, idx) => {
            const sectionRef = useRef(null);
            const sectionInV = useInView(sectionRef, {
              once: true,
              margin: "-60px",
            });

            return (
              <div key={idx} ref={sectionRef}>
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={sectionInV ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-2"
                >
                  <span
                    className="text-neutral-400 font-black tracking-wider"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {section.number}
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-neutral-900 font-light text-xl">
                    {section.icon}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={sectionInV ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-neutral-900 font-black tracking-[0.2em] uppercase mb-8 border-b-2 border-neutral-900 pb-4"
                  style={{ fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)" }}
                >
                  {section.category}
                </motion.h2>

                {/* Accordion items */}
                <div>
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      question={item.q}
                      answer={item.a}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50">
        {/* BG monogram */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
          aria-hidden
        >
          <span
            className="font-black text-neutral-900 leading-none"
            style={{
              fontSize: "18rem",
              letterSpacing: "-0.06em",
              opacity: 0.025,
            }}
          >
            SC
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Left: copy */}
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-neutral-500" />
                  <span
                    className="text-neutral-600 font-black tracking-[0.28em] uppercase"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Still have questions?
                  </span>
                </div>

                <h3
                  className="font-light leading-tight text-neutral-900 mb-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  }}
                >
                  Our specialists are here
                  <br />
                  <em className="italic text-neutral-500 font-normal">
                    for you.
                  </em>
                </h3>

                <p
                  className="text-neutral-700 font-medium italic leading-relaxed"
                  style={{
                    fontSize: "1rem",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  Available for private consultations at our Kathmandu showroom
                  or via our digital concierge service.
                </p>
              </motion.div>
            </div>

            {/* Right: actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto"
            >
              <Link
                href="/contact"
                className="btn-cta group flex items-center justify-between gap-6 bg-neutral-900 text-white font-black px-8 py-4 w-full md:w-auto"
                style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
              >
                <span>CONTACT OUR TEAM</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </Link>

              <Link
                href="/services/book"
                className="btn-outline group flex items-center justify-between gap-6 border border-neutral-400 text-neutral-700 font-bold px-8 py-4 w-full md:w-auto"
                style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={13} strokeWidth={1.8} />
                  BOOK CONSULTATION
                </span>
                <ArrowRight
                  size={13}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                />
              </Link>

              {/* Contact info strip */}
              <div className="border border-neutral-300 bg-white px-5 py-3.5 flex items-center gap-3 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <div>
                  <p
                    className="text-neutral-700 font-medium"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <span className="text-neutral-900 font-bold">
                      +977 01-XXXXXXX
                    </span>
                    {" · "}New Road, Kathmandu
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
