import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Example';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Button',
  component: Button,
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'inline-radio' },
    },
    variant: {
      control: { type: 'inline-radio' },
    },
    rounded: {
      control: { type: 'inline-radio' },
    },
    onClick: {
      description: '버튼 클릭 시 호출되는 이벤트 핸들러',
      action: 'onClick called',
    },
  },
  args: {
    className: '',
    disabled: false,
    label: '확인',
    size: 'md',
    variant: 'primary',
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default: StoryObj<typeof Button> = {};
