import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Label from '@/shared/ui/Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    textSize: { control: { type: 'inline-radio' } },
    textColor: { control: { type: 'inline-radio' } },
    children: { control: { type: 'text' } },
    htmlFor: { control: { type: 'text' } },
  },
  args: {
    className: '',
    textSize: '14_M',
    textColor: 'gray_950',
    children: '라벨 텍스트',
    htmlFor: 'input-id',
  },
} satisfies Meta<typeof Label>;

export default meta;

export const Default: StoryObj<typeof Label> = {};
