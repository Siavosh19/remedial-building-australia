"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { FLOOD_TEST_CARDS } from "./floodTestData";

const TECH_INFO = {
  typicalApplications: [
    "Sealing the drain outlet to hold a flood-test head of water on a balcony, terrace or wet-area membrane",
    "Membrane QA flood testing before tiling/overburden (typically a 24-hour test)",
    "Monitoring and documenting water level (and evaporation) during the test",
    "Pressure / leak testing of drainage pipes",
  ],
  selectionCriteria: [
    "Match the plug to the actual internal pipe diameter (not the nominal size)",
    "Choose inflatable (fast, conforms to the bore) vs mechanical (rigid, irregular bore) per the pipe and QA protocol",
    "Confirm a tie-off / retention method so the plug cannot drop down the pipe",
    "Provide a water level gauge and an evaporation reference for an accurate pass/fail",
    "Consider an integrated puddle-flange plug (e.g. 100FLEX) where it is the specified flange",
  ],
  limitations: [
    "A wrong-sized or damaged plug will not hold the test head — inspect and confirm the seal before filling",
    "Over-inflating / over-tightening can damage the drain body or puddle flange",
    "Without a level gauge and evaporation reference, leakage cannot be distinguished from evaporation",
    "Flood-test equipment proves watertightness — it does not waterproof anything",
    "A large, rapid water-level drop is a leak, not evaporation",
  ],
  standardsNotes: [
    "Flood testing is the QA step that verifies the installed membrane before overburden",
    "Record start/end water level and the evaporation reference on the flood-test certificate",
    "Test duration and pass criteria per the project QA / specification",
    "The drain seal and the membrane termination at the drain are both part of the QA",
  ],
  suitableDefects: [
    "Verifying a newly applied or remediated balcony/terrace membrane before tiling",
    "Diagnosing suspected leaks at the drain / membrane junction",
    "Unverified membranes proceeding to overburden without a documented flood test",
    "Drain outlets that cannot be reliably sealed for testing",
  ],
  typicalSubstrates: [
    "Waterproofed concrete balcony, terrace and wet-area floors (pre-tiling)",
    "Drain outlet pipes (inflatable / mechanical plugs sized to the bore)",
    "Puddle-flange drain points (integrated-plug flanges)",
    "Upstands / walls (water level gauge reference mark)",
  ],
};

export function FloodTestIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is flood test equipment?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flood test equipment seals a balcony or wet-area drain so the floor can be flooded to a known head of water to prove the waterproofing membrane is watertight before tiling or overburden. It ranges from inflatable rubber balloon plugs and mechanical wing-nut expansion plugs that seal the drain outlet, through integrated puddle-flange plugs (e.g. Stormtech 100FLEX), to the water level gauge and evaporation reference that make the pass/fail assessment accurate and auditable. Selection turns on matching the plug to the actual pipe internal diameter, a reliable tie-off, and documenting the water level and evaporation. Confirm sizes and availability against current Australian supplier data.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Match the plug to the actual internal pipe diameter (not nominal); inflatable (conforms to the bore) vs mechanical (rigid, irregular bore) per the pipe and QA protocol; a tie-off / retention method so the plug cannot drop down the pipe; a water level gauge and evaporation reference for an accurate pass/fail; document start/end level on the flood-test certificate. Flood-test equipment verifies watertightness — it does not waterproof. Confirm sizes and availability against current AU supplier data.";

export function FloodTestProductSection() {
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

      <AutoProductReference products={[]} cards={FLOOD_TEST_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Flood test equipment" pruneEmptyFacts />
    </>
  );
}
