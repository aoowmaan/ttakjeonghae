import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="policy-page shell">
        <span>PRIVACY POLICY · 2026.07.28</span><h1>개인정보처리방침</h1>
        <p>딱정해는 이용자의 개인정보를 중요하게 생각하며, 필요한 정보만 최소한으로 처리합니다.</p>
        <h2>1. 직접 입력하는 정보</h2><p>랜덤 뽑기, 팀 배정, 정산 도구에 입력한 이름과 금액은 이용자의 기기에서만 처리되며 딱정해 서버로 전송하거나 저장하지 않습니다.</p>
        <h2>2. 자동으로 처리될 수 있는 정보</h2><p>서비스 제공 과정에서 IP 주소, 접속 시간, 브라우저·기기 종류, 방문 페이지와 같은 기술 정보가 호스팅 사업자의 로그에 일시적으로 기록될 수 있습니다. 딱정해는 현재 회원 계정이나 자체 행동 분석 도구를 운영하지 않습니다.</p>
        <h2>3. Google 광고 쿠키</h2>
        <p>딱정해에 Google AdSense가 활성화되면 Google을 포함한 제3자 제공업체가 쿠키를 사용하여 이용자의 이전 웹사이트 방문 기록을 바탕으로 광고를 게재할 수 있습니다. Google의 광고 쿠키를 통해 Google과 파트너는 딱정해 또는 다른 사이트 방문 기록을 기반으로 맞춤 광고를 제공할 수 있습니다.</p>
        <p>이용자는 <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google 광고 설정</a>에서 맞춤 광고를 사용 중지할 수 있습니다. 제3자 제공업체의 맞춤 광고 쿠키는 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">aboutads.info</a>에서도 관리할 수 있습니다.</p>
        <h2>4. 지역별 동의 관리</h2><p>유럽경제지역, 영국과 스위스 등 관련 법률이 요구하는 지역에서는 Google이 인증한 동의 관리 플랫폼을 통해 광고 쿠키와 개인정보 처리에 관한 선택권을 제공합니다.</p>
        <h2>5. 외부 서비스</h2><p>결과 공유 기능을 선택하면 이용자가 선택한 플랫폼의 정책이 적용됩니다. 공유는 이용자의 명시적인 동작으로만 실행됩니다.</p>
        <h2>6. 보유와 파기</h2><p>딱정해가 별도로 회원정보를 수집하지 않는 한 개인을 식별하는 정보를 보유하지 않습니다. 문의 과정에서 제공된 내용은 답변과 분쟁 대응에 필요한 기간 동안만 확인합니다.</p>
        <h2>7. 문의</h2><p>개인정보 관련 문의는 딱정해 GitHub 저장소의 Issues를 통해 접수합니다. 공개 게시판이므로 이름, 연락처 등 개인정보는 남기지 마세요. 정책이 변경되면 시행일과 변경 내용을 이 페이지에 공개합니다.</p>
      </article>
    </PageShell>
  );
}
