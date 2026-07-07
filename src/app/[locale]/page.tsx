import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Hero');

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-15 py-80">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-640 w-640 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]/10 blur-[13rem]" />
        <div className="absolute -bottom-60 -left-40 h-350 w-500 rounded-full bg-[color:var(--color-secondary)]/15 blur-[9rem]" />
        <div className="absolute -right-40 top-0 h-280 w-340 rounded-full bg-[color:var(--color-accent)]/8 blur-[7rem]" />
      </div>
      <div className="relative z-[var(--z-content)] flex flex-col items-center gap-20 text-center">
        <div className="flex items-center gap-8 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)]/80 px-16 py-7 shadow-badge backdrop-blur">
          <span className="h-7 w-7 animate-pulse rounded-full bg-[color:var(--color-accent)]" />
          <span className="text-xs font-medium tracking-label uppercase text-[color:var(--color-accent)]">
            {t('badge')}
          </span>
        </div>
        <h1 className="max-w-740 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-[color:var(--color-text-main)]">{t('titleLine1')}</span>
          <br />
          <span className="gradient-text">{t('titleLine2')}</span>
        </h1>
        <p className="max-w-560 text-lg text-[color:var(--color-text-sub)]">
          {t('subtitle')}
        </p>
        <div className="mt-5 flex flex-col gap-8 sm:flex-row">
          <Link className="rounded-full bg-[color:var(--color-accent)] px-30 py-13 text-base font-semibold text-white shadow-glow-accent transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-hover)]" href="#projects">
            {t('ctaPrimary')}
          </Link>
          <Link className="rounded-full border border-[color:var(--color-border)] px-30 py-13 text-base font-medium text-[color:var(--color-text-sub)] transition-all duration-200 hover:border-[color:var(--color-accent)]/30 hover:bg-[color:var(--color-surface-card)] hover:text-[color:var(--color-text-main)]" href="/about">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </main>
  );
}
