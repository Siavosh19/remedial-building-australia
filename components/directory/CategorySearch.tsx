"use client";

import { useState, useRef, useEffect } from "react";

export default function CategorySearch({
  categories,
  value,
  onChange,
}: {
  categories: { id: number; name: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  const selected = categories.find((c) => String(c.id) === value);
  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Keep query in sync if value changes externally (e.g. on mount)
  useEffect(() => {
    if (value && selected) setQuery(selected.name);
  }, [value, selected]);

  const filtered = query.trim()
    ? categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : categories;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (!value) setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [value]);

  function select(cat: { id: number; name: string }) {
    onChange(String(cat.id));
    setQuery(cat.name);
    setOpen(false);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onChange("");
    setOpen(true);
  }

  function handleFocus() {
    setOpen(true);
    if (value) setQuery("");
  }

  return (
    <div ref={ref} className="relative mt-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={handleFocus}
          placeholder="Search your occupation or trade…"
          autoComplete="off"
          className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 ${
            value ? "border-sky-500 focus:border-sky-600" : "border-slate-300 focus:border-sky-600"
          }`}
        />
        {value ? (
          <button
            type="button"
            onClick={() => { onChange(""); setQuery(""); setOpen(true); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            ✕
          </button>
        ) : (
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>

      {value && !open && (
        <p className="mt-1 text-xs font-semibold text-sky-600">✓ {selected?.name}</p>
      )}

      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          {filtered.slice(0, 50).map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onMouseDown={() => select(cat)}
                className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-800"
              >
                {cat.name}
              </button>
            </li>
          ))}
          {filtered.length > 50 && (
            <li className="px-4 py-2 text-xs text-slate-400">Keep typing to narrow results…</li>
          )}
        </ul>
      )}

      {open && filtered.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 shadow-xl">
          No categories match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
