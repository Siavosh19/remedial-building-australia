"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Plus, AlertCircle } from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { ProjectSetupForm } from "@/components/scope-builder/ProjectSetupForm";
import { DefectModuleCard } from "@/components/scope-builder/DefectModuleCard";
import { RepairSystemSelector } from "@/components/scope-builder/RepairSystemSelector";
import { MaterialSelector } from "@/components/scope-builder/MaterialSelector";
import { ScopeClauseSelector } from "@/components/scope-builder/ScopeClauseSelector";
import { ScopePreview } from "@/components/scope-builder/ScopePreview";
import { ScopeOutputOptions } from "@/components/scope-builder/ScopeOutputOptions";
import {
  REPAIR_SYSTEMS,
  MATERIALS,
  SCOPE_CLAUSES,
  DEFAULT_CLAUSE_IDS,
  OUTPUT_TYPE_LABELS,
} from "@/lib/scope-builder-data";
import type {
  ProjectData,
  Defect,
  DefectCategory,
  OutputType,
  SavedProject,
} from "@/lib/scope-builder-types";

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_PROJECT: ProjectData = {
  name: "",
  address: "",
  buildingType: "Residential Apartment (Class 2)",
  isClass2: true,
  occupied: true,
  levels: "",
  lots: "",
  clientName: "",
  preparedBy: "",
  reportDate: new Date().toLocaleDateString("en-CA"),
  accessConstraints: "No significant constraints",
  coastalExposure: false,
  notes: "",
};

function newDefect(): Defect {
  return {
    id: crypto.randomUUID(),
    category: "Waterproofing & Water Ingress" as DefectCategory,
    defectType: "",
    location: "",
    severity: "Moderate",
    quantity: "",
    suspectedCause: "",
    notes: "",
  };
}

// ─── Step bar ─────────────────────────────────────────────────────────────────

const STEPS = [
  "Project",
  "Defects",
  "Repair Systems",
  "Materials",
  "Clauses",
  "Review",
];

