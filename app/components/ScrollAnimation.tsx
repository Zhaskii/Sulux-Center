// ─────────────────────────────────────────────────────────────────────────────
// scroll-animations.tsx
// Shared scroll-reveal primitives used across all homepage sections.
// All animations use framer-motion with spring/ease presets for a
// premium, editorial feel.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants, HTMLMotionProps } from "framer-motion";

// ── Easing presets ─────────────────────────────────────────────────────────
export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // expo out — snappy, refined
  inOut: [0.4, 0, 0.2, 1] as const, // material standard
  spring: { type: "spring", damping: 24, stiffness: 220 },
};

// ── Shared viewport options ─────────────────────────────────────────────────
const VIEW: any = { once: true, margin: "-80px 0px" };

// ─────────────────────────────────────────────────────────────────────────────
// 1. FadeUp  — the workhorse: fades + rises into view
// ─────────────────────────────────────────────────────────────────────────────
interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  distance?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeUp({
  delay = 0,
  distance = 28,
  duration = 0.8,
  children,
  ...rest
}: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. FadeIn  — pure opacity, no movement
// ─────────────────────────────────────────────────────────────────────────────
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}
export function FadeIn({
  delay = 0,
  duration = 0.7,
  children,
  ...rest
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SlideIn — slides in from left or right
// ─────────────────────────────────────────────────────────────────────────────
interface SlideInProps extends HTMLMotionProps<"div"> {
  from?: "left" | "right";
  delay?: number;
  distance?: number;
  duration?: number;
  children: React.ReactNode;
}
export function SlideIn({
  from = "left",
  delay = 0,
  distance = 40,
  duration = 0.9,
  children,
  ...rest
}: SlideInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  const x = from === "left" ? -distance : distance;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ScaleIn — scales up from slightly smaller
// ─────────────────────────────────────────────────────────────────────────────
interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  from?: number;
  duration?: number;
  children: React.ReactNode;
}
export function ScaleIn({
  delay = 0,
  from = 0.92,
  duration = 0.9,
  children,
  ...rest
}: ScaleInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Stagger — wraps children in a staggered container
//    Children should be motion.div or any motion element
// ─────────────────────────────────────────────────────────────────────────────
interface StaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  childDelay?: number;
  children: React.ReactNode;
}
const staggerVariants: Variants = {
  hidden: {},
  show: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};
const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({
  staggerDelay = 0.1,
  childDelay = 0,
  children,
  ...rest
}: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <motion.div
      ref={ref}
      variants={staggerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={staggerDelay}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { staggerChildVariants as staggerChild };

// ─────────────────────────────────────────────────────────────────────────────
// 6. LineReveal — a horizontal line that expands from left
// ─────────────────────────────────────────────────────────────────────────────
interface LineRevealProps {
  delay?: number;
  duration?: number;
  className?: string;
}
export function LineReveal({
  delay = 0,
  duration = 1.1,
  className = "",
}: LineRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <motion.div
      ref={ref}
      className={`h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration, delay, ease: ease.out }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. NumberCount — animates a number counting up
// ─────────────────────────────────────────────────────────────────────────────
interface NumberCountProps {
  value: string; // e.g. "40+" or "100%"
  delay?: number;
  className?: string;
}
export function NumberCount({
  value,
  delay = 0,
  className = "",
}: NumberCountProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  const num = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {inView ? (
        <motion.span>
          {/* Count up using a single counter motion value */}
          <CountUp to={num} suffix={suffix} delay={delay} />
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

function CountUp({
  to,
  suffix,
  delay,
}: {
  to: number;
  suffix: string;
  delay: number;
}) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const start = Date.now() + delay * 1000;
    const duration = 1200;
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. RevealImage — image that reveals with a sliding mask
// ─────────────────────────────────────────────────────────────────────────────
interface RevealImageProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}
export function RevealImage({
  src,
  alt,
  delay = 0,
  className = "",
  imgClassName = "",
  style,
}: RevealImageProps) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Slide-away mask */}
      <motion.div
        className="absolute inset-0 bg-neutral-900 origin-left z-10"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: ease.out }}
      />
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        initial={{ scale: 1.08 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, delay: delay + 0.05, ease: ease.out }}
      />
    </div>
  );
}
