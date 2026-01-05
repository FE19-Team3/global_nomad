import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'inline-flex items-center justify-center select-none cursor-pointer',
    label: 'shrink-0',
    icon: 'shrink-0 flex items-center justify-center',
  },

  variants: {
    /** 버튼 역할 */
    variant: {
      primary: { root: 'bg-primary text-white  hover:bg-primary-200' },
      secondary: {
        root: `
        bg-white
        text-gray-900
        border
        border-gray-200
        hover:bg-gray-100
        hover:border-gray-400
      `,
      },
      tertiary: {
        root: `
          text-gray-600
          hover:bg-primary-100
          hover:text-gray-950
        `,
      },
      text: {
        root: `
        bg-transparent
        text-gray-950
        rounded-none
      `,
      },
      icon: {
        root: 'p-0 bg-transparent',
        icon: 'w-6 h-6',
      },
      badge: {
        root: `
          rounded-full
          bg-white
          text-gray-950
          border
          border-[#D8D8D8]
          hover:bg-[#333333]
          hover:text-white
          hover:border-white
        `,
      },
      selectable: {
        root: `
          border
          border-gray-300
          text-gray-950
        `,
      },
    },

    /** 사이즈 (padding 기준) */
    size: {
      sm: {
        root: 'px-[40px] py-[12px]',
        icon: 'w-4 h-4 mr-[5px]',
      },
      md: {
        root: 'px-[40px] py-[14px]',
        icon: 'w-6 h-6 mr-2',
      },
      full: {
        root: 'w-full py-[14px]',
        icon: 'w-6 h-6 mr-2',
      },
    },

    /** ← 추가: 아이콘 크기 */
    iconSize: {
      sm: {
        icon: 'w-4 h-4 mr-1',
      },
      md: {
        icon: 'w-6 h-6 mr-[6px]',
      },
      md2: {
        icon: 'w-6 h-6 mr-[8px]',
      },
    },

    /** radius */
    radius: {
      sm: { root: 'rounded-[12px]' },
      md: { root: 'rounded-[14px]' },
      full: { root: 'rounded-[100px]' },
    },

    /** 상태 */
    disabled: {
      true: {
        root: 'cursor-not-allowed bg-gray-200 hover:!bg-gray-200 hover:!border-gray-200 hover:!text-white text-white',
      },
    },

    /** 선택 상태 */
    selected: {
      true: {
        root: '',
      },
    },

    /** 아이콘 only 버튼 */
    iconOnly: {
      true: {
        root: 'p-2',
        icon: 'mr-0',
      },
    },
  },

  compoundVariants: [
    // badge active
    {
      variant: 'badge',
      selected: true,
      class: {
        root: `
          bg-[#333333]
          text-white
          border-white
        `,
      },
    },
    // selectable active
    {
      variant: 'selectable',
      selected: true,
      class: {
        root: `
          bg-primary-100
          border-primary
          border-2
          text-primary
        `,
      },
    },
    // primary active
    {
      variant: 'primary',
      selected: true,
      class: {
        root: `
          bg-primary-200
        `,
      },
    },
    // secondary active
    {
      variant: 'secondary',
      selected: true,
      class: {
        root: `
          bg-gray-100
          border-gray-400
          border
        `,
      },
    },
    // tertiary active
    {
      variant: 'tertiary',
      selected: true,
      class: {
        root: `
          bg-primary-100
          text-gray-950
        `,
      },
    },
  ],

  defaultVariants: {
    variant: 'primary',
    radius: 'md',
  },
});
