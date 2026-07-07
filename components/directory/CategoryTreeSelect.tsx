"use client";

import { useEffect, useRef, useState } from "react";

export type TreeCat = { id: number; name: string; slug: string; parent_id?: number | null };

// Shared 3-level category browse (group → label → variant) with a search box.
// Used by the directory search AND the quote-request form so they are identical.
//  - allowAll   : show an "All Categories" clear option (directory).
//  - requireLeaf: a parent group is not itself selectable — the user must pick a
//                 leaf subcategory (quote request needs one specific category).
export default function CategoryTreeSelect({
  categories,
  selectedId,
  onSelect,
  allowAll = false,
  requireLeaf = false,
  placeholder = "All Categories",
  buttonClassName,
  panelClassName = "w-72",
}: {
  categories: TreeCat[];
  selectedId: number | null;
  onSelect: (cat: TreeCat | null) => void;
  allowAll?: boolean;
  requireLeaf?: boolean;
  placeholder?: string;
  buttonClassName?: string;
  panelClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const parents = categories
    .filter((c) => !c.parent_id && categories.some((k) => k.parent_id === c.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const childrenOf = (pid: number) =>
    categories.filter((c) => c.parent_id === pid).sort((a, b) => a.name.localeCompare(b.name));

  const term = search.toLowerCase().trim();
  const filteredParents = term
    ? parents.filter((p) => p.name.toLowerCase().includes(term) || childrenOf(p.id).some((k) => k.name.toLowerCase().includes(term)))
    : parents;

  const selected = selectedId != null ? categories.find((c) => c.id === selectedId) : null;
  const selectedLabel = selected ? selected.name.split("/")[0].trim() : placeholder;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function pick(cat: TreeCat | null) {
    onSelect(cat);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          buttonClassName ??
          `flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
            selected ? "border-sky-600 bg-sky-50 text-sky-800" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
          }`
        }
      >
        <svg className="shrink-0 text-slate-400" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <rect x={3} y={3} width={7} height={7} rx={1.5} />
          <rect x={14} y={3} width={7} height={7} rx={1.5} />
          <rect x={3} y={14} width={7} height={7} rx={1.5} />
          <rect x={14} y={14} width={7} height={7} rx={1.5} />
        </svg>
        <span className="max-w-[220px] truncate">{selectedLabel}</span>
        <svg className={`ml-auto shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`} width={12} height={12} viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 8L1 3h10z" />
        </svg>
      </button>

      {open && (
        <div className={`absolute left-0 top-full z-50 mt-1.5 ${panelClassName} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl`}>
          <div className="border-b border-slate-100 px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
              <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="shrink-0 text-slate-400">
                <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories…"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                autoFocus
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} className="shrink-0 text-slate-400 hover:text-slate-600">×</button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {allowAll && (
              <button
                type="button"
                onClick={() => pick(null)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold transition hover:bg-slate-50 ${!selected ? "text-sky-700" : "text-slate-700"}`}
              >
                <span>All Categories</span>
              </button>
            )}

            {filteredParents.length === 0 && (
              <p className="px-4 py-3 text-sm text-slate-400">No categories found</p>
            )}

            {filteredParents.map((parent) => {
              const kids = childrenOf(parent.id);
              const matchKids = term ? kids.filter((k) => k.name.toLowerCase().includes(term)) : kids;
              const groups = new Map<string, TreeCat[]>();
              for (const k of matchKids) {
                const label = k.name.split("/")[0].trim();
                if (!label) continue;
                if (!groups.has(label)) groups.set(label, []);
                groups.get(label)!.push(k);
              }
              const groupList = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
              const isOpen = expanded === parent.id || (!!term && groupList.length > 0);
              return (
                <div key={parent.id} className="border-b border-slate-50 last:border-0">
                  <button
                    type="button"
                    onClick={() => { if (kids.length) setExpanded((e) => (e === parent.id ? null : parent.id)); else pick(parent); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold transition hover:bg-slate-50 ${selected?.id === parent.id ? "text-sky-700" : "text-slate-900"}`}
                  >
                    <span className="truncate">{parent.name}</span>
                    <span className="ml-2 flex shrink-0 items-center gap-2">
                      {kids.length > 0 && (
                        <svg className={`transition-transform ${isOpen ? "rotate-180" : ""}`} width={11} height={11} viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z" /></svg>
                      )}
                    </span>
                  </button>
                  {isOpen && kids.length > 0 && (
                    <div className="bg-slate-50/60 pb-1">
                      {!requireLeaf && (
                        <button
                          type="button"
                          onClick={() => pick(parent)}
                          className="block w-full px-4 py-1.5 pl-7 text-left text-xs font-semibold text-sky-700 transition hover:bg-white"
                        >
                          View all in {parent.name} →
                        </button>
                      )}
                      {groupList.map(([label, kids2]) => {
                        if (kids2.length === 1) {
                          const kid = kids2[0];
                          return (
                            <button
                              key={kid.id}
                              type="button"
                              onClick={() => pick(kid)}
                              className={`block w-full truncate px-4 py-1.5 pl-7 text-left text-[13px] transition hover:bg-white ${selected?.id === kid.id ? "font-semibold text-sky-700" : "text-slate-600"}`}
                            >
                              {label}
                            </button>
                          );
                        }
                        const subKey = `${parent.id}:${label}`;
                        const subOpen = subExpanded === subKey || !!term;
                        return (
                          <div key={label}>
                            <button
                              type="button"
                              onClick={() => setSubExpanded((e) => (e === subKey ? null : subKey))}
                              className="flex w-full items-center justify-between px-4 py-1.5 pl-7 text-left text-[13px] font-semibold text-slate-700 transition hover:bg-white"
                            >
                              <span className="truncate">{label}</span>
                              <svg className={`ml-2 shrink-0 transition-transform ${subOpen ? "rotate-180" : ""}`} width={10} height={10} viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z" /></svg>
                            </button>
                            {subOpen && (
                              <div className="bg-white/70">
                                {kids2.map((kid) => {
                                  const suffix = kid.name.split("/").slice(1).join(" / ").trim() || kid.name;
                                  return (
                                    <button
                                      key={kid.id}
                                      type="button"
                                      onClick={() => pick(kid)}
                                      className={`block w-full truncate px-4 py-1.5 pl-11 text-left text-xs transition hover:bg-slate-50 ${selected?.id === kid.id ? "font-semibold text-sky-700" : "text-slate-500"}`}
                                    >
                                      {suffix}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
