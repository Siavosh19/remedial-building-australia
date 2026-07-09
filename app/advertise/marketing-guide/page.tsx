import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { getActiveBusinessCount, formatBusinessCount } from "@/lib/directory-stats";

export const metadata: Metadata = {
  title: "Marketing Guide Breakdown | Remedial Building Australia",
  description:
    "Advertising & Directory Media Kit — placement hierarchy, Gold, Silver and Free listings, the quote request system, plan comparison and banner advertising on Remedial Building Australia.",
};

/* Colours pulled straight from the live directory cards so this guide matches
   exactly what a business sees on the directory. */
const GOLD_BRUSH =
  "linear-gradient(135deg, #fbf3d9 0%, #f0d59f 18%, #fdf8e8 34%, #e6c977 50%, #faf1d6 66%, #edd696 82%, #fbf3d9 100%)";
const SILVER_BRUSH =
  "linear-gradient(135deg, #f4f6f8 0%, #dfe4ea 18%, #f7f9fb 34%, #cbd2db 50%, #eef1f4 66%, #d6dce3 82%, #f4f6f8 100%)";
const GOLD_RIBBON = "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)";
const SILVER_RIBBON = "linear-gradient(135deg, #64748b, #94a3b8, #475569)";
const NAVY = "#1e3a5f";

/* ── small building blocks ──────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-extrabold text-sky-950 sm:text-3xl">{children}</h2>;
}

function StatChip({ big, label, tone }: { big: string; label: string; tone: "gold" | "silver" | "navy" | "plain" }) {
  const styles: Record<string, string> = {
    gold: "bg-[#fdf7e3] border-[#e6d79a]",
    silver: "bg-slate-100 border-slate-200",
    navy: "bg-sky-950 border-sky-950 text-white",
    plain: "bg-white border-slate-200",
  };
  return (
    <div className={`rounded-2xl border px-5 py-4 ${styles[tone]}`}>
      <div className={`text-xl font-extrabold ${tone === "navy" ? "text-white" : "text-sky-950"}`}>{big}</div>
      <div className={`mt-0.5 text-xs font-semibold ${tone === "navy" ? "text-sky-100" : "text-slate-500"}`}>{label}</div>
    </div>
  );
}

function Includes({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-sm leading-6 text-slate-700">
          <span className="mt-0.5 font-bold text-emerald-600">✓</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── live-style listing snapshots (mirror the real directory cards) ─────── */

