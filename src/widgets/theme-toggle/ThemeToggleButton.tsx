'use client';

import { useTheme } from '@/shared/providers/theme-provider';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50"
    >
      {theme === 'light' ? '다크모드' : '기본모드'}
    </button>
  );
};

export default ThemeToggleButton;
