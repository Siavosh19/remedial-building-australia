export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-5 px-6 py-8">
      <div className="h-7 w-56 rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
      </div>
      <div className="h-72 rounded-2xl bg-slate-100" />
    </div>
  );
}
