import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Time",
    short_name: "Time",
    description: "당신의 시간을 관리하세요.",
    theme_color: "#f8fafc",
    background_color: "#f8fafc",
    icons: [
      {
        src: "/android/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/ios/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/ios/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    orientation: "portrait-primary",
    display: "standalone",
    dir: "auto",
    lang: "ko-KR",
    start_url: "/",
  };
}