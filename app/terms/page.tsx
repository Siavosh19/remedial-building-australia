import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Remedial Building Australia",
  description: "Terms and conditions for using the Remedial Building Australia website.",
};

const sections = [
  {
    number: "1",
    title: "About This Website",
    content: "Remedial Building Australia is a website operated by Arasep Projects Pty Ltd ABN 20 675 874 003.\n\nBy accessing or using Remedial Building Australia you agree to the following terms and conditions.",
  },
  {
    number: "2",
    title: "Use of This Website",
    bullets: [
      "This website provides a directory of building and strata industry businesses across Australia",
      "Information displayed is sourced from publicly available sources and submitted by businesses",
      "Remedial Building Australia does not guarantee the accuracy of any listing information",
      "Listed businesses have not been endorsed or vetted unless explicitly stated",
    ],
  },
  {
    number: "3",
    title: "Privacy",
    bullets: [
      "We collect names and contact details submitted via enquiry forms",
      "We collect business details including ABN and licence information submitted by directory listings",
      "We do not sell personal information to third parties",
      "Business listing information is displayed publicly as part of the directory",
      "You may request access, correction or removal of your personal information by contacting us at info@remedialbuildingaustralia.com.au",
      "We handle all personal information in accordance with the Australian Privacy Act 1988",
    ],
  },
  {
    number: "4",
    title: "Licence Information",
    bullets: [
      "Licence details displayed are shown in good faith",
      "Users should independently verify licence status before engaging any listed business",
      "Remedial Building Australia accepts no liability for lapsed or incorrect licence information",
    ],
  },
  {
    number: "5",
    title: "Copyright and Intellectual Property",
    bullets: [
      "All website content, directory data, category structure, repair systems, defect library content, written content, design and layout is owned by Arasep Projects Pty Ltd",
      "All rights reserved",
      "No part of this website may be copied, reproduced, republished, uploaded, distributed or transmitted in any form without prior written permission from Arasep Projects Pty Ltd",
      "Unauthorised use of any content from this website may result in legal action",
    ],
  },
  {
    number: "6",
    title: "Limitation of Liability",
    bullets: [
      "Remedial Building Australia and Arasep Projects Pty Ltd accept no liability for any loss or damage arising from use of this directory or engagement with any listed business",
      "We make no warranties about the completeness or accuracy of information displayed on this website",
    ],
  },
  {
    number: "7",
    title: "Removal Requests",
    bullets: [
      "Businesses may request removal from the directory by contacting info@remedialbuildingaustralia.com.au",
      "Requests will be actioned within 14 business days",
    ],
  },
  {
    number: "8",
    title: "Changes to These Terms",
    bullets: [
      "We reserve the right to update these terms at any time",
      "Continued use of the website constitutes acceptance of updated terms",
    ],
  },
  {
    number: "9",
    title: "Contact",
    content: "Last updated: May 2025\n\nFor all enquiries contact: info@remedialbuildingaustralia.com.au",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>

          </nav>

          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-4xl">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Legal
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-base text-slate-500">
              Remedial Building Australia &mdash; Last Updated: May 2025
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Remedial Building Australia is operated by Arasep Projects Pty Ltd ABN 20 675 874 003. By accessing or using this website, you agree to the following terms and conditions.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {sections.map((section) => (
              <div key={section.number} className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                  {section.number.padStart(2, "0")}
                </div>
                <h2 className="text-2xl font-bold text-sky-950">{section.title}</h2>

                {section.content && (
                  <p className="mt-4 text-base leading-8 text-slate-700 whitespace-pre-line">
                    {section.content}
                  </p>
                )}

                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-slate-800" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
