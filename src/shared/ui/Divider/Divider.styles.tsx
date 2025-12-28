import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'block',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    color: {
      gray100: 'bg-gray-100',
      gray300: 'bg-gray-300',
    },
  },
});
