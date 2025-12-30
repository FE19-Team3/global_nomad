import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative inline-block w-full',
    trigger: [
      'relative flex h-12 w-full items-center justify-between rounded-full border border-gray-200 bg-white px-6 py-3 text-sm transition-all',
      'focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed',
    ],
    icon: 'h-4 w-4 text-gray-400 transition-transform duration-200',
    value: 'ext-gray-900',
    placeholder: 'text-gray-400',
    content:
      'absolute z-50 mt-2 w-full min-w-max overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150',
    viewport: 'max-h-60 overflow-y-auto p-1',
    item: [
      'cursor-pointer rounded-xl px-4 py-2.5 text-sm text-gray-700 transition-colors',
      'hover:bg-gray-50 active:bg-gray-100',
    ],
  },
  variants: {
    isOpen: {
      true: {
        icon: 'rotate-180',
      },
    },
    isSelected: {
      true: {
        item: 'bg-blue-50 text-blue-600 font-semibold',
      },
    },
    isDisabled: {
      true: {
        item: 'cursor-not-allowed opacity-40 grayscale-[0.5]',
      },
    },
  },
});
