"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import {
  ChevronRight, ChevronLeft, RotateCcw, ArrowRight, CheckCircle,
  AlertTriangle, Layers,
} from "lucide-react";
import { SPALLING_QUESTIONS, runSelector } from "./data/spalling-engine";
import { RC_QUESTIONS, runSelectorRC } from "./data/reinf-corrosion-engine";
import { CC_QUESTIONS, runSelectorCC } from "./data/concrete-cracking-engine";
import { MAG_QUESTIONS, runSelectorMag } from "./data/magnesite-engine";
import { BWP_QUESTIONS, runSelectorBWP } from "./data/balcony-wp-engine";
import type { Question, SelectorOutput, Demand } from "./data/selector-core";
import type { RefCard } from "../_components/ProductSpecCardV2";
import { AutoProductReference } from "../_components/AutoProductReference";
import { SELECTOR_CARDS } from "./data/spalling-cards";
import { CRACKING_SELECTOR_CARDS } from "./data/cracking-cards";

// Render the live repair-system-library carousel for a recommended category.
// A stage may carry its own pre-ordered `cards` (magnesite); otherwise we look
// the cards up by slug in the per-defect registry (cracking has its own because
// it reuses some slug names with a different product set).
function StageProducts({ slug, label, section, cards }: { slug: string; label: string; section: string | null; cards?: RefCard[] }) {
  const registry = section === "concrete-cracking" ? CRACKING_SELECTOR_CARDS : SELECTOR_CARDS;
  const src = cards && cards.length ? { cards } : registry[slug];
  if (!src) return null;
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Products that pass — options for {label}
      </p>
      {src.cards ? (
        <AutoProductReference products={[] as never} cards={src.cards} designCriteria="" sectionLabel={label} hideComparison singleCard />
      ) : (
        <AutoProductReference products={src.products as never} designCriteria="" sectionLabel={label} hideComparison singleCard />
      )}
    </div>
  );
}

// ── Per-section engines (each reads only that section's AI blocks) ────────────
const ENGINES: Record<string, { questions: Question[]; run: (d: Demand) => SelectorOutput }> = {
  "concrete-spalling": { questions: SPALLING_QUESTIONS as unknown as Question[], run: runSelector as unknown as (d: Demand) => SelectorOutput },
  "reinforcement-corrosion": { questions: RC_QUESTIONS, run: runSelectorRC },
  "concrete-cracking": { questions: CC_QUESTIONS, run: runSelectorCC },
  "magnesite-flooring": { questions: MAG_QUESTIONS, run: runSelectorMag },
  "balcony-podium-waterproofing": { questions: BWP_QUESTIONS, run: runSelectorBWP },
};

// ── Top-level defect categories ───────────────────────────────────────────────
const CATEGORIES: { id: string; label: string; hint: string; ready: boolean }[] = [
  { id: "concrete-structural", label: "Concrete & Structural", hint: "Spalling, reinforcement corrosion, cracking and magnesite flooring", ready: true },
  { id: "waterproofing", label: "Waterproofing & Water Ingress", hint: "Balconies & podiums, rising damp, basement ingress, penetrating damp", ready: true },
];

// ── Defect sections (grouped under a category) ────────────────────────────────
const SECTIONS: { id: string; label: string; hint: string; ready: boolean; category: string }[] = [
  { id: "concrete-spalling", label: "Concrete spalling", hint: "Delamination, pop-outs, exposed aggregate or rebar in a slab, beam or column", ready: true, category: "concrete-structural" },
  { id: "reinforcement-corrosion", label: "Reinforcement corrosion", hint: "Rust staining, cover cracking, active rebar corrosion", ready: true, category: "concrete-structural" },
  { id: "concrete-cracking", label: "Concrete cracking", hint: "Structural, non-structural or settlement cracking in concrete", ready: true, category: "concrete-structural" },
  { id: "magnesite-flooring", label: "Magnesite flooring deterioration", hint: "Soft, crumbling, moisture-affected magnesite screed", ready: true, category: "concrete-structural" },
  { id: "balcony-podium-waterproofing", label: "Balcony, podium, roof & planter waterproofing", hint: "Failed balcony / terrace / podium / roof / planter waterproofing — assemble the prep, membrane and finish system", ready: true, category: "waterproofing" },
  { id: "rising-damp", label: "Rising damp", hint: "Salt damp / rising moisture in masonry walls", ready: false, category: "waterproofing" },
  { id: "basement-water-ingress", label: "Basement & below-grade water ingress", hint: "Tanking, negative-side and crack-injection systems", ready: false, category: "waterproofing" },
  { id: "penetrating-damp", label: "Penetrating damp", hint: "Lateral water through walls / facades", ready: false, category: "waterproofing" },
];

