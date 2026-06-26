"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFilesRegistry } from "./FilesContext";

interface Props {
  name: string;
  label: string;
  accept?: string;
  hint?: string;
  multiple?: boolean;
  maxFiles?: number;
  required?: boolean;
}

function fmtBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1_048_576) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1_048_576).toFixed(1)} MB`;
}

export default function FileUploadZone({
  name,
  label,
  accept,
  hint,
  multiple = true,
  maxFiles = 10,
  required = false,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<File[]>([]);
  const registry = useFilesRegistry();

  function sync(next: File[]) {
    filesRef.current = next;
    setFiles(next);
    // Source of truth for submission: the shared registry (reliable across
    // browsers). The DOM input is used only to open the file picker.
    registry?.set(name, next);
  }

  // Keep the registry in step with this zone's field name, and clear the entry
  // when the zone unmounts or its name changes (e.g. a defect is removed/
  // re-indexed) so orphaned files are never submitted.
  useEffect(() => {
    registry?.set(name, filesRef.current);
    return () => registry?.set(name, []);
  }, [name, registry]);

  function addFiles(incoming: FileList | File[]) {
    const arr = Array.from(incoming);
    const merged = multiple
      ? [...filesRef.current, ...arr].slice(0, maxFiles)
      : arr.slice(0, 1);
    sync(merged);
  }

  function removeFile(i: number) {
    sync(filesRef.current.filter((_, idx) => idx !== i));
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  // addFiles uses filesRef so no stale closure risk
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? (
          <span className="ml-1 text-red-600">*</span>
        ) : (
          <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>
        )}
      </label>

      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer select-none rounded-xl border-2 border-dashed px-5 py-6 text-center transition ${
          dragging
            ? "border-sky-400 bg-sky-50"
            : "border-slate-300 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            // Reset so same file can be re-selected
            e.target.value = "";
          }}
        />
        <svg
          className="mx-auto mb-2 h-7 w-7 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm font-semibold text-slate-600">
          {dragging ? "Drop files here" : "Drag & drop or click to browse"}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Your file picker supports Google Drive, iCloud &amp; Dropbox
          {multiple && maxFiles > 1 && ` · up to ${maxFiles} files`}
        </p>
      </div>

      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}

      {/* Selected file list */}
      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <span className="shrink-0 text-green-500">✓</span>
              <span className="min-w-0 flex-1 truncate text-slate-700">{f.name}</span>
              <span className="shrink-0 text-xs text-slate-400">{fmtBytes(f.size)}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="shrink-0 text-slate-400 transition hover:text-red-600"
                aria-label="Remove file"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {files.length >= maxFiles && maxFiles > 1 && (
        <p className="mt-1 text-xs text-amber-600">Maximum {maxFiles} files selected.</p>
      )}
    </div>
  );
}
