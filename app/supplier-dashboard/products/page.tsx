"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  id: number;
  product_name: string;
  product_category: string | null;
  promotion_tier: string;
  promotion_status: string;
  payment_status: string;
  status: string;
  monthly_fee: number | null;
  tds_url: string | null;
  promotion_start_date: string | null;
  promotion_end_date: string | null;
};

export default function SupplierProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/supplier/products")
      .then(r => r.json())
      .then(d => { setProducts(d.products ?? []); setLoading(false); });
  }, []);

  if (loading) return <div className="text-slate-500 text-sm">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Products</h1>
          <p className="text-sm text-slate-500 mt-1">{products.length} products listed</p>
        </div>
        <Link href="/supplier-dashboard/update-requests" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          Request Changes
        </Link>
      </div>

      {!products.length ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-500">No products listed yet.</p>
          <p className="text-sm text-slate-400 mt-1">Contact us to get your products added to the platform.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Tier</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Payment</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Fee/mo</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">TDS</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Expires</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{p.product_name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{p.product_category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.promotion_tier === "premium" ? "bg-purple-100 text-purple-700" :
                      p.promotion_tier === "promoted" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>{p.promotion_tier}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.promotion_status === "active" ? "bg-green-100 text-green-700" :
                      p.promotion_status === "pending" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>{p.promotion_status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${p.payment_status === "paid" ? "text-green-600" : "text-amber-600"}`}>
                      {p.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.monthly_fee ? `$${p.monthly_fee}` : "—"}</td>
                  <td className="px-4 py-3 text-xs">
                    {p.tds_url ? (
                      <a href={p.tds_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">TDS</a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {p.promotion_end_date ? new Date(p.promotion_end_date).toLocaleDateString("en-AU") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
