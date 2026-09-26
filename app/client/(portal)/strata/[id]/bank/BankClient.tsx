"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, EyeOff, Upload } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";

export type BankLine = {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: "pending" | "matched" | "ignored";
  matchedBy: string | null;
  lotId: number | null;
  expenseId: number | null;
  suggestion: string | null;
  note: string | null;
};

export type ImportSummary = { id: number; filename: string | null; when: string; rows: number; auto: number };

export default function BankClient({
  schemeId,
  imports,
  lines,
  lots,
  unpaidInvoices,
  canManage,
}: {
  schemeId: number;
  imports: ImportSummary[];
  lines: BankLine[];
  lots: { id: number; lot_number: string; owner_name: string | null }[];
  unpaidInvoices: { id: number; supplier: string; amount: number }[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [csv, setCsv] = useState("");
  const [filename, setFilename] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [choice, setChoice] = useState<Record<number, string>>({});

  const pending = lines.filter((l) => l.status === "pending");
  const placed = lines.filter((l) => l.status !== "pending");

  async function importCsv(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);

    const res = await fetch(`/api/client/strata/${schemeId}/bank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv, filename }),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not read that statement.");
      return;
    }
    setCsv("");
    setFilename("");
    setResult(
      `${json.rows} transactions read. ${json.auto} receipted automatically by payment reference${
        json.skipped ? `, ${json.skipped} rows skipped as headers or summaries` : ""
      }.`,
    );
    router.refresh();
  }

  async function act(line: BankLine, action: string, extra: Record<string, unknown> = {}) {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/client/strata/${schemeId}/bank/lines/${line.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...extra }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "That did not work.");
      return;
    }
    router.refresh();
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    setCsv(await file.text());
  }

  return (
    <div className="space-y-5">
      {canManage && (
        <form onSubmit={importCsv} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Import a statement</h2>
          <p className="mt-1 text-sm text-slate-500">
            Export a CSV from your bank and drop it in. A transaction quoting a lot&apos;s payment reference is
            receipted on the spot; anything else is left for you to place.
          </p>

          <div className="mt-4 space-y-3">
            <input type="file" accept=".csv,text/csv,text/plain" onChange={onFile} className="block text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700" />
            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              rows={5}
              placeholder="…or paste the rows here"
              className={`${FIELD} font-mono text-xs`}
            />
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          {result && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{result}</p>}

          <button
            type="submit"
            disabled={busy || !csv.trim()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            <Upload size={15} /> {busy ? "Reading…" : "Import"}
          </button>
        </form>
      )}

      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Waiting to be placed ({pending.length})
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            These could not be matched with certainty. Nothing is recorded until you say so.
          </p>
          <ul className="mt-3 space-y-2">
            {pending.map((line) => (
              <li key={line.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {line.description}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {line.date} ·{" "}
                      <span className={line.amount > 0 ? "font-semibold text-emerald-700" : "font-semibold text-slate-700"}>
                        {money(line.amount)}
                      </span>
                    </p>
                    {line.suggestion && (
                      <p className="mt-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-900">
                        {line.suggestion}
                      </p>
                    )}
                  </div>
                </div>

                {canManage && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {line.amount > 0 ? (
                      <>
                        <select
                          value={choice[line.id] ?? (line.lotId ? String(line.lotId) : "")}
                          onChange={(e) => setChoice((c) => ({ ...c, [line.id]: e.target.value }))}
                          className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                        >
                          <option value="">Which lot?</option>
                          {lots.map((l) => (
                            <option key={l.id} value={l.id}>
                              Lot {l.lot_number}
                              {l.owner_name ? ` — ${l.owner_name}` : ""}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => act(line, "receipt", { lot_id: Number(choice[line.id] ?? line.lotId) })}
                          disabled={busy || !(choice[line.id] || line.lotId)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800 disabled:opacity-40"
                        >
                          <CheckCircle2 size={13} /> Receipt it
                        </button>
                      </>
                    ) : (
                      <>
                        <select
                          value={choice[line.id] ?? (line.expenseId ? String(line.expenseId) : "")}
                          onChange={(e) => setChoice((c) => ({ ...c, [line.id]: e.target.value }))}
                          className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                        >
                          <option value="">Which invoice?</option>
                          {unpaidInvoices.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.supplier} — {money(i.amount)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            act(line, "settle_invoice", { expense_id: Number(choice[line.id] ?? line.expenseId) })
                          }
                          disabled={busy || !(choice[line.id] || line.expenseId)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800 disabled:opacity-40"
                        >
                          <CheckCircle2 size={13} /> Mark it paid
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => act(line, "ignore")}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      <EyeOff size={13} /> Set aside
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {placed.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Placed</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">What happened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placed.map((line) => (
                  <tr key={line.id} className={line.status === "ignored" ? "text-slate-400" : "hover:bg-slate-50/60"}>
                    <td className="px-4 py-2.5 text-slate-600">{line.date}</td>
                    <td className="px-4 py-2.5 text-slate-700">{line.description}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-800">{money(line.amount)}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">
                      {line.note ?? (line.status === "ignored" ? "Set aside" : "Placed")}
                      {line.matchedBy === "reference" && (
                        <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                          by reference
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {imports.length > 0 && (
        <p className="text-xs text-slate-400">
          {imports.length} import{imports.length === 1 ? "" : "s"} · most recent{" "}
          {imports[0].filename ? `${imports[0].filename}, ` : ""}
          {imports[0].when} · {imports[0].rows} rows, {imports[0].auto} receipted automatically
        </p>
      )}

      {lines.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">Nothing imported yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Most Australian bank exports work as they come — date, description, amount, with or without headers.
          </p>
        </div>
      )}
    </div>
  );
}
