'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('LocaleSwitcher');

  const nextLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <button
      aria-label={nextLocale === 'en' ? t('switchToEn') : t('switchToKo')}
      className="flex h-36 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)] px-14 text-[1.3rem] font-semibold text-[color:var(--color-text-sub)] shadow-[0_10px_30px_rgba(2,6,23,0.08)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--color-text-main)]"
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
