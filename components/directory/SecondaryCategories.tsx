"use client";

import { useState, useRef, useEffect } from "react";

type Category = { id: number; name: string };

type Props = {
  categories: Category[];
  selectedIds: string[];
  excludeId: string;
  onChange: (ids: string[]) => void;
};

export default function SecondaryCategories({ categories, selectedIds, excludeId, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const available = categories.filter(
    (c) => String(c.id) !== excludeId && !selectedIds.includes(String(c.id))
  );

  const filtered = query.trim()
    ? available.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : available.slice(0, 10);

  const selectedCategories = categories.filter((c) => selectedIds.includes(String(c.id)));

  function add(id: string) {
    onChange([...selectedIds, id]);
    setQuery("");
  }

  function remove(id: string) {
    onChange(selectedIds.filter((s) => s !== id));
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="mt-2 space-y-3">
      {/* Selected chips */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white"
            >
              {c.name}
              <button
                type="button"
                onClick={() => remove(String(c.id))}
                className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition text-white text-[10px] leading-none"
                aria-label={`Remove ${c.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input + dropdown */}
      <div ref={containerRef} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search categories to add…"
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-sky-600 focus:outline-none"
        />
        {open && filtered.length > 0 && (
          <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); add(String(c.id)); setOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-900"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {open && query.trim() && filtered.length === 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 shadow-lg">
            No categories match &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
