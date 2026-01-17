import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex flex-col items-center gap-6 px-3 py-6 w-72 shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] rounded-3xl bg-white',
    nav: 'flex flex-col gap-4 w-full',
    profileImage: 'relative w-30 h-30 overflow-hidden rounded-full',
  },
});
