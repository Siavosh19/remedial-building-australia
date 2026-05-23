"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { ScopePreview } from "@/components/scope-builder/ScopePreview";
import { ScopeOutputOptions } from "@/components/scope-builder/ScopeOutputOptions";
import type { SavedProject, OutputType } from "@/lib/scope-builder-types";
import { OUTPUT_TYPE_LABELS, REPAIR_SYSTEMS, MATERIALS, SCOPE_CLAUSES } from "@/lib/scope-builder-data";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<SavedProject | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [outputType, setOutputType] = useState<OutputType>("consultant");
  const [generating, setGenerating] = useState(false);
  const [scope, setScope] = useState("");

  useEffect(() => {
    if (!id) return;
    try {
      const saved: SavedProject[] = JSON.parse(
        localStorage.getItem("scope_projects") ?? "[]"
      );
      const found = saved.find((p) => p.id === id);
      if (!found) {
        setNotFound(true);
        return;
      }
      setProject(found);
      setOutputType(found.outputType);
      setScope(found.generatedScope);
    } catch {
      setNotFound(true);
    }
  }, [id]);

  async function regenerate() {
    if (!project) return;
    setGenerating(true);

    const repairSystemNames = project.selectedRepairSystems.map(
      (rid) => REPAIR_SYSTEMS.find((rs) => rs.id === rid)?.name ?? rid
    );
    const materialNames = project.selectedMaterials.map((mid) => {
      const m = MATERIALS.find((x) => x.id === mid);
      return m ? `${m.brand} ${m.productName} (${m.category})` : mid;
    });
    const clauseTitles = project.selectedClauses.map(
      (cid) => SCOPE_CLAUSES.find((c) => c.id === cid)?.title ?? cid
    );

    try {
      const res = await fetch("/api/generate-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: project.project,
          defects: project.defects,
          selectedRepairSystems: repairSystemNames,
          selectedMaterials: materialNames,
          selectedClauses: clauseTitles,
          outputType,
          missingInfo: [],
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) return;
      setScope(data.scope);
    } catch {
      // silently fail on project detail page
    } finally {
      setGenerating(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleEmail() {
    if (!project) return;
    const subject = encodeURIComponent(
      `Remedial Scope of Works — ${project.project.address}`
    );
    const body = encodeURIComponent(
      `Scope of Works for ${project.project.address}.\n\nGenerated via Remedial Building Australia AI Scope Builder.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-5xl px-5 py-12">
        {/* Back nav */}
        <a
          href="/ai-scope-builder/projects"
          className="no-print mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition"
        >
          <ArrowLeft size={15} /> All Projects
        </a>

        {notFound && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <AlertCircle size={28} className="mb-3 text-slate-300" />
            <p className="text-sm font-bold text-slate-500">Project not found.</p>
            <p className="mt-1 text-xs text-slate-400">
              It may have been deleted or is stored on another device.
            </p>
            <a
              href="/ai-scope-builder/projects"
              className="mt-5 text-sm font-bold text-sky-700 hover:text-red-700 transition"
            >
              ← Back to projects
            </a>
          </div>
        )}

        {generating && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-red-700 mb-4" />
            <p className="text-sm font-bold text-sky-950">Regenerating scope…</p>
          </div>
        )}

        {project && !notFound && !generating && scope && (
          <>
            {/* Project meta header */}
            <div className="no-print mb-6 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-red-700">
                    Saved Project
                  </div>
                  <h1 className="mt-1 text-xl font-extrabold text-sky-950">
                    {project.project.name || project.project.address}
                  </h1>
                  {project.project.name && (
                    <p className="text-sm text-slate-500">{project.project.address}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>
                      Saved {new Date(project.createdAt).toLocaleDateString("en-AU")}
                    </span>
                    <span>·</span>
                    <span>{project.defects.length} defect{project.defects.length !== 1 ? "s" : ""}</span>
                    <span>·</span>
                    <span>{OUTPUT_TYPE_LABELS[project.outputType] ?? project.outputType}</span>
                  </div>
                </div>
                <a
                  href="/ai-scope-builder/new"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  New Scope
                </a>
              </div>
            </div>

            <ScopeOutputOptions
              outputType={outputType}
              onOutputTypeChange={setOutputType}
              onPrint={handlePrint}
              onEmail={handleEmail}
              onReset={() => (window.location.href = "/ai-scope-builder/new")}
              onRegenerate={regenerate}
              generating={generating}
            />

            <ScopePreview
              scope={scope}
              project={project.project}
              defects={project.defects}
              outputType={outputType}
            />
          </>
        )}
      </main>
    </ScopeShell>
  );
}
