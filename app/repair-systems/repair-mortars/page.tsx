import {
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Layers,
  SquareStack,
  Ruler,
  ArrowRight,
} from "lucide-react";
import { ProductCarousel } from "@/components/repair-systems/ProductCarousel";
import { TechnicalAccordion } from "@/components/repair-systems/TechnicalAccordion";
import {
  REPAIR_SYSTEM_TABS,
  REPAIR_MORTAR_SYSTEM_INFO,
  REPAIR_MORTAR_PRODUCTS,
} from "@/lib/repair-systems-data";

export const metadata = {
  title: "Concrete Repair Mortars — Repair Systems — Remedial Building Australia",
  description:
    "Technical reference for polymer-modified concrete repair mortars used in Australian remedial building practice — product comparisons, selection criteria, exposure classes, and Australian Standards notes.",
};

export default function RepairMortarsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems"   className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700 transition">Materials</a>
            <a href="/industry-news"    className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          
          </nav>

          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>

        {/* ── Page hero / header ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">

            {/* Breadcrumb */}
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/"               className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <span className="text-sky-950">Repair Mortars</span>
            </nav>

            {/* Title block */}
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">
                  Repair Systems
                </p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Concrete Repair Mortars
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Polymer-modified cementitious repair mortars are the primary system for
                  concrete patch repair in Australian remedial building practice. This reference
                  covers system selection, technical requirements, product comparisons, and
                  Australian Standards notes for Class 2 building applications.
                </p>
              </div>

              {/* At-a-glance stats */}
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <StatBlock label="Products listed"      value={String(REPAIR_MORTAR_PRODUCTS.length)} />
                <StatBlock label="Exposure classes"     value="B1, B2, C1, C2" />
                <StatBlock label="Repair depth range"   value="5 – 75 mm" />
                <StatBlock label="Application"          value="Vert. / O/Head / Horiz." />
              </div>
            </div>
          </div>
        </section>

        {/* ── Category tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end gap-0 overflow-x-auto">
              {REPAIR_SYSTEM_TABS.map((tab) => {
                const active = tab.slug === "repair-mortars";
                return tab.available ? (
                  <a
                    key={tab.slug}
                    href={tab.href}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
                      active
                        ? "border-red-700 text-sky-950"
                        : "border-transparent text-slate-500 hover:text-sky-900"
                    }`}
                  >
                    {tab.label}
                  </a>
                ) : (
                  <span
                    key={tab.slug}
                    className="relative shrink-0 border-b-2 border-transparent px-5 py-4 text-sm font-bold whitespace-nowrap text-slate-300 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {tab.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Intro + Products ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* What is */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">
                  What is polymer-modified repair mortar?
                </h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {REPAIR_MORTAR_SYSTEM_INFO.whatIs}
              </p>
            </div>

            {/* ── Collapsible technical detail ── */}
            <TechnicalAccordion defaultOpen={false}>
              {/* 3-column grid */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <TechCard
                  icon={<Layers size={15} />}
                  title="Typical Applications"
                  items={REPAIR_MORTAR_SYSTEM_INFO.typicalApplications}
                  itemStyle="bullet"
                />
                <TechCard
                  icon={<Ruler size={15} />}
                  title="Selection Criteria"
                  items={REPAIR_MORTAR_SYSTEM_INFO.selectionCriteria}
                  itemStyle="check"
                />
                <TechCard
                  icon={<AlertTriangle size={15} />}
                  title="Limitations"
                  items={REPAIR_MORTAR_SYSTEM_INFO.limitations}
                  itemStyle="warn"
                />
                <TechCard
                  icon={<BookOpen size={15} />}
                  title="Standards &amp; Testing Notes"
                  items={REPAIR_MORTAR_SYSTEM_INFO.standardsNotes}
                  itemStyle="bullet"
                />
                <TechCard
                  icon={<CheckCircle size={15} />}
                  title="Suitable Defects"
                  items={REPAIR_MORTAR_SYSTEM_INFO.suitableDefects}
                  itemStyle="check"
                />
                <TechCard
                  icon={<SquareStack size={15} />}
                  title="Typical Substrates"
                  items={REPAIR_MORTAR_SYSTEM_INFO.typicalSubstrates}
                  itemStyle="bullet"
                />
              </div>

              {/* Key technical fields table */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-5 text-sm font-extrabold text-sky-950">
                  Key Technical Fields — What to Check per Product
                </h3>
                <div className="grid gap-0 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0">
                  {[
                    ["Repair depth range (mm)",     "Minimum and maximum per lift — critical for specification compliance"],
                    ["Exposure class (AS 3600)",     "B1, B2, C1, C2 — must match project exposure environment"],
                    ["Compressive strength (MPa)",   "Verify against adjacent substrate — typically ≥ 35–45 MPa at 28 days"],
                    ["Bond strength (MPa)",          "Pull-off bond strength — minimum 1.5 MPa for structural repair (indicative)"],
                    ["Shrinkage classification",     "Controlled / low shrinkage — important for crack resistance"],
                    ["Chloride resistance",          "Critical for coastal, marine, and parking structure applications"],
                    ["Carbonation resistance",       "Important for long-term durability of concrete cover"],
                    ["Primer requirement",           "Mandatory bonding primer — do not substitute without manufacturer approval"],
                    ["Wet area suitability",         "Most repair mortars are not waterproof — confirm if wet area is in scope"],
                    ["Marine / coastal suitability", "Confirm explicitly for buildings within 1 km of the coastline"],
                  ].map(([field, desc]) => (
                    <div key={field} className="flex flex-col gap-0.5 py-3 px-0 sm:px-4">
                      <span className="text-xs font-bold text-sky-950">{field}</span>
                      <span className="text-xs leading-5 text-slate-500">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TechnicalAccordion>

            {/* ── Product carousel ── */}
            <div>
              <div className="mb-6 flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <div>
                    <h2 className="text-2xl font-extrabold text-sky-950">
                      Product Reference
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Use the TDS link for verified specifications before specifying on any project.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
                  {REPAIR_MORTAR_PRODUCTS.length} products
                </span>
              </div>
              <ProductCarousel products={REPAIR_MORTAR_PRODUCTS} />
            </div>

          </div>
        </section>

        {/* ── Compliance disclaimer ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Disclaimer
              </p>
              <p className="text-xs leading-6 text-amber-900">
                Information is general only. Product selection must be confirmed against project
                requirements, substrate condition, exposure class, manufacturer technical data
                sheets, NCC requirements, Australian Standards (including AS 3600), and
                consultant or structural engineer specifications. Prices shown are indicative
                online ranges only — verify with suppliers before use in any cost estimate or
                tender document. Do not rely on this reference as a substitute for professional
                engineering advice.
              </p>
            </div>

            {/* Next steps */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <NextStepCard
                href="/defect-library/concrete-structural-defects"
                label="Defect Library"
                title="Concrete &amp; Structural Defects"
                desc="Identify defect types, causes, and appropriate repair pathways before selecting a repair mortar system."
              />
              <NextStepCard
                href="/repair-systems/corrosion-inhibitors"
                label="Coming Soon"
                title="Corrosion Inhibitors"
                desc="Migrating and barrier inhibitor systems — typically specified alongside repair mortar for reinforcement corrosion."
                disabled
              />
              <NextStepCard
                href="/ai-scope-builder/new"
                label="AI Scope Builder"
                title="Generate a Scope of Works"
                desc="Use the AI Scope Builder to assemble a remedial scope using the repair systems and defects identified."
              />
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a
            href="/repair-systems"
            className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"
          >
            ← Repair Systems Hub
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems,
              materials and AI-assisted scope writing.
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

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center border border-slate-100">
      <div className="text-lg font-extrabold text-sky-950 leading-tight">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  itemStyle,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  itemStyle: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
        <h3
          className="text-sm font-extrabold text-sky-950"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {itemStyle === "check" && (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />
            )}
            {itemStyle === "warn" && (
              <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />
            )}
            {itemStyle === "bullet" && (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextStepCard({
  href,
  label,
  title,
  desc,
  disabled = false,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
  disabled?: boolean;
}) {
  const inner = (
    <div
      className={`group h-full rounded-2xl border p-5 transition ${
        disabled
          ? "border-slate-200 bg-white opacity-60 cursor-not-allowed"
          : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md cursor-pointer"
      }`}
    >
      <div className={`mb-2 text-[10px] font-bold uppercase tracking-wider ${disabled ? "text-slate-400" : "text-red-700"}`}>
        {label}
      </div>
      <h4
        className="text-sm font-extrabold text-sky-950 leading-snug"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
      {!disabled && (
        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
          Open <ArrowRight size={11} />
        </div>
      )}
    </div>
  );

  return disabled ? (
    <div className="h-full">{inner}</div>
  ) : (
    <a href={href} className="block h-full">
      {inner}
    </a>
  );
}
