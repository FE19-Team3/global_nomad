import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Divider from '@/shared/ui/Divider/Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    color: { control: { type: 'inline-radio' } },
    width: { control: { type: 'number' } },
    orientation: { control: { type: 'inline-radio' } },
    id: { control: { type: 'text' } },
  },
  args: {
    className: '',
    color: 'gray100',
    width: 1,
    orientation: 'horizontal',
    id: 'divider-id',
  },
} satisfies Meta<typeof Divider>;

export default meta;

export const Default: StoryObj<typeof Divider> = {};
