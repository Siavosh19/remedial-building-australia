"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { archiveProjectAction, deleteProjectAction } from "@/app/measuremap/(workspace)/actions";

// Per-card overflow menu: archive/unarchive + delete (with confirm). Uses the
// server actions directly via <form action>; the delete confirm is client-side.
export default function ProjectRowActions({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const archived = status === "archived";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Project actions"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          <form action={archiveProjectAction}>
            <input type="hidden" name="project_id" value={projectId} />
            <input type="hidden" name="next_status" value={archived ? "active" : "archived"} />
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              {archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
              {archived ? "Unarchive" : "Archive"}
            </button>
          </form>

          <form
            action={deleteProjectAction}
            onSubmit={(e) => {
              if (!confirm("Delete this project? Its drawings, takeoff items and measurements will be removed.")) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="project_id" value={projectId} />
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
