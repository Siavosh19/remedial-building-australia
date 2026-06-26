"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SALT_AFFECTED_RENDER_CARDS } from "./saltAffectedRenderData";

const TECH_INFO = {
  typicalApplications: [
    "Replastering / re-rendering masonry affected by salt contamination from rising damp, marine exposure or ground salts",
    "Rehabilitation of brick and masonry walls after chemical DPC injection and salt reduction",
    "Salt-affected external render replacement where a salt-tolerant render is required",
    "Lower-wall zones with efflorescence and render failure from salt crystallisation",
  ],
  selectionCriteria: [
    "Where a formal WTA 2-9-04 renovation plaster is required, use a certified system (Remmers SP, Mapei Mape-Antique) — see the Renovating salt-resistant plaster page",
    "Rehabilitation render is applied after the moisture source is treated (chemical DPC injection) and salts are reduced",
    "Strip old salt-contaminated plaster / render to masonry before applying a salt-tolerant render",
    "Confirm binder, coat thickness, coverage and primer requirements from the manufacturer TDS",
    "Confirm vapour permeability — a salt-affected render must allow the wall to keep drying",
  ],
  limitations: [
    "Not a moisture treatment — the rising damp / ingress source must be addressed first",
    "Not suitable over salt-contaminated substrates without prior salt removal and preparation",
    "Standard cement renders are not salt-tolerant — they lack the pore structure to accommodate salt crystallisation",
    "Confirm current product formulation and full system design with the manufacturer before specifying",
  ],
  standardsNotes: [
    "WTA 2-9-04 — renovation plaster standard (the certified systems are on the Renovating salt-resistant plaster page)",
    "EN 998-1 — rendering / plastering mortar specification; type R = renovation mortar",
    "Confirm the render's classification and vapour permeability from the manufacturer TDS",
  ],
  suitableDefects: [
    "Salt efflorescence and render failure on lower masonry walls associated with rising damp",
    "Spalling / blistering render driven by soluble salt crystallisation",
    "Salt-contaminated masonry requiring a salt-tolerant render after treatment",
  ],
  typicalSubstrates: [
    "Solid fired clay brick and sandstock brick (salt-affected)",
    "Masonry and blockwork after salt reduction and preparation",
    "Sandstone masonry — confirm suitability for soft substrates",
    "Calcium silicate brick — confirm surface preparation",
  ],
};

export function SaltAffectedRenderIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are salt-affected render systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Salt-affected render systems are salt-tolerant rehabilitation renders for masonry and brick walls loaded with hygroscopic salts from rising damp, marine exposure or ground salts. They are formulated to tolerate residual salts that continue to migrate through the wall after treatment, reducing the efflorescence and render failure caused by salt crystallisation pressure.
        </p>
        <p>
          A salt-affected render is applied after the moisture source is treated (chemical DPC injection) and the existing salt-contaminated plaster / render is stripped to masonry. It is closely related to WTA renovation plaster — where a formally certified WTA 2-9-04 system is required, use a certified renovation plaster (Remmers SP, Mapei Mape-Antique) shown on the Renovating salt-resistant plaster page.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the moisture source is treated first (DPC injection) and salts reduced; that old salt-contaminated render is stripped to masonry; the render's salt tolerance and vapour permeability (the wall must keep drying); binder, coat thickness, coverage and primer per the manufacturer TDS; and whether a WTA 2-9-04 certified renovation plaster is required instead. Confirm every value against the current AU manufacturer TDS.";

export function SaltAffectedRenderProductSection() {
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

      <AutoProductReference products={[]} cards={SALT_AFFECTED_RENDER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Salt-affected render systems" pruneEmptyFacts />
    </>
  );
}
