import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Remedial Building Australia",
  description:
    "Answers to common questions about Remedial Building Australia — an online directory and technical-knowledge platform connecting strata managers, owners corporations and building owners with remedial building services. We do not carry out building works.",
};

// FAQ content. `answer` is what renders on the page; `plain` is the text-only
// version used for the FAQPage structured data (rich results in search).
const FAQS: { q: string; plain: string; answer: React.ReactNode; highlight?: boolean }[] = [
  {
    q: "Does Remedial Building Australia carry out building or remedial works?",
    plain:
      "No. Remedial Building Australia is an online directory and technical-knowledge platform. We do not perform, manage, supervise or contract any building, remedial or repair works. We connect owners corporations, strata managers and building owners with independent contractors, consultants, engineers and suppliers who carry out the work. Any works are agreed and contracted directly between you and the service provider — RBA is not a party to that contract.",
    answer: (
      <>
        <p>
          <strong>No.</strong> Remedial Building Australia is an online <strong>directory</strong>{" "}
          and <strong>technical-knowledge platform</strong>. We do not perform, manage, supervise or
          contract any building, remedial or repair works ourselves.
        </p>
        <p className="mt-3">
          What we do is <strong>connect</strong> owners corporations, strata managers and building
          owners with independent contractors, consultants, engineers and suppliers who carry out
          the work. Any works are agreed and contracted <strong>directly between you and the
          service provider</strong> — RBA is not a party to that contract and does not deliver the
          works.
        </p>
      </>
    ),
  },
  {
    q: "What is Remedial Building Australia?",
    plain:
      "Remedial Building Australia is a strata and remedial building platform. It brings together a business directory, Strata Connect quote requests, a defect library, repair systems and a repair-system selector, a material index, an AI scope writer, a job board, industry news and an expert remedial advice section — resources that help the strata and remedial building sector find services and make informed repair decisions.",
    answer: (
      <>
        <p>
          It is a strata and remedial building platform that brings together everything the sector
          needs in one place:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>a <Link href="/directory" className="font-semibold text-sky-700 hover:underline">business directory</Link> of contractors, consultants, engineers and suppliers;</li>
          <li>Strata Connect quote requests and a <Link href="/request-quotes" className="font-semibold text-sky-700 hover:underline">request-a-quote</Link> system;</li>
          <li>a <Link href="/defect-library" className="font-semibold text-sky-700 hover:underline">defect library</Link>, <Link href="/repair-systems" className="font-semibold text-sky-700 hover:underline">repair systems</Link> and technical resources;</li>
          <li>a job board, industry news and an expert remedial advice section.</li>
        </ul>
      </>
    ),
  },
  {
    q: "How does Strata Connect work, and what do I need to use it?",
    highlight: true,
    plain:
      "Strata Connect lets a strata manager forward a work order or scope of works to our intake address; it is read, reviewed and turned into a quote request that is sent to matching businesses. Important: to use Strata Connect you must first create a free Remedial Building Australia account, and every work order must be sent from the email address you registered with. Work orders sent from an email address that does not have an RBA account are not processed and will not generate a quote request. This requirement keeps the system secure and prevents spam or automated submissions from flooding the platform.",
    answer: (
      <>
        <p>
          Strata Connect lets a strata manager forward a work order or scope of works to our intake
          address. It is read, reviewed by our team and turned into a quote request that is sent to
          the matching businesses in that trade and location.
        </p>
        <div className="mt-4 rounded-xl border-l-4 border-red-700 bg-red-50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">
            Important — before you send a work order
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
            <li>
              To use Strata Connect you must first{" "}
              <Link href="/directory/signup" className="font-semibold text-sky-700 hover:underline">
                create a free Remedial Building Australia account
              </Link>
              .
            </li>
            <li>
              Every work order must be sent from the <strong>email address you registered with</strong>.
            </li>
            <li>
              Work orders sent from an email address that does not have an RBA account are{" "}
              <strong>not processed</strong> and will not generate a quote request.
            </li>
          </ul>
          <p className="mt-2 text-sm text-slate-600">
            This keeps the system secure and prevents spam or automated submissions from flooding
            the platform.
          </p>
        </div>
      </>
    ),
  },
  {
    q: "Is it free to use?",
    plain:
      "Searching the directory, browsing the technical resources and requesting quotes is free for owners corporations, strata managers and building owners. Businesses pay to be listed and to advertise on the platform.",
    answer: (
      <p>
        Searching the directory, browsing the technical resources and requesting quotes is{" "}
        <strong>free</strong> for owners corporations, strata managers and building owners.
        Businesses pay to be listed and to advertise on the platform — see{" "}
        <Link href="/advertise" className="font-semibold text-sky-700 hover:underline">
          Advertise With Us
        </Link>
        .
      </p>
    ),
  },
  {
    q: "Who am I contracting with when I engage a service?",
    plain:
      "You contract directly with the independent third-party business you choose. Remedial Building Australia introduces you and passes on your request, but is not the contractor, does not deliver the works and is not a party to the agreement between you and the service provider.",
    answer: (
      <p>
        You contract <strong>directly with the independent business you choose</strong>. RBA
        introduces you and passes on your request, but is not the contractor, does not deliver the
        works, and is not a party to the agreement between you and the service provider.
      </p>
    ),
  },
  {
    q: "Does RBA recommend, endorse or guarantee the businesses listed?",
    plain:
      "No. Listing on the directory is not an endorsement or a guarantee of any business, its licensing, insurance or the quality of its work. You should carry out your own due diligence — confirm licences, insurances, references and suitability — before engaging any provider.",
    answer: (
      <p>
        No. A listing is <strong>not an endorsement or a guarantee</strong> of any business, its
        licensing, insurance or the quality of its work. Please carry out your own due diligence —
        confirm licences, insurances, references and suitability — before engaging any provider.
      </p>
    ),
  },
  {
    q: "How are businesses matched to my request?",
    plain:
      "Requests are matched by trade category and location. When you submit a request (directly or through Strata Connect), it is sent to the listed businesses that work in the relevant trade and service area.",
    answer: (
      <p>
        Requests are matched by <strong>trade category and location</strong>. When you submit a
        request — directly or through Strata Connect — it is sent to the listed businesses that work
        in the relevant trade and service area.
      </p>
    ),
  },
  {
    q: "Is the defect library and technical content a substitute for professional advice?",
    plain:
      "No. The defect library, repair systems and technical resources are general, educational information only. They are not site-specific engineering, building or professional advice. Always engage a suitably qualified consultant, engineer or contractor for advice on your specific building and defect.",
    answer: (
      <p>
        No. The <Link href="/defect-library" className="font-semibold text-sky-700 hover:underline">defect library</Link>,{" "}
        <Link href="/repair-systems" className="font-semibold text-sky-700 hover:underline">repair systems</Link> and
        technical resources are <strong>general, educational information only</strong>. They are not
        site-specific engineering, building or professional advice. Always engage a suitably
        qualified consultant, engineer or contractor for advice on your specific building and defect.
      </p>
    ),
  },
  {
    q: "How is my information handled?",
    plain:
      "Information you provide is handled in line with our Privacy Policy. Details you include in a quote request are shared with the matching businesses so they can respond to you.",
    answer: (
      <p>
        Information you provide is handled in line with our{" "}
        <Link href="/privacy-policy" className="font-semibold text-sky-700 hover:underline">
          Privacy Policy
        </Link>
        . Details you include in a quote request are shared with the matching businesses so they can
        respond to you.
      </p>
    ),
  },
  {
    q: "How do I list my business or get in touch?",
    plain:
      "Businesses can list and advertise through the Advertise With Us page. For anything else, use the Contact page.",
    answer: (
      <p>
        Businesses can list and advertise through{" "}
        <Link href="/advertise" className="font-semibold text-sky-700 hover:underline">Advertise With Us</Link>. For
        anything else, please use our{" "}
        <Link href="/contact" className="font-semibold text-sky-700 hover:underline">Contact</Link> page.
      </p>
    ),
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <div className="rounded-2xl border-l-4 border-red-700 bg-[linear-gradient(135deg,rgba(185,28,28,0.16)_0%,rgba(185,28,28,0.06)_12%,#ffffff_30%,#ffffff_100%)] p-7 shadow-sm sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-700">
            Help Centre
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Remedial Building Australia is a directory and technical-knowledge platform that
            connects clients with remedial building services. We do not carry out building works
            ourselves. The answers below cover how the platform works and how to use it.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className={`group rounded-xl border bg-white p-5 shadow-sm transition open:shadow-md ${
                f.highlight ? "border-red-200 ring-1 ring-red-100" : "border-slate-200"
              }`}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-sky-950 marker:content-none sm:text-lg">
                <span>{f.q}</span>
                <span className="shrink-0 text-xl font-normal text-red-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-base leading-8 text-slate-600">
                {f.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-base font-semibold text-sky-950">Still have a question?</p>
          <p className="mt-1 text-sm text-slate-600">
            We&rsquo;re happy to help — reach out and we&rsquo;ll get back to you.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-lg bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800"
          >
            Contact us
          </Link>
        </div>
      </main>

      {/* Footer — standard site links */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              Australia&rsquo;s strata and remedial building platform — directory, Strata
              Connect quote requests, defect library, repair systems and expert remedial
              advice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-sky-700">About</Link>
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
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
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
