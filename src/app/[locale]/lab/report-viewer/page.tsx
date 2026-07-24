import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { DemoLocale } from '@components/features/report-viewer/content';
import ReportViewerLoader from '@components/features/report-viewer/ReportViewerLoader';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Lab' });

  return {
    title: t('reportViewer.metaTitle'),
    description: t('reportViewer.metaDescription'),
  };
}

export default async function ReportViewerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Lab');
  const initialLocale: DemoLocale = locale === 'ko' ? 'ko' : 'en';

  return (
    <main className={styles.main}>
      <Link className={styles.backLink} href="/lab">
        {t('reportViewer.backLink')}
      </Link>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          {t('reportViewer.eyebrow')}
        </span>
        <h1 className={styles.heading}>
          {t('reportViewer.heading')}
        </h1>
        <p className={styles.intro}>
          {t('reportViewer.intro')}
        </p>
      </header>
      <ReportViewerLoader initialLocale={initialLocale} />
    </main>
  );
}
