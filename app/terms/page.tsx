import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
export const metadata: Metadata = {
  title: "Terms & Conditions | Remedial Building Australia",
  description: "Terms and conditions for using the Remedial Building Australia website — last updated June 2026.",
};

type Section = {
  number: string;
  title: string;
  content?: string;
  bullets?: string[];
  privacyFooter?: boolean;
};

const sections: Section[] = [
  {
    number: "1",
    title: "About This Website",
    bullets: [
      'Remedial Building Australia ("the Platform") is operated by Arasep Projects Pty Ltd ABN 20 675 874 003.',
      "The Platform provides a defect library, repair system and materials information, industry news, a business directory, training resources and an AI-assisted scope writing tool relating to Australian Class 2 and remedial building works.",
      "By accessing or using the Platform you agree to these terms and conditions.",
    ],
  },
  {
    number: "2",
    title: "Use of This Website",
    bullets: [
      "The Platform provides technical reference content and a directory of building and strata industry businesses across Australia.",
      "Information displayed is sourced from publicly available sources and submitted by businesses.",
      "Remedial Building Australia does not guarantee the accuracy of any listing or content.",
      "Listed businesses have not been endorsed or vetted unless explicitly stated.",
    ],
  },
  {
    number: "3",
    title: "No Professional Advice — Information Only",
    bullets: [
      "All content — including the Defect Library, Repair Systems, Materials & Products, Courses, articles and any AI-generated output — is general information only.",
      "It is NOT engineering, building, design or compliance advice, NOT compliance certification, and does NOT create any consultant, engineer, certifier or advisor relationship between you and us.",
      "It is NOT a substitute for site-specific assessment by a licensed, qualified professional engaged for your particular building, defect and circumstances.",
    ],
  },
  {
    number: "4",
    title: "You Must Independently Verify Everything",
    bullets: [
      "Do not rely on any content, figure, coverage rate, product detail, repair method, clause or AI output without independent verification by a suitably qualified and licensed professional.",
      "Product and material information may be incomplete, generalised, placeholder or out of date. Always verify against the current manufacturer Technical Data Sheet (TDS), Safety Data Sheet (SDS) and warranty conditions before specifying or using any product.",
      "Standards, the NCC, the DBP Act and other regulatory requirements change. You are responsible for confirming current compliance requirements.",
    ],
  },
  {
    number: "5",
    title: "AI Scope Builder",
    bullets: [
      "The AI Scope Builder produces AI-assisted draft output assembled from selections you make. Output may contain errors, omissions, or technically inappropriate content.",
      "Every generated scope must be reviewed, corrected and signed off by a qualified remedial building consultant or engineer before any use, issue, tender or construction.",
      "AI output does NOT constitute engineering advice, a warranty, a guarantee of fitness for purpose, or compliance certification.",
      "You are solely responsible for the final content of any scope you issue or act upon, and for all consequences of its use.",
    ],
  },
  {
    number: "6",
    title: "No Warranties",
    bullets: [
      'To the maximum extent permitted by law, the Platform and all content are provided "as is" and "as available".',
      "We make no representation or warranty (express or implied) as to accuracy, completeness, currency, reliability, suitability or fitness for any particular purpose.",
    ],
  },
  {
    number: "7",
    title: "Limitation of Liability",
    bullets: [
      "Nothing in these terms excludes, restricts or modifies any guarantee, right or remedy you may have under the Australian Consumer Law or other law that cannot lawfully be excluded.",
      "To the maximum extent permitted by law, we exclude all liability for any loss, damage, cost or expense (including direct, indirect, consequential, economic, property or personal injury loss) arising out of or in connection with: your use of or reliance on the Platform or any content; any AI-generated output; any error, omission or inaccuracy; any defect, repair, specification or building work informed by the Platform; or any third-party product, data sheet, listing or business.",
      "Where liability cannot be excluded but can be limited, our total aggregate liability is limited, at our option, to resupplying the relevant information or service or paying the reasonable cost of resupply. To the extent any monetary cap is enforceable, our total aggregate liability will not exceed AUD $100 or the amount you paid us to access the relevant content, whichever is greater.",
    ],
  },
  {
    number: "8",
    title: "Indemnity",
    bullets: [
      "To the maximum extent permitted by law, you indemnify and hold harmless Arasep Projects Pty Ltd, its directors, officers and contributors against all claims, liabilities, losses, costs and expenses (including legal costs) arising from your use of the Platform, your reliance on any content or AI output, or your breach of these terms.",
    ],
  },
  {
    number: "9",
    title: "Assumption of Risk",
    bullets: [
      "You acknowledge that remedial building work carries inherent risks, that building decisions must be made by qualified professionals, and that you assume all risk arising from any decision made wholly or partly in reliance on the Platform.",
    ],
  },
  {
    number: "10",
    title: "Directory & Licence Information",
    bullets: [
      "The directory lists businesses from publicly available sources and business submissions. We do not endorse, vet or guarantee any listed business unless expressly stated.",
      "Licence details are shown in good faith. Independently verify licence status before engaging any business.",
      "Remedial Building Australia accepts no liability for lapsed, incorrect or out-of-date listing or licence information.",
    ],
  },
  {
    number: "11",
    title: "Third-Party Content & Links",
    bullets: [
      "We are not responsible for third-party websites, product data, data sheets or content linked from or referenced on the Platform.",
    ],
  },
  {
    number: "12",
    title: "Copyright and Intellectual Property",
    bullets: [
      "All website content, directory data, category structure, repair systems, defect library content, written content, design and layout is owned by Arasep Projects Pty Ltd. All rights reserved.",
      "No part of this website may be copied, reproduced, republished, uploaded, distributed or transmitted in any form without prior written permission from Arasep Projects Pty Ltd.",
      "Unauthorised use of any content may result in legal action.",
    ],
  },
  {
    number: "13",
    title: "Privacy",
    bullets: [
      "We collect names and contact details submitted via enquiry forms.",
      "We collect business details including ABN and licence information submitted by directory listings.",
      "We do not sell personal information to third parties.",
      "Business listing information is displayed publicly as part of the directory.",
      "You may request access, correction or removal of your personal information by contacting info@remedialbuildingaustralia.com.au.",
      "We handle all personal information in accordance with the Australian Privacy Act 1988.",
    ],
    privacyFooter: true,
  },
  {
    number: "14",
    title: "Removal Requests",
    bullets: [
      "Businesses may request removal from the directory by contacting info@remedialbuildingaustralia.com.au.",
      "Requests will be actioned within 14 business days.",
    ],
  },
  {
    number: "15",
    title: "Changes to These Terms",
    bullets: [
      "We reserve the right to update these terms at any time.",
      "Continued use of the website constitutes acceptance of updated terms.",
    ],
  },
  {
    number: "16",
    title: "Governing Law",
    bullets: [
      "These terms are governed by the laws of New South Wales, Australia, and you submit to the exclusive jurisdiction of its courts.",
    ],
  },
  {
    number: "17",
    title: "Directory Subscriptions, Billing & Top Listing Placement",
    bullets: [
      "Directory listing plans are: Basic (free), Business and Premium. Paid plans are recurring subscriptions billed in advance, monthly or yearly, at the price shown at the time of purchase, in Australian dollars.",
      "By subscribing you authorise Arasep Projects Pty Ltd, via our payment processor Stripe, to charge your nominated payment method for the recurring fee until you cancel. Subscriptions renew automatically at the end of each billing period.",
      "Paid plans unlock the listing features described on the pricing page for that plan (claiming and managing your profile, logo and project photos, licence/insurance display, quote request button, and for Premium, Top Listing placement). Feature inclusions may change over time.",
      "Top Listing / Premium placement: a maximum of three (3) Top Listing positions are available per category. Positions are filled strictly in order of subscription date — the first business to subscribe holds position one, the second holds position two, the third holds position three. No business is guaranteed any specific position other than its order of subscription, and no #1 or sole placement is promised. Top Listed businesses appear above standard results for their chosen category for the duration of the active subscription only.",
      "Placement, ranking, visibility and the order of search results may change as our search, ranking and category logic evolves, and are not guaranteed.",
      "We do not guarantee any leads, enquiries, quote requests, calls, clicks, sales, work or any commercial result from any listing or subscription. A listing is an advertising placement only.",
      "Cancellation: you may cancel at any time from your dashboard. Your paid features remain active until the end of the period you have already paid for, after which the listing reverts to the free Basic plan. Yearly plans remain active until the end of the paid yearly term.",
      "Refunds: fees are generally non-refundable. We may, at our sole discretion, issue a full or partial refund and, where we do, may cancel the subscription and revert the listing to Basic immediately. Nothing in these terms limits any non-excludable rights you may have under the Australian Consumer Law.",
      "Prices are subject to change; any change applies from your next renewal. A receipt is issued by email for each successful payment.",
      "We may suspend, downgrade, remove or decline any listing or subscription that breaches these terms, is fraudulent, or misrepresents the business.",
      "You warrant that information you submit (business name, ABN, licence, insurance, description, logo and photos) is accurate, current, lawfully provided, and that you are authorised to publish it.",
    ],
  },
  {
    number: "18",
    title: "Contact",
    content: "Last updated: June 2026\n\nFor all enquiries contact: info@remedialbuildingaustralia.com.au",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

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
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base text-slate-500">
              Remedial Building Australia &mdash; Last Updated: June 2026
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

                {section.privacyFooter && (
                  <p className="mt-4 text-base leading-7 text-slate-700">
                    For full details, see our{" "}
                    <a href="/privacy-policy" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700 transition">
                      Privacy Policy
                    </a>.
                  </p>
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
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
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
