"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SALT_REMOVAL_CARDS } from "./saltRemovalDesalinationData";

const TECH_INFO = {
  typicalApplications: [
    "Reducing chloride / sulfate / nitrate salt concentration in masonry before renovation plaster or breathable render",
    "Desalination of salt-affected facades and walls subject to rising damp, marine exposure or historical contamination",
    "Heritage and conservation masonry where a non-destructive salt-reduction method is required",
    "Salt tide-mark zones on lower walls after chemical DPC injection, before replastering",
  ],
  selectionCriteria: [
    "Use a documented WTA 3-13-01 compress (Remmers) where a specifiable, certifiable method is required",
    "Site-mixed clay / cellulose poultices are tailorable to the substrate but mix- and workmanship-dependent",
    "Match poultice pore structure to the substrate so drying — and salt transport — occurs into the poultice, not back into the wall",
    "Desalination follows moisture-source treatment (DPC injection / ingress repair) — it is not a moisture treatment",
    "Pre- and post-treatment salt sampling confirms the reduction achieved",
  ],
  limitations: [
    "Desalination reduces but does not eliminate salt — heavily contaminated masonry needs several cycles",
    "Not a moisture treatment — the rising damp / water ingress source must be addressed first",
    "Long dwell times (often weeks) may be required for heavy contamination",
    "Effectiveness depends on substrate pore structure, salt type and poultice match",
  ],
  standardsNotes: [
    "WTA Code of Practice 3-13-01 — non-destructive reduction of salt content by poultice / compress",
    "Conservation guidance (e.g. building conservation literature) — clay / cellulose poultice practice",
    "Confirm mix ratio, layer thickness, dwell time and number of cycles from the product TDS or conservation specification",
  ],
  suitableDefects: [
    "Salt efflorescence and tide marks on lower masonry walls associated with rising damp",
    "Salt-contaminated masonry requiring reduction before renovation plaster or breathable render",
    "Sub-florescence / spalling driven by soluble salt crystallisation in brick and stone",
  ],
  typicalSubstrates: [
    "Solid fired clay brick and sandstock brick",
    "Sandstone and other porous natural stone masonry",
    "Lime-mortared historic masonry — confirm method with a conservator",
    "Calcium silicate brick — confirm suitability",
  ],
};

export function SaltRemovalDesalinationIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Salt removal &amp; desalination</h3>
      </div>
      <p className="text-sm leading-7 text-slate-600">
        Salt removal and desalination treatments reduce chloride, nitrate and sulfate salt concentrations in masonry walls affected by rising damp, marine exposure or historical salt contamination. A capillary-active poultice or compress is applied wet to the substrate; as it dries it draws the salt-laden pore water outward and the salts crystallise within the poultice rather than the masonry, which is then removed with the extracted salts. Desalination is carried out after the moisture source is treated and before renovation plaster or breathable render. Options range from proprietary compresses (Westox Cocoon, Remmers Desalting Compress to WTA 3-13-01) to traditional site-mixed clay / cellulose poultices used in heritage conservation.
      </p>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the moisture source has been treated first (desalination is not a moisture treatment); the method (WTA 3-13-01 compress vs site-mixed clay/cellulose poultice) and its active material; that the poultice pore structure is matched to the substrate so salts crystallise in the poultice, not the wall; the number of cycles and dwell time for the salt load; and pre/post salt sampling to confirm reduction. Confirm every value against the current AU manufacturer TDS or conservation specification.";

export function SaltRemovalDesalinationProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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

      <AutoProductReference products={[]} cards={SALT_REMOVAL_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Salt removal & desalination" pruneEmptyFacts />
    </>
  );
}
