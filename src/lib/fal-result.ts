import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { extractFalVideoUrl } from "@/lib/fal";
import { refundCredits, settleCredits } from "@/lib/credits";
import type { VideoJob } from "@/lib/types";

type FalWebhookEnvelope = {
  status?: string;
  payload?: unknown;
  error?: string;
  request_id?: string;
};

async function transferRender({
  job,
  outputUrl,
}: {
  job: VideoJob;
  outputUrl: string;
}) {
  const admin = createSupabaseAdminClient();
  if (!admin) return { outputUrl, outputPath: null };

  try {
    const response = await fetch(outputUrl, { cache: "no-store" });
    if (!response.ok) return { outputUrl, outputPath: null };
    const buffer = Buffer.from(await response.arrayBuffer());
    const path = `${job.user_id}/${job.id}.mp4`;
    const { error } = await admin.storage.from("renders").upload(path, buffer, {
      contentType: "video/mp4",
      upsert: true,
    });
    if (error) return { outputUrl, outputPath: null };
    const { data } = await admin.storage
      .from("renders")
      .createSignedUrl(path, 60 * 60 * 24 * 7);
    return {
      outputUrl: data?.signedUrl || outputUrl,
      outputPath: path,
    };
  } catch {
    return { outputUrl, outputPath: null };
  }
}

export async function finalizeFalJob({
  jobId,
  envelope,
}: {
  jobId: string;
  envelope: FalWebhookEnvelope;
}) {
  const admin = createSupabaseAdminClient();
  if (!admin) throw new Error("Supabase admin is not configured");

  const { data: job, error } = await admin
    .from("video_jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle<VideoJob>();

  if (error || !job) throw new Error("Video job not found");
  if (job.status === "completed" || job.status === "failed") {
    return { job, changed: false };
  }

  const failed =
    envelope.status === "ERROR" ||
    Boolean(envelope.error) ||
    !extractFalVideoUrl(envelope.payload);

  if (failed) {
    await refundCredits({
      userId: job.user_id,
      amount: job.credits,
      jobId: job.id,
    });
    const { data: updated } = await admin
      .from("video_jobs")
      .update({
        status: "failed",
        error_code: "generation_failed",
        error_message:
          envelope.error || "The provider did not return a video file.",
        completed_at: new Date().toISOString(),
      })
      .eq("id", job.id)
      .select("*")
      .single<VideoJob>();
    return { job: updated ?? job, changed: true };
  }

  const falOutputUrl = extractFalVideoUrl(envelope.payload);
  if (!falOutputUrl) throw new Error("FAL output URL missing");
  const stored = await transferRender({ job, outputUrl: falOutputUrl });
  await settleCredits(job.id);

  const { data: updated } = await admin
    .from("video_jobs")
    .update({
      status: "completed",
      output_url: stored.outputUrl,
      output_path: stored.outputPath,
      error_code: null,
      error_message: null,
      completed_at: new Date().toISOString(),
      metadata: {
        ...(job as unknown as { metadata?: Record<string, unknown> }).metadata,
        fal_output_url: falOutputUrl,
      },
    })
    .eq("id", job.id)
    .select("*")
    .single<VideoJob>();

  return { job: updated ?? job, changed: true };
}
