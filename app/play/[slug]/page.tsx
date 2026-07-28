import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSpace, GameCard } from "@/components/game-card";
import { GameExperience } from "@/components/game-experience";
import { PageShell } from "@/components/site-shell";
import { games, getGame, getRelatedGames } from "@/data/games";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description,
    openGraph: { title: `${game.title} | 딱정해`, description: game.description, type: "website" },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  const related = getRelatedGames(game);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: game.title,
    description: game.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="play-hero" style={{ "--play-accent": game.accent } as React.CSSProperties}>
        <div className="shell">
          <div className="breadcrumbs"><Link href="/">홈</Link><span>›</span><Link href={`/games?category=${game.category}`}>{game.category}</Link><span>›</span><b>{game.shortTitle}</b></div>
          <div className="play-title-row">
            <div>
              <span className="play-eyebrow">{game.eyebrow}</span>
              <h1>{game.title}</h1>
              <p>{game.description}</p>
              <div className="play-tags">{game.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </div>
            <div className="play-hero-emoji" aria-hidden>{game.emoji}</div>
          </div>
        </div>
      </section>

      <section className="shell play-layout">
        <div className="play-main">
          <div className="game-window" id="game-start">
            <div className="game-window-bar">
              <span><i /> LIVE GAME</span>
              <b>딱정해</b>
            </div>
            <GameExperience game={game} />
          </div>

          <AdSpace />

          <article className="game-guide">
            <span className="section-number">HOW TO PLAY</span>
            <h2>이렇게 사용해요</h2>
            <div className="steps">
              {game.instructions.map((instruction, index) => (
                <div key={instruction}><b>{String(index + 1).padStart(2, "0")}</b><p>{instruction}</p></div>
              ))}
            </div>
            <div className="guide-copy">
              <h3>{game.shortTitle}, 이런 순간에 딱 맞아요</h3>
              <p>{game.longDescription}</p>
              <p>딱정해의 모든 결과는 재미와 원활한 대화를 위한 참고용입니다. 금전이나 안전에 관련된 결정은 참여자가 함께 동의한 범위에서 사용해 주세요.</p>
            </div>
          </article>
        </div>
        <aside className="play-sidebar">
          <div className="side-note">
            <span>PLAY TIP</span>
            <strong>결과보다<br />이유가 더 재밌어요.</strong>
            <p>친구들과 결과를 공유하고 서로의 선택을 비교해 보세요.</p>
          </div>
          <AdSpace variant="box" />
        </aside>
      </section>

      <section className="related-section">
        <div className="shell">
          <div className="section-heading compact"><div><span>NEXT GAME</span><h2>이것도 같이<br />해볼까요?</h2></div><Link href="/games">모든 게임 보기 ↗</Link></div>
          <div className="game-grid four-grid">{related.map((item) => <GameCard key={item.slug} game={item} />)}</div>
        </div>
      </section>
    </PageShell>
  );
}
