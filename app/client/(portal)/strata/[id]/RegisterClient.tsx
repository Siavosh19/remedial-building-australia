"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { FieldSpec, RegisterKind } from "@/lib/strata/registers";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type RegisterRow = { id: number } & Record<string, string | number | boolean | null>;
export type RefOptions = Record<string, { value: number; label: string }[]>;

function showDate(value: unknown) {
  if (!value) return "—";
  return new Date(String(value)).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

function showMoney(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  return Number(value).toLocaleString("en-AU", { style: "currency", currency: "AUD" });
}

/**
 * One table and one form for every scheme register. The shape comes entirely
 * from the field spec, so adding a column to a register is a one-line change in
 * lib/strata/registers.ts rather than a new page.
 */
export default function RegisterClient({
  schemeId,
  kind,
  singular,
  plural,
  blurb,
  fields,
  rows,
  refOptions,
  canManage,
  compact,
}: {
  schemeId: number;
  kind: RegisterKind;
  singular: string;
  plural: string;
  blurb: string;
  fields: FieldSpec[];
  rows: RegisterRow[];
  refOptions: RefOptions;
  canManage: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<RegisterRow | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;
  const columns = fields.filter((f) => f.table);

  function valueOf(row: RegisterRow, field: FieldSpec) {
    const raw = row[field.name];
    switch (field.type) {
      case "date":
        return showDate(raw);
      case "money":
        return showMoney(raw);
      case "boolean":
        return raw ? "Yes" : "—";
      case "ref": {
        const options = refOptions[field.name] ?? [];
        const match = options.find((o) => o.value === Number(raw));
        return match?.label ?? "—";
      }
      default:
        return raw === null || raw === "" ? "—" : String(raw);
    }
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    // Unticked checkboxes never reach FormData — send them explicitly so
    // clearing one actually clears it.
    for (const field of fields) {
      if (field.type === "boolean") payload[field.name] = form.get(field.name) === "on";
    }

    const isNew = editing === "new";
    const res = await fetch(
      isNew
        ? `/api/client/strata/${schemeId}/registers/${kind}`
        : `/api/client/strata/${schemeId}/registers/${kind}/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save.");
      return;
    }
    setEditing(null);
    router.refresh();
  }

  async function remove(row: RegisterRow) {
    if (!confirm(`Delete this ${singular}? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/registers/${kind}/${row.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  function input(field: FieldSpec) {
    const defaultValue = current ? (current[field.name] ?? "") : "";

    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          name={field.name}
          rows={3}
          required={field.required}
          defaultValue={String(defaultValue)}
          className={`${FIELD} mt-1.5`}
        />
      );
    }
    if (field.type === "boolean") {
      return (
        <label className="mt-1.5 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name={field.name}
            defaultChecked={Boolean(current?.[field.name])}
            className="h-4 w-4 rounded border-slate-300"
          />
          Yes
        </label>
      );
    }
    if (field.type === "select") {
      return (
        <select id={field.name} name={field.name} defaultValue={String(defaultValue)} className={`${FIELD} mt-1.5`}>
          <option value="">—</option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    }
    if (field.type === "ref") {
      return (
        <select id={field.name} name={field.name} defaultValue={String(defaultValue)} className={`${FIELD} mt-1.5`}>
          <option value="">—</option>
          {(refOptions[field.name] ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }

    const type = field.type === "date" ? "date" : field.type === "number" || field.type === "money" ? "number" : "text";
    return (
      <input
        id={field.name}
        name={field.name}
        type={type}
        step={field.type === "money" ? "0.01" : undefined}
        required={field.required}
        defaultValue={String(defaultValue)}
        className={`${FIELD} mt-1.5`}
      />
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className={compact ? "text-base font-bold text-slate-900" : "text-lg font-extrabold text-slate-900"}>
            {plural}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">{blurb}</p>
        </div>
        {canManage && (
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={14} /> Add
          </button>
        )}
      </div>

      {error && !editing && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              {editing === "new" ? `Add a ${singular}` : `Edit ${singular}`}
            </h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : undefined}>
                <label className={LABEL} htmlFor={field.name}>
                  {field.label}
                </label>
                {input(field)}
                {field.hint && <p className="mt-1 text-xs text-slate-400">{field.hint}</p>}
              </div>
            ))}
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-400">
          Nothing recorded yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                {columns.map((c) => (
                  <th key={c.name} className="px-4 py-3">
                    {c.label}
                  </th>
                ))}
                {canManage && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60">
                  {columns.map((c, i) => (
                    <td
                      key={c.name}
                      className={`px-4 py-3 ${i === 0 ? "font-semibold text-slate-900" : "text-slate-600"} ${
                        c.type === "money" ? "text-right tabular-nums" : ""
                      }`}
                    >
                      {valueOf(row, c)}
                    </td>
                  ))}
                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(row);
                            setError(null);
                          }}
                          title="Edit"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => remove(row)}
                          title="Delete"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
