import { ArrowRight } from "lucide-react";

/**
 * Cross-promotion band linking to Expert Remedial Advice and the national
 * Strata Building Services Directory.
 *
 * Rendered near the foot of content pages (homepage, SEO landing pages, defect
 * library pages, repair system pages) to provide natural internal links and to
 * route users toward the advisory services and the 12,000+ business directory.
 * Styling matches the rest of the site — no new visual language is introduced.
 */
export default function SeoCrossPromo() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Expert Remedial Advice */}
          <div className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-sky-950">Expert Remedial Advice</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              For owners, strata managers and building stakeholders who need practical guidance before
              committing to repair works, Remedial Building Australia provides{" "}
              <a href="/expert-remedial-advice" className="font-semibold text-sky-700 hover:text-red-700">Expert Remedial Advice</a>{" "}
              services including a{" "}
              <a href="/expert-remedial-advice/preliminary-defect-assessment" className="font-semibold text-sky-700 hover:text-red-700">preliminary defect assessment</a>,{" "}
              <a href="/expert-remedial-advice/scope-quote-tender-review" className="font-semibold text-sky-700 hover:text-red-700">scope and quote review</a>, tender reviews,{" "}
              <a href="/expert-remedial-advice/building-repair-strategy-advice" className="font-semibold text-sky-700 hover:text-red-700">building repair strategy advice</a>,
              pre-purchase apartment defect reviews and{" "}
              <a href="/expert-remedial-advice/capital-works-forecast" className="font-semibold text-sky-700 hover:text-red-700">capital works forecast</a>{" "}
              support.
            </p>
            <a
              href="/expert-remedial-advice"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-red-700"
            >
              Explore Expert Remedial Advice <ArrowRight size={15} />
            </a>
          </div>

          {/* AI-Powered Building & Construction Directory */}
          <div className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-sky-950">AI-Powered Building &amp; Construction Directory</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Remedial Building Australia includes an{" "}
              <a href="/directory" className="font-semibold text-sky-700 hover:text-red-700">AI-powered directory for construction businesses</a>{" "}
              with over 12,000 businesses across Australia — remedial building, strata maintenance,
              waterproofing, concrete repair, façade repairs, roofing, consulting, engineering and related
              building trades.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Don&rsquo;t know the trade name? Just describe the job — our AI finds the right category for you. Or search the{" "}
              <a href="/directory?q=waterproofing" className="font-semibold text-sky-700 hover:text-red-700">waterproofing contractors directory</a>,
              find{" "}
              <a href="/directory?q=remedial%20builder" className="font-semibold text-sky-700 hover:text-red-700">remedial builders</a>, or
              browse the full{" "}
              <a href="/directory" className="font-semibold text-sky-700 hover:text-red-700">building services directory</a>.
            </p>
            <a
              href="/directory"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-red-700"
            >
              Try the AI-Powered Directory <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
