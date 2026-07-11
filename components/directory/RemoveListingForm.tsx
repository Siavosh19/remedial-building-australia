"use client";

import { useState } from "react";

// Two-step confirm before unpublishing the business's public listing.
export default function RemoveListingForm() {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function remove() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/directory/company/remove", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not remove the listing.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your listing has been removed from the public directory. Contact support if you&apos;d like to re-publish it.
      </p>
    );
  }

  return (
    <div>
      {error && <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="inline-flex rounded-full border border-rose-300 bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
        >
          Remove my listing
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={remove}
            disabled={loading}
            className="inline-flex rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
          >
            {loading ? "Removing…" : "Yes, remove it"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={loading}
            className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
