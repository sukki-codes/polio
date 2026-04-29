import { ReactNode } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@components/layout/Header";
import "@styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Polio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
          <Header />
          {children}
        </body>
    </html>
  );
}
