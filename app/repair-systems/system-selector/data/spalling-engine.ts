// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Concrete Spalling engine
//
// Operates ONLY on the AI Selection Data blocks (Stage 1 gates + Stage 2 product
// gates/meta) imported in concrete-spalling-ai.ts. No product attribute is
// invented: Stage 1 reads each category's stage1_gates `rule` strings; Stage 2
// reads each product's gates + meta (data_status / selectable). Products that
// are selectable:false or data_status "unconfirmed" are excluded and replaced
// with a "confirm with manufacturer TDS / engineer" note.
//
// Gate before rank: a product is ranked only after passing its gate checks.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CONCRETE_SPALLING_CATEGORIES,
  REPAIR_STAGE_ORDER,
  REPAIR_STAGE_LABEL,
  type SelectorCategory,
  type RepairStage,
  type AiStage2Entry,
} from "./concrete-spalling-ai";

// ── Demand model (the user's answers) ────────────────────────────────────────

export type Demand = {
  depth: "lt10" | "10_30" | "30_100" | "gt100";
  orientation: "horizontal" | "vertical" | "overhead";
  substrate: "ssd_porous" | "dense_smooth" | "exposed_rebar";
  exposure: "sheltered" | "moderate" | "coastal_high_chloride";
  wet_service: "dry" | "damp" | "submerged";
  structural: "structural" | "non_structural" | "cosmetic";
  rebar_exposed: "yes" | "no";
  chemical_exposure: "none" | "fuel_oil" | "chemical";
  finish_required: "exposed_finish" | "hidden";
};

export type DemandKey = keyof Demand;

export type Question = {
  key: DemandKey;
  prompt: string;
  help?: string;
  options: { value: string; label: string; hint?: string }[];
};

// One question per step, plain language. Option values use the SAME enum tokens
// that appear in the pages' AI gate data — so matching needs no invented mapping.
export const SPALLING_QUESTIONS: Question[] = [
  {
    key: "structural",
    prompt: "Is the repair structural or cosmetic?",
    help: "Structural repairs reinstate load-bearing concrete or cover to reinforcement.",
    options: [
      { value: "structural", label: "Structural", hint: "Load-bearing element or reinstating cover over rebar" },
      { value: "non_structural", label: "Non-structural", hint: "Sound element, patch is not load-bearing" },
      { value: "cosmetic", label: "Cosmetic only", hint: "Surface profiling / appearance — no strength role" },
    ],
  },
  {
    key: "depth",
    prompt: "How deep is the repair?",
    options: [
      { value: "lt10", label: "Under 10 mm", hint: "Feather-edge / surface profiling" },
      { value: "10_30", label: "10–30 mm", hint: "Standard patch depth" },
      { value: "30_100", label: "30–100 mm", hint: "High-build territory" },
      { value: "gt100", label: "Over 100 mm", hint: "Deep / formed repair" },
    ],
  },
  {
    key: "orientation",
    prompt: "What is the orientation of the repair face?",
    options: [
      { value: "horizontal", label: "Horizontal", hint: "Top of slab / floor" },
      { value: "vertical", label: "Vertical", hint: "Wall, column or beam side" },
      { value: "overhead", label: "Overhead (soffit)", hint: "Underside of slab or beam" },
    ],
  },
  {
    key: "substrate",
    prompt: "What is the prepared substrate condition?",
    options: [
      { value: "ssd_porous", label: "Porous concrete (SSD)", hint: "Saturated-surface-dry, prepared, porous" },
      { value: "dense_smooth", label: "Dense / smooth", hint: "Low-absorption, dense or smooth face" },
      { value: "exposed_rebar", label: "Exposed reinforcement", hint: "Corroded / exposed bars in the repair" },
    ],
  },
  {
    key: "rebar_exposed",
    prompt: "Is reinforcement exposed in the repair?",
    options: [
      { value: "yes", label: "Yes", hint: "Bars exposed — corrosion treatment + primer needed" },
      { value: "no", label: "No", hint: "Cover-only loss, no exposed steel" },
    ],
  },
  {
    key: "exposure",
    prompt: "What is the exposure environment?",
    help: "AS 3600 exposure classification, in plain terms.",
    options: [
      { value: "sheltered", label: "Sheltered / internal", hint: "A1–A2 — indoor, protected" },
      { value: "moderate", label: "Moderate / external", hint: "B1 — external, non-coastal" },
      { value: "coastal_high_chloride", label: "Coastal / high-chloride", hint: "B2–C2 — marine, de-icing salt, splash" },
    ],
  },
  {
    key: "wet_service",
    prompt: "What is the wet-service condition?",
    options: [
      { value: "dry", label: "Dry", hint: "Normal dry service" },
      { value: "damp", label: "Damp", hint: "Intermittent moisture / damp substrate" },
      { value: "submerged", label: "Submerged / continuously wet", hint: "Water tank, immersion, continuous wetting" },
    ],
  },
  {
    key: "chemical_exposure",
    prompt: "Is there chemical, fuel or oil exposure on the repair surface?",
    options: [
      { value: "none", label: "None", hint: "No aggressive chemical exposure" },
      { value: "fuel_oil", label: "Fuel / oil", hint: "Carpark deck, vehicle bay, fuel spillage" },
      { value: "chemical", label: "Chemical / acid", hint: "Industrial chemical or acid attack" },
    ],
  },
  {
    key: "finish_required",
    prompt: "Does the finished repair need a fine / exposed surface finish?",
    options: [
      { value: "exposed_finish", label: "Yes — exposed finish", hint: "Fair-faced / will be visible or coated" },
      { value: "hidden", label: "No — hidden / over-coated", hint: "Not visible, or behind cladding" },
    ],
  },
];

