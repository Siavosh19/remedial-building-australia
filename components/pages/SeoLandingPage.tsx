import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
import { ArrowRight } from "lucide-react";

const SITE_URL = "https://www.remedialbuildingaustralia.com.au";

/**
 * Shared SEO landing-page layout.
 *
 * These pages exist to give high-intent search queries (e.g. "remedial building
 * services", "building remediation") a clear, professional entry point that maps
 * onto the platform's existing sections. They reuse the site header and the
 * standard footer so the design matches the rest of the site exactly — no new
 * visual language is introduced.
 */

export type SeoLandingSection = {
  heading: string;
  paragraphs: string[];
};

export type SeoLandingLink = {
  label: string;
  href: string;
  description: string;
};

export type SeoLandingConfig = {
  /** Path of this page, e.g. "/remedial-building-services" — used for breadcrumb schema. */
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Primary call-to-action shown in the hero. */
  primaryCta: { label: string; href: string };
  sections: SeoLandingSection[];
  /** Cards linking out to the relevant platform sections. */
  links: SeoLandingLink[];
  /** Plain in-text related links shown at the foot of the copy. */
  relatedLinks?: { label: string; href: string }[];
};

export default function SeoLandingPage({ config }: { config: SeoLandingConfig }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.h1, item: `${SITE_URL}${config.path}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
              {config.eyebrow}
            </div>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              {config.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{config.intro}</p>
            <div className="mt-8">
              <a
                href={config.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-red-800"
              >
                {config.primaryCta.label}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Body copy ── */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col gap-12">
            {config.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-extrabold tracking-tight text-sky-950 md:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related platform sections ── */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-sky-950 md:text-3xl">
              Explore the platform
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {config.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-red-700" />
                  <div className="text-lg font-extrabold text-sky-950">{l.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{l.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-bold text-sky-700 transition group-hover:text-red-700">
                    View more <ArrowRight className="ml-2" size={15} />
                  </span>
                </a>
              ))}
            </div>

            {config.relatedLinks && config.relatedLinks.length > 0 && (
              <p className="mt-10 text-sm leading-7 text-slate-500">
                Related:{" "}
                {config.relatedLinks.map((r, i) => (
                  <span key={r.href}>
                    <a href={r.href} className="font-semibold text-sky-700 hover:text-red-700">
                      {r.label}
                    </a>
                    {i < config.relatedLinks!.length - 1 ? ", " : ""}
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        </section>
        <SeoCrossPromo />
      </main>

      {/* ── Footer (matches site) ── */}
      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
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
