export const APP_NAME = "VideoBulin47";
export const APP_DOMAIN = "videobulin47.net";

export type CreditPack = {
  id: "starter" | "creator" | "studio";
  name: string;
  credits: number;
  priceCents: number;
  priceLabel: string;
  description: string;
  includes: string[];
  badge?: string;
  envKey: "waffoProductSingle" | "waffoProductTrio" | "waffoProductCrew";
};

export const CREDIT_PACKS: CreditPack[] = [
  // 积分换算基准：默认模型（MiniMax H3）在 720p 下的实际扣费是
  // 5 秒 = 5 积分、10 秒 = 10 积分、15 秒 = 12 积分。
  // 下面每档的「About N clips」都按这个基准写。改价、改默认模型或改
  // economics.ts 里的成本表时，这几句话必须同步更新，否则会前后矛盾。
  {
    id: "starter",
    name: "Single",
    credits: 10,
    priceCents: 999,
    priceLabel: "$9.99",
    description: "One 10-second clip. Billed once. Credits never expire.",
    includes: [
      "10 credits",
      "About 2 clips at 5s, or 1 at 10s",
      "720p or 1080p, 9:16 vertical MP4",
      "Original sound kept",
      "No watermark",
      "Credits never expire",
      "Failed renders refunded automatically",
    ],
    envKey: "waffoProductSingle",
  },
  {
    id: "creator",
    name: "Trio",
    credits: 30,
    priceCents: 2299,
    priceLabel: "$22.99",
    description: "$7.66 per 10-second clip. Billed once. Credits never expire.",
    includes: [
      "30 credits",
      "About 6 clips at 5s, 3 at 10s, or 2 at 15s",
      "720p or 1080p, 9:16 vertical MP4",
      "Original sound kept",
      "No watermark",
      "Credits never expire",
      "Failed renders refunded automatically",
    ],
    badge: "Recommended",
    envKey: "waffoProductTrio",
  },
  {
    id: "studio",
    name: "Crew",
    credits: 80,
    priceCents: 5999,
    priceLabel: "$59.99",
    description: "$7.50 per 10-second clip. Billed once. Credits never expire.",
    includes: [
      "80 credits",
      "About 16 clips at 5s, 8 at 10s, or 6 at 15s",
      "720p or 1080p, 9:16 vertical MP4",
      "Original sound kept",
      "No watermark",
      "Credits never expire",
      "Failed renders refunded automatically",
    ],
    envKey: "waffoProductCrew",
  },
];

export const VIDEO_DURATIONS = [5, 10, 15] as const;
export const VIDEO_RESOLUTIONS = ["720p", "1080p"] as const;

export type VideoDuration = (typeof VIDEO_DURATIONS)[number];
export type VideoResolution = (typeof VIDEO_RESOLUTIONS)[number];

// 各端点能接收的参考视频数量上限（来自 fal 的 OpenAPI schema）：
// - Seedance 2.5 (US)：video_urls 是数组，最多 10 个（合计时长 <= 30.2 秒）。
// - Kling O3 Reference / Pro：video_url 是单个 string，只能 1 个。
// - MiniMax H3：reference_video_urls 是数组，maxItems = 3。
export const SEEDANCE_25_MAX_REFERENCE_VIDEOS = 10;
export const KLING_MAX_REFERENCE_VIDEOS = 1;
export const MINIMAX_MAX_REFERENCE_VIDEOS = 3;

// 我们的参考片段都是 5 秒。Seedance 2.5 按「输入视频秒数 + 输出秒数」计费，
// 成本估算要用到这个值；如果以后换成更长的模板片，这里要同步改。
export const TEMPLATE_CLIP_SECONDS = 5;

