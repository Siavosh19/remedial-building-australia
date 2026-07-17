// Instant skeleton for a company profile page while server data loads.
export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-8">
      <div className="h-40 w-full rounded-2xl bg-slate-100" />
      <div className="h-8 w-64 rounded bg-slate-200" />
      <div className="h-5 w-40 rounded bg-slate-100" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
      </div>
      <div className="h-64 rounded-2xl bg-slate-100" />
    </div>
  );
}
