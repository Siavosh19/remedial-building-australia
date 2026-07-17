// Instant skeleton for the directory search/browse page while server data loads.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-6 py-8">
      <div className="h-8 w-72 rounded bg-slate-200" />
      <div className="h-12 w-full rounded-xl bg-slate-100" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