function GoldSnapshot() {
  return (
    <div className="rounded-2xl p-[3px] shadow-sm" style={{ background: GOLD_BRUSH }}>
      <div className="relative rounded-xl bg-white px-5 pb-5 pt-7">
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
          style={{ background: GOLD_RIBBON, boxShadow: "0 4px 14px rgba(184,150,62,0.45)" }}
        >
          ⭐ Gold Featured
        </span>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold text-[#7a5c1e]" style={{ background: "#fff6da" }}>
            YB
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-extrabold text-sky-950">
              Your Business Name <span className="font-semibold text-slate-400">| Remedial Builder</span>
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#7a5c1e]" style={{ background: "#fff6da" }}>Waterproofing</span>
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-black" style={{ background: "#fbf3d9" }}>&lt; 1 km away</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
              Specialist remedial and waterproofing contractor servicing strata and commercial buildings across the state.
            </p>
          </div>
          <span className="hidden shrink-0 rounded-lg px-4 py-2 text-xs font-bold text-white sm:inline" style={{ background: NAVY }}>
            View Profile →
          </span>
        </div>
      </div>
    </div>
  );
}

function SilverSnapshot() {
  return (
    <div className="rounded-2xl p-[3px] shadow-sm" style={{ background: SILVER_BRUSH }}>
      <div className="relative rounded-xl bg-white px-5 pb-5 pt-7">
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
          style={{ background: SILVER_RIBBON, boxShadow: "0 3px 10px rgba(71,85,105,0.35)" }}
        >
          Silver — Available
        </span>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-extrabold text-slate-500">YB</div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-extrabold text-sky-950">
              Your Business Name <span className="font-semibold text-slate-400">| Waterproofing Contractor</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">Your Suburb, State</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>📞 000 000 000</span>
              <span>✉ you@yourbusiness.com.au</span>
              <span>🌐 yourbusiness.com.au</span>
            </p>
          </div>
          <span className="hidden shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 sm:inline">
            View Profile →
          </span>
        </div>
      </div>
    </div>
  );
}

function FreeSnapshot() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {["Business Name One", "Business Name Two"].map((name, i) => (
        <div key={name} className={`flex items-start justify-between gap-3 px-5 py-4 ${i === 0 ? "border-b border-slate-200" : ""} bg-slate-50/60`}>
          <div className="min-w-0">
            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">Access Equipment</span>
            <p className="mt-1.5 text-sm font-bold text-slate-700">
              {name} <span className="font-normal text-slate-400">(Your Suburb, State)</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-500">00 0000 0000 · info@yourbusiness.com.au · yourbusiness.com.au</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700">View Profile</span>
            <span className="hidden rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 sm:inline">Claim this profile</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */

export default async function MarketingGuidePage() {
  // Shared DB-backed total — never hard-coded, consistent with the directory hero.
  let listed = "";
  try { listed = formatBusinessCount(await getActiveBusinessCount()); } catch { listed = ""; }
  const hierarchy = [
    { n: "1", name: "Banner", tone: "navy", desc: "Premium rotating showcase at the top of the page. Limited to 3 businesses per page. Above everything." },
    { n: "2", name: "Gold Featured", tone: "gold", desc: "Top of your category in your State. Only 3 Gold spots per category per State/Territory." },
    { n: "3", name: "Silver", tone: "silver", desc: "Shown within 50 km of the searched suburb, above every Free listing for your category — closest Silver first." },
    { n: "4", name: "Free Listing", tone: "plain", desc: "Standard directory entry — name, contact details, category and profile page." },
  ] as const;

  const compareRows: { f: string; free: string; silver: string; gold: string }[] = [
    { f: "Listed in directory search", free: "✓", silver: "✓", gold: "✓" },
    { f: "Full profile (description, contact, licence & insurance)", free: "Basic", silver: "✓", gold: "✓" },
    { f: "Logo & project photos", free: "—", silver: "✓ up to 15", gold: "✓ up to 15" },
    { f: "Receive quote requests", free: "✗", silver: "✓ Unlimited", gold: "✓ Unlimited" },
    { f: "“Request a Quote” button on your listing", free: "✗", silver: "✓", gold: "✓" },
    { f: "Ranking in search results", free: "Below paid", silver: "Above Free", gold: "Top of results" },
    { f: "Featured placement", free: "—", silver: "—", gold: "✓ Gold badge" },
    { f: "Limited to 3 businesses per category, per State", free: "—", silver: "—", gold: "✓ Exclusive" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <Eyebrow>Advertising &amp; Directory Media Kit</Eyebrow>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-sky-950 sm:text-5xl">Marketing Guide Breakdown</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Australia&rsquo;s dedicated platform for remedial and building maintenance works. Put your business where industry
            professionals, body corporates and property managers search every day.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip big={listed} label="Businesses listed" tone="navy" />
            <StatChip big="Australia wide" label="Coverage" tone="plain" />
            <StatChip big="3" label="Gold spots per State" tone="gold" />
            <StatChip big="Unlimited" label="Quote requests (paid)" tone="silver" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        {/* Who / audience / what / why */}
        <section className="grid gap-5 sm:grid-cols-2">
          {[
            { t: "Who we are", d: "Australia's dedicated platform for building maintenance and remedial works — defect library, repair solutions, technical product data, industry news and a national directory in one place." },
            { t: "Our audience", d: "Industry professionals, body corporates, strata and building managers, consultants, engineers and property managers — construction-literate decision-makers who commission maintenance, façade upgrades and remedial works." },
            { t: "What we have", d: `${listed} listed businesses, AI-powered search matching a plain-English job description to the right trade, direct quote requests, and technical content professionals return to.` },
            { t: "Why it works", d: "A purpose-designed directory search and news section, with repair solutions and a defect library built to address the needs of industry and the common issues everyone deals with." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-sky-950">{c.t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.d}</p>
            </div>
          ))}
        </section>

        {/* Placement hierarchy */}
        <section>
          <Eyebrow>Be seen. Be chosen.</Eyebrow>
          <H2>Placement Hierarchy</H2>
          <p className="mt-2 text-sm text-slate-600">Put your business where the decisions are made.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {hierarchy.map((h, i) => (
              <div key={h.n} className={`flex items-start gap-4 px-5 py-4 ${i > 0 ? "border-t border-slate-100" : ""}`}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold"
                  style={
                    h.tone === "gold"
                      ? { background: GOLD_BRUSH, color: "#7a5c1e" }
                      : h.tone === "silver"
                      ? { background: SILVER_BRUSH, color: "#475569" }
                      : h.tone === "navy"
                      ? { background: NAVY, color: "#fff" }
                      : { background: "#f1f5f9", color: "#334155" }
                  }
                >
                  {h.n}
                </div>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide text-sky-950">{h.name}</p>
                  <p className="mt-0.5 text-sm leading-6 text-slate-600">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gold */}
        <section>
          <H2>Gold Featured — Top of Your State</H2>
          <p className="mt-2 text-sm font-bold text-sky-950">$99 / month — includes:</p>
          <div className="mt-5 space-y-6">
            <Includes
              items={[
                "Top 3 positions for your category State-wide, all the time — only 3 Gold spots per State/Territory",
                `Featured placement with Gold Featured badge — above all Silver and Free listings, ahead of ${listed} businesses`,
                "Logo & business description on your listing card",
                "Professional tagline next to your name — Business Name | Remedial Builder",
                "Receive quote requests + Request Quote button on your listing",
                "Up to 15 project photos, licence & insurance details, project portfolio",
                "Public business profile, phone, email & website, listed in directory search",
              ]}
            />
            <div>
              <GoldSnapshot />
              <p className="mt-2 text-center text-xs text-slate-400">Gold Featured placement as shown live on the directory.</p>
            </div>
          </div>
        </section>

        {/* Silver */}
        <section>
          <H2>Silver — Within 50 km of the Searcher</H2>
          <p className="mt-2 text-sm font-bold text-sky-950">$49 / month — 30-day free trial — includes:</p>
          <div className="mt-5 space-y-6">
            <Includes
              items={[
                "Shown within 50 km of the searched suburb, ranking above every Free listing for your category — if several hold Silver, they rank by distance, closest to the searcher on top",
                "Receive quote requests + Request Quote button on your listing",
                "Logo & business description on your listing card",
                "Professional tagline next to your name — Business Name | Waterproofing Contractor",
                "Up to 15 project photos, licence & insurance details, project portfolio",
                "Public business profile, phone, email & website, listed in directory search",
              ]}
            />
            <div>
              <SilverSnapshot />
              <p className="mt-2 text-center text-xs text-slate-400">Silver placement as shown live on the directory.</p>
            </div>
          </div>
        </section>

        {/* Free */}
        <section>
          <H2>Free Listing — Get Found</H2>
          <p className="mt-2 text-sm font-bold text-sky-950">$0 / month — includes:</p>
          <div className="mt-5 space-y-6">
            <Includes
              items={[
                "Public business profile, description, phone, email & website",
                "Listed in directory search",
                "Does not include quote requests, logo or tagline on the listing card",
                "Upgrade to Silver or Gold anytime to move up the page",
              ]}
            />
            <div>
              <FreeSnapshot />
              <p className="mt-2 text-center text-xs text-slate-400">Free listings as shown live on the directory.</p>
            </div>
          </div>
        </section>

        {/* Quote system */}
        <section>
          <H2>How the Quote Request System Works</H2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Property owners, strata managers and building managers browse the directory, land on a business&rsquo;s profile, and
            send that business a quote request in a few clicks — the enquiry goes straight to the business by email and into
            their dashboard.
          </p>
          <div className="mt-5 rounded-2xl border-l-4 border-amber-500 bg-sky-950 p-5 text-sm leading-7 text-sky-50">
            Every day, industry professionals and property owners search our directory for the right trade or consultant. When
            they find you, they can request a quote directly from your listing. Free listings appear in search — but{" "}
            <strong className="text-white">only Silver and Gold businesses can receive quote requests</strong>. Gold businesses
            appear at the very top, so they&rsquo;re seen and contacted first.
          </div>
          <ol className="mt-6 space-y-4">
            {[
              ["The client searches.", "A strata manager, owner or building professional describes their job or browses a category and location (e.g. “waterproofing – NSW”). The directory shows the businesses servicing that area."],
              ["The client opens a profile.", "Each business has a full profile — description, contact details, licence and insurance information, logo and project photos."],
              ["The client sends a quote request.", "On paid profiles, a Request a Quote button lets the client send their project details — job type, suburb, urgency, budget and a message — in under a minute."],
              ["The business is notified instantly.", "The request is emailed to the business immediately and saved in their dashboard — a warm, ready-to-act lead. No middleman, no bidding, no commission."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-950 text-sm font-bold text-white">{i + 1}</span>
                <p className="text-sm leading-7 text-slate-700">
                  <strong className="text-sky-950">{t}</strong> {d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Compare */}
        <section>
          <H2>Compare the Plans</H2>
          {/* Mobile — one card per feature (no horizontal scroll) */}
          <div className="mt-5 space-y-3 sm:hidden">
            {compareRows.map((r) => (
              <div key={r.f} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-sky-950">{r.f}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Free</div>
                    <div className="mt-1 text-sm text-slate-600">{r.free}</div>
                  </div>
                  <div>
                    <div className="rounded-full py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: SILVER_RIBBON }}>Silver</div>
                    <div className="mt-1 text-sm font-semibold text-slate-700">{r.silver}</div>
                  </div>
                  <div>
                    <div className="rounded-full py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: GOLD_RIBBON }}>Gold</div>
                    <div className="mt-1 text-sm font-semibold text-slate-700">{r.gold}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet & up — table */}
          <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-slate-200 sm:block">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-sky-950 text-white">
                  <th className="px-4 py-3 text-left font-bold">Feature</th>
                  <th className="px-4 py-3 text-center font-bold">Free</th>
                  <th className="px-4 py-3 text-center font-bold" style={{ background: SILVER_RIBBON }}>Silver</th>
                  <th className="px-4 py-3 text-center font-bold" style={{ background: GOLD_RIBBON }}>Gold</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={r.f} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-4 py-3 text-slate-700">{r.f}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{r.free}</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-700">{r.silver}</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-700">{r.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-lg font-bold text-sky-950">What this means for you</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
            <li><strong className="text-sky-950">Free gets you found</strong> — you appear in search with a public profile, but Free listings cannot receive quote requests. Visibility only.</li>
            <li><strong className="text-sky-950">Silver turns your listing into a lead channel</strong> — unlimited quote requests, logo and photo gallery, ranked above all Free listings.</li>
            <li><strong className="text-sky-950">Gold is maximum exposure</strong> — everything in Silver plus top-of-results placement, the Gold Featured badge, and an exclusive spot: only 3 Gold businesses per category, per State.</li>
          </ul>
          <div className="mt-5 rounded-2xl border-l-4 border-amber-500 bg-sky-950 p-5 text-sm leading-7 text-sky-50">
            <strong className="text-white">Key point:</strong> both Silver and Gold receive unlimited quote requests — no monthly cap. The
            difference isn&rsquo;t how many enquiries you can receive; it&rsquo;s how visible you are and how early clients find you. Gold
            businesses are seen first, so they&rsquo;re typically contacted first.
          </div>
        </section>

        {/* Banner advertising */}
        <section>
          <H2>Banner Advertising</H2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Our premium position, available on two high-value pages only: the <strong>Directory</strong> (highest buyer intent —
            clients actively hiring) and <strong>Industry News</strong> (professional repeat audience — consultants, strata
            managers, contractors). Each page carries a rotating showcase of 3 businesses maximum. Banner size and design are
            agreed with you — our team can assist with artwork.{" "}
            <strong>Banner advertising is a separate placement — it is not included in any Gold or Silver subscription.</strong>
          </p>
          {(() => {
            const bannerRows = [
              { p: "Directory page banner — 1 of 3 slots", r: "From $395 / month", href: "/advertise/banner-layout#directory" },
              { p: "Industry News page banner — 1 of 3 slots", r: "From $295 / month", href: "/advertise/banner-layout#industry-news" },
              { p: "News article page banner — 1 of 3 slots", r: "From $295 / month", href: "/advertise/banner-layout#article" },
            ];
            return (
              <div className="mt-5">
                {/* Mobile — stacked cards (no horizontal scroll) */}
                <div className="space-y-3 sm:hidden">
                  {bannerRows.map((row) => (
                    <div key={row.p} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-bold text-sky-950">{row.p}</p>
                      <div className="mt-2.5 flex items-baseline justify-between gap-3 border-t border-slate-100 pt-2.5">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Starting rate (ex GST)</span>
                        <span className="text-sm font-bold text-sky-950">{row.r}</span>
                      </div>
                      <a
                        href={row.href}
                        className="mt-3 inline-block text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700"
                      >
                        See where each banner appears →
                      </a>
                    </div>
                  ))}
                </div>

                {/* Tablet & up — table */}
                <div className="hidden overflow-hidden rounded-2xl border border-slate-200 sm:block">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-sky-950 text-white">
                        <th className="px-4 py-3 text-left font-bold">Placement</th>
                        <th className="px-4 py-3 text-left font-bold">Starting Rate (ex GST)</th>
                        <th className="px-4 py-3 text-left font-bold">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bannerRows.map((row, i) => (
                        <tr key={row.p} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                          <td className="px-4 py-3 text-slate-700">{row.p}</td>
                          <td className="px-4 py-3 text-left font-bold text-sky-950">{row.r}</td>
                          <td className="px-4 py-3 text-left">
                            <a href={row.href} className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700">
                              See where each banner appears →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
          <p className="mt-2 text-xs text-slate-400">Minimum term 3 months. Limited availability — 3 slots per page.</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Banner placements are arranged directly. Submit a request via the{" "}
            <a href="/advertise" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-red-700">Advertise With Us</a>{" "}
            page, or email <strong>info@remedialbuildingaustralia.com.au</strong> — we&rsquo;ll confirm slot availability, duration,
            artwork requirements and start date with you.
          </p>
        </section>

        {/* How to get listed */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <H2>How to Get Listed (Gold &amp; Silver)</H2>
          <ol className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
            <li>1. Go to the <a href="/directory/signup" className="font-bold text-sky-700 underline underline-offset-2 hover:text-red-700">Directory sign-up page</a>.</li>
            <li>2. Complete your details and select <strong>Directory Business</strong> as your account type.</li>
            <li>3. Confirm your account via the verification email.</li>
            <li>4. Log in to your dashboard and select your subscription — <strong>Gold Featured</strong> or <strong>Silver</strong>.</li>
            <li>5. Complete your profile: services, service areas, licences and photos.</li>
          </ol>
          <p className="mt-3 text-xs text-slate-500"><strong>Note:</strong> an ABN is required to list your business.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/directory/signup" className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white hover:bg-sky-900">
              List your business on the directory →
            </a>
            <a href="/directory/pricing" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">
              View plans &amp; pricing
            </a>
            <a href="/directory" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">
              Browse the directory
            </a>
          </div>
        </section>

        {/* About */}
        <section className="text-sm leading-7 text-slate-500">
          <h3 className="text-lg font-bold text-sky-950">About Remedial Building Australia</h3>
          <p className="mt-2">
            Remedial Building Australia is a technical remedial building platform operated by Arasep Projects Pty Ltd —
            combining a defect library, repair systems, technical product data, industry news, AI-assisted scope writing tools
            and a national directory of {listed} contractors, consultants and specialist trades across Australia.
          </p>
          <p className="mt-3 text-xs text-slate-400">
            All directory listings and advertising placements are subject to our{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-red-700">Terms &amp; Conditions</a> and Privacy Policy.
            Rates exclude GST and may be updated at any time; confirmed bookings retain their agreed rate for the booked term.
          </p>
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
