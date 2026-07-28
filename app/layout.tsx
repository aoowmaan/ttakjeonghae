import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttakjeonghae.vercel.app"),
  title: { default: "딱정해 — 모였으면, 딱 재밌게", template: "%s | 딱정해" },
  description: "나만의 월드컵을 만들고 밸런스게임과 랜덤 결정 도구를 친구들과 바로 즐기는 무료 게임 놀이터.",
  keywords: ["결정 룰렛", "랜덤 뽑기", "밸런스게임", "이상형 월드컵", "심리테스트", "여행 게임", "N빵 계산기"],
  applicationName: "딱정해",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "딱정해",
  },
  formatDetection: {
    telephone: false,
  },
  authors: [{ name: "딱정해" }],
  creator: "딱정해",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "딱정해",
    title: "딱정해 — 모였으면, 딱 재밌게",
    description: "나만의 월드컵을 만들고 밸런스게임과 랜덤 결정 도구를 친구들과 바로 즐겨보세요.",
    images: [{ url: "/og-renewal.png", width: 1536, height: 1024, alt: "딱정해 — 모였으면, 딱 재밌게" }],
  },
  twitter: { card: "summary_large_image", title: "딱정해", description: "모였으면, 딱 재밌게.", images: ["/og-renewal.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="ko">
      <body>
        {children}
        {adsenseClient && (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}
