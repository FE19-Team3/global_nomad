import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex flex-col justify-start w-full',
    textarea:
      'flex w-full border border-gray-100 text-gray-950 placeholder-gray-400 focus:outline-none transition-all duration-150 resize-none py-4 px-5',
    error: 'px-2 mt-1.5 text-red-500 text-sm',
  },
  variants: {
    radius: {
      md: { textarea: 'rounded-md' },
      lg: { textarea: 'rounded-xl' },
    },
    disabled: {
      true: { textarea: 'bg-gray-100 cursor-not-allowed opacity-50' },
    },
    error: {
      true: { textarea: 'border border-red-500' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    radius: 'md',
  },
});
