"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const CATEGORIES = [
  { label: "PU flexible injection resins", slug: "injection-resins-pu-flexible", count: 4 },
  { label: "Epoxy rigid injection resins", slug: "injection-resins-epoxy-rigid", count: 4 },
  { label: "Crack injection ports", slug: "crack-injection-ports", count: 4 },
  { label: "Structural anchors & dowels", slug: "structural-anchors-dowels", count: 4 },
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified", count: 4 },
  { label: "Lime repointing mortars", slug: "lime-repointing-mortars", count: 4 },
  { label: "Polyurethane sealants", slug: "sealants-polyurethane", count: 4 },
  { label: "Backer rods", slug: "backer-rods", count: 3 },
];

const BASE = "/repair-systems/settlement-cracks";

export default function CategoryFilter() {
  const [search, setSearch] = useState("");

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search product categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((cat) => (
          <a
            key={cat.slug}
            href={`${BASE}/${cat.slug}`}
            className="flex items-center justify-between p-4 border border-stone-200 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-colors"
          >
            <span className="text-sm font-medium text-stone-800">{cat.label}</span>
            <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-2 py-0.5">
              {cat.count} products
            </span>
          </a>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-stone-400 text-sm text-center py-8">No categories match your search.</p>
      )}
    </div>
  );
}
