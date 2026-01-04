import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'grid grid-cols-2 grid-rows-2 gap-2 w-full h-[245px] md:h-[400px] overflow-hidden rounded-xl',
    main: 'relative overflow-hidden',
    sub: 'relative overflow-hidden',
    image: 'object-cover',
  },
  variants: {
    count: {
      0: {
        root: 'block bg-gray-100',
      },
      1: {
        main: 'col-span-2 row-span-2',
      },
      2: {
        main: 'col-span-1 row-span-2',
        sub: 'col-span-1 row-span-2',
      },
      3: {
        main: 'col-span-1 row-span-2',
        sub: 'col-span-1 row-span-1',
      },
      4: {
        main: 'col-span-1 row-span-1',
        sub: 'col-span-1 row-span-1',
      },
    },
  },
  defaultVariants: {
    count: 1,
  },
});
