"use client";

import { useState, useEffect } from "react";

type ProductBilling = {
  id: number;
  product_name: string;
  promotion_tier: string;
  promotion_status: string;
  payment_status: string;
  monthly_fee: number | null;
  stripe_subscription_id: string | null;
  stripe_current_period_start: string | null;
  stripe_current_period_end: string | null;
  stripe_cancel_at_period_end: boolean | null;
  stripe_latest_invoice_status: string | null;
  promotion_start_date: string | null;
  promotion_end_date: string | null;
};

export default function SupplierBillingPage() {
  const [products, setProducts] = useState<ProductBilling[]>([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) setMsg("Payment successful! Your promotion is now active.");
    if (params.get("cancelled")) setMsg("Checkout cancelled.");

    fetch("/api/supplier/billing")
      .then(r => r.json())
      .then(d => { setProducts(d.products ?? []); setLoading(false); });
  }, []);

  async function openPortal() {
    setPortalLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    setPortalLoading(false);
    if (!res.ok) {
      setMsg("No billing account found. Complete a subscription first.");
      return;
    }
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  const totalMrr = products.filter(p => p.payment_status === "paid" && p.promotion_status === "active").reduce((a, p) => a + (p.monthly_fee ?? 0), 0);

  if (loading) return <div className="text-slate-500 text-sm">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your subscriptions and invoices</p>
        </div>
        <button
          onClick={openPortal}
          disabled={portalLoading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition"
        >
          {portalLoading ? "Loading…" : "Manage Billing Portal →"}
        </button>
      </div>

      {msg && (
        <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${msg.includes("successful") ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
          {msg}
        </div>
      )}

      {totalMrr > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Monthly Spend</div>
            <div className="text-3xl font-black text-green-900 mt-1">${totalMrr.toFixed(0)}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active Promotions</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{products.filter(p => p.promotion_status === "active").length}</div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-700">Subscription Details</h2>
        </div>
        {!products.length ? (
          <div className="px-5 py-8 text-center text-slate-400 text-sm">No active subscriptions</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {products.map(p => (
              <div key={p.id} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{p.product_name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        p.promotion_tier === "premium" ? "bg-purple-100 text-purple-700" :
                        p.promotion_tier === "promoted" ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>{p.promotion_tier}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        p.promotion_status === "active" ? "bg-green-100 text-green-700" :
                        p.promotion_status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>{p.promotion_status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{p.monthly_fee ? `$${p.monthly_fee}/mo` : "—"}</div>
                    <div className={`text-xs mt-0.5 ${p.payment_status === "paid" ? "text-green-600" : "text-amber-600"}`}>{p.payment_status}</div>
                  </div>
                </div>
                {(p.stripe_current_period_start || p.stripe_current_period_end) && (
                  <div className="mt-2 text-xs text-slate-400">
                    Period: {p.stripe_current_period_start ? new Date(p.stripe_current_period_start).toLocaleDateString("en-AU") : "—"} → {p.stripe_current_period_end ? new Date(p.stripe_current_period_end).toLocaleDateString("en-AU") : "—"}
                    {p.stripe_cancel_at_period_end && <span className="ml-2 text-amber-600 font-semibold">· Cancels at period end</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
