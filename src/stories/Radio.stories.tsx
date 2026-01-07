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
      <Radio.Item value="all" label="13:00 ~ 14:00" />
      <Radio.Item value="active" label="14:00 ~ 15:00" />
      <Radio.Item value="done" label="15:00 ~ 16:00" />
    </Radio>
  );
};

export const Default: Story = {
  render: () => <RadioExample />,
};
