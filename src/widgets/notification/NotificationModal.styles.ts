import { tv } from 'tailwind-variants';

export const notificationModalStyles = tv({
  slots: {
    root: `
      fixed md:absolute
      inset-0 md:inset-auto
      md:top-full md:right-0 md:mt-2
      w-full md:w-[368px]
      h-full md:h-auto md:max-h-[600px]
      md:rounded-lg
      bg-white md:shadow-lg
      flex flex-col
      overflow-hidden
      z-50
    `,
    header: 'flex items-center justify-between px-6 py-5 border-b border-gray-100',
    title: 'text-xl font-bold text-gray-900',
    closeButton: 'text-gray-400 hover:text-gray-600 transition',
    list: 'flex-1 overflow-y-auto',
    empty: 'py-12 text-center text-gray-400',
  },
});

export const notificationCardStyles = tv({
  slots: {
    root: 'px-6 py-4',
    header: 'flex items-center justify-between mb-2',
    body: 'leading-relaxed',
    confirmed: 'text-primary',
    rejected: 'text-red-500',
  },
  variants: {
    type: {
      confirmed: {
        root: 'bg-primary-100',
      },
      rejected: {
        root: 'bg-white',
      },
      declined: {
        root: 'bg-white',
      },
    },
  },
});
