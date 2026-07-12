"use client";

import { useState } from "react";
import {
  ChevronRight, ChevronLeft, RotateCcw,
  AlertTriangle, ArrowRight,
} from "lucide-react";
import {
  PRODUCTS,
  assembleSystem,
  type DefectType,
  type Orientation,
  type SelectorAnswers,
  type Product,
} from "./data/db";
import { ProductReferenceCard } from "../_components/ProductReferenceCard";

// ── Static option lists ──────────────────────────────────────────────────────

const DEFECT_OPTIONS: { value: DefectType; label: string; hint: string }[] = [
  { value: "spalling",       label: "Concrete spalling",             hint: "Delamination, pop-outs, exposed aggregate or rebar in a concrete slab, beam or column — vertical, overhead, or horizontal" },
  { value: "floor-spalling", label: "Floor spalling",                hint: "Spalling, scaling, or delamination on the top surface of a concrete floor slab — horizontal surface, walking surface or carpark deck" },
  { value: "corrosion",      label: "Reinforcement corrosion",       hint: "Rust staining, cover cracking, or confirmed active rebar corrosion in a concrete element" },
  { value: "cracking",       label: "Concrete cracking",             hint: "Crack in a concrete slab, beam, wall or column — structural or non-structural" },
  { value: "settlement",     label: "Settlement cracks",             hint: "Cracks caused by foundation movement, differential settlement, or soil instability" },
  { value: "slab-edge",      label: "Slab edge deterioration",       hint: "Spalling or breakdown at the slab soffit edge, fascia, or balcony beam edge" },
  { value: "magnesite",      label: "Magnesite floor deterioration", hint: "Soft, crumbling, or moisture-affected magnesite floor screed in a Class 2 strata building" },
];

const ORIENTATION_OPTIONS: { value: Orientation; label: string; hint: string }[] = [
  { value: "overhead",   label: "Overhead (soffit)",       hint: "Underside of slab or beam — repair faces downward" },
  { value: "vertical",   label: "Vertical (wall/column)",  hint: "Wall face, column or beam side" },
  { value: "horizontal", label: "Horizontal (flat slab)",  hint: "Top surface of slab or floor" },
];

const DEPTH_OPTIONS = [
  { value: 5,   label: "Less than 10 mm", hint: "Cosmetic, feather-edge, or surface profiling work" },
  { value: 20,  label: "10–30 mm",        hint: "Standard patch repair — most polymer-modified mortars" },
  { value: 60,  label: "30–100 mm",       hint: "High-build — may require thixotropic or epoxy mortar" },
  { value: 150, label: "Over 100 mm",     hint: "Deep repair — requires formwork or epoxy-grade mortar" },
];

// ── Question sequencing ──────────────────────────────────────────────────────

type QuestionId = "defect" | "orientation" | "depth" | "structural" | "rebar" | "crackActive" | "masonry";

function getActiveQuestionIds(defect: DefectType | null): QuestionId[] {
  const qs: QuestionId[] = ["defect"];
  if (!defect) return qs;
  // floor-spalling is always horizontal — no orientation question
  if (["spalling", "corrosion", "slab-edge"].includes(defect)) qs.push("orientation");
  if (["spalling", "floor-spalling", "slab-edge"].includes(defect)) qs.push("depth");
  if (["spalling", "floor-spalling", "corrosion", "cracking", "settlement"].includes(defect)) qs.push("structural");
  if (["spalling", "floor-spalling", "corrosion", "slab-edge"].includes(defect)) qs.push("rebar");
  if (["cracking", "settlement"].includes(defect)) qs.push("crackActive");
  if (defect === "settlement") qs.push("masonry");
  return qs;
}

// ── Shared sub-components ────────────────────────────────────────────────────

