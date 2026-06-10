"use client";

import { useState } from "react";
import Link from "next/link";

type AccountType = "directory" | "supplier" | "ai_scope";

const ACCOUNT_TYPES: { id: AccountType; title: string; subtitle: string; icon: string; badge?: string }[] = [
  {
    id: "directory",
    title: "Directory Listing",
    subtitle: "List your building company — contractor, consultant, engineer, strata manager — in the professional directory.",
    icon: "🏢",
  },
  {
    id: "supplier",
    title: "Supplier Portal",
    subtitle: "List your products, manage promotions, and reach building professionals across Australia.",
    icon: "📦",
  },
  {
    id: "ai_scope",
    title: "AI Scope Builder",
    subtitle: "Access the AI-powered scope of works builder for remedial building projects. Requires approval.",
    icon: "🤖",
    badge: "Approval required",
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
  const [step, setStep] = useState<"type" | "form">("type");
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

  function selectType(type: AccountType) {
    setAccountType(type);
    setStep("form");
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          {step === "type" ? (
            <>
              <h1 className="text-3xl font-extrabold text-slate-950">Create your account</h1>
              <p className="mt-3 text-slate-600">Choose the account type that matches how you want to use the platform.</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {ACCOUNT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => selectType(type.id)}
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-400 hover:bg-sky-50 hover:shadow-md"
                  >
                    {type.badge ? (
                      <span className="mb-3 inline-block self-start rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                        {type.badge}
                      </span>
                    ) : null}
                    <span className="text-3xl">{type.icon}</span>
                    <span className="mt-3 text-base font-bold text-slate-900 group-hover:text-sky-900">{type.title}</span>
                    <span className="mt-2 text-sm text-slate-500 leading-relaxed">{type.subtitle}</span>
                    <span className="mt-4 text-xs font-semibold text-sky-700 group-hover:underline">Get started →</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">
                  Sign in
                </Link>
              </div>
            </>
          ) : status?.type === "success" ? (
            <div className="py-6">
              <div className="rounded-2xl bg-emerald-100 px-6 py-5 text-emerald-900">
                <p className="font-semibold">Check your inbox</p>
                <p className="mt-1 text-sm">{status.message}</p>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">
                  Back to sign in
                </Link>
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={() => { setStep("type"); setStatus(null); }}
                className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
              >
                ← Back
              </button>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-2xl">{selected?.icon}</span>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-950">{selected?.title}</h1>
                  <p className="mt-0.5 text-sm text-slate-500">{selected?.subtitle}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    required
                  />
                </label>

                {(accountType === "supplier" || accountType === "ai_scope") ? (
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                    <span>Company name</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                      required
                    />
                  </label>
                ) : null}

                {accountType === "ai_scope" ? (
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                    <span>Job role</span>
                    <input
                      type="text"
                      placeholder="e.g. Remedial consultant, Engineer, Strata manager"
                      value={form.jobRole}
                      onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                      required
                    />
                  </label>
                ) : null}

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    minLength={8}
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    minLength={8}
                    required
                  />
                </label>

                {status?.type === "error" ? (
                  <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-900">
                    {status.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </form>

              <div className="mt-6 text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
