import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JLPT Practice｜日语能力考试在线练习",
  description: "面向 JLPT N1-N5 的日语词汇、语法、阅读与听力练习。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
