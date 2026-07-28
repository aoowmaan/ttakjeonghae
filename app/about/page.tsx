import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "서비스 소개", description: "딱정해가 만드는 더 가볍고 다정한 결정에 관하여." };

export default function AboutPage() {
  return (
    <PageShell>
      <article className="text-page shell">
        <span>ABOUT TTAK</span>
        <h1>결정이 어려운 게 아니라,<br /><em>함께 정하는 게 어려우니까.</em></h1>
        <div className="text-page-grid">
          <aside>고민은 짧게,<br />기억은 길게.</aside>
          <div>
            <h2>딱정해는 작은 눈치게임을 없앱니다.</h2>
            <p>친구들과 여행을 떠났는데 방을 누가 쓸지, 밥을 누가 살지, 다음 장소는 어디로 갈지 정하지 못해 시간을 보내본 적이 있나요? 딱정해는 그런 애매한 순간에 꺼내는 작은 도구함입니다.</p>
            <p>누군가의 의견이 더 크거나 작은 목소리에 묻히지 않도록, 때로는 운에 맡기고 때로는 서로의 취향을 발견하도록 돕습니다. 결과보다 함께 웃고 이야기하는 과정을 더 중요하게 생각합니다.</p>
            <h2>가볍지만 대충 만들지 않습니다.</h2>
            <p>가입 없이 바로 사용할 수 있고, 입력한 이름은 서버에 저장하지 않습니다. 다른 사람의 이미지나 콘텐츠를 복사하지 않고, 모든 질문과 결과를 딱정해의 언어로 직접 만듭니다.</p>
            <Link className="button-primary" href="/games">게임 시작하기 <span>→</span></Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

