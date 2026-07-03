'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function useLocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const nextLocale = locale === 'ko' ? 'en' : 'ko';

  const switchLocale = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.refresh();
  };

  return { nextLocale, switchLocale };
}
