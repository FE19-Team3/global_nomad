import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import Input from '@/shared/ui/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    errorMsg: { control: { type: 'text' } },
    icon: { control: { type: 'boolean' } }, // TODO: SVGIcon 컴포넌트 추가 이후 수정
    placeholder: {
      control: { type: 'text' },
    },
    radius: { control: { type: 'inline-radio' } },
    size: { control: { type: 'inline-radio' } },
    type: { control: { type: 'inline-radio' } },
    variant: { control: { type: 'inline-radio' } },
    onChange: { action: 'onChange called' },
  },
  args: {
    className: '',
    disabled: false,
    errorMsg: '',
    icon: '/file.svg',
    placeholder: '텍스트를 입력하세요',
    radius: 'md',
    size: 'md',
    type: 'text',
    variant: 'primary',
  },
} satisfies Meta<typeof Input>;

export default meta;

const StatefulInput = (props: React.ComponentProps<typeof Input> & { errorMsg?: string }) => {
  const { errorMsg, onChange, ...rest } = props;
  const [value, setValue] = useState('');

  return (
    <Input
      {...rest}
      value={value}
      errorMsg={errorMsg}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
    />
  );
};

export const Default: StoryObj<typeof Input> = {
  render: (args) => <StatefulInput {...args} />,
};
