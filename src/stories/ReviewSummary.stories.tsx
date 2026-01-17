import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ReviewSummary from '@/widgets/review/ui/ReviewSummary';

const meta = {
  title: 'Components/ReviewSummary',
  component: ReviewSummary,
  tags: ['autodocs'],
  argTypes: {
    averageRating: {
      control: { type: 'number' },
    },
    totalCount: {
      control: { type: 'number' },
    },
  },
  args: {
    averageRating: 4.5,
    totalCount: 192,
  },
} satisfies Meta<typeof ReviewSummary>;

export default meta;

export const Default: StoryObj<typeof ReviewSummary> = {};
