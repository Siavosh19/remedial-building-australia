import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Remedial Building Australia",
  description: "Terms and conditions for using the Remedial Building Australia website.",
};

const sections = [
  {
    number: "1",
    title: "General Information",
    content: `Remedial Building Australia provides general educational, technical, and industry-related information relating to remedial building, waterproofing, concrete repair, façade rectification, building defects, repair systems, materials, and associated construction topics.\n\nThe information provided on this website is intended for general informational purposes only and should not be relied upon as project-specific professional advice.`,
  },
  {
    number: "2",
    title: "No Professional Advice",
    content: "The content on this website does not constitute:",
    bullets: [
      "Engineering advice",
      "Structural advice",
      "Waterproofing certification",
      "Legal advice",
      "Building certification advice",
      "Professional consulting services",
      "Project-specific construction advice",
    ],
    footer: "Users should obtain independent advice from appropriately qualified professionals before relying on any information for design, construction, rectification, certification, compliance, or legal purposes.",
  },
  {
    number: "3",
    title: "Accuracy of Information",
    content: "While reasonable efforts are made to keep information accurate and current, Remedial Building Australia makes no warranties or representations regarding:",
    bullets: [
      "Accuracy",
      "Completeness",
      "Suitability",
      "Reliability",
      "Compliance with current legislation or standards",
    ],
    footer: "Building codes, Australian Standards, regulations, and product systems may change over time. Users are responsible for independently verifying all technical information.",
  },
  {
    number: "4",
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, Remedial Building Australia excludes all liability for any loss, damage, cost, or expense arising directly or indirectly from:",
    bullets: [
      "Reliance on website content",
      "Errors or omissions",
      "Technical inaccuracies",
      "Outdated information",
      "Use of repair methodologies",
      "Construction defects",
      "Product selection decisions",
      "Scope preparation",
      "AI-generated content or suggestions",
    ],
    footer: "Use of this website is entirely at the user's own risk.",
  },
  {
    number: "5",
    title: "AI-Generated Content",
    content: "Certain sections of the website may utilise artificial intelligence tools or automated systems to assist with:",
    bullets: [
      "Scope generation",
      "Technical summaries",
      "Defect categorisation",
      "Repair methodology suggestions",
      "Content recommendations",
    ],
    footer: "AI-generated information may contain errors, omissions, or incomplete recommendations and must always be independently reviewed by qualified professionals before use.",
  },
  {
    number: "6",
    title: "Intellectual Property",
    content: "Unless otherwise stated, all website content including text, graphics, layouts, databases, technical categorisation systems, articles, branding, logos, images, and downloadable resources are the property of Remedial Building Australia and may not be reproduced, copied, distributed, or commercially used without prior written consent.",
  },
  {
    number: "7",
    title: "Third-Party Links & Products",
    content: "This website may contain links to third-party websites, suppliers, manufacturers, articles, or external resources. Remedial Building Australia does not endorse or guarantee third-party products, supplier performance, external website accuracy, or external technical advice. Users access third-party resources at their own discretion and risk.",
  },
  {
    number: "8",
    title: "News & Industry Commentary",
    content: `Remedial Building Australia publishes industry news summaries and editorial commentary for general informational purposes. Users should be aware of the following:\n\nPlatform identity: Remedial Building Australia is an independent industry information platform. It is not a news publisher, engineering consultant, building certifier, legal advisor, or practitioner service provider.\n\nEditorial summaries: News summaries are prepared as independent editorial commentary. They do not reproduce original article wording and are not a substitute for reading the original source material.\n\nHedged language: Industry commentary uses cautious, hedged language ("may", "could", "is reported to", "appears to"). This language is intentional and does not constitute a professional assessment of any obligation, requirement, or legal position.\n\nIndependent verification: All news and commentary should be independently verified against primary sources — including legislation, official regulatory publications, and qualified professional advice — before being relied upon for any purpose.`,
  },
  {
    number: "9",
    title: "No Professional Advice — Expanded",
    content: "For the avoidance of doubt, nothing on this website constitutes:",
    bullets: [
      "Engineering advice or engineering certification",
      "Structural engineering assessment or advice",
      "Waterproofing certification or compliance assessment",
      "Legal advice or legal opinion",
      "Building certification advice",
      "Insurance advice",
      "Professional consulting services of any kind",
      "Project-specific construction or remediation advice",
      "Regulatory compliance advice",
      "Any representation that products, systems, or methodologies described are suitable for any specific project",
    ],
    footer: "Users must obtain independent advice from appropriately qualified professionals — including engineers, lawyers, certifiers, and licensed contractors — before relying on any information for design, construction, rectification, certification, compliance, insurance, or legal purposes.",
  },
  {
    number: "10",
    title: "External Links Disclaimer",
    content: "This website contains links to external websites and original source articles. When you follow an external link:",
    bullets: [
      "You are leaving the Remedial Building Australia platform",
      "Remedial Building Australia has no control over the content, accuracy, or availability of external sites",
      "External links are provided for reference only and do not constitute an endorsement",
      "The content of external sites may have changed since the link was published",
      "Remedial Building Australia accepts no responsibility for the content of external websites",
    ],
    footer: "Always verify information from external sources independently before relying on it.",
  },
  {
    number: "11",
    title: "User Conduct",
    content: "Users agree not to:",
    bullets: [
      "Use the website unlawfully",
      "Copy or scrape content without permission",
      "Attempt to disrupt website functionality",
      "Upload malicious software or code",
      "Misrepresent technical information from this platform",
    ],
    footer: "We reserve the right to restrict or terminate access where misuse is identified.",
  },
  {
    number: "12",
    title: "Future Services & Paid Features",
    content: "Certain features may become paid services in the future, including:",
    bullets: [
      "Technical downloads",
      "AI scope tools",
      "Training modules",
      "Premium databases",
      "Industry resources",
    ],
    footer: "Additional terms may apply to those services.",
  },
  {
    number: "13",
    title: "Privacy",
    content: "Use of this website is also governed by our Privacy Policy.",
  },
  {
    number: "14",
    title: "Changes to Terms",
    content: "Remedial Building Australia reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website constitutes acceptance of any updated terms.",
  },
  {
    number: "15",
    title: "Contact",
    content: "For general enquiries regarding these Terms & Conditions:",
    bullets: [
      "Remedial Building Australia",
      "Website: www.remedialbuildingaustralia.com.au",
      "Email: info@remedialbuildingaustralia.com.au",
    ],
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
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
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
              Remedial Building Australia &mdash; Last Updated: 21 May 2026
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Welcome to Remedial Building Australia. By accessing or using this website, you agree to comply with these Terms & Conditions. If you do not agree, please do not use this website.
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

                {section.footer && (
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {section.footer}
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
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>
                    <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-5">
            <a href="/" className="underline hover:text-sky-700">Home</a>
            <a href="/repair-systems" className="underline hover:text-sky-700">Repair Systems</a>
            <a href="/ai-scope-builder" className="underline hover:text-sky-700">AI Scope Builder</a>
            <a href="/industry-news" className="underline hover:text-sky-700">Industry News</a>
            <a href="/defect-library" className="underline hover:text-sky-700">Defect Library</a>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>          </div>
        </div>
      </footer>
    </div>
  );
}
