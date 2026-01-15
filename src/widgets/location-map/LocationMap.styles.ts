import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'w-full rounded-2xl overflow-hidden', // 전체 컨테이너
    map: 'w-full h-full',
    loading: 'w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400',
    error: 'p-4 bg-red-50 text-red-500 rounded-lg text-sm',
  },
  variants: {
    size: {
      sm: { root: 'h-75' },
      md: { root: 'h-100' },
      lg: { root: 'h-150' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
