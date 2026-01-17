import { tv } from 'tailwind-variants';

export const notificationModalStyles = tv({
  slots: {
    root: `
    w-full md:w-[368px]
    h-full md:h-auto md:max-h-[600px]
    rounded-lg
    shadow-lg
    border border-gray-100
    `,
    header: 'flex items-center justify-between px-6 py-5 border-b border-gray-100',
    title: 'text-xl font-bold text-gray-900',
    closeButton: 'text-gray-400 hover:text-gray-600 transition',
    list: 'flex-1 overflow-y-auto custom-scrollbar',
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
