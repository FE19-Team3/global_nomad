import { tv } from 'tailwind-variants';

export const checkboxStyles = tv({
  slots: {
    root: `
      inline-flex items-center gap-2
      px-4 py-2
      rounded-full
      border
      cursor-pointer
      select-none
      transition-colors
    `,
    icon: 'w-4 h-4 shrink-0',
    input: 'absolute opacity-0 pointer-events-none',
  },

  variants: {
    checked: {
      true: {
        root: `
          bg-primary-100
          border-primary
          text-primary
        `,
      },
      false: {
        root: `
          bg-white
          border-gray-200
          text-gray-900
          hover:bg-gray-100
        `,
      },
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed',
      },
    },
  },
});