// ── Demand → gate-vocabulary resolver ────────────────────────────────────────
// Returns the demand value translated into a given gate's enum vocabulary.
// Returns null when the gate concept is not covered by the demand (→ "untested").
// Every mapping here is a presentation alignment between question enums and the
// gate enums on the pages — it introduces no product data.
function resolveDemandForGate(gateName: string, d: Demand): string | null {
  switch (gateName) {
    // repair-mortar family
    case "defect_type": return "spalling";
    case "structural_demand": return d.structural;
    case "exposure": return d.exposure;
    case "element_orientation": return d.orientation;
    case "substrate_condition": return d.substrate;
    case "repair_depth":
      return d.depth === "lt10" ? "shallow" : d.depth === "gt100" || d.depth === "30_100" ? "deep" : "medium";
    case "placement":
      return d.orientation === "overhead" || d.depth === "gt100" ? "formwork_pour" : "trowel";
    // bonding agents
    case "substrate_porosity": return d.substrate === "dense_smooth" ? "dense_smooth" : "porous";
    case "substrate_type": return d.substrate === "dense_smooth" ? "dense_concrete" : "porous_concrete";
    case "wet_service": return d.wet_service;
    case "location": return null; // not asked — leave untested
    case "bond_purpose": return "mortar_bond";
    // epoxy mortars
    case "substrate_moisture": return d.wet_service === "dry" ? "dry" : d.wet_service === "damp" ? "ssd" : "wet";
    case "chemical_exposure": return d.chemical_exposure;
    case "movement": return "static";
    // structural grouts (spalling patch is not a grouting application)
    case "application": return "surface_patch";
    case "shrinkage_requirement": return null;
    case "strength_demand": return null;
    case "temperature": return null;
    // rebar primers
    case "application_target": return d.rebar_exposed === "yes" ? "bare_rebar" : "concrete_surface";
    case "environment": return d.exposure === "coastal_high_chloride" ? "chloride_coastal_marine" : "carbonation";
    case "surface_prep": return null;
    case "chemistry": return null;
    case "mortar_compatibility": return null;
    case "compatibility": return null;
    // primers / re-alkalisation, adhesives
    case "function": return "mortar_bond";
    case "substrate": return d.substrate === "dense_smooth" ? "dense_smooth" : d.substrate === "exposed_rebar" ? "exposed_rebar" : "prepared_concrete";
    case "application_timing": return null;
    case "gap_bridging": return null;
    // curing
    case "overcoat_planned": return d.finish_required === "exposed_finish" ? "yes" : "no";
    case "cure_duration": return null;
    case "thickness_min": return null;
    // fairing / finishing
    case "thickness": return d.depth === "lt10" ? "thin_section" : "build_up";
    case "finish_intent": return d.finish_required === "exposed_finish" ? "for_coating" : "exposed";
    // form release / formwork / tools — driven by formwork need, not core demand
    default: return null;
  }
}

// Parse a gate rule string for the verdict attached to a value token, e.g.
// "porous=suitable; dense_smooth=requires_alternative" → for "dense_smooth" → "requires_alternative".
function verdictForValue(rule: string, value: string): "suitable" | "not_suitable" | "requires_alternative" | null {
  const lower = rule.toLowerCase();
  const v = value.toLowerCase();
  // look for "<value>=<verdict>" or "<value> =" patterns
  const re = new RegExp(`${v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*=\\s*([a-z_]+)`);
  const m = lower.match(re);
  if (m) {
    if (m[1].startsWith("not_suitable")) return "not_suitable";
    if (m[1].startsWith("requires_alternative")) return "requires_alternative";
    if (m[1].startsWith("suitable") || m[1] === "ok") return "suitable";
  }
  // generic: value appears next to not_suitable / requires_alternative anywhere
  if (new RegExp(`${v}[^;]*not_suitable`).test(lower)) return "not_suitable";
  if (new RegExp(`${v}[^;]*requires_alternative`).test(lower)) return "requires_alternative";
  return null;
}

