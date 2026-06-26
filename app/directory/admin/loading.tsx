export default function Loading() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-7 w-48 rounded bg-slate-200" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="h-20 rounded-xl bg-slate-100" />
        <div className="h-20 rounded-xl bg-slate-100" />
        <div className="h-20 rounded-xl bg-slate-100" />
        <div className="h-20 rounded-xl bg-slate-100" />
      </div>
      <div className="h-80 rounded-xl bg-slate-100" />
    </div>
  );
}
