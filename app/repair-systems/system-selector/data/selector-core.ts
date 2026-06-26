// ─────────────────────────────────────────────────────────────────────────────
// System Selector — generic engine core
//
// Section-agnostic engine. Each defect section supplies a SectionConfig
// (categories sourced from the pages' AI blocks + a demand resolver, stage map,
// and product hard-fail checks). The core parses each category's Stage 1 gate
// `rule` strings, gates + ranks Stage 2 products, and assembles the system.
// No product attribute is invented here — it only reads the AI data.
// ─────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

export type AiGateDef = { allowed: string[]; rule: string };
export type AiStage1 = {
  headers: string[];
  rows: string[][];
  json: { category: string; stage1_gates: Record<string, AiGateDef> };
};
export type AiStage2Json = {
  id: string;
  gates: Record<string, string>;
  tag?: Record<string, unknown>;
  rank?: Record<string, unknown>;
  meta: Record<string, unknown> & { data_status?: string; selectable?: boolean; source?: string };
};
export type AiStage2Entry = { rows: string[][]; json: AiStage2Json };
export type AiStage2 = Record<string, AiStage2Entry>;

export type SelectorCategory = {
  slug: string;
  displayName: string;
  repairStage: string;
  href: string;
  stage1: AiStage1;
  stage2: AiStage2;
};

export type Demand = Record<string, string>;

export type SectionConfig = {
  id: string;
  categories: SelectorCategory[];
  stageOrder: string[];
  stageLabels: Record<string, string>;
  neededStages: (d: Demand) => string[];
  resolveDemandForGate: (gateName: string, d: Demand) => string | null;
  productHardFails: (gates: Record<string, string>, d: Demand) => { gate: string; value: string; reason: string }[];
};

// ── Rule parsing ─────────────────────────────────────────────────────────────
export function verdictForValue(rule: string, value: string): "suitable" | "not_suitable" | "requires_alternative" | null {
  const lower = rule.toLowerCase();
  const v = value.toLowerCase();
  const re = new RegExp(`${v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*=\\s*([a-z_]+)`);
  const m = lower.match(re);
  if (m) {
    if (m[1].startsWith("not_suitable")) return "not_suitable";
    if (m[1].startsWith("requires_alternative")) return "requires_alternative";
    if (m[1].startsWith("suitable") || m[1] === "ok") return "suitable";
  }
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
  excludedBy?: string;
};

export function evaluateStage1(cat: SelectorCategory, d: Demand, resolver: SectionConfig["resolveDemandForGate"]): CategoryResult {
  const gates = cat.stage1.json.stage1_gates || {};
  const outcomes: GateOutcome[] = [];
  let passed = true;
  let excludedBy: string | undefined;
  for (const [gateName, def] of Object.entries(gates)) {
    const demandValue = resolver(gateName, d);
    if (demandValue == null) {
      outcomes.push({ gate: gateName, demandValue: null, verdict: "untested", note: "not asked / not gated by demand" });
      continue;
    }
    const verdict = verdictForValue(def.rule, demandValue);
    if (verdict === "not_suitable") {
      passed = false; excludedBy = excludedBy ?? gateName;
      outcomes.push({ gate: gateName, demandValue, verdict: "excluded", note: def.rule });
    } else if (verdict === "requires_alternative") {
      passed = false; excludedBy = excludedBy ?? gateName;
      outcomes.push({ gate: gateName, demandValue, verdict: "needs_alternative", note: def.rule });
    } else {
      outcomes.push({ gate: gateName, demandValue, verdict: "pass", note: def.rule });
    }
  }
  return { category: cat, passed, outcomes, excludedBy };
}

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

