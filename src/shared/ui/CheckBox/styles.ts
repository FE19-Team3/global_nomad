import { tv } from 'tailwind-variants';

export const checkboxStyles = tv({
  slots: {
    root: `
      inline-flex items-center gap-2
      px-4 py-[10px]
      rounded-full
      border
      cursor-pointer
      select-none
      transition-all
      duration-180

      shrink-0          
      whitespace-nowrap

      has-focus-visible:ring-2
      has-focus-visible:ring-primary

      active:scale-93
    `,
    icon: 'w-6 h-6 shrink-0',
    input: 'absolute opacity-0 pointer-events-none',
  },

  variants: {
    checked: {
      true: {
        root: `
          bg-gray-950
          border-gray-950
          text-white
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
