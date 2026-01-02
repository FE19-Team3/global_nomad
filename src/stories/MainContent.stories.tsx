import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MainContent from '@/widgets/main/MainContent';

const meta = {
  title: 'Widgets/MainContent',
  component: MainContent,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MainContent>;

export default meta;

export const Default: StoryObj<typeof MainContent> = {};
