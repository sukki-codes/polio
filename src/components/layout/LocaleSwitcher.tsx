'use client';

import { useTranslations } from 'next-intl';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const { nextLocale, switchLocale } = useLocaleSwitch();

  return (
    <button
      aria-label={nextLocale === 'en' ? t('switchToEn') : t('switchToKo')}
      className="flex h-36 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)] px-14 text-sm font-semibold text-[color:var(--color-text-sub)] shadow-control transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--color-text-main)]"
      type="button"
      onClick={switchLocale}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
