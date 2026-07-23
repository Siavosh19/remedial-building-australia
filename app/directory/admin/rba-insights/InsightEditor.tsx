"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CATEGORIES = [
  "Waterproofing",
  "Concrete Repair",
  "Façade & Render",
  "Strata Buildings",
  "Class 2 Compliance",
  "Tendering & Scopes",
  "Repair Systems",
  "Maintenance",
  "Compliance",
  "Other",
];

type Article = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  featured_image_url: string;
  featured_image_alt_text: string;
  body_content: string;
  author: string;
  published_date: string;
  status: "draft" | "published" | "archived";
  seo_title: string;
  seo_description: string;
  related_defect_pages: string[];
  related_repair_systems: string[];
  is_featured: boolean;
};

const EMPTY: Article = {
  title: "",
  slug: "",
  category: "Waterproofing",
  summary: "",
  featured_image_url: "",
  featured_image_alt_text: "",
  body_content: "",
  author: "Remedial Building Australia",
  published_date: "",
  status: "draft",
  seo_title: "",
  seo_description: "",
  related_defect_pages: [""],
  related_repair_systems: [""],
  is_featured: false,
};

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function calcReadingTime(body: string): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

export function InsightEditor({ initial }: { initial?: Partial<Article> }) {
  const [savedId, setSavedId] = useState<number | null>(initial?.id ?? null);
  const isEdit = savedId !== null;
  const startedPublished = initial?.status === "published";
  const [form, setForm] = useState<Article>({ ...EMPTY, ...initial });
  const [social, setSocial] = useState({ facebook: true, instagram: true, linkedin: true });
  const [postedOnce, setPostedOnce] = useState(false);
  const [socialResults, setSocialResults] = useState<
    Array<{ platform: string; ok: boolean; skipped?: boolean; url?: string; error?: string }> | null
  >(null);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [imagePreview, setImagePreview] = useState<"sidebar" | "listing" | "hero">("sidebar");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugTouched]);

  useEffect(() => {
    if (tab === "preview" && form.body_content) {
      fetch("/api/rba-insights-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: form.body_content }),
      })
        .then((r) => r.json())
        .then((d) => setPreviewHtml(d.html ?? ""))
        .catch(() => setPreviewHtml("<p>Preview unavailable</p>"));
    }
  }, [tab, form.body_content]);

  function set<K extends keyof Article>(key: K, value: Article[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setLinkArray(key: "related_defect_pages" | "related_repair_systems", idx: number, val: string) {
    setForm((f) => {
      const arr = [...f[key]];
      arr[idx] = val;
      return { ...f, [key]: arr };
    });
  }

  function addLink(key: "related_defect_pages" | "related_repair_systems") {
    setForm((f) => ({ ...f, [key]: [...f[key], ""] }));
  }

  function removeLink(key: "related_defect_pages" | "related_repair_systems", idx: number) {
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/directory/admin/rba-insights/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { setUploadError(data.error ?? "Upload failed."); return; }
    setForm((f) => ({ ...f, featured_image_url: data.url }));
  }

  async function handleSave(targetStatus?: Article["status"]) {
    setSaving(true);
    setStatus(null);
    const payload = {
      ...form,
      status: targetStatus ?? form.status,
      related_defect_pages: form.related_defect_pages.filter(Boolean),
      related_repair_systems: form.related_repair_systems.filter(Boolean),
      published_date: (targetStatus === "published" && !form.published_date)
        ? new Date().toISOString()
        : form.published_date || null,
    };

    const wasCreate = !isEdit;
    const url = isEdit ? `/api/directory/admin/rba-insights/${savedId}` : "/api/directory/admin/rba-insights";
    const method = isEdit ? "PATCH" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();

    if (!res.ok) {
      setSaving(false);
      setStatus({ type: "error", message: data.error ?? "Save failed." });
      return;
    }

    const finalStatus = targetStatus ?? form.status;
    const articleId: number | undefined = wasCreate ? data.article?.id : savedId ?? undefined;
    if (wasCreate && articleId) setSavedId(articleId); // become edit mode so re-saves don't duplicate
    if (targetStatus) setForm((f) => ({ ...f, status: targetStatus }));

    // Auto-post to social on the transition INTO published (once per session), for the
    // ticked platforms only. Editing an already-published article does NOT repost — use
    // the "Share to social" button at the top for a deliberate re-share.
    const wantPlatforms = (["facebook", "instagram", "linkedin"] as const).filter((pl) => social[pl]);
    const shouldAutoPost =
      finalStatus === "published" && !startedPublished && !postedOnce && wantPlatforms.length > 0 && !!articleId;

    if (shouldAutoPost) {
      setPostedOnce(true);
      setStatus({ type: "success", message: "Published — posting to social…" });
      try {
        const sres = await fetch(`/api/directory/admin/rba-insights/${articleId}/share`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platforms: wantPlatforms }),
        });
        const sdata = await sres.json();
        if (sres.ok) {
          setSocialResults(sdata.results ?? []);
          setStatus({ type: "success", message: "Article published and shared to social." });
        } else {
          setStatus({ type: "error", message: sdata.error ?? "Article saved, but social posting failed." });
        }
      } catch {
        setStatus({ type: "error", message: "Article saved, but social posting failed (network)." });
      }
      setSaving(false);
      return;
    }

    setSaving(false);
    if (wasCreate && articleId) {
      window.location.href = `/directory/admin/rba-insights/${articleId}`;
      return;
    }
    setStatus({ type: "success", message: finalStatus === "published" ? "Article published." : "Saved." });
  }

  const readingTime = form.body_content ? calcReadingTime(form.body_content) : null;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-800">
          Title <span className="text-red-500">*</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            placeholder="Article title"
          />
        </label>
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-semibold text-slate-800">
          Slug <span className="text-red-500">*</span>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-")); }}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none font-mono"
            placeholder="auto-generated-from-title"
          />
          <p className="mt-1 text-xs text-slate-400">Public URL: /rba-insights/{form.slug || "your-slug-here"}</p>
        </label>
      </div>

      {/* Category + Status + Featured */}
      <div className="grid gap-6 md:grid-cols-3">
        <label className="block text-sm font-semibold text-slate-800">
          Category <span className="text-red-500">*</span>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          Status
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as Article["status"])}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          Published Date
          <input
            type="date"
            value={form.published_date ? form.published_date.slice(0, 10) : ""}
            onChange={(e) => set("published_date", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      {/* Summary */}
      <label className="block text-sm font-semibold text-slate-800">
        Summary <span className="text-red-500">*</span>
        <textarea
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          placeholder="Short summary shown on card and listing page (2–3 sentences)"
        />
      </label>

      {/* Featured image */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-800">
          Featured Image <span className="text-red-500">*</span>
        </p>

        <div className="flex items-start gap-4">
          {form.featured_image_url ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200">
              <Image src={form.featured_image_url} alt="Preview" fill className="object-cover" sizes="96px" />
            </div>
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-xs text-slate-400">
              No image
            </div>
          )}
          <div className="space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {uploading ? "Uploading…" : form.featured_image_url ? "Replace image" : "Upload image"}
            </button>
            {form.featured_image_url && (
              <button
                type="button"
                onClick={() => set("featured_image_url", "")}
                className="ml-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              >
                Remove
              </button>
            )}
            {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
            <p className="text-xs text-slate-400">JPG, PNG or WebP · max 10 MB</p>
          </div>
        </div>

        {/* Image preview tabs */}
        {form.featured_image_url && (
          <div>
            <div className="flex gap-2 mb-3">
              {(["sidebar", "listing", "hero"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setImagePreview(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${imagePreview === p ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {p === "sidebar" ? "Sidebar card" : p === "listing" ? "Listing card" : "Article hero"}
                </button>
              ))}
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              {imagePreview === "sidebar" && (
                <div style={{ width: 280 }} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="relative aspect-video w-full bg-slate-100">
                    <Image src={form.featured_image_url} alt="" fill className="object-cover" sizes="280px" />
                  </div>
                  <div className="p-3">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700">Remedial Insights</span>
                    <p className="mt-1.5 text-xs font-bold text-sky-950 line-clamp-2">{form.title || "Article title"}</p>
                  </div>
                </div>
              )}
              {imagePreview === "listing" && (
                <div style={{ maxWidth: 340 }} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image src={form.featured_image_url} alt="" fill className="object-cover" sizes="340px" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-bold text-sky-950 line-clamp-2">{form.title || "Article title"}</p>
                    {form.summary && <p className="mt-2 text-xs text-slate-500 line-clamp-2">{form.summary}</p>}
                  </div>
                </div>
              )}
              {imagePreview === "hero" && (
                <div className="relative aspect-[3/1] w-full bg-slate-100">
                  <Image src={form.featured_image_url} alt="" fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alt text */}
        <label className="block text-sm font-semibold text-slate-800">
          Featured Image Alt Text <span className="text-red-500">*</span>
          <input
            type="text"
            value={form.featured_image_alt_text}
            onChange={(e) => set("featured_image_alt_text", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            placeholder="Describe the image for accessibility and SEO"
          />
        </label>
      </div>

      {/* Body content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-800">
            Article Body <span className="text-red-500">*</span>
            {readingTime && <span className="ml-2 text-xs font-normal text-slate-400">~{readingTime} min read</span>}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTab("write")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tab === "write" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Write</button>
            <button type="button" onClick={() => setTab("preview")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${tab === "preview" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Preview</button>
          </div>
        </div>

        {/* Toolbar */}
        {tab === "write" && (
          <div className="mb-1 flex flex-wrap gap-1 rounded-t-xl border border-b-0 border-slate-300 bg-slate-50 px-3 py-2">
            {[
              { label: "H2", wrap: "\n## ", end: "\n" },
              { label: "H3", wrap: "\n### ", end: "\n" },
              { label: "Bold", wrap: "**", end: "**" },
              { label: "Link", wrap: "[", end: "](https://)" },
              { label: "• List", wrap: "\n- ", end: "" },
              { label: "1. List", wrap: "\n1. ", end: "" },
            ].map(({ label, wrap, end }) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const ta = document.getElementById("body-editor") as HTMLTextAreaElement;
                  if (!ta) return;
                  const s = ta.selectionStart;
                  const e2 = ta.selectionEnd;
                  const selected = form.body_content.slice(s, e2);
                  const newVal = form.body_content.slice(0, s) + wrap + selected + end + form.body_content.slice(e2);
                  set("body_content", newVal);
                  setTimeout(() => { ta.focus(); ta.selectionStart = s + wrap.length; ta.selectionEnd = s + wrap.length + selected.length; }, 0);
                }}
                className="rounded px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {tab === "write" ? (
          <textarea
            id="body-editor"
            value={form.body_content}
            onChange={(e) => set("body_content", e.target.value)}
            rows={20}
            className="w-full rounded-b-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm focus:border-sky-600 focus:outline-none"
            placeholder={"# Heading 1\n\n## Heading 2\n\nWrite your article here in Markdown...\n\n- Bullet point\n- Another point\n\n**Bold text** and [links](https://example.com)"}
          />
        ) : (
          <div
            className="prose-content min-h-[400px] w-full rounded-xl border border-slate-300 bg-white px-6 py-5"
            dangerouslySetInnerHTML={{ __html: previewHtml || "<p class='text-slate-400 italic'>Nothing to preview yet.</p>" }}
          />
        )}
        <p className="mt-1 text-xs text-slate-400">Supports Markdown: ## Heading, **bold**, - list, [link](url)</p>
      </div>

      {/* Author */}
      <label className="block text-sm font-semibold text-slate-800">
        Author
        <input
          type="text"
          value={form.author}
          onChange={(e) => set("author", e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      {/* Featured checkbox */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={form.is_featured}
          onChange={(e) => set("is_featured", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-sky-950"
        />
        <span className="text-sm font-semibold text-slate-800">Featured article (shown first on listing page)</span>
      </label>

      {/* SEO */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-800">SEO</p>
        <label className="block text-sm font-semibold text-slate-700">
          SEO Title
          <input
            type="text"
            value={form.seo_title}
            onChange={(e) => set("seo_title", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            placeholder="Defaults to article title if blank"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          SEO Description
          <textarea
            value={form.seo_description}
            onChange={(e) => set("seo_description", e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            placeholder="Defaults to summary if blank (max ~155 characters)"
          />
          <span className="text-xs text-slate-400">{form.seo_description.length}/155</span>
        </label>
      </div>

      {/* Related pages */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-800">Related Defect Pages</p>
        {form.related_defect_pages.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={link}
              onChange={(e) => setLinkArray("related_defect_pages", i, e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-sky-600 focus:outline-none font-mono"
              placeholder="/defect-library/..."
            />
            <button type="button" onClick={() => removeLink("related_defect_pages", i)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 hover:bg-slate-100">×</button>
          </div>
        ))}
        <button type="button" onClick={() => addLink("related_defect_pages")} className="text-sm font-semibold text-sky-700 hover:text-sky-900">+ Add defect page</button>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-800">Related Repair Systems</p>
        {form.related_repair_systems.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={link}
              onChange={(e) => setLinkArray("related_repair_systems", i, e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-sky-600 focus:outline-none font-mono"
              placeholder="/repair-systems/..."
            />
            <button type="button" onClick={() => removeLink("related_repair_systems", i)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 hover:bg-slate-100">×</button>
          </div>
        ))}
        <button type="button" onClick={() => addLink("related_repair_systems")} className="text-sm font-semibold text-sky-700 hover:text-sky-900">+ Add repair system</button>
      </div>

      {/* Status message */}
      {status && (
        <div className={`rounded-xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {status.message}
        </div>
      )}

      {/* Share to social */}
      <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/60 p-5">
        <p className="text-sm font-semibold text-slate-800">Share to social when published</p>
        <p className="text-xs text-slate-500">
          Ticked platforms are posted automatically when you click Publish. Nothing is posted for drafts, and
          re-saving an already-published article won&rsquo;t repost (use the Share to social button up top for that).
        </p>
        <div className="flex flex-wrap gap-5">
          {(
            [
              ["facebook", "Facebook"],
              ["instagram", "Instagram"],
              ["linkedin", "LinkedIn"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={social[key]}
                onChange={(e) => setSocial((sx) => ({ ...sx, [key]: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 accent-sky-950"
              />
              <span className="text-sm font-semibold text-slate-700">{label}</span>
            </label>
          ))}
        </div>
        {socialResults && (
          <div className="mt-1 rounded-lg border border-slate-200 bg-white p-3 text-sm">
            {socialResults.map((r) => (
              <div key={r.platform} className="flex items-center justify-between gap-3 py-0.5">
                <span className="font-semibold capitalize text-slate-700">{r.platform}</span>
                {r.ok ? (
                  <span className="text-emerald-600">
                    Posted
                    {r.url ? (
                      <>
                        {" · "}
                        <a className="underline" href={r.url} target="_blank" rel="noreferrer">
                          view
                        </a>
                      </>
                    ) : null}
                  </span>
                ) : r.skipped ? (
                  <span className="text-slate-400" title={r.error}>
                    Not connected
                  </span>
                ) : (
                  <span className="text-rose-600" title={r.error}>
                    Failed
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("draft")}
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("published")}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {saving ? "Publishing…" : form.status === "published" ? "Save & keep published" : "Publish"}
        </button>
        {form.status === "published" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("archived")}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-60"
          >
            Archive
          </button>
        )}
        {form.status !== "draft" && (
          <a
            href={`/rba-insights/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline"
          >
            View article →
          </a>
        )}
      </div>
    </div>
  );
}
