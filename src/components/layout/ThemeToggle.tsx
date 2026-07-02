'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import Icon from '@components/common/Icon';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)]" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      className="group flex h-36 w-36 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-card)] text-[color:var(--color-text-sub)] shadow-[0_10px_30px_rgba(2,6,23,0.08)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--color-text-main)]"
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon className="h-18 w-18" name={isDark ? 'sun' : 'moon'} />
    </button>
  );
}
