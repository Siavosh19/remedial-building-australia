import type { Metadata } from "next";
import Link from "next/link";
import { Mail, UserPlus, Send, MapPin, Bell, Handshake, ArrowRight, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const WORKORDER_EMAIL = "workorders@remedialbuildingaustralia.com.au";

export const metadata: Metadata = {
  title: "Strata Connect — Forward a work order, get competitive quotes | Remedial Building Australia",
  description:
    "Owners corporations and strata managers forward a work order to one email address. Strata Connect converts it into a quote request and matches it to available businesses near the building. Create a free account to get started.",
  alternates: { canonical: "https://www.remedialbuildingaustralia.com.au/strata-connect" },
  openGraph: {
    title: "Strata Connect — Forward a work order, get competitive quotes",
    description:
      "Forward a work order to one email address. It becomes a quote request matched to available businesses near the building.",
    url: "https://www.remedialbuildingaustralia.com.au/strata-connect",
    type: "website",
    siteName: "Remedial Building Australia",
  },
};

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    body: "Register once as a strata manager, owners corporation or consultant. This puts your email address in the system so we recognise your work orders — only registered senders are accepted.",
  },
  {
    icon: Send,
    title: "Forward your work order",
    body: (
      <>
        Simply forward the work order — from the email address you registered with — to{" "}
        <span className="whitespace-nowrap font-semibold text-sky-950">{WORKORDER_EMAIL}</span>. No forms to fill in,
        no details to re-type.
      </>
    ),
  },
  {
    icon: Mail,
    title: "It becomes a quote request",
    body: "We convert your forwarded work order into a structured quote request automatically — capturing the scope, location and requirements from your email and its attachments.",
  },
  {
    icon: MapPin,
    title: "Matched to businesses near the building",
    body: "Your request is matched to available businesses operating within around 50 km of the site — the right trades, close to the work.",
  },
  {
    icon: Bell,
    title: "You're notified of interest",
    body: "Businesses that want the work register their interest, and you receive an email notification each time — so you can see who is available and keen to quote.",
  },
  {
    icon: Handshake,
    title: "Connect and choose",
    body: "Connect directly with the businesses you're interested in, compare their competitive quotes side by side, and appoint the one that suits the job.",
  },
];

export default function StrataConnectPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-14 pb-8">
        <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Strata Connect</div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">
          Forward a work order once — get competitive quotes back
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
          Strata Connect turns a strata work order into competitive quotes without the admin. Owners corporations and
          strata managers forward a work order to a single email address — from remedial building works to cleaning and
          maintenance — and it&rsquo;s matched to available businesses near the building who compete for the job.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/client/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-red-800"
          >
            Create your account <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-sky-950 transition hover:bg-sky-50"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Work-order email callout */}
      <section className="mx-auto max-w-5xl px-5 pb-4">
        <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-200 sm:flex">
              <Mail className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold uppercase tracking-wide text-slate-500">Forward your work orders to</div>
              <a
                href={`mailto:${WORKORDER_EMAIL}`}
                className="mt-1 block break-all text-xl font-extrabold text-sky-950 hover:text-sky-700 md:text-2xl"
              >
                {WORKORDER_EMAIL}
              </a>
              <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  You need a registered account first, and must forward from the email address you registered with —
                  this keeps the service secure and ensures your request reaches the right specialists.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-5 pt-10 pb-4 scroll-mt-24">
        <div className="mb-2 text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">How it works</div>
        <h2 className="text-2xl font-extrabold tracking-tight text-sky-950 md:text-3xl">
          From work order to quotes, in six steps
        </h2>

        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={i} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-950 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-sky-950">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="rounded-2xl bg-sky-950 p-8 text-center md:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-sky-100">
            Create your account so your email is recognised, then forward your first work order to{" "}
            <span className="whitespace-nowrap font-semibold text-white">{WORKORDER_EMAIL}</span>.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/client/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-red-800"
            >
              Create an account <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`mailto:${WORKORDER_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/20"
            >
              <Mail className="h-5 w-5" /> {WORKORDER_EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and
              AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/materials-products-index" className="hover:text-sky-700">Materials Index</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/advertise/marketing-guide" className="hover:text-sky-700">Marketing Guide</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
