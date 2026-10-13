import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VideoBulin47",
    short_name: "Bulin47 AI",
    description:
      "Create a Bulin 47 AI video from one photo for TikTok, Reels, and Shorts.",
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
