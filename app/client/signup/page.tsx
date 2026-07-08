"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import TurnstileWidget from "@/components/TurnstileWidget";
import { validateAuPhone } from "@/lib/phone-au";
import { RBA_DISCLAIMER } from "@/lib/legal";

const CLIENT_TYPES: { id: string; label: string }[] = [
  { id: "strata_manager", label: "Strata manager" },
  { id: "owners_corp_rep", label: "Owners corporation representative" },
  { id: "building_manager", label: "Building manager" },
  { id: "property_owner", label: "Property owner" },
  { id: "consultant", label: "Consultant acting for owner / strata" },
  { id: "other", label: "Other client" },
];

type FormState = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  clientType: string;
};

export default function ClientSignupPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    clientType: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resendIn, setResendIn] = useState(60);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  const phoneCheck = form.phone ? validateAuPhone(form.phone) : null;

  // Start a 60s cooldown once the account is created, after which the user can
  // request another verification email.
  useEffect(() => {
    if (status?.type !== "success") return;
    setResendIn(60);
    const t = setInterval(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [status?.type]);

  async function resendVerification() {
    setResending(true);
    setResendMsg(null);
    const res = await fetch("/api/client/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }),
    });
    setResending(false);
    if (!res.ok) {
      setResendMsg("Couldn't resend just now. Please try again shortly.");
      return;
    }
    setResendMsg("Verification email re-sent. Check your inbox — and your spam/junk folder.");
    setResendIn(60);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phoneCheck && !phoneCheck.valid) {
      setStatus({ type: "error", message: phoneCheck.message });
      return;
    }
    if (!form.clientType) {
      setStatus({ type: "error", message: "Please select the option that best describes you." });
      return;
    }
    if (!termsAccepted) {
      setStatus({ type: "error", message: "You must accept the platform terms and disclaimer to continue." });
      return;
    }
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/client/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, termsAccepted, turnstileToken }),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit. Please try again." });
      return;
    }
    setStatus({ type: "success", message: result.message ?? "Verification email sent. Please check your inbox to continue." });
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          {status?.type === "success" ? (
            <div className="py-6">
              <div className="rounded-2xl bg-emerald-100 px-6 py-5 text-emerald-900">
                <p className="font-semibold">Check your inbox</p>
                <p className="mt-1 text-sm">{status.message}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm">
                {resendIn > 0 ? (
                  <p className="text-slate-500">
                    Didn't receive it? You can request another email in <span className="font-semibold text-slate-700">{resendIn}s</span>. Check your spam/junk folder too.
                  </p>
                ) : (
                  <button
                    onClick={resendVerification}
                    disabled={resending}
                    className="font-semibold text-sky-950 underline underline-offset-2 hover:text-sky-700 disabled:opacity-60"
                  >
                    {resending ? "Resending…" : "Resend verification email"}
                  </button>
                )}
                {resendMsg && <p className="mt-2 font-medium text-emerald-700">{resendMsg}</p>}
              </div>

              <p className="mt-6 text-sm text-slate-500">
                <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">
                  Back to sign in
                </Link>
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Link href="/" className="text-lg font-bold text-slate-900 hover:text-black">
                  &larr; Back to home
                </Link>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Strata / Client Account
              </p>
              <h1 className="text-2xl font-extrabold text-slate-950 md:text-3xl">Create your client account</h1>
              <p className="mt-2 text-sm text-slate-600">
                For strata managers, owners corporations, building managers, property owners and consultants who want to
                request quotes for building works from listed businesses.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <fieldset className="space-y-2">
                  <legend className="text-sm font-semibold text-slate-800">Which best describes you?</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CLIENT_TYPES.map((type) => (
                      <label
                        key={type.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                          form.clientType === type.id
                            ? "border-sky-600 bg-sky-50 text-sky-900"
                            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-sky-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="clientType"
                          value={type.id}
                          checked={form.clientType === type.id}
                          onChange={(e) => setForm({ ...form, clientType: e.target.value })}
                          className="h-4 w-4 accent-sky-950"
                        />
                        <span className="font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={inputClass}
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>
                    Company / strata management company <span className="font-normal text-slate-400">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
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
                      phoneCheck && !phoneCheck.valid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-300 focus:border-sky-600"
                    }`}
                    required
                  />
                  {phoneCheck && !phoneCheck.valid && (
                    <span className="block text-xs font-medium text-rose-600">{phoneCheck.message}</span>
                  )}
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    required
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                    <span>Password</span>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      autoComplete="new-password"
                      className={inputClass}
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
                      className={inputClass}
                      minLength={8}
                      required
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-sky-950"
                    />
                    <span>
                      I accept the platform terms and disclaimer. {RBA_DISCLAIMER}
                    </span>
                  </label>
                </div>

                <TurnstileWidget onToken={setTurnstileToken} />

                {status?.type === "error" ? (
                  <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-900">{status.message}</div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account…" : "Create client account"}
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
      </main>
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
