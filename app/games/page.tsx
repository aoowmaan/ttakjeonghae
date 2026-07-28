import type { Metadata } from "next";
import { Suspense } from "react";
import { GameLibrary } from "@/components/game-library";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "모든 게임",
  description: "결정 룰렛, 여행 도구, 밸런스게임, 성향 테스트와 월드컵을 한곳에서 만나보세요.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <PageShell>
      <section className="subpage-hero shell">
        <span>GAME LIBRARY</span>
        <h1>결정이 필요한<br /><em>모든 순간.</em></h1>
        <p>짧은 고민은 도구로, 긴 대화는 게임으로.<br />지금 필요한 하나를 골라보세요.</p>
      </section>
      <section className="shell library-section">
        <Suspense fallback={<div className="loading-block">게임을 정리하고 있어요…</div>}>
          <GameLibrary />
        </Suspense>
      </section>
    </PageShell>
  );
}
