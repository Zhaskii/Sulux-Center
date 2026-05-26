"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Clock,
  Heart,
  MapPin,
  ShieldCheck,
  Package,
  ArrowRight,
  LogOut,
  ExternalLink,
  KeyRound,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────
type ActiveTab = "history" | "wishlist";

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Secured";
  total: number;
  trackingNumber?: string;
  items: OrderItem[];
}

interface WishlistItem {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  availability: "Available" | "Allocated Waitlist";
}

// ── Data ────────────────────────────────────────────────────────────────────
const USER = {
  name: "Prasiddha Shrestha",
  email: "collector.01@suluxcentre.com",
  since: "October 2024",
  tier: "Patron Member",
  shipping: "Durbar Marg, Kathmandu, Nepal",
};

const ORDERS: Order[] = [
  {
    id: "SLX-2026-8941",
    date: "April 12, 2026",
    status: "Delivered",
    total: 394000,
    trackingNumber: "TRK-ML-778129",
    items: [
      {
        id: "ml-6",
        name: "Tissot PRX Powermatic 80 Blue Dial",
        sku: "T137.407.11.041.00",
        price: 394000,
        image:
          "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=400",
      },
    ],
  },
  {
    id: "SLX-2025-4412",
    date: "November 28, 2025",
    status: "Secured",
    total: 159500,
    items: [
      {
        id: "ml-1",
        name: "Rado Captain Cook Automatic 42mm",
        sku: "R32105203",
        price: 159500,
        image:
          "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=400",
      },
    ],
  },
];

const WISHLIST: WishlistItem[] = [
  {
    id: "ml-5",
    name: "Raymond Weil Freelancer Automatic",
    collection: "Signature",
    price: 394000,
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=400",
    availability: "Available",
  },
  {
    id: "ml-8",
    name: "Victorinox I.N.O.X Mechanical",
    collection: "Heritage",
    price: 485000,
    image:
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=400",
    availability: "Allocated Waitlist",
  },
];

