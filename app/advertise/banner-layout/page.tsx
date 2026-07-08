import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Banner Layout Preview | Remedial Building Australia",
  description:
    "A visual reference showing where each banner advertising tier — Gold, Silver and Bronze — appears on Remedial Building Australia pages. Illustrative diagram only.",
  // Standalone reference page — reachable only from the Marketing Guide, never indexed.
  robots: { index: false, follow: true },
};

/* Ribbon gradients reused from the marketing guide so the tier badges match. */
const GOLD_RIBBON = "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)";
const SILVER_RIBBON = "linear-gradient(135deg, #64748b, #94a3b8, #475569)";
const BRONZE_RIBBON = "linear-gradient(135deg, #9c6b3f, #c08552, #85562e)";

/* ── small building blocks ──────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-extrabold text-sky-950 sm:text-3xl">{children}</h2>;
}

/* A page snapshot shown inside mock browser chrome. The banner slots are baked
   into the image itself (real opened-up space), so no overlay is needed. */
function SnapshotFrame({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-sm sm:p-4">
        {/* Mock browser chrome */}
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-400">
            remedialbuildingaustralia.com.au
          </span>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="block w-full select-none" draggable={false} />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">{caption}</p>
    </div>
  );
}

/* A dashed banner slot with a coloured tier pill centred inside — matches the
   labelled placeholders used on the Industry News page snapshot. */
