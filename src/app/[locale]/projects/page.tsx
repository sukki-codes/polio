import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PROJECTS } from '@/content/projects';
import { Link } from '@/i18n/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Projects');
  const isKo = locale === 'ko';

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
        {PROJECTS.map((project) => {
          const content = isKo ? project.ko : project.en;

          return (
            <Link key={project.slug} className={styles.card} href={`/projects/${project.slug}`}>
              <h2 className={styles.cardTitle}>
                {content.title}
              </h2>
              <p className={styles.cardTagline}>
                {content.tagline}
              </p>
              <span className={styles.cardCta}>
                {t('viewCaseStudy')}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
