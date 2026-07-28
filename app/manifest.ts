import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "딱정해 — 고민은 짧게, 기억은 길게",
    short_name: "딱정해",
    description: "친구·커플·여행에서 바로 쓰는 무료 결정 게임과 테스트",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe5",
    theme_color: "#f4efe5",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
