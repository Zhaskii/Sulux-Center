"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import img1 from "@/app/assets/store-pic/1.jpg";
import img10 from "@/app/assets/store-pic/10.jpg";
import img2 from "@/app/assets/store-pic/2.jpg";
import img3 from "@/app/assets/store-pic/3.jpg";
import img4 from "@/app/assets/store-pic/4.jpg";
import img5 from "@/app/assets/store-pic/5.jpg";
import img6 from "@/app/assets/store-pic/6.jpg";
import img7 from "@/app/assets/store-pic/7.jpg";
import img8 from "@/app/assets/store-pic/8.jpg";
import img9 from "@/app/assets/store-pic/9.jpg";

const IMAGES = [
  {
    src: img1,
    alt: "Sulux Centre Boutique — Main Showroom",
    caption: "Main Showroom",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img2,
    alt: "Sulux Centre Boutique — Watch Display",
    caption: "Watch Display",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img3,
    alt: "Sulux Centre Boutique — Collection",
    caption: "Collection",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img4,
    alt: "Sulux Centre Boutique — Interior",
    caption: "Interior",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img5,
    alt: "Sulux Centre Boutique — Timepieces",
    caption: "Timepieces",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img6,
    alt: "Sulux Centre Boutique — Consultation",
    caption: "Consultation Area",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img7,
    alt: "Sulux Centre Boutique — Showcase",
    caption: "Showcase",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img8,
    alt: "Sulux Centre Boutique — Detail",
    caption: "Detail",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img9,
    alt: "Sulux Centre Boutique — Heritage Wall",
    caption: "Heritage Wall",
    description: "Sulux Centre · New Road, Kathmandu",
  },
  {
    src: img10,
    alt: "Sulux Centre Boutique — Heritage Wall",
    caption: "Heritage Wall",
    description: "Sulux Centre · New Road, Kathmandu",
  },
];

const E = [0.16, 1, 0.3, 1] as const;

const GRID_AREAS = [
  "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
];

