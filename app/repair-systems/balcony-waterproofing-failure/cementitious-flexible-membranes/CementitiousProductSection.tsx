"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CEMENTITIOUS_FLEX_CARDS } from "./cementitiousMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Under-tile / under-screed wet-area and balcony waterproofing — bathrooms, laundries, terraces, podiums",
    "Below-grade / retaining / foundation waterproofing where negative-side application is required (negative-side-rated grades)",
    "Swimming pool, water-tank and planter waterproofing — flexible cementitious bonded to concrete and masonry",
    "Protected balcony/podium decks tiled, screeded or paver-finished over the membrane",
    "Exposed foot-trafficable decks only where a UV/wear top coat is specified over the cementitious base (e.g. Nitoproof Top Coat UV)",
  ],
  selectionCriteria: [
    "Confirm components — 1-component (mix with water) vs 2-component (liquid + powder) — and the AS 4858 flexibility class",
    "Confirm crack-bridging capability against expected substrate movement — flexible grades bridge ~>2 mm, standard grades less",
    "Confirm positive- vs negative-side capability — only negative-side-rated grades suit below-grade water pressure",
    "Cementitious membranes bond to damp/SSD concrete — confirm whether the substrate must be saturated before application",
    "Confirm whether the product is exposed/trafficable on its own, or only when overcoated with a UV/wear top coat",
    "Confirm primer requirement, total coats/DFT and coverage against the AU TDS",
  ],
  limitations: [
    "Lower elongation and crack-bridging than polyurethane liquid membranes — confirm for high-movement balconies",
    "Most grades are not exposed-trafficable on their own — require tile/screed cover or a UV/wear top coat",
    "Negative-side application requires a grade specifically rated for it — do not assume",
    "Two-coat minimum to the required dried film thickness — a single coat is insufficient",
    "Flood test (AS 3740 / AS 4858) mandatory before screed or tile commencement for wet-area grades",
  ],
  standardsNotes: [
    "AS 4858 — Wet area membranes — flexibility class (I/II/III by elongation) for cementitious wet-area grades",
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — for exposed grades (often non-trafficable)",
    "AS 3740 — Waterproofing of domestic wet areas — flood-test and minimum-DFT requirements",
    "CSIRO assessment — some grades (e.g. Mapelastic Smart) are CSIRO-tested to AS 4858 / AS 4654.1",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
  ],
  suitableDefects: [
    "Wet-area waterproofing failure — bathroom, laundry, ensuite floor remediation",
    "Below-grade / basement / retaining-wall water ingress (negative-side-rated grades)",
    "Balcony and podium waterproofing failure under tile/screed",
    "Pool, tank and planter waterproofing failure",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — saturated-surface-dry (SSD) where required",
    "Cement render and masonry — foundations, retaining walls, planters",
    "Screeded concrete — confirm cure and surface condition",
    "Sound existing cementitious substrates — confirm adhesion and compatibility",
  ],
};

export function CementitiousIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are flexible cementitious waterproofing membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flexible cementitious membranes are polymer- or latex-modified cementitious coatings (1- or 2-component) that bond tenaciously to concrete and masonry — including damp/SSD substrates — to form a flexible, crack-bridging waterproof layer. They are used under tile and screed for balconies and wet areas, and (in negative-side-rated grades) for below-grade, foundation, pool and tank waterproofing. Selection turns on components (1C vs 2C), AS 4858 flexibility class, crack-bridging, positive- vs negative-side capability, and whether the product is exposed/trafficable on its own or only when overcoated with a UV/wear top coat.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — balconies, roofs &amp; podiums: specify only a membrane with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). A product shown as N/A is unverified — not a substitute for a certified system.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Components (1C mix-with-water vs 2C liquid+powder); AS 4858 flexibility class (I/II/III) and AS 4654 external rating; crack-bridging (mm); positive- vs negative-side capability (below-grade); total dried film thickness, coat count and coverage; substrate condition (often SSD/saturated) and primer; recoat / tile-over / cure time; exposure — protected vs exposed, and trafficable only when overcoated. Confirm every value against the current AU manufacturer TDS.";

export function CementitiousProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable defects and substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={CEMENTITIOUS_FLEX_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Flexible cementitious membranes" pruneEmptyFacts />
    </>
  );
}
