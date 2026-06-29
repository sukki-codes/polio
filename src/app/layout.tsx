import { ReactNode } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
    <html lang="ko" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[color:var(--color-bg-main)] text-[color:var(--color-text-main)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
