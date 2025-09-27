import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Time",
  description: "시간을 Compact하게 관리하다. Time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="my-16">
        <Header />
        {children}
        <Nav />
      </body>
    </html>
  );
}
