import type { Metadata } from "next";

// Offline fallback — shown by the service worker when a page navigation is
// attempted with no network. Kept fully self-contained (no data fetching) so it
// prerenders statically and can be cached at install time.
export const metadata: Metadata = {
  title: "Offline — Remedial Building Australia",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-800">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-950 text-2xl font-extrabold text-white">
          RBA
        </div>
        <h1 className="text-2xl font-extrabold text-sky-950">You&rsquo;re offline</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This page needs an internet connection. Check your signal or Wi‑Fi and try again —
          pages you&rsquo;ve already opened will still work.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Retry
        </a>
      </div>
    </div>
  );
}