export type VideoModel = {
  id: string;
  name: string;
  endpoint: string;
  /** 下拉里展示的简短说明，不要写参考视频数量 */
  quality: string;
  /** 展示用的成本参考，不在 Studio 下拉里显示 */
  cost: string;
  /** 是否用参考视频驱动动作。false = 只吃参考图，不跟随动作模板。 */
  usesReferenceVideo: boolean;
  /** 端点能接收的参考视频数量上限（0 = 不支持参考视频） */
  maxReferenceVideos: number;
  /** 该端点支持的时长 */
  durations: readonly VideoDuration[];
  /** 该端点支持的分辨率 */
  resolutions: readonly VideoResolution[];
};

// 顺序即 Studio 下拉里的展示顺序。支持多参考视频的模型排在前面，
// 因为多参考能明显提升动作和场景的一致性。
export const MODELS: readonly VideoModel[] = [
  {
    id: "seedance-2-5-us-r2v",
    name: "Seedance 2.5",
    endpoint: "bytedance/seedance-2.5/us/reference-to-video",
    quality: "Highest detail",
    cost: "$0.34/s",
    usesReferenceVideo: true,
    maxReferenceVideos: SEEDANCE_25_MAX_REFERENCE_VIDEOS,
    durations: [5, 10, 15],
    resolutions: ["720p", "1080p"],
  },
  {
    id: "minimax-h3",
    name: "MiniMax H3",
    endpoint: "minimax/h3/reference-to-video",
    quality: "Balanced quality",
    cost: "$0.13/s",
    usesReferenceVideo: true,
    maxReferenceVideos: MINIMAX_MAX_REFERENCE_VIDEOS,
    durations: [5, 10, 15],
    resolutions: ["720p", "1080p"],
  },
  {
    id: "kling-o3-standard-v2v",
    name: "Kling O3 Reference",
    endpoint: "fal-ai/kling-video/o3/standard/video-to-video/reference",
    quality: "Fast and stable",
    cost: "$0.126/s",
    usesReferenceVideo: true,
    maxReferenceVideos: KLING_MAX_REFERENCE_VIDEOS,
    durations: [5, 10, 15],
    resolutions: ["720p", "1080p"],
  },
  {
    id: "kling-o3-pro-v2v",
    name: "Kling O3 Reference Pro",
    endpoint: "fal-ai/kling-video/o3/pro/video-to-video/reference",
    quality: "Maximum detail",
    cost: "$0.168/s",
    usesReferenceVideo: true,
    maxReferenceVideos: KLING_MAX_REFERENCE_VIDEOS,
    durations: [5, 10, 15],
    resolutions: ["720p", "1080p"],
  },
];

// 默认仍然用 MiniMax H3：Seedance 2.5 是列表里最强也最贵的模型
// （10 秒 720p 就要 25 积分），如果做成默认，只买最小包的用户一点生成
// 就会余额不足。列表顺序依旧把多参考模型排在最前面。
export const DEFAULT_MODEL_ID = "minimax-h3";

// Kling O3 Reference 的提示词。
// 关键点：
// 1. @Video1 是参考动作模板，@Element1 是用户上传的人物（通过 elements 字段传入）。
// 2. 动作保真优先级最高——用户买的就是"原版舞蹈 + 我自己的脸"。
// 3. 明确列出禁止项，抵消模型常见的多手、糊脸、加字幕等劣化。
export const TEMPLATE_PROMPT = `
Shot type: customize. @Video1 is the motion, scene and audio reference. @Element1 is the subject to animate.

TASK
Animate the subject from @Element1 using the movement, timing and camera work of @Video1. Keep the choreography, environment and audio of @Video1 intact.

MOTION - highest priority
- Reproduce the moves, gesture timing, body rotation, head bobbing and footwork of @Video1 frame by frame.
- Keep the original camera angle, movement, framing, focal length, zoom and handheld shake.
- Keep the scene unchanged: floor, walls, lighting, signs, equipment, props and background.
- Keep the original length, beat and audio so the output stays in sync.
- The subject moves and reacts naturally, matching the rhythm of @Video1.

SUBJECT CONSISTENCY
- The subject must clearly match @Element1: shape, silhouette, proportions, colours, markings and distinguishing features.
- Keep the subject sharp and consistent for the whole clip. No morphing, warping, melting or blurring.
- Only the subject from @Element1 is shown. Do not introduce or replicate any other figure from @Video1.

REALISM - match the reference look
- Realistic vertical 9:16 footage with a handheld phone-camera feel: slight camera shake, imperfect framing, changing exposure, motion blur, low-light noise and social-media compression.
- Match the lighting and colour temperature of @Video1 so the subject sits naturally in the scene.
- Not cinematic, not studio lit.

QUALITY
- Correct anatomy for the subject, stable limbs, no extra or missing body parts.
- Match the light direction and colour temperature of @Video1.
- Subject fully in frame, head not cropped.

DO NOT
- distorted shape, subject drift, a different subject, warped body, extra or missing limbs, flicker, sudden cuts.
- No text, subtitles, captions, logos, watermarks, UI overlays or borders.
- Do not change or mute the original audio.

`.trim();

