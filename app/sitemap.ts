import type { MetadataRoute } from "next";
import { games } from "@/data/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttak.fun";
  const staticRoutes = ["", "/games", "/about", "/help", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...games.map((game) => ({ url: `${base}/play/${game.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: game.featured ? 0.9 : 0.75 })),
  ];
}

