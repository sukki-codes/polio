'use client';

import { useState } from 'react';

import { arrayMove } from '@dnd-kit/sortable';

import { REPORT_SEED, type Block, type DemoLocale } from '@components/features/report-viewer/content';

export function useReportViewerDemo(initialLocale: DemoLocale) {
  const [activeLocale, setActiveLocale] = useState<DemoLocale>(initialLocale);
  const [blocksByLocale, setBlocksByLocale] = useState<Record<DemoLocale, Block[]>>(REPORT_SEED);
  const blocks = blocksByLocale[activeLocale];

  function commitBlockText(id: string, content: string) {
    setBlocksByLocale((prev) => ({
      ...prev,
      [activeLocale]: prev[activeLocale].map((block) => (block.id === id ? { ...block, content } : block)),
    }));
  }

  function reorderBlocks(activeId: string, overId: string) {
    setBlocksByLocale((prev) => {
      const current = prev[activeLocale];
      const oldIndex = current.findIndex((block) => block.id === activeId);
      const newIndex = current.findIndex((block) => block.id === overId);

      return oldIndex === -1 || newIndex === -1
        ? prev
        : { ...prev, [activeLocale]: arrayMove(current, oldIndex, newIndex) };
    });
  }

  function resetDemo() {
    setBlocksByLocale(REPORT_SEED);
  }

  return { activeLocale, blocks, commitBlockText, reorderBlocks, resetDemo, setActiveLocale };
}
