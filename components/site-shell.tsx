import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="딱정해 홈">
      <span className="brand-mark">딱!</span>
      <span>정해</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <Link href="/games?category=결정">랜덤 결정</Link>
          <Link href="/games?category=친구">같이 놀기</Link>
          <Link href="/games?category=테스트">성향 테스트</Link>
          <Link href="/games?category=월드컵">월드컵</Link>
        </nav>
        <Link className="header-cta" href="/play/custom-worldcup">
          월드컵 만들기 <span aria-hidden>＋</span>
        </Link>
      </div>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="모바일 빠른 메뉴">
      <Link href="/"><span>⌂</span><b>홈</b></Link>
      <Link href="/games"><span>▦</span><b>게임</b></Link>
      <Link className="mobile-nav-main" href="/play/custom-worldcup"><span>＋</span><b>만들기</b></Link>
      <Link href="/games?category=테스트"><span>◇</span><b>테스트</b></Link>
      <Link href="/games?category=여행"><span>✈</span><b>여행</b></Link>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <Logo />
          <p className="footer-tagline">고민은 짧게, 기억은 길게.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>둘러보기</strong>
            <Link href="/games">모든 게임</Link>
            <Link href="/games?category=여행">여행 도구</Link>
            <Link href="/games?category=테스트">성향 테스트</Link>
          </div>
          <div>
            <strong>딱정해</strong>
            <Link href="/about">서비스 소개</Link>
            <Link href="/help">이용 안내</Link>
            <a href="https://github.com/aoowmaan/ttakjeonghae/issues" target="_blank" rel="noreferrer">문의하기</a>
          </div>
          <div>
            <strong>정책</strong>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Ttakjeonghae. All playful decisions reserved.</span>
        <span>결과는 재미로, 결정은 다정하게.</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <MobileNav />
    </>
  );
}
