// 关键词来源：Google Trends 全球数据，2026-09-13 至 2026-10-13。
// 主词固定为 "video bulin 47"，首页和其他页面都要围绕它做内链。

export const PRIMARY_KEYWORD = "video bulin 47";

export type KeywordIntent =
  | "transactional"
  | "commercial"
  | "informational"
  | "navigational";

export type KeywordTarget = {
  primary: string;
  secondary: string[];
  intent: KeywordIntent;
  relatedSlugs: string[];
};

// 每个页面只分配一个主关键词和一组辅助关键词。
// 这样可以避免关键词互相竞争，也能让内链构建只有一个配置来源。
export const KEYWORD_MAP: Record<string, KeywordTarget> = {
  home: {
    primary: "video bulin 47",
    secondary: [
      "bulin 47 video",
      "bulin 47 ai",
      "bulin47",
      "bullin 47",
    ],
    intent: "transactional",
    relatedSlugs: [
      "bulin-47-ai-video",
      "bulin-47-viral-video",
      "bulin-47-template",
      "how-to-make-bulin-47-ai-video",
      "dame-hombro",
      "kevin-wai-bulin-47",
      "bulin-47-ai-free",
    ],
  },
  "bulin-47-ai-video": {
    primary: "bulin 47 ai video",
    secondary: ["bulin 47 ai", "bulin 47 video", "video de bulin 47"],
    intent: "transactional",
    relatedSlugs: [
      "bulin-47-template",
      "how-to-make-bulin-47-ai-video",
      "bulin-47-ai-free",
      "higgsfield-bulin-47-ai",
    ],
  },
  "bulin-47-viral-video": {
    primary: "bulin 47 viral",
    secondary: [
      "bulin 47 video viral",
      "bulin 47 viral video",
      "bulin 47 instagram",
    ],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-original-video",
      "kevin-wai-bulin-47",
      "bulin-47-ai-trend",
      "how-to-make-bulin-47-ai-video",
    ],
  },
  "bulin-47-ai-trend": {
    primary: "bulin 47 trend",
    secondary: ["bulin 47 dembow", "dembow", "dominican republic"],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-viral-video",
      "bulin-47-original-video",
      "bulin-47-meme",
      "kevin-wai-bulin-47",
    ],
  },
  "how-to-make-bulin-47-ai-video": {
    primary: "como hacer el video de bulin 47",
    secondary: [
      "how to make bulin 47 ai video",
      "video de bulin 47",
      "bulin 47 ai video",
    ],
    intent: "transactional",
    relatedSlugs: [
      "bulin-47-ai-video",
      "bulin-47-template",
      "bulin-47-ai-free",
      "bulin-47-ai-vs-dreamina",
    ],
  },
  "bulin-47-template": {
    primary: "bulin 47 freestyle",
    secondary: ["bulin 47 template", "bulin 47 ai template"],
    intent: "commercial",
    relatedSlugs: [
      "bulin-47-ai-video",
      "bulin-47-freestyle-lyrics",
      "how-to-make-bulin-47-ai-video",
      "bulin-47-ai-vs-capcut",
    ],
  },
  "bulin-47-freestyle-lyrics": {
    primary: "bulin 47 freestyle lyrics",
    secondary: [
      "bulin 47 letra",
      "bulin 47 que no se le pare",
      "dame hombro lyrics",
    ],
    intent: "informational",
    relatedSlugs: [
      "dame-hombro",
      "how-to-add-bulin-47-sound",
      "bulin-47-original-video",
      "kevin-wai-bulin-47",
    ],
  },
  "bulin-47-original-video": {
    primary: "bulin 47 video",
    secondary: [
      "video de bulin 47",
      "kevin wai",
      "bulin 47 instagram",
      "bulin 47 bajo mundo",
    ],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-viral-video",
      "kevin-wai-bulin-47",
      "bulin-47-ai-trend",
      "bulin-47-freestyle-lyrics",
    ],
  },
  "kevin-wai-bulin-47": {
    primary: "kevin wai",
    secondary: ["kevin way", "kevincito", "bulin 47 video"],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-original-video",
      "bulin-47-viral-video",
      "bulin-47-ai-trend",
      "bulin-47-freestyle-lyrics",
    ],
  },
  "quien-es-bulin-47": {
    primary: "quien es bulin 47",
    secondary: [
      "bulin 47 edad",
      "edad de bulin 47",
      "bulin 47 age",
      "who is bulin 47",
      "bulin 47 wikipedia",
    ],
    intent: "informational",
    relatedSlugs: [
      "about",
      "bulin-47-freestyle-lyrics",
      "bulin-47-original-video",
      "bulin-47-ai-trend",
    ],
  },
  "dame-hombro": {
    primary: "dame hombro bulin 47",
    secondary: [
      "bulin 47 dame hombro",
      "dame hombro",
      "dame hombre",
      "dame hombro lyrics",
      "dame hombro lyrics english",
    ],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-freestyle-lyrics",
      "how-to-add-bulin-47-sound",
      "bulin-47-original-video",
      "bulin-47-ai-video",
    ],
  },
  "how-to-add-bulin-47-sound": {
    primary: "bulin 47 con sonido",
    secondary: ["bulin 47 sound", "dame hombro", "original sound"],
    intent: "informational",
    relatedSlugs: [
      "dame-hombro",
      "bulin-47-freestyle-lyrics",
      "bulin-47-ai-video",
      "pricing",
    ],
  },
  "bulin-47-meme": {
    primary: "bulin 47 meme",
    secondary: ["bulin 47 viral", "bulin 47 video viral"],
    intent: "informational",
    relatedSlugs: [
      "bulin-47-viral-video",
      "bulin-47-template",
      "bulin-47-ai-video",
      "pricing",
    ],
  },
  "bulin-47-ai-free": {
    primary: "bulin 47 ai free",
    secondary: ["bulin 47 ai price", "video bulin 47"],
    intent: "commercial",
    relatedSlugs: [
      "pricing",
      "bulin-47-ai-video",
      "higgsfield-bulin-47-ai",
      "faq",
    ],
  },
  "higgsfield-bulin-47-ai": {
    primary: "higgsfield bulin 47",
    secondary: ["higgsfield", "higgsfield ai"],
    intent: "commercial",
    relatedSlugs: [
      "bulin-47-ai-vs-dreamina",
      "bulin-47-ai-vs-capcut",
      "bulin-47-ai-vs-kling",
      "pricing",
    ],
  },
  "bulin-47-ai-vs-dreamina": {
    primary: "bulin 47 dreamina",
    secondary: ["dreamina", "dreamina ai"],
    intent: "commercial",
    relatedSlugs: [
      "higgsfield-bulin-47-ai",
      "bulin-47-ai-vs-capcut",
      "bulin-47-template",
      "pricing",
    ],
  },
  "bulin-47-ai-vs-capcut": {
    primary: "bulin 47 capcut",
    secondary: ["capcut", "bulin 47 con sonido"],
    intent: "commercial",
    relatedSlugs: [
      "how-to-add-bulin-47-sound",
      "bulin-47-ai-video",
      "bulin-47-ai-vs-dreamina",
      "pricing",
    ],
  },
  "bulin-47-ai-vs-kling": {
    primary: "kling ai bulin 47",
    secondary: ["kling ai", "genematic ai"],
    intent: "commercial",
    relatedSlugs: [
      "higgsfield-bulin-47-ai",
      "bulin-47-ai-vs-dreamina",
      "bulin-47-ai-video",
      "pricing",
    ],
  },
  faq: {
    primary: "bulin 47 ai free",
    secondary: [
      "who is bulin 47",
      "bulin 47 age",
      "bulin 47 wikipedia",
      "bulin 47 ai price",
    ],
    intent: "informational",
    relatedSlugs: [
      "quien-es-bulin-47",
      "pricing",
      "about",
      "bulin-47-ai-video",
    ],
  },
  about: {
    primary: "bulin 47 wikipedia",
    secondary: ["who is bulin 47", "quien es bulin 47"],
    intent: "informational",
    relatedSlugs: [
      "quien-es-bulin-47",
      "bulin-47-original-video",
      "bulin-47-ai-trend",
      "faq",
    ],
  },
  pricing: {
    primary: "bulin 47 ai price",
    secondary: ["bulin 47 ai free", "video bulin 47", "$9.99"],
    intent: "transactional",
    relatedSlugs: [
      "bulin-47-ai-video",
      "bulin-47-ai-free",
      "how-to-make-bulin-47-ai-video",
      "faq",
    ],
  },
};