function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-10 flex items-center">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const active = step === idx;
        const done = step > idx;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-colors ${
                  done
                    ? "bg-red-700 text-white"
                    : active
                    ? "bg-sky-950 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? "✓" : idx}
              </div>
              <span
                className={`mt-1 hidden text-[10px] font-semibold uppercase tracking-wider sm:block ${
                  active ? "text-sky-950" : done ? "text-red-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 transition-colors ${
                  done ? "bg-red-700" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NewScopePage() {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState<ProjectData>(DEFAULT_PROJECT);
  const [defects, setDefects] = useState<Defect[]>([newDefect()]);
  const [selectedRepairSystems, setSelectedRepairSystems] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedClauses, setSelectedClauses] = useState<string[]>(DEFAULT_CLAUSE_IDS);
  const [outputType, setOutputType] = useState<OutputType>("consultant");
  const [generating, setGenerating] = useState(false);
  const [generatedScope, setGeneratedScope] = useState("");
  const [error, setError] = useState("");
  const [missingInfo, setMissingInfo] = useState<string[]>([]);

  // ── Defect helpers ──

  function addDefect() {
    setDefects((prev) => [...prev, newDefect()]);
  }

  function updateDefect(index: number, defect: Defect) {
    setDefects((prev) => {
      const next = [...prev];
      next[index] = defect;
      return next;
    });
  }

  function removeDefect(index: number) {
    setDefects((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Toggle helpers ──

  function toggleRepairSystem(id: string) {
    setSelectedRepairSystems((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function toggleMaterial(id: string) {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function toggleClause(id: string) {
    setSelectedClauses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleClauseCategory(category: string) {
    const catIds = SCOPE_CLAUSES.filter((c) => c.category === category).map(
      (c) => c.id
    );
    const allSelected = catIds.every((id) => selectedClauses.includes(id));
    if (allSelected) {
      setSelectedClauses((prev) => prev.filter((id) => !catIds.includes(id)));
    } else {
      setSelectedClauses((prev) => [...new Set([...prev, ...catIds])]);
    }
  }

  // ── Validation ──

  function getMissingInfo(): string[] {
    const missing: string[] = [];
    if (!project.address.trim()) missing.push("Project address");
    if (defects.length === 0) missing.push("At least one defect");
    const untyped = defects.filter((d) => !d.defectType);
    if (untyped.length > 0) missing.push("Defect type for all defects");
    const unlocated = defects.filter((d) => !d.location.trim());
    if (unlocated.length > 0) missing.push("Location for all defects");
    if (selectedRepairSystems.length === 0) missing.push("At least one repair system");
    return missing;
  }

  // ── Generate ──

  async function generate() {
    const missing = getMissingInfo();
    setMissingInfo(missing);
    setError("");
    setGenerating(true);

    const repairSystemNames = selectedRepairSystems.map(
      (id) => REPAIR_SYSTEMS.find((rs) => rs.id === id)?.name ?? id
    );
    const materialNames = selectedMaterials.map((id) => {
      const m = MATERIALS.find((x) => x.id === id);
      return m ? `${m.brand} ${m.productName} (${m.category})` : id;
    });
    const clauseTitles = selectedClauses.map(
      (id) => SCOPE_CLAUSES.find((c) => c.id === id)?.title ?? id
    );

    try {
      const res = await fetch("/api/generate-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          defects,
          selectedRepairSystems: repairSystemNames,
          selectedMaterials: materialNames,
          selectedClauses: clauseTitles,
          outputType,
          missingInfo: missing,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Generation failed. Please try again.");
      } else {
        setGeneratedScope(data.scope);
        saveProject(data.scope);
        setStep(7);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  }

  // ── Save to localStorage ──

  function saveProject(scope: string) {
    if (typeof window === "undefined") return;
    const saved: SavedProject = {
      id: crypto.randomUUID(),
      project,
      defects,
      selectedRepairSystems,
      selectedMaterials,
      selectedClauses,
      outputType,
      generatedScope: scope,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const existing: SavedProject[] = JSON.parse(
      localStorage.getItem("scope_projects") ?? "[]"
    );
    localStorage.setItem(
      "scope_projects",
      JSON.stringify([saved, ...existing].slice(0, 50))
    );
  }

  // ── Export ──

  function handlePrint() {
    window.print();
  }

  function handleEmail() {
    const subject = encodeURIComponent(
      `Remedial Scope of Works — ${project.address}`
    );
    const body = encodeURIComponent(
      `Please find attached the AI-generated Scope of Works for ${project.address}.\n\nGenerated via Remedial Building Australia AI Scope Builder.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function handleReset() {
    setStep(1);
    setProject(DEFAULT_PROJECT);
    setDefects([newDefect()]);
    setSelectedRepairSystems([]);
    setSelectedMaterials([]);
    setSelectedClauses(DEFAULT_CLAUSE_IDS);
    setOutputType("consultant");
    setGeneratedScope("");
    setError("");
    setMissingInfo([]);
  }

  // ── Navigation ──

  const step1Valid = project.address.trim().length > 0;
  const step2Valid = defects.length > 0;
  const step3Valid = true; // repair systems optional but recommended
  const step4Valid = true; // materials optional
  const step5Valid = selectedClauses.length > 0;

  function canAdvance() {
    if (step === 1) return step1Valid;
    if (step === 2) return step2Valid;
    return true;
  }

  const nextLabel: Record<number, string> = {
    1: "Next: Add Defects",
    2: "Next: Repair Systems",
    3: "Next: Select Materials",
    4: "Next: Scope Clauses",
    5: "Next: Review & Generate",
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-5xl px-5 py-12">

        {/* Page heading — wizard steps 1–6 */}
        {step <= 6 && !generating && (
          <div className="no-print mb-8">
            <a
              href="/ai-scope-builder"
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-sky-950 transition"
            >
              ← Back to Scope Builder
            </a>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
              AI Scope Builder
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">
              New Scope of Works
            </h1>
          </div>
        )}

        {/* Step bar */}
        {step <= 6 && !generating && <StepBar step={step} />}

        {/* ─── STEP 1: Project ─── */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Project Details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the building and project information. The more detail you provide, the more accurate your scope.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ProjectSetupForm data={project} onChange={setProject} />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {nextLabel[1]} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Defects ─── */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Identified Defects</h2>
              <p className="mt-1 text-sm text-slate-500">
                Add each defect type identified in the building. Add as many as needed.
              </p>
            </div>

            <div className="space-y-4">
              {defects.map((defect, i) => (
                <DefectModuleCard
                  key={defect.id}
                  defect={defect}
                  index={i}
                  onUpdate={(d) => updateDefect(i, d)}
                  onRemove={() => removeDefect(i)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addDefect}
              className="mt-4 flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-5 py-3 text-sm font-bold text-slate-500 transition hover:border-sky-400 hover:text-sky-700 w-full justify-center"
            >
              <Plus size={16} /> Add Another Defect
            </button>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!step2Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {nextLabel[2]} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Repair Systems ─── */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Repair Systems</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select the repair systems applicable to this project. Recommended systems are highlighted based on your identified defects.
              </p>
            </div>
            <RepairSystemSelector
              systems={REPAIR_SYSTEMS}
              selected={selectedRepairSystems}
              onToggle={toggleRepairSystem}
              defects={defects}
            />
            {selectedRepairSystems.length === 0 && (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                <AlertCircle size={16} className="shrink-0" />
                Select at least one repair system for a complete scope.
              </p>
            )}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
              >
                {nextLabel[3]} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Materials ─── */}
        {step === 4 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Materials & Products</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select materials to reference in your scope. The AI will not invent product claims beyond those selected here. Skip to continue without specifying products.
              </p>
            </div>
            <MaterialSelector
              materials={MATERIALS}
              selected={selectedMaterials}
              onToggle={toggleMaterial}
            />
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
              >
                {nextLabel[4]} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: Scope Clauses ─── */}
        {step === 5 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Scope Clauses</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select the standard clauses to include in your scope. Standard clauses have been pre-selected. Add or remove as required.
              </p>
            </div>
            <ScopeClauseSelector
              clauses={SCOPE_CLAUSES}
              selected={selectedClauses}
              onToggle={toggleClause}
              onToggleCategory={toggleClauseCategory}
            />
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
              >
                {nextLabel[5]} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 6: Review & Generate ─── */}
        {step === 6 && !generating && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Review & Generate</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review your selections before generating the scope. Choose your output format then click Generate.
              </p>
            </div>

            {/* Missing info warning */}
            {missingInfo.length > 0 && (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-bold text-amber-800">
                      More project information is required before this scope can be relied upon.
                    </p>
                    <ul className="mt-2 space-y-0.5">
                      {missingInfo.map((item) => (
                        <li key={item} className="text-sm text-amber-700">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <SummaryCard
                title="Project"
                items={[
                  project.name || "—",
                  project.address,
                  project.buildingType,
                  project.levels ? `${project.levels} levels` : "",
                  project.lots ? `${project.lots} lots` : "",
                ].filter(Boolean)}
                onEdit={() => setStep(1)}
              />
              <SummaryCard
                title={`Defects (${defects.length})`}
                items={defects.map((d) => d.defectType || d.category)}
                onEdit={() => setStep(2)}
              />
              <SummaryCard
                title={`Repair Systems (${selectedRepairSystems.length})`}
                items={selectedRepairSystems.map(
                  (id) => REPAIR_SYSTEMS.find((rs) => rs.id === id)?.name ?? id
                )}
                onEdit={() => setStep(3)}
                warn={selectedRepairSystems.length === 0}
              />
              <SummaryCard
                title={`Materials (${selectedMaterials.length})`}
                items={selectedMaterials.map((id) => {
                  const m = MATERIALS.find((x) => x.id === id);
                  return m ? `${m.brand} ${m.productName}` : id;
                })}
                onEdit={() => setStep(4)}
              />
              <SummaryCard
                title={`Clauses (${selectedClauses.length})`}
                items={selectedClauses
                  .slice(0, 5)
                  .map(
                    (id) =>
                      SCOPE_CLAUSES.find((c) => c.id === id)?.title ?? id
                  )
                  .concat(
                    selectedClauses.length > 5
                      ? [`+ ${selectedClauses.length - 5} more`]
                      : []
                  )}
                onEdit={() => setStep(5)}
              />
            </div>

            {/* Output type */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="mb-3 text-sm font-extrabold text-sky-950">Output Format</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(OUTPUT_TYPE_LABELS) as OutputType[]).map((ot) => (
                  <button
                    key={ot}
                    type="button"
                    onClick={() => setOutputType(ot)}
                    className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                      outputType === ot
                        ? "border-sky-950 bg-sky-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                    }`}
                  >
                    {OUTPUT_TYPE_LABELS[ot]}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(5)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={generate}
                disabled={generating}
                className="flex items-center gap-2 rounded-xl bg-red-700 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-red-800 disabled:opacity-60"
              >
                {generating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Generating…
                  </>
                ) : (
                  <>
                    Generate {OUTPUT_TYPE_LABELS[outputType]} <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ─── Generating loading screen ─── */}
        {generating && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-red-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-sky-950" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-sky-950">
              Generating your scope…
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Our AI is assembling a tailored{" "}
              {OUTPUT_TYPE_LABELS[outputType].toLowerCase()} from your selections.
              This takes 20–40 seconds.
            </p>
            <div className="mt-6 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-red-700"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 7: Generated scope ─── */}
        {step === 7 && !generating && generatedScope && (
          <div>
            <ScopeOutputOptions
              outputType={outputType}
              onOutputTypeChange={setOutputType}
              onPrint={handlePrint}
              onEmail={handleEmail}
              onReset={handleReset}
              onRegenerate={generate}
              generating={generating}
            />
            <ScopePreview
              scope={generatedScope}
              project={project}
              defects={defects}
              outputType={outputType}
            />
            <div className="no-print mt-6 flex items-center justify-between">
              <a
                href="/ai-scope-builder/projects"
                className="text-sm font-bold text-sky-700 hover:text-red-700 transition"
              >
                View saved projects →
              </a>
              <button
                onClick={handleReset}
                className="text-sm font-bold text-slate-400 hover:text-sky-950 transition"
              >
                Start a new scope
              </button>
            </div>
          </div>
        )}
      </main>
    </ScopeShell>
  );
}

// ─── Summary card component ───────────────────────────────────────────────────

function SummaryCard({
  title,
  items,
  onEdit,
  warn = false,
}: {
  title: string;
  items: string[];
  onEdit: () => void;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        warn ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-extrabold uppercase tracking-wider ${
            warn ? "text-amber-700" : "text-sky-950"
          }`}
        >
          {title}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="text-[10px] font-bold text-sky-700 hover:text-red-700 transition"
        >
          Edit
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-slate-400 italic">None selected</p>
      ) : (
        <ul className="space-y-0.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
