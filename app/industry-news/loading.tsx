// Instant skeleton for the news & insights list while server data loads.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-6 py-8">
      <div className="h-8 w-72 rounded bg-slate-200" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-40 rounded-2xl bg-slate-100" />
            <div className="h-5 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
