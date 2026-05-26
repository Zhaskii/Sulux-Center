"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ease = { out: [0.16, 1, 0.3, 1] as const };

interface PageLoaderProps {
  /** Pass `false` once your data/page is ready to dismiss the loader */
  loading?: boolean;
  /** Show the SULUX branding (default true) */
  branded?: boolean;
}

// ── 1. GLOBAL TRIGGER FUNCTIONS ───────────────────────────────
// Call these anywhere in your website to turn the overlay loader on and off
export const startGlobalLoading = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sulux-start-loading"));
  }
};

export const stopGlobalLoading = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sulux-stop-loading"));
  }
};

// ── 2. MAIN COMPONENT ──────────────────────────────────────────
export default function PageLoader({
  loading = true,
  branded = true,
}: PageLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  // Initial page-entry dismiss trigger
  useEffect(() => {
    if (!loading) setVisible(false);
  }, [loading]);

  // Listen for time-consuming action events globally across the website
  useEffect(() => {
    const start = () => setShowOverlay(true);
    const stop = () => setShowOverlay(false);

    window.addEventListener("sulux-start-loading", start);
    window.addEventListener("sulux-stop-loading", stop);

    return () => {
      window.removeEventListener("sulux-start-loading", start);
      window.removeEventListener("sulux-stop-loading", stop);
    };
  }, []);

  return (
    <>
      {/* Dynamic Overlay Loader for time-consuming events */}
      <OverlayLoader show={showOverlay} />

      {/* Intro Entrance Curtain Layer */}
      <AnimatePresence>
        {visible && (
          <>
            {/* Black curtain — slides up from top */}
            <motion.div
              key="curtain"
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{ background: "#080808", transformOrigin: "top" }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => setVisible(false)}
            />

            {/* Branded wordmark — fades out before curtain lifts */}
            {branded && (
              <motion.div
                key="brand"
                className="fixed inset-0 z-[101] pointer-events-none flex flex-col items-center justify-center gap-1"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.58 }}
              >
                <span
                  className="text-[28px] font-thin tracking-[0.6em] text-white uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  SULUX
                </span>
                <span
                  className="text-[9px] font-black tracking-[0.9em] uppercase"
                  style={{ color: "#555" }}
                >
                  CENTER
                </span>
                {/* Expanding line beneath wordmark */}
                <motion.div
                  className="mt-4 h-px origin-left"
                  style={{ width: 60, background: "rgba(255,255,255,0.25)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: ease.out }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Minimal spinner variant — use inside async UI regions (data fetching,
 * image loading, form submission). No full-screen overlay.
 */
export function InlineLoader({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      className="rounded-full border border-white/10"
      style={{
        width: size,
        height: size,
        borderTopColor: "rgba(255,255,255,0.6)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}

/**
 * Overlay loader — for route transitions, lazy-loaded sections, etc.
 * Renders a translucent dark overlay with a centered spinner.
 */
export function OverlayLoader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-5">
            <InlineLoader size={32} />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/50">
              Processing Allocation
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
