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
Shot type: customize. @Video1 is the motion, scene and audio reference. @Element1 is the performer identity.

TASK
Replace the original performer in @Video1 with the person shown in @Element1. Keep the reference clip's choreography, camera work, environment, timing and audio exactly.

MOTION FIDELITY - highest priority
- Reproduce the dance moves, gesture timing, body rotation, head bobbing and footwork of @Video1 frame by frame.
- Keep the original camera angle, camera movement, framing, focal length, zoom and handheld shake.
- Keep the original scene unchanged: crowd, floor, walls, lighting, neon colours, signs, equipment and props.
- Keep the original length, beat and audio so the output stays in sync.
- The performer talks and gestures with their hands, and interacts naturally with the people around them, exactly like the original.

IDENTITY FIDELITY
- The performer must clearly look like @Element1: face shape, eyes, nose, mouth, hairstyle, facial hair, skin tone, age and gender presentation.
- Preserve body build and height proportions relative to the scene.
- Keep the clothing, hairstyle and accessories from @Video1 unless @Element1 clearly shows a distinctive outfit the user would expect to keep.
- The face must stay sharp and consistent for the whole clip. No identity drift, no face morphing, no melting or blurring features.

REALISM - match the reference look
- Ultra-realistic vertical smartphone footage, 9:16, captured on a phone inside a crowded nightlife event.
- Dark club atmosphere, red neon light reflecting on the face, shadows from surrounding people, realistic skin texture and natural facial expressions.
- Authentic leaked-phone-video feeling: slight camera shake, imperfect framing, changing exposure, autofocus hunting, natural motion blur, low-light noise and social-media compression artifacts.
- Not cinematic, not studio lit, not CGI, not a polished commercial.

QUALITY
- Five fingers per hand, stable limbs, correct human anatomy, no extra or missing body parts.
- Match the light direction and colour temperature of @Video1 so the replacement looks native to the scene.
- Subject fully inside the frame, head not cropped.

DO NOT
- cartoon, CGI, 3D render, plastic or airbrushed skin, beauty filter, perfect studio lighting, fake background.
- distorted face, changing identity, different person, inconsistent facial features, extra fingers, warped body, flicker, sudden cuts.
- No text, subtitles, captions, logos, watermarks, UI overlays, borders or letterboxing.
- Do not change the music, do not replace or mute the original audio.

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

// 通用负面提示词。Kling O3 Reference 与 MiniMax H3 的端点若不接受独立的
// negative_prompt 字段，这些禁止项已经内嵌在上面两条提示词的 DO NOT 段落里，
// 效果等价；如果确认某个端点支持 negative_prompt，可以直接把这段传进去。
export const NEGATIVE_PROMPT = `
cartoon, CGI, 3D render, artificial face, plastic skin, beauty filter, unrealistic lighting, perfect studio quality, fake background, distorted face, changing identity, different person, inconsistent facial features, extra fingers, unnatural movement, blurry face, warped body, low quality AI artifacts, text, subtitles, captions, logos, watermarks
`.trim();
