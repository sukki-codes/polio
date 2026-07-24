'use client';


import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslations } from 'next-intl';

import { useReportViewerDemo } from '@/hooks/useReportViewerDemo';
import Icon from '@components/common/Icon';

import { DEMO_LOCALES, type DemoLocale } from './content';
import ReportBlock from './ReportBlock';
import styles from './ReportViewerDemo.module.css';

type ReportViewerDemoProps = {
  initialLocale: DemoLocale;
};

export default function ReportViewerDemo({ initialLocale }: ReportViewerDemoProps) {
  const t = useTranslations('ReportViewerDemo');
  const { activeLocale, blocks, commitBlockText, reorderBlocks, resetDemo, setActiveLocale } =
    useReportViewerDemo(initialLocale);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      reorderBlocks(String(active.id), String(over.id));
    }
  }

  return (
    <div className={styles.demo}>
      <div className={styles.toolbar}>
        <div className={styles.languageGroup}>
          <span className={styles.languageLabel}>
            {t('language')}
          </span>
          {DEMO_LOCALES.map((demoLocale) => (
            <button
              key={demoLocale}
              aria-pressed={demoLocale === activeLocale}
              className={demoLocale === activeLocale ? styles.languageButtonActive : styles.languageButton}
              type="button"
              onClick={() => setActiveLocale(demoLocale)}
            >
              {t(`languageNames.${demoLocale}`)}
            </button>
          ))}
        </div>
        <div className={styles.actionGroup}>
          <button className={styles.resetButton} type="button" onClick={resetDemo}>
            {t('reset')}
          </button>
          <button className={styles.printButton} type="button" onClick={() => window.print()}>
            <Icon name="print" />
            {t('print')}
          </button>
        </div>
      </div>
      <div className={styles.documentSurface} dir={activeLocale === 'ar' ? 'rtl' : 'ltr'}>
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
            {blocks.map((block) => (
              <ReportBlock
                key={block.id}
                block={block}
                dragHandleLabel={t('dragHandle')}
                onCommitText={commitBlockText}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