function OptionButton({
  selected, onClick, label, hint,
}: { selected: boolean; onClick: () => void; label: string; hint?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-5 py-4 text-left transition ${
        selected
          ? "border-sky-950 bg-sky-950 text-white shadow-md"
          : "border-slate-200 bg-white text-sky-950 hover:border-sky-300 hover:bg-sky-50"
      }`}
    >
      <div className="font-bold">{label}</div>
      {hint && (
        <div className={`mt-0.5 text-xs leading-5 ${selected ? "text-sky-200" : "text-slate-500"}`}>
          {hint}
        </div>
      )}
    </button>
  );
}

// ── Stage display type ────────────────────────────────────────────────────────

type DisplayStage = {
  stepNumber: number;
  stepLabel: string;
  stageKey: string;         // unique key = primaryCategoryId
  primaryRefUrl: string;    // primary category reference page URL
  products: Product[];      // all products from all categories in this stage, sponsored-first
  refLinks: { label: string; url: string }[];
};

// ── One-at-a-time stage carousel ─────────────────────────────────────────────

function StageBlock({
  stage, selectedProductId, onSelectProduct,
}: {
  stage: DisplayStage;
  selectedProductId: string | null;
  onSelectProduct: (id: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const { products } = stage;
  const current = products[idx] ?? null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Stage header */}
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 px-6 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-950 text-xs font-bold text-white">
          {stage.stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">Step {stage.stepNumber}</div>
          <div className="text-sm font-extrabold text-sky-950">{stage.stepLabel}</div>
        </div>
      </div>

      {/* Single-card body — uses the shared ProductReferenceCard */}
      <div className="px-6 py-5">
        {products.length === 0 ? (
          <p className="text-sm italic text-slate-400">No products found for this stage.</p>
        ) : current ? (
          <>
            <ProductReferenceCard
              name={current.name}
              brand={current.brand}
              brandUrl={current.brandUrl}
              tdsUrl={current.tdsUrl}
              accentColor={current.accentColor}
              descriptionLine={current.descriptionLine}
              techChips={current.techChips}
              productType={current.productType}
              systemDescription={current.systemDescription}
              technicalProperties={current.technicalProperties}
              limitations={current.limitations}
              procurementSources={current.procurementSources}
              sponsored={current.sponsored}
              selected={selectedProductId === current.id}
              onSelect={() => onSelectProduct(current.id)}
              referenceUrl={stage.primaryRefUrl}
            />
            {/* Nav row — only shown when >1 product */}
            {products.length > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setIdx((i) => Math.max(0, i - 1))}
                  disabled={idx === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-sky-950 transition disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-slate-50"
                >
                  <ChevronLeft size={13} /> Prev
                </button>
                <span className="text-xs font-semibold text-slate-500">
                  {idx + 1} / {products.length}
                </span>
                <button
                  onClick={() => setIdx((i) => Math.min(products.length - 1, i + 1))}
                  disabled={idx === products.length - 1}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-sky-950 transition disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-slate-50"
                >
                  Next <ChevronRight size={13} />
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

// ── System summary panel ──────────────────────────────────────────────────────

function SystemSummary({
  stages, selectedProducts,
}: {
  stages: DisplayStage[];
  selectedProducts: Record<string, string>;
}) {
  const rows = stages.map((s) => ({
    ...s,
    product: PRODUCTS.find((p) => p.id === selectedProducts[s.stageKey]) ?? null,
  }));
  if (!rows.some((r) => r.product)) return null;

  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-950 p-6">
      <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.2em] text-white">Your selected system</h3>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.stageKey} className="flex items-start gap-3 rounded-xl bg-sky-900/50 px-4 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white">
              {r.stepNumber}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300">{r.stepLabel}</div>
              {r.product ? (
                <>
                  <div className="text-sm font-bold text-white">{r.product.name}</div>
                  {r.product.tdsUrl && (
                    <a href={r.product.tdsUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-1 block text-[11px] font-semibold text-sky-300 hover:text-white">
                      TDS →
                    </a>
                  )}
                </>
              ) : (
                <div className="text-xs italic text-sky-400">No product selected</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main selector component ───────────────────────────────────────────────────

export default function SelectorClient() {
  const [answers, setAnswers] = useState<SelectorAnswers>({
    defect: null, orientation: null, depthMm: null,
    structural: null, rebarExposed: null, crackActive: null, masonry: null,
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questionIds = getActiveQuestionIds(answers.defect);
  const totalQuestions = questionIds.length;
  const currentQId = questionIds[questionIndex] ?? "defect";

  // Fade-then-advance
  const advanceTo = (nextIdx: number, nextAnswers: SelectorAnswers, results = false) => {
    setFading(true);
    setTimeout(() => {
      setAnswers(nextAnswers);
      if (results) {
        setShowResults(true);
      } else {
        setQuestionIndex(nextIdx);
      }
      setFading(false);
    }, 280);
  };

  const answerQuestion = (qId: QuestionId, value: unknown) => {
    if (fading) return;
    let next = { ...answers };
    if (qId === "defect") {
      next = {
        defect: value as DefectType,
        orientation: null, depthMm: null, structural: null,
        rebarExposed: null, crackActive: null, masonry: null,
      };
    } else if (qId === "orientation")  next.orientation  = value as Orientation;
    else if (qId === "depth")          next.depthMm      = value as number;
    else if (qId === "structural")     next.structural    = value as boolean;
    else if (qId === "rebar")          next.rebarExposed  = value as boolean;
    else if (qId === "crackActive")    next.crackActive   = value as boolean;
    else if (qId === "masonry")        next.masonry       = value as boolean;

    const nextQIds = getActiveQuestionIds(next.defect);
    const nextIdx = questionIndex + 1;
    if (nextIdx >= nextQIds.length) {
      advanceTo(0, next, true);
    } else {
      advanceTo(nextIdx, next);
    }
  };

  const goBack = () => {
    if (fading || questionIndex === 0) return;
    const next = { ...answers };
    if (currentQId === "orientation")  next.orientation  = null;
    else if (currentQId === "depth")   next.depthMm      = null;
    else if (currentQId === "structural") next.structural = null;
    else if (currentQId === "rebar")   next.rebarExposed  = null;
    else if (currentQId === "crackActive") next.crackActive = null;
    else if (currentQId === "masonry") next.masonry       = null;
    advanceTo(questionIndex - 1, next);
  };

  const reset = () => {
    setAnswers({ defect: null, orientation: null, depthMm: null,
      structural: null, rebarExposed: null, crackActive: null, masonry: null });
    setSelectedProducts({});
    setShowResults(false);
    setQuestionIndex(0);
    setFading(false);
  };

  // ── Build display stages (Fix 2: one carousel per SystemStage, not per category)
  const systemStages = showResults ? assembleSystem(answers) : [];

  const displayStages: DisplayStage[] = systemStages.map((stage, si) => {
    // Merge all products from all categories in this stage (Fix 2 — prevents duplicate step labels)
    const allProducts = stage.categories.flatMap((cat) =>
      PRODUCTS.filter((p) => p.categoryId === cat.id)
    );
    // Sponsored-first within technically-filtered list (Fix 3)
    const sponsored   = allProducts.filter((p) => p.sponsored).sort((a, b) => a.sponsorRank - b.sponsorRank);
    const unsponsored = allProducts.filter((p) => !p.sponsored);

    return {
      stepNumber:    si + 1,
      stepLabel:     stage.stepLabel,
      stageKey:      stage.categories[0].id,
      primaryRefUrl: stage.categories[0].url,
      products:      [...sponsored, ...unsponsored],
      refLinks:      stage.categories.map((cat) => ({ label: "Full reference", url: cat.url })),
    };
  });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12">

      {/* ── Question flow (one at a time) ─────────────────────────────────── */}
      {!showResults && (
        <div className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-1 h-0.5 w-8 rounded-full bg-red-700" />
            <h2 className="text-xl font-extrabold text-sky-950">Tell us about the defect</h2>
            <p className="mt-2 text-sm text-slate-500">
              Answer each question — the selector assembles the appropriate repair system for your situation.
            </p>
          </div>

          {/* Progress + back */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Question {questionIndex + 1}{answers.defect ? ` of ${totalQuestions}` : ""}
            </span>
            {questionIndex > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-sky-950"
              >
                <ChevronLeft size={12} /> Back
              </button>
            )}
          </div>

          {/* Fading question panel */}
          <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>

            {currentQId === "defect" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  What type of defect are you dealing with?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {DEFECT_OPTIONS.map((o) => (
                    <OptionButton key={o.value} selected={answers.defect === o.value}
                      onClick={() => answerQuestion("defect", o.value)}
                      label={o.label} hint={o.hint} />
                  ))}
                </div>
              </div>
            )}

            {currentQId === "orientation" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  What is the element orientation?
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {ORIENTATION_OPTIONS.map((o) => (
                    <OptionButton key={o.value} selected={answers.orientation === o.value}
                      onClick={() => answerQuestion("orientation", o.value)}
                      label={o.label} hint={o.hint} />
                  ))}
                </div>
              </div>
            )}

            {currentQId === "depth" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  What is the deepest point of the repair area?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {DEPTH_OPTIONS.map((o) => (
                    <OptionButton key={o.value} selected={answers.depthMm === o.value}
                      onClick={() => answerQuestion("depth", o.value)}
                      label={o.label} hint={o.hint} />
                  ))}
                </div>
              </div>
            )}

            {currentQId === "structural" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  Is the repair structural or cosmetic?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <OptionButton selected={answers.structural === true}
                    onClick={() => answerQuestion("structural", true)}
                    label="Structural"
                    hint="Load-bearing element — engineer assessment required or already done" />
                  <OptionButton selected={answers.structural === false}
                    onClick={() => answerQuestion("structural", false)}
                    label="Cosmetic / non-structural"
                    hint="Appearance repair only — not a load-bearing concern" />
                </div>
              </div>
            )}

            {currentQId === "rebar" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  Is reinforcing steel (rebar) exposed?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <OptionButton selected={answers.rebarExposed === true}
                    onClick={() => answerQuestion("rebar", true)}
                    label="Yes — rebar is exposed"
                    hint="Steel is visible and may be corroded — rebar primer step required" />
                  <OptionButton selected={answers.rebarExposed === false}
                    onClick={() => answerQuestion("rebar", false)}
                    label="No — concrete only"
                    hint="No rebar exposed in the repair zone" />
                </div>
              </div>
            )}

            {currentQId === "crackActive" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  Is the crack active (still moving)?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <OptionButton selected={answers.crackActive === true}
                    onClick={() => answerQuestion("crackActive", true)}
                    label="Active / still moving"
                    hint="Crack is live — use flexible PU injection or sealant, not rigid epoxy" />
                  <OptionButton selected={answers.crackActive === false}
                    onClick={() => answerQuestion("crackActive", false)}
                    label="Dormant / stable"
                    hint="No further movement — rigid epoxy injection is an option if structural" />
                </div>
              </div>
            )}

            {currentQId === "masonry" && (
              <div>
                <label className="mb-3 block text-sm font-bold text-sky-950">
                  Is the substrate concrete or masonry?
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <OptionButton selected={answers.masonry === false}
                    onClick={() => answerQuestion("masonry", false)}
                    label="Concrete"
                    hint="Reinforced concrete structure" />
                  <OptionButton selected={answers.masonry === true}
                    onClick={() => answerQuestion("masonry", true)}
                    label="Masonry / brick"
                    hint="Brick or block wall — lime repointing may be appropriate" />
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      {showResults && (
        <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between gap-6">
            <div>
              <div className="mb-1 h-0.5 w-8 rounded-full bg-red-700" />
              <h2 className="text-xl font-extrabold text-sky-950">Recommended repair system</h2>
              <p className="mt-1 text-sm text-slate-500">
                Based on your answers — select one product per stage to assemble your system.
              </p>
            </div>
            <button
              onClick={reset}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 hover:bg-slate-50"
            >
              <RotateCcw size={14} /> Start over
            </button>
          </div>

          {/* Answer chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            {[
              answers.defect      && DEFECT_OPTIONS.find((o) => o.value === answers.defect)?.label,
              answers.orientation && ORIENTATION_OPTIONS.find((o) => o.value === answers.orientation)?.label,
              answers.depthMm !== null && DEPTH_OPTIONS.find((o) => o.value === answers.depthMm)?.label,
              answers.structural  !== null && (answers.structural  ? "Structural"    : "Cosmetic"),
              answers.rebarExposed !== null && (answers.rebarExposed ? "Rebar exposed" : "No rebar"),
              answers.crackActive !== null && (answers.crackActive ? "Active crack"  : "Dormant crack"),
              answers.masonry     !== null && (answers.masonry     ? "Masonry"        : "Concrete"),
            ].filter(Boolean).map((tag, i) => (
              <span key={i} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">
                {tag as string}
              </span>
            ))}
          </div>

          {/* No match */}
          {displayStages.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 sm:px-8 py-12 text-center">
              <AlertTriangle size={24} className="mx-auto mb-3 text-amber-600" />
              <p className="font-bold text-amber-900">No system matched your selection.</p>
              <p className="mt-2 text-sm text-amber-700">
                This may indicate a situation outside this library's scope. Consult the full reference pages or an engineer.
              </p>
              <button onClick={reset}
                className="mt-4 rounded-xl border border-amber-300 px-4 py-2 text-sm font-bold text-amber-900 hover:bg-amber-100">
                Start over
              </button>
            </div>
          ) : (
            <div className="grid gap-12 xl:grid-cols-[1fr_340px]">

              {/* Stage list */}
              <div className="space-y-6">
                {displayStages.map((stage) => (
                  <StageBlock
                    key={stage.stageKey}
                    stage={stage}
                    selectedProductId={selectedProducts[stage.stageKey] ?? null}
                    onSelectProduct={(id) =>
                      setSelectedProducts((prev) => ({ ...prev, [stage.stageKey]: id }))
                    }
                  />
                ))}

                {/* ACL disclosure */}
                <p className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-400">
                  <strong className="text-slate-600">Card order notice:</strong> Within each stage, sponsored products may appear first. All products shown meet the technical criteria for your selection. Sponsorship status does not reflect product performance or suitability.{" "}
                  <em>Final wording to be confirmed by legal counsel — Australian Consumer Law.</em>
                </p>
              </div>

              {/* Summary + disclaimer */}
              <div className="space-y-6">
                <SystemSummary stages={displayStages} selectedProducts={selectedProducts} />

                <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                    <p className="text-xs leading-5 text-amber-800">
                      System recommendations are general in nature. Always refer to manufacturer documentation, relevant standards (AS 3600, EN 1504), and project-specific design advice before specification.
                    </p>
                  </div>
                </div>

                <a
                  href="/repair-systems/library"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-sky-950 transition hover:bg-slate-50"
                >
                  Browse full repair systems library <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
