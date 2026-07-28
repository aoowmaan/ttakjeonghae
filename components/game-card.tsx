import Link from "next/link";
import type { Game } from "@/data/games";
import { AdUnit } from "./ad-unit";

export function GameCard({ game, size = "regular" }: { game: Game; size?: "regular" | "large" }) {
  return (
    <Link
      href={`/play/${game.slug}`}
      className={`game-card game-card-${size}`}
      style={{ "--card-accent": game.accent } as React.CSSProperties}
    >
      <div className="card-topline">
        <span>{game.eyebrow}</span>
        {game.fresh ? <b>NEW</b> : <span className="card-arrow">↗</span>}
      </div>
      <div className="game-card-emoji" aria-hidden>{game.emoji}</div>
      <div className="game-card-copy">
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </div>
      <div className="card-meta">
        <span>{game.category}</span>
        <span>가입 없이 시작</span>
      </div>
    </Link>
  );
}

export function AdSpace({ variant = "wide" }: { variant?: "wide" | "box" }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = variant === "box"
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX
    : process.env.NEXT_PUBLIC_ADSENSE_SLOT_WIDE;
  if (!client || !slot) return null;
  return <AdUnit client={client} slot={slot} variant={variant} />;
}
