import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'group flex flex-col md:flex-row md:items-stretch bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] transition-all min-w-[320px]',
    thumbWrapper:
      'relative shrink-0 w-full h-[220px] md:w-[204px] md:h-auto md:order-2 overflow-hidden',
    thumb: 'object-cover transition-transform duration-500',
    content: 'flex flex-col flex-1 p-5 justify-between gap-1.5 md:gap-3 md:px-10 md:py-[30px]',
    title: 'text-gray-950',
    date: 'text-gray-500',
    info: 'font-bold text-gray-900',
    number: 'font-medium text-gray-500',
    actions: 'flex  w-full m-auto items-center gap-2 mt-2 md:mt-0 md:w-[358px]',
    actionBtn: 'flex-1 h-9 text-gray-600',
  },
  variants: {
    actionBtnVariant: {
      cancel: {
        actionBtn: 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-0 hover:border-0',
      },
    },
  },
});
