import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VideoBulin47",
    short_name: "Bulin47 AI",
    description:
      "Recast the Bulin 47 freestyle with the person from your portrait, ready for TikTok, Reels, and Shorts.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#090a09",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
