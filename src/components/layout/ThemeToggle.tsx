'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import Icon from '@components/common/Icon';

import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.box} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      className={styles.button}
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon className={styles.icon} name={isDark ? 'sun' : 'moon'} />
    </button>
  );
}
