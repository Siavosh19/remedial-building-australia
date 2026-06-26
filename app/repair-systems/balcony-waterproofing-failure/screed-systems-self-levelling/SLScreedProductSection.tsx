"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SCREED_SL_CARDS } from "./screedSLData";

const TECH_INFO = {
  typicalApplications: [
    "Smoothing and levelling a substrate before tiling, resilient flooring or a coating",
    "Correcting minor undulations on balconies/terraces (exterior-rated self-levellers) before the finish",
    "Levelling uneven concrete before an undertile membrane or tile bed",
    "Fast-track interior floor preparation with rapid-drying self-levellers",
  ],
  selectionCriteria: [
    "Confirm interior vs exterior rating — only exterior-rated SLCs (e.g. K 301) suit weather-exposed balconies",
    "Match the thickness range to the deviation (feather edge up to 15–25 mm depending on product)",
    "Match the drying speed to the finish and programme (rapid-dry for fast resilient/tile overlay)",
    "Confirm the primer — self-levellers require the correct primer for the substrate",
    "Confirm residual moisture and finish compatibility before overlaying",
  ],
  limitations: [
    "Most self-levellers are interior smoothing compounds — not weather-exposed or trafficable on their own",
    "They smooth/level — they do not waterproof or create significant falls",
    "Below feather edge or above the maximum thickness will fail — observe the range",
    "Require the correct primer — application to an unprimed/dusty substrate fails",
    "Confirm residual moisture before a moisture-sensitive finish",
  ],
  standardsNotes: [
    "Self-levellers are system components — specified within the flooring/finish system, not certified to AS 4858/AS 4654",
    "EMICODE / low-emission ratings (e.g. Ultraplan Eco) for indoor air quality / Green Star",
    "Confirm the finish manufacturer's nominated underlayment and primer",
    "Exterior balconies need an exterior-rated SLC and the correct membrane build-up",
  ],
  suitableDefects: [
    "Uneven / out-of-level substrates before tiling or resilient flooring",
    "Minor surface deviations on balconies/terraces (exterior-rated)",
    "Rough or patched substrates needing a smooth base for the finish",
    "Fast-track floor preparation where rapid drying is required",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed per the system",
    "Sound existing screeds and toppings — confirm overlay suitability",
    "Tiled or coated substrates — confirm a suitable bonding primer",
    "Exterior balcony/terrace decks (exterior-rated SLCs only)",
  ],
};

export function SLScreedIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are self-levelling underlayments?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Self-levelling compounds (SLCs) are pourable, free-flowing cement-based underlayments that smooth and level a substrate before tiling, resilient flooring or a coating. They are mostly interior smoothing compounds, though some grades are exterior-rated for balconies and terraces. They smooth and level — they do not waterproof or create falls. Selection turns on interior vs exterior rating, thickness range, drying speed, and the primer and finish compatibility.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Interior vs exterior rating (only exterior-rated SLCs suit weather-exposed balconies); thickness range (feather edge to 15–25 mm by product); drying speed for the finish/programme; correct primer for the substrate; residual moisture and finish compatibility before overlaying. Self-levellers smooth/level — they do not waterproof or create falls. Confirm the finish manufacturer's nominated underlayment and every value against the current AU TDS.";

export function SLScreedProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={SCREED_SL_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Self-levelling underlayments" pruneEmptyFacts />
    </>
  );
}
