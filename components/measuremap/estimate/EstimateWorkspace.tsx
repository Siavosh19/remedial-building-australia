"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, FolderPlus, Plus, Trash2, MapPin, FileText, Hand, Layers } from "lucide-react";

type Category = { id: string; name: string; description: string | null; sort_order: number };
type Item = {
  id: string; category_id: string | null; name: string; description: string | null;
  unit: string; measurement_type: string | null; colour: string; row_type: string;
  manual_quantity: number; quantity_override: number | null; waste_percent: number;
  material_rate: number; labour_rate: number; equipment_rate: number; subcontract_rate: number;
  other_rate: number; lump_sum_amount: number; markup_percent: number; sort_order: number;
  measured_quantity: number; map_count: number; plan_count: number;
};

const money = (n: number) => "$" + (n || 0).toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (n: number) => (n || 0).toLocaleString("en-AU", { maximumFractionDigits: 2 });

function calc(it: Item) {
  const isLump = it.row_type === "lump_sum" || it.row_type === "provisional_sum";
  const measured = it.measured_quantity;
  const total = it.quantity_override != null ? it.quantity_override : measured + it.manual_quantity;
  const adjusted = total * (1 + (it.waste_percent || 0) / 100);
  const rateSum = it.material_rate + it.labour_rate + it.equipment_rate + it.subcontract_rate + it.other_rate;
  const base = isLump ? it.lump_sum_amount : adjusted * rateSum;
  const sell = base * (1 + (it.markup_percent || 0) / 100);
  return { isLump, measured, total, adjusted, rateSum, base, sell };
}

