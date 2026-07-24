'use client';

import { useEffect, useRef } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Icon from '@components/common/Icon';

import type { Block } from './content';
import styles from './ReportBlock.module.css';

type ReportBlockProps = {
  block: Block;
  dragHandleLabel: string;
  onCommitText: (id: string, content: string) => void;
};

export default function ReportBlock({ block, dragHandleLabel, onCommitText }: ReportBlockProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  const textRef = useRef<HTMLDivElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (textRef.current && textRef.current.textContent !== block.content) {
      textRef.current.textContent = block.content;
    }
  }, [block.content]);

  return (
    <div ref={setNodeRef} className={isDragging ? styles.dragging : styles.block} style={style}>
      <button
        aria-label={dragHandleLabel}
        className={styles.dragHandle}
        type="button"
        {...attributes}
        {...listeners}
      >
        <Icon name="grip" />
      </button>
      {block.type === 'image-placeholder' ? (
        <div className={styles.imagePlaceholder}>
          {block.content}
        </div>
      ) : (
        <div
          ref={textRef}
          contentEditable
          suppressContentEditableWarning
          aria-level={block.type === 'heading' ? 2 : undefined}
          className={block.type === 'heading' ? styles.blockHeading : styles.blockParagraph}
          role={block.type === 'heading' ? 'heading' : undefined}
          onBlur={(event) => onCommitText(block.id, event.currentTarget.textContent ?? '')}
        />
      )}
    </div>
  );
}
