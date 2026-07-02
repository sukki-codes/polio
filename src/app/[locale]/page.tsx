import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Hero');

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-15 py-80">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-640 w-640 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]/10 blur-[13rem]" />
        <div className="absolute -bottom-60 -left-40 h-350 w-500 rounded-full bg-[color:var(--color-secondary)]/15 blur-[9rem]" />
        <div className="absolute -right-40 top-0 h-280 w-340 rounded-full bg-[color:var(--color-accent)]/8 blur-[7rem]" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-20 text-center">
        <div className="flex items-center gap-8 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)]/80 px-16 py-7 shadow-[0_16px_50px_rgba(2,6,23,0.08)] backdrop-blur">
          <span className="h-7 w-7 animate-pulse rounded-full bg-[color:var(--color-accent)]" />
          <span className="text-[1.1rem] font-medium tracking-[0.14em] uppercase text-[color:var(--color-accent)]">
            {t('badge')}
          </span>
        </div>
        <h1 className="max-w-740 text-[4rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[5.2rem] md:text-[6.4rem]">
          <span className="text-[color:var(--color-text-main)]">{t('titleLine1')}</span>
          <br />
          <span className="gradient-text">{t('titleLine2')}</span>
        </h1>
        <p className="max-w-560 text-[1.6rem] leading-[1.8] text-[color:var(--color-text-sub)]">
          {t('subtitle')}
        </p>
        <div className="mt-5 flex flex-col gap-8 sm:flex-row">
          <Link className="rounded-full bg-[color:var(--color-accent)] px-30 py-13 text-[1.4rem] font-semibold text-white shadow-[0_18px_45px_rgba(6,182,212,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-hover)]" href="#projects">
            {t('ctaPrimary')}
          </Link>
          <Link className="rounded-full border border-[color:var(--color-border)] px-30 py-13 text-[1.4rem] font-medium text-[color:var(--color-text-sub)] transition-all duration-200 hover:border-[color:var(--color-accent)]/30 hover:bg-[color:var(--color-surface-card)] hover:text-[color:var(--color-text-main)]" href="#approach">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </main>
  );
}
