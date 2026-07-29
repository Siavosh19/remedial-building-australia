"use client";

import { useMemo } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, FileText, Table, Printer, ImageDown } from "lucide-react";

type Category = { id: string; name: string };
type Item = {
  id: string; category_id: string | null; name: string; description: string | null;
  unit: string; measurement_type: string | null; row_type: string;
  manual_quantity: number; quantity_override: number | null; waste_percent: number;
  material_rate: number; labour_rate: number; equipment_rate: number; subcontract_rate: number;
  other_rate: number; lump_sum_amount: number; markup_percent: number;
  measured_quantity: number; map_count: number; plan_count: number;
};

const money = (n: number) => n.toLocaleString(undefined, { style: "currency", currency: "AUD", maximumFractionDigits: 2 });
const r2 = (n: number) => Math.round(n * 100) / 100;

function calc(it: Item) {
  const isLump = it.row_type === "lump_sum" || it.row_type === "provisional_sum";
  const total = it.quantity_override != null ? it.quantity_override : it.measured_quantity + it.manual_quantity;
  const adjusted = total * (1 + (it.waste_percent || 0) / 100);
  const rateSum = it.material_rate + it.labour_rate + it.equipment_rate + it.subcontract_rate + it.other_rate;
  const base = isLump ? it.lump_sum_amount : adjusted * rateSum;
  const sell = base * (1 + (it.markup_percent || 0) / 100);
  return { isLump, total, adjusted, rateSum, base, sell };
}

