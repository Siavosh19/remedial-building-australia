import type { Metadata } from "next";
import Link from "next/link";
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

/* Mock browser chrome wrapper shared by the built snapshots. */
function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-sm sm:p-4">
      <div className="mb-3 flex items-center gap-1.5 px-1">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-400">{url}</span>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-inner">{children}</div>
    </div>
  );
}

/* Built snapshot of the Industry News page — Gold across the top (sitting close
   above the content), Silver in the sidebar, Bronze along the bottom. */
function NewsSnapshotMock() {
  const cards = [
    { img: "/Images/News/Construction%20news.jpg", cat: "Building Defects", title: "CSIRO is closing its fire testing facility" },
    { img: "/Images/News/Building%20defect%20risk%20protected%20by%20insurance.jpg", cat: "DBP Act", title: "Ecosaver banned from Victorian Energy program" },
    { img: "/Images/News/Construction%20safety%20inspection%20and%20site%20compliance.jpg", cat: "New Systems", title: "HIA warns CSIRO lab closure will slow innovation" },
  ];
  return (
    <Chrome url="remedialbuildingaustralia.com.au/industry-news">
      {/* Hero */}
      <div className="bg-sky-950 px-5 py-5">
        <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-sky-500">Industry Intelligence</p>
        <h4 className="mt-1 text-sm font-extrabold leading-tight text-white">Industry News &amp; Remedial Insights</h4>
        <p className="mt-1 text-[8px] leading-relaxed text-sky-300">
          Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects and DBP Act developments.
        </p>
      </div>
      {/* Gold banner — small gap to the content below */}
      <div className="px-4 pt-3 pb-2">
        <MockBanner label="Gold · 728×90" ribbon={GOLD_RIBBON} className="h-12 w-full" />
      </div>
      {/* Editorial note */}
      <div className="border-b border-slate-100 px-4 pb-2">
        <p className="text-[7px] leading-relaxed text-slate-400">
          We monitor Australian building, strata, waterproofing, façade and concrete repair updates, then summarise them for remedial relevance.
        </p>
      </div>
      {/* Two-column: feed + sidebar */}
      <div className="grid grid-cols-[1fr_130px] gap-3 p-4 sm:grid-cols-[1fr_160px]">
        <div>
          <div className="flex h-6 items-center rounded-lg border border-slate-200 px-2 text-[7px] text-slate-400">
            Search articles, topics or sources…
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {["All", "Building Commission NSW", "DBP Act", "Class 2", "Waterproofing"].map((f, i) => (
              <span
                key={f}
                className={`rounded-full px-1.5 py-0.5 text-[6px] font-bold ${i === 0 ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-500"}`}
              >
                {f}
              </span>
            ))}
          </div>
          {/* Featured */}
          <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Images/News/Apartment%20owners%20stressed%20by%20high%20levies%20losing%20their%20home.jpg"
              alt=""
              className="block aspect-[4/3] w-full object-cover"
            />
            <div className="flex flex-col justify-center p-2">
              <span className="text-[6px] font-bold uppercase tracking-wide text-sky-700">New Construction Systems</span>
              <p className="mt-0.5 text-[9px] font-bold leading-tight text-sky-950">
                Pocock&rsquo;s pushing buttons on housing and crafted a model
              </p>
              <span className="mt-1 text-[6px] font-bold text-sky-700">Read source →</span>
            </div>
          </div>
          {/* Card row */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {cards.map((c) => (
              <div key={c.title} className="overflow-hidden rounded border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" className="block aspect-[4/3] w-full object-cover" />
                <div className="p-1.5">
                  <span className="text-[5px] font-bold uppercase tracking-wide text-sky-700">{c.cat}</span>
                  <p className="mt-0.5 line-clamp-2 text-[7px] font-bold leading-tight text-sky-950">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-2">
          <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-red-700">RBA Insights</p>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Images/Categories/balconies-podiums.jpg" alt="" className="block aspect-[16/9] w-full object-cover" />
            <div className="p-2">
              <span className="rounded-full bg-red-100 px-1 py-0.5 text-[5px] font-bold uppercase text-red-700">Remedial Insights</span>
              <p className="mt-1 text-[7px] font-bold leading-tight text-sky-950">Why Balconies Leak Even After Repairs</p>
            </div>
          </div>
          <MockBanner label="Silver · 300×250" ribbon={SILVER_RIBBON} className="h-24 w-full" />
        </div>
      </div>
      {/* Bronze leaderboard along the bottom */}
      <div className="border-t border-slate-100 px-4 py-3">
        <MockBanner label="Bronze · 728×90" ribbon={BRONZE_RIBBON} className="h-10 w-full" />
      </div>
    </Chrome>
  );
}

/* Built snapshot of the Directory page — Gold in the top strip, Silver above the
   listings, Bronze within a SHORT results list so the snapshot stays compact. */
function DirectorySnapshotMock() {
  const listings = [
    { in: "SW", name: "Sydney Waterproofing & Remedial", cat: "Waterproofing", loc: "Sydney, NSW" },
    { in: "AF", name: "Apex Façade & Cladding Solutions", cat: "Façade & Cladding", loc: "Parramatta, NSW" },
    { in: "CR", name: "CoreLine Concrete Repair", cat: "Concrete Repair", loc: "Newcastle, NSW" },
  ];
  const Listing = ({ l }: { l: (typeof listings)[number] }) => (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-sky-50 text-[8px] font-extrabold text-sky-800">
        {l.in}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[8px] font-bold text-sky-950">{l.name}</p>
        <p className="text-[6px] text-slate-500">
          <span className="rounded bg-slate-100 px-1 py-0.5 font-semibold text-slate-600">{l.cat}</span> · {l.loc}
        </p>
      </div>
      <span className="rounded bg-sky-950 px-2 py-1 text-[6px] font-bold text-white">View</span>
    </div>
  );
  return (
    <Chrome url="remedialbuildingaustralia.com.au/directory">
      <div className="px-4 pt-4">
        <p className="text-[6px] font-bold uppercase tracking-[0.25em] text-red-700">AI-Powered Directory &amp; Quote Request</p>
        <h4 className="mt-1 text-sm font-extrabold leading-tight text-sky-950">
          Australia&rsquo;s AI-Powered Building &amp; Construction Directory
        </h4>
      </div>
      {/* Gold top strip */}
      <div className="px-4 pt-3 pb-2">
        <MockBanner label="Gold · 728×90" ribbon={GOLD_RIBBON} className="h-12 w-full" />
      </div>
      {/* AI assistant */}
      <div className="mx-4 rounded-lg bg-gradient-to-br from-sky-900 to-indigo-900 p-3">
        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider text-white">
          ✦ AI Assistant
        </span>
        <p className="mt-1.5 text-[9px] font-extrabold text-white">Not sure who you need? Describe the job.</p>
        <div className="mt-2 flex gap-1.5">
          <div className="flex h-5 flex-1 items-center rounded bg-white px-1.5 text-[6px] text-slate-400">
            e.g. water leaking through my balcony…
          </div>
          <div className="flex h-5 w-14 items-center rounded bg-white px-1.5 text-[6px] text-slate-400">Suburb…</div>
          <span className="flex h-5 items-center rounded bg-red-600 px-2 text-[6px] font-bold text-white">Find people</span>
        </div>
      </div>
      {/* Results count */}
      <div className="px-4 pt-3">
        <p className="text-[8px] font-bold text-sky-950">566 businesses found</p>
      </div>
      {/* Silver above the listings */}
      <div className="px-4 pt-2">
        <MockBanner label="Silver · 300×250" ribbon={SILVER_RIBBON} className="h-16 w-full" />
      </div>
      {/* Short results list with Bronze in-feed */}
      <div className="space-y-2 px-4 py-3">
        <Listing l={listings[0]} />
        <Listing l={listings[1]} />
        <MockBanner label="Bronze · in results" ribbon={BRONZE_RIBBON} className="h-12 w-full" />
        <Listing l={listings[2]} />
      </div>
    </Chrome>
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
            <Link
              href="/advertise/marketing-guide"
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700"
            >
              ← Back to the Marketing Guide
            </Link>
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
            <NewsSnapshotMock />
            <p className="mt-3 text-center text-xs text-slate-400">
              Industry News page — banner slots shown in place for illustration. Not a live ad layout.
            </p>
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
            <DirectorySnapshotMock />
            <p className="mt-3 text-center text-xs text-slate-400">
              Directory page — reserved banner slots shown in place for illustration. Not a live ad layout.
            </p>
          </div>
        </section>

        {/* Tier table */}
        <section>
          <H2>Banner Tiers at a Glance</H2>
          <p className="mt-2 text-sm text-slate-600">
            Placeholder sizes shown below — actual dimensions are confirmed before your artwork is prepared.
          </p>
          {/* Mobile — stacked cards (no horizontal scroll) */}
          <div className="mt-5 space-y-3 sm:hidden">
            {tiers.map((t) => (
              <div key={t.tier} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
                    style={{ background: t.ribbon }}
                  >
                    {t.tier}
                  </span>
                  <span className="text-right text-xs font-semibold text-slate-500">{t.position}</span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Desktop</dt>
                    <dd className="mt-0.5 font-semibold text-slate-700">{t.desktop}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mobile</dt>
                    <dd className="mt-0.5 font-semibold text-slate-700">{t.mobile}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* Tablet & up — table */}
          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 sm:block">
            <table className="w-full border-collapse text-sm">
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
            <Link href="/advertise" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700">
              Advertise With Us
            </Link>{" "}
            page, or email <strong>info@remedialbuildingaustralia.com.au</strong> — we&rsquo;ll confirm slot
            availability, duration, artwork requirements and start date with you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/advertise" className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white hover:bg-sky-900">
              Enquire about banner advertising →
            </Link>
            <Link
              href="/advertise/marketing-guide"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Back to the Marketing Guide
            </Link>
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
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
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
