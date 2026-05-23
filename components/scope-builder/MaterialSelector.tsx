"use client";

import { useState } from "react";
import { Search, ExternalLink, CheckSquare, Square } from "lucide-react";
import type { Material } from "@/lib/scope-builder-types";

interface Props {
  materials: Material[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function MaterialSelector({ materials, selected, onToggle }: Props) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(materials.map((m) => m.category))).sort(),
  ];

  const filtered = materials.filter((m) => {
    if (
      filterCategory !== "All" &&
      m.category !== filterCategory
    )
      return false;
    if (
      filterLocation !== "All" &&
      m.location !== filterLocation &&
      m.location !== "Both"
    )
      return false;
    const q = search.toLowerCase();
    if (
      q &&
      !`${m.brand} ${m.productName} ${m.category} ${m.suitableSystem}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });

  const sel = selected.length;

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand or product…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-sky-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
        >
          <option>All</option>
          <option>Internal</option>
          <option>External</option>
          <option>Both</option>
        </select>
        {sel > 0 && (
          <span className="text-xs font-bold text-sky-700">
            {sel} product{sel > 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {[
                "",
                "Brand",
                "Product",
                "Category",
                "Suitable System",
                "Substrate",
                "Location",
                "UV",
                "Key Limitation",
                "TDS",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-8 text-center text-sm text-slate-400"
                >
                  No products match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((m) => {
                const isSelected = selected.includes(m.id);
                return (
                  <tr
                    key={m.id}
                    onClick={() => onToggle(m.id)}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? "bg-sky-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="w-10 px-4 py-3">
                      {isSelected ? (
                        <CheckSquare
                          size={16}
                          className="text-sky-950"
                        />
                      ) : (
                        <Square size={16} className="text-slate-300" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-sky-950 whitespace-nowrap">
                      {m.brand}
                    </td>
                    <td className="px-4 py-3 font-bold text-sky-950 whitespace-nowrap">
                      {m.productName}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {m.category}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap max-w-40 truncate">
                      {m.suitableSystem}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {m.compatibleSubstrate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.location === "External"
                            ? "bg-sky-100 text-sky-700"
                            : m.location === "Internal"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {m.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.uvExposed
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {m.uvExposed ? "UV Exposed" : "Sheltered"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 max-w-48">
                      <span className="line-clamp-2">{m.limitations}</span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={m.tdsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-red-700"
                      >
                        TDS <ExternalLink size={10} />
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Application notes for selected products */}
      {selected.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Selected Product Notes
          </p>
          {selected.map((id) => {
            const m = materials.find((x) => x.id === id);
            if (!m) return null;
            return (
              <div
                key={id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="text-xs font-bold text-sky-950">
                  {m.brand} — {m.productName}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {m.applicationNotes}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