export function evaluateStage2(cat: SelectorCategory, d: Demand, hardFails: SectionConfig["productHardFails"]): ProductResult[] {
  const results: ProductResult[] = [];
  for (const [name, entry] of Object.entries(cat.stage2) as [string, AiStage2Entry][]) {
    const j = entry.json;
    const gates = (j.gates || {}) as Record<string, string>;
    const meta = j.meta || {};
    const selectable = meta.selectable === true;
    const dataStatus = (meta.data_status as string) || "unconfirmed";
    const source = (meta.source as string) || "";
    const fails = hardFails(gates, d);
    const matched: { gate: string; value: string }[] = [];
    for (const [g, v] of Object.entries(gates)) {
      if (typeof v === "string" && v !== "unconfirmed" && !v.startsWith("null")) matched.push({ gate: g, value: v });
    }
    const score = matched.length - fails.length * 100;
    results.push({ name, id: j.id, selectable, dataStatus, source, score, matchedGates: matched, failedGates: fails });
  }
  results.sort((a, b) => b.score - a.score);
  return results;
}

export type StageResult = {
  stage: string;
  label: string;
  passingCategories: CategoryResult[];
  alternativeCategories: CategoryResult[];
  recommended: { category: SelectorCategory; product: ProductResult | null; why: GateOutcome[] } | null;
  options: { category: SelectorCategory; product: ProductResult | null }[];
  note?: string;
  // Informational note rendered inside the stage card (e.g. required accessory).
  cardNote?: string;
  // Explicit, pre-ordered card list for this stage (overrides the slug registry).
  cards?: RefCard[];
};

// A flagged advisory block (not a product stage) rendered on the results page.
export type Advisory = { severity: "warning" | "critical"; title?: string; body: string };

export type SelectorOutput = { stages: StageResult[]; advisories?: Advisory[] };

export function runSelectorCore(config: SectionConfig, d: Demand): SelectorOutput {
  const stages = config.neededStages(d);
  const out: StageResult[] = [];
  for (const stage of stages) {
    const cats = config.categories.filter((c) => c.repairStage === stage);
    const evals = cats.map((c) => evaluateStage1(c, d, config.resolveDemandForGate));
    const passing = evals.filter((e) => e.passed);
    const alternative = evals.filter((e) => !e.passed && e.outcomes.some((o) => o.verdict === "needs_alternative"));

    let recommended: StageResult["recommended"] = null;
    let note: string | undefined;

    const ranked = passing
      .map((cr) => ({ cr, products: evaluateStage2(cr.category, d, config.productHardFails) }))
      .map((x) => ({ ...x, best: x.products.filter((p) => p.selectable && p.dataStatus !== "unconfirmed" && p.failedGates.length === 0)[0] || null }));

    const withProduct = ranked.find((r) => r.best);
    const recSlug = withProduct?.cr.category.slug ?? ranked[0]?.cr.category.slug;
    const options = ranked.filter((r) => r.cr.category.slug !== recSlug).map((r) => ({ category: r.cr.category, product: r.best }));

    if (withProduct) {
      recommended = { category: withProduct.cr.category, product: withProduct.best, why: withProduct.cr.outcomes.filter((o) => o.verdict === "pass") };
    } else if (ranked.length > 0) {
      recommended = { category: ranked[0].cr.category, product: null, why: ranked[0].cr.outcomes.filter((o) => o.verdict === "pass") };
      note = "No product on this page is confirmed selectable for these inputs — confirm with the manufacturer TDS / engineer.";
    } else if (alternative.length > 0) {
      note = `For these inputs this stage requires an alternative system — ${alternative[0].excludedBy} rule: ${alternative[0].outcomes.find((o) => o.verdict === "needs_alternative")?.note}`;
    } else {
      note = "No category matched — confirm requirements with the engineer.";
    }

    out.push({ stage, label: config.stageLabels[stage] ?? stage, passingCategories: passing, alternativeCategories: alternative, recommended, options: recommended ? options : [], note });
  }
  return { stages: out };
}

export type Question = {
  key: string;
  prompt: string;
  help?: string;
  // pillLabel = shorter label shown in the results answer-pill row (falls back to label).
  options: { value: string; label: string; hint?: string; pillLabel?: string }[];
};
