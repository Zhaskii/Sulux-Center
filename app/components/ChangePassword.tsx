"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

type FormState = "input" | "success";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Password strength helper ────────────────────────────────────────────────
function getStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#dc2626" };
  if (score <= 2) return { score, label: "Fair", color: "#d97706" };
  if (score <= 3) return { score, label: "Good", color: "#65a30d" };
  return { score, label: "Strong", color: "#16a34a" };
}

// ── Password input field ────────────────────────────────────────────────────
function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-[9px] font-semibold tracking-[0.25em] uppercase text-neutral-400 group-focus-within:text-black transition-colors duration-200">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-black transition-colors duration-300 pointer-events-none">
          <Lock size={13} />
        </span>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-neutral-200 bg-white pl-10 pr-11 py-3.5 text-[13px] text-black outline-none focus:border-black transition-all duration-300 placeholder:text-neutral-300 tracking-[0.04em] rounded-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black transition-colors duration-200 p-1"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>("input");
  const [error, setError] = useState("");

  const strength = getStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormState("success");
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── Left panel — editorial image ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative overflow-hidden bg-neutral-950 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ filter: "brightness(0.22) contrast(1.1) saturate(0.6)" }}
        />
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16">
          <Link href="/" className="self-start">
            <span className="text-[16px] tracking-[0.5em] text-neutral-600 uppercase">
              Sulux · Centre
            </span>
          </Link>
          <div>
            <p className="text-[14px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              Account security
            </p>
            <h2
              className="text-4xl xl:text-5xl font-extralight tracking-[0.06em] text-white leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Secure{" "}
              <span className="italic text-white/35 font-normal">your</span>
              <br />
              <span className="text-red-700">collection.</span>
            </h2>
            <p className="text-[16px] text-neutral-500 leading-relaxed max-w-xs">
              Protecting access to your horological library is part of the Sulux
              standard.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={14}
              strokeWidth={1.5}
              className="text-neutral-600"
            />
            <span className="text-[12px] tracking-[0.2em] uppercase text-neutral-500">
              256-bit encrypted
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 md:px-12 xl:px-20 relative">
        {/* Back link */}
        <div className="absolute top-7 left-6 md:left-10">
          <Link
            href="/profile"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.18em] uppercase text-neutral-600 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Link href="/" className="group flex flex-col items-center gap-1.5">
              <div className="border border-black px-5 py-2.5 group-hover:bg-black transition-colors duration-300">
                <span
                  className="text-[22px] font-black tracking-[0.4em] uppercase text-black group-hover:text-white transition-colors duration-300 leading-none block"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  SULUX
                </span>
              </div>
              <span className="text-[8px] font-semibold tracking-[0.55em] uppercase text-neutral-400">
                Centre
              </span>
            </Link>
          </div>

          {/* Animated form states */}
          <AnimatePresence mode="wait">
            {formState === "input" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.52, ease: EASE }}
              >
                {/* Header */}
                <div className="mb-9 text-center">
                  <h1
                    className="text-[28px] font-extralight tracking-[0.05em] text-black mb-2.5"
                    style={{
                      fontFamily:
                        "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                      fontSize: "clamp(2rem,5vw,3rem)",
                    }}
                  >
                    Update <span className="text-red-700">Password</span>
                  </h1>
                  <p
                    className="text-[18px] text-neutral-600 leading-relaxed max-w-[300px] mx-auto"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontStyle: "italic",
                    }}
                  >
                    Update your credentials to maintain exclusive access to your
                    account.
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <Lock size={11} className="text-neutral-600" />
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    placeholder="Enter current password"
                    show={showCurrent}
                    onToggle={() => setShowCurrent((v) => !v)}
                  />

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-neutral-200" />
                    <span className="text-[10px] tracking-[0.8em] uppercase text-red-700">
                      New credentials
                    </span>
                    <div className="flex-1 h-px bg-neutral-200" />
                  </div>

                  <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Minimum 8 characters"
                    show={showNew}
                    onToggle={() => setShowNew((v) => !v)}
                  />

                  {/* Strength meter */}
                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-3 -mt-2"
                    >
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="h-0.5 flex-1 rounded-full transition-all duration-300"
                            style={{
                              background:
                                i <= strength.score
                                  ? strength.color
                                  : "#e5e5e5",
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[9px] font-semibold tracking-[0.15em] uppercase w-12 text-right"
                        style={{ color: strength.color }}
                      >
                        {strength.label}
                      </span>
                    </motion.div>
                  )}

                  <PasswordField
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Repeat new password"
                    show={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                  />

                  {/* Match indicator */}
                  {confirmPassword && newPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] tracking-wide -mt-2"
                      style={{
                        color:
                          confirmPassword === newPassword
                            ? "#16a34a"
                            : "#dc2626",
                      }}
                    >
                      {confirmPassword === newPassword
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </motion.p>
                  )}

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] font-semibold tracking-wide text-red-600 text-center bg-red-50 py-2.5 px-4 border border-red-100"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-4 text-[10px] font-semibold tracking-[0.28em] uppercase mt-2 flex items-center justify-center gap-2.5 group transition-all duration-300 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed rounded-none border-none cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Update Password</span>
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  {/* Forgot link */}
                  <div className="text-center pt-1">
                    <Link
                      href="/forgot-password"
                      className="text-[12px] tracking-[0.15em] uppercase text-neutral-600 hover:text-black transition-colors duration-200 border-b border-neutral-200 hover:border-black pb-0.5"
                    >
                      Forgot current password?
                    </Link>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.52, ease: EASE }}
                className="text-center flex flex-col items-center"
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="w-14 h-14 border border-black flex items-center justify-center mb-7"
                >
                  <CheckCircle2
                    size={22}
                    strokeWidth={1.2}
                    className="text-black"
                  />
                </motion.div>

                <h2
                  className="text-[28px] font-extralight tracking-[0.05em] text-black mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Password Updated
                </h2>

                <p
                  className="text-[12px] text-neutral-500 leading-relaxed mb-10 max-w-[280px]"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontStyle: "italic",
                  }}
                >
                  Your new credentials are active. Sign in with your updated
                  password on your next visit.
                </p>

                {/* Decorative rule */}
                <div className="flex items-center gap-4 mb-10 w-full">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <CheckCircle2 size={11} className="text-neutral-300" />
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>

                <Link
                  href="/login"
                  className="w-full bg-black text-white py-4 text-[10px] font-semibold tracking-[0.28em] uppercase text-center block hover:bg-neutral-800 transition-colors duration-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/account"
                  className="mt-4 text-[10px] tracking-[0.15em] uppercase text-neutral-400 hover:text-black transition-colors duration-200 border-b border-neutral-200 hover:border-black pb-0.5"
                >
                  Return to Dashboard
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
