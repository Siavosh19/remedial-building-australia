"use client";

import { useState, useRef } from "react";
import { ArrowRight, ArrowLeft, Download, Mail, RotateCcw, CheckSquare, Square, Menu } from "lucide-react";
import type { DefectDetail, ScopeRequest } from "@/app/api/generate-scope/route";

// ─── Defect catalogue ─────────────────────────────────────────────────────────

const DEFECT_TYPES = [
  "Waterproofing Failure",
  "Concrete Spalling / Cancer",
  "Structural Cracking",
  "Corrosion of Reinforcement",
  "Façade / Cladding Defects",
  "Balcony Defects",
  "Sealant Failure",
  "Drainage Issues",
  "Expansion Joint Failure",
  "Fire Protection Defects",
  "Window / Glazing Defects",
  "Rising Damp",
  "Roof Defects",
  "Tile Debonding / Hollow Tiles",
  "Spandrel Panel Defects",
  "Post-Tensioned Concrete Issues",
];

const SEVERITY_OPTIONS = ["Minor", "Moderate", "Severe", "Critical"];
const ACCESS_OPTIONS = [
  "Ground level",
  "Internal access",
  "Boom lift / EWP",
  "Scaffolding required",
  "Rope access",
  "Mixed access",
];

// ─── Markdown → minimal HTML ─────────────────────────────────────────────────

