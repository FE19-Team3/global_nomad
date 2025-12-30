import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Text from '../shared/ui/Text';

const meta: Meta<typeof Text> = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
텍스트 컴포넌트입니다.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [11, 12, 14, 16, 18, 20],
    },
    weight: {
      control: 'radio',
      options: ['M', 'B'],
    },
    line: {
      control: 'radio',
      options: ['tight', 'body'],
    },
    as: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text.M14>14_M : {`<Text.M14>`}</Text.M14>
      <Text.B14>14_B : {`<Text.B14>`}</Text.B14>
      <Text.M16>16_M : {`<Text.B16>`}</Text.M16>
      <Text.B16>16_B : {`<Text.B16>`}</Text.B16>
      <Text.Body14>Body14 : {`<Text.Body14>`}</Text.Body14>
      <Text.Body16>Body16 : {`<Text.Body16>`}</Text.Body16>
      <Text.Body18B>Body18B : {`<Text.Body18B>`}</Text.Body18B>
      <Text.Body20B>Body20B : {`<Text.Body20B>`}</Text.Body20B>
    </div>
  ),
};

export const Variants = {
  args: {
    children: '컴파운드 패턴 사용을 권장 <Text.~ as="p">',
    size: 16,
    weight: 'M',
    line: 'tight',
  },
};
