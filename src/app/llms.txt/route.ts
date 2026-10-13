import { contentPages } from "@/content/pages";
import { absoluteUrl } from "@/lib/utils";

export function GET() {
  const lines = [
    "# VideoBulin47",
    "",
    "VideoBulin47 is an independent one-photo AI video tool for the Bulin 47 freestyle trend.",
    "It creates a vertical MP4 from one portrait and a reference video template.",
    "",
    "## Pages",
    `- ${absoluteUrl("/")}: Bulin 47 AI video generator`,
    `- ${absoluteUrl("/pricing")}: Credit pack pricing`,
    `- ${absoluteUrl("/studio")}: Login-gated generation studio`,
    ...Object.values(contentPages).map(
      (page) => `- ${absoluteUrl(`/${page.slug}`)}: ${page.description}`,
    ),
    "",
    "## Policies",
    "- Only consenting adults may be uploaded.",
    "- Outputs must be labeled as AI-generated when posted.",
    "- The service is not affiliated with Bulin 47, Kevin Wai, their labels, or social platforms.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
