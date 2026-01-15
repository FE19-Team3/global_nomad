import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'group relative flex bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] transition-all',
    thumbWrapper:
      'absolute right-6 top-6 shrink-0 md:m-8 h-24 w-24 md:h-auto md:w-35  order-2 overflow-hidden md:relative md:right-auto md:top-auto',
    thumb:
      'object-cover transition-transform duration-500 overflow-hidden rounded-xl md:rounded-4xl',
    content: 'flex flex-col flex-1 px-6 py-8 md:pl-10 md:pr-0 justify-between gap-2',
    title: 'text-gray-950',
    rating: 'flex items-center gap-2 text-gray-600',
    price: 'font-bold text-gray-900',
    actions: 'flex w-full items-center gap-2 mt-2',
    actionBtn: 'flex-1 h-9 text-gray-600',
  },
  variants: {
    actionBtnVariant: {
      secondary: {
        actionBtn: '!bg-gray-50 !text-gray-500 hover:bg-gray-200 border-0 hover:border-0',
      },
    },
  },
});
