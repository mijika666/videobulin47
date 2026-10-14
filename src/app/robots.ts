import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

// AI 引擎各自的爬虫。显式允许它们，内容才有机会被 ChatGPT、Perplexity、
// Claude、Copilot 和 Gemini 引用。用户要的是「被引用带来的流量」，所以这里
// 不做训练爬虫屏蔽；如果以后要阻止内容进训练集，再单独加 CCBot 规则。
// 注意：Google AI Overviews 走的是普通 Googlebot，不是 Google-Extended。
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
  "MistralAI-User",
];

const disallow = ["/api/", "/auth/", "/studio", "/dashboard", "/account"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
