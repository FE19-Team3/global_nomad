import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative inline-block w-full cursor-pointer',
    trigger: [
      'relative flex w-full items-center justify-between border border-gray-200 bg-white px-6 py-3 text-sm transition-all',
      'focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed',
    ],
    icon: 'h-3 w-3 text-gray-900 transition-transform duration-200 mt-0.5 ml-2',
    value: 'text-gray-900',
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
    variant: {
      original: {
        trigger: 'border-gray-200 focus:border-blue-500 h-12 px-6 rounded-full',
      },
      'input-like': {
        trigger:
          'border-gray-100 shadow-[0px_2px_6px_0px_#00000005] focus:border-gray-500 h-13.5 px-5 rounded-xl',
      },
    },
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
  defaultVariants: {
    variant: 'original',
  },
});
