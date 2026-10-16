import { contentPages } from "@/content/pages";
import { CREDIT_PACKS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export function GET() {
  const lines = [
    "# VideoBulin47",
    "",
    "> VideoBulin47 is a video bulin 47 generator: it animates one uploaded image of a pet, animal or virtual character into a vertical 9:16 video with sound.",
    "",
    "VideoBulin47 is an independent, fan-made web app. It is not affiliated with Bulin 47, Kevin Wai, their labels, or any social platform. The product is sold as one-time credit packs with no subscription.",
    "",
    "## What it does",
    "- Input: one image of a non-human subject - a pet, an animal or a virtual character (JPG, PNG or WebP, up to 10MB).",
    "- No reference video upload: motion comes from the platform's built-in clip library and the prompt.",
    "- Output: a vertical 9:16 MP4, 5, 10 or 15 seconds, at 720p or 1080p.",
    "- No watermark. Jobs and downloads stay in your account history.",
    "- Failed renders return the reserved credits automatically; purchased credits never expire.",
    "",
    "## Models",
    "Generation runs on third-party models served through the fal.ai inference platform:",
    "- Seedance 2.5 (ByteDance) - bytedance/seedance-2.5/us/reference-to-video - motion-driven, up to 10 reference clips",
    "- MiniMax H3 (MiniMax) - minimax/h3/reference-to-video - multi-reference, up to 3 clips",
    "- Kling O3 Reference (Kuaishou) - fal-ai/kling-video/o3/standard/video-to-video/reference",
    "- Kling O3 Reference Pro (Kuaishou) - fal-ai/kling-video/o3/pro/video-to-video/reference",
    "Users choose the model in the Studio, and each job records the model that produced it.",
    "",
    "## Pricing",
    `Machine-readable version: ${absoluteUrl("/pricing.md")}`,
    "One-time credit packs, no subscription, prices in USD:",
    ...CREDIT_PACKS.map(
      (pack) =>
        `- ${pack.name}: ${pack.priceLabel} for ${pack.credits} credits`,
    ),
    "Credits never expire. Failed generations are refunded automatically. Waffo Pancake is the merchant of record and handles applicable tax.",
    "",
    "## Key pages",
    `- ${absoluteUrl("/")}: Bulin 47 AI video generator`,
    `- ${absoluteUrl("/pricing")}: Credit pack pricing`,
    `- ${absoluteUrl("/studio")}: Login-gated generation studio`,
    `- ${absoluteUrl("/author")}: About Qbit, the founder of VideoBulin47`,
    ...Object.values(contentPages).map(
      (page) => `- ${absoluteUrl(`/${page.slug}`)}: ${page.description}`,
    ),
    "",
    "## Policies",
    "- Non-human subjects only. Photographs of real people, minors, celebrities and public figures are not accepted.",
    "- Nobody from the source motion footage is reused: every other person in the output is newly generated.",
    "- Outputs must be labeled as AI-generated when posted.",
    "- The service is not affiliated with Bulin 47, Kevin Wai, their labels, or social platforms.",
    "",
    "## Contact",
    "- Support and takedown requests: support@videobulin47.net",
    `- Robots policy: ${absoluteUrl("/robots.txt")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
