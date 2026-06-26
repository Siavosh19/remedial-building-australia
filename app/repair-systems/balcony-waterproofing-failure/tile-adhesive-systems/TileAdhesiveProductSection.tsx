"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TILE_ADHESIVE_CARDS } from "./tileAdhesiveData";

const TECH_INFO = {
  typicalApplications: [
    "Fixing tiles, stone and mosaics over a cured, flood-tested waterproofing membrane on balconies/wet areas",
    "Large-format porcelain and stone with deformable (S1/S2) adhesives and a 3–15 mm bed",
    "Grouting tile joints — flexible cement grouts for general joints, epoxy grouts for chemical/hygiene areas",
    "High-hygiene / chemical / immersion areas with 100%-solids epoxy adhesives and grouts",
  ],
  selectionCriteria: [
    "Match the ISO 13007 / EN 12004 class to the duty — C2 (improved), T (no-slip), E (extended open time), S1/S2 (deformability)",
    "Use S2 (or S1 + an admix like E 90) where the substrate is subject to thermal/shrinkage movement",
    "Choose grout by joint width and exposure — cement (CG2) for general joints, epoxy (RG) for chemical/hygiene/immersion",
    "Confirm the membrane manufacturer's approved adhesive/grout — tile over a fully-cured, flood-tested membrane only",
    "Confirm a movement joint and sanitary silicone at perimeters and changes of plane (not rigid grout)",
  ],
  limitations: [
    "Adhesives/grouts are over the membrane — they are not the waterproofing",
    "Tile only over a fully-cured, flood-tested membrane",
    "Epoxy adhesives/grouts have a short pot life and must be cleaned before they cure",
    "Rigid grout must not bridge movement/perimeter joints — use a flexible sealant there",
    "Confirm deformability (S1/S2) for the substrate movement and tile format",
  ],
  standardsNotes: [
    "ISO 13007 / EN 12004 — tile adhesive classification (C, F, T, E, S1/S2)",
    "EN 13888 / ISO 13007 — grout classification (CG cement, RG reaction-resin/epoxy)",
    "AS 3958.1 — Guide to the installation of ceramic tiles — bedding and movement-joint practice",
    "Adhesives/grouts are specified within the tiling system over the certified membrane",
  ],
  suitableDefects: [
    "Drummy / debonded tiles requiring re-fixing with a flexible adhesive over a sound membrane",
    "Failed/cracked grout requiring replacement (flexible cement or epoxy)",
    "Chemical / hygiene wet areas requiring an epoxy adhesive and grout",
    "Large-format tiling needing a deformable, full-bed adhesive",
  ],
  typicalSubstrates: [
    "Cured, flood-tested waterproofing membranes (most balcony/wet-area builds)",
    "Concrete, screeds and renders prepared for tiling",
    "Sheet timber / compressed fibre cement (flexible/S2 adhesives)",
    "Early-age concrete and pools/immersion (specific S1/S2 and epoxy systems)",
  ],
};

export function TileAdhesiveIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tile adhesive &amp; grout systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tile adhesives and grouts are the finish layer over a waterproofing membrane — they fix the tile/stone and fill the joints. They are not the waterproofing, and tiling proceeds only over a fully-cured, flood-tested membrane. Selection is driven by the ISO 13007 / EN 12004 classification (C2 improved, T no-slip, E extended open time, S1/S2 deformability), the tile format and substrate movement, and — for grout — joint width and exposure (flexible cement CG2 for general joints, epoxy RG for chemical/hygiene/immersion). Movement and perimeter joints must be sealed with a flexible sealant, never rigid grout.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "ISO 13007 / EN 12004 adhesive class (C2, T, E, S1/S2) matched to tile format and substrate movement (S2 or S1+admix for moving substrates); grout type by joint width and exposure (cement CG2 vs epoxy RG); tile only over a cured, flood-tested membrane; flexible sealant (not grout) at movement/perimeter joints; the membrane manufacturer's approved adhesive/grout. Confirm every value against the current AU TDS.";

export function TileAdhesiveProductSection() {
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

      <AutoProductReference products={[]} cards={TILE_ADHESIVE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Tile adhesives & grouts" pruneEmptyFacts />
    </>
  );
}
