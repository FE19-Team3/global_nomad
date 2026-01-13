import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DatePicker from '@/shared/ui/DatePicker/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onDateSelect: {
      action: 'onDateSelect called',
    },
    selectedDates: {},
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

export const Default: StoryObj<typeof DatePicker> = {};
