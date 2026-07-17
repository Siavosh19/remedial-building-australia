// Instant skeleton for the industry jobs board while server data loads.
export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-8">
      <div className="h-8 w-64 rounded bg-slate-200" />
      <div className="h-11 w-full rounded-xl bg-slate-100" />
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
