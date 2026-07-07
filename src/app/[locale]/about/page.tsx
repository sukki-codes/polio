import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
    <main className="mx-auto flex w-full max-w-800 flex-col gap-64 px-15 py-80">
      <header className="flex flex-col gap-12">
        <span className="text-xs font-medium tracking-label uppercase text-[color:var(--color-accent)]">
          {t('eyebrow')}
        </span>
        <h1 className="text-3xl font-bold text-[color:var(--color-text-main)] sm:text-4xl">
          {t('heading')}
        </h1>
        <p className="max-w-640 text-lg text-[color:var(--color-text-sub)]">
          {t('intro')}
        </p>
      </header>
      <section className="flex flex-col gap-24">
        <h2 className="text-xl font-semibold text-[color:var(--color-text-main)]">
          {t('timeline.title')}
        </h2>
        <ol className="flex flex-col">
          {timelineItems.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_1fr] gap-16">
              <div className="flex flex-col items-center">
                <span className="mt-4 h-10 w-10 shrink-0 rounded-full bg-[color:var(--color-accent)] shadow-glow-accent" />
                {index < timelineItems.length - 1 && (
                  <span className="w-1 flex-1 bg-[color:var(--color-border)]" />
                )}
              </div>
              <div className="pb-32">
                <span className="text-xs font-medium tracking-label uppercase text-[color:var(--color-text-sub)]">
                  {item.period}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[color:var(--color-text-main)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base text-[color:var(--color-text-sub)]">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="flex flex-col gap-24">
        <h2 className="text-xl font-semibold text-[color:var(--color-text-main)]">
          {t('highlights.title')}
        </h2>
        <div className="grid gap-16 sm:grid-cols-3">
          {highlightItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)] p-20 shadow-control"
            >
              <h3 className="text-base font-semibold text-[color:var(--color-text-main)]">
                {item.title}
              </h3>
              <p className="mt-8 text-sm text-[color:var(--color-text-sub)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-24">
        <h2 className="text-xl font-semibold text-[color:var(--color-text-main)]">
          {t('techStack.title')}
        </h2>
        <div className="grid gap-24 sm:grid-cols-2">
          {techStackCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold uppercase tracking-label text-[color:var(--color-text-sub)]">
                {category.title}
              </h3>
              <ul className="mt-12 flex flex-col gap-8">
                {category.items.map((item) => (
                  <li key={item.name} className="text-sm text-[color:var(--color-text-sub)]">
                    <span className="font-semibold text-[color:var(--color-text-main)]">{item.name}</span>
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
