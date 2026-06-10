"use client";

import { useState } from "react";
import { Mail, User, Tag, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SUBSCRIBER_INTERESTS } from "@/app/api/subscribe/route";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  /** Render as a full dark-navy section wrapper (for use in pages) */
  variant?: "section" | "card";
}

export function NewsletterSignup({ variant = "section" }: Props) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [interest, setInterest] = useState("");
  const [status,   setStatus]   = useState<Status>("idle");
  const [message,  setMessage]  = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setName(""); setEmail(""); setInterest("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please check your connection and try again.");
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <SuccessCard variant={variant} onReset={() => setStatus("idle")} />
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  const formContent = (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label className={labelClass(variant)} htmlFor="sub-name">
          Full Name
        </label>
        <div className="relative mt-1.5">
          <User size={15} className={iconClass(variant)} />
          <input
            id="sub-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass(variant)}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass(variant)} htmlFor="sub-email">
          Email Address
        </label>
        <div className="relative mt-1.5">
          <Mail size={15} className={iconClass(variant)} />
          <input
            id="sub-email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com.au"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass(variant)}
          />
        </div>
      </div>

      {/* Interest */}
      <div>
        <label className={labelClass(variant)} htmlFor="sub-interest">
          Interest Area
        </label>
        <div className="relative mt-1.5">
          <Tag size={15} className={iconClass(variant)} />
          <select
            id="sub-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
            className={`${inputClass(variant)} appearance-none`}
          >
            <option value="" disabled>Select your primary interest…</option>
            {SUBSCRIBER_INTERESTS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-600" />
          <p className="text-xs font-semibold leading-5 text-red-700">{message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <><Loader2 size={15} className="animate-spin" /> Subscribing…</>
        ) : (
          <><Mail size={15} /> Subscribe to Updates</>
        )}
      </button>

      {/* Trust line */}
      <p className={privacyClass(variant)}>
        No spam. Industry updates only. Unsubscribe anytime.
      </p>
    </form>
  );

  // ── Section variant (dark navy, full-width band) ──────────────────────────────
  if (variant === "section") {
    return (
      <section className="bg-sky-950 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_440px] lg:items-start">

            {/* Left: copy */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">
                Stay Informed
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Get the Fortnightly<br className="hidden sm:block" /> Remedial Building Update
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-sky-300">
                Industry news, defect trends, compliance updates, product releases and technical
                reference — curated for building consultants, waterproofing contractors and strata managers.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Building Commission NSW & DBP Act updates",
                  "Concrete repair, waterproofing & façade defect news",
                  "Repair system & product updates",
                  "Strata defect and compliance changes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-sky-200">
                    <CheckCircle size={14} className="shrink-0 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form card */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm">
              {formContent}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Card variant (white card, for embedding in light pages) ──────────────────
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-700">Newsletter</p>
        <h3 className="mt-1 text-xl font-extrabold text-sky-950">
          Fortnightly Remedial Building Update
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          Industry news and technical updates — delivered fortnightly, no spam.
        </p>
      </div>
      {formContent}
    </div>
  );
}

// ── Success card ──────────────────────────────────────────────────────────────

function SuccessCard({
  variant,
  onReset,
}: {
  variant: "section" | "card";
  onReset: () => void;
}) {
  const inner = (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle size={28} className="text-green-400" />
      </div>
      <h3 className={`mt-4 text-xl font-extrabold ${variant === "section" ? "text-white" : "text-sky-950"}`}>
        You&apos;re subscribed!
      </h3>
      <p className={`mt-2 max-w-xs text-sm leading-6 ${variant === "section" ? "text-sky-300" : "text-slate-500"}`}>
        Thanks for subscribing. You&apos;ll receive the next fortnightly update in your inbox.
      </p>
      <button
        onClick={onReset}
        className={`mt-5 text-xs font-semibold underline underline-offset-2 transition hover:opacity-70 ${variant === "section" ? "text-sky-400" : "text-sky-700"}`}
      >
        Subscribe another address
      </button>
    </div>
  );

  if (variant === "section") {
    return (
      <section className="bg-sky-950 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-md">{inner}</div>
      </section>
    );
  }
  return <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">{inner}</div>;
}

// ── Tailwind helpers (vary by variant) ───────────────────────────────────────

function inputClass(variant: "section" | "card") {
  const base =
    "w-full rounded-xl border py-3 pl-9 pr-4 text-sm outline-none transition focus:ring-2";
  if (variant === "section")
    return `${base} border-white/20 bg-white/10 text-white placeholder-sky-400 focus:border-sky-400 focus:ring-sky-400/20`;
  return `${base} border-slate-200 bg-white text-sky-950 placeholder-slate-400 focus:border-sky-400 focus:ring-sky-100`;
}

function iconClass(variant: "section" | "card") {
  const base = "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2";
  return `${base} ${variant === "section" ? "text-sky-400" : "text-slate-400"}`;
}

function labelClass(variant: "section" | "card") {
  const base = "block text-[11px] font-bold uppercase tracking-widest";
  return `${base} ${variant === "section" ? "text-sky-300" : "text-slate-400"}`;
}

function privacyClass(variant: "section" | "card") {
  const base = "text-[11px] leading-5";
  return `${base} ${variant === "section" ? "text-sky-500" : "text-slate-400"}`;
}
