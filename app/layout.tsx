import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttakjeonghae.vercel.app"),
  title: { default: "딱정해 — 고민은 짧게, 기억은 길게", template: "%s | 딱정해" },
  description: "친구·커플·여행에서 누가 낼지, 무엇을 먹을지, 어디로 갈지 가볍고 공정하게 정하는 무료 게임과 테스트.",
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
    title: "딱정해 — 고민은 짧게, 기억은 길게",
    description: "애매한 모든 순간을 가볍고 공정하게 정해드려요.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "딱정해 — 고민은 짧게, 기억은 길게" }],
  },
  twitter: { card: "summary_large_image", title: "딱정해", description: "고민은 짧게, 기억은 길게.", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f4efe5",
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
