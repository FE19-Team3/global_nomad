import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex flex-col p-5 w-82 md:w-168 bg-white rounded-3xl shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]',
    header: 'flex gap-2 items-baseline mb-1',
    rating: 'flex mb-2',
  },
});