export default function StorePic() {
  const [index, setIndex] = useState(-1);

  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInV = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInV = useInView(gridRef, { once: true, margin: "-80px" });

  const slides = IMAGES.map((img) => ({
    src: img.src.src,
    alt: img.alt,
    title: img.caption,
    description: img.description,
  }));

  return (
    <section className="bg-white overflow-hidden">
      <style>{`
        /* ═══════════════════════════════════════════════════
           LIGHTBOX — premium dark editorial theme
        ═══════════════════════════════════════════════════ */

        .yarl__root {
          font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif !important;
        }
        .yarl__container {
          background: rgba(6, 6, 5, 0.98) !important;
        }

        /* FIX: Remove aggressive padding that was cropping the top */
        .yarl__slide {
          padding: 72px 120px 100px !important;
        }
        @media (max-width: 1024px) {
          .yarl__slide { padding: 64px 72px 96px !important; }
        }
        @media (max-width: 768px) {
          .yarl__slide { padding: 56px 16px 88px !important; }
        }

        /* Smooth slide image — no hard crop */
        .yarl__slide_image {
          border-radius: 0 !important;
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.7),
            0 8px 28px rgba(0, 0, 0, 0.45) !important;
          transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1) !important;
        }

        /* ── Navigation buttons ── */
        .yarl__button {
          color: rgba(255, 255, 255, 0.5) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          border: none !important;
          border-radius: 0 !important;
          width: 46px !important;
          height: 46px !important;
          transition: color 0.2s ease, background 0.2s ease !important;
          backdrop-filter: blur(10px) !important;
        }
        .yarl__button:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.09) !important;
          border: none !important;
          transform: none !important;
        }
        .yarl__button svg {
          width: 17px !important;
          height: 17px !important;
          stroke-width: 1.5px !important;
        }

        /* ── Hide prev/next arrow buttons ── */
        .yarl__navigation_prev,
        .yarl__navigation_next {
          display: none !important;
        }

        /* ── Toolbar (top bar) ── */
        .yarl__toolbar {
          padding: 18px 22px !important;
          background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%) !important;
          gap: 8px !important;
        }

        /* Close button — clean, no border */
        .yarl__button.yarl__button_close {
          border: none !important;
          background: transparent !important;
          opacity: 0.6 !important;
        }
        .yarl__button.yarl__button_close:hover {
          opacity: 1 !important;
          background: rgba(255,255,255,0.08) !important;
          border: none !important;
        }

        /* ── Captions ── */
        .yarl__slide_captions_container {
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%) !important;
          padding: 36px 32px 20px !important;
          border-radius: 0 !important;
        }
        .yarl__slide_title {
          font-size: 0.6rem !important;
          letter-spacing: 0.3em !important;
          text-transform: uppercase !important;
          font-weight: 800 !important;
          color: rgba(255, 255, 255, 0.8) !important;
          font-family: inherit !important;
        }
        .yarl__slide_description {
          font-size: 0.55rem !important;
          letter-spacing: 0.18em !important;
          color: rgba(255, 255, 255, 0.28) !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          margin-top: 5px !important;
          font-family: inherit !important;
        }

        /* ── Counter badge — hidden ── */
        .yarl__counter {
          display: none !important;
        }

        /* ── Thumbnails strip ── */
        .yarl__thumbnails_container {
          background: rgba(0, 0, 0, 0.96) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.07) !important;
          padding: 10px 16px !important;
        }
        .yarl__thumbnails_track {
          gap: 6px !important;
        }
        .yarl__thumbnails_thumbnail {
          background: #111 !important;
          border: 1px solid transparent !important;
          border-radius: 0 !important;
          opacity: 0.4 !important;
          transition: opacity 0.22s ease, border-color 0.22s ease !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        .yarl__thumbnails_thumbnail:hover {
          opacity: 0.7 !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
        }
        .yarl__thumbnails_thumbnail_active {
          opacity: 1 !important;
          border-color: rgba(255, 255, 255, 0.65) !important;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.12) !important;
        }
        .yarl__thumbnails_thumbnail img {
          border-radius: 0 !important;
        }

        .yarl__button[data-active="true"] {
          color: white !important;
          border: none !important;
          background: rgba(255,255,255,0.1) !important;
        }

        .gallery-img {
          transition: transform 0.75s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease;
        }
        .gallery-cell:hover .gallery-img { transform: scale(1.06); }

        .gallery-overlay {
          opacity: 0;
          transition: opacity 0.32s ease;
        }
        .gallery-cell:hover .gallery-overlay { opacity: 1; }

        @keyframes lineIn { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .line-in { transform-origin:left; animation:lineIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
      `}</style>

      {/* ══ HEADER ══ */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-16 md:pt-20 pb-10 md:pb-14"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={headerInV ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: E }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-5 h-px bg-neutral-400" />
          <span
            className="text-neutral-400 font-black tracking-[0.32em] uppercase"
            style={{ fontSize: "0.8rem" }}
          >
            Sulux Centre Boutique · Est. 1983
          </span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "108%", skewY: 2 }}
              animate={headerInV ? { y: 0, skewY: 0 } : {}}
              transition={{ duration: 1, delay: 0.08, ease: E }}
              className="font-light leading-[0.88] text-neutral-900"
              style={{
                fontFamily:
                  "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
              }}
            >
              Inside Our{" "}
              <em className="italic font-normal text-neutral-400">Boutique</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3, ease: E }}
            className="flex items-center gap-5 flex-shrink-0"
          ></motion.div>
        </div>

        {headerInV && <div className="line-in h-px bg-neutral-200 mt-10" />}
      </div>

      {/* ══ GALLERY ══ */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-16 md:pb-24"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "240px" }}
        >
          {IMAGES.slice(0, 10).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={gridInV ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: Math.min(i * 0.07, 0.5),
                ease: E,
              }}
              onClick={() => setIndex(i)}
              className={`gallery-cell relative cursor-pointer overflow-hidden bg-neutral-100 ${GRID_AREAS[i]}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="gallery-img object-cover"
                priority={i < 3}
              />
              <div className="gallery-overlay absolute inset-0 bg-black/35 flex flex-col items-center justify-center gap-2">
                <div className="border border-white/40 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
                  <Maximize2 size={12} className="text-white" />
                  <span
                    className="text-white font-black tracking-[0.2em] uppercase"
                    style={{ fontSize: "0.52rem" }}
                  >
                    View
                  </span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1">
                <span
                  className="text-white/60 font-black"
                  style={{ fontSize: "0.45rem", letterSpacing: "0.1em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.6, ease: E }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 pt-10 border-t border-neutral-200"
        >
          <div>
            <p
              className="text-neutral-900 font-black"
              style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}
            >
              Visit us in person
            </p>
            <p
              className="text-neutral-400 font-light italic mt-0.5"
              style={{
                fontSize: "0.85rem",
                fontFamily:
                  "var(--font-display,'Cormorant Garamond',Georgia,serif)",
              }}
            >
              New Road, Kathmandu · Open Sun–Fri 11AM–8PM
            </p>
          </div>
          <button
            onClick={() => setIndex(0)}
            className="group flex items-center gap-3 bg-neutral-900 text-white font-black px-7 py-3.5 hover:bg-neutral-700 transition-colors duration-200 flex-shrink-0"
            style={{ fontSize: "0.62rem", letterSpacing: "0.22em" }}
          >
            VIEW ALL PHOTOS
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </div>

      {/* ══ LIGHTBOX ══ */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Slideshow, Fullscreen, Thumbnails, Counter, Captions]}
        styles={{
          container: { backgroundColor: "rgba(6,6,5,0.98)" },
          thumbnail: { padding: 0, borderRadius: 0 },
          thumbnailsTrack: { gap: "6px" },
        }}
        animation={{ fade: 600, swipe: 1000 }}
        carousel={{ finite: false, preload: 2 }}
        zoom={{ maxZoomPixelRatio: 4, doubleTapDelay: 300 }}
        slideshow={{ autoplay: false, delay: 3000 }}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 52,
          border: 0,
          borderRadius: 0,
          padding: 0,
          gap: 6,
          vignette: true,
        }}
        captions={{
          showToggle: false,
          descriptionTextAlign: "start",
          descriptionMaxLines: 1,
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
