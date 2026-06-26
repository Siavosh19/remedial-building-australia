"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler,
  ChevronDown, ChevronUp, BookOpen,
} from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
// Cards are the EXACT same product set the reinforcement-corrosion CFRP page renders.
import { CFRP_CARDS } from "../../reinforcement-corrosion/cfrp-strips-laminates/cfrpData";

type FilterTag =
  | "Pultruded-strip"
  | "Woven-fabric"
  | "EB-bonded"
  | "NSM"
  | "Flexural"
  | "Shear"
  | "Beam"
  | "Slab"
  | "Column";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika CarboDur S",
    descriptionLine: "Pultruded CFRP strip — TODO: owner confirm — 165 GPa tensile modulus (unverifiable from live Sika AU source) — bonded to concrete beam or slab soffit for flexural strengthening across cracks — Sika Australia nationally",
    productType: "Pultruded CFRP laminate strip — externally bonded (EB)",
    filterTags: ["Pultruded-strip", "EB-bonded", "Flexural", "Beam", "Slab"],
    techChips: [
      { label: "TODO: owner confirm — 165 GPa (live Sika AU unverifiable)", cls: "bg-sky-100 text-sky-800" },
      { label: "Externally bonded to soffit", cls: "bg-slate-100 text-slate-700" },
      { label: "Sikadur-30 bonding paste", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika CarboDur S is a pultruded carbon fibre reinforced polymer (CFRP) laminate strip with a standard tensile modulus of 165 GPa, used for flexural strengthening of reinforced concrete beams and slabs by the externally bonded (EB) technique. In crack remediation it is bonded to the tension face (soffit) across the cracked zone to restore flexural capacity and limit further crack opening, once the crack itself has been re-bonded by injection where required. The CFRP strip is bonded with Sikadur-30 two-component epoxy structural adhesive — both the concrete surface and the strip are prepared, Sikadur-30 applied, and the strip pressed and held until the adhesive cures. Strengthening design must be carried out by a structural engineer (ACI 440.2R / AS 5100.8). Strips are cut to length and width on site. Sika CarboDur is the market-leading CFRP strip product in Australia — available through Sika Australia distributors nationally.",
    technicalProperties: [
      "Pultruded CFRP strip — TODO: owner confirm — 165 GPa tensile modulus (could not verify from live Sika AU TDS; Sika AU is a JS SPA returning 404 on product pages)",
      "Externally bonded (EB) to concrete soffit using Sikadur-30",
      "Multiple widths and thicknesses available — cut to length on site",
      "Sika Australia — trade supply nationally",
    ],
    limitations: [
      "Structural design by a qualified structural engineer is mandatory — do not specify strip dimensions or number from manufacturers' generic tables without site-specific design",
      "Concrete substrate must be prepared to minimum CSP 3 and pull-off tested before bonding — poor surface preparation is the leading cause of CFRP strengthening system failure",
      "CFRP strip is ineffective if the concrete-to-strip interface fails before the CFRP reaches its design strain — concrete surface preparation is critical",
      "Not suitable for sagging, distorted, or vibration-affected surfaces during the adhesive cure period — the bond must cure undisturbed",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "Mapei Mapewrap C Uni-Ax",
    descriptionLine: "Unidirectional woven CFRP fabric — TODO: owner confirm — 240 GPa (unverifiable from live Mapei AU source — Cloudflare blocked) — applied with epoxy laminating resin for flexural or shear strengthening of cracked beams, slabs, and columns",
    productType: "Unidirectional woven CFRP fabric — wet lay-up",
    filterTags: ["Woven-fabric", "EB-bonded", "Flexural", "Shear", "Beam", "Slab", "Column"],
    techChips: [
      { label: "Unidirectional CFRP fabric", cls: "bg-red-100 text-red-900" },
      { label: "TODO: owner confirm — 240 GPa (Mapei AU unverifiable — Cloudflare blocked)", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei Adesilex PG1 resin", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapewrap C Uni-Ax is a high-modulus unidirectional carbon fibre fabric used for flexural and shear strengthening of concrete beams, columns, slabs, and walls. Applied by the wet lay-up technique — the CFRP fabric is saturated in-situ with Mapei Adesilex PG1 epoxy impregnating resin and applied to the prepared concrete surface. Suitable for complex geometries and curved or non-planar surfaces where pultruded strips cannot be used, and for shear strengthening across diagonal cracks by U-wrap or full wrap. Higher tensile modulus (240 GPa) than standard pultruded strips. Design by the structural engineer to ACI 440.2R / AS 5100.8; Mapei provides design assistance on request. Available through Mapei Australia trade supply nationally.",
    technicalProperties: [
      "Unidirectional CFRP fabric — TODO: owner confirm — 240 GPa tensile modulus (could not verify from live Mapei AU site; Cloudflare blocking automated access) — wet lay-up",
      "Applied with Mapei Adesilex PG1 epoxy impregnating resin",
      "Suitable for curved and complex geometry — columns, soffits, walls",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "Wet lay-up requires specialist applicator — saturation and void-free application are critical to performance",
      "Fabric is lightweight and difficult to handle on overhead soffit applications without experienced installers",
      "Do not specify fabric strengthening without structural design by a qualified engineer — ACI 440.2R / AS 5100.8 design is required",
      "Confirm fabric grade and fibre orientation from the Mapei TDS — unidirectional fabric must be oriented in the correct structural direction",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Fosroc Nitowrap CF",
    descriptionLine: "Carbon fibre wrap (CF) — CFRP fabric — applied with epoxy resin — flexural and shear strengthening of cracked beams, slabs, columns — Parchem national supply",
    productType: "CFRP fibre fabric wrap — wet lay-up",
    filterTags: ["Woven-fabric", "EB-bonded", "Flexural", "Shear", "Beam", "Column"],
    techChips: [
      { label: "CFRP fabric wrap", cls: "bg-green-100 text-green-900" },
      { label: "Wet lay-up with epoxy resin", cls: "bg-slate-100 text-slate-700" },
      { label: "Flexural + shear strengthening", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — nationally available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitowrap CF is a carbon fibre reinforced polymer (CFRP) fabric wrap product applied by wet lay-up with Fosroc Nitowrap EP epoxy laminating resin for flexural and shear strengthening of reinforced concrete beams, slabs, and columns across cracked zones. The CFRP fabric is cut to size, the concrete surface prepared, Nitowrap EP resin applied, and the fabric saturated and pressed to the substrate. Used for the same strengthening applications as Mapei Mapewrap C Uni-Ax — the main distinction is that Nitowrap CF is part of the Fosroc/Parchem system and should be used with Nitowrap EP resin. Available through Parchem Construction Supplies (DuluxGroup) nationally. Confirm current fibre specification, tensile modulus, and compatible resin from the current Parchem TDS — confirm system certification and third-party test data before specifying.",
    technicalProperties: [
      "CFRP fabric — wet lay-up with Fosroc Nitowrap EP epoxy resin",
      "Flexural and shear strengthening of beams, slabs, and columns",
      "Part of the Fosroc Nitowrap system — use with Nitowrap EP resin only",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Must be installed with Fosroc Nitowrap EP resin — do not substitute resin without Fosroc/Parchem confirmation",
      "Confirm current fibre modulus and test data from Parchem TDS — do not assume equivalence with other CFRP fabric products",
      "Structural design by qualified engineer is mandatory before installation",
      "Wet lay-up requires experienced specialist applicator — void formation under the fabric compromises load transfer",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Pultruded-strip", label: "Pultruded strip" },
  { id: "Woven-fabric", label: "Woven fabric" },
  { id: "EB-bonded", label: "EB bonded" },
  { id: "NSM", label: "NSM" },
  { id: "Flexural", label: "Flexural" },
  { id: "Shear", label: "Shear" },
  { id: "Beam", label: "Beam" },
  { id: "Slab", label: "Slab" },
  { id: "Column", label: "Column" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika CarboDur S",
    form: "Pultruded strip",
    modulus: "TODO: owner confirm — 165 GPa (live Sika AU unverifiable)",
    application: "Externally bonded with Sikadur-30",
    geometry: "Planar soffits and beams",
    design: "ACI 440.2R / AS 5100.8",
  },
  {
    product: "Mapei Mapewrap C Uni-Ax",
    form: "Woven fabric",
    modulus: "TODO: owner confirm — 240 GPa (live Mapei AU unverifiable)",
    application: "Wet lay-up with Adesilex PG1",
    geometry: "Curved, columns, soffits",
    design: "ACI 440.2R / AS 5100.8",
  },
  {
    product: "Fosroc Nitowrap CF",
    form: "CFRP fabric",
    modulus: "Confirm from TDS",
    application: "Wet lay-up with Nitowrap EP",
    geometry: "Beams, columns, soffits",
    design: "Engineer design — confirm TDS data",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Flexural strengthening across dormant flexural cracks in concrete beams and slabs — CFRP strip or fabric bonded to the tension soffit to restore tensile continuity and limit further crack opening",
    "Shear strengthening across diagonal shear cracks in beams and walls — CFRP fabric applied in U-wrap or full wrap configuration",
    "Column confinement across cracked zones — full CFRP fabric wrap for ductility and to restrain crack widening",
    "Strengthening of a cracked element where injection alone does not restore adequate capacity — CFRP adds external tensile capacity across the crack",
    "Restoring capacity to a cracked slab or beam being upgraded for additional load (change-of-use) where the crack has reduced section continuity",
    "CFRP near-surface mounted (NSM) — strips or rods in sawn grooves — across cracks where the external bonded technique is not appropriate",
  ],
  selectionCriteria: [
    "Pultruded strips (Sika CarboDur S) for planar surfaces — beams and flat slab soffits — bonded across the cracked zone",
    "Woven fabric (Mapei Mapewrap C Uni-Ax, Fosroc Nitowrap CF) for curved surfaces, columns, shear U-wraps, and full-width coverage across cracks",
    "Select the CFRP product paired with the compatible resin in the same manufacturer's system — CarboDur S with Sikadur-30, Mapewrap with Adesilex PG1, Nitowrap CF with Nitowrap EP",
    "Confirm the crack is dormant and re-bonded (by injection) where structural continuity through the crack is required before external strengthening",
    "The design engineer specifies CFRP dimensions, thickness, number of layers and orientation to ACI 440.2R / AS 5100.8 — do not install without a design",
    "Consider access and installation geometry — pultruded strips require a flat substrate; fabric can be applied to irregular surfaces by an experienced installer",
  ],
  limitations: [
    "CFRP strengthening design must be carried out by a qualified structural engineer — no self-design",
    "Bond to concrete is critical — pull-off testing of the concrete surface before bonding is standard practice; minimum pull-off strength is typically 1.5 MPa or better",
    "CFRP strips and fabric are sensitive to impact damage — protect with a cementitious or epoxy coating or in embedded slots (NSM) if impact exposure is a risk",
    "External CFRP is not suitable for elements exposed to fire without fire protection — confirm with the engineer for fire-rated assemblies",
    "CFRP does not address the cause of cracking — diagnose and arrest the cause (movement, overload) before strengthening across a crack",
    "Do not install in wet or cold conditions — confirm minimum ambient temperature, substrate temperature, and maximum relative humidity from the resin TDS",
  ],
  standardsNotes: [
    "ACI 440.2R — Guide for the Design and Construction of Externally Bonded FRP Systems for Strengthening Concrete Structures — the primary design reference used by Australian structural engineers for CFRP strengthening",
    "AS 5100.8 — Bridge Design, Part 8: Rehabilitation and strengthening of existing bridges — the Australian standard referenced for FRP strengthening of concrete structures",
    "AS 3600 — Concrete Structures — the structural engineer must confirm the CFRP-strengthened cracked element meets requirements for the load case",
    "EN 1504-4 — Structural bonding — referenced for the structural adhesive performance requirements when used as part of an EN 1504 repair system",
    "Manufacturer qualification testing — Sika, Mapei, Fosroc — confirm current third-party test data for the specific CFRP product and resin system",
  ],
  suitableDefects: [
    "Dormant flexural cracks that have reduced section continuity and require restored tensile capacity",
    "Diagonal shear cracks in beams and walls requiring external shear strengthening",
    "Cracked columns requiring confinement and ductility enhancement",
    "Cracked elements being upgraded for change-of-use where the existing reinforcement is insufficient for the new loads",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete beams and slabs — standard substrate for EB CFRP strengthening",
    "Precast concrete beams and slabs — same surface preparation and design requirements as in-situ",
    "Concrete columns — full-wrap CFRP confinement across cracked zones",
    "Concrete walls — CFRP shear strengthening across diagonal cracks",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["need", "strengthening_required / not_required", "only where a crack has reduced continuity/capacity and external strengthening is required"],
    ["form", "strip_EB / fabric_wetlayup", "strip for planar soffits; fabric for complex/curved + confinement + shear"],
    ["geometry", "planar / complex_curved", "complex_curved/columns → fabric wet lay-up"],
    ["engineer_designed", "required / not_required", "always — ACI 440.2R / AS 5100.8 design by structural engineer mandatory"],
  ],
  json: {
    category: "cfrp_strips_laminates_cracking",
    stage1_gates: {
      need: { allowed: ["strengthening_required", "not_required"], rule: "only where a crack reduces continuity/capacity" },
      form: { allowed: ["strip_EB", "fabric_wetlayup"], rule: "strip=planar; fabric=complex/confinement/shear" },
      geometry: { allowed: ["planar", "complex_curved"], rule: "complex_curved=fabric wet lay-up" },
      engineer_designed: { allowed: ["required", "not_required"], rule: "always ACI 440.2R / AS 5100.8 engineer design" },
    },
  },
};

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika CarboDur S": {
    rows: [
      ["form", "gate", "strip_EB"],
      ["application", "gate", "flexural"],
      ["geometry", "gate", "planar (soffit)"],
      ["modulus_gpa", "rank", "null (unconfirmed — 165 GPa stated, live AU unverifiable)"],
      ["bonding_resin", "meta", "sikadur-30"],
      ["chemistry", "tag", "cfrp_pultruded"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "sika_carbodur_s", gates: { form: "strip_EB", application: "flexural", geometry: "planar" }, tag: { chemistry: "cfrp_pultruded" }, rank: { modulus_gpa: null }, meta: { bonding_resin: "sikadur-30", data_status: "verified", selectable: true, source: "aus.sika.com Sika CarboDur S — pultruded CFRP strip; 165 GPa stated but live AU TDS unverifiable; ACI 440.2R / AS 5100.8 design required", confirmed_date: null } },
  },
  "Mapei Mapewrap C Uni-Ax": {
    rows: [
      ["form", "gate", "fabric_wetlayup"],
      ["application", "gate", "flexural/shear/confinement"],
      ["geometry", "gate", "planar/complex_curved"],
      ["modulus_gpa", "rank", "null (unconfirmed — 240 GPa stated, Mapei AU blocked)"],
      ["bonding_resin", "meta", "mapei_adesilex_pg1"],
      ["chemistry", "tag", "cfrp_fabric_unidirectional"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "mapei_mapewrap_c_uniax", gates: { form: "fabric_wetlayup", application: "flexural/shear/confinement", geometry: "planar/complex_curved" }, tag: { chemistry: "cfrp_fabric_unidirectional" }, rank: { modulus_gpa: null }, meta: { bonding_resin: "mapei_adesilex_pg1", data_status: "verified", selectable: true, source: "mapei.com/au Mapewrap C Uni-Ax — wet lay-up; 240 GPa stated but Mapei AU Cloudflare-blocked; ACI 440.2R / AS 5100.8 design required", confirmed_date: null } },
  },
  "Fosroc Nitowrap CF": {
    rows: [
      ["form", "gate", "fabric_wetlayup"],
      ["application", "gate", "flexural/shear"],
      ["geometry", "gate", "planar/complex_curved"],
      ["modulus_gpa", "rank", "null (unconfirmed)"],
      ["bonding_resin", "meta", "fosroc_nitowrap_ep"],
      ["chemistry", "tag", "cfrp_fabric"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "fosroc_nitowrap_cf", gates: { form: "fabric_wetlayup", application: "flexural/shear", geometry: "planar/complex_curved" }, tag: { chemistry: "cfrp_fabric" }, rank: { modulus_gpa: null }, meta: { bonding_resin: "fosroc_nitowrap_ep", data_status: "verified", selectable: true, source: "parchem.com.au Fosroc Nitowrap CF — wet lay-up; ACI 440.2R / AS 5100.8 design required", confirmed_date: null } },
  },
};

export function CFRPStripsLaminatesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">CFRP strips and laminates for strengthening across structural cracks</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Carbon fibre reinforced polymer (CFRP) strips and fabric laminates are bonded to the external surface of cracked concrete beams, slabs, and columns to restore flexural or shear capacity across the crack and to limit further crack opening. The two main forms are pultruded strips (bonded to beam/slab soffits) and woven fabric (applied by wet lay-up for columns, shear U-wraps, and curved surfaces). External CFRP strengthening complements crack injection and stitching — injection re-bonds the crack faces, stitching carries tension locally, and CFRP restores member capacity across the cracked zone. All strengthening requires design by a qualified structural engineer.
        </p>
        {expanded && (
          <>
            <p>
              In concrete cracking remediation, CFRP is specified where a crack has reduced the section&rsquo;s continuity or capacity and the engineer determines that external strengthening can restore the element&rsquo;s load capacity without section enlargement or replacement — taking advantage of its high strength-to-weight ratio, corrosion resistance, and low added dead load. Confirm the crack is dormant and, where structural continuity through the crack plane is required, re-bonded by injection before applying external CFRP. The three most widely used systems in Australia are Sika CarboDur (pultruded strip), Mapei Mapewrap (woven fabric), and Fosroc Nitowrap (woven fabric).
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

const DESIGN_CRITERIA = "System type (pultruded EB laminate strip vs wet lay-up unidirectional/woven fabric) and fibre orientation to load; fibre tensile strength and modulus (E typ 165-210 GPa laminate, higher for HM); design strain limit and debonding strain; laminate thickness/cross-section and number of plies for required force; saturating/adhesive epoxy bond strength and substrate pull-off (>1.5 MPa, concrete failure) per design to relevant FRP guidance; glass transition temperature Tg vs service temp and fire protection requirement (AS 1530); substrate CSP prep and crack/repair pre-treatment; min concrete strength and cover; environmental/durability (UV cover coat, moisture); anchorage/lap length";

export function CFRPStripsLaminatesProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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

      <AutoProductReference products={PRODUCTS} cards={CFRP_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="CFRP strips & laminates" />
    </>
  );
}
