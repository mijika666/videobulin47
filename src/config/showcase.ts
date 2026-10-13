// 首页视频橱窗配置。
//
// 说明：
// 1. 视频已经放进 public/showcase/，Vercel 会直接作为静态资源提供。
// 2. 当前演示视频属于本项目已准备素材，licensedForProduction 为 true。
// 3. 以后要换视频，只需要替换 public/showcase/1.mp4、2.mp4、3.mp4。
// 4. poster 可选，没有 poster 时浏览器会等视频加载后显示首帧。
export type ShowcaseVideo = {
  id: string;
  label: string;
  note: string;
  src: string;
  poster?: string;
  sourceLabel: string;
  sourceUrl: string;
  licensedForProduction: boolean;
};

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: "freestyle-1",
    label: "One photo result",
    note: "Your face, the original freestyle.",
    src: "/showcase/1.mp4",
    sourceLabel: "Open the Studio",
    sourceUrl: "/studio",
    licensedForProduction: true,
  },
  {
    id: "freestyle-2",
    label: "Group chat cut",
    note: "A 15-second vertical clip for the chat.",
    src: "/showcase/2.mp4",
    sourceLabel: "Open the Studio",
    sourceUrl: "/studio",
    licensedForProduction: true,
  },
  {
    id: "freestyle-3",
    label: "TikTok ready",
    note: "9:16, sound included, no timeline.",
    src: "/showcase/3.mp4",
    sourceLabel: "Open the Studio",
    sourceUrl: "/studio",
    licensedForProduction: true,
  },
];
