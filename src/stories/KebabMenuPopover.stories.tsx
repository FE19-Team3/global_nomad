import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KebabMenuPopover from '@/widgets/KebabMenu/KebabMenuPopover';

const meta = {
  title: 'Components/KebabMenuPopover',
  component: KebabMenuPopover,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof KebabMenuPopover>;

export default meta;

export const Default: StoryObj<typeof KebabMenuPopover> = {};
