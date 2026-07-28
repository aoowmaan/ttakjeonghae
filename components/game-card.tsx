import Link from "next/link";
import type { Game } from "@/data/games";

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
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;
  return (
    <aside className={`ad-space ad-space-${variant}`} aria-label="광고 영역">
      <span>ADVERTISEMENT</span>
      <p>콘텐츠와 안전하게 분리된 광고 영역</p>
    </aside>
  );
}