// Seedance 2.5 (US) reference-to-video 的提示词。
// 该端点用 @Image1 / @Video1 / @Audio1 指代参考素材，最多 10 个参考视频
// （合计 <= 30.2 秒），原生支持 9:16 和 1080p，并会生成同步音频。
export const SEEDANCE_25_TEMPLATE_PROMPT = `
@Image1 is the subject to animate. @Video1 is the motion, scene and audio reference.

TASK
Animate the subject from @Image1 using the movement, timing and camera work of @Video1, keeping the choreography, environment and audio of @Video1 intact.

MOTION - highest priority
- Reproduce the dance moves, gesture timing, body rotation, head bobbing and footwork of @Video1 frame by frame.
- Keep the original camera angle, movement, framing, focal length, zoom and handheld shake.
- Keep the scene unchanged: floor, walls, lighting, signs, equipment, props and background.
- Keep the original length, beat and audio so the output stays in sync.
- The subject moves and reacts naturally, matching the rhythm of @Video1.

SUBJECT CONSISTENCY
- The subject must clearly match @Image1: shape, silhouette, proportions, colours, markings and distinguishing features.
- Keep the subject sharp and consistent for the whole clip. No morphing, warping, melting or blurring.
- Only the subject from @Image1 is shown. Do not introduce or replicate any other figure from @Video1.

REALISM - match the reference look
- Realistic vertical 9:16 footage with a handheld phone-camera feel: slight camera shake, imperfect framing, changing exposure, motion blur, low-light noise and social-media compression.
- Match the lighting and colour temperature of @Video1 so the subject sits naturally in the scene.
- Not cinematic, not studio lit.

QUALITY
- Correct anatomy for the subject, stable limbs, no extra or missing body parts.
- Match the light direction and colour temperature of @Video1.
- Subject fully in frame, head not cropped.

DO NOT
- distorted shape, subject drift, a different subject, warped body, extra or missing limbs, flicker, sudden cuts.
- No text, subtitles, captions, logos, watermarks, UI overlays or borders.
- Do not change or mute the original audio.

`.trim();

export function buildSeedance25TemplatePrompt(videoCount: number) {
  const count = Math.max(
    1,
    Math.min(videoCount, SEEDANCE_25_MAX_REFERENCE_VIDEOS),
  );
  if (count === 1) return SEEDANCE_25_TEMPLATE_PROMPT;

  const labels = Array.from(
    { length: count },
    (_, index) => `@Video${index + 1}`,
  ).join(", ");

  return `${SEEDANCE_25_TEMPLATE_PROMPT}

MULTI-CLIP MOTION REFERENCE
You are given ${count} consecutive motion reference clips: ${labels}.
Use them in order as the motion source: @Video1 for the opening, the next clip for the following beat, and so on across the full output length.
Take the scene, lighting, colour and camera style from @Video1 and keep that look consistent for the whole video.
Follow the choreography, timing and energy of the clips, but keep one subject and one continuous take. Do not cut between the clips, do not stitch them together, and do not create scene changes.`;
}

