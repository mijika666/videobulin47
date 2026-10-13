import { ImageResponse } from "next/og";

export const alt = "VideoBulin47 AI video generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090a09",
          color: "white",
          padding: "68px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: "#ff5722",
            }}
          >
            ▶
          </div>
          VideoBulin47
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 0.95,
              fontWeight: 900,
              maxWidth: 980,
            }}
          >
            Put your photo in the Bulin 47 freestyle.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#c9ff3f",
              fontWeight: 700,
            }}
          >
            One photo. One vertical AI video. Ready for the feed.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.45)" }}>
          videobulin47.net
        </div>
      </div>
    ),
    size,
  );
}
