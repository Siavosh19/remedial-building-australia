"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { ACRYLIC_MEMBRANE_CARDS } from "./acrylicMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Under-tile / wet-area waterproofing — bathrooms, laundries and balconies tiled or screeded over (Class III water-based grades)",
    "Exposed, UV-stable roof and podium coatings with pedestrian traffic — acrylic deck/roof grades over sound substrates",
    "Facade and parapet weatherproofing — tintable exposed acrylic coatings on concrete and masonry",
    "Box gutters and graded light-trafficable roofs — elastomeric exposed acrylic",
    "Remediation over sound existing membrane / coating where adhesion and compatibility allow",
  ],
  selectionCriteria: [
    "Match the grade to the duty — under-tile wet-area (AS 4858 Class III) vs exposed external/trafficable (AS 4654) — they are not interchangeable",
    "Acrylic and SBR-latex membranes are lower-cost and easy to apply but have lower elongation and ponding tolerance than polyurethane — confirm against substrate movement and wet exposure",
    "Confirm AS 4858 class and/or AS 4654 external rating for the specific product before specifying",
    "Confirm primer requirement and substrate moisture limit — missing/incorrect primer is a primary delamination cause",
    "For exposed grades confirm UV stability, trafficability and colour/tint options",
    "Confirm permanently-wet / ponding suitability — water-based acrylic/SBR can re-emulsify if continuously wet",
  ],
  limitations: [
    "Generally not for continuous immersion or permanent ponding without confirmation — re-emulsification risk",
    "Lower elongation than polyurethane — confirm crack-bridging against expected substrate movement",
    "Under-tile grades require a tile/screed or protection cover — not exposed-trafficable unless rated",
    "Two-coat minimum to the required dried film thickness — a single coat is insufficient",
    "Flood test (AS 3740 / AS 4858) mandatory before screed or tile commencement for wet-area grades",
  ],
  standardsNotes: [
    "AS 4858 — Wet area membranes — class (I/II/III by elongation) for under-tile wet-area grades",
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — exposed external grades",
    "AS 3740 — Waterproofing of domestic wet areas — flood-test and minimum-DFT requirements",
    "CSIRO Technical Assessment — some products (e.g. Gripset 38FC, TA 349) carry CSIRO assessment to AS 3740",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
  ],
  suitableDefects: [
    "Wet-area waterproofing failure — bathroom, laundry, ensuite floor remediation (under-tile grades)",
    "Exposed roof / podium coating failure — UV degradation, chalking, cracking of an exposed acrylic",
    "Facade / parapet weatherproofing failure — rain-driven moisture on concrete and masonry",
    "Box gutter and light-trafficable roof leaks where an exposed elastomeric coating is appropriate",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed per manufacturer requirements",
    "Cement render and masonry — facades and parapets",
    "Screeded concrete — confirm cure, moisture content and surface hardness",
    "Sound existing membranes / coatings — confirm adhesion and compatibility before overlay",
  ],
};

export function AcrylicIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are liquid-applied acrylic and SBR-latex membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers liquid-applied, water-based acrylic and SBR-latex waterproofing membranes used in balcony, wet-area, roof, podium and facade remediation. Two distinct duties sit here: under-tile / wet-area grades (AS 4858 Class III, covered by tile or screed) and exposed external grades (AS 4654, UV-stable and often pedestrian-trafficable). Acrylic and SBR membranes are lower-cost and easy to apply, but have lower elongation and ponding tolerance than polyurethane — selection must match chemistry and class to the duty (wet-area vs exposed), confirm UV/trafficability for exposed grades, and confirm primer, dried film thickness, recoat/cure time and permanently-wet suitability.
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
  "Chemistry (water-based acrylic vs SBR latex); duty/class — AS 4858 wet-area Class (I/II/III) vs AS 4654 external/exposed rating; UV stability and trafficability for exposed grades; total dried film thickness and coat count; coverage/consumption; mandatory primer and substrate moisture limit; recoat and tile-over/cure time; crack-bridging; permanently-wet / ponding tolerance (re-emulsification risk). Confirm every value against the current AU manufacturer TDS.";

export function AcrylicProductSection() {
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

      <AutoProductReference products={[]} cards={ACRYLIC_MEMBRANE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Liquid-applied acrylic & SBR membranes" pruneEmptyFacts />
    </>
  );
}
