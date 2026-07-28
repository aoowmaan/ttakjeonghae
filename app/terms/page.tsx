import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <PageShell>
      <article className="policy-page shell">
        <span>TERMS OF USE · 2026.07.27</span><h1>이용약관</h1>
        <p>딱정해를 이용하면 다음 조건에 동의한 것으로 봅니다.</p>
        <h2>1. 서비스의 목적</h2><p>딱정해는 모임과 여행에서의 결정, 대화와 재미를 돕는 웹 기반 게임과 도구를 제공합니다. 결과는 참고와 오락을 위한 것이며 전문적인 조언이나 법적 판단을 대신하지 않습니다.</p>
        <h2>2. 책임 있는 이용</h2><p>결제자, 운전자, 벌칙 등 사람과 비용에 관련된 결과는 참여자 모두의 동의를 전제로 사용해야 합니다. 결과를 타인에게 강요하거나 괴롭힘, 차별, 위험한 행동에 이용해서는 안 됩니다.</p>
        <h2>3. 금지 사항</h2><p>서비스를 자동화된 방식으로 과도하게 호출하거나, 광고 노출·클릭을 인위적으로 발생시키거나, 서비스 운영을 방해하는 행위를 금지합니다.</p>
        <h2>4. 콘텐츠</h2><p>딱정해가 직접 작성한 문구, 질문, 결과 설명과 디자인의 권리는 딱정해에 있습니다. 개인적인 비상업 목적의 결과 공유는 허용하지만 사이트 전체나 데이터의 무단 복제는 허용하지 않습니다.</p>
        <h2>5. 서비스 변경</h2><p>더 나은 이용 경험과 정책 준수를 위해 게임, 기능과 약관을 변경할 수 있습니다. 중요한 변경은 서비스 내에 안내합니다.</p>
        <h2>6. 문의</h2><p>이용 관련 문의는 hello@ttak.fun으로 보내주세요.</p>
      </article>
    </PageShell>
  );
}

