'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

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
      {isDark ? (
        <svg
          aria-hidden="true"
          className="h-18 w-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v2.5" strokeLinecap="round" />
          <path d="M12 18.5v2.5" strokeLinecap="round" />
          <path d="M4.9 4.9l1.8 1.8" strokeLinecap="round" />
          <path d="M17.3 17.3l1.8 1.8" strokeLinecap="round" />
          <path d="M3 12h2.5" strokeLinecap="round" />
          <path d="M18.5 12H21" strokeLinecap="round" />
          <path d="M4.9 19.1l1.8-1.8" strokeLinecap="round" />
          <path d="M17.3 6.7l1.8-1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.8" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-18 w-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M20 15.5A8.5 8.5 0 1 1 8.5 4a7 7 0 0 0 11.5 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
