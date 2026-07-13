'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import styles from './error.module.css';

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorBoundary({ error, unstable_retry }: Props) {
  const t = useTranslations('ErrorBoundary');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {t('title')}
      </h1>
      <p className={styles.description}>
        {t('description')}
      </p>
      <button className={styles.retryButton} type="button" onClick={() => unstable_retry()}>
        {t('retry')}
      </button>
    </main>
  );
}
