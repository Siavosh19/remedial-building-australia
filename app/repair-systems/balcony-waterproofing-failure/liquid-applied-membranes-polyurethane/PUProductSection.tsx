"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PU_MEMBRANE_CARDS } from "./puMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Balcony waterproofing remediation — concrete balconies on Class 2 strata apartment buildings",
    "External terrace and deck waterproofing — under tile, screed, paver or pedestal paver systems",
    "Protected balcony finishes — tiled decks, artificial grass, pedestal systems with screed protection",
    "Remediation over failed existing membrane where substrate condition allows overlay",
    "Wet area waterproofing — bathrooms and laundries (specify a water-based grade in enclosed spaces)",
  ],
  selectionCriteria: [
    "Confirm the chemistry & carrier — pure PU vs PU-acrylic hybrid, and moisture-cured vs water-based vs solvent — they differ in elongation, crack-bridging and ventilation/VOC needs",
    "Specify pure / high-elongation PU for substrates with significant thermal movement or where active crack bridging is required",
    "Specify a water-based grade for enclosed or poorly ventilated balcony and internal wet area applications (solvent/moisture-cured grades need ventilation)",
    "Confirm primer compatibility — incorrect or missing primer is the primary cause of membrane delamination on balcony projects",
    "Confirm tile adhesive and screed compatibility after membrane cure — not all systems are compatible",
    "Specify a Class III membrane (AS 4858) for external balconies exposed to weather; confirm the AS 4654 external rating where exposed",
  ],
  limitations: [
    "Primer mandatory on all substrates — membrane delamination is the primary failure mode on balcony waterproofing projects",
    "Two-coat minimum to achieve the required dry film thickness — a single coat is insufficient",
    "Not directly trafficable without screed, tile or approved protection — unless it is a rated exposed trafficable deck system",
    "Substrate moisture content must be within the manufacturer limit at the time of membrane application",
    "Flood test (AS 3740 / AS 4858) mandatory before any screed or tile commencement — minimum 24 hours",
    "PU-hybrid grades have lower elongation than pure PU — confirm suitability against the expected substrate movement",
  ],
  standardsNotes: [
    "AS 4858 — Wet area membranes — the product compliance standard for liquid-applied wet-area / balcony membranes, with a Class (I/II/III) set by elongation",
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — material and design/installation standard for exposed external waterproofing",
    "AS 3740 — Waterproofing of domestic wet areas — flood-test and minimum-DFT requirements for wet areas",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
    "Class III membrane classification (>300% elongation) is typically required for external balconies exposed to weather",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — membrane delamination, cracking, blistering, failure at corners, junctions and drains",
    "Failed existing membrane overlay where substrate condition and adhesion allow direct overlay",
    "New waterproofing installation in balcony and terrace remediation works in Class 2 strata buildings",
    "Wet area waterproofing failure — bathroom, laundry and ensuite floor remediation",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — primed per manufacturer requirements",
    "Precast concrete panels — confirm surface condition and primer requirements",
    "Screeded concrete — confirm cure, moisture content and surface hardness before membrane application",
    "Previously waterproofed substrates — confirm adhesion, compatibility and overlay suitability with the manufacturer",
  ],
};

export function PUIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are liquid-applied polyurethane and hybrid balcony membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers liquid-applied polyurethane and hybrid waterproofing membranes used in balcony and terrace waterproofing remediation. These systems are typically used below tiles, screeds, pavers, pedestal systems, artificial grass finishes, or protected balcony finishes — and in some cases as exposed, light-trafficable deck coatings. Product selection must consider chemistry and carrier (moisture-cured / water-based / solvent), AS 4858 elongation class, AS 4654 external rating, primer compatibility, reinforcement at corners and junctions, wet/dry film thickness, curing and recoat time, flood testing, UV exposure, tile-adhesive compatibility, and whether the system is designed for exposed trafficable use or protected use only.
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
  "Chemistry & carrier (pure PU vs PU-acrylic hybrid; moisture-cured vs water-based vs solvent — drives elongation, crack-bridging and ventilation/VOC); AS 4858 wet-area class (I/II/III by elongation) and AS 4654 external above-ground rating; total DFT and coat count; coverage/consumption; mandatory primer and substrate prep/moisture limit; reinforcement at junctions; recoat and return-to-service time; UV / exposure class (under-tile/screed vs exposed trafficable); ponding/immersion tolerance. Confirm every value against the current AU manufacturer TDS.";

export function PUProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference ── */}
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

      <AutoProductReference products={[]} cards={PU_MEMBRANE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Liquid-applied PU & hybrid membranes" pruneEmptyFacts />
    </>
  );
}
