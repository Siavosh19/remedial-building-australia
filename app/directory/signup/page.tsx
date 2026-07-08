"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
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
  subtitle: ReactNode;
  Icon: LucideIcon;
  image: string;
  href?: string; // client card routes to the separate client signup
  disabled?: boolean; // shown but not selectable — feature under development
};

const IMAGE_BASE = "/Images/signup-page";

// Bold + capitalised identity phrase inside the card copy
const Who = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold text-black">{children}</strong>
);

const CARDS: CardDef[] = [
  {
    id: "client",
    title: "Request Quotes",
    subtitle: (
      <>
        I'm a <Who>Strata Manager</Who>, <Who>Owners Corporation</Who>, <Who>Building Manager</Who> or{" "}
        <Who>Property Owner</Who>, and I want to request quotes for building or remedial works from listed businesses.
      </>
    ),
    Icon: ClipboardList,
    image: `${IMAGE_BASE}/request-quotes.jpg`,
    href: "/client/signup",
  },
  {
    id: "directory",
    title: "List My Business",
    subtitle: (
      <>
        I run a <Who>Building or Trade Business</Who> — <Who>Contractor</Who>, <Who>Consultant</Who> or{" "}
        <Who>Engineer</Who> — and I want to list it in the directory to receive quote requests and win more work.
      </>
    ),
    Icon: Building2,
    image: `${IMAGE_BASE}/directory-listing.png`,
  },
  {
    id: "supplier",
    title: "Supplier Portal",
    subtitle: (
      <>
        I'm a <Who>Materials Supplier</Who> and I want to list, manage and promote my products to building professionals
        across Australia.
      </>
    ),
    Icon: Package,
    image: `${IMAGE_BASE}/supplier-portal.png`,
    disabled: true,
  },
  {
    id: "ai_scope",
    title: "Consultant / Engineer",
    subtitle: (
      <>
        I'm a <Who>Remedial Building Consultant</Who> or <Who>Engineer</Who> and I want to use the AI-powered scope of
        works builder to generate site-ready scope documents.
      </>
    ),
    Icon: UserCog,
    image: `${IMAGE_BASE}/consultants.png`,
    disabled: true,
  },
];

// Distinct soft column background + button colour per card
const THEME: Record<CardId, { col: string; btn: string; badge: string }> = {
  client: {
    col: "bg-sky-50",
    btn: "border-sky-900 text-sky-900 group-hover:bg-sky-900 group-hover:text-white",
    badge: "",
  },
  directory: {
    col: "bg-emerald-50",
    btn: "border-emerald-900 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white",
    badge: "",
  },
  supplier: {
    col: "bg-amber-50",
    btn: "",
    badge: "bg-amber-200 text-amber-900",
  },
  ai_scope: {
    col: "bg-violet-50",
    btn: "",
    badge: "bg-violet-200 text-violet-900",
  },
};

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

  // Deep link: /directory/signup?type=directory jumps straight into that card's form
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (!t) return;
    const card = CARDS.find((c) => c.id === t);
    if (!card || card.disabled) return;
    if (card.href) {
      router.push(card.href);
      return;
    }
    setAccountType(card.id as AccountType);
    setStep("form");
  }, [router]);

  function selectCard(card: CardDef) {
    if (card.disabled) return;
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
                  className="mb-6 flex items-center gap-1.5 text-lg font-bold text-slate-900 hover:text-black"
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
                  <Link href="/" className="text-lg font-bold text-slate-900 hover:text-black">&larr; Back to home</Link>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Get started</p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Which best describes you?</h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Choose the card that matches how you want to use the platform, and we'll take you to the right place.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {CARDS.map((card) => {
                    const disabled = !!card.disabled;
                    const theme = THEME[card.id];
                    return (
                      <div
                        key={card.id}
                        role={disabled ? undefined : "button"}
                        tabIndex={disabled ? undefined : 0}
                        aria-disabled={disabled}
                        onClick={() => selectCard(card)}
                        onKeyDown={(e) => {
                          if (disabled) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            selectCard(card);
                          }
                        }}
                        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-red-400 text-left shadow-sm transition ${theme.col} ${
                          disabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                        }`}
                      >
                        {/* Illustration — white blended out via multiply so it sits on the column colour */}
                        <div className="relative aspect-square w-full">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={`object-contain object-bottom mix-blend-multiply transition ${disabled ? "opacity-70 grayscale-[35%]" : ""}`}
                          />
                          {disabled ? (
                            <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${theme.badge}`}>
                              Under development
                            </span>
                          ) : null}
                        </div>

                        {/* Body */}
                        <div className="-mt-6 flex flex-1 flex-col items-center px-5 pb-6 text-center">
                          <p className="mb-8 text-lg font-medium leading-relaxed text-slate-800">{card.subtitle}</p>
                          {disabled ? (
                            <span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-base font-semibold text-slate-500">
                              Coming soon
                            </span>
                          ) : (
                            <span className={`mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-xl border px-4 py-3 text-base font-semibold transition ${theme.btn}`}>
                              Create Your Account
                              <ChevronRight size={18} />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3 text-lg text-slate-700">
                  <span className="font-bold text-slate-900">Already have an account?</span>
                  <Link
                    href="/directory/login"
                    className="inline-flex items-center rounded-xl bg-sky-950 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-sky-800"
                  >
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
                  <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">Back to sign in</Link>
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setStep("type"); setStatus(null); }}
                  className="mb-6 flex items-center gap-1.5 text-lg font-bold text-slate-900 hover:text-black"
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

                <div className="mt-8 flex flex-wrap items-center gap-3 text-lg text-slate-700">
                  <span className="font-bold text-slate-900">Already have an account?</span>
                  <Link
                    href="/directory/login"
                    className="inline-flex items-center rounded-xl bg-sky-950 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-sky-800"
                  >
                    Sign in
                  </Link>
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
