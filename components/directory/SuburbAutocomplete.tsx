"use client";

import { useEffect, useRef, useState } from "react";

type Suggestion = { suburb: string; postcode: string; state: string; label: string };

// Suburb typeahead backed by real AU location data. Picking a suggestion fills
// suburb + postcode + state together, guaranteeing a genuine, consistent address.
export default function SuburbAutocomplete({
  value,
  verified,
  onSelect,
  onType,
}: {
  value: string;
  verified: boolean;
  onSelect: (s: { suburb: string; postcode: string; state: string }) => void;
  onType: (suburb: string) => void;
}) {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handle(val: string) {
    onType(val);
    if (debounce.current) clearTimeout(debounce.current);
    if (val.trim().length < 2) { setItems([]); setOpen(false); return; }
    setLoading(true);
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/directory/location-verify?q=${encodeURIComponent(val.trim())}`);
        const data = await res.json();
        setItems(data.suggestions ?? []);
        setOpen(true);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 250);
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handle(e.target.value)}
          onFocus={() => { if (items.length) setOpen(true); }}
          placeholder="Start typing your suburb…"
          autoComplete="off"
          className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 pr-10 text-sm focus:outline-none ${
            verified ? "border-emerald-400 focus:border-emerald-500" : "border-slate-300 focus:border-sky-600"
          }`}
          required
        />
        {value && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">
            {loading ? "⏳" : verified ? "✅" : ""}
          </span>
        )}
      </div>
      {verified && !open && (
        <p className="mt-1.5 text-xs font-medium text-emerald-600">Verified Australian suburb ✓</p>
      )}

      {open && items.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          {items.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onMouseDown={() => { onSelect(s); setOpen(false); }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-800"
              >
                <span className="font-medium">{s.suburb}</span>
                <span className="text-xs text-slate-400">{s.state} {s.postcode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
