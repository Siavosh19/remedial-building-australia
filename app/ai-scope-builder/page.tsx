"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  FolderOpen,
  Wrench,
  Package,
  FileText,
  Clock,
  Plus,
} from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { OUTPUT_TYPE_LABELS } from "@/lib/scope-builder-data";

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Project Details",
    description:
      "Enter building address, type, occupancy, levels, access constraints and coastal exposure.",
  },
  {
    number: "02",
    title: "Identify Defects",
    description:
      "Add one or more defects — select category, type, location, severity and estimated extent.",
  },
  {
    number: "03",
    title: "Select Repair Systems",
    description:
      "Choose the repair systems applicable to each defect. Recommended systems are highlighted.",
  },
  {
    number: "04",
    title: "Specify Materials",
    description:
      "Optionally select products from the materials library. The AI will not invent products beyond those you select.",
  },
  {
    number: "05",
    title: "Choose Clauses",
    description:
      "Select standard scope clauses — preliminaries, QA, flood testing, exclusions, assumptions and more.",
  },
  {
    number: "06",
    title: "Generate & Export",
    description:
      "Choose your output format: consultant scope, builder pricing, strata summary, methodology or tender scope.",
  },
];

const QUICK_LINKS = [
  {
    href: "/ai-scope-builder/new",
    icon: Plus,
    label: "New Scope",
    description: "Start a new scope of works",
    primary: true,
  },
  {
    href: "/ai-scope-builder/projects",
    icon: FolderOpen,
    label: "Saved Projects",
    description: "View and re-open past scopes",
  },
  {
    href: "/ai-scope-builder/repair-systems",
    icon: Wrench,
    label: "Repair Systems",
    description: "Browse all repair system options",
  },
  {
    href: "/ai-scope-builder/materials",
    icon: Package,
    label: "Materials Library",
    description: "Search products and TDS links",
  },
];

// Works for V1, V2, and V3 saved project shapes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProjectTitle(p: any): string {
  return p?.project?.name || p?.project?.address
    || p?.projectData?.buildingName || p?.projectData?.address
    || "Unnamed Project";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProjectAddress(p: any): string {
  return p?.project?.address || p?.projectData?.address || "";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getOutputLabel(p: any): string {
  return OUTPUT_TYPE_LABELS[p?.outputType] ?? p?.outputFormat ?? p?.outputType ?? "";
}

export default function ScopeBuilderLandingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("scope_projects") ?? "[]");
      setRecentProjects(Array.isArray(saved) ? saved.slice(0, 3) : []);
    } catch {
      setRecentProjects([]);
    }
  }, []);

  return (
    <ScopeShell activePath="/ai-scope-builder" bgClass="bg-white">
      <main>

        {/* Hero */}
        <section className="border-b border-slate-100 bg-sky-950 px-8 py-16 text-white">
          <div className="mx-auto max-w-4xl">
            <div className="text-sm font-extrabold uppercase tracking-[0.3em] text-sky-400">
              AI Scope Builder
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              Generate a professional
              <br />
              remedial scope of works.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-200">
              Select your defects, repair systems, materials and standard clauses. Our AI assembles a structured, technically-grounded scope — not a generic chatbot response.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/ai-scope-builder/new"
                className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-red-800"
              >
                Start New Scope <ArrowRight size={16} />
              </a>
              {recentProjects.length > 0 && (
                <a
                  href="/ai-scope-builder/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-700 px-7 py-3.5 text-sm font-bold text-sky-200 transition hover:bg-sky-900"
                >
                  <FolderOpen size={16} /> View Saved Projects
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="border-b border-slate-100 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`flex flex-col gap-2 rounded-2xl border p-5 transition ${
                      link.primary
                        ? "border-sky-950 bg-sky-950 text-white hover:bg-sky-800"
                        : "border-slate-200 bg-white text-sky-950 hover:border-sky-200 hover:shadow-sm"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={link.primary ? "text-sky-300" : "text-red-700"}
                    />
                    <div className="text-sm font-extrabold">{link.label}</div>
                    <div
                      className={`text-xs ${
                        link.primary ? "text-sky-300" : "text-slate-500"
                      }`}
                    >
                      {link.description}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent projects */}
        {recentProjects.length > 0 && (
          <section className="border-b border-slate-100 px-8 py-10">
            <div className="mx-auto max-w-4xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-sky-950">
                  Recent Projects
                </h2>
                <a
                  href="/ai-scope-builder/projects"
                  className="text-xs font-bold text-sky-700 hover:text-red-700 transition"
                >
                  View all →
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {recentProjects.map((p) => (
                  <a
                    key={p.id}
                    href={`/ai-scope-builder/projects/${p.id}`}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-sky-200 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-2">
                      <FileText size={14} className="mt-0.5 shrink-0 text-red-700" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-sky-950">
                          {getProjectTitle(p)}
                        </div>
                        <div className="truncate text-xs text-slate-400">
                          {getProjectAddress(p)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock size={10} />
                      {new Date(p.createdAt).toLocaleDateString("en-AU")}
                      {getOutputLabel(p) && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold">
                          {getOutputLabel(p)}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-4xl">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
              How It Works
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-sky-950 md:text-3xl">
              Structured. Not a chatbot.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              The AI Scope Builder assembles your scope from structured selections — defects, repair systems, materials and standard clauses. The AI does not freely invent product claims, warranties, or compliance statements.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORKFLOW_STEPS.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-950 text-sm font-extrabold text-white">
                    {s.number}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-sky-950">
                      {s.title}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="/ai-scope-builder/new"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-sky-800"
              >
                Start New Scope <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-slate-100 bg-slate-50 px-8 py-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs leading-6 text-slate-400">
              <strong className="text-slate-500">Disclaimer:</strong> Scopes generated by this tool are AI-assisted and must be reviewed by a qualified remedial building consultant before use. They do not constitute engineering advice, warranty obligations, or compliance certification. Product information is based on placeholder data and should be verified against current manufacturer data sheets.
            </p>
          </div>
        </section>

      </main>
    </ScopeShell>
  );
}
