import { ReactNode } from 'react'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import { routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning className={`${inter.variable} h-full`} lang={locale}>
      <body className="min-h-full flex flex-col bg-[color:var(--color-bg-main)] text-[color:var(--color-text-main)] transition-colors duration-300">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
