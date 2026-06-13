"use client";

import { useRef, useState } from "react";
import FileUploadZone from "./FileUploadZone";

export const DISCLAIMER_VERSION = "v1.0-2026-06-13";

export const DISCLAIMER_TEXT =
  "This service is a preliminary desktop review only. It is based solely on the photos, documents, descriptions, and information provided by the customer. Remedial Building Australia does not carry out a site inspection, destructive investigation, testing, engineering assessment, certification, regulated design, waterproofing design, legal review, building inspection, or building approval as part of this service.\n\nAny comments provided are general guidance only and are intended to help identify likely issues, risk areas, and possible next steps. They are not a final diagnosis, professional certification, construction instruction, tender approval, defect report, compliance certificate, engineering advice, legal advice, or a substitute for advice from a suitably qualified and insured consultant, engineer, builder, certifier, lawyer, waterproofing consultant, or design practitioner.\n\nBuilding defects can involve hidden conditions that may not be visible in photos, documents, or written descriptions. Remedial Building Australia is not responsible for hidden defects, future damage, repair costs, project delays, safety risks, contractor performance, design outcomes, repair outcomes, or decisions made by the customer or others based on this preliminary desktop review.\n\nFor urgent, unsafe, structural, fire safety, severe water ingress, mould, façade, balcony, falling object, electrical, gas, or health-related concerns, the customer must seek immediate advice from an appropriately qualified professional or relevant authority.\n\nThis review does not confirm the cause of the defect. It only provides a preliminary opinion on the likely defect category, general risk level, and recommended next step based on supplied information.";

interface Props {
  service: string;
  serviceName: string;
  children?: React.ReactNode;
  /** Hide the general Photos input — use when service has its own per-defect photos */
  hideGeneralPhotos?: boolean;
  /** Hide the entire Photos & Documents card — use when all file uploads are in children */
  hideFilesSection?: boolean;
  /** Override the label for the description textarea */
  descriptionLabel?: string;
  /** Override the placeholder for the description textarea */
  descriptionPlaceholder?: string;
}

const PROPERTY_TYPES = [
  "Residential Apartment",
  "Townhouse",
  "House",
  "Commercial",
  "Industrial Property",
  "Other — please specify",
];

const URGENCY_OPTIONS = [
  "Not urgent",
  "Within 1 month",
  "Within 1 week",
  "Urgent — safety concern",
];

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

// ─── Image compression ────────────────────────────────────────────────────────