const fmt = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Status badge ────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-neutral-900 text-white",
  Secured: "bg-neutral-200 text-neutral-700 border border-neutral-200",
  "In Transit": "bg-amber-50 text-amber-800 border border-amber-100",
  Processing: "bg-neutral-50 text-neutral-500 border border-neutral-200",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] uppercase ${STATUS_STYLES[status] ?? "bg-neutral-100 text-neutral-600"}`}
    >
      <Package size={9} />
      {status}
    </span>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function Profile() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("history");
  const initials = USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-24 mt-3 md:mt-9">
      {/* ── Page header ── */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 md:py-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[12px] tracking-[0.35em] uppercase text-neutral-600 mb-2">
              Sulux Centre · Member Area
            </p>
            <h1
              className="text-4xl md:text-5xl font-extralight tracking-[0.06em] text-neutral-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              My <span className="text-red-700">Archive</span>
            </h1>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[14px] font-semibold tracking-[0.18em] uppercase text-neutral-600 hover:text-red-700 transition-colors duration-200 bg-transparent border-none cursor-pointer">
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-10 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* ── Left: user card ── */}
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-5">
            {/* Identity card */}
            <div className="bg-white border border-neutral-100 p-6 md:p-7">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-100 mb-6">
                <div className="h-12 w-12 flex-shrink-0 bg-black text-white flex items-center justify-center text-[15px] font-light tracking-widest select-none">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2
                    className="text-[20px] font-light tracking-[0.03em] text-neutral-900 leading-tight truncate"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {USER.name}
                  </h2>
                  <p className="text-[11px] text-neutral-600 tracking-wide mt-0.5 truncate">
                    {USER.email}
                  </p>
                </div>
              </div>

              {/* Tier badge */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-500">
                  {USER.tier}
                </span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              {/* Meta rows */}
              <div className="flex flex-col gap-5 mb-7">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={14}
                    className="text-neutral-400 mt-0.5 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[13px] font-semibold tracking-[0.22em] uppercase text-neutral-600 mb-0.5">
                      Registry Status
                    </p>
                    <p className="text-[12px] text-neutral-800 leading-relaxed">
                      Verified · Since {USER.since}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    className="text-neutral-400 mt-0.5 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[13px] font-semibold tracking-[0.22em] uppercase text-neutral-600 mb-0.5">
                      Primary Address
                    </p>
                    <p className="text-[12px] text-neutral-800 leading-relaxed">
                      {USER.shipping}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/change-password"
                className="flex items-center justify-between w-full border border-neutral-200 px-4 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-700 hover:border-black hover:text-black transition-all duration-200 group no-underline"
              >
                <span className="flex items-center gap-2">
                  <KeyRound size={12} strokeWidth={1.5} />
                  Change Password
                </span>
                <ArrowRight
                  size={12}
                  className="text-neutral-400 group-hover:text-black transition-colors group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-px bg-neutral-200">
              <div className="bg-white px-5 py-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-700 mb-1">
                  Orders
                </p>
                <p
                  className="text-2xl font-extralight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {ORDERS.length}
                </p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-700 mb-1">
                  Saved
                </p>
                <p
                  className="text-2xl font-extralight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {WISHLIST.length}
                </p>
              </div>
            </div>

            {/* Mobile sign-out */}
            <button className="lg:hidden flex items-center justify-center gap-2 w-full border border-neutral-200 py-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-neutral-400 hover:text-red-600 hover:border-red-200 transition-colors duration-200 bg-transparent cursor-pointer">
              <LogOut size={12} />
              Sign Out
            </button>
          </aside>

          {/* ── Right: tabs + content ── */}
          <main className="lg:col-span-8 xl:col-span-9">
            {/* Tab bar */}
            <div className="flex gap-0 border-b border-neutral-200 mb-8">
              {(
                [
                  { key: "history", label: "Order History", icon: Clock },
                  { key: "wishlist", label: "Wishlist", icon: Heart },
                ] as const
              ).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="relative flex items-center gap-2 px-5 py-3.5 text-[14px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  style={{ color: activeTab === key ? "#0a0a0a" : "#aaa" }}
                >
                  <Icon size={12} strokeWidth={activeTab === key ? 2 : 1.5} />
                  {label}
                  {activeTab === key && (
                    <motion.div
                      layoutId="tabLine"
                      className="absolute bottom-0 left-0 right-0 h-px bg-black"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === "history" ? (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="flex flex-col gap-5"
                >
                  {ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-neutral-100 hover:border-neutral-300 transition-colors duration-200"
                    >
                      {/* Order header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-neutral-100">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                          <div>
                            <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-neutral-600 mb-0.5">
                              Order ID
                            </p>
                            <p className="text-[12px] font-medium text-neutral-900 tracking-wide">
                              {order.id}
                            </p>
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-neutral-600 mb-0.5">
                              Date
                            </p>
                            <p className="text-[12px] text-neutral-900">
                              {order.date}
                            </p>
                          </div>
                          {order.trackingNumber && (
                            <div>
                              <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-neutral-600 mb-0.5">
                                Tracking
                              </p>
                              <p className="text-[12px] font-mono text-neutral-900">
                                {order.trackingNumber}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[16px] font-medium text-neutral-900"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {fmt(order.total)}
                          </span>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="px-6 py-5 flex flex-col gap-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <div className="relative h-16 w-16 bg-neutral-50 border border-neutral-100 flex-shrink-0 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="text-[18px] font-light text-neutral-900 truncate mb-0.5"
                                style={{ fontFamily: "'Georgia', serif" }}
                              >
                                {item.name}
                              </h4>
                              <p className="text-[12px] font-mono text-neutral-700">
                                SKU: {item.sku}
                              </p>
                            </div>
                            <Link
                              href={`/shop/product/${item.id}`}
                              className="flex-shrink-0 h-8 w-8 border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black transition-colors duration-200"
                            >
                              <ExternalLink size={12} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {WISHLIST.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white border border-neutral-100 hover:border-neutral-300 transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative aspect-3/2 bg-neutral-50 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <span
                          className={`absolute top-3 left-3 text-[9px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 ${
                            item.availability === "Available"
                              ? "bg-black text-white"
                              : "bg-white text-neutral-700 border border-neutral-200"
                          }`}
                        >
                          {item.availability}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-1.5">
                          {item.collection}
                        </p>
                        <h3
                          className="text-[16px] font-light text-neutral-900 leading-snug mb-4 flex-1"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                          <span
                            className="text-[16px] font-medium text-neutral-900"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {fmt(item.price)}
                          </span>
                          <Link
                            href={`/shop/product/${item.id}`}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-500 hover:text-black transition-colors duration-200 no-underline group/link"
                          >
                            View
                            <ArrowRight
                              size={11}
                              className="group-hover/link:translate-x-0.5 transition-transform duration-200"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
