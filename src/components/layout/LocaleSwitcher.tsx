'use client';

import { useTranslations } from 'next-intl';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';

import styles from './LocaleSwitcher.module.css';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const { nextLocale, switchLocale } = useLocaleSwitch();

  return (
    <button
      aria-label={nextLocale === 'en' ? t('switchToEn') : t('switchToKo')}
      className={styles.button}
      type="button"
      onClick={switchLocale}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