// MiniMax H3 reference-to-video 的提示词。
// 该模型用 "Image 1 / Video 1 / Audio 1" 指代参考素材（没有 @ 前缀）。
export const MINIMAX_TEMPLATE_PROMPT = `
Animate the subject from Image 1 using the movement and timing of Video 1.

Keep Video 1's choreography, gesture timing, camera movement, framing, handheld shake and rhythm exactly.
Keep the original scene, background, lighting and colours unchanged.
The subject must match Image 1: shape, silhouette, proportions, colours, markings and distinguishing features, and stay sharp and consistent for the whole clip.
Do not redesign the subject and do not introduce or replicate any other figure from Video 1.

Realism: realistic vertical 9:16 footage with a handheld phone-camera feel: slight camera shake, imperfect framing, changing exposure, motion blur, low-light noise and social-media compression. Match the lighting of Video 1 so the subject sits naturally in the scene. Not cinematic, not studio lit.

The subject moves and reacts naturally. Keep the original audio and stay in sync with the beat.

Correct anatomy for the subject, stable limbs, no extra or missing body parts. Subject fully in frame, not cropped.

Do not produce: distorted shape, subject drift, a different subject, warped body, extra or missing limbs, flicker, sudden cuts, text, subtitles, captions, logos, watermarks or borders. Do not change or mute the music.
`.trim();

// 按时长挑选参考片段：5 秒给 1 个、10 秒给 2 个、15 秒给 3 个。
// 给多了会让模型在短输出里硬塞动作，给少了它要靠想象补动作。
// maxClips 用各模型自己的上限。
export function referenceClipCount(duration: number, maxClips: number) {
  const cap = Math.max(0, Math.floor(maxClips));
  if (cap === 0) return 0;
  return Math.max(1, Math.min(Math.round(duration / 5), cap));
}

export function selectReferenceVideosForDuration(
  urls: readonly string[],
  duration: number,
  maxClips: number = MINIMAX_MAX_REFERENCE_VIDEOS,
) {
  const wanted = referenceClipCount(duration, maxClips);
  return urls.slice(0, Math.min(wanted, urls.length));
}

// MiniMax H3 支持最多 3 个参考视频。多个视频时，在基础提示词后追加一段
// 多片段说明，明确主参考片和辅助参考片各自的作用，并要求输出为一条连续表演。
export function buildMinimaxTemplatePrompt(videoCount: number) {
  const count = Math.max(
    1,
    Math.min(videoCount, MINIMAX_MAX_REFERENCE_VIDEOS),
  );
  if (count === 1) return MINIMAX_TEMPLATE_PROMPT;

  const labels = Array.from(
    { length: count },
    (_, index) => `Video ${index + 1}`,
  ).join(", ");

  return `${MINIMAX_TEMPLATE_PROMPT}

MULTI-CLIP MOTION REFERENCE
You are given ${count} motion reference clips: ${labels}. They are consecutive segments of the same kind of performance.
Use them in order as the motion source: Video 1 for the opening, the next clip for the following beat, and so on across the full output length.
Take the scene, lighting, colour and camera style from Video 1 and keep that look consistent for the whole video.
Follow the choreography, timing and energy of the clips, but keep one subject and one continuous take. Do not cut between the clips, do not stitch them together, and do not create scene changes.`;
}

// 通用负面提示词。Kling O3 Reference 与 MiniMax H3 的端点若不接受独立的
// negative_prompt 字段，这些禁止项已经内嵌在上面两条提示词的 DO NOT 段落里，
// 效果等价；如果确认某个端点支持 negative_prompt，可以直接把这段传进去。
export const NEGATIVE_PROMPT = `
blurry subject, changing appearance, different subject, distorted shape, warped body, extra or missing limbs, flickering, sudden cuts, unnatural movement, plastic texture, unrealistic lighting, perfect studio quality, fake background, low quality AI artifacts, text, subtitles, captions, logos, watermarks
`.trim();