export type GateOutcome = {
  gate: string;
  demandValue: string | null;
  verdict: "pass" | "untested" | "needs_alternative" | "excluded";
  note: string;
};

export type CategoryResult = {
  category: SelectorCategory;
  passed: boolean;
  outcomes: GateOutcome[];
  excludedBy?: string; // gate that excluded it
};

// Stage 1 — does this category TYPE suit the demand?
export function evaluateStage1(cat: SelectorCategory, d: Demand): CategoryResult {
  const gates = cat.stage1.json.stage1_gates || {};
  const outcomes: GateOutcome[] = [];
  let passed = true;
  let excludedBy: string | undefined;

  for (const [gateName, def] of Object.entries(gates)) {
    const demandValue = resolveDemandForGate(gateName, d);
    if (demandValue == null) {
      outcomes.push({ gate: gateName, demandValue: null, verdict: "untested", note: "not asked / not gated by demand" });
      continue;
    }
    const verdict = verdictForValue(def.rule, demandValue);
    if (verdict === "not_suitable") {
      passed = false;
      excludedBy = excludedBy ?? gateName;
      outcomes.push({ gate: gateName, demandValue, verdict: "excluded", note: def.rule });
    } else if (verdict === "requires_alternative") {
      passed = false;
      excludedBy = excludedBy ?? gateName;
      outcomes.push({ gate: gateName, demandValue, verdict: "needs_alternative", note: def.rule });
    } else {
      outcomes.push({ gate: gateName, demandValue, verdict: "pass", note: def.rule });
    }
  }
  return { category: cat, passed, outcomes, excludedBy };
}

// ── Which repair stages does this defect need? ───────────────────────────────
export function neededStages(d: Demand): RepairStage[] {
  // Abrasives/tools (surface-prep) and formwork & fixings are no longer part of
  // the material system selector — only the applied repair products.
  const stages: RepairStage[] = [];
  if (d.rebar_exposed === "yes" || d.substrate === "exposed_rebar") stages.push("rebar-primer");
  // bonding agent: porous substrate needs a slurry/primer; dense needs epoxy bond coat (still bonding stage)
  if (d.structural !== "cosmetic") stages.push("bonding-agent");
  // repair body: cosmetic → finishing only; otherwise a mortar
  if (d.structural !== "cosmetic") stages.push("repair-mortar");
  stages.push("curing");
  // finishing where an exposed finish is required
  if (d.finish_required === "exposed_finish") stages.push("finishing");
  return REPAIR_STAGE_ORDER.filter((s) => stages.includes(s));
}

// ── Stage 2 — product gating + ranking within a category ─────────────────────
export type ProductResult = {
  name: string;
  id: string;
  selectable: boolean;
  dataStatus: string;
  score: number;
  matchedGates: { gate: string; value: string }[];
  failedGates: { gate: string; value: string; reason: string }[];
  source: string;
};

// Hard fail checks comparing a product gate value against the demand.
// Only encodes contradictions that are unambiguous from the gate tokens.
function productHardFails(gates: Record<string, string>, d: Demand): { gate: string; value: string; reason: string }[] {
  const fails: { gate: string; value: string; reason: string }[] = [];
  const wetMax = gates["wet_service_max"];
  if (wetMax && wetMax !== "unconfirmed") {
    const order = ["dry", "damp", "submerged"];
    if (order.indexOf(d.wet_service) > order.indexOf(wetMax)) {
      fails.push({ gate: "wet_service_max", value: wetMax, reason: `repair is ${d.wet_service}, product rated to ${wetMax}` });
    }
  }
  const subMoist = gates["substrate_moisture_max"];
  if (subMoist === "dry" && d.wet_service !== "dry") {
    fails.push({ gate: "substrate_moisture_max", value: subMoist, reason: `epoxy needs a dry substrate; repair is ${d.wet_service}` });
  }
  // bare rebar exposed → a surface-applied MCI impregnation is not a bare-rebar primer
  const appTarget = gates["application_target"];
  if (appTarget && d.rebar_exposed === "yes" && /concrete_surface/.test(appTarget) && !/bare_rebar/.test(appTarget)) {
    fails.push({ gate: "application_target", value: appTarget, reason: "bare rebar is exposed — needs a rebar primer applied to steel, not a surface impregnation" });
  }
  // structural repair → cosmetic-only product not suitable
  const sd = gates["structural_demand"];
  if (sd === "cosmetic" && d.structural === "structural") {
    fails.push({ gate: "structural_demand", value: sd, reason: "structural repair — a cosmetic-only product is not suitable" });
  }
  return fails;
}

