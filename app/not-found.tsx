import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found shell">
        <span>404 · LOST DECISION</span>
        <div aria-hidden>🫥</div>
        <h1>이 선택지는<br />사라졌어요.</h1>
        <p>주소가 바뀌었거나 존재하지 않는 게임입니다.<br />준비된 게임 중에서 새로운 하나를 골라보세요.</p>
        <div>
          <Link className="button-primary" href="/games">모든 게임 보기 <span>→</span></Link>
          <Link className="button-ghost" href="/">홈으로</Link>
        </div>
      </section>
    </PageShell>
  );
}
