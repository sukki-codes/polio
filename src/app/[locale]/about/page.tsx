import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

type HighlightItem = {
  title: string;
  description: string;
};

type TechStackItem = {
  name: string;
  description: string;
};

type TechStackCategory = {
  title: string;
  items: TechStackItem[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');
  const timelineItems = t.raw('timeline.items') as TimelineItem[];
  const highlightItems = t.raw('highlights.items') as HighlightItem[];
  const techStackCategories = t.raw('techStack.categories') as TechStackCategory[];

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
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('timeline.title')}
        </h2>
        <ol className={styles.timelineList}>
          {timelineItems.map((item, index) => (
            <li key={item.title} className={styles.timelineItem}>
              <div className={styles.timelineDotColumn}>
                <span className={styles.timelineDot} />
                {index < timelineItems.length - 1 && (
                  <span className={styles.timelineLine} />
                )}
              </div>
              <div className={styles.timelineContent}>
                <span className={styles.timelinePeriod}>
                  {item.period}
                </span>
                <h3 className={styles.timelineTitle}>
                  {item.title}
                </h3>
                <p className={styles.timelineDescription}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('highlights.title')}
        </h2>
        <div className={styles.highlightGrid}>
          {highlightItems.map((item) => (
            <div key={item.title} className={styles.highlightCard}>
              <h3 className={styles.highlightTitle}>
                {item.title}
              </h3>
              <p className={styles.highlightDescription}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('techStack.title')}
        </h2>
        <div className={styles.techStackGrid}>
          {techStackCategories.map((category) => (
            <div key={category.title}>
              <h3 className={styles.techStackCategoryTitle}>
                {category.title}
              </h3>
              <ul className={styles.techStackList}>
                {category.items.map((item) => (
                  <li key={item.name} className={styles.techStackItem}>
                    <span className={styles.techStackItemName}>{item.name}</span>
                    {' — '}
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
