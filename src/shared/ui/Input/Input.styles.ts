import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex flex-col justify-start relative',
    iconWrapper: 'absolute top-0 left-0 flex items-center justify-center pointer-events-none',
    input:
      'flex items-center w-full text-gray-950 placeholder-gray-400 focus:outline-none transition-all duration-150',
    error: 'px-2 mt-1.5 text-red-500',
  },
  variants: {
    variant: {
      primary: {
        input:
          'border border-gray-100 bg-white shadow-[0px_2px_6px_0px_#00000005] focus:border-gray-500',
      },
      secondary: {
        input:
          'border-blue-50 bg-white shadow-[0px_6px_10px_0px_#0D99FF0D] focus:border focus:border-blue-200',
      },
    },
    size: {
      md: {
        input: 'h-13.5 px-5',
        iconWrapper: 'h-13.5 px-5',
      },
      lg: {
        input: 'h-17.5 px-8',
        iconWrapper: 'h-17.5 px-8',
      },
    },
    radius: {
      md: { input: 'rounded-[16px]' },
      lg: { input: 'rounded-[24px]' },
    },
    disabled: {
      true: { input: 'bg-gray-100 cursor-not-allowed opacity-50' },
    },
    error: {
      true: {
        input: 'border-red-500 focus:border-red-500',
      },
    },
    hasIcon: {
      true: { input: '' },
    },
  },
  compoundVariants: [
    {
      hasIcon: true,
      size: 'md',
      class: { input: 'pl-14' },
    },
    {
      hasIcon: true,
      size: 'lg',
      class: { input: 'pl-16' },
    },
  ],
});
