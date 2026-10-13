import "server-only";

import { createFalClient } from "@fal-ai/client";
import { env, isFalConfigured } from "@/lib/env";
import { DEFAULT_MODEL_ID, MODELS, TEMPLATE_PROMPT } from "@/lib/constants";

export function getFalClient() {
  if (!isFalConfigured) return null;
  return createFalClient({ credentials: env.falKey });
}

export function resolveModel(modelId: string) {
  const configuredDefault = MODELS.find(
    (model) => model.endpoint === env.falVideoModel,
  );
  if (modelId === DEFAULT_MODEL_ID && configuredDefault) {
    return configuredDefault;
  }
  return MODELS.find((model) => model.id === modelId) ?? MODELS[0];
}

export function buildModelInput({
  modelId,
  imageUrl,
  duration,
  resolution,
}: {
  modelId: string;
  imageUrl: string;
  duration: number;
  resolution: string;
}) {
  const model = resolveModel(modelId);

  if (model.id === "minimax-h3") {
    return {
      prompt:
        "Use @Image1 as the locked character. Use @Video1 for motion, camera movement and rhythm. Replace the original performer with the person in @Image1 while preserving the scene and timing. Vertical 9:16. Keep the original audio. Do not add captions, logos or watermarks.",
      reference_image_urls: [imageUrl],
      reference_video_urls: env.templateVideoUrl ? [env.templateVideoUrl] : [],
      reference_audio_urls: env.templateAudioUrl ? [env.templateAudioUrl] : [],
      duration: String(duration),
      resolution: resolution === "1080p" ? "2K" : "768P",
      aspect_ratio: "9:16",
    };
  }

  return {
    video_url: env.templateVideoUrl,
    image_urls: [imageUrl],
    prompt: TEMPLATE_PROMPT,
    keep_audio: true,
    duration: String(duration),
    aspect_ratio: "9:16",
  };
}

export async function submitVideoGeneration({
  modelId = DEFAULT_MODEL_ID,
  imageUrl,
  duration,
  resolution,
  webhookUrl,
}: {
  modelId?: string;
  imageUrl: string;
  duration: number;
  resolution: string;
  webhookUrl: string;
}) {
  const client = getFalClient();
  if (!client) throw new Error("FAL_KEY is not configured");
  if (!env.templateVideoUrl) {
    throw new Error("BULIN47_TEMPLATE_VIDEO_URL is not configured");
  }

  const model = resolveModel(modelId);
  const input = buildModelInput({ modelId: model.id, imageUrl, duration, resolution });

  const result = await client.queue.submit(model.endpoint as never, {
    input: input as never,
    webhookUrl,
    storageSettings: {
      expiresIn: "30d",
    },
  });

  return {
    requestId: result.request_id,
    statusUrl: result.status_url,
    responseUrl: result.response_url,
    model,
  };
}

export function extractFalVideoUrl(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const value = payload as Record<string, unknown>;
  const video = value.video;

  if (typeof video === "string") return video;
  if (video && typeof video === "object") {
    const url = (video as Record<string, unknown>).url;
    if (typeof url === "string") return url;
  }

  for (const key of ["video_url", "output_url", "url"]) {
    const candidate = value[key];
    if (typeof candidate === "string") return candidate;
  }

  return null;
}
