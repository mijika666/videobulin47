import type { MetadataRoute } from "next";
import { contentPages } from "@/content/pages";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "daily" as const },
    {
      url: absoluteUrl("/pricing"),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      // 机器可读价格文件，方便 AI 代理直接解析定价。
      url: absoluteUrl("/pricing.md"),
      priority: 0.5,
      changeFrequency: "weekly" as const,
    },
  ];

  const content = Object.values(contentPages).map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: now,
    priority: page.kind === "legal" ? 0.3 : 0.8,
    changeFrequency: page.kind === "legal" ? ("yearly" as const) : ("weekly" as const),
  }));

  const spanish = [
    { url: absoluteUrl("/es"), priority: 0.8, changeFrequency: "weekly" as const },
    {
      url: absoluteUrl("/es/como-hacer-video-bulin-47-ia"),
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: absoluteUrl("/es/tendencia-bulin-47-ia"),
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
  ];

  return [
    ...fixed.map((item) => ({ ...item, lastModified: now })),
    ...content,
    ...spanish.map((item) => ({ ...item, lastModified: now })),
  ];
}
