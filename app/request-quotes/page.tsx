import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { RBA_DISCLAIMER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Request Quotes for Building Works | Remedial Building Australia",
  description:
    "Strata managers, owners corporations, building managers and property owners can request quotes for building works. We match your request to listed businesses by category and location.",
};

export const dynamic = "force-dynamic";

const STEPS = [
  { n: "1", title: "Tell us about your project", body: "Work category, property, location and a description. Attach photos, reports or drawings." },
  { n: "2", title: "Browse businesses servicing your area", body: "See businesses that service your location, ranked by membership, relevance and distance." },
  { n: "3", title: "Compare company profiles", body: "Open detailed profiles — logo, description, photos, licence and insurance details." },
  { n: "4", title: "Send quote requests to up to 5 businesses", body: "You choose who to contact — send your request to up to 5 businesses. No obligation." },
  { n: "5", title: "Businesses contact you directly", body: "The businesses you selected contact you to discuss and quote. You deal with them directly." },
];

export default async function RequestQuotesLandingPage() {
  const user = await getCurrentDirectoryUser();
  const isClient = user?.role === "client_user";
  const primaryHref = isClient ? "/directory/dashboard/quotes/new" : "/directory/login";
  const primaryLabel = isClient ? "Start a quote request" : "Create a client account";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-sky-900/30 bg-sky-950 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">Quote Request Platform</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Request quotes for building works from listed businesses
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-sky-100/85">
            For strata managers, owners corporations, building managers, property owners and consultants. Submit one
            request and we match it to listed businesses by category and location — they contact you directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryHref} className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
              {primaryLabel}
            </Link>
            {!isClient && (
              <Link href="/directory/login" className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-extrabold text-slate-900">How it works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-base font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-y border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-extrabold text-slate-900">Any building works — not just remedial</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            From cleaning and landscaping to waterproofing, concrete repair, facade works and new construction — request
            quotes for any category of building work across Australia.
          </p>
        </div>
      </section>

      {/* CTA + disclaimer */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">Ready to request quotes?</h2>
          <p className="mt-2 text-sm text-slate-600">Create a free client account and submit your first request in minutes.</p>
          <Link href={primaryHref} className="mt-6 inline-block rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800">
            {primaryLabel}
          </Link>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-6 text-slate-400">{RBA_DISCLAIMER}</p>
        </div>
      </section>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
