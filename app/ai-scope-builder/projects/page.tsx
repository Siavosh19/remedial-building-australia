"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, Trash2, Plus } from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { OUTPUT_TYPE_LABELS } from "@/lib/scope-builder-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProject = any;

function getTitle(p: AnyProject): string {
  return p?.project?.name || p?.project?.address
    || p?.projectData?.buildingName || p?.projectData?.address
    || "Unnamed Project";
}

function getAddress(p: AnyProject): string {
  return p?.project?.address || p?.projectData?.address || "";
}

function getOutputLabel(p: AnyProject): string {
  return OUTPUT_TYPE_LABELS[p?.outputType] ?? p?.outputFormat ?? p?.outputType ?? "";
}

function getDefectCount(p: AnyProject): number {
  if (Array.isArray(p?.defects)) return p.defects.length;
  // V3: count defects across all areas
  if (p?.areas && typeof p.areas === "object") {
    return Object.values(p.areas).reduce(
      (sum: number, area: AnyProject) => sum + (Array.isArray(area?.defects) ? area.defects.length : 0),
      0
    );
  }
  return 0;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<AnyProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("scope_projects") ?? "[]");
      setProjects(Array.isArray(saved) ? saved : []);
    } catch {
      setProjects([]);
    }
    setLoaded(true);
  }, []);

  function deleteProject(id: string) {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    localStorage.setItem("scope_projects", JSON.stringify(next));
  }

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-5xl px-5 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
              AI Scope Builder
            </div>
            <h1 className="mt-1 text-3xl font-extrabold text-sky-950">
              Saved Projects
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Projects are saved locally on this device.
            </p>
          </div>
          <a
            href="/ai-scope-builder/new"
            className="flex items-center gap-2 rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
          >
            <Plus size={16} /> New Scope
          </a>
        </div>

        {!loaded && (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-950" />
          </div>
        )}

        {loaded && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <FileText size={32} className="mb-4 text-slate-300" />
            <p className="text-sm font-bold text-slate-500">No saved projects yet.</p>
            <p className="mt-1 text-xs text-slate-400">
              Generate your first scope to save it here.
            </p>
            <a
              href="/ai-scope-builder/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-bold text-white hover:bg-sky-800 transition"
            >
              <Plus size={14} /> Start New Scope
            </a>
          </div>
        )}

        {loaded && projects.length > 0 && (
          <div className="space-y-4">
            {projects.map((p) => {
              const title = getTitle(p);
              const address = getAddress(p);
              const outputLabel = getOutputLabel(p);
              const defectCount = getDefectCount(p);
              const version = p?.version ?? 1;

              return (
                <div
                  key={p.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm sm:flex-row sm:items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <a
                        href={`/ai-scope-builder/projects/${p.id}`}
                        className="text-base font-extrabold text-sky-950 hover:text-red-700 transition truncate"
                      >
                        {title}
                      </a>
                      {version >= 3 && (
                        <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-700">
                          V3
                        </span>
                      )}
                      {outputLabel && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                          {outputLabel}
                        </span>
                      )}
                    </div>

                    {address && title !== address && (
                      <p className="text-sm text-slate-500 mb-2 truncate">{address}</p>
                    )}

                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <Clock size={11} />
                      {new Date(p.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {defectCount > 0 && (
                        <>
                          <span>·</span>
                          <span>{defectCount} defect{defectCount !== 1 ? "s" : ""}</span>
                        </>
                      )}
                      {p?.project?.clientName && (
                        <>
                          <span>·</span>
                          <span className="truncate">{p.project.clientName}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`/ai-scope-builder/projects/${p.id}`}
                      className="rounded-xl border border-sky-950 px-4 py-2 text-xs font-bold text-sky-950 transition hover:bg-sky-950 hover:text-white"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this project?")) deleteProject(p.id);
                      }}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </ScopeShell>
  );
}
