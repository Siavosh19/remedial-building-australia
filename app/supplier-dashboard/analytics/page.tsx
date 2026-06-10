"use client";

import { useState, useEffect } from "react";

type ProductStat = {
  product_id: number;
  product_name: string;
  impressions: number;
  clicks: number;
  tds_clicks: number;
  website_clicks: number;
};

type Totals = {
  impressions: number;
  clicks: number;
  tds_clicks: number;
  website_clicks: number;
};

export default function SupplierAnalyticsPage() {
  const [summary, setSummary] = useState<ProductStat[]>([]);
  const [totals, setTotals] = useState<Totals>({ impressions: 0, clicks: 0, tds_clicks: 0, website_clicks: 0 });
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/supplier/analytics?days=${days}`)
      .then(r => r.json())
      .then(d => {
        setSummary(d.summary ?? []);
        setTotals(d.totals ?? {});
        setLoading(false);
      });
  }, [days]);

  const statCards = [
    { label: "Impressions", value: totals.impressions, desc: "Times products appeared on screen" },
    { label: "Product Clicks", value: totals.clicks, desc: "Clicks on product cards" },
    { label: "TDS Downloads", value: totals.tds_clicks, desc: "Technical data sheet opens" },
    { label: "Website Visits", value: totals.website_clicks, desc: "Clicks through to your site" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Performance data for your products</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${days === d ? "bg-slate-900 text-white" : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"}`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-500 text-sm">Loading…</div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statCards.map(c => (
              <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</div>
                <div className="text-3xl font-black text-slate-900 mt-1">{c.value.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">{c.desc}</div>
              </div>
            ))}
          </div>

          {summary.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-700">By Product — last {days} days</h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">Impressions</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">Clicks</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">TDS</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">Website</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map(p => (
                    <tr key={p.product_id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{p.product_name}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{p.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{p.clicks.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{p.tds_clicks.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{p.website_clicks.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-slate-700">
                          {p.impressions > 0 ? `${((p.clicks / p.impressions) * 100).toFixed(1)}%` : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!summary.length && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-400 text-sm">No analytics data yet for this period.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