function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="mt-8 mb-3 text-xl font-extrabold text-sky-950 border-b border-slate-200 pb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="mt-6 mb-2 text-base font-bold text-sky-950">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/^---$/gm, '<hr class="my-6 border-slate-200" />')
    .replace(/\n\n/g, '</p><p class="mt-3 text-slate-700 leading-7">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p class="mt-3 text-slate-700 leading-7">$1</p>');
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ step }: { step: number }) {
  const steps = ["Project Details", "Select Defects", "Defect Details", "Review & Generate"];
  return (
    <div className="mb-10 flex items-center gap-0">
      {steps.map((label, i) => {
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
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 transition-colors ${done ? "bg-red-700" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AIScopeBuilderPage() {
  const [step, setStep] = useState(1);

  // Step 1: Project details
  const [projectAddress, setProjectAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [buildingType, setBuildingType] = useState("Residential Apartment");
  const [storeys, setStoreys] = useState("");
  const [lots, setLots] = useState("");
  const [clientName, setClientName] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [reportDate, setReportDate] = useState(
    new Date().toLocaleDateString("en-CA") // yyyy-mm-dd for input[type=date]
  );

  // Step 2: Defect selection
  const [selectedDefects, setSelectedDefects] = useState<Set<string>>(new Set());
  const [customDefect, setCustomDefect] = useState("");

  // Step 3: Defect details
  const [defectDetails, setDefectDetails] = useState<Record<string, DefectDetail>>({});

  // Step 4/5: Generation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scope, setScope] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  // ── Helpers ──

  function toggleDefect(name: string) {
    setSelectedDefects((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
        setDefectDetails((d) => {
          const copy = { ...d };
          delete copy[name];
          return copy;
        });
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function addCustomDefect() {
    const name = customDefect.trim();
    if (!name) return;
    setSelectedDefects((prev) => new Set([...prev, name]));
    setCustomDefect("");
  }

  function updateDetail(defect: string, field: keyof DefectDetail, value: string) {
    setDefectDetails((prev) => {
      const existing: DefectDetail = prev[defect] ?? {
        type: defect,
        locations: "",
        severity: "Moderate",
        access: "Mixed access",
        area: "",
        notes: "",
      };
      return { ...prev, [defect]: { ...existing, [field]: value } };
    });
  }

  function getDetail(defect: string): DefectDetail {
    return (
      defectDetails[defect] ?? {
        type: defect,
        locations: "",
        severity: "Moderate",
        access: "Mixed access",
        area: "",
        notes: "",
      }
    );
  }

  async function generate() {
    setLoading(true);
    setError("");

    const payload: ScopeRequest = {
      projectAddress,
      buildingName,
      buildingType,
      storeys,
      lots,
      clientName,
      preparedBy,
      reportDate: new Date(reportDate).toLocaleDateString("en-AU"),
      defects: [...selectedDefects].map((name) => ({
        ...getDetail(name),
        type: name,
      })),
    };

    try {
      const res = await fetch("/api/generate-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Generation failed. Please try again.");
      } else {
        setScope(data.scope);
        setStep(5);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleEmail() {
    const subject = encodeURIComponent(`Remedial Scope of Works — ${projectAddress}`);
    const body = encodeURIComponent(
      `Please find attached the AI-generated Scope of Works for ${projectAddress}.\n\nGenerated via Remedial Building Australia AI Scope Builder.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function handleReset() {
    setStep(1);
    setScope("");
    setError("");
    setSelectedDefects(new Set());
    setDefectDetails({});
  }

  // ── Validation ──

  const step1Valid = projectAddress.trim().length > 0;
  const step2Valid = selectedDefects.size > 0;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-sky-950">
      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { padding: 2rem; }
          body { background: white; }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="no-print sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap text-red-700">AI Scope Builder</a>
          </nav>
          <Menu className="md:hidden" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-14">
        {/* ── Page title ── */}
        {step < 5 && (
          <div className="no-print mb-10">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">AI Scope Builder</div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">
              Generate a Remedial Scope of Works
            </h1>
            <p className="mt-3 max-w-2xl text-slate-500">
              Answer a few questions about your building and identified defects. Our AI will generate a
              professional, structured scope of works you can download or email.
            </p>
          </div>
        )}

        {/* ── Step bar ── */}
        {step < 5 && !loading && <StepBar step={step} />}

        {/* ─── STEP 1: Project details ─── */}
        {step === 1 && (
          <div>
            <h2 className="mb-6 text-xl font-extrabold text-sky-950">Project Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">
                  Project Address <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                  placeholder="e.g. 42 Marine Parade, Manly NSW 2095"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Building Name</label>
                <input
                  type="text"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder="e.g. Oceana Apartments"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Building Type</label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option>Residential Apartment</option>
                  <option>Mixed Use</option>
                  <option>Commercial</option>
                  <option>Aged Care</option>
                  <option>Student Accommodation</option>
                  <option>Hotel / Serviced Apartments</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Number of Storeys</label>
                <input
                  type="text"
                  value={storeys}
                  onChange={(e) => setStoreys(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Number of Lots / Units</label>
                <input
                  type="text"
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                  placeholder="e.g. 48"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Oceana Owners Corporation"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Prepared By</label>
                <input
                  type="text"
                  value={preparedBy}
                  onChange={(e) => setPreparedBy(e.target.value)}
                  placeholder="e.g. John Smith, Remedial Consultant"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-sky-950">Report Date</label>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next: Select Defects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Select defects ─── */}
        {step === 2 && (
          <div>
            <h2 className="mb-2 text-xl font-extrabold text-sky-950">Select Defect Types</h2>
            <p className="mb-6 text-sm text-slate-500">Select all defect types identified in the building.</p>

            <div className="grid gap-2 sm:grid-cols-2">
              {DEFECT_TYPES.map((name) => {
                const checked = selectedDefects.has(name);
                return (
                  <button
                    key={name}
                    onClick={() => toggleDefect(name)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      checked
                        ? "border-sky-950 bg-sky-950 text-white"
                        : "border-slate-200 bg-white text-sky-950 hover:border-sky-300 hover:bg-sky-50"
                    }`}
                  >
                    {checked ? <CheckSquare size={16} className="shrink-0" /> : <Square size={16} className="shrink-0 text-slate-400" />}
                    {name}
                  </button>
                );
              })}
            </div>

            {/* Custom defect */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={customDefect}
                onChange={(e) => setCustomDefect(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomDefect()}
                placeholder="Add custom defect type…"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
              <button
                onClick={addCustomDefect}
                className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-sky-950 hover:bg-slate-200"
              >
                Add
              </button>
            </div>

            {/* Show custom (non-catalogue) defects selected */}
            {[...selectedDefects].filter((d) => !DEFECT_TYPES.includes(d)).map((name) => (
              <div key={name} className="mt-2 flex items-center justify-between rounded-xl border border-sky-950 bg-sky-950 px-4 py-3 text-sm font-semibold text-white">
                <span>{name}</span>
                <button onClick={() => toggleDefect(name)} className="ml-2 text-white/60 hover:text-white">✕</button>
              </div>
            ))}

            {selectedDefects.size > 0 && (
              <p className="mt-4 text-xs font-semibold text-slate-400">
                {selectedDefects.size} defect{selectedDefects.size > 1 ? "s" : ""} selected
              </p>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-950"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!step2Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next: Defect Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Defect details ─── */}
        {step === 3 && (
          <div>
            <h2 className="mb-2 text-xl font-extrabold text-sky-950">Defect Details</h2>
            <p className="mb-6 text-sm text-slate-500">
              Provide details for each selected defect. The more information you provide, the more accurate your scope will be.
            </p>

            <div className="space-y-6">
              {[...selectedDefects].map((name, i) => {
                const d = getDetail(name);
                return (
                  <div key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-700 text-xs font-extrabold text-white">{i + 1}</span>
                      <h3 className="text-base font-extrabold text-sky-950">{name}</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Locations Affected</label>
                        <input
                          type="text"
                          value={d.locations}
                          onChange={(e) => updateDetail(name, "locations", e.target.value)}
                          placeholder="e.g. Level 3 balconies, roof deck, podium planter boxes"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Severity</label>
                        <div className="flex gap-2 flex-wrap">
                          {SEVERITY_OPTIONS.map((sev) => (
                            <button
                              key={sev}
                              onClick={() => updateDetail(name, "severity", sev)}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                                d.severity === sev
                                  ? sev === "Critical"
                                    ? "border-red-700 bg-red-700 text-white"
                                    : sev === "Severe"
                                    ? "border-orange-500 bg-orange-500 text-white"
                                    : sev === "Moderate"
                                    ? "border-amber-500 bg-amber-500 text-white"
                                    : "border-slate-400 bg-slate-400 text-white"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-400"
                              }`}
                            >
                              {sev}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Access Method</label>
                        <select
                          value={d.access}
                          onChange={(e) => updateDetail(name, "access", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        >
                          {ACCESS_OPTIONS.map((a) => <option key={a}>{a}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Estimated Area / Extent</label>
                        <input
                          type="text"
                          value={d.area}
                          onChange={(e) => updateDetail(name, "area", e.target.value)}
                          placeholder="e.g. 120m², 45 lin.m, 8 locations"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Additional Notes</label>
                        <textarea
                          value={d.notes}
                          onChange={(e) => updateDetail(name, "notes", e.target.value)}
                          placeholder="Any other observations, history, or constraints…"
                          rows={2}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-950"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={generate}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Generating…
                  </>
                ) : (
                  <>Generate Scope of Works <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Loading ─── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-red-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-sky-950" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-sky-950">Generating your scope…</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Our AI is writing a tailored remedial scope of works. This usually takes 15–30 seconds.
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

        {/* ─── STEP 5: Report ─── */}
        {step === 5 && !loading && scope && (
          <div>
            {/* Header bar */}
            <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">AI Scope Builder</div>
                <h1 className="mt-1 text-2xl font-extrabold text-sky-950">Scope of Works Generated</h1>
                <p className="mt-1 text-sm text-slate-500">{projectAddress}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleEmail}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-sky-950 hover:border-sky-300 hover:bg-sky-50"
                >
                  <Mail size={15} /> Email
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-800"
                >
                  <Download size={15} /> Download PDF
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-500 hover:border-slate-300"
                >
                  <RotateCcw size={15} /> New Scope
                </button>
              </div>
            </div>

            {/* Report document */}
            <div ref={reportRef} className="print-area rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              {/* Cover block */}
              <div className="mb-8 border-b border-slate-200 pb-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-700">
                  Scope of Works
                </div>
                <h2 className="mt-1 text-2xl font-extrabold text-sky-950">{projectAddress}</h2>
                {buildingName && <p className="mt-0.5 text-sm text-slate-500">{buildingName}</p>}
                <div className="mt-4 grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
                  {clientName && <div><span className="font-semibold">Client:</span> {clientName}</div>}
                  {preparedBy && <div><span className="font-semibold">Prepared By:</span> {preparedBy}</div>}
                  <div><span className="font-semibold">Building Type:</span> {buildingType}</div>
                  {storeys && <div><span className="font-semibold">Storeys:</span> {storeys}</div>}
                  {lots && <div><span className="font-semibold">Lots/Units:</span> {lots}</div>}
                  {reportDate && (
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(reportDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...selectedDefects].map((d) => (
                    <span key={d} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generated content */}
              <div
                className="prose-none text-sm"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(scope) }}
              />

              {/* Footer */}
              <div className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-400">
                Generated by Remedial Building Australia AI Scope Builder · {new Date().toLocaleDateString("en-AU")}
                <br />
                This document is AI-generated and should be reviewed by a qualified remedial building consultant before use.
              </div>
            </div>

            <div className="no-print mt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-950"
              >
                <RotateCcw size={15} /> Start a new scope
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="no-print border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 md:grid-cols-3">
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