// 这些是首页最值得展示的趋势词。
// 每个词都指向真实内容页，所以这个区块同时是关键词入口和内链枢纽。
export const TRENDING_SEARCHES = [
  { label: "video bulin 47", slug: "" },
  { label: "bulin 47 video", slug: "bulin-47-ai-video" },
  { label: "bulin 47 viral", slug: "bulin-47-viral-video" },
  { label: "bulin 47 ai", slug: "bulin-47-ai-video" },
  { label: "dame hombro bulin 47", slug: "dame-hombro" },
  { label: "video de bulin 47", slug: "bulin-47-ai-video" },
  { label: "bulin 47 freestyle", slug: "bulin-47-freestyle-lyrics" },
  { label: "bulin 47 letra", slug: "bulin-47-freestyle-lyrics" },
  { label: "kevin wai", slug: "kevin-wai-bulin-47" },
  { label: "bulin 47 meme", slug: "bulin-47-meme" },
  { label: "como hacer el video de bulin 47", slug: "how-to-make-bulin-47-ai-video" },
  { label: "quien es bulin 47", slug: "quien-es-bulin-47" },
  { label: "who is bulin 47", slug: "quien-es-bulin-47" },
  { label: "bulin 47 instagram", slug: "bulin-47-original-video" },
  { label: "higgsfield bulin 47", slug: "higgsfield-bulin-47-ai" },
  { label: "bulin 47 dreamina", slug: "bulin-47-ai-vs-dreamina" },
  { label: "bulin 47 capcut", slug: "bulin-47-ai-vs-capcut" },
  { label: "kling ai bulin 47", slug: "bulin-47-ai-vs-kling" },
] as const;

// 拼写错误和语言变体只做同义处理，不单独建薄页。
// 这样可以避免 doorway page 和重复内容问题。
export const KEYWORD_ALIASES = [
  "bullin 47",
  "bulim 47",
  "bullying 47",
  "polin 47",
  "kevin way",
  "kevincito",
  "dame hombre",
] as const;

// 这些词虽然出现在导出文件里，但与产品无关。
// 不要给它们建页面，也不要加内链。
export const EXCLUDED_KEYWORDS = [
  "genjutsu",
  "terremoto panama magnitud",
  "munición",
  "vin diesel y bulin 47",
] as const;
