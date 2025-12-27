'use client';

import { useTheme } from '@/shared/providers/theme-provider';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 bottom-4 rounded-full border cursor-pointer border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
    >
      {theme === 'light' ? '다크모드' : '기본모드'}
    </button>
  );
}