export default function EstimateWorkspace({
  projectId,
  initialCategories,
  initialItems,
}: {
  projectId: string;
  initialCategories: Category[];
  initialItems: Item[];
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const base = `/api/measuremap/projects/${projectId}`;

  function setField(id: string, field: keyof Item, value: number | string | null) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }
  async function persist(id: string, patch: Record<string, unknown>) {
    try { await fetch(`${base}/items/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) }); } catch { /* keep local */ }
  }

  async function addCategory() {
    const name = window.prompt("Category name (e.g. Demolition):");
    if (!name || !name.trim()) return;
    try {
      const { category } = await (await fetch(`${base}/categories`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim() }) })).json();
      if (category) setCategories((prev) => [...prev, category]);
    } catch { /* ignore */ }
  }

  async function addRow(categoryId: string | null, rowType: "manual_quantity" | "lump_sum") {
    const name = rowType === "lump_sum" ? "Lump sum" : "New item";
    try {
      const { item } = await (await fetch(`${base}/items`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, row_type: rowType, unit: rowType === "lump_sum" ? "lump" : "ea", category_id: categoryId, sort_order: items.length }),
      })).json();
      if (item) setItems((prev) => [...prev, { ...item, description: null, manual_quantity: 0, quantity_override: null, waste_percent: 0, material_rate: 0, labour_rate: 0, equipment_rate: 0, subcontract_rate: 0, other_rate: 0, lump_sum_amount: 0, markup_percent: 0, measured_quantity: 0, map_count: 0, plan_count: 0 }]);
    } catch { /* ignore */ }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this row?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try { await fetch(`${base}/items/${id}`, { method: "DELETE" }); } catch { /* ignore */ }
  }

  const groups = useMemo(() => {
    const g = categories.map((c) => ({ category: c, list: items.filter((i) => i.category_id === c.id) }));
    const free = items.filter((i) => !i.category_id);
    if (free.length) g.push({ category: { id: "__free__", name: "Uncategorised", description: null, sort_order: 999 }, list: free });
    return g;
  }, [categories, items]);

  const grand = items.reduce((a, it) => { const c = calc(it); a.base += c.base; a.sell += c.sell; return a; }, { base: 0, sell: 0 });
  const grandProfit = grand.sell - grand.base;
  const grandMargin = grand.sell ? (grandProfit / grand.sell) * 100 : 0;

  return (
    <div className="min-h-full bg-[#F5F6F7] p-4">
      {/* Summary bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-[#DDE1E4] bg-white px-5 py-3.5">
        <h1 className="text-[15px] font-bold text-[#0c2b3f]">Estimate</h1>
        <span className="rounded bg-[#EEF0F2] px-2 py-1 text-[11px] font-medium text-[#586066]">Rev 1 (Draft)</span>
        <div className="ml-auto flex flex-wrap items-center gap-5 text-[12px]">
          <Metric label="Base Cost" value={money(grand.base)} />
          <Metric label="Gross Profit" value={money(grandProfit)} accent />
          <Metric label="Gross Margin" value={`${grandMargin.toFixed(1)}%`} accent />
          <Metric label="Selling Price" value={money(grand.sell)} strong />
          <button onClick={addCategory} className="flex h-9 items-center gap-1.5 rounded-md bg-[#0369a1] px-3 text-[12px] font-semibold text-white hover:bg-[#075985]">
            <FolderPlus size={15} /> Add Category
          </button>
        </div>
      </div>

      {groups.length === 0 && (
        <div className="rounded-lg border border-dashed border-[#CCD2D6] bg-white px-6 py-14 text-center">
          <Layers className="mx-auto h-8 w-8 text-[#B4BBC0]" />
          <p className="mt-2 text-[13px] font-medium text-[#586066]">No categories yet</p>
          <p className="text-[12px] text-[#8A9196]">Add a category, or create categories &amp; items in Map Measure — they show up here automatically.</p>
        </div>
      )}

      <div className="space-y-4">
        {groups.map(({ category, list }) => {
          const sub = list.reduce((a, it) => { const c = calc(it); a.base += c.base; a.sell += c.sell; return a; }, { base: 0, sell: 0 });
          return (
            <section key={category.id} className="overflow-hidden rounded-lg border border-[#DDE1E4] bg-white">
              <header className="flex items-center gap-3 border-b border-[#E7EAEC] bg-[#F7F9FB] px-4 py-2.5">
                <h2 className="text-[13px] font-bold text-[#0c2b3f]">{category.name}</h2>
                <span className="rounded bg-[#ECEFF1] px-1.5 py-0.5 text-[10px] text-[#5D656A]">{list.length}</span>
                <div className="ml-auto flex items-center gap-4 text-[11px] text-[#586066]">
                  <span>Base <b className="text-[#2D3337]">{money(sub.base)}</b></span>
                  <span>Sell <b className="text-[#0c2b3f]">{money(sub.sell)}</b></span>
                  {category.id !== "__free__" && (
                    <button onClick={() => addRow(category.id, "manual_quantity")} className="flex h-7 items-center gap-1 rounded border border-[#CCD2D6] bg-white px-2 font-semibold text-[#30363A] hover:bg-[#F1F3F4]"><Plus size={12} /> Item</button>
                  )}
                  {category.id !== "__free__" && (
                    <button onClick={() => addRow(category.id, "lump_sum")} className="flex h-7 items-center gap-1 rounded border border-[#CCD2D6] bg-white px-2 font-semibold text-[#30363A] hover:bg-[#F1F3F4]"><Plus size={12} /> Lump</button>
                  )}
                </div>
              </header>

              {/* column headers */}
              <div className="grid grid-cols-[20px_minmax(0,1fr)_80px_92px_96px_96px_70px_100px_28px] items-center gap-2 border-b border-[#EEF0F1] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-[#8A9196]">
                <span /><span>Item</span><span>Source</span><span className="text-right">Qty</span>
                <span className="text-right">Rate</span><span className="text-right">Base Cost</span><span className="text-right">Markup</span><span className="text-right">Sell</span><span />
              </div>

              {list.length === 0 && <p className="px-4 py-4 text-[12px] text-[#8A9196]">No items. Add one, or create measurements in Map Measure under this category.</p>}

              {list.map((it) => {
                const c = calc(it);
                const isOpen = expanded[it.id];
                return (
                  <div key={it.id} className="border-b border-[#F1F3F4] last:border-b-0">
                    <div className="grid grid-cols-[20px_minmax(0,1fr)_80px_92px_96px_96px_70px_100px_28px] items-center gap-2 px-3 py-2">
                      <button onClick={() => setExpanded((e) => ({ ...e, [it.id]: !e[it.id] }))} className="text-[#8A9196] hover:text-[#30363A]">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <input value={it.name} onChange={(e) => setField(it.id, "name", e.target.value)} onBlur={(e) => persist(it.id, { name: e.target.value })}
                        className="min-w-0 rounded border border-transparent px-1 py-0.5 text-[12px] font-medium text-[#2D3337] outline-none hover:border-[#E2E5E7] focus:border-[#0369a1]" />
                      <SourceBadge it={it} />
                      <span className="text-right text-[12px] text-[#2D3337]">{c.isLump ? "—" : `${num(c.total)} ${it.unit === "m2" ? "m²" : it.unit}`}</span>
                      <span className="text-right text-[12px] text-[#586066]">{c.isLump ? "—" : money(c.rateSum)}</span>
                      <span className="text-right text-[12px] font-semibold text-[#2D3337]">{money(c.base)}</span>
                      <span className="flex items-center justify-end gap-0.5">
                        <input type="number" value={it.markup_percent} onChange={(e) => setField(it.id, "markup_percent", Number(e.target.value) || 0)} onBlur={(e) => persist(it.id, { markup_percent: Number(e.target.value) || 0 })}
                          className="h-7 w-[44px] rounded border border-[#D3D9DD] px-1 text-right text-[11px] outline-none focus:border-[#0369a1]" />
                        <span className="text-[10px] text-[#8A9196]">%</span>
                      </span>
                      <span className="text-right text-[12px] font-bold text-[#0c2b3f]">{money(c.sell)}</span>
                      <button onClick={() => deleteItem(it.id)} className="grid h-6 w-6 place-items-center rounded text-[#8A9196] hover:bg-[#FEF2F2] hover:text-[#dc2626]"><Trash2 size={13} /></button>
                    </div>

                    {isOpen && (
                      <div className="border-t border-[#F1F3F4] bg-[#FAFBFC] px-3 py-3">
                        {c.isLump ? (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <Field label="Lump sum ($)"><NumInput v={it.lump_sum_amount} on={(x) => { setField(it.id, "lump_sum_amount", x); persist(it.id, { lump_sum_amount: x }); }} /></Field>
                          </div>
                        ) : (
                          <>
                            <div className="mb-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                              <Field label="Manual qty"><NumInput v={it.manual_quantity} on={(x) => { setField(it.id, "manual_quantity", x); persist(it.id, { manual_quantity: x }); }} /></Field>
                              <Field label="Measured qty"><div className="flex h-8 items-center rounded border border-[#E2E5E7] bg-[#F1F3F4] px-2 text-[11px] text-[#586066]">{num(it.measured_quantity)}</div></Field>
                              <Field label="Waste %"><NumInput v={it.waste_percent} on={(x) => { setField(it.id, "waste_percent", x); persist(it.id, { waste_percent: x }); }} /></Field>
                              <Field label="Override qty"><NumInput v={it.quantity_override ?? ("" as unknown as number)} placeholder="auto" on={(x) => { const val = Number.isFinite(x) ? x : null; setField(it.id, "quantity_override", val); persist(it.id, { quantity_override: val }); }} /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                              <Field label="Material $/u"><NumInput v={it.material_rate} on={(x) => { setField(it.id, "material_rate", x); persist(it.id, { material_rate: x }); }} /></Field>
                              <Field label="Labour $/u"><NumInput v={it.labour_rate} on={(x) => { setField(it.id, "labour_rate", x); persist(it.id, { labour_rate: x }); }} /></Field>
                              <Field label="Equipment $/u"><NumInput v={it.equipment_rate} on={(x) => { setField(it.id, "equipment_rate", x); persist(it.id, { equipment_rate: x }); }} /></Field>
                              <Field label="Subcontract $/u"><NumInput v={it.subcontract_rate} on={(x) => { setField(it.id, "subcontract_rate", x); persist(it.id, { subcontract_rate: x }); }} /></Field>
                              <Field label="Other $/u"><NumInput v={it.other_rate} on={(x) => { setField(it.id, "other_rate", x); persist(it.id, { other_rate: x }); }} /></Field>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-[#8A9196]">Quantities flow live from Map Measure &amp; Plans. Rates, waste and markup are saved as you type. This is v1 — revisions, reports and per-category subtotal rows are coming.</p>
    </div>
  );
}

function Metric({ label, value, accent, strong }: { label: string; value: string; accent?: boolean; strong?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[11px] text-[#8A9196]">{label}</span>
      <b className={[strong ? "text-[15px]" : "text-[13px]", accent ? "text-[#0f7a4d]" : "text-[#0c2b3f]"].join(" ")}>{value}</b>
    </span>
  );
}

function SourceBadge({ it }: { it: Item }) {
  const parts: string[] = [];
  if (it.map_count) parts.push("Map");
  if (it.plan_count) parts.push("Plan");
  if (it.manual_quantity) parts.push("Manual");
  if (it.row_type === "lump_sum" || it.row_type === "provisional_sum") return <Badge label="Lump" Icon={Layers} />;
  if (parts.length > 1) return <Badge label="Mixed" Icon={Layers} />;
  if (parts[0] === "Map") return <Badge label="Map" Icon={MapPin} />;
  if (parts[0] === "Plan") return <Badge label="Plan" Icon={FileText} />;
  if (parts[0] === "Manual") return <Badge label="Manual" Icon={Hand} />;
  return <span className="text-[10px] text-[#B4BBC0]">—</span>;
}

function Badge({ label, Icon }: { label: string; Icon: typeof MapPin }) {
  return <span className="inline-flex items-center gap-1 rounded bg-[#EAF3FA] px-1.5 py-0.5 text-[9px] font-semibold text-[#0369a1]"><Icon size={9} /> {label}</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-medium text-[#666D72]">{label}</span>
      {children}
    </label>
  );
}

function NumInput({ v, on, placeholder }: { v: number; on: (x: number) => void; placeholder?: string }) {
  return (
    <input type="number" defaultValue={Number.isFinite(v) ? v : undefined} placeholder={placeholder}
      onBlur={(e) => on(e.target.value === "" ? NaN : Number(e.target.value))}
      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
      className="h-8 w-full rounded border border-[#D3D9DD] px-2 text-[11px] outline-none focus:border-[#0369a1]" />
  );
}
