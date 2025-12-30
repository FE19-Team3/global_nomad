// styles.ts
import { tv } from 'tailwind-variants';

export const dropdownStyles = tv({
  slots: {
    container: 'relative inline-block',
    trigger:
      'flex items-center justify-between h-10 px-4 text-sm text-gray-950 whitespace-nowrap cursor-pointer',
    menu: 'absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-[0px_2px_20px_0px_#00000014] overflow-hidden z-10',
    item: 'w-32 h-15 flex items-center justify-center shrink-0 transition-transform duration-200 text-center cursor-pointer',
    icon: 'ml-1 mt-[3px] shrink-0 transition-none cursor-pointer',
  },
  variants: {
    size: {
      md: {
        trigger: 'h-10 text-sm',
      },
    },
    radius: {
      md: {
        trigger: 'rounded-lg',
        menu: 'rounded-lg',
      },
    },
    open: {
      true: {
        icon: 'rotate-180',
      },
    },
    disabled: {
      true: {
        trigger: 'bg-gray-100 cursor-not-allowed opacity-50',
      },
    },
    selected: {
      true: {
        item: 'bg-gray-50',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
});
