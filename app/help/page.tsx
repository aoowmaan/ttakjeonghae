import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "이용 안내" };

const faqs = [
  ["게임은 모두 무료인가요?", "네. 딱정해의 결정 도구와 테스트는 가입 없이 무료로 사용할 수 있습니다."],
  ["입력한 이름이나 금액은 저장되나요?", "아니요. 현재 제공하는 도구의 입력값은 사용 중인 브라우저에서만 처리하며 서버에 저장하지 않습니다."],
  ["랜덤 결제자 뽑기는 실제 결제 기능인가요?", "아닙니다. 실제 카드나 결제정보를 다루지 않는 순수한 랜덤 역할 뽑기입니다. 참여자 모두 동의한 범위에서 재미로 사용해 주세요."],
  ["결과가 정말 무작위인가요?", "룰렛, 카드, 팀 배정과 순서 정하기는 브라우저의 난수를 이용해 매번 새 결과를 만듭니다."],
  ["테스트 결과는 전문 심리 진단인가요?", "아닙니다. 모든 테스트는 대화와 재미를 위한 성향 콘텐츠이며 의료·심리 상담이나 진단을 대신하지 않습니다."],
  ["새 게임을 제안하고 싶어요.", "딱정해 GitHub 저장소의 Issues에 상황과 아이디어를 남겨주세요. 서비스의 색깔과 잘 맞는 제안은 검토 후 반영할 수 있습니다."],
];

export default function HelpPage() {
  return (
    <PageShell>
      <article className="text-page shell">
        <span>HELP & FAQ</span><h1>궁금한 건<br /><em>여기서 딱.</em></h1>
        <div className="faq-list">{faqs.map(([question, answer], index) => <section key={question}><b>{String(index + 1).padStart(2, "0")}</b><div><h2>{question}</h2><p>{answer}</p></div></section>)}</div>
      </article>
    </PageShell>
  );
}
