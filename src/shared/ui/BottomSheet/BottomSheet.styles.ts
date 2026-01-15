import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    overlay: 'fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-300',
    content: [
      'fixed bottom-0 left-0 w-full max-h-9/10 overflow-y-auto bg-white rounded-t-[32px] z-[101] p-6',
      'pb-[calc(1.5rem+env(safe-area-inset-bottom))]', // 아이폰 하단 대응
      'animate-in slide-in-from-bottom duration-300 ease-out',
    ],
    header: 'flex items-center mb-2',
    title: 'text-xl font-bold text-gray-900',
    footer: 'mt-8 w-full',
  },
});
