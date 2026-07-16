"use client";

import { useState } from "react";

type Mode = "listing" | "account";

const COPY: Record<Mode, { button: string; title: string; blurb: string; confirm: string; endpoint: string; redirect?: string }> = {
  listing: {
    button: "Delete my listing",
    title: "Permanently delete your listing?",
    blurb:
      "This removes your business from the directory along with all its data — photos, licences, leads, quote requests and subscription. Your login is kept, so you can add a new listing later. This cannot be undone.",
    confirm: "Yes, delete my listing",
    endpoint: "/api/directory/company/delete",
  },
  account: {
    button: "Delete my account",
    title: "Permanently delete your entire account?",
    blurb:
      "This removes your account and everything tied to it — your listing and all its data, plus your login. You will be signed out and will not be able to sign back in. This cannot be undone.",
    confirm: "Yes, delete everything",
    endpoint: "/api/directory/account/delete",
    redirect: "/",
  },
};

function DeleteAction({ mode }: { mode: Mode }) {
  const c = COPY[mode];
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!password) {
      setError("Enter your password to confirm.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(c.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      if (c.redirect) {
        window.location.href = c.redirect;
      } else {
        setTimeout(() => window.location.reload(), 1200);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Done. {mode === "account" ? "Signing you out..." : "Your listing has been permanently deleted."}
      </p>
    );
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex rounded-full border border-rose-300 bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
        >
          {c.button}
        </button>
      ) : (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
          <p className="text-sm font-semibold text-rose-900">{c.title}</p>
          <p className="mt-2 text-sm text-rose-800">{c.blurb}</p>
          {error && <p className="mt-3 rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm text-rose-700">{error}</p>}
          <label className="mt-3 block text-xs font-semibold uppercase tracking-widest text-rose-700">Confirm with your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 w-full max-w-xs rounded-xl border border-rose-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-rose-500"
            placeholder="Your password"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={loading}
              className="inline-flex rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
            >
              {loading ? "Deleting..." : c.confirm}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setPassword("");
                setError("");
              }}
              disabled={loading}
              className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Danger zone: the two irreversible self-service deletions.
export default function DangerZone() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-950">Delete listing</h3>
        <p className="mt-1 mb-3 text-sm text-slate-600">
          Permanently remove your business and all of its data from the directory. Your login stays active.
        </p>
        <DeleteAction mode="listing" />
      </div>
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-base font-semibold text-slate-950">Delete account</h3>
        <p className="mt-1 mb-3 text-sm text-slate-600">
          Permanently remove your entire account — your listing, all of its data, and your login.
        </p>
        <DeleteAction mode="account" />
      </div>
    </div>
  );
}
