"use client";

import { createContext, useContext, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Reliable file collection for the expert-advice forms.
//
// Browsers cannot be trusted to carry <input type="file"> contents through a
// React form when the files were injected programmatically (the DataTransfer /
// input.files trick fails silently on several browsers — observed dropping all
// drag-and-drop files in production). Instead, every FileUploadZone registers
// its current File[] into this ref-backed registry, and the form reads straight
// from the registry at submit time — no dependence on the DOM input at all.
// ─────────────────────────────────────────────────────────────────────────────

type Registry = Map<string, File[]>;

interface FilesApi {
  /** Replace the file list for a given field name (empty list clears it). */
  set: (name: string, files: File[]) => void;
  /** Current registry snapshot (field name → File[]). */
  get: () => Registry;
}

const FilesContext = createContext<FilesApi | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Registry>(new Map());
  const api = useRef<FilesApi>({
    set: (name, files) => {
      if (files.length) ref.current.set(name, files);
      else ref.current.delete(name);
    },
    get: () => ref.current,
  });
  return <FilesContext.Provider value={api.current}>{children}</FilesContext.Provider>;
}

export function useFilesRegistry(): FilesApi | null {
  return useContext(FilesContext);
}
