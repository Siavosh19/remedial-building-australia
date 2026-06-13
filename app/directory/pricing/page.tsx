import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Directory Pricing | Remedial Building Australia",
  description: "List your business on the Remedial Building Australia contractor directory. Basic listing is free. Claim your profile from $29/month.",
};

const DISCLAIMER =
  "Directory listings are provided for information only. Remedial Building Australia does not endorse, certify, verify, warrant, or guarantee any listed business. Users should make their own enquiries and check licences, insurance, experience, references, and suitability before engaging any provider.";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <SiteHeader />

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700 mb-3">Directory Plans</p>
          <h1 className="text-4xl font-extrabold text-sky-950 md:text-5xl">List your business</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-slate-600">
            Get your business in front of strata managers, building committees, and consultants across Australia.
            Basic listing is always free. Claim your profile to take full control.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Basic */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Basic Listing</p>
            <p className="mt-4 text-4xl font-extrabold text-slate-950">Free</p>
            <p className="mt-1 text-sm text-slate-400">Always free</p>
            <ul className="mt-6 space-y-3 flex-1">
              {[
                "Public directory listing",
                "Business name",
                "Category",
                "Phone, email and website where available",
                "Suburb and service location",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-slate-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Create free listing
            </a>
          </div>

          {/* Claimed */}
          <div className="rounded-3xl border-2 border-sky-400 bg-white p-8 shadow-md flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-sky-950 px-4 py-1 text-xs font-bold text-white">
              Popular
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Claimed Profile</p>
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-4xl font-extrabold text-slate-950">$29<span className="text-lg font-semibold">/month</span></p>
              <p className="text-sm text-slate-500">or $270/year <span className="text-emerald-600 font-semibold">Save ~22%</span></p>
            </div>
            <p className="mt-2 text-sm font-semibold text-emerald-700">60-day free trial</p>
            <ul className="mt-6 space-y-3 flex-1">
              {[
                "60-day free trial — no charge until trial ends",
                "Claim and manage your profile",
                "Logo upload",
                "Business description",
                "Up to 5 project photos",
                "Service areas",
                "Licence details provided",
                "Insurance details provided",
                "Quote request button enabled",
                "Profile dashboard access",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-sky-600">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl bg-sky-950 py-3 text-center text-sm font-bold text-white hover:bg-sky-800 transition"
            >
              Start free trial →
            </a>
          </div>

          {/* Featured */}
          <div className="rounded-3xl border-2 border-red-400 bg-white p-8 shadow-sm flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-600">Featured Profile</p>
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-4xl font-extrabold text-slate-950">$79<span className="text-lg font-semibold">/month</span></p>
              <p className="text-sm text-slate-500">or $750/year <span className="text-emerald-600 font-semibold">Save ~21%</span></p>
            </div>
            <p className="mt-2 text-sm font-semibold text-emerald-700">60-day free trial</p>
            <ul className="mt-6 space-y-3 flex-1">
              {[
                "60-day free trial — no charge until trial ends",
                "Everything in Claimed Profile",
                "Featured badge on your listing",
                "Shown first in directory before search/filter",
                "Shown above others in matching category and location results",
                "Up to 10 project photos",
                "More visibility across the directory",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-red-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl bg-red-700 py-3 text-center text-sm font-bold text-white hover:bg-red-600 transition"
            >
              Start free trial →
            </a>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-8 py-6 space-y-2 text-sm text-slate-500">
          <p>Monthly plans can be cancelled anytime. Access continues until the end of the paid billing period.</p>
          <p>Yearly plans renew annually unless cancelled before the renewal date. Access remains active until the end of the paid yearly term.</p>
          <p>No automatic refunds. No lead delivery guarantee. No results guarantee.</p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
          <p className="font-semibold mb-1">Directory disclaimer</p>
          <p>{DISCLAIMER}</p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/directory" className="text-sm font-semibold text-sky-700 hover:text-sky-900">
            ← Browse the directory
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
