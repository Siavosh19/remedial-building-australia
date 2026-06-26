"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Package, UserCog, ClipboardList, ChevronRight, type LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import TurnstileWidget from "@/components/TurnstileWidget";
import { validateAuPhone } from "@/lib/phone-au";

type AccountType = "directory" | "supplier" | "ai_scope";
type CardId = AccountType | "client";

type CardDef = {
  id: CardId;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  href?: string; // client card routes to the separate client signup
  badge?: string;
};

// Soft accent tile per card (matches the colour-coded mockup look)
const ACCENTS: Record<CardId, { tile: string; icon: string }> = {
  client: { tile: "bg-sky-100", icon: "text-sky-700" },
  directory: { tile: "bg-emerald-100", icon: "text-emerald-700" },
  supplier: { tile: "bg-amber-100", icon: "text-amber-700" },
  ai_scope: { tile: "bg-violet-100", icon: "text-violet-700" },
};

const CARDS: CardDef[] = [
  {
    id: "client",
    title: "Request Quotes",
    subtitle:
      "Strata managers, owners corporations, building managers and property owners — create a client account to request quotes for building works from listed businesses.",
    Icon: ClipboardList,
    href: "/client/signup",
  },
  {
    id: "directory",
    title: "Directory Listing",
    subtitle: "List your building company — contractor, consultant, engineer — in the professional directory.",
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
    Icon: UserCog,
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
  const router = useRouter();
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
  const [turnstileToken, setTurnstileToken] = useState("");

  const phoneCheck = form.phone ? validateAuPhone(form.phone) : null;

  function selectCard(card: CardDef) {
    if (card.href) {
      router.push(card.href);
      return;
    }
    setAccountType(card.id as AccountType);
    setStep(card.id === "ai_scope" ? "coming_soon" : "form");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phoneCheck && !phoneCheck.valid) {
      setStatus({ type: "error", message: phoneCheck.message });
      return;
    }
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, accountType, turnstileToken }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit. Please try again." });
      return;
    }
    setStatus({ type: "success", message: result.message ?? "Verification email sent. Please check your inbox to continue." });
  }

  const selected = CARDS.find((c) => c.id === accountType);
  const SelectedIcon = selected?.Icon ?? Building2;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            {step === "coming_soon" ? (
              <div className="py-6">
                <button
                  onClick={() => { setStep("type"); setAccountType(null); }}
                  className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
                >
                  &larr; Back
                </button>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-950 text-white">
                    <UserCog size={22} />
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-950">Consultant Login</h1>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
                  <span className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Coming soon</span>
                  <p className="mb-2 text-lg font-semibold text-slate-700">AI-powered scope of works builder</p>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
                    The consultant portal is under development. It will give remedial building consultants access to an
                    AI-powered scope of works builder — generating fully formatted scope documents from site inspection inputs.
                  </p>
                  <p className="mt-6 text-sm text-slate-500">
                    To register your interest, email{" "}
                    <a href="mailto:info@remedialbuildingaustralia.com.au" className="font-semibold text-sky-950 hover:text-sky-700">
                      info@remedialbuildingaustralia.com.au
                    </a>
                  </p>
                </div>
              </div>
            ) : step === "type" ? (
              <>
                <div className="mb-6">
                  <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to home</Link>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Get started</p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-950">What would you like to do?</h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Choose the option that matches how you want to use the platform. We'll take you to the right place.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {CARDS.map((card) => {
                    const Icon = card.Icon;
                    const accent = ACCENTS[card.id];
                    return (
                      <button
                        key={card.id}
                        onClick={() => selectCard(card)}
                        className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.tile} ${accent.icon}`}>
                            <Icon size={22} />
                          </span>
                          <span className="text-lg font-bold text-slate-900 group-hover:text-sky-900">{card.title}</span>
                        </div>
                        <span className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{card.subtitle}</span>
                        {card.badge ? (
                          <span className="mt-3 inline-block self-start rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                            {card.badge}
                          </span>
                        ) : null}
                        <span className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-950 px-4 py-2.5 text-sm font-semibold text-sky-950 transition group-hover:bg-sky-950 group-hover:text-white">
                          Create Your Account
                          <ChevronRight size={16} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">Sign in</Link>
                </div>
              </>
            ) : status?.type === "success" ? (
              <div className="py-6">
                <div className="rounded-2xl bg-emerald-100 px-6 py-5 text-emerald-900">
                  <p className="font-semibold">Check your inbox</p>
                  <p className="mt-1 text-sm">{status.message}</p>
                </div>
                <p className="mt-6 text-sm text-slate-500">
                  <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">Back to sign in</Link>
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setStep("type"); setStatus(null); }}
                  className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
                >
                  &larr; Back
                </button>

                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-950 text-white">
                    <SelectedIcon size={22} />
                  </span>
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-950">{selected?.title}</h1>
                    <p className="mt-0.5 text-sm text-slate-500">{selected?.subtitle}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
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
                      autoComplete="email"
                      placeholder="you@company.com"
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
                      placeholder="02 9876 5432 or 0412 345 678"
                      className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${
                        phoneCheck && !phoneCheck.valid ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"
                      }`}
                      required
                    />
                    {phoneCheck && !phoneCheck.valid && (
                      <span className="block text-xs font-medium text-rose-600">{phoneCheck.message}</span>
                    )}
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
                      autoComplete="new-password"
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
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                      minLength={8}
                      required
                    />
                  </label>

                  <TurnstileWidget onToken={setTurnstileToken} />

                  {status?.type === "error" ? (
                    <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-900">{status.message}</div>
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
                  <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">Sign in</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-900">
            A structured Australian remedial building knowledge platform — business directory, quote requests, repair
            systems, materials and AI-assisted scope writing.
          </p>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
