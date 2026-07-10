import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getProject, PROJECTS } from '@/content/projects';
import { Link } from '@/i18n/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const content = locale === 'ko' ? project.ko : project.en;

  return {
    title: content.title,
    description: content.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations('Projects');
  const content = locale === 'ko' ? project.ko : project.en;

  const sections = [
    { label: t('challenge'), items: content.challenge },
    { label: t('action'), items: content.action },
    { label: t('result'), items: content.result },
  ];

  return (
    <main className={styles.main}>
      <Link className={styles.backLink} href="/projects">
        {t('backToProjects')}
      </Link>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {content.title}
        </h1>
        <p className={styles.tagline}>
          {content.tagline}
        </p>
      </header>
      <div className={styles.sections}>
        {sections.map((section) => (
          <section key={section.label} className={styles.section}>
            <h2 className={styles.sectionLabel}>
              {section.label}
            </h2>
            <ul className={styles.sectionList}>
              {section.items.map((item) => (
                <li key={item} className={styles.sectionItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
