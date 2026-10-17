"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  ImagePlus,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_MODEL_ID,
  MODELS,
  type VideoDuration,
  type VideoResolution,
} from "@/lib/constants";
import { calculateCreditsForRender } from "@/config/economics";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { VideoJob, VideoJobStatus } from "@/lib/types";

type StudioProps = {
  userEmail: string | null;
  initialBalance: number;
  initialJobs: VideoJob[];
  services: {
    supabase: boolean;
    fal: boolean;
    waffo: boolean;
    template: boolean;
  };
};

type JobView = Partial<VideoJob> & {
  preview?: boolean;
};

function statusLabel(status?: string) {
  if (status === "queued") return "Queued";
  if (status === "processing") return "Generating";
  if (status === "completed") return "Complete";
  if (status === "failed") return "Needs attention";
  return "Ready";
}

function statusTone(status?: string) {
  if (status === "completed") return "bg-ok text-[#08240f]";
  if (status === "failed") return "bg-acid text-white";
  if (status === "processing" || status === "queued") {
    return "bg-sky text-white";
  }
  return "bg-panel text-muted";
}

export function StudioClient({
  userEmail,
  initialBalance,
  initialJobs,
  services,
}: StudioProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<VideoDuration>(10);
  const [resolution, setResolution] = useState<VideoResolution>("720p");
  const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
  // 授权默认勾选：用户仍可取消，但不再需要额外一步才能生成。
  const [consent, setConsent] = useState(true);
  const [balance, setBalance] = useState(initialBalance);
  const [jobs, setJobs] = useState(initialJobs);
  const [currentJob, setCurrentJob] = useState<JobView | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [polling, setPolling] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  // 素材来源确认（对应 Waffo AUP 第 2.4 节「上传素材来源」）。
  const [rights, setRights] = useState(true);
  const [rightsWarning, setRightsWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUrlRef = useRef<string | null>(null);
  const consentRef = useRef<HTMLLabelElement>(null);
  const rightsRef = useRef<HTMLLabelElement>(null);

  const demoMode =
    !services.supabase || !services.fal || !services.template;
  const credits = calculateCreditsForRender({
    duration,
    resolution,
    modelId,
  });
  const selectedModel =
    MODELS.find((model) => model.id === modelId) ?? MODELS[0];
  // 时长和分辨率跟着所选模型走：各端点的支持范围不同。
  const durations = selectedModel.durations;
  const resolutions = selectedModel.resolutions;

  function chooseModel(nextId: string) {
    const next = MODELS.find((model) => model.id === nextId) ?? MODELS[0];
    setModelId(next.id);
    if (!next.durations.includes(duration)) {
      setDuration(next.durations[next.durations.length - 1]);
    }
    if (!next.resolutions.includes(resolution)) {
      setResolution(next.resolutions[0]);
    }
  }

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
  }, []);

  function chooseFile(nextFile: File | null) {
    setError("");
    setMessage("");
    if (!nextFile) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      setError("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (nextFile.size > 10 * 1024 * 1024) {
      setError("The image must be 10MB or smaller.");
      return;
    }
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    const nextUrl = URL.createObjectURL(nextFile);
    fileUrlRef.current = nextUrl;
    setPreviewUrl(nextUrl);
    setFile(nextFile);
  }

  function removeFile() {
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    fileUrlRef.current = null;
    setPreviewUrl(null);
    setFile(null);
  }

  async function pollJob(jobId: string) {
    setPolling(true);
    for (let attempt = 0; attempt < 150; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          cache: "no-store",
        });
        const data = (await response.json()) as { job?: VideoJob };
        if (data.job) {
          setCurrentJob(data.job);
          setJobs((current) => {
            const exists = current.some((job) => job.id === data.job?.id);
            if (!exists) return [data.job as VideoJob, ...current];
            return current.map((job) =>
              job.id === data.job?.id ? (data.job as VideoJob) : job,
            );
          });
          if (
            data.job.status === "completed" ||
            data.job.status === "failed"
          ) {
            setPolling(false);
            return;
          }
        }
      } catch {
        // The next poll will retry.
      }
    }
    setPolling(false);
    setError("The job is taking longer than expected. Check your history.");
  }

  async function runDemoPreview() {
    setSubmitting(true);
    setError("");
    setMessage("");
    const demoJob: JobView = {
      id: "demo-preview",
      status: "queued",
      duration,
      resolution,
      credits,
      model_id: modelId,
      preview: true,
    };
    setCurrentJob(demoJob);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCurrentJob({ ...demoJob, status: "processing" });
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setCurrentJob({ ...demoJob, status: "completed" });
    setSubmitting(false);
    setMessage("Preview complete. Add service keys to run a real render.");
  }

  async function generate() {
    if (!file) {
      setError("Choose an image first.");
      return;
    }
    if (!rights) {
      setError(
        "Confirm the image source under step 1, then press Generate video again.",
      );
      setRightsWarning(true);
      rightsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (!consent) {
      setError(
        "Tick the permission box in step 2, then press Generate video again.",
      );
      setConsentWarning(true);
      consentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (demoMode) {
      await runDemoPreview();
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error("Supabase client is not configured.");

      const signResponse = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });
      const signed = (await signResponse.json()) as {
        path?: string;
        token?: string;
        error?: string;
      };
      if (!signResponse.ok || !signed.path || !signed.token) {
        throw new Error(signed.error || "Could not prepare the upload.");
      }

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .uploadToSignedUrl(signed.path, signed.token, file);
      if (uploadError) throw uploadError;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetPath: signed.path,
          duration,
          resolution,
          modelId,
          consent: true,
        }),
      });
      const data = (await response.json()) as {
        jobId?: string;
        status?: VideoJobStatus;
        credits?: number;
        balance?: number;
        error?: string;
        setupRequired?: boolean;
      };
      if (!response.ok || !data.jobId) {
        throw new Error(data.error || "The generation could not be queued.");
      }

      setBalance(data.balance ?? balance);
      setCurrentJob({
        id: data.jobId,
        status: data.status ?? "queued",
        duration,
        resolution,
        credits: data.credits ?? credits,
        model_id: modelId,
      });
      setMessage("Job submitted. The render will appear here when it finishes.");
      void pollJob(data.jobId);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "The generation could not be started.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-10 md:py-16">
      <div className="container-shell">
        <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-orange">Studio</p>
            <h1 className="display mt-5 text-[clamp(2.7rem,6vw,5rem)]">
              Recast the moment.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              One portrait, one prepared template, one vertical output. Upload
              a photo and the template carries the choreography, camera work
              and audio while the person you supplied becomes the performer.
              You will see the exact credit reservation before the job is
              submitted.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-line bg-card px-4 py-3">
              <p className="text-[10px] font-black uppercase text-muted">
                Your balance
              </p>
              <p className="mt-1 text-2xl font-black">{balance} credits</p>
            </div>
            <Link href="/pricing" className="btn btn-outline">
              <CreditCard className="size-4" />
              Buy credits
            </Link>
          </div>
        </div>

        {demoMode ? (
          <div className="mt-6 flex flex-col gap-3 rounded-lg border border-orange/25 bg-orange/10 p-4 text-sm text-orange md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              <p className="leading-6">
                Preview mode is on. The upload and job flow are interactive, but
                add Supabase, fal.ai, and template environment variables to run
                a real render.
              </p>
            </div>
            <Link href="/api/health" className="shrink-0 font-black underline">
              View service status
            </Link>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-6">
            <div className="panel p-5 md:p-7">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase text-muted">
                    Step 01
                  </p>
                  <h2 className="mt-2 text-xl font-black">Upload an image</h2>
                </div>
                <ImagePlus className="size-5 text-orange" />
              </div>

              {previewUrl ? (
                <div className="relative mt-6 overflow-hidden rounded-lg border border-line bg-panel">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={previewUrl}
                      alt="Selected image preview"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute left-4 top-4 rounded-full bg-acid px-3 py-1.5 text-[10px] font-black uppercase text-white">
                    Ready to upload
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line-strong bg-panel text-ink transition hover:border-acid hover:text-white"
                    aria-label="Remove image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    chooseFile(event.dataTransfer.files[0] ?? null);
                  }}
                  className="mt-6 grid min-h-64 w-full place-items-center rounded-lg border border-dashed border-line-strong bg-panel/40 p-6 text-center transition hover:border-acid hover:bg-acid/[0.06]"
                >
                  <span>
                    <span className="mx-auto grid size-12 place-items-center rounded-lg bg-acid text-white">
                      <ImagePlus className="size-5" />
                    </span>
                    <span className="mt-4 block text-sm font-black">
                      Drop an image here or click to choose
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-muted">
                      JPG, PNG, or WebP. Max 10MB. One clear portrait of one
                      adult person you have permission to use.
                    </span>
                  </span>
                </button>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
              />
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "One adult, clearly visible",
                  "Good light, no heavy filters",
                  "No celebrities, no minors",
                ].map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-2 text-xs leading-5 text-muted"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-orange" />
                    {tip}
                  </div>
                ))}
              </div>

              {/* Waffo AUP 第 2.4 节「上传素材来源」要求的用户主动确认 */}
              <label
                ref={rightsRef}
                className={cn(
                  "mt-5 flex cursor-pointer items-start gap-3 rounded-lg border bg-white/[0.03] p-4 transition",
                  rightsWarning
                    ? "border-orange ring-2 ring-orange/40"
                    : "border-line",
                )}
              >
                <input
                  type="checkbox"
                  checked={rights}
                  onChange={(event) => {
                    setRights(event.target.checked);
                    if (event.target.checked) setRightsWarning(false);
                  }}
                  className="mt-1 size-4 accent-[#ff2e3b]"
                />
                <span className="text-xs leading-6 text-muted">
                  <span className="font-bold text-ink">
                    Confirm the image source.
                  </span>{" "}
                  I own this photo, or I have documented permission from the
                  person in it. That person is an adult and has agreed to appear
                  in an AI-generated video. This is{" "}
                  <span className="font-bold text-ink">
                    not a celebrity, not a public figure
                  </span>
                  , and not someone who has not consented.
                </span>
              </label>
            </div>

            <div className="panel p-5 md:p-7">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase text-muted">
                    Step 02
                  </p>
                  <h2 className="mt-2 text-xl font-black">Choose the render</h2>
                </div>
                <WandSparkles className="size-5 text-orange" />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <fieldset>
                  <legend className="text-sm font-black">Clip length</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {durations.map((value) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setDuration(value)}
                        className={cn(
                          "rounded-lg border px-3 py-3 text-left transition",
                          duration === value
                            ? "border-acid bg-acid text-white"
                            : "border-line bg-card hover:border-acid/50",
                        )}
                      >
                        <span className="block text-sm font-black">
                          {value}s
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[10px] font-bold",
                            duration === value ? "text-white/75" : "text-muted",
                          )}
                        >
                          {calculateCreditsForRender({
                            duration: value,
                            resolution: "720p",
                            modelId,
                          })}{" "}
                          credits
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-black">Resolution</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {resolutions.map((value) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setResolution(value)}
                        className={cn(
                          "rounded-lg border px-3 py-3 text-left transition",
                          resolution === value
                            ? "border-acid bg-acid text-white"
                            : "border-line bg-card hover:border-acid/50",
                        )}
                      >
                        <span className="block text-sm font-black">
                          {value}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[10px] font-bold",
                            resolution === value ? "text-white/75" : "text-muted",
                          )}
                        >
                          {value === "720p" ? "Mobile ready" : "Sharper output"}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <label className="mt-6 grid gap-2">
                <span className="text-sm font-black">Generation model</span>
                <select
                  value={modelId}
                  onChange={(event) => chooseModel(event.target.value)}
                  className="field pr-9"
                >
                  {MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} · {model.quality}
                    </option>
                  ))}
                </select>
                {selectedModel.usesReferenceVideo ? (
                  <span className="text-[11px] leading-5 text-muted">
                    Drives the motion from the built-in template.
                  </span>
                ) : (
                  <span className="rounded-lg bg-orange/10 px-3 py-2 text-[11px] leading-5 text-orange">
                    {selectedModel.name} uses your image as a reference only. It
                    does not follow the motion template, so the movement comes
                    from the prompt instead.
                  </span>
                )}
              </label>

              <label
                ref={consentRef}
                className={cn(
                  "mt-6 flex cursor-pointer items-start gap-3 rounded-lg border bg-white/[0.03] p-4 transition",
                  consentWarning
                    ? "border-orange ring-2 ring-orange/40"
                    : "border-line",
                )}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    if (event.target.checked) setConsentWarning(false);
                  }}
                  className="mt-1 size-4 accent-[#ff2e3b]"
                />
                <span className="text-xs leading-6 text-muted">
                  <span className="font-bold text-ink">
                    Required before you can generate.
                  </span>{" "}
                  I confirm I have permission to use this portrait and that the
                  person is an adult. I understand this is a consensual
                  character replacement - not a deepfake, and not for
                  impersonation or deception. I will not use the result to
                  mislead anyone, I will label it as AI-generated when I
                  publish it, and I accept the Acceptable Use Policy.
                </span>
              </label>

              <div className="mt-6 flex flex-col gap-4 rounded-lg border border-line-strong bg-panel p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-white/45">Estimated use</p>
                  <p className="mt-1 text-2xl font-black">
                    {credits} credits
                  </p>
                </div>
                <div className="text-xs leading-5 text-white/50 sm:text-right">
                  {duration}s · {resolution} · {selectedModel.name}
                  <br />
                  Failed renders return the reservation.
                </div>
              </div>

              <button
                type="button"
                onClick={generate}
                disabled={submitting || polling}
                className="btn btn-primary mt-4 w-full"
              >
                {submitting || polling ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {submitting || polling
                  ? "Working on the render..."
                  : demoMode
                    ? "Run preview"
                    : "Generate my video"}
              </button>

              {error ? (
                <p className="mt-4 flex gap-2 rounded-lg bg-orange/10 p-4 text-sm font-semibold text-orange">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              ) : null}
              {message ? (
                <p className="mt-4 flex gap-2 rounded-lg bg-acid/25 p-4 text-sm font-semibold">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-orange" />
                  {message}
                </p>
              ) : null}
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <div className="section-dark overflow-hidden rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/40">
                    Render status
                  </p>
                  <p className="mt-2 text-lg font-black text-white">
                    {currentJob
                      ? statusLabel(currentJob.status)
                      : "Waiting for an image"}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[10px] font-black uppercase",
                    statusTone(currentJob?.status),
                  )}
                >
                  {currentJob?.status ?? "ready"}
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                {currentJob?.status === "completed" && currentJob.output_url ? (
                  <video
                    controls
                    playsInline
                    className="aspect-[9/14] w-full bg-black object-cover"
                    src={currentJob.output_url}
                  />
                ) : previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Selected render preview"
                    width={600}
                    height={900}
                    unoptimized
                    className="aspect-[9/14] w-full object-cover opacity-80"
                  />
                ) : (
                  <div className="grid aspect-[9/14] place-items-center">
                    <div className="text-center">
                      <span className="mx-auto grid size-12 place-items-center rounded-full border border-white/15 text-acid">
                        <Sparkles className="size-5" />
                      </span>
                      <p className="mt-4 text-xs font-bold text-white/45">
                        Your output preview
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {currentJob?.status === "completed" ? (
                <div className="mt-4 grid gap-2">
                  {currentJob.output_url ? (
                    <a
                      href={currentJob.output_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary w-full"
                    >
                      <Download className="size-4" />
                      Open MP4
                    </a>
                  ) : null}
                  {currentJob.preview ? (
                    <p className="rounded-lg bg-white/10 p-3 text-xs leading-5 text-white/60">
                      This is a UI preview. Connect fal.ai and the template
                      video to render the real video.
                    </p>
                  ) : null}
                </div>
              ) : null}
              {polling ? (
                <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                  <RefreshCw className="size-3.5 animate-spin" />
                  Checking the provider queue...
                </div>
              ) : null}
            </div>

            <div className="panel p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black">Recent renders</p>
                <Clock3 className="size-4 text-muted" />
              </div>
              <div className="mt-4 grid gap-3">
                {jobs.length ? (
                  jobs.slice(0, 5).map((job) => (
                    <Link
                      key={job.id}
                      href={job.output_url || "/studio"}
                      target={job.output_url ? "_blank" : undefined}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 transition hover:border-acid/50"
                    >
                      <span>
                        <span className="block text-xs font-black">
                          {job.duration}s · {job.resolution}
                        </span>
                        <span className="mt-1 block text-[10px] font-bold uppercase text-muted">
                          {statusLabel(job.status)}
                        </span>
                      </span>
                      {job.status === "completed" ? (
                        <Download className="size-4 text-orange" />
                      ) : (
                        <ArrowRight className="size-4 text-muted" />
                      )}
                    </Link>
                  ))
                ) : (
                  <p className="rounded-lg border border-dashed border-line p-4 text-xs leading-5 text-muted">
                    Your completed videos will appear here. Sign in to keep your
                    history across devices.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-line bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-black">
                <LockKeyhole className="size-4 text-orange" />
                Privacy by default
              </p>
              <p className="mt-3 text-xs leading-6 text-muted">
                Uploads are stored in a private bucket. Generated videos are
                returned through signed URLs. Upload only an image you own or
                have permission to use. Celebrities, public figures without
                consent, and anyone under 18 are not accepted.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-muted">
                <ShieldCheck className="size-4 text-orange" />
                AUP and reporting channel enabled
              </div>
            </div>

            {!userEmail ? (
              <div className="rounded-lg bg-acid p-5 text-white">
                <p className="text-sm font-black">Keep your credits safe</p>
                <p className="mt-2 text-xs leading-6 text-white/80">
                  Sign in with Google or email to save your wallet and render
                  history.
                </p>
                <Link href="/login?next=/studio" className="btn btn-dark mt-4 w-full">
                  Sign in or create account
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
