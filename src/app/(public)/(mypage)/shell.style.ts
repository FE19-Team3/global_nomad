import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    sideMenuBtn:
      'inline-flex items-center h-10 px-3 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 transition',
    closeMenuBtn:
      'absolute left-0 top-[calc(100%+8px)] z-50 w-72 rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden',
  },
});
