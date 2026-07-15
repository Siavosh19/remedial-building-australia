// Instant skeleton shown while a client-portal page's data streams in, so
// navigation paints immediately instead of pausing on a blank screen.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-5 px-4 py-6 sm:px-6 sm:py-8">
      <div className="h-7 w-56 rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-24 rounded-2xl bg-slate-100" />
      </div>
      <div className="space-y-3">
        <div className="h-20 rounded-2xl bg-slate-100" />
        <div className="h-20 rounded-2xl bg-slate-100" />
        <div className="h-20 rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}
