import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "채널톡 디자인 시스템",
  description: "채널톡의 통합 디자인 시스템과 컴포넌트 라이브러리",
  keywords: ["design system", "component library", "channeltalk", "ui", "react"],
  authors: [{ name: "Channel Corp." }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}