export function evaluateStage2(cat: SelectorCategory, d: Demand): ProductResult[] {
  const results: ProductResult[] = [];
  for (const [name, entry] of Object.entries(cat.stage2) as [string, AiStage2Entry][]) {
    const j = entry.json;
    const gates = j.gates || {};
    const meta = j.meta || {};
    const selectable = meta.selectable === true;
    const dataStatus = (meta.data_status as string) || "unconfirmed";
    const source = (meta.source as string) || "";

    const fails = productHardFails(gates as Record<string, string>, d);
    const matched: { gate: string; value: string }[] = [];
    for (const [g, v] of Object.entries(gates)) {
      if (typeof v === "string" && v !== "unconfirmed" && !v.startsWith("null")) matched.push({ gate: g, value: v });
    }
    // score: confirmed (non-unconfirmed) gate count, minus hard fails
    const score = matched.length - fails.length * 100;
    results.push({
      name, id: j.id, selectable, dataStatus, source,
      score, matchedGates: matched, failedGates: fails,
    });
  }
  // gate before rank: keep only selectable + confirmed + no hard fails, ranked by score
  results.sort((a, b) => b.score - a.score);
  return results;
}

// ── Assemble the full multi-stage repair system ──────────────────────────────
export type StageResult = {
  stage: RepairStage;
  label: string;
  passingCategories: CategoryResult[];
  alternativeCategories: CategoryResult[]; // requires_alternative
  recommended: {
    category: SelectorCategory;
    product: ProductResult | null; // null → confirm with TDS/engineer
    why: GateOutcome[];
  } | null;
  options: { category: SelectorCategory; product: ProductResult | null }[]; // other matching systems
  note?: string;
};

export type SelectorOutput = {
  stages: StageResult[];
};

export function runSelector(d: Demand): SelectorOutput {
  const stages = neededStages(d);
  const out: StageResult[] = [];

  for (const stage of stages) {
    const cats = CONCRETE_SPALLING_CATEGORIES.filter((c) => c.repairStage === stage);
    const evals = cats.map((c) => evaluateStage1(c, d));
    const passing = evals.filter((e) => e.passed);
    const alternative = evals.filter((e) => !e.passed && e.outcomes.some((o) => o.verdict === "needs_alternative"));

    // pick the best category: prefer a passing category with a selectable product
    let recommended: StageResult["recommended"] = null;
    let note: string | undefined;

    const ranked = passing
      .map((cr) => ({ cr, products: evaluateStage2(cr.category, d) }))
      .map((x) => ({
        ...x,
        best: x.products.filter((p) => p.selectable && p.dataStatus !== "unconfirmed" && p.failedGates.length === 0)[0] || null,
      }));

    const withProduct = ranked.find((r) => r.best);
    const recommendedCategorySlug = withProduct?.cr.category.slug ?? ranked[0]?.cr.category.slug;
    const options = ranked
      .filter((r) => r.cr.category.slug !== recommendedCategorySlug)
      .map((r) => ({ category: r.cr.category, product: r.best }));
    if (withProduct) {
      recommended = {
        category: withProduct.cr.category,
        product: withProduct.best,
        why: withProduct.cr.outcomes.filter((o) => o.verdict === "pass"),
      };
    } else if (ranked.length > 0) {
      // category type passes but no confirmed/selectable product
      recommended = {
        category: ranked[0].cr.category,
        product: null,
        why: ranked[0].cr.outcomes.filter((o) => o.verdict === "pass"),
      };
      note = "No product on this page is confirmed selectable for these inputs — confirm with the manufacturer TDS / engineer.";
    } else if (alternative.length > 0) {
      note = `For these inputs this stage requires an alternative system — ${alternative[0].excludedBy} rule: ${alternative[0].outcomes.find((o) => o.verdict === "needs_alternative")?.note}`;
    } else {
      note = "No category matched — confirm requirements with the engineer.";
    }

    out.push({
      stage,
      label: REPAIR_STAGE_LABEL[stage],
      passingCategories: passing,
      alternativeCategories: alternative,
      recommended,
      options: recommended ? options : [],
      note,
    });
  }

  return { stages: out };
}
