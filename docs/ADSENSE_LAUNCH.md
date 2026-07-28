# AdSense launch checklist

## 1. 신청 전

- Vercel의 프로덕션 도메인 `https://ttakjeonghae.vercel.app`을 AdSense 사이트로 등록합니다.
- 홈, 모든 게임, 서비스 소개, 이용 안내, 개인정보처리방침과 이용약관이 로그인 없이 열리는지 확인합니다.
- 깨진 링크, 준비 중 문구, 비어 있는 페이지가 없는지 확인합니다.
- 직접 소유하지 않은 이미지·문구·상표를 무단으로 사용하지 않습니다.

## 2. 게시자 정보 연결

AdSense 계정에서 `ca-pub-...` 형식의 클라이언트 ID와 `pub-...` 형식의 게시자 ID를 확인한 뒤 Vercel Production 환경 변수에 등록합니다.

```text
NEXT_PUBLIC_SITE_URL=https://ttakjeonghae.vercel.app
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-0000000000000000
ADSENSE_PUBLISHER_ID=pub-0000000000000000
NEXT_PUBLIC_ADSENSE_SLOT_WIDE=0000000000
NEXT_PUBLIC_ADSENSE_SLOT_BOX=0000000000
```

환경 변수를 등록한 뒤 새 프로덕션 배포가 필요합니다.

## 3. ads.txt

배포 후 `https://ttakjeonghae.vercel.app/ads.txt`가 아래 형식으로 표시되는지 확인합니다.

```text
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

`pub-` 뒤에는 실제 16자리 게시자 번호가 들어가야 합니다.

## 4. 동의 관리

유럽경제지역, 영국과 스위스 방문자에게 광고를 제공하려면 Google 인증 CMP가 필요합니다. AdSense의 `개인정보 보호 및 메시지`에서 Google의 유럽 규정 메시지를 만들고 사이트에 연결합니다. 자체 제작 쿠키 팝업만으로 대체하지 않습니다.

## 5. 광고 배치

- 광고는 게임 버튼, 카드, 룰렛과 결과 공유 버튼에서 충분히 떨어진 전용 영역에만 표시합니다.
- 광고 클릭을 요청하거나 광고를 콘텐츠·메뉴처럼 보이게 만들지 않습니다.
- 첫 출시에서는 현재 준비된 본문 하단 가로형과 데스크톱 사이드형 슬롯만 사용합니다.
- 자동 광고를 켠다면 게임 조작부 내부 또는 조작부 바로 앞뒤에 광고가 삽입되지 않는지 모바일에서 확인합니다.

## 6. 승인 후 확인

- 홈과 대표 게임 5개에서 광고 공간의 레이아웃 이동이 없는지 확인합니다.
- 모바일 360px, 390px와 데스크톱에서 광고가 콘텐츠를 가리지 않는지 확인합니다.
- AdSense 정책 센터에서 `ads.txt`, CMP, 제한 광고 또는 의도하지 않은 클릭 경고를 확인합니다.
- 콘텐츠를 추가할 때마다 노골적인 성적 내용, 저작권 침해, 과도한 욕설과 오해를 유도하는 광고 배치를 다시 검토합니다.

## 공식 참고 문서

- https://support.google.com/adsense/answer/1346295
- https://support.google.com/adsense/answer/1348695
- https://support.google.com/adsense/answer/9785052
- https://support.google.com/adsense/answer/13554116
