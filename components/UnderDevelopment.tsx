import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import type { UnderDevelopmentSection } from "@/lib/under-development";

// Sections that are still fully live — offered as somewhere to go next.
const liveLinks = [
  { title: "Business Directory", href: "/directory", description: "Find remedial builders, consultants, engineers and suppliers across Australia." },
  { title: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Scope and tender reviews, budget estimates, repair strategy and capital works forecasts." },
  { title: "Request Quotes", href: "/directory/login", description: "Send your remedial project to matched contractors through Strata Connect." },
  { title: "Industry Jobs", href: "/industry-jobs", description: "Current remedial building and strata roles advertised across the industry." },
];

/**
 * The notice shown in place of a section that is temporarily disconnected while
 * it is still being built (see lib/under-development.ts).
 */
export default function UnderDevelopment({ section }: { section: UnderDevelopmentSection }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-sky-100 bg-gradient-to-b from-sky-50 to-white">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800">
              Under development
            </div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-sky-950 md:text-5xl">
              {section.title} is under development
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 md:text-lg">
              {section.blurb} It is temporarily unavailable while we finish the work — please
              check back soon.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-900 transition hover:bg-sky-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 className="text-center text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
            In the meantime
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {liveLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-sky-100 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                <div className="text-lg font-extrabold text-sky-950 group-hover:text-sky-800">
                  {link.title}
                </div>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              Australia&rsquo;s strata directory and remedial building platform for jobs, technical
              resources and industry connections.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/expert-remedial-advice" className="hover:text-sky-700">Expert Advice</Link>
              <Link href="/industry-jobs" className="hover:text-sky-700">Industry Jobs</Link>
              <Link href="/directory/login" className="hover:text-sky-700">Request Quotes</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All
          rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
