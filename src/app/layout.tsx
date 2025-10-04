import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Time",
  description: "시간을 Compact하게 관리하다. Time.",
  manifest: "/manifest.json",
  themeColor: "#f1f5f9",
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon/512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Time" />
      </head>
      <body className={`${pretendard.className} font-pretendard mb-20 mt-15`}>
        <Header />
        {children}
        <Nav />
      </body>
    </html>
  );
}
