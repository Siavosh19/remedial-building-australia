// Instant skeleton for a category/state directory listing while server data loads.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-6 py-8">
      <div className="h-8 w-80 rounded bg-slate-200" />
      <div className="h-5 w-48 rounded bg-slate-100" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
