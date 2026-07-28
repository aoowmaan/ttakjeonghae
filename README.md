# 딱정해

친구·커플·여행에서 생기는 애매한 결정을 카드, 룰렛, 월드컵, 밸런스게임과 성향 테스트로 해결하는 모바일 우선 웹 서비스입니다.

- Production: https://ttakjeonghae.vercel.app
- 27 games across 9 interactive engines
- Next.js 16, React 19, TypeScript
- Static generation for game and policy pages
- PWA manifest, sitemap, robots, canonical metadata and structured data
- Optional Google AdSense units with reserved layouts

## Local development

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

검증:

```bash
npm run lint
npm run test
```

Vercel 배포용 빌드:

```bash
npm run vercel-build
```

## AdSense configuration

`.env.example`을 기준으로 다음 환경 변수를 Vercel에 등록합니다.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `ADSENSE_PUBLISHER_ID`
- `NEXT_PUBLIC_ADSENSE_SLOT_WIDE`
- `NEXT_PUBLIC_ADSENSE_SLOT_BOX`

값이 없으면 광고 코드와 광고 공간은 렌더링되지 않습니다. 자세한 신청·출시 순서는 [AdSense launch checklist](docs/ADSENSE_LAUNCH.md)를 확인하세요.

## Content and privacy

이름, 후보, 금액 등 게임에 입력하는 값은 브라우저 안에서만 처리하며 서버에 저장하지 않습니다. 성향 테스트는 오락용이며 전문적인 심리 진단이 아닙니다.
