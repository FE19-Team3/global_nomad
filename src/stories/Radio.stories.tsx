import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Radio } from '@/shared/ui/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

const RadioExample = () => {
  const [selected, setSelected] = useState('all');

  return (
    <Radio name="namespace-example" selectedValue={selected} onChange={setSelected}>
      <Radio.Item value="all" label="전체 보기" />
      <Radio.Item value="active" label="진행 중" />
      <Radio.Item value="done" label="완료" />
    </Radio>
  );
};

export const Default: Story = {
  render: () => <RadioExample />,
};
