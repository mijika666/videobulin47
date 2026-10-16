import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  createJobRecord,
  refundCredits,
  reserveCredits,
} from "@/lib/credits";
import { submitVideoGeneration } from "@/lib/fal";
import { MODELS } from "@/lib/constants";
import {
  assertProfitable,
  calculateCreditsForRender,
  estimateProviderCostCents,
} from "@/config/economics";
import { env, isFalConfigured, isSupabaseAdminConfigured, isTemplateConfigured } from "@/lib/env";
import { absoluteUrl } from "@/lib/utils";

export const runtime = "nodejs";

const inputSchema = z.object({
  assetPath: z.string().min(1).max(500),
  duration: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  resolution: z.enum(["720p", "1080p"]),
  modelId: z.string().min(1).max(100),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured || !isFalConfigured || !isTemplateConfigured) {
    return NextResponse.json(
      {
        error:
          "Generation is not fully configured. Add Supabase service role, FAL_KEY, and the template video URL.",
        setupRequired: true,
      },
      { status: 503 },
    );
  }

  const parsed = inputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid generation request", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  if (!input.assetPath.startsWith(`${user.id}/`)) {
    return NextResponse.json(
      { error: "The uploaded image does not belong to this account." },
      { status: 403 },
    );
  }
  const model = MODELS.find((item) => item.id === input.modelId);
  if (!model) {
    return NextResponse.json({ error: "Unknown model" }, { status: 400 });
  }
  // 每个端点的时长/分辨率支持范围不同（例如 Seedance 只到 10 秒、只有 720p），
  // 这里先挡住，避免把无效参数发到 fal 再报错。
  if (
    !model.durations.includes(input.duration) ||
    !model.resolutions.includes(input.resolution)
  ) {
    return NextResponse.json(
      {
        error: `${model.name} supports ${model.durations.join(
          "/",
        )} second clips at ${model.resolutions.join("/")}.`,
      },
      { status: 422 },
    );
  }

  let credits: number;
  let margin: ReturnType<typeof assertProfitable>;
  try {
    credits = calculateCreditsForRender({
      duration: input.duration,
      resolution: input.resolution,
      modelId: model.id,
    });
    margin = assertProfitable({
      credits,
      modelId: model.id,
      duration: input.duration,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "This render would fall below the margin guard.",
      },
      { status: 422 },
    );
  }
  const job = await createJobRecord({
    userId: user.id,
    inputPath: input.assetPath,
    modelId: model.id,
    duration: input.duration,
    resolution: input.resolution,
    credits,
  });

  const balance = await reserveCredits({
    userId: user.id,
    amount: credits,
    jobId: job.id,
  });
  if (balance < 0) {
    const admin = createSupabaseAdminClient();
    await admin
      ?.from("video_jobs")
      .update({
        status: "failed",
        error_code: "insufficient_credits",
        error_message: "Not enough credits.",
      })
      .eq("id", job.id);
    return NextResponse.json(
      { error: "Not enough credits", jobId: job.id },
      { status: 402 },
    );
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin is not configured" },
      { status: 503 },
    );
  }

  const { data: signedInput, error: signError } = await admin.storage
    .from("uploads")
    .createSignedUrl(input.assetPath, 60 * 60);

  if (signError || !signedInput?.signedUrl) {
    await refundCredits({ userId: user.id, amount: credits, jobId: job.id });
    await admin
      .from("video_jobs")
      .update({
        status: "failed",
        error_code: "input_url_failed",
        error_message: signError?.message || "Could not sign the input image.",
      })
      .eq("id", job.id);
    return NextResponse.json(
      { error: "Could not prepare the input image." },
      { status: 500 },
    );
  }

  try {
    const result = await submitVideoGeneration({
      modelId: model.id,
      imageUrl: signedInput.signedUrl,
      duration: input.duration,
      resolution: input.resolution,
      webhookUrl: absoluteUrl(
        `/api/webhooks/fal?job=${job.id}&token=${encodeURIComponent(
          env.falWebhookSecret,
        )}`,
      ),
    });

    await admin
      .from("video_jobs")
      .update({
        fal_request_id: result.requestId,
        status: "queued",
        started_at: new Date().toISOString(),
        metadata: {
          model_endpoint: result.model.endpoint,
          fal_status_url: result.statusUrl,
          fal_response_url: result.responseUrl,
          estimated_provider_cost_cents: estimateProviderCostCents({
            modelId: model.id,
            duration: input.duration,
          }),
          estimated_margin_cents: margin.net,
          estimated_margin_rate: margin.marginRate,
        },
      })
      .eq("id", job.id);

    return NextResponse.json({
      jobId: job.id,
      status: "queued",
      credits,
      balance,
      requestId: result.requestId,
    });
  } catch (error) {
    await refundCredits({ userId: user.id, amount: credits, jobId: job.id });
    await admin
      .from("video_jobs")
      .update({
        status: "failed",
        error_code: "fal_submit_failed",
        error_message:
          error instanceof Error ? error.message : "Could not submit the job.",
      })
      .eq("id", job.id);
    return NextResponse.json(
      { error: "Could not submit the generation job." },
      { status: 502 },
    );
  }
}
