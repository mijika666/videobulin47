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

export const MODELS = [
  {
    id: "kling-o3-standard-v2v",
    name: "Kling O3 Reference",
    endpoint: "fal-ai/kling-video/o3/standard/video-to-video/reference",
    quality: "Fast and stable",
    cost: "$0.126/s",
  },
  {
    id: "kling-o3-pro-v2v",
    name: "Kling O3 Reference Pro",
    endpoint: "fal-ai/kling-video/o3/pro/video-to-video/reference",
    quality: "Maximum likeness",
    cost: "$0.168/s",
  },
  {
    id: "minimax-h3",
    name: "MiniMax H3",
    endpoint: "minimax/h3/reference-to-video",
    quality: "2K alternative",
    cost: "$0.13/s",
  },
] as const;

export const DEFAULT_MODEL_ID = "kling-o3-standard-v2v";

// Kling O3 Reference 的提示词。
// 关键点：
// 1. @Video1 是参考动作模板，@Element1 是用户上传的人物（通过 elements 字段传入）。
// 2. 动作保真优先级最高——用户买的就是"原版舞蹈 + 我自己的脸"。
// 3. 明确列出禁止项，抵消模型常见的多手、糊脸、加字幕等劣化。
export const TEMPLATE_PROMPT = `
Shot type: customize. @Video1 is the motion reference. @Element1 is the performer identity.

TASK
Replace the original performer in @Video1 with the person shown in @Element1, keeping the exact choreography.

MOTION FIDELITY - highest priority
- Reproduce the dance moves, gesture timing, body rotation, head bobbing and footwork of @Video1 frame by frame.
- Keep the original camera angle, camera movement, framing, focal length and zoom.
- Keep the original scene unchanged: crowd, floor, walls, lighting, signs, equipment and props.
- Keep the original length and beat so the output stays in sync with the original audio.

IDENTITY FIDELITY
- The performer must clearly look like @Element1: face shape, eyes, nose, mouth, hairstyle, facial hair, skin tone, age and gender presentation.
- Preserve body build and height proportions relative to the scene.
- Keep the clothing, hairstyle and accessories from @Video1 unless @Element1 clearly shows a distinctive outfit that the user would expect to keep.
- The face must stay sharp and consistent for the whole clip. No identity drift, no face morphing, no melting or blurring features.

IMAGE QUALITY
- Photorealistic result with natural skin texture and correct human anatomy.
- Five fingers per hand, stable limbs, no extra or missing body parts.
- Match the light direction and colour temperature of @Video1 so the replacement looks native to the scene.
- Vertical 9:16 framing, subject fully inside the frame, head not cropped.

DO NOT
- No text, subtitles, captions, logos, watermarks, UI overlays, borders or letterboxing.
- No extra people, no duplicated limbs, no distorted hands, no flicker, no sudden cuts.
- Do not change the music, do not replace or mute the original audio.

Only one consenting adult is shown.
`.trim();

// MiniMax H3 reference-to-video 的提示词。
// 该模型用 "Image 1 / Video 1 / Audio 1" 指代参考素材（没有 @ 前缀）。
export const MINIMAX_TEMPLATE_PROMPT = `
Replace the performer in Video 1 with the person shown in Image 1.

Keep Video 1's choreography, gesture timing, camera movement, framing and rhythm exactly.
Keep the original scene, crowd, background and lighting unchanged.
The performer must match Image 1's face, hairstyle, skin tone, age and gender presentation, and keep a sharp consistent face for the whole clip.
Photorealistic, natural skin texture, correct anatomy, five fingers per hand.
Vertical 9:16 framing with the subject fully in frame.
Keep the original audio and stay in sync with the beat.
No text, subtitles, captions, logos, watermarks or borders. No extra people, no distorted hands, no flicker.
Only one consenting adult is shown.
`.trim();
