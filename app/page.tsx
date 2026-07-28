import Link from "next/link";
import { AdSpace, GameCard } from "@/components/game-card";
import { PageShell } from "@/components/site-shell";
import { categories, games } from "@/data/games";

export default function Home() {
  const featured = games.filter((game) => game.featured).slice(0, 6);
  const travel = games.filter((game) => game.category === "여행").slice(0, 4);
  const social = games.filter((game) => ["친구", "테스트", "월드컵"].includes(game.category)).slice(0, 4);
  const daily = games[new Date().getDate() % games.length];

  return (
    <PageShell>
      <section className="hero">
        <div className="hero-noise" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="eyebrow-pill"><span>●</span> 지금 {games.length}개의 결정이 준비됐어요</div>
            <h1>고민은 짧게,<br /><em>재미는 길게.</em></h1>
            <p>친구들과 뭘 먹을지, 누가 낼지, 어디로 갈지.<br />애매한 모든 순간을 가볍고 공정하게 정해드려요.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/play/who-pays-card">대표 게임 시작 <span>→</span></Link>
              <Link className="button-text" href="/games">모든 게임 둘러보기 <span>↗</span></Link>
            </div>
          </div>
          <div className="hero-deck" aria-label="대표 게임 미리보기">
            <div className="floating-note note-one">누가 살까?</div>
            <div className="floating-note note-two">딱 정해!</div>
            <Link href="/play/who-pays-card" className="hero-card hero-card-back">
              <span>02</span><b>딱!</b><small>PICK A CARD</small>
            </Link>
            <Link href="/play/who-pays-card" className="hero-card hero-card-front">
              <span className="hero-card-number">01</span>
              <div>💳</div>
              <small>오늘의 결제 담당</small>
              <strong>누가 낼까?</strong>
              <i>카드를 뒤집어 확인</i>
            </Link>
            <div className="hero-stamp">NO MORE<br />눈치게임</div>
          </div>
        </div>
        <div className="marquee" aria-hidden>
          <div>룰렛을 돌리고 · 카드를 뒤집고 · 취향을 발견하고 · 여행을 더 재밌게 · 친구와 함께 · 룰렛을 돌리고 · 카드를 뒤집고 · 취향을 발견하고 ·</div>
        </div>
      </section>

      <section className="category-strip">
        <div className="shell">
          <p>오늘은 뭘 정해볼까요?</p>
          <div>
            {categories.slice(1).map((category) => (
              <Link key={category.label} href={`/games?category=${category.label}`}>
                <span>{category.emoji}</span><b>{category.label}</b><i>↗</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><span>01 / 지금 인기</span><h2>다들 지금<br />이걸 하고 있어요</h2></div>
          <p>많이 플레이한 게임부터 가볍게 시작해 보세요.<br />가입도, 설명서도 필요 없어요.</p>
          <Link href="/games">전체 보기 ↗</Link>
        </div>
        <div className="game-grid featured-grid">
          {featured.map((game, index) => <GameCard key={game.slug} game={game} size={index < 2 ? "large" : "regular"} />)}
        </div>
      </section>

      <div className="shell"><AdSpace /></div>

      <section className="daily-section">
        <div className="shell daily-grid">
          <div className="daily-copy">
            <span className="section-number">02 / 오늘의 딱!</span>
            <div className="daily-date"><b>{String(new Date().getMonth() + 1).padStart(2, "0")}</b><i>/</i><b>{String(new Date().getDate()).padStart(2, "0")}</b></div>
            <h2>매일 하나씩,<br />새로운 결정.</h2>
            <p>오늘의 추천은 날짜가 바뀌면 함께 바뀌어요. 가끔은 알고리즘보다 작은 우연을 믿어보세요.</p>
            <Link className="button-primary" href={`/play/${daily.slug}`}>오늘의 게임 열기 <span>→</span></Link>
          </div>
          <Link href={`/play/${daily.slug}`} className="daily-card" style={{ "--daily-accent": daily.accent } as React.CSSProperties}>
            <div className="daily-card-top"><span>TODAY&apos;S PICK</span><span>↗</span></div>
            <div className="daily-emoji">{daily.emoji}</div>
            <small>{daily.eyebrow}</small>
            <h3>{daily.title}</h3>
            <p>{daily.description}</p>
            <div className="daily-card-bottom"><span>{daily.category}</span><b>PLAY NOW</b></div>
          </Link>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading compact">
          <div><span>03 / 여행에서</span><h2>떠나면 더<br />쓸모 있는 것들</h2></div>
          <p>숙소에 도착한 순간부터 마지막 정산까지.<br />친구 여행의 작은 눈치게임을 없앴어요.</p>
          <Link href="/games?category=여행">여행 게임 전체 ↗</Link>
        </div>
        <div className="game-grid four-grid">
          {travel.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-inner">
          <span>THE RULE IS SIMPLE</span>
          <p>누군가의 선택이<br />모두의 <em>좋은 기억</em>이 되도록.</p>
          <div className="manifesto-badges">
            <i>01</i><b>가입 없이</b><i>02</i><b>설명 없이</b><i>03</i><b>눈치 없이</b>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading compact">
          <div><span>04 / 같이 놀기</span><h2>친할수록<br />더 재밌는 게임</h2></div>
          <p>결과보다 서로의 이유가 더 웃긴 테스트와<br />월드컵, 밸런스게임을 모았어요.</p>
          <Link href="/games?category=친구">같이 놀기 ↗</Link>
        </div>
        <div className="game-grid four-grid">
          {social.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </section>

      <section className="closing-cta">
        <div className="shell">
          <div><span>아직도 고민 중?</span><h2>그럼 일단<br /><em>돌려봐.</em></h2></div>
          <Link href="/play/decision-wheel" aria-label="결정 룰렛 시작"><span>START</span><b>↗</b></Link>
        </div>
      </section>
    </PageShell>
  );
}