function MockBanner({ label, ribbon, className }: { label: string; ribbon: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/70 ${className ?? ""}`}
    >
      <span
        className="whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm"
        style={{ background: ribbon }}
      >
        {label}
      </span>
    </div>
  );
}

/* Built (not photographed) sample of a live article page inside mock browser
   chrome, with real imagery and copy standing in for a published article.
   Gold is the tall unit at the top of the right sidebar, Silver sits beneath
   it, and Bronze takes the sponsored slot in the Related News strip. */
function ArticleSnapshotMock() {
  const bar = "h-1.5 rounded bg-slate-200";
  const related = [
    {
      img: "/Images/News/Construction%20news.jpg",
      cat: "Building Defects",
      title: "CSIRO fire-testing lab closure delays certification",
    },
    {
      img: "/Images/News/Building%20defect%20risk%20protected%20by%20insurance.jpg",
      cat: "Strata Defects",
      title: "Why balconies keep leaking even after repairs",
    },
    {
      img: "/Images/News/Construction%20safety%20inspection%20and%20site%20compliance.jpg",
      cat: "DBP Act",
      title: "New certifier obligations under the DBP Act",
    },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-sm sm:p-4">
      {/* Mock browser chrome */}
      <div className="mb-3 flex items-center gap-1.5 px-1">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-400">
          remedialbuildingaustralia.com.au/industry-news/article
        </span>
      </div>

      <div className="rounded-lg bg-white p-3 shadow-inner sm:p-4">
        {/* Two-column: article content (left) + reserved ad sidebar (right) */}
        <div className="grid grid-cols-[1fr_112px] gap-3 sm:grid-cols-[1fr_150px] sm:gap-4">
          {/* Left — article content */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-lg bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Images/News/Building%20law%20reforms%20shaping%20safer%20construction.jpg"
                alt="Remedial works on a residential building"
                className="block aspect-[2/1] w-full object-cover"
                draggable={false}
              />
              <span className="absolute bottom-1.5 left-1.5 rounded bg-white/20 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                Waterproofing Defects
              </span>
            </div>
            <p className="mt-2 text-[8px] font-semibold uppercase tracking-wider text-slate-400">
              7 July 2026 · Remedial Building Australia · 4 min read
            </p>
            <h4 className="mt-1 text-[12px] font-extrabold leading-tight text-sky-950 sm:text-sm">
              Balcony waterproofing failures: what the new guidance means for strata
            </h4>
            <p className="mt-2 text-[9px] leading-relaxed text-slate-600 sm:text-[10px]">
              Updated industry guidance sharpens how balcony membrane defects are identified and rectified across Class 2
              buildings, placing more weight on early diagnosis before secondary damage spreads.
            </p>
            <p className="mt-1.5 text-[9px] leading-relaxed text-slate-600 sm:text-[10px]">
              For owners corporations, the practical effect is earlier engagement of a remedial consultant and a clearer
              paper trail from investigation through to a scoped repair.
            </p>
            <div className="mt-2.5 space-y-1.5">
              <div className={`${bar} w-full`} />
              <div className={`${bar} w-11/12`} />
              <div className={`${bar} w-full`} />
              <div className={`${bar} w-2/3`} />
            </div>
          </div>

          {/* Right — sticky sidebar: Gold (tall, top) then Silver (shorter) */}
          <div className="flex flex-col gap-2.5">
            <MockBanner label="Gold · 300×600" ribbon={GOLD_RIBBON} className="h-52 sm:h-64" />
            <MockBanner label="Silver · 300×250" ribbon={SILVER_RIBBON} className="h-24 sm:h-28" />
          </div>
        </div>

        {/* Related News strip — Bronze occupies the 3rd (sponsored) slot */}
        <div className="mt-4 border-t border-slate-100 pt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-sky-950">Related News</span>
            <span className="text-[8px] font-bold text-sky-700">See all →</span>
          </div>
          <div className="grid grid-cols-4 items-stretch gap-2">
            {[related[0], related[1], null, related[2]].map((c, i) =>
              c === null ? (
                <MockBanner
                  key="bronze"
                  label="Bronze · 300×250"
                  ribbon={BRONZE_RIBBON}
                  className="h-full min-h-[88px]"
                />
              ) : (
                <div key={i} className="flex flex-col overflow-hidden rounded border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" className="block aspect-[4/3] w-full object-cover" draggable={false} />
                  <div className="flex-1 p-1.5">
                    <span className="text-[6px] font-bold uppercase tracking-wide text-sky-700">{c.cat}</span>
                    <p className="mt-0.5 text-[8px] font-bold leading-tight text-sky-950 line-clamp-2">{c.title}</p>
                    <p className="mt-1 text-[6px] text-slate-400">7 Jul · 3 min read</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */

export default function BannerLayoutPage() {
  const tiers = [
    { tier: "Gold", position: "Top / header, full-width", desktop: "728×90px", mobile: "320×50px", ribbon: GOLD_RIBBON },
    { tier: "Silver", position: "Right sidebar", desktop: "300×250px", mobile: "300×100px", ribbon: SILVER_RIBBON },
    { tier: "Bronze", position: "Bottom / footer, full-width", desktop: "728×90px", mobile: "320×50px", ribbon: BRONZE_RIBBON },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <Eyebrow>Advertising &amp; Directory Media Kit</Eyebrow>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-sky-950 sm:text-5xl">Banner Layout Preview</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            A visual reference showing where each banner tier appears on the pages that carry banner advertising. The
            coloured boxes are overlaid on real page snapshots to mark placement — they are illustrative only, not live
            ads.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tiers.map((t) => (
              <span
                key={t.tier}
                className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
                style={{ background: t.ribbon }}
              >
                {t.tier} — {t.position}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <a
              href="/advertise/marketing-guide"
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700"
            >
              ← Back to the Marketing Guide
            </a>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        {/* Industry News page */}
        <section id="industry-news" className="scroll-mt-24">
          <Eyebrow>Page 1</Eyebrow>
          <H2>Industry News Page</H2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A live snapshot of the Industry News page with each banner slot marked: <strong>Gold</strong> across the top,
            <strong> Silver</strong> in the right sidebar, and <strong>Bronze</strong> along the bottom above the footer.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <SnapshotFrame
              src="/advertise/news-page-preview.webp"
              alt="Industry News page showing where the Gold, Silver and Bronze banners appear"
              caption="Industry News page — banner slots shown in place for illustration. Not a live ad layout."
            />
          </div>
        </section>

        {/* Article page (pending snapshot) */}
        <section id="article" className="scroll-mt-24">
          <Eyebrow>Page 2</Eyebrow>
          <H2>Article Page</H2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            The individual news/article page. <strong>Gold</strong> sits at the top of the right sidebar as the tall
            unit, <strong>Silver</strong> directly beneath it, and <strong>Bronze</strong> takes the sponsored slot in
            the Related News strip below the article.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <ArticleSnapshotMock />
            <p className="mt-3 text-center text-xs text-slate-400">
              Article page — Gold (top of sidebar), Silver (below it) and Bronze (Related News sponsored slot) shown in
              place for illustration. Not a live ad layout.
            </p>
          </div>
        </section>

        {/* Directory page (pending snapshot) */}
        <section id="directory" className="scroll-mt-24">
          <Eyebrow>Page 3</Eyebrow>
          <H2>Directory Page</H2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A live snapshot of the Directory search results with each banner slot reserved in place:{" "}
            <strong>Gold</strong> in the top carousel strip, <strong>Silver</strong> above the featured listing cards,
            and <strong>Bronze</strong> within the results list. Each is an added block in the natural flow, so nothing
            else on the page moves or overlaps.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <SnapshotFrame
              src="/advertise/directory-page-preview.webp"
              alt="Directory page showing where the Gold, Silver and Bronze banner slots appear"
              caption="Directory page — reserved banner slots shown in place for illustration. Not a live ad layout."
            />
          </div>
        </section>

        {/* Tier table */}
        <section>
          <H2>Banner Tiers at a Glance</H2>
          <p className="mt-2 text-sm text-slate-600">
            Placeholder sizes shown below — actual dimensions are confirmed before your artwork is prepared.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-sky-950 text-white">
                  <th className="px-4 py-3 text-left font-bold">Tier</th>
                  <th className="px-4 py-3 text-left font-bold">Position</th>
                  <th className="px-4 py-3 text-left font-bold">Suggested Size (desktop)</th>
                  <th className="px-4 py-3 text-left font-bold">Suggested Size (mobile)</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t, i) => (
                  <tr key={t.tier} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
                        style={{ background: t.ribbon }}
                      >
                        {t.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{t.position}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{t.desktop}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{t.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Sizes are indicative placeholders — confirm actual values before publishing.
          </p>
        </section>

        {/* CTA back to enquiry */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <H2>Ready to book a banner?</H2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Banner placements are arranged directly. Submit a request via the{" "}
            <a href="/advertise" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700">
              Advertise With Us
            </a>{" "}
            page, or email <strong>info@remedialbuildingaustralia.com.au</strong> — we&rsquo;ll confirm slot
            availability, duration, artwork requirements and start date with you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/advertise" className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white hover:bg-sky-900">
              Enquire about banner advertising →
            </a>
            <a
              href="/advertise/marketing-guide"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Back to the Marketing Guide
            </a>
          </div>
        </section>
      </div>

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
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/advertise/marketing-guide" className="hover:text-sky-700">Marketing Guide</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
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
