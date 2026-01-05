import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { HeadcountSelector } from '@/widgets/headcount-selector';

const meta = {
  title: 'Widgets/headcount-selector',
  component: HeadcountSelector,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    label: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    onChange: { action: 'onChange called' },
  },
  args: {
    count: 1,
    min: 1,
    max: 10,
    label: '참여 인원 수',
    className: '',
  },
} satisfies Meta<typeof HeadcountSelector>;

export default meta;

const StatefulSelector = (props: React.ComponentProps<typeof HeadcountSelector>) => {
  const { count: initialCount, onChange, ...rest } = props;
  const [count, setCount] = useState(initialCount || 1);

  return (
    <HeadcountSelector
      {...rest}
      count={count}
      onChange={(val) => {
        setCount(val);
        onChange?.(val);
      }}
    />
  );
};

export const Default: StoryObj<typeof HeadcountSelector> = {
  render: (args) => (
    <div className="p-4">
      <StatefulSelector {...args} />
    </div>
  ),
};

export const MaxReached: StoryObj<typeof HeadcountSelector> = {
  render: (args) => (
    <div className="p-4">
      <StatefulSelector {...args} />
    </div>
  ),
  args: {
    count: 10,
    max: 10,
    label: '최대 인원 도달 상태',
  },
};