type Mode = "category" | "section" | "questions" | "results";

export default function SpallingSelectorClient() {
  const [mode, setMode] = useState<Mode>("category");
  const [category, setCategory] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const engine = section ? ENGINES[section] : null;
  const questions = engine?.questions ?? [];
  const total = questions.length;
  const q = questions[step];
  // Count only the steps actually shown (conditional/skipped questions excluded) so the
  // counter never jumps (e.g. 5 → 7 when an inapplicable question is silently skipped).
  const visibleSteps = questions.map((_, i) => i).filter((i) => !isSkipped(i, answers));
  const visiblePos = Math.max(0, visibleSteps.indexOf(step));
  const visibleTotal = visibleSteps.length || total;
  // On a warm-roof (insulation) path, the "deck" question is about what sits UNDER the
  // insulation (drives the VCL/prep) — not the membrane substrate. Reframe its label.
  const deckReframe = section === "balcony-podium-waterproofing" && q?.key === "deck" && (answers.buildup === "tapered-insulation" || answers.buildup === "flat-insulation");
  const displayPrompt = deckReframe ? "What is under the insulation on the concrete deck?" : q?.prompt;
  const displayHelp = deckReframe ? "In a warm-roof build-up the membrane goes OVER the insulation. This answer sets the VCL and deck preparation — it is not the membrane substrate." : q?.help;
  const sectionMeta = SECTIONS.find((s) => s.id === section);
  const categoryMeta = CATEGORIES.find((c) => c.id === category);
  const categorySections = SECTIONS.filter((s) => s.category === category);

  const result = useMemo(() => {
    if (mode !== "results" || !engine) return null;
    return engine.run(answers as Demand);
  }, [mode, engine, answers]);

  // Bug 3 & 4 — Cosmetic repairs cannot be deep and cannot involve exposed
  // reinforcement. Restrict the option set for those questions when cosmetic.
  function optionsFor(qq: Question, ans: Record<string, string>) {
    if (section === "concrete-spalling" && ans.structural === "cosmetic") {
      if (qq.key === "depth") return qq.options.filter((o) => o.value === "lt10");
      if (qq.key === "substrate") return qq.options.filter((o) => o.value !== "exposed_rebar");
    }
    // Warm-roof insulation build-ups are incompatible with a directly-bonded under-tile membrane.
    if (section === "balcony-podium-waterproofing" && qq.key === "buildup" && ans.finish === "tiled") {
      return qq.options.filter((o) => o.value !== "tapered-insulation" && o.value !== "flat-insulation");
    }
    // A planter box / green roof can only be landscaped or covered — not tiled or exposed-trafficable.
    if (section === "balcony-podium-waterproofing" && qq.key === "finish" && ans.element === "planter") {
      return qq.options.filter((o) => o.value === "landscaped" || o.value === "covered");
    }
    return qq.options;
  }

  // Bug 6 — a question is auto-resolved (skipped) when an earlier answer already
  // determines it: "Exposed reinforcement" substrate ⇒ rebar is exposed (yes);
  // a cosmetic repair has no exposed reinforcement at all.
  function isSkipped(idx: number, ans: Record<string, string>) {
    const qq = questions[idx];
    if (!qq) return false;
    if (section === "concrete-spalling") {
      if (qq.key === "rebar_exposed" && ans.substrate === "exposed_rebar") return true;
      if (qq.key === "rebar_exposed" && ans.structural === "cosmetic") return true;
    }
    if (section === "balcony-podium-waterproofing") {
      // The existing-membrane-type question only applies when overlaying an existing membrane.
      if (qq.key === "existing_membrane" && ans.deck !== "existing") return true;
      // Strip-or-retain only applies to a warm-roof overlay of an existing membrane.
      if (qq.key === "strip_retain" && !((ans.buildup === "tapered-insulation" || ans.buildup === "flat-insulation") && ans.deck === "existing")) return true;
      // Existing-outlet condition only applies when an outlet is present (not "none" / not yet chosen).
      if (qq.key === "drainage_condition" && (!ans.drainage_type || ans.drainage_type === "none")) return true;
    }
    return false;
  }
  function nextStep(from: number, ans: Record<string, string>) {
    let n = from + 1;
    while (n < total && isSkipped(n, ans)) n++;
    return n;
  }
  function prevStep(from: number, ans: Record<string, string>) {
    let n = from - 1;
    while (n >= 0 && isSkipped(n, ans)) n--;
    return n;
  }
  function lastStep(ans: Record<string, string>) {
    let n = total - 1;
    while (n >= 0 && isSkipped(n, ans)) n--;
    return n;
  }

  function pickCategory(id: string, ready: boolean) {
    if (!ready) return;
    setCategory(id);
    setSection(null);
    setMode("section");
  }

  function pickSection(id: string, ready: boolean) {
    if (!ready) return;
    setSection(id);
    setAnswers({});
    setStep(0);
    setMode("questions");
  }

  function answer(value: string) {
    let next = { ...answers, [q.key]: value };
    // Bug 6 — selecting "Exposed reinforcement" substrate forces rebar_exposed = yes
    // and skips the now-redundant Step 5.
    if (section === "concrete-spalling" && q.key === "substrate" && value === "exposed_rebar") {
      next = { ...next, rebar_exposed: "yes" };
    }
    setAnswers(next);
    const n = nextStep(step, next);
    if (n < total) setStep(n);
    else setMode("results");
  }

  function back() {
    scrollToTop();
    if (mode === "results") { setMode("questions"); setStep(lastStep(answers)); return; }
    const n = prevStep(step, answers);
    if (n >= 0) setStep(n);
    else { setMode("section"); setSection(null); }
  }

  function restart() {
    setMode("category"); setCategory(null); setSection(null); setStep(0); setAnswers({});
    scrollToTop();
  }

  return (
    <div ref={topRef} className="mx-auto max-w-3xl px-5 py-12 scroll-mt-24">
      {/* progress / breadcrumb */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          {([
            { key: "category", label: "Category" },
            { key: "section", label: "Defect" },
            { key: "questions", label: "Site conditions" },
            { key: "results", label: "Repair system" },
          ] as { key: Mode; label: string }[]).map((c, i) => {
            const order: Mode[] = ["category", "section", "questions", "results"];
            const reachable = order.indexOf(c.key) < order.indexOf(mode); // can jump back, not forward
            const goCrumb = () => {
              if (!reachable) return;
              if (c.key === "category") { setMode("category"); setCategory(null); setSection(null); }
              else if (c.key === "section") { if (category) { setMode("section"); setSection(null); } }
              else if (c.key === "questions") { if (section) { setMode("questions"); setStep(0); } }
            };
            return (
              <Fragment key={c.key}>
                {i > 0 && <ChevronRight size={12} />}
                <button
                  type="button"
                  onClick={goCrumb}
                  disabled={!reachable}
                  className={`${mode === c.key ? "text-sky-950" : ""} ${reachable ? "cursor-pointer hover:text-sky-800 hover:underline" : "cursor-default"}`}
                  aria-label={reachable ? `Go back to ${c.label}` : c.label}
                >
                  {c.label}
                </button>
              </Fragment>
            );
          })}
        </div>
        {mode !== "category" && (
          <button onClick={restart} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
            <RotateCcw size={12} /> Start over
          </button>
        )}
      </div>

      {/* ── Category picker (top level) ── */}
      {mode === "category" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-950">System Selector</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Pick a defect category, then the specific defect. Answer a few questions about the site conditions and the selector assembles the appropriate multi-stage repair system from the product data — gate-matched, never guessed.
          </p>
          <div className="mt-8 grid gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => pickCategory(c.id, c.ready)}
                disabled={!c.ready}
                className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-left transition ${
                  c.ready
                    ? "border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow"
                    : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-70"
                }`}
              >
                <div>
                  <p className="text-base font-extrabold text-sky-950">{c.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.hint}</p>
                </div>
                {c.ready ? (
                  <ChevronRight size={18} className="shrink-0 text-sky-700" />
                ) : (
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Soon</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Section picker (within the chosen category) ── */}
      {mode === "section" && (
        <div>
          <button onClick={() => { setMode("category"); setCategory(null); }} className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700">
            <ChevronLeft size={14} /> Categories
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-950">{categoryMeta?.label ?? "System Selector"}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Pick the defect, answer a few questions about the site conditions, and the selector assembles the appropriate multi-stage repair system from the product data — gate-matched, never guessed.
          </p>
          <div className="mt-8 grid gap-3">
            {categorySections.map((s) => (
              <button
                key={s.id}
                onClick={() => pickSection(s.id, s.ready)}
                disabled={!s.ready}
                className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-left transition ${
                  s.ready
                    ? "border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow"
                    : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-70"
                }`}
              >
                <div>
                  <p className="text-base font-extrabold text-sky-950">{s.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.hint}</p>
                </div>
                {s.ready ? (
                  <ChevronRight size={18} className="shrink-0 text-sky-700" />
                ) : (
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Soon</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Questions ── */}
      {mode === "questions" && q && (
        <div>
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-sky-700 transition-all" style={{ width: `${(visiblePos / visibleTotal) * 100}%` }} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Step {visiblePos + 1} of {visibleTotal}</p>
          <h2 className="mt-2 text-2xl font-extrabold leading-snug text-sky-950">{displayPrompt}</h2>
          {displayHelp && <p className="mt-2 text-sm text-slate-500">{displayHelp}</p>}
          <div className="mt-6 grid gap-3">
            {optionsFor(q, answers).map((o) => {
              const selected = answers[q.key] === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => answer(o.value)}
                  className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-4 text-left transition ${
                    selected ? "border-sky-950 bg-sky-950 text-white" : "border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow"
                  }`}
                >
                  <div>
                    <p className={`text-sm font-extrabold ${selected ? "text-white" : "text-sky-950"}`}>{o.label}</p>
                    {o.hint && <p className={`mt-0.5 text-xs ${selected ? "text-sky-100" : "text-slate-500"}`}>{o.hint}</p>}
                  </div>
                  <ChevronRight size={16} className={selected ? "text-white" : "text-slate-300"} />
                </button>
              );
            })}
          </div>

          {/* Bug 5 — structural patch under 10 mm is rarely TDS-compliant. Advise, don't block. */}
          {section === "concrete-spalling" && q.key === "depth" && answers.structural === "structural" && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs font-semibold leading-5 text-amber-800">
                Note: Structural patch repairs under 10 mm are rarely achievable — most EN 1504-3 structural repair mortars have minimum layer thicknesses of 6–10 mm. Confirm this depth is correct before continuing.
              </p>
            </div>
          )}

          <button onClick={back} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700">
            <ChevronLeft size={14} /> Back
          </button>
        </div>
      )}

      {/* ── Results ── */}
      {mode === "results" && result && (
        <div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-1 shrink-0 rounded-full bg-red-700" />
            <div>
              <h2 className="text-2xl font-extrabold text-sky-950">Assembled repair system</h2>
              <p className="mt-1 text-sm text-slate-500">{sectionMeta?.label ?? "Repair system"} — based on your inputs. Each stage shows the gate-matched system and the best confirmed product, with a link to the full reference.</p>
            </div>
          </div>

          {/* input summary — driven by the active defect's own questions/answers */}
          <div className="mt-5 flex flex-wrap gap-2">
            {questions
              .filter((qq) => answers[qq.key] != null)
              .map((qq) => {
                const opt = qq.options.find((o) => o.value === answers[qq.key]);
                return (
                  <span key={qq.key} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                    {opt?.pillLabel ?? opt?.label ?? "—"}
                  </span>
                );
              })}
          </div>

          {/* Flagged advisory blocks (engine-supplied — not product stages) */}
          {result.advisories && result.advisories.length > 0 && (
            <div className="mt-6 space-y-3">
              {result.advisories.map((adv, ai) => {
                const critical = adv.severity === "critical";
                return (
                  <div key={ai} className={`rounded-2xl border-2 p-5 shadow-sm ${critical ? "border-red-300 bg-red-50" : "border-amber-300 bg-amber-50"}`}>
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle size={16} className={`mt-0.5 shrink-0 ${critical ? "text-red-600" : "text-amber-600"}`} />
                      <div>
                        {adv.title && <h3 className={`text-sm font-extrabold uppercase tracking-wider ${critical ? "text-red-900" : "text-amber-900"}`}>{adv.title}</h3>}
                        <p className={`${adv.title ? "mt-1.5" : ""} text-xs font-semibold leading-5 ${critical ? "text-red-900" : "text-amber-900"}`}>{adv.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {result.stages.length === 0 && (
            <div className="mt-8 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-sm font-semibold leading-6 text-amber-800">
                These inputs do not resolve to a confirmed product stage — the crack condition is contradictory or below the practical threshold for a standard treatment. Confirm the crack diagnosis and treatment route with a structural engineer before specifying.
              </p>
            </div>
          )}

          <ol className="mt-8 space-y-4">
            {result.stages.map((st, i) => (
              <Fragment key={st.stage}>
              {/* Bug 7 — deficient structural capacity ⇒ engineer-designed strengthening
                  scheme required before the mortar stage. Advisory only, no products. */}
              {section === "reinforcement-corrosion" && answers.structural_capacity === "deficient" && st.stage === "repair-mortar" && (
                <li className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-600 text-white">
                      <AlertTriangle size={15} />
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-900">Structural strengthening — engineer required</h3>
                  </div>
                  <p className="mt-3 pl-10 text-xs font-semibold leading-5 text-amber-900">
                    The selected answers indicate the element&rsquo;s structural capacity is deficient after patch repair alone. A structural strengthening scheme (e.g. CFRP laminate, plate bonding, or additional reinforcement) must be designed and specified by a structural engineer before this repair system is applied. The mortar-based system below reinstates cover and corrosion protection only.
                  </p>
                </li>
              )}
              <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-xs font-bold text-white">{i + 1}</span>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">{st.label}</h3>
                </div>

                {st.recommended ? (
                  <div className="mt-4 pl-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                        <Layers size={11} /> {st.recommended.category.displayName}
                      </span>
                      <a href={st.recommended.category.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900">
                        View reference <ArrowRight size={10} />
                      </a>
                    </div>

                    {st.recommended.product ? (
                      <p className="mt-3 text-base font-extrabold text-sky-950">{st.recommended.product.name}</p>
                    ) : (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                        <p className="text-xs font-semibold leading-5 text-amber-800">{st.note}</p>
                      </div>
                    )}

                    {st.cardNote && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                        <Layers size={13} className="mt-0.5 shrink-0 text-sky-700" />
                        <p className="text-xs font-semibold leading-5 text-sky-900">{st.cardNote}</p>
                      </div>
                    )}

                    <StageProducts slug={st.recommended.category.slug} label={st.recommended.category.displayName} section={section} cards={st.cards} />

                    {st.recommended.why.length > 0 && (
                      <details className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                        <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Why these are selected (gates passed)
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {st.recommended.why.map((w) => (
                            <li key={w.gate} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                              <span><span className="font-semibold">{w.gate}</span>: {w.demandValue}</span>
                            </li>
                          ))}
                        </ul>
                        {st.recommended.product && (
                          <p className="mt-2 text-[10px] italic text-slate-400">Lead reference: {st.recommended.product.name} · Source: {st.recommended.product.source} · Confirm current data with the manufacturer TDS before specifying.</p>
                        )}
                      </details>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 pl-10">
                    <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                      <p className="text-xs font-semibold leading-5 text-amber-800">{st.note}</p>
                    </div>
                  </div>
                )}

                {st.options.length > 0 && (
                  <div className="mt-4 pl-10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Other matching systems</p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {st.options.map((o) => (
                        <a
                          key={o.category.slug}
                          href={o.category.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-900"
                        >
                          {o.category.displayName}
                          {o.product ? <span className="text-slate-400">· {o.product.name}</span> : <span className="text-amber-600">· confirm TDS</span>}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              </Fragment>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={back} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-950 transition hover:border-sky-300">
              <ChevronLeft size={14} /> Change answers
            </button>
            <button onClick={restart} className="inline-flex items-center gap-1.5 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800">
              <RotateCcw size={14} /> Start over
            </button>
          </div>

          <p className="mt-6 text-[11px] leading-5 text-slate-400">
            Selector output is derived only from the AI Selection Data on the product reference pages. Products marked unconfirmed are excluded and shown as &ldquo;confirm with manufacturer TDS / engineer&rdquo;. This tool supports — it does not replace — engineering judgement and the current manufacturer TDS.
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            System Selector v1.1 · product data last verified June 2026 · confirm against the current manufacturer TDS before specifying.
          </p>
        </div>
      )}
    </div>
  );
}
