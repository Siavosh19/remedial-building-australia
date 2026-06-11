"use client";

export default function TrackableContactButtons({
  slug,
  phone,
  website,
}: {
  slug: string;
  phone: string | null;
  website: string | null;
}) {
  function track(type: "phone" | "website") {
    fetch("/api/directory/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, type }),
    }).catch(() => {});
  }

  if (!phone && !website) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Get in Touch</p>
      <div className="mt-4 flex flex-col gap-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            onClick={() => track("phone")}
            className="flex items-center justify-center gap-2 rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            <span>☎</span> {phone}
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("website")}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <span>↗</span> Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