export default function ExportWorkspace({ projectName, reference, categories, items }: { projectName: string; reference: string; categories: Category[]; items: Item[] }) {
  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "Uncategorised";
  const safe = (projectName || "estimate").replace(/[^\w.\-]+/g, "_").slice(0, 80);

  const { rows, summaryRows, grand } = useMemo(() => {
    const rows = items.map((it) => {
      const c = calc(it);
      return {
        Category: catName(it.category_id),
        Item: it.name,
        Description: it.description ?? "",
        Type: it.measurement_type ?? it.row_type,
        Unit: it.unit,
        "Measured Qty": r2(it.measured_quantity),
        "Manual Qty": it.manual_quantity,
        "Override Qty": it.quantity_override ?? "",
        "Final Qty": r2(c.total),
        "Waste %": it.waste_percent,
        "Adjusted Qty": r2(c.adjusted),
        "Material $/u": it.material_rate,
        "Labour $/u": it.labour_rate,
        "Equipment $/u": it.equipment_rate,
        "Subcontract $/u": it.subcontract_rate,
        "Other $/u": it.other_rate,
        "Rate $/u": r2(c.rateSum),
        "Base Cost": r2(c.base),
        "Markup %": it.markup_percent,
        "Sell Price": r2(c.sell),
        Profit: r2(c.sell - c.base),
      };
    });
    const byCat = new Map<string, { base: number; sell: number }>();
    let gb = 0, gs = 0;
    for (const it of items) {
      const c = calc(it); const key = catName(it.category_id);
      const cur = byCat.get(key) ?? { base: 0, sell: 0 };
      cur.base += c.base; cur.sell += c.sell; byCat.set(key, cur);
      gb += c.base; gs += c.sell;
    }
    const summaryRows = Array.from(byCat.entries()).map(([Category, v]) => ({ Category, "Base Cost": r2(v.base), "Sell Price": r2(v.sell), Profit: r2(v.sell - v.base) }));
    summaryRows.push({ Category: "TOTAL", "Base Cost": r2(gb), "Sell Price": r2(gs), Profit: r2(gs - gb) });
    return { rows, summaryRows, grand: { base: gb, sell: gs } };
  }, [items, categories]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasData = items.length > 0;

  function saveBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadCSV() {
    const ws = XLSX.utils.json_to_sheet(rows);
    saveBlob(new Blob([XLSX.utils.sheet_to_csv(ws)], { type: "text/csv;charset=utf-8;" }), `${safe}-estimate.csv`);
  }
  function downloadXLSX() {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "Estimate");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), "Summary");
    XLSX.writeFile(wb, `${safe}-estimate.xlsx`);
  }
  function printEstimate() { window.print(); }

  return (
    <div className="h-full overflow-y-auto bg-[#eef1f3] p-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-4">
          <h1 className="text-[20px] font-bold text-[#0c2b3f]">Export</h1>
          <p className="text-[13px] text-[#586066]">{projectName}{reference ? ` · ${reference}` : ""}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Estimate / quantities */}
          <div className="rounded-xl border border-[#D7DCE0] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2"><FileSpreadsheet size={18} className="text-[#0369a1]" /><h2 className="text-[15px] font-bold text-[#30363A]">Estimate &amp; quantities</h2></div>
            <p className="mt-1 text-[12px] text-[#586066]">Quantities, rates and totals for every item — grouped by category, plus a summary sheet.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={downloadXLSX} disabled={!hasData} className="flex h-10 items-center gap-2 rounded-lg bg-[#0369a1] px-4 text-[13px] font-bold text-white hover:bg-[#075985] disabled:opacity-50"><FileSpreadsheet size={16} /> Excel (.xlsx)</button>
              <button onClick={downloadCSV} disabled={!hasData} className="flex h-10 items-center gap-2 rounded-lg border border-[#CCD2D6] bg-white px-4 text-[13px] font-semibold text-[#30363A] hover:bg-[#F1F3F4] disabled:opacity-50"><Table size={16} /> CSV</button>
              <button onClick={printEstimate} disabled={!hasData} className="flex h-10 items-center gap-2 rounded-lg border border-[#CCD2D6] bg-white px-4 text-[13px] font-semibold text-[#30363A] hover:bg-[#F1F3F4] disabled:opacity-50"><FileText size={16} /> Print / PDF</button>
            </div>
            {!hasData && <p className="mt-3 text-[12px] text-[#b45309]">No estimate items yet — add items or takeoffs first.</p>}
          </div>

          {/* Marked-up plans */}
          <div className="rounded-xl border border-[#D7DCE0] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2"><ImageDown size={18} className="text-[#0369a1]" /><h2 className="text-[15px] font-bold text-[#30363A]">Marked-up plans</h2></div>
            <p className="mt-1 text-[12px] text-[#586066]">Export a plan page with your takeoffs drawn on it.</p>
            <ol className="mt-3 space-y-1.5 text-[12px] text-[#40474C]">
              <li>1. Open <b>Plans &amp; Takeoffs</b> and select the page.</li>
              <li>2. Set the view how you want it printed.</li>
              <li>3. Use the toolbar <b>Output</b> group: <span className="inline-flex items-center gap-1 rounded bg-[#EEF1F3] px-1.5 py-0.5"><ImageDown size={12} /> Image</span> (PNG) or <span className="inline-flex items-center gap-1 rounded bg-[#EEF1F3] px-1.5 py-0.5"><Printer size={12} /> Print</span> (save as PDF).</li>
            </ol>
          </div>
        </div>

        {/* Grand total + preview */}
        {hasData && (
          <div className="mt-5 rounded-xl border border-[#D7DCE0] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2E5E7] px-5 py-3">
              <h2 className="text-[14px] font-bold text-[#30363A]">Preview</h2>
              <div className="flex gap-5 text-[13px]"><span className="text-[#586066]">Base <b className="text-[#2D3337]">{money(grand.base)}</b></span><span className="text-[#586066]">Sell <b className="text-[#0c2b3f]">{money(grand.sell)}</b></span></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-[12px]">
                <thead><tr className="border-b border-[#E2E5E7] text-left text-[11px] uppercase tracking-wide text-[#6C7378]">
                  <th className="px-4 py-2">Category</th><th className="px-4 py-2">Item</th><th className="px-4 py-2">Unit</th><th className="px-4 py-2 text-right">Final Qty</th><th className="px-4 py-2 text-right">Rate $/u</th><th className="px-4 py-2 text-right">Base</th><th className="px-4 py-2 text-right">Sell</th>
                </tr></thead>
                <tbody>
                  {items.map((it) => { const c = calc(it); return (
                    <tr key={it.id} className="border-b border-[#F1F3F4]">
                      <td className="px-4 py-1.5 text-[#586066]">{catName(it.category_id)}</td>
                      <td className="px-4 py-1.5 text-[#30363A]">{it.name}</td>
                      <td className="px-4 py-1.5 text-[#586066]">{it.unit}</td>
                      <td className="px-4 py-1.5 text-right tabular-nums">{r2(c.total)}</td>
                      <td className="px-4 py-1.5 text-right tabular-nums">{c.isLump ? "—" : money(c.rateSum)}</td>
                      <td className="px-4 py-1.5 text-right tabular-nums font-semibold text-[#2D3337]">{money(c.base)}</td>
                      <td className="px-4 py-1.5 text-right tabular-nums font-bold text-[#0c2b3f]">{money(c.sell)}</td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
