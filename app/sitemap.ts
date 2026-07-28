import type { MetadataRoute } from "next";
import { games } from "@/data/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttakjeonghae.vercel.app";
  const staticRoutes = ["", "/games", "/about", "/help", "/privacy", "/terms"];
  const lastModified = new Date("2026-07-28T00:00:00+09:00");
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...games.map((game) => ({ url: `${base}/play/${game.slug}`, lastModified, changeFrequency: "monthly" as const, priority: game.featured ? 0.9 : 0.75 })),
  ];
}
