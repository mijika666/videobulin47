import "server-only";

import { createFalClient } from "@fal-ai/client";
import { env, isFalConfigured } from "@/lib/env";
import {
  buildSeedance25TemplatePrompt,
  buildMinimaxTemplatePrompt,
  DEFAULT_MODEL_ID,
  KLING_MAX_REFERENCE_VIDEOS,
  MODELS,
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
      model.maxReferenceVideos,
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

  if (model.id === "seedance-2-5-us-r2v") {
    // Seedance 2.5 (US) 用 @Image1 / @Video1 指代参考素材，video_urls 最多 10 个
    // 参考视频（合计 <= 30.2 秒）。这条端点没有 enable_safety_checker 字段，
    // 所以不要传，避免参数校验失败。
    const referenceVideos = selectReferenceVideosForDuration(
      env.templateVideoUrls,
      duration,
      model.maxReferenceVideos,
    );
    return {
      prompt: buildSeedance25TemplatePrompt(referenceVideos.length),
      task: "reference",
      image_urls: [imageUrl],
      video_urls: referenceVideos,
      duration: String(duration),
      resolution: resolution === "1080p" ? "1080p" : "720p",
      aspect_ratio: "9:16",
      generate_audio: true,
      bitrate_mode: "high",
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
  //   无法多参考；BULIN47_TEMPLATE_VIDEO_URLS 里的额外视频只在 MiniMax 和
  //   Seedance 2.5 两条线上生效。
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

// 只接受 http/https 地址。回调里的 URL 最终会渲染成 <a href> / <video src>，
// 如果不校验协议，javascript: 这类伪协议会被带进页面。
function asHttpUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function extractFalVideoUrl(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const value = payload as Record<string, unknown>;
  const video = value.video;

  const direct = asHttpUrl(video);
  if (direct) return direct;
  if (video && typeof video === "object") {
    const nested = asHttpUrl((video as Record<string, unknown>).url);
    if (nested) return nested;
  }

  for (const key of ["video_url", "output_url", "url"]) {
    const candidate = asHttpUrl(value[key]);
    if (candidate) return candidate;
  }

  return null;
}
