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

export const TEMPLATE_PROMPT = `
Replace the main performer in @Video1 with the person shown in @Image1.
Keep the original camera movement, timing, dance motion, crowd, background,
and music. Match the reference person's face, hair, skin tone, clothing,
body proportions, and overall identity naturally. Use a vertical 9:16
TikTok-ready composition. Do not add text, logos, or watermarks.
`.trim();
