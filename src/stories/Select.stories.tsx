import type { Meta } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Select } from '@/shared/ui/Select';

const meta = {
  title: 'shared/Select',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

/* 기본 */
export const Default = {
  render: () => (
    <div className='className="flex w-100'>
      <Select.Root>
        <Select.Trigger placeholder="카테고리를 선택해 주세요" />
        <Select.Content>
          <Select.Item value="apple">apple</Select.Item>
          <Select.Item value="banana">banana</Select.Item>
          <Select.Item value="grape" disabled>
            grape
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

/* Controlled */
const ControlledStory = () => {
  const [value, setValue] = useState('apple');

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger placeholder="플레이스홀더" />
      <Select.Content>
        <Select.Item value="apple">apple</Select.Item>
        <Select.Item value="banana">banana</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export const Controlled = {
  render: () => <ControlledStory />,
};

/* 두 개 나란히 */
export const Range = {
  render: () => (
    <div className="flex items-center gap-1 w-100">
      <Select.Root>
        <Select.Trigger placeholder="0:00" />
        <Select.Content>
          <Select.Item value="00">00</Select.Item>
          <Select.Item value="01">01</Select.Item>
        </Select.Content>
      </Select.Root>
      -
      <Select.Root>
        <Select.Trigger placeholder="0:00" />
        <Select.Content>
          <Select.Item value="30">30</Select.Item>
          <Select.Item value="59">59</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};
