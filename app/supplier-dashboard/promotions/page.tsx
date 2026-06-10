"use client";

import { useState, useEffect } from "react";

type Product = {
  id: number;
  product_name: string;
  product_category: string | null;
  promotion_tier: string;
  promotion_status: string;
  payment_status: string;
  monthly_fee: number | null;
};

const TIERS = [
  {
    id: "promoted",
    name: "Promoted",
    price: "Contact us",
    features: ["Featured badge on product card", "Higher placement in category listings", "Analytics dashboard access"],
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium",
    price: "Contact us",
    features: ["All Promoted features", "Top placement in search results", "Dedicated product spotlight", "Priority support"],
    color: "purple",
  },
];

export default function SupplierPromotionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/supplier/products")
      .then(r => r.json())
      .then(d => { setProducts(d.products ?? []); setLoading(false); });
  }, []);

  async function startCheckout(productId: number, tier: string) {
    setUpgrading(productId);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, tier }),
    });
    setUpgrading(null);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMsg(err.error ?? "Error starting checkout. Please try again.");
      return;
    }
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  if (loading) return <div className="text-slate-500 text-sm">Loading…</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Promotions</h1>
        <p className="text-sm text-slate-500 mt-1">Upgrade your products for greater visibility</p>
      </div>

      {msg && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{msg}</div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-8">
        {TIERS.map(tier => (
          <div key={tier.id} className={`rounded-xl border p-6 ${tier.color === "purple" ? "border-purple-200 bg-purple-50" : "border-blue-200 bg-blue-50"}`}>
            <div className={`text-lg font-bold mb-1 ${tier.color === "purple" ? "text-purple-900" : "text-blue-900"}`}>{tier.name}</div>
            <div className={`text-sm mb-4 ${tier.color === "purple" ? "text-purple-600" : "text-blue-600"}`}>{tier.price}</div>
            <ul className="space-y-1.5 mb-4">
              {tier.features.map(f => (
                <li key={f} className={`text-sm flex items-start gap-2 ${tier.color === "purple" ? "text-purple-800" : "text-blue-800"}`}>
                  <span className="mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-700 mb-4">Upgrade a Product</h2>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <div className="font-medium text-slate-900">{p.product_name}</div>
                  <div className="text-xs text-slate-500">{p.product_category ?? "—"} · Current: {p.promotion_tier}</div>
                </div>
                <div className="flex gap-2">
                  {p.promotion_tier !== "promoted" && p.promotion_tier !== "premium" && (
                    <button
                      onClick={() => startCheckout(p.id, "promoted")}
                      disabled={upgrading === p.id}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition"
                    >
                      Promote →
                    </button>
                  )}
                  {p.promotion_tier !== "premium" && (
                    <button
                      onClick={() => startCheckout(p.id, "premium")}
                      disabled={upgrading === p.id}
                      className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50 transition"
                    >
                      Premium →
                    </button>
                  )}
                  {p.promotion_tier === "premium" && (
                    <span className="text-xs text-purple-600 font-semibold">Max tier</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
