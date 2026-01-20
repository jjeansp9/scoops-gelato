import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Scoops Gelato | 프랜차이즈 공식 사이트",
  description: "10년의 경험과 11개 가맹점 운영 노하우로 새로운 맛의 경험을 선사합니다. Scoops Gelato 프랜차이즈 가맹 문의",
  keywords: ["젤라또", "프랜차이즈", "창업", "스쿱스", "Scoops Gelato", "아이스크림"],
  openGraph: {
    title: "Scoops Gelato | 프랜차이즈 공식 사이트",
    description: "10년의 경험과 11개 가맹점 운영 노하우로 새로운 맛의 경험을 선사합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
