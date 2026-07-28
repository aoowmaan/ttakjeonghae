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
            <div className="eyebrow-pill"><span>●</span> {games.length}개 게임 · 설치 없이 바로 시작</div>
            <h1>모였으면,<br /><em>딱 재밌게.</em></h1>
            <p>월드컵을 만들고, 밸런스를 고르고, 룰렛을 돌려요.<br />설명은 10초면 충분하고 결과는 단톡방까지 이어집니다.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/play/custom-worldcup">나만의 월드컵 만들기 <span>＋</span></Link>
              <Link className="button-text" href="/games">지금 놀 거리 찾기 <span>↗</span></Link>
            </div>
            <div className="hero-quick-links">
              <span>바로 시작</span>
              <Link href="/play/chaos-balance">🤡 대환장 밸런스</Link>
              <Link href="/play/social-chaos-type">🦹 모임 빌런 테스트</Link>
              <Link href="/play/decision-wheel">🎡 결정 룰렛</Link>
            </div>
          </div>
          <div className="hero-deck" aria-label="대표 게임 미리보기">
            <div className="floating-note note-one">8강 → 4강 → 결승</div>
            <div className="floating-note note-two">직접 만들어!</div>
            <Link href="/play/custom-worldcup" className="hero-card hero-card-back">
              <span>VS</span><b>최애</b><small>WORLD CUP MAKER</small>
            </Link>
            <Link href="/play/custom-worldcup" className="hero-card hero-card-front">
              <span className="hero-card-number">FINAL</span>
              <div>🏆</div>
              <small>나만의 이상형 월드컵</small>
              <strong>우승은 누구?</strong>
              <i>후보를 넣고 링크로 공유</i>
            </Link>
            <div className="hero-stamp">MAKE IT<br />PLAY IT</div>
          </div>
        </div>
        <div className="marquee" aria-hidden>
          <div>룰렛을 돌리고 · 카드를 뒤집고 · 취향을 발견하고 · 여행을 더 재밌게 · 친구와 함께 · 룰렛을 돌리고 · 카드를 뒤집고 · 취향을 발견하고 ·</div>
        </div>
      </section>

      <section className="maker-banner shell">
        <div className="maker-banner-copy">
          <span>NEW · WORLD CUP STUDIO</span>
          <h2>우리만 아는 후보로<br />월드컵 하나 만들까요?</h2>
          <p>제목과 후보만 적으면 4강부터 32강까지 자동으로 대진을 만들어요. 작성 중인 목록은 저장되고, 링크 하나로 친구도 같은 월드컵을 플레이할 수 있습니다.</p>
          <Link className="button-primary" href="/play/custom-worldcup">지금 만들기 <span>→</span></Link>
        </div>
        <div className="maker-bracket" aria-hidden>
          <div><span>치킨</span><span>피자</span><b>치킨</b></div>
          <i>→</i>
          <div><span>초밥</span><span>마라탕</span><b>초밥</b></div>
          <i>→</i>
          <strong>🏆 치킨</strong>
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
