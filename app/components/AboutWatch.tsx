"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Droplets,
  Package,
  RotateCcw,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";
import {
  FadeUp,
  SlideIn,
  ScaleIn,
  Stagger,
  staggerChild,
  LineReveal,
  NumberCount,
  ease,
} from "@/app/components/ScrollAnimation";

const FEATURES = [
  { Icon: Package, label: "Free Delivery", sub: "Across Nepal" },
  { Icon: Droplets, label: "Waterproof", sub: "Up to 100m" },
  { Icon: RotateCcw, label: "14-Day Returns", sub: "No questions asked" },
  { Icon: Shield, label: "Authenticated", sub: "100% Guaranteed" },
  { Icon: Clock, label: "5-Year Warranty", sub: "Movement guaranteed" },
  { Icon: Award, label: "Official Retailer", sub: "Est. 1983" },
];

const SECTIONS = [
  {
    id: "01",
    label: "CRAFTSMANSHIP",
    title: "Timeless\nElegance",
    description:
      "Sulux Center watches embody timeless elegance in its purest form. Flawless craftsmanship, exquisite materials and minimalist design combine to produce a subtle sophistication that transcends every trend.",
    highlight: "1,200 hours of hand-finishing per timepiece.",
    image:
      "https://images.unsplash.com/photo-1700471299386-7a84be5cd423?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imagePosition: "right",
  },
  {
    id: "02",
    label: "ENGINEERING",
    title: "Built for\nthe Deep",
    description:
      "Outstanding functionality through precision-engineered sealing technology. Sulux Center watches are optimally protected against water ingress — companion you can wear from the boardroom to the ocean floor.",
    highlight: "Waterproof to 100 metres. Certified.",
    image:
      "https://images.unsplash.com/photo-1586371376916-dabc37b0a87e?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imagePosition: "left",
  },
  {
    id: "03",
    label: "VERSATILITY",
    title: "Every\nOccasion",
    description:
      "True all-rounders in style and substance. With minimalist design and impeccable workmanship, Sulux Center timepieces fit seamlessly into any wardrobe — as at home at a board meeting as at a black-tie gala.",
    highlight: "One watch. A lifetime of occasions.",
    image:
      "https://images.unsplash.com/photo-1624124834665-eecde7bf50e7?q=80&w=1044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imagePosition: "right",
  },
];

function AnimatedHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={className}>
      {text.split("\n").map((line, li) => (
        <div key={li} className="overflow-hidden block">
          <motion.span
            className="block"
            initial={{ y: "110%", skewY: 3 }}
            animate={inView ? { y: 0, skewY: 0 } : {}}
            transition={{ duration: 1, delay: li * 0.12, ease: ease.out }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function FeatureSection({
  section,
  index,
}: {
  section: (typeof SECTIONS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = section.imagePosition === "left";
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden"
    >
      {/* TEXT */}
      <div
        className={`relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 xl:px-24 py-24 ${isLeft ? "md:order-2" : "md:order-1"}`}
      >
        <div
          className="absolute pointer-events-none select-none"
          aria-hidden
          style={{
            fontSize: "clamp(8rem, 16vw, 18rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
            right: isLeft ? "auto" : "-2rem",
            left: isLeft ? "-2rem" : "auto",
            top: "50%",
            transform: "translateY(-50%)",
            letterSpacing: "-0.06em",
          }}
        >
          {section.id}
        </div>

        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
        >
          <div className="w-5 h-px bg-white/30" />
          <span
            className="text-white/35 font-bold tracking-[0.32em] uppercase"
            style={{ fontSize: "1rem" }}
          >
            {section.label}
          </span>
          <span
            className="text-white/15 font-mono ml-auto"
            style={{ fontSize: "0.6rem" }}
          >
            {section.id} / 03
          </span>
        </motion.div>

        <AnimatedHeading
          text={section.title}
          className="font-light leading-[0.9] mb-8 text-white text-[40px] sm:text-[60px] md:text-[80px] lg:text-[80px]"
          // style applied via global cormorant class
        />

        <motion.p
          className="text-white/45 font-light leading-relaxed mb-8 max-w-md italic"
          style={{
            fontSize: "0.97rem",
            fontFamily: "var(--font-cormorant, Georgia, serif)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: ease.out }}
        >
          {section.description}
        </motion.p>

        <motion.div
          className="border-l-2 border-white/20 pl-5 mb-10"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: ease.out }}
        >
          <p
            className="text-white/60 font-semibold tracking-wide"
            style={{ fontSize: "0.78rem" }}
          >
            {section.highlight}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: ease.out }}
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-white/50 hover:text-white border-b border-white/15 hover:border-white/45 pb-1 transition-all duration-300"
            style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}
          >
            <span className="font-bold tracking-widest uppercase">
              Explore Collection
            </span>
            <ArrowRight
              size={13}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300"
            />
          </Link>
        </motion.div>

        <div className="absolute bottom-8 left-8 md:left-16 xl:left-24 flex items-center gap-3">
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                height: "2px",
                width: i === index ? "28px" : "8px",
                background:
                  i === index
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.12)",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div
        className={`relative w-full md:w-1/2 min-h-[55vw] md:min-h-0 overflow-hidden ${isLeft ? "md:order-1" : "md:order-2"}`}
      >
        <motion.div
          ref={imgRef}
          style={{ y: imgY }}
          className="absolute inset-[-8%] w-[116%] h-[116%]"
        >
          {/* Reveal mask */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a09] z-10 origin-left"
            initial={{ scaleX: 1 }}
            animate={inView ? { scaleX: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: ease.out }}
          />
          <motion.img
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.25, ease: ease.out }}
          />
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isLeft
              ? "linear-gradient(to right, rgba(10,10,9,0.7) 0%, transparent 50%)"
              : "linear-gradient(to left, rgba(10,10,9,0.7) 0%, transparent 50%)",
          }}
        />
        <motion.div
          className="absolute bottom-8 right-8 text-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p
            className="text-white/20 font-bold tracking-[0.28em] uppercase"
            style={{ fontSize: "0.46rem" }}
          >
            {section.label}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutWatch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a09] text-white selection:bg-white selection:text-black"
    >
      <style>{`
        .display-heading { font-family: var(--font-display); font-size: clamp(3.5rem, 8vw, 7rem); }
        .dot-grid { background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 28px 28px; }
        .feat-icon:hover { border-color: rgba(255,255,255,0.35)!important; }
        .feat-icon { transition: all 0.25s ease; }
        .btn-black:hover { background:#222!important; transform:translateY(-2px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .btn-black { transition: all 0.25s ease; }
        .about-img:hover img { transform: scale(1.03); }
        .about-img img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .grain::after { content:'';position:fixed;inset:-200%;width:400%;height:400%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.022;pointer-events:none;z-index:5;animation:grainMove 0.8s steps(2) infinite; }
        @keyframes grainMove { 0%,100%{transform:translate(0,0)} 20%{transform:translate(3%,2%)} 40%{transform:translate(-2%,4%)} 60%{transform:translate(2%,-2%)} 80%{transform:translate(-3%,1%)} }
      `}</style>
      <div className="grain pointer-events-none" />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-white/[0.06]">
        <motion.div
          className="h-full bg-white/50"
          style={{ width: progressWidth }}
        />
      </div>

      {/* FEATURES BAR */}
      <div ref={featRef} className="dot-grid border-b border-white/[0.06]">
        <div className="px-8 md:px-16 py-14 max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between gap-8">
            {FEATURES.map(({ Icon, label, sub }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, y: 20 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.08, ease: ease.out }}
              >
                <div className="feat-icon w-11 h-11 border border-white/12 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                  <Icon
                    size={16}
                    strokeWidth={1.4}
                    className="text-white/40 group-hover:text-white/70 transition-colors duration-200"
                  />
                </div>
                <div>
                  <p
                    className="text-white font-bold tracking-wide"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-white/30 font-light"
                    style={{ fontSize: "0.62rem" }}
                  >
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <FadeUp className="px-8 md:px-16 py-10 border-b border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-6 h-px bg-white/25" />
          <span
            className="text-white font-bold tracking-[0.3em] uppercase"
            style={{ fontSize: "2rem" }}
          >
            Why Sulux?
          </span>
        </div>
        <span
          className="text-white/55 font-light"
          style={{ fontSize: "2rem", letterSpacing: "0.12em" }}
        >
          Three reasons to choose us
        </span>
      </FadeUp>

      {/* FEATURE SECTIONS */}
      {SECTIONS.map((section, i) => (
        <FeatureSection key={section.id} section={section} index={i} />
      ))}

      {/* ABOUT — white section */}
      <section className="bg-white text-black relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative px-8 md:px-16 xl:px-24 py-28 max-w-7xl mx-auto">
          <FadeUp className="flex items-center gap-4 mb-6">
            <div className="w-6 h-px bg-black/30" />
            <span
              className="text-black font-bold tracking-[0.3em] uppercase"
              style={{ fontSize: "2rem" }}
            >
              About Sulux Center
            </span>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Image with reveal mask */}
            <SlideIn from="left" delay={0.1}>
              <div
                className="about-img relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                {/* Slide-away reveal mask */}
                {(() => {
                  const maskRef = useRef(null);
                  const maskInView = useInView(maskRef, {
                    once: true,
                    margin: "-80px",
                  });
                  return (
                    <div
                      ref={maskRef}
                      className="absolute inset-0 overflow-hidden"
                      style={{ zIndex: 2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white origin-left"
                        initial={{ scaleX: 1 }}
                        animate={maskInView ? { scaleX: 0 } : {}}
                        transition={{
                          duration: 1.0,
                          delay: 0.15,
                          ease: ease.out,
                        }}
                      />
                    </div>
                  );
                })()}
                <div className="absolute inset-0 z-0">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src="/mp4/Crafting-Watch.mp4" type="video/mp4" />
                  </video>
                  <div className="vignette absolute inset-0" />
                  {/* Bottom fade to black */}
                  <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
                {/* <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-black/20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-black/20 pointer-events-none" /> */}
                <div className="absolute bottom-8 left-8 bg-black text-white px-5 py-3">
                  <p
                    className="font-black tracking-widest"
                    style={{ fontSize: "0.55rem" }}
                  >
                    EST.
                  </p>
                  <p
                    className="font-black leading-none"
                    style={{ fontSize: "1.8rem", letterSpacing: "-0.02em" }}
                  >
                    1983
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Copy */}
            <SlideIn from="right" delay={0.2}>
              <AnimatedHeading
                text={"Crafted\nwith Purpose"}
                className="display-heading font-light leading-[0.9] mb-8 text-black"
              />
              <FadeUp delay={0.35}>
                <p
                  className="text-black/55 font-light leading-relaxed mb-8 italic"
                  style={{
                    fontSize: "1.05rem",
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                  }}
                >
                  At Sulux Centre, luxury is more than owning a watch. It is
                  about carrying a legacy of precision, sophistication, and
                  timeless style. As Nepal’s premier destination for authentic
                  Swiss timepieces, Sulux Centre brings together world-renowned
                  craftsmanship, refined design, and a passion for excellence.
                  Every watch reflects confidence, ambition, and individuality,
                  created for those who value elegance that endures beyond
                  trends.
                </p>
              </FadeUp>

              {/* Stats — counting numbers */}
              <FadeUp
                delay={0.45}
                className="flex items-stretch gap-0 mb-10 border-t border-b border-black/[0.08] py-6"
              >
                {[
                  { v: "40+", l: "Years" },
                  { v: "2000+", l: "Timepieces" },
                  { v: "100%", l: "Authenticated" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className={`flex-1 text-center ${i > 0 ? "border-l border-black/[0.08]" : ""}`}
                  >
                    <NumberCount
                      value={s.v}
                      delay={0.5 + i * 0.12}
                      className="font-black text-black leading-none block text-[24px]"
                    />
                    <p
                      className="text-black/35 font-semibold tracking-[0.18em] uppercase mt-1"
                      style={{ fontSize: "0.44rem" }}
                    >
                      {s.l}
                    </p>
                  </div>
                ))}
              </FadeUp>

              <FadeUp
                delay={0.55}
                className="flex items-center gap-4 flex-wrap"
              >
                <Link
                  href="/about"
                  className="btn-black inline-flex items-center gap-3 bg-black text-white font-black px-8 py-4 tracking-[0.2em] uppercase group"
                  style={{ fontSize: "0.65rem" }}
                >
                  Our Story{" "}
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </Link>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 text-black/50 hover:text-black font-semibold tracking-[0.18em] uppercase border-b border-black/15 hover:border-black/45 pb-0.5 transition-all duration-300"
                  style={{ fontSize: "0.65rem" }}
                >
                  Shop Now{" "}
                  <ArrowRight
                    size={13}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </FadeUp>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <FadeUp className="bg-[#0a0a09] border-t border-white/[0.06] px-8 md:px-16 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p
              className="text-white/25 font-bold tracking-[0.28em] uppercase mb-2"
              style={{ fontSize: "0.5rem" }}
            >
              Ready to find yours?
            </p>
            <h3
              className="font-light text-white"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
              }}
            >
              Visit our boutique in{" "}
              <em className="italic text-white/50">Kathmandu</em>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="btn-black flex items-center gap-3 bg-white text-black font-black px-8 py-4 group"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              Shop Online{" "}
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/contact"
              className="border border-white/15 text-white/45 hover:border-white/40 hover:text-white font-bold px-8 py-4 transition-all duration-250"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              BOOK VISIT
            </Link>
          </div>
        </div>
      </FadeUp>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
