"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type CompanyInfo = {
  name: string;
  slug: string;
  suburb: string | null;
  state: string;
  is_claimed: boolean;
  listing_claim_status: string;
};

export default function ClaimListingPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", abn: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/directory/company-info?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setNotFound(true);
        else setCompany(data);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const res = await fetch("/api/directory/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...form }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setStatus({ type: "error", message: data.error ?? "Something went wrong." });
      return;
    }

    setStatus({
      type: "success",
      message: data.autoClaimed
        ? "Listing claimed! Check your inbox to verify your email and access your dashboard."
        : "Thanks — we couldn't automatically match your ABN to this listing, so your claim has been sent for a quick manual review. Check your inbox to verify your email in the meantime.",
    });
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md text-center">
          <p className="text-2xl font-bold text-slate-950">Listing not found</p>
          <p className="mt-2 text-slate-500">We could not find this business listing.</p>
          <a href="/directory" className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Back to directory
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <div className="mb-6">
          <a href="/directory" className="text-lg font-bold text-slate-900 hover:text-black">
            ← Back to directory
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Dark header */}
          <div className="rounded-t-2xl bg-slate-950 px-8 py-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Claim your listing</p>
            {company ? (
              <>
                <h1 className="mt-2 text-xl font-bold text-white">{company.name}</h1>
                <p className="mt-1 text-sm text-slate-400">
                  {[company.suburb, company.state].filter(Boolean).join(", ")}
                </p>
              </>
            ) : (
              <div className="mt-2 h-6 w-48 animate-pulse rounded bg-slate-800" />
            )}
          </div>

          {/* Already claimed or pending */}
          {(company?.listing_claim_status === "claimed" || company?.is_claimed) ? (
            <div className="px-8 py-8 text-center">
              <p className="text-lg font-bold text-slate-950">Already claimed</p>
              <p className="mt-2 text-sm text-slate-500">
                This listing has already been claimed by its owner.
              </p>
              <a
                href="/directory/login"
                className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign in to your account
              </a>
            </div>
          ) : company?.listing_claim_status === "claim_pending" ? (
            <div className="px-8 py-8 text-center">
              <p className="text-lg font-bold text-slate-950">Claim under review</p>
              <p className="mt-2 text-sm text-slate-500">
                A claim for this listing is currently under review. If this is your business, please contact us.
              </p>
              <a
                href="/directory/login"
                className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign in to your account
              </a>
            </div>
          ) : status?.type === "success" ? (
            <div className="px-8 py-8">
              <div className="rounded-xl bg-blue-50 border border-blue-200 px-6 py-5">
                <p className="font-bold text-blue-900">Listing claimed successfully</p>
                <p className="mt-2 text-sm text-blue-700">{status.message}</p>
              </div>
              <a
                href="/directory/login"
                className="mt-6 block text-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Go to login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
              <p className="text-sm text-slate-600">
                Create your account to take ownership of this listing, update your details, and start receiving leads.
              </p>

              {status?.type === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {status.message}
                </div>
              )}

              {(["fullName", "email", "phone", "abn", "password", "confirmPassword"] as const).map((field) => (
                <label key={field} className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {field === "fullName" ? "Full name" :
                     field === "confirmPassword" ? "Confirm password" :
                     field === "abn" ? "ABN" :
                     field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  <input
                    type={field.toLowerCase().includes("password") ? "password" : field === "email" ? "email" : "text"}
                    required
                    inputMode={field === "abn" ? "numeric" : undefined}
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  {field === "abn" && (
                    <span className="block text-[11px] font-normal normal-case text-slate-400">
                      Your 11-digit ABN. If it matches the one we hold for this listing, you're verified instantly.
                    </span>
                  )}
                </label>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Claiming…" : "Claim this listing"}
              </button>

              <p className="text-center text-xs text-slate-400">
                Already have an account?{" "}
                <a href="/directory/login" className="font-semibold text-blue-600 hover:text-blue-700">
                  Sign in
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
