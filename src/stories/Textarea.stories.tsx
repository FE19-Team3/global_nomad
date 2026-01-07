import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import Textarea from '@/shared/ui/Textarea/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: 'inline-radio',
      options: ['lg', 'md'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: '내용을 입력해주세요',
    radius: 'md',
    disabled: false,
    error: false,
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMsg: '내용을 반드시 입력해야 합니다.',
    placeholder: '에러 상태입니다.',
  },
};
