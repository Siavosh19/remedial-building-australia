"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Package, Briefcase } from "lucide-react";

type AccountType = "directory" | "supplier" | "ai_scope";

type AccountTypeDef = {
  id: AccountType;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
};

const ACCOUNT_TYPES: AccountTypeDef[] = [
  {
    id: "directory",
    title: "Directory Listing",
    subtitle: "List your building company — contractor, consultant, engineer, strata manager — in the professional directory.",
    Icon: Building2,
  },
  {
    id: "supplier",
    title: "Supplier Portal",
    subtitle: "List your products, manage promotions, and reach building professionals across Australia.",
    Icon: Package,
  },
  {
    id: "ai_scope",
    title: "Consultant Login",
    subtitle: "For remedial building consultants. AI-powered scope of works builder — coming soon.",
    Icon: Briefcase,
    badge: "Coming soon",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  company: string;
  jobRole: string;
};

export default function DirectorySignupPage() {
  const [step, setStep] = useState<"type" | "form" | "coming_soon">("type");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    company: "",
    jobRole: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function selectType(type: AccountType) {
    setAccountType(type);
    if (type === "ai_scope") {
      setStep("coming_soon");
    } else {
      setStep("form");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, accountType }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit. Please try again." });
      return;
    }

    setStatus({ type: "success", message: result.message ?? "Verification email sent. Please check your inbox to continue." });
  }

  const selected = ACCOUNT_TYPES.find((t) => t.id === accountType);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-4">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap transition hover:text-red-700">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a
            href="/directory/login"
            className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 md:inline-flex"
          >
            Login / Create Account
          </a>
          <button
            className="p-1 md:hidden"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-sky-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-sky-800">
              <a href="/" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Home</a>
              <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Repair Systems</a>
              <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">News &amp; Insights</a>
              <a href="/directory" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Directory</a>
              <a href="/ai-scope-builder" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">AI Scope Builder</a>
              <a href="/directory/login" onClick={() => setMobileNavOpen(false)} className="mt-2 inline-flex rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition">Login / Create Account</a>
            </nav>
          </div>
        )}
      </header>

      {/* ── Page intro ───────────────────────────────────────────────── */}
      <section className="border-b border-sky-900/30 bg-sky-950 px-8 py-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-400">
            Account Portal
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-sky-200/80">
            Choose the account type that matches how you want to use the platform.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">

          {/* ── Coming soon ─────────────────────────────────────────── */}
          {step === "coming_soon" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <button
                onClick={() => { setStep("type"); setAccountType(null); }}
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Back to account types</span>
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B2F45]">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#0B2F45]">Consultant Login</h2>
                  <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                    Coming soon
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-7">
                <p className="font-semibold text-amber-900 mb-2">AI-powered scope of works builder</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  The consultant portal is currently under development. It will give remedial building consultants access to an AI-powered scope of works builder — generating fully formatted scope documents from site inspection inputs.
                </p>
                <p className="mt-5 text-sm text-amber-800">
                  To register your interest, email{" "}
                  <a href="mailto:info@remedialbuildingaustralia.com.au" className="font-semibold text-[#0B2F45] underline underline-offset-2 hover:text-sky-700">
                    info@remedialbuildingaustralia.com.au
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* ── Account type selection ──────────────────────────────── */}
          {step === "type" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8">
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
                >
                  <span aria-hidden="true">&larr;</span>
                  <span>Back to directory</span>
                </Link>
              </div>

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Remedial Building Australia
                </p>
                <h2 className="text-2xl font-extrabold text-[#0B2F45]">Choose your account type</h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Select the option that best describes how you plan to use the platform.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 items-stretch">
                {ACCOUNT_TYPES.map(({ id, title, subtitle, Icon, badge }) => (
                  <button
                    key={id}
                    onClick={() => selectType(id)}
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-sky-300 hover:shadow-md focus:outline-none sm:p-9"
                  >
                    {/* Icon — same position on all cards, no badge above */}
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0B2F45] group-hover:bg-sky-800 transition-colors">
                      <Icon size={36} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold text-[#0B2F45] group-hover:text-sky-900">{title}</span>
                    <span className="mt-3 text-lg text-slate-500 leading-relaxed">{subtitle}</span>
                    {badge && (
                      <span className="mt-4 inline-block self-start rounded-md bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-800">
                        {badge}
                      </span>
                    )}
                    {/* mt-auto pushes "Get started" to the bottom of every card */}
                    <span className="mt-auto pt-6 text-lg font-semibold text-sky-700 group-hover:underline">
                      Get started &rarr;
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/directory/login" className="font-semibold text-[#0B2F45] hover:text-sky-700">
                  Sign in
                </Link>
              </div>
            </div>
          )}

          {/* ── Success state ───────────────────────────────────────── */}
          {step === "form" && status?.type === "success" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5">
                <p className="font-semibold text-emerald-900">Check your inbox</p>
                <p className="mt-1 text-sm text-emerald-800">{status.message}</p>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                <Link href="/directory/login" className="font-semibold text-[#0B2F45] hover:text-sky-700">
                  &larr; Back to sign in
                </Link>
              </p>
            </div>
          )}

          {/* ── Registration form ───────────────────────────────────── */}
          {step === "form" && status?.type !== "success" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <button
                onClick={() => { setStep("type"); setStatus(null); }}
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Back to account types</span>
              </button>

              {selected && (
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B2F45]">
                    <selected.Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0B2F45]">{selected.title}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{selected.subtitle}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    required
                  />
                </label>

                {(accountType === "supplier" || accountType === "ai_scope") && (
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                    <span>Company name</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                      style={{ minHeight: "48px" }}
                      required
                    />
                  </label>
                )}

                {accountType === "ai_scope" && (
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                    <span>Job role</span>
                    <input
                      type="text"
                      placeholder="e.g. Remedial consultant, Engineer, Strata manager"
                      value={form.jobRole}
                      onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                      style={{ minHeight: "48px" }}
                      required
                    />
                  </label>
                )}

                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    minLength={8}
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    minLength={8}
                    required
                  />
                </label>

                {status?.type === "error" && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#0B2F45] px-5 font-semibold text-white transition hover:bg-[#0A344D] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ minHeight: "50px" }}
                >
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </form>

              <div className="mt-6 text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/directory/login" className="font-semibold text-[#0B2F45] hover:text-sky-700">
                  Sign in
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            &larr; Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform — defects, repair systems, industry news, business directory and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>

    </div>
  );
}
