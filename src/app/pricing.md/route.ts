import { BASE_CREDIT_COST } from "@/config/economics";
import { CREDIT_PACKS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

// 给 AI 代理和自动化工具读的机器可读价格文件。
// 纯 Markdown、无需 JS 渲染、无登录墙，任何 LLM 都能直接解析。
export const dynamic = "force-static";

export function GET() {
  const durationLabel: Record<string, string> = {
    "5": "5 seconds",
    "10": "10 seconds",
    "15": "15 seconds",
  };

  const renderCosts = Object.entries(BASE_CREDIT_COST).flatMap(
    ([duration, byResolution]) =>
      Object.entries(byResolution).map(
        ([resolution, credits]) =>
          `- ${durationLabel[duration] ?? `${duration} seconds`} at ${resolution}: ${credits} credits`,
      ),
  );

  const lines = [
    "# Pricing - VideoBulin47",
    "",
    "VideoBulin47 generates a video bulin 47 clip from one uploaded image you own.",
    "Credit packs are one-time purchases. There is no subscription and no recurring charge.",
    "All prices are in USD. Waffo Pancake is the merchant of record and handles applicable tax.",
    "",
    "## Credit packs",
    "",
  ];

  for (const pack of CREDIT_PACKS) {
    lines.push(`### ${pack.name}${pack.badge ? ` (${pack.badge})` : ""}`);
    lines.push(`- Price: ${pack.priceLabel} (one-time)`);
    lines.push(`- Credits: ${pack.credits}`);
    lines.push(`- Note: ${pack.description}`);
    for (const item of pack.includes) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  lines.push("## Credits a single render reserves (720p baseline)");
  lines.push(...renderCosts);
  lines.push("- 1080p reserves more credits than 720p.");
  lines.push(
    "- Higher-cost models (Kling O3 Reference Pro, MiniMax H3) reserve more credits.",
  );
  lines.push(
    "- The exact reservation is shown in the Studio before a job is submitted.",
  );
  lines.push("");
  lines.push("## Rules");
  lines.push("- Credits never expire.");
  lines.push(
    "- Failed, canceled or moderated renders return the reserved credits automatically.",
  );
  lines.push(
    `- Unused credits can be refunded within 7 days of purchase. Full policy: ${absoluteUrl("/refund")}`,
  );
  lines.push("");
  lines.push("## Links");
  lines.push(`- Pricing page: ${absoluteUrl("/pricing")}`);
  lines.push(`- Refund policy: ${absoluteUrl("/refund")}`);
  lines.push(`- Terms of service: ${absoluteUrl("/terms")}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
