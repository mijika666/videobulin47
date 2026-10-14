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
  // 竞品参考：一条 15 到 19 秒视频约 $9.90-$9.99。
  {
    id: "starter",
    name: "Single",
    credits: 10,
    priceCents: 999,
    priceLabel: "$9.99",
    description: "Try one video. Billed once. Credits never expire.",
    includes: [
      "Includes 10 credits",
      "About 1 video at 720p",
      "Credits never expire",
      "Original sound + silent copy",
      "No watermark",
      "Failed renders refunded automatically",
    ],
    envKey: "waffoProductSingle",
  },
  // 竞品参考：三条约 $19.90-$24.99。
  {
    id: "creator",
    name: "Trio",
    credits: 30,
    priceCents: 2499,
    priceLabel: "$24.99",
    description: "$8.33 a video. Billed once. Credits never expire.",
    includes: [
      "Includes 30 credits",
      "About 3 videos at 720p or 1 in 1080p HD",
      "Credits never expire",
      "Original sound + silent copy",
      "No watermark",
      "Failed renders refunded automatically",
    ],
    badge: "Recommended",
    envKey: "waffoProductTrio",
  },
  // 竞品参考：五到十条约 $29.90-$69.99。
  {
    id: "studio",
    name: "Crew",
    credits: 100,
    priceCents: 6999,
    priceLabel: "$69.99",
    description: "$7.00 a video. Billed once. Credits never expire.",
    includes: [
      "Includes 100 credits",
      "About 10 videos at 720p or 4 in 1080p HD",
      "Credits never expire",
      "Original sound + silent copy",
      "No watermark",
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
// - Kling O3 Reference / Pro：video_url 是单个 string，只能 1 个。
// - MiniMax H3：reference_video_urls 是数组，maxItems = 3。
// - Seedance 1.0 Lite：只有 reference_image_urls，没有任何参考视频字段，所以是 0。
export const KLING_MAX_REFERENCE_VIDEOS = 1;
export const MINIMAX_MAX_REFERENCE_VIDEOS = 3;

export type VideoModel = {
  id: string;
  name: string;
  endpoint: string;
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
    id: "minimax-h3",
    name: "MiniMax H3",
    endpoint: "minimax/h3/reference-to-video",
    quality: "Up to 3 reference clips",
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
    quality: "Maximum likeness",
    cost: "$0.168/s",
    usesReferenceVideo: true,
    maxReferenceVideos: KLING_MAX_REFERENCE_VIDEOS,
    durations: [5, 10, 15],
    resolutions: ["720p", "1080p"],
  },
  {
    id: "seedance-v1-lite-r2v",
    name: "Seedance 1.0 Lite",
    endpoint: "fal-ai/bytedance/seedance/v1/lite/reference-to-video",
    quality: "Photo reference only",
    cost: "$0.04/s",
    usesReferenceVideo: false,
    maxReferenceVideos: 0,
    durations: [5, 10],
    resolutions: ["720p"],
  },
];

export const DEFAULT_MODEL_ID = "minimax-h3";

// Kling O3 Reference 的提示词。
// 关键点：
// 1. @Video1 是参考动作模板，@Element1 是用户上传的人物（通过 elements 字段传入）。
// 2. 动作保真优先级最高——用户买的就是"原版舞蹈 + 我自己的脸"。
// 3. 明确列出禁止项，抵消模型常见的多手、糊脸、加字幕等劣化。
export const TEMPLATE_PROMPT = `
Shot type: customize. @Video1 is the motion, scene and audio reference. @Element1 is the performer identity.

TASK
Replace the original performer in @Video1 with the person in @Element1. Keep the clip's choreography, camera work, environment, timing and audio exactly.

MOTION - highest priority
- Reproduce the moves, gesture timing, body rotation, head bobbing and footwork of @Video1 frame by frame.
- Keep the original camera angle, movement, framing, focal length, zoom and handheld shake.
- Keep the scene unchanged: crowd, floor, walls, neon lighting, signs, equipment and props.
- Keep the original length, beat and audio so the output stays in sync.
- The performer talks, gestures with their hands and interacts with people exactly like the original.

IDENTITY
- The performer must clearly look like @Element1: face shape, eyes, nose, mouth, hairstyle, facial hair, skin tone, age and gender presentation.
- Preserve body build and height proportions relative to the scene.
- Keep the clothing and accessories from @Video1 unless @Element1 shows a distinctive outfit to keep.
- The face must stay sharp and consistent. No identity drift, morphing, melting or blurring.

REALISM - match the reference look
- Ultra-realistic vertical smartphone footage, 9:16, shot on a phone in a crowded nightlife event.
- Dark club atmosphere, red neon light on the face, shadows from surrounding people, realistic skin texture and natural expressions.
- Authentic leaked-phone feel: slight camera shake, imperfect framing, changing exposure, autofocus hunting, motion blur, low-light noise, social-media compression.
- Not cinematic, not studio lit, not CGI.

QUALITY
- Five fingers per hand, stable limbs, correct anatomy, no extra or missing body parts.
- Match the light direction and colour temperature of @Video1.
- Subject fully in frame, head not cropped.

DO NOT
- cartoon, CGI, 3D render, plastic or airbrushed skin, beauty filter, studio lighting, fake background.
- distorted face, changing identity, different person, inconsistent features, extra fingers, warped body, flicker, sudden cuts.
- No text, subtitles, captions, logos, watermarks, UI overlays or borders.
- Do not change or mute the original audio.

Only one consenting adult is shown.
`.trim();

// MiniMax H3 reference-to-video 的提示词。
// 该模型用 "Image 1 / Video 1 / Audio 1" 指代参考素材（没有 @ 前缀）。
export const MINIMAX_TEMPLATE_PROMPT = `
Replace the performer in Video 1 with the person shown in Image 1.

Keep Video 1's choreography, gesture timing, camera movement, framing, handheld shake and rhythm exactly.
Keep the original scene, crowd, background, lighting and neon colours unchanged.
The performer must match Image 1's face, hairstyle, skin tone, age and gender presentation, and keep a sharp, consistent, recognizable face for the whole clip.
Preserve the exact identity from Image 1: do not redesign the person, keep facial proportions, eyes, nose, mouth and unique features.

Realism: ultra-realistic vertical smartphone footage, 9:16, shot on a phone inside a crowded nightlife event. Dark club atmosphere, red neon light reflecting on the face, natural skin texture, realistic expressions, authentic leaked-phone-video feeling with slight camera shake, imperfect framing, changing exposure, autofocus hunting, motion blur, low-light noise and social-media compression. Not cinematic, not studio lit, not CGI.

The performer talks and gestures naturally and interacts with nearby people. Keep the original audio and stay in sync with the beat.

Correct anatomy, five fingers per hand, stable limbs, no extra or missing body parts. Subject fully in frame, head not cropped.

Do not produce: cartoon, CGI, 3D render, plastic or airbrushed skin, beauty filter, perfect studio lighting, fake background, distorted face, identity drift, different person, extra fingers, warped body, flicker, sudden cuts, text, subtitles, captions, logos, watermarks or borders. Do not change or mute the music.

Only one consenting adult is shown.
`.trim();

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
You are given ${count} motion reference clips: ${labels}.
Treat Video 1 as the primary choreography, timing and scene reference. Use the remaining clips only as extra references for body movement, energy, camera handling and crowd interaction.
Blend them into one continuous performance. Do not cut between the clips, do not stitch them together, and do not introduce scene changes.`;
}

// Seedance 1.0 Lite reference-to-video 的提示词。
// 重要：这个端点的输入只有 reference_image_urls，没有任何参考视频字段，
// 所以它不会跟随 Bulin 47 的动作模板，舞蹈只能靠文字描述生成。
export const SEEDANCE_TEMPLATE_PROMPT = `
Use the person in Image 1 as the main character. Keep their exact identity: face shape, eyes, nose, mouth, hairstyle, skin tone, age and gender presentation. The face must stay sharp, consistent and recognizable for the whole clip.

Scene: a crowded nightlife event, dark club atmosphere with red neon light on the face and shadows from surrounding people. Shot as ultra-realistic vertical smartphone footage, 9:16, handheld with slight camera shake, imperfect framing, changing exposure, autofocus hunting, motion blur, low-light noise and social-media compression. Not cinematic, not studio lit, not CGI.

Action: the person dances a confident freestyle routine, moving naturally, with expressive hands, head movement and footwork, interacting with the people around them.

Quality: photorealistic, natural skin texture, correct human anatomy, five fingers per hand, stable limbs, no extra or missing body parts. Subject fully in frame, head not cropped.

Do not add: cartoon, CGI, 3D render, plastic or airbrushed skin, beauty filter, studio lighting, fake background, distorted face, identity drift, different person, inconsistent features, extra fingers, warped body, flicker, sudden cuts, text, subtitles, captions, logos, watermarks or borders.

Only one consenting adult is shown.
`.trim();

// 通用负面提示词。Kling O3 Reference 与 MiniMax H3 的端点若不接受独立的
// negative_prompt 字段，这些禁止项已经内嵌在上面两条提示词的 DO NOT 段落里，
// 效果等价；如果确认某个端点支持 negative_prompt，可以直接把这段传进去。
export const NEGATIVE_PROMPT = `
cartoon, CGI, 3D render, artificial face, plastic skin, beauty filter, unrealistic lighting, perfect studio quality, fake background, distorted face, changing identity, different person, inconsistent facial features, extra fingers, unnatural movement, blurry face, warped body, low quality AI artifacts, text, subtitles, captions, logos, watermarks
`.trim();