async function compressImage(file: File): Promise<File> {
  if (
    !file.type.startsWith("image/") ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  ) {
    return file;
  }
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_DIM = 2000;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = MAX_DIM / Math.max(width, height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const name = file.name.replace(/\.(png|webp|bmp|tiff?)$/i, ".jpg");
          const compressed = new File([blob], name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressed.size < file.size ? compressed : file);
        },
        "image/jpeg",
        0.82
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExpertAdviceForm({
  service,
  serviceName,
  children,
  hideGeneralPhotos = false,
  hideFilesSection = false,
  descriptionLabel = "Description of the Issue",
  descriptionPlaceholder = "Describe the defect, problem, or what you need reviewed...",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState("");
  const [otherPropertyType, setOtherPropertyType] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const isOther = propertyType === "Other — please specify";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setError(null);
    setSubmitting(true);

    try {
      const rawFd = new FormData(formRef.current);

      // Resolve "Other" property type
      if (isOther && otherPropertyType.trim()) {
        rawFd.set("propertyType", `Other — ${otherPropertyType.trim()}`);
      }

      // Validate required photos when the section is visible
      if (!hideFilesSection && !hideGeneralPhotos) {
        const photoFiles = rawFd.getAll("photos").filter(
          (v) => v instanceof File && (v as File).size > 0
        );
        if (photoFiles.length === 0) {
          setError("Please attach at least one photo.");
          setSubmitting(false);
          return;
        }
      }

      // Compress images, copy everything else unchanged
      const newFd = new FormData();
      const tasks: Promise<void>[] = [];
      for (const [key, value] of rawFd.entries()) {
        if (value instanceof File && value.size > 0 && value.type.startsWith("image/")) {
          tasks.push(
            compressImage(value).then((compressed) =>
              newFd.append(key, compressed, compressed.name)
            )
          );
        } else {
          newFd.append(key, value);
        }
      }
      await Promise.all(tasks);

      // Validate post-compression sizes
      const MAX_FILE = 4 * 1024 * 1024;
      const MAX_TOTAL = 4 * 1024 * 1024;
      let totalBytes = 0;
      for (const [, value] of newFd.entries()) {
        if (value instanceof File && value.size > 0) {
          if (value.size > MAX_FILE) {
            setError(`"${(value as File).name}" exceeds 4 MB. Please reduce the file size.`);
            setSubmitting(false);
            return;
          }
          totalBytes += (value as File).size;
        }
      }
      if (totalBytes > MAX_TOTAL) {
        setError("Total upload size exceeds 4 MB. Please reduce the number of files.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/expert-advice/submit", { method: "POST", body: newFd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 px-8 py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-green-600" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-green-900">
          Thank you. We have received your request and will review the information provided.
        </h3>
        <p className="mt-3 text-sm leading-6 text-green-700">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="serviceName" value={serviceName} />

      {/* Your details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-5 text-base font-bold text-sky-950">Your Details</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name <span className="text-red-600">*</span></label>
            <input type="text" name="name" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
          </div>
          <div>
            <label className={labelClass}>Email <span className="text-red-600">*</span></label>
            <input type="email" name="email" required autoComplete="email" className={fieldClass} placeholder="your@email.com" />
          </div>
          <div>
            <label className={labelClass}>
              Phone <span className="text-xs font-normal text-slate-400">(optional)</span>
            </label>
            <input type="tel" name="phone" autoComplete="tel" className={fieldClass} placeholder="04xx xxx xxx" />
          </div>
          <div>
            <label className={labelClass}>
              Property Type <span className="text-red-600">*</span>
            </label>
            <select
              name="propertyType"
              required
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className={fieldClass}
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {isOther && (
              <input
                type="text"
                className={`${fieldClass} mt-2`}
                placeholder="Please describe your property type"
                value={otherPropertyType}
                onChange={(e) => setOtherPropertyType(e.target.value)}
                required
              />
            )}
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Building Address / Suburb <span className="text-red-600">*</span></label>
            <input type="text" name="buildingAddress" required autoComplete="street-address" className={fieldClass} placeholder="e.g. 12 Smith Street, Surry Hills NSW" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{descriptionLabel} <span className="text-red-600">*</span></label>
            <textarea
              name="description"
              required
              rows={4}
              className={`${fieldClass} resize-y`}
              placeholder={descriptionPlaceholder}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>
              Urgency <span className="text-xs font-normal text-slate-400">(optional)</span>
            </label>
            <select name="urgency" className={fieldClass}>
              <option value="">Select urgency</option>
              {URGENCY_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Service-specific fields */}
      {children && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-5 text-base font-bold text-sky-950">Additional Information</h3>
          <div className="space-y-5">{children}</div>
        </div>
      )}

      {/* Photos and documents */}
      {!hideFilesSection && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-1.5 text-base font-bold text-sky-950">
            {hideGeneralPhotos ? "Documents" : "Photos & Documents"}
          </h3>
          <p className="mb-5 text-sm text-slate-500">
            {hideGeneralPhotos
              ? "Attach any additional documents — reports, strata plan, engineer letters (PDF)."
              : "Photos are automatically compressed before upload. Attach as many as needed."}
          </p>
          <div className="space-y-5">
            {!hideGeneralPhotos && (
              <FileUploadZone
                name="photos"
                label="Photos"
                accept="image/jpeg,image/png,image/webp,image/heic"
                hint="Close-up and wide-angle shots showing the defect"
                maxFiles={10}
                required
              />
            )}
            <FileUploadZone
              name="documents"
              label="Documents"
              accept=".pdf,.doc,.docx"
              hint="Reports, strata plan, engineer letters, inspection reports (PDF, DOC)"
              maxFiles={10}
            />
          </div>
        </div>
      )}

      {/* Disclaimer gate — must be accepted before submit */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="mb-4 flex items-start gap-3">
          <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
            Service Disclaimer — Please Read Before Submitting
          </p>
        </div>
        <div className="space-y-3 rounded-xl border border-amber-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700">
          {DISCLAIMER_TEXT.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="disclaimerAccepted"
            value="true"
            checked={disclaimerAccepted}
            onChange={(e) => setDisclaimerAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-amber-400 accent-red-700"
          />
          <span className="text-sm font-semibold leading-6 text-slate-800">
            I have read, understood, and agree to the service scope, limitations, disclaimer, refund terms, and terms and conditions for this service.
          </span>
        </label>
        <input type="hidden" name="disclaimerVersion" value={DISCLAIMER_VERSION} />
        <input type="hidden" name="disclaimerText" value={DISCLAIMER_TEXT} />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !disclaimerAccepted}
        className="w-full rounded-2xl bg-red-700 px-8 py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        title={!disclaimerAccepted ? "Please accept the disclaimer above before submitting" : undefined}
      >
        {submitting ? "Submitting…" : "Request This Advice"}
      </button>
      {!disclaimerAccepted && (
        <p className="text-center text-xs text-slate-400">
          Tick the checkbox above to enable this button.
        </p>
      )}
    </form>
  );
}
