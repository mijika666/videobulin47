import "server-only";

import { createFalClient } from "@fal-ai/client";
import { env, isFalConfigured } from "@/lib/env";
import {
  buildMinimaxTemplatePrompt,
  DEFAULT_MODEL_ID,
  KLING_MAX_REFERENCE_VIDEOS,
  MODELS,
  SEEDANCE_TEMPLATE_PROMPT,
  selectReferenceVideosForDuration,
  TEMPLATE_PROMPT,
} from "@/lib/constants";

// Kling O3 Reference 的 prompt 上限是 2500 字符。这里做兜底截断，避免将来
// 改提示词时不小心超过 schema 限制、让线上请求直接被拒。
const KLING_PROMPT_MAX_LENGTH = 2500;

function clampPrompt(prompt: string, maxLength: number) {
  if (prompt.length <= maxLength) return prompt;
  return `${prompt.slice(0, maxLength - 3)}...`;
}

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
    // MiniMax H3 用 "Image 1 / Video 1 / Audio 1" 指代参考素材，
    // prompt_expansion_mode=quality 会让它在生成前先把提示词扩写成更细的描述。
    // 只有这条线支持多参考视频：reference_video_urls 是数组，最多 3 个。
    // 参考片段的数量跟输出时长匹配，见 selectReferenceVideosForDuration。
    const referenceVideos = selectReferenceVideosForDuration(
      env.templateVideoUrls,
      duration,
    );
    return {
      prompt: buildMinimaxTemplatePrompt(referenceVideos.length),
      reference_image_urls: [imageUrl],
      reference_video_urls: referenceVideos,
      reference_audio_urls: env.templateAudioUrl ? [env.templateAudioUrl] : [],
      duration,
      resolution: resolution === "1080p" ? "2K" : "768P",
      aspect_ratio: "9:16",
      prompt_expansion_mode: "quality",
      enable_safety_checker: true,
    };
  }

  if (model.id === "seedance-v1-lite-r2v") {
    // Seedance 1.0 Lite reference-to-video 只接收 reference_image_urls，
    // 没有任何参考视频字段，所以动作完全由提示词描述，不跟随模板视频。
    // resolution 只支持 480p / 720p，统一按 720p 提交。
    return {
      prompt: SEEDANCE_TEMPLATE_PROMPT,
      reference_image_urls: [imageUrl],
      duration: String(duration),
      resolution: "720p",
      aspect_ratio: "9:16",
      enable_safety_checker: true,
    };
  }

  // Kling O3 Reference：
  // - elements 是"角色"通道，frontal_image_url 传入用户正脸照，提示词里用 @Element1 引用。
  //   它比 image_urls（style/appearance 通道）更能锁住人物身份，是这条模型线专门为
  //   "把某个人放进参考视频" 设计的入参。
  // - 实测经验：elements 里 front 和 reference 两个字段必须同时给，只给 front 会报
  //   "Both frontal_image_url and reference_image_urls are required for image elements"。
  //   我们只有一张用户照片，所以两个字段都填同一张。
  // - video_url 是动作模板，提示词里用 @Video1 引用。
  // - 模板视频有硬性限制：mp4/mov、3-15 秒、宽高都 >= 720px、23-60fps、<= 200MB。
  //   如果换模板后报参数错误，先检查这条。
  // - 如果实测相似度不够，可以再补 image_urls: [imageUrl]（与 elements 合计不超过 4 个）。
  // - video_url 只接受 1 个参考视频（schema 里是单个 string），所以 Kling 线
  //   无法多参考；BULIN47_TEMPLATE_VIDEO_URLS 里的额外视频只在 MiniMax 线生效。
  const klingVideo =
    env.templateVideoUrls.slice(0, KLING_MAX_REFERENCE_VIDEOS)[0] ??
    env.templateVideoUrl;
  return {
    video_url: klingVideo,
    elements: [
      {
        frontal_image_url: imageUrl,
        reference_image_urls: [imageUrl],
      },
    ],
    prompt: clampPrompt(TEMPLATE_PROMPT, KLING_PROMPT_MAX_LENGTH),
    shot_type: "customize",
    keep_audio: true,
    duration: String(duration),
    aspect_ratio: "9:16",
    enable_safety_checker: true,
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

  const model = resolveModel(modelId);
  // Seedance 只吃参考图，不需要模板视频；其余模型都依赖模板视频。
  if (model.usesReferenceVideo && env.templateVideoUrls.length === 0) {
    throw new Error("BULIN47_TEMPLATE_VIDEO_URL is not configured");
  }

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
