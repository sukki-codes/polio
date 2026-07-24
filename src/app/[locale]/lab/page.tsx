import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

type DemoItem = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Lab' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Lab');
  const demoItems = t.raw('demos.items') as DemoItem[];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          {t('eyebrow')}
        </span>
        <h1 className={styles.heading}>
          {t('heading')}
        </h1>
        <p className={styles.intro}>
          {t('intro')}
        </p>
      </header>
      <div className={styles.grid}>
        {demoItems.map((demo) => {
          const cardBody = (
            <>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  {demo.title}
                </h2>
                <span className={demo.href ? styles.cardStatusLive : styles.cardStatus}>
                  {demo.href ? t('tryItNow') : t('comingSoon')}
                </span>
              </div>
              <p className={styles.cardDescription}>
                {demo.description}
              </p>
              <ul className={styles.tagList}>
                {demo.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </>
          );

          return demo.href ? (
            <Link key={demo.title} className={styles.card} href={demo.href}>
              {cardBody}
            </Link>
          ) : (
            <div key={demo.title} className={styles.card}>
              {cardBody}
            </div>
          );
        })}
      </div>
    </main>
  );
}
