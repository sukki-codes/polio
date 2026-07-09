import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Hero');

  return (
    <main className={styles.main}>
      <div className={`dot-grid ${styles.dotGridLayer}`} />
      <div className={styles.glowLayer}>
        <div className={styles.glowAccentCenter} />
        <div className={styles.glowSecondary} />
        <div className={styles.glowAccentCorner} />
      </div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeLabel}>
            {t('badge')}
          </span>
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>{t('titleLine1')}</span>
          <br />
          <span className="gradient-text">{t('titleLine2')}</span>
        </h1>
        <p className={styles.subtitle}>
          {t('subtitle')}
        </p>
        <div className={styles.ctaGroup}>
          <Link className={styles.ctaPrimary} href="#projects">
            {t('ctaPrimary')}
          </Link>
          <Link className={styles.ctaSecondary} href="/about">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </main>
  );
}
