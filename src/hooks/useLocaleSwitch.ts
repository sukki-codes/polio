'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { routing } from '@/i18n/routing';

export function useLocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const currentIndex = routing.locales.indexOf(locale as (typeof routing.locales)[number]);
  const nextLocale = routing.locales[(currentIndex + 1) % routing.locales.length];

  const switchLocale = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.refresh();
  };

  return { nextLocale, switchLocale };
}
