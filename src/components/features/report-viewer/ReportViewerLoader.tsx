'use client';

import dynamic from 'next/dynamic';

import type { DemoLocale } from './content';
import styles from './ReportViewerDemo.module.css';

const ReportViewerDemo = dynamic(() => import('./ReportViewerDemo'), {
  ssr: false,
  loading: () => <div className={styles.loadingSkeleton} />,
});

type ReportViewerLoaderProps = {
  initialLocale: DemoLocale;
};

export default function ReportViewerLoader({ initialLocale }: ReportViewerLoaderProps) {
  return <ReportViewerDemo initialLocale={initialLocale} />;
}
