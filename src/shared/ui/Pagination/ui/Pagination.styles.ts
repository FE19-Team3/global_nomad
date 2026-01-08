import { tv } from 'tailwind-variants';

export const paginationStyles = tv({
  slots: {
    container: 'flex items-center',
    button: `
      w-10 h-10 inline-flex items-center justify-center leading-none
      border-b-2 border-transparent text-gray-400
      hover:cursor-pointer disabled:hover:cursor-default
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `,
    active: 'border-b-blue-500 text-gray-900 font-bold',
    arrowButton: `
      text-gray-900 disabled:text-gray-400 text-[0px]
      [&>svg]:block [&>svg]:shrink-0 [&>svg]:translate-y-[1px]
    `,
    arrowIcon: 'w-4 h-4',
  },
});
